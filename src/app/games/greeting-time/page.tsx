'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, Send } from 'lucide-react';
import { CharacterGuide } from '@/components/character';
import { Confetti, Stars } from '@/components/game';
import { useGameStore } from '@/lib/store';
import type { KuttanMood } from '@/components/character';
import { GameStoryWrapper, GAME_STORIES } from '@/components/game/GameStoryWrapper';

// --- Types ---
type GreetingPeriod = 'morning' | 'afternoon' | 'evening' | 'night';
type Difficulty = 'basic' | 'farewell' | 'formal';

interface GreetingScenario {
  time: string;
  scene: string;
  who: string;
  answers: string[];          // all acceptable greetings (first is the "best" one shown)
  period: GreetingPeriod;
  culturalNote: string;
  difficulty: Difficulty;
  hint?: string;              // shown below the input for harder rounds
}

// --- Scenario pool ---
const ALL_SCENARIOS: GreetingScenario[] = [
  // ===== BASIC (Rounds 1-5): Morgen / Tag / Abend / Nacht =====
  {
    time: '7:30',
    scene: 'You wake up and call your German friend.',
    who: 'your friend Lisa',
    answers: ['Guten Morgen'],
    period: 'morning',
    difficulty: 'basic',
    culturalNote:
      'Germans typically greet friends with "Guten Morgen" until about 11 AM. Close friends might just say "Morgen!"',
  },
  {
    time: '9:00',
    scene: 'You arrive at the office. Your boss is at reception.',
    who: 'Herr Mueller (boss)',
    answers: ['Guten Morgen'],
    period: 'morning',
    difficulty: 'basic',
    culturalNote:
      'In Germany, you greet your boss with "Guten Morgen, Herr Mueller!" \u2014 formal and polite! Always use the last name unless invited to use first names.',
  },
  {
    time: '12:30',
    scene: 'You enter a restaurant for lunch.',
    who: 'the waiter',
    answers: ['Guten Tag'],
    period: 'afternoon',
    difficulty: 'basic',
    culturalNote:
      '"Guten Tag" is the universal safe greeting from late morning onwards. In restaurants, some people just say "Tag!" informally.',
  },
  {
    time: '18:30',
    scene: 'You arrive at a dinner party.',
    who: 'your host couple',
    answers: ['Guten Abend'],
    period: 'evening',
    difficulty: 'basic',
    culturalNote:
      '"Guten Abend" starts around 6 PM. At dinner parties, you greet each person individually \u2014 very different from a group "hello"!',
  },
  {
    time: '23:45',
    scene: 'You finish a video call with your family in Kerala.',
    who: 'your Amma',
    answers: ['Gute Nacht'],
    period: 'night',
    difficulty: 'basic',
    culturalNote:
      '"Gute Nacht" to end a late night call is perfect. Your Amma would be proud you\'re learning German properly!',
  },

  // ===== FAREWELL (Rounds 6-10): Tsch\u00fcss / Auf Wiedersehen / Bis morgen / Bis bald =====
  {
    time: '17:00',
    scene: 'You leave the office for the day. Your colleagues wave.',
    who: 'your colleagues',
    answers: ['Tsch\u00fcss', 'Tschuss'],
    period: 'afternoon',
    difficulty: 'farewell',
    hint: 'Informal goodbye \u2014 among colleagues you see daily',
    culturalNote:
      '"Tsch\u00fcss" is the everyday informal goodbye. Think of it as the German "bye!" \u2014 Kerala-il "poyitt varaam" enna parayan pole.',
  },
  {
    time: '16:00',
    scene: 'You leave the doctor\u2019s office after your appointment.',
    who: 'Dr. Braun and the receptionist',
    answers: ['Auf Wiedersehen'],
    period: 'afternoon',
    difficulty: 'farewell',
    hint: 'Formal goodbye \u2014 professional setting',
    culturalNote:
      '"Auf Wiedersehen" literally means "until we see each other again." Use it with doctors, officials, and strangers you\'re being polite to.',
  },
  {
    time: '15:00',
    scene: 'You meet a neighbor on the street and chat briefly.',
    who: 'Frau Schmidt',
    answers: ['Auf Wiedersehen', 'Tsch\u00fcss', 'Tschuss'],
    period: 'afternoon',
    difficulty: 'farewell',
    hint: 'Saying goodbye to a neighbor \u2014 polite or casual both work',
    culturalNote:
      'With neighbors, either "Auf Wiedersehen" (polite) or "Tsch\u00fcss" (friendly) works. Depends on how well you know them!',
  },
  {
    time: '22:00',
    scene: 'You\u2019re leaving a study group. You\u2019ll see everyone tomorrow.',
    who: 'fellow students',
    answers: ['Bis morgen'],
    period: 'night',
    difficulty: 'farewell',
    hint: 'You\u2019ll see them tomorrow!',
    culturalNote:
      '"Bis morgen" = "See you tomorrow." Germans love being specific. If you\u2019ll meet later today, it\u2019s "Bis sp\u00e4ter!"',
  },
  {
    time: '14:00',
    scene: 'A friend is leaving after coffee. You\u2019re not sure when you\u2019ll meet next.',
    who: 'your friend Max',
    answers: ['Bis bald', 'Tsch\u00fcss', 'Tschuss'],
    period: 'afternoon',
    difficulty: 'farewell',
    hint: 'Casual goodbye \u2014 you\u2019ll see them again sometime soon',
    culturalNote:
      '"Bis bald" = "See you soon!" \u2014 a warm, casual farewell when you don\u2019t have a specific date. Like "pinne kaanam" in Malayalam!',
  },

  // ===== FORMAL VS INFORMAL (Rounds 11-16): Sie vs du situations =====
  {
    time: '10:00',
    scene: 'You walk into your German class on the first day.',
    who: 'Professor Weber',
    answers: ['Guten Morgen'],
    period: 'morning',
    difficulty: 'formal',
    hint: 'First meeting with a professor \u2014 keep it formal and time-appropriate',
    culturalNote:
      'With professors, always start formal: "Guten Morgen, Herr/Frau Professor!" Some profs will later say "Sie k\u00f6nnen mich duzen" \u2014 meaning you can switch to informal. Until then, stay formal!',
  },
  {
    time: '20:00',
    scene: 'You enter a small shop in the evening to buy groceries.',
    who: 'the shopkeeper',
    answers: ['Guten Abend'],
    period: 'evening',
    difficulty: 'formal',
    hint: 'Entering a shop \u2014 greet the shopkeeper appropriately for the time',
    culturalNote:
      'In Germany, you greet shopkeepers when entering! "Guten Abend" in the evening, "Guten Tag" during the day. Not doing it is considered rude \u2014 very different from Kerala shops!',
  },
  {
    time: '11:00',
    scene: 'Your phone rings. It\u2019s an unknown number \u2014 turns out to be your landlord.',
    who: 'Herr Fischer (landlord)',
    answers: ['Guten Tag', 'Hallo'],
    period: 'afternoon',
    difficulty: 'formal',
    hint: 'Phone call \u2014 you pick up not knowing who\u2019s calling',
    culturalNote:
      'Germans often answer the phone by stating their last name: "Fischer, guten Tag!" For unknown numbers, "Hallo?" or "Guten Tag" both work. Never answer with just "Hello?" like in English \u2014 it sounds rude!',
  },
  {
    time: '23:00',
    scene: 'You send a late-night text to your German classmate about tomorrow\u2019s exam.',
    who: 'your classmate Anna',
    answers: ['Hallo', 'Hey'],
    period: 'night',
    difficulty: 'formal',
    hint: 'Text message to a friend at night \u2014 casual!',
    culturalNote:
      'In text messages, time-based greetings are rarely used. "Hallo" or "Hey" works any time. You don\u2019t text "Gute Nacht" as an opening \u2014 that\u2019s only for saying goodbye!',
  },
  {
    time: '14:30',
    scene: 'Someone knocks on your office door. You call them in.',
    who: 'a colleague you don\u2019t know well',
    answers: ['Hallo', 'Guten Tag'],
    period: 'afternoon',
    difficulty: 'formal',
    hint: 'Someone enters your office \u2014 polite but not overly formal',
    culturalNote:
      'When someone enters your office, a friendly "Hallo!" or "Guten Tag!" works great. Germans always knock and wait \u2014 barging in is a big no-no. Sherikkum door-il knock cheyyanam!',
  },
  {
    time: '17:30',
    scene: 'Your project is done. Time to say goodbye to your boss for the weekend.',
    who: 'Frau Hoffmann (boss)',
    answers: ['Auf Wiedersehen', 'Sch\u00f6nes Wochenende', 'Schones Wochenende'],
    period: 'evening',
    difficulty: 'formal',
    hint: 'Friday evening \u2014 saying goodbye to your boss for the weekend',
    culturalNote:
      '"Auf Wiedersehen" is always safe with your boss. But on Fridays, Germans love to add "Sch\u00f6nes Wochenende!" (Have a nice weekend!) \u2014 it shows you\'re learning the culture, not just the words!',
  },
];

