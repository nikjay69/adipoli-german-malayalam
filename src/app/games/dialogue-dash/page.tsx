'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, RefreshCw, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character';
import { Confetti, XPGain } from '@/components/game';
import { GameButton } from '@/components/game';
import { useGameStore } from '@/lib/store';

// ── Types ───────────────────────────────────────────────────────────────
interface DialogueLine {
  speaker: 'kuttan' | 'other';
  text: string;
  blankIndex?: number; // which word is the blank (word index in sentence)
  blankWord?: string;  // the correct word
  options?: string[];  // 4 choices when there's a blank
}

interface DialogueScenario {
  id: string;
  title: string;
  titleDe: string;
  emoji: string;
  otherName: string;
  otherEmoji: string;
  lines: DialogueLine[];
}

// ── Dialogue data ───────────────────────────────────────────────────────
const DIALOGUES: DialogueScenario[] = [
  {
    id: 'train',
    title: 'Train Station',
    titleDe: 'Am Bahnhof',
    emoji: '🚂',
    otherName: 'Ticket Officer',
    otherEmoji: '🎫',
    lines: [
      { speaker: 'kuttan', text: 'Guten Tag. Ich möchte eine Fahrkarte nach Berlin.' },
      {
        speaker: 'other',
        text: '_____ oder hin und zurück?',
        blankWord: 'Einfach',
        options: ['Einfach', 'Groß', 'Schnell', 'Billig'],
      },
      { speaker: 'kuttan', text: 'Hin und zurück, bitte.' },
      {
        speaker: 'other',
        text: 'Erste oder _____ Klasse?',
        blankWord: 'zweite',
        options: ['zweite', 'dritte', 'letzte', 'beste'],
      },
    ],
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    titleDe: 'Im Restaurant',
    emoji: '🍽️',
    otherName: 'Waiter',
    otherEmoji: '🧑‍🍳',
    lines: [
      {
        speaker: 'other',
        text: 'Guten Abend! Was _____ Sie bestellen?',
        blankWord: 'möchten',
        options: ['möchten', 'müssen', 'sollen', 'dürfen'],
      },
      { speaker: 'kuttan', text: 'Ich hätte gern die Suppe und einen Salat.' },
      {
        speaker: 'other',
        text: 'Und zu _____?',
        blankWord: 'trinken',
        options: ['trinken', 'essen', 'machen', 'geben'],
      },
    ],
  },
  {
    id: 'doctor',
    title: 'Doctor',
    titleDe: 'Beim Arzt',
    emoji: '🏥',
    otherName: 'Arzt',
    otherEmoji: '👨‍⚕️',
    lines: [
      {
        speaker: 'other',
        text: 'Was _____ Ihnen?',
        blankWord: 'fehlt',
        options: ['fehlt', 'macht', 'geht', 'kommt'],
      },
      { speaker: 'kuttan', text: 'Ich habe Kopfschmerzen seit gestern.' },
      {
        speaker: 'other',
        text: 'Nehmen Sie _____?',
        blankWord: 'Medikamente',
        options: ['Medikamente', 'Kuchen', 'Geld', 'Musik'],
      },
    ],
  },
  {
    id: 'supermarket',
    title: 'Supermarket',
    titleDe: 'Im Supermarkt',
    emoji: '🛒',
    otherName: 'Cashier',
    otherEmoji: '🧑‍💼',
    lines: [
      {
        speaker: 'kuttan',
        text: 'Entschuldigung, wo _____ ich Milch?',
        blankWord: 'finde',
        options: ['finde', 'mache', 'gehe', 'komme'],
      },
      {
        speaker: 'other',
        text: 'In _____ drei, neben dem Käse.',
        blankWord: 'Gang',
        options: ['Gang', 'Haus', 'Straße', 'Zimmer'],
      },
    ],
  },
  {
    id: 'bank',
    title: 'Bank',
    titleDe: 'Bei der Bank',
    emoji: '🏦',
    otherName: 'Banker',
    otherEmoji: '🏦',
    lines: [
      {
        speaker: 'kuttan',
        text: 'Ich möchte ein _____ eröffnen.',
        blankWord: 'Konto',
        options: ['Konto', 'Buch', 'Haus', 'Auto'],
      },
      {
        speaker: 'other',
        text: 'Haben Sie Ihren _____ dabei?',
        blankWord: 'Ausweis',
        options: ['Ausweis', 'Hund', 'Freund', 'Kaffee'],
      },
    ],
  },
  {
    id: 'apartment',
    title: 'Apartment',
    titleDe: 'Wohnungsbesichtigung',
    emoji: '🏠',
    otherName: 'Vermieter',
    otherEmoji: '🔑',
    lines: [
      {
        speaker: 'other',
        text: 'Die Wohnung hat zwei Zimmer und eine _____.',
        blankWord: 'Küche',
        options: ['Küche', 'Schule', 'Straße', 'Stadt'],
      },
      {
        speaker: 'kuttan',
        text: 'Wie viel _____ die Miete?',
        blankWord: 'kostet',
        options: ['kostet', 'macht', 'geht', 'spielt'],
      },
    ],
  },
];

