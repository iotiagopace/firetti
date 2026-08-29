#!/usr/bin/env node
/**
 * Gera as páginas institucionais do site Firetti (quem-somos, como-funciona,
 * contato, faq e orcamento) com os blocos compartilhados de blocos.mjs.
 * Uso: node tools/gerar-paginas.mjs
 */
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { head, header, breadcrumb, rodape } from './blocos.mjs';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const BG_PLANTA = 'assets/img/conteudo/missao.jpg';
const BG_PRODUTOS = 'assets/img/conteudo/linha-produtos.jpg';

const formOrcamento = (titulo, texto) => `
         <!-- orcamento-form-area -->
         <section class="appoinment-area" id="orcamento">
            <div class="container-fluid">
               <div class="row">
                  <div class="col-xxl-6 col-xl-5 col-lg-12 col-md-12 p-0">
                     <div class="appoinment-thumb">
                        <img src="assets/img/conteudo/orcamento-lateral.jpg" alt="Frascos e potes de cosméticos em fundo neutro">
                     </div>
                  </div>
                  <div class="col-xxl-6 col-xl-7 col-lg-12 col-md-12 p-0">
                     <div class="visitor-info">
                        <h2 class="appoinment-title mb-25"><i class="fa-light fa-file-signature" aria-hidden="true"></i>${titulo}</h2>
                        <p class="mb-30">${texto}</p>
                        <div class="visitor-form">
                           <form class="js-form-orcamento" action="#" novalidate>
                              <div class="row">
                                 <div class="col-lg-6">
                                    <div class="visitor-form__input">
                                       <label class="visually-hidden" for="orc-nome">Nome completo</label>
                                       <input type="text" id="orc-nome" name="nome" placeholder="Nome completo" required autocomplete="name">
                                    </div>
                                 </div>
                                 <div class="col-lg-6">
                                    <div class="visitor-form__input">
                                       <label class="visually-hidden" for="orc-cidade">Cidade</label>
                                       <input type="text" id="orc-cidade" name="cidade" placeholder="Cidade" required autocomplete="address-level2">
                                    </div>
                                 </div>
                                 <div class="col-lg-6">
                                    <div class="visitor-form__input">
                                       <label class="visually-hidden" for="orc-email">E-mail</label>
                                       <input type="email" id="orc-email" name="email" placeholder="E-mail" required autocomplete="email">
                                    </div>
                                 </div>
                                 <div class="col-lg-6">
                                    <div class="visitor-form__input">
                                       <label class="visually-hidden" for="orc-telefone">Telefone</label>
                                       <input type="tel" id="orc-telefone" name="telefone" placeholder="Telefone (DDD + número)" required autocomplete="tel">
                                    </div>
                                 </div>
                                 <div class="col-lg-12">
                                    <div class="visitor-form__input">
                                       <label class="visually-hidden" for="orc-mensagem">Conte sobre o produto que você quer criar</label>
                                       <textarea id="orc-mensagem" name="mensagem" placeholder="Conte sobre o produto que você quer criar (opcional)"></textarea>
                                    </div>
                                 </div>
                                 <div class="col-lg-12">
                                    <p class="firetti-form-error" role="alert" hidden>Preencha os campos obrigatórios antes de enviar.</p>
                                 </div>
                                 <div class="col-lg-5 col-md-5 col-12">
                                    <div class="visit-btn mt-20">
                                       <button class="tp-btn" type="submit">Enviar via WhatsApp</button>
                                    </div>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-12">
                                    <div class="visit-serial mt-45">
                                       <span>Atendimento : <a href="tel:+551732661022">(17) 3266-1022<i class="fa-regular fa-arrow-right" aria-hidden="true"></i></a></span>
                                    </div>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- orcamento-form-area-end -->`;