// Build ordered scenario list: 5 basic, 5 farewell, 6 formal
function buildScenarioList(): GreetingScenario[] {
  const basic = ALL_SCENARIOS.filter((s) => s.difficulty === 'basic');
  const farewell = ALL_SCENARIOS.filter((s) => s.difficulty === 'farewell');
  const formal = ALL_SCENARIOS.filter((s) => s.difficulty === 'formal');

  // Shuffle within each tier
  const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  return [...shuffle(basic), ...shuffle(farewell), ...shuffle(formal)];
}

// --- Matching logic ---
function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[!?.,:;'"]/g, '')  // strip punctuation
    .replace(/\u00fc/g, 'ue')    // u-umlaut
    .replace(/\u00f6/g, 'oe')    // o-umlaut
    .replace(/\u00e4/g, 'ae')    // a-umlaut
    .replace(/\u00df/g, 'ss')    // eszett
    .replace(/\s+/g, ' ');
}

function isCorrect(input: string, scenario: GreetingScenario): boolean {
  const normInput = normalize(input);
  return scenario.answers.some((a) => normalize(a) === normInput);
}

// --- Reactions (Manglish) ---
const CORRECT_REACTIONS: Record<string, string[]> = {
  basic: [
    'Adipoli! Correct greeting, machaa!',
    'Seri! That\u2019s exactly right!',
    'Perfect! You sound like a true German already!',
    'Nailed it! Kuttan is impressed!',
  ],
  farewell: [
    'Adipoli! You know how to say goodbye like a German!',
    'Correct! Farewell game strong, machaa!',
    'Seri! That\u2019s the right way to leave!',
    'Perfect goodbye! Germans would approve!',
  ],
  formal: [
    'Adipoli! Perfect situational awareness, machaa!',
    'You read the room perfectly! Respect!',
    'Seri! That\u2019s exactly what a German would say!',
    'Machaa, your Sprachgef\u00fchl is on point!',
  ],
};

