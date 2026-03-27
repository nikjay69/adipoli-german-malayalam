'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Clock, Zap, Check, X } from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character';
import { useGameStore } from '@/lib/store';

// ── Kuttan Manglish reactions ──────────────────────────────────────────
const CORRECT_REACTIONS = [
  "Adipoli! Nailed it!",
  "Seri seri! Perfect verb form!",
  "Wunderbar machaa!",
  "Sheriyaayi! Grammatik on point!",
  "Super ayi! Keep going!",
  "Richtig! Nee pro aanu!",
  "Goethe exam? No problem for you!",
  "Correct da! You're thinking in German!",
];

const WRONG_REACTIONS = [
  "Aiyyo! Think about the pronoun...",
  "Paravaala! Check the conjugation pattern!",
  "Not quite da... stem changes are sneaky!",
  "Hmm close! Try thinking about who's speaking...",
  "Almost machaa! Irregular verbs are tricky!",
];

const HINT_REACTIONS = [
  "Okay, here's a hint — look at the infinitive...",
  "Think about it da... what changes for this pronoun?",
  "Remember the pattern machaa — stem + ending!",
];

const FIRE_REACTIONS = [
  "FIRE MODE! You're unstoppable machaa!",
  "ON FIRE! Verb guru vibes!",
  "Unstoppable! Adipoli streak!",
  "Combo power! Goethe would be proud!",
];

const COMPLETION_MSGS: Record<string, { msg: string; mood: KuttanMood }> = {
  amazing: { msg: "Adipoli machaa! You're conjugating like a native! Goethe exam = easy!", mood: 'celebrating' },
  great: { msg: "Wunderbar! Your verb skills are solid! Keep it up!", mood: 'excited' },
  good: { msg: "Not bad machaa! The irregular ones need more practice, but you're getting there!", mood: 'happy' },
  tryAgain: { msg: "Paravaala da! Verbs take time. Real situations make them stick — try again!", mood: 'thinking' },
};

// ── Verb conjugation data (25+ verbs) ──────────────────────────────────
interface VerbEntry {
  infinitive: string;
  meaning: string;
  type: 'regular' | 'irregular' | 'modal';
  conjugations: Record<string, string>;
}