const ctaFinal = (tituloHtml) => `
         <!-- cta-area -->
         <section class="cta-area pt-130 pb-130">
            <div class="container">
               <div class="row">
                  <div class="col-lg-12">
                     <div class="cta-bg theme-light-bg pt-65 pb-70">
                        <div class="cta-content ml-90">
                           <h2 class="cta-title mb-35">${tituloHtml}</h2>
                           <a href="https://wa.me/5517991262215" target="_blank" rel="noopener" class="tp-cta-btn"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span>WhatsApp :</span>(17) 99126-2215</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- cta-area-end -->`;

const paginas = [];

/* ============================================================
   QUEM SOMOS
============================================================ */
paginas.push({
  arquivo: 'quem-somos.html',
  html: `${head('Quem somos | Firetti', 'Conheça a estrutura, a experiência, os valores e o compromisso da Firetti com inovação, qualidade e fabricação responsável de cosméticos.', 'assets/img/og/og-quem-somos-1200x630.png')}
${header('quem-somos')}

      <!-- main-area -->
      <main id="conteudo-principal">
${breadcrumb('Conheça a Firetti', '<a href="index.html">Início</a> : Quem somos', BG_PLANTA)}
         <!-- missao-area -->
         <section class="about-area pt-120 pb-70">
            <div class="container">
               <div class="row">
                  <div class="col-xl-6 col-lg-12">
                     <div class="about__thumb mb-60 wow fadeInLeft" data-wow-delay=".3s">
                        <div class="about__img">
                           <img src="${BG_PLANTA}" alt="Vista aérea da planta industrial da Firetti em Cedral, São Paulo">
                           <div class="about__exprience">
                              <h3 class="counter">20</h3>
                              <i>Anos de <br>experiência</i>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-6 col-lg-12">
                     <div class="tp-about__content pt-45 ml-60 mb-50 wow fadeInRight" data-wow-delay=".3s">
                        <div class="tp-section">
                           <span class="tp-section__sub-title left-line mb-25">Nossa missão</span>
                           <h2 class="tp-section__title tp-ab-sm-title mb-45">Uma indústria apaixonada por criar produtos excepcionais</h2>
                           <p class="mr-20 mb-30">Proporcionar bem-estar, autoestima e confiança a nossos clientes, oferecendo produtos cosméticos de alta qualidade e inovação, que atendem às suas necessidades e superam suas expectativas, promovendo uma experiência de cuidado e transformação.</p>
                           <p class="mr-20 mb-45">Nossa planta fica em Cedral, no interior de São Paulo, e reúne estrutura de produção, envase e controle de qualidade para atender marcas de todo o Brasil.</p>
                        </div>
                        <div class="tp-about__btn">
                           <a class="tp-btn" href="como-funciona.html">Como funciona a terceirização</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- missao-area-end -->

         <!-- valores-area -->
         <section class="services-area pt-95 pb-60 grey-bg fix" data-background="assets/img/shape/shape-bg-01.png">
            <div class="container">
               <div class="row">
                  <div class="col-lg-12">
                     <div class="tp-section text-center">
                        <span class="tp-section__sub-title left-line right-line mb-25">Nossos valores</span>
                        <h2 class="tp-section__title mb-60">O que nos move todos os dias</h2>
                     </div>
                  </div>
               </div>
               <div class="row wow fadeInUp" data-wow-delay=".3s">
                  <div class="col-xl-3 col-lg-6 col-md-6">
                     <div class="services-item mb-40">
                        <div class="services-item__icon mb-30">
                           <i class="flaticon-premium-badge" aria-hidden="true"></i>
                        </div>
                        <div class="services-item__content">
                           <h3 class="services-item__tp-title mb-30">Mais de 20 anos de experiência</h3>
                           <p>Experiência acumulada e liderança no mercado de fabricação de cosméticos.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-3 col-lg-6 col-md-6">
                     <div class="services-item mb-40">
                        <div class="services-item__icon pink-icon mb-30">
                           <i class="flaticon-team" aria-hidden="true"></i>
                        </div>
                        <div class="services-item__content">
                           <h3 class="services-item__tp-title mb-30">Equipe especializada</h3>
                           <p>Químicos, formuladores e profissionais de pesquisa e desenvolvimento.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-3 col-lg-6 col-md-6">
                     <div class="services-item mb-40">
                        <div class="services-item__icon green-icon mb-30">
                           <i class="flaticon-microscope" aria-hidden="true"></i>
                        </div>
                        <div class="services-item__content">
                           <h3 class="services-item__tp-title mb-30">Qualidade garantida</h3>
                           <p>Produtos desenvolvidos para superar expectativas, lote a lote.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-3 col-lg-6 col-md-6">
                     <div class="services-item mb-40">
                        <div class="services-item__icon sky-icon mb-30">
                           <i class="flaticon-heart" aria-hidden="true"></i>
                        </div>
                        <div class="services-item__content">
                           <h3 class="services-item__tp-title mb-30">Sustentabilidade</h3>
                           <p>Práticas ambientalmente responsáveis em toda a operação.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- valores-area-end -->

         <!-- visao-area -->
         <section class="about-area pt-110 pb-60">
            <div class="container">
               <div class="row">
                  <div class="col-lg-6">
                     <div class="tp-about__content mb-50 mr-40 wow fadeInUp" data-wow-delay=".2s">
                        <div class="tp-section">
                           <span class="tp-section__sub-title left-line mb-25">Visão</span>
                           <h2 class="tp-section__title tp-ab-sm-title mb-35">Onde queremos chegar</h2>
                           <p>Ser reconhecida como líder em soluções inovadoras e de excelência para a terceirização de cosméticos na região Noroeste Paulista, proporcionando aos nossos clientes qualidade, segurança e resultados excepcionais, com compromisso constante com a inovação e a sustentabilidade.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-6">
                     <div class="tp-about__content mb-50 wow fadeInUp" data-wow-delay=".4s">
                        <div class="tp-section">
                           <span class="tp-section__sub-title left-line mb-25">Política de qualidade</span>
                           <h2 class="tp-section__title tp-ab-sm-title mb-35">Nosso compromisso</h2>
                           <p class="mb-20">A Firetti está comprometida com a excelência na fabricação de cosméticos, buscando sempre garantir a mais alta qualidade em seus produtos.</p>
                           <p>Para isso, contamos com uma equipe altamente qualificada e profissionais de pesquisa e desenvolvimento, constantemente atualizados com as inovações do mercado, com foco na melhoria contínua e no cumprimento dos mais rigorosos padrões de qualidade.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- visao-area-end -->

         <!-- video-area -->
         <section class="video-area pb-120">
            <div class="container">
               <div class="row">
                  <div class="col-lg-12">
                     <div class="tp-section text-center">
                        <span class="tp-section__sub-title left-line right-line mb-25">Vídeo institucional</span>
                        <h2 class="tp-section__title mb-60">A Firetti por dentro</h2>
                     </div>
                  </div>
               </div>
               <div class="row justify-content-center">
                  <div class="col-lg-10">
                     <div class="firetti-video wow fadeInUp" data-wow-delay=".3s">
                        <video controls preload="none" poster="${BG_PLANTA}">
                           <source src="assets/img/conteudo/video-institucional.mp4" type="video/mp4">
                           Seu navegador não reproduz vídeo. <a href="assets/img/conteudo/video-institucional.mp4">Baixe o vídeo institucional</a>.
                        </video>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- video-area-end -->
${ctaFinal('Vamos conversar sobre <br>a sua marca?')}
      </main>
      <!-- main-area-end -->
${rodape()}`
});

