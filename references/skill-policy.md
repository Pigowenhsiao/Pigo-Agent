# Skill 探索政策

## 決策流程

1. 先檢查已安裝的 Skills 與目前對話情境，判斷是否有合適的 `SKILL.md` 工作流程可完成請求。
2. 若有合適的已安裝 Skill，說明 Skill 名稱與適用原因，再執行。
3. 若無合適 Skill，以 `rg` / `find` 搜尋以下路徑：
   - `~/.codex/skills/`：熱載入區，頻繁使用的高價值 Skills
   - `E:/python_Code/Agent`：canonical 技能庫（需時再搜）
4. 使用 `rg` 或 `find` 搜尋後，找開最匹配的 `SKILL.md` 再執行。
5. 不刪除 canonical Skills，除非 Pigo 明確要求。

---

## 雙檔分工

- `~/.pi/agent/AGENTS.md`（本檔）：全域政策權威
- `~/.codex/AGENTS.md`：Codex 疊加層，含 Codex 專有設定（Tool Mapping、Superpowers、Path Alias）
- 通用政策（核心工作原則、推理規範、STATUS 格式等）以本檔為準