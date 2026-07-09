'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Headphones, Mic, PenLine, RotateCcw, ShieldCheck, Sparkles, Trophy } from 'lucide-react';
import { clsx } from 'clsx';
import { KeralaClassroomScene } from '@/components/course/KeralaClassroomScene';
import { KUTTAN_MOOD_IMAGES } from '@/components/character/KuttanImage';
import { FrauWeber, type FrauWeberMood } from '@/components/character/FrauWeber';
import { module1MissionCards, readCompletedModule1Missions, writeCompletedModule1Mission, type Module1MissionId } from '@/lib/missions/module1';
import { module2MissionCards, type Module2MissionId } from '@/lib/missions/module2';

type SceneVisualVariant = 'abstract' | 'kochi-room' | 'ai-study';

// Painterly dialogue scene for the M1-M2 missions: full-bleed Goethe-Kochi
// backdrop + the real Frau Weber and Kuttan characters (replaces the old SVG
// panel + colored-dot avatars). DECISIONS #10.

// Pick a painterly backdrop from the scene label so missions set outside the
// classroom (study table, home) don't all show the same room.
function missionBackdrop(sceneLabel: string): string {
  const s = sceneLabel.toLowerCase();
  if (s.includes('study') || s.includes('desk') || s.includes('home')) return '/images/scenes/hub-study-desk.jpg';
  if (s.includes('chayakkada') || s.includes('tea') || s.includes('cafe')) return '/images/scenes/hub-chayakkada.jpg';
  if (s.includes('street') || s.includes('outside')) return '/images/scenes/hub-kochi-street.jpg';
  return '/images/scenes/hub-goethe-kochi-classroom.jpg';
}

function MissionDialogueScene({
  sceneLabel,
  speakerName,
  speakerLine,
  speakerMood = 'teaching',
  learnerName,
  learnerLine,
  learnerReady,
  learnerTestId,
}: {
  sceneLabel: string;
  speakerName: string;
  speakerLine: string;
  speakerMood?: FrauWeberMood;
  learnerName: string;
  learnerLine: string;
  learnerReady: boolean;
  learnerTestId?: string;
}) {
  return (
    <div className="relative h-[20rem] overflow-hidden rounded-[1.25rem] shadow-inner shadow-black/20">
      {/* Painterly backdrop — varies by scene */}
      <img src={missionBackdrop(sceneLabel)} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d1a0d]/22 via-transparent to-[#0d1a0d]/68" />

      {/* Scene label */}
      <div className="absolute inset-x-4 top-3 flex justify-center">
        <div className="rounded-xl bg-[#0d1a0d]/82 px-4 py-1.5 text-xs font-black text-[#f1d27a] shadow-lg backdrop-blur-sm">
          {sceneLabel}
        </div>
      </div>

      {/* Characters — trimmed figures anchored to the floor, facing each other */}
      <FrauWeber mood={speakerMood} className="absolute bottom-0 left-2 h-[11rem] w-auto" />
      <motion.img
        src={KUTTAN_MOOD_IMAGES.happy}
        alt={learnerName}
        className="absolute bottom-0 right-2 h-[10.5rem] w-auto object-contain object-bottom drop-shadow-lg scale-x-[-1]"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
      <span className="absolute bottom-2 left-2 rounded-full bg-[#0d1a0d]/78 px-2 py-0.5 text-[0.62rem] font-black text-white/85">{speakerName}</span>
      <span className="absolute bottom-2 right-2 rounded-full bg-[#0d1a0d]/78 px-2 py-0.5 text-[0.62rem] font-black text-white/85">{learnerName}</span>

      {/* Speech bubbles — above each speaker, pointing down toward them */}
      <div className="absolute left-3 top-12 max-w-[56%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-sm font-black leading-tight text-[#132414] shadow-xl sm:text-base">
        {speakerLine}
      </div>
      <div
        className={clsx(
          'absolute right-3 top-[6.5rem] max-w-[56%] rounded-2xl rounded-br-md bg-[#132414] px-3.5 py-2.5 text-sm font-black leading-tight text-white shadow-xl transition sm:text-base',
          learnerReady ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        data-testid={learnerTestId}
        data-model-line-hidden={learnerTestId ? (learnerReady ? 'false' : 'true') : undefined}
      >
        {learnerReady ? learnerLine : '…'}
      </div>
    </div>
  );
}

export const MODULE2_COMPLETED_MISSIONS_STORAGE_KEY = 'adipoli:module2:completedMissions';

export function readCompletedModule2Missions(): Module2MissionId[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(MODULE2_COMPLETED_MISSIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const validIds = new Set(module2MissionCards.map((mission) => mission.id));
    return parsed.filter((id): id is Module2MissionId => typeof id === 'string' && validIds.has(id as Module2MissionId));
  } catch {
    return [];
  }
}

export function writeCompletedModule2Mission(missionId: Module2MissionId) {
  if (typeof window === 'undefined') return;
  const completed = readCompletedModule2Missions();
  const nextCompleted = completed.includes(missionId) ? completed : [...completed, missionId];
  window.localStorage.setItem(MODULE2_COMPLETED_MISSIONS_STORAGE_KEY, JSON.stringify(nextCompleted));
  window.dispatchEvent(new CustomEvent('module2-mission-completed', { detail: { missionId, completed: nextCompleted } }));
}

export function useMissionStepForQA(defaultStep = 0, maxStep = 99) {
  const [step, setStep] = useState(defaultStep);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('adipoliQa') !== '1') return;

    const qaHostAllowed =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === 'claude-desktop' ||
      window.location.hostname.startsWith('100.96.');
    if (!qaHostAllowed) return;

    const requestedStep = Number(params.get('adipoliQaStep'));
    if (!Number.isInteger(requestedStep)) return;
    const timer = window.setTimeout(() => setStep(Math.min(Math.max(requestedStep, 0), maxStep)), 0);
    return () => window.clearTimeout(timer);
  }, [maxStep]);

  return [step, setStep] as const;
}

export function normalizeMissionAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.!?]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, ' ');
}

