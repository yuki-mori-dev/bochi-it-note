# 環境変数サンプル

Astroでは `PUBLIC_` で始まる環境変数はクライアントに公開されます。

```
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_GSC_VERIFICATION=xxxxxxxxxxxxxxxx
PUBLIC_SKIMLINKS_ID=12345X
PUBLIC_NEWSLETTER_EMBED=<form><!-- Provider embed HTML --></form>
PUBLIC_FORMSPREE_ID=your-formspree-id
```

注意:
- PUBLIC_SKIMLINKS_ID を設定すると、Cookie同意後にSkimlinksスクリプトが動的読込されます。
- PUBLIC_NEWSLETTER_EMBED は提供ベンダの埋め込みHTMLをそのまま設定します（XSSに注意）。

ローカルでは `.env` に上記を記載してください（コミットしないでください）。
