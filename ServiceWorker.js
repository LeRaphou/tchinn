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