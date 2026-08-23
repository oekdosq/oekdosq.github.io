const CACHE = 'ravenoir-v3';
const SHELL = ['/ravenoir', '/ravenoir-manifest.webmanifest', '/ravenoir/icon-192.png', '/ravenoir/icon-512.png', '/ravenoir/icon-maskable-512.png'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function cacheable(url) {
  return (
    url.pathname.startsWith('/ravenoir/') ||
    url.pathname.startsWith('/_next/static/') ||
    url.pathname === '/ravenoir-manifest.webmanifest'
  );
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request);
  const refresh = fetch(request)
    .then((res) => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => null);
  if (hit) {
    refresh.catch(() => {});
    return hit;
  }
  const fresh = await refresh;
  if (fresh) return fresh;
  return new Response('Offline', { status: 503, statusText: 'Offline' });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  if (req.mode === 'navigate' && url.pathname.startsWith('/ravenoir')) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put('/ravenoir', copy));
          }
          return res;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE);
          const hit = await cache.match('/ravenoir');
          return (
            hit ||
            new Response('<h1>RAVENOIR offline</h1><p>Buka ulang saat online untuk memuat aplikasi.</p>', {
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
            })
          );
        })
    );
    return;
  }

  if (cacheable(url)) {
    e.respondWith(staleWhileRevalidate(req));
  }
});
