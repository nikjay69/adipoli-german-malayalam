'use client';

import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { useSceneImage } from '@/lib/visual/useSceneImage';
import { GeminiBadge } from '@/components/ui/GeminiBadge';

interface VocabImageCardProps {
  german: string;
  english: string;
  malayalam: string;
  pronunciation: string;
  /** Image prompt — describes what to show (e.g. "a bread roll in a German bakery") */
  imagePrompt?: string;
  onPlayAudio?: () => void;
}

// Emoji fallbacks based on common vocab categories
function getEmojiForWord(english: string): string {
  const lower = english.toLowerCase();
  if (lower.includes('bread') || lower.includes('brötchen')) return '🍞';
  if (lower.includes('coffee') || lower.includes('kaffee')) return '☕';
  if (lower.includes('water') || lower.includes('wasser')) return '💧';
  if (lower.includes('cake') || lower.includes('kuchen')) return '🍰';
  if (lower.includes('beer') || lower.includes('bier')) return '🍺';
  if (lower.includes('train') || lower.includes('zug')) return '🚂';
  if (lower.includes('house') || lower.includes('haus')) return '🏠';
  if (lower.includes('book') || lower.includes('buch')) return '📚';
  if (lower.includes('school') || lower.includes('schule')) return '🏫';
  if (lower.includes('doctor') || lower.includes('arzt')) return '👨‍⚕️';
  if (lower.includes('money') || lower.includes('geld')) return '💰';
  if (lower.includes('family') || lower.includes('familie')) return '👨‍👩‍👧‍👦';
  if (lower.includes('friend') || lower.includes('freund')) return '🤝';
  if (lower.includes('morning')) return '🌅';
  if (lower.includes('evening')) return '🌆';
  if (lower.includes('night')) return '🌙';
  if (lower.includes('hello') || lower.includes('greeting')) return '👋';
  if (lower.includes('goodbye')) return '👋';
  if (lower.includes('thank')) return '🙏';
  if (lower.includes('please')) return '🤲';
  return '🇩🇪';
}

/**
 * Vocabulary card with a contextual image.
 * Shows generated image if available, falls back to styled emoji placeholder.
 */
export function VocabImageCard({
  german,
  english,
  malayalam,
  pronunciation,
  imagePrompt,
  onPlayAudio,
}: VocabImageCardProps) {
  const { url: imageUrl, isLoading } = useSceneImage(imagePrompt, 'vocab');
  const emoji = getEmojiForWord(english);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xs bg-gradient-to-br from-[#2a4a2a] to-[#1b3d1b] border-2 border-[#d4a520]/30 rounded-2xl overflow-hidden"
    >
      {/* Image area */}
      <div className="relative h-32 bg-[var(--foreground)]/5 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={english}
              className="w-full h-full object-cover"
            />
            <GeminiBadge className="absolute bottom-1 right-1" />
          </>
        ) : isLoading ? (
          <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="w-8 h-8 border-2 border-[#d4a520] border-t-transparent rounded-full"
            />
            <span className="text-[10px] text-[var(--foreground)]/30">Generating...</span>
          </div>
        ) : (
          <span className="text-5xl">{emoji}</span>
        )}

        {/* Audio button overlay */}
        {onPlayAudio && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onPlayAudio}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
          >
            <Volume2 className="w-3.5 h-3.5 text-white" />
          </motion.button>
        )}
      </div>

      {/* Text content */}
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold mb-0.5">{german}</h3>
        <p className="text-[var(--foreground)]/40 text-xs mb-2">/{pronunciation}/</p>
        <p className="text-sm font-medium">{english}</p>
        <p className="text-[#d4a520] text-xs">{malayalam}</p>
      </div>
    </motion.div>
  );
}
