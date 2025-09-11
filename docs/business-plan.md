# Bochi IT Note ビジネスプラン（v1.1）

最終更新: 2025-09-10（Skimlinks/Newsletter/Cookie同意/管理画面/CI追記）

## 1. 背景 / 課題認識
- 日本の中小企業・個人開発者では、IT投資の意思決定において「要件（電帳法・個情法・ISMS/プライバシー・監査ログ・SSO/SCIM・IP制限・データ所在）」の確認がボトルネック。
- 既存のレビュー/比較は主観や機能列挙が中心で、法的・ガバナンス要件の網羅性と出典が弱い。
- 内製人材/ひとり情シスの稼働は限られ、手戻り低減・再利用性の高いテンプレ/自動生成が求められる。

## 2. 目標 / コンセプト
- 「要件→製品」の逆引きで最短選定。日本ローカル要件の適合状況を構造化し、出典・最終確認日を明示。
- 実務テンプレ（稟議/RFP/セキュリティチェック/SLA/BCP等）とAI支援で資料作成コストを最小化。
- ほったらかし運用（月2時間以内）を前提に、変更検知/自動ビルド/計測を仕組み化。

## 3. ターゲット
- ひとり情シス/兼任IT担当、中小企業オーナー、フリーランスPM・エンジニア、個人開発者。

## 4. 提供価値（Value Proposition）
- 要件適合マトリクス（Products×Controls）: SSO/SCIM、IP制限、監査ログ、保持期間、データ所在(JP/EU/US/Multiple) 等を一覧・検索。
- プログラマティックSEO型の比較/代替ページ（少量高品質・差分強調・出典/改訂履歴）。
- 和文の実務テンプレ＋AI自動生成（下書き→ルール検証→要点チェック）。

## 5. 差別化
- 日本要件対応に特化し、一次情報（公式Doc/約款）への出典・最終確認日・変更検知を徹底。
- 主観レビュー排除。要件適合・契約/運用観点の事実に限定。
- 「要件→製品」逆引き体験とPDF化/稟議添付に直結するアウトプット（将来Micro SaaS）。

## 6. 収益モデル
- 短期（0–90日）
  - アフィリエイト（SaaS/クラウド/監視/バックアップ/IDaaS等、包括型ネットワーク優先）。
  - デジタルテンプレ販売（Notion/Excel/PDF、¥980–¥3,980）。
- 中期（3–9か月）
  - Micro SaaS（月¥980前後）: 要件評価票/比較表の自動生成・PDF化・保存/履歴・共同編集。
  - スポンサー枠/記事（E-E-A-T確立後、ジャンル限定で健全化）。
- 広告は流入安定後に導入（RPM ¥300–¥1,200）。

## 7. KPI 目標レンジ
- 90日: セッション 1–3万 / アフィリCV 30–80 / テンプレ販売 20–60。
- 180日: セッション 5–10万 / アフィリCV 120–250 / テンプレ販売 80–150 / MRR 50–150。
- 運用負荷: 月2時間以内。

## 8. ロードマップ
- 0–4週: データモデル確定、製品50件、比較150件、テンプレ4点、要件検索初版、ポリシー整備。
- 5–8週: 製品100件、比較350–500件、変更検知雛形、アフィリ導線ABテスト、スポンサー枠β。
- 3か月: 製品150件、比較700件、PDF出力ベータ、スポンサー営業資料。

## 9. SEO / E-E-A-T / 情報設計
- 構造化データ: SoftwareApplication（製品）、Article（比較）、BreadcrumbList（パンくず）。
- 内部リンク: 要件→カテゴリ→製品→比較→代替（Alternatives）/タグ。関連比較/製品の自動表示。
- 重複回避: 比較は差分中心、canonical管理、クラスター化。
- E-E-A-T: 著者/編集方針/免責/出典規約/改訂履歴を明示。

## 10. リスクと対策
- アルゴ変動: E-E-A-T/出典/改訂履歴/独自データで耐性、検索以外の導線も薄く確保。
- データ鮮度: 変更検知→「要確認」バッジ→定期承認運用。
- アフィリ審査/停止: 包括ネットワーク→個別高単価へ段階移行、代替リンク常備。
- 法務/商標: 比較表記の公正性、ロゴ/商標の利用注意、個情法/クッキー同意の遵守。

## 11. プロダクト構成（MVP→拡張）
- 実装済みMVP（2025-09-10）
  - ページ:
    - トップ、製品（一覧/詳細）、比較（一覧/詳細＋getStaticPaths）
    - 代替（Alternatives）一覧/詳細、タグ一覧/詳細
    - 要件検索（チェックボックス＋セレクト）、カテゴリ（一覧/詳細）
    - テンプレート販売一覧、検索ページ、404、ポリシー各種
    - パンくずUI（BreadcrumbList構造化データ）
  - データ: `products.json` / `comparisons.json` / `comparisons.csv` / `affiliates.json` / `freshness.json` / `templates.json` / `sponsors.json`
  - 自動化/CI:
    - 変更検知スクリプト（HEAD/Last-Modified）＋夜間CI（`freshness.json`生成）
    - GitHub Pages CI（Actions）＋CNAME
    - 週次/Pushのリンク切れ検査CI（Lychee）
  - 計測/最適化:
    - GA4（環境変数）・クリック計測（CTA/アフィリ/スポンサー）
    - ホームCTAの簡易ABテスト（ローカル割当/計測）
  - 収益導線:
    - アフィリエイト導線（`rel="nofollow noopener sponsored"`）。Skimlinks ID設定でON（Cookie同意後に動的挿入）。
    - スポンサー枠（カテゴリ合致で表示、計測属性付与）
    - ニュースレター導線（フッター/トップ、任意の埋め込み）
