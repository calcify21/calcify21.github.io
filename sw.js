const CACHE_NAME = "calcify-v3";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/about.html",
  "/area.html",
  "/calcs.html",
  "/contact.html",
  "/fav.html",
  "/mean.html",
  "/percentage.html",
  "/prime.html",
  "/pwd.html",
  "/qr.html",
  "/bmi.html",
  "/bodyfat.html",
  "/calories.html",
  "/recipe.html",
  "/share-target.html",
  "/404.html",
  "/css/common.css",
  "/css/style.css",
  "/css/about.css",
  "/css/area.css",
  "/css/calcs.css",
  "/css/centraltendancy.css",
  "/css/contact.css",
  "/css/fav.css",
  "/css/percent.css",
  "/css/prime.css",
  "/css/pwd.css",
  "/css/qr.css",
  "/css/health.css",
  "/css/recipe.css",
  "/css/404.css",
  "/js/common.js",
  "/js/script.js",
  "/js/utils.js",
  "/js/area.js",
  "/js/calcs.js",
  "/js/centraltendancy.js",
  "/js/contact.js",
  "/js/fav.js",
  "/js/percent.js",
  "/js/prime.js",
  "/js/pwd.js",
  "/js/qr.js",
  "/js/bmi.js",
  "/js/bodyfat.js",
  "/js/calories.js",
  "/js/recipe.js",
  "/assets/images/favicon-2.ico",
  "/assets/images/favicon-2.png",
  "/assets/images/thumbnail.png",
  "/assets/images/card-image.png",
  "/assets/images/404.png",
  "/assets/images/plane.png",
  "/assets/images/calculator-solid.svg",
];

// Install Event: Cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
  self.skipWaiting();
});

// Activate Event: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch Event: Stale-While-Revalidate strategy
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests like Google APIs or Analytics if needed,
  // but we usually want to cache CDNs if possible.

  // For API requests (TheMealDB), usage Network First logic
  if (event.request.url.includes("themealdb.com")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  // For app shell and assets, use Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    }),
  );
});
