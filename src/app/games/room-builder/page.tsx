'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, RefreshCw, Home, Sparkles } from 'lucide-react';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character';
import { Confetti, XPGain } from '@/components/game';
import { GameButton } from '@/components/game';
import { useGameStore } from '@/lib/store';

// ── Furniture items ─────────────────────────────────────────────────────
interface FurnitureItem {
  id: string;
  german: string;
  article: string;
  emoji: string;
  roomSlot: string; // which room area it goes into
}

interface PrepositionQuestion {
  furnitureId: string;
  question: string;
  options: string[];
  correctIndex: number;
}

interface FurnitureRound {
  furniture: FurnitureItem;
  question: PrepositionQuestion;
}

const FURNITURE_ITEMS: FurnitureItem[] = [
  { id: 'stuhl', german: 'Stuhl', article: 'der', emoji: '🪑', roomSlot: 'kitchen' },
  { id: 'bett', german: 'Bett', article: 'das', emoji: '🛏️', roomSlot: 'bedroom' },
  { id: 'schrank', german: 'Schrank', article: 'der', emoji: '🪞', roomSlot: 'bedroom-right' },
  { id: 'lampe', german: 'Lampe', article: 'die', emoji: '💡', roomSlot: 'living' },
  { id: 'sofa', german: 'Sofa', article: 'das', emoji: '🛋️', roomSlot: 'living-center' },
  { id: 'tisch', german: 'Tisch', article: 'der', emoji: '🍽️', roomSlot: 'kitchen-center' },
];

const PREPOSITION_QUESTIONS: PrepositionQuestion[] = [
  {
    furnitureId: 'stuhl',
    question: 'Wo ist der Stuhl?',
    options: ['in der Küche', 'auf dem Balkon', 'neben dem Bett', 'unter dem Tisch'],
    correctIndex: 0,
  },
  {
    furnitureId: 'bett',
    question: 'Wo ist das Bett?',
    options: ['in der Küche', 'im Schlafzimmer', 'auf dem Sofa', 'neben der Tür'],
    correctIndex: 1,
  },
  {
    furnitureId: 'schrank',
    question: 'Wo ist der Schrank?',
    options: ['unter dem Tisch', 'auf dem Balkon', 'neben dem Bett', 'in der Küche'],
    correctIndex: 2,
  },
  {
    furnitureId: 'lampe',
    question: 'Wo ist die Lampe?',
    options: ['unter dem Bett', 'im Wohnzimmer', 'auf dem Tisch', 'neben dem Schrank'],
    correctIndex: 1,
  },
  {
    furnitureId: 'sofa',
    question: 'Wo ist das Sofa?',
    options: ['in der Küche', 'unter dem Bett', 'im Wohnzimmer', 'auf dem Balkon'],
    correctIndex: 2,
  },
  {
    furnitureId: 'tisch',
    question: 'Wo ist der Tisch?',
    options: ['im Schlafzimmer', 'neben dem Sofa', 'auf dem Balkon', 'in der Küche'],
    correctIndex: 3,
  },
];

// ── Kuttan reactions ────────────────────────────────────────────────────
const CORRECT_REACTIONS = [
  "Adipoli! Perfect placement machaa!",
  "Seri seri! That's exactly where it goes!",
  "Wunderbar! The room is looking great!",
  "Super ayi! Interior designer material nee!",
  "Richtig! Kuttan's WG is coming together!",
  "Nice one da! The roommate will love this!",
];

const WRONG_REACTIONS = [
  "Aiyyo! That's not quite right... think about the preposition!",
  "Hmm, wrong spot machaa! Where does it really go?",
  "Paravaala! Prepositions are tricky in German!",
  "Not there da... try again! Think about the room layout!",
];

const PLACEMENT_REACTIONS = [
  "Tap the furniture to place it! Choose wisely machaa!",
  "Nice pick! Now answer where it goes!",
  "Good choice! Let's find the right Platz!",
  "Ooh that one! Now the tricky part - prepositions!",
];