function formatAudioTime(value: number) {
  if (!Number.isFinite(value) || value <= 0) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function NativeAudio({
  src,
  label,
  compact = false,
  bare = false,
  onPlay,
  onEnded,
  started = false,
  showStatus = false,
  turnCue = 'Your turn.',
}: {
  src: string;
  label: string;
  compact?: boolean;
  bare?: boolean;
  onPlay?: (src: string) => void;
  onEnded?: (src: string) => void;
  started?: boolean;
  showStatus?: boolean;
  turnCue?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(started);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progress = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
  const progressLabel = duration > 0
    ? `${formatAudioTime(currentTime)} / ${formatAudioTime(duration)}`
    : '0:00';

  const syncAudioProgress = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime || 0);
    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
  };

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
      syncAudioProgress();
      return;
    }

    setEnded(false);
    await audio.play();
  };

  return (
    <div
      className={clsx(
        'rounded-2xl',
        bare ? 'border-0 bg-transparent p-0' : 'border border-[#d7b35a]/25 bg-[#fff7df]/8',
        !bare && (compact ? 'p-3' : 'p-4')
      )}
      data-testid="custom-mission-audio"
      data-audio-surface={bare ? 'flat' : 'card'}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="truncate text-sm font-black text-[#f1d27a]">{label}</p>
            <p className="shrink-0 text-xs font-bold tabular-nums text-white/58" data-testid="mission-audio-time">
              {progressLabel}
            </p>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/12" aria-hidden="true" data-testid="mission-audio-progress">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#f1d27a] to-[#3fbf75] transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="sr-only" aria-live="polite">
            {`${label}: ${playing ? 'playing' : 'paused'}, ${progressLabel}`}
          </p>
          {showStatus && (
            <p
              className={clsx(
                'mt-2 text-sm font-black',
                ended ? 'text-[#bcf7d0]' : playing ? 'text-[#f1d27a]' : 'text-white/44'
              )}
              data-testid="mission-audio-turn-cue"
              aria-live="polite"
            >
              {ended ? turnCue : playing ? 'Listening…' : 'Listen first'}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={toggleAudio}
          className={clsx(
            'min-h-11 shrink-0 rounded-2xl px-4 text-sm font-black transition active:translate-y-1 active:shadow-none',
            ended
              ? 'border border-[#f1d27a]/30 bg-[#f1d27a]/10 text-[#f1d27a] shadow-none hover:bg-[#f1d27a]/16'
              : 'bg-[#f1d27a] text-[#1a2415] shadow-[0_4px_0_#9d7420] hover:bg-[#ffe08a]'
          )}
          aria-label={`${playing ? 'Pause' : 'Listen to'} ${label}`}
        >
          {playing ? 'Pause' : 'Listen'}
        </button>
      </div>
      <audio
        ref={audioRef}
        preload="metadata"
        src={src}
        onLoadedMetadata={syncAudioProgress}
        onDurationChange={syncAudioProgress}
        onTimeUpdate={syncAudioProgress}
        onPlay={() => {
          setPlaying(true);
          setEnded(false);
          syncAudioProgress();
          onPlay?.(src);
        }}
        onPause={() => {
          setPlaying(false);
          syncAudioProgress();
        }}
        onEnded={() => {
          setPlaying(false);
          setEnded(true);
          syncAudioProgress();
          onEnded?.(src);
        }}
        className="sr-only"
      />
    </div>
  );
}

function ProgressRail({ currentStep, steps, label }: { currentStep: number; steps: string[]; label: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6">
      <div className="sr-only">
        {label}: step {currentStep + 1} of {steps.length}
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#c9912c] via-[#f1d27a] to-[#3fbf75]"
          initial={false}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function MissionSequenceRibbon({ currentMissionId }: { currentMissionId: Module2MissionId }) {
  const currentIndex = module2MissionCards.findIndex((mission) => mission.id === currentMissionId);
  const safeIndex = Math.max(currentIndex, 0);
  const currentMission = module2MissionCards[safeIndex];
  const nextMission = currentMission?.next;
  const [completedMissionIds, setCompletedMissionIds] = useState<Module2MissionId[]>([]);

  useEffect(() => {
    const refreshCompletedMissions = () => setCompletedMissionIds(readCompletedModule2Missions());
    refreshCompletedMissions();
    window.addEventListener('module2-mission-completed', refreshCompletedMissions);
    window.addEventListener('storage', refreshCompletedMissions);
    return () => {
      window.removeEventListener('module2-mission-completed', refreshCompletedMissions);
      window.removeEventListener('storage', refreshCompletedMissions);
    };
  }, []);

  const completedMissionSet = new Set(completedMissionIds);
  const completedCount = module2MissionCards.filter((mission) => completedMissionSet.has(mission.id)).length;

  return (
    <div className="sr-only">
      <div>
        <div>
          <span>Current mission {safeIndex + 1} of 5:</span>
          <span className="min-w-0 truncate font-bold text-white/78">{currentMission.title}</span>
        </div>
        <div className="flex items-center gap-2 sm:ml-auto" aria-label="Module 2 completion ribbon">
          <span className="sr-only">
            {completedCount}/5 done
          </span>
          <div className="flex items-center gap-1.5" role="list" aria-label="Module 2 mission completion status">
            {module2MissionCards.map((mission) => {
              const done = completedMissionSet.has(mission.id);
              const active = mission.id === currentMissionId;
              const status = done ? 'completed' : active ? 'current mission' : 'not completed yet';
              return (
                <span
                  key={mission.id}
                  role="listitem"
                  title={`${mission.missionNumber}: ${mission.title} — ${status}`}
                  aria-label={`${mission.missionNumber}: ${mission.title} — ${status}`}
                  className={clsx(
                    'flex h-2.5 w-2.5 items-center justify-center rounded-full border transition sm:h-3 sm:w-3',
                    active
                      ? 'border-[#f1d27a] bg-[#f1d27a]/18 text-[#f1d27a]'
                      : done
                        ? 'border-[#3fbf75]/35 bg-[#3fbf75]/16 text-[#bcf7d0]'
                        : 'border-white/10 bg-white/[0.045] text-white/35'
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                </span>
              );
            })}
          </div>
        </div>
        <span className="sr-only">
          {nextMission ? `Next mission: ${nextMission.title}` : 'Module 2 review opens from the win card.'}
        </span>
      </div>
    </div>
  );
}

function Module1SequenceRibbon({ currentMissionId }: { currentMissionId: Module1MissionId }) {
  const currentIndex = module1MissionCards.findIndex((mission) => mission.id === currentMissionId);
  const safeIndex = Math.max(currentIndex, 0);
  const currentMission = module1MissionCards[safeIndex];
  const nextMission = currentMission?.next;
  const [completedMissionIds, setCompletedMissionIds] = useState<Module1MissionId[]>([]);

  useEffect(() => {
    const refreshCompletedMissions = () => setCompletedMissionIds(readCompletedModule1Missions());
    refreshCompletedMissions();
    window.addEventListener('module1-mission-completed', refreshCompletedMissions);
    window.addEventListener('storage', refreshCompletedMissions);
    return () => {
      window.removeEventListener('module1-mission-completed', refreshCompletedMissions);
      window.removeEventListener('storage', refreshCompletedMissions);
    };
  }, []);

  const completedMissionSet = new Set(completedMissionIds);
  const completedCount = module1MissionCards.filter((mission) => completedMissionSet.has(mission.id)).length;

  return (
    <div className="sr-only">
      <div>
        <div>
          <span>Current mission {safeIndex + 1} of {module1MissionCards.length}:</span>
          <span className="min-w-0 truncate font-bold text-white/78">{currentMission.title}</span>
        </div>
        <div className="flex items-center gap-2 sm:ml-auto" aria-label="Module 1 completion ribbon">
          <span className="sr-only">
            {completedCount}/{module1MissionCards.length} done
          </span>
          <div className="flex items-center gap-1.5" role="list" aria-label="Module 1 mission completion status">
            {module1MissionCards.map((mission) => {
              const done = completedMissionSet.has(mission.id);
              const active = mission.id === currentMissionId;
              const status = done ? 'completed' : active ? 'current mission' : 'not completed yet';
              return (
                <span
                  key={mission.id}
                  role="listitem"
                  title={`${mission.missionNumber}: ${mission.title} — ${status}`}
                  aria-label={`${mission.missionNumber}: ${mission.title} — ${status}`}
                  className={clsx(
                    'flex h-2.5 w-2.5 items-center justify-center rounded-full border transition sm:h-3 sm:w-3',
                    active
                      ? 'border-[#f1d27a] bg-[#f1d27a]/18 text-[#f1d27a]'
                      : done
                        ? 'border-[#3fbf75]/35 bg-[#3fbf75]/16 text-[#bcf7d0]'
                        : 'border-white/10 bg-white/[0.045] text-white/35'
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                </span>
              );
            })}
          </div>
        </div>
        <span className="sr-only">
          {nextMission ? `Next mission: ${nextMission.title}` : 'Module 2 opens from the win card.'}
        </span>
      </div>
    </div>
  );
}

export function MissionShell({
  children,
  currentStep,
  steps,
  railLabel,
  tone = 'green',
  currentMissionId,
  currentModule1MissionId,
}: {
  children: React.ReactNode;
  currentStep: number;
  steps: string[];
  railLabel: string;
  tone?: 'green' | 'blue';
  currentMissionId?: Module2MissionId;
  currentModule1MissionId?: Module1MissionId;
}) {
  const isBlue = tone === 'blue';
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={clsx('min-h-screen overflow-hidden text-[#fff8ea]', isBlue ? 'bg-[#101b26]' : 'bg-[#102018]')}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={clsx(
            'absolute inset-0',
            isBlue
              ? 'bg-[radial-gradient(circle_at_20%_12%,rgba(63,191,117,0.18),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(241,210,122,0.20),transparent_30%),linear-gradient(135deg,#101b26_0%,#172722_45%,#0f172a_100%)]'
              : 'bg-[radial-gradient(circle_at_20%_12%,rgba(63,191,117,0.22),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(241,210,122,0.19),transparent_30%),linear-gradient(135deg,#102018_0%,#17341f_42%,#0b1727_100%)]'
          )}
        />
        <div className={clsx('absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:56px_56px]', isBlue ? 'opacity-[0.07]' : 'opacity-[0.08]')} />
        {!isBlue && (
          <>
            <div className="absolute -left-28 bottom-[-16rem] h-[34rem] w-[34rem] rounded-full bg-[#3fbf75]/20 blur-3xl" />
            <div className="absolute -right-28 top-20 h-[31rem] w-[31rem] rounded-full bg-[#d7b35a]/18 blur-3xl" />
          </>
        )}
      </div>
      <ProgressRail currentStep={currentStep} steps={steps} label={railLabel} />
      {currentModule1MissionId ? (
        <Module1SequenceRibbon currentMissionId={currentModule1MissionId} />
      ) : currentMissionId ? (
        <MissionSequenceRibbon currentMissionId={currentMissionId} />
      ) : null}
      <div className="relative mx-auto flex min-h-[calc(100vh-42px)] w-full max-w-6xl items-start px-4 pb-40 pt-5 sm:min-h-[calc(100vh-36px)] sm:items-center sm:px-6 sm:pb-36 sm:pt-7 lg:pb-32 lg:pt-10">
        <AnimatePresence mode="wait">
          <motion.section
            key={currentStep}
            initial={false}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }}
            className="w-full"
          >
            {children}
          </motion.section>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function PrimaryButton({ children, onClick, disabled = false }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-base font-black shadow-2xl transition active:scale-[0.98] sm:w-auto sm:px-6',
        disabled ? 'cursor-not-allowed bg-white/10 text-white/35 shadow-none' : 'bg-[#f1d27a] text-[#162416] shadow-[#f1d27a]/20 hover:bg-[#ffe394]'
      )}
    >
      {children}
    </button>
  );
}

export function ActionRow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [portalActions, setPortalActions] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)');
    const syncPortalMode = () => setPortalActions(query.matches);
    const timer = window.setTimeout(() => {
      setMounted(true);
      syncPortalMode();
    }, 0);
    query.addEventListener('change', syncPortalMode);
    return () => {
      window.clearTimeout(timer);
      query.removeEventListener('change', syncPortalMode);
    };
  }, []);

  const inlineRowClass = 'mt-7 flex flex-wrap items-center gap-3';
  const portalRowClass = 'fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-50 mx-auto grid w-[min(calc(100%-1rem),42rem)] -translate-x-1/2 gap-2 rounded-2xl border border-white/10 bg-[#102018]/88 p-2 shadow-xl shadow-black/20 backdrop-blur-md sm:flex sm:flex-wrap sm:items-center sm:justify-center';

  const row = (
    <div className={clsx(portalActions ? portalRowClass : inlineRowClass, className)}>
      {children}
    </div>
  );

  if (!mounted) {
    return <div className={clsx(inlineRowClass, className)}>{children}</div>;
  }

  return portalActions ? createPortal(row, document.body) : row;
}

