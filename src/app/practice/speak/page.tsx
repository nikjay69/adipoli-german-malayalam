'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Mic, MicOff, Heart, ArrowLeft } from 'lucide-react';
import { GameButton } from '@/components/game';
import { Confetti, XPGain, Celebration } from '@/components/game';
import { CharacterGuide } from '@/components/character';

import { useGameStore } from '@/lib/store';

// SpeechRecognition types declared globally in src/types/speech-recognition.d.ts

// ─── Phrase Data ────────────────────────────────────────────────

interface Phrase {
  german: string;
  english: string;
  tier: 1 | 2 | 3;
}

const PHRASES: Phrase[] = [
  // TIER 1 — Single words (rounds 1-3)
  { german: 'Hallo', english: 'Hello', tier: 1 },
  { german: 'Danke', english: 'Thank you', tier: 1 },
  { german: 'Bitte', english: 'Please / You\'re welcome', tier: 1 },
  { german: 'Ja', english: 'Yes', tier: 1 },
  { german: 'Nein', english: 'No', tier: 1 },
  { german: 'Guten Morgen', english: 'Good morning', tier: 1 },
  { german: 'Guten Tag', english: 'Good day', tier: 1 },
  { german: 'Tschüss', english: 'Bye', tier: 1 },
  { german: 'Entschuldigung', english: 'Excuse me / Sorry', tier: 1 },
  { german: 'Auf Wiedersehen', english: 'Goodbye', tier: 1 },

  // TIER 2 — Short phrases (rounds 4-7)
  { german: 'Ich heiße...', english: 'My name is...', tier: 2 },
  { german: 'Wie geht es Ihnen?', english: 'How are you? (formal)', tier: 2 },
  { german: 'Gut, danke!', english: 'Good, thanks!', tier: 2 },
  { german: 'Ich komme aus Indien', english: 'I come from India', tier: 2 },
  { german: 'Ich spreche Deutsch', english: 'I speak German', tier: 2 },
  { german: 'Wo ist der Bahnhof?', english: 'Where is the train station?', tier: 2 },
  { german: 'Ich möchte einen Kaffee', english: 'I would like a coffee', tier: 2 },
  { german: 'Wie viel kostet das?', english: 'How much does that cost?', tier: 2 },
  { german: 'Ich verstehe nicht', english: 'I don\'t understand', tier: 2 },
  { german: 'Können Sie mir helfen?', english: 'Can you help me?', tier: 2 },

  // TIER 3 — Full sentences (rounds 8-10)
  { german: 'Ich bin Student und komme aus Kerala.', english: 'I am a student and come from Kerala.', tier: 3 },
  { german: 'Mein Name ist... und ich lerne Deutsch.', english: 'My name is... and I am learning German.', tier: 3 },
  { german: 'Ich möchte einen Termin machen.', english: 'I would like to make an appointment.', tier: 3 },
  { german: 'Entschuldigung, wo finde ich die Apotheke?', english: 'Excuse me, where do I find the pharmacy?', tier: 3 },
  { german: 'Ich habe eine Frage zu meinem Konto.', english: 'I have a question about my account.', tier: 3 },
  { german: 'Können Sie bitte langsamer sprechen?', english: 'Can you please speak more slowly?', tier: 3 },
  { german: 'Ich wohne seit drei Monaten in Berlin.', english: 'I have been living in Berlin for three months.', tier: 3 },
  { german: 'Am Wochenende gehe ich gern spazieren.', english: 'On the weekend I like to go for a walk.', tier: 3 },
  { german: 'Ich habe gestern einen Film gesehen.', english: 'I watched a movie yesterday.', tier: 3 },
  { german: 'Meine Familie wohnt in Kerala, Indien.', english: 'My family lives in Kerala, India.', tier: 3 },
];

// ─── Helpers ────────────────────────────────────────────────────

