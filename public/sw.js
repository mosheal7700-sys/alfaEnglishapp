// Minimal service worker.
// Its only job is to satisfy the browser's "installable app" requirement
// (a registered service worker with a fetch handler). It intentionally does
// NOT cache anything, so every update to the app is always visible right
// away without users needing to clear a cache.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
