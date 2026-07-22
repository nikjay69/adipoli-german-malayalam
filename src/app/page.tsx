import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowRight, Headphones, Mic2, Play, RotateCcw } from 'lucide-react';
import { BrandLockup } from '@/components/brand';
import { FrauFischer } from '@/components/character/FrauFischer';
import { SPINE_MODULES } from '@/lib/spine';
import styles from './PublicBoundary.module.css';

const METHOD_STEPS = [
  {
    number: '01',
    label: 'Watch',
    title: 'Owner-taught video in Manglish.',
    copy: 'See the idea, the trap, and the useful German line.',
  },
  {
    number: '02',
    label: 'Stand in the scene',
    title: 'Listen, speak, read, write.',
    copy: 'Practise inside real situations with native German audio.',
  },
  {
    number: '03',
    label: 'Prove it',
    title: 'Closed checkpoints. Exact recovery.',
    copy: 'Repair the part that slipped, then prove it with a fresh attempt.',
  },
] as const;

const MODULE_VISUALS = [
  { scene: '/images/scenes/hub-goethe-kochi-classroom.jpg', place: 'The classroom', accent: '#e94560', position: 'center 30%' },
  { scene: '/images/scenes/hub-study-desk.jpg', place: 'The study desk', accent: '#b2467f', position: 'center 40%' },
  { scene: '/images/scenes/hub-thrissur-home.jpg', place: 'The home', accent: '#7a8b2f', position: 'center 55%' },
  { scene: '/images/scenes/hub-chayakkada.jpg', place: 'The chayakkada', accent: '#f97316', position: 'center 58%' },
  { scene: '/images/scenes/hub-dream-platform.jpg', place: 'The platform', accent: '#3b82f6', position: 'center 45%' },
  { scene: '/images/scenes/hub-video-call-wg.jpg', place: 'The video call', accent: '#a855f7', position: 'center 50%' },
  { scene: '/images/scenes/hub-amt-office.jpg', place: 'The Amt', accent: '#14b8a6', position: 'center 45%' },
  { scene: '/images/scenes/hub-exam-hall.jpg', place: 'The exam hall', accent: '#f1d27a', position: 'center 42%' },
] as const;

