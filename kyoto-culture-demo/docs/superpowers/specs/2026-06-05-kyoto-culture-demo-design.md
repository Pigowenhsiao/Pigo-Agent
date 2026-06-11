# 京都文化探索網站 SPEC（v2 強化版）

## 1. 概念與願景

一個專為國中小學生設計的京都文化科普網站，以和風優雅為基調，帶領年輕學子探索這座千年古都的魅力。網站如同一本精心編排的數位電子書，每一頁都是一幅靜謐的日本風景畫，搭配簡潔的文字說明，讓學習變得優雅而有趣。

**整體氛圍**：傳統而不古板，優雅而不冰冷，知識傳遞與美學享受兼具。
**設計邊界**：絕不卡通化、絕不遊戲化、絕不濫用 emoji；所有視覺元素必須在「和風優雅」語境內。

---

## 2. 設計語言（含完整規範表）

### 2.1 色彩系統（CSS Variables）

| 變數名 | 色值 | 用途 |
|--------|------|------|
| `--ink` | `#1a1a2e` | 主標題、icon 線條 |
| `--ink-soft` | `#4a4a5a` | 次要文字、輔助說明 |
| `--vermilion` | `#c73e3e` | 朱紅強調、按鈕、連結、亮點 |
| `--gold` | `#d4a853` | 金色點綴、徽章、裝飾線 |
| `--rice-paper` | `#faf8f5` | 卡片底色 |
| `--kinari` | `#f5f0e8` | 頁面底色 |
| `--shadow` | `rgba(26,26,46,0.12)` | 卡片陰影 |
| `--overlay` | `rgba(26,26,46,0.55)` | 圖片遮罩 |

### 2.2 字體規範（含 fallback）

**字體載入策略**：使用 Google Fonts CDN，必須設定 fallback。
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
```

**Fallback 鏈**：
- 標題：`'Noto Serif TC', 'PingFang TC', 'Microsoft JhengHei', serif`
- 內文：`'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif`
- 顯示時長：≤3 秒；超時 fallback 生效（瀏覽器原生處理）

### 2.3 字級階層（Typography Scale）

| 層級 | 桌面尺寸 | 手機尺寸 | 字重 | 行高 | 用途 |
|------|----------|----------|------|------|------|
| Display | 64px | 36px | 700 | 1.2 | Hero 主標語 |
| H1 | 48px | 32px | 700 | 1.25 | 區塊大標題 |
| H2 | 36px | 26px | 600 | 1.3 | 子區塊標題 |
| H3 | 24px | 20px | 600 | 1.4 | 卡片標題 |
| Body L | 18px | 16px | 400 | 1.7 | 內文 |
| Body M | 16px | 14px | 400 | 1.6 | 描述 |
| Caption | 14px | 12px | 400 | 1.5 | 圖片說明 |
| Label | 12px | 11px | 500 | 1.4 | 標籤、徽章 |

### 2.4 間距系統（8px Grid）

| Token | 數值 | 用途 |
|-------|------|------|
| `space-1` | 4px | icon 內距 |
| `space-2` | 8px | 元素內距 |
| `space-3` | 16px | 卡片內距 |
| `space-4` | 24px | 區塊內距 |
| `space-5` | 32px | 區塊間距（手機） |
| `space-6` | 48px | 區塊間距（平板） |
| `space-7` | 64px | 區塊間距（桌機） |
| `space-8` | 96px | 頂部大留白 |

### 2.5 圓角與陰影

| 元素 | 圓角 | 陰影 |
|------|------|------|
| 按鈕 | 4px | 無 |
| 卡片 | 8px | `0 2px 8px var(--shadow)` |
| Modal/Lightbox | 12px | `0 8px 32px rgba(0,0,0,0.25)` |
| 圖片 | 0px（直角） | 無 |
| Input | 4px | 無 |

### 2.6 按鈕樣式

**Primary Button**
- 底色：var(--vermilion)
- 文字：var(--rice-paper)
- 內距：12px 24px
- 字級：Body M
- Hover：底色變暗 10%、微微上移 1px
- Active：上移 0、底色再暗 5%
- 圓角：4px

**Secondary Button**
- 邊框：1px solid var(--ink)
- 底色：透明
- 文字：var(--ink)
- Hover：底色 var(--ink)、文字 var(--rice-paper)

**Icon Button**
- 48px × 48px 正方形
- 內含 24px 線條 icon
- 觸控區充足

