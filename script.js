// ===== GESTION PWA ET HORS LIGNE =====
let deferredPrompt;
let isOnline = navigator.onLine;

// Gestion de la connexion
function updateConnectionStatus() {
    const statusElement = document.getElementById('connection-status');
    isOnline = navigator.onLine;

    if (statusElement) {
        if (isOnline) {
            statusElement.innerHTML = '🟢 En ligne';
            statusElement.className = 'connection-status online';
        } else {
            statusElement.innerHTML = '🔴 Hors ligne';
            statusElement.className = 'connection-status offline';
        }
    }
}

// Installation PWA
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('install-btn');
    if (installBtn) {
        installBtn.style.display = 'block';

        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    installBtn.style.display = 'none';
                }
                deferredPrompt = null;
            }
        });
    }
});

// Événements de connexion
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

// Initialisation de la connexion
updateConnectionStatus();

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker enregistré avec succès: ', registration.scope);
            })
            .catch(function(error) {
                console.log("Échec de l'enregistrement du ServiceWorker: ", error);
            });
    });
}

// ===== BLOCAGE COMPLET DU RAFRAÎCHISSEMENT =====
function blockRefreshCompletely() {
    // 1. Bloquer avant déchargement de la page
    window.addEventListener('beforeunload', function(e) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    });

    // 2. Bloquer toutes les touches de rafraîchissement
    document.addEventListener('keydown', function(e) {
        // F5, Ctrl+R, Ctrl+Shift+R, etc.
        if (e.key === 'F5' ||
            (e.ctrlKey && e.key === 'r') ||
            (e.ctrlKey && e.key === 'R') ||
            (e.ctrlKey && e.shiftKey && e.key === 'r') ||
            (e.ctrlKey && e.shiftKey && e.key === 'R')) {

            e.preventDefault();
            e.stopPropagation();
            showBlockedMessage();
            return false;
        }
    });

    // 3. Bloquer le menu contextuel (clic droit)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showBlockedMessage();
        return false;
    });

    // 4. Empêcher le drag & drop
    document.addEventListener('dragover', function(e) {
        e.preventDefault();
        return false;
    });

    document.addEventListener('drop', function(e) {
        e.preventDefault();
        return false;
    });
}

function showBlockedMessage() {
    const message = document.createElement('div');
    message.className = 'blocked-message';
    message.innerHTML = '🔄 Rafraîchissement bloqué<br><small>Utilisez les boutons de l\'application</small>';

    document.body.appendChild(message);

    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 2000);
}

// ===== FONCTION POUR AFFICHER LES MESSAGES D'ERREUR =====
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = message;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 3000);
}

// ===== FONCTION POUR AFFICHER LES MESSAGES DE SUCCÈS =====
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = message;

    document.body.appendChild(successDiv);

    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 2000);
}

