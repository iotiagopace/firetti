# Pendências para validação com o cliente — Site Firetti

Itens de conteúdo produzidos durante o desenvolvimento que precisam de confirmação da Firetti antes da publicação.

## Catálogo (`site/assets/data/catalogo.json`)
- [ ] **15 produtos de amostra** criados com nome fantasia + tipo + ativo (ex.: "Alba Sérum Antiidade com Ácido Hialurônico"). Validar nomes, ativos, embalagens e volumes disponíveis.
- [ ] **Quantidade mínima (MOQ)** por produto/categoria — hoje exibida como "sob consulta". Definir se será publicada.
- [ ] **Faixa de custo por unidade** — não exibida. Definir se será publicada.
- [ ] **Selos** — hoje apenas "Conforme normas Anvisa". Confirmar se há selos adicionais (vegano, cruelty free, sem parabeno) e para quais fórmulas.
- [ ] **Fotos reais dos produtos** — hoje as fichas usam imagem ilustrativa por categoria (mesma imagem repetida). Produção fotográfica recomendada.

## FAQ (`site/faq.html`)
- [ ] 8 perguntas e respostas **redigidas por nós** com base no processo descrito no conteúdo herdado. Validar cada resposta (especialmente: visitas à fábrica, exigência de CNPJ, condução do registro Anvisa).

## Dados institucionais
- [ ] **E-mail institucional** — ainda não definido; não aparece no site.
- [ ] Telefone (17) 3266-1022, WhatsApp (17) 99126-2215, endereço e horários herdados da operação anterior — confirmar pós-transição.
- [ ] Alegações numéricas: **+20 anos**, **+500 fórmulas**, **conformidade Anvisa** — validar documentalmente.
- [ ] **Domínio final** — necessário para canonical, sitemap, robots.txt, OG absoluto e schema.org.

## Imagens
- [ ] Foto aérea da planta (`missao.jpg`) é real, porém em baixa resolução (739×415). Obter original em alta.
- [ ] `hero-cosmeticos.jpg` (herdada) é imagem gerada por IA com rótulos ilegíveis — usada apenas em recorte pequeno. Substituir por foto própria.
- [ ] Descartadas por serem genéricas: `equipe-laboratorio.jpg`, `linha-producao.jpg`.

## Conteúdo removido intencionalmente
- Promessa de "lucro de mais de 200%" (aparecia 2× no conteúdo herdado) — removida conforme briefing.
- Depoimentos, logos de clientes e blog — sem material real; não publicados.

## Políticas
- [ ] **Política de privacidade** e **termos de uso** não existem e precisam ser criados antes da publicação.

## Vídeos (rodada de 29/08/2026)
- [x] Removido `video-institucional.mp4` que veio no pacote de marca: tinha **marca d'água "Veo" visível** (vídeo gerado por IA). Não deve voltar ao site.
- [ ] **`producao.mp4`** (quem-somos) é filmagem **licenciada de banco**, não da planta da Firetti. Está publicado com a legenda "Imagens ilustrativas de envase de cosméticos". Substituir por filmagem própria da planta de Cedral quando houver.
- [x] Texturas (espuma, creme, sérum) usadas como loops decorativos nos cards de categoria da home — são abstratas, sem representar a fábrica, conforme o briefing permite.
- [ ] Confirmar com o cliente se as 4 licenças de vídeo cobrem uso em site institucional.

## Fotos do catálogo — aviso de imagem ilustrativa
- [x] **Todas as imagens do catálogo levam o selo visível "Imagem meramente ilustrativa"** (15 cards, 15 fichas e 3 cards de categoria da home), reforçado no texto `alt`.
  Motivo: as fotos são de banco e **não representam os produtos realmente fabricados pela Firetti**. O selo evita que o visitante entenda a foto como o produto que vai receber.
- [ ] Quando houver ensaio dos produtos reais, remover o selo das fotos substituídas (o texto sai do gerador em `tools/gerar-catalogo.mjs` e de `site/index.html`).

## Fotos do catálogo — consistência visual
- [ ] As 45 fotos vêm de bancos diferentes e têm **fundos inconsistentes** (branco, cinza, rosa, marrom, salmão). Na grade isso quebra a leitura de vitrine.
  Caminhos possíveis, do mais barato ao melhor: (a) recorte de fundo e recomposição sobre um fundo neutro único; (b) nova seleção priorizando fotos de fundo claro; (c) ensaio próprio com um único set. Recomendado (c) junto com as fotos da planta.