// ── Kuttan reactions ────────────────────────────────────────────────────
const CORRECT_REACTIONS = [
  "Adipoli! Perfect response machaa!",
  "Seri seri! You speak like a local!",
  "Wunderbar! The conversation flows!",
  "Super ayi! Natural German!",
  "Richtig! Kuttan is impressed!",
  "Goethe exam? Easy peasy for you!",
];

const WRONG_REACTIONS = [
  "Aiyyo! That doesn't sound right da...",
  "Hmm, awkward silence... try again machaa!",
  "Paravaala! Context clues will help!",
  "Not that one da... think about the situation!",
];

const SCENARIO_INTROS: Record<string, string> = {
  train: "Kuttan needs a train ticket! Help him at the Bahnhof!",
  restaurant: "Dinner time! Let's order at the restaurant!",
  doctor: "Aiyyo! Kuttan isn't feeling well. Doctor visit time!",
  supermarket: "Shopping time machaa! Where's the milk?",
  bank: "Opening a bank account in Germany. Important stuff!",
  apartment: "Apartment hunting in Berlin! Exciting but scary da!",
};

const COMPLETION_MSGS: Record<string, { msg: string; mood: KuttanMood }> = {
  perfect: { msg: "Adipoli machaa! All 6 conversations nailed! You can handle any German situation now!", mood: 'celebrating' },
  great: { msg: "Wunderbar! Almost perfect conversations! Germans will think you're a local!", mood: 'excited' },
  good: { msg: "Not bad machaa! You can survive most German situations! Keep practicing!", mood: 'happy' },
  tryAgain: { msg: "Paravaala da! Real conversations are tough. Practice makes perfect!", mood: 'thinking' },
};

// ── Typing dots component ───────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-[var(--foreground)]/30"
          animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

