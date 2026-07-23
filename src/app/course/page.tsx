'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Eye,
  LockKeyhole,
  RotateCcw,
} from 'lucide-react';
import { type SpineModuleView } from '@/lib/spine';
import { useSpineProgress } from '@/lib/use-spine-progress';
import styles from './Course.module.css';

type ModuleState = 'complete' | 'current' | 'checkpoint' | 'recovery' | 'read-ahead';

function getModuleState(module: SpineModuleView, nextModuleId?: number, nextKind?: string): ModuleState {
  if (module.checkpointResult?.state === 'FAIL') return 'recovery';
  if (module.status === 'complete') return 'complete';
  if (module.id === nextModuleId && nextKind === 'checkpoint') return 'checkpoint';
  if (module.status === 'active') return 'current';
  return 'read-ahead';
}

function stateCopy(state: ModuleState, module: SpineModuleView, nextTitle?: string) {
  if (state === 'recovery') {
    return {
      label: 'Recovery required',
      detail: `${module.checkpointResult?.percent ?? 0}% · repair the weak tags`,
      Icon: RotateCcw,
    };
  }
  if (state === 'complete') {
    const isWeak = module.checkpointResult?.state === 'WEAK';
    return {
      label: isWeak ? 'Passed · recovery due' : 'Passed',
      detail: `${module.checkpointResult?.percent ?? 0}% · revisit anytime`,
      Icon: CheckCircle2,
    };
  }
  if (state === 'checkpoint') {
    return {
      label: 'Checkpoint ready',
      detail: 'All required blocks are done',
      Icon: Clock3,
    };
  }
  if (state === 'current') {
    return {
      label: 'Now',
      detail: nextTitle ?? `${module.requiredBlocksDone}/${module.requiredBlocksTotal} blocks done`,
      Icon: ArrowRight,
    };
  }
  return {
    label: 'Read ahead',
    detail: module.id === 8 ? 'Finale · after Module 7' : `${module.scene.label} · opens after Module ${module.id - 1}`,
    Icon: Eye,
  };
}

export default function CoursePage() {
  const { mounted, inputs, modules, next } = useSpineProgress();

  if (!mounted) {
    return (
      <main id="main-content" className={`ag-foundation-shell ag-daylight ${styles.page}`}>
        <div className={`ag-container ${styles.loading}`} aria-label="Loading Course">
          <div />
          <div />
          <div />
        </div>
      </main>
    );
  }

  const completeCount = modules.filter((module) => module.status === 'complete').length;
  const readyMocks = Object.values(inputs.mockResults).filter((result) => result.band === 'ready').length;
  const activeModule = next?.module ?? modules.find((module) => module.status === 'active') ?? modules[modules.length - 1];
  const activeModuleFraction = activeModule?.requiredBlocksTotal
    ? activeModule.requiredBlocksDone / activeModule.requiredBlocksTotal
    : 0;
  const routeUnits = completeCount === modules.length
    ? modules.length
    : completeCount + activeModuleFraction;
  const routePercent = 16 + (Math.min(routeUnits / modules.length, 1) * 84);

  return (
    <main id="main-content" className={`ag-foundation-shell ag-daylight ${styles.page}`}>
      <div className={`ag-container ${styles.shell}`}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Guided forward · open backward</p>
            <h1>Your route — eight flags.</h1>
          </div>
          <p className={styles.headerNote}>Peek ahead freely. Gates only block doing.</p>
        </header>

        <section className={styles.routeTrack} aria-label={`${completeCount} of 8 modules complete`}>
          <span className={styles.routeFill} style={{ width: `${routePercent}%` }} />
          <span className={styles.routeStart}>{completeCount > 0 ? `${completeCount} ✓` : 'START'}</span>
          <span className={styles.routeCurrent}>
            {activeModule ? `MODULE ${activeModule.id} · ${activeModule.requiredBlocksDone}/${activeModule.requiredBlocksTotal}` : 'COURSE COMPLETE'}
          </span>
          <span className={styles.routeEnd}>A1 →</span>
        </section>

        <section className={styles.moduleGrid} aria-label="Eight-module A1 course">
          {modules.map((module) => {
            const isNextModule = next?.module.id === module.id;
            const state = getModuleState(module, next?.module.id, next?.block.kind);
            const copy = stateCopy(state, module, isNextModule ? next?.block.title : undefined);
            const StateIcon = copy.Icon;
            const isFinale = module.id === 8;

            return (
              <article
                key={module.id}
                className={styles.moduleCard}
                data-state={state}
                data-finale={isFinale || undefined}
                style={{ '--module-accent': module.color } as React.CSSProperties}
              >
                <Link
                  href={`/course/${module.id}`}
                  className={`${styles.moduleIdentity} ag-touch-target`}
                  aria-label={`Open Module ${module.id}: ${module.title}${state === 'read-ahead' ? ' in read-ahead mode' : ''}`}
                >
                  <span className={styles.scene}>
                    <Image
                      src={module.scene.src}
                      alt=""
                      fill
                      loading="eager"
                      sizes="(max-width: 767px) 56px, 220px"
                      style={{ objectFit: 'cover', objectPosition: module.scene.position }}
                    />
                    <span className={styles.sceneVeil} aria-hidden="true" />
                    <strong className={styles.moduleNumber}>{module.id}</strong>
                    <span className={styles.stateChip} data-state={state}>
                      <StateIcon aria-hidden="true" />
                      {copy.label}
                    </span>
                  </span>

                  <span className={styles.moduleCopy}>
                    <strong>{module.title}</strong>
                    <small>{copy.detail}</small>
                  </span>
                </Link>

                {isNextModule && next ? (
                  <Link href={next.block.href} className={styles.continueAction}>
                    <span>Continue</span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                ) : state === 'complete' ? (
                  <span className={styles.cardAction}>
                    Revisit <ArrowRight aria-hidden="true" />
                  </span>
                ) : state === 'read-ahead' ? (
                  <span className={styles.cardAction}>
                    Read <Eye aria-hidden="true" />
                  </span>
                ) : state === 'recovery' ? (
                  <span className={styles.cardAction} data-recovery>
                    Repair <RotateCcw aria-hidden="true" />
                  </span>
                ) : (
                  <span className={styles.cardAction}>
                    <LockKeyhole aria-hidden="true" /> After gate
                  </span>
                )}
              </article>
            );
          })}
        </section>

        <section className={styles.readiness} aria-label="A1 readiness evidence">
          <div>
            <strong>{completeCount}/8</strong>
            <span>checkpoints passed</span>
          </div>
          <div>
            <strong>{Math.min(readyMocks, 2)}/2</strong>
            <span>timed mocks at 75%+</span>
          </div>
          <div>
            <strong>{activeModule ? `M${activeModule.id}` : <Check aria-hidden="true" />}</strong>
            <span>{activeModule ? 'current module' : 'route complete'}</span>
          </div>
        </section>

        <p className={styles.bridgeNote}>
          A1+ bridge: weil/dass, reflexive verbs, and dative depth — clearly after your exam.
        </p>
      </div>
    </main>
  );
}
