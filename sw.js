// ============================================
// EL JASUS — SERVICE WORKER v1
// Offline support + background sync
// ============================================

const CACHE_NAME    = 'eljasus-v1';
const STATIC_ASSETS = [
    '/',
    '/home.html',
    '/login.html',
    '/signup.html',
    '/onlinerooms.html',
    '/room.html',
    '/leaderboard.html',
    '/account.html',
    '/shop.html',
    '/friends.html',
    '/profile.html',
    '/analytics.html',
    '/animations.css',
    '/mobile.css',
    '/particles.js',
    '/sound-system.js',
    '/emoji-reactions.js',
    '/qr-notifications.js',
    '/voice-chat.js',
    '/screenshot.js',
    '/ElJasus.jpg',
    '/manifest.json',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap',
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
];

// ── INSTALL ───────────────────────────────
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Caching static assets');
                // Cache what we can, ignore failures for CDN links
                return Promise.allSettled(
                    STATIC_ASSETS.map(url => cache.add(url).catch(() => {}))
                );
            })
            .then(() => self.skipWaiting())
    );
});

// ── ACTIVATE ──────────────────────────────
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// ── FETCH ─────────────────────────────────
self.addEventListener('fetch', event => {
    // Skip non-GET and Firebase requests
    if (event.request.method !== 'GET') return;
    if (event.request.url.includes('firebasedatabase') || event.request.url.includes('googleapis.com/identitytoolkit')) return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            return fetch(event.request).then(response => {
                // Cache successful responses for local assets
                if (response.ok && event.request.url.startsWith(self.location.origin)) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            }).catch(() => {
                // Offline fallback
                if (event.request.destination === 'document') {
                    return caches.match('/home.html');
                }
            });
        })
    );
});

// ── PUSH NOTIFICATIONS ────────────────────
self.addEventListener('push', event => {
    const data = event.data?.json() || {};
    event.waitUntil(
        self.registration.showNotification(data.title || 'El Jasus', {
            body:    data.body || 'إشعار جديد',
            icon:    '/ElJasus.jpg',
            badge:   '/ElJasus.jpg',
            tag:     data.tag || 'eljasus',
            data:    { url: data.url || '/' },
            actions: data.actions || []
        })
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    const url = event.notification.data?.url || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            for (const client of windowClients) {
                if (client.url === url && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow(url);
        })
    );
});

// ── BACKGROUND SYNC ───────────────────────
self.addEventListener('sync', event => {
    if (event.tag === 'sync-stats') {
        event.waitUntil(syncOfflineStats());
    }
});

async function syncOfflineStats() {
    // When back online, sync any pending stat updates
    const cache = await caches.open('eljasus-offline-queue');
    const keys  = await cache.keys();
    for (const key of keys) {
        const req  = await cache.match(key);
        const data = await req.json();
        try {
            await fetch('/api/sync', { method: 'POST', body: JSON.stringify(data) });
            await cache.delete(key);
        } catch (e) {
            console.log('[SW] Sync failed, will retry', e);
        }
    }
}
