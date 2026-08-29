/** Blocos compartilhados das páginas do site Firetti */
/* ---------- blocos compartilhados ---------- */

export const head = (titulo, descricao, og) => `<!doctype html>
<html class="no-js" lang="pt-BR">
   <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>${titulo}</title>
      <meta name="description" content="${descricao}">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="#07375E">

      <!-- TODO: trocar por URL absoluta quando o domínio final for definido -->
      <meta property="og:type" content="website">
      <meta property="og:title" content="${titulo}">
      <meta property="og:description" content="${descricao}">
      <meta property="og:image" content="${og}">
      <meta property="og:locale" content="pt_BR">
      <meta name="twitter:card" content="summary_large_image">

      <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png">
      <link rel="shortcut icon" href="favicons/favicon.ico">
      <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png">
      <link rel="mask-icon" href="favicons/safari-pinned-tab.svg" color="#07375E">
      <link rel="manifest" href="site.webmanifest">

      <!-- CSS here -->
      <link rel="stylesheet" href="assets/css/bootstrap.min.css">
      <link rel="stylesheet" href="assets/css/animate.css">
      <link rel="stylesheet" href="assets/css/swiper-bundle.css">
      <link rel="stylesheet" href="assets/css/slick.css">
      <link rel="stylesheet" href="assets/css/magnific-popup.css">
      <link rel="stylesheet" href="assets/css/font-awesome-pro.css">
      <link rel="stylesheet" href="assets/css/meanmenu.css">
      <link rel="stylesheet" href="assets/css/nice-select.css">
      <link rel="stylesheet" href="assets/css/flaticon.css">
      <link rel="stylesheet" href="assets/css/spacing.css">
      <link rel="stylesheet" href="assets/css/style.css">
   </head>
   <body>
      <a class="firetti-skip-link" href="#conteudo-principal">Pular para o conteúdo</a>`;

