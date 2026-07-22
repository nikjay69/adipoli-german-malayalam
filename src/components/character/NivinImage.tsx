'use client';

import { motion } from 'framer-motion';
import { PEER_SIZE_MAP, type PeerSize } from './peerSizing';

export type NivinMoodImage = 'happy' | 'thinking' | 'excited' | 'sad' | 'celebrating' | 'pointing' | 'waving' | 'confused' | 'reading' | 'thumbsup' | 'official';

interface NivinImageProps {
  mood?: NivinMoodImage;
  size?: PeerSize;
  className?: string;
  animate?: boolean;
}

export const NIVIN_MOOD_IMAGES: Record<NivinMoodImage, string> = {
  happy: '/images/characters/nivin-happy-v2.png',
  thinking: '/images/characters/nivin-thinking-v2.png',
  excited: '/images/characters/nivin-excited-v2.png',
  sad: '/images/characters/nivin-sad-v2.png',
  celebrating: '/images/characters/nivin-celebrating-v2.png',
  pointing: '/images/characters/nivin-pointing-v2.png',
  waving: '/images/characters/nivin-waving-v2.png',
  confused: '/images/characters/nivin-confused-v2.png',
  reading: '/images/characters/nivin-reading-v2.png',
  thumbsup: '/images/characters/nivin-thumbsup-v2.png',
  official: '/images/characters/nivin-official-v2.png',
};

export function NivinImage({ mood = 'happy', size = 'md', className = '', animate = true }: NivinImageProps) {
  const src = NIVIN_MOOD_IMAGES[mood];

  return (
    <motion.div
      initial={animate ? { scale: 0.8, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 12 }}
      className={`relative flex-shrink-0 ${PEER_SIZE_MAP[size]} ${className}`}
    >
      <img src={src} alt={`Nivin — ${mood}`} className="h-full w-full object-contain drop-shadow-lg" />
      {animate && (
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <img src={src} alt="" className="h-full w-full object-contain drop-shadow-lg" aria-hidden />
        </motion.div>
      )}
    </motion.div>
  );
}

export function mapMoodToImage(mood: string): NivinMoodImage {
  const map: Record<string, NivinMoodImage> = {
    idle: 'happy', happy: 'happy', excited: 'excited', thinking: 'thinking',
    celebrating: 'celebrating', sad: 'sad', pointing: 'pointing', waving: 'waving',
  };
  return map[mood] || 'happy';
}