export function SecondaryActionButton({
  children,
  onClick,
  selected = false,
  disabled = false,
  className = '',
}: {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-black transition sm:w-auto',
        disabled
          ? 'cursor-not-allowed bg-white/6 text-white/30'
          : selected
            ? 'bg-[#3fbf75] text-[#102018]'
            : 'bg-white/10 text-white hover:bg-white/15',
        className
      )}
    >
      {children}
    </button>
  );
}

export function SecondaryLink({ children, href, emphasis = false }: { children: React.ReactNode; href: string; emphasis?: boolean }) {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex min-h-14 w-full items-center justify-center rounded-2xl border px-6 py-4 text-center font-black transition sm:w-auto',
        emphasis
          ? 'border-[#f1d27a]/35 bg-[#f1d27a]/10 text-[#f1d27a] hover:bg-[#f1d27a]/15'
          : 'border-white/15 text-white/80 hover:bg-white/10'
      )}
    >
      {children}
    </Link>
  );
}

export function RepairChoiceButton({
  children,
  onClick,
  selected,
}: {
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'w-full min-h-16 rounded-2xl border p-4 text-left transition active:scale-[0.99]',
        selected
          ? 'border-[#f1d27a] bg-[#f1d27a]/15 shadow-lg shadow-[#f1d27a]/10'
          : 'border-white/12 bg-white/[0.06] hover:border-white/25 hover:bg-white/[0.09]'
      )}
    >
      {children}
    </button>
  );
}

