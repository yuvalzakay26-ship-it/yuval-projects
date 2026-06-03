// Minimal service worker — exists so the site meets Chrome's installability
// criteria on Android. Intentionally no offline cache, push, or background
// sync: every request just passes through to the network.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // No-op fetch handler (lets the browser handle the request normally).
  // Having a fetch listener is what makes the PWA installable.
});
