const staticCache = "site-static-v1";
const dynamicCache = "site-dynamic-v1";
const assets = [
  "/",
  "/css/style.css",
  "/css/all.css",
  "/css/icon-font.css",
  "/img/showcase-image.png",
  "/img/hero.jpeg",
  "/img/side-img.PNG",
  "/img/Working-Space.mp4",
  "/pages/fallback_page.html",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(staticCache)
      .then((cache) => {
        console.log("caching shell assests");
        cache.addAll(assets);
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

// Activate event
self.addEventListener("activate", (e) => {
  console.log("service worker has been activated");
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((keys) => keys !== staticCache && keys !== dynamicCache)
          .map((key) => {
            caches.delete(key);
          })
      );
    })
  );
});

// Fetch event
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then((cacheResponse) => {
        console.log(cacheResponse);
        return (
          cacheResponse ||
          fetch(e.request).then(async (fetchRes) => {
            if (e.request.url !== "/") {
              const cache = await caches.open(dynamicCache);
              cache.put(e.request.url, fetchRes.clone());
              return fetchRes;
            }
          })
        );
      })
      .catch(() => {
        if (e.request.url.indexOf(".") == -1) {
          return caches.match("/pages/fallback_page.html");
        }
      })
  );
});
