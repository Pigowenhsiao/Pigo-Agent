/**
 * pi extension: codex-bridge
 *
 * Bridges pi to a local Codex CLI by speaking MCP to a codex-mcp-server
 * subprocess. pi does not support MCP natively, so this extension registers
 * four custom pi tools (codex_exec, codex_poll, codex_review, codex_apply,
 * codex_cancel) and forwards each call to the corresponding MCP tool.
 *
 * Install:
 *   - Build the MCP server: cd "E:\AI Training\codex-mcp-server" && npm install && npx tsc
 *   - Drop this file at: C:\Users\pigow\.pi\agent\extensions\codex-bridge.ts
 *   - Restart pi (or /reload) — the tools appear automatically.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { spawn, ChildProcessWithoutNullStreams } from "node:child_process";
import { randomUUID } from "node:crypto";
import { resolve as resolvePath } from "node:path";
import { existsSync } from "node:fs";

// ---------------------------------------------------------------------------
// Minimal JSON-RPC 2.0 client over stdio (LSP-style framing).
// ---------------------------------------------------------------------------

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: number | string;
  result?: any;
  error?: { code: number; message: string; data?: any };
}

interface JsonRpcNotification {
  jsonrpc: "2.0";
  method: string;
  params?: any;
}

type McpMessage = JsonRpcResponse | JsonRpcNotification;

class McpStdioClient {
  private proc: ChildProcessWithoutNullStreams | null = null;
  private nextId = 1;
  private pending = new Map<number, { resolve: (v: any) => void; reject: (e: Error) => void }>();
  private buf = Buffer.alloc(0);
  private initialized = false;
  private serverInfo: { name: string; version: string } | null = null;

  constructor(private command: string, private args: string[]) {}

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.proc = spawn(this.command, this.args, {
          stdio: ["pipe", "pipe", "pipe"],
          windowsHide: true,
          env: process.env,
        });
      } catch (err) {
        reject(err);
        return;
      }
      this.proc.on("error", (err) => {
        // Reject all pending requests.
        for (const [, p] of this.pending) p.reject(err);
        this.pending.clear();
      });
      this.proc.on("close", () => {
        for (const [, p] of this.pending) p.reject(new Error("MCP server closed"));
        this.pending.clear();
      });
      this.proc.stdout.on("data", (chunk: Buffer) => this.onData(chunk));
      this.proc.stderr?.on("data", (chunk: Buffer) => {
        // Forward server logs to pi's stderr-friendly stream if needed.
        // We deliberately do not write to stdout (MCP channel).
        process.stderr.write(`[codex-mcp] ${chunk.toString("utf8")}`);
      });
      // Initialize handshake.
      this.request("initialize", {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: { name: "pi-codex-bridge", version: "0.1.0" },
      })
        .then((result) => {
          this.serverInfo = result?.serverInfo ?? null;
          this.notify("notifications/initialized", {});
          this.initialized = true;
          resolve();
        })
        .catch(reject);
    });
  }

  private onData(chunk: Buffer) {
    this.buf = Buffer.concat([this.buf, chunk]);
    while (true) {
      const headerEnd = this.buf.indexOf("\r\n\r\n");
      if (headerEnd < 0) return;
      const header = this.buf.slice(0, headerEnd).toString("utf8");
      const m = /Content-Length:\s*(\d+)/i.exec(header);
      if (!m) {
        // Bad framing — drop a byte and try again.
        this.buf = this.buf.slice(1);
        continue;
      }
      const len = parseInt(m[1], 10);
      const bodyStart = headerEnd + 4;
      if (this.buf.length < bodyStart + len) return; // wait for more
      const body = this.buf.slice(bodyStart, bodyStart + len).toString("utf8");
      this.buf = this.buf.slice(bodyStart + len);
      let msg: McpMessage;
      try {
        msg = JSON.parse(body);
      } catch {
        continue;
      }
      if ("id" in msg && (msg as JsonRpcResponse).id !== undefined && ("result" in msg || "error" in msg)) {
        const resp = msg as JsonRpcResponse;
        const p = this.pending.get(resp.id as number);
        if (p) {
          this.pending.delete(resp.id as number);
          if (resp.error) p.reject(new Error(`MCP error ${resp.error.code}: ${resp.error.message}`));
          else p.resolve(resp.result);
        }
      }
      // Notifications are currently ignored.
    }
  }

  private request(method: string, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      this.pending.set(id, { resolve, reject });
      const payload = JSON.stringify({ jsonrpc: "2.0", id, method, params });
      const framed = `Content-Length: ${Buffer.byteLength(payload, "utf8")}\r\n\r\n${payload}`;
      try {
        this.proc!.stdin.write(framed);
      } catch (err) {
        this.pending.delete(id);
        reject(err);
      }
    });
  }

  private notify(method: string, params?: any) {
    if (!this.proc) return;
    const payload = JSON.stringify({ jsonrpc: "2.0", method, params });
    const framed = `Content-Length: ${Buffer.byteLength(payload, "utf8")}\r\n\r\n${payload}`;
    try {
      this.proc.stdin.write(framed);
    } catch {
      // ignore
    }
  }

  isAlive(): boolean {
    return this.proc !== null && !this.proc.killed && this.initialized;
  }

  async callTool(name: string, args: any): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
    if (!this.isAlive()) {
      // Server died (or never started). Reset and respawn.
      this.proc = null;
      this.initialized = false;
      this.pending.clear();
      this.buf = Buffer.alloc(0);
      await this.start();
    }
    const result = await this.request("tools/call", { name, arguments: args });
    return result;
  }

  async stop() {
    if (this.proc) {
      try {
        this.proc.stdin.end();
      } catch {
        // ignore
      }
      try {
        this.proc.kill();
      } catch {
        // ignore
      }
      this.proc = null;
    }
  }
}

// ---------------------------------------------------------------------------
// Resolve MCP server binary.
// ---------------------------------------------------------------------------

const DEFAULT_SERVER_CANDIDATES = [
  "E:/AI Training/codex-mcp-server/src/index.js",
  "E:/AI Training/codex-mcp-server/dist/index.js",
  "E:\\AI Training\\codex-mcp-server\\src\\index.js",
  "E:\\AI Training\\codex-mcp-server\\dist\\index.js",
];

function findServerEntry(): string {
  for (const c of DEFAULT_SERVER_CANDIDATES) {
    if (existsSync(c)) return c;
  }
  // Fall back to dist path; the user will see a clear spawn error.
  return DEFAULT_SERVER_CANDIDATES[3];
}

// ---------------------------------------------------------------------------
// pi extension
// ---------------------------------------------------------------------------

export default function (pi: ExtensionAPI) {
  let client: McpStdioClient | null = null;
  let clientPromise: Promise<McpStdioClient> | null = null;

  async function getClient(): Promise<McpStdioClient> {
    if (client) return client;
    if (!clientPromise) {
      clientPromise = (async () => {
        const entry = findServerEntry();
        const c = new McpStdioClient(process.execPath, [entry]);
        await c.start();
        client = c;
        return c;
      })();
    }
    return clientPromise;
  }

  // Cleanly tear down the MCP server when pi shuts down this session.
  pi.on("session_shutdown", async () => {
    if (client) {
      await client.stop();
      client = null;
    }
  });

  // ---------- Tool: codex_exec ----------
  pi.registerTool({
    name: "codex_exec",
    label: "Codex Exec",
    description:
      "Run a Codex CLI task. By default blocks until completion. Pass wait=false to return a thread_id immediately that you can poll with codex_poll. No built-in timeout — long tasks are allowed. The default working directory is the caller's cwd; the default sandbox is workspace-write. Add additional writable directories with addDirs.",
    promptSnippet: "Run a Codex task (sync or async) via the local codex CLI",
    promptGuidelines: [
      "Use codex_exec to delegate long, multi-step tasks to a separate Codex agent when the user explicitly wants Codex to handle them.",
      "Prefer wait=true (default) for tasks that should finish before the LLM continues.",
      "Use wait=false when the task may take a long time — then poll with codex_poll for progress every 5 minutes until done.",
      "Tasks auto-cancel after 5 minutes of no progress (noProgressTimeoutMs: 300000). Set to 0 to disable.",
      "Do not pass sandbox=danger-full-access unless the user explicitly accepts the risk.",
    ],
    parameters: Type.Object({
      prompt: Type.String({ description: "Initial instructions for Codex." }),
      cwd: Type.Optional(Type.String({ description: "Working directory (absolute path). Defaults to caller cwd." })),
      model: Type.Optional(Type.String({ description: "Optional model override. Leave empty to use pi's default model." })),
      sandbox: Type.Optional(
        Type.Union([
          Type.Literal("read-only"),
          Type.Literal("workspace-write"),
          Type.Literal("danger-full-access"),
        ], { description: "Sandbox mode. Default: workspace-write." }),
      ),
      addDirs: Type.Optional(
        Type.Array(Type.String(), { description: "Additional directories that should be writable alongside the primary workspace." }),
      ),
      wait: Type.Optional(Type.Boolean({ description: "If true (default), block until completion. If false, return thread_id immediately." })),
      resumeThreadId: Type.Optional(Type.String({ description: "Thread id to resume (equivalent to `codex exec resume <id>`)." })),
      persistSession: Type.Optional(Type.Boolean({ description: "Persist session to disk. Default true. Set false to use --ephemeral." })),
      noProgressTimeoutMs: Type.Optional(Type.Number({ description: "Auto-cancel if no new events for N ms. Default 300000 (5 min). Set 0 to disable." })),
    }),
    async execute(_toolCallId, params, signal, onUpdate) {
      const c = await getClient();
      const args: any = {
        prompt: params.prompt,
        wait: params.wait !== false,
      };
      if (params.cwd) args.cwd = resolvePath(params.cwd);
      if (params.model && params.model.length > 0) args.model = params.model;
      if (params.sandbox) args.sandbox = params.sandbox;
      if (params.addDirs && params.addDirs.length > 0) args.addDirs = params.addDirs;
      if (params.resumeThreadId) args.resumeThreadId = params.resumeThreadId;
      if (params.persistSession === false) args.persistSession = false;
      if (typeof params.noProgressTimeoutMs === "number") args.noProgressTimeoutMs = params.noProgressTimeoutMs;

      // Race the call against the abort signal so Esc cancels cleanly.
      const callPromise = c.callTool("codex_exec", args);
      const result = await raceWithSignal(callPromise, signal, () => c.stop());
      const text = result.content?.map((b) => b.text || "").join("\n") || "(no output)";
      return {
        content: [{ type: "text", text }],
        details: { isError: result.isError },
        isError: result.isError === true,
      };
    },
  });

  // ---------- Tool: codex_poll ----------
  pi.registerTool({
    name: "codex_poll",
    label: "Codex Poll",
    description:
      "Block for up to maxWaitSeconds (default 300, max 300 = 5 minutes) waiting for new events or completion of a codex_exec(wait=false) or codex_review(wait=false) thread. Use this in a loop until done=true to implement the 'poll every 5 minutes until finished' pattern.",
    promptSnippet: "Poll a running Codex thread for progress",
    parameters: Type.Object({
      threadId: Type.String({ description: "Thread id returned by codex_exec with wait=false." }),
      maxWaitSeconds: Type.Optional(Type.Number({ description: "Max seconds to wait. Default 300. Max 300." })),
    }),
    async execute(_toolCallId, params, signal) {
      const c = await getClient();
      const args: any = { threadId: params.threadId };
      if (typeof params.maxWaitSeconds === "number") args.maxWaitSeconds = params.maxWaitSeconds;
      const result = await raceWithSignal(c.callTool("codex_poll", args), signal, () => c.stop());
      const text = result.content?.map((b) => b.text || "").join("\n") || "(no output)";
      return {
        content: [{ type: "text", text }],
        details: { isError: result.isError },
        isError: result.isError === true,
      };
    },
  });

  // ---------- Tool: codex_review ----------
  pi.registerTool({
    name: "codex_review",
    label: "Codex Review",
    description: "Run `codex exec review` against a directory and return the review report. Runs in read-only sandbox.",
    parameters: Type.Object({
      cwd: Type.Optional(Type.String({ description: "Working directory to review. Defaults to caller cwd." })),
      model: Type.Optional(Type.String({ description: "Optional model override." })),
      addDirs: Type.Optional(Type.Array(Type.String())),
      wait: Type.Optional(Type.Boolean({ description: "Block until done. Default true." })),
    }),
    async execute(_toolCallId, params, signal) {
      const c = await getClient();
      const args: any = { wait: params.wait !== false };
      if (params.cwd) args.cwd = resolvePath(params.cwd);
      if (params.model) args.model = params.model;
      if (params.addDirs && params.addDirs.length > 0) args.addDirs = params.addDirs;
      const result = await raceWithSignal(c.callTool("codex_review", args), signal, () => c.stop());
      const text = result.content?.map((b) => b.text || "").join("\n") || "(no output)";
      return {
        content: [{ type: "text", text }],
        details: { isError: result.isError },
        isError: result.isError === true,
      };
    },
  });

  // ---------- Tool: codex_apply ----------
  pi.registerTool({
    name: "codex_apply",
    label: "Codex Apply",
    description: "Apply the latest diff produced by Codex via `codex apply` to the working tree.",
    parameters: Type.Object({
      cwd: Type.Optional(Type.String({ description: "Working directory. Defaults to caller cwd." })),
    }),
    async execute(_toolCallId, params, signal) {
      const c = await getClient();
      const args: any = {};
      if (params.cwd) args.cwd = resolvePath(params.cwd);
      const result = await raceWithSignal(c.callTool("codex_apply", args), signal, () => c.stop());
      const text = result.content?.map((b) => b.text || "").join("\n") || "(no output)";
      return {
        content: [{ type: "text", text }],
        details: { isError: result.isError },
        isError: result.isError === true,
      };
    },
  });

  // ---------- Tool: codex_cancel ----------
  pi.registerTool({
    name: "codex_cancel",
    label: "Codex Cancel",
    description: "Cancel a running Codex thread by thread_id.",
    parameters: Type.Object({
      threadId: Type.String({ description: "Thread id to cancel." }),
    }),
    async execute(_toolCallId, params) {
      const c = await getClient();
      const result = await c.callTool("codex_cancel", { threadId: params.threadId });
      const text = result.content?.map((b) => b.text || "").join("\n") || "(no output)";
      return { content: [{ type: "text", text }] };
    },
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function raceWithSignal<T>(p: Promise<T>, signal: AbortSignal | undefined, onAbortCleanup: () => void): Promise<T> {
  if (!signal) return p;
  if (signal.aborted) {
    onAbortCleanup();
    throw new Error("Aborted");
  }
  return new Promise<T>((resolve, reject) => {
    const onSignal = () => {
      onAbortCleanup();
      reject(new Error("Aborted by user"));
    };
    signal.addEventListener("abort", onSignal, { once: true });
    p.then(
      (v) => {
        signal.removeEventListener("abort", onSignal);
        resolve(v);
      },
      (e) => {
        signal.removeEventListener("abort", onSignal);
        reject(e);
      },
    );
  });
}
