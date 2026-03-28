'use client';

import { motion } from 'framer-motion';
import { KuttanImage, type KuttanMoodImage } from './KuttanImage';

interface KuttanSpeechProps {
  message: string;
  mood?: KuttanMoodImage;
  size?: 'sm' | 'md' | 'lg';
  /** Compact mode — image and bubble side by side */
  compact?: boolean;
}

/**
 * Kuttan character with speech bubble.
 * The primary way Kuttan appears in the app — image + message.
 */
export function KuttanSpeech({ message, mood = 'happy', size = 'sm', compact = true }: KuttanSpeechProps) {
  const imgSize = size === 'lg' ? 'lg' : size === 'md' ? 'md' : 'sm';

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-2.5 w-full max-w-sm"
      >
        <KuttanImage mood={mood} size="xs" animate={false} />
        <div className="flex-1 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-2xl rounded-tl-sm px-3 py-2">
          <p className="text-xs text-[var(--foreground)]/70 leading-relaxed">{message}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-2 w-full max-w-sm"
    >
      <KuttanImage mood={mood} size={imgSize} />
      <div className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-2xl px-4 py-2.5 text-center">
        <p className="text-sm text-[var(--foreground)]/70 leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
}
