'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, RotateCcw, Volume2, XCircle } from 'lucide-react';
import { MissionShell, PremiumCard, PrimaryButton, SecondaryActionButton } from '@/app/missions/module-2/_components/MissionUI';
import { SpeakButton } from '@/components/speaking';
import { playAudio } from '@/lib/audio';
import { matchesAnswer } from '@/lib/answer-match';
import {
  evaluateAutoTask,
  findRecoveryCards,
  scoreSpineCheckpoint,
  type CheckpointItem,
  type CheckpointScore,
  type SpineCheckpoint,
} from '@/lib/spine-checkpoints';
import type { MockGateResult } from '@/lib/store';

const STEPS = ['Closed checkpoint'];
const MAX_AUDIO_PLAYS = 2;

type RunItem = { item: CheckpointItem; sectionTitle: string };
type Phase = 'intro' | 'run' | 'result';

export type CheckpointAttempt = {
  itemId: string;
  response: string;
  passed: boolean;
  playsUsed: number;
  completedAt: number;
  productionRubric?: 'met' | 'shaky' | 'missed';
};

type Props = {
  checkpoint: SpineCheckpoint;
  sceneImage: string;
  onSave: (score: CheckpointScore, passedItemIds: string[], attempts: CheckpointAttempt[]) => void;
  mockResults?: Record<string, MockGateResult>;
  continueHref: string;
  continueLabel: string;
  railLabel?: string;
};

