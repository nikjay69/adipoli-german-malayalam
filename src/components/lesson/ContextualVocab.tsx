'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Bookmark } from 'lucide-react';
import type { VocabItem, VocabEncounter } from '@/lib/content/types';

interface ContextualVocabProps {
  vocab: VocabItem;
  encounter: VocabEncounter;
  index: number;
  total: number;
  isBookmarked: boolean;
  onPlayAudio: () => void;
  onBookmark: () => void;
}

/**
 * Vocab presented within narrative context.
 * Instead of a flashcard, the word appears naturally in a story moment.
 */
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

  // Highlight the German word within the encounter moment text
  const highlightWord = (text: string, word: string) => {
    const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-[#d4a520] font-bold bg-[#d4a520]/10 px-1 rounded">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center"
    >
      <p className="text-[var(--foreground)]/40 text-xs mb-4">
        Word {index + 1} of {total}
      </p>

      {/* Story moment — the context where this word appears */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-2xl p-4 mb-4"
      >
        <p className="text-sm text-[var(--foreground)]/60 italic leading-relaxed">
          {highlightWord(encounter.encounterMoment, vocab.german)}
        </p>
      </motion.div>

      {/* The word card — reveals on tap or after a moment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm bg-gradient-to-br from-[#2a4a2a] to-[#1b3d1b] border-2 border-[#d4a520]/30 rounded-2xl p-5 text-center cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <span className="text-lg mb-1 block">🇩🇪</span>
        <h2 className="text-3xl font-bold mb-1">{vocab.german}</h2>
        <p className="text-[var(--foreground)]/40 text-sm mb-3">/{vocab.pronunciation}/</p>

        <AnimatePresence>
          {showDetails ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="overflow-hidden"
            >
              <div className="w-10 h-0.5 bg-[var(--foreground)]/10 mx-auto mb-3" />
              <p className="text-xl font-semibold mb-1">{vocab.english}</p>
              <p className="text-[#d4a520] text-base mb-3">{vocab.malayalam}</p>

              {/* Context sentence */}
              <div className="bg-[var(--foreground)]/5 rounded-xl px-4 py-3 text-left">
                <p className="text-sm text-[var(--foreground)]/60 italic">
                  &ldquo;{encounter.contextSentence}&rdquo;
                </p>
                {vocab.exampleTranslation && (
                  <p className="text-xs text-[var(--foreground)]/30 mt-1">
                    {vocab.exampleTranslation}
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="text-xs text-[var(--foreground)]/40"
            >
              Tap to reveal meaning
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Audio + Bookmark buttons */}
      <div className="flex items-center gap-3 mt-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onPlayAudio}
          className="w-11 h-11 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center"
        >
          <Volume2 className="w-4 h-4 text-[#d4a520]" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBookmark}
          className="w-11 h-11 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center"
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-[#e94560] fill-[#e94560]' : 'text-[var(--foreground)]/40'}`} />
        </motion.button>
      </div>
    </motion.div>
  );
}
