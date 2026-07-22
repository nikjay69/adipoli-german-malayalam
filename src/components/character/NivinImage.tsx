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

// The filenames are documented compatibility IDs. Learner-facing labels use Nivin.
export const NIVIN_MOOD_IMAGES: Record<NivinMoodImage, string> = {
  happy: '/images/characters/kuttan-happy.png',
  thinking: '/images/characters/kuttan-thinking.png',
  excited: '/images/characters/kuttan-excited.png',
  sad: '/images/characters/kuttan-sad.png',
  celebrating: '/images/characters/kuttan-celebrating.png',
  pointing: '/images/characters/kuttan-pointing.png',
  waving: '/images/characters/kuttan-waving.png',
  confused: '/images/characters/kuttan-confused.png',
  reading: '/images/characters/kuttan-reading.png',
  thumbsup: '/images/characters/kuttan-thumbsup.png',
  official: '/images/characters/kuttan-official.png',
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
