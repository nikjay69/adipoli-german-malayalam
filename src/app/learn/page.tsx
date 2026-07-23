'use client';

// Today is the learner's only home: one recommended action, with quiet
// evidence underneath. The composition follows the approved C3 state family.

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  RotateCcw,
} from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { getDueCount } from '@/lib/srs';
import { readCompletedModule1Missions, type Module1MissionId } from '@/lib/missions/module1';
import { type Module2MissionId } from '@/lib/missions/module2';
import { readCompletedModule2Missions } from '@/app/missions/module-2/_components/MissionUI';
import {
  getActiveRecovery,
  getNextBlock,
  getSkillReadiness,
  getSpineModules,
  readModule1CheckpointResult,
  type ActiveRecovery,
  type Module1CheckpointStored,
  type NextBlock,
  type SpineInputs,
} from '@/lib/spine';
import { buildTodayState, type TodayStateKind } from '@/lib/today-state';
import styles from './Today.module.css';

const SKILL_LABELS: Array<{ key: 'hoeren' | 'sprechen' | 'lesen' | 'schreiben'; label: string }> = [
  { key: 'hoeren', label: 'Hören' },
  { key: 'sprechen', label: 'Sprechen' },
  { key: 'lesen', label: 'Lesen' },
  { key: 'schreiben', label: 'Schreiben' },
];

const MODULE_SCENES: Record<number, { src: string; position: string }> = {
  1: { src: '/images/scenes/hub-goethe-kochi-classroom.jpg', position: 'center 30%' },
  2: { src: '/images/scenes/hub-study-desk.jpg', position: 'center 42%' },
  3: { src: '/images/scenes/hub-thrissur-home.jpg', position: 'center 55%' },
  4: { src: '/images/scenes/hub-chayakkada.jpg', position: 'center 58%' },
  5: { src: '/images/scenes/hub-dream-platform.jpg', position: 'center 45%' },
  6: { src: '/images/scenes/hub-video-call-wg.jpg', position: 'center 50%' },
  7: { src: '/images/scenes/hub-amt-office.jpg', position: 'center 45%' },
  8: { src: '/images/scenes/hub-exam-hall.jpg', position: 'center 42%' },
};

const TODAY_PREVIEW_STATES: TodayStateKind[] = [
  'fresh',
  'active',
  'review-due',
  'recovery',
  'checkpoint',
  'returning',
  'complete',
];

const PREVIEW_RECOVERY: ActiveRecovery = {
  moduleId: 1,
  state: 'FAIL',
  title: 'Greeting + adult register',
  mustDo: ['Say the greeting aloud · 3 min', 'Repair du vs. Sie · 3 min'],
  timeBoxMinutes: 6,
  libraryHref: '/practice/speak',
  libraryLabel: 'Start speaking repair',
  retestHref: '/missions/module-1/checkpoint',
};