const VERBS: VerbEntry[] = [
  // ── Regular verbs ──
  { infinitive: "lernen", meaning: "to learn", type: 'regular',
    conjugations: { ich: "lerne", du: "lernst", "er/sie/es": "lernt", wir: "lernen", ihr: "lernt", "Sie": "lernen" } },
  { infinitive: "machen", meaning: "to do/make", type: 'regular',
    conjugations: { ich: "mache", du: "machst", "er/sie/es": "macht", wir: "machen", ihr: "macht", "Sie": "machen" } },
  { infinitive: "wohnen", meaning: "to live (reside)", type: 'regular',
    conjugations: { ich: "wohne", du: "wohnst", "er/sie/es": "wohnt", wir: "wohnen", ihr: "wohnt", "Sie": "wohnen" } },
  { infinitive: "arbeiten", meaning: "to work", type: 'regular',
    conjugations: { ich: "arbeite", du: "arbeitest", "er/sie/es": "arbeitet", wir: "arbeiten", ihr: "arbeitet", "Sie": "arbeiten" } },
  { infinitive: "spielen", meaning: "to play", type: 'regular',
    conjugations: { ich: "spiele", du: "spielst", "er/sie/es": "spielt", wir: "spielen", ihr: "spielt", "Sie": "spielen" } },
  { infinitive: "kaufen", meaning: "to buy", type: 'regular',
    conjugations: { ich: "kaufe", du: "kaufst", "er/sie/es": "kauft", wir: "kaufen", ihr: "kauft", "Sie": "kaufen" } },
  { infinitive: "kochen", meaning: "to cook", type: 'regular',
    conjugations: { ich: "koche", du: "kochst", "er/sie/es": "kocht", wir: "kochen", ihr: "kocht", "Sie": "kochen" } },
  { infinitive: "trinken", meaning: "to drink", type: 'regular',
    conjugations: { ich: "trinke", du: "trinkst", "er/sie/es": "trinkt", wir: "trinken", ihr: "trinkt", "Sie": "trinken" } },
  { infinitive: "fragen", meaning: "to ask", type: 'regular',
    conjugations: { ich: "frage", du: "fragst", "er/sie/es": "fragt", wir: "fragen", ihr: "fragt", "Sie": "fragen" } },
  { infinitive: "brauchen", meaning: "to need", type: 'regular',
    conjugations: { ich: "brauche", du: "brauchst", "er/sie/es": "braucht", wir: "brauchen", ihr: "braucht", "Sie": "brauchen" } },
  // ── Irregular verbs ──
  { infinitive: "sein", meaning: "to be", type: 'irregular',
    conjugations: { ich: "bin", du: "bist", "er/sie/es": "ist", wir: "sind", ihr: "seid", "Sie": "sind" } },
  { infinitive: "haben", meaning: "to have", type: 'irregular',
    conjugations: { ich: "habe", du: "hast", "er/sie/es": "hat", wir: "haben", ihr: "habt", "Sie": "haben" } },
  { infinitive: "sprechen", meaning: "to speak", type: 'irregular',
    conjugations: { ich: "spreche", du: "sprichst", "er/sie/es": "spricht", wir: "sprechen", ihr: "sprecht", "Sie": "sprechen" } },
  { infinitive: "essen", meaning: "to eat", type: 'irregular',
    conjugations: { ich: "esse", du: "isst", "er/sie/es": "isst", wir: "essen", ihr: "esst", "Sie": "essen" } },
  { infinitive: "fahren", meaning: "to drive/go", type: 'irregular',
    conjugations: { ich: "fahre", du: "fährst", "er/sie/es": "fährt", wir: "fahren", ihr: "fahrt", "Sie": "fahren" } },
  { infinitive: "lesen", meaning: "to read", type: 'irregular',
    conjugations: { ich: "lese", du: "liest", "er/sie/es": "liest", wir: "lesen", ihr: "lest", "Sie": "lesen" } },
  { infinitive: "schlafen", meaning: "to sleep", type: 'irregular',
    conjugations: { ich: "schlafe", du: "schläfst", "er/sie/es": "schläft", wir: "schlafen", ihr: "schlaft", "Sie": "schlafen" } },
  { infinitive: "geben", meaning: "to give", type: 'irregular',
    conjugations: { ich: "gebe", du: "gibst", "er/sie/es": "gibt", wir: "geben", ihr: "gebt", "Sie": "geben" } },
  { infinitive: "nehmen", meaning: "to take", type: 'irregular',
    conjugations: { ich: "nehme", du: "nimmst", "er/sie/es": "nimmt", wir: "nehmen", ihr: "nehmt", "Sie": "nehmen" } },
  { infinitive: "sehen", meaning: "to see", type: 'irregular',
    conjugations: { ich: "sehe", du: "siehst", "er/sie/es": "sieht", wir: "sehen", ihr: "seht", "Sie": "sehen" } },
  { infinitive: "kommen", meaning: "to come", type: 'irregular',
    conjugations: { ich: "komme", du: "kommst", "er/sie/es": "kommt", wir: "kommen", ihr: "kommt", "Sie": "kommen" } },
  { infinitive: "gehen", meaning: "to go", type: 'irregular',
    conjugations: { ich: "gehe", du: "gehst", "er/sie/es": "geht", wir: "gehen", ihr: "geht", "Sie": "gehen" } },
  { infinitive: "wissen", meaning: "to know (a fact)", type: 'irregular',
    conjugations: { ich: "weiß", du: "weißt", "er/sie/es": "weiß", wir: "wissen", ihr: "wisst", "Sie": "wissen" } },
  // ── Modal verbs ──
  { infinitive: "können", meaning: "can/to be able to", type: 'modal',
    conjugations: { ich: "kann", du: "kannst", "er/sie/es": "kann", wir: "können", ihr: "könnt", "Sie": "können" } },
  { infinitive: "müssen", meaning: "must/to have to", type: 'modal',
    conjugations: { ich: "muss", du: "musst", "er/sie/es": "muss", wir: "müssen", ihr: "müsst", "Sie": "müssen" } },
  { infinitive: "wollen", meaning: "to want to", type: 'modal',
    conjugations: { ich: "will", du: "willst", "er/sie/es": "will", wir: "wollen", ihr: "wollt", "Sie": "wollen" } },
  { infinitive: "dürfen", meaning: "may/to be allowed to", type: 'modal',
    conjugations: { ich: "darf", du: "darfst", "er/sie/es": "darf", wir: "dürfen", ihr: "dürft", "Sie": "dürfen" } },
  { infinitive: "sollen", meaning: "should/to be supposed to", type: 'modal',
    conjugations: { ich: "soll", du: "sollst", "er/sie/es": "soll", wir: "sollen", ihr: "sollt", "Sie": "sollen" } },
  { infinitive: "mögen", meaning: "to like", type: 'modal',
    conjugations: { ich: "mag", du: "magst", "er/sie/es": "mag", wir: "mögen", ihr: "mögt", "Sie": "mögen" } },
];

