'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  Eye,
  Headphones,
  LockKeyhole,
  Mic2,
  Play,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { type SpineBlock, type SpineModuleView } from '@/lib/spine';
import { useSpineProgress } from '@/lib/use-spine-progress';
import styles from './ModulePage.module.css';

type ModulePageState = 'complete' | 'current' | 'checkpoint' | 'recovery' | 'read-ahead';

function getPageState(spineModule: SpineModuleView, nextBlock?: SpineBlock): ModulePageState {
  if (spineModule.checkpointResult?.state === 'FAIL') return 'recovery';
  if (spineModule.status === 'complete') return 'complete';
  if (nextBlock?.kind === 'checkpoint') return 'checkpoint';
  if (spineModule.status === 'active') return 'current';
  return 'read-ahead';
}

function stateLabel(state: ModulePageState, spineModule: SpineModuleView) {
  if (state === 'recovery') return `Recovery required · ${spineModule.checkpointResult?.percent ?? 0}%`;
  if (state === 'complete') {
    return spineModule.checkpointResult?.state === 'WEAK'
      ? `Passed · ${spineModule.checkpointResult.percent}% · recovery due`
      : `Passed · ${spineModule.checkpointResult?.percent ?? 0}%`;
  }
  if (state === 'checkpoint') return 'Checkpoint ready';
  if (state === 'current') return 'Current module';
  return `Read ahead · opens after Module ${spineModule.id - 1}`;
}

function blockIcon(kind: SpineBlock['kind']) {
  if (kind === 'checkpoint') return ShieldCheck;
  if (kind === 'mock') return Clock3;
  if (kind === 'mission') return Mic2;
  return Play;
}

function blockDescription(block: SpineBlock) {
  const duration = block.duration ? ` · ${block.duration}` : '';
  if (block.kind === 'checkpoint') return `Closed diagnostic${duration}`;
  if (block.kind === 'mock') return `Timed exam gate${duration}`;
  if (block.kind === 'mission') return `Listen · respond · repair${duration}`;
  return `Video lesson + practice${duration}`;
}

