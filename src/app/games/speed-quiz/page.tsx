'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, RefreshCw, Clock, Zap } from 'lucide-react';
import { CharacterGuide } from '@/components/character';
import { Confetti, Stars } from '@/components/game';
import { useGameStore } from '@/lib/store';

// ─── Situation-based questions ─────────────────────────────
// Every question is a REAL scenario. No bare translation.

interface Situation {
  /** Scene-setting context */
  scene: string;
  /** What someone says or what you see/read */
  prompt: string;
  /** The question to answer */
  question: string;
  /** Correct response */
  answer: string;
  /** Plausible wrong answers that teach something */
  distractors: string[];
  /** Why the answer is right (shown on wrong) */
  explanation: string;
  /** Difficulty: 1=easy, 2=medium, 3=hard */
  difficulty: 1 | 2 | 3;
}

const SITUATIONS: Situation[] = [
  // ─── Easy (1) — greetings, basics, simple responses ───
  {
    scene: "It's 9 AM. You walk into the office.",
    prompt: "Your colleague waves and says 'Guten Morgen!'",
    question: "How do you respond?",
    answer: "Guten Morgen!",
    distractors: ["Guten Abend!", "Gute Nacht!", "Tschüss!"],
    explanation: "'Guten Morgen' = Good morning. Used until about noon.",
    difficulty: 1,
  },
  {
    scene: "You're at the Bäckerei (bakery) counter.",
    prompt: "The baker asks: 'Was möchten Sie?'",
    question: "What is she asking?",
    answer: "What would you like?",
    distractors: ["Where are you from?", "How are you?", "What's your name?"],
    explanation: "'Was möchten Sie?' = What would you like? Standard service question.",
    difficulty: 1,
  },
  {
    scene: "Your German teacher introduces herself.",
    prompt: "She says: 'Ich heiße Frau Müller.'",
    question: "What did she just do?",
    answer: "Told you her name",
    distractors: ["Asked your name", "Said goodbye", "Asked where you're from"],
    explanation: "'Ich heiße...' = My name is... / I'm called...",
    difficulty: 1,
  },
  {
    scene: "You're leaving a shop.",
    prompt: "The cashier says: 'Auf Wiedersehen!'",
    question: "What should you say back?",
    answer: "Auf Wiedersehen!",
    distractors: ["Entschuldigung!", "Wie bitte?", "Bitte schön!"],
    explanation: "'Auf Wiedersehen' = Goodbye (formal). Always say it back — it's rude not to in Germany!",
    difficulty: 1,
  },
  {
    scene: "You bump into someone at the U-Bahn station.",
    prompt: "You accidentally step on their foot.",
    question: "What do you say?",
    answer: "Entschuldigung!",
    distractors: ["Danke!", "Bitte!", "Tschüss!"],
    explanation: "'Entschuldigung!' = Excuse me / I'm sorry. Essential survival word.",
    difficulty: 1,
  },
  {
    scene: "At a café with your Tandempartner.",
    prompt: "They ask: 'Woher kommst du?'",
    question: "What are they asking?",
    answer: "Where are you from?",
    distractors: ["Where are you going?", "What do you do?", "How old are you?"],
    explanation: "'Woher kommst du?' = Where do you come from? A very common question for internationals.",
    difficulty: 1,
  },
  {
    scene: "Someone holds the door open for you.",
    prompt: "They smile and wait.",
    question: "What do you say?",
    answer: "Danke!",
    distractors: ["Bitte!", "Hallo!", "Tschüss!"],
    explanation: "'Danke' = Thank you. 'Bitte' = Please / You're welcome.",
    difficulty: 1,
  },
  {
    scene: "At a restaurant, the waiter brings your food.",
    prompt: "He places the plate and says: 'Bitte schön!'",
    question: "What does this mean here?",
    answer: "Here you go! / There you are!",
    distractors: ["You're welcome!", "Please sit down!", "What would you like?"],
    explanation: "'Bitte schön' means different things in context. When giving something = 'Here you are.'",
    difficulty: 1,
  },

  // ─── Medium (2) — understanding situations, functional German ───
  {
    scene: "You're at the Ausländerbehörde (immigration office).",
    prompt: "The officer says: 'Ihren Reisepass, bitte.'",
    question: "What does he want?",
    answer: "Your passport",
    distractors: ["Your phone number", "Your address", "Your ticket"],
    explanation: "'Reisepass' = passport. 'Ihren' = your (formal accusative). You'll hear this A LOT.",
    difficulty: 2,
  },
  {
    scene: "Your WG (shared flat) mate left a note on the fridge.",
    prompt: "The note says: 'Kein Brot mehr. Kannst du welches kaufen?'",
    question: "What are they asking you to do?",
    answer: "Buy bread",
    distractors: ["Clean the kitchen", "Pay the rent", "Take out the trash"],
    explanation: "'Kein Brot mehr' = No more bread. 'Kannst du welches kaufen?' = Can you buy some?",
    difficulty: 2,
  },
  {
    scene: "You're looking for Platform 7 at Frankfurt Hauptbahnhof.",
    prompt: "You ask someone: 'Wo ist Gleis sieben?'",
    question: "They point and say: 'Gehen Sie geradeaus, dann links.'",
    answer: "Go straight, then left",
    distractors: ["Go right, then straight", "Take the elevator up", "It's behind you"],
    explanation: "'Geradeaus' = straight ahead. 'Links' = left. 'Rechts' = right. Navigation essentials!",
    difficulty: 2,
  },
  {
    scene: "You're at a house party. Someone offers you a beer.",
    prompt: "They ask: 'Möchtest du ein Bier?'",
    question: "You don't drink. How do you politely decline?",
    answer: "Nein, danke. Ich trinke kein Bier.",
    distractors: ["Ja bitte, sehr gern!", "Ich verstehe nicht.", "Tschüss!"],
    explanation: "'Ich trinke kein Bier' = I don't drink beer. 'Nein, danke' = No, thanks. Always polite.",
    difficulty: 2,
  },
  {
    scene: "You're calling to book a doctor's appointment.",
    prompt: "Receptionist: 'Wann passt es Ihnen?'",
    question: "What is she asking?",
    answer: "When suits you?",
    distractors: ["What's your name?", "What insurance do you have?", "What's wrong?"],
    explanation: "'Wann passt es Ihnen?' = When does it suit you? / When works for you?",
    difficulty: 2,
  },
  {
    scene: "You got an email from your landlord.",
    prompt: "Subject: 'Ihre Miete ist überfällig'",
    question: "What's the problem?",
    answer: "Your rent is overdue",
    distractors: ["Your lease is ending", "Maintenance is coming", "A package arrived"],
    explanation: "'Miete' = rent. 'Überfällig' = overdue. Not an email you want to get!",
    difficulty: 2,
  },
  {
    scene: "At the Mensa (university canteen), you point at a dish.",
    prompt: "You ask: 'Was ist das?' The server says: 'Das ist Kartoffelsuppe.'",
    question: "What is it?",
    answer: "Potato soup",
    distractors: ["Chicken curry", "Tomato salad", "Bread roll"],
    explanation: "'Kartoffel' = potato. 'Suppe' = soup. German loves compound words!",
    difficulty: 2,
  },
  {
    scene: "Your German friend invites you out.",
    prompt: "Text: 'Hast du morgen Abend Zeit? Wir gehen ins Kino.'",
    question: "What's the plan?",
    answer: "Going to the cinema tomorrow evening",
    distractors: ["Having dinner tonight", "Meeting at the library", "Going shopping this weekend"],
    explanation: "'Morgen Abend' = tomorrow evening. 'Kino' = cinema. 'Hast du Zeit?' = Do you have time?",
    difficulty: 2,
  },

  // ─── Hard (3) — nuance, culture, tricky German ───
  {
    scene: "It's 2 PM. Your German colleague greets you.",
    prompt: "He says: 'Mahlzeit!'",
    question: "What does this greeting mean around lunchtime?",
    answer: "Enjoy your meal / lunchtime greeting",
    distractors: ["Good morning", "See you later", "Happy birthday"],
    explanation: "'Mahlzeit!' is a uniquely German greeting used around lunchtime. It literally means 'mealtime' and is both a greeting and a wish to enjoy your meal.",
    difficulty: 3,
  },
  {
    scene: "You're at a German birthday party.",
    prompt: "The birthday person hasn't arrived yet. Someone says: 'Man soll nicht vor dem Geburtstag gratulieren!'",
    question: "What's the cultural rule?",
    answer: "Don't wish happy birthday before the actual day",
    distractors: ["Don't bring gifts to the party", "Don't sing before cutting the cake", "Don't arrive before the host"],
    explanation: "In Germany, wishing someone happy birthday BEFORE their birthday is considered bad luck! This is taken very seriously.",
    difficulty: 3,
  },
  {
    scene: "You're filling out a form at the Bürgeramt.",
    prompt: "The form asks: 'Familienstand'",
    question: "What information do they want?",
    answer: "Marital status",
    distractors: ["Family name", "Number of children", "Home address"],
    explanation: "'Familienstand' = marital status (ledig/single, verheiratet/married, geschieden/divorced). Very common on German forms.",
    difficulty: 3,
  },
  {
    scene: "Sunday afternoon. You start mowing your lawn.",
    prompt: "Your neighbor comes out looking angry and says: 'Es ist Sonntag!'",
    question: "Why is the neighbor upset?",
    answer: "Loud activities are forbidden on Sundays in Germany",
    distractors: ["They want to use the lawnmower too", "It's going to rain", "The grass is too short"],
    explanation: "'Sonntagsruhe' (Sunday rest) is a real law. No loud activities (mowing, drilling, loud music) on Sundays. Germans take this VERY seriously.",
    difficulty: 3,
  },
  {
    scene: "Your German friend says they're bringing 'Abendbrot'.",
    prompt: "They arrive with bread, cheese, and cold cuts.",
    question: "What is 'Abendbrot'?",
    answer: "A cold evening meal (bread with toppings)",
    distractors: ["A fancy dinner party", "Breakfast bread", "A type of cake"],
    explanation: "'Abendbrot' (evening bread) is the typical German dinner — not cooked! Just bread with Aufschnitt (cold cuts), cheese, and maybe Gurken (pickles).",
    difficulty: 3,
  },
  {
    scene: "At a store, something costs €7.50.",
    prompt: "The cashier says: 'Sieben fünfzig.'",
    question: "How much did she say?",
    answer: "€7.50",
    distractors: ["€75.00", "€17.50", "€57.00"],
    explanation: "Germans say prices as 'sieben fünfzig' (seven fifty) dropping the 'Euro'. This trips up many learners!",
    difficulty: 3,
  },
  {
    scene: "Someone asks you: 'Hast du einen Kater?'",
    prompt: "You look confused. They laugh.",
    question: "What are they asking about?",
    answer: "If you have a hangover",
    distractors: ["If you have a cat", "If you have a car", "If you have a cold"],
    explanation: "'Kater' literally means 'male cat' but idiomatically means 'hangover'! 'Einen Kater haben' = to have a hangover. German is full of surprises!",
    difficulty: 3,
  },
  {
    scene: "Your boss sends a meeting invite for '14:30 Uhr'.",
    prompt: "You need to be there on time.",
    question: "What time is the meeting?",
    answer: "2:30 PM",
    distractors: ["4:30 PM", "2:00 PM", "12:30 PM"],
    explanation: "Germany uses 24-hour time officially. 14:30 = 2:30 PM. Always subtract 12 from hours above 12.",
    difficulty: 3,
  },
  {
    scene: "You receive a letter saying 'Anmeldung erforderlich'.",
    prompt: "You just moved to a new city.",
    question: "What must you do?",
    answer: "Register your address at the city office",
    distractors: ["Pay a fine", "Get a new phone number", "Apply for a work permit"],
    explanation: "'Anmeldung' = registration. In Germany, you MUST register your address within 2 weeks of moving. No Anmeldung = no bank account, no phone contract, no nothing!",
    difficulty: 3,
  },
  {
    scene: "At a business dinner, everyone raises their glass.",
    prompt: "Someone says 'Prost!' and looks you directly in the eyes.",
    question: "Why the eye contact?",
    answer: "It's rude NOT to make eye contact when toasting in Germany",
    distractors: ["They're checking if you're drunk", "It's just a coincidence", "They want to talk to you"],
    explanation: "In Germany, you MUST make eye contact during 'Prost!' (cheers). Not doing so supposedly means 7 years of bad... well, let's just say it's important!",
    difficulty: 3,
  },
  {
    scene: "You see a sign on a shop: 'Ruhetag: Mittwoch'",
    prompt: "It's Wednesday and the door is locked.",
    question: "What does the sign mean?",
    answer: "Closed on Wednesdays (rest day)",
    distractors: ["Open only on Wednesday", "Renovating until Wednesday", "Special discount on Wednesday"],
    explanation: "'Ruhetag' = rest day / day off. Many smaller German shops and restaurants have a 'Ruhetag' — usually Monday or Wednesday.",
    difficulty: 3,
  },
];

