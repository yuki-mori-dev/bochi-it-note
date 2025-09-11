# Technical Overview

最終更新: 2025-09-10

## スタック / 主要ライブラリ
- Astro ^5 / Vite / TypeScript（型は最小限）
- Tailwind v4（`src/styles/global.css`）
- @astrojs/sitemap（自動サイトマップ）

## ディレクトリ構成（抜粋）
- `src/layouts/BaseLayout.astro`: 共通レイアウト（SEO/OG/GA4/GSC/AB/クリック計測/Cookie同意/Skimlinks）
- `src/components/`: `Header` / `Footer` / `Breadcrumb` / `SponsorSlot` / `Newsletter`
- `src/pages/`: 各ページ（Astroのルーティング規約）
  - `products/`（一覧・動的詳細）
  - `compare/`（一覧・動的詳細＋`getStaticPaths`）
  - `alternatives/`（一覧・動的詳細）
  - `tags/`（一覧・動的詳細）
  - `search.astro`（横断検索＋要件フィルタの統合）
  - `templates/`（テンプレ一覧）
  - `tools/requirements.astro`（統合告知＋`/search`へ遷移／noindex）
  - `404.astro`（Not Found）
  - `admin/freshness.astro`（Freshnessレビュー・noindex）
- `data/`: JSON/CSV（静的生成のデータソース）
  - `products.json` / `comparisons.json` / `comparisons.csv` / `affiliates.json` / `templates.json` / `sponsors.json` / `freshness.json`
- `scripts/`: ビルド前処理など
  - `csv-to-comparisons.mjs`: CSV→JSON 変換
  - `check-freshness.mjs`: 出典HEAD/Last-Modifiedチェック→`freshness.json`
  - `validate-data.mjs`: データ整合性チェック（CIで実行）
- `.github/workflows/`: CI（デプロイ/夜間Freshness/リンク検査/データ検証/サイトマップPing）
  - `deploy.yml`: GitHub Pages（push/手動/毎日03:00 JST）
  - `freshness.yml`: 夜間Freshnessチェック
  - `link-check.yml`: リンク切れ検査（Lychee）
  - `validate-data.yml`: データ検証
  - `sitemap-ping.yml`: 検索エンジンPing

## データモデル（簡易）
- product: 要件適合・コンプラ・出典・価格帯
- comparison: A vs B の比較メタ（意図/タグ/更新日）
- template: 販売テンプレ（価格/プラットフォーム/リンク）
- sponsor: スポンサー枠のメタ（表示位置/タグ/有効フラグ）

## ビルド/静的生成
- `npm run build` で完全静的化（`dist/`）
- 動的ルートは `getStaticPaths()` を実装（`products/[slug].astro`, `compare/[slug].astro`, `alternatives/[slug].astro`, `tags/[tag].astro`）
- サイトマップは自動生成

## CI/自動化
- Pagesデプロイ（push/手動/毎日）
- Freshness（夜間）: 出典の更新検知 → ページに「要確認」バッジ表示
- リンク切れ検査（週次/Push）: Lychee（200/30x/429許容、mailto除外）

## 環境変数
- GA4: `PUBLIC_GA_ID=G-XXXXXXXXXX`
- Search Console: `PUBLIC_GSC_VERIFICATION=xxxxxxxxxxxxxxxx`
- Skimlinks: `PUBLIC_SKIMLINKS_ID=12345X`（同意後のみスクリプト読込）
- Newsletter: `PUBLIC_NEWSLETTER_EMBED=<form>...`（プロバイダ埋め込みHTML）
- Contact: `PUBLIC_FORMSPREE_ID=xxxxxxx`（未設定時は案内表示）
- `.env` はコミットしない。例は `docs/env.example.md`

## クリック計測 / ABテスト
- `BaseLayout.astro` に軽量スクリプト
  - `data-track` 属性のクリックを収集（gtagがあれば送信、localStorageにカウント）
  - GA4は `click` と `data-track` 名のカスタムイベントを二重発火（例: `cta_requirements_a`）
  - ホームCTAのAB（A/Bで並び替え）。Variantは `localStorage('ab:home-cta')` と `data-variant` で確認可能

### 主なイベント一覧（例）
- `cta_requirements_a` / `cta_requirements_b`
- `cta_compare_a` / `cta_compare_b`
- `out_affiliate`（製品紹介リンク）
- `out_template`（テンプレ外部購入）
- `sponsor_click`（スポンサー枠）
- `search_query`（検索ページでのクエリ送出: q/hits_* を含む）

## 収益導線
- アフィリエイト: `data/affiliates.json` を参照、`rel="sponsored"` で出力。Skimlinks ID設定時はCookie同意後にネットワークを読み込み、製品詳細の外部リンクはSkimlinks有効時は公式URLを使用（ネットワーク側置換）。
- スポンサー枠: `SponsorSlot.astro`（カテゴリ一致で表示、クリック計測属性付与）
- テンプレ販売: `data/templates.json` に定義→一覧表示（必要に応じ `?ref=bochi-it-note` を付与）

## コーディング規約（要点）
- 命名は意味重視（短縮不可）
- ガード節・浅いネストを優先
- コメントは「なぜ」を短く、冗長避ける
- 変更は関連最小範囲で実施、不要なリファクタをしない

## よく使うコマンド
```
npm run dev            # 開発サーバ
npm run build          # 本番ビルド
npm run csv:comparisons# CSV→JSON 変換
npm run check:freshness# 出典変更検知
```

## 運用チェックリスト（簡易）
- DNS: Apex A 185.199.108/109/110/111.153、HTTPS有効
- Pages: Actions成功、カスタムドメイン/CNAME反映、Enforce HTTPS
- GA4/SC: `.env` 設定済
- CI: freshness/link-check 正常稼働
