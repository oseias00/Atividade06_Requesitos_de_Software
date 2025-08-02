// Simulação de dados do curso
const cursoIngles = [
    {
        pergunta: "Qual é a tradução de 'Olá'?",
        tipo: "multipla-escolha",
        opcoes: ["Hello", "Bonjour", "Hola"],
        respostaCorreta: "Hello"
    },
    {
        pergunta: "Traduza 'Eu sou uma mulher'.",
        tipo: "texto",
        respostaCorreta: "I am a woman"
    },
    {
        pergunta: "Complete a frase: The car is ___",
        tipo: "multipla-escolha",
        opcoes: ["red", "bleu", "vert"],
        respostaCorreta: "red"
    }
];

let usuarioLogado = false;
let licaoAtualIndex = 0;
let acertos = 0;

const appContainer = document.getElementById('app-container');

function renderizarTelaLogin() {
    appContainer.innerHTML = `
        <div class="tela-login">
            <h2>Bem-vindo ao Duolingo</h2>
            <input type="text" placeholder="Nome de usuário">
            <input type="password" placeholder="Senha">
            <button onclick="fazerLogin()">Entrar</button>
            <button onclick="alert('Funcionalidade de cadastro em desenvolvimento!')">Criar Conta</button>
        </div>
    `;
}

function fazerLogin() {
    // Lógica simples de login
    usuarioLogado = true;
    renderizarTelaCursos();
}

function renderizarTelaCursos() {
    appContainer.innerHTML = `
        <div class="tela-cursos">
            <h2>Selecione um Idioma</h2>
            <button onclick="iniciarLicao()">Inglês</button>
            <button disabled>Espanhol (Em breve)</button>
        </div>
    `;
}

function iniciarLicao() {
    licaoAtualIndex = 0;
    acertos = 0;
    renderizarLicao();
}

function renderizarLicao() {
    const licao = cursoIngles[licaoAtualIndex];
    if (!licao) {
        renderizarResumo();
        return;
    }

    let exercicioHtml = '';
    if (licao.tipo === 'multipla-escolha') {
        let opcoesHtml = licao.opcoes.map(opcao => `<button onclick="verificarResposta('${opcao}')">${opcao}</button>`).join('');
        exercicioHtml = `<div class="opcoes">${opcoesHtml}</div>`;
    } else if (licao.tipo === 'texto') {
        exercicioHtml = `
            <input type="text" id="resposta-texto" placeholder="Digite sua resposta">
            <button onclick="verificarRespostaTexto()">Verificar</button>
        `;
    }

    appContainer.innerHTML = `
        <div class="tela-licao">
            <h3>Lição ${licaoAtualIndex + 1} de ${cursoIngles.length}</h3>
            <div class="exercicio">
                <p class="pergunta">${licao.pergunta}</p>
                ${exercicioHtml}
            </div>
            <div id="feedback" class="feedback"></div>
        </div>
    `;
}

function verificarResposta(resposta) {
    const licao = cursoIngles[licaoAtualIndex];
    const feedbackDiv = document.getElementById('feedback');

    if (resposta === licao.respostaCorreta) {
        acertos++;
        feedbackDiv.textContent = 'Correto!';
        feedbackDiv.className = 'feedback correto';
    } else {
        feedbackDiv.textContent = 'Incorreto. A resposta é ' + licao.respostaCorreta;
        feedbackDiv.className = 'feedback incorreto';
    }

    // Avança para a próxima lição após um pequeno atraso
    setTimeout(() => {
        licaoAtualIndex++;
        renderizarLicao();
    }, 1500);
}

function verificarRespostaTexto() {
    const resposta = document.getElementById('resposta-texto').value;
    verificarResposta(resposta);
}

function renderizarResumo() {
    appContainer.innerHTML = `
        <div class="tela-resumo">
            <h2>Lição Concluída!</h2>
            <p>Você acertou ${acertos} de ${cursoIngles.length} perguntas.</p>
            <button onclick="renderizarTelaCursos()">Continuar</button>
        </div>
    `;
}

// Inicia a aplicação na tela de login
window.onload = renderizarTelaLogin;