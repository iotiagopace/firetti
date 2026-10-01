#!/usr/bin/env node
/**
 * Gera as páginas estáticas do catálogo Firetti a partir de assets/data/catalogo.json:
 *  - injeta a grade em catalogo.html (entre os marcadores CATALOGO:INICIO/FIM), agrupada por linha
 *  - cria produto-<slug>.html para cada produto
 *  - cria produto-sob-medida.html (o "OUTRO" da lista do cliente)
 * Uso: node tools/gerar-catalogo.mjs
 */
import { readFileSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { head, header, breadcrumb, rodape } from './blocos.mjs';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const dados = JSON.parse(readFileSync(resolve(RAIZ, 'assets/data/catalogo.json'), 'utf8'));
const SUB = dados.subcategorias;

const MATERIAIS = { plastico: 'Plástico', vidro: 'Vidro', aluminio: 'Alumínio' };
const DECORACAO = { impressao: 'Impressão na embalagem', rotulo: 'Rótulo adesivo', nenhuma: 'Sem decoração' };
const OG = 'assets/img/og/og-linha-produtos-1200x630.png';
const BG = 'assets/img/conteudo/linha-produtos.jpg';

const opcoesDe = (p) => p.opcoes || SUB[p.subcategoria].opcoes;

// Cada linha usa um conjunto de 3 fotos ilustrativas; a foto de capa gira entre os
// produtos que dividem o mesmo conjunto, para a grade não repetir a mesma imagem.
// "fotos" aceita o nome de um conjunto (shampoo -> shampoo-01..03) ou uma lista explícita.
const usoPorConjunto = {};
for (const p of dados.produtos) {
  const conjunto = p.fotos || SUB[p.subcategoria].fotos;
  const nomes = Array.isArray(conjunto) ? conjunto : [1, 2, 3].map((n) => `${conjunto}-0${n}`);
  const chave = nomes.join('|');
  const inicio = (usoPorConjunto[chave] = (usoPorConjunto[chave] ?? -1) + 1) % nomes.length;
  const fotos = nomes.map((nome) => `assets/img/catalogo/${nome}.webp`);
  p.imagens = [...fotos.slice(inicio), ...fotos.slice(0, inicio)];
}

/* ---------- grade do catálogo ---------- */

const cardProduto = (p, atraso) => {
  const sub = SUB[p.subcategoria];
  const slides = p.imagens
    .map(
      (src, i) => `                                    <li class="firetti-carrossel__slide">
                                       <img src="${src}" alt="${i === 0 ? `Imagem meramente ilustrativa: ${p.nome}` : ''}" loading="lazy" decoding="async" width="440" height="550">
                                    </li>`
    )
    .join('\n');
  const pontos = p.imagens
    .map(
      (_, i) => `                                    <button type="button" class="firetti-carrossel__ponto${i === 0 ? ' ativo' : ''}" data-indice="${i}" aria-label="Ver foto ${i + 1} de ${p.imagens.length}"></button>`
    )
    .join('\n');
  const ativos = p.ativos ? `\n                                 <ul class="firetti-produto-card__ativos">${p.ativos.map((a) => `<li>${a}</li>`).join('')}</ul>` : '';

  return `
                        <div class="col-xl-4 col-lg-6 col-md-6">
                           <article class="firetti-produto-card mb-30 wow fadeInUp" data-wow-delay=".${atraso}s">
                              <div class="firetti-carrossel" data-total="${p.imagens.length}">
                                 <span class="firetti-selo-ilustrativa">Imagem meramente ilustrativa</span>
                                 <ul class="firetti-carrossel__trilha">
${slides}
                                 </ul>
                                 <button type="button" class="firetti-carrossel__seta anterior" aria-label="Foto anterior"><i class="fal fa-angle-left" aria-hidden="true"></i></button>
                                 <button type="button" class="firetti-carrossel__seta proxima" aria-label="Próxima foto"><i class="fal fa-angle-right" aria-hidden="true"></i></button>
                                 <div class="firetti-carrossel__pontos">
${pontos}
                                 </div>
                              </div>
                              <div class="firetti-produto-card__body">
                                 <span class="firetti-produto-card__sub">${sub.nome}</span>
                                 <h3 class="firetti-produto-card__titulo"><a href="produto-${p.slug}.html">${p.nome}</a></h3>
                                 <p class="firetti-produto-card__resumo">${p.resumo}</p>${ativos}
                                 <div class="firetti-produto-card__acoes">
                                    <button type="button" class="firetti-add-btn js-adicionar-rapido" data-slug="${p.slug}" data-nome="${p.nome}"><i class="fal fa-plus" aria-hidden="true"></i> Adicionar à lista</button>
                                    <a class="firetti-produto-card__link" href="produto-${p.slug}.html">Configurar<i class="fal fa-arrow-right" aria-hidden="true"></i></a>
                                 </div>
                              </div>
                           </article>
                        </div>`;
};

// O "OUTRO" de cada linha na lista do cliente vira um pedido de fórmula sob medida.
const cardSobMedida = (chave, sub) => `
                        <div class="col-xl-4 col-lg-6 col-md-6">
                           <a class="firetti-sob-medida mb-30" href="produto-sob-medida.html?tipo=${chave}">
                              <span class="firetti-sob-medida__icone" aria-hidden="true"><i class="fal fa-flask"></i></span>
                              <span class="firetti-sob-medida__titulo">Outro ${sub.singular}</span>
                              <span class="firetti-sob-medida__texto">Não encontrou o que procura nesta linha? Descreva a ideia e o nosso time desenvolve a fórmula para a sua marca.</span>
                              <span class="firetti-sob-medida__cta">Pedir ${sub.singular} sob medida<i class="fal fa-arrow-right" aria-hidden="true"></i></span>
                           </a>
                        </div>`;

let atraso = 0;
const grupos = Object.entries(SUB)
  .map(([chave, sub]) => {
    const itens = dados.produtos.filter((p) => p.subcategoria === chave);
    const qtd = itens.length === 1 ? '1 produto' : `${itens.length} produtos`;
    const cards = itens.map((p) => cardProduto(p, ((atraso++) % 4) + 2)).join('\n');
    return `
                  <div class="col-12 firetti-grupo" data-categoria="${sub.categoria}" id="linha-${chave}">
                     <div class="firetti-grupo__topo">
                        <h2 class="firetti-grupo__titulo">${sub.nome}</h2>
                        <span class="firetti-grupo__qtd">${qtd}</span>
                     </div>
                     <div class="row">
${cards}${sub.semSobMedida ? '' : '\n' + cardSobMedida(chave, sub)}
                     </div>
                  </div>`;
  })
  .join('\n');

const catalogoPath = resolve(RAIZ, 'catalogo.html');
let catalogoHtml = readFileSync(catalogoPath, 'utf8');
catalogoHtml = catalogoHtml
  .replace(/(<!-- CATALOGO:INICIO -->)[\s\S]*(<!-- CATALOGO:FIM -->)/, `$1\n${grupos}\n                  $2`)
  .replace(/(<!-- HEADER:INICIO -->)[\s\S]*(<!-- HEADER:FIM -->)/, `$1${header('catalogo')}      $2`)
  .replace(/<!-- BREADCRUMB -->/, breadcrumb('Linha de produtos', '<a href="index.html">Início</a> : Catálogo', BG))
  .replace(
    /(<!-- FOOTER:INICIO -->)[\s\S]*(<!-- FOOTER:FIM -->)[\s\S]*$/,
    rodape().replace('      <!-- footer-area -->', '      <!-- FOOTER:INICIO -->\n      <!-- footer-area -->').replace('      <!-- footer-area-end -->', '      <!-- footer-area-end -->\n      <!-- FOOTER:FIM -->')
  );
writeFileSync(catalogoPath, catalogoHtml);
console.log(`catalogo.html: ${dados.produtos.length} produtos em ${Object.keys(SUB).length} linhas`);

/* ---------- páginas de produto ---------- */

// Remove fichas de produtos que saíram do catálogo, para não ficarem publicadas.
const validas = new Set([...dados.produtos.map((p) => `produto-${p.slug}.html`), 'produto-sob-medida.html']);
for (const arq of readdirSync(RAIZ)) {
  if (/^produto-.*\.html$/.test(arq) && !validas.has(arq)) {
    unlinkSync(resolve(RAIZ, arq));
    console.log(`removida: ${arq}`);
  }
}

const campoSelect = (nomeCampo, rotulo, opcoes, mapa) => `
                              <div class="firetti-config__campo">
                                 <label for="cfg-${nomeCampo}">${rotulo}</label>
                                 <select id="cfg-${nomeCampo}" name="${nomeCampo}">
${opcoes.map((o) => `                                    <option value="${o}">${(mapa && mapa[o]) || o}</option>`).join('\n')}
                                 </select>
                              </div>`;

const camposComuns = `
                              <div class="firetti-config__campo">
                                 <label for="cfg-quantidade">Quantidade desejada</label>
                                 <input type="number" id="cfg-quantidade" name="quantidade" min="1" placeholder="Ex.: 1000">
                              </div>`;

const botoesConfigurador = `
                              <div class="product-button">
                                 <button type="submit" class="tp-btn mr-20">Adicionar à lista de orçamento</button>
                                 <a href="orcamento.html" class="tp-btn-second">Ver minha lista</a>
                              </div>
                              <p class="firetti-form-error" role="alert" hidden>Preencha os campos obrigatórios antes de adicionar.</p>
                              <p class="firetti-add-feedback" role="status" hidden>Produto adicionado à sua lista de orçamento.</p>`;

const abaOrcamento = `
                              <div class="tab-pane fade" id="painel-como" role="tabpanel" aria-labelledby="aba-como">
                                 <p class="mb-30">Adicione à lista os produtos que deseja para a sua linha, com embalagem, volume e quantidade. Ao finalizar, envie a lista pelo formulário de orçamento: ela chega formatada ao nosso time comercial pelo WhatsApp, e retornamos com valores, quantidade mínima e prazos.</p>
                                 <p>Prefere conversar antes? Fale com a gente pelo telefone <a href="tel:+551732661022">(17) 3266-1022</a> ou <a href="https://wa.me/5517991262215" target="_blank" rel="noopener">WhatsApp</a>.</p>
                              </div>`;

const selos = dados.selos
  .map((s) => `<span><i class="fa-light fa-badge-check" aria-hidden="true"></i>${s}</span>`)
  .join('\n                                 ');

for (const p of dados.produtos) {
  const sub = SUB[p.subcategoria];
  const op = opcoesDe(p);
  const trilha = `<a href="catalogo.html">Catálogo</a> : <a href="catalogo.html?categoria=${sub.categoria}#linha-${p.subcategoria}">${sub.nome}</a>`;

  const campoAtivo = p.especificarAtivo
    ? `
                              <div class="firetti-config__campo">
                                 <label for="cfg-ativo">Ativo desejado</label>
                                 <input type="text" id="cfg-ativo" name="ativo" required placeholder="Informe o ativo que a sua marca procura">
                              </div>`
    : '';

  const ativosHtml = p.ativos
    ? `<p class="mb-20"><strong>Ativos de destaque:</strong> ${p.ativos.join(', ')}.</p>\n                                 `
    : '';
  const notaAnvisa = p.regulado ? `\n                                 <p class="mt-20">${dados.anvisaNota}</p>` : '';

  const pagina = `${head(`${p.nome} | Firetti`, p.resumo, OG)}
${header('catalogo')}

      <!-- main-area -->
      <main id="conteudo-principal">
${breadcrumb(sub.nome, trilha, BG, 'div')}
         <!-- produto-area -->
         <section class="shop-area pt-120 pb-70">
            <div class="container">
               <div class="row">
                  <div class="col-lg-6 col-md-6">
                     <div class="productthumb mb-20">
                        <span class="firetti-selo-ilustrativa">Imagem meramente ilustrativa</span>
                        <img id="foto-produto" src="${p.imagens[0]}" alt="Imagem meramente ilustrativa: ${p.nome}">
                     </div>
                     <div class="firetti-galeria mb-40" role="group" aria-label="Fotos do produto">
${p.imagens.map((im, i) => `                        <button type="button" class="firetti-galeria__thumb${i === 0 ? ' ativo' : ''}" data-img="${im}" aria-label="Ver foto ${i + 1} de ${p.imagens.length}"><img src="${im}" alt="" loading="lazy" width="96" height="96"></button>`).join('\n')}
                     </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                     <div class="product mb-40 ml-20">
                        <div class="product__details-content mb-40">
                           <span class="firetti-produto-card__eyebrow">${sub.nome} · ${dados.categorias[sub.categoria]}</span>
                           <h1 class="product-dtitle mb-20">${p.nome}</h1>
                           <p>${p.resumo}</p>
                           <p class="firetti-produto-card__moq mt-15">Quantidade mínima e custo por unidade: sob consulta no orçamento.</p>
                           <div class="firetti-selos mt-20 mb-30">
                                 ${selos}
                           </div>
                           <form class="js-configurador" data-slug="${p.slug}" data-nome="${p.nome}" action="#" novalidate>
                              <h2 class="product-model-title mb-15">Configure o seu produto</h2>${campoAtivo}
${campoSelect('embalagem', 'Embalagem', op.embalagens, dados.embalagens)}
${campoSelect('material', 'Material', op.materiais, MATERIAIS)}
${campoSelect('volume', 'Volume de envase', op.volumes, null)}
${campoSelect('decoracao', 'Decoração', op.decoracao, DECORACAO)}${camposComuns}
                              <div class="firetti-config__campo">
                                 <label for="cfg-observacao">Requisito especial (opcional)</label>
                                 <textarea id="cfg-observacao" name="observacao" placeholder="Fragrância, cor, público, referência de mercado…"></textarea>
                              </div>${botoesConfigurador}
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="productdetails pt-35 pb-45">
                  <div class="row">
                     <div class="col-lg-12">
                        <div class="product-additional-tab">
                           <div class="pro-details-nav mb-40">
                              <ul class="nav nav-tabs pro-details-nav-btn" id="abasProduto" role="tablist">
                                 <li class="nav-item" role="presentation">
                                    <button class="nav-links active" id="aba-formula" data-bs-toggle="tab" data-bs-target="#painel-formula" type="button" role="tab" aria-controls="painel-formula" aria-selected="true">Sobre a formulação</button>
                                 </li>
                                 <li class="nav-item" role="presentation">
                                    <button class="nav-links" id="aba-como" data-bs-toggle="tab" data-bs-target="#painel-como" type="button" role="tab" aria-controls="painel-como" aria-selected="false">Como funciona o orçamento</button>
                                 </li>
                              </ul>
                           </div>
                           <div class="tab-content tp-content-tab" id="abasProdutoConteudo">
                              <div class="tab-para tab-pane fade show active" id="painel-formula" role="tabpanel" aria-labelledby="aba-formula">
                                 ${ativosHtml}<p>A fórmula é ajustada com a sua marca: textura, fragrância e cor são definidas no desenvolvimento. A lista INCI completa e a documentação para a ANVISA são entregues durante o projeto.</p>${notaAnvisa}
                              </div>${abaOrcamento}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- produto-area-end -->

      </main>
      <!-- main-area-end -->
${rodape()}`;

  writeFileSync(resolve(RAIZ, `produto-${p.slug}.html`), pagina);
}
console.log(`${dados.produtos.length} fichas de produto geradas`);

/* ---------- produto sob medida (o "OUTRO" de cada linha) ---------- */

const linhasComOutro = Object.entries(SUB).filter(([, s]) => !s.semSobMedida);
const todasEmbalagens = Object.keys(dados.embalagens);

const sobMedida = `${head('Produto sob medida | Firetti', 'Não encontrou o produto na nossa lista? Descreva a ideia e o time da Firetti desenvolve a fórmula sob medida para a sua marca.', OG)}
${header('catalogo')}

      <!-- main-area -->
      <main id="conteudo-principal">
${breadcrumb('Produto sob medida', '<a href="catalogo.html">Catálogo</a> : Sob medida', BG, 'div')}
         <!-- sob-medida-area -->
         <section class="shop-area pt-120 pb-90">
            <div class="container">
               <div class="row justify-content-center">
                  <div class="col-lg-8">
                     <div class="product__details-content">
                        <span class="firetti-produto-card__eyebrow">Formulação exclusiva</span>
                        <h1 class="product-dtitle mb-20">Descreva o produto que você imagina</h1>
                        <p class="mb-40">A lista do catálogo mostra as linhas que produzimos hoje. Se a sua ideia não está nela, o nosso time de formulação desenvolve uma fórmula exclusiva para a sua marca. Conte o que você tem em mente: o pedido entra na sua lista de orçamento junto com os demais produtos.</p>
                        <form class="js-configurador" data-slug="sob-medida" data-nome="Produto sob medida" action="#" novalidate>
                           <div class="firetti-config__campo">
                              <label for="cfg-tipo">Tipo de produto</label>
                              <select id="cfg-tipo" name="tipo">
${linhasComOutro.map(([chave, s]) => `                                 <option value="${chave}">${s.nome}</option>`).join('\n')}
                              </select>
                           </div>
                           <div class="firetti-config__campo">
                              <label for="cfg-descricao">Descreva o produto</label>
                              <textarea id="cfg-descricao" name="descricao" required placeholder="Para que serve, público, textura, fragrância, ativos desejados, referências de mercado…"></textarea>
                           </div>
${campoSelect('embalagem', 'Embalagem preferida', todasEmbalagens, dados.embalagens)}${camposComuns}${botoesConfigurador}
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- sob-medida-area-end -->

      </main>
      <!-- main-area-end -->
${rodape()}`;

writeFileSync(resolve(RAIZ, 'produto-sob-medida.html'), sobMedida);
console.log('produto-sob-medida.html gerado');
