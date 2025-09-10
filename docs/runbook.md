# 運用ランブック（Runbook）

最終更新: 2025-09-10

## 月次（<2時間）
1. Freshnessダッシュボード確認（今は `data/freshness.json` 参照）→ 要確認のページを承認/更新
2. `data/comparisons.csv` に比較を5–20本追加 → `npm run csv:comparisons` → push
3. `data/products.json` を5–10件追加/更新
4. スポンサー/テンプレの在庫/価格/リンク確認（`data/sponsors.json` / `data/templates.json`）
5. GA4/クリック計測のトレンド確認、CTA文言を必要に応じて更新

## 週次
- Link Checkワークフロー結果の確認（404/301過多の検知）
- GSCカバレッジ/インデックス状況チェック

## トラブルシュート
- デプロイ失敗: Actionsの`deploy.yml`ログ → Pages設定 "GitHub Actions" / 権限 read&write / CNAME競合確認
- ドメイン/HTTPS: DNS A 185.199.108/109/110/111.153、Enforce HTTPS ON（証明書待ち数分〜数十分）
- 404増加: 内部リンク/サイトマップを確認、リンク切れCIの除外パターン追加