export default function PublicHomePage() {
  return (
    <main id="main-content" className={`ag-foundation-shell ${styles.page}`}>
      <section className={`ag-room ${styles.hero}`} aria-labelledby="public-title">
        <header className={styles.header}>
          <div className={`ag-container ag-container--public ${styles.headerInner}`}>
            <Link href="/" aria-label="Adipoli German home" className={styles.homeLink}>
              <span className={styles.desktopBrand}>
                <BrandLockup variant="horizontal" surface="dark" />
              </span>
              <span className={styles.mobileBrand}>
                <BrandLockup variant="stacked" surface="dark" />
              </span>
            </Link>
            <nav className={styles.publicNav} aria-label="Public navigation">
              <a href="#curriculum">The places</a>
              <a href="#method">The method</a>
              <Link href="/auth/login" className={styles.loginLink}>Log in</Link>
            </nav>
          </div>
        </header>

        <div className={styles.heroStage}>
          <Image
            src="/images/scenes/hub-goethe-kochi-classroom.jpg"
            alt="A bright German classroom in Kochi"
            fill
            priority
            sizes="100vw"
            className={styles.heroBackdrop}
          />
          <div className={styles.heroShade} aria-hidden="true" />
          <FrauFischer mood="greeting" animate={false} className={styles.heroTeacher} />

          <div className={`ag-container ag-container--public ${styles.heroContent}`}>
            <div className={styles.heroCopy}>
              <p className={styles.heroKicker}>The Goethe A1 course for Malayalis.</p>
              <h1 id="public-title" className={`ag-impact ${styles.heroTitle}`}>
                Zero to Goethe A1-ready.
              </h1>
              <p className={styles.heroLead}>56 dense owner-led lessons.</p>
              <p className={styles.heroSupport}>
                Video-led. App-supported. Hear it. Say it. Repair it. Prove it. Build evidence that you&apos;re A1 ready.
              </p>
              <div className={styles.heroActions}>
                <Link className={`ag-action ${styles.primaryAction}`} href="/intro">
                  Try your first German moment <ArrowRight className="ag-icon" aria-hidden="true" />
                </Link>
                <span className={styles.noSetup}>No sign-up · audio starts only when you press listen</span>
              </div>
            </div>

            <div className={styles.firstLine}>
              <span lang="de">»Guten Morgen.«</span>
              <small>your first line · Module 1</small>
            </div>
          </div>
        </div>
      </section>

      <section id="method" className={`ag-room ${styles.methodSection}`} aria-labelledby="method-title">
        <div className={`ag-container ag-container--public ${styles.methodSheet}`}>
          <div className={styles.methodHeading}>
            <p className="ag-label">The method</p>
            <h2 id="method-title" className="ag-heading">One lesson. One scene. One proof.</h2>
          </div>
          <ol className={styles.methodGrid}>
            {METHOD_STEPS.map((step) => (
              <li key={step.number} className={styles.methodStep}>
                <span className={styles.methodNumber}>{step.number} · {step.label}</span>
                <strong>{step.title}</strong>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="curriculum" className={`ag-room ${styles.curriculum}`} aria-labelledby="curriculum-title">
        <div className="ag-container ag-container--public">
          <div className={styles.curriculumHeading}>
            <div>
              <p className="ag-label">Eight guided modules</p>
              <h2 id="curriculum-title" className={`ag-impact ${styles.curriculumTitle}`}>Eight flags to the exam.</h2>
            </div>
            <p>Each flag is a situation you&apos;ll learn to handle.</p>
            <span>Swipe or scroll →</span>
          </div>

          <ol className={styles.moduleRail}>
            {SPINE_MODULES.map((module, index) => {
              const visual = MODULE_VISUALS[index];
              return (
                <li key={module.id} className={styles.moduleCard} style={{ '--module-accent': visual.accent } as CSSProperties}>
                  <div className={styles.moduleImage}>
                    <Image
                      src={visual.scene}
                      alt=""
                      fill
                      sizes="(min-width: 900px) 275px, 76vw"
                      style={{ objectPosition: visual.position }}
                    />
                    <span className={styles.moduleNumeral}>{module.id}</span>
                  </div>
                  <div className={styles.moduleCopy}>
                    <h3>{module.title}</h3>
                    <p>{visual.place} · {module.milestone}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className={`ag-room ${styles.momentTeaser}`} aria-labelledby="moment-title">
        <div className={`ag-container ag-container--public ${styles.momentTeaserInner}`}>
          <div className={styles.momentTeaserCopy}>
            <p className="ag-label">Your first German moment</p>
            <h2 id="moment-title" className="ag-heading">Frau Fischer says one line. You answer it. That&apos;s the course.</h2>
            <p>A real listen-and-respond from Module 1—before any account.</p>
            <Link className="ag-action" href="/intro">
              Open the classroom <ArrowRight className="ag-icon" aria-hidden="true" />
            </Link>
            <span>Nothing plays until you press listen</span>
          </div>

          <div className={styles.audioPreview} aria-label="Preview of the first listening and speaking moment">
            <div className={styles.previewHeader}>
              <span>Preview · Hören → Sprechen</span>
              <span>Ready</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewPlay}><Play aria-hidden="true" /></span>
              <span>
                <strong lang="de">Guten Morgen.</strong>
                <small>Frau Fischer · native German audio</small>
              </span>
            </div>
            <div className={`${styles.previewRow} ${styles.previewResponse}`}>
              <span className={styles.previewMic}><Mic2 aria-hidden="true" /></span>
              <span>
                Then you: <strong lang="de">Guten Morgen, Frau Fischer.</strong>
                <small>Say it aloud · replay available</small>
              </span>
            </div>
            <div className={styles.previewRepair}>
              <RotateCcw aria-hidden="true" />
              <span>Miss a word? Repair it and try again.</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`ag-daylight ${styles.promiseBand}`} aria-labelledby="promise-title">
        <div className={`ag-container ag-container--public ${styles.promiseBandInner}`}>
          <div>
            <p className="ag-label">The complete path</p>
            <h2 id="promise-title" className="ag-heading">Video-led. App-supported.</h2>
          </div>
          <div className={styles.promiseLines}>
            <p><Headphones aria-hidden="true" /><span><strong>Hear the real line.</strong> Native German audio stays connected to the scene.</span></p>
            <p><Mic2 aria-hidden="true" /><span><strong>Produce it yourself.</strong> Speaking and writing matter—not just watching.</span></p>
            <p><RotateCcw aria-hidden="true" /><span><strong>Know what to repair.</strong> Checkpoints route you back to the exact weak piece.</span></p>
          </div>
        </div>
      </section>

      <section className={`ag-room ${styles.finalCta}`} aria-labelledby="final-title">
        <div className={`ag-container ag-container--public ${styles.finalCtaInner}`}>
          <div className={styles.finalBrand}>
            <BrandLockup variant="stacked" surface="dark" />
          </div>
          <div className={styles.finalCtaCopy}>
            <p className="ag-label">Your first win is ready</p>
            <h2 id="final-title" className={`ag-impact ${styles.finalTitle}`}>Hear it. Say it. Repair it. Prove it.</h2>
          </div>
          <Link className="ag-action" href="/intro">
            Try your first German moment <ArrowRight className="ag-icon" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className={`ag-room ${styles.footer}`}>
        <div className={`ag-container ag-container--public ${styles.footerInner}`}>
          <div className={styles.footerBrand}>
            <BrandLockup variant="horizontal" surface="dark" />
          </div>
          <p className={styles.footerMeta}>Made for Malayali learners · Goethe A1 · Hören · Sprechen · Lesen · Schreiben</p>
          <div className={styles.footerLinks}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/auth/login">Log in</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