const WRONG_REACTIONS = [
  'Aiyyo! Not quite \u2014 look at the situation again!',
  'Not this one, machaa! Think about who you\u2019re talking to.',
  'Hmm, read the scenario one more time!',
  'Paravaala! Mistakes = learning!',
  'Almost there machaa, try to picture yourself in the scene!',
];

const CLOSE_REACTIONS = [
  'So close! You had the right idea, just a small spelling thing.',
  'Almost machaa! Check the spelling once more.',
  'Aiyyo, tiny typo! But your instinct was right!',
];

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Check if the answer is "close" (within edit distance 2 of any correct answer)
function isCloseAnswer(input: string, scenario: GreetingScenario): boolean {
  const normInput = normalize(input);
  return scenario.answers.some((a) => {
    const normA = normalize(a);
    if (normInput === normA) return false; // exact match isn't "close"
    if (Math.abs(normInput.length - normA.length) > 2) return false;
    // Simple check: starts the same or very similar
    const minLen = Math.min(normInput.length, normA.length);
    let diffs = 0;
    for (let i = 0; i < minLen; i++) {
      if (normInput[i] !== normA[i]) diffs++;
    }
    diffs += Math.abs(normInput.length - normA.length);
    return diffs <= 2;
  });
}

// --- Visual constants ---
const PERIOD_EMOJI: Record<string, string> = {
  morning: '\u2600\ufe0f',
  afternoon: '\ud83c\udf24\ufe0f',
  evening: '\ud83c\udf05',
  night: '\ud83c\udf19',
};

