'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, RotateCcw } from 'lucide-react';
import { GameButton, Confetti, Celebration } from '@/components/game';
import { ComboMeter } from '@/components/game/ComboMeter';
import { GameStoryWrapper } from '@/components/game/GameStoryWrapper';
import { CharacterGuide } from '@/components/character';
import { useGameStore } from '@/lib/store';
import { useGermanTTS } from '@/lib/audio/useGermanTTS';
import { feedbackCorrect, feedbackWrong, feedbackCelebration, feedbackCombo } from '@/lib/feedback';
import type { SceneType } from '@/lib/audio/ambience';

// ── Location data ──────────────────────────────────────────

interface Location {
  id: string;
  name: string;
  nameGerman: string;
  emoji: string;
  x: number; // % position on the "map"
  y: number;
}

interface Instruction {
  german: string;
  english: string;
  targetLocationId: string;
  difficulty: 1 | 2 | 3;
}

const LOCATIONS: Location[] = [
  { id: 'supermarkt', name: 'Supermarket', nameGerman: 'Supermarkt', emoji: '🛒', x: 15, y: 25 },
  { id: 'bahnhof', name: 'Train Station', nameGerman: 'Bahnhof', emoji: '🚂', x: 50, y: 15 },
  { id: 'cafe', name: 'Café', nameGerman: 'Café', emoji: '☕', x: 80, y: 30 },
  { id: 'apotheke', name: 'Pharmacy', nameGerman: 'Apotheke', emoji: '💊', x: 25, y: 60 },
  { id: 'bank', name: 'Bank', nameGerman: 'Bank', emoji: '🏦', x: 60, y: 55 },
  { id: 'post', name: 'Post Office', nameGerman: 'Post', emoji: '📮', x: 85, y: 65 },
  { id: 'schule', name: 'School', nameGerman: 'Schule', emoji: '🏫', x: 40, y: 80 },
  { id: 'park', name: 'Park', nameGerman: 'Park', emoji: '🌳', x: 70, y: 85 },
  { id: 'krankenhaus', name: 'Hospital', nameGerman: 'Krankenhaus', emoji: '🏥', x: 10, y: 85 },
];

const INSTRUCTIONS: Instruction[] = [
  // Level 1 — single words / simple
  { german: 'Geh zum Supermarkt!', english: 'Go to the supermarket!', targetLocationId: 'supermarkt', difficulty: 1 },
  { german: 'Geh zum Bahnhof!', english: 'Go to the train station!', targetLocationId: 'bahnhof', difficulty: 1 },
  { german: 'Geh zum Café!', english: 'Go to the café!', targetLocationId: 'cafe', difficulty: 1 },
  { german: 'Geh zur Apotheke!', english: 'Go to the pharmacy!', targetLocationId: 'apotheke', difficulty: 1 },
  { german: 'Geh zur Bank!', english: 'Go to the bank!', targetLocationId: 'bank', difficulty: 1 },
  { german: 'Geh zur Post!', english: 'Go to the post office!', targetLocationId: 'post', difficulty: 1 },
  { german: 'Geh zur Schule!', english: 'Go to the school!', targetLocationId: 'schule', difficulty: 1 },
  { german: 'Geh zum Park!', english: 'Go to the park!', targetLocationId: 'park', difficulty: 1 },
  // Level 2 — context sentences
  { german: 'Ich brauche Brot. Wo gehe ich hin?', english: 'I need bread. Where do I go?', targetLocationId: 'supermarkt', difficulty: 2 },
  { german: 'Mein Zug fährt um 10 Uhr.', english: 'My train departs at 10.', targetLocationId: 'bahnhof', difficulty: 2 },
  { german: 'Ich möchte einen Kaffee trinken.', english: 'I want to drink a coffee.', targetLocationId: 'cafe', difficulty: 2 },
  { german: 'Ich bin krank und brauche Medizin.', english: 'I am sick and need medicine.', targetLocationId: 'apotheke', difficulty: 2 },
  { german: 'Ich muss Geld abheben.', english: 'I need to withdraw money.', targetLocationId: 'bank', difficulty: 2 },
  { german: 'Ich möchte einen Brief schicken.', english: 'I want to send a letter.', targetLocationId: 'post', difficulty: 2 },
  // Level 3 — harder / longer
  { german: 'Die Kinder haben heute Unterricht.', english: 'The children have class today.', targetLocationId: 'schule', difficulty: 3 },
  { german: 'Es ist ein schöner Tag. Lass uns spazieren gehen!', english: 'It is a beautiful day. Let\'s go for a walk!', targetLocationId: 'park', difficulty: 3 },
  { german: 'Mein Freund hatte einen Unfall!', english: 'My friend had an accident!', targetLocationId: 'krankenhaus', difficulty: 3 },
  { german: 'Ich muss meine Tabletten abholen.', english: 'I need to pick up my tablets.', targetLocationId: 'apotheke', difficulty: 3 },
];

// ── Component ──────────────────────────────────────────────

const STORY = {
  scene: 'street' as SceneType,
  title: 'Navigate the Town!',
  narrative: 'You just moved to a small German town. Listen to instructions and tap the right place on the map. Can you find your way around?',
  kuttanSays: 'Machane! Nammude new town-il navigate cheyyaanam! German-il directions kelkkuka, correct place tap cheyyuka!',
  emoji: '🗺️',
};