// Données de l'application
const gameData = {
    players: [],
    currentMode: null,
    usedQuestions: [],
    allQuestions: {
        classic: [
            // Questions avec 1 joueur
            {text: "🎉 {player1}, tout le monde boit sauf toi !", players: 1},
            {text: "👑 {player1} devient le roi/la reine. Tout le monde doit t'obéir pendant 2 tours !", players: 1},
            {text: "🎤 {player1}, chante une chanson ou bois 2 gorgées.", players: 1},
            {text: "💃 {player1}, fais une danse ridicule ou bois 3 gorgées.", players: 1},
            {text: "🙈 {player1}, raconte un secret embarrassant sur toi-même.", players: 1},
            {text: "🎲 {player1}, lance un dé : 1-2 = bois 1, 3-4 = bois 2, 5-6 = bois 3 gorgées.", players: 1},
            {text: "📱 {player1}, montre la dernière photo de ton téléphone à tout le monde.", players: 1},
            {text: "🚀 {player1}, invente une règle qui s'applique à tout le monde jusqu'à ton prochain tour.", players: 1},
            {text: "🤔 {player1}, réponds à une question personnelle ou bois 2 gorgées.", players: 1},
            {text: "🎯 {player1}, fais un compliment à la personne à ta gauche.", players: 1},

            // Questions avec 2 joueurs
            {text: "🍻 {player1}, bois 3 gorgées si {player2} t'a déjà battu à un jeu vidéo.", players: 2},
            {text: "👉 {player1} et {player2} doivent échanger de place !", players: 2},
            {text: "🤔 {player1}, réponds à cette question : Quel est le pire date de {player2} ?", players: 2},
            {text: "🤝 {player1} et {player2} doivent se serrer dans les bras pendant 30 secondes.", players: 2},
            {text: "🤪 {player1}, imite {player2} pendant 1 minute.", players: 2},
            {text: "💋 {player1}, fais un compliment à {player2}.", players: 2},
            {text: "🎁 {player1}, offre une gorgée de ta boisson à {player2}.", players: 2},
            {text: "🎤 {player1} et {player2}, chantez un duo ou buvez chacun 2 gorgées.", players: 2},
            {text: "💃 {player1} et {player2}, dansez ensemble ou buvez chacun 2 gorgées.", players: 2},
            {text: "🎲 {player1} et {player2}, jouez à pierre-feuille-ciseaux. Le perdant boit 2 gorgées.", players: 2},

            // Questions avec 3 joueurs
            {text: "🎲 {player1}, {player2} et {player3}, lancez les dés : 1-2 = bois 1, 3-4 = bois 2, 5-6 = bois 3 gorgées.", players: 3},
            {text: "🚀 {player1}, invente une règle avec {player2} et {player3} qui s'applique à tout le monde jusqu'à ton prochain tour.", players: 3},
            {text: "🎯 {player1}, {player2} et {player3}, faites un concours de danse. Le perdant boit 2 gorgées.", players: 3},
            {text: "🤝 {player1}, {player2} et {player3}, créez une pyramide humaine pendant 10 secondes.", players: 3},
            {text: "🍻 {player1}, {player2} et {player3}, trinquez ensemble et buvez 2 gorgées.", players: 3},
            {text: "🎉 {player1}, {player2} et {player3}, criez le plus fort possible !", players: 3},
            {text: "💃 {player1}, {player2} et {player3}, faites une chorégraphie synchronisée.", players: 3},
            {text: "🎤 {player1}, {player2} et {player3}, chantez une chanson ensemble.", players: 3}
        ],
        hard: [
            // Questions avec 1 joueur
            {text: "🔥 {player1}, bois 5 gorgées d'affilée !", players: 1},
            {text: "🚫 {player1}, tu ne peux plus parler jusqu'à ton prochain tour. À chaque infraction, bois 2 gorgées.", players: 1},
            {text: "⏰ {player1}, bois toutes les 30 secondes pendant 5 minutes.", players: 1},
            {text: "📱 {player1}, poste une photo embarrassante sur les réseaux sociaux ou bois 10 gorgées.", players: 1},
            {text: "🤐 {player1}, tu dois garder un glaçon dans ta bouche jusqu'à ce qu'il fonde.", players: 1},
            {text: "💀 {player1}, bois jusqu'à ce que quelqu'un te dise d'arrêter.", players: 1},
            {text: "🎯 {player1}, si tu rates ce lancer de dé, bois le double de gorgées indiquées.", players: 1},
            {text: "🔥 {player1}, bois ton verre cul sec !", players: 1},
            {text: "💀 {player1}, bois 3 gorgées les yeux fermés.", players: 1},
            {text: "🚫 {player1}, tu ne peux pas utiliser ta main dominante jusqu'au prochain tour.", players: 1},

            // Questions avec 2 joueurs
            {text: "🤮 {player1}, mélange 3 boissons différentes avec {player2} et bois le cocktail !", players: 2},
            {text: "🔄 {player1}, échange ton verre avec celui de {player2}.", players: 2},
            {text: "💥 {player1}, défie {player2} dans un duel de boisson. Le perdant boit 5 gorgées supplémentaires.", players: 2},
            {text: "🎲 {player1} et {player2}, jouez à pierre-feuille-ciseaux. Le perdant boit 4 gorgées.", players: 2},
            {text: "🔥 {player1} et {player2}, buvez 3 gorgées en même temps sans vous arrêter.", players: 2},
            {text: "💀 {player1}, bois jusqu'à ce que {player2} te dise d'arrêter.", players: 2},
            {text: "🤮 {player1} et {player2}, échangez vos verres et buvez d'un trait.", players: 2},
            {text: "💥 {player1} et {player2}, faites un concours de regard. Le premier qui rit boit 4 gorgées.", players: 2},
            {text: "🔥 {player1} et {player2}, buvez en vous regardant dans les yeux sans rire.", players: 2},
            {text: "🎯 {player1} et {player2}, le dernier à finir son verre boit 3 gorgées supplémentaires.", players: 2},

            // Questions avec 3 joueurs
            {text: "💀 {player1}, {player2} et {player3}, le dernier à finir son verre boit 5 gorgées supplémentaires.", players: 3},
            {text: "🎯 {player1}, {player2} et {player3}, faites un concours de rapidité. Le plus lent boit 3 gorgées.", players: 3},
            {text: "🤮 {player1}, {player2} et {player3}, mélangez vos boissons et buvez un shot chacun.", players: 3},
            {text: "🔥 {player1}, {player2} et {player3}, buvez en cercle jusqu'à ce que quelqu'un abandonne.", players: 3},
            {text: "💥 {player1}, {player2} et {player3}, faites un concours de regard. Le premier qui rit boit 3 gorgées.", players: 3},
            {text: "🎲 {player1}, {player2} et {player3}, jouez à un jeu de rapidité. Le perdant boit 4 gorgées.", players: 3},
            {text: "💀 {player1}, {player2} et {player3}, buvez en même temps. Le dernier à s'arrêter gagne.", players: 3},
            {text: "🔥 {player1}, {player2} et {player3}, faites une chaîne de boisson sans vous arrêter.", players: 3}
        ],
        duo: [
            // Questions avec 2 joueurs (100% pour ce mode)
            {text: "👯 {player1} et {player2}, buvez ensemble 3 gorgées en vous regardant dans les yeux.", players: 2},
            {text: "💑 {player1} et {player2}, simulez une scène de film romantique ou buvez chacun 2 gorgées.", players: 2},
            {text: "🤝 {player1} et {player2}, tenez-vous la main jusqu'au prochain tour de {player1}.", players: 2},
            {text: "🎤 {player1} et {player2}, chantez un duo ou buvez chacun 3 gorgées.", players: 2},
            {text: "💃 {player1} et {player2}, dansez ensemble ou buvez chacun 2 gorgées.", players: 2},
            {text: "👥 {player1} et {player2}, devenez partenaires pour le prochain tour. Si l'un boit, l'autre boit aussi.", players: 2},
            {text: "🤪 {player1} et {player2}, faites une imitation célèbre ou buvez chacun 2 gorgées.", players: 2},
            {text: "🎭 {player1} et {player2}, improvisez une scène de théâtre ou buvez chacun 3 gorgées.", players: 2},
            {text: "🍻 {player1} et {player2}, buvez en même temps jusqu'à ce que l'un des deux s'arrête.", players: 2},
            {text: "👑 {player1} et {player2}, vous êtes roi et reine. Donnez un ordre à tout le monde.", players: 2},
            {text: "💋 {player1} et {player2}, faites-vous un câlin pendant 20 secondes.", players: 2},
            {text: "🎲 {player1} et {player2}, jouez à un jeu de regard sans rire.", players: 2},
            {text: "🤝 {player1} et {player2}, portez-vous mutuellement pendant 30 secondes.", players: 2},
            {text: "🎤 {player1} et {player2}, inventez une chanson ensemble.", players: 2},
            {text: "💃 {player1} et {player2}, dansez comme si vous étiez en boîte de nuit.", players: 2}
        ],
        bar: [
            // Questions avec 1 joueur
            {text: "🍸 {player1}, fais le tour du bar et ramène 3 numéros de téléphone !", players: 1},
            {text: "🎤 {player1}, chante une chanson karaoké ou bois 4 gorgées.", players: 1},
            {text: "💃 {player1}, danse sur la table pendant 30 secondes.", players: 1},
            {text: "🎯 {player1}, fais un tour de magie ou bois 3 gorgées.", players: 1},
            {text: "🍻 {player1}, bois un shot cul sec !", players: 1},
            {text: "🎲 {player1}, lance un dé : 1-3 = bois 1 shot, 4-6 = bois 2 shots.", players: 1},
            {text: "🎉 {player1}, crie 'Tchin Tchin' le plus fort possible !", players: 1},
            {text: "💃 {player1}, fais la danse de la limbo sous une canne.", players: 1},
            {text: "🎤 {player1}, imite une célébrité célèbre.", players: 1},
            {text: "🍸 {player1}, invente un nouveau cocktail et bois-le.", players: 1},

            // Questions avec 2 joueurs
            {text: "👯 {player1} et {player2}, buvez un shot en vous regardant dans les yeux.", players: 2},
            {text: "🎲 {player1} et {player2}, jouez à pierre-feuille-ciseaux. Le perdant paie le prochain verre.", players: 2},
            {text: "💋 {player1} et {player2}, simulez un baiser de cinéma ou buvez 2 gorgées.", players: 2},
            {text: "🤝 {player1} et {player2}, portez-vous mutuellement jusqu'au comptoir.", players: 2},
            {text: "🎤 {player1} et {player2}, chantez 'I Will Always Love You' en duo.", players: 2},
            {text: "💃 {player1} et {player2}, dansez le slow ensemble.", players: 2},
            {text: "🍻 {player1} et {player2}, trinquez et buvez en criant 'Santé !'", players: 2},
            {text: "🎲 {player1} et {player2}, faites un concours de rapidité pour boire votre verre.", players: 2},
            {text: "💋 {player1} et {player2}, faites-vous un bisou sur la joue.", players: 2},
            {text: "👯 {player1} et {player2}, marchez en vous tenant par le bras comme un couple.", players: 2},

            // Questions avec 3 joueurs
            {text: "🎉 {player1}, {player2} et {player3}, criez 'Tchin Tchin' le plus fort possible !", players: 3},
            {text: "💃 {player1}, {player2} et {player3}, faites une chorégraphie synchronisée.", players: 3},
            {text: "🎲 {player1}, {player2} et {player3}, jouez à un concours de rapidité. Le plus lent paie un shot.", players: 3},
            {text: "🤝 {player1}, {player2} et {player3}, formez une pyramide humaine devant le bar.", players: 3},
            {text: "🍻 {player1}, {player2} et {player3}, faites un concours de shot. Le dernier à finir paie la tournée.", players: 3},
            {text: "🎤 {player1}, {player2} et {player3}, chantez une chanson à trois voix.", players: 3},
            {text: "💃 {player1}, {player2} et {player3}, faites la conga dans tout le bar.", players: 3},
            {text: "🎉 {player1}, {player2} et {player3}, faites un toast ensemble en criant.", players: 3}
        ]
    },
    customQuestions: []
};

