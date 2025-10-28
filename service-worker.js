const CACHE_NAME = 'nhat-visa-cache-v1';
const PRECACHE_URLS = [
  'index.html',
  'manifest.json',
  'icons/icon-192.svg',
  'icons/icon-512.svg'
  // nếu bạn có file CSS/JS/ảnh tĩnh khác, thêm đường dẫn tại đây
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  // cleanup old caches if names change
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => {
        if (k !== CACHE_NAME) return caches.delete(k);
      })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        // cache runtime requests for same-origin HTML/CSS/JS/images
        if (!resp || resp.status !== 200 || resp.type === 'opaque') return resp;
        const respClone = resp.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, respClone);
        });
        return resp;
      }).catch(() => {
        // offline fallback: try to return cached start page
        return caches.match('v2.1.html');
      });
    })
  );
});
