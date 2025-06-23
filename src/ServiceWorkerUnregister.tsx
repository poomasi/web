// src/components/ServiceWorkerUnregister.tsx
"use client";

import { useEffect } from "react";

export function ServiceWorkerUnregister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then(() => {
            window.caches?.keys().then((cacheNames) => {
              cacheNames.forEach((cacheName) => {
                window.caches.delete(cacheName);
              });
            });
          });
        }
      });
    }
  }, []);

  return null; // UI 렌더링 없음
}
