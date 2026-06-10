const CACHE_NAME = 'adipoli-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg',
];

const OFFLINE_FALLBACK = '/';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests and API calls
  if (event.request.method !== 'GET' || url.pathname.startsWith('/api/')) {
    return;
  }

  // Cache-first for audio and image assets
  if (url.pathname.startsWith('/audio/') || url.pathname.startsWith('/images/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Network-only for app pages. Do not cache HTML shells: stale page HTML + fresh JS
  // is the fastest way to create hydration errors after a release or during QA.
  event.respondWith(fetch(event.request).catch(() => caches.match(OFFLINE_FALLBACK)));
});
