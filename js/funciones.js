const questions = [
    {
        question: '¿ Cual es la integral de:∫ sin(3x) dx?',
        answers: ['x/2 - sin(2x)/4 + C', '-(1/3) cos(3x) + C', 'sec²(x²) + C', '-csc(4x) + C'],
        correct: 1
    },
    {
        question: '¿ Cual es la integral de: ∫ cos(2x²)·2x dx ?',
        answers: ['(1/2) sin(2x²) + C', 'x/2 - sin(2x)/4 + C', '(1/4) sec(4x) + C', 'sec²(x²) + C'],
        correct: 0
    },
    {
        question: '¿ Cual es la integral de: ∫ sec²(3x) dx ?',
        answers: ['-(1/3) cos(3x) + C', '(1/2) cot(2x) + C', 'x/2 - sin(2x)/4 + C', '(1/3) tan(3x) + C'],
        correct: 3
    },
    {
        question: '¿ Cual es la integral de: ∫ csc(5x) cot(5x) dx  ?',
        answers: ['x/4 - sin(2x)/4 + C', '(1/5) csc(5x) + C', '-(1/5) csc(5x) + C', 'csc(4x) + C'],
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
