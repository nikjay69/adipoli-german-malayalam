'use client';

// Speaking Simulator v1 (Phase 3R Sprint 5, roadmap fix #5 / TECH_ARCHITECTURE build #4):
// all 3 Goethe Sprechen Teile — examiner prompt → the learner answers ALOUD →
// model answer with pre-rendered native audio → honest rubric verdict.
// Runs are persisted so module 8's readiness check can count real completions.

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Mic, RotateCcw, Volume2 } from 'lucide-react';
import { playAudio } from '@/lib/audio';
import { GOETHE_TESTS } from '@/lib/content/goethe-tests';
import { writeSimulatorRun, type SimulatorVerdict as Verdict } from '@/lib/simulator-runs';

type SimCard = {
  teil: 1 | 2 | 3;
  prompt: string;
  task: string;
  modelText: string;
  modelAudios: { src: string; label: string }[];
};

function buildCards(testId: string): SimCard[] {
  const test = GOETHE_TESTS.find((t) => t.id === testId) ?? GOETHE_TESTS[0];
  const cards: SimCard[] = [];
  test.sprechen.teil1.forEach((item, i) => {
    cards.push({
      teil: 1,
      prompt: `Teil 1 · Stichwort: „${item.topic}“`,
      task: 'The examiner points at the keyword. Say your line about it aloud — a full sentence, no notes.',
      modelText: item.sample_answer,
      modelAudios: [{ src: `/audio/sprechen/${test.id}-t1-${i}.mp3`, label: 'Model answer' }],
    });
  });
  test.sprechen.teil2.forEach((item, i) => {
    cards.push({
      teil: 2,
      prompt: `Teil 2 · Wortkarte: „${item.word_card}“`,
      task: 'Two jobs, both aloud: ASK a question with this word, then ANSWER it yourself — like the real card exchange.',
      modelText: `${item.sample_question} — ${item.sample_answer}`,
      modelAudios: [
        { src: `/audio/sprechen/${test.id}-t2-${i}-q.mp3`, label: 'Model question' },
        { src: `/audio/sprechen/${test.id}-t2-${i}-a.mp3`, label: 'Model answer' },
      ],
    });
  });
  test.sprechen.teil3.forEach((item, i) => {
    cards.push({
      teil: 3,
      prompt: `Teil 3 · Situation: ${item.situation}`,
      task: 'Make the polite request aloud — Können Sie… / Ich hätte gern… — complete and clearly.',
      modelText: item.sample_request,
      modelAudios: [{ src: `/audio/sprechen/${test.id}-t3-${i}.mp3`, label: 'Model request' }],
    });
  });
  return cards;
}

const TEIL_LABELS: Record<number, string> = {
  1: 'Teil 1 — Sich vorstellen',
  2: 'Teil 2 — Fragen stellen und beantworten',
  3: 'Teil 3 — Bitten formulieren',
};

