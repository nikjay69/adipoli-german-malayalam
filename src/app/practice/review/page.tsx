'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, Clock, Zap, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { getAllVocabulary } from '@/lib/content/modules';
import type { VocabItem } from '@/lib/content/modules';
import { reviewCard, createCard, getDueCards, getDueCount, type SRSCard } from '@/lib/srs';
import {
  generateEncounterBatch,
  deriveRating,
  ENCOUNTER_TYPE_LABELS,
  type Encounter,
  type EncounterResult,
} from '@/lib/encounters';
import { Nivin } from '@/components/character/Nivin';
import { Appu } from '@/components/character/Appu';
import { playVocabAudio } from '@/lib/audio';

type ReviewState = 'loading' | 'reviewing' | 'feedback' | 'complete' | 'empty';

interface SessionStats {
  total: number;
  correct: number;   // first-try correct
  struggled: number;  // got it after mistakes
  missed: number;     // multiple wrong
  xpEarned: number;
}

// Feedback messages based on performance
const FEEDBACK_CORRECT_FAST = [
  "Adipoli! Lightning fast! ⚡",
  "Machane, speed aanu! 🔥",
  "Boom! No hesitation! 💥",
  "Mwone, nee rockstar aanu! 🎸",
];

const FEEDBACK_CORRECT = [
  "Correct! Nannayittund! ✅",
  "Adipoli! You nailed it! 🎯",
  "Seri aanu machane! 👏",
  "Nice one! Keep going! 💪",
];

