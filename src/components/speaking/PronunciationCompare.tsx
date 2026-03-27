'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Volume2, RotateCcw } from 'lucide-react';
import { useGermanTTS } from '@/lib/audio/useGermanTTS';

interface PronunciationCompareProps {
  /** The expected German text */
  expected: string;
  /** What the user actually said (from speech recognition) */
  transcript: string;
  /** Confidence score from recognition (0-1) */
  confidence: number;
  /** Callback when user taps "Try again" */
  onRetry?: () => void;
  /** Callback when user taps "Listen" to hear native */
  onListen?: () => void;
  /** Optional pronunciation guide */
  pronunciation?: string;
}

// Compare words and return per-word match status
function compareWords(expected: string, transcript: string): { word: string; status: 'correct' | 'close' | 'wrong' | 'missing' }[] {
  const normalize = (s: string) => s.toLowerCase().replace(/[.,!?;:'"]/g, '').trim();
  const expectedWords = normalize(expected).split(/\s+/);
  const transcriptWords = normalize(transcript).split(/\s+/);

  return expectedWords.map((word, i) => {
    const spoken = transcriptWords[i];
    if (!spoken) return { word, status: 'missing' as const };
    if (spoken === word) return { word, status: 'correct' as const };

    // Check for close match (1-2 character difference)
    const distance = levenshtein(word, spoken);
    if (distance <= Math.max(1, Math.floor(word.length * 0.3))) {
      return { word: spoken, status: 'close' as const };
    }

    return { word: spoken, status: 'wrong' as const };
  });
}

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

function getScoreLabel(score: number): { text: string; color: string; emoji: string } {
  if (score >= 90) return { text: 'Excellent!', color: 'text-[#27ae60]', emoji: '🌟' };
  if (score >= 70) return { text: 'Good!', color: 'text-[#27ae60]', emoji: '👍' };
  if (score >= 50) return { text: 'Not bad', color: 'text-[#d4a520]', emoji: '💪' };
  return { text: 'Try again', color: 'text-[#c0392b]', emoji: '🔄' };
}

const WORD_STATUS_COLORS = {
  correct: 'bg-[#27ae60]/20 text-[#27ae60] border-[#27ae60]/30',
  close: 'bg-[#d4a520]/20 text-[#d4a520] border-[#d4a520]/30',
  wrong: 'bg-[#c0392b]/20 text-[#c0392b] border-[#c0392b]/30',
  missing: 'bg-[var(--foreground)]/5 text-[var(--foreground)]/30 border-[var(--foreground)]/10',
};

/**
 * Side-by-side comparison of native pronunciation vs user's attempt.
 * Shows word-by-word color-coded matching (green/yellow/red).
 */
export function PronunciationCompare({
  expected,
  transcript,
  confidence,
  onRetry,
  pronunciation,
}: PronunciationCompareProps) {
  const { speak } = useGermanTTS();

  const wordComparison = useMemo(
    () => compareWords(expected, transcript),
    [expected, transcript]
  );

  const correctCount = wordComparison.filter(w => w.status === 'correct' || w.status === 'close').length;
  const score = Math.round((correctCount / Math.max(wordComparison.length, 1)) * 100);
  const scoreInfo = getScoreLabel(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm mx-auto"
    >
      {/* Score header */}
      <div className="text-center mb-4">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-3xl mb-1"
        >
          {scoreInfo.emoji}
        </motion.div>
        <p className={`font-bold text-lg ${scoreInfo.color}`}>{scoreInfo.text}</p>
        <p className="text-xs text-[var(--foreground)]/40">
          {score}% match  •  {Math.round(confidence * 100)}% confidence
        </p>
      </div>

      {/* Expected (native) */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-wider text-[var(--foreground)]/40 font-semibold">
            Expected
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => speak(expected)}
            className="flex items-center gap-1 text-[10px] text-[#d4a520] font-medium"
          >
            <Volume2 className="w-3 h-3" /> Listen
          </motion.button>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl px-4 py-3">
          <p className="text-base font-semibold">{expected}</p>
          {pronunciation && (
            <p className="text-xs text-[var(--foreground)]/40 mt-0.5">/{pronunciation}/</p>
          )}
        </div>
      </div>

      {/* User's attempt — word-by-word comparison */}
      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-wider text-[var(--foreground)]/40 font-semibold mb-1.5 block">
          You said
        </span>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl px-4 py-3">
          <div className="flex flex-wrap gap-1.5">
            {wordComparison.map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`
                  inline-block px-2 py-0.5 rounded-md text-sm font-medium
                  border ${WORD_STATUS_COLORS[item.status]}
                `}
              >
                {item.status === 'missing' ? '___' : item.word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 mt-2 justify-center">
          <span className="flex items-center gap-1 text-[10px] text-[var(--foreground)]/40">
            <span className="w-2 h-2 rounded-full bg-[#27ae60]" /> Correct
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[var(--foreground)]/40">
            <span className="w-2 h-2 rounded-full bg-[#d4a520]" /> Close
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[var(--foreground)]/40">
            <span className="w-2 h-2 rounded-full bg-[#c0392b]" /> Wrong
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => speak(expected, { rate: 0.7 })}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-medium text-[var(--foreground)]/70"
        >
          <Volume2 className="w-4 h-4" /> Slow
        </motion.button>
        {onRetry && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-b from-[#d4a520] to-[#b8891a] text-white text-sm font-bold"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