// Variables pour l'historique des questions
let questionHistory = [];
let currentHistoryIndex = -1;

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
    backToPlayers: document.getElementById('back-to-players-btn'),
    confirmMode: document.getElementById('confirm-mode-btn'),
    nextQuestion: document.getElementById('next-question-btn'),
    prevQuestion: document.getElementById('prev-question-btn'),
    menu: document.getElementById('menu-btn'),
    addPlayerMenu: document.getElementById('add-player-menu-btn'),
    addPlayerDuringGame: document.getElementById('add-player-during-game-btn'),
    backToGame: document.getElementById('back-to-game-btn')
};

const inputs = {
    playerName: document.getElementById('player-name'),
    playerNameDuringGame: document.getElementById('player-name-during-game')
};

const displays = {
    playersList: document.getElementById('players-list'),
    playersListDuring: document.getElementById('players-list-during'),
    questionText: document.getElementById('question-text'),
    currentPlayerCount: document.getElementById('current-player-count'),
    currentPlayerCountDuring: document.getElementById('current-player-count-during'),
    currentMode: document.getElementById('current-mode')
};

const modeCards = document.querySelectorAll('.mode-card');

// Fonctions de navigation
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        if (screen) screen.classList.remove('active');
    });
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
    }

    // Mettre à jour la liste des joueurs si on va sur l'écran d'ajout pendant le jeu
    if (screenName === 'addPlayer') {
        updatePlayersListDuringGame();
    }
}

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
    if (name.trim() === '') {
        showErrorMessage('⚠️ Veuillez entrer un nom de joueur');
        return;
    }

    if (name.trim().length > 12) {
        showErrorMessage('⚠️ Le nom doit faire moins de 12 caractères');
        return;
    }

    // Vérifier si le joueur existe déjà
    if (gameData.players.includes(name.trim())) {
        showErrorMessage('⚠️ Ce joueur existe déjà');
        return;
    }

    gameData.players.push(name.trim());
    updatePlayersListDuringGame();
    if (inputs.playerNameDuringGame) {
        inputs.playerNameDuringGame.value = '';
        inputs.playerNameDuringGame.focus();
    }

    // Mettre à jour l'affichage du nombre de joueurs dans l'écran de jeu
    if (displays.currentPlayerCount) {
        displays.currentPlayerCount.textContent = `${gameData.players.length} joueurs`;
    }

    showSuccessMessage(`✅ ${name.trim()} a été ajouté à la partie !`);
}

