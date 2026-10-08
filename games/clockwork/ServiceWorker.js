const CACHE_PREFIX = "clockwork-crisis-";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => key.startsWith(CACHE_PREFIX) || key.startsWith("DefaultCompany-ClockworkCrisisUnity"))
        .map((key) => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (
    url.pathname.includes("/Build/") ||
    url.pathname.endsWith("/version.json") ||
    url.pathname.endsWith("/TemplateData/style.css") ||
    event.request.mode === "navigate"
  ) {
    event.respondWith(fetch(event.request, { cache: "no-store" }));
    return;
  }

  event.respondWith(fetch(event.request));
});
