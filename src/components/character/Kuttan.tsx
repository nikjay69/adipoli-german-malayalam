'use client';

import { motion } from 'framer-motion';
import { KUTTAN_MOOD_IMAGES, type KuttanMoodImage } from './KuttanImage';

export type KuttanMood = 'idle' | 'happy' | 'excited' | 'thinking' | 'celebrating' | 'sad' | 'pointing' | 'waving';

interface KuttanProps {
  mood?: KuttanMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  entrance?: boolean; // animate entrance
}

const sizes = {
  sm: 80,
  md: 120,
  lg: 180,
  xl: 240,
};

// Map this component's moods to the canonical adult-Kuttan photo set
// (transparent PNGs; DECISIONS #9). Previously an off-canon SVG child.
const MOOD_TO_IMAGE: Record<KuttanMood, KuttanMoodImage> = {
  idle: 'happy',
  happy: 'happy',
  excited: 'excited',
  thinking: 'thinking',
  celebrating: 'celebrating',
  sad: 'sad',
  pointing: 'pointing',
  waving: 'waving',
};

export function Kuttan({ mood = 'idle', size = 'md', className = '', entrance = true }: KuttanProps) {
  const s = sizes[size];
  const src = KUTTAN_MOOD_IMAGES[MOOD_TO_IMAGE[mood]];

  return (
    <motion.div
      className={className}
      initial={entrance ? { opacity: 0, scale: 0.92 } : false}
      animate={entrance ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ width: s, height: s * 1.3 }}
    >
      <motion.img
        src={src}
        alt={`Kuttan feeling ${mood}`}
        className="w-full h-full object-contain drop-shadow-lg"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