// ─── Manglish reactions ─────────────────────────────────────
const CORRECT_REACTIONS = [
  "Seri! That's exactly right!",
  "Adipoli! You'd survive in Germany! 🇩🇪",
  "Richtig machane!",
  "Super! You're getting it!",
  "Nailed it da! 🎯",
];
const WRONG_REACTIONS = [
  "Aiyyo! Germany would confuse you there...",
  "Not quite — but now you know!",
  "Paravaala! This is how you learn!",
  "Hmm, tricky one! Read the explanation 👀",
];
const STREAK_REACTIONS = [
  "ON FIRE! You're basically German now! 🔥",
  "Unstoppable machane!",
  "Germany is calling YOUR name!",
  "Absolute beast mode! ✈️",
];

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

interface Question {
  situation: Situation;
  options: string[];
}

export default function SpeedQuizGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [reactionText, setReactionText] = useState('');
  const [kuttanMood, setKuttanMood] = useState<'excited' | 'happy' | 'thinking' | 'celebrating' | 'sad'>('excited');
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateQuestions = useCallback(() => {
    // Pick 5 easy, 5 medium, 5 hard — progressive difficulty
    const easy = shuffleArray(SITUATIONS.filter(s => s.difficulty === 1)).slice(0, 5);
    const medium = shuffleArray(SITUATIONS.filter(s => s.difficulty === 2)).slice(0, 5);
    const hard = shuffleArray(SITUATIONS.filter(s => s.difficulty === 3)).slice(0, 5);
    const selected = [...easy, ...medium, ...hard];

    const qs: Question[] = selected.map(sit => ({
      situation: sit,
      options: shuffleArray([sit.answer, ...sit.distractors]),
    }));

    setQuestions(qs);
  }, []);

  useEffect(() => { generateQuestions(); }, [generateQuestions]);

  useEffect(() => {
    if (gameState === 'playing' && !showResult) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [gameState, showResult, currentQuestion]);

  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing') endGame();
  }, [timeLeft, gameState]); // eslint-disable-line

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(45);
    setSelectedAnswer(null);
    setShowResult(false);
    setKuttanMood('thinking');
    setReactionText('');
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('complete');
    incrementGamesPlayed();
    const earnedXP = score * 6 + maxStreak * 4;
    addXP(earnedXP);
    const pct = questions.length > 0 ? (score / questions.length) * 100 : 0;
    if (pct > 80) { setKuttanMood('celebrating'); setShowConfetti(true); }
    else if (pct >= 50) setKuttanMood('happy');
    else setKuttanMood('sad');
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedAnswer(answer);
    setShowResult(true);

    const correct = answer === questions[currentQuestion].situation.answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setTimeLeft(prev => Math.min(prev + 3, 45));
      setKuttanMood('happy');
      setReactionText(newStreak >= 3 ? pickRandom(STREAK_REACTIONS) : pickRandom(CORRECT_REACTIONS));
    } else {
      setStreak(0);
      setKuttanMood('sad');
      setReactionText(pickRandom(WRONG_REACTIONS));
    }

    const delay = correct ? 1200 : 2500; // Longer for wrong — let them read explanation
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setKuttanMood('thinking');
        setReactionText('');
      } else {
        endGame();
      }
    }, delay);
  };

  const currentQ = questions[currentQuestion];
  const timerPct = (timeLeft / 45) * 100;
  const scorePct = questions.length > 0 ? (score / questions.length) * 100 : 0;
  const difficultyLabel = currentQ?.situation.difficulty === 1 ? 'Easy' : currentQ?.situation.difficulty === 2 ? 'Medium' : 'Hard';
  const difficultyColor = currentQ?.situation.difficulty === 1 ? '#00d9a5' : currentQ?.situation.difficulty === 2 ? '#ffd93d' : '#ff6b9d';

  const getStars = () => {
    if (scorePct > 80) return 3;
    if (scorePct >= 50) return 2;
    if (scorePct >= 25) return 1;
    return 0;
  };

  return (
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
        {gameState === 'playing' && (
          <motion.div
            animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.3, repeat: timeLeft <= 5 ? Infinity : 0 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full font-bold glass-card"
            style={{
              borderColor: timeLeft <= 5 ? 'var(--danger)' : 'var(--primary)',
              borderWidth: '1px',
              color: timeLeft <= 5 ? 'var(--danger)' : 'var(--primary)',
            }}
          >
            <Clock className="w-5 h-5" />
            <span>{timeLeft}s</span>
          </motion.div>
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
              messages="Machane, real German situations are coming at you fast! Think quick — would you survive in Germany? Let's find out! 🇩🇪"
              mood="excited"
              size="lg"
              showAppu
              appuMood="happy"
              className="mb-6"
            />

            <div className="glass-card p-6 w-full text-center">
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2 gradient-text">
                Situation Sprint
              </h1>
              <p className="text-[var(--foreground)]/70 mb-4 text-sm">
                Real German situations. How would you handle them? Starts easy, gets harder!
              </p>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--foreground)]/50">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 45 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[var(--primary)]" /> +3s per correct
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-[var(--primary)]" /> 15 situations
                </span>
              </div>

              <div className="flex gap-2 justify-center mb-6 text-xs">
                <span className="px-2 py-1 rounded-full bg-[#00d9a5]/15 text-[#00d9a5] border border-[#00d9a5]/25">Q1-5: Easy</span>
                <span className="px-2 py-1 rounded-full bg-[#ffd93d]/15 text-[#ffd93d] border border-[#ffd93d]/25">Q6-10: Medium</span>
                <span className="px-2 py-1 rounded-full bg-[#ff6b9d]/15 text-[#ff6b9d] border border-[#ff6b9d]/25">Q11-15: Hard</span>
              </div>

              <button onClick={startGame} className="game-button text-lg w-full py-4">
                Start Sprint
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== PLAYING SCREEN ==================== */}
        {gameState === 'playing' && currentQ && (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-[var(--primary)]">{score}</div>
                  <div className="text-xs text-[var(--foreground)]/50">Score</div>
                </div>
                {streak > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 px-3 py-1 rounded-full font-bold"
                    style={{
                      background: streak >= 5 ? 'linear-gradient(135deg, #ff6b9d, #ffd93d)' : streak >= 3 ? 'rgba(255, 107, 157, 0.2)' : 'rgba(212, 165, 32, 0.15)',
                      color: streak >= 5 ? '#fff' : 'var(--primary)',
                      border: streak >= 3 ? '1px solid rgba(255, 107, 157, 0.4)' : '1px solid rgba(212, 165, 32, 0.2)',
                    }}
                  >
                    <Zap className="w-4 h-4" />
                    <span>{streak}x</span>
                    {streak >= 3 && <span className="ml-0.5">🔥</span>}
                  </motion.div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${difficultyColor}20`, color: difficultyColor, border: `1px solid ${difficultyColor}40` }}>
                  {difficultyLabel}
                </span>
                <span className="text-sm text-[var(--foreground)]/50">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
            </div>

            {/* Timer Bar */}
            <div className="mb-4">
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(245, 240, 232, 0.1)' }}>
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: `${timerPct}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: timeLeft <= 5 ? 'linear-gradient(90deg, #c0392b, #e74c3c)' : timeLeft <= 10 ? 'linear-gradient(90deg, #e67e22, #f39c12)' : 'linear-gradient(90deg, #d4a520, #00d9a5)',
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
                    background: isCorrect ? 'rgba(0, 217, 165, 0.12)' : 'rgba(192, 57, 43, 0.12)',
                    border: isCorrect ? '1px solid rgba(0, 217, 165, 0.3)' : '1px solid rgba(192, 57, 43, 0.3)',
                  }}
                >
                  <span className="text-lg">{isCorrect ? (streak >= 3 ? '🔥' : '✅') : '😬'}</span>
                  <span className="text-sm font-medium" style={{ color: isCorrect ? 'var(--success)' : 'var(--danger)' }}>
                    {reactionText}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Situation Card */}
            <div className="glass-card p-5 mb-4" style={{
              borderColor: streak >= 5 ? 'rgba(212, 165, 32, 0.5)' : undefined,
              boxShadow: streak >= 5 ? '0 0 20px rgba(212, 165, 32, 0.15)' : undefined,
            }}>
              {/* Scene */}
              <p className="text-xs text-[var(--foreground)]/40 mb-2 italic">
                {currentQ.situation.scene}
              </p>

              {/* Prompt */}
              <p className="text-base font-medium text-[var(--foreground)]/80 mb-3 leading-relaxed">
                {currentQ.situation.prompt}
              </p>

              <div className="w-8 h-0.5 bg-[var(--foreground)]/10 mb-3" />

              {/* Question */}
              <p className="text-lg font-bold text-[var(--foreground)]">
                {currentQ.situation.question}
              </p>

              {/* Explanation on wrong answer */}
              {showResult && !isCorrect && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 pt-3"
                  style={{ borderTop: '1px solid rgba(245, 240, 232, 0.1)' }}
                >
                  <p className="text-xs text-[var(--foreground)]/40 mb-1">Correct answer:</p>
                  <p className="text-sm font-bold mb-2" style={{ color: 'var(--success)' }}>
                    {currentQ.situation.answer}
                  </p>
                  <p className="text-xs text-[var(--foreground)]/50 leading-relaxed">
                    {currentQ.situation.explanation}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const optionIsCorrect = option === currentQ.situation.answer;
                const showCorrectGlow = showResult && optionIsCorrect;
                const showWrongShake = showResult && isSelected && !optionIsCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                    animate={showWrongShake ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={showWrongShake ? { duration: 0.3 } : undefined}
                    className="p-3.5 rounded-xl text-left font-medium transition-all text-sm"
                    style={{
                      background: showCorrectGlow ? 'rgba(0, 217, 165, 0.2)' : showWrongShake ? 'rgba(192, 57, 43, 0.2)' : 'var(--card-bg)',
                      border: showCorrectGlow ? '2px solid rgba(0, 217, 165, 0.6)' : showWrongShake ? '2px solid rgba(192, 57, 43, 0.6)' : '2px solid var(--card-border)',
                      color: showCorrectGlow ? 'var(--success)' : showWrongShake ? 'var(--danger)' : 'var(--foreground)',
                      boxShadow: showCorrectGlow ? '0 0 15px rgba(0, 217, 165, 0.2)' : 'none',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
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
              initial={{ scale: 0, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="text-center mb-4"
            >
              <span className="text-6xl">{scorePct > 80 ? '✈️' : scorePct >= 50 ? '📋' : '💪'}</span>
            </motion.div>

            <CharacterGuide
              messages={scorePct > 80 ? "Adipoli machane! You'd survive Germany no problem!" : scorePct >= 50 ? "Not bad! But Germany has more surprises for you!" : "Paravaala! Every situation you learn makes you stronger!"}
              mood={kuttanMood as 'celebrating' | 'happy' | 'sad'}
              size="md"
              showAppu={scorePct > 80}
              appuMood={scorePct > 80 ? 'celebrating' : 'idle'}
              className="mb-4"
            />

            <div className="glass-card p-6 w-full text-center">
              <h1 className="text-2xl font-bold mb-2" style={{
                color: scorePct > 80 ? 'var(--success)' : scorePct >= 50 ? 'var(--primary)' : 'var(--foreground)',
              }}>
                {scorePct > 80 ? 'Germany Ready!' : scorePct >= 50 ? 'Getting There!' : 'Keep Learning!'}
              </h1>

              <div className="flex justify-center mb-4">
                <Stars rating={getStars()} size="lg" animated />
              </div>

              <p className="text-[var(--foreground)]/70 mb-6">
                You handled {score} of {questions.length} situations correctly!
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{score}</div>
                  <div className="text-xs text-[var(--foreground)]/50">Correct</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold flex items-center justify-center gap-1" style={{ color: '#ff6b9d' }}>
                    <Zap className="w-5 h-5" />{maxStreak}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">Best Streak</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                    +{score * 6 + maxStreak * 4}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">XP Earned</div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { generateQuestions(); setShowConfetti(false); startGame(); }}
                  className="game-button text-base w-full py-3 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Sprint Again
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