// ── Situational question templates ─────────────────────────────────────
// Each has a situation, sentence with gap, and specifies the verb + pronoun
interface QuestionTemplate {
  situation: string;
  sentence: string; // use ______ for the gap
  infinitive: string;
  pronoun: string;
  round: 1 | 2 | 3; // difficulty round
}

const QUESTION_POOL: QuestionTemplate[] = [
  // ── Round 1: Regular verbs, infinitive shown ──
  { situation: "First day at German class", sentence: "Ich ______ Deutsch.", infinitive: "lernen", pronoun: "ich", round: 1 },
  { situation: "Telling a friend about your job", sentence: "Ich ______ bei Siemens.", infinitive: "arbeiten", pronoun: "ich", round: 1 },
  { situation: "Chatting with your WG flatmate", sentence: "Wo ______ du?", infinitive: "wohnen", pronoun: "du", round: 1 },
  { situation: "Asking a classmate after school", sentence: "Was ______ du heute Abend?", infinitive: "machen", pronoun: "du", round: 1 },
  { situation: "Weekend plans with friends", sentence: "Wir ______ am Samstag Fußball.", infinitive: "spielen", pronoun: "wir", round: 1 },
  { situation: "At the supermarket with a friend", sentence: "Ich ______ Milch und Brot.", infinitive: "kaufen", pronoun: "ich", round: 1 },
  { situation: "Describing your evening routine", sentence: "Abends ______ ich gern Pasta.", infinitive: "kochen", pronoun: "ich", round: 1 },
  { situation: "At a cafe with your Tandem partner", sentence: "Was ______ du?", infinitive: "trinken", pronoun: "du", round: 1 },
  { situation: "Asking a stranger for directions", sentence: "Ich ______ Sie: Wo ist der Bahnhof?", infinitive: "fragen", pronoun: "ich", round: 1 },
  { situation: "Shopping for your apartment", sentence: "Wir ______ einen neuen Tisch.", infinitive: "brauchen", pronoun: "wir", round: 1 },
  { situation: "Your classmates discuss homework", sentence: "Ihr ______ zu viel!", infinitive: "lernen", pronoun: "ihr", round: 1 },
  { situation: "Describing what your flatmate does", sentence: "Er ______ jeden Tag von 9 bis 5.", infinitive: "arbeiten", pronoun: "er/sie/es", round: 1 },

  // ── Round 2: Regular + irregular, infinitive shown ──
  { situation: "Your professor asks the class", sentence: "______ Sie Deutsch?", infinitive: "sprechen", pronoun: "Sie", round: 2 },
  { situation: "Emailing your Studienkolleg", sentence: "Ich ______ am Montag.", infinitive: "kommen", pronoun: "ich", round: 2 },
  { situation: "Your flatmate is planning dinner", sentence: "Wir ______ heute Abend Pizza.", infinitive: "essen", pronoun: "wir", round: 2 },
  { situation: "Telling your friend about your commute", sentence: "Ich ______ jeden Tag mit dem Bus.", infinitive: "fahren", pronoun: "ich", round: 2 },
  { situation: "Introducing yourself at a Stammtisch", sentence: "Ich ______ Student.", infinitive: "sein", pronoun: "ich", round: 2 },
  { situation: "Describing your German friend", sentence: "Er ______ zwei Katzen.", infinitive: "haben", pronoun: "er/sie/es", round: 2 },
  { situation: "At the university library", sentence: "Du ______ sehr schnell!", infinitive: "lesen", pronoun: "du", round: 2 },
  { situation: "Your host mother asks about sleep", sentence: "______ du gut?", infinitive: "schlafen", pronoun: "du", round: 2 },
  { situation: "The waiter asks at a restaurant", sentence: "Was ______ Sie?", infinitive: "nehmen", pronoun: "Sie", round: 2 },
  { situation: "Your teacher gives back the tests", sentence: "Er ______ die Prüfungen zurück.", infinitive: "geben", pronoun: "er/sie/es", round: 2 },
  { situation: "At the cinema with your friend", sentence: "______ du den Film?", infinitive: "sehen", pronoun: "du", round: 2 },
  { situation: "Asking about your friend's evening", sentence: "______ ihr heute Abend ins Kino?", infinitive: "gehen", pronoun: "ihr", round: 2 },
  { situation: "Checking if a friend knows something", sentence: "______ du, wo der Kurs ist?", infinitive: "wissen", pronoun: "du", round: 2 },
  { situation: "Your classmates talk about you all", sentence: "Wir ______ alle aus Kerala.", infinitive: "kommen", pronoun: "wir", round: 2 },

  // ── Round 3: Modal + irregular, NO infinitive shown ──
  { situation: "Sign at the library", sentence: "Hier ______ man nicht rauchen.", infinitive: "dürfen", pronoun: "er/sie/es", round: 3 },
  { situation: "The doctor asks about medication", sentence: "______ Sie Medikamente?", infinitive: "nehmen", pronoun: "Sie", round: 3 },
  { situation: "Your boss tells you about tomorrow", sentence: "Sie ______ morgen um 8 Uhr kommen.", infinitive: "müssen", pronoun: "Sie", round: 3 },
  { situation: "Asking if your friend can help", sentence: "______ du mir helfen?", infinitive: "können", pronoun: "du", round: 3 },
  { situation: "Your friend suggests weekend plans", sentence: "Wir ______ am Wochenende nach Berlin fahren.", infinitive: "wollen", pronoun: "wir", round: 3 },
  { situation: "The sign at the Ausländerbehörde", sentence: "Sie ______ Ihren Pass mitbringen.", infinitive: "sollen", pronoun: "Sie", round: 3 },
  { situation: "Talking about a favourite food", sentence: "Ich ______ Döner sehr gern.", infinitive: "mögen", pronoun: "ich", round: 3 },
  { situation: "Your friend is sick and can't come", sentence: "Er ______ heute nicht kommen.", infinitive: "können", pronoun: "er/sie/es", round: 3 },
  { situation: "Teacher announces a test", sentence: "Ihr ______ das bis Freitag lernen.", infinitive: "müssen", pronoun: "ihr", round: 3 },
  { situation: "Asking for permission at the office", sentence: "______ ich das Fenster öffnen?", infinitive: "dürfen", pronoun: "ich", round: 3 },
  { situation: "Your friend tells you their plan", sentence: "Ich ______ Arzt werden.", infinitive: "wollen", pronoun: "ich", round: 3 },
  { situation: "A sign in the park says", sentence: "Man ______ hier nicht laut Musik spielen.", infinitive: "dürfen", pronoun: "er/sie/es", round: 3 },
  { situation: "The student asks the teacher", sentence: "______ ich auf die Toilette gehen?", infinitive: "dürfen", pronoun: "ich", round: 3 },
  { situation: "A friend describes someone", sentence: "Sie ______ alles über Bollywood.", infinitive: "wissen", pronoun: "er/sie/es", round: 3 },
  { situation: "Your flatmate hasn't eaten today", sentence: "Er ______ großen Hunger.", infinitive: "haben", pronoun: "er/sie/es", round: 3 },
  { situation: "You ask about a German reality", sentence: "In Deutschland ______ man immer pünktlich sein.", infinitive: "müssen", pronoun: "er/sie/es", round: 3 },
];

