const CACHE_NAME = "nhat-camnangvisa-v2.1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./tailwind.css",  
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];


self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[SW] Caching all app shell files");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); 
});


self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ⚡ Bắt yêu cầu mạng (fetch)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
     if (response) return response;
     return fetch(event.request)
        .then(networkResponse => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
    })
  );
});