const COMPLETION_MSGS: Record<string, { msg: string; mood: KuttanMood }> = {
  perfect: { msg: "Home sweet home! Oder soll ich sagen: Zuhause ist es am schönsten! Perfect room, perfect prepositions!", mood: 'celebrating' },
  great: { msg: "Wunderbar machaa! The WG looks amazing! Your German prepositions are getting strong!", mood: 'excited' },
  good: { msg: "Not bad! The room is livable! Keep practicing prepositions and it'll be perfect!", mood: 'happy' },
  tryAgain: { msg: "Paravaala da! Prepositions take time. At least we have a roof over our heads!", mood: 'thinking' },
};

// ── Helpers ─────────────────────────────────────────────────────────────
function shuffleArray<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Room visual component ───────────────────────────────────────────────
function RoomView({ placedItems, brightness }: { placedItems: FurnitureItem[]; brightness: number }) {
  const slots: Record<string, FurnitureItem | null> = {
    kitchen: null,
    'kitchen-center': null,
    bedroom: null,
    'bedroom-right': null,
    living: null,
    'living-center': null,
  };

  placedItems.forEach(item => {
    slots[item.roomSlot] = item;
  });

  const glowIntensity = Math.min(brightness * 0.15, 0.9);

  return (
    <motion.div
      className="relative w-full rounded-2xl overflow-hidden border-2 border-[var(--foreground)]/10"
      style={{ aspectRatio: '16/10' }}
      animate={{
        boxShadow: `0 0 ${brightness * 5}px rgba(255, 217, 61, ${glowIntensity}), inset 0 0 ${brightness * 10}px rgba(255, 217, 61, ${glowIntensity * 0.3})`,
      }}
    >
      {/* Room background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80" />

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#2d1f0e]/40 to-transparent" />

      {/* Wall dividers */}
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-[var(--foreground)]/10" />
      <div className="absolute top-0 bottom-0 left-2/3 w-px bg-[var(--foreground)]/10" />

      {/* Room labels */}
      <div className="absolute top-1 left-1 text-[8px] text-[var(--foreground)]/20 px-1.5 py-0.5 bg-[var(--foreground)]/5 rounded">Küche</div>
      <div className="absolute top-1 left-1/3 ml-1 text-[8px] text-[var(--foreground)]/20 px-1.5 py-0.5 bg-[var(--foreground)]/5 rounded">Schlafzimmer</div>
      <div className="absolute top-1 left-2/3 ml-1 text-[8px] text-[var(--foreground)]/20 px-1.5 py-0.5 bg-[var(--foreground)]/5 rounded">Wohnzimmer</div>

      {/* Window */}
      <div className="absolute top-[15%] left-[8%] w-[15%] h-[25%] border-2 border-[var(--foreground)]/10 rounded-sm bg-[#0f3460]/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-full bg-[var(--foreground)]/10" />
          <div className="absolute w-full h-px bg-[var(--foreground)]/10" />
        </div>
      </div>

      {/* Kitchen slot */}
      <div className="absolute top-[45%] left-[4%] w-[12%] flex flex-col items-center">
        {slots.kitchen ? (
          <motion.div
            initial={{ scale: 0, y: -30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            className="text-2xl sm:text-3xl"
          >
            {slots.kitchen.emoji}
          </motion.div>
        ) : (
          <div className="w-8 h-8 border border-dashed border-[var(--foreground)]/10 rounded-lg" />
        )}
      </div>

      {/* Kitchen center slot */}
      <div className="absolute top-[55%] left-[14%] w-[12%] flex flex-col items-center">
        {slots['kitchen-center'] ? (
          <motion.div
            initial={{ scale: 0, y: -30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            className="text-2xl sm:text-3xl"
          >
            {slots['kitchen-center'].emoji}
          </motion.div>
        ) : (
          <div className="w-8 h-8 border border-dashed border-[var(--foreground)]/10 rounded-lg" />
        )}
      </div>

      {/* Bedroom slot */}
      <div className="absolute top-[40%] left-[38%] w-[12%] flex flex-col items-center">
        {slots.bedroom ? (
          <motion.div
            initial={{ scale: 0, y: -30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            className="text-2xl sm:text-3xl"
          >
            {slots.bedroom.emoji}
          </motion.div>
        ) : (
          <div className="w-8 h-8 border border-dashed border-[var(--foreground)]/10 rounded-lg" />
        )}
      </div>

      {/* Bedroom right slot */}
      <div className="absolute top-[40%] left-[52%] w-[12%] flex flex-col items-center">
        {slots['bedroom-right'] ? (
          <motion.div
            initial={{ scale: 0, y: -30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            className="text-2xl sm:text-3xl"
          >
            {slots['bedroom-right'].emoji}
          </motion.div>
        ) : (
          <div className="w-8 h-8 border border-dashed border-[var(--foreground)]/10 rounded-lg" />
        )}
      </div>

      {/* Living slot */}
      <div className="absolute top-[35%] left-[72%] w-[12%] flex flex-col items-center">
        {slots.living ? (
          <motion.div
            initial={{ scale: 0, y: -30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            className="text-2xl sm:text-3xl"
          >
            {slots.living.emoji}
          </motion.div>
        ) : (
          <div className="w-8 h-8 border border-dashed border-[var(--foreground)]/10 rounded-lg" />
        )}
      </div>

      {/* Living center slot */}
      <div className="absolute top-[55%] left-[78%] w-[12%] flex flex-col items-center">
        {slots['living-center'] ? (
          <motion.div
            initial={{ scale: 0, y: -30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            className="text-2xl sm:text-3xl"
          >
            {slots['living-center'].emoji}
          </motion.div>
        ) : (
          <div className="w-8 h-8 border border-dashed border-[var(--foreground)]/10 rounded-lg" />
        )}
      </div>

      {/* Warm light overlay based on brightness */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse at 50% 30%, rgba(255, 217, 61, ${glowIntensity * 0.15}) 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────
export default function RoomBuilderGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed, learnVocabulary } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [phase, setPhase] = useState<'pick' | 'question'>('pick');
  const [rounds, setRounds] = useState<FurnitureRound[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [placedItems, setPlacedItems] = useState<FurnitureItem[]>([]);
  const [availableItems, setAvailableItems] = useState<FurnitureItem[]>([]);
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureItem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [kuttanMsg, setKuttanMsg] = useState("Kuttan just rented a WG in Berlin! Let's furnish it machaa!");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [roomBrightness, setRoomBrightness] = useState(0);

  // ── Generate rounds ─────────────────────────────────────────────────
  const generateRounds = useCallback(() => {
    const shuffled = shuffleArray([...FURNITURE_ITEMS]);
    const newRounds: FurnitureRound[] = shuffled.map(item => ({
      furniture: item,
      question: PREPOSITION_QUESTIONS.find(q => q.furnitureId === item.id)!,
    }));
    setRounds(newRounds);
    setAvailableItems([...shuffled]);
  }, []);

  useEffect(() => {
    generateRounds();
  }, [generateRounds]);

  // ── Start game ──────────────────────────────────────────────────────
  const startGame = () => {
    generateRounds();
    setGameState('playing');
    setPhase('pick');
    setCurrentRound(0);
    setScore(0);
    setPlacedItems([]);
    setSelectedFurniture(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setRoomBrightness(0);
    setAttempts(0);
    setKuttanMood('excited');
    setKuttanMsg(PLACEMENT_REACTIONS[0]);
  };

  // ── End game ────────────────────────────────────────────────────────
  const endGame = useCallback(() => {
    setGameState('complete');
    incrementGamesPlayed();

    placedItems.forEach(item => {
      learnVocabulary(`furniture-${item.id}`);
    });

    const earnedXP = score * 8 + (score === 6 ? 10 : 0);
    addXP(earnedXP);

    const comp = score === 6 ? COMPLETION_MSGS.perfect
      : score >= 4 ? COMPLETION_MSGS.great
      : score >= 3 ? COMPLETION_MSGS.good
      : COMPLETION_MSGS.tryAgain;

    setKuttanMood(comp.mood);
    setKuttanMsg(comp.msg);
    setShowConfetti(score >= 4);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, placedItems]);

  // ── Handle furniture pick ───────────────────────────────────────────
  const handleFurniturePick = (item: FurnitureItem) => {
    if (phase !== 'pick' || selectedFurniture) return;

    setSelectedFurniture(item);
    setKuttanMood('happy');
    setKuttanMsg(PLACEMENT_REACTIONS[Math.min(currentRound + 1, PLACEMENT_REACTIONS.length - 1)]);

    // Transition to question phase
    setTimeout(() => {
      setPhase('question');
      setAttempts(0);
    }, 600);
  };

  // ── Handle answer ───────────────────────────────────────────────────
  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;

    const currentQuestion = rounds[currentRound]?.question;
    if (!currentQuestion) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const correct = answerIndex === currentQuestion.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
      if (selectedFurniture) {
        setPlacedItems(prev => [...prev, selectedFurniture]);
        setAvailableItems(prev => prev.filter(i => i.id !== selectedFurniture.id));
      }
      setRoomBrightness(prev => prev + 1);
      setKuttanMood('celebrating');
      setKuttanMsg(CORRECT_REACTIONS[Math.floor(Math.random() * CORRECT_REACTIONS.length)]);

      setTimeout(() => {
        if (currentRound < rounds.length - 1) {
          setCurrentRound(prev => prev + 1);
          setPhase('pick');
          setSelectedFurniture(null);
          setSelectedAnswer(null);
          setShowResult(false);
          setKuttanMood('happy');
          setKuttanMsg("Next piece! What shall we place machaa?");
        } else {
          endGame();
        }
      }, 1500);
    } else {
      setAttempts(prev => prev + 1);
      setKuttanMood('thinking');
      setKuttanMsg(WRONG_REACTIONS[Math.floor(Math.random() * WRONG_REACTIONS.length)]);

      // Allow retry after showing wrong briefly
      setTimeout(() => {
        setSelectedAnswer(null);
        setShowResult(false);

        // After 3 wrong attempts, reveal answer and move on
        if (attempts >= 2) {
          if (selectedFurniture) {
            setPlacedItems(prev => [...prev, selectedFurniture]);
            setAvailableItems(prev => prev.filter(i => i.id !== selectedFurniture.id));
          }
          setRoomBrightness(prev => prev + 0.3);

          setTimeout(() => {
            if (currentRound < rounds.length - 1) {
              setCurrentRound(prev => prev + 1);
              setPhase('pick');
              setSelectedFurniture(null);
              setAttempts(0);
              setKuttanMood('happy');
              setKuttanMsg("Paravaala! Let's try the next one!");
            } else {
              endGame();
            }
          }, 800);
        }
      }, 1200);
    }
  };

  // ── Derived ─────────────────────────────────────────────────────────
  const currentQuestion = rounds[currentRound]?.question;
  const totalXP = score * 8 + (score === 6 ? 10 : 0);

  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto relative overflow-hidden">
      {/* Confetti */}
      <Confetti isActive={showConfetti} />
      <XPGain amount={totalXP} isVisible={showXP} onComplete={() => setShowXP(false)} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push('/games')}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        {gameState === 'playing' && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold bg-[#00d9a5]/15 text-[#00d9a5] border border-[#00d9a5]/20">
              <Home className="w-4 h-4" />
              <span>{placedItems.length}/6</span>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Ready Screen ────────────────────────────────────────── */}
        {gameState === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6">
              <CharacterGuide
                messages="Kuttan just rented a WG in Berlin! Let's arrange the furniture and learn prepositions machaa!"
                mood="excited"
                size="md"
                showAppu
                appuMood="happy"
              />
            </div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="game-card p-6 w-full text-center mb-6"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🏠
              </motion.div>
              <h1 className="text-2xl font-bold mb-2">
                <span className="gradient-text">Room Builder</span>
              </h1>
              <p className="text-[var(--foreground)]/50 text-sm mb-4 leading-relaxed">
                Tap furniture to place it in Kuttan&apos;s new apartment, then answer preposition questions! No timer — take your time.
              </p>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--foreground)]/40">
                <span className="flex items-center gap-1">
                  <Home className="w-4 h-4" /> 6 items
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> Relaxed
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" /> Up to 58 XP
                </span>
              </div>

              {/* Furniture preview */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {FURNITURE_ITEMS.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.1 }}
                    className="bg-[var(--foreground)]/5 rounded-xl p-2 text-center"
                  >
                    <div className="text-2xl">{item.emoji}</div>
                    <div className="text-[10px] text-[var(--foreground)]/40 mt-1">{item.article} {item.german}</div>
                  </motion.div>
                ))}
              </div>

              <GameButton onClick={startGame} size="lg" fullWidth pulse>
                Start Building
              </GameButton>
            </motion.div>
          </motion.div>
        )}

        {/* ── Playing Screen ──────────────────────────────────────── */}
        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress */}
            <div className="w-full h-2 bg-[var(--foreground)]/10 rounded-full mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00d9a5] to-[#ffd93d] rounded-full"
                animate={{ width: `${(placedItems.length / 6) * 100}%` }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </div>

            {/* Kuttan */}
            <motion.div
              key={kuttanMsg}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-3"
            >
              <CharacterGuide messages={kuttanMsg} mood={kuttanMood} size="sm" layout="horizontal" />
            </motion.div>

            {/* Room view */}
            <div className="mb-4">
              <RoomView placedItems={placedItems} brightness={roomBrightness} />
            </div>

            <AnimatePresence mode="wait">
              {/* Pick phase */}
              {phase === 'pick' && (
                <motion.div
                  key="pick-phase"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <p className="text-sm text-center text-[var(--foreground)]/50 mb-3">
                    Tap a furniture item to place it
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {availableItems.map((item) => (
                      <motion.div
                        key={item.id}
                        onClick={() => handleFurniturePick(item)}
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.92 }}
                        className="game-card p-4 text-center cursor-pointer border-2 border-transparent hover:border-[#00d9a5]/30 transition-all"
                      >
                        <motion.div
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 2 + Math.random(), repeat: Infinity }}
                          className="text-3xl mb-2"
                        >
                          {item.emoji}
                        </motion.div>
                        <div className="text-[10px] text-[var(--foreground)]/40">{item.article}</div>
                        <div className="text-xs font-bold">{item.german}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Question phase */}
              {phase === 'question' && currentQuestion && selectedFurniture && (
                <motion.div
                  key="question-phase"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Selected item indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="flex items-center justify-center gap-2 mb-4"
                  >
                    <span className="text-3xl">{selectedFurniture.emoji}</span>
                    <span className="font-bold text-sm">{selectedFurniture.article} {selectedFurniture.german}</span>
                  </motion.div>

                  {/* Question */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="game-card p-4 mb-4 border border-[#ffd93d]/20 text-center"
                  >
                    <motion.p
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-lg font-bold"
                    >
                      <span className="gradient-text">{currentQuestion.question}</span>
                    </motion.p>
                    {attempts > 0 && (
                      <p className="text-[10px] text-[var(--foreground)]/30 mt-1">
                        Attempt {attempts + 1}/3
                      </p>
                    )}
                  </motion.div>

                  {/* Options */}
                  <div className="space-y-2">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrectOpt = showResult && index === currentQuestion.correctIndex;
                      const isWrongOpt = showResult && isSelected && index !== currentQuestion.correctIndex;

                      return (
                        <motion.button
                          key={index}
                          onClick={() => handleAnswer(index)}
                          disabled={showResult}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            scale: isCorrectOpt ? [1, 1.03, 1] : isWrongOpt ? 1 : 1,
                          }}
                          transition={{ delay: index * 0.08 }}
                          whileTap={showResult ? {} : { scale: 0.97 }}
                          className={`w-full p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                            isCorrectOpt
                              ? 'bg-[#00d9a5]/20 border-[#00d9a5] text-[#00d9a5] shadow-[0_0_12px_rgba(0,217,165,0.2)]'
                              : isWrongOpt
                              ? 'bg-[#c0392b]/20 border-[#c0392b] text-[#c0392b] shadow-[0_0_12px_rgba(192,57,43,0.2)]'
                              : 'game-card border-transparent hover:border-[var(--foreground)]/20'
                          }`}
                        >
                          <motion.span
                            animate={isWrongOpt ? { x: [0, -3, 3, -3, 3, 0] } : {}}
                            transition={{ duration: 0.4 }}
                          >
                            {option}
                          </motion.span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Complete Screen ─────────────────────────────────────── */}
        {gameState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            {/* Character celebration */}
            <div className="mb-4">
              <CharacterGuide
                messages={kuttanMsg}
                mood={kuttanMood}
                size="md"
                showAppu={score >= 4}
                appuMood="happy"
              />
            </div>

            {/* Final room */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full mb-4"
            >
              <RoomView placedItems={placedItems} brightness={6} />
            </motion.div>

            {/* Warm light pulse animation */}
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 bg-gradient-to-br from-[#ffd93d] to-[#00d9a5] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[#00d9a5]/30"
            >
              <Home className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold mb-1"
            >
              {score === 6 ? 'Perfect Home!' : score >= 4 ? 'Cozy Place!' : score >= 2 ? 'Good Start!' : 'Needs Work!'}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-sm text-[var(--foreground)]/50 mb-5"
            >
              {score} of 6 preposition questions correct!
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-3 w-full mb-5"
            >
              <div className="game-card p-3 text-center">
                <div className="text-xl font-bold text-[#00d9a5]">{score}</div>
                <div className="text-[10px] text-[var(--foreground)]/40">Correct</div>
              </div>
              <div className="game-card p-3 text-center">
                <div className="text-xl font-bold text-[#ff6b9d]">{placedItems.length}</div>
                <div className="text-[10px] text-[var(--foreground)]/40">Placed</div>
              </div>
              <div className="game-card p-3 text-center">
                <div className="text-xl font-bold text-[#ffd93d]">+{totalXP}</div>
                <div className="text-[10px] text-[var(--foreground)]/40">XP Earned</div>
              </div>
            </motion.div>

            {/* Vocab learned */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full game-card p-4 mb-5 border border-[#00d9a5]/20"
            >
              <p className="text-xs font-bold text-[#00d9a5] mb-2">Prepositions learned</p>
              <div className="flex flex-wrap gap-2">
                {['in', 'auf', 'neben', 'unter', 'im'].map((prep, i) => (
                  <motion.span
                    key={prep}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="bg-[#00d9a5]/10 text-[#00d9a5] text-xs font-bold px-2.5 py-1 rounded-full border border-[#00d9a5]/20"
                  >
                    {prep}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <div className="w-full space-y-3">
              <GameButton onClick={() => { generateRounds(); startGame(); }} fullWidth icon={<RefreshCw className="w-5 h-5" />}>
                Play Again
              </GameButton>
              <GameButton variant="ghost" onClick={() => router.push('/games')} fullWidth>
                Back to Games
              </GameButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