### 2.7 動態哲學

| 動畫 | 屬性 | 時長 | 緩動 |
|------|------|------|------|
| 區塊淡入 | opacity + translateY(20px) | 600ms | ease-out |
| 圖片懸停 | scale(1.02) | 300ms | ease-out |
| Modal 開啟 | opacity + scale(0.95→1) | 250ms | ease-out |
| Modal 關閉 | opacity | 200ms | ease-in |
| 漢堡選單 | transform translateX | 300ms | cubic-bezier |
| Hover 顏色 | background-color | 200ms | linear |

**禁用**：旋轉、3D 翻轉、粒子特效、過度彈跳

---

## 3. 內容結構（資訊密度定義）

### 3.1 區塊資訊密度規範

| 區塊 | 字數上限 | 圖片上限 | 互動 |
|------|----------|----------|------|
| Hero | 標題 12字 + 副標 18字 | 1 張背景 | 點擊/滾動 |
| AreaCard | 標題 6字 + 描述 60字 | 1 張 | 點擊展開 modal |
| ThemeCard | 標題 8字 + 描述 40字 | 1 張 | 點擊展開 modal |
| Itinerary | 標題 8字 + 描述 30字/景點 | 每景點 1 張 | Tab 切換 3天/5天 |
| KnowledgeCard | 標題 16字 + 內文 80字 | 0 | 無 |
| GalleryItem | 標題 20字 | 1 張 | 點擊開 lightbox |

### 3.2 行程景點上限
- 3天行程：每天 ≤ 4 個景點
- 5天行程：每天 ≤ 4 個景點

### 3.3 知識點數量
- 固定 6 則，編號 01–06

---

## 4. 資產對照表

### 4.1 圖片用途映射

| 圖片檔名 | 用途 | 顯示比例 | 載入策略 | Fallback |
|----------|------|----------|----------|----------|
| `hero-kyoto.png` | Hero 背景 | cover | eager | 純色漸層 |
| `area-arashiyama.png` | 嵐山卡片 | 4:3 | lazy | 灰色 placeholder |
| `area-fushimi.png` | 伏見稻荷卡片 | 4:3 | lazy | 灰色 placeholder |
| `area-gion.png` | 祇園卡片 | 4:3 | lazy | 灰色 placeholder |
| `area-nishiki.png` | 錦市場卡片 | 4:3 | lazy | 灰色 placeholder |
| `theme-seasons.png` | 四季主題卡 | 16:9 | lazy | 灰色 placeholder |
| `theme-shrines.png` | 神社主題卡 | 16:9 | lazy | 灰色 placeholder |
| `theme-geiko.png` | 藝伎主題卡 | 16:9 | lazy | 灰色 placeholder |
| `theme-craft.png` | 工藝主題卡 | 16:9 | lazy | 灰色 placeholder |
| `detail-arashiyama.png` | 行程 Day1 配圖 | 4:3 | lazy | 灰色 placeholder |
| `detail-fushimi.png` | 行程 Day3 配圖 | 4:3 | lazy | 灰色 placeholder |
| `detail-gion.png` | 行程 Day2 配圖 | 4:3 | lazy | 灰色 placeholder |
| `detail-nishiki.png` | 行程 Day2 配圖 | 4:3 | lazy | 灰色 placeholder |
| `detail-seasons.png` | 圖庫展示 | 4:3 | lazy | 灰色 placeholder |
| `detail-shrines.png` | 圖庫展示 | 4:3 | lazy | 灰色 placeholder |
| `detail-craft.png` | 圖庫展示 | 4:3 | lazy | 灰色 placeholder |
| `detail-geiko.png` | 圖庫展示 | 4:3 | lazy | 灰色 placeholder |

**總計 17 張 PNG 圖片**（其中 hero-kyoto 也算 1 張，共 18 張，但 `area-*.png` 4 張在區域探索、行程各有一張複用）

### 4.2 圖片響應式策略

```html
<img src="..." loading="lazy" decoding="async" 
     style="object-fit: cover; aspect-ratio: 4/3; width: 100%;">
```

- 桌面/平板/手機共用同一檔案
- 使用 `object-fit: cover` + `aspect-ratio` 保持比例
- 圖片加 `loading="lazy"`（Hero 除外）
- 圖片加 `decoding="async"` 非阻塞解碼

---

## 5. 互動規則（詳細）

