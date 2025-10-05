// ===== SUPPRIMER LA SAUVEGARDE =====
function saveGameData() {
    // Ne rien sauvegarder - les données ne seront pas conservées
}

function loadGameData() {
    // Ne rien charger - réinitialiser les données à chaque démarrage
    gameData.players = [];
    gameData.currentMode = null;
    gameData.usedQuestions = [];
    updatePlayersList();
    updateStartButtonState();
}