/* گەشتی عومرە — Service Worker (offline-first) */
const CACHE = 'umrah-v1.1.5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/styles.css',
  './assets/js/app.js',
  './assets/js/content/umrah.js',
  './assets/js/content/ibrahim.js',
  './assets/js/content/fursat.js',
  './assets/js/content/bangbezh.js',
  './assets/js/content/sibgha.js',
  './assets/js/content/griya.js',
  './assets/js/content/zaid.js',
  './assets/js/content/rumaysa.js',
  './assets/js/content/mahanan.js',
  './assets/js/content/quiz.js',
  './assets/js/content/sections.js',
  './assets/img/logo.png',
  './assets/img/logo.webp',
  './assets/img/pattern.svg',
  './assets/fonts/vazirmatn-400.woff2',
  './assets/fonts/vazirmatn-500.woff2',
  './assets/fonts/vazirmatn-700.woff2',
  './assets/fonts/amiri-400.woff2',
  './assets/fonts/amiri-700.woff2',
  './assets/fonts/notonaskh-400.woff2',
  './assets/fonts/notonaskh-700.woff2',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/maskable-192.png',
  './assets/icons/maskable-512.png',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/favicon-32.png',
  './assets/icons/favicon-16.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        // cache same-origin successful responses
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => {
        // offline fallback to app shell for navigations
        if (req.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
