# Bochi IT Note

日本の中小企業向けに「要件適合×SaaS選定」に特化した比較・テンプレ・要件検索サイト。

- 事業計画: `docs/business-plan.md`
- 技術概要: `docs/technical.md`
- アーキテクチャ: `docs/architecture.md`
- デザイン/UX: `docs/design.md`
- パフォーマンス/アクセシビリティ: `docs/performance-accessibility.md`
- データ入力規約: `docs/data-guidelines.md`
- SEO方針: `docs/seo-guidelines.md`
- リリースチェックリスト: `docs/release-checklist.md`
- 運用ランブック: `docs/runbook.md`
- セキュリティ/ポリシー: `docs/security.md`
- Contributing: `docs/contributing.md`

## クイックスタート
```
npm install
npm run dev
```

## ビルド/デプロイ
- `npm run build` → `dist/`
- GitHub Actions → Pages公開（`public/CNAME` で独自ドメイン）

## 環境変数（GA4/Search Console/Skimlinks/Newsletter）
- `PUBLIC_GA_ID=G-XXXXXXXXXX`
- `PUBLIC_GSC_VERIFICATION=xxxxxxxxxxxxxxxx`
- `PUBLIC_SKIMLINKS_ID=12345X`（任意・同意時のみ読込）
- `PUBLIC_NEWSLETTER_EMBED=<form>…</form>`（任意・提供側の埋め込み）
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

## 管理/運用
- Freshnessレビュー（noindex）: `/admin/freshness` で要確認の製品を一覧

## CI
- デプロイ: `.github/workflows/deploy.yml`
- Freshness: `.github/workflows/freshness.yml`
- Link Check: `.github/workflows/link-check.yml`
- データ検証: `.github/workflows/validate-data.yml`
- サイトマップPing: `.github/workflows/sitemap-ping.yml`

## Cookie/同意と計測
- Cookie同意バナーを表示。GA4/Skimlinksは同意後のみ動的挿入。
- アフィリエイト/スポンサーリンクは `rel="nofollow noopener sponsored"` を付与。

## ライセンス
- © Bochi IT Note
