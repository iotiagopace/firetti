# STATUS — Site Firetti

Documento de rastreabilidade para auditoria. Atualizado em 2026-08-29 (commit `6fac0dc`).

## 1. Pedidos do usuário (ordem cronológica)

| # | Pedido | Status |
|---|---|---|
| 1 | Analisar o template da pasta `Arquivos base/template` | ✅ Feito — Bioxlab (ThemeForest), 3 homes; Home 01 escolhida |
| 2 | Criar git e enviar para `github.com/iotiagopace/firetti` | ✅ Feito — branch `main`, 3 commits enviados |
| 3 | **Não** usar painel admin / CMS | ✅ Respeitado — site 100% estático, dados em JSON versionado |
| 4 | Substituir toda menção "Biopharcos" por "Firetti" | ✅ Feito — conteúdo veio pré-adaptado no Pacote-Web; `grep` confirma zero ocorrências de Biopharcos/Bioxlab nas páginas |
| 5 | Aplicar o pacote de marca `Firetti-Pacote-Web` (logo, cores, favicons, OGs) | ✅ Feito — paleta `#07375E`/`#59C7B1`/`#137C96` via SCSS; logos SVG; favicons; webmanifest; OGs por página |
| 6 | Usar o template que melhor se encaixa e rebrandizar | ✅ Feito — Bioxlab Home 01; tipografia trocada para Marcellus (afinada ao lettering do logo) |
| 7 | Respeitar skills: `impeccable`, `ui-ux-pro-max`, SEO Google | ⚠️ Parcial — `impeccable` carregada e aplicada (craft-floor, detector, verificação em browser); skill de SEO reservada para a etapa de auditoria; `ui-ux-pro-max` ainda não invocada |
| 8 | Copy sem jargões de IA | ✅ Respeitado em toda a copy produzida |
| 9 | Respeitar histórico dos sites anteriores | ✅ Preferências registradas em memória persistente |
| 10 | Analisar o prompt de briefing (o que usar ou não) | ✅ Feito — stack Next.js descartada (decisão do usuário: template); paleta do prompt descartada (vence a marca oficial); lógica de conversão, IA, modelo de dados, a11y e anti-padrões adotados |
| 11 | Rodada 2: internas 100% Firetti; produzir conteúdo faltante para validação | ✅ Feito — 22 páginas; conteúdo produzido listado em `PENDENCIAS.md` |

## 2. Requisitos do briefing técnico — status

**Adotados e entregues:**
- Objetivo único (orçamento qualificado) com CTA primário único por dobra ✅
- **Lista de orçamento** no lugar de carrinho: `localStorage`, contador no header de todas as páginas, remoção/estado vazio, envio formatado ✅
- **Formulário → WhatsApp** (`wa.me/5517991262215`) com validação inline e `aria` ✅
- **Ficha de produto como configurador** (embalagem, material, volume, decoração, quantidade, requisito especial) ✅
- Padrão de nome "fantasia + tipo + ativo" ✅
- Catálogo em arquivo de dados versionado (`assets/data/catalogo.json`) ✅
- Filtro no cliente com estado na URL (`?categoria=`) ✅
- Arquitetura de informação adaptada (7 páginas núcleo + 15 fichas estáticas) ✅
- Copy: promessa de "lucro 200%" removida; tom técnico-acolhedor ✅
- Anti-padrões: sem slider automático, sem depoimento falso, sem equipe fictícia, sem foto de fábrica genérica, ícones com rótulo, sem emoji em UI ✅
- FAQ de objeção real (8 perguntas) ✅
- Meta tags + OG por página; `alt` descritivo; `lang="pt-BR"` ✅

**Descartados (com justificativa):**
- Stack Next.js/TypeScript/Vercel — usuário decidiu pelo template estático
- Paleta verde-profundo + dourado do prompt — vence a paleta oficial da marca
- Blog — sem conteúdo real; adiado para fase 2
- MOQ/faixa de custo visíveis — dado inexistente; exibido "sob consulta" até o cliente definir

## 3. Etapas de execução (plano do briefing §13)

| Etapa | Status |
|---|---|
| 1. Setup, tokens, tipografia | ✅ Concluída (commit `48ee32d`) |
| 2. Layout: header, footer, navegação | ✅ Concluída |
| 3. Home completa | ✅ Concluída |
| 4. Modelo de dados + produtos de amostra | ✅ Concluída — 15 produtos (commit `6fac0dc`) |
| 5. Catálogo com filtro | ✅ Concluída |
| 6. Configurador de produto | ✅ Concluída |
| 7. Lista de orçamento com persistência | ✅ Concluída |
| 8. Formulário + integração WhatsApp | ✅ Concluída |
| 9. Páginas institucionais | ✅ Concluída |
| 10. Blog | ⏸️ Adiado (fase 2, decisão registrada) |
| **11. Auditoria: SEO técnico, contraste, teclado, Lighthouse, espaçamento simétrico** | 🔜 **← ETAPA ATUAL (próxima a executar)** |

## 4. Débitos conhecidos para a etapa 11 (insumo da auditoria)

- [ ] `sitemap.xml`, `robots.txt`, canonical — **bloqueados pela definição do domínio**
- [ ] JSON-LD (`Organization`, `Product`, `FAQPage`, `BreadcrumbList`)
- [ ] OG com URL absoluta (mesmo bloqueio de domínio; hoje relativa, com `TODO` no código)
- [ ] Skip link para conteúdo principal (briefing §12) — ainda não implementado
- [ ] `prefers-reduced-motion` — animações WOW/AOS ainda não respeitam
- [ ] **Font Awesome Pro** embutido no template — licença paga não transferível; trocar por alternativa livre antes de publicar
- [ ] Peso de página: libs não usadas ainda carregadas (Slick, Isotope, Magnific em páginas sem uso) — corte na etapa de performance
- [ ] Espaçamento vertical simétrico por seção — auditar
- [ ] Foco/teclado no fluxo completo da lista de orçamento — auditar
- [ ] Política de privacidade e termos de uso — não existem
- [ ] Redirect 301 do site antigo (ou reescrita) para evitar conteúdo duplicado

## 5. Pendências de conteúdo (dependem do cliente)

Ver `PENDENCIAS.md` — resumo: e-mail institucional; confirmação de telefone/WhatsApp/endereço/horário; MOQ por categoria; validação dos 15 produtos e do FAQ; selos adicionais; fotos reais (produtos e planta em alta); domínio final.

## 6. Estrutura do repositório

```
Arquivos base/       Insumos (template original, marca, conteúdo) — não publicar
site/                O site (22 páginas HTML + assets)
tools/               Geradores: blocos.mjs, gerar-catalogo.mjs, gerar-paginas.mjs
PRODUCT.md           Contexto de produto (skill impeccable)
PENDENCIAS.md        Itens aguardando validação do cliente
STATUS.md            Este documento
```

Regenerar catálogo/páginas após editar `catalogo.json` ou `tools/`:
`node tools/gerar-catalogo.mjs && node tools/gerar-paginas.mjs`
SCSS: `npx sass --no-source-map site/assets/scss/main.scss site/assets/css/style.css`
