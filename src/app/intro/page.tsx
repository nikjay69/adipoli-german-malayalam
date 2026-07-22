'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Headphones, Volume2 } from 'lucide-react';
import { BrandLockup } from '@/components/brand';
import { FrauFischer } from '@/components/character/FrauFischer';
import { useGameStore } from '@/lib/store';
import styles from '../PublicBoundary.module.css';

const FIRST_LINE_AUDIO = '/audio/tts/v1-3-1/v1-3-1-line-0.mp3';
const STAGES = ['hear', 'say', 'repair', 'win'] as const;
type Stage = (typeof STAGES)[number];

const STAGE_LABELS: Record<Stage, string> = {
  hear: 'Hear',
  say: 'Say',
  repair: 'Repair',
  win: 'Win',
};

export default function IntroPage() {
  const router = useRouter();
  const { markIntroSeen, setJourneyLocation } = useGameStore();
  const [stage, setStage] = useState<Stage>('hear');
  const [audioState, setAudioState] = useState<'ready' | 'playing' | 'error'>('ready');
  const [repairChoice, setRepairChoice] = useState<'wrong' | 'correct' | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [stage]);

  const playLine = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.currentTime = 0;
      setAudioState('playing');
      await audio.play();
    } catch {
      setAudioState('error');
    }
  }, []);

  const finishFirstMoment = useCallback(() => {
    markIntroSeen();
    setJourneyLocation('onboarding');
    router.push('/onboarding?from=first-moment');
  }, [markIntroSeen, router, setJourneyLocation]);

  const stepIndex = STAGES.indexOf(stage);

  return (
    <main id="main-content" className={`ag-foundation-shell ag-room ${styles.firstMoment}`}>
      <audio
        ref={audioRef}
        src={FIRST_LINE_AUDIO}
        preload="auto"
        onEnded={() => {
          setAudioState('ready');
          setStage('say');
        }}
        onError={() => setAudioState('error')}
      />

      <div className={`ag-container ${styles.momentInner}`}>
        <header className={styles.momentHeader}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft aria-hidden="true" /> Home
          </Link>
          <BrandLockup variant="horizontal" surface="dark" />
          <span className={styles.stageCount}>{stepIndex + 1} / {STAGES.length}</span>
        </header>

        <ol className={styles.progress} aria-label="First German moment progress">
          {STAGES.map((item, index) => (
            <li key={item} data-active={item === stage} data-complete={index < stepIndex}>
              <span>{index < stepIndex ? <Check aria-hidden="true" /> : index + 1}</span>
              <span>{STAGE_LABELS[item]}</span>
            </li>
          ))}
        </ol>

        <section className={styles.momentCard} aria-live="polite">
          <div className={styles.momentScene}>
            <div className={styles.momentSceneCopy}>
              <p className="ag-label">Kochi · Morning class</p>
              <p>Frau Fischer looks up as you enter.</p>
            </div>
            <FrauFischer
              mood={stage === 'win' ? 'pleased' : stage === 'repair' ? 'teaching' : 'greeting'}
              animate={false}
              className={styles.momentTeacher}
            />
          </div>

          <div className={`ag-answer-sheet ${styles.taskSheet}`}>
            {stage === 'hear' ? (
              <>
                <p className="ag-label">01 · Hear it</p>
                <h1 ref={headingRef} tabIndex={-1} className="ag-heading">Listen before you read.</h1>
                <p className="ag-muted">Hear how Frau Fischer greets you. The next step opens when the line ends.</p>
                <button type="button" className={`ag-action ${styles.listenButton}`} onClick={playLine} disabled={audioState === 'playing'}>
                  {audioState === 'playing' ? <Volume2 className="ag-icon" aria-hidden="true" /> : <Headphones className="ag-icon" aria-hidden="true" />}
                  {audioState === 'playing' ? 'Listening…' : 'Play the greeting'}
                </button>
                {audioState === 'error' ? (
                  <p className={styles.errorText} role="alert">The audio did not start. Check your sound and try again.</p>
                ) : null}
              </>
            ) : null}

            {stage === 'say' ? (
              <>
                <p className="ag-label">02 · Say it</p>
                <h1 ref={headingRef} tabIndex={-1} className="ag-heading">Now greet her aloud.</h1>
                <div className={styles.germanPrompt}>
                  <span>Say</span>
                  <strong lang="de">Guten Morgen, Frau Fischer.</strong>
                </div>
                <p className="ag-muted">Your voice stays with you—we only need your honest tap.</p>
                <button type="button" className="ag-action" onClick={() => setStage('repair')}>
                  I said it aloud <ArrowRight className="ag-icon" aria-hidden="true" />
                </button>
              </>
            ) : null}

            {stage === 'repair' ? (
              <>
                <p className="ag-label">03 · Repair it</p>
                <h1 ref={headingRef} tabIndex={-1} className="ag-heading">Which greeting is complete?</h1>
                <p className="ag-muted">One ending is missing. Choose the line you heard.</p>
                <div className={styles.repairChoices}>
                  <button
                    type="button"
                    data-selected={repairChoice === 'wrong'}
                    onClick={() => setRepairChoice('wrong')}
                  >
                    <span>A</span><strong lang="de">Gute Morgen.</strong>
                  </button>
                  <button
                    type="button"
                    data-selected={repairChoice === 'correct'}
                    data-correct={repairChoice === 'correct'}
                    onClick={() => setRepairChoice('correct')}
                  >
                    <span>B</span><strong lang="de">Guten Morgen.</strong>
                  </button>
                </div>
                {repairChoice === 'wrong' ? (
                  <p className={styles.repairFeedback} data-tone="recovery">
                    Almost. <strong lang="de">Morgen</strong> needs <strong lang="de">guten</strong> here. Try once more.
                  </p>
                ) : null}
                {repairChoice === 'correct' ? (
                  <div className={styles.repairSuccess}>
                    <p className={styles.repairFeedback} data-tone="success">
                      Exactly: <strong lang="de">Guten Morgen.</strong>
                    </p>
                    <button type="button" className="ag-action" onClick={() => setStage('win')}>
                      See your first win <ArrowRight className="ag-icon" aria-hidden="true" />
                    </button>
                  </div>
                ) : null}
              </>
            ) : null}

            {stage === 'win' ? (
              <>
                <div className={styles.winMark}><Check aria-hidden="true" /></div>
                <p className="ag-label">04 · First win</p>
                <h1 ref={headingRef} tabIndex={-1} className="ag-heading">You can greet a German teacher.</h1>
                <p>
                  You heard the line, said it, found the missing ending, and repaired it.
                </p>
                <button type="button" className="ag-action" onClick={finishFirstMoment}>
                  Build my learning plan <ArrowRight className="ag-icon" aria-hidden="true" />
                </button>
                <Link href="/" className={styles.quietLink}>Return home</Link>
              </>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
