'use client';

import { use, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight, Award, ChevronDown, Mic, MicOff, Send, CheckCircle } from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { Confetti } from '@/components/game';
import { useGameStore } from '@/lib/store';
import { GOETHE_TESTS, getTestById } from '@/lib/content/goethe-tests';
import { playAudio, stopAudio } from '@/lib/audio';

type Section = 'overview' | 'hoeren' | 'lesen' | 'schreiben' | 'sprechen' | 'results';
type SectionIntro = 'hoeren-intro' | 'lesen-intro' | 'schreiben-intro' | 'sprechen-intro' | null;
type Teil = 'teil1' | 'teil2' | 'teil3';

// Section metadata for the real Goethe A1 exam
const SECTION_META = {
  hoeren: {
    icon: '🎧',
    label: 'Hören',
    color: '#3b82f6',
    time: 20,
    description: 'Listening comprehension',
    instructions: [
      'Sie hören kurze Gespräche und Ansagen.',
      'Teil 1: 6 Aufgaben — Richtig oder Falsch (Sie hören jeden Text zweimal)',
      'Teil 2: 4 Aufgaben — Multiple Choice (Sie hören jeden Text einmal)',
      'Teil 3: 5 Aufgaben — Multiple Choice (Sie hören jeden Text zweimal)',
    ],
    questions: 15,
  },
  lesen: {
    icon: '📖',
    label: 'Lesen',
    color: '#27ae60',
    time: 25,
    description: 'Reading comprehension',
    instructions: [
      'Sie lesen kurze Texte, Anzeigen und E-Mails.',
      'Teil 1: 5 Aufgaben — Richtig oder Falsch',
      'Teil 2: 5 Aufgaben — Richtig oder Falsch (Anzeigen)',
      'Teil 3: 5 Aufgaben — Multiple Choice (E-Mails)',
    ],
    questions: 15,
  },
  schreiben: {
    icon: '✍️',
    label: 'Schreiben',
    color: '#d4a520',
    time: 20,
    description: 'Written expression',
    instructions: [
      'Sie füllen ein Formular aus und schreiben eine kurze Nachricht.',
      'Teil 1: Formular ausfüllen (5 Punkte)',
      'Teil 2: Kurze Nachricht schreiben — 30 Wörter (10 Punkte)',
      'Schreiben Sie zu allen 3 Punkten.',
    ],
    questions: 2,
  },
  sprechen: {
    icon: '🗣️',
    label: 'Sprechen',
    color: '#e94560',
    time: 15,
    description: 'Oral expression',
    instructions: [
      'Sie stellen sich vor, stellen Fragen und formulieren Bitten.',
      'Teil 1: Sich vorstellen (Name, Alter, Land, Sprachen, Beruf, Hobby)',
      'Teil 2: Fragen stellen und beantworten (Wortkarten)',
      'Teil 3: Bitten formulieren (Alltagssituationen)',
    ],
    questions: 3,
  },
} as const;

const SECTION_ORDER: ('hoeren' | 'lesen' | 'schreiben' | 'sprechen')[] = ['hoeren', 'lesen', 'schreiben', 'sprechen'];

