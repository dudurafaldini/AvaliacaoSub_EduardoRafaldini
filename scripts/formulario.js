const formulario = document.getElementById("formulario-contato");
const confirmacao = document.getElementById("confirmacao");
const botaoConfirmar = document.getElementById("botao-confirmar");
const mensagemFinal = document.getElementById("mensagem-final");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoTelefone = document.getElementById("telefone");

const camposConfirmacao = {
    nome: document.getElementById("confirma-nome"),
    email: document.getElementById("confirma-email"),
    telefone: document.getElementById("confirma-telefone"),
    endereco: document.getElementById("confirma-endereco"),
    dataNascimento: document.getElementById("confirma-data"),
    origem: document.getElementById("confirma-origem"),
    mensagem: document.getElementById("confirma-mensagem"),
    novidades: document.getElementById("confirma-novidades")
};

const camposTexto = ["nome", "email", "telefone", "endereco", "origem", "mensagem"];

function textoOuPadrao(valor) {
    return valor.trim() || "Não informado";
}

function formatarData(data) {
    if (!data) {
        return "Não informada";
    }

    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

campoNome.addEventListener("input", function () {
    campoNome.value = campoNome.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
});

campoEmail.addEventListener("input", function () {
    campoEmail.value = campoEmail.value.replace(/\s/g, "").toLowerCase();
});

campoTelefone.addEventListener("input", function () {
    campoTelefone.value = campoTelefone.value.replace(/\D/g, "").slice(0, 11);
});

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    const dados = new FormData(formulario);

    camposTexto.forEach(function (campo) {
        camposConfirmacao[campo].textContent = textoOuPadrao(dados.get(campo));
    });

    camposConfirmacao.dataNascimento.textContent = formatarData(dados.get("dataNascimento"));
    camposConfirmacao.novidades.textContent = dados.has("novidades") ? "Sim" : "Não";

    confirmacao.hidden = false;
    mensagemFinal.textContent = "";
    botaoConfirmar.disabled = false;
    confirmacao.scrollIntoView({ behavior: "smooth", block: "start" });
});

botaoConfirmar.addEventListener("click", function () {
    mensagemFinal.textContent = "Envio concluído com sucesso.";
    botaoConfirmar.disabled = true;
    formulario.reset();
});
