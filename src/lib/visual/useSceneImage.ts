'use client';

import { useState, useEffect } from 'react';

interface UseSceneImageReturn {
  url: string | null;
  isLoading: boolean;
  error: string | null;
}

// Client-side cache to avoid re-fetching during navigation
const imageCache = new Map<string, string>();

/**
 * Hook to fetch/cache a generated scene or vocab image.
 * Checks sessionStorage first, then calls the API.
 */
export function useSceneImage(prompt: string | undefined, type: 'scene' | 'vocab' = 'scene'): UseSceneImageReturn {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!prompt) { setUrl(null); return; }

    const cacheKey = `img:${type}:${prompt}`;

    // Check in-memory cache
    const cached = imageCache.get(cacheKey);
    if (cached) { setUrl(cached); return; }

    // Check sessionStorage
    try {
      const stored = sessionStorage.getItem(cacheKey);
      if (stored) {
        imageCache.set(cacheKey, stored);
        setUrl(stored);
        return;
      }
    } catch { /* SSR or storage unavailable */ }

    // Fetch from API
    setIsLoading(true);
    setError(null);

    fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, type }),
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.url) {
          imageCache.set(cacheKey, data.url);
          try { sessionStorage.setItem(cacheKey, data.url); } catch { /* full */ }
          setUrl(data.url);
        } else {
          setError('No image returned');
        }
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [prompt, type]);

  return { url, isLoading, error };
}
