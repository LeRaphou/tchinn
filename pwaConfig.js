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