// ── Chat bubble component ───────────────────────────────────────────────
function ChatBubble({
  speaker,
  text,
  isBlank,
  blankWord,
  blankFilled,
  isNew,
  otherEmoji,
  otherName,
  showCorrectFlash,
}: {
  speaker: 'kuttan' | 'other';
  text: string;
  isBlank: boolean;
  blankWord?: string;
  blankFilled?: string | null;
  isNew: boolean;
  otherEmoji: string;
  otherName: string;
  showCorrectFlash?: boolean;
}) {
  const isKuttan = speaker === 'kuttan';

  // Replace blank with styled version
  const renderText = () => {
    if (!isBlank) return text;

    const parts = text.split('_____');
    return (
      <span>
        {parts[0]}
        {blankFilled ? (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`inline-block font-bold px-1.5 py-0.5 rounded ${
              showCorrectFlash
                ? 'bg-[#00d9a5]/20 text-[#00d9a5]'
                : 'text-[var(--foreground)]'
            }`}
          >
            {blankFilled}
          </motion.span>
        ) : (
          <motion.span
            animate={{
              boxShadow: ['0 0 5px rgba(255,217,61,0.3)', '0 0 15px rgba(255,217,61,0.6)', '0 0 5px rgba(255,217,61,0.3)'],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block bg-[#ffd93d]/20 text-[#ffd93d] font-bold px-3 py-0.5 rounded border border-[#ffd93d]/30 mx-0.5"
          >
            ?????
          </motion.span>
        )}
        {parts[1]}
      </span>
    );
  };

  return (
    <motion.div
      initial={isNew ? { opacity: 0, x: isKuttan ? 30 : -30, y: 10 } : { opacity: 1, x: 0, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`flex items-end gap-2 mb-3 ${isKuttan ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
        isKuttan
          ? 'bg-[#27ae60]/20 border border-[#27ae60]/30'
          : 'bg-[#ff6b9d]/20 border border-[#ff6b9d]/30'
      }`}>
        {isKuttan ? '👦' : otherEmoji}
      </div>

      {/* Bubble */}
      <motion.div
        animate={showCorrectFlash ? {
          boxShadow: ['0 0 0px rgba(0,217,165,0)', '0 0 20px rgba(0,217,165,0.4)', '0 0 0px rgba(0,217,165,0)'],
        } : {}}
        transition={{ duration: 0.6 }}
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isKuttan
            ? 'bg-[#27ae60]/15 border border-[#27ae60]/20 rounded-br-md'
            : 'bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-bl-md'
        }`}
      >
        <div className="text-[10px] font-bold mb-0.5 opacity-40">
          {isKuttan ? 'Kuttan' : otherName}
        </div>
        <div className="font-medium">{renderText()}</div>
      </motion.div>
    </motion.div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────
function shuffleArray<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Main Component ──────────────────────────────────────────────────────
export default function DialogueDashGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed, learnVocabulary } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [dialogues, setDialogues] = useState<DialogueScenario[]>([]);
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0); // how many lines revealed so far
  const [score, setScore] = useState(0);
  const [totalBlanks, setTotalBlanks] = useState(0);
  const [filledBlanks, setFilledBlanks] = useState<Record<string, string>>({}); // "dialogueIdx-lineIdx" -> answer
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [kuttanMsg, setKuttanMsg] = useState("Real German conversations! Let's go machaa!");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [completedDialogues, setCompletedDialogues] = useState<string[]>([]);
  const [correctFlashKey, setCorrectFlashKey] = useState<string | null>(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // ── Scroll to bottom ────────────────────────────────────────────────
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleLines, showTyping, showResult]);

  // ── Count total blanks ──────────────────────────────────────────────
  useEffect(() => {
    let count = 0;
    DIALOGUES.forEach(d => {
      d.lines.forEach(l => {
        if (l.blankWord) count++;
      });
    });
    setTotalBlanks(count);
  }, []);

  // ── Generate dialogues ──────────────────────────────────────────────
  const generateDialogues = useCallback(() => {
    // Shuffle the dialogue order for variety
    setDialogues(shuffleArray([...DIALOGUES]));
  }, []);

  useEffect(() => {
    generateDialogues();
  }, [generateDialogues]);

  // ── Start game ──────────────────────────────────────────────────────
  const startGame = () => {
    generateDialogues();
    setGameState('playing');
    setCurrentDialogue(0);
    setCurrentLine(0);
    setVisibleLines(0);
    setScore(0);
    setFilledBlanks({});
    setSelectedAnswer(null);
    setShowResult(false);
    setCompletedDialogues([]);
    setWaitingForNext(false);
    setKuttanMood('excited');

    // Start revealing lines
    setTimeout(() => {
      revealNextLine(0, 0);
    }, 500);
  };

  // ── Reveal next line with typing animation ──────────────────────────
  const revealNextLine = (dialogueIdx: number, lineIdx: number) => {
    const dialogue = (dialogues.length > 0 ? dialogues : DIALOGUES)[dialogueIdx];
    if (!dialogue || lineIdx >= dialogue.lines.length) return;

    setShowTyping(true);

    // Show typing dots briefly, then reveal
    setTimeout(() => {
      setShowTyping(false);
      setVisibleLines(lineIdx + 1);
      setCurrentLine(lineIdx);

      // If it's not a blank line, auto-advance to next
      const line = dialogue.lines[lineIdx];
      if (!line.blankWord) {
        setTimeout(() => {
          if (lineIdx + 1 < dialogue.lines.length) {
            revealNextLine(dialogueIdx, lineIdx + 1);
          }
        }, 800);
      }
    }, 600);
  };

  // ── Handle answer ───────────────────────────────────────────────────
  const handleAnswer = (answer: string) => {
    if (showResult || waitingForNext) return;

    const dialogue = dialogues[currentDialogue];
    if (!dialogue) return;

    const line = dialogue.lines[currentLine];
    if (!line || !line.blankWord) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const correct = answer === line.blankWord;
    setIsCorrect(correct);

    const blankKey = `${currentDialogue}-${currentLine}`;

    if (correct) {
      setScore(prev => prev + 1);
      setFilledBlanks(prev => ({ ...prev, [blankKey]: answer }));
      setCorrectFlashKey(blankKey);
      setKuttanMood('happy');
      setKuttanMsg(CORRECT_REACTIONS[Math.floor(Math.random() * CORRECT_REACTIONS.length)]);
      learnVocabulary(`dialogue-${dialogue.id}-${line.blankWord}`);

      setTimeout(() => {
        setCorrectFlashKey(null);
      }, 600);

      // Continue to next line or next dialogue
      setWaitingForNext(true);
      setTimeout(() => {
        setSelectedAnswer(null);
        setShowResult(false);
        setWaitingForNext(false);

        const nextLine = currentLine + 1;
        if (nextLine < dialogue.lines.length) {
          revealNextLine(currentDialogue, nextLine);
        } else {
          // Dialogue complete
          setCompletedDialogues(prev => [...prev, dialogue.id]);

          if (currentDialogue < dialogues.length - 1) {
            // Move to next dialogue
            const nextDialogue = currentDialogue + 1;
            setCurrentDialogue(nextDialogue);
            setCurrentLine(0);
            setVisibleLines(0);
            setKuttanMood('excited');
            setKuttanMsg(SCENARIO_INTROS[dialogues[nextDialogue].id] || "Next conversation machaa!");

            setTimeout(() => {
              revealNextLine(nextDialogue, 0);
            }, 1000);
          } else {
            endGame();
          }
        }
      }, 1200);
    } else {
      setKuttanMood('thinking');
      setKuttanMsg(WRONG_REACTIONS[Math.floor(Math.random() * WRONG_REACTIONS.length)]);

      // Allow retry
      setTimeout(() => {
        setSelectedAnswer(null);
        setShowResult(false);
      }, 1000);
    }
  };

  // ── End game ────────────────────────────────────────────────────────
  const endGame = useCallback(() => {
    setGameState('complete');
    incrementGamesPlayed();

    const earnedXP = score * 4 + (score === totalBlanks ? 15 : 0);
    addXP(earnedXP);

    const ratio = score / Math.max(totalBlanks, 1);
    const comp = ratio === 1 ? COMPLETION_MSGS.perfect
      : ratio >= 0.8 ? COMPLETION_MSGS.great
      : ratio >= 0.5 ? COMPLETION_MSGS.good
      : COMPLETION_MSGS.tryAgain;

    setKuttanMood(comp.mood);
    setKuttanMsg(comp.msg);
    setShowConfetti(ratio >= 0.8);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, totalBlanks]);

  // ── Derived ─────────────────────────────────────────────────────────
  const currentDialogueData = dialogues[currentDialogue];
  const currentLineData = currentDialogueData?.lines[currentLine];
  const isBlankLine = currentLineData?.blankWord != null;
  const totalXP = score * 4 + (score === totalBlanks ? 15 : 0);

  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto relative overflow-hidden flex flex-col">
      {/* Confetti */}
      <Confetti isActive={showConfetti} />
      <XPGain amount={totalXP} isVisible={showXP} onComplete={() => setShowXP(false)} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <button
          onClick={() => router.push('/games')}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        {gameState === 'playing' && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold bg-[#ff6b9d]/15 text-[#ff6b9d] border border-[#ff6b9d]/20">
              <MessageCircle className="w-4 h-4" />
              <span>{currentDialogue + 1}/6</span>
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
                messages="Kuttan needs to have real German conversations machaa! Fill in the blanks to complete the dialogues!"
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
                💬
              </motion.div>
              <h1 className="text-2xl font-bold mb-2">
                <span className="gradient-text">Dialogue Dash</span>
              </h1>
              <p className="text-[var(--foreground)]/50 text-sm mb-4 leading-relaxed">
                Complete 6 real-life German conversations! No timer — focus on understanding context.
              </p>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--foreground)]/40">
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" /> 6 dialogues
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> Relaxed
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" /> Up to {totalBlanks * 4 + 15} XP
                </span>
              </div>

              {/* Scenario preview */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {DIALOGUES.map((d) => (
                  <motion.div
                    key={d.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-[var(--foreground)]/5 rounded-xl p-2 text-center"
                  >
                    <div className="text-xl">{d.emoji}</div>
                    <div className="text-[10px] text-[var(--foreground)]/40 mt-1">{d.title}</div>
                  </motion.div>
                ))}
              </div>

              <GameButton onClick={startGame} size="lg" fullWidth pulse>
                Start Conversations
              </GameButton>
            </motion.div>
          </motion.div>
        )}

        {/* ── Playing Screen ──────────────────────────────────────── */}
        {gameState === 'playing' && currentDialogueData && (
          <motion.div
            key={`playing-${currentDialogue}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1 min-h-0"
          >
            {/* Overall progress */}
            <div className="w-full h-1.5 bg-[var(--foreground)]/10 rounded-full mb-3 overflow-hidden flex-shrink-0">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff6b9d] to-[#ffd93d] rounded-full"
                animate={{ width: `${(completedDialogues.length / 6) * 100}%` }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </div>

            {/* Scenario header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="game-card p-3 mb-3 flex items-center gap-3 border border-[var(--foreground)]/10 flex-shrink-0"
            >
              <span className="text-2xl">{currentDialogueData.emoji}</span>
              <div>
                <div className="text-sm font-bold">{currentDialogueData.title}</div>
                <div className="text-[10px] text-[var(--foreground)]/40">{currentDialogueData.titleDe}</div>
              </div>
              <div className="ml-auto flex items-center gap-1 text-xs text-[#00d9a5] font-bold">
                <CheckCircle2 className="w-3 h-3" />
                {score}
              </div>
            </motion.div>

            {/* Kuttan guide (compact) */}
            <motion.div
              key={kuttanMsg}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-3 flex-shrink-0"
            >
              <CharacterGuide messages={kuttanMsg} mood={kuttanMood} size="sm" layout="horizontal" />
            </motion.div>

            {/* Chat area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto space-y-1 mb-3 min-h-[200px] max-h-[300px] scroll-smooth"
            >
              {currentDialogueData.lines.slice(0, visibleLines).map((line, lineIdx) => {
                const blankKey = `${currentDialogue}-${lineIdx}`;
                const isActive = lineIdx === currentLine && line.blankWord != null;
                const filled = filledBlanks[blankKey] || null;
                const showFlash = correctFlashKey === blankKey;

                return (
                  <ChatBubble
                    key={`${currentDialogue}-${lineIdx}`}
                    speaker={line.speaker}
                    text={line.text}
                    isBlank={line.blankWord != null}
                    blankWord={line.blankWord}
                    blankFilled={filled}
                    isNew={lineIdx === visibleLines - 1}
                    otherEmoji={currentDialogueData.otherEmoji}
                    otherName={currentDialogueData.otherName}
                    showCorrectFlash={showFlash}
                  />
                );
              })}

              {/* Typing indicator */}
              {showTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--foreground)]/5 text-sm">
                    {currentDialogueData.lines[visibleLines]?.speaker === 'kuttan' ? '👦' : currentDialogueData.otherEmoji}
                  </div>
                  <div className="bg-[var(--foreground)]/5 rounded-2xl rounded-bl-md">
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Answer options (only when current line is a blank) */}
            <AnimatePresence>
              {isBlankLine && !waitingForNext && visibleLines > currentLine && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex-shrink-0 space-y-2"
                >
                  <p className="text-xs text-center text-[var(--foreground)]/30 mb-1">Choose the correct word</p>
                  <div className="grid grid-cols-2 gap-2">
                    {currentLineData?.options?.map((option, index) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrectOpt = showResult && option === currentLineData.blankWord;
                      const isWrongOpt = showResult && isSelected && option !== currentLineData.blankWord;

                      return (
                        <motion.button
                          key={`${currentDialogue}-${currentLine}-${index}`}
                          onClick={() => handleAnswer(option)}
                          disabled={showResult}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            x: isWrongOpt ? [0, -3, 3, -3, 3, 0] : 0,
                          }}
                          transition={{ delay: index * 0.06, duration: isWrongOpt ? 0.4 : 0.2 }}
                          whileTap={showResult ? {} : { scale: 0.95 }}
                          className={`p-3 rounded-xl border-2 text-center text-sm font-medium transition-all ${
                            isCorrectOpt
                              ? 'bg-[#00d9a5]/20 border-[#00d9a5] text-[#00d9a5] shadow-[0_0_12px_rgba(0,217,165,0.2)]'
                              : isWrongOpt
                              ? 'bg-[#c0392b]/20 border-[#c0392b] text-[#c0392b] shadow-[0_0_12px_rgba(192,57,43,0.2)]'
                              : 'game-card border-transparent hover:border-[#ffd93d]/30'
                          }`}
                        >
                          {option}
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
                showAppu={score >= totalBlanks * 0.8}
                appuMood="happy"
              />
            </div>

            {/* Trophy */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              className="mb-4"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] rounded-full flex items-center justify-center shadow-lg shadow-[#ff6b9d]/30">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-1"
            >
              {score === totalBlanks ? 'Conversation Master!' : score >= totalBlanks * 0.8 ? 'Great Talker!' : score >= totalBlanks * 0.5 ? 'Good Effort!' : 'Keep Talking!'}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-sm text-[var(--foreground)]/50 mb-5"
            >
              {score} of {totalBlanks} blanks filled correctly!
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-3 w-full mb-5"
            >
              <div className="game-card p-3 text-center">
                <div className="text-xl font-bold text-[#ff6b9d]">{score}</div>
                <div className="text-[10px] text-[var(--foreground)]/40">Correct</div>
              </div>
              <div className="game-card p-3 text-center">
                <div className="text-xl font-bold text-[#00d9a5]">6</div>
                <div className="text-[10px] text-[var(--foreground)]/40">Dialogues</div>
              </div>
              <div className="game-card p-3 text-center">
                <div className="text-xl font-bold text-[#ffd93d]">+{totalXP}</div>
                <div className="text-[10px] text-[var(--foreground)]/40">XP Earned</div>
              </div>
            </motion.div>

            {/* Completed dialogues timeline */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full game-card p-4 mb-5 border border-[var(--foreground)]/10"
            >
              <p className="text-xs font-bold text-[var(--foreground)]/50 mb-3">Conversations completed</p>
              <div className="space-y-2">
                {(dialogues.length > 0 ? dialogues : DIALOGUES).map((d, i) => {
                  const isComplete = completedDialogues.includes(d.id);
                  return (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      {/* Timeline dot */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isComplete
                          ? 'bg-[#00d9a5]/20 border border-[#00d9a5]/30'
                          : 'bg-[var(--foreground)]/5 border border-[var(--foreground)]/10'
                      }`}>
                        {isComplete ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00d9a5]" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-[var(--foreground)]/20" />
                        )}
                      </div>

                      {/* Timeline connector */}
                      {i < 5 && (
                        <div className={`absolute ml-3 mt-8 w-px h-3 ${
                          isComplete ? 'bg-[#00d9a5]/30' : 'bg-[var(--foreground)]/10'
                        }`} />
                      )}

                      {/* Info */}
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-base">{d.emoji}</span>
                        <div>
                          <div className="text-xs font-bold">{d.title}</div>
                          <div className="text-[10px] text-[var(--foreground)]/30">{d.titleDe}</div>
                        </div>
                      </div>

                      {isComplete && (
                        <span className="text-[10px] text-[#00d9a5] font-bold">DONE</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Perfect bonus */}
            {score === totalBlanks && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="w-full mb-4 px-4 py-3 bg-[#ffd93d]/10 rounded-xl border border-[#ffd93d]/20"
              >
                <p className="text-sm text-[#ffd93d] font-medium text-center">
                  🏆 Perfect score bonus: +15 XP
                </p>
              </motion.div>
            )}

            {/* Actions */}
            <div className="w-full space-y-3">
              <GameButton onClick={() => { generateDialogues(); startGame(); }} fullWidth icon={<RefreshCw className="w-5 h-5" />}>
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
