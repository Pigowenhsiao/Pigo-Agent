# 模型路由（MiniMax Plus 方案）

## 能力圖

| 能力 | 模型 / 工具 |
|------|-------------|
| 深度推理、長上下文、複雜任務 | **M2.7** |
| 快速翻譯、格式化、簡單轉換 | **M2-Flash** |
| 圖片理解、分析、多模態輸入 | **MiniMaxVL** |
| 網頁搜尋、資訊獲取 | **MCP web_search** |
| 圖片生成 | **MiniMax image-01** |
| 備援 | Claude（配額用盡時）/ GPT Image 2（圖生用盡時）|

## API Key 管理

- **來源**：`C:/Users/pigow/OneDrive/Dokumen/.env`
- **變數名**：`MINIMAX_API_KEY`
- **安全原則**：永遠不將 API Key 直接寫入 SKILL.md 或 AGENTS.md

## Anthropic 兼容端點

```
POST https://api.minimax.io/anthropic/v1/messages
Headers:
  x-api-key: <MINIMAX_API_KEY>
  Content-Type: application/json
Body:
  { "model": "MiniMax-M2.7", "messages": [...], "max_tokens": 8192 }
```

## Skills 路由狀態

| Skill | 用途 | 狀態 |
|-------|------|------|
| `baoyu-imagine` | 圖片生成（image-01） | 已整合 |
| `baoyu-image-gen` | 圖片生成（image-01） | 已整合 |
| `perplexity-search` | AI 搜尋（OpenRouter） | 備援用 |
| `brave-search` | 網頁搜尋 | 備援用 |