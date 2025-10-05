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