import { useEffect } from 'react';

interface KeyboardNavOptions {
  onLeft?: () => void;
  onRight?: () => void;
  onEnter?: () => void;
  onSpace?: () => void;
  onEscape?: () => void;
  enabled?: boolean;
}

export function useKeyboardNav({
  onLeft,
  onRight,
  onEnter,
  onSpace,
  onEscape,
  enabled = true,
}: KeyboardNavOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      // Don't capture if user is typing in an input
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          onLeft?.();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onRight?.();
          break;
        case 'Enter':
          e.preventDefault();
          onEnter?.();
          break;
        case ' ':
          e.preventDefault();
          onSpace?.();
          break;
        case 'Escape':
          onEscape?.();
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onLeft, onRight, onEnter, onSpace, onEscape, enabled]);
}
