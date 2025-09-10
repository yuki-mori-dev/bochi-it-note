# データ入力規約（JSON/CSV）

最終更新: 2025-09-10

## 共通
- 文字コードはUTF-8、改行はLF
- URLはhttpsを推奨、末尾スラッシュの有無は揃える（可能なら無し）
- 日付は `YYYY-MM-DD`

## products.json
必須:
- `slug`（英小文字/数字/ハイフン）
- `name`, `vendor`, `website`
- `category[]`（先頭大文字: 例 `DevOps`, `Hosting`, `Identity`, `Communication`, `Productivity`, `Docs`）
- `features`
  - `sso`/`scim`/`ipAllowlist`/`mfa`: boolean
  - `auditLog`: `basic` | `advanced`
  - `dataResidency`: `jp` | `eu` | `us` | `multiple`
  - `retentionDays`: number|null
  - `rolesGranularity`: `basic` | `fine`
- `compliance`
  - `iso27001`/`soc2`/`isms`/`privacyMark`: boolean
  - `electronicBookAct`: `supported` | `partial` | `unknown`
- `sources[]`
  - `title`, `url`, `checked_at`
- `last_verified`

注意:
- `sources[].url` は一次情報（公式Doc/約款/セキュリティページ）を優先
- 値が不明な場合は `null` や `unknown` を使用し、推測値は入れない

## comparisons.csv
ヘッダ:
```
slug,title,productA,productB,summary,tags,last_updated
```
規約:
- `slug`: `a-vs-b` 形式（製品slugで作成）
- `productA`/`productB`: `products.json` の `slug` に一致
- `tags`: `|` 区切り（例: `DevOps|Hosting`）
- `last_updated`: 空欄可（変換時に当日で補完）

## templates.json / sponsors.json
- `priceJPY`: 数値（税抜/税込の扱いは表記で明確に）
- スポンサーリンク/アフィリエイトリンクは `rel="sponsored"` を付与する

## 変更検知の出典URL
- 可能なら `Last-Modified`/`ETag` を返すURLを選ぶ
- リダイレクトが多いURLは避ける

## バリデーションのヒント
- 変換/ビルド前にJSONの構文と列名を確認
- `product.slug` が重複しないことを確認
- 比較CSVの `productA`/`productB` が存在することを確認
