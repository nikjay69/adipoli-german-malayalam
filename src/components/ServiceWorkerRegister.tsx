'use client';

import { useEffect } from 'react';
import { trackPageView, initErrorTracking } from '@/lib/analytics';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    // Dev QA must never hydrate against a stale cached shell.
    if (process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker.getRegistrations()
        .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
        .catch(() => {});
      if ('caches' in window) {
        caches.keys()
          .then((keys) => Promise.all(keys.filter((key) => key.startsWith('adipoli-')).map((key) => caches.delete(key))))
          .catch(() => {});
      }
      return;
    }

    navigator.serviceWorker.register('/sw.js').catch(() => {});
    // Analytics + error tracking
    trackPageView();
    initErrorTracking();
  }, []);

  return null;
}
