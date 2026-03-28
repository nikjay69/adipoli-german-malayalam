'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Bookmark } from 'lucide-react';
import type { VocabItem, VocabEncounter } from '@/lib/content/types';
import { speakGerman } from '@/lib/audio/useGermanTTS';

interface ContextualVocabProps {
  vocab: VocabItem;
  encounter: VocabEncounter;
  index: number;
  total: number;
  isBookmarked: boolean;
  onPlayAudio: () => void;
  onBookmark: () => void;
}

export function ContextualVocab({
  vocab,
  encounter,
  index,
  total,
  isBookmarked,
  onPlayAudio,
  onBookmark,
}: ContextualVocabProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Auto-speak the German word when card appears
  useEffect(() => {
    const timer = setTimeout(() => {
      try { speakGerman(vocab.german, 0.85); } catch { /* noop */ }
    }, 500);
    return () => clearTimeout(timer);
  }, [vocab.german]);

  const highlightWord = (text: string, word: string) => {
    const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-[#d4a520] font-bold bg-[#d4a520]/10 px-0.5 rounded">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="flex-1 flex flex-col items-center justify-center"
    >
      <p className="text-[var(--foreground)]/40 text-[10px] mb-2">
        Word {index + 1} of {total}
      </p>

      {/* Story context */}
      <div className="w-full max-w-sm bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl p-3 mb-3">
        <p className="text-sm text-[var(--foreground)]/60 italic leading-snug">
          {highlightWord(encounter.encounterMoment, vocab.german)}
        </p>
      </div>

      {/* Word card — compact */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm bg-gradient-to-br from-[#2a4a2a] to-[#1b3d1b] border-2 border-[#d4a520]/30 rounded-xl p-4 text-center cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <h2 className="text-2xl font-bold">{vocab.german}</h2>
          <span className="text-[var(--foreground)]/40 text-xs">/{vocab.pronunciation}/</span>
        </div>

        <AnimatePresence>
          {showDetails ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-center gap-2 mt-1 mb-2">
                <span className="text-base font-semibold">{vocab.english}</span>
                <span className="text-[#d4a520] text-sm">{vocab.malayalam}</span>
              </div>
              <div className="bg-[var(--foreground)]/5 rounded-lg px-3 py-2 text-left">
                <p className="text-xs text-[var(--foreground)]/60 italic">&ldquo;{encounter.contextSentence}&rdquo;</p>
                {vocab.exampleTranslation && (
                  <p className="text-[10px] text-[var(--foreground)]/30 mt-0.5">{vocab.exampleTranslation}</p>
                )}
              </div>
            </motion.div>
          ) : (
            <p className="text-[10px] text-[var(--foreground)]/30 mt-1">Tap to reveal</p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Compact action row */}
      <div className="flex items-center gap-2 mt-2">
        <motion.button whileTap={{ scale: 0.95 }} onClick={onPlayAudio}
          className="w-11 h-11 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center">
          <Volume2 className="w-3.5 h-3.5 text-[#d4a520]" />
        </motion.button>
        <motion.button whileTap={{ scale: 0.95 }} onClick={onBookmark}
          className="w-11 h-11 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center">
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'text-[#e94560] fill-[#e94560]' : 'text-[var(--foreground)]/40'}`} />
        </motion.button>
      </div>
    </motion.div>
  );
}