/* ============================================================
   COMO FUNCIONA
============================================================ */
paginas.push({
  arquivo: 'como-funciona.html',
  html: `${head('Terceirize sua produção de cosméticos | Firetti', 'Crie sua marca de cosméticos com uma operação completa: pesquisa, formulação, produção, controle de qualidade, envase e suporte.', 'assets/img/og/og-terceirize-producao-1200x630.png')}
${header('como-funciona')}

      <!-- main-area -->
      <main id="conteudo-principal">
${breadcrumb('Terceirize sua produção', '<a href="index.html">Início</a> : Como funciona', BG_PLANTA)}
         <!-- intro-area -->
         <section class="about-area pt-120 pb-40">
            <div class="container">
               <div class="row justify-content-center">
                  <div class="col-lg-9 text-center">
                     <div class="tp-section">
                        <span class="tp-section__sub-title left-line right-line mb-25">Como funciona?</span>
                        <h2 class="tp-section__title mb-35">Da ideia ao produto pronto, em um só lugar</h2>
                        <p class="mb-30">Iremos produzir um mix de produtos com a sua marca e ajudar você a empreender no mercado cosmético. A Firetti oferece matérias-primas de alta qualidade e uma estrutura de produção eficiente — você foca na marca, a gente cuida da fábrica.</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- intro-area-end -->

         <!-- etapas-area -->
         <section class="processo-area pt-40 pb-60">
            <div class="container">
               <div class="row">
                  <div class="col-xl-4 col-md-6">
                     <div class="services-item firetti-step mb-40 wow fadeInUp" data-wow-delay=".2s">
                        <div class="firetti-step__num mb-30" aria-hidden="true">1</div>
                        <div class="services-item__content">
                           <h3 class="services-item__tp-title mb-30">Atendimento</h3>
                           <p>Nosso time esclarece suas dúvidas sobre o procedimento e levanta as informações indispensáveis para um resumo detalhado do projeto, ampliando a precisão da produção.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-4 col-md-6">
                     <div class="services-item firetti-step mb-40 wow fadeInUp" data-wow-delay=".3s">
                        <div class="firetti-step__num mb-30" aria-hidden="true">2</div>
                        <div class="services-item__content">
                           <h3 class="services-item__tp-title mb-30">Pesquisa</h3>
                           <p>Pesquisamos o que a sua marca precisa para nascer bem: mercado, parcerias, concorrentes, insumos e outros elementos relevantes.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-4 col-md-6">
                     <div class="services-item firetti-step mb-40 wow fadeInUp" data-wow-delay=".4s">
                        <div class="firetti-step__num mb-30" aria-hidden="true">3</div>
                        <div class="services-item__content">
                           <h3 class="services-item__tp-title mb-30">Desenvolvimento do produto</h3>
                           <p>A linha é estruturada a partir dos objetivos da marca, das necessidades do público e das possibilidades de formulação, embalagem e posicionamento.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-4 col-md-6">
                     <div class="services-item firetti-step mb-40 wow fadeInUp" data-wow-delay=".5s">
                        <div class="firetti-step__num mb-30" aria-hidden="true">4</div>
                        <div class="services-item__content">
                           <h3 class="services-item__tp-title mb-30">Produção</h3>
                           <p>Com as definições aprovadas, conduzimos a fabricação e o envase com rastreabilidade, agilidade e foco em qualidade.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-4 col-md-6">
                     <div class="services-item firetti-step mb-40 wow fadeInUp" data-wow-delay=".6s">
                        <div class="firetti-step__num mb-30" aria-hidden="true">5</div>
                        <div class="services-item__content">
                           <h3 class="services-item__tp-title mb-30">Controle de qualidade</h3>
                           <p>Todo o processo é supervisionado lote a lote, seguindo procedimentos operacionais elaborados pela equipe de gestão da qualidade.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-4 col-md-6">
                     <div class="services-item firetti-step mb-40 wow fadeInUp" data-wow-delay=".7s">
                        <div class="firetti-step__num mb-30" aria-hidden="true">6</div>
                        <div class="services-item__content">
                           <h3 class="services-item__tp-title mb-30">Contrato</h3>
                           <p>Cada cliente da Firetti tem seu produto desenvolvido de forma exclusiva. Para essa garantia, fornecemos contrato de fabricação e confidencialidade.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- etapas-area-end -->

         <!-- reconhecimento-area -->
         <section class="choose-area theme-bg pt-120 pb-130">
            <div class="container">
               <div class="row">
                  <div class="col-lg-12">
                     <div class="tp-section text-center">
                        <span class="tp-section__sub-title left-line right-line mb-25">Empresa qualificada</span>
                        <h2 class="tp-section__title title-white mb-40">Reconhecimento nacional</h2>
                     </div>
                  </div>
               </div>
               <div class="row justify-content-center">
                  <div class="col-lg-9 text-center mb-60">
                     <p style="color: var(--tp-text-1);">A Firetti conta com uma equipe qualificada e reconhecida nacionalmente por suas competências, selecionada de forma criteriosa para atuar na produção do seu produto. Todo o processo atende às normas da Anvisa e às boas práticas de fabricação.</p>
                  </div>
               </div>
               <div class="row">
                  <div class="col-xl-3 col-md-6">
                     <div class="tp-choose__item ml-15 mb-60 wow fadeInUp" data-wow-delay=".2s">
                        <div class="tp-choose__icon mb-40">
                           <i class="flaticon-chemistry" aria-hidden="true"></i>
                        </div>
                        <div class="tp-choose__content">
                           <h3 class="tp-choose__title mb-20">Full <br>service</h3>
                           <p>Formulação, produção, envase e <br>rotulagem: produto pronto <br>para entrega.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-3 col-md-6">
                     <div class="tp-choose__item ml-35 mb-60 wow fadeInUp" data-wow-delay=".4s">
                        <div class="tp-choose__icon pink-icon mb-40">
                           <i class="flaticon-heart" aria-hidden="true"></i>
                        </div>
                        <div class="tp-choose__content">
                           <h3 class="tp-choose__title mb-20">Sustentabilidade</h3>
                           <p>Matérias-primas inspecionadas e <br>inovações que reduzem <br>impactos ambientais.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-3 col-md-6">
                     <div class="tp-choose__item ml-55 mb-60 wow fadeInUp" data-wow-delay=".6s">
                        <div class="tp-choose__icon green-icon mb-40">
                           <i class="flaticon-24-hours-1" aria-hidden="true"></i>
                        </div>
                        <div class="tp-choose__content">
                           <h3 class="tp-choose__title mb-20">Agilidade</h3>
                           <p>Desenvolvimento, produção e <br>entrega integrados, com <br>velocidade e responsabilidade.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-3 col-md-6">
                     <div class="tp-choose__item ml-75 mb-60 wow fadeInUp" data-wow-delay=".8s">
                        <div class="tp-choose__icon sky-icon mb-40">
                           <i class="flaticon-team" aria-hidden="true"></i>
                        </div>
                        <div class="tp-choose__content">
                           <h3 class="tp-choose__title mb-20">Suporte <br>humano</h3>
                           <p>Atendimento personalizado que <br>acompanha cada etapa <br>do projeto.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- reconhecimento-area-end -->
${formOrcamento('Faça seu orçamento', 'Possuímos um acervo com mais de 500 fórmulas prontas para fabricação, dentro de todas as normas regulatórias da Anvisa. Preencha e receba o contato dos nossos especialistas.')}
${ctaFinal('Dê o primeiro passo para <br>ter a sua própria linha')}
      </main>
      <!-- main-area-end -->
${rodape()}`
});

