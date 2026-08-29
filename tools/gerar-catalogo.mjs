#!/usr/bin/env node
/**
 * Gera as páginas estáticas do catálogo Firetti a partir de assets/data/catalogo.json:
 *  - injeta a grade de produtos em catalogo.html (entre os marcadores CATALOGO:INICIO/FIM)
 *  - cria produto-<slug>.html para cada produto
 * Uso: node tools/gerar-catalogo.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { head, header, breadcrumb, rodape } from './blocos.mjs';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const dados = JSON.parse(readFileSync(resolve(RAIZ, 'assets/data/catalogo.json'), 'utf8'));

const MATERIAIS = { plastico: 'Plástico', vidro: 'Vidro', aluminio: 'Alumínio' };
const DECORACAO = { impressao: 'Impressão na embalagem', rotulo: 'Rótulo adesivo', nenhuma: 'Sem decoração' };
const IMAGEM_CATEGORIA = {
  capilares: 'assets/img/conteudo/cat-capilares.jpg',
  corporais: 'assets/img/conteudo/cat-corporais.jpg',
  faciais: 'assets/img/conteudo/cat-faciais.jpg'
};

const nomeExibicao = (p) => `${p.nomeFantasia} ${p.tipo} ${p.ativoPrincipal}`;

/* ---------- grade do catálogo ---------- */

const cardProduto = (p, atraso) => {
  const fotos = (p.imagens && p.imagens.length ? p.imagens : [IMAGEM_CATEGORIA[p.categoria]]);
  const nome = nomeExibicao(p);
  const slides = fotos
    .map(
      (src, i) => `                              <li class="firetti-carrossel__slide">
                                 <img src="${src}" alt="${i === 0 ? `Embalagem ilustrativa: ${nome}` : ''}" loading="lazy" decoding="async" width="440" height="550">
                              </li>`
    )
    .join('\n');
  const pontos = fotos
    .map(
      (_, i) => `                              <button type="button" class="firetti-carrossel__ponto${i === 0 ? ' ativo' : ''}" data-indice="${i}" aria-label="Ver foto ${i + 1} de ${fotos.length}"></button>`
    )
    .join('\n');
  const ativos = p.ativos.slice(0, 3).map((a) => `<li>${a.nome}</li>`).join('');

  return `
                  <div class="col-xl-4 col-lg-6 col-md-6" data-categoria="${p.categoria}">
                     <article class="firetti-produto-card mb-30 wow fadeInUp" data-wow-delay=".${atraso}s">
                        <div class="firetti-carrossel" data-total="${fotos.length}">
                           <ul class="firetti-carrossel__trilha">
${slides}
                           </ul>
                           ${fotos.length > 1 ? `<button type="button" class="firetti-carrossel__seta anterior" aria-label="Foto anterior"><i class="fal fa-angle-left" aria-hidden="true"></i></button>
                           <button type="button" class="firetti-carrossel__seta proxima" aria-label="Próxima foto"><i class="fal fa-angle-right" aria-hidden="true"></i></button>
                           <div class="firetti-carrossel__pontos">
${pontos}
                           </div>` : ''}
                        </div>
                        <div class="firetti-produto-card__body">
                           <span class="firetti-produto-card__nome">${p.nomeFantasia}</span>
                           <h3 class="firetti-produto-card__titulo"><a href="produto-${p.slug}.html">${p.tipo} <em>${p.ativoPrincipal}</em></a></h3>
                           <ul class="firetti-produto-card__ativos">${ativos}</ul>
                           <div class="firetti-produto-card__acoes">
                              <button type="button" class="firetti-add-btn js-adicionar-rapido" data-slug="${p.slug}" data-nome="${nome}"><i class="fal fa-plus" aria-hidden="true"></i> Adicionar à lista</button>
                              <a class="firetti-produto-card__link" href="produto-${p.slug}.html">Configurar<i class="fal fa-arrow-right" aria-hidden="true"></i></a>
                           </div>
                        </div>
                     </article>
                  </div>`;
};

