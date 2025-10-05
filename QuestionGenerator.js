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