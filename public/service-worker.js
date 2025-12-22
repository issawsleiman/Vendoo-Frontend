const CACHE_NAME = "vendoo-cache-v2";

// --- INSTALL ---
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(self.skipWaiting());
});

// --- ACTIVATE ---
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache:", cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// --- FETCH ---
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  // Only handle same-origin requests
  if (!request.url.startsWith(self.location.origin)) return;

  // --- Network-first for navigation (HTML) ---
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // --- Cache-first for static assets & chunks ---
  // This includes JS, CSS, images, and React lazy-loaded chunks
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(request);
      if (cachedResponse) return cachedResponse;

      try {
        const networkResponse = await fetch(request);
        // Only cache valid responses
        if (networkResponse && networkResponse.status === 200) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch (err) {
        // Fallback to cache if network fails
        if (cachedResponse) return cachedResponse;
        throw err;
      }
    })
  );
});

// --- MESSAGE for update ---
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