export type ChoiceOption<T extends string> = {
  id: T;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

export function ChoiceStep<T extends string>({
  options,
  value,
  onChange,
  isCorrect,
  wrongFeedback,
  correctFeedback,
  cta,
  onContinue,
  continueDisabled,
  autoContinueOnCorrect = false,
  autoContinueDelayMs = 650,
  collapseOnCorrect = false,
}: {
  options: ChoiceOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  isCorrect: boolean;
  wrongFeedback: React.ReactNode;
  correctFeedback: React.ReactNode;
  cta: React.ReactNode;
  onContinue: () => void;
  continueDisabled: boolean;
  autoContinueOnCorrect?: boolean;
  autoContinueDelayMs?: number;
  collapseOnCorrect?: boolean;
}) {
  useEffect(() => {
    if (!autoContinueOnCorrect || continueDisabled || !isCorrect) return;
    const timer = window.setTimeout(onContinue, autoContinueDelayMs);
    return () => window.clearTimeout(timer);
  }, [autoContinueDelayMs, autoContinueOnCorrect, continueDisabled, isCorrect, onContinue]);

  const showOptions = !(collapseOnCorrect && isCorrect);

  return (
    <div className="grid gap-3" data-options-collapsed={showOptions ? 'false' : 'true'}>
      {showOptions && options.map((option) => {
        const selected = value === option.id;
        return (
          <RepairChoiceButton key={option.id} onClick={() => onChange(option.id)} selected={selected}>
            <b className="text-lg">{option.title}</b>
            {option.subtitle && (
              <>
                <br />
                <span className={selected ? 'text-white/60' : 'sr-only'}>{option.subtitle}</span>
              </>
            )}
          </RepairChoiceButton>
        );
      })}
      {value && !isCorrect && <p className="rounded-2xl bg-[#c0392b]/14 p-4 font-semibold text-[#ffc9c2]">{wrongFeedback}</p>}
      {isCorrect && <p className="rounded-2xl bg-[#3fbf75]/14 p-4 font-semibold text-[#bcf7d0]">{correctFeedback}</p>}
      <div className="sr-only" aria-live="polite">
        {continueDisabled ? 'Choose the correct answer to continue.' : autoContinueOnCorrect ? 'Correct. Moving forward.' : 'Continue is ready.'}
      </div>
      {!continueDisabled && !autoContinueOnCorrect && (
        <ActionRow>
          <PrimaryButton onClick={onContinue}>{cta}</PrimaryButton>
        </ActionRow>
      )}
    </div>
  );
}

export function RepairStep<T extends string>({
  title,
  explanation,
  bridgeNote,
  options,
  value,
  onChange,
  isCorrect,
  wrongFeedback,
  correctFeedback,
  cta,
  onContinue,
  continueDisabled,
  autoContinueOnCorrect = false,
}: {
  title: string;
  explanation: React.ReactNode;
  bridgeNote?: React.ReactNode;
  options: ChoiceOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  isCorrect: boolean;
  wrongFeedback: React.ReactNode;
  correctFeedback: React.ReactNode;
  cta: React.ReactNode;
  onContinue: () => void;
  continueDisabled: boolean;
  autoContinueOnCorrect?: boolean;
}) {
  const hasSelectedRepair = value !== null;

  return (
    <div className="grid gap-7 lg:grid-cols-[0.82fr_1fr] lg:items-center">
      <div>
        <ShieldCheck className="mb-4 h-11 w-11 text-[#f1d27a]" />
        <h2 className="text-3xl font-black leading-tight sm:text-5xl">{title}</h2>
        <p
          className={clsx(
            hasSelectedRepair ? 'mt-3 text-sm leading-6 text-white/56' : 'sr-only'
          )}
          data-testid="repair-explanation"
        >
          {explanation}
        </p>
        {bridgeNote && (
          <div
            className={clsx(
              hasSelectedRepair
                ? 'mt-4 rounded-2xl border border-[#f1d27a]/18 bg-[#f1d27a]/7 p-3 text-sm leading-6 text-white/64'
                : 'sr-only'
            )}
            data-testid="repair-bridge-note"
          >
            {bridgeNote}
          </div>
        )}
      </div>
      <ChoiceStep
        options={options}
        value={value}
        onChange={onChange}
        isCorrect={isCorrect}
        wrongFeedback={wrongFeedback}
        correctFeedback={correctFeedback}
        cta={cta}
        onContinue={onContinue}
        continueDisabled={continueDisabled}
        autoContinueOnCorrect={autoContinueOnCorrect}
      />
    </div>
  );
}

export function HearStep({
  title,
  instructions,
  heard,
  onHeard,
  cta,
  onContinue,
  continueDisabled,
  autoContinueOnFinish = false,
  audios,
}: {
  title: string;
  instructions: React.ReactNode;
  heard: boolean;
  onHeard: () => void;
  cta: React.ReactNode;
  onContinue: () => void;
  continueDisabled: boolean;
  autoContinueOnFinish?: boolean;
  audios: Array<{ src: string; label: string; turnCue?: string }>;
}) {
  const [endedSources, setEndedSources] = useState<string[]>([]);
  const requiredAudioSources = audios.map((audio) => audio.src);
  const endedRequiredCount = requiredAudioSources.filter((src) => endedSources.includes(src)).length;
  const hasFinishedRequiredAudio = endedRequiredCount === requiredAudioSources.length;
  const audioStatusText = hasFinishedRequiredAudio
    ? 'Audio finished.'
    : `${endedRequiredCount}/${requiredAudioSources.length}`;

  const markAudioEnded = (src: string) => {
    setEndedSources((current) => (current.includes(src) ? current : [...current, src]));
  };

  useEffect(() => {
    if (hasFinishedRequiredAudio && !heard) {
      onHeard();
    }
  }, [hasFinishedRequiredAudio, heard, onHeard]);

  useEffect(() => {
    if (!autoContinueOnFinish || !hasFinishedRequiredAudio) return;
    const timer = window.setTimeout(onContinue, 220);
    return () => window.clearTimeout(timer);
  }, [autoContinueOnFinish, hasFinishedRequiredAudio, onContinue]);

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-7">
      <div>
        <Headphones className="mb-4 h-11 w-11 text-[#f1d27a]" />
        <h2 className="text-3xl font-black leading-tight sm:text-5xl">{title}</h2>
        <p className="sr-only" data-testid="hear-step-instructions">{instructions}</p>
        <div className="sr-only" aria-live="polite">
          {audioStatusText}
        </div>
      </div>
      <div className="space-y-3 rounded-[1.55rem] border border-white/12 bg-black/18 p-3 sm:space-y-4 sm:rounded-[1.8rem] sm:p-5">
        {audios.map((audio) => (
          <NativeAudio
            key={`${audio.label}-${audio.src}`}
            src={audio.src}
            label={audio.label}
            onEnded={markAudioEnded}
            started={endedSources.includes(audio.src)}
            showStatus={endedSources.includes(audio.src)}
            turnCue={audio.turnCue}
            compact
          />
        ))}
      </div>
      <div className="sr-only" aria-live="polite">
        {continueDisabled ? 'Finish the scene audio to unlock the next action.' : 'Next action ready.'}
      </div>
      {!continueDisabled && !autoContinueOnFinish && (
        <ActionRow className="lg:col-span-2 lg:mt-1">
          <PrimaryButton onClick={onContinue}>{cta}</PrimaryButton>
        </ActionRow>
      )}
    </div>
  );
}

export function ConversationSceneStep({
  title,
  sceneLabel = 'Goethe Kochi mock',
  sceneVisualVariant,
  speakerName,
  speakerLine,
  learnerName = 'You',
  learnerLine,
  audioSrc,
  audioLabel,
  onFinished,
  autoContinueOnFinish = false,
  cta,
  onContinue,
  turnCue = 'Your turn.',
}: {
  title: string;
  sceneLabel?: string;
  sceneVisualVariant?: SceneVisualVariant;
  speakerName: string;
  speakerLine: string;
  learnerName?: string;
  learnerLine: string;
  audioSrc: string;
  audioLabel?: string;
  onFinished: () => void;
  autoContinueOnFinish?: boolean;
  cta: React.ReactNode;
  onContinue: () => void;
  turnCue?: string;
}) {
  const [finished, setFinished] = useState(false);

  const markFinished = () => {
    setFinished(true);
    onFinished();
  };

  useEffect(() => {
    if (!autoContinueOnFinish || !finished) return;
    const timer = window.setTimeout(onContinue, 260);
    return () => window.clearTimeout(timer);
  }, [autoContinueOnFinish, finished, onContinue]);

  return (
    <div
      className="grid gap-5 lg:grid-cols-[0.9fr_1fr] lg:items-center"
      data-testid="conversation-scene-step"
      data-step-kind="conversation-scene"
      data-audio-finished={finished ? 'true' : 'false'}
      data-typing-required="false"
    >
      <div>
        <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">{title}</h2>
        <p className="sr-only">Listen to the speaker, then answer aloud.</p>
        <div className="mt-5 overflow-hidden rounded-[1.55rem] border border-white/12 bg-black/18 p-3 sm:p-4">
          <MissionDialogueScene
            sceneLabel={sceneLabel}
            speakerName={speakerName}
            speakerLine={speakerLine}
            speakerMood="teaching"
            learnerName={learnerName}
            learnerLine={learnerLine}
            learnerReady={finished}
          />
        </div>
      </div>
      <div className="rounded-[1.55rem] border border-[#f1d27a]/18 bg-[#f1d27a]/7 p-3 sm:p-4">
        <NativeAudio
          src={audioSrc}
          label={audioLabel ?? speakerName}
          onEnded={markFinished}
          started={finished}
          showStatus
          turnCue={turnCue}
          compact
        />
      </div>
      <div className="sr-only" aria-live="polite">
        {finished ? 'Learner reply is ready.' : 'Play the scene audio first.'}
      </div>
      {finished && !autoContinueOnFinish && (
        <ActionRow className="lg:col-span-2">
          <PrimaryButton onClick={onContinue}>{cta}</PrimaryButton>
        </ActionRow>
      )}
    </div>
  );
}

