'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, RotateCcw, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { getAllVocabulary } from '@/lib/content/modules';
import type { VocabItem } from '@/lib/content/modules';
import { reviewCard, createCard, getDueCards, getDueCount, type Rating, type SRSCard } from '@/lib/srs';
import { playVocabAudio } from '@/lib/audio';

type ReviewState = 'loading' | 'reviewing' | 'complete' | 'empty';

interface ReviewStats {
  total: number;
  again: number;
  hard: number;
  good: number;
  easy: number;
}

export default function ReviewPage() {
  const router = useRouter();
  const { userProgress, updateSRSCard, addSRSCard, addXP, updateStreak } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<ReviewState>('loading');
  const [dueVocabIds, setDueVocabIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState<ReviewStats>({ total: 0, again: 0, hard: 0, good: 0, easy: 0 });
  const [xpEarned, setXpEarned] = useState(0);

  // Build vocab lookup map once
  const vocabMap = useMemo(() => {
    const map: Record<string, VocabItem> = {};
    getAllVocabulary().forEach((v) => {
      map[v.id] = v;
    });
    return map;
  }, []);

  // Initialize: ensure all learned vocab has SRS cards, then get due cards
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {

    // Create SRS cards for any learned vocab that doesn't have one yet
    const learnedVocab = userProgress.learnedVocabulary;
    learnedVocab.forEach((vocabId) => {
      if (!userProgress.srsCards[vocabId]) {
        addSRSCard(createCard(vocabId));
      }
    });

    // Get due cards
    const due = getDueCards(userProgress.srsCards);
    if (due.length === 0) {
      setState('empty');
    } else {
      setDueVocabIds(due);
      setState('reviewing');
    }
  }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentVocab = useMemo(() => {
    if (dueVocabIds.length === 0 || currentIndex >= dueVocabIds.length) return null;
    return vocabMap[dueVocabIds[currentIndex]] || null;
  }, [dueVocabIds, currentIndex, vocabMap]);

  const handleReveal = useCallback(() => {
    setRevealed(true);
    if (currentVocab) {
      playVocabAudio(currentVocab.id).catch(() => {});
    }
  }, [currentVocab]);

  const handleRating = useCallback((rating: Rating) => {
    if (!currentVocab) return;

    const vocabId = currentVocab.id;
    const card = userProgress.srsCards[vocabId] || createCard(vocabId);
    const updatedCard = reviewCard(card, rating);
    updateSRSCard(vocabId, updatedCard);

    // Update stats
    setStats((prev) => ({
      ...prev,
      total: prev.total + 1,
      [rating]: prev[rating] + 1,
    }));

    // Award XP per card
    const cardXP = 2;
    setXpEarned((prev) => prev + cardXP);
    addXP(cardXP);

    // Move to next card
    const nextIndex = currentIndex + 1;
    if (nextIndex >= dueVocabIds.length) {
      // Completion bonus
      const bonusXP = 10;
      setXpEarned((prev) => prev + bonusXP);
      addXP(bonusXP);
      updateStreak();
      setState('complete');
    } else {
      setCurrentIndex(nextIndex);
      setRevealed(false);
    }
  }, [currentVocab, currentIndex, dueVocabIds.length, userProgress.srsCards, updateSRSCard, addXP, updateStreak]);

  const handlePlayAudio = useCallback(() => {
    if (currentVocab) {
      playVocabAudio(currentVocab.id).catch(() => {});
    }
  }, [currentVocab]);

  const dueCount = useMemo(() => {

    if (!mounted) return;
    if (!mounted) return 0;
    return getDueCount(userProgress.srsCards);
  }, [mounted, userProgress.srsCards]);

  // Loading state
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-[#d4a520] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Empty state — no cards due
  if (state === 'empty') {
    return (
      <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <button
            onClick={() => router.push('/practice')}
            className="flex items-center gap-2 text-[var(--foreground)]/50 mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center mt-20 text-center"
        >
          <div className="text-6xl mb-4 animate-float">
            <img src="/kuttan-happy.png" alt="Kuttan" className="w-24 h-24 mx-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <span className="block mt-2">🎉</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">No cards due!</h2>
          <p className="text-[var(--foreground)]/40 text-sm mb-2">
            All caught up. Come back tomorrow for your next review.
          </p>
          <p className="text-[var(--foreground)]/25 text-xs mb-8">
            Learn more words in lessons to add them to your review deck.
          </p>
          <button
            onClick={() => router.push('/practice')}
            className="game-button text-sm"
          >
            Back to Practice
          </button>
        </motion.div>
      </div>
    );
  }

  // Completion state
  if (state === 'complete') {
    const accuracy = stats.total > 0
      ? Math.round(((stats.good + stats.easy) / stats.total) * 100)
      : 0;

    return (
      <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <button
            onClick={() => router.push('/practice')}
            className="flex items-center gap-2 text-[var(--foreground)]/50 mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
          className="mt-10"
        >
          {/* Celebration header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
              className="text-5xl mb-3"
            >
              🏆
            </motion.div>
            <h2 className="text-2xl font-bold mb-1">Review Complete!</h2>
            <p className="text-[var(--foreground)]/40 text-sm">
              Adipoli! You reviewed all your due cards.
            </p>
          </div>

          {/* Stats grid */}
          <div className="game-card p-5 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#d4a520]">{stats.total}</div>
                <div className="text-xs text-[var(--foreground)]/40 mt-1">Cards reviewed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#27ae60]">{accuracy}%</div>
                <div className="text-xs text-[var(--foreground)]/40 mt-1">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#d4a520]">+{xpEarned}</div>
                <div className="text-xs text-[var(--foreground)]/40 mt-1">XP earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#8b5cf6]">{userProgress.streak}</div>
                <div className="text-xs text-[var(--foreground)]/40 mt-1">Day streak</div>
              </div>
            </div>
          </div>

          {/* Rating breakdown */}
          <div className="game-card p-4 mb-6">
            <h3 className="text-sm font-bold mb-3">Breakdown</h3>
            <div className="flex justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#c0392b]" />
                <span className="text-[var(--foreground)]/50">Again: {stats.again}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#e67e22]" />
                <span className="text-[var(--foreground)]/50">Hard: {stats.hard}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#27ae60]" />
                <span className="text-[var(--foreground)]/50">Good: {stats.good}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
                <span className="text-[var(--foreground)]/50">Easy: {stats.easy}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/practice')}
              className="flex-1 game-card p-3 text-center text-sm font-bold hover:bg-[var(--foreground)]/5 transition-colors"
            >
              Back to Practice
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex-1 game-button text-sm"
            >
              Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Review state
  const progress = dueVocabIds.length > 0
    ? ((currentIndex) / dueVocabIds.length) * 100
    : 0;

  return (
    <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto flex flex-col">
      {/* Header */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.push('/practice')}
            className="flex items-center gap-2 text-[var(--foreground)]/50 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#d4a520]" />
            <span className="text-xs font-bold text-[#d4a520]">{dueCount} due</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">
            <span className="gradient-text">Daily Review</span>
          </h1>
          <span className="text-xs text-[var(--foreground)]/40">
            Card {currentIndex + 1} of {dueVocabIds.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-[var(--foreground)]/10 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #d4a520, #27ae60)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Card area */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentVocab && (
            <motion.div
              key={currentVocab.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.25 }}
            >
              {/* Flashcard */}
              <div
                className="game-card p-6 mb-6 cursor-pointer select-none"
                onClick={!revealed ? handleReveal : undefined}
              >
                {/* German word — always visible */}
                <div className="text-center mb-4">
                  <motion.div
                    className="text-4xl font-bold mb-2"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {currentVocab.german}
                  </motion.div>
                  <div className="text-sm text-[var(--foreground)]/30">
                    {currentVocab.pronunciation}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-12 h-0.5 bg-[var(--foreground)]/10 mx-auto mb-4" />

                {/* Reveal area */}
                <AnimatePresence>
                  {!revealed ? (
                    <motion.div
                      key="prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-6"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4a520]/10 border border-[#d4a520]/20">
                        <RotateCcw className="w-4 h-4 text-[#d4a520]" />
                        <span className="text-sm text-[#d4a520] font-medium">Tap to reveal</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      {/* English */}
                      <div className="text-center">
                        <div className="text-xl font-bold text-[#d4a520]">
                          {currentVocab.english}
                        </div>
                      </div>

                      {/* Malayalam */}
                      <div className="text-center">
                        <span className="text-sm text-[var(--foreground)]/50">
                          {currentVocab.malayalam}
                        </span>
                      </div>

                      {/* Example */}
                      {currentVocab.example && (
                        <div className="game-card p-3 mt-3">
                          <p className="text-xs text-[var(--foreground)]/60 italic leading-relaxed">
                            &ldquo;{currentVocab.example}&rdquo;
                          </p>
                          {currentVocab.exampleTranslation && (
                            <p className="text-xs text-[var(--foreground)]/30 mt-1">
                              {currentVocab.exampleTranslation}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Audio button */}
                      <div className="flex justify-center pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAudio();
                          }}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/25 hover:bg-[#8b5cf6]/25 transition-colors"
                        >
                          <Volume2 className="w-4 h-4 text-[#8b5cf6]" />
                          <span className="text-xs text-[#8b5cf6] font-medium">Play audio</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating buttons — only shown when revealed */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pb-4"
          >
            <p className="text-center text-xs text-[var(--foreground)]/30 mb-3">
              How well did you know this?
            </p>
            <div className="grid grid-cols-4 gap-2">
              <RatingButton
                label="Again"
                sublabel="1 min"
                color="#c0392b"
                onClick={() => handleRating('again')}
              />
              <RatingButton
                label="Hard"
                sublabel="< 1d"
                color="#e67e22"
                onClick={() => handleRating('hard')}
              />
              <RatingButton
                label="Good"
                sublabel={getIntervalPreview(userProgress.srsCards[dueVocabIds[currentIndex]], 'good')}
                color="#27ae60"
                onClick={() => handleRating('good')}
              />
              <RatingButton
                label="Easy"
                sublabel={getIntervalPreview(userProgress.srsCards[dueVocabIds[currentIndex]], 'easy')}
                color="#3b82f6"
                onClick={() => handleRating('easy')}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Rating button component
function RatingButton({
  label,
  sublabel,
  color,
  onClick,
}: {
  label: string;
  sublabel: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 py-3 px-2 rounded-xl transition-colors"
      style={{
        backgroundColor: `${color}15`,
        border: `2px solid ${color}30`,
      }}
    >
      <span className="text-sm font-bold" style={{ color }}>
        {label}
      </span>
      <span className="text-[10px] opacity-50" style={{ color }}>
        {sublabel}
      </span>
    </motion.button>
  );
}

// Preview the next interval for a given rating
function getIntervalPreview(card: SRSCard | undefined, rating: Rating): string {
  if (!card) return '1d';

  const preview = reviewCard(card, rating);
  const days = preview.interval;

  if (days === 0) return '1 min';
  if (days === 1) return '1d';
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${(days / 365).toFixed(1)}y`;
}