function removePlayer(index) {
    gameData.players.splice(index, 1);
    updatePlayersList();
    updateStartButtonState();
}

function removePlayerDuringGame(index) {
    gameData.players.splice(index, 1);
    updatePlayersListDuringGame();
    if (displays.currentPlayerCount) {
        displays.currentPlayerCount.textContent = `${gameData.players.length} joueurs`;
    }
}

function updatePlayersList() {
    const list = document.getElementById('players-list');
    const playerCountElement = document.getElementById('player-count');
    if (!list) return;

    list.innerHTML = '';

    if (gameData.players.length === 0) {
        if (playerCountElement) {
            playerCountElement.textContent = '0';
        }
        return;
    }

    gameData.players.forEach((player, index) => {
        const playerElement = document.createElement('div');
        playerElement.className = 'player-tag';
        playerElement.innerHTML = `
            <span>${player}</span>
            <button class="remove-player" data-index="${index}">×</button>
        `;
        list.appendChild(playerElement);
    });

    // Mettre à jour le compteur
    if (playerCountElement) {
        playerCountElement.textContent = gameData.players.length;
    }

    // Ajouter les événements de suppression
    document.querySelectorAll('.remove-player').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removePlayer(index);
        });
    });
}

function updatePlayersListDuringGame() {
    const list = document.getElementById('players-list-during');
    const playerCountElement = document.getElementById('current-player-count-during');
    if (!list) return;

    list.innerHTML = '';

    if (gameData.players.length === 0) {
        if (playerCountElement) {
            playerCountElement.textContent = '0';
        }
        return;
    }

    gameData.players.forEach((player, index) => {
        const playerElement = document.createElement('div');
        playerElement.className = 'player-tag';
        playerElement.innerHTML = `
            <span>${player}</span>
            <button class="remove-player" data-index="${index}">×</button>
        `;
        list.appendChild(playerElement);
    });

    // Mettre à jour le compteur
    if (playerCountElement) {
        playerCountElement.textContent = gameData.players.length;
    }

    // Ajouter les événements de suppression
    document.querySelectorAll('#players-list-during .remove-player').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removePlayerDuringGame(index);
        });
    });
}

