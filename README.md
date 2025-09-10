# Bochi IT Note

日本の中小企業向けに「要件適合×SaaS選定」に特化した比較・テンプレ・要件検索サイト。

## クイックスタート
```
npm install
npm run dev
```

## ビルド/デプロイ
- `npm run build` → `dist/`
- GitHub Actions → Pages公開（`public/CNAME` で独自ドメイン）

## 環境変数（任意/GA4）
- `PUBLIC_GA_ID=G-XXXXXXXXXX` を `.env` に記載（`src/layouts/BaseLayout.astro` が自動で読み込み）
- サンプル: `docs/env.example.md`

## データ更新
- 製品: `data/products.json`
- 比較: `data/comparisons.csv` を編集 → `npm run csv:comparisons`
- アフィリ: `data/affiliates.json`

## 変更検知（夜間CI）
- `scripts/check-freshness.mjs` が出典のLast-ModifiedをHEADで確認 → `data/freshness.json`
- ページに「要確認」バッジが自動表示

## ライセンス
- © Bochi IT Note
