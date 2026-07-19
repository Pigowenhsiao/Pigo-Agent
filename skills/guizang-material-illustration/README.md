# 歸藏的材質插畫 skill

![GitHub stars](https://img.shields.io/github/stars/op7418/guizang-material-illustration?style=flat-square)
![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)
![Material Illustration](https://img.shields.io/badge/Material-Illustration-002FA7?style=flat-square)
![Charts](https://img.shields.io/badge/Chart-Beautify-FF6B35?style=flat-square)
![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)
![Claude Code](https://img.shields.io/badge/Claude%20Code-Supported-6B5B95?style=flat-square)

一個適配 Claude Code / Codex 等 Agent 環境的配圖 Skill，用來把文章、筆記、圖表截圖、產品概念、工作彙報、教學材料和人文觀點，生成**帶中文標籤的歸藏材質插畫**。

<img width="1600" height="900" alt="歸藏的材質插畫 skill 頂部封面" src="https://github.com/user-attachments/assets/fc24c36d-197e-4689-abe8-feb0471ac4e5" />

它解決的是「中間那張圖」的問題：社交卡片、PPT、文章和文件裡經常需要一張能把意思講清楚的中心配圖，而不是一張漂亮但看不懂的裝飾圖。

這個 Skill 專注做三件事：

- **解釋圖**：把抽象概念、流程、機制、系統關係畫成帶標籤的圖。
- **圖表美化**：從截圖或原始資料裡抽取語義，重新生成更適合傳播的材質化圖表。
- **參考輔助出圖**：遇到冷門概念、品牌、模型、科學裝置、歷史物件時，先查參考資訊和參考圖，再統一轉成歸藏材質風格。

> 這是 [guizang-social-card-skill](https://github.com/op7418/guizang-social-card-skill) 的配套專案。Social Card Skill 負責整張卡片的標題、正文、主題色和尺寸；這個 Skill 負責卡片裡的中心插畫。

## 30 秒開始

```bash
npx skills add https://github.com/op7418/guizang-material-illustration --skill guizang-material-illustration
```

也可以直接把這段話發給有 shell 許可權的 AI Agent：

```text
幫我安裝 guizang-material-illustration。請把 https://github.com/op7418/guizang-material-illustration 克隆到 ~/.claude/skills/guizang-material-illustration，安裝完成後檢查 SKILL.md、assets/、references/ 是否存在。
```

已經安裝過的話，用這段話更新：

```text
幫我更新 guizang-material-illustration。請進入 ~/.claude/skills/guizang-material-illustration 執行 git pull，然後告訴我當前最新 commit。
```

安裝後直接對 Agent 說：

```text
用歸藏的材質插畫 skill，幫我把這段產品說明做成一張帶中文標籤的機制圖。
```

也可以試這些請求：

```text
把這篇文章挑 3 個核心概念，各生成一張帶字配圖。
幫我把這張柱狀圖重新畫成歸藏材質風格，資料和座標不要改。
這段講 PKCE 的說明太抽象了，先查一下參考資訊，再做一張流程圖。
給這篇小學科學課文做一張槓桿原理圖，圖裡標出支點、用力點、阻力點和力臂。
把這個週報整理成一張專案狀態配圖，包含進展、風險、決策、下週。
先生成中心配圖，再交給社交媒體卡片 Skill 排成 3:4 小紅書卡片。
```

## 效果

- **圖內可以有字**：解釋圖需要短標籤、箭頭、圖例和資料標註時，直接生成在圖片裡，不把圖片降級成無字裝飾。
- **材質化 3D 圖解**：剋制的 Swiss editorial 構圖、柔和 3D 材質、清楚的空間關係和少量高亮色。
- **圖表語義重畫**：輸入是糟糕截圖時，只保留圖表型別、標題、資料、座標、單位、誤差線和結論，不復刻原圖排版。
- **參考搜尋輔助**：模型 Logo、技術術語、歷史文化物件、科學裝置、管理框架等內容，先補事實和視覺線索，再統一風格。
- **教育與人文都能接**：小學科學、中學物理、生物化學機制、歷史路線、文學意象、社會學概念都可以做成解釋圖。
- **適配外層排版**：生成的圖片可以放進小紅書 3:4 卡片、公眾號封面、PPT、文件、知識庫和文章配圖。
- **主題色可擴充套件**：預設 IKB 藍，也支援檸檬黃、檸檬綠、安全橙、石墨黑等主題方向。
- **QA 優先**：交付前檢查中文標籤、資料、裁切、參考準確性和社交卡片尺寸下的可讀性。

## 適合 / 不適合

**合適**：文章配圖 / 知識解釋圖 / 產品機制圖 / 工作彙報配圖 / 資料圖表美化 / 教學材料配圖 / 人文觀點配圖 / 社交卡片中心圖 / PPT 中心插畫 / 冷門概念視覺解釋

**不合適**：完整小紅書卡片排版（用 Social Card Skill）/ 完整 PPT 結構設計（用 PPT Skill）/ 真實攝影修圖 / 人像寫真 / 長文海報排版 / 需要嚴格出版級資料製圖的科研圖

## 常見使用場景

| 任務 | 推薦方式 |
|------|---------|
| 長文章 → 配圖 | 先拆出 1-4 個核心概念，每個概念生成一張解釋圖 |
| 產品 / 技術說明 | 先查參考資訊，再做流程圖、層級圖、系統關係圖 |
| 圖表截圖美化 | 抽取資料和座標語義，重新生成材質化圖表 |
| 工作彙報 | 用進展、風險、決策、下一步做四象限或流程配圖 |
| 內容生產 | 把選題、素材、草稿、釋出、覆盤畫成工作流 |
| 教育解釋 | 明確部件、方向、關係和短標籤，避免只畫氛圍 |
| 人文觀點 | 用意象 + 結構 + 少量標籤，不偽造真實歷史現場 |
| 社交卡片聯動 | 先生成中心圖，再讓 Social Card Skill 負責標題和版式 |

## 支援型別

| 型別 | 適合內容 |
|------|---------|
| 概念拆解圖 | 一個概念由哪些部分組成 |
| 流程圖解 | 輸入、步驟、判斷、輸出 |
| 迴圈機制圖 | 增長迴圈、反饋迴路、迭代飛輪 |
| 對比圖 | 前後對比、兩條路徑、兩種策略 |
| 層級 / 架構圖 | 系統、依賴、組織、模組關係 |
| 場景解釋圖 | 辦公室、課堂、實驗臺、城市、歷史路線 |
| 科學機制圖 | 力、電、磁、生態、生物結構、化學反應 |
| 人文意象圖 | 詩歌、歷史、哲學、社會學隱喻 |
| 材質化圖表 | 柱狀圖、折線圖、甘特圖、桑基圖、熱力圖、漏斗圖、累計流圖 |
| 參考輔助圖 | 品牌、模型、專業術語、管理框架、科學裝置 |

## 圖表美化怎麼做

輸入可以是一張圖表截圖，也可以是一組資料。Agent 會先抽取：

- 圖表型別
- 標題和結論
- 橫軸、縱軸、單位和刻度
- 類別順序
- 數值、百分比、誤差線
- 需要強調的最高值、最低值、瓶頸或異常點

然後重新生成一張更適合傳播的圖：圖表可以更小，旁邊可以加入小場景、圖示、解釋標籤和視覺重點。目標不是「給原截圖換皮」，而是讓讀者更快看懂。

## 參考搜尋怎麼用

參考搜尋不是找畫風，也不是複製外部圖片。

它只解決三個問題：

1. 這個東西是什麼。
2. 哪些結構、部件、流程或圖示不能畫錯。
3. 觀眾靠什麼穩定視覺線索一眼識別它。

例如 PKCE、Andon、Zettelkasten、Kirkpatrick、Panopticon、某個模型 Logo、某個科學裝置或歷史物件，都適合先查參考資訊，再進入統一的歸藏材質插畫風格。

## 安裝

### 方式一：一行命令安裝

```bash
npx skills add https://github.com/op7418/guizang-material-illustration --skill guizang-material-illustration
```

### 方式二：把下面這段話直接發給 AI

> 幫我安裝 `guizang-material-illustration` 這個 Claude Code / Codex skill。請按下面步驟做：
>
> 1. 確保 `~/.claude/skills/` 目錄存在，不存在就建立
> 2. 執行 `git clone https://github.com/op7418/guizang-material-illustration.git ~/.claude/skills/guizang-material-illustration`
> 3. 驗證：`ls ~/.claude/skills/guizang-material-illustration/` 應該看到 `SKILL.md`、`assets/`、`references/` 三項
> 4. 告訴我裝好了，之後我說「做一張帶字配圖」「圖表美化」「生成材質插畫」之類的話就會觸發這個 skill

### 方式三：手動命令列

```bash
git clone https://github.com/op7418/guizang-material-illustration.git ~/.claude/skills/guizang-material-illustration
```

## 觸發方式

裝好後，可以這樣說：

- 「幫我生成一張配圖」
- 「做一張帶字解釋圖」
- 「把這個概念畫成圖解插畫」
- 「把這張圖表美化一下」
- 「給這段工作彙報做一張材質風配圖」
- 「這個概念比較冷門，先搜參考資訊再生成圖」
- 「給這篇小學科學課文做一張解釋圖」
- 「做一張能放進小紅書卡片裡的中心圖」

## 使用流程

Skill 本身會按下面的方式工作：

1. **理解材料**：讀文章、截圖、資料或說明，找出真正需要被畫出來的關係。
2. **內部判斷型別**：不讓使用者硬選模式，自動判斷是流程圖、機制圖、圖表、人文場景還是教育解釋圖。
3. **必要時查參考**：冷門概念、具體品牌、科學裝置、歷史物件先補參考資訊。
4. **壓縮文案**：把每張圖壓成一句說明和 3-5 個短標籤。
5. **寫生成提示詞**：明確標籤、資料、比例、安全區、視覺風格和參考線索。
6. **生成圖片**：呼叫 GPT-Image / imagegen 或當前 Agent 可用的影象生成能力。
7. **檢查並重生**：中文標籤、資料、裁切、圖例、參考線索錯了，優先重新生成。
8. **交付資產**：儲存圖片路徑和提示詞，方便放進社交卡片、PPT 或文件。

詳細執行規則見 [`SKILL.md`](./SKILL.md)。視覺風格、圖表、參考搜尋和 QA 規則在 `references/*.md` 裡。

## 目錄結構

```text
guizang-material-illustration/
├── SKILL.md                         # Skill 主檔案：觸發條件、工作流、交付規則
├── README.md                        # 本檔案
├── HANDOFF.md                       # 交接文件：事實、結構、測試案例、驗證方式
├── PRODUCT.md                       # 產品文件：定位、場景、邊界、roadmap
├── agents/
│   └── openai.yaml                  # Codex / OpenAI Skill 展示配置
├── assets/
│   └── prompt-template.md           # 可複用影象提示詞模板
└── references/
    ├── visual-style.md              # 歸藏材質插畫風格、比例、安全區、主題色
    ├── prompt-patterns.md           # 迴圈、流程、Hub、對比、層級等提示結構
    ├── chart-beautify.md            # 圖表語義抽取、資料優先重畫、圖示參考
    ├── use-cases-and-routing.md     # 支援場景與內部路由
    ├── reference-gathering.md       # 生僻概念 / 品牌 / 科學裝置參考規則
    └── qa-checklist.md              # 圖內文字、資料、裁切、參考準確性檢查
```

## 核心設計原則

1. **圖要講人話**：圖內標籤短、具體、能指向物件，不用抽象名詞堆砌。
2. **圖內可以有字**：解釋圖不是純裝飾，必要標籤應該直接生成在圖裡。
3. **資料不能編**：圖表類先保證數值、座標和單位正確，再談風格。
4. **參考只補事實**：查參考是為了畫對，不是為了抄風格。
5. **不讓使用者選內部模式**：Agent 自己判斷型別，只有關鍵資訊缺失時才問。
6. **中心圖和外層排版分工**：這個 Skill 生成配圖，社交卡片 / PPT Skill 負責整頁排版。
7. **小圖也要讀得清**：最終會進社交卡片時，標籤和主體必須能在縮放後看懂。

## 和 Social Card Skill 怎麼配合

推薦鏈路：

1. 用 `guizang-material-illustration` 先生成中心圖。
2. 檢查圖內標籤、資料和裁切。
3. 把圖片交給 `guizang-social-card-skill`。
4. Social Card Skill 負責 3:4 / 1:1 / 21:9 的標題、正文、主題色和匯出。

如果一張卡片的重點是這張圖，外層卡片要給圖片足夠大的區域；不要把中心圖縮得太小，否則圖內標籤會讀不清。

## Roadmap

- 整理一組可瀏覽案例 gallery，覆蓋工作、教育、人文、圖表四類。
- 擴充套件圖表型別：雷達圖、矩陣圖、泳道圖、時間軸、組織結構圖、地圖型資料。
- 補參考搜尋記錄模板：查了什麼、提取了什麼、哪些線索不採用。
- 增加和 Social Card Skill 聯動的最小 recipe。
- 補更多中文圖內標籤的穩定提示模板。

## FAQ

**這個 Skill 會直接排完整小紅書卡片嗎？**  
不會。它只生成中心配圖。整張卡片的標題、正文、主題色和平臺尺寸交給 Social Card Skill。

**圖裡真的可以有中文字嗎？**  
可以，而且這是這個 Skill 的核心。只要圖片承擔解釋任務，短中文標籤、箭頭說明、資料標註就應該在圖裡。

**如果中文字生成錯了怎麼辦？**  
優先縮短標籤並重新生成，不建議靠 HTML 往圖上貼一堆字補救。

**能不能只給資料，不給原圖？**  
可以。只要提供圖表型別、類別、數值、單位和想強調的結論，就能生成材質化圖表。

**能不能查參考圖？**  
可以。冷門概念、具體模型、品牌、科學裝置、歷史文化物件都適合先查參考。參考只用於理解事實和視覺線索。

**支援英文圖嗎？**  
支援，但預設優先中文圖內標籤，因為這個專案主要服務中文內容生產。

## 貢獻

歡迎開 Issue 或 PR。比較有價值的改動包括：

- 補充新的圖表型別和提示模板。
- 補充教育、人文、工作場景案例。
- 改進 `references/reference-gathering.md` 的參考搜尋邊界。
- 改進 `references/qa-checklist.md` 的圖內文字和資料檢查規則。
- 給 `assets/prompt-template.md` 增加更穩定的中文標籤寫法。

測試和 demo 請放在 `local-tests/` 下，不要把一次性輸出放進 Skill 根目錄。