// ── Prepared question (resolved from template) ────────────────────────
interface Question {
  situation: string;
  sentence: string;
  infinitive: string;
  pronoun: string;
  correctAnswer: string;
  verb: VerbEntry;
  round: 1 | 2 | 3;
  showInfinitive: boolean; // rounds 1-2 show it, round 3 doesn't
}

// ── Helpers ────────────────────────────────────────────────────────────
function shuffleArray<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function answersMatch(input: string, correct: string): boolean {
  const trimmed = input.trim().toLowerCase();
  const target = correct.toLowerCase();

  // Direct match
  if (trimmed === target) return true;

  // Also accept ASCII substitutes for special characters:
  // ä=ae, ö=oe, ü=ue, ß=ss
  // We expand the TARGET to ASCII and compare with user input
  const asciiTarget = target
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');
  if (trimmed === asciiTarget) return true;

  // Also try expanding the user input to umlauts (for partial substitution)
  const umlautInput = trimmed
    .replace(/ae/g, 'ä')
    .replace(/oe/g, 'ö')
    .replace(/ue/g, 'ü');
  if (umlautInput === target) return true;

  return false;
}

function lookupVerb(infinitive: string): VerbEntry | undefined {
  return VERBS.find(v => v.infinitive === infinitive);
}

// Map pronoun keys used in templates to conjugation table keys
function resolvePronounKey(pronoun: string): string {
  if (pronoun === 'Sie') return 'Sie';
  return pronoun;
}

