'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ArrowLeft,
  Volume2,
  Search,
  CheckCircle,
  Zap,
  ChevronRight,
  Play,
} from 'lucide-react';
import { Card, ProgressBar } from '@/components/ui';
import { Kuttan } from '@/components/character/Kuttan';
import { Appu } from '@/components/character/Appu';
import { useGameStore } from '@/lib/store';
import { getAllVocabulary, ALL_MODULES, type VocabItem } from '@/lib/content/modules';
import { playVocabAudio } from '@/lib/audio';
import {
  generateEncounterBatch,
  deriveRating,
  ENCOUNTER_TYPE_LABELS,
  type Encounter,
  type EncounterResult,
} from '@/lib/encounters';
import { reviewCard, createCard, type SRSCard } from '@/lib/srs';

type PageMode = 'browse' | 'practice';

const FEEDBACK_CORRECT = [
  "Adipoli! Correct! ✅",
  "Machane, seri aanu! 🎯",
  "Nice one! 💪",
  "You got it! 👏",
];

const FEEDBACK_WRONG = [
  "Aiyyo! Not that one... 😅",
  "Paravaala! Try again!",
  "Almost! Look carefully 👀",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function VocabularyPage() {
  const { userProgress, addXP, updateSRSCard, addSRSCard } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<PageMode>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  // Practice state
  const [practiceModuleId, setPracticeModuleId] = useState<number | null>(null);
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [sessionStats, setSessionStats] = useState({ total: 0, correct: 0, xp: 0 });
  const encounterStartTime = useRef(Date.now());

  useEffect(() => { setMounted(true); }, []);

  const allVocab = useMemo(() => getAllVocabulary(), []);

  const startPractice = (moduleId: number) => {
    const mod = ALL_MODULES.find(m => m.id === moduleId);
    if (!mod) return;

    const moduleVocab = mod.lessons.flatMap(l => l.vocabulary);
    // Only practice learned words
    const learnedVocab = moduleVocab.filter(v =>
      userProgress.learnedVocabulary.includes(v.id)
    );

    if (learnedVocab.length === 0) return;

    // Shuffle and take up to 10
    const shuffled = [...learnedVocab].sort(() => Math.random() - 0.5).slice(0, 10);

    // Get last encounter types for variety
    const lastTypes: Record<string, string | undefined> = {};
    shuffled.forEach(v => {
      lastTypes[v.id] = userProgress.srsCards[v.id]?.lastEncounterType;
    });

    const batch = generateEncounterBatch(shuffled, allVocab, lastTypes);
    setEncounters(batch);
    setCurrentIndex(0);
    setPracticeModuleId(moduleId);
    setMode('practice');
    setSelectedOption(null);
    setWrongAttempts(0);
    setShowFeedback(false);
    setIsCorrect(false);
    setFeedbackText('');
    setSessionStats({ total: 0, correct: 0, xp: 0 });
    encounterStartTime.current = Date.now();
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback && isCorrect) return;
    const encounter = encounters[currentIndex];
    if (!encounter) return;

    if (optionIndex === encounter.correctIndex) {
      const responseTime = Date.now() - encounterStartTime.current;
      const firstTry = wrongAttempts === 0;
      setSelectedOption(optionIndex);
      setIsCorrect(true);
      setShowFeedback(true);
      setFeedbackText(pickRandom(FEEDBACK_CORRECT));

      // SRS update
      const result: EncounterResult = {
        encounter,
        firstTryCorrect: firstTry,
        wrongAttempts,
        responseTimeMs: responseTime,
      };
      const rating = deriveRating(result);
      const vocabId = encounter.targetVocab.id;
      let card = userProgress.srsCards[vocabId];
      if (!card) {
        card = createCard(vocabId);
        addSRSCard(card);
      }
      const updated = reviewCard(card, rating);
      updated.lastEncounterType = encounter.type;
      updateSRSCard(vocabId, updated);

      const xpForCard = firstTry ? 3 : 1;
      addXP(xpForCard);
      setSessionStats(prev => ({
        total: prev.total + 1,
        correct: prev.correct + (firstTry ? 1 : 0),
        xp: prev.xp + xpForCard,
      }));
      playVocabAudio(encounter.targetVocab.id).catch(() => {});
    } else {
      setSelectedOption(optionIndex);
      setWrongAttempts(prev => prev + 1);
      setFeedbackText(pickRandom(FEEDBACK_WRONG));
      setShowFeedback(true);
      setIsCorrect(false);
      setTimeout(() => {
        setSelectedOption(null);
        setShowFeedback(false);
      }, 1200);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= encounters.length) {
      // Session done — go back to browse
      setMode('browse');
      return;
    }
    setCurrentIndex(prev => prev + 1);
    setSelectedOption(null);
    setWrongAttempts(0);
    setShowFeedback(false);
    setIsCorrect(false);
    setFeedbackText('');
    encounterStartTime.current = Date.now();
  };

  if (!mounted) {
    return (
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="h-6 w-48 bg-[var(--foreground)]/8 rounded mb-4 animate-pulse" />
        <div className="game-card p-6 animate-pulse">
          <div className="h-32 bg-[var(--foreground)]/6 rounded-xl" />
        </div>
      </div>
    );
  }

  const learnedCount = userProgress.learnedVocabulary.length;
  const totalCount = allVocab.length;

  // ─── Practice Mode ────────────────────────────────────────
  if (mode === 'practice' && encounters.length > 0) {
    const encounter = encounters[currentIndex];
    const isDone = currentIndex >= encounters.length;
    const progress = (currentIndex / encounters.length) * 100;
    const meta = encounter ? ENCOUNTER_TYPE_LABELS[encounter.type] : null;

    if (!encounter) {
      // All done
      return (
        <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
          <Kuttan mood="celebrating" size="lg" />
          <h2 className="text-2xl font-bold mt-4 mb-2">Practice Complete!</h2>
          <p className="text-[var(--foreground)]/50 text-sm mb-4">
            {sessionStats.correct}/{sessionStats.total} first try · +{sessionStats.xp} XP
          </p>
          <button onClick={() => setMode('browse')} className="game-button text-sm">
            Back to Vocabulary
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setMode('browse')}
            className="flex items-center gap-2 text-[var(--foreground)]/50 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#ffd93d]" />
              <span className="text-xs font-bold text-[#ffd93d]">+{sessionStats.xp} XP</span>
            </div>
            <span className="text-xs text-[var(--foreground)]/30">{currentIndex + 1}/{encounters.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-[var(--foreground)]/10 rounded-full overflow-hidden mb-5">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #ff6b9d, #00d9a5)' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Encounter */}
        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex-1 flex flex-col"
            >
              {/* Kuttan */}
              <div className="flex items-start gap-2.5 mb-4">
                <Kuttan
                  mood={isCorrect ? 'happy' : showFeedback ? 'sad' : 'thinking'}
                  size="sm"
                  entrance={false}
                />
                <div className="game-card px-3 py-2 flex-1">
                  <p className="text-xs text-[var(--foreground)]/70 leading-snug">
                    {showFeedback ? feedbackText : encounter.kuttanSays}
                  </p>
                </div>
              </div>

              {/* Type badge */}
              {meta && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">{meta.icon}</span>
                  <span className="text-xs font-medium text-[var(--foreground)]/40">{meta.label}</span>
                </div>
              )}

              {/* Prompt */}
              <div className="game-card p-5 mb-4">
                {encounter.contextGerman && (
                  <p className="text-lg font-semibold leading-relaxed whitespace-pre-line mb-3">
                    {encounter.contextGerman}
                  </p>
                )}
                <p className="text-sm text-[var(--foreground)]/60">{encounter.prompt}</p>
                <button
                  onClick={() => playVocabAudio(encounter.targetVocab.id).catch(() => {})}
                  className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#8b5cf6]" />
                  <span className="text-[11px] text-[#8b5cf6] font-medium">Listen</span>
                </button>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {encounter.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectOpt = idx === encounter.correctIndex;
                  const showCorrectHL = showFeedback && isCorrect && isCorrectOpt;
                  const showWrongHL = isSelected && showFeedback && !isCorrect;

                  let border = 'border-[var(--foreground)]/10';
                  let bg = 'bg-transparent';
                  let text = 'text-[var(--foreground)]';
                  if (showCorrectHL) { border = 'border-[#00d9a5]'; bg = 'bg-[#00d9a5]/15'; text = 'text-[#00d9a5]'; }
                  else if (showWrongHL) { border = 'border-[#ff6b9d]'; bg = 'bg-[#ff6b9d]/15'; text = 'text-[#ff6b9d]'; }

                  return (
                    <motion.button
                      key={idx}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={showFeedback && isCorrect}
                      className={`p-3.5 rounded-xl border-2 ${border} ${bg} transition-all text-left`}
                    >
                      <span className={`text-sm font-medium ${text}`}>{option}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* After correct: explanation + next */}
              <AnimatePresence>
                {showFeedback && isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-auto"
                  >
                    <div className="game-card p-4 mb-4 border-l-4 border-[#00d9a5]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold">{encounter.targetVocab.german}</span>
                        <span className="text-xs text-[var(--foreground)]/30">[{encounter.targetVocab.pronunciation}]</span>
                      </div>
                      <p className="text-xs text-[var(--foreground)]/50">
                        {encounter.targetVocab.english} · {encounter.targetVocab.malayalam}
                      </p>
                    </div>
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

  // ─── Browse Mode ──────────────────────────────────────────
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-500/15 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Vocabulary</h1>
            <p className="text-[var(--foreground)]/50 text-sm">Practice words by module</p>
          </div>
        </div>

        {/* Kuttan */}
        <div className="flex items-center gap-2.5 game-card px-3 py-2 mb-4">
          <Kuttan mood={learnedCount > 100 ? 'celebrating' : learnedCount > 0 ? 'happy' : 'pointing'} size="sm" entrance={false} />
          <p className="text-xs text-[var(--foreground)]/60 leading-snug">
            {learnedCount === 0
              ? 'Start learning words in lessons — then come back here to practice! 📚'
              : learnedCount < 50
              ? `${learnedCount} words learned! Pick a module and practice them! 💪`
              : `Adipoli! ${learnedCount} words! Keep practicing to lock them in! 🔥`}
          </p>
        </div>

        {/* Overall progress */}
        <Card className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--foreground)]/50">Total Words Learned</span>
            <span className="font-medium text-[var(--foreground)]/80">{learnedCount}/{totalCount}</span>
          </div>
          <ProgressBar progress={(learnedCount / totalCount) * 100} color="success" size="md" />
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--foreground)]/5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#ff6b9d]"
          />
        </div>
      </motion.div>

      {/* Module cards — practice or explore */}
      <div className="space-y-3">
        {ALL_MODULES
          .filter(m => {
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return m.title.toLowerCase().includes(q) || m.titleGerman.toLowerCase().includes(q);
          })
          .map((module, idx) => {
          const moduleVocab = module.lessons.flatMap(l => l.vocabulary);
          const learnedModuleVocab = moduleVocab.filter(v =>
            userProgress.learnedVocabulary.includes(v.id)
          );
          const learnedModuleCount = learnedModuleVocab.length;
          const canPractice = learnedModuleCount >= 2; // Need at least 2 words to practice

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <Card padding="sm" className="hover:border-[#ff6b9d]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: module.color + '20' }}
                  >
                    {module.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--foreground)] text-sm">
                      Module {module.id}: {module.title}
                    </h3>
                    <p className="text-xs text-[var(--foreground)]/40">
                      {learnedModuleCount}/{moduleVocab.length} words learned
                    </p>
                    <div className="mt-1.5">
                      <ProgressBar
                        progress={moduleVocab.length > 0 ? (learnedModuleCount / moduleVocab.length) * 100 : 0}
                        color="success"
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Practice button */}
                  {canPractice ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startPractice(module.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ff6b9d]/15 border border-[#ff6b9d]/25 hover:bg-[#ff6b9d]/25 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 text-[#ff6b9d]" />
                      <span className="text-xs font-medium text-[#ff6b9d]">Practice</span>
                    </motion.button>
                  ) : learnedModuleCount === 0 ? (
                    <span className="text-xs text-[var(--foreground)]/25 px-2">No words yet</span>
                  ) : (
                    <span className="text-xs text-[var(--foreground)]/25 px-2">Learn more first</span>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
