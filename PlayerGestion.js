// Gestion des joueurs
function addPlayer(name) {
    if (name.trim() === '') {
        showErrorMessage('⚠️ Veuillez entrer un nom de joueur');
        return;
    }

    // Limiter la longueur du nom
    if (name.trim().length > 12) {
        showErrorMessage('⚠️ Le nom doit faire moins de 12 caractères');
        return;
    }

    gameData.players.push(name.trim());
    updatePlayersList();
    if (inputs.playerName) {
        inputs.playerName.value = '';
        inputs.playerName.focus();
    }

    // Mettre à jour l'état du bouton
    updateStartButtonState();
}

function addPlayerDuringGame(name) {
    // ... code pour ajouter un joueur pendant la partie
}

function removePlayer(index) {
    gameData.players.splice(index, 1);
    updatePlayersList();
    updateStartButtonState();
}

function removePlayerDuringGame(index) {
    // ... code pour supprimer un joueur pendant la partie
}

function updatePlayersList() {
    // ... code pour mettre à jour l'affichage de la liste des joueurs
}

function updatePlayersListDuringGame() {
    // ... code pour mettre à jour la liste pendant la partie
}

function validatePlayerCount() {
    if (gameData.players.length < 2) {
        showErrorMessage('❌ Il faut au moins 2 joueurs pour commencer une partie !');
        return false;
    }
    return true;
}

function updateStartButtonState() {
    // ... code pour mettre à jour l'état du bouton de démarrage
}