function getTierForRound(round: number): 1 | 2 | 3 {
  if (round <= 3) return 1;
  if (round <= 7) return 2;
  return 3;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Normalize text for comparison: lowercase, remove punctuation, normalize umlauts */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\.\.\./g, '') // remove ellipsis
    .replace(/[.,!?;:'"„""«»\-–—()]/g, '') // remove punctuation
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue') // normalize umlauts (spoken form)
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim();
}

/** Also normalize the other way — spoken "ae" maps to "ä" */
function normalizeSpoken(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"„""«»\-–—()]/g, '')
    .replace(/ae/g, 'ä').replace(/oe/g, 'ö').replace(/ue/g, 'ü')
    .replace(/ss/g, 'ß')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Fuzzy similarity score between 0 and 100 */
function calculateSimilarity(spoken: string, correct: string): number {
  const normSpoken = normalizeText(spoken);
  const normCorrect = normalizeText(correct);

  // Also try normalizing the spoken text in reverse (ä → ae mapping)
  const normSpokenAlt = normalizeSpoken(spoken);
  const normCorrectRaw = correct.toLowerCase().replace(/[.,!?;:'"„""«»\-–—()]/g, '').replace(/\s+/g, ' ').trim();

  // Exact match after normalization
  if (normSpoken === normCorrect || normSpokenAlt === normCorrectRaw) return 100;

  // Word-level comparison
  const spokenWords = normSpoken.split(' ').filter(Boolean);
  const correctWords = normCorrect.split(' ').filter(Boolean);

  if (correctWords.length === 0) return 0;

  let matchedWords = 0;
  const usedIndices = new Set<number>();

  for (const cWord of correctWords) {
    let bestMatch = 0;
    let bestIdx = -1;
    for (let i = 0; i < spokenWords.length; i++) {
      if (usedIndices.has(i)) continue;
      const sim = wordSimilarity(spokenWords[i], cWord);
      if (sim > bestMatch) {
        bestMatch = sim;
        bestIdx = i;
      }
    }
    if (bestMatch >= 0.6 && bestIdx >= 0) {
      matchedWords += bestMatch;
      usedIndices.add(bestIdx);
    }
  }

  return Math.round((matchedWords / correctWords.length) * 100);
}

/** Levenshtein-based word similarity */
function wordSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  const dist = levenshtein(a, b);
  return 1 - dist / maxLen;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/** Speak a German phrase using browser SpeechSynthesis */
function speakGerman(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.75;
    utterance.pitch = 1.0;

    // Try to find a German voice
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(v => v.lang.startsWith('de'));
    if (germanVoice) utterance.voice = germanVoice;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

// ─── Nivin Reactions ───────────────────────────────────────────

const PEER_REACTIONS = {
  perfect: [
    "Adipoli! Pronunciation spot on!",
    "Wunderbar! Native speaker material!",
    "Kando? Nee German fluent aakum!",
    "Sheriyaayi! You sound amazing!",
  ],
  good: [
    "Nannaayi! Almost perfect, keep going!",
    "Super ayi! Just a tiny bit more practice.",
    "Kollaam machaa! Getting better every time.",
    "Gut gemacht! That means 'well done'!",
  ],
  partial: [
    "Paravaala! You got the key words right.",
    "Not bad machaa! Try saying it slower.",
    "Adutha try-il sheriyaakaam. Keep going!",
    "Getting there! Focus on the tricky sounds.",
  ],
  miss: [
    "Aiyyo! That was tough. Listen again carefully.",
    "Onnum illa machaa, some words are really hard!",
    "Don't worry — even Germans struggle with this!",
    "Try once more. Nee padichu edukum!",
  ],
  start: [
    "Ready to speak some German? Let's go!",
    "Listen carefully, then repeat. You got this!",
    "Pimsleur style — listen and speak. Adipoli method!",
  ],
  listen: [
    "Listen carefully to the pronunciation...",
    "Pay attention to each syllable...",
    "Hear how it sounds — your turn next!",
  ],
  your_turn: [
    "Ninte turn! Tap the mic and say it!",
    "Your turn machaa! Press the mic button.",
    "Now you say it! Mic button ready aanu.",
  ],
};

function getPeerReaction(category: keyof typeof PEER_REACTIONS): string {
  const msgs = PEER_REACTIONS[category];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

// ─── Types ──────────────────────────────────────────────────────

type GamePhase =
  | 'ready'
  | 'listening_example'
  | 'waiting_to_speak'
  | 'recording'
  | 'checking'
  | 'result'
  | 'next'
  | 'complete';

interface RoundResult {
  phrase: Phrase;
  spoken: string;
  score: number;
  xpEarned: number;
}

// ─── Main Component ─────────────────────────────────────────────

const TOTAL_ROUNDS = 10;
const MAX_HEARTS = 3;

export default function SpeakPracticePage() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed, updateStreak } = useGameStore();

  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<GamePhase>('ready');
  const [round, setRound] = useState(1);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [totalXP, setTotalXP] = useState(0);
  const [showXP, setShowXP] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Current phrase
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  // Speech recognition
  const [spokenText, setSpokenText] = useState('');
  const [interimText, setInterimText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [micSupported, setMicSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Result
  const [lastScore, setLastScore] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);

  // Phrase queue with spaced repetition for missed ones
  const [phraseQueue, setPhraseQueue] = useState<Phrase[]>([]);
  const [missedPhrases, setMissedPhrases] = useState<Phrase[]>([]);

  // Nivin
  const [peerMsg, setPeerMsg] = useState('');
  const [peerMood, setNivinMood] = useState<'happy' | 'excited' | 'celebrating' | 'sad' | 'thinking' | 'pointing'>('happy');

  // Show exit confirm
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // ─── Init ───────────────────────────────────────────────────

  useEffect(() => {
    setMounted(true);

    // Check for speech recognition support
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setMicSupported(false);
    }

    // Load voices for SpeechSynthesis
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // ─── Build phrase queue ─────────────────────────────────────

  const buildPhraseQueue = useCallback(() => {
    const queue: Phrase[] = [];
    for (let r = 1; r <= TOTAL_ROUNDS; r++) {
      const tier = getTierForRound(r);
      const tierPhrases = PHRASES.filter(p => p.tier === tier);
      const shuffled = shuffleArray(tierPhrases);
      queue.push(shuffled[0]);
    }
    setPhraseQueue(queue);
    return queue;
  }, []);

  // ─── Start Session ──────────────────────────────────────────

  const startSession = useCallback(() => {
    const queue = buildPhraseQueue();
    setRound(1);
    setHearts(MAX_HEARTS);
    setTotalXP(0);
    setResults([]);
    setMissedPhrases([]);
    setCurrentPhrase(queue[0]);
    setPhase('listening_example');
    setPeerMsg(getPeerReaction('listen'));
    setNivinMood('pointing');
    setShowTranslation(false);
    setSpokenText('');
    setInterimText('');
  }, [buildPhraseQueue]);

  // ─── Play phrase audio ──────────────────────────────────────

  const playPhrase = useCallback(async () => {
    if (!currentPhrase) return;

    // Try edge-tts audio file first
    try {
      const audioPath = `/audio/speak/${encodeURIComponent(currentPhrase.german)}.mp3`;
      const audio = new Audio(audioPath);
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => resolve();
        audio.onerror = () => reject();
        audio.play().catch(reject);
      });
      return;
    } catch {
      // Fallback to browser SpeechSynthesis
    }

    await speakGerman(currentPhrase.german);
  }, [currentPhrase]);

  // ─── Auto-play on listening phase ───────────────────────────

  useEffect(() => {
    if (phase === 'listening_example' && currentPhrase && mounted) {
      const timer = setTimeout(async () => {
        await playPhrase();
        // Show translation briefly
        setShowTranslation(true);
        setTimeout(() => {
          setPhase('waiting_to_speak');
          setPeerMsg(getPeerReaction('your_turn'));
          setNivinMood('excited');
        }, 2000);
      }, 600);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentPhrase, mounted]);

  // ─── Speech Recognition ─────────────────────────────────────

  const startRecording = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.lang = 'de-DE';
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
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

      if (final) {
        setSpokenText(final);
        setInterimText('');
      } else {
        setInterimText(interim);
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      // If we have spoken text, move to checking
      setPhase(prev => {
        if (prev === 'recording') return 'checking';
        return prev;
      });
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      if (event.error === 'no-speech') {
        setSpokenText('');
        setPhase('waiting_to_speak');
        setPeerMsg("Onnum ketilla machaa! Try speaking louder.");
        setNivinMood('thinking');
      }
    };

    recognitionRef.current = recognition;
    setSpokenText('');
    setInterimText('');
    setIsRecording(true);
    setPhase('recording');
    recognition.start();
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  // ─── Checking phase — compute score ─────────────────────────

  useEffect(() => {
    if (phase === 'checking' && currentPhrase) {
      const textToCheck = spokenText || interimText;

      if (!textToCheck) {
        setPhase('waiting_to_speak');
        setPeerMsg("Onnum ketilla! Mic button press cheythu try again.");
        setNivinMood('thinking');
        return;
      }

      const score = calculateSimilarity(textToCheck, currentPhrase.german);
      setLastScore(score);

      // Determine XP
      let xp = 0;
      if (score === 100) {
        xp = 10;
        setPeerMsg(getPeerReaction('perfect'));
        setNivinMood('celebrating');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      } else if (score >= 70) {
        xp = 5;
        setPeerMsg(getPeerReaction('good'));
        setNivinMood('happy');
      } else if (score >= 40) {
        xp = 3;
        setPeerMsg(getPeerReaction('partial'));
        setNivinMood('thinking');
      } else {
        xp = 0;
        setPeerMsg(getPeerReaction('miss'));
        setNivinMood('sad');
        // Lose a heart
        setHearts(prev => Math.max(0, prev - 1));
        // Add to missed phrases for spaced repetition
        setMissedPhrases(prev => [...prev, currentPhrase]);
      }

      if (xp > 0) {
        setXpAmount(xp);
        setShowXP(true);
        addXP(xp);
        setTotalXP(prev => prev + xp);
        setTimeout(() => setShowXP(false), 1200);
      }

      setResults(prev => [...prev, {
        phrase: currentPhrase,
        spoken: textToCheck,
        score,
        xpEarned: xp,
      }]);

      setPhase('result');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ─── Check hearts — game over ───────────────────────────────

  useEffect(() => {
    if (hearts <= 0 && phase === 'result') {
      // Let them see the result, then end
      const timer = setTimeout(() => {
        finishSession();
      }, 2500);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hearts, phase]);

  // ─── Next Round ─────────────────────────────────────────────

  const goToNextRound = useCallback(() => {
    if (round >= TOTAL_ROUNDS || hearts <= 0) {
      finishSession();
      return;
    }

    const nextRound = round + 1;
    setRound(nextRound);

    // Pick next phrase: insert missed phrase every 3 rounds for spaced repetition
    let nextPhrase: Phrase;
    if (missedPhrases.length > 0 && nextRound % 3 === 0) {
      // Retry a missed phrase
      nextPhrase = missedPhrases[0];
      setMissedPhrases(prev => prev.slice(1));
    } else if (phraseQueue[nextRound - 1]) {
      nextPhrase = phraseQueue[nextRound - 1];
    } else {
      // Fallback — pick random from correct tier
      const tier = getTierForRound(nextRound);
      const tierPhrases = PHRASES.filter(p => p.tier === tier);
      nextPhrase = tierPhrases[Math.floor(Math.random() * tierPhrases.length)];
    }

    setCurrentPhrase(nextPhrase);
    setShowTranslation(false);
    setSpokenText('');
    setInterimText('');
    setPhase('listening_example');
    setPeerMsg(getPeerReaction('listen'));
    setNivinMood('pointing');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, hearts, missedPhrases, phraseQueue]);

  // ─── Finish ─────────────────────────────────────────────────

  const finishSession = useCallback(() => {
    incrementGamesPlayed();
    updateStreak();
    setPhase('complete');
    setShowCelebration(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Render Guards ──────────────────────────────────────────

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

  // ─── Progress ───────────────────────────────────────────────

  const progress = phase === 'complete' ? 100 : ((round - 1) / TOTAL_ROUNDS) * 100;

  // ─── Score colors ───────────────────────────────────────────

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#27ae60';
    if (score >= 70) return '#d4a520';
    if (score >= 40) return '#e8a817';
    return '#c0392b';
  };

  const getScoreLabel = (score: number) => {
    if (score === 100) return 'Perfect!';
    if (score >= 90) return 'Excellent!';
    if (score >= 70) return 'Good!';
    if (score >= 40) return 'Getting There';
    return 'Try Again';
  };

  const getScoreEmoji = (score: number) => {
    if (score === 100) return '🎯';
    if (score >= 90) return '🔥';
    if (score >= 70) return '👍';
    if (score >= 40) return '💪';
    return '🔄';
  };

  // ─── Tier label ─────────────────────────────────────────────

  const getTierLabel = () => {
    const tier = getTierForRound(round);
    if (tier === 1) return 'Words';
    if (tier === 2) return 'Short Phrases';
    return 'Full Sentences';
  };

  // ─── Render ─────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col safe-top safe-bottom">
      {/* Exit confirmation */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 mx-4 max-w-sm w-full text-center backdrop-blur-xl"
          >
            <p className="text-2xl mb-2">🤔</p>
            <h3 className="font-bold text-lg mb-1">Leave practice?</h3>
            <p className="text-sm text-[var(--foreground)]/50 mb-4">
              Your progress in this session will be lost.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-[var(--foreground)]/10 font-medium text-sm"
              >
                Stay
              </button>
              <button
                onClick={() => router.push('/practice')}
                className="flex-1 py-2.5 rounded-xl bg-[#c0392b] text-white font-medium text-sm"
              >
                Leave
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Confetti isActive={showConfetti} duration={2000} />
      <XPGain amount={xpAmount} isVisible={showXP} />
      <Celebration
        isVisible={showCelebration}
        title={hearts > 0 ? "Session Complete!" : "Game Over"}
        subtitle={`${results.filter(r => r.score >= 70).length}/${results.length} phrases correct`}
        xpEarned={totalXP}
        onContinue={() => { setShowCelebration(false); router.push('/practice'); }}
      />

      {/* ─── Header ──────────────────────────────────────────── */}
      {phase !== 'ready' && phase !== 'complete' && (
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowExitConfirm(true)}
              aria-label="Leave speaking practice"
              className="ag-touch-target h-10 w-10 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center"
            >
              <X className="w-5 h-5 text-[var(--foreground)]/60" />
            </motion.button>

            {/* Progress Bar */}
            <div className="flex-1 mx-3 h-2.5 bg-[var(--foreground)]/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#d4a520] to-[#27ae60] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            {/* Hearts */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: MAX_HEARTS }).map((_, h) => (
                <motion.div
                  key={h}
                  animate={h >= hearts ? { scale: [1, 0.8], opacity: 0.3 } : {}}
                >
                  <Heart className={`w-5 h-5 ${h < hearts ? 'text-[#c0392b] fill-[#c0392b]' : 'text-[var(--foreground)]/15'}`} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Round indicator */}
          <div className="flex items-center justify-between text-xs text-[var(--foreground)]/40 px-1">
            <span>Round {round}/{TOTAL_ROUNDS}</span>
            <span className="inline-flex items-center gap-1.5">
              {(() => {
                const tier = getTierForRound(round);
                const tierColor = tier === 1 ? '#27ae60' : tier === 2 ? '#d4a520' : '#c0392b';
                return (
                  <span
                    className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: `${tierColor}26`, color: tierColor }}
                  >
                    T{tier}
                  </span>
                );
              })()}
              <span className="text-[var(--foreground)]/40">{getTierLabel()}</span>
            </span>
            <span className="text-[#d4a520] font-semibold">{totalXP} XP</span>
          </div>
        </div>
      )}

      {/* ─── Main Content ────────────────────────────────────── */}
      <div className="flex-1 px-4 flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* ─── READY SCREEN ────────────────────────────────── */}
          {phase === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              {/* Back button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push('/practice')}
                aria-label="Back to practice"
                className="ag-touch-target absolute left-4 top-4 h-10 w-10 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-[var(--foreground)]/60" />
              </motion.button>

              <CharacterGuide
                messages={getPeerReaction('start')}
                mood="excited"
                size="md"
              />

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <div className="text-5xl mb-4">🎙️</div>
                <h1 className="text-2xl font-bold mb-2">Speak Practice</h1>
                <p className="text-[var(--foreground)]/50 text-sm mb-1 max-w-xs">
                  Listen to German phrases, then repeat them into your mic.
                  Pimsleur-style learning that works.
                </p>

                {!micSupported && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 bg-[#c0392b]/15 border border-[#c0392b]/30 rounded-xl px-4 py-3 max-w-xs"
                  >
                    <p className="text-sm text-[#c0392b]">
                      <MicOff className="w-4 h-4 inline mr-1" />
                      Speech recognition is not supported in this browser.
                      Try Chrome or Edge for the best experience.
                    </p>
                  </motion.div>
                )}

                <div className="flex items-center justify-center gap-3 mt-4 mb-6">
                  <div className="glass-card px-3 py-2 text-center">
                    <div className="text-lg font-bold text-[#d4a520]">10</div>
                    <div className="text-[10px] text-[var(--foreground)]/40">Rounds</div>
                  </div>
                  <div className="glass-card px-3 py-2 text-center">
                    <div className="text-lg font-bold text-[#c0392b]">3</div>
                    <div className="text-[10px] text-[var(--foreground)]/40">Hearts</div>
                  </div>
                  <div className="glass-card px-3 py-2 text-center">
                    <div className="text-lg font-bold text-[#27ae60]">100</div>
                    <div className="text-[10px] text-[var(--foreground)]/40">Max XP</div>
                  </div>
                </div>

                {/* Difficulty tiers */}
                <div className="glass-card p-3 max-w-xs mx-auto mb-6 text-left">
                  <p className="text-xs font-semibold text-[var(--foreground)]/60 mb-2">Difficulty ramps up:</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-5 h-5 rounded-full bg-[#27ae60]/20 text-[#27ae60] text-[10px] font-bold flex items-center justify-center">1</span>
                      <span className="text-[var(--foreground)]/50">Rounds 1-3: Single Words</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-5 h-5 rounded-full bg-[#d4a520]/20 text-[#d4a520] text-[10px] font-bold flex items-center justify-center">2</span>
                      <span className="text-[var(--foreground)]/50">Rounds 4-7: Short Phrases</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-5 h-5 rounded-full bg-[#c0392b]/20 text-[#c0392b] text-[10px] font-bold flex items-center justify-center">3</span>
                      <span className="text-[var(--foreground)]/50">Rounds 8-10: Full Sentences</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ─── LISTENING EXAMPLE ───────────────────────────── */}
          {phase === 'listening_example' && currentPhrase && (
            <motion.div
              key={`listen-${round}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              {/* Nivin */}
              <div className="mb-6">
                <CharacterGuide
                  messages={peerMsg}
                  mood={peerMood as 'pointing'}
                  size="sm"
                />
              </div>

              {/* Audio animation */}
              <motion.div
                className="relative w-32 h-32 mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {/* Outer ring pulse */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#d4a520]/30"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border-2 border-[#d4a520]/20"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d4a520]/20 to-[#d4a520]/5 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [0.9, 1.15, 0.9] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Volume2 className="w-12 h-12 text-[#d4a520]" />
                  </motion.div>
                </div>
              </motion.div>

              {/* German phrase */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold text-center mb-3 text-[var(--foreground)]"
              >
                {currentPhrase.german}
              </motion.h2>

              {/* English translation (shown briefly) */}
              <AnimatePresence>
                {showTranslation && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-base text-[var(--foreground)]/50 text-center"
                  >
                    {currentPhrase.english}
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="text-sm text-[var(--foreground)]/40 mt-4 animate-pulse">
                🎧 Playing audio... Match the pronunciation!
              </p>
            </motion.div>
          )}

          {/* ─── WAITING TO SPEAK ────────────────────────────── */}
          {phase === 'waiting_to_speak' && currentPhrase && (
            <motion.div
              key={`speak-${round}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              {/* Nivin */}
              <div className="mb-4">
                <CharacterGuide
                  messages={peerMsg}
                  mood={peerMood as 'excited'}
                  size="sm"
                />
              </div>

              {/* Phrase to repeat */}
              <div className="glass-card p-5 mb-6 max-w-md w-full text-center">
                <p className="text-xs text-[var(--foreground)]/40 uppercase tracking-wider mb-2 font-semibold">Say this in German</p>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#d4a520]">
                  {currentPhrase.german}
                </h2>
                <p className="text-sm text-[var(--foreground)]/50">
                  {currentPhrase.english}
                </p>
              </div>

              {/* Play again button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={playPhrase}
                className="mb-6 flex items-center gap-2 text-sm text-[var(--foreground)]/60 hover:text-[#d4a520] transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                Listen again
              </motion.button>

              {/* Mic button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={micSupported ? startRecording : undefined}
                disabled={!micSupported}
                className="relative"
              >
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#c0392b]/20"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 88, height: 88, margin: 'auto', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  micSupported
                    ? 'bg-gradient-to-b from-[#c0392b] to-[#962d22] shadow-[0_4px_0_#6b1f17,0_6px_12px_rgba(0,0,0,0.3)] active:shadow-[0_2px_0_#6b1f17] active:translate-y-[2px]'
                    : 'bg-[var(--foreground)]/10 cursor-not-allowed'
                } transition-all`}>
                  {micSupported ? (
                    <Mic className="w-8 h-8 text-white" />
                  ) : (
                    <MicOff className="w-8 h-8 text-[var(--foreground)]/30" />
                  )}
                </div>
              </motion.button>
              <p className="text-xs text-[var(--foreground)]/30 mt-3">
                {micSupported ? 'Tap to speak' : 'Mic not available'}
              </p>
            </motion.div>
          )}

          {/* ─── RECORDING ───────────────────────────────────── */}
          {phase === 'recording' && currentPhrase && (
            <motion.div
              key={`recording-${round}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              {/* Reference phrase (smaller) */}
              <div className="glass-card px-4 py-2 mb-6 max-w-sm text-center">
                <p className="text-base font-semibold text-[#d4a520]">{currentPhrase.german}</p>
              </div>

              {/* Live transcript */}
              <div className="min-h-[60px] mb-6 text-center px-4">
                {(spokenText || interimText) ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-medium"
                  >
                    {spokenText && <span className="text-[var(--foreground)]">{spokenText}</span>}
                    {interimText && <span className="text-[var(--foreground)]/40 italic">{interimText}</span>}
                  </motion.p>
                ) : (
                  <p className="text-[var(--foreground)]/30 text-sm">Listening to you...</p>
                )}
              </div>

              {/* Recording mic button (pulsing red) */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={stopRecording}
                className="relative"
              >
                {/* Recording pulse */}
                <motion.div
                  className="absolute rounded-full bg-[#c0392b]/30"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ width: 88, height: 88, margin: 'auto', left: -4, right: -4, top: -4, bottom: -4 }}
                />
                <motion.div
                  className="absolute rounded-full bg-[#c0392b]/15"
                  animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  style={{ width: 88, height: 88, margin: 'auto', left: -4, right: -4, top: -4, bottom: -4 }}
                />
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-gradient-to-b from-[#c0392b] to-[#7b1e15] shadow-[0_4px_0_#6b1f17,0_6px_12px_rgba(0,0,0,0.3)] flex items-center justify-center"
                >
                  <Mic className="w-8 h-8 text-white" />
                </motion.div>
              </motion.button>

              {/* Recording indicator */}
              <div className="flex items-center gap-2 mt-4">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full bg-[#c0392b]"
                />
                <span className="text-sm text-[#c0392b] font-medium">Recording</span>
              </div>
              <p className="text-xs text-[var(--foreground)]/30 mt-2">Tap mic to stop</p>
            </motion.div>
          )}

          {/* ─── RESULT ──────────────────────────────────────── */}
          {phase === 'result' && currentPhrase && (
            <motion.div
              key={`result-${round}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              {/* Nivin */}
              <div className="mb-4">
                <CharacterGuide
                  messages={peerMsg}
                  mood={peerMood as 'celebrating'}
                  size="sm"
                  showAppu={lastScore === 100}
                  appuMood="celebrating"
                />
              </div>

              {/* Score reveal */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                className="mb-4"
              >
                <div
                  className="w-28 h-28 rounded-full flex flex-col items-center justify-center border-4"
                  style={{ borderColor: getScoreColor(lastScore) }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl font-bold"
                    style={{ color: getScoreColor(lastScore) }}
                  >
                    {lastScore}%
                  </motion.span>
                  <span className="text-xs text-[var(--foreground)]/50">{getScoreLabel(lastScore)}</span>
                </div>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-3xl mb-4"
              >
                {getScoreEmoji(lastScore)}
              </motion.span>

              {/* Comparison */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-4 max-w-md w-full mb-4"
              >
                <div className="mb-3">
                  <p className="text-xs text-[var(--foreground)]/40 mb-1">Correct:</p>
                  <p className="text-lg font-bold text-[#27ae60]">{currentPhrase.german}</p>
                  <p className="text-xs text-[var(--foreground)]/40">{currentPhrase.english}</p>
                </div>
                <div className="border-t border-[var(--foreground)]/10 pt-3">
                  <p className="text-xs text-[var(--foreground)]/40 mb-1">You said:</p>
                  <p className={`text-lg font-medium ${lastScore >= 70 ? 'text-[#27ae60]' : lastScore >= 40 ? 'text-[#e8a817]' : 'text-[#c0392b]'}`}>
                    {spokenText || interimText || '(no speech detected)'}
                  </p>
                </div>
              </motion.div>

              {/* Replay button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileTap={{ scale: 0.95 }}
                onClick={playPhrase}
                className="flex items-center gap-2 text-sm text-[var(--foreground)]/50 hover:text-[#d4a520] transition-colors mb-6"
              >
                <Volume2 className="w-4 h-4" />
                Listen again
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ─── Bottom Bar ──────────────────────────────────────── */}
      <div className="px-4 py-4">
        {phase === 'ready' && (
          <GameButton
            onClick={startSession}
            size="lg"
            fullWidth
            disabled={!micSupported}
            variant="primary"
            pulse
          >
            🎙️ Start Practice
          </GameButton>
        )}

        {phase === 'result' && hearts > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <GameButton
              onClick={goToNextRound}
              size="lg"
              fullWidth
              variant={lastScore >= 70 ? 'success' : 'primary'}
            >
              {round >= TOTAL_ROUNDS ? 'Finish' : 'Next Phrase'}
            </GameButton>
          </motion.div>
        )}

        {/* Progress dots at bottom */}
        {phase !== 'ready' && phase !== 'complete' && (
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => {
              const result = results[i];
              let dotColor = 'bg-[var(--foreground)]/10';
              const isCurrent = !result && i === round - 1;
              if (result) {
                if (result.score >= 70) dotColor = 'bg-[#27ae60]';
                else if (result.score >= 40) dotColor = 'bg-[#e8a817]';
                else dotColor = 'bg-[#c0392b]';
              } else if (isCurrent) {
                dotColor = 'bg-[#d4a520] animate-pulse';
              }
              return (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors ${dotColor} ${
                    isCurrent ? 'ring-2 ring-offset-1 ring-[#d4a520] ring-offset-transparent' : ''
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
