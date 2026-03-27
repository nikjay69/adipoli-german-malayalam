'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, Clock, Zap, Keyboard } from 'lucide-react';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character';
import { Confetti, Stars } from '@/components/game';
import { useGameStore } from '@/lib/store';

// =============================================================================
// GERMAN NUMBER SYSTEM — full algorithmic generation, no hardcoded list
// =============================================================================

const ONES = ['', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
const TEENS: Record<number, string> = {
  10: 'zehn', 11: 'elf', 12: 'zwölf', 13: 'dreizehn', 14: 'vierzehn',
  15: 'fünfzehn', 16: 'sechzehn', 17: 'siebzehn', 18: 'achtzehn', 19: 'neunzehn',
};
const TENS: Record<number, string> = {
  20: 'zwanzig', 30: 'dreißig', 40: 'vierzig', 50: 'fünfzig',
  60: 'sechzig', 70: 'siebzig', 80: 'achtzig', 90: 'neunzig',
};

function numberToGerman(n: number): string {
  if (n === 0) return 'null';
  if (n >= 1 && n <= 9) return ONES[n];
  if (n >= 10 && n <= 19) return TEENS[n];
  if (n >= 20 && n <= 99) {
    const ones = n % 10;
    const tensBase = n - ones;
    if (ones === 0) return TENS[tensBase];
    // "ein" not "eins" when combined
    const onesWord = ones === 1 ? 'ein' : ONES[ones];
    return `${onesWord}und${TENS[tensBase]}`;
  }
  if (n === 100) return 'hundert';
  if (n >= 101 && n <= 999) {
    const hundreds = Math.floor(n / 100);
    const remainder = n % 100;
    const hundredPart = hundreds === 1 ? 'hundert' : `${ONES[hundreds]}hundert`;
    if (remainder === 0) return hundredPart;
    return `${hundredPart}${numberToGerman(remainder)}`;
  }
  if (n === 1000) return 'tausend';
  return String(n);
}

function priceToGerman(euros: number, cents: number): string {
  const euroPart = numberToGerman(euros);
  if (cents === 0) return `${euroPart} Euro`;
  const centPart = numberToGerman(cents);
  return `${euroPart} Euro ${centPart}`;
}

// Ordinals used in scenarios
function ordinalGerman(n: number): string {
  const irregulars: Record<number, string> = {
    1: 'ersten', 2: 'zweiten', 3: 'dritten', 7: 'siebten', 8: 'achten',
  };
  if (irregulars[n]) return irregulars[n];
  if (n <= 19) return `${numberToGerman(n)}ten`;
  return `${numberToGerman(n)}sten`;
}

// =============================================================================
// SCENARIO TEMPLATES — every question is grounded in a real German situation
// =============================================================================

type AnswerType = 'integer' | 'price' | 'phone-segment';

interface ScenarioTemplate {
  /** Function that generates the scenario text. Gets number(s) as input. */
  generate: () => { scene: string; spoken: string; answer: string; answerType: AnswerType; hint?: string };
  /** Difficulty tier: 1 = easy (1-20), 2 = medium (21-99), 3 = hard (100+, prices, phones) */
  tier: 1 | 2 | 3;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Tier 1: Numbers 1–20, simple situations ---
const TIER_1_SCENARIOS: ScenarioTemplate[] = [
  {
    tier: 1,
    generate: () => {
      const n = randInt(1, 18);
      return {
        scene: '🚉 Train station — looking at departure board',
        spoken: `"Gleis ${numberToGerman(n)}"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Platform ${n}`,
      };
    },
  },
  {
    tier: 1,
    generate: () => {
      const n = randInt(1, 12);
      return {
        scene: '🏢 Apartment building — checking the buzzer',
        spoken: `"${ordinalGerman(n)} Etage"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Floor number`,
      };
    },
  },
  {
    tier: 1,
    generate: () => {
      const n = randInt(1, 6);
      return {
        scene: '💊 At the Apotheke — pharmacist gives instructions',
        spoken: `"Nehmen Sie ${numberToGerman(n)} Tabletten täglich"`,
        answer: String(n),
        answerType: 'integer',
        hint: `How many tablets per day?`,
      };
    },
  },
  {
    tier: 1,
    generate: () => {
      const n = randInt(2, 15);
      return {
        scene: '🚌 Bus stop — checking the route map',
        spoken: `"Linie ${numberToGerman(n)}"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Bus line number`,
      };
    },
  },
  {
    tier: 1,
    generate: () => {
      const n = randInt(1, 20);
      return {
        scene: '📮 Post office — waiting for your token number',
        spoken: `"Nummer ${numberToGerman(n)}, bitte!"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Your queue number`,
      };
    },
  },
  {
    tier: 1,
    generate: () => {
      const n = randInt(6, 20);
      return {
        scene: '🎂 New friend at a party asks your age',
        spoken: `"Ich bin ${numberToGerman(n)} Jahre alt"`,
        answer: String(n),
        answerType: 'integer',
        hint: `How old are they?`,
      };
    },
  },
  {
    tier: 1,
    generate: () => {
      const n = randInt(1, 12);
      return {
        scene: '📅 Making a doctor appointment',
        spoken: `"Am ${numberToGerman(n)}ten dieses Monats"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Which date of the month?`,
      };
    },
  },
];

// --- Tier 2: Numbers 21–99, everyday situations ---
const TIER_2_SCENARIOS: ScenarioTemplate[] = [
  {
    tier: 2,
    generate: () => {
      const n = randInt(21, 99);
      return {
        scene: '🛒 Supermarket checkout — cashier reads the total',
        spoken: `"Das macht ${numberToGerman(n)} Euro"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Total in euros`,
      };
    },
  },
  {
    tier: 2,
    generate: () => {
      const n = randInt(20, 70);
      return {
        scene: '🏠 Apartment hunting — reading the address',
        spoken: `"Wohnung Nummer ${numberToGerman(n)}"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Apartment number`,
      };
    },
  },
  {
    tier: 2,
    generate: () => {
      const n = randInt(18, 65);
      return {
        scene: '🍻 Getting to know someone at a Stammtisch',
        spoken: `"Ich bin ${numberToGerman(n)} Jahre alt"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Their age?`,
      };
    },
  },
  {
    tier: 2,
    generate: () => {
      const n = randInt(21, 59);
      return {
        scene: '⏰ Someone tells you a meeting time',
        spoken: `"Um ${numberToGerman(n)} Minuten nach drei"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Minutes past the hour`,
      };
    },
  },
  {
    tier: 2,
    generate: () => {
      const n = randInt(30, 99);
      return {
        scene: '🏥 Hospital waiting room — your number flashes',
        spoken: `"Nummer ${numberToGerman(n)}, Zimmer drei!"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Your token number`,
      };
    },
  },
  {
    tier: 2,
    generate: () => {
      const street = pickRandom(['Berliner Straße', 'Hauptstraße', 'Bahnhofstraße', 'Goethestraße']);
      const n = randInt(20, 99);
      return {
        scene: '📍 Taxi driver asks for the address',
        spoken: `"${street} ${numberToGerman(n)}"`,
        answer: String(n),
        answerType: 'integer',
        hint: `House number on ${street}`,
      };
    },
  },
  {
    tier: 2,
    generate: () => {
      const n = randInt(20, 80);
      return {
        scene: '🚆 Deutsche Bahn announcement over the speakers',
        spoken: `"Der Zug nach München fährt von Gleis ${numberToGerman(n)} ab"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Platform number for the Munich train`,
      };
    },
  },
];

// --- Tier 3: 100+, prices with cents, phone segments ---
const TIER_3_SCENARIOS: ScenarioTemplate[] = [
  {
    tier: 3,
    generate: () => {
      const n = randInt(100, 999);
      return {
        scene: '🚗 Speed limit sign on the Autobahn',
        spoken: `"Höchstgeschwindigkeit: ${numberToGerman(n)}"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Speed limit in km/h`,
      };
    },
  },
  {
    tier: 3,
    generate: () => {
      const euros = randInt(1, 15);
      const cents = pickRandom([19, 29, 39, 49, 59, 69, 79, 89, 95, 99]);
      return {
        scene: '🛒 Price tag at Aldi / Lidl',
        spoken: `"${priceToGerman(euros, cents)}"`,
        answer: `${euros}.${cents < 10 ? '0' : ''}${cents}`,
        answerType: 'price',
        hint: `Price in euros (e.g. 3.49)`,
      };
    },
  },
  {
    tier: 3,
    generate: () => {
      const euros = randInt(15, 99);
      const cents = pickRandom([0, 50, 90, 95, 99]);
      const priceStr = cents === 0 ? String(euros) : `${euros}.${cents < 10 ? '0' : ''}${cents}`;
      return {
        scene: '🍽️ Restaurant — waiter brings the Rechnung',
        spoken: cents === 0
          ? `"Das macht ${numberToGerman(euros)} Euro"`
          : `"Das macht ${priceToGerman(euros, cents)}"`,
        answer: priceStr,
        answerType: 'price',
        hint: `Bill total`,
      };
    },
  },
  {
    tier: 3,
    generate: () => {
      // German phone numbers: 4-digit segment
      const seg = randInt(1000, 9999);
      const digits = String(seg).split('');
      const spoken = digits.map(d => numberToGerman(Number(d))).join('-');
      return {
        scene: '📱 New colleague gives their phone number',
        spoken: `"Meine Nummer ist ... ${spoken}"`,
        answer: String(seg),
        answerType: 'phone-segment',
        hint: `Type the 4 digits you hear`,
      };
    },
  },
  {
    tier: 3,
    generate: () => {
      const n = randInt(100, 500);
      return {
        scene: '💶 Rent listing on WG-Gesucht',
        spoken: `"Warmmiete: ${numberToGerman(n)} Euro"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Monthly rent in euros`,
      };
    },
  },
  {
    tier: 3,
    generate: () => {
      const n = randInt(100, 350);
      return {
        scene: '✈️ Airport gate announcement',
        spoken: `"Flug nach Istanbul, Gate ${numberToGerman(n)}"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Gate number`,
      };
    },
  },
  {
    tier: 3,
    generate: () => {
      const n = randInt(200, 999);
      return {
        scene: '📦 Package tracking — delivery person reads the code',
        spoken: `"Paketnummer endet auf ${numberToGerman(n)}"`,
        answer: String(n),
        answerType: 'integer',
        hint: `Last digits of the tracking number`,
      };
    },
  },
  {
    tier: 3,
    generate: () => {
      const km = randInt(100, 800);
      return {
        scene: '🚄 ICE train display — distance to destination',
        spoken: `"Noch ${numberToGerman(km)} Kilometer bis Berlin"`,
        answer: String(km),
        answerType: 'integer',
        hint: `Kilometers remaining`,
      };
    },
  },
];

// =============================================================================
// QUESTION GENERATION — dynamic, no repeats, progressive difficulty
// =============================================================================

interface Question {
  scene: string;
  spoken: string;
  answer: string;
  answerType: AnswerType;
  hint?: string;
  tier: 1 | 2 | 3;
}

function generateQuestionSet(): Question[] {
  const questions: Question[] = [];
  const usedAnswers = new Set<string>();

  // Q1-5: Tier 1 (numbers 1-20)
  const t1target = 5;
  let tries = 0;
  while (questions.length < t1target && tries < 40) {
    const template = pickRandom(TIER_1_SCENARIOS);
    const q = template.generate();
    if (!usedAnswers.has(q.answer)) {
      usedAnswers.add(q.answer);
      questions.push({ ...q, tier: template.tier });
    }
    tries++;
  }

  // Q6-10: Tier 2 (numbers 21-99)
  tries = 0;
  while (questions.length < 10 && tries < 40) {
    const template = pickRandom(TIER_2_SCENARIOS);
    const q = template.generate();
    if (!usedAnswers.has(q.answer)) {
      usedAnswers.add(q.answer);
      questions.push({ ...q, tier: template.tier });
    }
    tries++;
  }

  // Q11-15: Tier 3 (100+, prices, phones)
  tries = 0;
  while (questions.length < 15 && tries < 40) {
    const template = pickRandom(TIER_3_SCENARIOS);
    const q = template.generate();
    if (!usedAnswers.has(q.answer)) {
      usedAnswers.add(q.answer);
      questions.push({ ...q, tier: template.tier });
    }
    tries++;
  }

  // Safety: if generation fell short, fill from any tier
  tries = 0;
  const allTemplates = [...TIER_1_SCENARIOS, ...TIER_2_SCENARIOS, ...TIER_3_SCENARIOS];
  while (questions.length < 15 && tries < 60) {
    const template = pickRandom(allTemplates);
    const q = template.generate();
    if (!usedAnswers.has(q.answer)) {
      usedAnswers.add(q.answer);
      questions.push({ ...q, tier: template.tier });
    }
    tries++;
  }

  return questions;
}

// =============================================================================
// ANSWER VALIDATION — flexible matching
// =============================================================================

function normalizeAnswer(input: string): string {
  return input
    .trim()
    .replace(/€/g, '')
    .replace(/\s/g, '')
    .replace(/,/g, '.') // accept German comma as decimal
    .replace(/\.00$/, '') // 31.00 -> 31
    .replace(/^0+(\d)/, '$1'); // strip leading zeros except for "0" itself
}

function checkAnswer(userInput: string, correctAnswer: string, answerType: AnswerType): boolean {
  const normalized = normalizeAnswer(userInput);
  const expected = normalizeAnswer(correctAnswer);

  if (normalized === expected) return true;

  // For prices: "2.49" matches "2.49", "2,49" matches "2.49"
  if (answerType === 'price') {
    // Also accept without trailing zero: "2.5" for "2.50"
    const nFloat = parseFloat(normalized);
    const eFloat = parseFloat(expected);
    if (!isNaN(nFloat) && !isNaN(eFloat) && Math.abs(nFloat - eFloat) < 0.001) return true;
  }

  // For integers: "031" should match "31"
  if (answerType === 'integer') {
    const nInt = parseInt(normalized, 10);
    const eInt = parseInt(expected, 10);
    if (!isNaN(nInt) && !isNaN(eInt) && nInt === eInt) return true;
  }

  return false;
}

// =============================================================================
// MANGLISH REACTIONS
// =============================================================================

const CORRECT_REACTIONS = [
  "Seri machaa! Exact aanu!",
  "Adipoli! German numbers onnum problem alla!",
  "Wunderbar! You're getting it!",
  "Richtig! That's spot on!",
  "Mmmm sharp aayittu kettu! Nice!",
  "Kidu! Like a local already!",
];
const WRONG_REACTIONS = [
  "Aiyyo! Close but not quite!",
  "Paravaala machaa! German numbers are tricky — ones come BEFORE tens!",
  "Hmm! Listen again: 23 = drei-und-zwanzig (3 and 20)",
  "Saaramilla! The backwards order trips everyone up at first!",
  "Not quite da! But you'll get the next one!",
];
const STREAK_REACTIONS = [
  "ON FIRE! Rechenkönig!",
  "Unstoppable machaa!",
  "Full power mode! Keep going!",
  "Absolutely nailing it!",
  "Number master vibes!",
];
const TIER_UP_REACTIONS: Record<number, string> = {
  6: "Level up! Numbers getting bigger now... ready?",
  11: "Boss level! Prices, hundreds, phone numbers — bring it on!",
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function NumberBlitzGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [reactionText, setReactionText] = useState('');
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCoinAnim, setShowCoinAnim] = useState(false);
  const [showRechenkonig, setShowRechenkonig] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const regenerateQuestions = useCallback(() => {
    setQuestions(generateQuestionSet());
  }, []);

  useEffect(() => {
    regenerateQuestions();
  }, [regenerateQuestions]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && !showResult) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [gameState, showResult, currentIndex]);

  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, gameState]);

  // Auto-focus input when new question appears
  useEffect(() => {
    if (gameState === 'playing' && !showResult) {
      // Small delay to let animation settle
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [gameState, currentIndex, showResult]);

  // Cleanup advance timer on unmount
  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const startGame = () => {
    regenerateQuestions();
    setGameState('playing');
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCoins(0);
    setTimeLeft(30);
    setUserInput('');
    setShowResult(false);
    setIsCorrect(false);
    setKuttanMood('thinking');
    setReactionText('');
    setQuestionsAnswered(0);
    setShowConfetti(false);
  };

  const endGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    setGameState('complete');
    incrementGamesPlayed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incrementGamesPlayed]);

  const advanceToNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput('');
      setShowResult(false);
      setKuttanMood('thinking');
      setReactionText('');

      // Show tier-up reaction
      const nextIdx = currentIndex + 2; // +2 because currentIndex hasn't updated yet
      if (TIER_UP_REACTIONS[nextIdx]) {
        setReactionText(TIER_UP_REACTIONS[nextIdx]);
        setKuttanMood('excited');
      }
    } else {
      endGame();
    }
  }, [currentIndex, questions.length, endGame]);

  const handleSubmit = () => {
    if (showResult || !userInput.trim()) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setShowResult(true);
    setQuestionsAnswered((prev) => prev + 1);

    const currentQ = questions[currentIndex];
    const correct = checkAnswer(userInput, currentQ.answer, currentQ.answerType);
    setIsCorrect(correct);

    if (correct) {
      const tierBonus = currentQ.tier; // 1, 2, or 3 coins based on difficulty
      setScore((prev) => prev + 1);
      setCoins((prev) => prev + tierBonus);
      setShowCoinAnim(true);
      setTimeout(() => setShowCoinAnim(false), 600);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setTimeLeft((prev) => Math.min(prev + 2, 60));
      setKuttanMood('happy');

      if (newStreak >= 3) {
        setReactionText(pickRandom(STREAK_REACTIONS));
        if (newStreak === 3) {
          setShowRechenkonig(true);
          setTimeout(() => setShowRechenkonig(false), 1500);
        }
      } else {
        setReactionText(pickRandom(CORRECT_REACTIONS));
      }
    } else {
      setStreak(0);
      setKuttanMood('sad');
      setReactionText(pickRandom(WRONG_REACTIONS));
    }

    const delay = correct ? 1000 : 2200;
    advanceTimerRef.current = setTimeout(advanceToNext, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const currentQ = questions[currentIndex];
  const timerPct = (timeLeft / 60) * 100;
  const scorePct = questionsAnswered > 0 ? (score / questionsAnswered) * 100 : 0;
  const earnedXP = score * 6 + maxStreak * 4 + coins * 2;

  const getCompletionData = () => {
    if (scorePct > 80)
      return {
        title: 'Zahlenmeister!',
        subtitle: "Adipoli machaa! You understood German numbers in real situations — shopping, trains, addresses, everything! Germany inte ready alla!",
        emoji: '🏆',
      };
    if (scorePct >= 50)
      return {
        title: 'Good Progress!',
        subtitle: "Not bad da! You can handle most everyday numbers. A few more rounds and no cashier or train announcement can confuse you!",
        emoji: '📈',
      };
    return {
      title: 'Keep Practicing!',
      subtitle: "Paravaala machaa! German numbers are backwards — ones before tens. Listen carefully and it clicks. Try again!",
      emoji: '💪',
    };
  };

  const getStars = () => {
    if (scorePct > 80) return 3;
    if (scorePct >= 50) return 2;
    if (scorePct >= 25) return 1;
    return 0;
  };

  // Tier label for display
  const tierLabel = (tier: number) => {
    if (tier === 1) return 'Beginner';
    if (tier === 2) return 'Intermediate';
    return 'Advanced';
  };
  const tierColor = (tier: number) => {
    if (tier === 1) return '#00d9a5';
    if (tier === 2) return '#ffd93d';
    return '#ff6b9d';
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto relative min-h-screen">
      <Confetti isActive={showConfetti} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/games')}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        <div className="flex items-center gap-3">
          {gameState === 'playing' && (
            <>
              {/* Coin counter */}
              <div className="flex items-center gap-1 px-2 py-1 rounded-full glass-card">
                <motion.span
                  className="text-lg"
                  animate={showCoinAnim ? { scale: [1, 1.4, 1], rotate: [0, 20, 0] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  🪙
                </motion.span>
                <span className="text-sm font-bold text-[#d4a520]">{coins}</span>
              </div>
              <motion.div
                animate={{ scale: timeLeft <= 5 ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 0.4, repeat: timeLeft <= 5 ? Infinity : 0 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full font-bold glass-card"
                style={{
                  borderColor: timeLeft <= 5 ? '#c0392b' : timeLeft <= 10 ? '#e67e22' : 'var(--card-border)',
                  borderWidth: '1px',
                  color: timeLeft <= 5 ? '#c0392b' : timeLeft <= 10 ? '#e67e22' : 'var(--foreground)',
                }}
              >
                <Clock className="w-5 h-5" />
                <span>{timeLeft}s</span>
              </motion.div>
            </>
          )}
        </div>
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
              messages="You just landed in Germany. Every number around you — prices, platforms, addresses — is in German. Can you decode them fast enough?"
              mood="excited"
              size="lg"
              showAppu
              appuMood="happy"
              className="mb-6"
            />

            <div className="glass-card p-6 w-full text-center">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="text-6xl mb-4"
              >
                🇩🇪
              </motion.div>

              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2 gradient-text">
                Number Blitz
              </h1>
              <p className="text-[var(--foreground)]/70 mb-4 text-sm">
                Real German situations. You hear/read a number — type what it means. Prices, platforms, addresses, phone numbers... everything.
              </p>

              {/* Quick tip */}
              <div
                className="glass-card p-3 mb-4 text-left text-sm"
                style={{
                  borderColor: 'rgba(212,165,32,0.3)',
                  background: 'rgba(212,165,32,0.05)',
                }}
              >
                <p className="font-bold text-[#d4a520] mb-1">Key Pattern:</p>
                <p className="text-[var(--foreground)]/60 mb-1">
                  47 = <span className="text-[#ff6b9d] font-bold">sieben</span>und
                  <span className="text-[#00d9a5] font-bold">vierzig</span> (7 + 40)
                </p>
                <p className="text-[var(--foreground)]/40 text-xs">
                  German says ones FIRST, then tens. It&apos;s backwards!
                </p>
              </div>

              {/* Difficulty preview */}
              <div className="glass-card p-3 mb-4 text-left text-xs space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: '#00d9a5' }} />
                  <span className="text-[var(--foreground)]/60">Q1-5: Simple numbers (platforms, floors, bus lines)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: '#ffd93d' }} />
                  <span className="text-[var(--foreground)]/60">Q6-10: Two-digit numbers (prices, ages, addresses)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: '#ff6b9d' }} />
                  <span className="text-[var(--foreground)]/60">Q11-15: Hundreds, prices with cents, phone segments</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--foreground)]/50">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 30 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[#d4a520]" /> +2s per correct
                </span>
                <span className="flex items-center gap-1">
                  <Keyboard className="w-4 h-4 text-[#d4a520]" /> Type answers
                </span>
              </div>

              <button onClick={startGame} className="game-button text-lg w-full py-4">
                Start Blitz
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== PLAYING SCREEN ==================== */}
        {gameState === 'playing' && currentQ && (
          <motion.div
            key={`question-${currentIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
                    {score}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">Score</div>
                </div>
                {streak > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 px-3 py-1 rounded-full font-bold"
                    style={{
                      background:
                        streak >= 5
                          ? 'linear-gradient(135deg, #ff6b9d, #ffd93d)'
                          : streak >= 3
                          ? 'rgba(212,165,32,0.2)'
                          : 'rgba(212,165,32,0.1)',
                      color: streak >= 5 ? '#fff' : '#d4a520',
                      border: '1px solid rgba(212,165,32,0.3)',
                    }}
                  >
                    <Zap className="w-4 h-4" />
                    <span>{streak}x</span>
                    {streak >= 3 && <span className="ml-0.5">🔥</span>}
                  </motion.div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: `${tierColor(currentQ.tier)}20`,
                    color: tierColor(currentQ.tier),
                    border: `1px solid ${tierColor(currentQ.tier)}40`,
                  }}
                >
                  {tierLabel(currentQ.tier)}
                </span>
                <span className="text-sm text-[var(--foreground)]/50">
                  {currentIndex + 1}/{questions.length}
                </span>
              </div>
            </div>

            {/* Timer bar */}
            <div className="mb-4">
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ background: 'rgba(245,240,232,0.1)' }}
              >
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: `${timerPct}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      timeLeft <= 5
                        ? 'linear-gradient(90deg, #c0392b, #e74c3c)'
                        : timeLeft <= 10
                        ? 'linear-gradient(90deg, #e67e22, #f39c12)'
                        : 'linear-gradient(90deg, #d4a520, #00d9a5)',
                  }}
                />
              </div>
            </div>

            {/* Kuttan reaction */}
            <AnimatePresence>
              {reactionText && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl"
                  style={{
                    background: isCorrect
                      ? 'rgba(0,217,165,0.12)'
                      : 'rgba(192,57,43,0.12)',
                    border: isCorrect
                      ? '1px solid rgba(0,217,165,0.3)'
                      : '1px solid rgba(192,57,43,0.3)',
                  }}
                >
                  <span className="text-lg">{isCorrect ? (streak >= 3 ? '🔥' : '✅') : '😬'}</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: isCorrect ? 'var(--success)' : 'var(--danger)' }}
                  >
                    {reactionText}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rechenkoenig badge */}
            <AnimatePresence>
              {showRechenkonig && (
                <motion.div
                  initial={{ scale: 0, y: -20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center justify-center gap-2 mb-3"
                >
                  <span
                    className="px-4 py-2 rounded-full font-black text-sm"
                    style={{
                      background: 'linear-gradient(135deg, #d4a520, #ffd93d)',
                      color: '#1a1a2e',
                    }}
                  >
                    👑 Rechenkönig!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Question Card */}
            <motion.div
              className="glass-card p-5 sm:p-6 mb-4"
              style={{
                borderColor: streak >= 3 ? 'rgba(212,165,32,0.5)' : undefined,
                boxShadow: streak >= 3 ? '0 0 30px rgba(212,165,32,0.15)' : undefined,
              }}
            >
              {/* Scene context */}
              <div className="text-sm text-[var(--foreground)]/50 mb-3 text-center">
                {currentQ.scene}
              </div>

              {/* The German spoken text — the core challenge */}
              <motion.div
                key={`spoken-${currentIndex}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-center mb-4"
              >
                <p
                  className="text-xl sm:text-2xl font-bold leading-relaxed"
                  style={{ color: 'var(--foreground)' }}
                >
                  {currentQ.spoken}
                </p>
              </motion.div>

              {/* Hint */}
              {currentQ.hint && (
                <p className="text-xs text-[var(--foreground)]/40 text-center mb-4">
                  {currentQ.hint}
                </p>
              )}

              {/* Input area */}
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode={currentQ.answerType === 'price' ? 'decimal' : 'numeric'}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={showResult}
                  placeholder={
                    currentQ.answerType === 'price'
                      ? 'Type the price (e.g. 3.49)'
                      : currentQ.answerType === 'phone-segment'
                      ? 'Type the digits (e.g. 0176)'
                      : 'Type the number'
                  }
                  className="w-full px-4 py-3 rounded-xl text-center text-xl font-bold outline-none transition-all"
                  style={{
                    background: showResult
                      ? isCorrect
                        ? 'rgba(0,217,165,0.15)'
                        : 'rgba(192,57,43,0.15)'
                      : 'rgba(245,240,232,0.08)',
                    border: showResult
                      ? isCorrect
                        ? '2px solid rgba(0,217,165,0.5)'
                        : '2px solid rgba(192,57,43,0.5)'
                      : '2px solid rgba(245,240,232,0.15)',
                    color: showResult
                      ? isCorrect
                        ? 'var(--success)'
                        : 'var(--danger)'
                      : 'var(--foreground)',
                    caretColor: '#ff6b9d',
                  }}
                  autoComplete="off"
                />
                {!showResult && userInput.trim() && (
                  <button
                    onClick={handleSubmit}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg font-bold text-sm transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b9d, #d4a520)',
                      color: '#fff',
                    }}
                  >
                    Enter
                  </button>
                )}
              </div>

              {/* Show correct answer on wrong */}
              {showResult && !isCorrect && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 pt-3 text-center"
                  style={{ borderTop: '1px solid rgba(245,240,232,0.1)' }}
                >
                  <p className="text-xs text-[var(--foreground)]/40 mb-1">Correct answer:</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                    {currentQ.answer}
                  </p>
                </motion.div>
              )}

              {/* Show confirmation on correct */}
              {showResult && isCorrect && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 text-center"
                >
                  <span className="text-2xl">✅</span>
                </motion.div>
              )}
            </motion.div>
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
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="text-center mb-4"
            >
              <motion.span
                className="text-6xl inline-block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getCompletionData().emoji}
              </motion.span>
            </motion.div>

            <CharacterGuide
              messages={getCompletionData().subtitle}
              mood={kuttanMood}
              size="md"
              showAppu={scorePct > 80}
              appuMood={scorePct > 80 ? 'celebrating' : 'idle'}
              className="mb-4"
            />

            <div className="glass-card p-6 w-full text-center">
              <h1
                className="text-2xl font-bold mb-2"
                style={{
                  color:
                    scorePct > 80
                      ? 'var(--success)'
                      : scorePct >= 50
                      ? 'var(--primary)'
                      : 'var(--foreground)',
                }}
              >
                {getCompletionData().title}
              </h1>

              <div className="flex justify-center mb-4">
                <Stars rating={getStars()} size="lg" animated />
              </div>

              <p className="text-[var(--foreground)]/70 mb-6">
                {score} correct out of {questionsAnswered} answered
                {questionsAnswered < questions.length && (
                  <span className="text-[var(--foreground)]/40"> (time ran out at Q{questionsAnswered})</span>
                )}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                    {score}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">Correct</div>
                </div>
                <div className="glass-card p-3">
                  <div
                    className="text-2xl font-bold flex items-center justify-center gap-1"
                    style={{ color: '#ff6b9d' }}
                  >
                    <Zap className="w-5 h-5" />
                    {maxStreak}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">Best Streak</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold" style={{ color: '#d4a520' }}>
                    +{earnedXP}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">XP Earned</div>
                </div>
              </div>

              {/* Difficulty breakdown */}
              <div
                className="glass-card p-3 mb-6 text-left text-xs space-y-2"
                style={{
                  borderColor: 'rgba(212,165,32,0.3)',
                  background: 'rgba(212,165,32,0.05)',
                }}
              >
                <p className="font-bold text-[#d4a520] mb-1">Remember:</p>
                <p className="text-[var(--foreground)]/60">
                  German says ones FIRST: 45 = <span className="text-[#ff6b9d]">fünf</span>(5)-und-<span className="text-[#00d9a5]">vierzig</span>(40)
                </p>
                <p className="text-[var(--foreground)]/60">
                  Hundreds: 347 = <span className="text-[#00d9a5]">drei</span>hundert<span className="text-[#ff6b9d]">sieben</span>und<span className="text-[#00d9a5]">vierzig</span>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={startGame}
                  className="game-button text-base w-full py-3 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Play Again
                </button>
                <button
                  onClick={() => router.push('/games')}
                  className="w-full py-3 rounded-xl text-base font-medium text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                  style={{ background: 'rgba(245,240,232,0.05)' }}
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