/* ============================================================
   CONTATO
============================================================ */
paginas.push({
  arquivo: 'contato.html',
  html: `${head('Fale com a Firetti | Orçamento para cosméticos', 'Entre em contato para tirar dúvidas, solicitar um orçamento ou iniciar o desenvolvimento da sua linha de cosméticos.', 'assets/img/og/og-fale-conosco-1200x630.png')}
${header('contato')}

      <!-- main-area -->
      <main id="conteudo-principal">
${breadcrumb('Fale conosco', '<a href="index.html">Início</a> : Contato', BG_PLANTA)}
         <!-- contact-area -->
         <section class="contact-area pt-130 pb-115">
            <div class="container">
               <div class="row justify-content-center mb-40">
                  <div class="col-lg-8 text-center">
                     <div class="tp-section">
                        <span class="tp-section__sub-title left-line right-line mb-25">Como podemos ajudar?</span>
                        <h2 class="tp-section__title mb-30">Estamos aqui para ouvir e orientar</h2>
                        <p class="mb-30">A comunicação transparente e ágil é um dos pilares do nosso relacionamento com o cliente. Seja para tirar dúvidas, iniciar um projeto ou relatar algo importante, nosso time está pronto para atender com respeito, prontidão e profissionalismo.</p>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-lg-4 col-md-5 col-12">
                     <div class="tpcontact mr-60 mb-60 wow fadeInUp" data-wow-delay=".2s">
                        <div class="tpcontact__item text-center">
                           <div class="tpcontact__icon mb-20">
                              <img src="assets/img/icon/contact-01.svg" alt="" aria-hidden="true">
                           </div>
                           <div class="tpcontact__address">
                              <h3 class="tpcontact__title mb-15">Endereço</h3>
                              <span><a href="https://maps.app.goo.gl/TPQcMniH4i4BLasX9" target="_blank" rel="noopener">Rua Luiz Vitoretti, 485 <br>Cedral/SP – CEP 15895-000</a></span>
                           </div>
                        </div>
                     </div>
                     <div class="tpcontact mr-60 mb-60 wow fadeInUp" data-wow-delay=".4s">
                        <div class="tpcontact__item text-center">
                           <div class="tpcontact__icon mb-20">
                              <img src="assets/img/icon/contact-02.svg" alt="" aria-hidden="true">
                           </div>
                           <div class="tpcontact__address">
                              <h3 class="tpcontact__title mb-15">Telefone e WhatsApp</h3>
                              <span><a href="tel:+551732661022">(17) 3266-1022</a></span>
                              <span><a href="https://wa.me/5517991262215" target="_blank" rel="noopener">(17) 99126-2215</a></span>
                           </div>
                        </div>
                     </div>
                     <div class="tpcontact mr-60 mb-60 wow fadeInUp" data-wow-delay=".6s">
                        <div class="tpcontact__item text-center">
                           <div class="tpcontact__icon mb-20">
                              <img src="assets/img/icon/contact-03.svg" alt="" aria-hidden="true">
                           </div>
                           <div class="tpcontact__address">
                              <h3 class="tpcontact__title mb-15">Horário de atendimento</h3>
                              <span>Segunda a sexta: 8h às 18h <br>Sábado: 8h às 12h <br>Domingo: fechado</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-8 col-md-7 col-12">
                     <div class="contactform wow fadeInUp" data-wow-delay=".4s">
                        <h3 class="contactform__title mb-15">Solicite um orçamento</h3>
                        <p class="mb-35">Possuímos um acervo com mais de 500 fórmulas prontas para fabricação, dentro de todas as normas regulatórias da Anvisa. Preencha o formulário: a mensagem chega ao nosso time pelo WhatsApp e retornamos em horário comercial.</p>
                        <div class="contactform__list mb-60">
                           <form class="js-form-orcamento" action="#" novalidate>
                              <div class="row">
                                 <div class="col-lg-6">
                                    <div class="contactform__input mb-30">
                                       <label class="visually-hidden" for="ct-nome">Nome completo</label>
                                       <input id="ct-nome" name="nome" type="text" placeholder="Nome completo" required autocomplete="name">
                                    </div>
                                 </div>
                                 <div class="col-lg-6">
                                    <div class="contactform__input mb-30">
                                       <label class="visually-hidden" for="ct-cidade">Cidade</label>
                                       <input id="ct-cidade" name="cidade" type="text" placeholder="Cidade" required autocomplete="address-level2">
                                    </div>
                                 </div>
                                 <div class="col-lg-6">
                                    <div class="contactform__input mb-30">
                                       <label class="visually-hidden" for="ct-email">E-mail</label>
                                       <input id="ct-email" name="email" type="email" placeholder="E-mail" required autocomplete="email">
                                    </div>
                                 </div>
                                 <div class="col-lg-6">
                                    <div class="contactform__input mb-30">
                                       <label class="visually-hidden" for="ct-telefone">Telefone</label>
                                       <input id="ct-telefone" name="telefone" type="tel" placeholder="Telefone (DDD + número)" required autocomplete="tel">
                                    </div>
                                 </div>
                                 <div class="col-lg-12">
                                    <div class="contactform__input mb-30">
                                       <label class="visually-hidden" for="ct-mensagem">Mensagem</label>
                                       <textarea id="ct-mensagem" name="mensagem" placeholder="Como podemos ajudar? (opcional)"></textarea>
                                    </div>
                                 </div>
                                 <div class="col-lg-12">
                                    <p class="firetti-form-error" role="alert" hidden>Preencha os campos obrigatórios antes de enviar.</p>
                                 </div>
                                 <div class="col-lg-12">
                                    <div class="contactform__input mb-30-btn">
                                       <button type="submit" class="tp-btn">Enviar via WhatsApp</button>
                                    </div>
                                 </div>
                              </div>
                           </form>
                        </div>
                        <div class="row">
                           <div class="col-lg-12">
                              <div class="tpcontactmap">
                                 <iframe title="Mapa: Firetti, Rua Luiz Vitoretti 485, Cedral/SP" src="https://www.google.com/maps?q=Rua+Luiz+Vitoretti,+485,+Cedral+-+SP,+15895-000&output=embed" width="600" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- contact-area-end -->

      </main>
      <!-- main-area-end -->
${rodape()}`
});

