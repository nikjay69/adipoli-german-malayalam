'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Mic, MicOff, ArrowLeft, Headphones } from 'lucide-react';
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
  // TIER 1 -- Easy single words/greetings
  { german: 'Hallo', english: 'Hello', tier: 1 },
  { german: 'Danke', english: 'Thank you', tier: 1 },
  { german: 'Bitte', english: 'Please / You\'re welcome', tier: 1 },
  { german: 'Guten Morgen', english: 'Good morning', tier: 1 },
  { german: 'Tschüss', english: 'Bye', tier: 1 },
  { german: 'Ja', english: 'Yes', tier: 1 },
  { german: 'Nein', english: 'No', tier: 1 },
  { german: 'Bitte schön', english: 'Here you go / You\'re welcome', tier: 1 },
  { german: 'Entschuldigung', english: 'Excuse me / Sorry', tier: 1 },
  { german: 'Auf Wiedersehen', english: 'Goodbye', tier: 1 },

  // TIER 2 -- Medium phrases
  { german: 'Wie heißen Sie?', english: 'What is your name?', tier: 2 },
  { german: 'Ich komme aus Indien', english: 'I come from India', tier: 2 },
  { german: 'Wo ist der Bahnhof?', english: 'Where is the train station?', tier: 2 },
  { german: 'Ich möchte einen Kaffee', english: 'I would like a coffee', tier: 2 },
  { german: 'Wie viel kostet das?', english: 'How much does that cost?', tier: 2 },
  { german: 'Ich spreche ein bisschen Deutsch', english: 'I speak a little German', tier: 2 },
  { german: 'Können Sie mir helfen?', english: 'Can you help me?', tier: 2 },
  { german: 'Ich verstehe nicht', english: 'I don\'t understand', tier: 2 },
  { german: 'Das ist sehr schön', english: 'That is very beautiful', tier: 2 },
  { german: 'Vielen Dank', english: 'Thank you very much', tier: 2 },

  // TIER 3 -- Hard full sentences
  { german: 'Ich bin seit drei Monaten in Deutschland', english: 'I have been in Germany for three months', tier: 3 },
  { german: 'Können Sie bitte langsamer sprechen?', english: 'Can you please speak more slowly?', tier: 3 },
  { german: 'Ich möchte einen Termin beim Arzt machen', english: 'I would like to make a doctor\'s appointment', tier: 3 },
  { german: 'Entschuldigung, wo finde ich die Apotheke?', english: 'Excuse me, where do I find the pharmacy?', tier: 3 },
  { german: 'Mein Name ist... und ich komme aus Kerala', english: 'My name is... and I come from Kerala', tier: 3 },
  { german: 'Ich arbeite als Ingenieur in München', english: 'I work as an engineer in Munich', tier: 3 },
  { german: 'Am Wochenende gehe ich gern spazieren', english: 'On the weekend I like to go for a walk', tier: 3 },
  { german: 'Ich habe gestern einen Film gesehen', english: 'I watched a movie yesterday', tier: 3 },
  { german: 'Meine Familie wohnt in Kerala, Indien', english: 'My family lives in Kerala, India', tier: 3 },
  { german: 'Ich lerne Deutsch seit sechs Monaten', english: 'I have been learning German for six months', tier: 3 },

  // Extra tier 1
  { german: 'Guten Abend', english: 'Good evening', tier: 1 },
  { german: 'Gute Nacht', english: 'Good night', tier: 1 },
  { german: 'Willkommen', english: 'Welcome', tier: 1 },
  // Extra tier 2
  { german: 'Ich bin Student', english: 'I am a student', tier: 2 },
  { german: 'Wo wohnen Sie?', english: 'Where do you live?', tier: 2 },
  { german: 'Das schmeckt gut', english: 'That tastes good', tier: 2 },
  // Extra tier 3
  { german: 'Ich muss morgen früh aufstehen', english: 'I have to get up early tomorrow', tier: 3 },
  { german: 'Können wir einen Tisch für zwei reservieren?', english: 'Can we reserve a table for two?', tier: 3 },
  { german: 'Ich interessiere mich für deutsche Kultur', english: 'I am interested in German culture', tier: 3 },
  { german: 'Der Zug nach Berlin fährt um acht Uhr', english: 'The train to Berlin leaves at eight o\'clock', tier: 3 },
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

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\.\.\./g, '')
    .replace(/[.,!?;:'"()\-]/g, '')
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeSpoken(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"()\-]/g, '')
    .replace(/ae/g, 'ä').replace(/oe/g, 'ö').replace(/ue/g, 'ü')
    .replace(/ss/g, 'ß')
    .replace(/\s+/g, ' ')
    .trim();
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

function wordSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  const dist = levenshtein(a, b);
  return 1 - dist / maxLen;
}

function calculateSimilarity(spoken: string, correct: string): number {
  const normSpoken = normalizeText(spoken);
  const normCorrect = normalizeText(correct);
  const normSpokenAlt = normalizeSpoken(spoken);
  const normCorrectRaw = correct.toLowerCase().replace(/[.,!?;:'"()\-]/g, '').replace(/\s+/g, ' ').trim();

  if (normSpoken === normCorrect || normSpokenAlt === normCorrectRaw) return 100;

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
      if (sim > bestMatch) { bestMatch = sim; bestIdx = i; }
    }
    if (bestMatch >= 0.6 && bestIdx >= 0) {
      matchedWords += bestMatch;
      usedIndices.add(bestIdx);
    }
  }

  return Math.round((matchedWords / correctWords.length) * 100);
}

function speakGerman(text: string, rate = 0.85): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) { resolve(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = rate;
    utterance.pitch = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(v => v.lang.startsWith('de'));
    if (germanVoice) utterance.voice = germanVoice;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

// ─── Kuttan Reactions ───────────────────────────────────────────

const KUTTAN_REACTIONS = {
  perfect: [
    "Adipoli! Your shadowing is on point!",
    "Wunderbar! Almost like an echo!",
    "Machaa, you sound like a native speaker!",
  ],
  good: [
    "Nannaayi! Really close, keep flowing!",
    "Super! Your rhythm is getting better!",
    "Kollaam! Shadowing technique working well.",
  ],
  partial: [
    "Paravaala! Keep the rhythm going.",
    "Not bad machaa! Try matching the speed.",
    "Getting there! Focus on the flow.",
  ],
  miss: [
    "Aiyyo! Tough one. Listen more carefully.",
    "No worries, shadowing takes practice!",
    "Try again — match the speaker's rhythm.",
  ],
  start: [
    "Shadowing time! Listen and speak along.",
    "Hear it, shadow it. Best way to learn!",
    "Ready to shadow? Speak RIGHT after you hear it!",
  ],
  shadowing: [
    "Audio playing... start speaking along!",
    "Listen and repeat in real-time!",
    "Shadow the speaker — speak as you hear!",
  ],
};

function getKuttanReaction(category: keyof typeof KUTTAN_REACTIONS): string {
  const msgs = KUTTAN_REACTIONS[category];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

// ─── Types ──────────────────────────────────────────────────────

type GamePhase =
  | 'ready'
  | 'playing_audio'
  | 'shadowing'
  | 'checking'
  | 'result'
  | 'complete';

interface RoundResult {
  phrase: Phrase;
  spoken: string;
  score: number;
  xpEarned: number;
}

// ─── Audio Visualizer ───────────────────────────────────────────

function AudioWaveform({ active, color }: { active: boolean; color: string }) {
  const bars = 7;
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={active ? {
            height: [8, 24 + Math.random() * 20, 8],
          } : { height: 8 }}
          transition={active ? {
            duration: 0.4 + Math.random() * 0.3,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.08,
          } : { duration: 0.3 }}
        />
      ))}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────

const TOTAL_ROUNDS = 10;
const XP_PER_CORRECT = 5;

export default function ShadowingPage() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed, updateStreak } = useGameStore();

  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<GamePhase>('ready');
  const [round, setRound] = useState(1);
  const [totalXP, setTotalXP] = useState(0);
  const [showXP, setShowXP] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);
  const [showPhrase, setShowPhrase] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [interimText, setInterimText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [micSupported, setMicSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const [lastScore, setLastScore] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [phraseQueue, setPhraseQueue] = useState<Phrase[]>([]);

  const [kuttanMsg, setKuttanMsg] = useState('');
  const [kuttanMood, setKuttanMood] = useState<'happy' | 'excited' | 'celebrating' | 'sad' | 'thinking' | 'pointing'>('happy');
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Track if component is still mounted (for async callbacks)
  const mountedRef = useRef(true);

  // ─── Init ───────────────────────────────────────────────────

  useEffect(() => {
    setMounted(true);
    mountedRef.current = true;

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) setMicSupported(false);

    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
    }

    return () => {
      mountedRef.current = false;
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

  // ─── Start recording (shadowing mode) ──────────────────────

  const startRecording = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.lang = 'de-DE';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      if (finalTranscript) setSpokenText(finalTranscript);
      setInterimText(interimTranscript);
    };

    recognition.onend = () => {
      if (mountedRef.current) setIsRecording(false);
    };

    recognition.onerror = () => {
      if (mountedRef.current) setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

  // ─── Run a single shadowing round ──────────────────────────

  const runRound = useCallback(async (phrase: Phrase) => {
    if (!mountedRef.current) return;

    // Phase 1: Play audio
    setPhase('playing_audio');
    setCurrentPhrase(phrase);
    setShowPhrase(false);
    setSpokenText('');
    setInterimText('');
    setKuttanMsg(getKuttanReaction('shadowing'));
    setKuttanMood('thinking');

    // Start speech synthesis
    const speechPromise = speakGerman(phrase.german, 0.8);

    // After 0.3s delay, start recording (shadowing = almost simultaneous)
    await new Promise(resolve => setTimeout(resolve, 300));
    if (!mountedRef.current) return;

    setPhase('shadowing');
    setShowPhrase(true); // Show the phrase text so user can read along
    startRecording();

    // Wait for TTS to finish, then give extra time for user to finish speaking
    await speechPromise;
    if (!mountedRef.current) return;

    // Give 2 more seconds for the user to finish speaking
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (!mountedRef.current) return;

    stopRecording();
    // Small delay to let final recognition result come in
    await new Promise(resolve => setTimeout(resolve, 500));
  }, [startRecording, stopRecording]);

  // ─── Score and show result ────────────────────────────────

  const scoreRound = useCallback((phrase: Phrase, spoken: string) => {
    const score = calculateSimilarity(spoken, phrase.german);
    let xpEarned = 0;
    let mood: typeof kuttanMood = 'happy';
    let reactionKey: keyof typeof KUTTAN_REACTIONS = 'miss';

    if (score >= 85) {
      xpEarned = XP_PER_CORRECT;
      mood = 'celebrating';
      reactionKey = 'perfect';
    } else if (score >= 65) {
      xpEarned = Math.round(XP_PER_CORRECT * 0.6);
      mood = 'excited';
      reactionKey = 'good';
    } else if (score >= 40) {
      xpEarned = Math.round(XP_PER_CORRECT * 0.3);
      mood = 'happy';
      reactionKey = 'partial';
    } else {
      mood = 'sad';
      reactionKey = 'miss';
    }

    if (xpEarned > 0) {
      addXP(xpEarned);
      setTotalXP(prev => prev + xpEarned);
      setXpAmount(xpEarned);
      setShowXP(true);
      setTimeout(() => setShowXP(false), 1500);
    }

    if (score >= 85) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }

    setLastScore(score);
    setKuttanMsg(getKuttanReaction(reactionKey));
    setKuttanMood(mood);
    setPhase('result');

    const result: RoundResult = { phrase, spoken, score, xpEarned };
    setResults(prev => [...prev, result]);

    return result;
  }, [addXP, kuttanMood]);

  // ─── Start Session ──────────────────────────────────────────

  const startSession = useCallback(() => {
    const queue = buildPhraseQueue();
    setRound(1);
    setTotalXP(0);
    setResults([]);
    setPhase('ready');
    setKuttanMsg(getKuttanReaction('start'));
    setKuttanMood('happy');

    // Auto-start first round
    setTimeout(() => {
      if (queue[0]) runRound(queue[0]);
    }, 500);
  }, [buildPhraseQueue, runRound]);

  // ─── Advance to next round ─────────────────────────────────

  const nextRound = useCallback(() => {
    const spoken = spokenText || interimText;
    if (currentPhrase && phase === 'result') {
      // Already scored, just advance
    } else if (currentPhrase) {
      scoreRound(currentPhrase, spoken);
      return; // Will call nextRound again from the result phase
    }

    if (round >= TOTAL_ROUNDS) {
      incrementGamesPlayed();
      updateStreak();
      setPhase('complete');
      setShowCelebration(true);
      setKuttanMsg('Adipoli! Shadowing session complete!');
      setKuttanMood('celebrating');
      return;
    }

    const nextIdx = round; // 0-indexed: round 1 = index 0, so next = round (current index)
    const nextPhrase = phraseQueue[nextIdx];
    if (nextPhrase) {
      setRound(prev => prev + 1);
      runRound(nextPhrase);
    }
  }, [spokenText, interimText, currentPhrase, phase, round, phraseQueue, scoreRound, incrementGamesPlayed, updateStreak, runRound]);

  // ─── Auto-score when shadowing ends ────────────────────────

  useEffect(() => {
    if (phase === 'shadowing' && !isRecording && (spokenText || interimText) && currentPhrase) {
      const spoken = spokenText || interimText;
      scoreRound(currentPhrase, spoken);
    }
  }, [isRecording, phase, spokenText, interimText, currentPhrase, scoreRound]);

  // ─── Auto-advance after result ─────────────────────────────

  useEffect(() => {
    if (phase === 'result') {
      const timer = setTimeout(() => {
        nextRound();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase, nextRound]);

  // ─── Render ───────────────────────────────────────────────

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0f3460]">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!micSupported) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] p-4">
        <div className="glass-card p-8 text-center max-w-md">
          <MicOff className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-xl font-bold text-white mb-2">Browser Not Supported</h2>
          <p className="text-white/60 mb-4">
            Shadowing requires speech recognition. Please use Chrome or Edge on desktop.
          </p>
          <GameButton onClick={() => router.push('/practice')} variant="primary">
            Back to Practice
          </GameButton>
        </div>
      </div>
    );
  }

  // ─── Complete screen ──────────────────────────────────────

  if (phase === 'complete') {
    const totalCorrect = results.filter(r => r.score >= 65).length;
    const avgScore = results.length > 0
      ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length)
      : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] p-4">
        {showCelebration && <Celebration isVisible={true} title="Shadowing Complete!" xpEarned={totalXP} onContinue={() => setShowCelebration(false)} />}
        <Confetti isActive={showConfetti} />

        <div className="max-w-lg mx-auto pt-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-8 text-center"
          >
            <div className="mb-4">
              <CharacterGuide mood="celebrating" messages={kuttanMsg} />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Session Complete!</h2>
            <p className="text-white/60 mb-6">Shadowing practice finished</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="glass-card p-3">
                <div className="text-2xl font-bold text-[#ffd93d]">{totalXP}</div>
                <div className="text-xs text-white/50">XP Earned</div>
              </div>
              <div className="glass-card p-3">
                <div className="text-2xl font-bold text-[#00d9a5]">{totalCorrect}/{TOTAL_ROUNDS}</div>
                <div className="text-xs text-white/50">Correct</div>
              </div>
              <div className="glass-card p-3">
                <div className="text-2xl font-bold text-[#ff6b9d]">{avgScore}%</div>
                <div className="text-xs text-white/50">Avg Score</div>
              </div>
            </div>

            {/* Round-by-round results */}
            <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
              {results.map((r, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5">
                  <div className="text-left">
                    <div className="text-sm text-white font-medium">{r.phrase.german}</div>
                    <div className="text-xs text-white/40">{r.spoken || '(no speech detected)'}</div>
                  </div>
                  <div className={`text-sm font-bold ${
                    r.score >= 85 ? 'text-[#00d9a5]' :
                    r.score >= 65 ? 'text-[#ffd93d]' :
                    r.score >= 40 ? 'text-orange-400' : 'text-red-400'
                  }`}>
                    {r.score}%
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <GameButton onClick={() => router.push('/practice')} variant="secondary" className="flex-1">
                Back
              </GameButton>
              <GameButton onClick={startSession} variant="primary" className="flex-1">
                Try Again
              </GameButton>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── Main game UI ─────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] p-4">
      <Confetti isActive={showConfetti} />
      {showXP && <XPGain amount={xpAmount} isVisible={showXP} />}

      {/* Header */}
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/60">Round {round}/{TOTAL_ROUNDS}</span>
            <span className="text-sm font-bold text-[#ffd93d]">{totalXP} XP</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#ff6b9d] to-[#e94560] rounded-full"
            animate={{ width: `${(round / TOTAL_ROUNDS) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Kuttan */}
        <div className="mb-6">
          <CharacterGuide mood={kuttanMood} messages={kuttanMsg} />
        </div>

        {/* Ready state */}
        <AnimatePresence mode="wait">
          {phase === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8 text-center"
            >
              <Headphones className="w-16 h-16 mx-auto mb-4 text-[#ff6b9d]" />
              <h2 className="text-xl font-bold text-white mb-2">Shadowing Mode</h2>
              <p className="text-white/60 mb-2 text-sm">
                Listen to the German phrase, then <strong className="text-white">speak along</strong> almost simultaneously.
              </p>
              <p className="text-white/40 mb-6 text-xs">
                The mic starts 0.3s after audio begins -- shadow the speaker in real time!
              </p>
              <GameButton onClick={startSession} variant="primary" size="lg">
                Start Shadowing
              </GameButton>
            </motion.div>
          )}

          {/* Playing / Shadowing / Result */}
          {(phase === 'playing_audio' || phase === 'shadowing' || phase === 'checking' || phase === 'result') && currentPhrase && (
            <motion.div
              key="active"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 text-center"
            >
              {/* Tier indicator */}
              <div className="flex justify-center mb-3">
                <span className={`text-xs px-3 py-1 rounded-full ${
                  currentPhrase.tier === 1 ? 'bg-green-500/20 text-green-400' :
                  currentPhrase.tier === 2 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {currentPhrase.tier === 1 ? 'Easy' : currentPhrase.tier === 2 ? 'Medium' : 'Hard'}
                </span>
              </div>

              {/* Phrase display */}
              <AnimatePresence>
                {showPhrase && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-2"
                  >
                    <h3 className="text-2xl font-bold text-white mb-1">{currentPhrase.german}</h3>
                    <p className="text-sm text-white/50">{currentPhrase.english}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showPhrase && (
                <div className="mb-2">
                  <h3 className="text-2xl font-bold text-white/30 mb-1">Listening...</h3>
                  <p className="text-sm text-white/30">Phrase will appear shortly</p>
                </div>
              )}

              {/* Audio waveform */}
              <div className="my-6">
                {(phase === 'playing_audio' || phase === 'shadowing') && (
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <Volume2 className="w-5 h-5 mx-auto mb-1 text-[#ff6b9d]" />
                      <AudioWaveform active={phase === 'playing_audio' || phase === 'shadowing'} color="#ff6b9d" />
                      <span className="text-xs text-white/40 mt-1">Speaker</span>
                    </div>
                    {phase === 'shadowing' && (
                      <div className="text-center">
                        <Mic className="w-5 h-5 mx-auto mb-1 text-[#00d9a5]" />
                        <AudioWaveform active={isRecording} color="#00d9a5" />
                        <span className="text-xs text-white/40 mt-1">You</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User's spoken text */}
              {(spokenText || interimText) && (
                <div className="mb-4 p-3 rounded-lg bg-white/5">
                  <p className="text-xs text-white/40 mb-1">You said:</p>
                  <p className="text-white font-medium">
                    {spokenText || <span className="text-white/50">{interimText}</span>}
                  </p>
                </div>
              )}

              {/* Result display */}
              {phase === 'result' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4"
                >
                  <div className={`text-4xl font-bold mb-2 ${
                    lastScore >= 85 ? 'text-[#00d9a5]' :
                    lastScore >= 65 ? 'text-[#ffd93d]' :
                    lastScore >= 40 ? 'text-orange-400' : 'text-red-400'
                  }`}>
                    {lastScore}%
                  </div>
                  <p className="text-xs text-white/40">
                    {lastScore >= 85 ? 'Excellent shadowing!' :
                     lastScore >= 65 ? 'Good job!' :
                     lastScore >= 40 ? 'Keep practicing!' : 'Try to match the rhythm'}
                  </p>
                  <p className="text-xs text-white/30 mt-2">Next phrase in a moment...</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Exit confirmation */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-card p-6 max-w-sm w-full text-center"
            >
              <X className="w-8 h-8 mx-auto mb-3 text-red-400" />
              <h3 className="text-lg font-bold text-white mb-2">Quit session?</h3>
              <p className="text-white/60 text-sm mb-4">
                Your progress for this session will be lost.
              </p>
              <div className="flex gap-3">
                <GameButton onClick={() => setShowExitConfirm(false)} variant="secondary" className="flex-1">
                  Stay
                </GameButton>
                <GameButton onClick={() => router.push('/practice')} variant="primary" className="flex-1">
                  Quit
                </GameButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
