# Pacote web Firetti

## Cores oficiais

- Azul: `#07375E`
- Verde: `#59C7B1`
- Teal: `#137C96`
- Branco: `#FFFFFF`

## Uso dos arquivos

- `01-marca/vetores`: versões SVG escaláveis para cabeçalho, rodapé e interfaces.
- `01-marca/png`: versões raster em múltiplas larguras e tamanhos.
- `02-web/favicons`: favicon, Apple Touch Icon, Safari pinned tab e tile Microsoft.
- `02-web/pwa`: ícones convencionais e maskable para web app.
- `03-social-og`: OGs gerais e por página, Twitter Card, perfil e capa.
- `04-conteudo-site`: conteúdo completo em Markdown e JSON, além das mídias originais aproveitáveis.
- `05-guia`: prancha visual da marca.

## Regras rápidas

- Use a versão principal em fundos brancos ou muito claros.
- Em fundo azul `#07375E`, use a versão negativa com o nome branco e o símbolo verde/teal.
- Preserve a proporção e mantenha uma área livre mínima equivalente à altura da gota superior do símbolo.
- Para tamanhos muito pequenos, use apenas o símbolo.
- Não alterar cores, inclinação ou proporções do desenho.

## Implementação mínima no HTML

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#07375E">
<meta property="og:image" content="https://SEU-DOMINIO/og-firetti-1200x630.png">
<meta name="twitter:card" content="summary_large_image">
```
