/**
 * Gera site/sitemap.xml e site/robots.txt a partir das páginas existentes.
 * Chamado ao final de gerar-catalogo.mjs e gerar-paginas.mjs.
 */
import { readdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from './blocos.mjs';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'site');

// Prioridade relativa: home > catálogo > páginas comerciais > produtos > institucionais
const PRIORIDADE = {
  '/': '1.0', '/catalogo': '0.9', '/como-funciona': '0.8', '/contato': '0.8',
  '/quem-somos': '0.6', '/faq': '0.6', '/orcamento': '0.5', '/produto-sob-medida': '0.5'
};

export function gerarSitemap() {
  const hoje = new Date().toISOString().slice(0, 10);
  const caminhos = readdirSync(RAIZ)
    .filter((f) => f.endsWith('.html') && f !== '404.html')
    .map((f) => (f === 'index.html' ? '/' : `/${f.replace(/\.html$/, '')}`))
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

  const urls = caminhos.map((c) => `  <url>
    <loc>${SITE}${c}</loc>
    <lastmod>${hoje}</lastmod>
    <priority>${PRIORIDADE[c] || '0.7'}</priority>
  </url>`).join('\n');

  writeFileSync(resolve(RAIZ, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);
  writeFileSync(resolve(RAIZ, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);
  console.log(`sitemap.xml: ${caminhos.length} URLs | robots.txt atualizado`);
}
