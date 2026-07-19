# Handoff — guizang-material-illustration

最後更新：2026-07-07 · 版本：v0.1

這份文件只記錄當前 Skill 的事實：檔案結構、分工、驗證方式、測試案例和已知坑。產品定位看 `PRODUCT.md`。

遠端倉庫：`https://github.com/op7418/guizang-material-illustration.git`

---

## 1. 目錄結構

```
guizang-material-illustration/
├── SKILL.md                         # Skill 入口：何時呼叫、工作流、交付規則
├── HANDOFF.md                       # 本檔案
├── PRODUCT.md                       # 產品文件
├── agents/
│   └── openai.yaml                  # Codex / OpenAI Skill 展示配置
├── assets/
│   └── prompt-template.md           # 可複用提示詞模板
└── references/
    ├── visual-style.md              # 歸藏材質插畫風格、比例、安全區、圖內文字規則
    ├── prompt-patterns.md           # 常用圖解結構：迴圈、管線、對比、分層、場景
    ├── chart-beautify.md            # 圖表語義抽取、資料優先重畫、圖示參考
    ├── use-cases-and-routing.md     # 支援場景和內部路由
    ├── reference-gathering.md       # 生僻概念 / 品牌 / 科學裝置的參考資訊規則
    └── qa-checklist.md              # 圖內文字、資料、裁切、參考準確性檢查
```

---

## 2. Skill 分工

這個 Skill 只做**配圖層**：帶中文標籤的解釋圖、概念圖、機制圖、教育圖、人文配圖、工作場景圖、材質化圖表和參考資訊輔助圖。

它不負責完整社交卡片、PPT 頁面或公眾號封面排版。需要外層排版時，把它生成的圖片交給社交媒體卡片 Skill 或 PPT Skill。

關鍵約定：

- 影象本身可以有字。只要這張圖承擔解釋任務，圖內短標籤就是內容的一部分。
- 不把圖解降級成無字裝飾圖。
- 不把提示詞、Skill 名稱、內部模式、製作過程寫進給觀眾看的成品。
- 模式由 Agent 自己判斷，使用者不需要先選「圖表模式 / 教育模式 / 人文模式」。

---

## 3. 工作流事實

1. 讀使用者材料，拆出要解釋的核心關係、物件、流程、資料或情緒。
2. 內部判斷圖型：概念圖、流程圖、圖表、人文場景、教育機制、工作流、參考資訊輔助圖等。
3. 如果出現生僻概念、品牌、模型、科學裝置、歷史文化物件或專業圖示，先搜參考資訊和參考圖，只提取事實與穩定視覺線索。
4. 圖表輸入只保留語義：圖表型別、標題、資料、座標軸、單位、類別順序、誤差線、重要標註；不復刻糟糕截圖的佈局。
5. 寫影象提示詞，把圖內中文標籤、數值、構圖安全區和風格限制寫清楚。
6. 用 GPT-Image / imagegen 生成圖片。
7. 檢查文字、資料、裁切、主體大小、圖例和標籤；錯了優先重新生成，不靠 HTML 硬貼一堆標籤補救。
8. 交付圖片路徑、必要時交付對應提示詞記錄。

---

## 4. 測試案例

本輪已經做過三組測試。測試產物屬於本地臨時檔案，不隨 Skill 分發；這裡保留案例型別，方便後續重建 gallery。

### 教育 / 人文 / 圖表混合測試

- 小學物理槓桿：`支點 / 用力點 / 阻力點 / 力臂`
- 中學物理電磁感應：`磁鐵 / 線圈 / 運動方向 / 感應電流 / 小燈泡`
- 絲綢之路文化交流：`長安 / 商隊 / 綠洲 / 交流`
- 古詩月光與思鄉：`月光 / 床前 / 遠望 / 思鄉`
- 科學展甘特圖、一天時間桑基圖、酶活性熱力圖

### 打工人和內容生產者場景

- 週報彙報、專案管理、運營指標
- Andon 異常升級、PKCE 產品說明
- Zettelkasten 內容生產、Kirkpatrick 培訓評估
- Panopticon 職場隱喻、累計流圖

### 配圖 Skill × 社交卡片 Skill 聯動

- IKB Blue：AI 協作
- Lemon Yellow：內容生產
- Lemon Green：專注管理
- Safety Orange：風險分流

---

## 5. 已知坑

- 3:4 社交卡片裡如果主角是配圖，圖片區域必須足夠大；小圖縮放後，圖內標籤和細節會讀不清。
- 不要在影象已經生成後用 HTML 貼一堆解釋字來補救。圖內標籤錯了或缺了，優先重生圖。
- 不要讓使用者硬選模式。除非上下文真的不足，否則直接基於材料判斷。
- 參考搜尋不是找風格。只能提取事實、結構、圖示和視覺線索，再統一轉成歸藏材質插畫。
- 科學教育圖不能只好看，方向、關係、部件標籤要對。
- 圖表不能只追求漂亮，資料和座標含義必須先對。

---

## 6. 驗證

Skill 結構驗證命令：

```bash
python3 /Users/guohao/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/guohao/Documents/code/HyperFrames-test/guizang-material-illustration
```

期望輸出：

```text
Skill is valid!
```
