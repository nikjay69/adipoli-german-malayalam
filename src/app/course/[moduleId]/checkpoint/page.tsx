'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import {
  MissionShell,
  PremiumCard,
  PrimaryButton,
  SecondaryActionButton,
} from '@/app/missions/module-2/_components/MissionUI';
import { useGameStore } from '@/lib/store';
import {
  getSpineCheckpoint,
  scoreSpineCheckpoint,
  toSpineCheckpointResult,
  findRecoveryCards,
  type CheckpointItem,
} from '@/lib/spine-checkpoints';
import { SPINE_MODULES } from '@/lib/spine';

const steps = ['Closed checkpoint'];

function itemModeLabel(item: CheckpointItem) {
  if (item.mode === 'listen') return 'Hear';
  if (item.mode === 'speak') return 'Say';
  if (item.mode === 'match') return 'Read';
  if (item.mode === 'write') return 'Write';
  if (item.mode === 'do') return 'Do';
  return 'Choose';
}

export default function SpineCheckpointPage() {
  const params = useParams<{ moduleId: string }>();
  const moduleId = Number(params.moduleId);
  const checkpoint = getSpineCheckpoint(moduleId);
  const spineModule = SPINE_MODULES.find((m) => m.id === moduleId);
  const saveSpineCheckpointResult = useGameStore((s) => s.saveSpineCheckpointResult);

  const [passedItemIds, setPassedItemIds] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const score = useMemo(
    () => (checkpoint ? scoreSpineCheckpoint(checkpoint, passedItemIds) : null),
    [checkpoint, passedItemIds]
  );

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

  const recoveryCards = findRecoveryCards(checkpoint, score.failedTags);
  const isFinal = checkpoint.moduleId === 8;

  const toggleItem = (itemId: string) => {
    setSaved(false);
    setPassedItemIds((current) => (
      current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId]
    ));
  };

  const markAll = () => {
    setSaved(false);
    setPassedItemIds(checkpoint.sections.flatMap((section) => section.items.map((item) => item.id)));
  };

  const reset = () => {
    setSaved(false);
    setPassedItemIds([]);
  };

  const save = () => {
    saveSpineCheckpointResult(toSpineCheckpointResult(checkpoint, score));
    setSaved(true);
  };

  return (
    <MissionShell currentStep={0} steps={steps} railLabel={`Module ${checkpoint.moduleId} · Closed checkpoint`} tone="green">
      <PremiumCard>
        <section data-testid={`module-${checkpoint.moduleId}-scored-checkpoint`} aria-label={`Module ${checkpoint.moduleId} scored checkpoint`}>
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d27a]">Closed check</p>
              <h1 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">
                {checkpoint.title}.
              </h1>
              <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-white/64">
                No Google, no YouTube, no ChatGPT, no dictionary, no notes. Mark only what you can do now.
              </p>
              <div className="mt-5 rounded-[1.35rem] border border-[#f1d27a]/18 bg-[#f1d27a]/8 p-4">
                <p className="text-sm font-black text-[#f1d27a]">Pass rule</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/70">{checkpoint.passRule}</p>
              </div>
            </div>

            <div className="rounded-[1.55rem] border border-white/12 bg-black/18 p-5" data-testid="spine-checkpoint-score">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-white/54">Score</p>
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
              <p className="mt-2 text-sm font-semibold leading-6 text-white/64">Next: {score.nextAction}</p>

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

              <div className="mt-5 flex flex-wrap gap-2">
                <SecondaryActionButton onClick={markAll}>Mark all passed</SecondaryActionButton>
                <SecondaryActionButton onClick={reset}>Reset</SecondaryActionButton>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-4" data-testid="spine-checkpoint-items">
            {checkpoint.sections.map((section) => (
              <section key={section.id} className="rounded-[1.45rem] border border-white/10 bg-white/[0.045] p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-black leading-tight">{section.title}</h2>
                    <p className="mt-1 text-sm font-semibold text-white/58">{section.instruction}</p>
                  </div>
                  <p className="rounded-full border border-white/10 bg-black/16 px-3 py-1 text-sm font-black text-white/60">
                    {score.sectionScores[section.id]?.earned ?? 0}/{score.sectionScores[section.id]?.total ?? 0}
                  </p>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  {section.items.map((item) => {
                    const passed = passedItemIds.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className={`min-h-28 rounded-2xl border p-4 text-left transition active:scale-[0.99] ${
                          passed
                            ? 'border-[#3fbf75]/40 bg-[#3fbf75]/13 text-white'
                            : 'border-white/10 bg-black/12 text-white/82 hover:border-white/24 hover:bg-white/[0.07]'
                        }`}
                        data-testid="spine-checkpoint-item"
                        data-item-id={item.id}
                        data-passed={passed ? 'true' : 'false'}
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white/54">
                            {itemModeLabel(item)} · {item.points}p{item.requiredForPass ? ' · required' : ''}
                          </span>
                          {passed && <CheckCircle2 className="h-5 w-5 shrink-0 text-[#bcf7d0]" aria-hidden="true" />}
                        </span>
                        <span className="mt-3 block text-base font-black leading-snug">{item.prompt}</span>
                        <span className="mt-2 block text-sm font-semibold leading-5 text-[#bcf7d0]">Expected: {item.expected}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_0.82fr] lg:items-start">
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
                  {isFinal ? 'No weak spot selected. If all is honest, you are exam-ready.' : 'No weak spot selected yet. If all is clean, save and continue.'}
                </p>
              )}
            </div>

            <div className="rounded-[1.45rem] border border-[#3fbf75]/25 bg-[#3fbf75]/12 p-5">
              <p className="text-sm font-black text-[#bcf7d0]">One next move</p>
              <p className="mt-2 text-2xl font-black leading-tight">{score.nextAction}</p>
              <div className="mt-5 grid gap-3">
                <PrimaryButton onClick={save}>{saved ? 'Saved' : 'Save score'}</PrimaryButton>
                {score.state === 'FAIL' ? (
                  recoveryCards[0] ? (
                    <Link
                      href={recoveryCards[0].libraryHref}
                      className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 py-4 text-center font-black text-white/80 transition hover:bg-white/10"
                    >
                      Start recovery <RotateCcw className="h-5 w-5" />
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
              </div>
              <p className="sr-only" aria-live="polite">{saved ? 'Checkpoint score saved.' : score.label}</p>
            </div>
          </div>
        </section>
      </PremiumCard>
    </MissionShell>
  );
}
