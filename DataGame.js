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
            {text: "🍑 {player1}, avec qui tu pourrais avoir un rapport Anal dans la soirée, sinon bois 5 gorgées.", players: 1},
            {text: "🍷 Tous le monde boit.", players: 1},
            {text: "👨‍🦰 Tous les roux doivent voir 5 gorgées ", players: 1},
            {text: "👩🏿 Toute les femmes de soirée doivent cul sec leur verre", players: 1},

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