export default function ListenActGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();
  const { speak } = useGermanTTS();

  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [feedback, setFeedback] = useState<{ locationId: string; correct: boolean } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Select 10 random instructions, progressive difficulty.
  // Seeded after mount to avoid SSR/CSR shuffle mismatch.
  const gameInstructions = useRef<typeof INSTRUCTIONS>([]);
  if (gameInstructions.current.length === 0 && typeof window !== 'undefined') {
    gameInstructions.current = [...INSTRUCTIONS]
      .sort((a, b) => a.difficulty - b.difficulty)
      .slice(0, 12)
      .sort(() => Math.random() - 0.3);
  }
  const totalRounds = gameInstructions.current.length;
  const current = gameInstructions.current[round];

  // Speak the instruction when round changes
  useEffect(() => {
    if (!done && current) {
      const timer = setTimeout(() => speak(current.german), 300);
      return () => clearTimeout(timer);
    }
  }, [round, done, current, speak]);

  const handleLocationTap = useCallback((locationId: string) => {
    if (feedback || done || !current) return;

    const correct = locationId === current.targetLocationId;
    setFeedback({ locationId, correct });

    if (correct) {
      const newCombo = combo + 1;
      setScore(s => s + 1);
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      feedbackCombo(newCombo);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    } else {
      setCombo(0);
      feedbackWrong();
      setShowAnswer(true);
    }

    setTimeout(() => {
      setFeedback(null);
      setShowAnswer(false);
      if (round + 1 >= totalRounds) {
        setDone(true);
        addXP(score * 5 + 30);
        incrementGamesPlayed();
        feedbackCelebration();
      } else {
        setRound(r => r + 1);
      }
    }, correct ? 800 : 1500);
  }, [feedback, done, current, combo, round, totalRounds, score, addXP, incrementGamesPlayed]);

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Celebration
          isVisible
          title="Town Explored!"
          subtitle={`${score}/${totalRounds} correct • Max combo: ${maxCombo}x`}
          xpEarned={score * 5 + 30}
          onContinue={() => router.push('/games')}
        />
      </div>
    );
  }

  return (
    <GameStoryWrapper story={STORY}>
      <div className="min-h-screen flex flex-col px-4 py-6 safe-top safe-bottom">
        <Confetti isActive={showConfetti} duration={800} />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => router.push('/games')} className="text-[var(--foreground)]/50">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono text-[var(--foreground)]/40">
            {round + 1}/{totalRounds}
          </span>
          <span className="text-xs font-bold text-[#d4a520]">{score} pts</span>
        </div>

        {/* Combo */}
        <ComboMeter combo={combo} maxCombo={maxCombo} />

        {/* Instruction display */}
        {current && (
          <div className="my-4">
            <motion.div
              key={round}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-4 text-center"
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => speak(current.german)}
                className="inline-flex items-center gap-2 mb-2"
              >
                <Volume2 className="w-5 h-5 text-[#d4a520]" />
                <span className="text-xs text-[#d4a520] font-medium">Listen again</span>
              </motion.button>
              <p className="text-base font-bold">{current.german}</p>
              {showAnswer && (
                <p className="text-xs text-[var(--foreground)]/40 mt-1">{current.english}</p>
              )}
            </motion.div>
          </div>
        )}

        {/* Town map */}
        <div className="flex-1 relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl overflow-hidden min-h-[300px]">
          {/* Grid lines for map feel */}
          <div className="absolute inset-0 opacity-5">
            {[20, 40, 60, 80].map(p => (
              <div key={`h-${p}`} className="absolute w-full h-px bg-[var(--foreground)]" style={{ top: `${p}%` }} />
            ))}
            {[20, 40, 60, 80].map(p => (
              <div key={`v-${p}`} className="absolute h-full w-px bg-[var(--foreground)]" style={{ left: `${p}%` }} />
            ))}
          </div>

          {/* Locations */}
          {LOCATIONS.map(loc => {
            const isTarget = current?.targetLocationId === loc.id;
            const isCorrectFeedback = feedback?.locationId === loc.id && feedback.correct;
            const isWrongFeedback = feedback?.locationId === loc.id && !feedback.correct;
            const showAsAnswer = showAnswer && isTarget;

            return (
              <motion.button
                key={loc.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLocationTap(loc.id)}
                disabled={!!feedback}
                className={`absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 transition-all ${
                  isCorrectFeedback ? 'scale-110' :
                  isWrongFeedback ? 'scale-90 opacity-50' :
                  showAsAnswer ? 'scale-110' : ''
                }`}
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              >
                <motion.span
                  className={`text-3xl block ${
                    isCorrectFeedback ? 'animate-bounce' :
                    showAsAnswer ? 'ring-2 ring-[#27ae60] rounded-full' : ''
                  }`}
                  animate={isWrongFeedback ? { x: [-5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {loc.emoji}
                </motion.span>
                <span className={`text-[10px] font-semibold mt-0.5 ${
                  isCorrectFeedback ? 'text-[#27ae60]' :
                  isWrongFeedback ? 'text-[#c0392b]' :
                  showAsAnswer ? 'text-[#27ae60]' :
                  'text-[var(--foreground)]/60'
                }`}>
                  {loc.nameGerman}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </GameStoryWrapper>
  );
}
