'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  /** Characters per second (default 40) */
  speed?: number;
  /** Delay before starting in ms (default 0) */
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * Typewriter text reveal animation.
 * Characters appear one by one for a cinematic feel.
 */
export function Typewriter({ text, speed = 40, delay = 0, className = '', onComplete }: TypewriterProps) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayedChars(0);
    setStarted(false);
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!started || displayedChars >= text.length) {
      if (started && displayedChars >= text.length) onComplete?.();
      return;
    }
    const interval = setInterval(() => {
      setDisplayedChars(prev => {
        if (prev >= text.length) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 1000 / speed);
    return () => clearInterval(interval);
  }, [started, displayedChars, text, speed, onComplete]);

  return (
    <span className={className}>
      {text.slice(0, displayedChars)}
      {displayedChars < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
}
