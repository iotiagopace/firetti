/* Firetti — interações próprias do site
   Formulários de orçamento: montam mensagem e abrem o WhatsApp comercial. */
(function () {
	'use strict';

	var WHATSAPP = '5517991262215';

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
		if (mensagem) {
			linhas.push('', 'Sobre o projeto: ' + mensagem);
		}
		// Itens adicionados à lista de orçamento (catálogo)
		var lista = window.firettiLerLista ? window.firettiLerLista() : [];
		if (lista.length) {
			linhas.push('', 'Produtos da minha lista:');
			lista.forEach(function (item, i) {
				linhas.push((i + 1) + '. ' + item.nome + ' — ' + item.detalhes);
			});
		}
		return linhas.join('\n');
	}

	function aoEnviar(evento) {
		var form = evento.target;
		if (!form.matches('#form-orcamento, .js-form-orcamento')) return;
		evento.preventDefault();

		var erro = form.querySelector('.firetti-form-error');
		var obrigatorios = form.querySelectorAll('[required]');
		var valido = true;
		obrigatorios.forEach(function (campo) {
			var ok = campo.value.trim() !== '' && campo.checkValidity();
			campo.classList.toggle('firetti-campo-invalido', !ok);
			campo.setAttribute('aria-invalid', ok ? 'false' : 'true');
			if (!ok) valido = false;
		});
		if (!valido) {
			if (erro) erro.hidden = false;
			var primeiro = form.querySelector('.firetti-campo-invalido');
			if (primeiro) primeiro.focus();
			return;
		}
		if (erro) erro.hidden = true;

		var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(montarMensagem(form));
		window.open(url, '_blank', 'noopener');
	}

	document.addEventListener('submit', aoEnviar);
})();