// ===== VALIDATION DU NOMBRE DE JOUEURS =====
function validatePlayerCount() {
    if (gameData.players.length < 2) {
        showErrorMessage('❌ Il faut au moins 2 joueurs pour commencer une partie !');
        return false;
    }
    return true;
}

function updateStartButtonState() {
    const startGameBtn = document.getElementById('start-game-btn');
    if (!startGameBtn) return;

    if (gameData.players.length >= 2) {
        startGameBtn.disabled = false;
        startGameBtn.innerHTML = 'Commencer la partie';
    } else {
        startGameBtn.disabled = true;
        if (gameData.players.length === 0) {
            startGameBtn.innerHTML = 'Ajoutez au moins 2 joueurs';
        } else if (gameData.players.length === 1) {
            startGameBtn.innerHTML = 'Ajoutez un autre joueur';
        }
    }
}

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

function getRandomPlayer(excludePlayers = []) {
    if (gameData.players.length === 0) return "Joueur";

    let availablePlayers = [...gameData.players];

    excludePlayers.forEach(player => {
        const index = availablePlayers.indexOf(player);
        if (index > -1) {
            availablePlayers.splice(index, 1);
        }
    });

    if (availablePlayers.length === 0) {
        availablePlayers = [...gameData.players];
    }

    return availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
}