export default function TestPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = use(params);
  const router = useRouter();
  const { addXP, incrementQuizzesTaken } = useGameStore();

  const [section, setSection] = useState<Section>('overview');
  const [sectionIntro, setSectionIntro] = useState<SectionIntro>(null);
  const [teil, setTeil] = useState<Teil>('teil1');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Hören audio state
  const [playsLeft, setPlaysLeft] = useState(2);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState<boolean | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  // Schreiben state
  const [schreibenFormAnswers, setSchreibenFormAnswers] = useState<Record<string, string>>({});
  const [schreibenMessage, setSchreibenMessage] = useState('');
  const [schreibenSubmitted, setSchreibenSubmitted] = useState(false);
  const [schreibenTeil, setSchreibenTeil] = useState<'teil1' | 'teil2'>('teil1');

  // Sprechen state
  const [sprechenTeil, setSprechenTeil] = useState<'teil1' | 'teil2' | 'teil3'>('teil1');
  const [isRecording, setIsRecording] = useState(false);
  const [sprechenRecordings, setSprechenRecordings] = useState<Record<string, string>>({});
  const [sprechenCompleted, setSprechenCompleted] = useState<Record<string, boolean>>({});
  const [currentSprechenItem, setCurrentSprechenItem] = useState(0);
  const [sprechenSubmitted, setSprechenSubmitted] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Score state
  const [sectionScores, setSectionScores] = useState({
    hoeren: 0,
    lesen: 0,
    schreiben: 0,
    sprechen: 0,
  });

  const test = getTestById(testId);

  // Timer
  useEffect(() => {
    if (section !== 'overview' && section !== 'results' && !sectionIntro && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [section, timeLeft, sectionIntro]);

  // Reset audio state when question changes
  useEffect(() => {
    // Set playsLeft based on Hören teil: Teil 2 = 1 play, others = 2 plays
    if (section === 'hoeren') {
      setPlaysLeft(teil === 'teil2' ? 1 : 2);
    } else {
      setPlaysLeft(2);
    }
    setIsPlayingAudio(false);
    setAudioAvailable(null);
    setShowTranscript(false);
    stopAudio();
  }, [questionIndex, teil, section]);

  // Check if audio file exists for current Hören question
  useEffect(() => {
    if (section !== 'hoeren' || !test) return;

    const questions = getCurrentQuestionsStatic();
    const currentQuestion = questions[questionIndex];
    if (!currentQuestion?.audio_text) {
      setAudioAvailable(false);
      return;
    }

    const audioUrl = `/audio/hoeren/${testId}-${currentQuestion.id}.mp3`;

    fetch(audioUrl, { method: 'HEAD' })
      .then(res => {
        setAudioAvailable(res.ok);
      })
      .catch(() => {
        setAudioAvailable(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, teil, questionIndex, testId]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const showSectionIntro = (s: 'hoeren' | 'lesen' | 'schreiben' | 'sprechen') => {
    setSectionIntro(`${s}-intro` as SectionIntro);
  };

  const startSection = (s: Section) => {
    setSection(s);
    setTeil('teil1');
    setQuestionIndex(0);
    setShowResult(false);
    setTimeLeft(s === 'hoeren' ? 20 * 60 : s === 'lesen' ? 25 * 60 : s === 'schreiben' ? 20 * 60 : 15 * 60);
    setSectionIntro(null);
    // Reset Schreiben state
    if (s === 'schreiben') {
      setSchreibenTeil('teil1');
      setSchreibenSubmitted(false);
      setSchreibenFormAnswers({});
      setSchreibenMessage('');
    }
    // Reset Sprechen state
    if (s === 'sprechen') {
      setSprechenTeil('teil1');
      setCurrentSprechenItem(0);
      setSprechenSubmitted(false);
      setSprechenRecordings({});
      setSprechenCompleted({});
    }
  };

  // Static version for use in useEffect
  const getCurrentQuestionsStatic = (): any[] => {
    if (!test) return [];
    if (section === 'hoeren') return (test.hoeren as any)?.[teil] || [];
    if (section === 'lesen') return (test.lesen as any)?.[teil] || [];
    return [];
  };

  const getCurrentQuestions = (): any[] => {
    if (!test) return [];
    if (section === 'hoeren') return (test.hoeren as any)?.[teil] || [];
    if (section === 'lesen') return (test.lesen as any)?.[teil] || [];
    return [];
  };

  const questions = getCurrentQuestions();
  const currentQ = questions[questionIndex];

  // Play Hören audio
  const playHoerenAudio = useCallback(async () => {
    if (!currentQ || playsLeft <= 0 || isPlayingAudio) return;

    const audioUrl = `/audio/hoeren/${testId}-${currentQ.id}.mp3`;
    setIsPlayingAudio(true);

    try {
      await playAudio(audioUrl);
    } catch {
      setAudioAvailable(false);
    } finally {
      setIsPlayingAudio(false);
      setPlaysLeft(prev => prev - 1);
    }
  }, [currentQ, playsLeft, isPlayingAudio, testId]);

  const handleAnswer = (qId: string, answer: string | boolean) => {
    setAnswers(prev => ({ ...prev, [qId]: answer }));
    setShowResult(true);
    stopAudio();

    setTimeout(() => {
      setShowResult(false);
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(qi => qi + 1);
      } else {
        // Move to next Teil or section
        if (teil === 'teil1') { setTeil('teil2'); setQuestionIndex(0); }
        else if (teil === 'teil2') { setTeil('teil3'); setQuestionIndex(0); }
        else {
          // Section complete — move to next with intro
          if (section === 'hoeren') showSectionIntro('lesen');
          else if (section === 'lesen') showSectionIntro('schreiben');
          else if (section === 'schreiben') showSectionIntro('sprechen');
          else finishTest();
        }
      }
    }, 1500);
  };

  // Speech recognition helpers
  const startRecording = (itemKey: string) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Fallback: mark as completed without actual speech
      setSprechenCompleted(prev => ({ ...prev, [itemKey]: true }));
      setSprechenRecordings(prev => ({ ...prev, [itemKey]: '(Speech recognition not supported in this browser)' }));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSprechenRecordings(prev => ({ ...prev, [itemKey]: transcript }));
      setSprechenCompleted(prev => ({ ...prev, [itemKey]: true }));
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      // Mark as attempted even on error
      setSprechenCompleted(prev => ({ ...prev, [itemKey]: true }));
      setSprechenRecordings(prev => ({ ...prev, [itemKey]: '(Could not capture speech — try again or skip)' }));
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  // Calculate section scores on the 60-point scale
  const calculateSectionScore = (kind: 'hoeren' | 'lesen'): number => {
    if (!test) return 0;
    let correct = 0;
    let total = 0;
    for (const part of ['teil1', 'teil2', 'teil3'] as Teil[]) {
      const qs = (test[kind] as any)?.[part] || [];
      qs.forEach((q: any) => {
        total++;
        const userAns = answers[q.id];
        if (userAns === q.correct) correct++;
      });
    }
    // Scale to 15 points: (correct / total) * 15
    return total > 0 ? Math.round((correct / total) * 15) : 0;
  };

  const calculateSchreibenScore = (): number => {
    // Teil 1 (form): 5 points if user filled in fields
    const formFieldsFilled = Object.keys(schreibenFormAnswers).length;
    const teil1Score = formFieldsFilled > 0 ? 5 : 0;
    // Teil 2 (message): 10 points if submitted with content, 0 if empty/not submitted
    const teil2Score = schreibenSubmitted && schreibenMessage.trim().length > 10 ? 8 :
                       schreibenSubmitted && schreibenMessage.trim().length > 0 ? 5 : 0;
    return teil1Score + teil2Score;
  };

  const calculateSprechenScore = (): number => {
    const completedCount = Object.values(sprechenCompleted).filter(Boolean).length;
    const totalItems = getTotalSprechenItems();
    if (completedCount === 0) return 0;
    if (completedCount >= totalItems) return 10;
    if (completedCount >= totalItems / 2) return 7;
    return 5;
  };

  const getTotalSprechenItems = (): number => {
    if (!test) return 0;
    return (test.sprechen?.teil1?.length || 0) +
           (test.sprechen?.teil2?.length || 0) +
           (test.sprechen?.teil3?.length || 0);
  };

  const finishTest = () => {
    const hScore = calculateSectionScore('hoeren');
    const lScore = calculateSectionScore('lesen');
    const sScore = calculateSchreibenScore();
    const spScore = calculateSprechenScore();

    setSectionScores({
      hoeren: hScore,
      lesen: lScore,
      schreiben: sScore,
      sprechen: spScore,
    });

    setSection('results');
    incrementQuizzesTaken();
    const totalPoints = hScore + lScore + sScore + spScore;
    addXP(Math.max(20, totalPoints * 2));
  };

  const totalScore = sectionScores.hoeren + sectionScores.lesen + sectionScores.schreiben + sectionScores.sprechen;
  const passed = totalScore >= 36;

  // Get current section index for progress dots
  const getCurrentSectionIndex = (): number => {
    if (section === 'hoeren') return 0;
    if (section === 'lesen') return 1;
    if (section === 'schreiben') return 2;
    if (section === 'sprechen') return 3;
    return -1;
  };

  const getSectionScoreForBreakdown = (kind: 'hoeren' | 'lesen') => {
    if (!test) return { correct: 0, total: 0 };
    let correct = 0;
    let total = 0;
    for (const part of ['teil1', 'teil2', 'teil3'] as Teil[]) {
      const qs = (test[kind] as any)?.[part] || [];
      qs.forEach((q: any) => {
        total++;
        const userAns = answers[q.id];
        if (userAns === q.correct) correct++;
      });
    }
    return { correct, total };
  };

  if (!test) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-6xl mb-4">📝</p>
        <h1 className="text-xl font-bold mb-2">Test not found</h1>
        <p className="text-[var(--foreground)]/40 text-sm mb-4 text-center">
          This test doesn&apos;t exist or hasn&apos;t been created yet.
        </p>
        <Button onClick={() => router.push('/tests')}>Back to Tests</Button>
      </div>
    );
  }

  // ─── Section Progress Dots ───────────────────────────────────────────
  const SectionProgressDots = () => {
    const currentIdx = getCurrentSectionIndex();
    return (
      <div className="flex items-center justify-center gap-1.5 mb-4">
        {SECTION_ORDER.map((s, i) => {
          const meta = SECTION_META[s];
          const isActive = i === currentIdx;
          const isDone = i < currentIdx;
          return (
            <div key={s} className="flex items-center gap-1.5">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full transition-all ${
                    isActive ? 'scale-125' : ''
                  }`}
                  style={{
                    backgroundColor: isDone ? meta.color : isActive ? meta.color : 'rgba(255,255,255,0.15)',
                    boxShadow: isActive ? `0 0 8px ${meta.color}60` : 'none',
                  }}
                />
                <span className={`text-[9px] mt-0.5 font-medium ${
                  isActive || isDone ? 'opacity-80' : 'opacity-30'
                }`} style={{ color: isActive || isDone ? meta.color : undefined }}>
                  {meta.label}
                </span>
              </div>
              {i < SECTION_ORDER.length - 1 && (
                <div className={`w-6 h-0.5 rounded mb-3 ${
                  isDone ? 'bg-[var(--foreground)]/30' : 'bg-[var(--foreground)]/10'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // ─── Score bar for results ────────────────────────────────────────────
  const ScoreBar = ({ score, max, color }: { score: number; max: number; color: string }) => {
    const pct = Math.round((score / max) * 100);
    const blocks = 15;
    const filled = Math.round((score / max) * blocks);
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-px">
          {Array.from({ length: blocks }).map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-3 rounded-sm transition-all"
              style={{
                backgroundColor: i < filled ? color : 'rgba(255,255,255,0.08)',
              }}
            />
          ))}
        </div>
        <span className="text-xs font-mono text-[var(--foreground)]/60 w-12 text-right">
          {score}/{max}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
      <Confetti isActive={section === 'results' && passed} duration={3000} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => router.push('/tests')} className="flex items-center gap-2 text-[var(--foreground)]/50 text-sm">
          <ArrowLeft className="w-4 h-4" /> Tests
        </button>
        {section !== 'overview' && section !== 'results' && !sectionIntro && (
          <div className="flex items-center gap-2 text-sm font-mono">
            <Clock className="w-4 h-4 text-[var(--foreground)]/40" />
            <span className={timeLeft < 120 ? 'text-[#c0392b] animate-pulse' : 'text-[var(--foreground)]/60'}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      {/* Section Progress Dots (shown during active sections) */}
      {section !== 'overview' && section !== 'results' && !sectionIntro && (
        <SectionProgressDots />
      )}

      <AnimatePresence mode="wait">
        {/* ─── OVERVIEW ──────────────────────────────────────────────────── */}
        {section === 'overview' && !sectionIntro && (
          <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="text-center mb-6">
              <p className="text-5xl mb-3">📝</p>
              <h1 className="text-2xl font-bold">{test.name}</h1>
              <p className="text-[var(--foreground)]/40 text-sm mt-1">{test.description}</p>
              <p className="text-xs text-[var(--foreground)]/30 mt-2 font-mono">
                60 Punkte | 36 zum Bestehen | ~80 Minuten
              </p>
            </div>

            <div className="space-y-3 mb-4">
              {SECTION_ORDER.map((s) => {
                const meta = SECTION_META[s];
                return (
                  <div key={s} className="game-card p-3 flex items-center gap-3">
                    <span className="text-2xl">{meta.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm" style={{ color: meta.color }}>{meta.label}</h3>
                      <p className="text-xs text-[var(--foreground)]/40">
                        {meta.questions} {s === 'schreiben' ? 'Aufgaben' : s === 'sprechen' ? 'Teile' : 'Fragen'} · {meta.time} Min · 15 Punkte
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Card className="mb-4">
              <div className="flex items-center gap-3 p-1">
                <div className="text-center flex-1">
                  <div className="text-lg font-bold text-[#ffd93d]">60</div>
                  <div className="text-[9px] text-[var(--foreground)]/40">Max Points</div>
                </div>
                <div className="w-px h-8 bg-[var(--foreground)]/10" />
                <div className="text-center flex-1">
                  <div className="text-lg font-bold text-[#27ae60]">36</div>
                  <div className="text-[9px] text-[var(--foreground)]/40">To Pass (60%)</div>
                </div>
                <div className="w-px h-8 bg-[var(--foreground)]/10" />
                <div className="text-center flex-1">
                  <div className="text-lg font-bold text-[var(--foreground)]/60">~80</div>
                  <div className="text-[9px] text-[var(--foreground)]/40">Minutes</div>
                </div>
              </div>
            </Card>

            <Card className="mb-6">
              <h3 className="font-bold text-sm mb-2">Exam strategy</h3>
              <ul className="space-y-2 text-xs text-[var(--foreground)]/50 leading-relaxed">
                <li>- In Hören, listen once for the main idea and once for the exact detail.</li>
                <li>- In Lesen, underline names, times, prices, places, and negatives like <em>nicht</em>.</li>
                <li>- In Schreiben, cover all 3 points even with short simple sentences.</li>
                <li>- In Sprechen, clear A1 German beats fancy German. Short and correct wins.</li>
              </ul>
            </Card>

            <Button onClick={() => showSectionIntro('hoeren')} size="lg" fullWidth>
              Start Prüfung
            </Button>
          </motion.div>
        )}

        {/* ─── SECTION INTRO SCREENS ─────────────────────────────────────── */}
        {sectionIntro && (
          <motion.div key={sectionIntro} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {(() => {
              const sKey = sectionIntro.replace('-intro', '') as keyof typeof SECTION_META;
              const meta = SECTION_META[sKey];
              const sectionIdx = SECTION_ORDER.indexOf(sKey);
              return (
                <>
                  {/* Progress dots for intro too */}
                  <div className="flex items-center justify-center gap-1.5 mb-6">
                    {SECTION_ORDER.map((s, i) => {
                      const m = SECTION_META[s];
                      const isActive = i === sectionIdx;
                      const isDone = i < sectionIdx;
                      return (
                        <div key={s} className="flex items-center gap-1.5">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-3 h-3 rounded-full transition-all ${isActive ? 'scale-125' : ''}`}
                              style={{
                                backgroundColor: isDone ? m.color : isActive ? m.color : 'rgba(255,255,255,0.15)',
                                boxShadow: isActive ? `0 0 8px ${m.color}60` : 'none',
                              }}
                            />
                            <span className={`text-[9px] mt-0.5 font-medium ${
                              isActive || isDone ? 'opacity-80' : 'opacity-30'
                            }`} style={{ color: isActive || isDone ? m.color : undefined }}>
                              {m.label}
                            </span>
                          </div>
                          {i < SECTION_ORDER.length - 1 && (
                            <div className={`w-6 h-0.5 rounded mb-3 ${isDone ? 'bg-[var(--foreground)]/30' : 'bg-[var(--foreground)]/10'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-5xl mb-3">{meta.icon}</p>
                    <h1 className="text-2xl font-bold" style={{ color: meta.color }}>{meta.label}</h1>
                    <p className="text-[var(--foreground)]/40 text-sm mt-1">{meta.description}</p>
                  </div>

                  <Card className="mb-4">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--foreground)]/10">
                      <div className="text-sm font-bold text-[var(--foreground)]/70">
                        {meta.questions} {sKey === 'schreiben' ? 'Aufgaben' : sKey === 'sprechen' ? 'Teile' : 'Fragen'}
                      </div>
                      <div className="text-sm font-mono text-[var(--foreground)]/50">
                        <Clock className="w-3.5 h-3.5 inline mr-1" />{meta.time} Minuten
                      </div>
                    </div>
                    <div className="space-y-2">
                      {meta.instructions.map((inst, i) => (
                        <p key={i} className="text-xs text-[var(--foreground)]/50 leading-relaxed">
                          {i === 0 ? inst : `• ${inst}`}
                        </p>
                      ))}
                    </div>
                    <div className="mt-3 pt-2 border-t border-[var(--foreground)]/10">
                      <p className="text-xs font-semibold" style={{ color: meta.color }}>
                        Maximale Punktzahl: 15 Punkte
                      </p>
                    </div>
                  </Card>

                  <Button onClick={() => startSection(sKey)} size="lg" fullWidth>
                    {meta.label} starten <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              );
            })()}
          </motion.div>
        )}

        {/* ─── HÖREN / LESEN QUESTIONS ──────────────────────────────────── */}
        {(section === 'hoeren' || section === 'lesen') && currentQ && !sectionIntro && (
          <motion.div key={`${section}-${teil}-${questionIndex}`}
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>

            {/* Section badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{section === 'hoeren' ? '🎧' : '📖'}</span>
              <span className="text-sm font-bold" style={{ color: section === 'hoeren' ? '#3b82f6' : '#27ae60' }}>
                {section === 'hoeren' ? 'Hören' : 'Lesen'} — {teil === 'teil1' ? 'Teil 1' : teil === 'teil2' ? 'Teil 2' : 'Teil 3'}
              </span>
              <span className="text-xs text-[var(--foreground)]/30 ml-auto">
                {questionIndex + 1}/{questions.length}
              </span>
            </div>

            {/* Hören Teil info banner */}
            {section === 'hoeren' && questionIndex === 0 && (
              <div className="mb-3 p-2 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20">
                <p className="text-xs text-[#3b82f6]">
                  {teil === 'teil1' && 'Sie hören jeden Text zweimal. Richtig oder Falsch?'}
                  {teil === 'teil2' && 'Sie hören jeden Text einmal. Wählen Sie a, b oder c.'}
                  {teil === 'teil3' && 'Sie hören jeden Text zweimal. Wählen Sie a, b oder c.'}
                </p>
              </div>
            )}

            {/* Audio text / Reading text */}
            <Card className="mb-4">
              <div className="text-sm leading-relaxed">
                {/* Hören section: audio playback or text fallback */}
                {currentQ.audio_text && section === 'hoeren' && (
                  <div className="mb-3 p-3 bg-[var(--foreground)]/5 rounded-lg">
                    {audioAvailable === null ? (
                      <div className="text-center py-2">
                        <p className="text-xs text-[var(--foreground)]/40 animate-pulse">Loading audio...</p>
                      </div>
                    ) : audioAvailable ? (
                      <div className="text-center">
                        <p className="text-xs text-[var(--foreground)]/40 mb-2">🎧 Listen to the audio</p>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={playHoerenAudio}
                          disabled={playsLeft === 0 || isPlayingAudio}
                          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            isPlayingAudio
                              ? 'bg-[#3b82f6]/20 text-[#3b82f6] border-2 border-[#3b82f6]/40 animate-pulse'
                              : playsLeft > 0
                              ? 'bg-[#3b82f6]/10 text-[#3b82f6] border-2 border-[#3b82f6]/30 hover:bg-[#3b82f6]/20 hover:border-[#3b82f6]/50'
                              : 'bg-[var(--foreground)]/5 text-[var(--foreground)]/30 border-2 border-[var(--foreground)]/10 cursor-not-allowed'
                          }`}
                        >
                          {isPlayingAudio ? (
                            <span>🔊 Playing...</span>
                          ) : playsLeft > 0 ? (
                            <span>🎧 Play Audio ({playsLeft} {playsLeft === 1 ? 'play' : 'plays'} left)</span>
                          ) : (
                            <span>No plays remaining</span>
                          )}
                        </motion.button>
                        {teil !== 'teil2' && playsLeft === 1 && (
                          <p className="text-xs text-[#d4a520] mt-1.5">You can listen one more time</p>
                        )}
                        {playsLeft === 0 && !showResult && (
                          <p className="text-xs text-[var(--foreground)]/30 mt-1.5">
                            {teil === 'teil2'
                              ? 'Teil 2: nur einmal hören — like the real exam!'
                              : 'Like the real exam — 2 plays only!'}
                          </p>
                        )}

                        {/* Show Transcript toggle — appears after answering */}
                        {showResult && (
                          <div className="mt-3">
                            <button
                              onClick={() => setShowTranscript(prev => !prev)}
                              className="flex items-center gap-1 mx-auto text-xs text-[var(--foreground)]/50 hover:text-[var(--foreground)]/70 transition-colors"
                            >
                              <ChevronDown className={`w-3 h-3 transition-transform ${showTranscript ? 'rotate-180' : ''}`} />
                              {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
                            </button>
                            {showTranscript && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-sm italic text-[var(--foreground)]/60 mt-2 text-left whitespace-pre-line"
                              >
                                {currentQ.audio_text}
                              </motion.p>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      // Audio NOT available — fall back to showing text
                      <>
                        <p className="text-xs text-[var(--foreground)]/40 mb-1">
                          🎧 You hear{teil === 'teil2' ? ' (1x)' : ' (2x)'}:
                        </p>
                        <p className="text-sm italic">{currentQ.audio_text}</p>
                      </>
                    )}
                  </div>
                )}

                {/* Lesen section: always show audio_text as readable text */}
                {currentQ.audio_text && section === 'lesen' && (
                  <div className="mb-3 p-3 bg-[var(--foreground)]/5 rounded-lg">
                    <p className="text-xs text-[var(--foreground)]/40 mb-1">📖 Read:</p>
                    <p className="text-sm italic">{currentQ.audio_text}</p>
                  </div>
                )}

                {currentQ.text && (
                  <div className="mb-3 p-3 bg-[var(--foreground)]/5 rounded-lg">
                    <p className="text-xs text-[var(--foreground)]/40 mb-1">📖 Read:</p>
                    <p className="text-sm italic">{currentQ.text}</p>
                  </div>
                )}
                {currentQ.ad_text && (
                  <div className="mb-3 p-3 bg-[var(--foreground)]/5 rounded-lg">
                    <p className="text-xs text-[var(--foreground)]/40 mb-1">📰 Anzeige:</p>
                    <p className="text-sm italic">{currentQ.ad_text}</p>
                  </div>
                )}
                {currentQ.email_text && (
                  <div className="mb-3 p-3 bg-[var(--foreground)]/5 rounded-lg">
                    <p className="text-xs text-[var(--foreground)]/40 mb-1">📧 E-Mail:</p>
                    <p className="text-sm italic whitespace-pre-line">{currentQ.email_text}</p>
                  </div>
                )}

                {/* Question / Statement */}
                <p className="font-semibold">
                  {currentQ.statement || currentQ.question}
                </p>
              </div>
            </Card>

            {/* Answer options */}
            {currentQ.options ? (
              <div className="space-y-2">
                {currentQ.options.map((opt: string, i: number) => {
                  const letter = ['a', 'b', 'c'][i];
                  const isSelected = answers[currentQ.id] === letter;
                  const isCorrect = letter === currentQ.correct;
                  return (
                    <motion.button key={i} whileTap={{ scale: 0.98 }}
                      onClick={() => !showResult && handleAnswer(currentQ.id, letter)}
                      disabled={showResult}
                      className={`w-full p-3 rounded-xl border-2 text-left text-sm transition-all ${
                        showResult && isCorrect ? 'border-[#27ae60] bg-[#27ae60]/10' :
                        showResult && isSelected && !isCorrect ? 'border-[#c0392b] bg-[#c0392b]/10' :
                        isSelected ? 'border-[#d4a520] bg-[#d4a520]/10' :
                        'border-[var(--card-border)] hover:border-[var(--foreground)]/20'
                      }`}>
                      <span className="font-bold mr-2">{letter})</span> {opt}
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-3">
                {['Richtig', 'Falsch'].map(opt => {
                  const val = opt === 'Richtig';
                  const isSelected = answers[currentQ.id] === val;
                  const isCorrect = val === currentQ.correct;
                  return (
                    <motion.button key={opt} whileTap={{ scale: 0.95 }}
                      onClick={() => !showResult && handleAnswer(currentQ.id, val)}
                      disabled={showResult}
                      className={`flex-1 p-4 rounded-xl border-2 text-center font-bold text-sm transition-all ${
                        showResult && isCorrect ? 'border-[#27ae60] bg-[#27ae60]/10 text-[#27ae60]' :
                        showResult && isSelected && !isCorrect ? 'border-[#c0392b] bg-[#c0392b]/10 text-[#c0392b]' :
                        isSelected ? 'border-[#d4a520] bg-[#d4a520]/10' :
                        'border-[var(--card-border)] hover:border-[var(--foreground)]/20'
                      }`}>
                      {opt === 'Richtig' ? '✓' : '✗'} {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Explanation after answer */}
            {showResult && currentQ.explanation && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 rounded-xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10">
                <p className="text-xs text-[var(--foreground)]/50">{currentQ.explanation}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ─── SCHREIBEN ─────────────────────────────────────────────────── */}
        {section === 'schreiben' && !sectionIntro && (
          <motion.div key="schreiben" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">✍️</span>
              <span className="text-sm font-bold text-[#d4a520]">
                Schreiben — {schreibenTeil === 'teil1' ? 'Teil 1' : 'Teil 2'}
              </span>
            </div>

            {/* Teil 1: Form with input fields */}
            {schreibenTeil === 'teil1' && (
              <Card className="mb-4">
                <h3 className="font-bold text-sm mb-2">Teil 1: Formular ausfüllen (5 Punkte)</h3>
                <p className="text-xs text-[var(--foreground)]/40 mb-4">{test.schreiben?.teil1?.context}</p>
                <div className="space-y-3">
                  {test.schreiben?.teil1?.fields?.map((f: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <label className="font-medium text-sm w-32 text-[var(--foreground)]/60 flex-shrink-0">{f.label}:</label>
                      {schreibenSubmitted ? (
                        <div className="flex-1">
                          <p className="text-sm font-mono">{schreibenFormAnswers[f.label] || '(leer)'}</p>
                          <p className="text-xs text-[#27ae60] mt-0.5">Muster: {f.answer}</p>
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={schreibenFormAnswers[f.label] || ''}
                          onChange={(e) => setSchreibenFormAnswers(prev => ({ ...prev, [f.label]: e.target.value }))}
                          className="flex-1 px-3 py-2 rounded-lg bg-[var(--foreground)]/5 border border-[var(--foreground)]/15 text-sm focus:outline-none focus:border-[#d4a520]/50 focus:ring-1 focus:ring-[#d4a520]/30"
                          placeholder={`Ihre ${f.label}...`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {!schreibenSubmitted && (
                  <Button
                    onClick={() => setSchreibenTeil('teil2')}
                    fullWidth
                    className="mt-4"
                  >
                    Weiter zu Teil 2 <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </Card>
            )}

            {/* Teil 2: Message with textarea */}
            {schreibenTeil === 'teil2' && (
              <Card className="mb-4">
                <h3 className="font-bold text-sm mb-2">Teil 2: Kurze Nachricht schreiben (10 Punkte)</h3>
                <p className="text-sm mb-2">{test.schreiben?.teil2?.prompt}</p>
                <div className="text-xs text-[var(--foreground)]/40 mb-3 p-2 bg-[var(--foreground)]/5 rounded-lg">
                  <p className="font-semibold mb-1">Schreiben Sie etwas zu diesen 3 Punkten:</p>
                  {test.schreiben?.teil2?.points?.map((p: string, i: number) => (
                    <p key={i}>• {p}</p>
                  ))}
                </div>

                {!schreibenSubmitted ? (
                  <>
                    <textarea
                      value={schreibenMessage}
                      onChange={(e) => setSchreibenMessage(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2.5 rounded-lg bg-[var(--foreground)]/5 border border-[var(--foreground)]/15 text-sm focus:outline-none focus:border-[#d4a520]/50 focus:ring-1 focus:ring-[#d4a520]/30 resize-none leading-relaxed"
                      placeholder="Schreiben Sie Ihre Nachricht hier... (ca. 30 Wörter)"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-[var(--foreground)]/30">
                        {schreibenMessage.trim().split(/\s+/).filter(Boolean).length} Wörter
                      </p>
                      <Button
                        onClick={() => {
                          setSchreibenSubmitted(true);
                        }}
                        size="sm"
                      >
                        <Send className="w-3.5 h-3.5" /> Abgeben
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-[var(--foreground)]/5 rounded-lg mb-3 border border-[var(--foreground)]/10">
                      <p className="text-xs text-[var(--foreground)]/40 mb-1">Ihre Antwort:</p>
                      <p className="text-sm whitespace-pre-line">{schreibenMessage || '(Nichts geschrieben)'}</p>
                    </div>
                    <div className="p-3 bg-[#27ae60]/10 border border-[#27ae60]/20 rounded-lg">
                      <p className="text-xs text-[#27ae60] font-semibold mb-1">Musterantwort (sample):</p>
                      <p className="text-sm italic">{test.schreiben?.teil2?.sample_answer}</p>
                    </div>
                  </>
                )}
              </Card>
            )}

            {schreibenSubmitted && (
              <div className="space-y-2">
                <Card className="!bg-[#d4a520]/10 border-[#d4a520]/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#d4a520]" />
                    <p className="text-sm font-semibold text-[#d4a520]">Schreiben abgeschlossen</p>
                  </div>
                  <p className="text-xs text-[var(--foreground)]/50 mt-1">
                    Form: 5 Punkte {Object.keys(schreibenFormAnswers).length > 0 ? '✓' : '(leer)'} |
                    Nachricht: {schreibenMessage.trim().length > 10 ? '8' : schreibenMessage.trim().length > 0 ? '5' : '0'} Punkte
                  </p>
                </Card>
                <Button onClick={() => showSectionIntro('sprechen')} fullWidth>
                  Continue to Sprechen <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Back button for Teil 2 to go to Teil 1 */}
            {schreibenTeil === 'teil2' && !schreibenSubmitted && (
              <button
                onClick={() => setSchreibenTeil('teil1')}
                className="mt-3 text-xs text-[var(--foreground)]/40 hover:text-[var(--foreground)]/60 transition-colors"
              >
                ← Back to Teil 1
              </button>
            )}
          </motion.div>
        )}

        {/* ─── SPRECHEN ──────────────────────────────────────────────────── */}
        {section === 'sprechen' && !sectionIntro && (
          <motion.div key="sprechen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🗣️</span>
              <span className="text-sm font-bold text-[#e94560]">
                Sprechen — {sprechenTeil === 'teil1' ? 'Teil 1: Sich vorstellen' : sprechenTeil === 'teil2' ? 'Teil 2: Fragen' : 'Teil 3: Bitten'}
              </span>
            </div>

            {/* Teil 1: Vorstellung with recording */}
            {sprechenTeil === 'teil1' && (
              <Card className="mb-4">
                <h3 className="font-bold text-sm mb-1">Teil 1: Sich vorstellen</h3>
                <p className="text-xs text-[var(--foreground)]/40 mb-3">
                  Stellen Sie sich bitte vor. Sprechen Sie zu jedem Punkt.
                </p>
                <div className="space-y-3">
                  {test.sprechen?.teil1?.map((item: any, i: number) => {
                    const itemKey = `s-t1-${i}`;
                    const isCompleted = sprechenCompleted[itemKey];
                    const recording = sprechenRecordings[itemKey];
                    return (
                      <div key={i} className={`p-3 rounded-lg border transition-all ${
                        isCompleted ? 'bg-[#27ae60]/10 border-[#27ae60]/20' : 'bg-[var(--foreground)]/5 border-[var(--foreground)]/10'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="bg-[#e94560]/10 text-[#e94560] px-2 py-0.5 rounded text-xs font-bold">{item.topic}</span>
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-[#27ae60]" />
                          ) : (
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => isRecording ? stopRecording() : startRecording(itemKey)}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                isRecording ? 'bg-[#c0392b]/20 text-[#c0392b] border border-[#c0392b]/30 animate-pulse' : 'bg-[#e94560]/10 text-[#e94560] border border-[#e94560]/30 hover:bg-[#e94560]/20'
                              }`}
                            >
                              {isRecording ? <><MicOff className="w-3 h-3" /> Stop</> : <><Mic className="w-3 h-3" /> Speak</>}
                            </motion.button>
                          )}
                        </div>
                        {recording && (
                          <p className="text-xs text-[var(--foreground)]/60 mt-1 italic">&quot;{recording}&quot;</p>
                        )}
                        {!isCompleted && (
                          <p className="text-xs text-[var(--foreground)]/30 mt-1">
                            Beispiel: <span className="italic">{item.sample_answer}</span>
                          </p>
                        )}
                        {isCompleted && (
                          <p className="text-xs text-[#27ae60]/60 mt-1">
                            Muster: <span className="italic">{item.sample_answer}</span>
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <Button
                  onClick={() => { setSprechenTeil('teil2'); setCurrentSprechenItem(0); }}
                  fullWidth
                  className="mt-4"
                >
                  Weiter zu Teil 2 <ChevronRight className="w-4 h-4" />
                </Button>
              </Card>
            )}

            {/* Teil 2: Fragen with recording */}
            {sprechenTeil === 'teil2' && (
              <Card className="mb-4">
                <h3 className="font-bold text-sm mb-1">Teil 2: Fragen stellen und beantworten</h3>
                <p className="text-xs text-[var(--foreground)]/40 mb-3">
                  Sie bekommen Wortkarten. Stellen Sie eine Frage und geben Sie eine Antwort.
                </p>
                <div className="space-y-3">
                  {test.sprechen?.teil2?.map((item: any, i: number) => {
                    const itemKey = `s-t2-${i}`;
                    const isCompleted = sprechenCompleted[itemKey];
                    const recording = sprechenRecordings[itemKey];
                    return (
                      <div key={i} className={`p-3 rounded-lg border transition-all ${
                        isCompleted ? 'bg-[#27ae60]/10 border-[#27ae60]/20' : 'bg-[var(--foreground)]/5 border-[var(--foreground)]/10'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="px-3 py-1 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-lg">
                            <p className="text-xs text-[var(--foreground)]/40">Wortkarte</p>
                            <p className="font-bold text-sm text-[#3b82f6]">{item.word_card}</p>
                          </div>
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-[#27ae60]" />
                          ) : (
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => isRecording ? stopRecording() : startRecording(itemKey)}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                isRecording ? 'bg-[#c0392b]/20 text-[#c0392b] border border-[#c0392b]/30 animate-pulse' : 'bg-[#e94560]/10 text-[#e94560] border border-[#e94560]/30 hover:bg-[#e94560]/20'
                              }`}
                            >
                              {isRecording ? <><MicOff className="w-3 h-3" /> Stop</> : <><Mic className="w-3 h-3" /> Speak</>}
                            </motion.button>
                          )}
                        </div>
                        {recording && (
                          <p className="text-xs text-[var(--foreground)]/60 italic mb-1">&quot;{recording}&quot;</p>
                        )}
                        {isCompleted && (
                          <div className="text-xs text-[var(--foreground)]/40 mt-1">
                            <p><span className="text-[#3b82f6]">Frage:</span> {item.sample_question}</p>
                            <p><span className="text-[#27ae60]">Antwort:</span> {item.sample_answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setSprechenTeil('teil1')}
                    className="text-xs text-[var(--foreground)]/40 hover:text-[var(--foreground)]/60 transition-colors"
                  >
                    ← Teil 1
                  </button>
                  <div className="flex-1" />
                  <Button
                    onClick={() => { setSprechenTeil('teil3'); setCurrentSprechenItem(0); }}
                    size="sm"
                  >
                    Weiter zu Teil 3 <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Teil 3: Bitten with recording */}
            {sprechenTeil === 'teil3' && (
              <Card className="mb-4">
                <h3 className="font-bold text-sm mb-1">Teil 3: Bitten formulieren</h3>
                <p className="text-xs text-[var(--foreground)]/40 mb-3">
                  Lesen Sie die Situation und formulieren Sie eine Bitte.
                </p>
                <div className="space-y-3">
                  {test.sprechen?.teil3?.map((item: any, i: number) => {
                    const itemKey = `s-t3-${i}`;
                    const isCompleted = sprechenCompleted[itemKey];
                    const recording = sprechenRecordings[itemKey];
                    return (
                      <div key={i} className={`p-3 rounded-lg border transition-all ${
                        isCompleted ? 'bg-[#27ae60]/10 border-[#27ae60]/20' : 'bg-[var(--foreground)]/5 border-[var(--foreground)]/10'
                      }`}>
                        <p className="text-xs text-[var(--foreground)]/50 mb-2">{item.situation}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-[var(--foreground)]/30">Formulieren Sie eine Bitte.</p>
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-[#27ae60]" />
                          ) : (
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => isRecording ? stopRecording() : startRecording(itemKey)}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                isRecording ? 'bg-[#c0392b]/20 text-[#c0392b] border border-[#c0392b]/30 animate-pulse' : 'bg-[#e94560]/10 text-[#e94560] border border-[#e94560]/30 hover:bg-[#e94560]/20'
                              }`}
                            >
                              {isRecording ? <><MicOff className="w-3 h-3" /> Stop</> : <><Mic className="w-3 h-3" /> Speak</>}
                            </motion.button>
                          )}
                        </div>
                        {recording && (
                          <p className="text-xs text-[var(--foreground)]/60 italic mt-1">&quot;{recording}&quot;</p>
                        )}
                        {isCompleted && (
                          <p className="text-xs text-[#d4a520]/60 mt-1">
                            Muster: <span className="italic">&quot;{item.sample_request}&quot;</span>
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setSprechenTeil('teil2')}
                    className="text-xs text-[var(--foreground)]/40 hover:text-[var(--foreground)]/60 transition-colors"
                  >
                    ← Teil 2
                  </button>
                  <div className="flex-1" />
                </div>
              </Card>
            )}

            {/* Finish button */}
            {!sprechenSubmitted && (
              <Button onClick={() => { setSprechenSubmitted(true); finishTest(); }} fullWidth>
                <Award className="w-4 h-4" /> Prüfung abschließen
              </Button>
            )}
          </motion.div>
        )}

        {/* ─── RESULTS ───────────────────────────────────────────────────── */}
        {section === 'results' && (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="text-center mb-6">
              <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                className="text-6xl mb-3">
                {passed ? '🎉' : '💪'}
              </motion.p>
              <h1 className="text-2xl font-bold mb-1">
                {passed ? 'Bestanden!' : 'Nicht bestanden'}
              </h1>
              <p className="text-sm font-medium mb-1" style={{ color: passed ? '#27ae60' : '#c0392b' }}>
                {passed ? '(Passed)' : '(Not passed)'}
              </p>
              <p className="text-[var(--foreground)]/40 text-sm">
                {passed
                  ? 'Adipoli! You passed the Goethe A1 simulation!'
                  : 'You need 36/60 to pass. Keep practicing — you\'ll get there!'}
              </p>
            </div>

            {/* Big score display */}
            <Card className="mb-4">
              <div className="text-center mb-4">
                <div className="inline-flex items-baseline gap-1">
                  <span className="text-4xl font-bold" style={{ color: passed ? '#27ae60' : '#c0392b' }}>
                    {totalScore}
                  </span>
                  <span className="text-lg text-[var(--foreground)]/40">/60</span>
                </div>
                <p className="text-xs text-[var(--foreground)]/30 mt-1">
                  {Math.round((totalScore / 60) * 100)}% · 36 Punkte zum Bestehen
                </p>
              </div>
              <ProgressBar progress={Math.round((totalScore / 60) * 100)}
                color={passed ? 'success' : 'warning'} size="md" />
            </Card>

            {/* Section-by-section breakdown */}
            <Card className="mb-4">
              <h3 className="font-bold text-sm mb-4">Ergebnis nach Prüfungsteilen</h3>
              <div className="space-y-3">
                {/* Hören */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-[#3b82f6]">🎧 Hören</span>
                    <span className="text-xs text-[var(--foreground)]/50">
                      ({getSectionScoreForBreakdown('hoeren').correct}/{getSectionScoreForBreakdown('hoeren').total} richtig)
                    </span>
                  </div>
                  <ScoreBar score={sectionScores.hoeren} max={15} color="#3b82f6" />
                </div>

                {/* Lesen */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-[#27ae60]">📖 Lesen</span>
                    <span className="text-xs text-[var(--foreground)]/50">
                      ({getSectionScoreForBreakdown('lesen').correct}/{getSectionScoreForBreakdown('lesen').total} richtig)
                    </span>
                  </div>
                  <ScoreBar score={sectionScores.lesen} max={15} color="#27ae60" />
                </div>

                {/* Schreiben */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-[#d4a520]">✍️ Schreiben</span>
                    <span className="text-xs text-[var(--foreground)]/50">
                      (Form + Nachricht)
                    </span>
                  </div>
                  <ScoreBar score={sectionScores.schreiben} max={15} color="#d4a520" />
                </div>

                {/* Sprechen */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-[#e94560]">🗣️ Sprechen</span>
                    <span className="text-xs text-[var(--foreground)]/50">
                      ({Object.values(sprechenCompleted).filter(Boolean).length}/{getTotalSprechenItems()} Teile gesprochen)
                    </span>
                  </div>
                  <ScoreBar score={sectionScores.sprechen} max={15} color="#e94560" />
                </div>
              </div>

              {/* Divider + total */}
              <div className="mt-4 pt-3 border-t border-[var(--foreground)]/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Gesamt</span>
                  <span className="text-sm font-bold font-mono" style={{ color: passed ? '#27ae60' : '#c0392b' }}>
                    {totalScore}/60 — {passed ? 'BESTANDEN ✓' : 'NICHT BESTANDEN ✗'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Study advice */}
            <Card className="mb-4">
              <h3 className="font-bold text-sm mb-2">What to do next</h3>
              <p className="text-xs text-[var(--foreground)]/50 leading-relaxed">
                {passed
                  ? 'Great job! Now strengthen your weak areas. Focus on whichever section had the lowest score.'
                  : (() => {
                      const scores = [
                        { name: 'Hören (listening)', score: sectionScores.hoeren },
                        { name: 'Lesen (reading)', score: sectionScores.lesen },
                        { name: 'Schreiben (writing)', score: sectionScores.schreiben },
                        { name: 'Sprechen (speaking)', score: sectionScores.sprechen },
                      ];
                      const weakest = scores.reduce((a, b) => a.score < b.score ? a : b);
                      return `Your weakest section was ${weakest.name} with ${weakest.score}/15. Focus your practice there first, then retake the test.`;
                    })()}
              </p>
            </Card>

            <div className="flex flex-col gap-2">
              <Button onClick={() => {
                setAnswers({});
                setSchreibenFormAnswers({});
                setSchreibenMessage('');
                setSchreibenSubmitted(false);
                setSprechenRecordings({});
                setSprechenCompleted({});
                setSprechenSubmitted(false);
                setSectionScores({ hoeren: 0, lesen: 0, schreiben: 0, sprechen: 0 });
                setSection('overview');
              }} fullWidth>
                Try Again
              </Button>
              <Button variant="ghost" onClick={() => router.push('/tests')} fullWidth>
                Back to Tests
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
