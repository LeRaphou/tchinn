// Éléments DOM
const screens = {
    players: document.getElementById('players-screen'),
    mode: document.getElementById('mode-screen'),
    game: document.getElementById('game-screen'),
    addPlayer: document.getElementById('add-player-screen')
};

const buttons = {
    addPlayer: document.getElementById('add-player-btn'),
    startGame: document.getElementById('start-game-btn'),
    // ... autres boutons
};

const inputs = {
    playerName: document.getElementById('player-name'),
    playerNameDuringGame: document.getElementById('player-name-during-game')
};

const displays = {
    playersList: document.getElementById('players-list'),
    // ... autres éléments d'affichage
};

const modeCards = document.querySelectorAll('.mode-card');