const PERIOD_GRADIENTS: Record<string, string> = {
  morning: 'linear-gradient(135deg, rgba(255, 165, 0, 0.15), rgba(255, 223, 61, 0.1))',
  afternoon: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(0, 217, 165, 0.08))',
  evening: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(255, 107, 157, 0.1))',
  night: 'linear-gradient(135deg, rgba(67, 56, 202, 0.2), rgba(30, 27, 75, 0.15))',
};

const PERIOD_BORDER: Record<string, string> = {
  morning: 'rgba(255, 165, 0, 0.3)',
  afternoon: 'rgba(59, 130, 246, 0.3)',
  evening: 'rgba(168, 85, 247, 0.3)',
  night: 'rgba(99, 102, 241, 0.3)',
};

const DIFFICULTY_LABELS: Record<Difficulty, { label: string; color: string }> = {
  basic: { label: 'Basic Greetings', color: 'var(--success)' },
  farewell: { label: 'Farewells', color: 'var(--primary)' },
  formal: { label: 'Formal vs Informal', color: '#ffd93d' },
};

// --- Component ---
export default function GreetingTimeGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'feedback' | 'complete'>('ready');
  const [scenarios, setScenarios] = useState<GreetingScenario[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [lastClose, setLastClose] = useState(false);
  const [reactionText, setReactionText] = useState('');
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [showConfetti, setShowConfetti] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [lastDifficultyAnnounced, setLastDifficultyAnnounced] = useState<Difficulty | null>(null);

  const TOTAL = ALL_SCENARIOS.length; // 16

  const initGame = useCallback(() => {
    setScenarios(buildScenarioList());
    setCurrentQuestion(0);
    setScore(0);
    setTypedAnswer('');
    setSubmitted(false);
    setLastCorrect(false);
    setLastClose(false);
    setReactionText('');
    setKuttanMood('excited');
    setShowConfetti(false);
    setConsecutiveCorrect(0);
    setLastDifficultyAnnounced(null);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Focus input when entering playing state
  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      // Small delay so animation finishes
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [gameState, currentQuestion]);

  const startGame = () => {
    setGameState('playing');
    setKuttanMood('happy');
  };

  const endGame = (finalScore: number) => {
    setGameState('complete');
    incrementGamesPlayed();
    addXP(finalScore * 5 + 10);

    if (finalScore === TOTAL) {
      setKuttanMood('celebrating');
      setShowConfetti(true);
    } else if (finalScore >= 12) {
      setKuttanMood('happy');
    } else {
      setKuttanMood('sad');
    }
  };

  const handleSubmit = () => {
    if (submitted || !typedAnswer.trim()) return;

    setSubmitted(true);
    const scenario = scenarios[currentQuestion];
    const correct = isCorrect(typedAnswer, scenario);
    const close = !correct && isCloseAnswer(typedAnswer, scenario);

    setLastCorrect(correct);
    setLastClose(close);

    if (correct) {
      setScore((prev) => prev + 1);
      setConsecutiveCorrect((prev) => prev + 1);
      setKuttanMood('happy');
      setReactionText(pickRandom(CORRECT_REACTIONS[scenario.difficulty]));
    } else if (close) {
      setConsecutiveCorrect(0);
      setKuttanMood('thinking');
      setReactionText(pickRandom(CLOSE_REACTIONS));
    } else {
      setConsecutiveCorrect(0);
      setKuttanMood('sad');
      setReactionText(pickRandom(WRONG_REACTIONS));
    }
  };

  const advanceFromFeedback = () => {
    if (currentQuestion < scenarios.length - 1) {
      const nextQ = currentQuestion + 1;
      setCurrentQuestion(nextQ);
      setTypedAnswer('');
      setSubmitted(false);
      setLastCorrect(false);
      setLastClose(false);
      setReactionText('');
      setKuttanMood('thinking');
      setGameState('playing');
    } else {
      endGame(score);
    }
  };

  const goToFeedback = () => {
    setGameState('feedback');
  };

  const currentScenario = scenarios[currentQuestion];

  // Determine if we need to show a difficulty tier announcement
  const shouldAnnounceTier =
    currentScenario &&
    currentScenario.difficulty !== lastDifficultyAnnounced &&
    gameState === 'playing';

  // Mark tier as announced on render
  useEffect(() => {
    if (shouldAnnounceTier && currentScenario) {
      setLastDifficultyAnnounced(currentScenario.difficulty);
    }
  }, [shouldAnnounceTier, currentScenario]);

  const getStars = () => {
    if (score >= 14) return 3;
    if (score >= 10) return 2;
    if (score >= 6) return 1;
    return 0;
  };

  return (
    <GameStoryWrapper story={GAME_STORIES['greeting-time']}>
    <div className="px-4 py-6 max-w-4xl mx-auto relative">
      <Confetti isActive={showConfetti} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/games')}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        {(gameState === 'playing' || gameState === 'feedback') && (
          <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/50">
            <span className="font-bold" style={{ color: 'var(--primary)' }}>
              {score}
            </span>
            <span>/</span>
            <span>{currentQuestion + (submitted ? 1 : 0)}</span>
            <span className="mx-2 text-[var(--foreground)]/20">|</span>
            <span>
              {currentQuestion + 1}/{scenarios.length}
            </span>
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
              messages="Germany-il Kuttan vannu, machaa! Guten Morgen? Tsch\u00fcss? Type the right greeting — you've got this!"
              mood="excited"
              size="lg"
              showAppu
              appuMood="happy"
              className="mb-6"
            />

            <div className="glass-card p-6 w-full">
              <h1 className="text-2xl font-bold text-center mb-4 gradient-text">Greeting Time</h1>

              {/* Quick Guide */}
              <div
                className="rounded-xl p-4 mb-4"
                style={{
                  background: 'rgba(245, 240, 232, 0.05)',
                  border: '1px solid rgba(245, 240, 232, 0.1)',
                }}
              >
                <h3 className="font-semibold text-[var(--foreground)] mb-3 text-sm">
                  Greetings you&apos;ll need:
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{'\u2600\ufe0f'}</span>
                    <span className="text-[var(--foreground)]/80">
                      <strong className="text-[var(--foreground)]">Guten Morgen</strong> — Morning
                      (until ~11 AM)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{'\ud83c\udf24\ufe0f'}</span>
                    <span className="text-[var(--foreground)]/80">
                      <strong className="text-[var(--foreground)]">Guten Tag</strong> — Day (11 AM
                      - 6 PM)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{'\ud83c\udf05'}</span>
                    <span className="text-[var(--foreground)]/80">
                      <strong className="text-[var(--foreground)]">Guten Abend</strong> — Evening
                      (6 PM onwards)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{'\ud83c\udf19'}</span>
                    <span className="text-[var(--foreground)]/80">
                      <strong className="text-[var(--foreground)]">Gute Nacht</strong> — Goodnight
                      (going to sleep)
                    </span>
                  </div>
                  <div
                    className="border-t pt-2 mt-2"
                    style={{ borderColor: 'rgba(245, 240, 232, 0.1)' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{'\ud83d\udc4b'}</span>
                      <span className="text-[var(--foreground)]/80">
                        <strong className="text-[var(--foreground)]">Tsch\u00fcss</strong> — Bye
                        (casual) &nbsp;|&nbsp;{' '}
                        <strong className="text-[var(--foreground)]">Auf Wiedersehen</strong> — Goodbye (formal)
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-lg">{'\ud83d\udcac'}</span>
                      <span className="text-[var(--foreground)]/80">
                        <strong className="text-[var(--foreground)]">Bis morgen</strong> — See you
                        tomorrow &nbsp;|&nbsp;{' '}
                        <strong className="text-[var(--foreground)]">Bis bald</strong> — See you soon
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Difficulty tiers info */}
              <div
                className="rounded-xl p-4 mb-5"
                style={{
                  background: 'rgba(245, 240, 232, 0.03)',
                  border: '1px solid rgba(245, 240, 232, 0.08)',
                }}
              >
                <h3 className="font-semibold text-[var(--foreground)] mb-2 text-sm">
                  3 levels of difficulty:
                </h3>
                <div className="space-y-1.5 text-xs text-[var(--foreground)]/60">
                  <p>
                    <span style={{ color: 'var(--success)' }}>Rounds 1-5</span> — Basic
                    time-of-day greetings
                  </p>
                  <p>
                    <span style={{ color: 'var(--primary)' }}>Rounds 6-10</span> — Farewells:
                    Tsch\u00fcss, Auf Wiedersehen, Bis morgen...
                  </p>
                  <p>
                    <span style={{ color: '#ffd93d' }}>Rounds 11-16</span> — Formal vs informal
                    situations
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-5 text-sm text-[var(--foreground)]/50">
                <span>16 scenarios</span>
                <span>Type your answers</span>
                <span>Up to 90 XP</span>
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
            {/* Progress bar */}
            <div className="flex gap-1 justify-center mb-4">
              {scenarios.map((s, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === currentQuestion ? '20px' : '6px',
                    background:
                      i < currentQuestion
                        ? 'var(--success)'
                        : i === currentQuestion
                        ? DIFFICULTY_LABELS[s.difficulty].color
                        : 'rgba(245, 240, 232, 0.15)',
                  }}
                />
              ))}
            </div>

            {/* Difficulty tier badge (shows when entering a new tier) */}
            {shouldAnnounceTier && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-3"
              >
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    color: DIFFICULTY_LABELS[currentScenario.difficulty].color,
                    background: `${DIFFICULTY_LABELS[currentScenario.difficulty].color}15`,
                    border: `1px solid ${DIFFICULTY_LABELS[currentScenario.difficulty].color}40`,
                  }}
                >
                  {currentScenario.difficulty === 'basic' && 'Level 1: '}
                  {currentScenario.difficulty === 'farewell' && 'Level 2: '}
                  {currentScenario.difficulty === 'formal' && 'Level 3: '}
                  {DIFFICULTY_LABELS[currentScenario.difficulty].label}
                </span>
              </motion.div>
            )}

            {/* Scene Card */}
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
                You need to greet{' '}
                <strong className="text-[var(--foreground)]/90">{currentScenario.who}</strong>
              </p>
            </motion.div>

            {/* Hint for farewell/formal rounds */}
            {currentScenario.hint && (
              <div
                className="text-center text-xs mb-3 px-3 py-2 rounded-lg"
                style={{
                  background: 'rgba(255, 217, 61, 0.08)',
                  border: '1px solid rgba(255, 217, 61, 0.2)',
                  color: '#ffd93d',
                }}
              >
                {'\ud83d\udca1'} {currentScenario.hint}
              </div>
            )}

            {/* Reaction feedback (after submit) */}
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
                      : lastClose
                      ? 'rgba(255, 217, 61, 0.12)'
                      : 'rgba(192, 57, 43, 0.12)',
                    border: lastCorrect
                      ? '1px solid rgba(0, 217, 165, 0.3)'
                      : lastClose
                      ? '1px solid rgba(255, 217, 61, 0.3)'
                      : '1px solid rgba(192, 57, 43, 0.3)',
                  }}
                >
                  <span className="text-lg">
                    {lastCorrect ? '\u2705' : lastClose ? '\ud83e\udd14' : '\ud83d\ude2c'}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: lastCorrect
                        ? 'var(--success)'
                        : lastClose
                        ? '#ffd93d'
                        : 'var(--danger)',
                    }}
                  >
                    {reactionText}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Show correct answer after wrong submission */}
            {submitted && !lastCorrect && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-3 px-3 py-2 rounded-lg"
                style={{
                  background: 'rgba(0, 217, 165, 0.08)',
                  border: '1px solid rgba(0, 217, 165, 0.2)',
                }}
              >
                <span className="text-xs text-[var(--foreground)]/50">Correct answer: </span>
                <span className="text-sm font-bold" style={{ color: 'var(--success)' }}>
                  {currentScenario.answers[0]}
                </span>
              </motion.div>
            )}

            {/* Input area */}
            <div className="relative mb-3">
              <input
                ref={inputRef}
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (!submitted) {
                      handleSubmit();
                    } else {
                      goToFeedback();
                    }
                  }
                }}
                disabled={submitted}
                placeholder="Type your greeting here..."
                className="w-full px-4 py-4 pr-14 rounded-xl text-base font-medium outline-none transition-all"
                style={{
                  background: submitted
                    ? lastCorrect
                      ? 'rgba(0, 217, 165, 0.1)'
                      : 'rgba(192, 57, 43, 0.1)'
                    : 'var(--card-bg)',
                  border: submitted
                    ? lastCorrect
                      ? '2px solid rgba(0, 217, 165, 0.5)'
                      : '2px solid rgba(192, 57, 43, 0.4)'
                    : '2px solid var(--card-border)',
                  color: 'var(--foreground)',
                  backdropFilter: 'blur(8px)',
                }}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />

              {/* Submit button inside input */}
              {!submitted && (
                <button
                  onClick={handleSubmit}
                  disabled={!typedAnswer.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg transition-all"
                  style={{
                    background: typedAnswer.trim()
                      ? 'var(--primary)'
                      : 'rgba(245, 240, 232, 0.1)',
                    color: typedAnswer.trim() ? '#fff' : 'rgba(245, 240, 232, 0.3)',
                  }}
                >
                  <Send className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* After submit: show cultural note button */}
            {submitted && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={goToFeedback}
                className="game-button text-base w-full py-3"
              >
                {lastCorrect ? 'See Cultural Note' : 'Learn More'}
              </motion.button>
            )}

            {/* Umlaut helper (below input) */}
            {!submitted && (
              <div className="flex justify-center gap-2 mt-2">
                {['\u00e4', '\u00f6', '\u00fc', '\u00df'].map((char) => (
                  <button
                    key={char}
                    onClick={() => {
                      setTypedAnswer((prev) => prev + char);
                      inputRef.current?.focus();
                    }}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105"
                    style={{
                      background: 'rgba(245, 240, 232, 0.08)',
                      border: '1px solid rgba(245, 240, 232, 0.15)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {char}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ==================== FEEDBACK / CULTURAL NOTE SCREEN ==================== */}
        {gameState === 'feedback' && currentScenario && (
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
                <p className="text-xs text-[var(--foreground)]/50 mb-1">
                  {lastCorrect ? 'You answered:' : 'The correct greeting was:'}
                </p>
                <p className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                  {currentScenario.answers[0]}
                </p>
                {currentScenario.answers.length > 1 && (
                  <p className="text-xs text-[var(--foreground)]/40 mt-1">
                    Also accepted:{' '}
                    {currentScenario.answers
                      .slice(1)
                      .join(', ')}
                  </p>
                )}
                <p className="text-sm text-[var(--foreground)]/60 mt-2">
                  {PERIOD_EMOJI[currentScenario.period]} {currentScenario.time} &mdash;{' '}
                  {currentScenario.who}
                </p>
              </div>
            </div>

            <button onClick={advanceFromFeedback} className="game-button text-base w-full py-3">
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
                score === TOTAL
                  ? 'PERFECT! Machaa, you greeted everyone like a true German! Kuttan is so proud!'
                  : score >= 12
                  ? 'Great job machaa! Kuttan can handle almost every situation now!'
                  : score >= 8
                  ? 'Not bad! Kuttan needs a bit more practice with some greetings.'
                  : 'Aiyyo! Kuttan kept mixing up greetings. Let\u2019s try again, machaa!'
              }
              mood={kuttanMood}
              size="md"
              showAppu={score === TOTAL}
              appuMood={score === TOTAL ? 'celebrating' : 'idle'}
              className="mb-4"
            />

            <div className="glass-card p-6 w-full text-center">
              <h1
                className="text-2xl font-bold mb-2"
                style={{
                  color:
                    score >= 12
                      ? 'var(--success)'
                      : score >= 8
                      ? 'var(--primary)'
                      : 'var(--foreground)',
                }}
              >
                {score === TOTAL
                  ? 'Perfect Greetings!'
                  : score >= 12
                  ? 'Great Job!'
                  : score >= 8
                  ? 'Good Try!'
                  : 'Keep Practicing!'}
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
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.5, duration: 0.5, times: [0, 0.6, 1] }}
                  className="glass-card p-3 ring-2 ring-[#d4a520]/40"
                >
                  <div className="text-2xl font-bold" style={{ color: '#d4a520' }}>
                    +{score * 5 + 10}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">XP Earned</div>
                </motion.div>
              </div>

              <p className="text-xs text-[var(--foreground)]/50 italic mb-4">
                Share this score with your machans — screenshot it!
              </p>

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
    </GameStoryWrapper>
  );
}
