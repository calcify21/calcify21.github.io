const CACHE_NAME = "jj-v2026-v1";
const assets = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./glassy_liquid_background_1778859268480.png"
];

// Install Event: Cache essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets...");
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // Force the waiting service worker to become active
});

// Activate Event: Clear old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // Take control of all open clients immediately
});

// Fetch Event: NETWORK FIRST Strategy
// This ensures "never caches" feel while online, but works offline!
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If network is available, update the cache and return response
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // If network fails (offline), fall back to cache
        return caches.match(event.request);
      })
  );
});
