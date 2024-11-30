const questions = [
    {
        question: '¿ Cual es la derivada de: x⁴ - x³?',
        answers: ['1/(2√x)', '4x³ - 3x²', '-1/x²', '1/x + 2x'],
        correct: 1
    },
    {
        question: '¿ Cual es la derivada de: sin(x²)?',
        answers: ['2x cos(x²)', 'x/2 - sin(2x)/4 + C', '-1/x²', '2e^(2x)'],
        correct: 0
    },
    {
        question: '¿ Cual es la derivada de: 1/x ?',
        answers: ['- 3x²', '- 8x', '- 2/4x²', '-1/x²'],
        correct: 3
    },
    {
        question: '¿ Cual es la derivada de: x³ + x ?',
        answers: ['2x', '1/x²', '3x² + 1', 'x + 2x'],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answersEl = document.querySelectorAll('.answer-btn');
const scoreEl = document.getElementById('score');
let restartButton = null;
let backButton = null;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answersEl.forEach((btn, index) => {
        btn.textContent = currentQuestion.answers[index];
        btn.style.display = 'block';
        btn.onclick = () => selectAnswer(index);
    });
}

function selectAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.correct) {
        score++;
        showNotification('¡Correcto!', 'success');
    } else {
        showNotification('Incorrecto.', 'error');
    }
    updateScore();
    nextQuestion();
}

function updateScore() {
    scoreEl.textContent = score;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    showNotification(`¡Juego terminado! Tu puntuación final es ${score} de ${questions.length}`, 'info');
    questionEl.textContent = '¡Juego terminado! Gracias por jugar.';
    answersEl.forEach((btn) => {
        btn.style.display = 'none';
    });

    const container = document.querySelector('.container');
    if (!restartButton) {
        restartButton = document.createElement('button');
        restartButton.textContent = 'Reiniciar Juego';
        restartButton.className = 'restart-btn';
        restartButton.onclick = resetGame;
        container.appendChild(restartButton);
    } else {
        restartButton.style.display = 'block';
    }

    if (!backButton) {
        backButton = document.createElement('button');
        backButton.textContent = 'Ir a Inicio';
        backButton.className = 'back-btn';
        backButton.onclick = () => window.location.href = 'index.html';
        container.appendChild(backButton);
    } else {
        backButton.style.display = 'block';
    }
}

function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    restartButton.style.display = 'none';
    backButton.style.display = 'none';
    answersEl.forEach((btn) => {
        btn.style.display = 'block';
    });
    loadQuestion();
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('hide');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 2000); // Mostrar notificación durante 2 segundos
}

window.onload = loadQuestion;