### 5.1 Modal（AreaCard / ThemeCard 點擊展開）

**開啟條件**：
- 點擊卡片本體
- 不包含卡片內的「了解更多」按鈕（按鈕點擊也算開啟，但保留向上冒泡）

**關閉條件**：
- 點擊右上角「×」按鈕
- 點擊遮罩（modal 外的灰色區域）
- 按下 ESC 鍵
- 滑動關閉（手機，從上往下滑超過 100px）

**狀態保持**：
- 開啟時 `body` 加上 `overflow: hidden`
- 開啟時 focus 移到 modal 內第一個可聚焦元素
- 關閉時 focus 回到觸發卡片

**動畫**：
- 開啟：背景 fade-in 250ms，內容 scale(0.95) → scale(1) 250ms ease-out
- 關閉：反轉，200ms

### 5.2 Lightbox（圖庫點擊）

**開啟條件**：點擊 gallery 任一圖

**關閉條件**：
- 點擊「×」按鈕
- 點擊遮罩
- 按下 ESC 鍵

**切換條件**：
- 左右箭頭按鈕
- 鍵盤 ← / → 鍵
- 手機左右滑動手勢（touchstart + touchend，水平位移 > 50px）

**狀態保持**：
- 顯示當前索引（如 3/9）
- 切換時記錄滾動位置於 body，關閉時恢復

### 5.3 Drawer（手機選單）

**開啟條件**：點擊漢堡按鈕

**關閉條件**：
- 點擊「×」按鈕
- 點擊選單外的區域
- 按下 ESC 鍵
- 點擊任一選單項目（同時觸發滾動到錨點）

**狀態保持**：
- 開啟時 `body` 加上 `overflow: hidden`
- 漢堡按鈕動畫變成「×」

### 5.4 行程 Tab 切換

**互動**：點擊「3天經典」或「5天深度」按鈕

**狀態**：
- 當前選中樣式：朱紅底、白字
- 未選中樣式：透明底、朱紅邊框
- 切換時有 200ms 淡入淡出過渡

**鍵盤**：左右鍵可在兩個 tab 之間切換

### 5.5 滾動動畫

**觸發**：Intersection Observer（threshold 0.1）

**規則**：
- 元素進入視窗時套用 `.visible` class
- 動畫僅播放一次（不重複）
- 元素預設 `opacity: 0; transform: translateY(20px)`
- 加 `.visible` 後 `opacity: 1; transform: translateY(0)`，600ms ease-out

---

## 6. 響應式行為（分區塊定義）

### 6.1 斷點

```
sm: < 640px    手機
md: 640-1023px 平板
lg: ≥ 1024px   桌機
```

### 6.2 Navbar

| 裝置 | 顯示方式 |
|------|----------|
| 桌機 | Logo 左，導航連結右，無漢堡 |
| 平板 | Logo 左，漢堡右（連結收合） |
| 手機 | Logo 左，漢堡右 |

### 6.3 Hero

| 裝置 | 標題字級 | 副標字級 |
|------|----------|----------|
| 桌機 | 64px | 20px |
| 平板 | 48px | 18px |
| 手機 | 36px | 16px |

背景圖 cover 始終，高度 100vh，無 padding 變化。

### 6.4 AreaSection

| 裝置 | 網格 |
|------|------|
| 桌機 | 2 × 2 |
| 平板 | 2 × 2 |
| 手機 | 1 column |

### 6.5 ThemeSection

| 裝置 | 網格 |
|------|------|
| 桌機 | 4 欄橫排 |
| 平板 | 2 × 2 |
| 手機 | 1 column（或可橫向滑動） |

### 6.6 ItineraryTimeline

| 裝置 | 顯示方式 |
|------|----------|
| 桌機 | 左日期膠囊 + 右卡片，水平排列 |
| 平板 | 同桌機 |
| 手機 | 膠囊與卡片垂直堆疊（膠囊在上），左側時間軸線 |

### 6.7 KnowledgeSection

| 裝置 | 網格 |
|------|------|
| 桌機 | 3 × 2 |
| 平板 | 2 × 3 |
| 手機 | 1 column |

### 6.8 GallerySection

| 裝置 | 網格 |
|------|------|
| 桌機 | 4 欄 |
| 平板 | 3 欄 |
| 手機 | 2 欄 |

### 6.9 Modal / Lightbox

- 桌機/平板：居中顯示，寬度 600–800px
- 手機：佔滿寬度（左右各留 16px），從底部滑入（300ms）