export const header = (ativa) => {
  const cls = (chave) => (chave === ativa ? ' class="active"' : '');
  return `
      <!-- Scroll-top -->
      <button class="scroll-top scroll-to-target" data-target="html" aria-label="Voltar ao topo">
         <i class="fas fa-angle-up" aria-hidden="true"></i>
     </button>

      <!-- preloader -->
      <div id="preloadertp">
         <img src="assets/img/logo/simbolo-firetti.svg" alt="" width="72" height="72">
      </div>

      <!-- header-area -->
      <header class="d-none d-xl-block">
         <div class="header__area tp-home-one" id="header-sticky">
            <div class="container-fluid">
               <div class="row align-items-center">
                  <div class="col-xxl-2 col-lg-3">
                     <div class="logo">
                        <a href="index.html"><img src="assets/img/logo/logo-firetti.svg" alt="Firetti" width="160" height="53"></a>
                     </div>
                  </div>
                  <div class="col-xxl-7 col-lg-6">
                     <div class="main-menu">
                        <nav id="mobile-menu" aria-label="Navegação principal">
                           <ul>
                              <li><a${cls('inicio')} href="index.html">Início</a></li>
                              <li><a${cls('quem-somos')} href="quem-somos.html">Quem somos</a></li>
                              <li class="has-dropdown"><a${cls('como-funciona')} href="como-funciona.html">Como funciona</a>
                                 <ul class="sub-menu">
                                    <li><a href="como-funciona.html">Terceirize sua produção</a></li>
                                    <li><a href="faq.html">Perguntas frequentes</a></li>
                                 </ul>
                              </li>
                              <li class="has-dropdown"><a${cls('catalogo')} href="catalogo.html">Catálogo</a>
                                 <ul class="sub-menu">
                                    <li><a href="catalogo.html?categoria=capilares">Produtos capilares</a></li>
                                    <li><a href="catalogo.html?categoria=corporais">Produtos corporais</a></li>
                                    <li><a href="catalogo.html?categoria=faciais">Produtos faciais</a></li>
                                 </ul>
                              </li>
                              <li><a${cls('contato')} href="contato.html">Contato</a></li>
                           </ul>
                        </nav>
                     </div>
                  </div>
                  <div class="col-xxl-3 col-lg-3 d-flex align-items-center justify-content-end">
                     <div class="tp-bt-btn-banner">
                        <a class="tp-bt-btn" href="tel:+551732661022">
                           <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="2" cy="2" r="2" fill="#137C96"/><circle cx="7" cy="2" r="2" fill="#137C96"/><circle cx="12" cy="2" r="2" fill="#137C96"/><circle cx="12" cy="7" r="2" fill="#137C96"/><circle cx="12" cy="12" r="2" fill="#137C96"/><circle cx="7" cy="7" r="2" fill="#137C96"/><circle cx="7" cy="12" r="2" fill="#137C96"/><circle cx="7" cy="17" r="2" fill="#137C96"/><circle cx="2" cy="7" r="2" fill="#137C96"/><circle cx="2" cy="12" r="2" fill="#137C96"/></svg><span>Atendimento :</span>(17) 3266-1022
                        </a>
                     </div>
                     <a class="firetti-lista-btn" href="orcamento.html" title="Lista de orçamento">
                        <i class="fal fa-clipboard-list" aria-hidden="true"></i>
                        <span class="firetti-lista-count">0</span>
                        <span class="visually-hidden">Ver lista de orçamento</span>
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </header>
      <!-- header-area-end -->

      <!-- tp-mobile-header-area start -->
      <div id="header-mob-sticky" class="tp-mobile-header-area tp-home-lg-banner pt-15 pb-15 d-xl-none">
         <div class="container">
            <div class="row align-items-center">
               <div class="col-6">
                  <div class="tp-mob-logo">
                     <a href="index.html"><img src="assets/img/logo/logo-firetti.svg" alt="Firetti" width="130" height="43"></a>
                  </div>
               </div>
               <div class="col-6">
                  <div class="tp-mobile-bar d-flex align-items-center justify-content-end">
                     <a class="firetti-lista-btn mr-15" href="orcamento.html" title="Lista de orçamento">
                        <i class="fal fa-clipboard-list" aria-hidden="true"></i>
                        <span class="firetti-lista-count">0</span>
                        <span class="visually-hidden">Ver lista de orçamento</span>
                     </a>
                     <button class="tp-menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="painel-menu-mobile"><i class="far fa-bars" aria-hidden="true"></i></button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- tp-mobile-header-area end -->

      <!-- sidebar-info -->
      <div id="painel-menu-mobile" class="tpsideinfo tp-side-info-area" aria-label="Menu mobile" aria-hidden="true">
         <button class="tpsideinfo__close" aria-label="Fechar menu"><i class="fal fa-times" aria-hidden="true"></i></button>
         <div class="tpsideinfo__logo mb-40">
            <a href="index.html"><img src="assets/img/logo/logo-firetti-negativa.svg" alt="Firetti" width="160" height="53"></a>
         </div>

         <div class="mobile-menu"></div>

         <div class="tpsideinfo__content mb-60">
            <p class="d-none d-xl-block">Indústria 100% brasileira especializada na terceirização de cosméticos capilares, corporais e faciais.</p>
            <span>Fale conosco</span>
            <a href="https://maps.app.goo.gl/TPQcMniH4i4BLasX9" target="_blank" rel="noopener"><i class="fa-solid fa-location-dot" aria-hidden="true"></i>Rua Luiz Vitoretti, 485 – Cedral/SP</a>
            <a href="tel:+551732661022"><i class="fa-solid fa-phone" aria-hidden="true"></i>(17) 3266-1022</a>
            <a href="https://wa.me/5517991262215" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i>(17) 99126-2215</a>
         </div>
      </div>
      <!-- sidebar-info-end -->

      <div class="body-overlay"></div>
`;
};

