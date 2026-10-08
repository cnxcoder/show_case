(function () {
  "use strict";

  async function unregisterOldServiceWorkers() {
    if (!("serviceWorker" in navigator)) return;
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    } catch (error) {
      console.warn("[CC Version] Failed to unregister service worker:", error);
    }
  }

  async function clearOldCaches() {
    if (!("caches" in window)) return;
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    } catch (error) {
      console.warn("[CC Version] Failed to clear caches:", error);
    }
  }

  async function loadLatestVersion() {
    const response = await fetch("./version.json?_cc=" + Date.now(), {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
      }
    });

    if (!response.ok) {
      throw new Error("version.json HTTP " + response.status);
    }

    const manifest = await response.json();
    const version = String(manifest.version || "").trim();
    if (!version) {
      throw new Error("version.json has no version");
    }
    return version;
  }

  window.ClockworkVersioning = {
    async prepare() {
      await unregisterOldServiceWorkers();
      await clearOldCaches();

      try {
        const version = await loadLatestVersion();
        window.CLOCKWORK_CRISIS_BUILD_VERSION = version;
        window.CLOCKWORK_CRISIS_CACHE_QUERY = "?v=" + encodeURIComponent(version);
        console.log("[CC Version] Using build:", version);
        return version;
      } catch (error) {
        const fallback = Date.now().toString();
        window.CLOCKWORK_CRISIS_BUILD_VERSION = fallback;
        window.CLOCKWORK_CRISIS_CACHE_QUERY = "?v=" + encodeURIComponent(fallback);
        console.warn("[CC Version] version.json unavailable; using timestamp:", error);
        return fallback;
      }
    }
  };
})();
