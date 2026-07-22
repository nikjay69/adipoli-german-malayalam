'use client';

// Owner/QA review page (not in nav). One click unlocks all gated content so
// you can navigate the whole app freely, plus a clickable index of every page.
import { useState } from 'react';
import Link from 'next/link';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';
import { SPINE_MODULES } from '@/lib/spine';
import { MOCK_GATES } from '@/lib/mocks';
import { module1MissionCards, writeCompletedModule1Mission } from '@/lib/missions/module1';
import { module2MissionCards } from '@/lib/missions/module2';
import { MODULE1_CHECKPOINT_RESULT_STORAGE_KEY } from '@/lib/missions/module1Checkpoint';
import { MODULE2_COMPLETED_MISSIONS_STORAGE_KEY } from '@/app/missions/module-2/_components/MissionUI';

const GAMES = ['greeting-time','speed-quiz','article-blitz','number-blitz','time-attack','food-order','room-builder','dialogue-dash','verb-rush','sentence-builder','fill-the-gap','story-builder','scene-sort','memory','hor-und-los','listen-act','sag-es','tipp-es','was-steht-da'];
const PRACTICE = ['chat','conversation','intro','pronunciation','review','shadowing','speak','write'];

export default function PreviewPage() {
  const { completeLesson, saveSpineCheckpointResult, saveMockResult, resetProgress } = useGameStore();
  const [msg, setMsg] = useState('');

  const unlockAll = () => {
    // every lesson complete
    ALL_MODULES.forEach((m) => m.lessons.forEach((l) => completeLesson(l.id, 100)));
    // every spine checkpoint passed (module 2-8)
    SPINE_MODULES.filter((m) => m.id >= 2).forEach((m) =>
      saveSpineCheckpointResult({ moduleId: m.id, percent: 90, state: 'PASS', failedTags: [], sectionPercents: { hoeren: 90, sprechen: 90, lesen: 90, schreiben: 90 }, savedAt: Date.now() }),
    );
    // every mock gate passed
    MOCK_GATES.forEach((g) =>
      saveMockResult({ gateId: g.id, testId: g.testId, percent: 85, band: 'ready', sectionPercents: { hoeren: 85, lesen: 85, schreiben: 85, sprechen: 85 }, savedAt: Date.now() }),
    );
    // module-1 checkpoint + missions
    try {
      localStorage.setItem(MODULE1_CHECKPOINT_RESULT_STORAGE_KEY, JSON.stringify({ passedItemIds: [], percent: 95, state: 'PASS', failedTags: [], savedAt: new Date().toISOString() }));
      module1MissionCards.forEach((c) => writeCompletedModule1Mission(c.id));
      localStorage.setItem(MODULE2_COMPLETED_MISSIONS_STORAGE_KEY, JSON.stringify(module2MissionCards.map((c) => c.id)));
    } catch { /* storage unavailable */ }
    setMsg('Everything unlocked. Open any page below — nothing is gated now.');
  };

  const reset = () => { resetProgress(); try { localStorage.removeItem(MODULE1_CHECKPOINT_RESULT_STORAGE_KEY); localStorage.removeItem(MODULE2_COMPLETED_MISSIONS_STORAGE_KEY); } catch {} setMsg('Reset to a brand-new learner (everything locked again).'); };

  const Section = ({ title, links }: { title: string; links: [string, string][] }) => (
    <div className="mb-6">
      <h2 className="mb-2 text-sm font-black uppercase tracking-[0.16em] text-[#d4a520]">{title}</h2>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="truncate rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/80 hover:border-[#d4a520]/40 hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );

  const lessonLinks: [string, string][] = ALL_MODULES.flatMap((m) => m.lessons.map((l) => [`M${m.id} · ${l.title}`, `/play/${m.id}/${l.id}`] as [string, string]));
  const m1Missions: [string, string][] = module1MissionCards.map((c) => [c.title, `${c.href}?start=listen`]);
  const m2Missions: [string, string][] = module2MissionCards.map((c) => [c.title, `${c.href}?start=listen`]);
  const checkpoints: [string, string][] = SPINE_MODULES.map((m) => [`M${m.id} checkpoint`, m.checkpointHref]);
  const mocks: [string, string][] = MOCK_GATES.map((g) => [g.title, `/tests/${g.testId}?gate=${g.id}`]);

  return (
    <div className="min-h-screen px-4 py-6 pb-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-black">Preview &amp; navigate</h1>
        <p className="mt-1 text-sm text-white/55">Owner/QA tool — see and open every page. Not shown in the app nav.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={unlockAll} className="rounded-xl bg-[#d4a520] px-4 py-2.5 text-sm font-black text-[#162416]">Unlock everything</button>
          <button onClick={reset} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-black text-white/80">Reset to new learner</button>
        </div>
        {msg && <p className="mt-2 text-xs font-semibold text-[#7ee2a8]">{msg}</p>}

        <div className="mt-6">
          <Section title="Start / chrome" links={[['Landing', '/landing'], ['Onboarding', '/onboarding'], ['Intro', '/intro'], ['Today (home)', '/learn'], ['Course path', '/course'], ['Practice hub', '/practice'], ['Profile / Me', '/profile'], ['Plan', '/plan'], ['Vocabulary', '/vocabulary'], ['On the go', '/on-the-go'], ['Tests hub', '/tests'], ['Pricing', '/pricing'], ['Admin', '/admin']]} />
          <Section title="Module 1 missions (Frau Fischer)" links={m1Missions} />
          <Section title="Module 2 missions (self-intro)" links={m2Missions} />
          <Section title="Checkpoints" links={checkpoints} />
          <Section title="Mock-exam gates" links={mocks} />
          <Section title="Practice" links={PRACTICE.map((s) => [s, `/practice/${s}`] as [string, string])} />
          <Section title="Games" links={GAMES.map((g) => [g, `/games/${g}`] as [string, string])} />
          <Section title={`Lessons (${lessonLinks.length})`} links={lessonLinks} />
        </div>
      </div>
    </div>
  );
}
