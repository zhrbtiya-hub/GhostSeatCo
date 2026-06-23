self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

let notificationTimeout;

self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_NOTIFICATION') {
        // Clear any old pending notification
        if (notificationTimeout) clearTimeout(notificationTimeout);

        notificationTimeout = setTimeout(() => {
            self.registration.showNotification("Ghost Seat Co.", {
                body: "Time's up for Seat #" + event.data.seat + "!",
                vibrate: [200, 100, 200]
            });
        }, event.data.delay);
    } 
    
    if (event.data.type === 'CANCEL_NOTIFICATION') {
        if (notificationTimeout) clearTimeout(notificationTimeout);
    }
});