// ===== SYSTÈME DE PROBABILITÉS CORRIGÉ =====
function getQuestionProbabilities() {
    const playerCount = gameData.players.length;

    if (gameData.currentMode === 'duo') {
        // Mode duo : toujours 2 joueurs
        return {1: 0, 2: 100, 3: 0};
    }

    if (playerCount >= 2 && playerCount <= 4) {
        // 2-4 joueurs : 65% 1 joueur, 35% 2 joueurs
        return {1: 65, 2: 35, 3: 0};
    } else if (playerCount >= 5 && playerCount <= 8) {
        // 5-8 joueurs : 60% 1 joueur, 20% 2 joueurs, 20% 3 joueurs
        return {1: 60, 2: 20, 3: 20};
    } else if (playerCount >= 9 && playerCount <= 12) {
        // 9-12 joueurs : 33% 1 joueur, 33% 2 joueurs, 34% 3 joueurs
        return {1: 33, 2: 33, 3: 34};
    } else {
        // Par défaut (plus de 12 joueurs) : répartition égale
        return {1: 33, 2: 33, 3: 34};
    }
}

function selectQuestionType(probabilities) {
    const random = Math.random() * 100;

    if (random < probabilities[1]) {
        return 1;
    } else if (random < probabilities[1] + probabilities[2]) {
        return 2;
    } else {
        return 3;
    }
}

