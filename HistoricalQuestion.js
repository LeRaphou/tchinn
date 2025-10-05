// Mettre à jour le compteur de questions
function updateQuestionCounter() {
    const questionNumberElement = document.getElementById('question-number');
    if (questionNumberElement) {
        questionNumberElement.textContent = questionHistory.length;
    }
}

// Fonction pour la navigation dans l'historique
function showPreviousQuestion() {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        if (displays.questionText) {
            displays.questionText.textContent = questionHistory[currentHistoryIndex];
            if (displays.questionText.parentElement) {
                displays.questionText.parentElement.classList.add('bounce');
                setTimeout(() => {
                    displays.questionText.parentElement.classList.remove('bounce');
                }, 600);
            }
        }
        updateQuestionCounter();
    } else {
        showErrorMessage('❌ Vous êtes déjà à la première question');
    }
}

function getModeDisplayName(mode) {
    const names = {
        classic: 'Classique',
        hard: 'Intense',
        duo: 'Duo',
        bar: 'Bar'
    };
    return names[mode] || mode;
}