export function ConversationRepairStep<T extends string>({
  title,
  hideTitle = false,
  sceneLabel = 'Goethe Kochi mock',
  sceneVisualVariant,
  speakerName,
  speakerLine,
  learnerName = 'You',
  learnerLine,
  audioSrc,
  audioLabel,
  options,
  value,
  onChange,
  isCorrect,
  wrongFeedback,
  correctFeedback,
  cta,
  onContinue,
  turnCue = 'Your turn.',
}: {
  title: string;
  hideTitle?: boolean;
  sceneLabel?: string;
  sceneVisualVariant?: SceneVisualVariant;
  speakerName: string;
  speakerLine: string;
  learnerName?: string;
  learnerLine: string;
  audioSrc: string;
  audioLabel?: string;
  options: ChoiceOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  isCorrect: boolean;
  wrongFeedback: React.ReactNode;
  correctFeedback: React.ReactNode;
  cta: React.ReactNode;
  onContinue: () => void;
  turnCue?: string;
}) {
  const [modelAudioFinished, setModelAudioFinished] = useState(false);

  useEffect(() => {
    if (!modelAudioFinished || !isCorrect) return;
    const timer = window.setTimeout(onContinue, 650);
    return () => window.clearTimeout(timer);
  }, [isCorrect, modelAudioFinished, onContinue]);

  return (
    <div
      className="grid gap-5 lg:grid-cols-[0.9fr_1fr] lg:items-center"
      data-testid="immersive-reply-step"
      data-step-kind="conversation-repair"
      data-model-audio-finished={modelAudioFinished ? 'true' : 'false'}
      data-typing-required="false"
    >
      <div>
        {!hideTitle && <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">{title}</h2>}
        <p className="sr-only">Listen to the speaker, answer aloud, then fix one tiny trap.</p>
        <div className={clsx(!hideTitle && 'mt-5', 'overflow-hidden rounded-[1.55rem] border border-white/12 bg-black/18 p-3 sm:p-4')}>
          <MissionDialogueScene
            sceneLabel={sceneLabel}
            speakerName={speakerName}
            speakerLine={speakerLine}
            speakerMood="teaching"
            learnerName={learnerName}
            learnerLine={learnerLine}
            learnerReady={modelAudioFinished}
            learnerTestId="immersive-model-line"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-[1.55rem] border border-[#f1d27a]/18 bg-[#f1d27a]/7 p-3 sm:p-4">
          <NativeAudio
            src={audioSrc}
            label={audioLabel ?? speakerName}
            onEnded={() => setModelAudioFinished(true)}
            started={modelAudioFinished}
            showStatus
            turnCue={turnCue}
            compact
          />
        </div>
        <div
          className={clsx(!modelAudioFinished && 'sr-only')}
          data-testid="inline-repair-choice"
          data-pre-audio-buttons={modelAudioFinished ? 'false' : 'blocked'}
          data-repair-surface="inline-bubbles"
          data-options-collapsed={isCorrect ? 'true' : 'false'}
          aria-hidden={!modelAudioFinished}
        >
          {modelAudioFinished && (
            <div className="grid gap-3">
              {!isCorrect && (
                <>
                  <p className="text-sm font-black text-[#f1d27a]" data-testid="say-aloud-then-tap">
                    Say it aloud. Then tap it.
                  </p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Tap the line you would say">
                    {options.map((option) => {
                      const selected = value === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => onChange(option.id)}
                          className={clsx(
                            'min-h-12 max-w-full rounded-full border px-4 py-3 text-left text-sm font-black leading-snug transition active:scale-[0.98]',
                            selected
                              ? 'border-[#f1d27a] bg-[#f1d27a]/18 text-[#f8dda0]'
                              : 'border-white/12 bg-white/[0.055] text-white/84 hover:border-white/24 hover:bg-white/[0.085]'
                          )}
                        >
                          <span>{option.title}</span>
                          {option.subtitle && (
                            <span className={selected ? 'ml-2 text-xs font-bold text-white/52' : 'sr-only'}>{option.subtitle}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
              {value && !isCorrect && <p className="rounded-2xl bg-[#c0392b]/14 px-4 py-3 text-sm font-bold text-[#ffc9c2]">{wrongFeedback}</p>}
              {isCorrect && <p className="rounded-2xl bg-[#3fbf75]/14 px-4 py-3 text-sm font-bold text-[#bcf7d0]">{correctFeedback}</p>}
              <div className="sr-only" aria-live="polite">
                {isCorrect ? 'Correct. Moving forward.' : value ? 'Try the other spoken line.' : 'Tap the line you would say.'}
              </div>
              <div className="sr-only">{cta}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function RecognitionStep<T extends string>({
  icon,
  title,
  prompt,
  options,
  value,
  onChange,
  isCorrect,
  wrongFeedback,
  correctFeedback,
  cta,
  onContinue,
  continueDisabled,
  side,
  autoContinueOnCorrect = false,
}: {
  icon: React.ReactNode;
  title: string;
  prompt: React.ReactNode;
  options: ChoiceOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  isCorrect: boolean;
  wrongFeedback: React.ReactNode;
  correctFeedback: React.ReactNode;
  cta: React.ReactNode;
  onContinue: () => void;
  continueDisabled: boolean;
  side?: React.ReactNode;
  autoContinueOnCorrect?: boolean;
}) {
  useEffect(() => {
    if (!autoContinueOnCorrect || continueDisabled || !isCorrect) return;
    const timer = window.setTimeout(onContinue, 650);
    return () => window.clearTimeout(timer);
  }, [autoContinueOnCorrect, continueDisabled, isCorrect, onContinue]);

  return (
    <div className="grid gap-7 lg:grid-cols-[0.85fr_1fr] lg:items-start">
      <div>
        <div className="mb-4 text-[#f1d27a]">{icon}</div>
        <h2 className="text-3xl font-black leading-tight sm:text-5xl">{title}</h2>
        <p className="sr-only" data-testid="recognition-prompt">{prompt}</p>
        {side && (
          <div className="mt-5 max-w-md" data-testid="recognition-scene-audio">
            {side}
          </div>
        )}
      </div>
      <div className="grid gap-3">
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <RepairChoiceButton key={option.id} onClick={() => onChange(option.id)} selected={selected}>
              <b className="text-lg">{option.title}</b>
              {option.subtitle && (
                <>
                  <br />
                  <span className={selected ? 'text-white/60' : 'sr-only'}>{option.subtitle}</span>
                </>
              )}
            </RepairChoiceButton>
          );
        })}
        {value && !isCorrect && <p className="rounded-2xl bg-[#c0392b]/14 p-4 font-semibold text-[#ffc9c2]">{wrongFeedback}</p>}
        {isCorrect && <p className="rounded-2xl bg-[#3fbf75]/14 p-4 font-semibold text-[#bcf7d0]">{correctFeedback}</p>}
      </div>
      <div className="sr-only" aria-live="polite">
        {continueDisabled ? 'Choose the correct answer to continue.' : autoContinueOnCorrect ? 'Correct. Moving forward.' : 'Continue is ready.'}
      </div>
      {!continueDisabled && !autoContinueOnCorrect && (
        <ActionRow className="lg:col-span-2">
          <PrimaryButton onClick={onContinue}>{cta}</PrimaryButton>
        </ActionRow>
      )}
    </div>
  );
}

export function ReplyAloudStep({
  title,
  prompt,
  audioSrc,
  audioLabel = 'Your line',
  modelText,
  cta,
  onContinue,
  turnCue = 'Now answer.',
}: {
  title: string;
  prompt: React.ReactNode;
  audioSrc: string;
  audioLabel?: string;
  modelText: React.ReactNode;
  cta: React.ReactNode;
  onContinue: () => void;
  turnCue?: string;
}) {
  const [modelAudioFinished, setModelAudioFinished] = useState(false);

  return (
    <div
      className="grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-center"
      data-testid="immersive-reply-step"
      data-step-kind="reply-aloud"
      data-model-audio-finished={modelAudioFinished ? 'true' : 'false'}
      data-typing-required="false"
    >
      <div>
        <Mic className="mb-4 h-11 w-11 text-[#f1d27a]" />
        <h2 className="text-3xl font-black leading-tight sm:text-5xl">{title}</h2>
        <p className="mt-3 text-base leading-7 text-white/66">{prompt}</p>
      </div>
      <div className="rounded-[1.55rem] border border-[#f1d27a]/18 bg-[#f1d27a]/7 p-3 sm:p-4">
        <NativeAudio
          src={audioSrc}
          label={audioLabel}
          onEnded={() => setModelAudioFinished(true)}
          started={modelAudioFinished}
          showStatus
          turnCue={turnCue}
          compact
        />
        <div
          className={clsx(
            'mt-4 rounded-2xl border border-white/10 bg-[#0f1d14]/72 p-4 transition',
            modelAudioFinished ? 'opacity-100' : 'sr-only'
          )}
          data-testid="immersive-model-line"
          data-model-line-hidden={modelAudioFinished ? 'false' : 'true'}
        >
          <p className="sr-only">Your line appears after audio.</p>
          <p className="text-2xl font-black leading-snug">{modelText}</p>
        </div>
      </div>
      <ActionRow className="lg:col-span-2">
        <PrimaryButton onClick={onContinue} disabled={!modelAudioFinished}>{cta}</PrimaryButton>
      </ActionRow>
    </div>
  );
}

export function SpeakRepairStep<T extends string>({
  title,
  prompt,
  audioSrc,
  audioLabel = 'Your reply',
  modelText,
  options,
  value,
  onChange,
  isCorrect,
  wrongFeedback,
  correctFeedback,
  cta,
  onContinue,
  turnCue = 'Your turn.',
}: {
  title: string;
  prompt: React.ReactNode;
  audioSrc: string;
  audioLabel?: string;
  modelText: React.ReactNode;
  options: ChoiceOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  isCorrect: boolean;
  wrongFeedback: React.ReactNode;
  correctFeedback: React.ReactNode;
  cta: React.ReactNode;
  onContinue: () => void;
  turnCue?: string;
}) {
  const [modelAudioFinished, setModelAudioFinished] = useState(false);

  return (
    <div
      className="grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-center"
      data-testid="immersive-reply-step"
      data-step-kind="speak-repair"
      data-model-audio-finished={modelAudioFinished ? 'true' : 'false'}
      data-typing-required="false"
    >
      <div data-testid="speak-repair-step">
        <Mic className="mb-4 h-11 w-11 text-[#f1d27a]" />
        <h2 className="text-3xl font-black leading-tight sm:text-5xl">{title}</h2>
        <p className="sr-only" data-testid="speak-repair-prompt">{prompt}</p>
        <div className="mt-5 rounded-[1.55rem] border border-[#f1d27a]/18 bg-[#f1d27a]/7 p-3 sm:p-4">
          <NativeAudio
            src={audioSrc}
            label={audioLabel}
            onEnded={() => setModelAudioFinished(true)}
            started={modelAudioFinished}
            showStatus
            turnCue={turnCue}
            compact
          />
          <div
            className={clsx(
              'mt-4 rounded-2xl border border-white/10 bg-[#0f1d14]/72 p-4 transition',
              modelAudioFinished ? 'opacity-100' : 'sr-only'
            )}
            data-testid="immersive-model-line"
            data-model-line-hidden={modelAudioFinished ? 'false' : 'true'}
          >
            <p className="sr-only">Say this aloud.</p>
            <p className="text-2xl font-black leading-snug">{modelText}</p>
          </div>
        </div>
      </div>
      <div
        className={clsx(!modelAudioFinished && 'sr-only')}
        data-testid="inline-repair-choice"
        data-pre-audio-buttons={modelAudioFinished ? 'false' : 'blocked'}
        aria-hidden={!modelAudioFinished}
      >
        {modelAudioFinished && (
          <ChoiceStep
            options={options}
            value={value}
            onChange={onChange}
            isCorrect={isCorrect}
            wrongFeedback={wrongFeedback}
            correctFeedback={correctFeedback}
            cta={cta}
            onContinue={onContinue}
            continueDisabled={!isCorrect}
            autoContinueOnCorrect
          />
        )}
      </div>
    </div>
  );
}

export function SpeakWriteStep({
  title,
  prompt,
  audioSrc,
  audioLabel = 'Your line',
  modelText,
  inputId,
  label,
  value,
  onChange,
  placeholder,
  isStrong,
  weakFeedback,
  strongFeedback,
  cta,
  onContinue,
  continueDisabled,
  turnCue = 'Your turn.',
  requireTyped = true,
}: {
  title: string;
  prompt: React.ReactNode;
  audioSrc: string;
  audioLabel?: string;
  modelText: React.ReactNode;
  inputId: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isStrong: boolean;
  weakFeedback: React.ReactNode;
  strongFeedback: React.ReactNode;
  cta: React.ReactNode;
  onContinue: () => void;
  continueDisabled: boolean;
  turnCue?: string;
  requireTyped?: boolean;
}) {
  const [modelAudioFinished, setModelAudioFinished] = useState(false);
  const primaryDisabled = !modelAudioFinished || (requireTyped && continueDisabled);

  return (
    <div
      className="grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-center"
      data-testid="speak-write-step"
      data-model-audio-finished={modelAudioFinished ? 'true' : 'false'}
      data-typing-required={requireTyped ? 'true' : 'false'}
    >
      <div data-testid="immersive-reply-step" data-model-audio-finished={modelAudioFinished ? 'true' : 'false'}>
        <Mic className="mb-4 h-11 w-11 text-[#f1d27a]" />
        <h2 className="text-3xl font-black leading-tight sm:text-5xl">{title}</h2>
        <p className="sr-only" data-testid="speak-write-prompt">{prompt}</p>
        <div className="mt-5 rounded-[1.55rem] border border-[#f1d27a]/18 bg-[#f1d27a]/7 p-3 sm:p-4">
          <NativeAudio
            src={audioSrc}
            label={audioLabel}
            onEnded={() => setModelAudioFinished(true)}
            started={modelAudioFinished}
            showStatus
            turnCue={turnCue}
            compact
          />
          <div
            className={clsx(
              'mt-4 rounded-2xl border border-white/10 bg-[#0f1d14]/72 p-4 transition',
              modelAudioFinished ? 'opacity-100' : 'sr-only'
            )}
            data-testid="immersive-model-line"
            data-model-line-hidden={modelAudioFinished ? 'false' : 'true'}
          >
            <p className="sr-only">Line appears after audio.</p>
            <p className="text-2xl font-black leading-snug">{modelText}</p>
          </div>
        </div>
      </div>
      <div
        data-testid="tiny-write-step"
        data-optional-anchor-hidden={!requireTyped && !modelAudioFinished ? 'true' : 'false'}
        className={clsx(!requireTyped && !modelAudioFinished && 'sr-only')}
      >
        <PenLine className="mb-4 h-11 w-11 text-[#f1d27a]" />
        <label htmlFor={inputId} className="sr-only">{label}</label>
        {!requireTyped && (
          <p className="sr-only" data-testid="optional-anchor-note">
            Optional. Speak first.
          </p>
        )}
        <input
          id={inputId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={modelAudioFinished ? placeholder : 'Listen first…'}
          disabled={!modelAudioFinished}
          data-testid="tiny-write-input"
          data-typing-locked={modelAudioFinished ? 'false' : 'true'}
          aria-required={requireTyped}
          className={clsx(
            'w-full rounded-[1.35rem] border px-5 py-4 text-xl font-black text-white outline-none ring-[#f1d27a]/35 placeholder:text-white/30 focus:border-[#f1d27a]/50 focus:ring-4',
            modelAudioFinished
              ? 'border-white/12 bg-[#0f1d14]/85'
              : 'cursor-not-allowed border-white/8 bg-white/[0.045] text-white/38'
          )}
        />
        <p className="sr-only" aria-live="polite">
          {modelAudioFinished
            ? requireTyped
              ? 'Say it once, then write the short anchor line.'
              : 'Say it once. The short written anchor is optional on this pass.'
            : 'Writing unlocks after the model audio finishes.'}
        </p>
        {value && !isStrong && <p className="mt-3 text-sm font-semibold text-[#ffc9c2]">{weakFeedback}</p>}
        {isStrong && <p className="mt-3 rounded-2xl bg-[#3fbf75]/14 p-4 font-semibold text-[#bcf7d0]">{strongFeedback}</p>}
      </div>
      <ActionRow className="lg:col-span-2">
        <PrimaryButton onClick={onContinue} disabled={primaryDisabled}>{cta}</PrimaryButton>
      </ActionRow>
    </div>
  );
}

export function TinyWriteStep({
  title,
  prompt,
  inputId,
  label,
  value,
  onChange,
  placeholder,
  isStrong,
  weakFeedback,
  strongFeedback,
  cta,
  onContinue,
  continueDisabled,
}: {
  title: string;
  prompt?: React.ReactNode;
  inputId: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isStrong: boolean;
  weakFeedback: React.ReactNode;
  strongFeedback: React.ReactNode;
  cta: React.ReactNode;
  onContinue: () => void;
  continueDisabled: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-center" data-testid="tiny-write-step">
      <div>
        <PenLine className="mb-4 h-11 w-11 text-[#f1d27a]" />
        <h2 className="text-3xl font-black leading-tight sm:text-5xl">{title}</h2>
        {prompt && <p className="mt-3 text-base leading-7 text-white/66">{prompt}</p>}
      </div>
      <div>
        <label htmlFor={inputId} className="sr-only">{label}</label>
        <input
          id={inputId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          data-testid="tiny-write-input"
          className="w-full rounded-[1.35rem] border border-white/12 bg-[#0f1d14]/85 px-5 py-4 text-xl font-black text-white outline-none ring-[#f1d27a]/35 placeholder:text-white/30 focus:border-[#f1d27a]/50 focus:ring-4"
        />
        {value && !isStrong && <p className="mt-3 text-sm font-semibold text-[#ffc9c2]">{weakFeedback}</p>}
        {isStrong && <p className="mt-3 rounded-2xl bg-[#3fbf75]/14 p-4 font-semibold text-[#bcf7d0]">{strongFeedback}</p>}
      </div>
      <ActionRow className="lg:col-span-2">
        <PrimaryButton onClick={onContinue} disabled={continueDisabled}>{cta}</PrimaryButton>
      </ActionRow>
    </div>
  );
}

export function PremiumCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('rounded-[1.6rem] border border-white/12 bg-[#17271b]/78 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:p-10', className)}>
      {children}
    </div>
  );
}

export function MissionIntro({
  title,
  kicker = 'Goethe A1 speaking win',
  promise,
  output,
  outputLabel = 'Your first line',
  meaning,
  note,
  promises = ['1 Listen', '2 Say aloud', '3 Fix mistake'],
  cta,
  onStart,
}: {
  title: string;
  kicker?: string;
  promise: string;
  output: string;
  outputLabel?: string;
  meaning?: string;
  note?: string;
  promises?: string[];
  cta: React.ReactNode;
  onStart: () => void;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:items-center">
      <div>
        <p className="sr-only">{kicker}</p>
        <h1 className="mt-3 max-w-3xl text-[2.2rem] font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[3.45rem]">
          {title}
        </h1>
        <p className="sr-only">{promise} {promises.join(', ')}</p>
        <div className="mt-6 grid gap-3 sm:flex sm:items-center">
          <PrimaryButton onClick={onStart}>{cta}</PrimaryButton>
          {note && <p className="max-w-md text-sm font-semibold leading-6 text-white/52">{note}</p>}
        </div>
      </div>
      <div className="rounded-[1.35rem] border border-white/12 bg-black/18 p-3 sm:p-4">
        <KeralaClassroomScene className="mb-4 h-28 border-white/10 shadow-none" />
        <p className="sr-only">{outputLabel}</p>
        <p className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">{output}</p>
        {meaning && <p className="sr-only">{meaning}</p>}
      </div>
    </div>
  );
}

export function MissionWinStep({
  currentMissionId,
  title,
  summary,
  ability,
  onReplay,
  children,
  side,
}: {
  currentMissionId: Module2MissionId;
  title: string;
  summary: string;
  ability: React.ReactNode;
  onReplay: () => void;
  children?: React.ReactNode;
  side: React.ReactNode;
}) {
  useEffect(() => {
    writeCompletedModule2Mission(currentMissionId);
  }, [currentMissionId]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <div>
        <Trophy className="mb-4 h-12 w-12 text-[#f1d27a]" />
        <h2 className="text-4xl font-black leading-tight tracking-[-0.035em] sm:text-6xl">{title}</h2>
        <p className="sr-only">{summary}</p>
        <div className="mt-7 rounded-[1.5rem] border border-[#3fbf75]/25 bg-[#3fbf75]/12 p-5">
          <p className="text-sm font-black text-[#bcf7d0]">You can now</p>
          <p className="mt-2 text-2xl font-black">{ability}</p>
        </div>
        {children}
        <button
          type="button"
          onClick={onReplay}
          aria-label="Replay mission"
          className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:border-white/20 hover:text-white/70"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Replay mission</span>
        </button>
      </div>
      {side}
    </div>
  );
}

export function NextMissionCard({ currentMissionId }: { currentMissionId: Module2MissionId }) {
  const currentIndex = module2MissionCards.findIndex((mission) => mission.id === currentMissionId);
  const currentMission = module2MissionCards[currentIndex];
  const nextMission = currentMission?.next;
  const finalPull = currentMission?.modulePull;
  const nextHref = nextMission ? `${nextMission.href}?start=listen` : '/learn/2';

  if (nextMission) {
    return (
      <Link
        href={nextHref}
        className="block rounded-[1.8rem] border border-[#f1d27a]/20 bg-gradient-to-br from-[#f1d27a]/16 to-white/[0.04] p-5 transition hover:border-[#f1d27a]/45 hover:bg-[#f1d27a]/10"
      >
        <Sparkles className="mb-3 h-8 w-8 text-[#f1d27a]" />
        <p className="sr-only">Next mission</p>
        <h3 className="mt-2 text-2xl font-black leading-tight">{nextMission.title}</h3>
        <p className="sr-only">{nextMission.pull} {nextMission.cta}</p>
        <span className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#f1d27a] px-5 text-sm font-black text-[#162416] shadow-lg shadow-[#f1d27a]/15">
          Start next
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/learn/3"
      className="block rounded-[1.8rem] border border-[#f1d27a]/20 bg-gradient-to-br from-[#f1d27a]/16 to-white/[0.04] p-5 transition hover:border-[#f1d27a]/45 hover:bg-[#f1d27a]/10"
    >
      <Sparkles className="mb-3 h-8 w-8 text-[#f1d27a]" />
      <p className="sr-only">Start Module 3</p>
      <h3 className="mt-2 text-2xl font-black leading-tight">{finalPull?.title ?? 'Module 2 complete.'}</h3>
      <p className="sr-only">{finalPull?.pull ?? 'Review the five-mission sequence before moving on.'}</p>
      <span className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#f1d27a] px-5 text-sm font-black text-[#162416] shadow-lg shadow-[#f1d27a]/15">
        Start M3
      </span>
    </Link>
  );
}

export function Module1MissionWinStep({
  currentMissionId,
  title,
  summary,
  ability,
  onReplay,
  children,
  side,
}: {
  currentMissionId: Module1MissionId;
  title: string;
  summary: string;
  ability: React.ReactNode;
  onReplay: () => void;
  children?: React.ReactNode;
  side: React.ReactNode;
}) {
  useEffect(() => {
    writeCompletedModule1Mission(currentMissionId);
  }, [currentMissionId]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <div>
        <Trophy className="mb-4 h-12 w-12 text-[#f1d27a]" />
        <h2 className="text-4xl font-black leading-tight tracking-[-0.035em] sm:text-6xl">{title}</h2>
        <p className="sr-only">{summary}</p>
        <div className="mt-7 rounded-[1.5rem] border border-[#3fbf75]/25 bg-[#3fbf75]/12 p-5">
          <p className="text-sm font-black text-[#bcf7d0]">You can now</p>
          <p className="mt-2 text-2xl font-black">{ability}</p>
        </div>
        {children}
        <button
          type="button"
          onClick={onReplay}
          aria-label="Replay mission"
          className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:border-white/20 hover:text-white/70"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Replay mission</span>
        </button>
      </div>
      {side}
    </div>
  );
}

export function Module1NextMissionCard({ currentMissionId }: { currentMissionId: Module1MissionId }) {
  const currentIndex = module1MissionCards.findIndex((mission) => mission.id === currentMissionId);
  const safeIndex = Math.max(currentIndex, 0);
  const currentMission = module1MissionCards[safeIndex];
  const nextMission = currentMission?.next;
  const opensModule2 = nextMission?.href.startsWith('/missions/module-2');
  const opensCheckpoint = nextMission?.href === '/missions/module-1/checkpoint';
  const nextHref = nextMission ? `${nextMission.href}${nextMission.href.includes('?') ? '&' : '?'}start=listen` : '/learn/2';
  const nextModule1Output = module1MissionCards[safeIndex + 1]?.output;
  const nextModule2Output = module2MissionCards[0]?.output ?? 'Ich heiße ...';
  const nextVisibleLine = opensModule2
    ? nextModule2Output
    : opensCheckpoint
      ? 'Module 1 checkpoint'
      : nextModule1Output ?? nextMission?.title ?? 'Ich heiße ...';

  return (
    <Link
      href={nextHref}
      className="block rounded-[1.55rem] border border-[#f1d27a]/20 bg-[#f1d27a]/10 p-4 transition hover:border-[#f1d27a]/45 hover:bg-[#f1d27a]/14 sm:p-5"
    >
      <p className="sr-only">Next mission: {nextMission?.title ?? 'Build your self-intro.'}</p>
      <h3 className="text-2xl font-black leading-tight">{nextVisibleLine}</h3>
      <p className="sr-only">
        {nextMission?.pull ?? 'Module 2 speaking opens next.'} {nextMission?.cta ?? 'Start Module 2 speaking.'}
        {opensModule2
          ? ' Opens the examiner audio directly.'
          : opensCheckpoint
            ? ' Opens the closed Module 1 checkpoint directly.'
            : ' Opens the next classroom audio directly.'}
      </p>
      <span className="mt-4 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#f1d27a] px-5 text-sm font-black text-[#162416] shadow-lg shadow-[#f1d27a]/15">
        Listen
      </span>
    </Link>
  );
}

export function Module1SequenceStatus({ currentMissionId }: { currentMissionId: Module1MissionId }) {
  const currentIndex = module1MissionCards.findIndex((mission) => mission.id === currentMissionId);
  const currentMission = module1MissionCards[Math.max(currentIndex, 0)];
  const nextMission = currentMission?.next;
  const [completedMissionIds, setCompletedMissionIds] = useState<Module1MissionId[]>([]);

  useEffect(() => {
    const refreshCompletedMissions = () => setCompletedMissionIds(readCompletedModule1Missions());
    refreshCompletedMissions();
    window.addEventListener('module1-mission-completed', refreshCompletedMissions);
    window.addEventListener('storage', refreshCompletedMissions);
    return () => {
      window.removeEventListener('module1-mission-completed', refreshCompletedMissions);
      window.removeEventListener('storage', refreshCompletedMissions);
    };
  }, []);

  const completedMissionSet = new Set(completedMissionIds);
  const currentAlreadyCounted = completedMissionSet.has(currentMissionId);
  const visibleCompletedCount = Math.min(
    module1MissionCards.length,
    completedMissionIds.length + (currentAlreadyCounted ? 0 : 1)
  );

  return (
    <div className="mt-6 rounded-[1.5rem] border border-white/12 bg-black/18 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-[#f1d27a]">Classroom wins</p>
          <p className="sr-only">Four classroom survival wins before Module 2 speaking.</p>
        </div>
        <p className="rounded-full border border-[#3fbf75]/25 bg-[#3fbf75]/12 px-3 py-1 text-sm font-black text-[#bcf7d0]">
          {visibleCompletedCount}/{module1MissionCards.length} done
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2" aria-label="Module 1 compact win progress">
        {module1MissionCards.map((mission, index) => {
          const active = index === currentIndex;
          const storedDone = completedMissionSet.has(mission.id);
          const done = storedDone || active;
          const status = active ? 'current win' : storedDone ? 'completed' : 'not done';
          return (
            <Link
              key={mission.id}
              href={mission.href}
              aria-label={`${mission.missionNumber}: ${mission.output} — ${status}`}
              className={clsx(
                'flex h-8 w-8 items-center justify-center rounded-full border transition',
                active
                  ? 'border-[#f1d27a]/55 bg-[#f1d27a]/14 text-white shadow-lg shadow-[#f1d27a]/10'
                  : done
                    ? 'border-[#3fbf75]/25 bg-[#3fbf75]/10 text-white/82 hover:bg-[#3fbf75]/14'
                    : 'border-white/10 bg-white/[0.045] text-white/45 hover:bg-white/[0.07]'
              )}
            >
              {(active || storedDone) ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />}
            </Link>
          );
        })}
      </div>
      <p className="sr-only">
        {nextMission ? nextMission.title : 'Module 2 opens from the card on the right.'}
      </p>
    </div>
  );
}

export function Module2SequenceStatus({ currentMissionId }: { currentMissionId: Module2MissionId }) {
  const currentIndex = module2MissionCards.findIndex((mission) => mission.id === currentMissionId);
  const currentMission = module2MissionCards[currentIndex];
  const nextMission = currentMission?.next;
  const [completedMissionIds, setCompletedMissionIds] = useState<Module2MissionId[]>([]);

  useEffect(() => {
    const refreshCompletedMissions = () => setCompletedMissionIds(readCompletedModule2Missions());
    refreshCompletedMissions();
    window.addEventListener('module2-mission-completed', refreshCompletedMissions);
    window.addEventListener('storage', refreshCompletedMissions);
    return () => {
      window.removeEventListener('module2-mission-completed', refreshCompletedMissions);
      window.removeEventListener('storage', refreshCompletedMissions);
    };
  }, []);

  const completedMissionSet = new Set(completedMissionIds);
  const currentAlreadyCounted = completedMissionSet.has(currentMissionId);
  const visibleCompletedCount = Math.min(
    module2MissionCards.length,
    completedMissionIds.length + (currentAlreadyCounted ? 0 : 1)
  );

  return (
    <div className="mt-6 rounded-[1.5rem] border border-white/12 bg-black/18 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-[#f1d27a]">Speaking wins</p>
          <p className="sr-only">One guided speaking arc, not five loose pages.</p>
        </div>
        <p className="rounded-full border border-[#3fbf75]/25 bg-[#3fbf75]/12 px-3 py-1 text-sm font-black text-[#bcf7d0]">
          {visibleCompletedCount}/5 done
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2" aria-label="Module 2 compact win progress">
        {module2MissionCards.map((mission, index) => {
          const active = index === currentIndex;
          const storedDone = completedMissionSet.has(mission.id);
          const done = storedDone || active;
          const status = active ? 'current win' : storedDone ? 'completed' : 'not done';
          return (
            <Link
              key={mission.id}
              href={mission.href}
              aria-label={`${mission.missionNumber}: ${mission.output} — ${status}`}
              className={clsx(
                'flex h-8 w-8 items-center justify-center rounded-full border transition',
                active
                  ? 'border-[#f1d27a]/55 bg-[#f1d27a]/14 text-white shadow-lg shadow-[#f1d27a]/10'
                  : done
                    ? 'border-[#3fbf75]/25 bg-[#3fbf75]/10 text-white/82 hover:bg-[#3fbf75]/14'
                    : 'border-white/10 bg-white/[0.045] text-white/45 hover:bg-white/[0.07]'
              )}
            >
              {(active || storedDone) ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />}
            </Link>
          );
        })}
      </div>

      <p className="sr-only">
        {nextMission ? nextMission.title : 'Module 2 complete. Review from the landing page.'}
      </p>
    </div>
  );
}