// ===== FONCTION GENERATEQUESTION COMPLÈTEMENT CORRIGÉE =====
function generateQuestion() {
    console.log("🔄 Génération d'une nouvelle question...");

    // Vérifications de base
    if (!gameData.currentMode) {
        return "❌ Veuillez sélectionner un mode de jeu";
    }

    if (gameData.players.length < 2) {
        return "❌ Il faut au moins 2 joueurs pour jouer";
    }

    const questions = gameData.allQuestions[gameData.currentMode];
    if (!questions || questions.length === 0) {
        return "❌ Aucune question disponible pour ce mode";
    }

    console.log(`👥 Nombre de joueurs: ${gameData.players.length}`);
    console.log(`🎮 Mode de jeu: ${gameData.currentMode}`);
    console.log(`📝 Questions totales: ${questions.length}`);

    // CORRECTION : Filtrer les questions qui correspondent au nombre de joueurs
    const availableQuestions = questions.filter(q => {
        const hasEnoughPlayers = q.players <= gameData.players.length;
        console.log(`Question ${q.text.substring(0, 20)}... - ${q.players} joueur(s) - Suffisants: ${hasEnoughPlayers}`);
        return hasEnoughPlayers;
    });

    console.log(`✅ Questions disponibles: ${availableQuestions.length}`);

    if (availableQuestions.length === 0) {
        // CORRECTION : En cas d'échec, prendre TOUTES les questions sans filtre
        console.log("⚠️ Aucune question filtrée, prise de TOUTES les questions");
        const randomIndex = Math.floor(Math.random() * questions.length);
        const selectedQuestion = questions[randomIndex];

        let questionText = selectedQuestion.text;
        const usedPlayers = [];

        // Remplacer les noms de joueurs
        const player1 = getRandomPlayer(usedPlayers);
        usedPlayers.push(player1);
        questionText = questionText.replace(/{player1}/g, player1);

        if (selectedQuestion.players >= 2) {
            const player2 = getRandomPlayer(usedPlayers);
            usedPlayers.push(player2);
            questionText = questionText.replace(/{player2}/g, player2);
        }

        if (selectedQuestion.players >= 3) {
            const player3 = getRandomPlayer(usedPlayers);
            usedPlayers.push(player3);
            questionText = questionText.replace(/{player3}/g, player3);
        }

        questionHistory.push(questionText);
        currentHistoryIndex = questionHistory.length - 1;
        updateQuestionCounter();
        return questionText;
    }

    // Obtenir les probabilités
    const probabilities = getQuestionProbabilities();
    const selectedPlayerCount = selectQuestionType(probabilities);

    console.log(`📊 Probabilités: ${probabilities[1]}% 1j, ${probabilities[2]}% 2j, ${probabilities[3]}% 3j`);
    console.log(`🎯 Type sélectionné: ${selectedPlayerCount} joueur(s)`);

    // CORRECTION : Filtrer les questions pour le type sélectionné
    let filteredQuestions = availableQuestions.filter(q => q.players === selectedPlayerCount);

    console.log(`📋 Questions filtrées: ${filteredQuestions.length}`);

    // CORRECTION : Si pas de questions pour ce type, prendre d'abord d'autres types, puis toutes les questions
    if (filteredQuestions.length === 0) {
        console.log("⚠️ Aucune question pour le type sélectionné, recherche d'autres types...");

        // Essayer d'autres types dans l'ordre de priorité
        const otherTypes = [1, 2, 3].filter(type => type !== selectedPlayerCount);
        for (const type of otherTypes) {
            filteredQuestions = availableQuestions.filter(q => q.players === type);
            if (filteredQuestions.length > 0) {
                console.log(`✅ Questions trouvées pour ${type} joueur(s)`);
                break;
            }
        }

        // Si toujours rien, prendre toutes les questions disponibles
        if (filteredQuestions.length === 0) {
            console.log("⚠️ Aucun type ne fonctionne, prise de TOUTES les questions disponibles");
            filteredQuestions = availableQuestions;
        }
    }

    // Sélectionner une question aléatoire
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const selectedQuestion = filteredQuestions[randomIndex];

    console.log(`🎲 Question sélectionnée: ${selectedQuestion.players} joueur(s)`);

    // Remplacer les noms de joueurs
    let questionText = selectedQuestion.text;
    const usedPlayers = [];

    const player1 = getRandomPlayer(usedPlayers);
    usedPlayers.push(player1);
    questionText = questionText.replace(/{player1}/g, player1);

    if (selectedQuestion.players >= 2) {
        const player2 = getRandomPlayer(usedPlayers);
        usedPlayers.push(player2);
        questionText = questionText.replace(/{player2}/g, player2);
    }

    if (selectedQuestion.players >= 3) {
        const player3 = getRandomPlayer(usedPlayers);
        usedPlayers.push(player3);
        questionText = questionText.replace(/{player3}/g, player3);
    }

    // Ajouter à l'historique
    questionHistory.push(questionText);
    currentHistoryIndex = questionHistory.length - 1;

    // Mettre à jour le compteur
    updateQuestionCounter();

    console.log(`✅ Question générée avec succès!`);
    return questionText;
}

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

