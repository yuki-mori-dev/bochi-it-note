# 環境変数サンプル

Astroでは `PUBLIC_` で始まる環境変数はクライアントに公開されます。

```
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_GSC_VERIFICATION=xxxxxxxxxxxxxxxx
PUBLIC_SKIMLINKS_ID=12345X
PUBLIC_NEWSLETTER_EMBED=<form><!-- Provider embed HTML --></form>
```

ローカルでは `.env` に上記を記載してください（コミットしないでください）。