const FEEDBACK_WRONG = [
  "Aiyyo! Not quite... 😅",
  "Paravaala! Let's try again!",
  "Almost machane! Look carefully 👀",
  "Hmm, not that one... try once more!",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ReviewPage() {
  const router = useRouter();
  const { userProgress, updateSRSCard, addSRSCard, addXP, updateStreak } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<ReviewState>('loading');
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [stats, setStats] = useState<SessionStats>({ total: 0, correct: 0, struggled: 0, missed: 0, xpEarned: 0 });
  const encounterStartTime = useRef<number>(Date.now());
  const [peerMood, setNivinMood] = useState<'thinking' | 'happy' | 'excited' | 'sad'>('thinking');

  // Build vocab lookup map once
  const allVocab = useMemo(() => getAllVocabulary(), []);
  const vocabMap = useMemo(() => {
    const map: Record<string, VocabItem> = {};
    allVocab.forEach((v) => { map[v.id] = v; });
    return map;
  }, [allVocab]);

  // Initialize
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Create SRS cards for any learned vocab that doesn't have one yet
    userProgress.learnedVocabulary.forEach((vocabId) => {
      if (!userProgress.srsCards[vocabId]) {
        addSRSCard(createCard(vocabId));
      }
    });

    // Get due cards
    const dueIds = getDueCards(userProgress.srsCards);
    if (dueIds.length === 0) {
      setState('empty');
      return;
    }

    // Resolve to VocabItems
    const dueVocab = dueIds
      .map((id) => vocabMap[id])
      .filter(Boolean) as VocabItem[];

    if (dueVocab.length === 0) {
      setState('empty');
      return;
    }

    // Build map of last encounter types from SRS cards so we don't repeat formats
    const lastEncounterTypes: Record<string, string | undefined> = {};
    dueIds.forEach((id) => {
      lastEncounterTypes[id] = userProgress.srsCards[id]?.lastEncounterType;
    });

    // Generate immersive encounters — each word gets a DIFFERENT format than last time
    const batch = generateEncounterBatch(dueVocab, allVocab, lastEncounterTypes);
    setEncounters(batch);
    setState('reviewing');
    encounterStartTime.current = Date.now();
  }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentEncounter = encounters[currentIndex] || null;
  const dueCount = useMemo(() => {
    if (!mounted) return 0;
    return getDueCount(userProgress.srsCards);
  }, [mounted, userProgress.srsCards]);

  const handleOptionSelect = useCallback((optionIndex: number) => {
    if (showFeedback && isCorrect) return; // Already showing correct feedback, ignore taps

    const encounter = encounters[currentIndex];
    if (!encounter) return;

    const correct = optionIndex === encounter.correctIndex;

    if (correct) {
      // Correct answer!
      const responseTime = Date.now() - encounterStartTime.current;
      const firstTry = wrongAttempts === 0;
      const fast = responseTime < 4000;

      setSelectedOption(optionIndex);
      setIsCorrect(true);
      setShowFeedback(true);

      if (firstTry && fast) {
        setFeedbackText(pickRandom(FEEDBACK_CORRECT_FAST));
        setNivinMood('excited');
      } else if (firstTry) {
        setFeedbackText(pickRandom(FEEDBACK_CORRECT));
        setNivinMood('happy');
      } else {
        setFeedbackText("Got it! " + encounter.explanation);
        setNivinMood('happy');
      }

      // Derive SRS rating implicitly
      const result: EncounterResult = {
        encounter,
        firstTryCorrect: firstTry,
        wrongAttempts,
        responseTimeMs: responseTime,
      };
      const rating = deriveRating(result);

      // Update SRS card — also remember which encounter type was used
      const vocabId = encounter.targetVocab.id;
      const card = userProgress.srsCards[vocabId] || createCard(vocabId);
      const updatedCard = reviewCard(card, rating);
      updatedCard.lastEncounterType = encounter.type;
      updateSRSCard(vocabId, updatedCard);

      // Update stats
      const xpForCard = firstTry ? 3 : 1;
      setStats((prev) => ({
        total: prev.total + 1,
        correct: prev.correct + (firstTry && !fast ? 1 : 0) + (firstTry && fast ? 1 : 0),
        struggled: prev.struggled + (!firstTry && wrongAttempts === 1 ? 1 : 0),
        missed: prev.missed + (wrongAttempts >= 2 ? 1 : 0),
        xpEarned: prev.xpEarned + xpForCard,
      }));
      addXP(xpForCard);

      // Play audio for the word
      playVocabAudio(encounter.targetVocab.id).catch(() => {});
    } else {
      // Wrong answer
      setSelectedOption(optionIndex);
      setWrongAttempts((prev) => prev + 1);
      setFeedbackText(pickRandom(FEEDBACK_WRONG));
      setNivinMood('sad');
      setShowFeedback(true);
      setIsCorrect(false);

      // Clear wrong selection after a beat so they can try again
      setTimeout(() => {
        setSelectedOption(null);
        setShowFeedback(false);
      }, 1200);
    }
  }, [encounters, currentIndex, wrongAttempts, showFeedback, isCorrect, userProgress.srsCards, updateSRSCard, addXP]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= encounters.length) {
      // Session complete
      const bonusXP = 10;
      addXP(bonusXP);
      setStats((prev) => ({ ...prev, xpEarned: prev.xpEarned + bonusXP }));
      updateStreak();
      setState('complete');
    } else {
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
      setWrongAttempts(0);
      setShowFeedback(false);
      setIsCorrect(false);
      setFeedbackText('');
      setNivinMood('thinking');
      encounterStartTime.current = Date.now();
    }
  }, [currentIndex, encounters.length, addXP, updateStreak]);

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
          className="flex flex-col items-center justify-center mt-12 text-center"
        >
          <div className="flex items-end gap-2 mb-6">
            <Nivin mood="happy" size="lg" />
            <Appu mood="sleeping" size="sm" />
          </div>
          <h2 className="text-xl font-bold mb-2">All caught up!</h2>
          <p className="text-[var(--foreground)]/50 text-sm mb-1">
            No words need practice right now. Appu is napping.
          </p>
          {(() => {
            const cards = Object.values(userProgress.srsCards);
            if (cards.length === 0) return (
              <p className="text-[var(--foreground)]/30 text-xs mb-6">
                Learn words in lessons to start building your practice sessions.
              </p>
            );
            const futureCards = cards.filter(c => c.nextReview > Date.now());
            if (futureCards.length === 0) return (
              <p className="text-[var(--foreground)]/30 text-xs mb-6">
                All words mastered. Adipoli!
              </p>
            );
            const nextTime = Math.min(...futureCards.map(c => c.nextReview));
            const diffMs = nextTime - Date.now();
            const hours = Math.floor(diffMs / 3600000);
            const minutes = Math.floor((diffMs % 3600000) / 60000);
            return (
              <p className="text-[var(--foreground)]/30 text-xs mb-6">
                Next session in {hours > 0 ? `${hours}h ` : ''}{minutes}m · {futureCards.length} words upcoming
              </p>
            );
          })()}
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
      ? Math.round((stats.correct / stats.total) * 100)
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
          className="mt-8"
        >
          {/* Celebration */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-end gap-2 mb-4">
              <Nivin mood="celebrating" size="lg" />
              <Appu mood="happy" size="sm" />
            </div>
            <h2 className="text-2xl font-bold mb-1">Session Complete!</h2>
            <p className="text-[var(--foreground)]/40 text-sm">
              {accuracy >= 80 ? "Adipoli machane! You crushed it!" :
               accuracy >= 50 ? "Good effort! Getting stronger!" :
               "Paravaala! Every session makes you better!"}
            </p>
          </div>

          {/* Stats */}
          <div className="game-card p-5 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#86efac]">{stats.total}</div>
                <div className="text-xs text-[var(--foreground)]/40 mt-1">Words practiced</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#fcd34d]">+{stats.xpEarned}</div>
                <div className="text-xs text-[var(--foreground)]/40 mt-1">XP earned</div>
              </div>
            </div>
          </div>

          {/* Performance breakdown */}
          <div className="game-card p-4 mb-6">
            <h3 className="text-sm font-bold mb-3">How it went</h3>
            <div className="space-y-2">
              {stats.correct > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#86efac]" />
                    <span className="text-xs text-[var(--foreground)]/60">Nailed it first try</span>
                  </div>
                  <span className="text-sm font-bold text-[#86efac]">{stats.correct}</span>
                </div>
              )}
              {stats.struggled > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#fcd34d]" />
                    <span className="text-xs text-[var(--foreground)]/60">Got it after a try</span>
                  </div>
                  <span className="text-sm font-bold text-[#fcd34d]">{stats.struggled}</span>
                </div>
              )}
              {stats.missed > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b9d]" />
                    <span className="text-xs text-[var(--foreground)]/60">Need more practice</span>
                  </div>
                  <span className="text-sm font-bold text-[#ff6b9d]">{stats.missed}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
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

  // ─── Active Review State ───────────────────────────────────
  if (!currentEncounter) return null;

  const progress = encounters.length > 0
    ? (currentIndex / encounters.length) * 100
    : 0;

  const encounterMeta = ENCOUNTER_TYPE_LABELS[currentEncounter.type];

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
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#ffd93d]" />
              <span className="text-xs font-bold text-[#ffd93d]">+{stats.xpEarned} XP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--foreground)]/30" />
              <span className="text-xs text-[var(--foreground)]/30">{currentIndex + 1}/{encounters.length}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-4 bg-[var(--foreground)]/10 rounded-full overflow-hidden mb-5">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #ff6b9d, #00d9a5)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[11px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              {currentIndex + 1}/{encounters.length} cards
            </span>
          </div>
        </div>
      </motion.div>

      {/* Encounter Card */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${currentEncounter.targetVocab.id}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            {/* Nivin speech bubble */}
            <div className="flex items-start gap-2.5 mb-4">
              <Nivin mood={peerMood} size="sm" entrance={false} />
              <motion.div
                key={feedbackText || currentEncounter.peerSays}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="game-card px-3 py-2 flex-1"
              >
                <p className="text-sm font-medium text-[var(--foreground)]/70 leading-snug">
                  {showFeedback ? feedbackText : currentEncounter.peerSays}
                </p>
              </motion.div>
            </div>

            {/* Encounter type badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">{encounterMeta.icon}</span>
              <span className="text-xs font-medium text-[var(--foreground)]/40">{encounterMeta.label}</span>
            </div>

            {/* Prompt */}
            <div className="game-card p-5 mb-4">
              {/* German context (sentence, dialogue, etc.) */}
              {currentEncounter.contextGerman && (
                <div className="mb-4">
                  <p className="text-lg font-semibold leading-relaxed whitespace-pre-line">
                    {currentEncounter.contextGerman}
                  </p>
                </div>
              )}

              {/* Question */}
              <p className="text-sm text-[var(--foreground)]/60">
                {currentEncounter.prompt}
              </p>

              {/* Audio button for the word */}
              <button
                onClick={() => playVocabAudio(currentEncounter.targetVocab.id).catch(() => {})}
                className="mt-3 inline-flex items-center gap-2 p-2.5 min-w-[44px] min-h-[44px] rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 hover:bg-[#8b5cf6]/20 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#8b5cf6]" />
                <span className="text-[11px] text-[#8b5cf6] font-medium">Listen</span>
              </button>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-4">
              {currentEncounter.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === currentEncounter.correctIndex;
                const showCorrectHighlight = showFeedback && isCorrect && isCorrectOption;
                const showWrongHighlight = isSelected && showFeedback && !isCorrect;

                let borderColor = 'border-[var(--foreground)]/10';
                let bgColor = 'bg-transparent';
                let textColor = 'text-[var(--foreground)]';

                if (showCorrectHighlight) {
                  borderColor = 'border-[#00d9a5]';
                  bgColor = 'bg-[#00d9a5]/15';
                  textColor = 'text-[#00d9a5]';
                } else if (showWrongHighlight) {
                  borderColor = 'border-[#ff6b9d]';
                  bgColor = 'bg-[#ff6b9d]/15';
                  textColor = 'text-[#ff6b9d]';
                }

                return (
                  <motion.button
                    key={`${idx}-${option}`}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={showFeedback && isCorrect}
                    className={`p-3.5 rounded-xl border-2 ${borderColor} ${bgColor} transition-all duration-200 text-left`}
                  >
                    <span className={`text-sm font-medium ${textColor}`}>
                      {option}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation + Next button (shown after correct answer) */}
            <AnimatePresence>
              {showFeedback && isCorrect && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-auto"
                >
                  {/* Explanation card */}
                  <div className="game-card p-4 mb-4 border-l-4 border-[#00d9a5]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold">{currentEncounter.targetVocab.german}</span>
                      <span className="text-xs text-[var(--foreground)]/30">[{currentEncounter.targetVocab.pronunciation}]</span>
                    </div>
                    <p className="text-xs text-[var(--foreground)]/50 leading-relaxed">
                      {currentEncounter.targetVocab.english} · {currentEncounter.targetVocab.malayalam}
                    </p>
                    {currentEncounter.targetVocab.example && (
                      <p className="text-xs text-[var(--foreground)]/35 mt-1.5 italic">
                        &ldquo;{currentEncounter.targetVocab.example}&rdquo; — {currentEncounter.targetVocab.exampleTranslation}
                      </p>
                    )}
                  </div>

                  {/* Next button */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNext}
                    className="w-full game-button py-3.5 text-sm flex items-center justify-center gap-2"
                  >
                    {currentIndex + 1 >= encounters.length ? 'Finish' : 'Next'}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
