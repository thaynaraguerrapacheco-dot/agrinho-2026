// Banco de dados das perguntas do Quiz
const quizData = [
    {
        id: 1,
        question: "A agricultura de precisão aumenta os custos de produção e polui mais o meio ambiente por utilizar mais tecnologia.",
        answer: false,
        explanation: "Falso! A tecnologia mapeia as reais necessidades do solo, aplicando insumos apenas onde é preciso, o que reduz gastos e evita desperdícios nocivos à natureza."
    },
    {
        id: 2,
        question: "O sistema ILPF (Integração Lavoura-Pecuária-Floresta) ajuda a neutralizar as emissões de gases de efeito estufa da pecuária.",
        answer: true,
        explanation: "Verdadeiro! As árvores plantadas nesse sistema realizam o sequestro de carbono da atmosfera, mitigando os gases emitidos pelos animais."
    },
    {
        id: 3,
        question: "Para aumentar a produção de alimentos no mundo, a única alternativa viável é o desmatamento de novas áreas verdes.",
        answer: false,
        explanation: "Falso! O foco atual é o aumento de produtividade vertical (produzir mais no mesmo espaço), recuperando solos degradados sem novos desmatamentos."
    },
    {
        id: 4,
        question: "O plantio direto na palha ajuda a reter a umidade do solo e evita a erosão causada pelas chuvas.",
        answer: true,
        explanation: "Verdadeiro! A cobertura de matéria orgânica protege a terra contra o impacto da chuva e reduz drasticamente a evaporação da água."
    }
];

let userAnswers = {};

// Função para construir o Quiz na tela
function buildQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ''; // Limpa o container

    quizData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${index + 1}. ${item.question}</h3>
            <div class="btn-container" id="buttons-q${item.id}">
                <button class="btn" onclick="checkAnswer(${item.id}, true)">Verdadeiro</button>
                <button class="btn" onclick="checkAnswer(${item.id}, false)">Falso</button>
            </div>
            <div id="feedback-q${item.id}" class="feedback hidden"></div>
        `;
        quizContainer.appendChild(card);
    });
}

// Função executada quando o usuário escolhe uma resposta
function checkAnswer(id, userAnswer) {
    // Evita que o usuário altere a resposta após já ter escolhido
    if (userAnswers[id] !== undefined) return;

    userAnswers[id] = userAnswer;
    const questionItem = quizData.find(q => q.id === id);
    const feedbackDiv = document.getElementById(`feedback-q${id}`);
    const btnContainer = document.getElementById(`buttons-q${id}`);

    // Desativa visualmente os botões daquela pergunta
    Array.from(btnContainer.children).forEach(btn => {
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
    });

    // Valida a resposta
    if (userAnswer === questionItem.answer) {
        feedbackDiv.className = "feedback correct-box";
        feedbackDiv.innerHTML = `<strong>✨ Correto!</strong> ${questionItem.explanation}`;
    } else {
        feedbackDiv.className = "feedback wrong-box";
        feedbackDiv.innerHTML = `<strong>❌ Incorreto.</strong> ${questionItem.explanation}`;
    }
    feedbackDiv.classList.remove('hidden');

    // Verifica se todas as perguntas foram respondidas para exibir o resultado final
    if (Object.keys(userAnswers).length === quizData.length) {
        showFinalResult();
    }
}

// Função para calcular e mostrar a nota final
function showFinalResult() {
    let score = 0;
    quizData.forEach(q => {
        if (userAnswers[q.id] === q.answer) score++;
    });

    const resultBox = document.getElementById('quiz-result');
    const resultText = document.getElementById('result-text');
    
    resultText.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas!`;
    resultBox.classList.remove('hidden');
    
    // Scroll suave para o resultado
    resultBox.scrollIntoView({ behavior: 'smooth' });
}

// Função para reiniciar o quiz
function restartQuiz() {
    userAnswers = {};
    document.getElementById('quiz-result').classList.add('hidden');
    buildQuiz();
    window.scrollTo({ top: document.querySelector('.quiz-section').offsetTop - 20, behavior: 'smooth' });
}

// Inicializa o app assim que a página carrega
window.onload = buildQuiz;
