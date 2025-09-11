# トラブルシュート

## 「探す」で検索/クリアが反応しない
- ハードリロード（Cmd+Shift+R）
- ブラウザコンソールでエラー確認（貼り付けてください）
- 対応策（次チャット）: イベント委譲へ移行（documentでclick/input捕捉）、`defer` 明示

## 製品一覧が空
- `/products/` へ直接アクセス（SSRで初期描画されます）
- フィルタ入力で非表示になっていないか確認

## GA4ヒットが出ない
- Cookie同意が「許可」になっているか（フッターの「Cookie設定」で再表示→同意）
- `.env` の `PUBLIC_GA_ID` を確認（本番にも設定）

## UTMが付かない
- テンプレ外部リンクのURLに `utm_*` が付与されます。付かない場合は `CrossSellTemplates.astro` / `templates/index.astro` / `templates/[slug].astro` を確認

## Skimlinksが動かない
- `.env` に `PUBLIC_SKIMLINKS_ID` を設定し、Cookie同意後に再読み込み
