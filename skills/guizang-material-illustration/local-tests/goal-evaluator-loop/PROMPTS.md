# Goal & Evaluator Loop — 配圖記錄

## 概念名稱
目標導向 Agent 迴圈（Goal-based Agent Loop）

## 使用模板
Goal And Evaluator Diagram（`references/prompt-patterns.md`）

## 最終 Prompt

```
Use case: stylized-concept
Asset type: 16:9 labeled material illustration for slide hero
Primary request: Goal-based agent loop illustration. A clear target or finish condition sits on the left, an AI builder iterates through small task blocks in the middle, and a neutral evaluator gate checks whether the target is met on the right. Add a subtle return arrow from the evaluator back to the AI builder for failed attempts.
Chinese labels: Add four short Simplified Chinese labels as clean printed callouts inside the illustration: "明确目标", "AI 尝试", "评估器", "未过重试".
Style/medium: clean Swiss editorial 3D vector-like illustration, off-white background, black ink lines, refined gray surfaces, one vivid IKB blue accent (#002FA7).
Composition/framing: 16:9 composition, subject fills the width naturally, centered vertically, generous safe margins on all sides, full subject visible, no crop.
Lighting/mood: crisp studio light, calm analytical mood.
Constraints: no extra words beyond the specified Chinese labels, no English labels, no numbers unless requested, no logo, no watermark, no poster frame, no page title, no decorative blobs, no gradient background.
```

## 生成參數
| 參數 | 值 |
|------|-----|
| Provider | Google Gemini |
| Model | gemini-3-pro-image-preview |
| Aspect Ratio | 16:9 |
| Quality | 2K |
| 輸出尺寸 | 2752×1536 |

## 輸出路徑
`local-tests/goal-evaluator-loop/assets/goal-evaluator-loop.png`

## QA 檢查清單
- [ ] 整體構圖完整，無裁切
- [ ] 四個中文標籤（明确目标、AI 尝试、评估器、未过重试）清晰可讀
- [ ] IKB Blue (#002FA7) 強調色一致
- [ ] 無 logo、浮水印、裝飾性色塊
- [ ] 適合嵌入簡報或文件
