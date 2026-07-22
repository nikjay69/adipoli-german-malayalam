'use client';

import { motion } from 'framer-motion';

export type FrauFischerMood = 'greeting' | 'teaching' | 'pleased' | 'neutral';

export const FRAU_FISCHER_IMAGES: Record<FrauFischerMood, string> = {
  greeting: '/images/characters/frau-fischer-greeting-v2.png',
  teaching: '/images/characters/frau-fischer-teaching-v2.png',
  pleased: '/images/characters/frau-fischer-pleased-v2.png',
  neutral: '/images/characters/frau-fischer-neutral-v2.png',
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
