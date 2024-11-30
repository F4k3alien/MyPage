
document.addEventListener('DOMContentLoaded', () => {
    generateConfetti();
    generateEmojis();
});

function generateConfetti() {
    const confettiColors = ['#e91e63', '#2196f3', '#ffeb3b', '#4caf50', '#9c27b0'];
    const container = document.querySelector('body');

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        container.appendChild(confetti);
    }
}

function generateEmojis() {
    const emojis = ['🎉', '🎊', '😊', '🥳', '✨'];
    const container = document.querySelector('body');

    for (let i = 0; i < 30; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.animationDuration = `${Math.random() * 3 + 3}s`;
        container.appendChild(emoji);
    }
}