### 6.10 極限情境

- 最小寬度 320px：所有內容無水平捲軸
- 長字串標題：自動換行，不破版
- 圖片載入失敗：顯示 placeholder + alt 文字
- 網路慢：字體 3 秒後降級

---

## 7. 元件規格

### 7.1 Navbar
- 高度：64px
- 固定頂部，z-index 100
- 滾動 > 50px 時背景從透明 → `var(--kinari)` + `backdrop-filter: blur(8px)`
- 陰影：滾動後出現，否則無

### 7.2 HeroSection
- 高度：100vh
- 背景：`hero-kyoto.png` + 漸層遮罩（從透明到 `--overlay`）
- 主標語位置：垂直 50%、水平 50% 居中
- 副標語在主標語下方 16px
- 滾動指示箭頭：底部 48px 處，無限彈跳動畫（2s loop）

### 7.3 SectionDivider
- 高度：48px
- 內容：金色 SVG 裝飾線（八角星/千代紙圖騰）
- 置中對齊

### 7.4 AreaCard
- 結構：`<figure>` 內含 `<img>` + `<figcaption>` 含 H3 + 描述 + 按鈕
- 高度：固定 aspect-ratio 4:3 圖片 + 內文區
- Hover：圖片 scale 1.02，按鈕顏色加深
- 點擊：開啟 modal

### 7.5 ThemeCard
- 結構：圖片背景 + 底部標題覆蓋層（半透明黑色背景）
- 比例：16:9
- Hover：標題背景透明度提升，額外資訊淡入

### 7.6 ItineraryTimeline
- 結構：左側時間軸線（垂直）+ 日期膠囊 + 景點卡片
- 膠囊：圓角矩形，朱紅底，白字，width 80px
- 卡片：米白底，陰影，左 12px 金色邊框
- 連接線：虛線，金色

### 7.7 KnowledgeCard
- 結構：左側金色邊框 + 編號徽章 + 標題 + 內文
- 編號徽章：金色底，墨色字，48px 圓形
- 內文：Body L 行高 1.7

### 7.8 GalleryItem
- 結構：`<img>` 填滿網格單元 + 標題 overlay（hover 顯示）
- aspect-ratio: 4:3
- Hover：暗化圖片 + 顯示放大鏡 icon

### 7.9 Footer
- 高度：120px
- 背景：var(--ink)
- 文字：var(--rice-paper)
- 內容：版權 + 標語
- 對齊：置中

---

## 8. 技術方案

### 8.1 檔案結構

```
kyoto-culture-demo/
├── index.html          # 主頁（單一 HTML）
├── assets/
│   ├── *.png           # 17 張參考圖
├── css/
│   ├── main.css        # 主要樣式
│   ├── components.css  # 元件樣式
│   └── responsive.css  # 響應式
├── js/
│   ├── main.js         # 主程式
│   ├── animations.js   # 滾動動畫
│   ├── modal.js        # Modal 控制
│   ├── lightbox.js     # Lightbox 控制
│   └── drawer.js       # Drawer 控制
└── README.md           # 啟動說明
```

### 8.2 技術堆疊

- HTML5（語意化標籤：`<header>`、`<nav>`、`<main>`、`<section>`、`<article>`、`<footer>`）
- CSS3（Grid + Flexbox + Custom Properties）
- Vanilla JavaScript（ES6+，無任何外部庫）
- 啟動方式：雙擊 `index.html` 即可瀏覽

### 8.3 瀏覽器支援

- Chrome/Edge ≥ 100
- Firefox ≥ 100
- Safari ≥ 15
- iOS Safari ≥ 15
- 不支援 IE

---

## 9. 頁面章節順序

1. Navbar（固定）
2. HeroSection（100vh）
3. SectionDivider
4. AreaSection（4 區域）
5. SectionDivider
6. ThemeSection（4 主題）
7. SectionDivider
8. ItinerarySection（含 Tab 切換）
9. SectionDivider
10. KnowledgeSection（6 則小知識）
11. SectionDivider
12. GallerySection（17 張圖庫）
13. Footer

---

## 10. 驗收標準（可測試版本）

### 10.1 視覺驗收