// ── Generate 15 questions with difficulty progression ──────────────────
function generateQuestionSet(): Question[] {
  const round1Pool = shuffleArray(QUESTION_POOL.filter(q => q.round === 1));
  const round2Pool = shuffleArray(QUESTION_POOL.filter(q => q.round === 2));
  const round3Pool = shuffleArray(QUESTION_POOL.filter(q => q.round === 3));

  const pick = (pool: QuestionTemplate[], count: number): QuestionTemplate[] => {
    return pool.slice(0, count);
  };

  const selected = [
    ...pick(round1Pool, 5),
    ...pick(round2Pool, 5),
    ...pick(round3Pool, 5),
  ];

  return selected.map(t => {
    const verb = lookupVerb(t.infinitive);
    if (!verb) throw new Error(`Verb not found: ${t.infinitive}`);
    const pronounKey = resolvePronounKey(t.pronoun);
    const correctAnswer = verb.conjugations[pronounKey];
    if (!correctAnswer) throw new Error(`No conjugation for ${t.infinitive} + ${pronounKey}`);

    return {
      situation: t.situation,
      sentence: t.sentence,
      infinitive: t.infinitive,
      pronoun: t.pronoun,
      correctAnswer,
      verb,
      round: t.round,
      showInfinitive: t.round <= 2,
    };
  });
}

