'use client';

import { motion } from 'framer-motion';

// Frau Weber — the Goethe-Kochi teacher (story bible: strict but warm, M1-M5).
// Canonical adult character matching Kuttan's art style (DECISIONS #10).
export type FrauWeberMood = 'greeting' | 'teaching' | 'pleased' | 'neutral';

export const FRAU_WEBER_IMAGES: Record<FrauWeberMood, string> = {
  greeting: '/images/characters/frau-weber-greeting.png',
  teaching: '/images/characters/frau-weber-teaching.png',
  pleased: '/images/characters/frau-weber-pleased.png',
  neutral: '/images/characters/frau-weber-neutral.png',
};

export function FrauWeber({
  mood = 'neutral',
  className = '',
  animate = true,
}: {
  mood?: FrauWeberMood;
  className?: string;
  animate?: boolean;
}) {
  return (
    <motion.img
      src={FRAU_WEBER_IMAGES[mood]}
      alt={`Frau Weber — ${mood}`}
      className={`object-contain drop-shadow-lg ${className}`}
      animate={animate ? { y: [0, -3, 0] } : undefined}
      transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
    />
  );
}
