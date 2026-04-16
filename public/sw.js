const CACHE_NAME = 'norouz-v2';

// Essential assets — SW install fails if these can't be cached
const ESSENTIAL_URLS = [
  '/',
  '/favicon.svg',
  '/manifest.json',
];

// Optional assets — cached best-effort, won't block SW install
const OPTIONAL_URLS = [
  '/tahvil.mp3',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(ESSENTIAL_URLS).then(() =>
        Promise.allSettled(OPTIONAL_URLS.map((url) => cache.add(url)))
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip non-http(s) schemes — chrome-extension://, blob:, data:, etc.
  // The Cache API only accepts http/https requests.
  if (!request.url.startsWith('http')) return;

  // Skip cross-origin requests — analytics, Firebase, and other third-party
  // scripts should be handled by the browser directly, not intercepted by the SW.
  const reqOrigin = new URL(request.url).origin;
  if (reqOrigin !== self.location.origin) return;

  // Navigation requests (HTML): network-first, cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match('/'))
    );
    return;
  }

  // Assets (JS, CSS, images, audio): cache-first, network fallback
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Only cache complete responses — 206 Partial Content (range requests for audio)
        // is unsupported by the Cache API and must not be stored.
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});