/* ============================================================
   FAQ
============================================================ */
const faqItens = [
  {
    p: 'A fábrica é própria?',
    r: 'Sim. A produção é feita na planta da Firetti em Cedral, interior de São Paulo, com estrutura própria de fabricação, envase e controle de qualidade. Visitas podem ser agendadas com o nosso time comercial.'
  },
  {
    p: 'Qual é a quantidade mínima de produção?',
    r: 'A quantidade mínima varia conforme o tipo de produto, a embalagem e o nível de personalização da fórmula. Ao enviar sua lista de orçamento, retornamos com a quantidade mínima e as condições para cada item.'
  },
  {
    p: 'Preciso ter empresa aberta para terceirizar?',
    r: 'Para registrar e comercializar os produtos com a sua marca é necessário ter CNPJ. Se você ainda está começando, nosso time orienta sobre os passos e a ordem certa de cada etapa durante o atendimento.'
  },
  {
    p: 'Quem cuida do registro na Anvisa?',
    r: 'A Firetti conduz o protocolo junto aos órgãos competentes: notificação ou registro do produto, documentação técnica e adequação de rotulagem. Você acompanha tudo sem precisar dominar o assunto.'
  },
  {
    p: 'A fórmula da minha linha é exclusiva?',
    r: 'Cada cliente tem seu produto desenvolvido de forma exclusiva. Essa garantia é formalizada em contrato de fabricação e confidencialidade assinado entre as partes.'
  },
  {
    p: 'Quanto tempo leva para o produto ficar pronto?',
    r: 'Depende do caminho escolhido: fórmulas do nosso acervo são mais rápidas; fórmulas exclusivas passam por desenvolvimento e testes. O prazo também considera o processo regulatório de cada categoria. Você recebe um cronograma no início do projeto.'
  },
  {
    p: 'Posso escolher a embalagem e o rótulo?',
    r: 'Sim. Você define tipo de embalagem, material, volume e decoração (rótulo adesivo ou impressão), com apoio do nosso time de design para a identidade visual do produto.'
  },
  {
    p: 'Como funciona o orçamento?',
    r: 'Você monta a sua lista no catálogo — com embalagem, volume e quantidade — e envia pelo formulário. A lista chega formatada ao nosso time pelo WhatsApp, e retornamos com valores, quantidades mínimas e prazos.'
  }
];

