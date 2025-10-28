self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('nhat-camnang-visa-v2.1').then(async cache => {
      const urlsToCache = [
        './',
        './index.html',
        './manifest.json',
        './icons/icon-192x192.png',
        './icons/icon-512x512.png'
      ];
      for (const url of urlsToCache) {
        try {
          await cache.add(url);
          console.log('✅ Cached:', url);
        } catch (err) {
          console.warn('⚠️ Failed to cache:', url, err);
        }
      }
    })
  );
  console.log('✅ Service Worker: Installed');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