const grade = dados.produtos.map((p, i) => cardProduto(p, (i % 4) + 2)).join('\n');

const catalogoPath = resolve(RAIZ, 'catalogo.html');
let catalogoHtml = readFileSync(catalogoPath, 'utf8');
catalogoHtml = catalogoHtml
  .replace(
    /(<!-- CATALOGO:INICIO -->)[\s\S]*(<!-- CATALOGO:FIM -->)/,
    `$1\n${grade}\n                  $2`
  )
  .replace(
    /(<!-- HEADER:INICIO -->)[\s\S]*(<!-- HEADER:FIM -->)/,
    `$1${header('catalogo')}      $2`
  )
  .replace(
    /<!-- BREADCRUMB -->/,
    breadcrumb('Linha de produtos', '<a href="index.html">Início</a> : Catálogo', 'assets/img/conteudo/linha-produtos.jpg')
  )
  .replace(
    /(<!-- FOOTER:INICIO -->)[\s\S]*(<!-- FOOTER:FIM -->)[\s\S]*$/,
    rodape().replace('      <!-- footer-area -->', '      <!-- FOOTER:INICIO -->\n      <!-- footer-area -->').replace('      <!-- footer-area-end -->', '      <!-- footer-area-end -->\n      <!-- FOOTER:FIM -->')
  );
writeFileSync(catalogoPath, catalogoHtml);
console.log('catalogo.html: grade atualizada com ' + dados.produtos.length + ' produtos');

/* ---------- páginas de produto ---------- */

