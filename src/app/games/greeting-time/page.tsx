'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { CharacterGuide } from '@/components/character';
import { Confetti, Stars } from '@/components/game';
import { useGameStore } from '@/lib/store';
import type { KuttanMood } from '@/components/character';

// --- Scenario data ---
interface GreetingScenario {
  time: string;
  scene: string;
  who: string;
  answer: string;
  period: 'morning' | 'afternoon' | 'evening' | 'night';
  culturalNote: string;
}

const SCENARIOS: GreetingScenario[] = [
  {
    time: '7:30',
    scene: 'You wake up and call your German friend.',
    who: 'your friend Lisa',
    answer: 'Guten Morgen',
    period: 'morning',
    culturalNote: 'Germans typically greet friends with "Guten Morgen" until about 11 AM. Close friends might just say "Morgen!"',
  },
  {
    time: '9:00',
    scene: 'You arrive at the office. Your boss is at reception.',
    who: 'Herr Mueller (boss)',
    answer: 'Guten Morgen',
    period: 'morning',
    culturalNote: 'In Germany, you greet your boss with "Guten Morgen, Herr Mueller!" — formal and polite! Always use the last name unless invited to use first names.',
  },
  {
    time: '12:30',
    scene: 'You enter a restaurant for lunch.',
    who: 'the waiter',
    answer: 'Guten Tag',
    period: 'afternoon',
    culturalNote: '"Guten Tag" is the universal safe greeting from late morning onwards. In restaurants, some people just say "Tag!" informally.',
  },
  {
    time: '15:00',
    scene: 'You meet a neighbor on the street.',
    who: 'Frau Schmidt',
    answer: 'Guten Tag',
    period: 'afternoon',
    culturalNote: 'Meeting neighbors? "Guten Tag, Frau Schmidt!" — Germans love their polite greetings. Kerala-il "namaskaram" parayunna pole!',
  },
  {
    time: '18:30',
    scene: 'You arrive at a dinner party.',
    who: 'your host couple',
    answer: 'Guten Abend',
    period: 'evening',
    culturalNote: '"Guten Abend" starts around 6 PM. At dinner parties, you greet each person individually — very different from a group "hello"!',
  },
  {
    time: '20:00',
    scene: 'You join a late study group at the library.',
    who: 'fellow students',
    answer: 'Guten Abend',
    period: 'evening',
    culturalNote: 'Even at 8 PM, "Guten Abend" is correct. With friends you might hear "Na?" or "Hey!" but "Guten Abend" is always safe.',
  },
  {
    time: '22:30',
    scene: 'Your roommate is going to bed.',
    who: 'your roommate',
    answer: 'Gute Nacht',
    period: 'night',
    culturalNote: '"Gute Nacht" is specifically for saying goodbye at night / when someone is going to sleep. Kerala-il "shubha rathri" parayunna pole!',
  },
  {
    time: '23:45',
    scene: 'You finish a video call with your family in Kerala.',
    who: 'your Amma',
    answer: 'Gute Nacht',
    period: 'night',
    culturalNote: '"Gute Nacht" to end a late night call is perfect. Your Amma would be proud you\'re learning German properly!',
  },
];

const GREETINGS = ['Guten Morgen', 'Guten Tag', 'Guten Abend', 'Gute Nacht'];

// Manglish reactions per period
const CORRECT_REACTIONS: Record<string, string[]> = {
  morning: [
    "Guten Morgen! Adipoli start to the day!",
    "Correct! Early bird machaa!",
    "Seri! Germans love a proper morning greeting!",
  ],
  afternoon: [
    "Guten Tag! Germans love a proper greeting, machaa!",
    "Adipoli! That's how you do it!",
    "Correct! Guten Tag is the safest bet!",
  ],
  evening: [
    "Guten Abend! Kerala-il 'santhya namaskaram' pole!",
    "Perfect evening greeting, machaa!",
    "Adipoli! Herr Professor would approve!",
  ],
  night: [
    "Gute Nacht! Sleep well, machaa!",
    "Seri! Time for sweet dreams in German!",
    "Nailed it! Gute Nacht and good night!",
  ],
};
const WRONG_REACTIONS = [
  "Aiyyo! That's not the right greeting for this time!",
  "Not quite machaa! Check the time again!",
  "Hmm, try thinking about what time it is!",
  "Paravaala! You'll get the next one!",
];

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Time-of-day emoji
const PERIOD_EMOJI: Record<string, string> = {
  morning: '☀️',
  afternoon: '🌤️',
  evening: '🌅',
  night: '🌙',
};

