'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Clock, Zap, RefreshCw, Check, X } from 'lucide-react';
import { Button, ProgressBar } from '@/components/ui';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character/Kuttan';
import { Confetti, XPGain } from '@/components/game';
import { useGameStore } from '@/lib/store';

// ---------------------------------------------------------------------------
// Content: 6 scenes, 15 words each
// ---------------------------------------------------------------------------

interface SceneWord {
  german: string;
  belongs: boolean;
  reason: string;
}

interface Scene {
  id: string;
  emoji: string;
  german: string;
  english: string;
  flavor: string; // short situational color
  words: SceneWord[];
}

const SCENES: Scene[] = [
  {
    id: 'kueche',
    emoji: '\u{1F373}',
    german: 'Die K\u00FCche',
    english: 'The Kitchen',
    flavor: 'Your WG kitchen in Berlin \u2014 someone left dishes in the sink again.',
    words: [
      { german: 'der K\u00FChlschrank', belongs: true, reason: "Where else would you keep your K\u00E4se?" },
      { german: 'die Pfanne', belongs: true, reason: "Essential for your morning Spiegelei!" },
      { german: 'der Herd', belongs: true, reason: "Can't cook Kartoffeln without one." },
      { german: 'das Rezept', belongs: true, reason: "Following Oma's Kartoffelsalat recipe." },
      { german: 'das Besteck', belongs: true, reason: "Messer, Gabel, L\u00F6ffel \u2014 the essentials." },
      { german: 'der Topf', belongs: true, reason: "You need this to boil your pasta." },
      { german: 'die Sp\u00FClmaschine', belongs: true, reason: "If your WG is lucky enough to have one!" },
      { german: 'der Teller', belongs: true, reason: "Can't eat Schnitzel off the counter." },
      { german: 'der Fahrplan', belongs: false, reason: "That's for the Bahnhof, not the kitchen!" },
      { german: 'die Tablette', belongs: false, reason: "More of an Arztpraxis thing." },
      { german: 'der Rucksack', belongs: false, reason: "Take that to the Uni, not the K\u00FCche." },
      { german: 'die Fahrkarte', belongs: false, reason: "You buy tickets at the Bahnhof." },
      { german: 'das Stethoskop', belongs: false, reason: "Leave that at the doctor's office!" },
      { german: 'der H\u00F6rsaal', belongs: false, reason: "That's a lecture hall at the Uni." },
      { german: 'der Einkaufswagen', belongs: false, reason: "That stays in the Supermarkt!" },
    ],
  },
  {
    id: 'arztpraxis',
    emoji: '\u{1F3E5}',
    german: 'Die Arztpraxis',
    english: "Doctor's Office",
    flavor: "Waiting room, clipboard forms, Dr. Schmidt will see you now.",
    words: [
      { german: 'das Rezept', belongs: true, reason: "The doctor writes you a prescription (Rezept)." },
      { german: 'die Tablette', belongs: true, reason: "Pills \u2014 the reason you're here." },
      { german: 'das Wartezimmer', belongs: true, reason: "You always wait forever in the Wartezimmer." },
      { german: 'die Versicherungskarte', belongs: true, reason: "Don't forget your insurance card!" },
      { german: 'der Termin', belongs: true, reason: "Without an appointment, good luck getting in." },
      { german: 'die Spritze', belongs: true, reason: "Nobody likes the injection, but here we are." },
      { german: 'das Fieber', belongs: true, reason: "High temperature? That's why you're visiting." },
      { german: 'der Blutdruck', belongs: true, reason: "They always check your blood pressure first." },
      { german: 'der K\u00FChlschrank', belongs: false, reason: "That belongs in the K\u00FCche, not here!" },
      { german: 'der Einkaufswagen', belongs: false, reason: "Push that through Aldi, not the clinic." },
      { german: 'das Gleis', belongs: false, reason: "Platforms are at the Bahnhof." },
      { german: 'die Pfanne', belongs: false, reason: "Cooking happens in the K\u00FCche!" },
      { german: 'die Vorlesung', belongs: false, reason: "Lectures happen at the Uni, not the doctor's." },
      { german: 'der Fernseher', belongs: false, reason: "That's Wohnzimmer territory." },
      { german: 'das Gep\u00E4ck', belongs: false, reason: "Luggage belongs at the Bahnhof." },
    ],
  },
  {
    id: 'universitaet',
    emoji: '\u{1F393}',
    german: 'Die Universit\u00E4t',
    english: 'The University',
    flavor: "Lecture hall, Mensa lunch, library all-nighters before Pr\u00FCfungen.",
    words: [
      { german: 'die Vorlesung', belongs: true, reason: "The lecture starts at 8:15 \u2014 akademisches Viertel!" },
      { german: 'der H\u00F6rsaal', belongs: true, reason: "The big lecture hall \u2014 find a seat fast." },
      { german: 'die Mensa', belongs: true, reason: "Cheap student lunch \u2014 Stammessen for \u20AC2.50!" },
      { german: 'die Bibliothek', belongs: true, reason: "Pr\u00FCfung tomorrow? Library until midnight." },
      { german: 'die Pr\u00FCfung', belongs: true, reason: "The exam everyone is stressed about." },
      { german: 'das Semester', belongs: true, reason: "Winter or summer \u2014 which Semester are you in?" },
      { german: 'der Professor', belongs: true, reason: "Herr Professor is running 10 minutes late, as usual." },
      { german: 'das Studentenwohnheim', belongs: true, reason: "Student dorm life \u2014 tiny room, shared bath." },
      { german: 'die Spritze', belongs: false, reason: "That's for the Arztpraxis!" },
      { german: 'der Herd', belongs: false, reason: "Stoves are in the K\u00FCche, not lecture halls." },
      { german: 'die Kasse', belongs: false, reason: "Checkout is at the Supermarkt." },
      { german: 'das Gleis', belongs: false, reason: "Train platforms are at the Bahnhof." },
      { german: 'die Fernbedienung', belongs: false, reason: "Remote control? That's Wohnzimmer stuff." },
      { german: 'der Blutdruck', belongs: false, reason: "Blood pressure gets checked at the Arztpraxis." },
      { german: 'die Sp\u00FClmaschine', belongs: false, reason: "Dishwashers belong in the K\u00FCche." },
    ],
  },
  {
    id: 'supermarkt',
    emoji: '\u{1F6D2}',
    german: 'Der Supermarkt',
    english: 'The Supermarket',
    flavor: "Aldi checkout, speed-scanning cashier, bring your own bag!",
    words: [
      { german: 'der Einkaufswagen', belongs: true, reason: "Grab a cart \u2014 or fight for a basket." },
      { german: 'die Kasse', belongs: true, reason: "Checkout \u2014 the cashier scans at light speed." },
      { german: 'das Angebot', belongs: true, reason: "Special offer this week \u2014 grab it!" },
      { german: 'die T\u00FCte', belongs: true, reason: "Plastic bag? That'll be \u20AC0.10 extra." },
      { german: 'das Regal', belongs: true, reason: "Which shelf has the Nutella?" },
      { german: 'der Kassenbon', belongs: true, reason: "Keep the receipt for Pf\u00E4nd returns!" },
      { german: 'die Tiefk\u00FChlkost', belongs: true, reason: "Frozen food aisle \u2014 student survival kit." },
      { german: 'das Pfand', belongs: true, reason: "Return your bottles for that sweet \u20AC0.25 refund." },
      { german: 'der H\u00F6rsaal', belongs: false, reason: "Lecture halls are at the Uni!" },
      { german: 'das Wartezimmer', belongs: false, reason: "Waiting rooms are at the Arztpraxis." },
      { german: 'die Pfanne', belongs: false, reason: "Pans belong in your K\u00FCche." },
      { german: 'der Fernseher', belongs: false, reason: "TVs stay in the Wohnzimmer." },
      { german: 'das Gleis', belongs: false, reason: "Platforms are at the Bahnhof." },
      { german: 'der Termin', belongs: false, reason: "You don't need an appointment to shop!" },
      { german: 'das Kissen', belongs: false, reason: "Pillows are Wohnzimmer comfort." },
    ],
  },
  {
    id: 'bahnhof',
    emoji: '\u{1F682}',
    german: 'Der Bahnhof',
    english: 'The Train Station',
    flavor: "Platform 7, the ICE is 20 minutes late \u2014 classic Deutsche Bahn.",
    words: [
      { german: 'der Fahrplan', belongs: true, reason: "Check the timetable \u2014 is your train late again?" },
      { german: 'die Fahrkarte', belongs: true, reason: "No ticket? That's a \u20AC60 fine from the Kontrolleur." },
      { german: 'das Gleis', belongs: true, reason: "Platform 7 \u2014 Achtung, the train is arriving!" },
      { german: 'die Durchsage', belongs: true, reason: "That announcement nobody can understand." },
      { german: 'der Automat', belongs: true, reason: "The ticket machine \u2014 in German, of course." },
      { german: 'das Gep\u00E4ck', belongs: true, reason: "Dragging your suitcase through the station." },
      { german: 'die Versp\u00E4tung', belongs: true, reason: "Delay \u2014 the most German train experience." },
      { german: 'der Schaffner', belongs: true, reason: "The conductor checks your Fahrkarte." },
      { german: 'die Mensa', belongs: false, reason: "Student cafeteria? That's at the Uni!" },
      { german: 'der Einkaufswagen', belongs: false, reason: "Shopping carts stay in the Supermarkt." },
      { german: 'die Spritze', belongs: false, reason: "Injections happen at the Arztpraxis." },
      { german: 'das Besteck', belongs: false, reason: "Cutlery belongs in the K\u00FCche." },
      { german: 'die Bibliothek', belongs: false, reason: "The library is at the Uni." },
      { german: 'das Kissen', belongs: false, reason: "Pillows are for the Wohnzimmer sofa." },
      { german: 'die Kasse', belongs: false, reason: "Checkout is at the Supermarkt." },
    ],
  },
  {
    id: 'wohnzimmer',
    emoji: '\u{1F3E0}',
    german: 'Das Wohnzimmer',
    english: 'The Living Room',
    flavor: "WG evening \u2014 Netflix, chai, and someone hogging the sofa.",
    words: [
      { german: 'der Fernseher', belongs: true, reason: "Netflix and chill \u2014 German style." },
      { german: 'die Fernbedienung', belongs: true, reason: "Where's the remote? Check under the Kissen!" },
      { german: 'das Sofa', belongs: true, reason: "The most fought-over spot in the WG." },
      { german: 'das Kissen', belongs: true, reason: "Pile up the cushions and get comfy." },
      { german: 'die Lampe', belongs: true, reason: "Mood lighting for the movie night." },
      { german: 'der Teppich', belongs: true, reason: "The rug that really ties the room together." },
      { german: 'das Regal', belongs: true, reason: "IKEA shelf with books and random stuff." },
      { german: 'die Decke', belongs: true, reason: "Blanket weather \u2014 German winters are no joke." },
      { german: 'der Fahrplan', belongs: false, reason: "Timetables are a Bahnhof thing." },
      { german: 'die Vorlesung', belongs: false, reason: "Lectures happen at the Uni!" },
      { german: 'die Tablette', belongs: false, reason: "Pills are an Arztpraxis matter." },
      { german: 'der Einkaufswagen', belongs: false, reason: "Shopping carts belong in the Supermarkt." },
      { german: 'der Topf', belongs: false, reason: "Pots go in the K\u00FCche." },
      { german: 'das Gep\u00E4ck', belongs: false, reason: "Luggage is for the Bahnhof." },
      { german: 'die Pr\u00FCfung', belongs: false, reason: "Exams are a Uni nightmare, not living room vibes." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Manglish reactions
// ---------------------------------------------------------------------------

const CORRECT_REACTIONS = [
  "Adipoli! You got it!",
  "Seri machaa! Right place!",
  "Correct! Brain is working!",
  "Nailed it! Wunderbar!",
  "Kollaam! Sharp thinking!",
  "Sheriyaayi! That's where it goes!",
];

const WRONG_REACTIONS = [
  "Aiyyo! Think about the scene again!",
  "Paravaala machaa! Tricky one!",
  "Hmm... picture the room in your head!",
  "Nope! But you'll get the next one!",
  "Close! But that word lives somewhere else.",
];

const STREAK_REACTIONS = [
  "ON FIRE machaa! Streak!",
  "Unstoppable! Adipoli streak!",
  "Combo king! Keep going!",
  "You're in the ZONE!",
];

const SCENE_INTRO_REACTIONS = [
  "New scene! Think carefully where each word belongs!",
  "Imagine you're standing right there \u2014 what would you see?",
  "Picture the place in your head... then decide!",
];

const GAME_COMPLETE_PERFECT = [
  "PERFECT SCORE! Adipoli da! You know German life!",
  "Flawless! You could navigate Germany with your eyes closed!",
  "100%! Kuttan is SO proud of you machaa!",
];

const GAME_COMPLETE_GOOD = [
  "Great run machaa! You're really learning!",
  "Solid work! German everyday life is getting clearer!",
  "Nice! A few tricky ones, but you handled it well!",
];

const GAME_COMPLETE_OK = [
  "Good effort! Each mistake = a lesson learned!",
  "Paravaala! Play again and you'll smash it!",
  "Not bad! The tricky words won't fool you next time!",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------------
// Difficulty helpers
// ---------------------------------------------------------------------------

/** Pick 10 words from a scene's 15. Difficulty controls ambiguity mix. */
function pickWords(scene: Scene, difficulty: 'easy' | 'medium' | 'hard'): SceneWord[] {
  const belongs = shuffleArray(scene.words.filter(w => w.belongs));
  const doesnt = shuffleArray(scene.words.filter(w => !w.belongs));

  // Easy: 6 belong + 4 don't (clear-cut)
  // Medium: 5 belong + 5 don't
  // Hard: 4 belong + 6 don't (more negatives to trip you up)
  const bCount = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 5 : 4;
  const dCount = 10 - bCount;

  const picked = [
    ...belongs.slice(0, bCount),
    ...doesnt.slice(0, dCount),
  ];

  return shuffleArray(picked);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type GamePhase = 'intro' | 'scene-intro' | 'playing' | 'feedback' | 'scene-summary' | 'complete';

interface RoundResult {
  word: SceneWord;
  playerSaidBelongs: boolean;
  correct: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SceneSortGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  // --- game config ---
  const SCENES_PER_GAME = 3;
  const WORDS_PER_SCENE = 10;
  const TOTAL_TIME = 45; // seconds per scene

  // --- state ---
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [gameScenes, setGameScenes] = useState<Scene[]>([]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [sceneWords, setSceneWords] = useState<SceneWord[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // per-answer feedback
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  // scene results
  const [sceneResults, setSceneResults] = useState<RoundResult[]>([]);
  const [allResults, setAllResults] = useState<RoundResult[]>([]);

  // character
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [kuttanMessage, setKuttanMessage] = useState('');

  // celebration
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXPGain, setShowXPGain] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  // swipe tracking
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);

  // timer ref
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ---------------------------------------------------------------------------
  // Init game: pick 3 random scenes, assign difficulties
  // ---------------------------------------------------------------------------
  const initGame = useCallback(() => {
    const picked = shuffleArray(SCENES).slice(0, SCENES_PER_GAME);
    setGameScenes(picked);
    setSceneIndex(0);
    setWordIndex(0);
    setScore(0);
    setMistakes(0);
    setStreak(0);
    setBestStreak(0);
    setAllResults([]);
    setSceneResults([]);
    setLastResult(null);
    setShowConfetti(false);
    setShowXPGain(false);
    setSwipeDir(null);
    setPhase('intro');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  // Prepare words when scene changes
  const currentScene = gameScenes[sceneIndex] ?? null;

  const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];

  useEffect(() => {
    if (currentScene && phase === 'scene-intro') {
      const diff = difficulties[sceneIndex] ?? 'medium';
      const words = pickWords(currentScene, diff);
      setSceneWords(words);
      setWordIndex(0);
      setSceneResults([]);
      setTimeLeft(TOTAL_TIME);
      setLastResult(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScene?.id, phase]);

  // ---------------------------------------------------------------------------
  // Timer
  // ---------------------------------------------------------------------------
  const isTimerActive = phase === 'playing' || phase === 'feedback';

  useEffect(() => {
    if (isTimerActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTimerActive]);

  // When time runs out, advance to scene summary
  useEffect(() => {
    if (timeLeft === 0 && (phase === 'playing' || phase === 'feedback')) {
      setKuttanMood('sad');
      setKuttanMessage("Time's up for this scene! Let's see how you did.");
      finishScene();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  // ---------------------------------------------------------------------------
  // Game actions
  // ---------------------------------------------------------------------------

  const startGame = () => {
    setPhase('scene-intro');
    setKuttanMood('excited');
    setKuttanMessage(pickRandom(SCENE_INTRO_REACTIONS));
  };

  const startScene = () => {
    setPhase('playing');
  };

  const currentWord = sceneWords[wordIndex] ?? null;

  const handleAnswer = useCallback((playerSaidBelongs: boolean) => {
    if (!currentWord || phase !== 'playing') return;

    const correct = playerSaidBelongs === currentWord.belongs;
    const result: RoundResult = { word: currentWord, playerSaidBelongs, correct };

    if (correct) {
      setScore(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      if (newStreak >= 3) {
        setKuttanMood('celebrating');
        setKuttanMessage(pickRandom(STREAK_REACTIONS));
      } else {
        setKuttanMood('happy');
        setKuttanMessage(pickRandom(CORRECT_REACTIONS));
      }
    } else {
      setMistakes(prev => prev + 1);
      setStreak(0);
      setKuttanMood('thinking');
      setKuttanMessage(pickRandom(WRONG_REACTIONS));
    }

    setLastResult(result);
    setSceneResults(prev => [...prev, result]);
    setAllResults(prev => [...prev, result]);
    setPhase('feedback');
  }, [currentWord, phase, streak, bestStreak]);

  const nextWord = useCallback(() => {
    if (wordIndex + 1 >= sceneWords.length) {
      finishScene();
    } else {
      setWordIndex(prev => prev + 1);
      setLastResult(null);
      setSwipeDir(null);
      setPhase('playing');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex, sceneWords.length]);

  const finishScene = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('scene-summary');
  };

  const nextScene = () => {
    if (sceneIndex + 1 >= SCENES_PER_GAME) {
      endGame();
    } else {
      setSceneIndex(prev => prev + 1);
      setPhase('scene-intro');
      setKuttanMood('excited');
      setKuttanMessage(pickRandom(SCENE_INTRO_REACTIONS));
    }
  };

  const endGame = () => {
    setPhase('complete');
    incrementGamesPlayed();

    const totalWords = WORDS_PER_SCENE * SCENES_PER_GAME;
    const accuracy = totalWords > 0 ? score / totalWords : 0;
    const xp = Math.max(10, Math.round(score * 3 + bestStreak * 2 + (accuracy >= 0.9 ? 15 : accuracy >= 0.7 ? 8 : 0)));
    setEarnedXP(xp);
    addXP(xp);
    setShowConfetti(true);
    setShowXPGain(true);

    if (accuracy >= 0.95) {
      setKuttanMood('celebrating');
      setKuttanMessage(pickRandom(GAME_COMPLETE_PERFECT));
    } else if (accuracy >= 0.7) {
      setKuttanMood('happy');
      setKuttanMessage(pickRandom(GAME_COMPLETE_GOOD));
    } else {
      setKuttanMood('thinking');
      setKuttanMessage(pickRandom(GAME_COMPLETE_OK));
    }
  };

  // ---------------------------------------------------------------------------
  // Swipe handling
  // ---------------------------------------------------------------------------
  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number } }) => {
    const threshold = 80;
    if (info.offset.x > threshold) {
      setSwipeDir('right');
      handleAnswer(true); // swipe right = belongs
    } else if (info.offset.x < -threshold) {
      setSwipeDir('left');
      handleAnswer(false); // swipe left = wrong place
    }
  };

  // ---------------------------------------------------------------------------
  // Derived values
  // ---------------------------------------------------------------------------
  const totalAnswered = allResults.length;
  const totalWords = WORDS_PER_SCENE * SCENES_PER_GAME;
  const overallProgress = totalWords > 0 ? (totalAnswered / totalWords) * 100 : 0;
  const sceneCorrect = sceneResults.filter(r => r.correct).length;
  const sceneTotal = sceneResults.length;
  const overallAccuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto relative overflow-hidden">
      <Confetti isActive={showConfetti} />
      <XPGain amount={earnedXP} isVisible={showXPGain} onComplete={() => setShowXPGain(false)} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push('/games')}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {(phase === 'playing' || phase === 'feedback') && (
          <div className="flex items-center gap-3">
            {/* Scene counter */}
            <div className="glass-card px-3 py-1.5 text-xs text-[var(--foreground)]/60">
              Scene {sceneIndex + 1}/{SCENES_PER_GAME}
            </div>
            {/* Timer */}
            <div className="glass-card px-3 py-1.5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ffd93d]" />
              <span className={`font-bold text-sm ${timeLeft <= 10 ? 'text-[#e94560] animate-pulse' : 'text-[var(--foreground)]'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ================================================================= */}
        {/* INTRO SCREEN                                                      */}
        {/* ================================================================= */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6">
              <CharacterGuide
                messages="Scene Sort! Imagine real places in Germany \u2014 does each word belong there or not? Think before you tap!"
                mood="excited"
                size="md"
                showAppu={false}
                autoAdvanceMs={5000}
              />
            </div>

            <div className="glass-card p-6 w-full text-center">
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                Scene Sort
              </h1>
              <p className="text-[var(--foreground)]/60 mb-2 text-sm">
                Where does this word belong? Think about real German life!
              </p>
              <p className="text-[var(--foreground)]/40 mb-6 text-xs">
                Words appear one at a time. Decide if each word belongs in the scene or not.
                Swipe right or tap green for &quot;Belongs&quot;, swipe left or tap red for &quot;Wrong place&quot;.
              </p>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--foreground)]/50">
                <span className="flex items-center gap-1.5 glass-card px-3 py-1.5">
                  <Clock className="w-4 h-4 text-[#ffd93d]" /> 45s per scene
                </span>
                <span className="flex items-center gap-1.5 glass-card px-3 py-1.5">
                  <Zap className="w-4 h-4 text-[#00d9a5]" /> 3 scenes
                </span>
              </div>

              {/* Scene preview */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {gameScenes.map((scene, i) => (
                  <div key={scene.id} className="glass-card p-3 text-center">
                    <div className="text-2xl mb-1">{scene.emoji}</div>
                    <div className="text-xs font-medium text-[var(--foreground)]/70">{scene.german}</div>
                    <div className="text-[10px] text-[var(--foreground)]/40">{scene.english}</div>
                  </div>
                ))}
              </div>

              <Button onClick={startGame} size="lg" fullWidth>
                Start Game
              </Button>
            </div>
          </motion.div>
        )}

        {/* ================================================================= */}
        {/* SCENE INTRO                                                       */}
        {/* ================================================================= */}
        {phase === 'scene-intro' && currentScene && (
          <motion.div
            key={`scene-intro-${sceneIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6">
              <CharacterGuide
                messages={kuttanMessage}
                mood={kuttanMood}
                size="sm"
                showAppu={false}
                autoAdvanceMs={3000}
              />
            </div>

            <div className="glass-card p-6 w-full text-center">
              <div className="text-5xl mb-4">{currentScene.emoji}</div>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                {currentScene.german}
              </h2>
              <p className="text-sm text-[#ffd93d] mb-3">{currentScene.english}</p>
              <p className="text-[var(--foreground)]/50 text-xs mb-6 italic">
                {currentScene.flavor}
              </p>

              <div className="flex items-center justify-center gap-2 mb-4 text-xs text-[var(--foreground)]/40">
                <span className="glass-card px-2 py-1">
                  Scene {sceneIndex + 1} of {SCENES_PER_GAME}
                </span>
                <span className="glass-card px-2 py-1">
                  {difficulties[sceneIndex] === 'easy' ? 'Warm-up' : difficulties[sceneIndex] === 'medium' ? 'Getting tricky' : 'Expert mode'}
                </span>
              </div>

              <Button onClick={startScene} size="lg" fullWidth>
                Ready!
              </Button>
            </div>
          </motion.div>
        )}

        {/* ================================================================= */}
        {/* PLAYING / FEEDBACK                                                */}
        {/* ================================================================= */}
        {(phase === 'playing' || phase === 'feedback') && currentScene && (
          <motion.div
            key={`playing-${sceneIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Kuttan reaction bar */}
            <AnimatePresence mode="wait">
              {kuttanMessage && (
                <motion.div
                  key={kuttanMessage}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="mb-3"
                >
                  <CharacterGuide
                    messages={kuttanMessage}
                    mood={kuttanMood}
                    size="sm"
                    layout="horizontal"
                    showAppu={false}
                    autoAdvanceMs={2500}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-[var(--foreground)]/50 text-xs">Overall Progress</span>
                <span className="font-medium text-[var(--foreground)]/80 text-xs">{totalAnswered}/{totalWords} words</span>
              </div>
              <ProgressBar progress={overallProgress} color="success" size="md" />
            </div>

            {/* Score + streak row */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="glass-card px-3 py-1.5 text-center">
                <div className="text-lg font-bold text-[#00d9a5]">{score}</div>
                <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Correct</div>
              </div>
              <AnimatePresence>
                {streak >= 3 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="glass-card px-3 py-1.5 text-center border border-[#ffd93d]/30"
                  >
                    <div className="text-lg font-bold text-[#ffd93d]">{streak}x</div>
                    <div className="text-[10px] text-[#ffd93d]/70 uppercase tracking-wide">Streak</div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="glass-card px-3 py-1.5 text-center">
                <div className="text-lg font-bold text-[#e94560]">{mistakes}</div>
                <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Mistakes</div>
              </div>
            </div>

            {/* Scene banner */}
            <div className="glass-card p-3 mb-5 flex items-center gap-3 border border-[#ffd93d]/20">
              <span className="text-3xl">{currentScene.emoji}</span>
              <div>
                <div className="font-bold text-[var(--foreground)] text-sm">{currentScene.german}</div>
                <div className="text-[var(--foreground)]/50 text-xs">{currentScene.flavor}</div>
              </div>
              <div className="ml-auto text-xs text-[var(--foreground)]/40">
                {wordIndex + (phase === 'feedback' ? 1 : 0)}/{WORDS_PER_SCENE}
              </div>
            </div>

            {/* Word card area */}
            <div className="flex flex-col items-center min-h-[220px] justify-center">
              <AnimatePresence mode="wait">
                {phase === 'playing' && currentWord && (
                  <motion.div
                    key={`word-${sceneIndex}-${wordIndex}`}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={
                      swipeDir === 'right'
                        ? { x: 300, opacity: 0, rotate: 15 }
                        : swipeDir === 'left'
                        ? { x: -300, opacity: 0, rotate: -15 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.8}
                    onDragEnd={handleDragEnd}
                    className="glass-card p-8 w-full max-w-sm text-center cursor-grab active:cursor-grabbing select-none border border-[var(--foreground)]/10"
                  >
                    <p className="text-[var(--foreground)]/40 text-xs uppercase tracking-wider mb-3">
                      Does this belong in {currentScene.german}?
                    </p>
                    <p className="text-2xl font-bold text-[var(--foreground)] mb-2">
                      {currentWord.german}
                    </p>
                    <p className="text-xs text-[var(--foreground)]/30 mt-4">
                      Swipe or tap below
                    </p>
                  </motion.div>
                )}

                {phase === 'feedback' && lastResult && (
                  <motion.div
                    key={`feedback-${sceneIndex}-${wordIndex}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`glass-card p-6 w-full max-w-sm text-center border ${
                      lastResult.correct
                        ? 'border-[#00d9a5]/40 bg-[#00d9a5]/5'
                        : 'border-[#e94560]/40 bg-[#e94560]/5'
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        lastResult.correct
                          ? 'bg-[#00d9a5]/20 text-[#00d9a5]'
                          : 'bg-[#e94560]/20 text-[#e94560]'
                      }`}
                    >
                      {lastResult.correct
                        ? <Check className="w-7 h-7" />
                        : <X className="w-7 h-7" />
                      }
                    </motion.div>

                    <p className="text-lg font-bold text-[var(--foreground)] mb-1">
                      {lastResult.word.german}
                    </p>

                    <p className={`text-sm font-semibold mb-2 ${
                      lastResult.correct ? 'text-[#00d9a5]' : 'text-[#e94560]'
                    }`}>
                      {lastResult.correct
                        ? (lastResult.word.belongs ? 'Correct! It belongs here.' : "Correct! It doesn't belong here.")
                        : (lastResult.word.belongs ? "Oops! It DOES belong here." : "Oops! It DOESN'T belong here.")
                      }
                    </p>

                    <p className="text-xs text-[var(--foreground)]/60 italic mb-4">
                      {lastResult.word.reason}
                    </p>

                    <Button onClick={nextWord} size="md" fullWidth>
                      {wordIndex + 1 >= sceneWords.length ? 'See Results' : 'Next Word'}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action buttons (only during playing phase) */}
            {phase === 'playing' && currentWord && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => { setSwipeDir('left'); handleAnswer(false); }}
                  className="flex flex-col items-center gap-1.5 px-8 py-4 rounded-2xl bg-[#e94560]/15 border-2 border-[#e94560]/40 hover:border-[#e94560] transition-all group"
                >
                  <X className="w-7 h-7 text-[#e94560] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-[#e94560]">Wrong place</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => { setSwipeDir('right'); handleAnswer(true); }}
                  className="flex flex-col items-center gap-1.5 px-8 py-4 rounded-2xl bg-[#00d9a5]/15 border-2 border-[#00d9a5]/40 hover:border-[#00d9a5] transition-all group"
                >
                  <Check className="w-7 h-7 text-[#00d9a5] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-[#00d9a5]">Belongs here</span>
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {/* ================================================================= */}
        {/* SCENE SUMMARY                                                     */}
        {/* ================================================================= */}
        {phase === 'scene-summary' && currentScene && (
          <motion.div
            key={`summary-${sceneIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <div className="glass-card p-6 w-full">
              <div className="text-center mb-4">
                <span className="text-4xl mb-2 block">{currentScene.emoji}</span>
                <h2 className="text-xl font-bold text-[var(--foreground)]">{currentScene.german}</h2>
                <p className="text-sm text-[#ffd93d]">{currentScene.english}</p>
              </div>

              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="glass-card px-4 py-2 text-center">
                  <div className="text-xl font-bold text-[#00d9a5]">{sceneCorrect}</div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Correct</div>
                </div>
                <div className="glass-card px-4 py-2 text-center">
                  <div className="text-xl font-bold text-[#e94560]">{sceneTotal - sceneCorrect}</div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Wrong</div>
                </div>
                <div className="glass-card px-4 py-2 text-center">
                  <div className="text-xl font-bold text-[var(--foreground)]/70">
                    {sceneTotal > 0 ? Math.round((sceneCorrect / sceneTotal) * 100) : 0}%
                  </div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Accuracy</div>
                </div>
              </div>

              {/* Missed words review */}
              {sceneResults.filter(r => !r.correct).length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-semibold text-[var(--foreground)]/60 mb-2 uppercase tracking-wider">Review mistakes:</p>
                  <div className="space-y-2">
                    {sceneResults.filter(r => !r.correct).map((r, i) => (
                      <div
                        key={i}
                        className="glass-card p-3 flex items-start gap-3 border border-[#e94560]/20"
                      >
                        <span className={`text-lg mt-0.5 ${r.word.belongs ? 'text-[#00d9a5]' : 'text-[#e94560]'}`}>
                          {r.word.belongs ? '\u2705' : '\u274C'}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-[var(--foreground)]">{r.word.german}</p>
                          <p className="text-xs text-[var(--foreground)]/50 italic">{r.word.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button onClick={nextScene} size="lg" fullWidth>
                {sceneIndex + 1 >= SCENES_PER_GAME ? 'See Final Results' : 'Next Scene'}
              </Button>
            </div>
          </motion.div>
        )}

        {/* ================================================================= */}
        {/* GAME COMPLETE                                                     */}
        {/* ================================================================= */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6">
              <CharacterGuide
                messages={kuttanMessage}
                mood={kuttanMood}
                size="md"
                showAppu={score >= totalWords * 0.8}
                appuMood="celebrating"
                autoAdvanceMs={5000}
              />
            </div>

            <div className="glass-card p-6 w-full text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-gradient-to-br from-[#ffd93d] to-[#d4a520] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,217,61,0.3)]"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>

              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                {score >= totalWords * 0.95
                  ? 'Perfect Scene Sort!'
                  : score >= totalWords * 0.7
                  ? 'Great Sorting!'
                  : 'Scene Sort Complete'}
              </h1>
              <p className="text-[var(--foreground)]/60 mb-6 text-sm">
                {score >= totalWords * 0.95
                  ? `${score}/${totalWords} correct \u2014 you really know German life!`
                  : `${score}/${totalWords} correct across ${SCENES_PER_GAME} scenes.`}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="glass-card p-3">
                  <div className="text-xl font-bold text-[#00d9a5]">{score}/{totalWords}</div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Correct</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-xl font-bold text-[#e94560]">{mistakes}</div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Mistakes</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-xl font-bold text-[#ffd93d]">+{earnedXP}</div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">XP Earned</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="glass-card p-3">
                  <div className="text-lg font-bold text-[var(--foreground)]/80">
                    <Zap className="w-4 h-4 inline mr-1 text-[#ffd93d]" />
                    {bestStreak}x
                  </div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Best Streak</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-lg font-bold text-[var(--foreground)]/80">
                    <Zap className="w-4 h-4 inline mr-1 text-[#00d9a5]" />
                    {overallAccuracy}%
                  </div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Accuracy</div>
                </div>
              </div>

              {/* Per-scene breakdown */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider mb-2">Scene Breakdown</p>
                <div className="space-y-2">
                  {gameScenes.map((scene, i) => {
                    const sceneR = allResults.slice(i * WORDS_PER_SCENE, (i + 1) * WORDS_PER_SCENE);
                    const correct = sceneR.filter(r => r.correct).length;
                    const total = sceneR.length;
                    return (
                      <div key={scene.id} className="glass-card p-3 flex items-center gap-3">
                        <span className="text-xl">{scene.emoji}</span>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium text-[var(--foreground)]">{scene.german}</div>
                          <div className="text-[10px] text-[var(--foreground)]/40">{scene.english}</div>
                        </div>
                        <div className={`text-sm font-bold ${
                          total > 0 && correct / total >= 0.8 ? 'text-[#00d9a5]' : correct / total >= 0.5 ? 'text-[#ffd93d]' : 'text-[#e94560]'
                        }`}>
                          {correct}/{total}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={() => { initGame(); }} fullWidth>
                  <RefreshCw className="w-5 h-5" />
                  Play Again
                </Button>
                <Button variant="ghost" onClick={() => router.push('/games')} fullWidth>
                  Back to Games
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
