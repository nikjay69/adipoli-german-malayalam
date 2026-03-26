'use client';

import { useEffect } from 'react';
import { trackPageView, initErrorTracking } from '@/lib/analytics';

export function ServiceWorkerRegister() {
  useEffect(() => {
    // Service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    // Analytics + error tracking
    trackPageView();
    initErrorTracking();
  }, []);

  return null;
}
