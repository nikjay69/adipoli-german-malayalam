'use client';

import { motion } from 'framer-motion';

export type KuttanMoodImage = 'happy' | 'thinking' | 'excited' | 'sad' | 'celebrating' | 'pointing' | 'waving' | 'confused' | 'reading' | 'thumbsup' | 'official';

interface KuttanImageProps {
  mood?: KuttanMoodImage;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  /** Animate entrance */
  animate?: boolean;
}

export const KUTTAN_MOOD_IMAGES: Record<KuttanMoodImage, string> = {
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

const SIZE_MAP = {
  xs: 'w-10 h-10',
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-40 h-40',
};

/**
 * Image-based Kuttan character using the approved Pixar-style renders.
 * Replaces the old SVG Kuttan for a much richer visual experience.
 */
export function KuttanImage({ mood = 'happy', size = 'md', className = '', animate = true }: KuttanImageProps) {
  const src = KUTTAN_MOOD_IMAGES[mood];

  return (
    <motion.div
      initial={animate ? { scale: 0.8, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 12 }}
      className={`relative flex-shrink-0 ${SIZE_MAP[size]} ${className}`}
    >
      <img
        src={src}
        alt={`Kuttan - ${mood}`}
        className="w-full h-full object-contain drop-shadow-lg"
      />

      {/* Subtle floating animation */}
      {animate && (
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-contain drop-shadow-lg"
            aria-hidden
          />
        </motion.div>
      )}
    </motion.div>
  );
}

// Map old SVG moods to new image moods
export function mapMoodToImage(svgMood: string): KuttanMoodImage {
  const map: Record<string, KuttanMoodImage> = {
    idle: 'happy',
    happy: 'happy',
    excited: 'excited',
    thinking: 'thinking',
    celebrating: 'celebrating',
    sad: 'sad',
    pointing: 'pointing',
    waving: 'waving',
  };
  return map[svgMood] || 'happy';
}
