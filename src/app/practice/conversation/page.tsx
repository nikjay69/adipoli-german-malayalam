'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, Mic, MicOff, RotateCcw, Check, X, ChevronRight } from 'lucide-react';
import { Confetti, XPGain } from '@/components/game';
import { useGameStore } from '@/lib/store';
import { Nivin } from '@/components/character/Nivin';

// SpeechRecognition types declared globally in src/types/speech-recognition.d.ts

// ─── Scenario Data ──────────────────────────────────────────────

interface ScenarioTurn {
  ai: string;
  hint: string;
  expectedPattern: RegExp;
}

interface Scenario {
  id: string;
  title: string;
  titleDe: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  sceneChip: string; // e.g. "🌴 Kerala cafe", "🥨 Berlin bakery"
  reflection: string; // end-of-session Nivin line
  turns: ScenarioTurn[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'cafe',
    title: 'At the Cafe',
    titleDe: 'Im Cafe',
    icon: '\u2615',
    difficulty: 'Easy',
    sceneChip: '\u2615\ufe0f Berlin cafe',
    reflection: 'You just ordered coffee in German, machaa. You could actually walk into a Berlin cafe now and do this.',
    turns: [
      { ai: 'Guten Tag! Was moechten Sie trinken?', hint: 'Order a drink (e.g. Kaffee, Tee, Wasser)', expectedPattern: /kaffee|tee|wasser|saft|cola|bier|milch/i },
      { ai: 'Moechten Sie auch etwas essen?', hint: 'Say yes/no + a food item', expectedPattern: /ja|nein|kuchen|brot|croissant|sandwich/i },
      { ai: 'Das macht drei Euro fuenfzig.', hint: "Say 'here you go' or 'thank you'", expectedPattern: /bitte|danke|hier/i },
      { ai: 'Vielen Dank! Einen schoenen Tag noch!', hint: 'Say goodbye', expectedPattern: /danke|tschuess|wiedersehen|tag|bye/i },
    ],
  },
  {
    id: 'doctor',
    title: 'At the Doctor',
    titleDe: 'Beim Arzt',
    icon: '\uD83C\uDFE5',
    difficulty: 'Medium',
    sceneChip: '\uD83C\uDFE5 German clinic',
    reflection: 'You just described symptoms to a German doctor. That is a real-life superpower when you land in Germany.',
    turns: [
      { ai: 'Guten Tag. Was fehlt Ihnen?', hint: 'Describe a symptom (e.g. Kopfschmerzen, Fieber)', expectedPattern: /kopf|bauch|schmerzen|fieber|krank|hals|ruecken/i },
      { ai: 'Seit wann haben Sie die Schmerzen?', hint: 'Say since when (e.g. seit gestern, seit zwei Tagen)', expectedPattern: /gestern|tagen|woche|heute|seit|morgen/i },
      { ai: 'Nehmen Sie Medikamente?', hint: 'Say yes or no', expectedPattern: /ja|nein|tabletten|medikament|keine/i },
      { ai: 'Ich schreibe Ihnen ein Rezept. Gute Besserung!', hint: 'Say thank you', expectedPattern: /danke|besserung|vielen/i },
    ],
  },
  {
    id: 'train',
    title: 'At the Train Station',
    titleDe: 'Am Bahnhof',
    icon: '\uD83D\uDE82',
    difficulty: 'Medium',
    sceneChip: '\uD83D\uDE82 Hauptbahnhof',
    reflection: 'You just booked a German train ticket. Next stop — a real weekend trip across Deutschland.',
    turns: [
      { ai: 'Guten Tag. Wohin moechten Sie fahren?', hint: 'Say a German city (e.g. Berlin, Muenchen)', expectedPattern: /berlin|muenchen|m.nchen|hamburg|frankfurt|koeln|k.ln|dresden|stuttgart/i },
      { ai: 'Einfach oder hin und zurueck?', hint: 'One-way or round trip', expectedPattern: /einfach|zurueck|zur.ck|hin/i },
      { ai: 'Erste oder zweite Klasse?', hint: 'First or second class', expectedPattern: /erste|zweite|klasse|zwei|eins/i },
      { ai: 'Das macht fuenfundvierzig Euro. Der Zug faehrt von Gleis drei.', hint: 'Say thank you or ask about the platform', expectedPattern: /danke|gleis|wann|vielen/i },
    ],
  },
  {
    id: 'apartment',
    title: 'Apartment Viewing',
    titleDe: 'Wohnungsbesichtigung',
    icon: '\uD83C\uDFE0',
    difficulty: 'Hard',
    sceneChip: '\uD83C\uDFE0 Berlin Wohnung',
    reflection: 'Apartment hunting in German — done. The hardest Goethe A1 scenario, and you handled it.',
    turns: [
      { ai: 'Willkommen! Die Wohnung hat zwei Zimmer und eine Kueche. Moechten Sie sie sehen?', hint: 'Say yes (e.g. Ja, gerne!)', expectedPattern: /ja|gern|bitte|natuerlich|nat.rlich|klar/i },
      { ai: 'Hier ist das Wohnzimmer. Es ist sehr hell. Gefaellt es Ihnen?', hint: 'Say if you like it', expectedPattern: /ja|schoen|sch.n|gefaellt|gef.llt|gross|gro.|hell|gut|super|toll/i },
      { ai: 'Die Miete ist fuenfhundert Euro warm. Haben Sie Fragen?', hint: 'Ask a question about the apartment', expectedPattern: /wann|internet|garage|haustier|einziehen|frage|park|balkon/i },
      { ai: 'Sie koennen am ersten naechsten Monats einziehen. Moechten Sie die Wohnung nehmen?', hint: 'Say yes or no', expectedPattern: /ja|nehme|gern|ueberlegen|nein|muss/i },
    ],
  },
  {
    id: 'supermarket',
    title: 'At the Supermarket',
    titleDe: 'Im Supermarkt',
    icon: '\uD83D\uDED2',
    difficulty: 'Easy',
    sceneChip: '\uD83D\uDED2 REWE Supermarkt',
    reflection: 'Grocery run in German — easy, right? Now you can shop at any REWE or ALDI without stress.',
    turns: [
      { ai: 'Entschuldigung, kann ich Ihnen helfen?', hint: 'Ask where something is (e.g. Wo finde ich Milch?)', expectedPattern: /wo|finde|milch|brot|reis|obst|gemuese|gem.se/i },
      { ai: 'Das finden Sie in Gang drei, rechts neben dem Kaese.', hint: 'Say thank you', expectedPattern: /danke|vielen|super/i },
      { ai: 'Brauchen Sie eine Tuete?', hint: 'Say yes or no', expectedPattern: /ja|nein|bitte|tuete|t.te|kein/i },
      { ai: 'Das macht sieben Euro zwanzig. Bar oder mit Karte?', hint: 'Say cash or card', expectedPattern: /bar|karte|cash|zahle/i },
    ],
  },
];

