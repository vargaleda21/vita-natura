/* daleday service worker – app shell cache + könyvtárak cache-elése */
const CACHE = 'daleday-v8';
const SHELL = ['./', './index.html', './alternatives.js', './recipes.js', './translations.js', './config.js', './manifest.json', './icon-192.png', './icon-512.png'];
const LIB_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Termék-API hívások: mindig hálózat, sosem cache
  if (url.hostname.endsWith('openfoodfacts.org') || url.hostname.endsWith('openbeautyfacts.org')) return;

  // Saját fájlok: előbb hálózat (hogy a frissítés megérkezzen), offline esetén cache
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Külső JS könyvtárak: előbb cache
  if (LIB_HOSTS.includes(url.hostname) && req.destination === 'script') {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }))
    );
  }
});
