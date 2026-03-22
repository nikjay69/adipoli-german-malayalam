'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Mic,
  MicOff,
  ChevronRight,
  RotateCcw,
  Trophy,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useGameStore } from '@/lib/store';

// ---------------------------------------------------------------------------
// Web Speech API types
// ---------------------------------------------------------------------------

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

function getSpeechRecognitionClass(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

// ---------------------------------------------------------------------------
// Topic data
// ---------------------------------------------------------------------------

interface IntroTopic {
  id: string;
  label: string;
  icon: string;
  question: string;
  hint: string;
  modelAnswer: string;
  keywords: string[];
}

const TOPICS: IntroTopic[] = [
  {
    id: 'name',
    label: 'Name',
    icon: '👤',
    question: 'Wie heißen Sie?',
    hint: 'Ich heiße...',
    modelAnswer: 'Ich heiße Arun Nair.',
    keywords: ['heiße', 'name', 'bin', 'mein name'],
  },
  {
    id: 'alter',
    label: 'Alter',
    icon: '🎂',
    question: 'Wie alt sind Sie?',
    hint: 'Ich bin ... Jahre alt.',
    modelAnswer: 'Ich bin 24 Jahre alt.',
    keywords: ['bin', 'jahre', 'alt'],
  },
  {
    id: 'land',
    label: 'Land',
    icon: '🌍',
    question: 'Woher kommen Sie?',
    hint: 'Ich komme aus...',
    modelAnswer: 'Ich komme aus Indien, aus Kerala.',
    keywords: ['komme', 'aus', 'indien', 'india', 'kerala'],
  },
  {
    id: 'sprachen',
    label: 'Sprachen',
    icon: '💬',
    question: 'Welche Sprachen sprechen Sie?',
    hint: 'Ich spreche...',
    modelAnswer: 'Ich spreche Malayalam, Englisch und ein bisschen Deutsch.',
    keywords: ['spreche', 'sprache', 'deutsch', 'englisch', 'malayalam'],
  },
  {
    id: 'beruf',
    label: 'Beruf',
    icon: '💼',
    question: 'Was sind Sie von Beruf?',
    hint: 'Ich bin... / Ich arbeite als...',
    modelAnswer: 'Ich bin Software-Ingenieur.',
    keywords: ['bin', 'arbeite', 'beruf', 'student', 'ingenieur', 'studiere'],
  },
  {
    id: 'hobbys',
    label: 'Hobbys',
    icon: '🎯',
    question: 'Was sind Ihre Hobbys?',
    hint: 'Meine Hobbys sind...',
    modelAnswer: 'Meine Hobbys sind Lesen, Kochen und Reisen.',
    keywords: ['hobby', 'hobbys', 'gern', 'gerne', 'lesen', 'kochen', 'sport', 'musik', 'reisen', 'spielen'],
  },
];

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

type TopicScore = 'covered' | 'partial' | 'missing';

function scoreTopic(transcript: string, topic: IntroTopic): TopicScore {
  if (!transcript || transcript.trim().length === 0) return 'missing';
  const lower = transcript.toLowerCase();
  const matchCount = topic.keywords.filter(kw => lower.includes(kw)).length;
  if (matchCount >= 2) return 'covered';
  if (matchCount >= 1 || lower.length > 5) return 'partial';
  return 'missing';
}

// ---------------------------------------------------------------------------
// Timer hook
// ---------------------------------------------------------------------------

function useTimer(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, seconds]);

  const formatTime = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  return { seconds, formatTime, isRunning, start, pause, reset };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function IntroSpeakPage() {
  const router = useRouter();
  const { addXP, updateStreak, incrementGamesPlayed } = useGameStore();

  const [mounted, setMounted] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  // Phase: 'ready' | 'speaking' | 'results'
  const [phase, setPhase] = useState<'ready' | 'speaking' | 'results'>('ready');

  // Current topic index (0-5)
  const [currentTopicIdx, setCurrentTopicIdx] = useState(0);

  // Transcriptions per topic
  const [transcripts, setTranscripts] = useState<Record<string, string>>({});

  // Speech recognition state
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [micError, setMicError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Timer (2 minutes)
  const timer = useTimer(120);

  // Results
  const [scores, setScores] = useState<Record<string, TopicScore>>({});
  const [showModelAnswers, setShowModelAnswers] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!getSpeechRecognitionClass()) {
      setIsSupported(false);
    }
  }, []);

  // Auto-stop when timer runs out
  useEffect(() => {
    if (timer.seconds === 0 && phase === 'speaking') {
      stopListening();
      finishSpeaking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.seconds, phase]);

  const currentTopic = TOPICS[currentTopicIdx];

  // ---------------------------------------------------------------------------
  // Speech Recognition
  // ---------------------------------------------------------------------------

  const startListening = useCallback(() => {
    const SRClass = getSpeechRecognitionClass();
    if (!SRClass) return;

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* no-op */ }
    }

    const recognition = new SRClass();
    recognition.lang = 'de-DE';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setMicError(null);
      setInterimText('');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interim = '';

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interim += transcript;
        }
      }

      setInterimText(interim);

      if (finalTranscript) {
        const topicId = TOPICS[currentTopicIdx]?.id;
        if (topicId) {
          setTranscripts(prev => ({
            ...prev,
            [topicId]: (prev[topicId] || '') + (prev[topicId] ? ' ' : '') + finalTranscript.trim(),
          }));
        }
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        setMicError('Microphone access denied. Please allow mic permission.');
        setIsListening(false);
      } else if (event.error === 'no-speech') {
        // Silently ignore — user might just be thinking
      } else if (event.error !== 'aborted') {
        setMicError(`Error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      // Auto-restart if we're still in speaking phase and timer is running
      if (phase === 'speaking' && timer.seconds > 0 && timer.isRunning) {
        try {
          setTimeout(() => {
            if (recognitionRef.current && phase === 'speaking') {
              try { recognition.start(); } catch { /* no-op */ }
            }
          }, 200);
        } catch { /* no-op */ }
      }
    };

    try {
      recognition.start();
    } catch {
      setMicError('Could not start microphone. Please try again.');
    }
  }, [currentTopicIdx, phase, timer.seconds, timer.isRunning]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* no-op */ }
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimText('');
  }, []);

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  const startSpeaking = useCallback(() => {
    setPhase('speaking');
    setCurrentTopicIdx(0);
    setTranscripts({});
    timer.reset();
    timer.start();
    // Start listening automatically
    setTimeout(() => {
      startListening();
    }, 300);
  }, [timer, startListening]);

  const goToNextTopic = useCallback(() => {
    stopListening();

    if (currentTopicIdx < TOPICS.length - 1) {
      setCurrentTopicIdx(prev => prev + 1);
      setInterimText('');
      // Restart recognition for the next topic
      setTimeout(() => {
        startListening();
      }, 300);
    } else {
      finishSpeaking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTopicIdx, stopListening, startListening]);

  const finishSpeaking = useCallback(() => {
    stopListening();
    timer.pause();
    setPhase('results');

    // Calculate scores
    const newScores: Record<string, TopicScore> = {};
    let coveredCount = 0;
    let partialCount = 0;

    TOPICS.forEach(topic => {
      const transcript = transcripts[topic.id] || '';
      const score = scoreTopic(transcript, topic);
      newScores[topic.id] = score;
      if (score === 'covered') coveredCount++;
      if (score === 'partial') partialCount++;
    });

    setScores(newScores);

    // XP: 5 per covered, 2 per partial, +5 bonus if all covered
    const xp = coveredCount * 5 + partialCount * 2 + (coveredCount === TOPICS.length ? 5 : 0);
    setXpAwarded(xp);
    if (xp > 0) {
      addXP(xp);
      updateStreak();
    }
    incrementGamesPlayed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopListening, timer, transcripts, addXP, updateStreak, incrementGamesPlayed]);

  // ---------------------------------------------------------------------------
  // Restart
  // ---------------------------------------------------------------------------

  const restart = useCallback(() => {
    setPhase('ready');
    setCurrentTopicIdx(0);
    setTranscripts({});
    setScores({});
    setXpAwarded(0);
    setShowModelAnswers(false);
    timer.reset();
    setMicError(null);
  }, [timer]);

  // ---------------------------------------------------------------------------
  // Score visual helpers
  // ---------------------------------------------------------------------------

  const scoreIcon = (s: TopicScore) => {
    if (s === 'covered') return <CheckCircle className="w-5 h-5 text-[#27ae60]" />;
    if (s === 'partial') return <AlertCircle className="w-5 h-5 text-[#d4a520]" />;
    return <XCircle className="w-5 h-5 text-[#c0392b]" />;
  };

  const scoreBg = (s: TopicScore) => {
    if (s === 'covered') return 'border-[#27ae60]/30 bg-[#27ae60]/5';
    if (s === 'partial') return 'border-[#d4a520]/30 bg-[#d4a520]/5';
    return 'border-[#c0392b]/30 bg-[#c0392b]/5';
  };

  const scoreLabel = (s: TopicScore) => {
    if (s === 'covered') return 'Covered';
    if (s === 'partial') return 'Partial';
    return 'Missing';
  };

  // ---------------------------------------------------------------------------
  // Loading
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Unsupported browser
  // ---------------------------------------------------------------------------

  if (!isSupported) {
    return (
      <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
        <button
          onClick={() => router.push('/practice')}
          className="flex items-center gap-2 text-[var(--foreground)]/50 mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="game-card p-6 text-center">
          <MicOff className="w-12 h-12 mx-auto text-[#c0392b] mb-4" />
          <h1 className="text-xl font-bold mb-2">Speech Recognition Not Available</h1>
          <p className="text-[var(--foreground)]/50 text-sm mb-4">
            Your browser doesn&apos;t support the Web Speech API. Please use
            <strong> Google Chrome</strong> or <strong>Microsoft Edge</strong> for the best experience.
          </p>
          <button
            onClick={() => router.push('/practice')}
            className="game-button"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // READY phase
  // ---------------------------------------------------------------------------

  if (phase === 'ready') {
    return (
      <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <button
            onClick={() => router.push('/practice')}
            className="flex items-center gap-2 text-[var(--foreground)]/50 mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-2xl font-bold mb-1">
            <span className="gradient-text">Sich Vorstellen</span>
          </h1>
          <p className="text-[var(--foreground)]/40 text-sm mb-6">
            Goethe A1 Sprechen Teil 1 — Introduce yourself in German
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="game-card p-4 mb-5"
        >
          <h3 className="font-bold text-sm mb-3">How It Works</h3>
          <div className="space-y-2.5 text-xs text-[var(--foreground)]/50">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#d4a520]/20 text-[#d4a520] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">1</span>
              <span>You get <strong>2 minutes</strong> to introduce yourself on <strong>6 topics</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#d4a520]/20 text-[#d4a520] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">2</span>
              <span>Each card shows a topic with a hint. Speak into the mic in German.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#d4a520]/20 text-[#d4a520] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">3</span>
              <span>Tap <strong>Next Topic</strong> when done with each one.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#d4a520]/20 text-[#d4a520] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">4</span>
              <span>After all 6, see your score: green = covered, yellow = partial, red = missing.</span>
            </div>
          </div>
        </motion.div>

        {/* Topics preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="game-card p-4 mb-5"
        >
          <h3 className="font-bold text-sm mb-3">6 Topics</h3>
          <div className="grid grid-cols-3 gap-2">
            {TOPICS.map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="game-card p-2.5 text-center"
              >
                <span className="text-xl">{topic.icon}</span>
                <p className="text-[10px] font-bold mt-1 text-[var(--foreground)]/60">{topic.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.95 }}
          onClick={startSpeaking}
          className="w-full game-button text-center text-lg"
        >
          <span className="flex items-center justify-center gap-2">
            <Mic className="w-5 h-5" /> Start Introduction
          </span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-[var(--foreground)]/20 text-xs mt-4"
        >
          Uses your browser microphone for speech recognition (de-DE)
        </motion.p>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SPEAKING phase
  // ---------------------------------------------------------------------------

  if (phase === 'speaking') {
    const currentTranscript = transcripts[currentTopic.id] || '';
    const isLastTopic = currentTopicIdx === TOPICS.length - 1;

    return (
      <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
        {/* Timer bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => { stopListening(); restart(); }}
              className="flex items-center gap-1 text-[var(--foreground)]/40 text-xs"
            >
              <ArrowLeft className="w-3 h-3" /> Exit
            </button>
            <div className={`flex items-center gap-1.5 text-sm font-bold ${
              timer.seconds <= 30 ? 'text-[#c0392b]' : 'text-[#d4a520]'
            }`}>
              <Clock className="w-4 h-4" />
              <span className={timer.seconds <= 30 ? 'animate-pulse' : ''}>{timer.formatTime}</span>
            </div>
          </div>

          {/* Timer progress bar */}
          <div className="w-full h-1.5 bg-[var(--foreground)]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor: timer.seconds <= 30 ? '#c0392b' : '#d4a520',
                width: `${(timer.seconds / 120) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {TOPICS.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`w-3 h-3 rounded-full transition-all ${
                i < currentTopicIdx
                  ? 'bg-[#27ae60]'
                  : i === currentTopicIdx
                  ? 'bg-[#d4a520] ring-4 ring-[#d4a520]/20'
                  : 'bg-[var(--foreground)]/15'
              }`}
              title={topic.label}
            />
          ))}
        </div>

        {/* Topic card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTopic.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: 'spring', damping: 20 }}
            className="game-card p-6 mb-5 text-center relative overflow-hidden"
          >
            {/* Accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4a520] via-[#e94560] to-[#0f3460]" />

            {/* Topic number */}
            <span className="text-[10px] font-bold text-[var(--foreground)]/30 uppercase tracking-widest">
              Topic {currentTopicIdx + 1} of {TOPICS.length}
            </span>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="text-5xl my-3"
            >
              {currentTopic.icon}
            </motion.div>

            {/* Question */}
            <h2 className="text-xl font-bold text-[#d4a520] mb-1">{currentTopic.question}</h2>

            {/* Hint */}
            <p className="text-sm text-[var(--foreground)]/40 italic">
              Hint: &ldquo;{currentTopic.hint}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Mic button and status */}
        <div className="flex flex-col items-center mb-5">
          <motion.div
            animate={isListening ? { scale: [1, 1.05, 1] } : {}}
            transition={isListening ? { duration: 1.5, repeat: Infinity } : {}}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-3 ${
              isListening
                ? 'bg-[#c0392b] shadow-[0_0_30px_rgba(192,57,43,0.4)]'
                : 'bg-[#e94560] shadow-lg'
            }`}
          >
            {isListening && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/20"
                  animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/10"
                  animate={{ scale: [1, 1.7], opacity: [0.3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
                />
              </>
            )}
            {isListening ? (
              <Mic className="w-8 h-8 text-white relative z-10" />
            ) : (
              <MicOff className="w-8 h-8 text-white/60 relative z-10" />
            )}
          </motion.div>

          <p className="text-xs text-[var(--foreground)]/40">
            {isListening ? 'Listening... Speak now!' : 'Mic stopped'}
          </p>
        </div>

        {/* Mic error */}
        {micError && (
          <div className="game-card p-3 mb-4 border-[#c0392b]/30">
            <p className="text-xs text-[#c0392b] text-center">{micError}</p>
          </div>
        )}

        {/* Real-time transcript */}
        <div className="game-card p-4 mb-5 min-h-[80px]">
          <p className="text-[10px] font-bold text-[var(--foreground)]/30 uppercase tracking-wide mb-2">
            Your Speech
          </p>
          {currentTranscript ? (
            <p className="text-sm text-[var(--foreground)]/70 leading-relaxed">
              {currentTranscript}
            </p>
          ) : (
            <p className="text-sm text-[var(--foreground)]/20 italic">
              {interimText || 'Start speaking...'}
            </p>
          )}
          {interimText && currentTranscript && (
            <p className="text-sm text-[var(--foreground)]/30 italic mt-1">
              {interimText}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {!isListening && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={startListening}
              className="flex-1 game-button-secondary game-button text-center text-sm"
            >
              <span className="flex items-center justify-center gap-2">
                <Mic className="w-4 h-4" /> Resume Mic
              </span>
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={isLastTopic ? finishSpeaking : goToNextTopic}
            className="flex-1 game-button text-center text-sm"
          >
            <span className="flex items-center justify-center gap-2">
              {isLastTopic ? (
                <>
                  <Trophy className="w-4 h-4" /> Finish
                </>
              ) : (
                <>
                  Next Topic <ChevronRight className="w-4 h-4" />
                </>
              )}
            </span>
          </motion.button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // RESULTS phase
  // ---------------------------------------------------------------------------

  if (phase === 'results') {
    const coveredCount = Object.values(scores).filter(s => s === 'covered').length;
    const partialCount = Object.values(scores).filter(s => s === 'partial').length;

    return (
      <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-5"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="w-16 h-16 bg-gradient-to-br from-[#d4a520] to-[#b8891a] rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <Trophy className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-1">
            <span className="gradient-text">Introduction Complete!</span>
          </h1>
          <p className="text-[var(--foreground)]/40 text-sm">
            {coveredCount === TOPICS.length
              ? 'Perfect! You covered all topics!'
              : coveredCount >= 4
              ? 'Great job! Almost all topics covered.'
              : 'Good start. Keep practicing to cover all topics.'}
          </p>
        </motion.div>

        {/* Summary stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-2 mb-5"
        >
          <div className="game-card p-3 text-center">
            <div className="text-lg font-bold text-[#27ae60]">{coveredCount}</div>
            <div className="text-[10px] text-[var(--foreground)]/40">Covered</div>
          </div>
          <div className="game-card p-3 text-center">
            <div className="text-lg font-bold text-[#d4a520]">{partialCount}</div>
            <div className="text-[10px] text-[var(--foreground)]/40">Partial</div>
          </div>
          <div className="game-card p-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-[#d4a520]" />
              <span className="text-lg font-bold animate-shimmer">+{xpAwarded}</span>
            </div>
            <div className="text-[10px] text-[var(--foreground)]/40">XP Earned</div>
          </div>
        </motion.div>

        {/* Per-topic results */}
        <div className="space-y-2.5 mb-5">
          {TOPICS.map((topic, i) => {
            const score = scores[topic.id] || 'missing';
            const transcript = transcripts[topic.id] || '';

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className={`game-card p-3 border ${scoreBg(score)}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{topic.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">{topic.label}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        score === 'covered' ? 'bg-[#27ae60]/20 text-[#27ae60]'
                        : score === 'partial' ? 'bg-[#d4a520]/20 text-[#d4a520]'
                        : 'bg-[#c0392b]/20 text-[#c0392b]'
                      }`}>
                        {scoreLabel(score)}
                      </span>
                    </div>
                    {transcript ? (
                      <p className="text-xs text-[var(--foreground)]/50 leading-relaxed">
                        &ldquo;{transcript}&rdquo;
                      </p>
                    ) : (
                      <p className="text-xs text-[var(--foreground)]/25 italic">No speech recorded</p>
                    )}
                  </div>
                  {scoreIcon(score)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Model answers toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setShowModelAnswers(!showModelAnswers)}
          className="w-full game-card p-3 cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors mb-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {showModelAnswers ? (
                <EyeOff className="w-4 h-4 text-[#d4a520]" />
              ) : (
                <Eye className="w-4 h-4 text-[#d4a520]" />
              )}
              <span className="text-sm font-bold">
                {showModelAnswers ? 'Hide Model Answers' : 'Show Model Answers'}
              </span>
            </div>
          </div>

          <AnimatePresence>
            {showModelAnswers && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-2 border-t border-[var(--foreground)]/10 pt-3">
                  {TOPICS.map(topic => (
                    <div key={topic.id} className="flex items-start gap-2">
                      <span className="text-sm flex-shrink-0">{topic.icon}</span>
                      <div>
                        <span className="text-[10px] font-bold text-[#d4a520] uppercase">
                          {topic.label}
                        </span>
                        <p className="text-xs text-[var(--foreground)]/50 leading-relaxed">
                          {topic.modelAnswer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Full transcript */}
        {Object.keys(transcripts).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="game-card p-4 mb-5"
          >
            <h3 className="font-bold text-sm mb-2">Full Transcription</h3>
            <p className="text-xs text-[var(--foreground)]/50 leading-relaxed whitespace-pre-wrap">
              {TOPICS.map(topic => transcripts[topic.id] || '')
                .filter(Boolean)
                .join(' ')}
            </p>
          </motion.div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.95 }}
            onClick={restart}
            className="flex-1 game-button text-center"
          >
            <span className="flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Try Again
            </span>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/practice')}
            className="flex-1 game-button-secondary game-button text-center"
          >
            Done
          </motion.button>
        </div>
      </div>
    );
  }

  return null;
}
