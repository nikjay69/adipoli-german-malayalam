'use client';

// Administered closed checkpoint (DECISIONS #13): the app presents and grades
// every item — no self-ticking, no "Mark all passed". choice/type tasks are
// auto-scored; production tasks force real output before the model answer and
// an honest rubric verdict; module 8's mock items read the store directly.

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, CheckCircle2, RotateCcw, Volume2, XCircle } from 'lucide-react';
import { playAudio } from '@/lib/audio';
import { matchesAnswer, primaryAnswer } from '@/lib/answer-match';
import {
  MissionShell,
  PremiumCard,
  PrimaryButton,
  SecondaryActionButton,
} from '@/app/missions/module-2/_components/MissionUI';
import { useGameStore } from '@/lib/store';
import {
  evaluateAutoTask,
  findRecoveryCards,
  getSpineCheckpoint,
  scoreSpineCheckpoint,
  toSpineCheckpointResult,
  type CheckpointItem,
} from '@/lib/spine-checkpoints';
import { SPINE_MODULES } from '@/lib/spine';

const steps = ['Closed checkpoint'];

// Spine-module checkpoint header backdrops (pre-generated hub scenes).
const CHECKPOINT_SCENE_DEFAULT = '/images/scenes/hub-exam-hall.jpg';
const CHECKPOINT_SCENES: Record<number, string> = {
  2: '/images/scenes/hub-goethe-kochi-classroom.jpg',
  3: '/images/scenes/hub-thrissur-home.jpg',
  4: '/images/scenes/hub-supermarket.jpg',
  5: '/images/scenes/hub-praxis.jpg',
  6: '/images/scenes/hub-study-desk.jpg',
  7: '/images/scenes/hub-amt-office.jpg',
  8: '/images/scenes/hub-exam-hall.jpg',
};

const MAX_AUDIO_PLAYS = 2; // Goethe Hören plays everything twice — so do we.

type RunItem = { item: CheckpointItem; sectionTitle: string };
type Phase = 'intro' | 'run' | 'result';

