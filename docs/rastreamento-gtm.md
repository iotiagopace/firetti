# Rastreamento — eventos para o GTM / GA4

Container: **GTM-55ZV3JNR** (instalado nas 54 páginas).
O site envia os eventos abaixo ao `dataLayer`. No GTM, basta criar as variáveis, os acionadores e as tags de evento do GA4.

> Nenhum evento carrega dado pessoal (nome, e-mail, telefone, cidade). O GA4 proíbe esse tipo de dado.

## Eventos

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `orcamento_enviado` | Formulário de orçamento **válido** enviado ao WhatsApp (qualquer página). Não dispara se faltar campo obrigatório. | `pagina`, `itens_na_lista`, `com_lista` (true/false), `com_mensagem` (true/false) |
| `produto_adicionado` | Produto entra na lista de orçamento | `produto_id`, `produto_nome`, `produto_linha`, `origem` (`card` / `configurador` / `sob_medida`), `itens_na_lista` |
| `clique_whatsapp` | Clique em link direto do WhatsApp (botões e rodapé) | `local` (`cabecalho` / `menu_mobile` / `rodape` / `cta_final` / `formulario` / `conteudo`), `pagina` |
| `clique_telefone` | Clique em link de telefone | `local`, `pagina` |

`orcamento_enviado` é a **conversão principal**. Ele não aparece como `clique_whatsapp`: o envio do formulário abre o WhatsApp por código, não por link.

## Configuração no GTM

1. **Variáveis** → Variável da camada de dados, uma para cada parâmetro: `pagina`, `itens_na_lista`, `com_lista`, `com_mensagem`, `produto_id`, `produto_nome`, `produto_linha`, `origem`, `local`.
2. **Acionadores** → Evento personalizado, um para cada nome de evento (`orcamento_enviado`, `produto_adicionado`, `clique_whatsapp`, `clique_telefone`).
3. **Tags** → Google Analytics: evento GA4, com o mesmo nome do evento e os parâmetros correspondentes.
4. No **GA4** → Administrador → Eventos: marcar `orcamento_enviado` como **evento principal** (conversão). Opcional: `clique_whatsapp` como secundário.
5. Registrar `produto_linha` e `origem` como **dimensões personalizadas** (escopo de evento) para usar nos relatórios.

## Como testar

Modo de visualização do GTM (Preview) → abrir o site → adicionar um produto e enviar um orçamento. Os eventos aparecem na linha do tempo do Tag Assistant.
