'use client';

import { motion } from 'framer-motion';
import { NivinImage, type NivinMoodImage } from './NivinImage';

export function NivinSpeech({
  message,
  mood = 'happy',
  size = 'sm',
  compact = true,
}: {
  message: string;
  mood?: NivinMoodImage;
  size?: 'sm' | 'md' | 'lg';
  compact?: boolean;
}) {
  const imageSize = size === 'lg' ? 'lg' : size === 'md' ? 'md' : 'sm';
  if (compact) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex w-full max-w-sm items-start gap-2.5">
        <NivinImage mood={mood} size="xs" animate={false} />
        <div className="flex-1 rounded-2xl rounded-tl-sm border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 px-3 py-2">
          <p className="text-xs leading-relaxed text-[var(--foreground)]/70">{message}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex w-full max-w-sm flex-col items-center gap-2">
      <NivinImage mood={mood} size={imageSize} />
      <div className="rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 px-4 py-2.5 text-center">
        <p className="text-sm leading-relaxed text-[var(--foreground)]/70">{message}</p>
      </div>
    </motion.div>
  );
}