export default function SpineModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId: rawModuleId } = use(params);
  const moduleId = Number(rawModuleId);
  const { mounted, modules, next, recovery } = useSpineProgress();

  if (!mounted) {
    return (
      <main id="main-content" className={`ag-foundation-shell ag-daylight ${styles.page}`}>
        <div className={styles.loading} aria-label="Loading module">
          <div />
          <div />
        </div>
      </main>
    );
  }

  const spineModule = modules.find((candidate) => candidate.id === moduleId);
  if (!spineModule) {
    return (
      <main id="main-content" className={`ag-foundation-shell ag-daylight ${styles.notFound}`}>
        <p className={styles.eyebrow}>Course</p>
        <h1>That module is not on this route.</h1>
        <Link href="/course" className={styles.primaryAction}>
          Back to eight modules <ArrowRight aria-hidden="true" />
        </Link>
      </main>
    );
  }

  const isNextModule = next?.module.id === spineModule.id;
  const nextBlock = isNextModule ? next?.block : undefined;
  const pageState = getPageState(spineModule, nextBlock);
  const isReadAhead = pageState === 'read-ahead';
  const isRecovery = pageState === 'recovery';
  const isComplete = pageState === 'complete';
  const moduleRecovery = recovery?.moduleId === spineModule.id ? recovery : null;
  const openBlock = isRecovery ? undefined : nextBlock;
  return (
    <main
      id="main-content"
      className={`ag-foundation-shell ag-daylight ${styles.page}`}
      data-module-state={pageState}
      style={{ '--module-accent': spineModule.color } as React.CSSProperties}
    >
      <header className={styles.hero} data-finale={spineModule.id === 8 || undefined}>
        <Image
          src={spineModule.scene.src}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: spineModule.scene.position }}
        />
        <span className={styles.heroVeil} aria-hidden="true" />
        <Link href="/course" className={`${styles.backLink} ag-touch-target`}>
          <ArrowLeft aria-hidden="true" /> Course
        </Link>
        <strong className={styles.heroNumber} aria-hidden="true">{spineModule.id}</strong>

        <div className={`ag-container ${styles.heroContent}`}>
          <p className={styles.sceneLabel}>Module {spineModule.id} · {spineModule.scene.label}</p>
          <h1>{spineModule.title}</h1>
          <p className={styles.promise}>{spineModule.promise}</p>
          <div className={styles.heroMeta}>
            <span>Milestone · {spineModule.milestone}</span>
            <span data-state={pageState}>
              {pageState === 'complete' ? <CheckCircle2 aria-hidden="true" /> : null}
              {pageState === 'recovery' ? <RotateCcw aria-hidden="true" /> : null}
              {pageState === 'read-ahead' ? <Eye aria-hidden="true" /> : null}
              {pageState === 'checkpoint' ? <ShieldCheck aria-hidden="true" /> : null}
              {pageState === 'current' ? <Circle aria-hidden="true" /> : null}
              {stateLabel(pageState, spineModule)}
            </span>
          </div>
        </div>
      </header>

      <div className={`ag-container ${styles.workingArea}`}>
        <section className={styles.path} aria-labelledby="module-path-title">
          <div className={styles.pathHeading}>
            <div>
              <p className={styles.eyebrow}>The path</p>
              <h2 id="module-path-title">
                {spineModule.requiredBlocksDone} of {spineModule.requiredBlocksTotal} required blocks done
              </h2>
            </div>
            <p>
              {isReadAhead
                ? 'Titles stay readable. The gate blocks doing, not curiosity.'
                : 'Everything completed stays open to revisit.'}
            </p>
          </div>

          {isRecovery && moduleRecovery ? (
            <section className={styles.recoveryPanel} aria-labelledby="module-recovery-title">
              <span className={styles.recoveryIcon}><RotateCcw aria-hidden="true" /></span>
              <div>
                <p className={styles.eyebrow}>Recovery required · about {moduleRecovery.timeBoxMinutes} min</p>
                <h2 id="module-recovery-title">{moduleRecovery.title}</h2>
                <ol>
                  {moduleRecovery.mustDo.slice(0, 3).map((task) => <li key={task}>{task}</li>)}
                </ol>
              </div>
              <Link href={moduleRecovery.libraryHref ?? moduleRecovery.retestHref} className={styles.recoveryAction}>
                Start repair <ArrowRight aria-hidden="true" />
              </Link>
            </section>
          ) : null}

          <div className={styles.blockList}>
            {spineModule.blocks.map((block, index) => {
              const Icon = blockIcon(block.kind);
              const isNext = !isRecovery && openBlock?.id === block.id;
              const canOpen = block.done || isNext || (isComplete && block.kind === 'checkpoint');
              const isFuture = !block.done && !isNext;
              const isGate = block.kind === 'checkpoint' || block.kind === 'mock';

              const content = (
                <>
                  <span className={styles.blockState} data-done={block.done || undefined} data-next={isNext || undefined}>
                    {block.done ? <Check aria-hidden="true" /> : isNext ? <Circle aria-hidden="true" /> : <Icon aria-hidden="true" />}
                  </span>
                  <span className={styles.blockCopy}>
                    <strong>{index + 1} · {block.title}</strong>
                    <small>
                      {block.done ? `${blockDescription(block)} · done` : blockDescription(block)}
                    </small>
                  </span>
                  <span className={styles.blockAction}>
                    {block.done ? (
                      <>Redo <ArrowRight aria-hidden="true" /></>
                    ) : isNext ? (
                      <>Continue <ArrowRight aria-hidden="true" /></>
                    ) : isReadAhead ? (
                      <><Eye aria-hidden="true" /> Read only</>
                    ) : isRecovery ? (
                      <><RotateCcw aria-hidden="true" /> After repair</>
                    ) : (
                      <><LockKeyhole aria-hidden="true" /> After block {Math.max(1, index)}</>
                    )}
                  </span>
                </>
              );

              return canOpen ? (
                <Link
                  key={block.id}
                  href={block.href}
                  className={styles.block}
                  data-next={isNext || undefined}
                  data-done={block.done || undefined}
                  data-gate={isGate || undefined}
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={block.id}
                  className={styles.block}
                  data-future={isFuture || undefined}
                  data-gate={isGate || undefined}
                  aria-disabled="true"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </section>

        <aside className={styles.aside} aria-label="Module context">
          <section className={styles.whyCard}>
            <p className={styles.eyebrow}>Why this module</p>
            <p>{spineModule.examTransfer}</p>
          </section>

          <section className={styles.evidenceCard}>
            <p className={styles.eyebrow}>Module evidence</p>
            <div>
              <span><CheckCircle2 aria-hidden="true" /></span>
              <p><strong>{spineModule.requiredBlocksDone}/{spineModule.requiredBlocksTotal} required blocks</strong><small>Watching alone never seals the outcome.</small></p>
            </div>
            <div>
              <span><ShieldCheck aria-hidden="true" /></span>
              <p><strong>{isComplete ? 'Checkpoint recorded' : 'Closed checkpoint ahead'}</strong><small>Weaknesses return as exact repair work.</small></p>
            </div>
            <div>
              <span><Headphones aria-hidden="true" /></span>
              <p><strong>Completed work stays open</strong><small>Replay any finished lesson without changing progress.</small></p>
            </div>
          </section>

          <Link href="/course" className={styles.allModulesLink}>
            See all eight flags <ArrowRight aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </main>
  );
}
