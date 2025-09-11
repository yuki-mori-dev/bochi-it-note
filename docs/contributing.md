# Contributing

## 変更の種類
- データ: `data/products.json` / `data/comparisons.csv` / `data/templates.json` / `data/sponsors.json`
- スクリプト: `scripts/*.mjs`
- ページ/UI: `src/pages` / `src/components` / `src/layouts`

## 手順
1. ブランチを作成（例: `feat/add-comparisons-2025-09`）
2. 変更（比較はCSV→`npm run csv:comparisons`）
3. `npm run build` で生成確認
4. PR作成（変更概要/スクショ/回帰の有無）

## スタイル
- 変数/関数は意味のある命名
- 変更範囲は最小化、無関係な整形は避ける
- 該当リンクには `rel="nofollow noopener sponsored"` を必ず付与