function shuffled<T>(values: readonly T[], seed: number): T[] {
  const result = [...values];
  let state = seed;
  for (let index = result.length - 1; index > 0; index--) {
    state = (state * 9301 + 49297) % 233280;
    const swapIndex = Math.floor((state / 233280) * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function AudioButton({ url, playsLeft, onPlay }: { url: string; playsLeft: number; onPlay: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const play = async () => {
    if (playing || playsLeft <= 0) return;
    setPlaying(true);
    setFailed(false);
    onPlay();
    try {
      await playAudio(url);
    } catch {
      setFailed(true);
    } finally {
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      disabled={playing || playsLeft <= 0}
      onClick={play}
      className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-black transition ${
        playsLeft > 0
          ? 'border-[#3b82f6]/40 bg-[#3b82f6]/12 text-[#9dc4ff] hover:bg-[#3b82f6]/20'
          : 'border-white/10 bg-white/5 text-white/30'
      }`}
    >
      <Volume2 className={`h-4 w-4 ${playing ? 'animate-pulse' : ''}`} />
      {playing ? 'Listening…' : failed ? 'Audio failed — retry' : playsLeft > 0 ? `Play audio (${playsLeft} left)` : 'No plays left'}
    </button>
  );
}

export function AdministeredCheckpoint({
  checkpoint,
  sceneImage,
  onSave,
  mockResults = {},
  continueHref,
  continueLabel,
  railLabel = `Module ${checkpoint.moduleId} · Closed checkpoint`,
}: Props) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [passedItemIds, setPassedItemIds] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<CheckpointAttempt[]>([]);
  const savedRun = useRef(false);

  const [typed, setTyped] = useState('');
  const [written, setWritten] = useState('');
  const [choice, setChoice] = useState<string | null>(null);
  const [responseLocked, setResponseLocked] = useState(false);
  const [modelShown, setModelShown] = useState(false);
  const [playsUsed, setPlaysUsed] = useState(0);
  const [speechAttempted, setSpeechAttempted] = useState(false);
  const finishing = useRef(false);

  const runItems = useMemo<RunItem[]>(() => checkpoint.sections.flatMap((section) =>
    section.items.map((item) => ({ item, sectionTitle: section.title }))), [checkpoint]);
  const score = useMemo(() => scoreSpineCheckpoint(checkpoint, passedItemIds), [checkpoint, passedItemIds]);
  const current = runItems[index];
  const recoveryCards = findRecoveryCards(checkpoint, score.failedTags);
  const isFinal = checkpoint.moduleId === 8;

  useEffect(() => {
    if (phase !== 'result' || savedRun.current) return;
    savedRun.current = true;
    onSave(score, passedItemIds, attempts);
  }, [attempts, onSave, passedItemIds, phase, score]);

  const resetItemState = () => {
    setTyped('');
    setWritten('');
    setChoice(null);
    setResponseLocked(false);
    setModelShown(false);
    setPlaysUsed(0);
    setSpeechAttempted(false);
    finishing.current = false;
  };

  const finishItem = (
    passed: boolean,
    response: string,
    productionRubric?: CheckpointAttempt['productionRubric'],
  ) => {
    if (!current || responseLocked || finishing.current) return;
    finishing.current = true;
    setResponseLocked(true);
    if (passed) setPassedItemIds((values) => values.includes(current.item.id) ? values : [...values, current.item.id]);
    setAttempts((values) => [...values, {
      itemId: current.item.id,
      response,
      passed,
      playsUsed,
      completedAt: Date.now(),
      productionRubric,
    }]);

    const last = index >= runItems.length - 1;
    window.setTimeout(() => {
      resetItemState();
      if (last) setPhase('result');
      else setIndex((value) => value + 1);
    }, 550);
  };

  const start = () => {
    setPassedItemIds([]);
    setAttempts([]);
    setIndex(0);
    savedRun.current = false;
    resetItemState();
    setPhase('run');
  };

  if (phase === 'intro') {
    return (
      <MissionShell currentStep={0} steps={STEPS} railLabel={railLabel} tone="green">
        <PremiumCard>
          <section data-testid={`module-${checkpoint.moduleId}-scored-checkpoint`} aria-label={`Module ${checkpoint.moduleId} scored checkpoint`}>
            <div className="relative mb-6 h-32 overflow-hidden rounded-[1.45rem] sm:h-40">
              <img src={sceneImage} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0d] via-[#0d1a0d]/40 to-transparent" />
            </div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d27a]">Closed diagnostic</p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">{checkpoint.title}.</h1>
            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-white/64">
              {runItems.length} tasks, one at a time. No Google, notes, dictionary, or answer reveals. Audio plays {MAX_AUDIO_PLAYS}× maximum.
            </p>
            <div className="mt-5 max-w-xl rounded-[1.35rem] border border-[#f1d27a]/18 bg-[#f1d27a]/8 p-4">
              <p className="text-sm font-black text-[#f1d27a]">Pass rule</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-white/70">{checkpoint.passRule}</p>
            </div>
            <div className="mt-6" data-testid="spine-checkpoint-start">
              <PrimaryButton onClick={start}>Start the checkpoint</PrimaryButton>
            </div>
          </section>
        </PremiumCard>
      </MissionShell>
    );
  }

  if (phase === 'run' && current) {
    const { item, sectionTitle } = current;
    const task = item.task;
    const options = task.kind === 'choice' ? shuffled(task.options, item.id.length * 7 + index * 13 + 5) : [];
    const audioRequired = (task.kind === 'choice' || task.kind === 'type') && !!task.audioUrl;
    const audioReady = !audioRequired || playsUsed > 0;

    return (
      <MissionShell currentStep={0} steps={STEPS} railLabel={railLabel} tone="green">
        <PremiumCard>
          <section data-testid="spine-checkpoint-runner" aria-label={`Checkpoint task ${index + 1} of ${runItems.length}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f1d27a]">{sectionTitle}</p>
              <p className="rounded-full border border-white/10 bg-black/16 px-3 py-1 text-xs font-black text-white/60">{index + 1} / {runItems.length}</p>
            </div>
            <div className="mt-3 flex gap-1" aria-hidden="true">
              {runItems.map((runItem, itemIndex) => (
                <div key={runItem.item.id} className={`h-1 flex-1 rounded-full ${itemIndex < index ? 'bg-[#3fbf75]' : itemIndex === index ? 'bg-[#f1d27a]' : 'bg-white/10'}`} />
              ))}
            </div>

            <h2 className="mt-6 text-2xl font-black leading-snug sm:text-3xl">{task.question}</h2>
            {item.requiredForPass && <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[#ffc9c2]">Required to pass</p>}

            {task.kind === 'choice' && (
              <div className="mt-6 grid gap-3">
                {task.audioUrl && <AudioButton url={task.audioUrl} playsLeft={MAX_AUDIO_PLAYS - playsUsed} onPlay={() => setPlaysUsed((value) => value + 1)} />}
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    disabled={responseLocked || !audioReady}
                    onClick={() => {
                      setChoice(option);
                      finishItem(option === task.correctAnswer, option);
                    }}
                    className={`rounded-2xl border p-4 text-left text-base font-bold transition active:scale-[0.99] ${
                      choice === option ? 'border-[#f1d27a]/55 bg-[#f1d27a]/12 text-white' : 'border-white/12 bg-black/14 text-white/85 hover:border-white/28 hover:bg-white/[0.07]'
                    } disabled:opacity-40`}
                    data-testid="spine-checkpoint-option"
                  >
                    {option}
                  </button>
                ))}
                {!audioReady && <p className="text-sm font-semibold text-white/48">Play the audio before answering.</p>}
                {responseLocked && <p className="text-sm font-bold text-[#f1d27a]">Response locked.</p>}
              </div>
            )}

            {task.kind === 'type' && (
              <div className="mt-6 grid gap-3">
                {task.audioUrl && <AudioButton url={task.audioUrl} playsLeft={MAX_AUDIO_PLAYS - playsUsed} onPlay={() => setPlaysUsed((value) => value + 1)} />}
                <div className="flex items-stretch gap-2">
                  <input
                    type="text"
                    value={typed}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    disabled={responseLocked || !audioReady}
                    placeholder={task.placeholder ?? 'Type your answer…'}
                    onChange={(event) => setTyped(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && typed.trim() && !responseLocked && audioReady) {
                        finishItem(matchesAnswer(typed, task.accepted), typed);
                      }
                    }}
                    className="min-h-14 flex-1 rounded-2xl border-2 border-white/15 bg-black/20 px-4 text-base font-bold focus:outline-none focus:ring-2 focus:ring-[#f1d27a]/40 disabled:opacity-40"
                    data-testid="spine-checkpoint-input"
                  />
                  <button
                    type="button"
                    disabled={!typed.trim() || responseLocked || !audioReady}
                    onClick={() => finishItem(matchesAnswer(typed, task.accepted), typed)}
                    className="rounded-2xl bg-[#f1d27a] px-5 font-black text-[#162416] transition hover:bg-[#ffe394] disabled:opacity-40"
                  >
                    Submit
                  </button>
                </div>
                {!audioReady && <p className="text-sm font-semibold text-white/48">Play the audio before typing.</p>}
                {responseLocked && <p className="text-sm font-bold text-[#f1d27a]">Response locked.</p>}
              </div>
            )}

            {task.kind === 'production' && task.action === 'say' && task.speechTarget && (
              <div className="mt-6 grid gap-4">
                <div className="grid gap-3 rounded-2xl border border-white/12 bg-black/14 p-4">
                  <p className="text-sm font-semibold leading-6 text-white/62">
                    One recorded response. The browser examiner scores the recognized German; your result stays hidden until the end.
                  </p>
                  <SpeakButton
                    expectedText={task.speechTarget}
                    matchFn={(expected, transcript) => matchesAnswer(transcript, expected)}
                    onResult={(transcript, _, matched) => finishItem(matched, transcript)}
                    size="lg"
                    label="Record your answer"
                  />
                  <button
                    type="button"
                    disabled={responseLocked}
                    onClick={() => finishItem(false, 'speech check unavailable')}
                    className="text-sm font-bold text-white/55 underline underline-offset-4 disabled:opacity-40"
                  >
                    Continue without microphone — counts as not passed
                  </button>
                </div>
                {responseLocked && <p className="text-sm font-bold text-[#f1d27a]">Response locked.</p>}
              </div>
            )}

            {task.kind === 'production' && !(task.action === 'say' && task.speechTarget) && (
              <div className="mt-6 grid gap-4">
                {task.action === 'write' && (
                  <textarea
                    value={written}
                    onChange={(event) => setWritten(event.target.value)}
                    disabled={modelShown || responseLocked}
                    rows={5}
                    placeholder="Write it here. The model stays hidden until you finish."
                    className="w-full rounded-2xl border-2 border-white/15 bg-black/20 p-4 text-base font-semibold leading-6 focus:outline-none focus:ring-2 focus:ring-[#f1d27a]/40"
                    data-testid="spine-checkpoint-textarea"
                  />
                )}

                {!modelShown ? (
                  <div data-testid="spine-checkpoint-reveal">
                    <PrimaryButton
                      onClick={() => {
                        if (task.action === 'say' && !task.speechTarget) setSpeechAttempted(true);
                        setModelShown(true);
                      }}
                      disabled={task.action === 'write' ? written.trim().length < 10 : !!task.speechTarget && !speechAttempted}
                    >
                      {task.action === 'say' ? 'Compare with the model' : 'I wrote it — compare'}
                    </PrimaryButton>
                    {task.action === 'say' && !task.speechTarget && (
                      <p className="mt-2 text-sm font-semibold text-white/55">Say it aloud before revealing the model.</p>
                    )}
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-[#3b82f6]/25 bg-[#3b82f6]/8 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9dc4ff]">Model answer</p>
                      <p className="mt-2 text-lg font-black leading-snug">{task.modelAnswer}</p>
                      {task.modelAudioUrl && (
                        <button type="button" onClick={() => playAudio(task.modelAudioUrl!).catch(() => {})} className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/12 px-3 py-1.5 text-xs font-bold text-[#9dc4ff]">
                          <Volume2 className="h-3.5 w-3.5" /> Hear the model
                        </button>
                      )}
                    </div>
                    <div className="rounded-2xl border border-white/12 bg-black/14 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-white/50">Examiner bar</p>
                      <ul className="mt-2 space-y-1.5 text-sm font-semibold text-white/75">{task.criteria.map((criterion) => <li key={criterion}>· {criterion}</li>)}</ul>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <button type="button" onClick={() => finishItem(true, written || 'spoken production', 'met')} className="rounded-2xl border border-[#3fbf75]/50 bg-[#3fbf75]/14 px-4 py-4 font-black text-[#bcf7d0]" data-testid="spine-checkpoint-rubric-clean">Met the bar</button>
                      <button type="button" onClick={() => finishItem(true, written || 'spoken production', 'shaky')} className="rounded-2xl border border-[#f1d27a]/40 bg-[#f1d27a]/10 px-4 py-4 font-black text-[#f1d27a]">Shaky but complete</button>
                      <button type="button" onClick={() => finishItem(false, written || 'spoken production', 'missed')} className="rounded-2xl border border-[#c0392b]/50 bg-[#c0392b]/12 px-4 py-4 font-black text-[#ffc9c2]" data-testid="spine-checkpoint-rubric-missed">Missed it</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {task.kind === 'auto' && (() => {
              const passed = evaluateAutoTask(task.source, mockResults);
              return (
                <div className="mt-6 grid gap-4">
                  <div className={`flex items-start gap-3 rounded-2xl border p-4 ${passed ? 'border-[#3fbf75]/40 bg-[#3fbf75]/10' : 'border-[#c0392b]/40 bg-[#c0392b]/10'}`}>
                    {passed ? <CheckCircle2 className="h-5 w-5 text-[#bcf7d0]" /> : <XCircle className="h-5 w-5 text-[#ffc9c2]" />}
                    <p className="font-black">{passed ? 'On record.' : 'Not on record yet.'}</p>
                  </div>
                  <PrimaryButton onClick={() => finishItem(passed, passed ? 'on record' : 'not on record')}>Next</PrimaryButton>
                </div>
              );
            })()}
          </section>
        </PremiumCard>
      </MissionShell>
    );
  }

  return (
    <MissionShell currentStep={0} steps={STEPS} railLabel={railLabel} tone="green">
      <PremiumCard>
        <section data-testid={`module-${checkpoint.moduleId}-scored-checkpoint`} aria-label={`Module ${checkpoint.moduleId} checkpoint result`}>
          <div className="rounded-[1.55rem] border border-white/12 bg-black/18 p-5" data-testid="spine-checkpoint-score">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-white/54">Scored result</p>
                <p className="mt-1 text-5xl font-black text-white">{score.percent}%</p>
                <p className="mt-1 text-sm font-bold text-white/58">{score.earnedPoints}/{score.totalPoints} points</p>
              </div>
              <span className={`rounded-full px-4 py-2 text-sm font-black ${score.state === 'PASS' ? 'bg-[#3fbf75]/16 text-[#bcf7d0]' : score.state === 'WEAK' ? 'bg-[#f1d27a]/14 text-[#f1d27a]' : 'bg-[#c0392b]/16 text-[#ffc9c2]'}`} data-testid="spine-checkpoint-result">{score.state}</span>
            </div>
            <p className="mt-4 text-xl font-black leading-snug">{score.label}</p>
            <div className="mt-5 grid gap-2">
              {checkpoint.sections.map((section) => {
                const sectionScore = score.sectionScores[section.id];
                if (!sectionScore) return null;
                return <div key={section.id} className="flex items-center justify-between rounded-2xl bg-white/[0.055] px-4 py-3"><span className="text-sm font-black text-white/78">{section.title.split(' — ')[0]}</span><span className="text-sm font-black text-[#f1d27a]">{sectionScore.earned}/{sectionScore.total}</span></div>;
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.82fr] lg:items-start">
            <div className="rounded-[1.45rem] border border-[#f1d27a]/18 bg-[#f1d27a]/8 p-5" data-testid="spine-checkpoint-recovery-cards">
              <p className="text-sm font-black text-[#f1d27a]">Recovery</p>
              {recoveryCards.length > 0 ? <div className="mt-3 grid gap-3">{recoveryCards.map((card) => (
                <article key={card.weaknessTag} className="rounded-2xl bg-black/18 p-4">
                  <h3 className="text-lg font-black">{card.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#bcf7d0]">{card.timeBoxMinutes}m · {card.output}</p>
                  <ol className="mt-3 space-y-1 text-sm font-semibold text-white/68">{card.mustDo.map((task) => <li key={task}>- {task}</li>)}</ol>
                  <p className="mt-3 text-sm font-semibold text-white/64">Retest: {card.retest}</p>
                  <Link href={card.libraryHref} className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#f1d27a]/30 bg-[#f1d27a]/10 px-3 py-1.5 text-sm font-black text-[#f1d27a]">{card.libraryLabel} <ArrowRight className="h-3.5 w-3.5" /></Link>
                </article>
              ))}</div> : <p className="mt-3 text-lg font-black">{isFinal ? 'Nothing failed. You are exam-ready.' : 'Nothing failed. Clean pass.'}</p>}
            </div>

            <div className="rounded-[1.45rem] border border-[#3fbf75]/25 bg-[#3fbf75]/12 p-5">
              <p className="text-sm font-black text-[#bcf7d0]">One next move</p>
              <p className="mt-2 text-2xl font-black leading-tight">{score.nextAction}</p>
              <div className="mt-5 grid gap-3">
                {score.state === 'FAIL' && recoveryCards[0] ? (
                  <Link href={recoveryCards[0].libraryHref} className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#f1d27a] px-6 py-4 text-center font-black text-[#162416]">Start recovery <ArrowRight className="h-5 w-5" /></Link>
                ) : score.state !== 'FAIL' ? (
                  <Link href={continueHref} className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#f1d27a] px-6 py-4 text-center font-black text-[#162416]">{continueLabel} <ArrowRight className="h-5 w-5" /></Link>
                ) : null}
                <SecondaryActionButton onClick={start}><span className="inline-flex items-center gap-2">Retake checkpoint <RotateCcw className="h-4 w-4" /></span></SecondaryActionButton>
              </div>
              <p className="sr-only" aria-live="polite">Checkpoint scored: {score.percent} percent, {score.state}.</p>
            </div>
          </div>
        </section>
      </PremiumCard>
    </MissionShell>
  );
}
