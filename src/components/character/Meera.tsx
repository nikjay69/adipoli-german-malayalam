'use client';

import { motion } from 'framer-motion';
import { PEER_SIZE_MAP, type PeerSize } from './peerSizing';

export type MeeraMood = 'neutral' | 'presenting';

export const MEERA_MOOD_IMAGES: Record<MeeraMood, string> = {
  neutral: '/images/characters/meera-neutral-v2.png',
  presenting: '/images/characters/meera-presenting-v2.png',
};

export function Meera({
  mood = 'presenting',
  size = 'md',
  className = '',
  animate = true,
}: {
  mood?: MeeraMood;
  size?: PeerSize;
  className?: string;
  animate?: boolean;
}) {
  return (
    <motion.img
      src={MEERA_MOOD_IMAGES[mood]}
      alt={`Meera — ${mood}`}
      className={`${PEER_SIZE_MAP[size]} object-contain object-bottom drop-shadow-lg ${className}`}
      initial={animate ? { opacity: 0, scale: 0.94 } : false}
      animate={animate ? { opacity: 1, scale: 1, y: [0, -3, 0] } : undefined}
      transition={animate ? { opacity: { duration: 0.3 }, scale: { duration: 0.3 }, y: { repeat: Infinity, duration: 3.1, ease: 'easeInOut' } } : undefined}
    />
  );
}