/** Deterministic option shuffle so the correct answer isn't always first. */
function shuffled<T>(arr: readonly T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function AudioButton({ url, playsLeft, onPlay }: { url: string; playsLeft: number; onPlay: () => void }) {
  return (
    <button
      type="button"
      disabled={playsLeft <= 0}
      onClick={() => { onPlay(); playAudio(url).catch(() => {}); }}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-black transition ${
        playsLeft > 0
          ? 'border-[#3b82f6]/40 bg-[#3b82f6]/12 text-[#9dc4ff] hover:bg-[#3b82f6]/20'
          : 'border-white/10 bg-white/5 text-white/30'
      }`}
    >
      <Volume2 className="h-4 w-4" /> {playsLeft > 0 ? `Play audio (${playsLeft} left)` : 'No plays left'}
    </button>
  );
}

export default function SpineCheckpointPage() {
  const params = useParams<{ moduleId: string }>();
  const moduleId = Number(params.moduleId);
  const checkpoint = getSpineCheckpoint(moduleId);
  const spineModule = SPINE_MODULES.find((m) => m.id === moduleId);
  const checkpointSceneImage = CHECKPOINT_SCENES[moduleId] ?? CHECKPOINT_SCENE_DEFAULT;
  const saveSpineCheckpointResult = useGameStore((s) => s.saveSpineCheckpointResult);
  const mockResults = useGameStore((s) => s.userProgress.mockResults) || {};

  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [passedItemIds, setPassedItemIds] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  // Per-item transient state
  const [typed, setTyped] = useState('');
  const [written, setWritten] = useState('');
  const [choice, setChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [modelShown, setModelShown] = useState(false);
  const [playsUsed, setPlaysUsed] = useState(0);

  const runItems: RunItem[] = useMemo(() => {
    if (!checkpoint) return [];
    return checkpoint.sections.flatMap((section) =>
      section.items.map((item) => ({ item, sectionTitle: section.title }))
    );
  }, [checkpoint]);

  const score = useMemo(
    () => (checkpoint ? scoreSpineCheckpoint(checkpoint, passedItemIds) : null),
    [checkpoint, passedItemIds]
  );

  // Persist the scored result the moment the runner finishes (no manual save step).
  useEffect(() => {
    if (phase === 'result' && checkpoint && score && !saved) {
      saveSpineCheckpointResult(toSpineCheckpointResult(checkpoint, score));
      setSaved(true);
    }
  }, [phase, checkpoint, score, saved, saveSpineCheckpointResult]);

  if (!checkpoint || !spineModule || !score) {
    return (
      <div className="min-h-screen px-4 py-16 text-center">
        <h1 className="text-2xl font-black">No checkpoint here.</h1>
        <p className="mt-2 text-sm font-semibold text-white/60">
          {moduleId === 1 ? 'Module 1 has its own checkpoint.' : 'This module does not exist.'}
        </p>
        <Link
          href={moduleId === 1 ? '/missions/module-1/checkpoint' : '/course'}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#e94560] px-5 py-3 font-black text-white"
        >
          {moduleId === 1 ? 'Open Module 1 checkpoint' : 'Back to course'} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const isFinal = checkpoint.moduleId === 8;
  const current = runItems[index];

  const resetItemState = () => {
    setTyped('');
    setWritten('');
    setChoice(null);
    setFeedback(null);
    setModelShown(false);
    setPlaysUsed(0);
  };

  const finishItem = (passed: boolean) => {
    const id = current.item.id;
    setPassedItemIds((prev) => (passed && !prev.includes(id) ? [...prev, id] : prev));
    const isLast = index >= runItems.length - 1;
    window.setTimeout(() => {
      resetItemState();
      if (isLast) {
        setPhase('result');
      } else {
        setIndex((i) => i + 1);
      }
    }, passed ? 900 : 1700);
  };

  const start = () => {
    setPassedItemIds([]);
    setIndex(0);
    setSaved(false);
    resetItemState();
    setPhase('run');
  };

  const recoveryCards = findRecoveryCards(checkpoint, score.failedTags);

  // ── Intro ──────────────────────────────────────────────────────
  if (phase === 'intro') {
    const totalItems = runItems.length;
    return (
      <MissionShell currentStep={0} steps={steps} railLabel={`Module ${checkpoint.moduleId} · Closed checkpoint`} tone="green">
        <PremiumCard>
          <section data-testid={`module-${checkpoint.moduleId}-scored-checkpoint`} aria-label={`Module ${checkpoint.moduleId} scored checkpoint`}>
            <div className="relative mb-6 h-32 overflow-hidden rounded-[1.45rem] sm:h-40">
              <img src={checkpointSceneImage} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0d] via-[#0d1a0d]/40 to-transparent" />
            </div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d27a]">Closed check</p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">{checkpoint.title}.</h1>
            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-white/64">
              {totalItems} tasks, one at a time. The app scores you — closed book: no Google, no notes, no dictionary. Audio plays {MAX_AUDIO_PLAYS}× max, like the real exam.
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

  // ── Runner ─────────────────────────────────────────────────────
  if (phase === 'run' && current) {
    const { item, sectionTitle } = current;
    const task = item.task;
    const options = task.kind === 'choice' ? shuffled(task.options, item.id.length * 7 + index * 13 + 5) : [];

    return (
      <MissionShell currentStep={0} steps={steps} railLabel={`Module ${checkpoint.moduleId} · Closed checkpoint`} tone="green">
        <PremiumCard>
          <section data-testid="spine-checkpoint-runner" aria-label={`Checkpoint task ${index + 1} of ${runItems.length}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f1d27a]">{sectionTitle}</p>
              <p className="rounded-full border border-white/10 bg-black/16 px-3 py-1 text-xs font-black text-white/60">
                {index + 1} / {runItems.length}
              </p>
            </div>
            <div className="mt-3 flex gap-1" aria-hidden="true">
              {runItems.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i < index ? 'bg-[#3fbf75]' : i === index ? 'bg-[#f1d27a]' : 'bg-white/10'}`} />
              ))}
            </div>

            <h2 className="mt-6 text-2xl font-black leading-snug sm:text-3xl">{task.question}</h2>
            {item.requiredForPass && (
              <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[#ffc9c2]">Required to pass</p>
            )}

            {/* choice */}
            {task.kind === 'choice' && (
              <div className="mt-6 grid gap-3">
                {task.audioUrl && (
                  <div className="mb-1"><AudioButton url={task.audioUrl} playsLeft={MAX_AUDIO_PLAYS - playsUsed} onPlay={() => setPlaysUsed((n) => n + 1)} /></div>
                )}
                {options.map((opt) => {
                  const picked = choice === opt;
                  const isCorrect = opt === task.correctAnswer;
                  const show = feedback !== null;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={feedback !== null}
                      onClick={() => {
                        setChoice(opt);
                        const ok = opt === task.correctAnswer;
                        setFeedback(ok ? 'correct' : 'wrong');
                        finishItem(ok);
                      }}
                      className={`rounded-2xl border p-4 text-left text-base font-bold transition active:scale-[0.99] ${
                        show && isCorrect
                          ? 'border-[#3fbf75]/60 bg-[#3fbf75]/16 text-white'
                          : show && picked
                            ? 'border-[#c0392b]/60 bg-[#c0392b]/14 text-white'
                            : 'border-white/12 bg-black/14 text-white/85 hover:border-white/28 hover:bg-white/[0.07]'
                      }`}
                      data-testid="spine-checkpoint-option"
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* type */}
            {task.kind === 'type' && (
              <div className="mt-6 grid gap-3">
                {task.audioUrl && (
                  <div><AudioButton url={task.audioUrl} playsLeft={MAX_AUDIO_PLAYS - playsUsed} onPlay={() => setPlaysUsed((n) => n + 1)} /></div>
                )}
                <div className="flex items-stretch gap-2">
                  <input
                    type="text"
                    value={typed}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    disabled={feedback !== null}
                    placeholder={task.placeholder ?? 'Type your answer…'}
                    onChange={(e) => setTyped(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && typed.trim() && feedback === null) {
                        const ok = matchesAnswer(typed, task.accepted);
                        setFeedback(ok ? 'correct' : 'wrong');
                        finishItem(ok);
                      }
                    }}
                    className={`min-h-14 flex-1 rounded-2xl border-2 bg-black/20 px-4 text-base font-bold focus:outline-none focus:ring-2 ${
                      feedback === 'correct'
                        ? 'border-[#3fbf75] focus:ring-[#3fbf75]/40'
                        : feedback === 'wrong'
                          ? 'border-[#c0392b] focus:ring-[#c0392b]/40'
                          : 'border-white/15 focus:ring-[#f1d27a]/40'
                    }`}
                    data-testid="spine-checkpoint-input"
                  />
                  <button
                    type="button"
                    disabled={!typed.trim() || feedback !== null}
                    onClick={() => {
                      const ok = matchesAnswer(typed, task.accepted);
                      setFeedback(ok ? 'correct' : 'wrong');
                      finishItem(ok);
                    }}
                    className="rounded-2xl bg-[#f1d27a] px-5 font-black text-[#162416] transition hover:bg-[#ffe394] disabled:opacity-40"
                  >
                    Check
                  </button>
                </div>
                {feedback === 'wrong' && (
                  <p className="text-sm font-bold text-[#ffc9c2]">Answer: {primaryAnswer(task.accepted)}</p>
                )}
                {feedback === 'correct' && <p className="text-sm font-bold text-[#bcf7d0]">Richtig!</p>}
              </div>
            )}

            {/* production (say / write) */}
            {task.kind === 'production' && (
              <div className="mt-6 grid gap-4">
                {task.action === 'write' && (
                  <textarea
                    value={written}
                    onChange={(e) => setWritten(e.target.value)}
                    disabled={modelShown}
                    rows={5}
                    placeholder="Write it here — really write it. The model appears afterwards."
                    className="w-full rounded-2xl border-2 border-white/15 bg-black/20 p-4 text-base font-semibold leading-6 focus:outline-none focus:ring-2 focus:ring-[#f1d27a]/40"
                    data-testid="spine-checkpoint-textarea"
                  />
                )}
                {!modelShown ? (
                  <div className="grid gap-2">
                    {task.action === 'say' && (
                      <p className="text-sm font-semibold leading-6 text-white/60">
                        Say it aloud — actually aloud. The model answer appears after, not before.
                      </p>
                    )}
                    <div data-testid="spine-checkpoint-reveal">
                      <PrimaryButton
                        onClick={() => setModelShown(true)}
                        disabled={task.action === 'write' && written.trim().length < 10}
                      >
                        {task.action === 'say' ? 'I said it — show the model' : 'I wrote it — show the model'}
                      </PrimaryButton>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-[#3b82f6]/25 bg-[#3b82f6]/8 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9dc4ff]">Model answer</p>
                      <p className="mt-2 text-lg font-black leading-snug">{task.modelAnswer}</p>
                      {task.modelAudioUrl && (
                        <button
                          type="button"
                          onClick={() => playAudio(task.modelAudioUrl!).catch(() => {})}
                          className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/12 px-3 py-1.5 text-xs font-bold text-[#9dc4ff] hover:bg-[#3b82f6]/20"
                        >
                          <Volume2 className="h-3.5 w-3.5" /> Hear the model
                        </button>
                      )}
                    </div>
                    <div className="rounded-2xl border border-white/12 bg-black/14 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-white/50">The bar</p>
                      <ul className="mt-2 space-y-1.5 text-sm font-semibold text-white/75">
                        {task.criteria.map((c) => <li key={c}>· {c}</li>)}
                      </ul>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <button type="button" onClick={() => finishItem(true)} className="rounded-2xl border border-[#3fbf75]/50 bg-[#3fbf75]/14 px-4 py-4 font-black text-[#bcf7d0] transition hover:bg-[#3fbf75]/22" data-testid="spine-checkpoint-rubric-clean">
                        Met the bar
                      </button>
                      <button type="button" onClick={() => finishItem(true)} className="rounded-2xl border border-[#f1d27a]/40 bg-[#f1d27a]/10 px-4 py-4 font-black text-[#f1d27a] transition hover:bg-[#f1d27a]/18">
                        Shaky but complete
                      </button>
                      <button type="button" onClick={() => finishItem(false)} className="rounded-2xl border border-[#c0392b]/50 bg-[#c0392b]/12 px-4 py-4 font-black text-[#ffc9c2] transition hover:bg-[#c0392b]/20" data-testid="spine-checkpoint-rubric-missed">
                        Missed it
                      </button>
                    </div>
                    <p className="text-xs font-semibold text-white/40">Score it like the examiner would — a soft score here becomes a hard fail in Goethe.</p>
                  </div>
                )}
              </div>
            )}

            {/* auto */}
            {task.kind === 'auto' && (() => {
              const ok = evaluateAutoTask(task.source, mockResults);
              return (
                <div className="mt-6 grid gap-4">
                  <div className={`flex items-start gap-3 rounded-2xl border p-4 ${ok ? 'border-[#3fbf75]/40 bg-[#3fbf75]/10' : 'border-[#c0392b]/40 bg-[#c0392b]/10'}`}>
                    {ok ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#bcf7d0]" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#ffc9c2]" />}
                    <div>
                      <p className="font-black">{ok ? 'On record.' : 'Not on record yet.'}</p>
                      <p className="mt-1 text-sm font-semibold text-white/65">
                        {ok
                          ? 'Your saved results already prove this one.'
                          : task.source === 'simulator-2-days'
                            ? 'Fewer than two simulator days on record — Practice → Speaking Simulator is where this gets earned.'
                            : 'No qualifying timed mock in your results — the mock tests page is where this gets earned.'}
                      </p>
                    </div>
                  </div>
                  <PrimaryButton onClick={() => finishItem(ok)}>Next</PrimaryButton>
                </div>
              );
            })()}
          </section>
        </PremiumCard>
      </MissionShell>
    );
  }

  // ── Result (auto-saved by the effect above) ────────────────────
  return (
    <MissionShell currentStep={0} steps={steps} railLabel={`Module ${checkpoint.moduleId} · Closed checkpoint`} tone="green">
      <PremiumCard>
        <section data-testid={`module-${checkpoint.moduleId}-scored-checkpoint`} aria-label={`Module ${checkpoint.moduleId} checkpoint result`}>
          <div className="rounded-[1.55rem] border border-white/12 bg-black/18 p-5" data-testid="spine-checkpoint-score">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-white/54">Scored result</p>
                <p className="mt-1 text-5xl font-black text-white">{score.percent}%</p>
                <p className="mt-1 text-sm font-bold text-white/58">{score.earnedPoints}/{score.totalPoints} points</p>
              </div>
              <span className={`rounded-full px-4 py-2 text-sm font-black ${
                score.state === 'PASS'
                  ? 'bg-[#3fbf75]/16 text-[#bcf7d0]'
                  : score.state === 'WEAK'
                    ? 'bg-[#f1d27a]/14 text-[#f1d27a]'
                    : 'bg-[#c0392b]/16 text-[#ffc9c2]'
              }`} data-testid="spine-checkpoint-result">
                {score.state}
              </span>
            </div>
            <p className="mt-4 text-xl font-black leading-snug">{score.label}</p>

            <div className="mt-5 grid gap-2">
              {checkpoint.sections.map((section) => {
                const sectionScore = score.sectionScores[section.id];
                if (!sectionScore) return null;
                return (
                  <div key={section.id} className="flex items-center justify-between rounded-2xl bg-white/[0.055] px-4 py-3">
                    <span className="text-sm font-black text-white/78">{section.title.split(' — ')[0]}</span>
                    <span className="text-sm font-black text-[#f1d27a]">{sectionScore.earned}/{sectionScore.total}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.82fr] lg:items-start">
            <div className="rounded-[1.45rem] border border-[#f1d27a]/18 bg-[#f1d27a]/8 p-5" data-testid="spine-checkpoint-recovery-cards">
              <p className="text-sm font-black text-[#f1d27a]">Recovery</p>
              {recoveryCards.length > 0 ? (
                <div className="mt-3 grid gap-3">
                  {recoveryCards.map((card) => (
                    <article key={card.weaknessTag} className="rounded-2xl bg-black/18 p-4">
                      <h3 className="text-lg font-black">{card.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-[#bcf7d0]">{card.timeBoxMinutes}m · {card.output}</p>
                      <ol className="mt-3 space-y-1 text-sm font-semibold text-white/68">
                        {card.mustDo.map((task) => <li key={task}>- {task}</li>)}
                      </ol>
                      <p className="mt-3 text-sm font-semibold text-white/64">Retest: {card.retest}</p>
                      <Link
                        href={card.libraryHref}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#f1d27a]/30 bg-[#f1d27a]/10 px-3 py-1.5 text-sm font-black text-[#f1d27a] transition hover:bg-[#f1d27a]/20"
                      >
                        {card.libraryLabel} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-lg font-black">
                  {isFinal ? 'Nothing failed. You are exam-ready — book it.' : 'Nothing failed. Clean pass.'}
                </p>
              )}
            </div>

            <div className="rounded-[1.45rem] border border-[#3fbf75]/25 bg-[#3fbf75]/12 p-5">
              <p className="text-sm font-black text-[#bcf7d0]">One next move</p>
              <p className="mt-2 text-2xl font-black leading-tight">{score.nextAction}</p>
              <div className="mt-5 grid gap-3">
                {score.state === 'FAIL' ? (
                  recoveryCards[0] ? (
                    <Link
                      href={recoveryCards[0].libraryHref}
                      className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#f1d27a] px-6 py-4 text-center font-black text-[#162416] transition hover:bg-[#ffe394]"
                    >
                      Start recovery <ArrowRight className="h-5 w-5" />
                    </Link>
                  ) : null
                ) : (
                  <Link
                    href={isFinal ? '/tests' : '/learn'}
                    className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#f1d27a] px-6 py-4 text-center font-black text-[#162416] transition hover:bg-[#ffe394]"
                  >
                    {isFinal ? 'Run another timed mock' : 'Continue the course'} <ArrowRight className="h-5 w-5" />
                  </Link>
                )}
                <SecondaryActionButton onClick={start}>
                  <span className="inline-flex items-center gap-2">Retake the checkpoint <RotateCcw className="h-4 w-4" /></span>
                </SecondaryActionButton>
              </div>
              <p className="sr-only" aria-live="polite">Checkpoint scored: {score.percent} percent, {score.state}.</p>
            </div>
          </div>
        </section>
      </PremiumCard>
    </MissionShell>
  );
}
