'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { feedbackCorrect, feedbackWrong } from '@/lib/feedback';

interface ArticleSortProps {
  /** The noun to sort */
  noun: string;
  /** The correct article */
  correctArticle: 'der' | 'die' | 'das';
  onResult: (correct: boolean) => void;
}

const ARTICLE_COLORS = {
  der: { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-400' },
  die: { bg: 'bg-pink-500/20', border: 'border-pink-500/40', text: 'text-pink-400' },
  das: { bg: 'bg-amber-500/20', border: 'border-amber-500/40', text: 'text-amber-400' },
};

/**
 * Article sorting game — a word appears, tap der/die/das.
 * Fast, visual, color-coded. Like a rapid-fire quiz.
 */
export function ArticleSort({ noun, correctArticle, onResult }: ArticleSortProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const handleTap = (article: 'der' | 'die' | 'das') => {
    if (result) return;
    setSelected(article);
    const isCorrect = article === correctArticle;
    setResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) feedbackCorrect(); else feedbackWrong();
    setTimeout(() => onResult(isCorrect), isCorrect ? 600 : 1200);
  };

  return (
    <div className="flex flex-col items-center">
      {/* The noun */}
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="mb-4">
        <p className="text-2xl font-black text-white text-center">___  {noun}</p>
      </motion.div>

      {result === 'wrong' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#27ae60] mb-2">
          <span className="font-bold">{correctArticle} {noun}</span>
        </motion.p>
      )}

      {/* Three article buttons */}
      <div className="flex gap-3">
        {(['der', 'die', 'das'] as const).map((article) => {
          const colors = ARTICLE_COLORS[article];
          const isSelected = selected === article;
          const isCorrect = article === correctArticle;
          return (
            <motion.button key={article}
              whileTap={{ scale: 0.9 }}
              animate={isSelected && result === 'wrong' ? { x: [-4, 4, -4, 4, 0] } : {}}
              onClick={() => handleTap(article)}
              disabled={!!result}
              className={`w-20 h-16 rounded-2xl text-lg font-black border-2 transition-all ${
                result && isCorrect ? 'bg-[#27ae60]/30 border-[#27ae60] text-[#27ae60]' :
                isSelected && result === 'wrong' ? 'bg-[#c0392b]/30 border-[#c0392b] text-[#c0392b]' :
                `${colors.bg} ${colors.border} ${colors.text}`
              }`}>
              {article}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
