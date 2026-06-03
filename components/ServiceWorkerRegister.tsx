"use client";

import { useEffect } from "react";

/**
 * Registers the minimal service worker so the site becomes installable on
 * Chrome for Android. No caching/offline logic lives here — see public/sw.js.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failures shouldn't break the page.
      });
    };
    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
