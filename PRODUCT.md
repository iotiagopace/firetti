# PRODUCT.md — Site Firetti

## O que é
Site institucional da **Firetti**, indústria de terceirização de cosméticos (private label / contract manufacturing) em Cedral/SP. A Firetti assumiu a operação da antiga Biopharcos; todo conteúdo herdado troca a marca antiga por Firetti.

## O que vende
Capacidade fabril: fórmula, envase, rotulagem, regulatório ANVISA e produto pronto para empreendedores que querem lançar a própria marca de cosmético. **Não vende ao consumidor final** — sem carrinho, preço público, checkout ou frete.

## Objetivo único
Gerar solicitação de orçamento qualificada. Fluxo: visitante navega → monta lista de orçamento (catálogo) ou preenche formulário → mensagem formatada via WhatsApp (`wa.me/5517991262215`). CTA primário único por dobra.

## Público
Empreendedor(a) que quer lançar marca própria de cosmético e não tem fábrica, química nem registro ANVISA. Leitor leigo em regulatório — tom técnico e acolhedor, sem jargão e sem infantilizar.

## Números-argumento
+500 fórmulas prontas · +20 anos de operação · conformidade ANVISA. **Nunca** prometer resultado financeiro (ex.: "lucro de 200%" — removido do conteúdo herdado).

## Base técnica (decisão do usuário)
Template HTML estático **Bioxlab** (Home 01) rebrandizado — sem CMS, sem painel admin, sem framework JS. SCSS compilado, JS puro + `localStorage` para a lista de orçamento. Fonte de conteúdo: `Arquivos base/Firetti-Pacote-Web/04-conteudo-site/`.

## Identidade visual
Pacote oficial em `Arquivos base/Firetti-Pacote-Web/`:
- Azul `#07375E` (primária) · Verde `#59C7B1` (secundária) · Teal `#137C96` (apoio) · Branco
- Logo horizontal (primary/negativa/mono) + símbolo; favicons e OGs prontos
- Em fundo azul, usar versão negativa; preservar área livre; nunca alterar cores/proporção do desenho

## Restrições e anti-padrões (briefing)
WCAG 2.1 AA como piso · sem slider automático no hero · ícone sempre com rótulo · sem emoji em interface · sem depoimento genérico de banco · sem foto de fábrica genérica · `alt` descritivo em toda imagem informativa · espaçamento vertical simétrico por seção · copy sem jargão de IA.

## Páginas (fase 1)
Início · Quem somos · Como funciona (Terceirize sua Produção) · Catálogo (3 categorias) · Orçamento (lista + formulário) · Contato. Blog e configurador avançado: fase 2.

## Pendências do cliente
E-mail institucional · confirmação de telefone/WhatsApp/endereço pós-transição · MOQ por categoria · fotos reais da planta de Cedral · domínio final (canonical/sitemap).