const accordion = faqItens
  .map((item, i) => {
    const n = i + 1;
    const aberto = i === 0;
    return `                           <div class="accordion-items">
                             <h3 class="accordion-header" id="faq-header-${n}">
                               <button class="accordion-button${aberto ? '' : ' collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-${n}" aria-expanded="${aberto}" aria-controls="faq-collapse-${n}">${item.p}</button>
                             </h3>
                             <div id="faq-collapse-${n}" class="accordion-collapse collapse${aberto ? ' show' : ''}" aria-labelledby="faq-header-${n}" data-bs-parent="#faqAccordion">
                               <div class="accordion-content"><p>${item.r}</p></div>
                             </div>
                           </div>`;
  })
  .join('\n');

paginas.push({
  arquivo: 'faq.html',
  html: `${head('Perguntas frequentes | Firetti', 'Respostas sobre terceirização de cosméticos: quantidade mínima, registro na Anvisa, exclusividade de fórmula, prazos e orçamento.', 'assets/img/og/og-firetti-1200x630.png')}
${header('como-funciona')}

      <!-- main-area -->
      <main id="conteudo-principal">
${breadcrumb('Perguntas frequentes', '<a href="index.html">Início</a> : <a href="como-funciona.html">Como funciona</a> : FAQ', BG_PLANTA)}
         <!-- faq-area -->
         <section class="faq-area pt-125 pb-100">
            <div class="container">
               <div class="row justify-content-center">
                  <div class="col-lg-9">
                     <div class="tp-section text-center">
                        <span class="tp-section__sub-title left-line right-line mb-25">Tire suas dúvidas</span>
                        <h2 class="tp-section__title mb-60">O que todo empreendedor pergunta antes de terceirizar</h2>
                     </div>
                     <div class="faq-accordion wow fadeInUp" data-wow-delay=".3s">
                        <div class="accordion" id="faqAccordion">
${accordion}
                        </div>
                     </div>
                     <div class="text-center mt-60">
                        <p class="mb-25">Não encontrou a sua dúvida?</p>
                        <a class="tp-btn" href="contato.html">Fale com nossos especialistas</a>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- faq-area-end -->

      </main>
      <!-- main-area-end -->
${rodape()}`
});

