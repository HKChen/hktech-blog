# HKTech 部落格

這是一個使用 [Docusaurus](https://docusaurus.io/) 建立的現代化靜態部落格網站，專注於分享技術與生活的內容。

## ✨ 特色功能

- 🌙 深色主題設計
- 🔍 中文搜尋支援（使用 jieba 分詞）
- 📱 響應式設計
- 🏷️ 標籤分類系統
- 📊 Google Analytics 整合
- ⚡ 使用 Bun 進行快速開發

## 🚀 快速開始

### 環境需求

- Node.js >= 18.0
- [Bun](https://bun.sh/) (推薦的包管理器)

### 安裝依賴

```bash
bun install
```

### 本地開發

```bash
bun run start
# 或者
bun run dev
```

這個指令會啟動本地開發伺服器並自動開啟瀏覽器。大部分的變更都會即時反映，無需重新啟動伺服器。

開發伺服器預設運行在 `http://localhost:3000`

### 建置專案

```bash
bun run build
```

這個指令會產生靜態內容到 `build` 目錄，可以部署到任何靜態網站託管服務。

### 預覽建置結果

```bash
bun run serve
```

在本地預覽建置後的網站。

## 📝 內容管理

### 新增部落格文章

1. 在 `blog/` 目錄下建立新的 Markdown 檔案
2. 使用以下格式的 front matter：

```markdown
---
slug: your-post-slug
title: 文章標題
authors: [hkchen]
tags: [技術, 程式設計]
date: 2024-01-01
---

你的文章內容...
```

### 管理作者資訊

編輯 `blog/authors.yml` 檔案來管理作者資訊。

### 管理標籤

編輯 `blog/tags.yml` 檔案來管理標籤的顯示名稱和描述。

## 🛠️ 開發指令

```bash
# 安裝依賴
bun install

# 啟動開發伺服器
bun run start

# 建置專案
bun run build

# 預覽建置結果
bun run serve

# 清除快取
bun run clear

# 型別檢查
bun run typecheck

# 清除並重新安裝依賴
bun run install:clean

# 產生翻譯檔案
bun run write-translations

# 產生標題 ID
bun run write-heading-ids
```

## 📁 專案結構

```
hktech/
├── blog/                   # 部落格文章
│   ├── authors.yml        # 作者資訊
│   ├── tags.yml          # 標籤定義
│   └── *.md              # 文章檔案
├── src/
│   ├── components/       # React 元件
│   ├── css/             # 樣式檔案
│   ├── pages/           # 靜態頁面
│   └── theme/           # 主題自訂
├── static/              # 靜態資源
├── docusaurus.config.ts # Docusaurus 設定
└── package.json
```

## ⚙️ 設定

主要設定檔案是 `docusaurus.config.ts`，包含：

- 網站基本資訊
- 主題設定
- 外掛程式設定
- 搜尋設定
- Google Analytics 設定