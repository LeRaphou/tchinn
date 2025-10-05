function initApp() {
    console.log("🎮 Initialisation de l'application Tchin...");

    // Activer le blocage du rafraîchissement
    blockRefreshCompletely();

    // Charger les données (maintenant ça réinitialise tout)
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

    // BOUTON "DÉFI SUIVANT"
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
            // Ne pas sauvegarder, juste changer d'écran
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
            // Ne pas sauvegarder, juste changer d'écran
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