function saveGameData() {
    localStorage.setItem('tchin-game-data', JSON.stringify(gameData));
}

function loadGameData() {
    const saved = localStorage.getItem('tchin-game-data');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.assign(gameData, data);
            updatePlayersList();
            updateStartButtonState();
        } catch (e) {
            console.error('Erreur lors du chargement des données:', e);
        }
    }
}

// Initialisation
function initApp() {
    console.log("🎮 Initialisation de l'application Tchin...");

    // Activer le blocage du rafraîchissement
    blockRefreshCompletely();

    loadGameData();

    // Événements
    if (buttons.addPlayer) {
        buttons.addPlayer.addEventListener('click', () => addPlayer(inputs.playerName.value));
    }

    if (inputs.playerName) {
        inputs.playerName.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addPlayer(inputs.playerName.value);
        });
    }

    if (buttons.startGame) {
        buttons.startGame.addEventListener('click', () => {
            if (!validatePlayerCount()) {
                return;
            }
            showScreen('mode');
        });
    }

    if (buttons.backToPlayers) {
        buttons.backToPlayers.addEventListener('click', () => showScreen('players'));
    }

    if (buttons.confirmMode) {
        buttons.confirmMode.addEventListener('click', () => {
            if (displays.currentPlayerCount) {
                displays.currentPlayerCount.textContent = `${gameData.players.length} joueurs`;
            }
            if (displays.currentMode) {
                displays.currentMode.textContent = getModeDisplayName(gameData.currentMode);
            }

            // Réinitialiser l'historique
            questionHistory = [];
            currentHistoryIndex = -1;
            gameData.usedQuestions = [];

            showScreen('game');
            updateQuestionCounter();
        });
    }

    // BOUTON "DÉFI SUIVANT" - CORRIGÉ
    if (buttons.nextQuestion) {
        buttons.nextQuestion.addEventListener('click', () => {
            console.log("🎲 Bouton 'Défi suivant' cliqué");
            if (displays.questionText) {
                const newQuestion = generateQuestion();
                displays.questionText.textContent = newQuestion;
                if (displays.questionText.parentElement) {
                    displays.questionText.parentElement.classList.add('bounce');
                    setTimeout(() => {
                        displays.questionText.parentElement.classList.remove('bounce');
                    }, 600);
                }
            }
        });
    }

    // Événement pour le bouton précédent
    if (buttons.prevQuestion) {
        buttons.prevQuestion.addEventListener('click', showPreviousQuestion);
    }

    if (buttons.menu) {
        buttons.menu.addEventListener('click', () => {
            saveGameData();
            showScreen('players');
        });
    }

    // Événements pour l'ajout de joueurs pendant la partie
    if (buttons.addPlayerMenu) {
        buttons.addPlayerMenu.addEventListener('click', () => showScreen('addPlayer'));
    }

    if (buttons.addPlayerDuringGame) {
        buttons.addPlayerDuringGame.addEventListener('click', () => addPlayerDuringGame(inputs.playerNameDuringGame.value));
    }

    if (inputs.playerNameDuringGame) {
        inputs.playerNameDuringGame.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addPlayerDuringGame(inputs.playerNameDuringGame.value);
        });
    }

    if (buttons.backToGame) {
        buttons.backToGame.addEventListener('click', () => {
            saveGameData();
            showScreen('game');
        });
    }

    // Sélection des modes
    modeCards.forEach(card => {
        card.addEventListener('click', () => selectMode(card.dataset.mode));
    });

    console.log("✅ Application Tchin initialisée avec succès !");
}

// Démarrer l'application quand la page est chargée
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}