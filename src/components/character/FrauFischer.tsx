'use client';

import { motion } from 'framer-motion';

export type FrauFischerMood = 'greeting' | 'teaching' | 'pleased' | 'neutral';

// The filenames are documented compatibility IDs. Learner-facing labels use Frau Fischer.
export const FRAU_FISCHER_IMAGES: Record<FrauFischerMood, string> = {
  greeting: '/images/characters/frau-weber-greeting-clean.png',
  teaching: '/images/characters/frau-weber-teaching.png',
  pleased: '/images/characters/frau-weber-pleased.png',
  neutral: '/images/characters/frau-weber-neutral.png',
};

export function FrauFischer({
  mood = 'neutral',
  className = '',
  animate = true,
}: {
  mood?: FrauFischerMood;
  className?: string;
  animate?: boolean;
}) {
  return (
    <motion.img
      src={FRAU_FISCHER_IMAGES[mood]}
      alt={`Frau Fischer — ${mood}`}
      className={`object-contain drop-shadow-lg ${className}`}
      animate={animate ? { y: [0, -3, 0] } : undefined}
      transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
    />
  );
}
