/* گەشتی عومرە — Service Worker (offline-first, iOS/Safari-hardened) */
const CACHE = 'umrah-v1.1.9';
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

/* Install: cache every asset INDIVIDUALLY so a single failure can never abort the
   whole install (Safari/iOS is strict — atomic addAll() is the #1 cause of
   "offline works on Android but not iPhone"). The app shell is cached no matter what. */
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(ASSETS.map(async (url) => {
      try {
        const res = await fetch(url, { cache: 'reload' });
        if (res && (res.ok || res.type === 'opaque')) {
          await cache.put(url, res.clone());
        }
      } catch (_) { /* skip this one asset; never break the install */ }
    }));
    // make sure the core shell is present even if './' above missed
    try {
      if (!(await cache.match('./index.html'))) {
        const r = await fetch('./index.html', { cache: 'reload' });
        if (r && r.ok) await cache.put('./index.html', r.clone());
      }
    } catch (_) {}
    await self.skipWaiting();
  })());
});

/* Activate: drop old caches, take control of open pages immediately. */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* Fetch strategy:
   - Navigations (opening the app, incl. iOS home-screen launch) → serve the cached
     app shell (index.html) first. This is a hash-routed SPA, so the shell is all that
     is ever needed, and this GUARANTEES the app opens offline on iPhone regardless of
     how Safari forms the start_url request.
   - Everything else → cache-first, then network (and cache the result). */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const shell = (await cache.match('./index.html')) || (await cache.match('./'));
      if (shell) return shell;
      try { return await fetch(req); }
      catch (_) { return new Response('<!doctype html><meta charset="utf-8"><title>گەشتی عومرە</title>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } }); }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res && res.status === 200 && (res.type === 'basic' || res.type === 'default')) {
        const copy = res.clone();
        const cache = await caches.open(CACHE);
        cache.put(req, copy);
      }
      return res;
    } catch (_) {
      return cached || Response.error();
    }
  })());
});

/* Allow the page to trigger an immediate update if needed. */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
