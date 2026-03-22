'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, MicOff, Volume2, RefreshCw, Trophy, Flame, Star, Zap } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { Kuttan, SpeechBubble } from '@/components/character';
import type { KuttanMood } from '@/components/character';
import { useGameStore } from '@/lib/store';
import { getAllVocabulary, type VocabItem } from '@/lib/content/modules';
import { playVocabAudio } from '@/lib/audio';

// ---------------------------------------------------------------------------
// Web Speech API types (not in all TS libs)
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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Mode = 'words' | 'phrases' | 'free';

interface AttemptResult {
  heard: string;
  expected: string;
  score: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function compareText(expected: string, heard: string): number {
  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^\w\s\u00f6\u00e4\u00fc\u00df]/g, '').trim();
  const e = normalize(expected);
  const h = normalize(heard);
  if (e === h) return 100;
  const eWords = e.split(/\s+/);
  const hWords = h.split(/\s+/);
  let matches = 0;
  for (const w of eWords) {
    if (hWords.includes(w)) matches++;
  }
  return Math.round((matches / eWords.length) * 100);
}

function shuffleArray<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getSpeechRecognitionClass(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

// Kuttan reactions per score band
function getReaction(score: number, streak: number): { mood: KuttanMood; message: string } {
  if (score === 100 && streak >= 5)
    return { mood: 'celebrating', message: 'Adipoli machaa! 5 in a row! You sound like a native!' };
  if (score === 100 && streak >= 3)
    return { mood: 'excited', message: 'Maaasss! Hat-trick streak! Keep it rolling!' };
  if (score === 100)
    return { mood: 'happy', message: 'Perfect! Nailed it! Your German is getting sharp!' };
  if (score >= 75)
    return { mood: 'happy', message: 'Almost there! One more try and you\'ll get it exact!' };
  if (score >= 50)
    return { mood: 'thinking', message: 'Decent try! Listen carefully and give it another shot.' };
  if (score >= 25)
    return { mood: 'pointing', message: 'Paravaala, it\'s a tough one. Try listening first, then speak slowly.' };
  return { mood: 'sad', message: 'Aiyyo! That was tricky. Tap the speaker to hear it first!' };
}

const MODE_LABELS: Record<Mode, string> = {
  words: 'Words',
  phrases: 'Phrases',
  free: 'Free Speak',
};

const MODE_DESCRIPTIONS: Record<Mode, string> = {
  words: 'Practice single German words',
  phrases: 'Practice full example sentences',
  free: 'Say anything in German and see the transcription',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PronunciationPage() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  // --- speech recognition support ---
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // --- vocab pool ---
  const [vocab, setVocab] = useState<VocabItem[]>([]);
  const [currentItem, setCurrentItem] = useState<VocabItem | null>(null);

  // --- mode ---
  const [mode, setMode] = useState<Mode>('words');

  // --- listening state ---
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [micError, setMicError] = useState<string | null>(null);

  // --- result ---
  const [result, setResult] = useState<AttemptResult | null>(null);

  // --- stats ---
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  // --- kuttan ---
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('waving');
  const [kuttanMessage, setKuttanMessage] = useState('Ready to practice your pronunciation? Tap the mic and speak!');
  const [showBubble, setShowBubble] = useState(true);

  // --- playing audio ---
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // --- session finished ---
  const [sessionDone, setSessionDone] = useState(false);

  // Initialise vocab pool
  useEffect(() => {
    const all = getAllVocabulary();
    setVocab(shuffleArray(all));
  }, []);

  // Check browser support
  useEffect(() => {
    if (!getSpeechRecognitionClass()) {
      setIsSupported(false);
    }
  }, []);

  // Pick a new word/phrase
  const pickNext = useCallback(() => {
    if (vocab.length === 0) return;
    const pool = shuffleArray(vocab);
    setCurrentItem(pool[0]);
    setResult(null);
    setInterimText('');
    setMicError(null);
  }, [vocab]);

  useEffect(() => {
    if (vocab.length > 0 && !currentItem) {
      pickNext();
    }
  }, [vocab, currentItem, pickNext]);

  // The expected text depends on mode
  const expectedText = (() => {
    if (!currentItem) return '';
    if (mode === 'words') return currentItem.german;
    if (mode === 'phrases') return currentItem.example;
    return ''; // free mode has no expected text
  })();

  // ---------------------------------------------------------------------------
  // Speech Recognition
  // ---------------------------------------------------------------------------

  const startListening = useCallback(() => {
    const SRClass = getSpeechRecognitionClass();
    if (!SRClass) return;

    // tear down old instance
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }

    const recognition = new SRClass();
    recognition.lang = 'de-DE';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setMicError(null);
      setResult(null);
      setInterimText('');
    };

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      if (interim) setInterimText(interim);
      if (final) {
        setInterimText('');
        handleFinalResult(final);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setMicError('Microphone access denied. Please allow microphone permission in your browser settings.');
      } else if (event.error === 'no-speech') {
        setMicError('No speech detected. Make sure you speak clearly into your microphone.');
      } else {
        setMicError(`Error: ${event.error}. Please try again.`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch {
      setMicError('Could not start microphone. Please try again.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, currentItem, streak, expectedText]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    setIsListening(false);
  }, []);

  // ---------------------------------------------------------------------------
  // Result handling
  // ---------------------------------------------------------------------------

  const handleFinalResult = useCallback(
    (heard: string) => {
      setTotalAttempts((p) => p + 1);

      if (mode === 'free') {
        // Free mode: just show transcription, no scoring
        setResult({ heard, expected: '', score: -1 });
        setKuttanMood('happy');
        setKuttanMessage(`Nice! I heard: "${heard}". Keep practicing!`);
        setShowBubble(true);
        return;
      }

      const score = compareText(expectedText, heard);
      setResult({ heard, expected: expectedText, score });

      if (score === 100) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) setBestStreak(newStreak);
        setTotalCorrect((p) => p + 1);

        // XP: 5 base + streak bonus
        const bonus = newStreak >= 5 ? 10 : newStreak >= 3 ? 5 : 0;
        const xp = 5 + bonus;
        addXP(xp);
        setXpEarned((p) => p + xp);

        const reaction = getReaction(score, newStreak);
        setKuttanMood(reaction.mood);
        setKuttanMessage(reaction.message);
      } else {
        setStreak(0);
        const reaction = getReaction(score, 0);
        setKuttanMood(reaction.mood);
        setKuttanMessage(reaction.message);
      }
      setShowBubble(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, expectedText, streak, bestStreak, addXP],
  );

  // ---------------------------------------------------------------------------
  // Audio playback
  // ---------------------------------------------------------------------------

  const handlePlayAudio = useCallback(async () => {
    if (!currentItem || isPlayingAudio) return;
    setIsPlayingAudio(true);
    try {
      await playVocabAudio(currentItem.id);
    } catch {
      // Fallback: use browser TTS
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const utter = new SpeechSynthesisUtterance(
          mode === 'phrases' ? currentItem.example : currentItem.german,
        );
        utter.lang = 'de-DE';
        utter.rate = 0.85;
        window.speechSynthesis.speak(utter);
      }
    } finally {
      setIsPlayingAudio(false);
    }
  }, [currentItem, isPlayingAudio, mode]);

  // ---------------------------------------------------------------------------
  // Mode switch
  // ---------------------------------------------------------------------------

  const handleModeChange = useCallback(
    (newMode: Mode) => {
      setMode(newMode);
      setResult(null);
      setInterimText('');
      setStreak(0);
      if (newMode === 'free') {
        setKuttanMood('pointing');
        setKuttanMessage('Free Speak mode! Say anything in German and I\'ll show you the transcription.');
      } else {
        setKuttanMood('waving');
        setKuttanMessage(
          newMode === 'words'
            ? 'Tap the speaker to hear the word, then tap the mic and repeat it!'
            : 'Try the full sentence! Listen first, then give it a go!',
        );
      }
      setShowBubble(true);
      pickNext();
    },
    [pickNext],
  );

  // ---------------------------------------------------------------------------
  // Finish session
  // ---------------------------------------------------------------------------

  const finishSession = useCallback(() => {
    setSessionDone(true);
    incrementGamesPlayed();
    setKuttanMood('celebrating');
    setKuttanMessage('Great session! Come back tomorrow to keep your streak going!');
    setShowBubble(true);
  }, [incrementGamesPlayed]);

  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------

  const scoreColor = (score: number) => {
    if (score === 100) return '#27ae60';
    if (score >= 75) return '#d4a520';
    if (score >= 50) return '#e67e22';
    return '#c0392b';
  };

  // ---------------------------------------------------------------------------
  // Unsupported browser
  // ---------------------------------------------------------------------------

  if (!isSupported) {
    return (
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <Card className="text-center">
          <div className="text-5xl mb-4">
            <MicOff className="w-16 h-16 mx-auto text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Speech Recognition Not Available
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Your browser doesn&apos;t support the Web Speech API. Please try using
            <strong> Google Chrome</strong> or <strong>Microsoft Edge</strong> on desktop for the best experience.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </Card>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Session complete
  // ---------------------------------------------------------------------------

  if (sessionDone) {
    return (
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <AnimatePresence>
          <motion.div
            key="session-complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="text-center" padding="lg">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Session Complete!
              </h1>

              {/* Kuttan celebration */}
              <div className="flex flex-col items-center mb-4">
                <SpeechBubble
                  message={kuttanMessage}
                  visible={showBubble}
                  showTapHint={false}
                  position="top"
                />
                <Kuttan mood="celebrating" size="lg" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <div className="text-2xl font-bold text-[#27ae60]">{totalCorrect}</div>
                  <div className="text-xs text-gray-500">Perfect</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{totalAttempts}</div>
                  <div className="text-xs text-gray-500">Attempts</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <div className="text-2xl font-bold text-[#d4a520]">{bestStreak}</div>
                  <div className="text-xs text-gray-500">Best Streak</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <div className="text-2xl font-bold text-amber-500">+{xpEarned}</div>
                  <div className="text-xs text-gray-500">XP Earned</div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setSessionDone(false);
                    setTotalAttempts(0);
                    setTotalCorrect(0);
                    setXpEarned(0);
                    setStreak(0);
                    setBestStreak(0);
                    setResult(null);
                    pickNext();
                    setKuttanMood('waving');
                    setKuttanMessage('Let\'s go again! Tap the mic when ready.');
                    setShowBubble(true);
                  }}
                  fullWidth
                >
                  <RefreshCw className="w-5 h-5" />
                  Practice Again
                </Button>
                <Button variant="ghost" onClick={() => router.push('/games')} fullWidth>
                  Back to Games
                </Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Main UI
  // ---------------------------------------------------------------------------

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-3 text-sm">
          {streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 text-[#d4a520] font-bold"
            >
              <Flame className="w-4 h-4" />
              {streak}
            </motion.div>
          )}
          {xpEarned > 0 && (
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Zap className="w-4 h-4" />
              +{xpEarned} XP
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
      >
        Pronunciation Practice
      </motion.h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
        Listen, speak, and improve your German accent
      </p>

      {/* Mode Tabs */}
      <div className="flex gap-2 mb-6">
        {(['words', 'phrases', 'free'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all ${
              mode === m
                ? 'bg-[#e94560] text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      {/* Kuttan Guide */}
      <div className="flex items-end gap-3 mb-5">
        <Kuttan mood={kuttanMood} size="sm" />
        <SpeechBubble
          message={kuttanMessage}
          visible={showBubble}
          onDismiss={() => setShowBubble(false)}
          showTapHint={false}
          position="bottom"
        />
      </div>

      {/* Word / Phrase Card */}
      {mode !== 'free' && currentItem && (
        <motion.div
          key={currentItem.id + mode}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <Card className="mb-5 relative overflow-hidden">
            {/* Subtle accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4a520] via-[#e94560] to-[#0f3460]" />

            <div className="pt-2">
              {/* German text */}
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1 text-center">
                {mode === 'words' ? currentItem.german : currentItem.example}
              </p>

              {/* Pronunciation guide */}
              <p className="text-sm text-[#d4a520] font-medium text-center mb-2">
                /{currentItem.pronunciation}/
              </p>

              {/* English meaning */}
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-1">
                {mode === 'words' ? currentItem.english : currentItem.exampleTranslation}
              </p>

              {/* Malayalam */}
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center mb-3">
                {currentItem.malayalam}
              </p>

              {/* Audio playback button */}
              <div className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handlePlayAudio}
                  disabled={isPlayingAudio}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isPlayingAudio
                      ? 'bg-[#0f3460]/20 text-[#0f3460]'
                      : 'bg-[#0f3460] text-white hover:bg-[#1a4a80]'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                  {isPlayingAudio ? 'Playing...' : 'Listen'}
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Free Mode Info */}
      {mode === 'free' && (
        <Card className="mb-5 text-center">
          <div className="text-4xl mb-2">🎤</div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Tap the microphone and say anything in German. The speech engine will
            transcribe what it hears so you can check your pronunciation.
          </p>
        </Card>
      )}

      {/* Microphone Button */}
      <div className="flex justify-center mb-6">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={isListening ? stopListening : startListening}
          className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl ${
            isListening
              ? 'bg-[#c0392b] animate-pulse-glow'
              : 'bg-[#e94560] hover:bg-[#d63d56]'
          }`}
          style={
            isListening
              ? { boxShadow: '0 0 30px rgba(192, 57, 43, 0.5)' }
              : {}
          }
        >
          {isListening ? (
            <>
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/20"
                animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
              />
              <MicOff className="w-10 h-10 text-white relative z-10" />
            </>
          ) : (
            <Mic className="w-10 h-10 text-white" />
          )}
        </motion.button>
      </div>

      {/* Status text */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        {isListening ? 'Listening... Speak now!' : 'Tap the microphone to speak'}
      </p>

      {/* Interim text (greyed out, real-time) */}
      <AnimatePresence>
        {interimText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mb-4"
          >
            <p className="text-gray-400 dark:text-gray-500 italic text-lg">
              &ldquo;{interimText}&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mic Error */}
      <AnimatePresence>
        {micError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="mb-4 border border-red-300 dark:border-red-800 !bg-red-50 dark:!bg-red-900/20">
              <p className="text-red-600 dark:text-red-400 text-sm text-center">{micError}</p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', damping: 18 }}
          >
            <Card
              className={`mb-5 overflow-hidden ${
                result.score === 100
                  ? 'ring-2 ring-[#27ae60]'
                  : result.score >= 0 && result.score < 50
                  ? 'animate-shake ring-2 ring-[#c0392b]'
                  : ''
              }`}
            >
              {mode !== 'free' && result.score >= 0 && (
                <>
                  {/* Score bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Score
                    </span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold"
                      style={{ color: scoreColor(result.score) }}
                    >
                      {result.score}%
                    </motion.span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: scoreColor(result.score) }}
                    />
                  </div>

                  {/* What was heard vs expected */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        You said
                      </p>
                      <p className={`text-base font-medium ${
                        result.score === 100
                          ? 'text-[#27ae60]'
                          : 'text-[#c0392b]'
                      }`}>
                        &ldquo;{result.heard}&rdquo;
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        Expected
                      </p>
                      <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                        &ldquo;{result.expected}&rdquo;
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Free mode result */}
              {mode === 'free' && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Transcription
                  </p>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    &ldquo;{result.heard}&rdquo;
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex gap-3 mb-6">
        {mode !== 'free' && (
          <Button
            onClick={() => {
              pickNext();
              setKuttanMood('idle');
              setKuttanMessage('New word! Listen and give it a try.');
              setShowBubble(true);
            }}
            variant="secondary"
            fullWidth
          >
            <RefreshCw className="w-4 h-4" />
            Next Word
          </Button>
        )}
        <Button
          onClick={finishSession}
          variant="ghost"
          fullWidth
          className={mode === 'free' ? '' : ''}
        >
          <Trophy className="w-4 h-4" />
          Finish
        </Button>
      </div>

      {/* Stats strip */}
      {totalAttempts > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-4"
        >
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-[#d4a520]" />
            {totalCorrect}/{totalAttempts} perfect
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-[#e94560]" />
            Best streak: {bestStreak}
          </span>
        </motion.div>
      )}
    </div>
  );
}
