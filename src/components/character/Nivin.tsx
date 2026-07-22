'use client';

import { motion } from 'framer-motion';
import { NIVIN_MOOD_IMAGES, type NivinMoodImage } from './NivinImage';

export type NivinMood = 'idle' | 'happy' | 'excited' | 'thinking' | 'celebrating' | 'sad' | 'pointing' | 'waving';

const SIZES = { sm: 80, md: 120, lg: 180, xl: 240 };
const MOOD_TO_IMAGE: Record<NivinMood, NivinMoodImage> = {
  idle: 'happy', happy: 'happy', excited: 'excited', thinking: 'thinking',
  celebrating: 'celebrating', sad: 'sad', pointing: 'pointing', waving: 'waving',
};

export function Nivin({
  mood = 'idle',
  size = 'md',
  className = '',
  entrance = true,
}: {
  mood?: NivinMood;
  size?: keyof typeof SIZES;
  className?: string;
  entrance?: boolean;
}) {
  const dimension = SIZES[size];
  return (
    <motion.div
      className={className}
      initial={entrance ? { opacity: 0, scale: 0.92 } : false}
      animate={entrance ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ width: dimension, height: dimension * 1.3 }}
    >
      <motion.img
        src={NIVIN_MOOD_IMAGES[MOOD_TO_IMAGE[mood]]}
        alt={`Nivin feeling ${mood}`}
        className="h-full w-full object-contain drop-shadow-lg"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