export const breadcrumb = (titulo, trilhaHtml, bg) => `
         <!-- breadcrumb-area -->
         <section class="breadcrumb__area pt-100 pb-120 breadcrumb__overlay" data-background="${bg}">
            <div class="container">
               <div class="row align-items-center">
                  <div class="col-xl-7 col-lg-12 col-md-12 col-12">
                     <div class="tp-breadcrumb">
                        <h1 class="tp-breadcrumb__title">${titulo}</h1>
                     </div>
                  </div>
                  <div class="col-xl-5 col-lg-12 col-md-12 col-12">
                     <div class="tp-breadcrumb__link text-xl-end">
                        <span>${trilhaHtml}</span>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- breadcrumb-area-end -->
`;

export const rodape = () => `
      <!-- footer-area -->
      <footer>
         <div class="footer-area theme-bg pt-100 pb-50">
            <div class="container">
               <div class="row">
                  <div class="col-xl-3 col-lg-4 col-md-6">
                     <div class="footer-widget footer-col-1 mb-50">
                        <h4 class="footer-widget__title mb-30">
                           <a href="index.html"><img src="assets/img/logo/logo-firetti-negativa.svg" alt="Firetti" width="160" height="53"></a>
                        </h4>
                        <p>Somos especializados em terceirização de cosméticos, com mais de 20 anos de experiência acumulada na operação. Desenvolvemos fórmulas únicas e exclusivas para a sua marca.</p>
                     </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6">
                     <div class="footer-widget footer-col-2 mb-50">
                        <h4 class="footer-widget__title mb-20">Navegação</h4>
                        <div class="footer-widget__links">
                           <ul>
                              <li><a href="index.html">Início</a></li>
                              <li><a href="quem-somos.html">Quem somos</a></li>
                              <li><a href="como-funciona.html">Como funciona</a></li>
                              <li><a href="catalogo.html">Catálogo</a></li>
                              <li><a href="orcamento.html">Orçamento</a></li>
                              <li><a href="contato.html">Contato</a></li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6">
                     <div class="footer-widget footer-col-3 mb-50">
                        <h4 class="footer-widget__title mb-20">Contato</h4>
                        <div class="footer-widget__info">
                           <ul>
                              <li><a href="https://maps.app.goo.gl/TPQcMniH4i4BLasX9" target="_blank" rel="noopener">Rua Luiz Vitoretti, 485 – Cedral/SP<br>CEP 15895-000</a></li>
                              <li><a href="tel:+551732661022">(17) 3266-1022</a></li>
                              <li><a href="https://wa.me/5517991262215" target="_blank" rel="noopener">WhatsApp: (17) 99126-2215</a></li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-3 col-lg-6 col-md-6">
                     <div class="footer-widget footer-col-4 mb-50">
                        <h4 class="footer-widget__title mb-20">Atendimento</h4>
                        <div class="footer-widget__info">
                           <ul>
                              <li>Segunda a sexta: 8h às 18h</li>
                              <li>Sábado: 8h às 12h</li>
                              <li>Domingo: fechado</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="footer-area-bottom theme-bg">
            <div class="container">
               <div class="row">
                  <div class="col-12">
                     <div class="footer-widget__copyright">
                        <span>© 2026 <a href="index.html">Firetti</a>. <i>Todos os direitos reservados.</i></span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
      <!-- footer-area-end -->

      <!-- JS here -->
      <script src="assets/js/jquery.js"></script>
      <script src="assets/js/waypoints.js"></script>
      <script src="assets/js/bootstrap.bundle.min.js"></script>
      <script src="assets/js/swiper-bundle.js"></script>
      <script src="assets/js/slick.js"></script>
      <script src="assets/js/magnific-popup.js"></script>
      <script src="assets/js/counterup.js"></script>
      <script src="assets/js/wow.js"></script>
      <script src="assets/js/nice-select.js"></script>
      <script src="assets/js/isotope-pkgd.js"></script>
      <script src="assets/js/imagesloaded-pkgd.js"></script>
      <script src="assets/js/meanmenu.js"></script>
      <script src="assets/js/main.js"></script>
      <script src="assets/js/firetti.js"></script>
   </body>
</html>
`;