export default function TodayPage() {
  const { userProgress, updateStreak } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [previousActiveDate, setPreviousActiveDate] = useState('');
  const [visitTimestamp, setVisitTimestamp] = useState(0);
  const [previewKind, setPreviewKind] = useState<TodayStateKind | null>(null);
  const [m1Missions, setM1Missions] = useState<Module1MissionId[]>([]);
  const [m2Missions, setM2Missions] = useState<Module2MissionId[]>([]);
  const [m1Checkpoint, setM1Checkpoint] = useState<Module1CheckpointStored | null>(null);

  useEffect(() => {
    const refresh = () => {
      setM1Missions(readCompletedModule1Missions());
      setM2Missions(readCompletedModule2Missions());
      setM1Checkpoint(readModule1CheckpointResult());
    };
    const timer = window.setTimeout(() => {
      setPreviousActiveDate(useGameStore.getState().userProgress.lastActiveDate);
      setVisitTimestamp(Date.now());
      if (process.env.NODE_ENV === 'development') {
        const requestedState = new URLSearchParams(window.location.search).get('todayState') as TodayStateKind | null;
        setPreviewKind(requestedState && TODAY_PREVIEW_STATES.includes(requestedState) ? requestedState : null);
      }
      refresh();
      setMounted(true);
      updateStreak();
    }, 0);
    window.addEventListener('module1-mission-completed', refresh);
    window.addEventListener('module2-mission-completed', refresh);
    window.addEventListener('module1-checkpoint-scored', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('module1-mission-completed', refresh);
      window.removeEventListener('module2-mission-completed', refresh);
      window.removeEventListener('module1-checkpoint-scored', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [updateStreak]);

  const inputs: SpineInputs = useMemo(() => ({
    completedLessons: userProgress.completedLessons,
    spineCheckpoints: userProgress.spineCheckpoints || {},
    module1MissionIds: m1Missions,
    module2MissionIds: m2Missions,
    module1Checkpoint: m1Checkpoint,
    mockResults: userProgress.mockResults || {},
  }), [
    userProgress.completedLessons,
    userProgress.spineCheckpoints,
    userProgress.mockResults,
    m1Missions,
    m2Missions,
    m1Checkpoint,
  ]);

  const spineModules = useMemo(() => (mounted ? getSpineModules(inputs) : []), [mounted, inputs]);
  const next = useMemo(() => getNextBlock(spineModules), [spineModules]);
  const recovery = useMemo(() => (mounted ? getActiveRecovery(inputs) : null), [mounted, inputs]);
  const skills = useMemo(() => getSkillReadiness(inputs), [inputs]);
  const dueCards = mounted ? getDueCount(userProgress.srsCards || {}) : 0;
  const completeCount = spineModules.filter((module) => module.status === 'complete').length;
  const hasLearningEvidence = (
    m1Missions.length
    + m2Missions.length
    + userProgress.completedLessons.length
    + Object.keys(userProgress.spineCheckpoints || {}).length
    + Object.keys(userProgress.mockResults || {}).length
    + (m1Checkpoint ? 1 : 0)
  ) > 0;
  let stateNext = next;
  let stateRecovery = recovery;
  let stateDueCards = dueCards;
  let stateHasLearningEvidence = hasLearningEvidence;
  let stateLastActiveDate = previousActiveDate;
  let stateCompleteCount = completeCount;
  const visitDate = new Date(visitTimestamp);

  if (previewKind && next) {
    stateRecovery = previewKind === 'recovery' ? PREVIEW_RECOVERY : null;
    stateDueCards = previewKind === 'review-due' ? 9 : previewKind === 'returning' ? 6 : 0;
    stateHasLearningEvidence = previewKind !== 'fresh';
    stateLastActiveDate = previewKind === 'returning'
      ? new Date(visitTimestamp - (6 * 86_400_000)).toDateString()
      : visitDate.toDateString();
    if (previewKind === 'checkpoint') {
      stateNext = {
        module: next.module,
        block: {
          id: `preview-checkpoint-${next.module.id}`,
          kind: 'checkpoint',
          title: `Module ${next.module.id} checkpoint`,
          href: next.module.checkpointHref,
          duration: '20 min',
          done: false,
        },
      } satisfies NextBlock;
    }
    if (previewKind === 'complete') {
      stateNext = null;
      stateCompleteCount = 8;
    }
  }

  const activeModule = stateNext?.module ?? spineModules[spineModules.length - 1];
  const todayState = buildTodayState({
    next: stateNext,
    recovery: stateRecovery,
    dueCards: stateDueCards,
    hasLearningEvidence: stateHasLearningEvidence,
    lastActiveDate: stateLastActiveDate,
    now: visitDate,
  });
  const sceneModuleId = stateRecovery?.moduleId ?? activeModule?.id ?? 8;
  const scene = todayState.kind === 'checkpoint' || todayState.kind === 'complete'
    ? MODULE_SCENES[8]
    : todayState.kind === 'review-due'
      ? MODULE_SCENES[2]
      : MODULE_SCENES[sceneModuleId] ?? MODULE_SCENES[1];
  const showScene = todayState.kind !== 'recovery';
  const hasSkillEvidence = SKILL_LABELS.some(({ key }) => skills[key] > 0);
  const requiredDone = activeModule?.requiredBlocksDone ?? 0;
  const requiredTotal = activeModule?.requiredBlocksTotal ?? 0;

  if (!mounted) {
    return (
      <main id="main-content" className={`ag-foundation-shell ag-daylight ${styles.page}`}>
        <div className={`ag-container ${styles.loading}`} aria-label="Loading Today">
          <div />
          <div />
          <div />
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className={`ag-foundation-shell ag-daylight ${styles.page}`} data-today-state={todayState.kind}>
      <div className={`ag-container ${styles.shell}`}>
        <header className={styles.intro}>
          <p className={styles.kicker}>{todayState.kicker}</p>
          <h1>{todayState.heading}</h1>
        </header>

        <section className={styles.door} aria-labelledby="today-door-title" data-state={todayState.kind}>
          {showScene ? (
            <Image
              src={scene.src}
              alt=""
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 40px), 560px"
              style={{ objectFit: 'cover', objectPosition: scene.position }}
            />
          ) : null}
          <div className={styles.doorVeil} aria-hidden="true" />
          <span className={styles.moduleNumber} aria-hidden="true">{sceneModuleId}</span>
          <div className={styles.doorContent}>
            <p className={styles.doorLabel}>
              {todayState.kind === 'recovery' ? <RotateCcw aria-hidden="true" /> : <Clock3 aria-hidden="true" />}
              {todayState.doorLabel}
            </p>
            <h2 id="today-door-title">{todayState.doorTitle}</h2>
            <p>{todayState.doorDescription}</p>
            {todayState.kind === 'recovery' && stateRecovery ? (
              <ol className={styles.recoveryTasks}>
                {stateRecovery.mustDo.slice(0, 3).map((task) => <li key={task}>{task}</li>)}
              </ol>
            ) : null}
            <Link href={todayState.primaryHref} className={styles.primaryAction}>
              {todayState.primaryLabel} <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <div className={styles.supporting}>
          {todayState.kind === 'fresh' && userProgress.hasSeenIntro ? (
            <p className={styles.firstWin}>
              <CheckCircle2 aria-hidden="true" />
              Your first greeting is saved. This mission completes the classroom exchange.
            </p>
          ) : null}

          {todayState.secondaryHref && todayState.secondaryLabel ? (
            <Link href={todayState.secondaryHref} className={styles.secondaryAction}>
              <span>{todayState.secondaryLabel}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : null}

          {stateDueCards > 0 && !['review-due', 'returning'].includes(todayState.kind) ? (
            <Link href="/practice/review" className={styles.reviewRow} data-testid="today-srs-card">
              <Brain aria-hidden="true" />
              <span>
                <strong>Review due · 5 min</strong>
                <small>{stateDueCards} {stateDueCards === 1 ? 'card' : 'cards'}, weakest first</small>
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        <section className={styles.skills} aria-labelledby="today-skills-title" data-testid="today-skill-bars">
          <div className={styles.sectionHeading}>
            <h2 id="today-skills-title">Four skills</h2>
            <Link href="/practice">Practice one</Link>
          </div>
          <div className={styles.skillGrid}>
            {SKILL_LABELS.map(({ key, label }) => (
              <div className={styles.skill} key={key}>
                <div>
                  <span>{label}</span>
                  <strong>{skills[key]}</strong>
                </div>
                <span
                  className={styles.skillTrack}
                  role="progressbar"
                  aria-label={`${label} readiness`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={skills[key]}
                >
                  <span style={{ width: `${skills[key]}%` }} />
                </span>
              </div>
            ))}
          </div>
          <p>{hasSkillEvidence ? 'From checkpoint evidence, not clicks.' : 'Skill evidence appears after your first checkpoint.'}</p>
        </section>

        <section className={styles.route} aria-labelledby="today-route-title">
          <div className={styles.sectionHeading}>
            <h2 id="today-route-title">Your route</h2>
            <Link href="/course" className="ag-touch-target">Open Course</Link>
          </div>
          <div
            className={styles.routeTrack}
            data-has-complete={stateCompleteCount > 0}
            role="img"
            aria-label={`${stateCompleteCount} of 8 modules complete. ${activeModule ? `Module ${activeModule.id} is current.` : 'Course path complete.'}`}
          >
            <span className={styles.routeComplete} style={{ width: `${(stateCompleteCount / 8) * 100}%` }} />
            <span className={styles.routeStart}>
              {stateCompleteCount > 0 ? <CheckCircle2 aria-hidden="true" /> : <BookOpen aria-hidden="true" />}
              {stateCompleteCount}/8
            </span>
            <span className={styles.routeCurrent}>
              {activeModule ? `Module ${activeModule.id} · ${requiredDone}/${requiredTotal}` : 'All flags sealed'}
            </span>
            <span className={styles.routeEnd}>A1 →</span>
          </div>
        </section>
      </div>
    </main>
  );
}
