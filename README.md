# Bochi IT Note

日本の中小企業向けに「要件適合×SaaS選定」に特化した比較・テンプレ・要件検索サイト。

- 事業計画: `docs/business-plan.md`
- 技術概要: `docs/technical.md`

## クイックスタート
```
npm install
npm run dev
```

## ビルド/デプロイ
- `npm run build` → `dist/`
- GitHub Actions → Pages公開（`public/CNAME` で独自ドメイン）

## 環境変数（GA4/Search Console）
- `PUBLIC_GA_ID=G-XXXXXXXXXX`
- `PUBLIC_GSC_VERIFICATION=xxxxxxxxxxxxxxxx`
- サンプル: `docs/env.example.md`

## データ更新
- 製品: `data/products.json`
- 比較: `data/comparisons.csv` を編集 → `npm run csv:comparisons`
- アフィリ: `data/affiliates.json`
- スポンサー: `data/sponsors.json`
- テンプレ: `data/templates.json`

## 変更検知（夜間CI）
- `scripts/check-freshness.mjs` が出典のLast-ModifiedをHEADで確認 → `data/freshness.json`
- ページに「要確認」バッジが自動表示

## ライセンス
- © Bochi IT Note