// ── Component ──────────────────────────────────────────────────────────
export default function VerbRushGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();
  const inputRef = useRef<HTMLInputElement>(null);

  // Game state
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalAnswered, setTotalAnswered] = useState(0);

  // Input/answer state
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0); // 0 = fresh, 1 = first wrong, 2 = show table
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'hint' | 'table' | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);

  // UI state
  const [showCombo, setShowCombo] = useState(false);
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [kuttanMsg, setKuttanMsg] = useState("Real German situations machaa! Type the verb — no shortcuts!");

  // ── Initialize questions ─────────────────────────────────────────────
  const initQuestions = useCallback(() => {
    setQuestions(generateQuestionSet());
  }, []);

  useEffect(() => {
    initQuestions();
  }, [initQuestions]);

  // ── Timer ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && feedback !== 'table') {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, timeLeft, feedback]);

  // ── Focus input when question changes ────────────────────────────────
  useEffect(() => {
    if (gameState === 'playing' && !isAdvancing) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentQuestion, gameState, isAdvancing, feedback]);

  // ── Actions ──────────────────────────────────────────────────────────
  const startGame = () => {
    const newQuestions = generateQuestionSet();
    setQuestions(newQuestions);
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(60);
    setTotalAnswered(0);
    setUserInput('');
    setAttempts(0);
    setFeedback(null);
    setIsAdvancing(false);
    setKuttanMood('excited');
    setKuttanMsg("Type the correct verb form machaa! Think in German!");
  };

  const endGame = useCallback(() => {
    setGameState('complete');
    incrementGamesPlayed();
    const comboBonus = maxStreak >= 3 ? maxStreak * 4 : 0;
    const earnedXP = score * 8 + comboBonus;
    addXP(earnedXP);

    const ratio = totalAnswered > 0 ? score / totalAnswered : 0;
    const comp = ratio >= 0.85 ? COMPLETION_MSGS.amazing
      : ratio >= 0.65 ? COMPLETION_MSGS.great
      : ratio >= 0.45 ? COMPLETION_MSGS.good
      : COMPLETION_MSGS.tryAgain;
    setKuttanMood(comp.mood);
    setKuttanMsg(comp.msg);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, maxStreak, totalAnswered]);

  const advanceToNext = useCallback(() => {
    setIsAdvancing(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setUserInput('');
        setAttempts(0);
        setFeedback(null);
        setIsAdvancing(false);
      } else {
        endGame();
      }
    }, 400);
  }, [currentQuestion, questions.length, endGame]);

  const handleSubmit = () => {
    if (!questions[currentQuestion] || isAdvancing) return;
    const q = questions[currentQuestion];
    const correct = answersMatch(userInput, q.correctAnswer);

    if (correct) {
      // ── Correct answer ──
      setFeedback('correct');
      setScore(prev => prev + 1);
      setTotalAnswered(prev => prev + 1);
      setTimeLeft(prev => Math.min(prev + 2, 99)); // +2s bonus

      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) setMaxStreak(newStreak);
        if (newStreak >= 3) {
          setShowCombo(true);
          setTimeout(() => setShowCombo(false), 800);
          setKuttanMood('celebrating');
          setKuttanMsg(pickRandom(FIRE_REACTIONS));
        } else {
          setKuttanMood('happy');
          setKuttanMsg(pickRandom(CORRECT_REACTIONS));
        }
        return newStreak;
      });

      setTimeout(advanceToNext, 800);
    } else if (attempts === 0) {
      // ── First wrong → show hint ──
      setAttempts(1);
      setFeedback('hint');
      setStreak(0);
      setKuttanMood('thinking');
      setKuttanMsg(pickRandom(HINT_REACTIONS));
      setUserInput('');
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // ── Second wrong → show conjugation table, then advance ──
      setAttempts(2);
      setFeedback('table');
      setTotalAnswered(prev => prev + 1);
      setStreak(0);
      setKuttanMood('sad');
      setKuttanMsg(pickRandom(WRONG_REACTIONS));
      // Don't auto-advance — user clicks "Got it" to continue
    }
  };

  const handleTableDismiss = () => {
    advanceToNext();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && feedback !== 'table') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // ── Derived values ───────────────────────────────────────────────────
  const currentQ = questions[currentQuestion];
  const fireMode = streak >= 3;
  const comboBonus = maxStreak >= 3 ? maxStreak * 4 : 0;
  const totalXP = score * 8 + comboBonus;

  // Which round label to show
  const roundLabel = currentQ
    ? currentQ.round === 1 ? "Round 1 — Regular Verbs"
    : currentQ.round === 2 ? "Round 2 — Irregular Verbs"
    : "Round 3 — No Hints!"
    : "";

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/games')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        {gameState === 'playing' && (
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3, repeat: timeLeft <= 10 ? Infinity : 0 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold ${
                timeLeft <= 10 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span>{timeLeft}s</span>
            </motion.div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Ready Screen ───────────────────────────────────────── */}
        {gameState === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="text-center">
              <div className="mb-4">
                <CharacterGuide
                  messages="Real situations, real verbs, real typing! No MCQ shortcuts machaa — you have to THINK in German!"
                  mood="excited"
                  size="sm"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Verb Rush
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Complete real German sentences by typing the correct conjugated verb.
                No multiple choice — you have to know it!
              </p>

              <div className="text-left bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 space-y-2">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">How it works:</p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
                  <p><span className="text-[#e94560] font-bold">Round 1</span> (Q1-5): Regular verbs — infinitive shown</p>
                  <p><span className="text-amber-500 font-bold">Round 2</span> (Q6-10): Irregular verbs — infinitive shown</p>
                  <p><span className="text-purple-500 font-bold">Round 3</span> (Q11-15): Modal verbs — figure out the verb yourself!</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Wrong once = hint. Wrong twice = full conjugation table. Correct = +2 seconds!
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 60 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" /> 15 questions
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> Type to answer
                </span>
              </div>
              <Button onClick={startGame} size="lg" fullWidth>
                Start Rush
              </Button>
            </Card>
          </motion.div>
        )}

        {/* ── Playing Screen ─────────────────────────────────────── */}
        {gameState === 'playing' && currentQ && (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Kuttan Guide */}
            <div className="mb-4">
              <CharacterGuide messages={kuttanMsg} mood={kuttanMood} size="sm" />
            </div>

            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#e94560]">{score}</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
                {streak > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full"
                  >
                    <Zap className="w-4 h-4" />
                    <span className="font-bold">{streak}x</span>
                  </motion.div>
                )}
                {fireMode && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-2xl"
                  >
                    🔥
                  </motion.div>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  Q{currentQuestion + 1}/{questions.length}
                </div>
                <div className={`text-xs font-medium ${
                  currentQ.round === 1 ? 'text-[#e94560]'
                  : currentQ.round === 2 ? 'text-amber-500'
                  : 'text-purple-500'
                }`}>
                  {roundLabel}
                </div>
              </div>
            </div>

            {/* Timer Bar */}
            <div className="mb-5">
              <ProgressBar
                progress={(timeLeft / 60) * 100}
                color={timeLeft <= 10 ? 'warning' : 'primary'}
                size="sm"
              />
            </div>

            {/* Combo indicator */}
            <AnimatePresence>
              {showCombo && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center justify-center gap-2 mb-3"
                >
                  <span className="text-lg font-black text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-4 py-1 rounded-full">
                    {streak >= 5 ? '3x' : '2x'} COMBO!
                  </span>
                  <motion.span
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 0.3, repeat: 2 }}
                    className="text-xl"
                  >
                    🔥
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Question Card */}
            <motion.div
              animate={
                fireMode
                  ? {
                      boxShadow: [
                        '0 0 10px rgba(255, 217, 61, 0.3)',
                        '0 0 25px rgba(255, 217, 61, 0.6)',
                        '0 0 10px rgba(255, 217, 61, 0.3)',
                      ],
                    }
                  : {}
              }
              transition={fireMode ? { duration: 1.2, repeat: Infinity } : {}}
              className={`rounded-2xl mb-4 ${
                fireMode
                  ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border-2 border-amber-400'
                  : ''
              }`}
            >
              <Card className={`${fireMode ? 'bg-transparent shadow-none' : ''}`}>
                {fireMode && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-bold tracking-widest text-amber-500 mb-2 text-center"
                  >
                    🔥 FIRE MODE 🔥
                  </motion.p>
                )}

                {/* Situation context */}
                <div className="text-center mb-4">
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                    Situation
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                    {currentQ.situation}
                  </p>
                </div>

                {/* The sentence with the gap */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                  <p className="text-xl font-medium text-gray-900 dark:text-white text-center leading-relaxed">
                    {currentQ.sentence.split('______').map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className={`inline-block min-w-[80px] border-b-2 mx-1 ${
                            feedback === 'correct'
                              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                              : feedback === 'wrong' || feedback === 'table'
                              ? 'border-red-500 text-red-600 dark:text-red-400'
                              : 'border-[#e94560] text-[#e94560]'
                          } font-bold`}>
                            {feedback === 'correct' ? currentQ.correctAnswer
                              : feedback === 'table' ? currentQ.correctAnswer
                              : userInput || '______'}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Verb info (shown in rounds 1-2) */}
                {currentQ.showInfinitive && (
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Verb:</span>
                    <span className="font-bold text-[#e94560]">{currentQ.infinitive}</span>
                    <span className="text-xs text-gray-400">({currentQ.verb.meaning})</span>
                  </div>
                )}

                {/* Pronoun hint (always shown) */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                    Pronoun: <span className="font-bold">{currentQ.pronoun}</span>
                  </span>
                  {currentQ.verb.type !== 'regular' && currentQ.showInfinitive && (
                    <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-medium">
                      {currentQ.verb.type === 'modal' ? 'Modal' : 'Irregular'}
                    </span>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Hint message (after first wrong attempt) */}
            <AnimatePresence>
              {feedback === 'hint' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700"
                >
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    <span className="font-bold">Hint:</span> The infinitive is{' '}
                    <span className="font-bold">{currentQ.infinitive}</span> ({currentQ.verb.meaning}).
                    Think about what happens to the stem with <span className="font-bold">{currentQ.pronoun}</span>...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Correct feedback flash */}
            <AnimatePresence>
              {feedback === 'correct' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-4 flex items-center justify-center gap-2"
                >
                  <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full font-bold">
                    <Check className="w-5 h-5" />
                    <span>Richtig! +2s</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input field */}
            {feedback !== 'correct' && feedback !== 'table' && (
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      feedback === 'hint'
                        ? `Try again — ${currentQ.pronoun} + ${currentQ.infinitive} = ?`
                        : "Type the conjugated verb..."
                    }
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    className={`flex-1 px-4 py-3 rounded-xl border-2 text-lg font-medium
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all
                      ${feedback === 'hint'
                        ? 'border-amber-400 focus:ring-amber-400 focus:border-amber-400'
                        : 'border-gray-200 dark:border-gray-700 focus:ring-[#e94560] focus:border-[#e94560]'
                      }`}
                  />
                  <Button onClick={handleSubmit} disabled={!userInput.trim()}>
                    <Check className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 text-center">
                  Press Enter to submit
                  {feedback !== 'hint' && ' — type ae/oe/ue for umlauts, ss for ß'}
                </p>
              </div>
            )}

            {/* Conjugation table (shown after two wrong attempts) */}
            <AnimatePresence>
              {feedback === 'table' && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                >
                  <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <X className="w-4 h-4 text-red-500" />
                      <p className="text-sm font-bold text-red-600 dark:text-red-400">
                        The answer was: <span className="text-lg">{currentQ.correctAnswer}</span>
                      </p>
                    </div>
                    <p className="text-xs font-bold text-red-500 dark:text-red-400 mb-2 text-center">
                      Full conjugation: <span className="text-red-700 dark:text-red-300">{currentQ.infinitive}</span>
                      {' '}({currentQ.verb.meaning})
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm mb-4">
                      {Object.entries(currentQ.verb.conjugations).map(([pronoun, form]) => (
                        <div key={pronoun} className="flex justify-between">
                          <span className="text-red-400 dark:text-red-500 font-medium">{pronoun}</span>
                          <span className={`font-bold ${
                            form === currentQ.correctAnswer
                              ? 'text-emerald-600 dark:text-emerald-400 underline'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>{form}</span>
                        </div>
                      ))}
                    </div>
                    <Button onClick={handleTableDismiss} variant="warning" fullWidth size="sm">
                      Got it — Next Question
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Complete Screen ────────────────────────────────────── */}
        {gameState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>

              {/* Kuttan completion reaction */}
              <div className="mb-4">
                <CharacterGuide messages={kuttanMsg} mood={kuttanMood} size="sm" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {totalAnswered > 0 && score / totalAnswered >= 0.85
                  ? 'Unbelievable!'
                  : totalAnswered > 0 && score / totalAnswered >= 0.65
                  ? 'Amazing!'
                  : totalAnswered > 0 && score / totalAnswered >= 0.45
                  ? 'Great Job!'
                  : score > 0
                  ? 'Good Effort!'
                  : 'Nice Try!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You typed {score} correct verb forms out of {totalAnswered} answered!
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#e94560]">{score}</div>
                  <div className="text-xs text-gray-500">Correct</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-500 flex items-center justify-center gap-1">
                    <Zap className="w-5 h-5" />{maxStreak}
                  </div>
                  <div className="text-xs text-gray-500">Best Streak</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber-500">
                    +{totalXP}
                  </div>
                  <div className="text-xs text-gray-500">XP Earned</div>
                </div>
              </div>

              {maxStreak >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700"
                >
                  <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                    🔥 FIRE streak bonus: +{maxStreak * 4} XP
                  </p>
                </motion.div>
              )}

              <div className="flex flex-col gap-3">
                <Button onClick={startGame} fullWidth>
                  <RefreshCw className="w-5 h-5" />
                  Play Again
                </Button>
                <Button variant="ghost" onClick={() => router.push('/games')} fullWidth>
                  Back to Games
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