// Background gradients per period
const PERIOD_GRADIENTS: Record<string, string> = {
  morning: 'linear-gradient(135deg, rgba(255, 165, 0, 0.15), rgba(255, 223, 61, 0.1))',
  afternoon: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(0, 217, 165, 0.08))',
  evening: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(255, 107, 157, 0.1))',
  night: 'linear-gradient(135deg, rgba(67, 56, 202, 0.2), rgba(30, 27, 75, 0.15))',
};

// Border accents per period
const PERIOD_BORDER: Record<string, string> = {
  morning: 'rgba(255, 165, 0, 0.3)',
  afternoon: 'rgba(59, 130, 246, 0.3)',
  evening: 'rgba(168, 85, 247, 0.3)',
  night: 'rgba(99, 102, 241, 0.3)',
};

export default function GreetingTimeGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'cultural-note' | 'complete'>('ready');
  const [scenarios, setScenarios] = useState<GreetingScenario[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [reactionText, setReactionText] = useState('');
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [showConfetti, setShowConfetti] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);

  // Shuffle scenarios
  const initGame = useCallback(() => {
    const shuffled = [...SCENARIOS].sort(() => Math.random() - 0.5);
    setScenarios(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setLastCorrect(false);
    setReactionText('');
    setKuttanMood('excited');
    setShowConfetti(false);
    setConsecutiveCorrect(0);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const startGame = () => {
    setGameState('playing');
    setKuttanMood('happy');
  };

  const endGame = () => {
    setGameState('complete');
    incrementGamesPlayed();
    addXP(score * 5 + 10);

    if (score === scenarios.length) {
      setKuttanMood('celebrating');
      setShowConfetti(true);
    } else if (score >= 6) {
      setKuttanMood('happy');
    } else {
      setKuttanMood('sad');
    }
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const currentScenario = scenarios[currentQuestion];
    const correct = answer === currentScenario.answer;
    setLastCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
      setConsecutiveCorrect(prev => prev + 1);
      setKuttanMood('happy');
      setReactionText(pickRandom(CORRECT_REACTIONS[currentScenario.period]));
    } else {
      setConsecutiveCorrect(0);
      setKuttanMood('sad');
      setReactionText(pickRandom(WRONG_REACTIONS));
    }

    // After showing result, transition to cultural note
    setTimeout(() => {
      setGameState('cultural-note');
    }, 1200);
  };

  const advanceFromNote = () => {
    if (currentQuestion < scenarios.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setReactionText('');
      setKuttanMood('thinking');
      setGameState('playing');
    } else {
      endGame();
    }
  };

  const currentScenario = scenarios[currentQuestion];
  const getStars = () => {
    if (score >= 8) return 3;
    if (score >= 6) return 2;
    if (score >= 4) return 1;
    return 0;
  };

  // Dynamic Kuttan mood during gameplay based on performance
  const getPlayingMood = (): KuttanMood => {
    if (consecutiveCorrect >= 4) return 'excited';
    if (consecutiveCorrect >= 2) return 'happy';
    return 'thinking';
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto relative">
      <Confetti isActive={showConfetti} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        {(gameState === 'playing' || gameState === 'cultural-note') && (
          <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/50">
            <span className="font-bold" style={{ color: 'var(--primary)' }}>{score}</span>
            <span>/</span>
            <span>{currentQuestion + (showResult ? 1 : 0)}</span>
            <span className="mx-2 text-[var(--foreground)]/20">|</span>
            <span>{currentQuestion + 1}/{scenarios.length}</span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ==================== READY SCREEN ==================== */}
        {gameState === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <CharacterGuide
              messages="Kuttan just arrived in Germany! He needs to greet people correctly at different times of day. Help him out, machaa!"
              mood="excited"
              size="lg"
              showAppu
              appuMood="happy"
              className="mb-6"
            />

            <div className="glass-card p-6 w-full">
              <h1 className="text-2xl font-bold text-center mb-4 gradient-text">
                Greeting Time
              </h1>

              {/* Quick Guide */}
              <div
                className="rounded-xl p-4 mb-5"
                style={{ background: 'rgba(245, 240, 232, 0.05)', border: '1px solid rgba(245, 240, 232, 0.1)' }}
              >
                <h3 className="font-semibold text-[var(--foreground)] mb-3 text-sm">Quick Guide:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">☀️</span>
                    <span className="text-[var(--foreground)]/80">
                      <strong className="text-[var(--foreground)]">Guten Morgen</strong> — Morning (until ~11 AM)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🌤️</span>
                    <span className="text-[var(--foreground)]/80">
                      <strong className="text-[var(--foreground)]">Guten Tag</strong> — Day (11 AM - 6 PM)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🌅</span>
                    <span className="text-[var(--foreground)]/80">
                      <strong className="text-[var(--foreground)]">Guten Abend</strong> — Evening (6 PM - 9 PM)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🌙</span>
                    <span className="text-[var(--foreground)]/80">
                      <strong className="text-[var(--foreground)]">Gute Nacht</strong> — Night (going to sleep)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-5 text-sm text-[var(--foreground)]/50">
                <span>8 scenarios</span>
                <span>Up to 50 XP</span>
              </div>

              <button onClick={startGame} className="game-button text-lg w-full py-4">
                Start Greeting!
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== PLAYING SCREEN ==================== */}
        {gameState === 'playing' && currentScenario && (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Progress dots */}
            <div className="flex gap-1.5 justify-center mb-4">
              {scenarios.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === currentQuestion ? '24px' : '8px',
                    background: i < currentQuestion
                      ? 'var(--success)'
                      : i === currentQuestion
                      ? 'var(--primary)'
                      : 'rgba(245, 240, 232, 0.15)',
                  }}
                />
              ))}
            </div>

            {/* Scene Card - time-based gradient */}
            <motion.div
              className="rounded-2xl p-6 mb-4"
              style={{
                background: PERIOD_GRADIENTS[currentScenario.period],
                border: `1px solid ${PERIOD_BORDER[currentScenario.period]}`,
                backdropFilter: 'blur(8px)',
              }}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              {/* Time display */}
              <div className="text-center mb-4">
                <motion.span
                  className="text-4xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {PERIOD_EMOJI[currentScenario.period]}
                </motion.span>
                <h2 className="text-3xl font-bold text-[var(--foreground)] mt-2">
                  {currentScenario.time}
                </h2>
              </div>

              {/* Scene description */}
              <p className="text-center text-[var(--foreground)]/80 text-sm mb-2">
                {currentScenario.scene}
              </p>
              <p className="text-center text-[var(--foreground)]/60 text-xs">
                You need to greet <strong className="text-[var(--foreground)]/90">{currentScenario.who}</strong>
              </p>
            </motion.div>

            {/* Reaction feedback */}
            <AnimatePresence>
              {reactionText && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl"
                  style={{
                    background: lastCorrect
                      ? 'rgba(0, 217, 165, 0.12)'
                      : 'rgba(192, 57, 43, 0.12)',
                    border: lastCorrect
                      ? '1px solid rgba(0, 217, 165, 0.3)'
                      : '1px solid rgba(192, 57, 43, 0.3)',
                  }}
                >
                  <span className="text-lg">{lastCorrect ? '✅' : '😬'}</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: lastCorrect ? 'var(--success)' : 'var(--danger)' }}
                  >
                    {reactionText}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Greeting Options - 2x2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {GREETINGS.map((greeting, index) => {
                const isSelected = selectedAnswer === greeting;
                const greetingIsCorrect = greeting === currentScenario.answer;
                const showCorrectGlow = showResult && greetingIsCorrect;
                const showWrongShake = showResult && isSelected && !greetingIsCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(greeting)}
                    disabled={showResult}
                    whileTap={{ scale: showResult ? 1 : 0.95 }}
                    animate={showWrongShake ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={showWrongShake ? { duration: 0.3 } : undefined}
                    className="p-4 rounded-xl text-center font-medium transition-all"
                    style={{
                      background: showCorrectGlow
                        ? 'rgba(0, 217, 165, 0.2)'
                        : showWrongShake
                        ? 'rgba(192, 57, 43, 0.2)'
                        : 'var(--card-bg)',
                      border: showCorrectGlow
                        ? '2px solid rgba(0, 217, 165, 0.6)'
                        : showWrongShake
                        ? '2px solid rgba(192, 57, 43, 0.6)'
                        : '2px solid var(--card-border)',
                      color: showCorrectGlow
                        ? 'var(--success)'
                        : showWrongShake
                        ? 'var(--danger)'
                        : 'var(--foreground)',
                      boxShadow: showCorrectGlow
                        ? '0 0 15px rgba(0, 217, 165, 0.2)'
                        : 'none',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {greeting}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ==================== CULTURAL NOTE SCREEN ==================== */}
        {gameState === 'cultural-note' && currentScenario && (
          <motion.div
            key={`note-${currentQuestion}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <CharacterGuide
              messages={currentScenario.culturalNote}
              mood={lastCorrect ? 'happy' : 'thinking'}
              size="sm"
              className="mb-4"
            />

            <div
              className="glass-card p-5 w-full mb-4"
              style={{
                background: PERIOD_GRADIENTS[currentScenario.period],
                border: `1px solid ${PERIOD_BORDER[currentScenario.period]}`,
              }}
            >
              <div className="text-center">
                <p className="text-xs text-[var(--foreground)]/50 mb-1">The correct greeting was:</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                  {currentScenario.answer}
                </p>
                <p className="text-sm text-[var(--foreground)]/60 mt-1">
                  {PERIOD_EMOJI[currentScenario.period]} {currentScenario.time} — {currentScenario.who}
                </p>
              </div>
            </div>

            <button
              onClick={advanceFromNote}
              className="game-button text-base w-full py-3"
            >
              {currentQuestion < scenarios.length - 1 ? 'Next Scenario' : 'See Results'}
            </button>
          </motion.div>
        )}

        {/* ==================== COMPLETE SCREEN ==================== */}
        {gameState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <CharacterGuide
              messages={
                score === 8
                  ? "PERFECT! Machaa, you greeted everyone like a true German! Kuttan is so proud!"
                  : score >= 6
                  ? "Great job machaa! Kuttan can greet almost everyone properly now!"
                  : score >= 4
                  ? "Not bad! Kuttan needs a bit more practice with greetings."
                  : "Aiyyo! Kuttan kept confusing the greetings. Let's try again, machaa!"
              }
              mood={kuttanMood}
              size="md"
              showAppu={score === 8}
              appuMood={score === 8 ? 'celebrating' : 'idle'}
              className="mb-4"
            />

            <div className="glass-card p-6 w-full text-center">
              <h1
                className="text-2xl font-bold mb-2"
                style={{
                  color: score >= 6 ? 'var(--success)' : score >= 4 ? 'var(--primary)' : 'var(--foreground)',
                }}
              >
                {score === 8 ? 'Perfect Greetings!' : score >= 6 ? 'Great Job!' : score >= 4 ? 'Good Try!' : 'Keep Practicing!'}
              </h1>

              {/* Stars */}
              <div className="flex justify-center mb-4">
                <Stars rating={getStars()} size="lg" animated />
              </div>

              <p className="text-[var(--foreground)]/70 mb-6">
                You got {score} out of {scenarios.length} correct!
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                    {score}/{scenarios.length}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">Correct</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                    +{score * 5 + 10}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">XP Earned</div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    initGame();
                    setGameState('ready');
                  }}
                  className="game-button text-base w-full py-3 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Play Again
                </button>
                <button
                  onClick={() => router.push('/games')}
                  className="w-full py-3 rounded-xl text-base font-medium text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                  style={{ background: 'rgba(245, 240, 232, 0.05)' }}
                >
                  Back to Games
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
