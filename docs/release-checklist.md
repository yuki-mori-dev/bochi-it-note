# リリースチェックリスト

最終更新: 2025-09-10

## 事前確認
- [ ] ビルド成功（`npm run build`）
- [ ] Freshness/Link Check CIがグリーン
- [ ] 重要ページのメタ（タイトル/説明/OG）確認
- [ ] サイトマップに新規ページが含まれる
- [ ] 内部リンク/パンくずの整合

## 設定
- [ ] GA4 ID 設定（必要時）
- [ ] Search Console 検証メタ設定（必要時）
- [ ] CNAME/HTTPS有効化（Pages設定）

## データ
- [ ] products.json のバリデーション
- [ ] comparisons.csv → 変換済み
- [ ] sponsors/templates のリンク/価格確認

## 投入後
- [ ] GSCカバレッジ、手動Fetch
- [ ] 重要クエリの順位/流入をモニタ
- [ ] クリック計測（CTA/アフィリ/スポンサー）の変化確認