for (const p of dados.produtos) {
  const nome = nomeExibicao(p);
  const opcaoSelect = (nomeCampo, rotulo, opcoes, mapa) => `
                              <div class="firetti-config__campo">
                                 <label for="cfg-${nomeCampo}">${rotulo}</label>
                                 <select id="cfg-${nomeCampo}" name="${nomeCampo}">
${opcoes.map((o) => `                                    <option value="${o}">${(mapa && mapa[o]) || o}</option>`).join('\n')}
                                 </select>
                              </div>`;

  const linhasAtivos = p.ativos
    .map(
      (a) => `                                          <tr>
                                             <td class="add-info">${a.nome}</td>
                                             <td class="add-info-list">${a.funcao}</td>
                                          </tr>`
    )
    .join('\n');

  const selos = p.selos
    .map((s) => `<span><i class="fa-light fa-badge-check" aria-hidden="true"></i>${s}</span>`)
    .join('\n                                 ');

  const pagina = `${head(`${nome} | Firetti`, p.resumo.split('.')[0] + '.', 'assets/img/og/og-linha-produtos-1200x630.png')}
${header('catalogo')}

      <!-- main-area -->
      <main id="conteudo-principal">
${breadcrumb(p.tipo, `<a href="catalogo.html">Catálogo</a> : <a href="catalogo.html?categoria=${p.categoria}">${dados.categorias[p.categoria]}</a>`, 'assets/img/conteudo/linha-produtos.jpg')}
         <!-- produto-area -->
         <section class="shop-area pt-120 pb-70">
            <div class="container">
               <div class="row">
                  <div class="col-lg-6 col-md-6">
                     <div class="productthumb mb-20">
                        <img id="foto-produto" src="${(p.imagens && p.imagens[0]) || IMAGEM_CATEGORIA[p.categoria]}" alt="Embalagem ilustrativa: ${nome}">
                     </div>
                     ${p.imagens && p.imagens.length > 1 ? `<div class="firetti-galeria mb-40" role="group" aria-label="Fotos do produto">
${p.imagens.map((im, i) => `                        <button type="button" class="firetti-galeria__thumb${i === 0 ? ' ativo' : ''}" data-img="${im}" aria-label="Ver foto ${i + 1} de ${p.imagens.length}"><img src="${im}" alt="" loading="lazy" width="96" height="96"></button>`).join('\n')}
                     </div>` : ''}
                  </div>
                  <div class="col-lg-6 col-md-6">
                     <div class="product mb-40 ml-20">
                        <div class="product__details-content mb-40">
                           <span class="firetti-produto-card__eyebrow">${p.nomeFantasia} · ${dados.categorias[p.categoria]}</span>
                           <h2 class="product-dtitle mb-20">${p.tipo} ${p.ativoPrincipal}</h2>
                           <p>${p.resumo}</p>
                           <p class="firetti-produto-card__moq mt-15">Quantidade mínima e custo por unidade: sob consulta no orçamento.</p>
                           <div class="firetti-selos mt-20 mb-30">
                                 ${selos}
                           </div>
                           <form class="js-configurador" data-slug="${p.slug}" data-nome="${nome}" action="#">
                              <h3 class="product-model-title mb-15">Configure o seu produto</h3>
${opcaoSelect('embalagem', 'Embalagem', p.opcoes.embalagens, dados.embalagens)}
${opcaoSelect('material', 'Material', p.opcoes.materiais, MATERIAIS)}
${opcaoSelect('volume', 'Volume de envase', p.opcoes.volumes, null)}
${opcaoSelect('decoracao', 'Decoração', p.opcoes.decoracao, DECORACAO)}
                              <div class="firetti-config__campo">
                                 <label for="cfg-quantidade">Quantidade desejada</label>
                                 <input type="number" id="cfg-quantidade" name="quantidade" min="1" placeholder="Ex.: 1000">
                              </div>
                              <div class="firetti-config__campo">
                                 <label for="cfg-observacao">Requisito especial (opcional)</label>
                                 <textarea id="cfg-observacao" name="observacao" placeholder="Fragrância, cor, público, referência de mercado…"></textarea>
                              </div>
                              <div class="product-button">
                                 <button type="submit" class="tp-btn mr-20">Adicionar à lista de orçamento</button>
                                 <a href="orcamento.html" class="tp-btn-second">Ver minha lista</a>
                              </div>
                              <p class="firetti-add-feedback" role="status" hidden>Produto adicionado à sua lista de orçamento.</p>
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
                                    <button class="nav-links active" id="aba-ativos" data-bs-toggle="tab" data-bs-target="#painel-ativos" type="button" role="tab" aria-controls="painel-ativos" aria-selected="true">Ativos principais</button>
                                 </li>
                                 <li class="nav-item" role="presentation">
                                    <button class="nav-links" id="aba-como" data-bs-toggle="tab" data-bs-target="#painel-como" type="button" role="tab" aria-controls="painel-como" aria-selected="false">Como funciona o orçamento</button>
                                 </li>
                              </ul>
                           </div>
                           <div class="tab-content tp-content-tab" id="abasProdutoConteudo">
                              <div class="tab-para tab-pane fade show active" id="painel-ativos" role="tabpanel" aria-labelledby="aba-ativos">
                                 <div class="product__details-info table-responsive">
                                    <table class="table table-striped">
                                       <tbody>
${linhasAtivos}
                                       </tbody>
                                    </table>
                                 </div>
                                 <p>A lista INCI completa é fornecida durante o desenvolvimento do projeto. A fórmula pode ser ajustada às necessidades da sua marca.</p>
                              </div>
                              <div class="tab-pane fade" id="painel-como" role="tabpanel" aria-labelledby="aba-como">
                                 <p class="mb-30">Adicione à lista os produtos que deseja para a sua linha, com embalagem, volume e quantidade. Ao finalizar, envie a lista pelo formulário de orçamento: ela chega formatada ao nosso time comercial pelo WhatsApp, e retornamos com valores, quantidade mínima e prazos.</p>
                                 <p>Preferir conversar antes? Fale com a gente pelo telefone <a href="tel:+551732661022">(17) 3266-1022</a> ou <a href="https://wa.me/5517991262215" target="_blank" rel="noopener">WhatsApp</a>.</p>
                              </div>
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
  console.log(`produto-${p.slug}.html gerado`);
}
