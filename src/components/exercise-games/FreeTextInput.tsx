'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { matchesAnswer, primaryAnswer } from '@/lib/answer-match';

interface FreeTextInputProps {
  hint?: string;
  answer: string | string[] | readonly string[];
  onResult: (correct: boolean) => void;
  placeholder?: string;
}

/**
 * Free text input for full-sentence answers. Accepts an array of acceptable
 * phrasings and matches under normalization (case, punctuation, umlaut
 * alternates like ae/oe/ue/ss). Use this instead of WordScramble for any
 * answer longer than a single word.
 */
export function FreeTextInput({ hint, answer, onResult, placeholder }: FreeTextInputProps) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = () => {
    if (result || !value.trim()) return;
    const correct = matchesAnswer(value, answer);
    setResult(correct ? 'correct' : 'wrong');
    setTimeout(() => onResult(correct), correct ? 600 : 1500);
  };

  const ringColor =
    result === 'correct'
      ? 'border-[#27ae60] focus:ring-[#27ae60]/40'
      : result === 'wrong'
      ? 'border-[#c0392b] focus:ring-[#c0392b]/40'
      : 'border-[var(--foreground)]/20 focus:ring-[#d4a520]/40';

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      {hint && <p className="text-xs text-white/50 text-center">{hint}</p>}

      <div className="w-full flex items-stretch gap-2">
        <input
          ref={inputRef}
          type="text"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
          }}
          disabled={!!result}
          placeholder={placeholder ?? 'Type your answer…'}
          className={`flex-1 bg-[var(--card-bg)] border-2 ${ringColor} rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 transition-colors`}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={!!result || !value.trim()}
          onClick={submit}
          className="flex items-center justify-center rounded-xl bg-[#d4a520] px-4 text-[var(--background)] font-semibold disabled:opacity-40"
          aria-label="Submit answer"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>

      {result === 'wrong' && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-[#c0392b]"
        >
          Correct answer: <span className="font-semibold">{primaryAnswer(answer)}</span>
        </motion.p>
      )}
      {result === 'correct' && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-[#27ae60]"
        >
          ✓ Richtig!
        </motion.p>
      )}
    </div>
  );
}
