# アーキテクチャ概要

最終更新: 2025-09-11（検索統合を反映）

## システム全体像
- Astroで完全静的サイトを生成（SSG）。
- データは `data/*.json`（一部 `comparisons.csv` → 変換）を参照。
- ページはAstroのファイルベースルーティングに準拠。

## 主要コンポーネント
- レイアウト: `src/layouts/BaseLayout.astro`
  - SEO/OG/Canonical、GA4、Search Console検証メタ、Cookie同意、Skimlinks動的挿入、AB・クリック計測、パンくず挿入用slot。
- コンポーネント: `Header` / `Footer` / `Breadcrumb` / `SponsorSlot`。
- ページ:
  - `products/`（一覧・動的詳細）
  - `compare/`（一覧・動的詳細）
  - `alternatives/`（一覧・動的詳細）
  - `tags/`（一覧・動的詳細）
  - `search.astro`（横断検索＋要件フィルタの統合）
  - `templates/`（テンプレ一覧）
  - `tools/requirements.astro`（統合告知＋`/search`へ遷移／noindex）
  - `404.astro`
  - `admin/freshness.astro`（管理用、noindex）

## データフロー
1) CSV→JSON 変換
   - 入力: `data/comparisons.csv`
   - 変換: `scripts/csv-to-comparisons.mjs` → `data/comparisons.json`
2) 出典更新検知（夜間）
   - 入力: `data/products.json` の `sources[].url`
   - HEADで `Last-Modified`/`ETag` 取得 → `data/freshness.json`
   - ページで `needsReview` を表示

## ルーティングとSSG
- 動的ルートで `getStaticPaths()` を実装:
  - `products/[slug].astro`
  - `compare/[slug].astro`
  - `alternatives/[slug].astro`
  - `tags/[tag].astro`
- ビルド: `npm run build` → `dist/`（GitHub Pages公開）

## CI / パイプライン
- デプロイ: `.github/workflows/deploy.yml`（main push / 手動 / 毎日03:00 JST）
- Freshness: `.github/workflows/freshness.yml`（夜間）
- Link Check: `.github/workflows/link-check.yml`（週次/月曜・push）

## 環境変数と設定
- GA4: `PUBLIC_GA_ID`（存在時のみタグ挿入）
- Search Console: `PUBLIC_GSC_VERIFICATION`（存在時のみメタ挿入）

## セキュリティ/収益導線
- アフィリエイト/スポンサーリンクは `rel="nofollow noopener sponsored"`。
- スポンサー枠は `data/sponsors.json` で制御し、カテゴリに応じて表示。

## 今後の拡張ポイント
- Micro SaaS連携（PDF生成/保存/権限）
- 監視（IndexNow/CLS/速度）、キャッシュ最適化（CDN指向）
