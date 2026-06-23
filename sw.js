// This is the Service Worker "Background" script
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('push', function(event) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'logo.png'
    });
});

// Logic to handle messages from the main website
self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_NOTIFICATION') {
        const delay = event.data.delay;
        const seat = event.data.seat;

        // This creates a background timer
        setTimeout(() => {
            self.registration.showNotification("Ghost Seat Co.", {
                body: "Time's up for Seat #" + seat + "! Please clear the seat.",
                vibrate: [200, 100, 200],
                tag: 'time-up'
            });
        }, delay);
    }
});