- [ ] 在 360×800、768×1024、1440×900 三種解析度下，所有區塊無水平捲軸
- [ ] Hero 標題在桌機為 64px、手機為 36px，可透過 DevTools 驗證
- [ ] 所有色彩嚴格遵守 2.1 表格定義（無隨意色）
- [ ] 所有字型使用 Noto Serif/Sans TC，fallback 鏈正確
- [ ] 圖片保持指定 aspect-ratio（4:3 或 16:9），不變形

### 10.2 功能驗收

- [ ] 點擊任一 AreaCard 可開啟對應 Modal，內容包含標題、描述、圖片
- [ ] Modal 可透過「×」按鈕、點擊遮罩、ESC 鍵三種方式關閉
- [ ] 點擊任一 ThemeCard 可開啟對應 Modal
- [ ] 點擊任一 Gallery 圖片可開啟 Lightbox
- [ ] Lightbox 支援左右切換（箭頭、鍵盤 ←/→、手機左右滑動）
- [ ] Lightbox 顯示當前索引（如 3/9）
- [ ] 點擊漢堡按鈕可開啟 Drawer
- [ ] Drawer 可透過「×」按鈕、點擊外部、ESC 鍵、選單項目四種方式關閉
- [ ] 行程區塊 Tab 可在「3天經典」「5天深度」之間切換
- [ ] 切換 Tab 後內容平滑過渡，無閃爍

### 10.3 圖片驗收

- [ ] 所有 17 張 `assets/*.png` 圖片皆能在頁面中被正確引用（無 404）
- [ ] Hero 圖片為 eager 載入，其餘圖片皆為 lazy 載入
- [ ] 圖片載入失敗時顯示 placeholder + alt 文字
- [ ] 圖片加入 `decoding="async"` 屬性

### 10.4 動畫驗收

- [ ] 滾動至各區塊時，淡入上滑動畫正常觸發（Intersection Observer）
- [ ] 動畫僅播放一次，不重複觸發
- [ ] Modal 開啟時背景 fade-in 250ms，內容 scale 250ms
- [ ] 漢堡按鈕在 Drawer 開啟時變成「×」圖示

### 10.5 響應式驗收

- [ ] 360×800：所有區塊無水平捲軸
- [ ] 768×1024：所有區塊無水平捲軸
- [ ] 1440×900：所有區塊無水平捲軸
- [ ] 320×640（極小）：仍可瀏覽，內容不破版
- [ ] iPhone 12 (390×844)：Navbar 顯示漢堡選單
- [ ] iPad (768×1024)：2 欄網格正確顯示
- [ ] Desktop 1440：4 欄網格正確顯示

### 10.6 性能驗收

- [ ] Lighthouse Performance ≥ 80
- [ ] 無 console error
- [ ] 首屏 LCP < 2.5s
- [ ] CLS < 0.1

### 10.7 鍵盤可達性

- [ ] Tab 鍵可依序聚焦所有互動元素
- [ ] 焦點狀態有視覺指示（outline）
- [ ] ESC 可關閉所有開啟的 Modal/Lightbox/Drawer
- [ ] 箭頭鍵可切換 Lightbox 圖片與行程 Tab

### 10.8 內容驗收

- [ ] Hero 標語：「探索千年古都的優雅與感動」（12 字）
- [ ] 4 個區域：嵐山、伏見稻荷、祇園、錦市場
- [ ] 4 個主題：四季之美、神社巡禮、藝伎文化、工藝傳承
- [ ] 6 則小知識（編號 01-06）
- [ ] 行程 3 天：每天 ≤ 4 景點；5 天：每天 ≤ 4 景點

---

## 11. 限制說明

- **圖片生成**：Pigo 自負責（GPT Image 2），本專案不使用 AI 生成新圖
- **後端**：無（純靜態展示）
- **Notion/資料庫**：不整合
- **多語言**：僅繁體中文
- **外部依賴**：僅 Google Fonts CDN（已設定 fallback）
- **時程**：MVP 完成後再迭代

---

## 12. 開發里程碑

1. **M1 架構**：HTML 骨架 + CSS 變數 + JS 模組化載入
2. **M2 首頁**：Navbar + Hero 區塊可顯示
3. **M3 內容**：4 個區域 + 4 個主題卡片 + Modal 互動
4. **M4 行程**：Timeline + Tab 切換
5. **M5 知識**：6 則小知識
6. **M6 圖庫**：Gallery + Lightbox
7. **M7 響應式**：三種裝置測試與調整
8. **M8 驗收**：跑完所有驗收清單，提交 90+ 分評分