// ─── Mascot Feedback ────────────────────────────────────────────

const FEEDBACK_CORRECT = [
  'Adipoli! Perfect response!',
  'Nailed it machaa!',
  'Super! That was spot on!',
  'Correct! You are getting good at this!',
  'Kollaam! Well done!',
];

const FEEDBACK_RETRY = [
  'Almost there! Check the hint and try again.',
  'Not quite machaa, one more try!',
  'Paravaala! Look at the hint below.',
  'Close! Give it another shot.',
  'Hmm, try using the hint words.',
];

const FEEDBACK_COMPLETE = [
  'Adipoli machaa! You crushed that conversation!',
  'Fantastic! Your German is really improving!',
  'Kollaam! That was a great practice session!',
  'Amazing work! You handled that like a pro!',
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── State Machine ──────────────────────────────────────────────

type ConversationState =
  | 'ready'
  | 'scenario_select'
  | 'ai_speaking'
  | 'student_turn'
  | 'evaluating'
  | 'next_turn'
  | 'complete';

// ─── Difficulty Colors ──────────────────────────────────────────

const difficultyColors: Record<string, string> = {
  Easy: 'bg-[#27ae60]/15 text-[#27ae60] border border-[#27ae60]/20',
  Medium: 'bg-[#d4a520]/15 text-[#d4a520] border border-[#d4a520]/20',
  Hard: 'bg-[#c0392b]/15 text-[#c0392b] border border-[#c0392b]/20',
};

// ─── Main Component ─────────────────────────────────────────────

export default function ConversationPracticePage() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed, updateStreak } = useGameStore();

  // Core state
  const [state, setState] = useState<ConversationState>('scenario_select');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Speech state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');

  // Evaluation state
  const [turnResult, setTurnResult] = useState<'correct' | 'retry' | null>(null);
  const [feedback, setFeedback] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [turnScores, setTurnScores] = useState<number[]>([]);

  // Completion state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  // Browser support
  const [speechSupported, setSpeechSupported] = useState(true);
  const [micSupported, setMicSupported] = useState(true);

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Conversation history for display
  const [conversationLog, setConversationLog] = useState<
    { role: 'ai' | 'student'; text: string; correct?: boolean }[]
  >([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // ─── Mount & API Check ──────────────────────────────────────

  useEffect(() => {
    setMounted(true);

    // Check TTS support
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;

      // Load voices (some browsers load async)
      const loadVoice = () => {
        const voices = synthRef.current?.getVoices() || [];
        const germanVoice = voices.find(
          (v) => v.lang.startsWith('de') && v.localService
        ) || voices.find((v) => v.lang.startsWith('de'));
        voiceRef.current = germanVoice || null;
      };

      loadVoice();
      synthRef.current.onvoiceschanged = loadVoice;
    } else {
      setSpeechSupported(false);
    }

    // Check mic support
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setMicSupported(false);
    }

    return () => {
      // Cleanup
      synthRef.current?.cancel();
      recognitionRef.current?.abort();
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, []);

  // ─── Auto-scroll chat ───────────────────────────────────────

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationLog, state, transcript, interimTranscript]);

  // ─── TTS: Speak German ─────────────────────────────────────

  const speakGerman = useCallback(
    (text: string): Promise<void> => {
      return new Promise((resolve) => {
        if (!synthRef.current) {
          resolve();
          return;
        }

        // Cancel any ongoing speech
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 0.85;
        utterance.pitch = 1.0;

        if (voiceRef.current) {
          utterance.voice = voiceRef.current;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
          resolve();
        };
        utterance.onerror = () => {
          setIsSpeaking(false);
          resolve();
        };

        synthRef.current.speak(utterance);
      });
    },
    []
  );

  // ─── STT: Listen to Student ─────────────────────────────────

  const startListening = useCallback(() => {
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    // Clean up any existing recognition
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = 'de-DE';
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    recognition.continuous = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      if (final) {
        setTranscript(final);
        setInterimTranscript('');
      } else {
        setInterimTranscript(interim);
      }

      // Reset silence timer on new speech
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      silenceTimerRef.current = setTimeout(() => {
        // Auto-stop after 3s of silence
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      }, 3000);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error !== 'aborted' && event.error !== 'no-speech') {
        console.warn('Speech recognition error:', event.error);
      }
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setTranscript('');
    setInterimTranscript('');
    setIsListening(true);
    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
  }, []);

  // ─── Scenario Selection ─────────────────────────────────────

  const selectScenario = useCallback(
    async (scenario: Scenario) => {
      setSelectedScenario(scenario);
      setCurrentTurn(0);
      setTurnScores([]);
      setConversationLog([]);
      setRetryCount(0);
      setTurnResult(null);
      setFeedback('');
      setTranscript('');
      setInterimTranscript('');

      // Transition to AI speaking first turn
      setState('ai_speaking');

      const firstTurn = scenario.turns[0];
      setConversationLog([{ role: 'ai', text: firstTurn.ai }]);

      await speakGerman(firstTurn.ai);

      setState('student_turn');
    },
    [speakGerman]
  );

  // ─── Evaluate Student Response ──────────────────────────────

  const evaluateResponse = useCallback(() => {
    if (!selectedScenario) return;

    stopListening();
    setState('evaluating');

    const currentTurnData = selectedScenario.turns[currentTurn];
    const studentText = transcript || interimTranscript;

    if (!studentText.trim()) {
      setTurnResult('retry');
      setFeedback('I did not catch anything. Tap the mic and try speaking.');
      setState('student_turn');
      setRetryCount((prev) => prev + 1);
      return;
    }

    // Check against expected pattern
    const isCorrect = currentTurnData.expectedPattern.test(studentText);

    if (isCorrect) {
      setTurnResult('correct');
      setFeedback(getRandomItem(FEEDBACK_CORRECT));

      // Score: first try = 2 points, retry = 1 point
      const score = retryCount === 0 ? 2 : 1;
      setTurnScores((prev) => [...prev, score]);

      // Add student response to log
      setConversationLog((prev) => [
        ...prev,
        { role: 'student', text: studentText, correct: true },
      ]);

      // Auto-advance after a short delay
      setTimeout(async () => {
        const nextTurnIndex = currentTurn + 1;

        if (nextTurnIndex >= selectedScenario.turns.length) {
          // Conversation complete
          handleComplete([...turnScores, score]);
        } else {
          // Next turn
          setCurrentTurn(nextTurnIndex);
          setTurnResult(null);
          setFeedback('');
          setRetryCount(0);
          setTranscript('');
          setInterimTranscript('');

          setState('ai_speaking');
          const nextTurnData = selectedScenario.turns[nextTurnIndex];
          setConversationLog((prev) => [...prev, { role: 'ai', text: nextTurnData.ai }]);

          await speakGerman(nextTurnData.ai);

          setState('student_turn');
        }
      }, 1500);
    } else {
      // Incorrect
      setConversationLog((prev) => [
        ...prev,
        { role: 'student', text: studentText, correct: false },
      ]);

      if (retryCount >= 1) {
        // Already retried once, give half credit and move on
        setTurnResult('correct');
        setFeedback("No worries, let's move on!");
        const score = 0;
        setTurnScores((prev) => [...prev, score]);

        setTimeout(async () => {
          const nextTurnIndex = currentTurn + 1;

          if (nextTurnIndex >= selectedScenario.turns.length) {
            handleComplete([...turnScores, score]);
          } else {
            setCurrentTurn(nextTurnIndex);
            setTurnResult(null);
            setFeedback('');
            setRetryCount(0);
            setTranscript('');
            setInterimTranscript('');

            setState('ai_speaking');
            const nextTurnData = selectedScenario.turns[nextTurnIndex];
            setConversationLog((prev) => [
              ...prev,
              { role: 'ai', text: nextTurnData.ai },
            ]);

            await speakGerman(nextTurnData.ai);

            setState('student_turn');
          }
        }, 1500);
      } else {
        setTurnResult('retry');
        setFeedback(getRandomItem(FEEDBACK_RETRY));
        setRetryCount((prev) => prev + 1);
        setTranscript('');
        setInterimTranscript('');
        setState('student_turn');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedScenario, currentTurn, transcript, interimTranscript, retryCount, turnScores, stopListening, speakGerman]);

  // ─── Handle Completion ──────────────────────────────────────

  const handleComplete = useCallback(
    (scores: number[]) => {
      setState('complete');

      const totalScore = scores.reduce((a, b) => a + b, 0);
      const maxScore = scores.length * 2;
      const percentage = Math.round((totalScore / maxScore) * 100);

      // XP: base 20 + percentage bonus
      const earned = 20 + Math.round(percentage * 0.3);
      setXpEarned(earned);

      addXP(earned);
      incrementGamesPlayed();
      updateStreak();

      setShowConfetti(true);
      setTimeout(() => setShowXP(true), 500);
      setTimeout(() => setShowConfetti(false), 4000);
    },
    [addXP, incrementGamesPlayed, updateStreak]
  );

  // ─── Replay AI Audio ───────────────────────────────────────

  const replayAudio = useCallback(() => {
    if (!selectedScenario || isSpeaking) return;
    const turnData = selectedScenario.turns[currentTurn];
    speakGerman(turnData.ai);
  }, [selectedScenario, currentTurn, isSpeaking, speakGerman]);

  // ─── Mic Toggle ─────────────────────────────────────────────

  const toggleMic = useCallback(() => {
    if (isListening) {
      stopListening();
      // Evaluate after stopping
      setTimeout(() => evaluateResponse(), 300);
    } else {
      setTranscript('');
      setInterimTranscript('');
      setTurnResult(null);
      startListening();
    }
  }, [isListening, stopListening, startListening, evaluateResponse]);

  // ─── Reset ──────────────────────────────────────────────────

  const resetToMenu = useCallback(() => {
    synthRef.current?.cancel();
    recognitionRef.current?.abort();
    setState('scenario_select');
    setSelectedScenario(null);
    setCurrentTurn(0);
    setTurnScores([]);
    setConversationLog([]);
    setRetryCount(0);
    setTurnResult(null);
    setFeedback('');
    setTranscript('');
    setInterimTranscript('');
    setShowConfetti(false);
    setShowXP(false);
  }, []);

  // ─── Loading ────────────────────────────────────────────────

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-[#d4a520] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // ─── Unsupported Browser ────────────────────────────────────

  if (!speechSupported || !micSupported) {
    return (
      <div className="min-h-screen px-4 py-6 safe-top safe-bottom">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-[var(--foreground)]/60 mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex flex-col items-center justify-center mt-20 text-center px-6">
          <div className="text-6xl mb-6">🎙️</div>
          <h2 className="text-xl font-bold mb-3">Browser Not Supported</h2>
          <p className="text-[var(--foreground)]/50 text-sm leading-relaxed max-w-sm">
            This feature requires Speech Recognition and Speech Synthesis APIs.
            Please use a modern browser like Chrome, Edge, or Safari on desktop.
          </p>
          <button
            onClick={() => router.push('/practice')}
            className="game-button mt-8"
          >
            Back to Practice
          </button>
        </div>
      </div>
    );
  }

  // ─── Score Calculation for Completion ───────────────────────

  const totalScore = turnScores.reduce((a, b) => a + b, 0);
  const maxScore = selectedScenario ? selectedScenario.turns.length * 2 : 1;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // ─── Render ─────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col safe-top safe-bottom">
      <Confetti isActive={showConfetti} />
      <XPGain amount={xpEarned} isVisible={showXP} onComplete={() => setShowXP(false)} />

      {/* ─── Header ─────────────────────────────────────── */}
      <div className="px-4 py-4 flex items-center gap-3">
        <button
          onClick={state === 'scenario_select' ? () => router.back() : resetToMenu}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1">
          {selectedScenario && state !== 'scenario_select' && state !== 'complete' ? (
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedScenario.icon}</span>
              <span className="font-bold text-sm">{selectedScenario.title}</span>
              <span className="text-[var(--foreground)]/30 text-xs ml-auto">
                Turn {currentTurn + 1}/{selectedScenario.turns.length}
              </span>
            </div>
          ) : state === 'scenario_select' ? (
            <h1 className="font-bold text-lg">
              <span className="gradient-text">Conversation Practice</span>
            </h1>
          ) : null}
        </div>
      </div>

      {/* ─── Scene Context Chip + Turn Progress Bar ──────── */}
      {selectedScenario && state !== 'scenario_select' && state !== 'complete' && (
        <div className="px-4 mb-3">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#d4a520]/15 to-[#e94560]/10 border border-[#d4a520]/25 text-xs font-semibold text-[#d4a520] mb-2"
          >
            {selectedScenario.sceneChip}
          </motion.div>
          <div className="flex gap-1.5">
            {selectedScenario.turns.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full flex-1 transition-all duration-500"
                style={{
                  background:
                    i < currentTurn
                      ? '#27ae60'
                      : i === currentTurn
                      ? '#d4a520'
                      : 'rgba(245, 240, 232, 0.1)',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ─── Scenario Selection ─────────────────────────── */}
      <AnimatePresence mode="wait">
        {state === 'scenario_select' && (
          <motion.div
            key="scenario-select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 px-4 pb-6 overflow-y-auto"
          >
            <p className="text-[var(--foreground)]/40 text-sm mb-1">
              Practice real German conversations
            </p>
            <p className="text-[var(--foreground)]/25 text-xs mb-5">
              AI speaks German, you respond. No typing needed!
            </p>

            {/* Nivin guidance */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2.5 game-card px-3 py-2 mb-3"
            >
              <Nivin mood="happy" size="sm" entrance={false} />
              <p className="text-xs text-[var(--foreground)]/60 leading-snug">Real conversations make you fluent. Practice until it feels natural! 💬</p>
            </motion.div>

            {/* How it works */}
            <div className="game-card p-4 mb-5">
              <h3 className="font-bold text-sm mb-3 text-[#d4a520]">How it works</h3>
              <div className="space-y-2.5">
                {[
                  { icon: '🔊', text: 'AI asks you a question in German' },
                  { icon: '🎙️', text: 'You speak your answer in German' },
                  { icon: '✅', text: 'Get instant feedback on your response' },
                  { icon: '🔄', text: 'Continue the conversation for 4 turns' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-base">{step.icon}</span>
                    <span className="text-xs text-[var(--foreground)]/60">{step.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scenario Cards */}
            <h3 className="font-bold text-sm mb-3 text-[var(--foreground)]/70">Choose a scenario</h3>
            <div className="space-y-3">
              {SCENARIOS.map((scenario, index) => (
                <motion.button
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectScenario(scenario)}
                  className="w-full game-card p-4 text-left transition-all active:bg-[var(--foreground)]/5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{
                        backgroundColor: 'rgba(212, 165, 32, 0.1)',
                        border: '2px solid rgba(212, 165, 32, 0.2)',
                      }}
                    >
                      {scenario.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base leading-tight mb-0.5">
                        {scenario.title}
                      </h3>
                      <p className="text-[var(--foreground)]/40 text-xs mb-2">
                        {scenario.titleDe}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${difficultyColors[scenario.difficulty]}`}
                        >
                          {scenario.difficulty}
                        </span>
                        <span className="text-[10px] text-[var(--foreground)]/30">
                          {scenario.turns.length} turns
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-[var(--foreground)]/20 flex-shrink-0" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Active Conversation ──────────────────────── */}
        {selectedScenario && state !== 'scenario_select' && state !== 'complete' && (
          <motion.div
            key="conversation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Chat Area */}
            <div className="flex-1 px-4 overflow-y-auto pb-4 space-y-3">
              {conversationLog.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${entry.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                  {entry.role === 'ai' ? (
                    <div className="max-w-[85%] flex gap-2 items-end">
                      {/* AI avatar — Nivin */}
                      <div className="flex-shrink-0">
                        <Nivin mood="happy" size="sm" entrance={false} />
                      </div>
                      <div className="rounded-2xl rounded-bl-md bg-gradient-to-br from-[#d4a520]/25 to-[#d4a520]/10 border border-[#d4a520]/35 px-4 py-3 shadow-[0_2px_10px_rgba(212,165,32,0.15)]">
                        <p className="text-sm leading-relaxed">{entry.text}</p>

                        {/* Speaker button on the latest AI message */}
                        {i === conversationLog.length - 1 ||
                        (i === conversationLog.length - 2 && conversationLog[conversationLog.length - 1]?.role === 'student') ? (
                          <button
                            onClick={() => speakGerman(entry.text)}
                            className="mt-2 flex items-center gap-1.5 text-[10px] text-[#d4a520]/70 hover:text-[#d4a520] transition-colors"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>Replay</span>
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[80%]">
                      <div
                        className={`rounded-2xl rounded-br-md px-4 py-3 shadow-[0_2px_10px_rgba(233,69,96,0.18)] ${
                          entry.correct === false
                            ? 'bg-gradient-to-br from-[#c0392b]/35 to-[#c0392b]/15 border border-[#c0392b]/40 text-white'
                            : 'bg-gradient-to-br from-[#e94560]/35 to-[#c0392b]/20 border border-[#e94560]/40 text-white'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{entry.text}</p>
                      </div>
                      {entry.correct === false && (
                        <p className="text-[10px] text-[#c0392b]/70 mt-1 text-right">
                          Not quite right
                        </p>
                      )}
                      {entry.correct === true && (
                        <p className="text-[10px] text-[#27ae60]/70 mt-1 text-right flex items-center justify-end gap-1">
                          <Check className="w-3 h-3" />
                          Good answer
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* AI Speaking / Typing Indicator — Nivin thinking */}
              {state === 'ai_speaking' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2 items-end">
                    <div className="flex-shrink-0">
                      <Nivin mood="thinking" size="sm" entrance={false} />
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-[#d4a520]/25 to-[#d4a520]/10 border border-[#d4a520]/35 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="w-2 h-2 bg-[#d4a520] rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-[#d4a520] rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-[#d4a520] rounded-full"
                        />
                        <Volume2 className="w-4 h-4 text-[#d4a520] ml-1 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Live Transcription */}
              {(state === 'student_turn') && (transcript || interimTranscript) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-[var(--card-bg)] border border-[var(--card-border)] px-4 py-3">
                    <p className="text-sm leading-relaxed">
                      {transcript}
                      {interimTranscript && (
                        <span className="text-[var(--foreground)]/40">{interimTranscript}</span>
                      )}
                    </p>
                    {isListening && (
                      <div className="flex items-center gap-1 mt-1">
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-1.5 h-1.5 bg-[#c0392b] rounded-full"
                        />
                        <span className="text-[10px] text-[#c0392b]/70">Listening...</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* ─── Nivin Coaching Between Turns ─────────── */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={`mx-4 mb-3 rounded-xl px-4 py-3 flex items-start gap-3 ${
                    turnResult === 'correct'
                      ? 'bg-gradient-to-r from-[#27ae60]/20 to-[#27ae60]/8 border border-[#27ae60]/30'
                      : 'bg-gradient-to-r from-[#d4a520]/20 to-[#d4a520]/8 border border-[#d4a520]/30'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <Nivin
                      mood={turnResult === 'correct' ? 'excited' : 'pointing'}
                      size="sm"
                      entrance={false}
                    />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-medium leading-snug">{feedback}</p>
                    {turnResult === 'retry' && selectedScenario && (
                      <p className="text-xs text-[var(--foreground)]/60 mt-1">
                        <span className="text-[#d4a520] font-semibold">Nivin&apos;s hint:</span>{' '}
                        {selectedScenario.turns[currentTurn].hint}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Bottom Controls ──────────────────────── */}
            <div className="px-4 pb-6 pt-2 border-t border-[var(--card-border)]">
              {state === 'student_turn' && (
                <div className="flex flex-col items-center gap-3">
                  {/* Hint text */}
                  {selectedScenario && (
                    <p className="text-xs text-[var(--foreground)]/40 text-center">
                      {turnResult === 'retry'
                        ? selectedScenario.turns[currentTurn].hint
                        : 'Tap the mic and speak in German'}
                    </p>
                  )}

                  <div className="flex items-center gap-4">
                    {/* Replay button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={replayAudio}
                      disabled={isSpeaking}
                      className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--foreground)]/60 disabled:opacity-30"
                    >
                      <Volume2 className="w-5 h-5" />
                    </motion.button>

                    {/* Main Mic Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleMic}
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                        isListening
                          ? 'bg-[#c0392b] shadow-[0_0_0_4px_rgba(192,57,43,0.3),0_0_20px_rgba(192,57,43,0.4)]'
                          : 'bg-gradient-to-b from-[#d4a520] to-[#b8891a] shadow-[0_5px_0_#8a6412,0_7px_16px_rgba(0,0,0,0.3)]'
                      }`}
                    >
                      {isListening ? (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          <MicOff className="w-8 h-8 text-white" />
                        </motion.div>
                      ) : (
                        <Mic className="w-8 h-8 text-[#1b2d1b]" />
                      )}
                    </motion.button>

                    {/* Submit button (when transcript exists and not listening) */}
                    {(transcript || interimTranscript) && !isListening ? (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={evaluateResponse}
                        className="w-12 h-12 rounded-full bg-[#27ae60] flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.button>
                    ) : (
                      <div className="w-12 h-12" /> /* spacer */
                    )}
                  </div>

                  {isListening && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-[#c0392b] font-medium"
                    >
                      Tap to stop recording
                    </motion.p>
                  )}
                </div>
              )}

              {state === 'ai_speaking' && (
                <div className="flex flex-col items-center gap-2 py-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Volume2 className="w-8 h-8 text-[#d4a520]" />
                  </motion.div>
                  <p className="text-sm text-[var(--foreground)]/40">AI is speaking...</p>
                </div>
              )}

              {state === 'evaluating' && (
                <div className="flex flex-col items-center gap-2 py-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 border-3 border-[#d4a520] border-t-transparent rounded-full"
                  />
                  <p className="text-sm text-[var(--foreground)]/40">Checking your answer...</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── Completion Screen ────────────────────────── */}
        {state === 'complete' && selectedScenario && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center px-6 pb-8"
          >
            {/* Big emoji */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
              className="text-7xl mb-4"
            >
              {percentage >= 75 ? '🏆' : percentage >= 50 ? '👏' : '💪'}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-1 text-center"
            >
              {percentage >= 75
                ? 'Conversation Complete!'
                : percentage >= 50
                ? 'Good Effort!'
                : 'Keep Practicing!'}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-[var(--foreground)]/50 mb-6 text-center"
            >
              {getRandomItem(FEEDBACK_COMPLETE)}
            </motion.p>

            {/* Score Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="game-card p-5 w-full max-w-xs mb-6"
            >
              <div className="text-center mb-4">
                <div className="text-4xl font-bold gradient-text animate-shimmer">
                  {percentage}%
                </div>
                <p className="text-xs text-[var(--foreground)]/40 mt-1">
                  {selectedScenario.title} - {selectedScenario.titleDe}
                </p>
              </div>

              {/* Turn breakdown */}
              <div className="space-y-2">
                {turnScores.map((score, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-[var(--foreground)]/40 w-16">Turn {i + 1}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-[var(--foreground)]/10">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(score / 2) * 100}%`,
                          background:
                            score === 2
                              ? '#27ae60'
                              : score === 1
                              ? '#d4a520'
                              : '#c0392b',
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold w-5 text-right">
                      {score === 2 ? (
                        <Check className="w-4 h-4 text-[#27ae60] inline" />
                      ) : score === 1 ? (
                        <span className="text-[#d4a520]">~</span>
                      ) : (
                        <X className="w-4 h-4 text-[#c0392b] inline" />
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* XP earned */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-[var(--card-border)]">
                <span className="text-lg">⭐</span>
                <span className="font-bold text-[#d4a520]">+{xpEarned} XP</span>
              </div>
            </motion.div>

            {/* Nivin Reflection — "you could actually do this in Germany" */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-start gap-3 w-full max-w-xs mb-6 p-3 rounded-xl bg-gradient-to-br from-[#d4a520]/15 to-[#e94560]/10 border border-[#d4a520]/25"
            >
              <div className="flex-shrink-0">
                <Nivin mood="happy" size="sm" entrance={false} />
              </div>
              <p className="text-xs text-[var(--foreground)]/75 leading-relaxed pt-1">
                {selectedScenario.reflection}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3 w-full max-w-xs"
            >
              <button
                onClick={() => selectScenario(selectedScenario)}
                className="game-button w-full flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
              <button
                onClick={resetToMenu}
                className="game-button game-button-success w-full"
              >
                More Scenarios
              </button>
              <button
                onClick={() => router.push('/practice')}
                className="text-sm text-[var(--foreground)]/40 hover:text-[var(--foreground)]/60 transition-colors py-2"
              >
                Back to Practice
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
