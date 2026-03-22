'use client';

import { use, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight, Award, ChevronDown } from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { Confetti } from '@/components/game';
import { useGameStore } from '@/lib/store';
import { GOETHE_TESTS, getTestById } from '@/lib/content/goethe-tests';
import { playAudio, stopAudio } from '@/lib/audio';

type Section = 'overview' | 'hoeren' | 'lesen' | 'schreiben' | 'sprechen' | 'results';
type Teil = 'teil1' | 'teil2' | 'teil3';

export default function TestPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = use(params);
  const router = useRouter();
  const { addXP, incrementQuizzesTaken } = useGameStore();

  const [section, setSection] = useState<Section>('overview');
  const [teil, setTeil] = useState<Teil>('teil1');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Hören audio state
  const [playsLeft, setPlaysLeft] = useState(2);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState<boolean | null>(null); // null = not checked yet
  const [showTranscript, setShowTranscript] = useState(false);

  const test = getTestById(testId);

  // Timer
  useEffect(() => {
    if (section !== 'overview' && section !== 'results' && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [section, timeLeft]);

  // Reset audio state when question changes
  useEffect(() => {
    setPlaysLeft(2);
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

    // Check if audio file exists by trying to fetch it
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

  const startSection = (s: Section) => {
    setSection(s);
    setTeil('teil1');
    setQuestionIndex(0);
    setShowResult(false);
    setTimeLeft(s === 'hoeren' ? 20 * 60 : s === 'lesen' ? 25 * 60 : s === 'schreiben' ? 20 * 60 : 15 * 60);
  };

  // Static version for use in useEffect (no dependency on section state at call time)
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
      // Audio failed — will fall back to text display
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
          // Section complete — move to next
          if (section === 'hoeren') startSection('lesen');
          else if (section === 'lesen') startSection('schreiben');
          else if (section === 'schreiben') startSection('sprechen');
          else finishTest();
        }
      }
    }, 1500);
  };

  const finishTest = () => {
    // Calculate score
    let correct = 0;
    let total = 0;
    if (test) {
      // Count Hören
      for (const t of ['teil1', 'teil2', 'teil3'] as Teil[]) {
        const qs = test.hoeren?.[t] || [];
        qs.forEach((q: any) => {
          total++;
          const userAns = answers[q.id];
          if (t === 'teil1' && userAns === q.correct) correct++;
          else if (t !== 'teil1' && userAns === q.correct) correct++;
        });
      }
      // Count Lesen
      for (const t of ['teil1', 'teil2', 'teil3'] as Teil[]) {
        const qs = test.lesen?.[t] || [];
        qs.forEach((q: any) => {
          total++;
          const userAns = answers[q.id];
          if ((t === 'teil1' || t === 'teil2') && userAns === q.correct) correct++;
          else if (t === 'teil3' && userAns === q.correct) correct++;
        });
      }
    }
    setTotalCorrect(correct);
    setTotalQuestions(total);
    setSection('results');
    incrementQuizzesTaken();
    addXP(Math.max(20, correct * 5));
  };

  const totalScorePercent = Math.round((totalCorrect / Math.max(1, totalQuestions)) * 100);
  const passed = totalScorePercent >= 60;

  const getSectionScore = (kind: 'hoeren' | 'lesen') => {
    if (!test) return { correct: 0, total: 0, percent: 0 };
    let correct = 0;
    let total = 0;
    for (const part of ['teil1', 'teil2', 'teil3'] as Teil[]) {
      const qs = test[kind]?.[part] || [];
      qs.forEach((q: any) => {
        total++;
        const userAns = answers[q.id];
        if (userAns === q.correct) correct++;
      });
    }
    return {
      correct,
      total,
      percent: Math.round((correct / Math.max(1, total)) * 100),
    };
  };

  const hoerenScore = getSectionScore('hoeren');
  const lesenScore = getSectionScore('lesen');

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

  return (
    <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
      <Confetti isActive={section === 'results'} duration={3000} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => router.push('/tests')} className="flex items-center gap-2 text-[var(--foreground)]/50 text-sm">
          <ArrowLeft className="w-4 h-4" /> Tests
        </button>
        {section !== 'overview' && section !== 'results' && (
          <div className="flex items-center gap-2 text-sm font-mono">
            <Clock className="w-4 h-4 text-[var(--foreground)]/40" />
            <span className={timeLeft < 120 ? 'text-[#c0392b] animate-pulse' : 'text-[var(--foreground)]/60'}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* OVERVIEW */}
        {section === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="text-center mb-6">
              <p className="text-5xl mb-3">📝</p>
              <h1 className="text-2xl font-bold">{test.name}</h1>
              <p className="text-[var(--foreground)]/40 text-sm mt-1">{test.description}</p>
            </div>

            <div className="space-y-3 mb-4">
              {[
                { icon: '🎧', label: 'Hören', desc: '15 Fragen · 20 Min', color: '#3b82f6', section: 'hoeren' as Section },
                { icon: '📖', label: 'Lesen', desc: '15 Fragen · 25 Min', color: '#27ae60', section: 'lesen' as Section },
                { icon: '✍️', label: 'Schreiben', desc: '2 Aufgaben · 20 Min', color: '#d4a520', section: 'schreiben' as Section },
                { icon: '🗣️', label: 'Sprechen', desc: '3 Aufgaben · 15 Min', color: '#e94560', section: 'sprechen' as Section },
              ].map((s) => (
                <div key={s.label} className="game-card p-3 flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm" style={{ color: s.color }}>{s.label}</h3>
                    <p className="text-xs text-[var(--foreground)]/40">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="mb-6">
              <h3 className="font-bold text-sm mb-2">Smart test strategy</h3>
              <ul className="space-y-2 text-xs text-[var(--foreground)]/50 leading-relaxed">
                <li>• In Hören, listen once for the main idea and once for the exact detail.</li>
                <li>• In Lesen, underline names, times, prices, places, and negatives like <em>nicht</em>.</li>
                <li>• In Schreiben, cover all 3 points even with short simple sentences.</li>
                <li>• In Sprechen, clear A1 German beats fancy German. Short and correct wins.</li>
              </ul>
            </Card>

            <Button onClick={() => startSection('hoeren')} size="lg" fullWidth>
              Start Test
            </Button>
          </motion.div>
        )}

        {/* HÖREN / LESEN QUESTIONS */}
        {(section === 'hoeren' || section === 'lesen') && currentQ && (
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

            {/* Audio text / Reading text */}
            <Card className="mb-4">
              <div className="text-sm leading-relaxed">
                {/* Hören section: audio playback or text fallback */}
                {currentQ.audio_text && section === 'hoeren' && (
                  <div className="mb-3 p-3 bg-[var(--foreground)]/5 rounded-lg">
                    {audioAvailable === null ? (
                      // Still checking audio availability
                      <div className="text-center py-2">
                        <p className="text-xs text-[var(--foreground)]/40 animate-pulse">Loading audio...</p>
                      </div>
                    ) : audioAvailable ? (
                      // Audio available — show play button
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
                        {playsLeft < 2 && playsLeft > 0 && (
                          <p className="text-xs text-[#d4a520] mt-1.5">You can listen one more time</p>
                        )}
                        {playsLeft === 0 && !showResult && (
                          <p className="text-xs text-[var(--foreground)]/30 mt-1.5">Like the real exam — 2 plays only!</p>
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
                      // Audio NOT available — fall back to showing text (backward compatible)
                      <>
                        <p className="text-xs text-[var(--foreground)]/40 mb-1">🎧 You hear:</p>
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
                    <p className="text-xs text-[var(--foreground)]/40 mb-1">📰 Advertisement:</p>
                    <p className="text-sm italic">{currentQ.ad_text}</p>
                  </div>
                )}
                {currentQ.email_text && (
                  <div className="mb-3 p-3 bg-[var(--foreground)]/5 rounded-lg">
                    <p className="text-xs text-[var(--foreground)]/40 mb-1">📧 Email:</p>
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
              // Multiple choice (a/b/c)
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
              // Richtig / Falsch
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

        {/* SCHREIBEN */}
        {section === 'schreiben' && (
          <motion.div key="schreiben" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">✍️</span>
              <span className="text-sm font-bold text-[#d4a520]">Schreiben</span>
            </div>

            {/* Teil 1: Form */}
            <Card className="mb-4">
              <h3 className="font-bold text-sm mb-2">Teil 1: Formular ausfüllen</h3>
              <p className="text-xs text-[var(--foreground)]/40 mb-3">{test.schreiben?.teil1?.context}</p>
              <div className="space-y-2">
                {test.schreiben?.teil1?.fields?.map((f: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="font-medium w-32 text-[var(--foreground)]/60">{f.label}:</span>
                    <span className="text-[#27ae60] font-mono">{f.answer}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Teil 2: Message */}
            <Card className="mb-4">
              <h3 className="font-bold text-sm mb-2">Teil 2: Kurze Nachricht schreiben</h3>
              <p className="text-sm mb-2">{test.schreiben?.teil2?.prompt}</p>
              <div className="text-xs text-[var(--foreground)]/40 mb-3">
                <p className="font-semibold mb-1">Schreiben Sie etwas zu diesen 3 Punkten:</p>
                {test.schreiben?.teil2?.points?.map((p: string, i: number) => (
                  <p key={i}>• {p}</p>
                ))}
              </div>
              <div className="p-3 bg-[#27ae60]/10 border border-[#27ae60]/20 rounded-lg">
                <p className="text-xs text-[#27ae60] font-semibold mb-1">Musterantwort:</p>
                <p className="text-sm italic">{test.schreiben?.teil2?.sample_answer}</p>
              </div>
            </Card>

            <Button onClick={() => startSection('sprechen')} fullWidth>
              Continue to Sprechen <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* SPRECHEN */}
        {section === 'sprechen' && (
          <motion.div key="sprechen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🗣️</span>
              <span className="text-sm font-bold text-[#e94560]">Sprechen</span>
            </div>

            {/* Teil 1: Vorstellung */}
            <Card className="mb-4">
              <h3 className="font-bold text-sm mb-2">Teil 1: Sich vorstellen</h3>
              <div className="space-y-2">
                {test.sprechen?.teil1?.map((item: any, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="bg-[#e94560]/10 text-[#e94560] px-2 py-0.5 rounded text-xs font-bold flex-shrink-0">{item.topic}</span>
                    <span className="text-[var(--foreground)]/60 italic">{item.sample_answer}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Teil 2: Fragen */}
            <Card className="mb-4">
              <h3 className="font-bold text-sm mb-2">Teil 2: Fragen stellen und beantworten</h3>
              <div className="space-y-3">
                {test.sprechen?.teil2?.map((item: any, i: number) => (
                  <div key={i} className="p-2 bg-[var(--foreground)]/5 rounded-lg text-sm">
                    <p className="text-xs text-[var(--foreground)]/40 mb-1">Wortkarte: <span className="font-bold">{item.word_card}</span></p>
                    <p><span className="text-[#3b82f6]">Frage:</span> {item.sample_question}</p>
                    <p><span className="text-[#27ae60]">Antwort:</span> {item.sample_answer}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Teil 3: Bitten */}
            <Card className="mb-4">
              <h3 className="font-bold text-sm mb-2">Teil 3: Bitten formulieren</h3>
              <div className="space-y-2">
                {test.sprechen?.teil3?.map((item: any, i: number) => (
                  <div key={i} className="text-sm">
                    <p className="text-[var(--foreground)]/40 text-xs">{item.situation}</p>
                    <p className="font-medium text-[#d4a520] italic">&quot;{item.sample_request}&quot;</p>
                  </div>
                ))}
              </div>
            </Card>

            <Button onClick={finishTest} fullWidth>
              <Award className="w-4 h-4" /> Finish Test
            </Button>
          </motion.div>
        )}

        {/* RESULTS */}
        {section === 'results' && (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="text-center mb-6">
              <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                className="text-6xl mb-3">
                {passed ? '🎉' : '💪'}
              </motion.p>
              <h1 className="text-2xl font-bold mb-1">
                {passed ? 'Bestanden!' : 'Weiter üben!'}
              </h1>
              <p className="text-[var(--foreground)]/40 text-sm">
                {passed
                  ? 'Adipoli! You passed the Goethe A1 simulation!'
                  : 'You need 60% to pass. Keep practicing — you\'ll get there!'}
              </p>
            </div>

            <Card className="mb-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#27ae60]">{totalCorrect}</div>
                  <div className="text-xs text-[var(--foreground)]/40">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--foreground)]/60">{totalQuestions}</div>
                  <div className="text-xs text-[var(--foreground)]/40">Total</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#d4a520]">
                    {totalScorePercent}%
                  </div>
                  <div className="text-xs text-[var(--foreground)]/40">Score</div>
                </div>
              </div>
              <div className="mt-3">
                <ProgressBar progress={totalScorePercent}
                  color={passed ? 'success' : 'warning'} size="md" />
                <p className="text-xs text-center text-[var(--foreground)]/30 mt-1">60% needed to pass</p>
              </div>
            </Card>

            <Card className="mb-4">
              <h3 className="font-bold text-sm mb-3">Section breakdown</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[#3b82f6] font-semibold">🎧 Hören</span>
                    <span className="text-[var(--foreground)]/60">{hoerenScore.correct}/{hoerenScore.total} · {hoerenScore.percent}%</span>
                  </div>
                  <ProgressBar progress={hoerenScore.percent} color={hoerenScore.percent >= 60 ? 'success' : 'warning'} size="sm" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[#27ae60] font-semibold">📖 Lesen</span>
                    <span className="text-[var(--foreground)]/60">{lesenScore.correct}/{lesenScore.total} · {lesenScore.percent}%</span>
                  </div>
                  <ProgressBar progress={lesenScore.percent} color={lesenScore.percent >= 60 ? 'success' : 'warning'} size="sm" />
                </div>
              </div>
            </Card>

            <Card className="mb-4">
              <h3 className="font-bold text-sm mb-2">What to do next</h3>
              <p className="text-xs text-[var(--foreground)]/50 leading-relaxed">
                {passed
                  ? 'Great job. Now strengthen weak spots by replaying one speaking practice and one writing task before your next mock test.'
                  : hoerenScore.percent < lesenScore.percent
                  ? 'Your listening is weaker than your reading right now. Spend the next session on vocabulary audio, short listening loops, and repeat-after-audio practice.'
                  : 'Your reading needs more support right now. Focus on short texts, exam-style scanning, and sentence-level grammar review before the next test.'}
              </p>
            </Card>

            <div className="flex flex-col gap-2">
              <Button onClick={() => { setAnswers({}); setSection('overview'); }} fullWidth>
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
