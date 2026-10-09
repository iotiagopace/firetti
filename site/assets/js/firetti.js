/* Firetti — interações próprias do site
   Lista de orçamento (localStorage), formulários via WhatsApp,
   filtro do catálogo e configurador de produto. */
(function () {
	'use strict';

	var WHATSAPP = '5517981642219';
	var CHAVE = 'firettiLista';

	/* ---------- Eventos para o Google Tag Manager (dataLayer) ----------
	   Nunca enviar dados pessoais (nome, e-mail, telefone): o GA4 proíbe. */

	function rastrear(evento, dados) {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push(Object.assign({ event: evento }, dados || {}));
	}

	function localDoClique(el) {
		if (el.closest('header, #header-mob-sticky')) return 'cabecalho';
		if (el.closest('.tpsideinfo')) return 'menu_mobile';
		if (el.closest('footer')) return 'rodape';
		if (el.closest('.cta-area')) return 'cta_final';
		if (el.closest('.js-form-orcamento, #form-orcamento, .visit-serial')) return 'formulario';
		return 'conteudo';
	}

	/* ---------- Lista de orçamento (localStorage) ---------- */

	function lerLista() {
		try {
			return JSON.parse(localStorage.getItem(CHAVE)) || [];
		} catch (e) {
			return [];
		}
	}
	function salvarLista(lista) {
		try {
			localStorage.setItem(CHAVE, JSON.stringify(lista));
		} catch (e) { /* modo privado: a lista vive só na sessão da página */ }
		atualizarContadores(lista);
	}
	window.firettiLerLista = lerLista;

	function anunciar(texto) {
		var live = document.getElementById('firetti-live');
		if (!live) {
			live = document.createElement('div');
			live.id = 'firetti-live';
			live.className = 'visually-hidden';
			live.setAttribute('aria-live', 'polite');
			document.body.appendChild(live);
		}
		live.textContent = texto;
	}

	function atualizarContadores(lista) {
		lista = lista || lerLista();
		document.querySelectorAll('.firetti-lista-count').forEach(function (el) {
			el.textContent = lista.length;
			el.classList.toggle('tem-itens', lista.length > 0);
		});
	}

	function adicionarItem(item, origem) {
		var lista = lerLista();
		lista.push(item);
		salvarLista(lista);
		rastrear('produto_adicionado', {
			produto_id: item.slug || '',
			produto_nome: item.nome || '',
			produto_linha: item.linha || '',
			origem: origem || 'card',
			itens_na_lista: lista.length
		});
		anunciar(item.nome + ' adicionado à lista de orçamento. A lista tem ' + lista.length + ' item(ns).');
	}

	function removerItem(indice) {
		var lista = lerLista();
		var removido = lista.splice(indice, 1)[0];
		salvarLista(lista);
		if (removido) anunciar(removido.nome + ' removido da lista.');
		renderizarLista();
	}

	/* ---------- Formulários → WhatsApp ---------- */

	function valor(form, name) {
		var campo = form.querySelector('[name="' + name + '"]');
		return campo ? campo.value.trim() : '';
	}

	function montarMensagem(form) {
		var linhas = [
			'Olá! Quero um orçamento com a Firetti.',
			'',
			'Nome: ' + valor(form, 'nome'),
			'Cidade: ' + valor(form, 'cidade'),
			'E-mail: ' + valor(form, 'email'),
			'Telefone: ' + valor(form, 'telefone')
		];
		var mensagem = valor(form, 'mensagem');
		if (mensagem) linhas.push('', 'Sobre o projeto: ' + mensagem);
		var lista = lerLista();
		if (lista.length) {
			linhas.push('', 'Produtos da minha lista:');
			lista.forEach(function (item, i) {
				linhas.push((i + 1) + '. ' + item.nome + (item.detalhes ? ' — ' + item.detalhes : ''));
			});
		}
		return linhas.join('\n');
	}

	function validarForm(form) {
		var erro = form.querySelector('.firetti-form-error');
		var valido = true;
		form.querySelectorAll('[required]').forEach(function (campo) {
			var ok = campo.value.trim() !== '' && campo.checkValidity();
			campo.classList.toggle('firetti-campo-invalido', !ok);
			campo.setAttribute('aria-invalid', ok ? 'false' : 'true');
			if (!ok) valido = false;
		});
		if (erro) erro.hidden = valido;
		if (!valido) {
			var primeiro = form.querySelector('.firetti-campo-invalido');
			if (primeiro) primeiro.focus();
		}
		return valido;
	}

	/* ---------- Configurador de produto ---------- */

	function textoSelecionado(select) {
		return select && select.options[select.selectedIndex] ? select.options[select.selectedIndex].text : '';
	}

	function enviarConfigurador(form) {
		// Progressiva exige o ativo; o pedido sob medida exige a descrição.
		if (!validarForm(form)) return;

		var detalhes = [];
		var ativo = valor(form, 'ativo');
		if (ativo) detalhes.push('Ativo: ' + ativo);
		var descricao = valor(form, 'descricao');
		if (descricao) detalhes.push('Descrição: ' + descricao);
		['embalagem', 'material', 'volume', 'decoracao'].forEach(function (nome) {
			var sel = form.querySelector('[name="' + nome + '"]');
			if (sel && sel.value) detalhes.push(textoSelecionado(sel));
		});
		var qtd = valor(form, 'quantidade');
		detalhes.push(qtd ? qtd + ' unidades' : 'quantidade a definir');
		var obs = valor(form, 'observacao');
		if (obs) detalhes.push('Obs.: ' + obs);

		// No pedido sob medida, o nome do item vem da linha escolhida.
		var tipo = form.querySelector('[name="tipo"]');
		var nome = tipo ? 'Sob medida: ' + textoSelecionado(tipo) : (form.dataset.nome || 'Produto');

		adicionarItem({
			slug: form.dataset.slug || '',
			nome: nome,
			linha: tipo ? textoSelecionado(tipo) : (form.dataset.linha || ''),
			detalhes: detalhes.join(', ')
		}, tipo ? 'sob_medida' : 'configurador');

		var feedback = form.querySelector('.firetti-add-feedback');
		if (feedback) {
			feedback.hidden = false;
			window.clearTimeout(feedback._timer);
			feedback._timer = window.setTimeout(function () { feedback.hidden = true; }, 4000);
		}
	}

	/* ---------- Página da lista (orcamento.html) ---------- */

	function renderizarLista() {
		var alvo = document.getElementById('firetti-lista-itens');
		if (!alvo) return;
		var vazio = document.getElementById('firetti-lista-vazia');
		var lista = lerLista();
		if (!lista.length) {
			alvo.innerHTML = '';
			if (vazio) vazio.hidden = false;
			return;
		}
		if (vazio) vazio.hidden = true;
		alvo.innerHTML = lista.map(function (item, i) {
			return '<li class="firetti-lista-item">' +
				'<div class="firetti-lista-item__info">' +
				'<strong>' + escaparHtml(item.nome) + '</strong>' +
				'<span>' + escaparHtml(item.detalhes || '') + '</span>' +
				'</div>' +
				'<button type="button" class="firetti-lista-item__remover" data-indice="' + i + '" aria-label="Remover ' + escaparHtml(item.nome) + ' da lista">' +
				'<i class="fal fa-times" aria-hidden="true"></i> Remover</button>' +
				'</li>';
		}).join('');
	}

	function escaparHtml(texto) {
		var div = document.createElement('div');
		div.textContent = texto || '';
		return div.innerHTML;
	}

	/* ---------- Filtro do catálogo ---------- */

	function aplicarFiltro(categoria) {
		var cards = document.querySelectorAll('[data-categoria]');
		if (!cards.length) return;
		cards.forEach(function (card) {
			var mostrar = categoria === 'todos' || card.dataset.categoria === categoria;
			card.hidden = !mostrar;
		});
		document.querySelectorAll('.firetti-chip').forEach(function (chip) {
			var ativo = chip.dataset.filtro === categoria;
			chip.classList.toggle('ativo', ativo);
			chip.setAttribute('aria-pressed', ativo ? 'true' : 'false');
		});
		var url = new URL(window.location.href);
		if (categoria === 'todos') url.searchParams.delete('categoria');
		else url.searchParams.set('categoria', categoria);
		window.history.replaceState(null, '', url);
	}

	function iniciarFiltro() {
		var chips = document.querySelectorAll('.firetti-chip');
		if (!chips.length) return;
		chips.forEach(function (chip) {
			chip.addEventListener('click', function () {
				aplicarFiltro(chip.dataset.filtro);
			});
		});
		var params = new URLSearchParams(window.location.search);
		var inicial = params.get('categoria');
		aplicarFiltro(inicial === 'capilares' || inicial === 'corporais' || inicial === 'faciais' ? inicial : 'todos');
	}

	/* ---------- Eventos ---------- */

	document.addEventListener('submit', function (evento) {
		var form = evento.target;
		if (form.matches('#form-orcamento, .js-form-orcamento')) {
			evento.preventDefault();
			if (!validarForm(form)) return;
			var itensLista = lerLista();
			rastrear('orcamento_enviado', {
				pagina: window.location.pathname.replace(/\.html$/, '') || '/',
				itens_na_lista: itensLista.length,
				com_lista: itensLista.length > 0,
				com_mensagem: valor(form, 'mensagem') !== ''
			});
			var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(montarMensagem(form));
			window.open(url, '_blank', 'noopener');
			return;
		}
		if (form.matches('.js-configurador')) {
			evento.preventDefault();
			enviarConfigurador(form);
		}
	});

	document.addEventListener('click', function (evento) {
		var contato = evento.target.closest('a[href*="wa.me/"], a[href^="tel:"]');
		if (contato) {
			var whats = contato.href.indexOf('wa.me/') !== -1;
			rastrear(whats ? 'clique_whatsapp' : 'clique_telefone', {
				local: localDoClique(contato),
				pagina: window.location.pathname.replace(/\.html$/, '') || '/'
			});
		}
		var botao = evento.target.closest('.js-adicionar-rapido');
		if (botao) {
			evento.preventDefault();
			adicionarItem({
				slug: botao.dataset.slug || '',
				nome: botao.dataset.nome || 'Produto',
				linha: botao.dataset.linha || '',
				detalhes: 'configuração a definir'
			}, 'card');
			botao.classList.add('adicionado');
			botao.textContent = 'Adicionado à lista';
			window.setTimeout(function () {
				botao.classList.remove('adicionado');
				botao.innerHTML = '<i class="fal fa-plus" aria-hidden="true"></i> Adicionar à lista';
			}, 2500);
			return;
		}
		var seta = evento.target.closest('.firetti-carrossel__seta');
		if (seta) {
			var car = seta.closest('.firetti-carrossel');
			irPara(car, indiceAtual(car) + (seta.classList.contains('proxima') ? 1 : -1));
			return;
		}
		var ponto = evento.target.closest('.firetti-carrossel__ponto');
		if (ponto) {
			irPara(ponto.closest('.firetti-carrossel'), parseInt(ponto.dataset.indice, 10));
			return;
		}
		var thumb = evento.target.closest('.firetti-galeria__thumb');
		if (thumb) {
			var principal = document.getElementById('foto-produto');
			if (principal) principal.src = thumb.dataset.img;
			thumb.closest('.firetti-galeria').querySelectorAll('.firetti-galeria__thumb').forEach(function (t) {
				t.classList.toggle('ativo', t === thumb);
			});
			return;
		}
		var remover = evento.target.closest('.firetti-lista-item__remover');
		if (remover) {
			removerItem(parseInt(remover.dataset.indice, 10));
		}
	});

	/* ---------- Carrossel de fotos do produto ---------- */

	function irPara(carrossel, indice) {
		var trilha = carrossel.querySelector('.firetti-carrossel__trilha');
		var slides = trilha.children;
		var total = slides.length;
		if (!total) return;
		var i = (indice + total) % total;
		// A suavidade vem do CSS (scroll-behavior), que respeita prefers-reduced-motion.
		trilha.scrollTo({ left: slides[i].offsetLeft - trilha.offsetLeft });
	}

	function indiceAtual(carrossel) {
		var trilha = carrossel.querySelector('.firetti-carrossel__trilha');
		var largura = trilha.clientWidth || 1;
		return Math.round(trilha.scrollLeft / largura);
	}

	function sincronizarPontos(carrossel) {
		var atual = indiceAtual(carrossel);
		carrossel.querySelectorAll('.firetti-carrossel__ponto').forEach(function (ponto, i) {
			ponto.classList.toggle('ativo', i === atual);
			ponto.setAttribute('aria-current', i === atual ? 'true' : 'false');
		});
	}

	function iniciarCarrosseis() {
		document.querySelectorAll('.firetti-carrossel').forEach(function (carrossel) {
			var trilha = carrossel.querySelector('.firetti-carrossel__trilha');
			if (!trilha || trilha.children.length < 2) return;
			var aguardando;
			trilha.addEventListener('scroll', function () {
				window.cancelAnimationFrame(aguardando);
				aguardando = window.requestAnimationFrame(function () { sincronizarPontos(carrossel); });
			}, { passive: true });
		});
	}

	/* ---------- Vídeos decorativos: só carregam ao entrar na tela ---------- */

	function iniciarVideos() {
		var videos = document.querySelectorAll('.js-video-loop');
		if (!videos.length) return;

		// Quem pediu menos movimento fica só com o poster.
		var semMovimento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (semMovimento) return;

		// Em conexões lentas ou com economia de dados, o poster basta.
		var rede = navigator.connection;
		if (rede && (rede.saveData || /2g/.test(rede.effectiveType || ''))) return;

		function carregar(video) {
			if (video.dataset.carregado) return;
			video.dataset.carregado = '1';
			[['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(function (par) {
				var url = video.dataset[par[0]];
				if (!url) return;
				var source = document.createElement('source');
				source.src = url;
				source.type = par[1];
				video.appendChild(source);
			});
			video.load();
			var tocar = video.play();
			if (tocar && tocar.catch) tocar.catch(function () { /* autoplay bloqueado: fica o poster */ });
			video.classList.add('pronto');
		}

		if (!('IntersectionObserver' in window)) return;
		var observador = new IntersectionObserver(function (entradas) {
			entradas.forEach(function (entrada) {
				if (!entrada.isIntersecting) {
					if (entrada.target.dataset.carregado) entrada.target.pause();
					return;
				}
				carregar(entrada.target);
				if (entrada.target.paused && entrada.target.dataset.carregado) {
					var r = entrada.target.play();
					if (r && r.catch) r.catch(function () {});
				}
			});
		}, { rootMargin: '200px' });
		videos.forEach(function (v) { observador.observe(v); });
	}

	/* ---------- Pedido sob medida: linha vinda do catálogo ---------- */

	function preSelecionarTipo() {
		var sel = document.querySelector('.js-configurador [name="tipo"]');
		if (!sel) return;
		var tipo = new URLSearchParams(window.location.search).get('tipo');
		if (!tipo || !sel.querySelector('option[value="' + tipo + '"]')) return;
		sel.value = tipo;
		// O template troca os selects pelo plugin nice-select; ele precisa ser avisado.
		if (window.jQuery && window.jQuery.fn.niceSelect) window.jQuery(sel).niceSelect('update');
	}

	document.addEventListener('DOMContentLoaded', function () {
		atualizarContadores();
		renderizarLista();
		iniciarFiltro();
		iniciarVideos();
		iniciarCarrosseis();
		preSelecionarTipo();
	});
})();
