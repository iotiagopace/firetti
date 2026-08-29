/* Firetti — interações próprias do site
   Lista de orçamento (localStorage), formulários via WhatsApp,
   filtro do catálogo e configurador de produto. */
(function () {
	'use strict';

	var WHATSAPP = '5517991262215';
	var CHAVE = 'firettiLista';

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

	function adicionarItem(item) {
		var lista = lerLista();
		lista.push(item);
		salvarLista(lista);
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
		var detalhes = [];
		['embalagem', 'material', 'volume', 'decoracao'].forEach(function (nome) {
			var sel = form.querySelector('[name="' + nome + '"]');
			if (sel && sel.value) detalhes.push(textoSelecionado(sel));
		});
		var qtd = valor(form, 'quantidade');
		detalhes.push(qtd ? qtd + ' unidades' : 'quantidade a definir');
		var obs = valor(form, 'observacao');
		if (obs) detalhes.push('Obs.: ' + obs);

		adicionarItem({
			slug: form.dataset.slug || '',
			nome: form.dataset.nome || 'Produto',
			detalhes: detalhes.join(', ')
		});

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
		var botao = evento.target.closest('.js-adicionar-rapido');
		if (botao) {
			evento.preventDefault();
			adicionarItem({
				slug: botao.dataset.slug || '',
				nome: botao.dataset.nome || 'Produto',
				detalhes: 'configuração a definir'
			});
			botao.classList.add('adicionado');
			botao.textContent = 'Adicionado à lista';
			window.setTimeout(function () {
				botao.classList.remove('adicionado');
				botao.innerHTML = '<i class="fal fa-plus" aria-hidden="true"></i> Adicionar à lista';
			}, 2500);
			return;
		}
		var remover = evento.target.closest('.firetti-lista-item__remover');
		if (remover) {
			removerItem(parseInt(remover.dataset.indice, 10));
		}
	});

	document.addEventListener('DOMContentLoaded', function () {
		atualizarContadores();
		renderizarLista();
		iniciarFiltro();
	});
})();