/* ============================================================
   ORÇAMENTO (lista + formulário)
============================================================ */
paginas.push({
  arquivo: 'orcamento.html',
  html: `${head('Solicitar orçamento | Firetti', 'Monte sua lista de produtos e envie para o time comercial da Firetti pelo WhatsApp. Retornamos com valores, quantidades mínimas e prazos.', 'assets/img/og/og-firetti-1200x630.png')}
${header('catalogo')}

      <!-- main-area -->
      <main id="conteudo-principal">
${breadcrumb('Lista de orçamento', '<a href="index.html">Início</a> : Orçamento', BG_PRODUTOS)}
         <!-- lista-area -->
         <section class="cart-area pt-120 pb-40">
            <div class="container">
               <div class="row justify-content-center">
                  <div class="col-lg-9">
                     <div class="tp-section mb-40">
                        <span class="tp-section__sub-title left-line mb-20">Sua lista</span>
                        <h2 class="tp-section__title mb-25">Produtos selecionados</h2>
                        <p>Revise os produtos que você escolheu no catálogo. Ao enviar o formulário abaixo, a lista completa segue junto com os seus dados para o nosso time comercial.</p>
                     </div>
                     <ul id="firetti-lista-itens" class="firetti-lista-itens" aria-label="Produtos na lista de orçamento"></ul>
                     <div id="firetti-lista-vazia" hidden>
                        <p class="mb-25">Sua lista ainda está vazia. Explore o catálogo e adicione os produtos que deseja para a sua linha.</p>
                        <a class="tp-btn-second mb-40" href="catalogo.html">Explorar o catálogo</a>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- lista-area-end -->
${formOrcamento('Envie sua solicitação', 'Preencha seus dados: a mensagem abre no seu WhatsApp já formatada, com a lista de produtos incluída, pronta para enviar ao nosso time.')}
${ctaFinal('Prefere conversar <br>primeiro?')}
      </main>
      <!-- main-area-end -->
${rodape()}`
});

for (const p of paginas) {
  writeFileSync(resolve(RAIZ, p.arquivo), p.html);
  console.log(p.arquivo + ' gerado');
}
