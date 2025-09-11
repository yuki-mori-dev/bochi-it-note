# 引き継ぎノート（2025-09-11）

## 目的
本ドキュメントは「MVP完成→運用/成長フェーズ」へ円滑に移行するための引き継ぎ資料です。収益導線・計測・ナビ統合・検索体験など、このチャット期間で実装した変更点と運用手順をまとめています。

## 主要な実装変更（ハイライト）
- クロスセル導線の追加: 製品/比較/代替/タグ/カテゴリにテンプレのクロスセルとニュースレターを配置
- テンプレ詳細LP新設: `templates/[slug].astro`（JSON-LD, UTM, サイドCTA, nofollow/noopener/sponsored）
- アフィリのデフォルト回避: Skimlinks未設定時は `default` に落とさず公式URLへ
- スポンサー: リストページにも `SponsorSlot` を追加（タグ/カテゴリ連動）
- UTMの自動付与: テンプレ外部リンクに自動で `utm_source` 等を付与
- AB/計測: ホームCTA AB文言最適化、クリック計測は `click` + カスタムイベント二重発火
- ナビ統合: 「要件検索/検索」を「探す」に統一、ホームCTAも `/search` に変更
- 検索ページ統合: `/search` にキーワード + 要件フィルタを統合（URL同期、直接遷移可）。`/tools/requirements` は統合告知＋自動遷移
- 製品一覧: SSRで初期描画、クライアント絞り込みのみ最小JSで対応

## 環境変数
- `.env`
  - `PUBLIC_GA_ID=G-97G7HCT99G`
  - `PUBLIC_GSC_VERIFICATION=`（任意）
  - `PUBLIC_NEWSLETTER_EMBED=`（任意／提供HTML）
  - `PUBLIC_FORMSPREE_ID=`（任意）
  - `PUBLIC_SKIMLINKS_ID=`（任意）

## GA4 設定（管理画面）
- コンバージョン: `out_template`, `out_affiliate`, `sponsor_click`, `cta_requirements_a/b`, `cta_compare_a/b`, `contact submit`
- カスタム定義（イベントスコープ）: `variant`, `type`, `slug`, `id`, `page`, `href`, `q`, `hits_products`, `hits_comparisons`
- 参照除外（任意）: `gumroad.com`, `booth.pm`, `go.skimresources.com`
- データ保持: 14か月

## 運用CI
- Pagesデプロイ（main）
- 夜間 Freshness チェック（出典変更→要確認バッジ）
- 週次リンクチェック（Lychee）
- サイトマップ Ping

## データ投入手順（収益直結）
- テンプレ追加: `data/templates.json` にレコード追記（自動で一覧/詳細/クロスセルへ反映）
- アフィリ拡充: `data/affiliates.json` に紹介URL追加（Skimlinks未設定でも有効）
- スポンサー: `data/sponsors.json` の `active/tags/position` を更新
- 比較CSV: `data/comparisons.csv` 追加 → `npm run csv:comparisons`

## 既知の課題（次チャットでのTODO）
- 「探す」ページのイベント未登録が残る環境がある
  - 対策案: イベント委譲（`document` でのclick/input捕捉）に変更、`defer`化の確認、HMR時の再初期化ガード
- ボタンの見た目が環境によってdisable風に見える
  - 対策案: コンポーネント化して `cursor-pointer bg-white text-gray-900` を強制、フォーカス/hoverの視認性改善
- 比較のフィルタ仕様（両製品一致 or 片方一致）を設定で選択可能に
- GA4 探索レポート（ダッシュボード）整備

## テスト手順（最短）
1) `.env` に `PUBLIC_GA_ID` を設定 → dev起動
2) ホームCTAでA/Bの文言を確認（順序/`data-track` が変わる）
3) `/search` でキーワードと各フィルタを試す（URLに反映）
4) 製品詳細の「紹介リンク」で `out_affiliate`、テンプレ「購入」で `out_template`
5) クリアで初期化→一覧に戻る

## 変更ファイル（主要）
- `src/pages/search.astro`（統合検索）
- `src/pages/tools/requirements.astro`（統合リダイレクト）
- `src/components/CrossSellTemplates.astro`（クロスセル/UTM）
- `src/pages/products/[slug].astro` / `src/pages/compare/[slug].astro`（開示/ラベル/ニュースレター）
- `src/pages/templates/[slug].astro` / `src/pages/templates/index.astro`（LP/JSON-LD/UTM）
- `src/components/Header.astro`（ナビ統合）
- `src/pages/products/index.astro`（SSR初期描画）
- `src/layouts/BaseLayout.astro`（計測/同意/AB/Skimlinks）

## 連絡事項
- 追加実装は `feat/*` ブランチ→squash でmainにまとめると履歴がシンプルに保てます。
- 問い合わせ/スポンサー導線は `mediakit` と `contact` を利用。

---
以上をもって、このチャットの作業は一区切りです。次のチャットでは「探す」のイベント委譲対応と、GA4レポート整備から進めるのがスムーズです。