export default function SpeakingSimulatorPage() {
  const [testId, setTestId] = useState(GOETHE_TESTS[0].id);
  const [phase, setPhase] = useState<'intro' | 'run' | 'result'>('intro');
  const [index, setIndex] = useState(0);
  const [modelShown, setModelShown] = useState(false);
  const [verdicts, setVerdicts] = useState<Verdict[]>([]);
  const [saved, setSaved] = useState(false);

  const cards = useMemo(() => buildCards(testId), [testId]);
  const current = cards[index];

  const start = () => {
    setIndex(0);
    setVerdicts([]);
    setModelShown(false);
    setSaved(false);
    setPhase('run');
  };

  const giveVerdict = (v: Verdict) => {
    const next = [...verdicts, v];
    setVerdicts(next);
    setModelShown(false);
    if (index >= cards.length - 1) {
      const passed = next.every((x) => x !== 'missed');
      if (!saved) {
        writeSimulatorRun({ testId, date: Date.now(), verdicts: next, passed });
        setSaved(true);
      }
      setPhase('result');
    } else {
      setIndex((i) => i + 1);
    }
  };

  const teilStats = (teil: 1 | 2 | 3) => {
    const idxs = cards.map((c, i) => (c.teil === teil ? i : -1)).filter((i) => i >= 0);
    const ok = idxs.filter((i) => verdicts[i] && verdicts[i] !== 'missed').length;
    return `${ok}/${idxs.length}`;
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-32 text-white md:px-8">
      <div className="mx-auto max-w-md md:max-w-2xl">
        <Link href="/practice" className="ag-touch-target inline-flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white/80">
          <ArrowLeft className="h-4 w-4" /> Practice
        </Link>

        {phase === 'intro' && (
          <section className="mt-4" data-testid="simulator-intro">
            <div className="relative mb-5 h-32 overflow-hidden rounded-[1.45rem] sm:h-40">
              <img src="/images/scenes/hub-exam-hall.jpg" alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0d] via-[#0d1a0d]/40 to-transparent" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f1d27a]">Sprechen simulator</p>
            <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight">The examiner is waiting.</h1>
            <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-white/65">
              All three Sprechen Teile, card by card, exactly like exam day: the prompt appears, you answer ALOUD,
              then the native-audio model answer plays and you score yourself like the examiner would.
              {' '}{cards.length} cards, ~10 minutes, closed book.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {GOETHE_TESTS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTestId(t.id)}
                  className={`ag-touch-target rounded-full border px-3 py-1.5 text-xs font-black transition ${
                    t.id === testId ? 'border-[#f1d27a] bg-[#f1d27a]/15 text-[#f1d27a]' : 'border-white/12 text-white/55 hover:bg-white/8'
                  }`}
                >
                  Set {i + 1}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={start}
              data-testid="simulator-start"
              className="mt-6 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#e94560] px-6 py-4 text-base font-black text-white shadow-lg shadow-[#e94560]/25 transition hover:bg-[#ff5a72]"
            >
              <Mic className="h-5 w-5" /> Start the simulation
            </button>
          </section>
        )}

        {phase === 'run' && current && (
          <section className="mt-4" data-testid="simulator-card">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#f1d27a]">{TEIL_LABELS[current.teil]}</p>
              <p className="rounded-full border border-white/10 bg-black/16 px-3 py-1 text-xs font-black text-white/60">{index + 1} / {cards.length}</p>
            </div>
            <div className="mt-3 flex gap-1" aria-hidden="true">
              {cards.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i < index ? 'bg-[#3fbf75]' : i === index ? 'bg-[#f1d27a]' : 'bg-white/10'}`} />
              ))}
            </div>

            <h2 className="mt-6 text-3xl font-black leading-snug">{current.prompt}</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-white/65">{current.task}</p>

            {!modelShown ? (
              <button
                type="button"
                onClick={() => setModelShown(true)}
                data-testid="simulator-reveal"
                className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#f1d27a] px-6 py-4 font-black text-[#162416] transition hover:bg-[#ffe394] sm:w-auto"
              >
                I answered aloud — show the model <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-[#3b82f6]/25 bg-[#3b82f6]/8 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9dc4ff]">Model</p>
                  <p className="mt-2 text-xl font-black leading-snug">{current.modelText}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {current.modelAudios.map((a) => (
                      <button
                        key={a.src}
                        type="button"
                        onClick={() => playAudio(a.src).catch(() => {})}
                        className="inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/12 px-3 py-1.5 text-xs font-bold text-[#9dc4ff] hover:bg-[#3b82f6]/20"
                      >
                        <Volume2 className="h-3.5 w-3.5" /> {a.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <button type="button" onClick={() => giveVerdict('clean')} data-testid="simulator-verdict-clean" className="rounded-2xl border border-[#3fbf75]/50 bg-[#3fbf75]/14 px-4 py-4 font-black text-[#bcf7d0] transition hover:bg-[#3fbf75]/22">
                    Said it cleanly
                  </button>
                  <button type="button" onClick={() => giveVerdict('shaky')} className="rounded-2xl border border-[#f1d27a]/40 bg-[#f1d27a]/10 px-4 py-4 font-black text-[#f1d27a] transition hover:bg-[#f1d27a]/18">
                    Shaky but complete
                  </button>
                  <button type="button" onClick={() => giveVerdict('missed')} data-testid="simulator-verdict-missed" className="rounded-2xl border border-[#c0392b]/50 bg-[#c0392b]/12 px-4 py-4 font-black text-[#ffc9c2] transition hover:bg-[#c0392b]/20">
                    Couldn&apos;t say it
                  </button>
                </div>
                <p className="text-xs font-semibold text-white/40">Examiner honesty: a soft score here becomes a hard fail in the real Sprechen.</p>
              </div>
            )}
          </section>
        )}

        {phase === 'result' && (
          <section className="mt-4" data-testid="simulator-result">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f1d27a]">Simulation complete</p>
            <h1 className="mt-2 text-4xl font-black leading-tight">
              {verdicts.every((v) => v !== 'missed') ? 'You spoke through all three Teile.' : 'You found your weak Teil — that’s the point.'}
            </h1>
            <div className="mt-5 grid gap-2">
              {([1, 2, 3] as const).map((teil) => (
                <div key={teil} className="flex items-center justify-between rounded-2xl bg-white/[0.055] px-4 py-3">
                  <span className="text-sm font-black text-white/78">{TEIL_LABELS[teil]}</span>
                  <span className="text-sm font-black text-[#f1d27a]">{teilStats(teil)}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-white/60">
              Run it again on a different day with a different set — the module 8 readiness bar wants the simulator done twice,
              and the second run is where the freezes disappear.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setPhase('intro')}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#f1d27a] px-6 py-4 font-black text-[#162416] transition hover:bg-[#ffe394]"
              >
                Another set <RotateCcw className="h-5 w-5" />
              </button>
              <Link
                href="/learn"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 py-4 font-black text-white/80 transition hover:bg-white/10"
              >
                Back to Today <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
