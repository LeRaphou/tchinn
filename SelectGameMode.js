// Gestion des modes
function selectMode(mode) {
    modeCards.forEach(card => card.classList.remove('selected'));
    const selectedCard = document.querySelector(`[data-mode="${mode}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    gameData.currentMode = mode;

    const confirmModeBtn = document.getElementById('confirm-mode-btn');
    if (confirmModeBtn) {
        confirmModeBtn.disabled = false;
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