- 近未来拡張
  - 要件フィルタの拡充（保持期間/権限粒度/2要素詳細/SCIM範囲）。
  - Micro SaaS: 要件評価票/比較表のPDF化・保存・履歴・権限。
  - 監視: 404/リンク切れ検知、IndexNow通知、速度/CLS監視。

## 12. 運用（ほったらかし設計）
- 月1回/2時間以内で実施
  - 新規SaaSのCSV/JSON追加（5–10件）。
  - 「要確認」リストの承認（ボタン反映）。
  - テンプレ価格調整/キャンペーンON/OFF、スポンサー入替。
- 自動: 夜間ビルド/変更検知/リンク検査/サイトマップ/計測。

## 13. データスキーマ（抜粋）
- product
  - `slug`, `name`, `vendor`, `category[]`, `website`
  - `features`: `sso`, `scim`, `ipAllowlist`, `mfa`, `auditLog`(basic/advanced), `dataResidency`(jp/eu/us/multiple), `retentionDays`, `rolesGranularity`
  - `compliance`: `iso27001`, `soc2`, `isms`, `privacyMark`, `electronicBookAct`
  - `sources[]`: `title`, `url`, `checked_at`; `last_verified`
- comparison
  - `slug`, `title`, `productA`, `productB`, `summary`, `tags[]`, `last_updated`
- template
  - `slug`, `title`, `description`, `priceJPY`, `platform`, `url`, `includes[]`, `last_updated`
- sponsor
  - `id`, `title`, `text`, `url`, `tags[]`, `position[]`, `active`

## 14. オペレーション / 作業手順
- 比較量産: `data/comparisons.csv` を編集 → `npm run csv:comparisons` → push。
- 製品追加: `data/products.json` にレコード追加（`features.dataResidency` は `jp|eu|us|multiple`）。
- テンプレ更新: `data/templates.json` にレコード追加/修正。
- スポンサー差替: `data/sponsors.json` の `active/tags/position/url` を更新。
- デプロイ: mainへpushでGitHub Actions→Pages公開。DNSはApex Aレコード（185.199.108/109/110/111.153）。サイトマップPing/Link Check/データ検証/夜間FreshnessはCIで自動化。

## 15. 計測 / 最適化
- GA4導入: `.env` に `PUBLIC_GA_ID=G-XXXXXXXXXX` を設定（`BaseLayout.astro`が自動挿入）。
- クリック計測: 主要リンクに `data-track` を付与済（CTA/アフィリ/スポンサー）。
- ABテスト: ホームCTA（並び替えB）をローカル割当/イベント送出で軽量に検証。
- Search Console: `.env` に `PUBLIC_GSC_VERIFICATION=xxxx` を設定（検証メタ自動挿入）。

## 16. 法務 / ポリシー
- 公正な比較表現、商標/ロゴ使用の注意。
- 免責事項・編集方針・プライバシー・アフィリエイト/スポンサー表記をサイトに明示（実装済）。
- アフィリエイト/スポンサーリンクは `rel="nofollow noopener sponsored"` を付与。

## 17. 将来の展望
- Micro SaaSの本格提供（保存/権限/共同編集、PDF/Docx出力、テンプレ統合）。
- スポンサー/記事広告（E-E-A-Tが成立後）。
- Slack/Teams連携でRFP/稟議ドラフト自動生成。
- 海外リージョン要件（GDPR/CCPA/オーストラリアPrivacy Act等）への拡張。

## 18. 環境変数 / 設定
- `.env`（コミットしない）
  - `PUBLIC_GA_ID=G-XXXXXXXXXX`
  - `PUBLIC_GSC_VERIFICATION=xxxxxxxxxxxxxxxx`
- 例: `docs/env.example.md`

## 19. CI / 自動化
- Pagesデプロイ: main push / 手動 / 毎日03:00 JST
- 夜間Freshnessチェック: HEADでLast-Modified確認→`data/freshness.json`
- 週次/Pushのリンク切れ検査: Lychee Action（`200/30x/429` 許容、`mailto:`除外）

---
付録: 重要URL
- サイト: [https://bochi-it-note.com](https://bochi-it-note.com)
- サイトマップ: [https://bochi-it-note.com/sitemap-index.xml](https://bochi-it-note.com/sitemap-index.xml)
- リポジトリ: [https://github.com/yuki-mori-dev/bochi-it-note](https://github.com/yuki-mori-dev/bochi-it-note)
