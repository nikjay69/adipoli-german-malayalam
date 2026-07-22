import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Headphones, Mic2, RotateCcw } from 'lucide-react';
import { BrandLockup } from '@/components/brand';
import { FrauFischer } from '@/components/character/FrauFischer';
import { SPINE_MODULES } from '@/lib/spine';
import styles from './PublicBoundary.module.css';

const METHOD_STEPS = [
  {
    icon: Headphones,
    label: 'Hear it',
    copy: 'Start with a real German line in context.',
  },
  {
    icon: Mic2,
    label: 'Say it',
    copy: 'Speak before the lesson explains everything.',
  },
  {
    icon: RotateCcw,
    label: 'Repair it',
    copy: 'Notice the miss, then rebuild the line correctly.',
  },
  {
    icon: Check,
    label: 'Prove it',
    copy: 'Finish with evidence that the skill holds.',
  },
] as const;

export default function PublicHomePage() {
  return (
    <main id="main-content" className={`ag-foundation-shell ${styles.page}`}>
      <section className={`ag-room ${styles.hero}`} aria-labelledby="public-title">
        <div className={`ag-container ag-container--public ${styles.heroInner}`}>
          <header className={styles.header}>
            <Link href="/" aria-label="Adipoli German home">
              <BrandLockup variant="descriptor" surface="dark" />
            </Link>
            <nav className={styles.publicNav} aria-label="Public navigation">
              <a href="#curriculum">Course</a>
              <Link href="/auth/login">Log in</Link>
            </nav>
          </header>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className="ag-label">Guided Goethe A1 video course</p>
              <h1 id="public-title" className="ag-display">
                The Goethe A1 course for Malayalis.
              </h1>
              <p className={styles.heroLead}>
                56 dense owner-led lessons. Video-led. App-supported.
              </p>
              <p className={`ag-muted ${styles.heroSupport}`}>
                Hear it. Say it. Repair it. Prove it. Build evidence that you&apos;re A1 ready.
              </p>
              <div className={styles.heroActions}>
                <Link className="ag-action" href="/intro">
                  Start listening <ArrowRight className="ag-icon" aria-hidden="true" />
                </Link>
                <a className={`ag-action ag-action--secondary ${styles.secondaryAction}`} href="#curriculum">
                  See the course
                </a>
              </div>
              <p className={styles.noSetup}>No account needed for your first German moment.</p>
            </div>

            <div className={styles.scene} aria-label="Your first German classroom scene">
              <Image
                src="/images/scenes/hub-goethe-kochi-classroom.jpg"
                alt="A bright German classroom in Kochi"
                fill
                priority
                sizes="(min-width: 960px) 520px, 92vw"
                className={styles.sceneImage}
              />
              <div className={styles.sceneShade} aria-hidden="true" />
              <div className={styles.sceneLabel}>
                <span>Scene 01</span>
                <strong>First German moment</strong>
              </div>
              <div className={styles.speech}>
                <span>Frau Fischer</span>
                <strong lang="de">Guten Morgen.</strong>
              </div>
              <FrauFischer mood="greeting" animate={false} className={styles.teacher} />
              <div className={styles.reply} aria-hidden="true">
                <span>Your reply</span>
                <span className={styles.replyLine} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`ag-daylight ${styles.section}`} aria-labelledby="method-title">
        <div className="ag-container ag-container--public">
          <div className={styles.sectionIntro}>
            <p className="ag-label">The learning loop</p>
            <h2 id="method-title" className="ag-heading">German you can actually use.</h2>
            <p className="ag-muted">
              Short, guided actions turn a line you heard into something you can say and recover.
            </p>
          </div>
          <ol className={styles.methodGrid}>
            {METHOD_STEPS.map(({ icon: Icon, label, copy }, index) => (
              <li key={label} className={styles.methodCard}>
                <div className={styles.methodTop}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{label}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`ag-daylight ${styles.forWhom}`} aria-labelledby="for-whom-title">
        <div className={`ag-container ag-container--public ${styles.forWhomGrid}`}>
          <div>
            <p className="ag-label">Built for the real starting point</p>
            <h2 id="for-whom-title" className="ag-heading">For Malayalis starting German from zero.</h2>
          </div>
          <div className={styles.forWhomCopy}>
            <p>
              Learn through guided video lessons and an app that keeps listening, speaking, reading,
              and writing connected.
            </p>
            <p className="ag-muted">
              The path moves from your first greeting to timed Goethe A1 practice, one visible milestone at a time.
            </p>
          </div>
        </div>
      </section>

      <section id="curriculum" className={`ag-daylight ${styles.section} ${styles.curriculum}`} aria-labelledby="curriculum-title">
        <div className="ag-container ag-container--public">
          <div className={styles.sectionIntro}>
            <p className="ag-label">Eight guided modules</p>
            <h2 id="curriculum-title" className="ag-heading">One clear path to Goethe A1.</h2>
            <p className="ag-muted">Each module closes with a practical milestone before the next one opens.</p>
          </div>
          <ol className={styles.moduleList}>
            {SPINE_MODULES.map((module) => (
              <li key={module.id} className={styles.moduleRow}>
                <span className={styles.moduleNumber}>{String(module.id).padStart(2, '0')}</span>
                <div>
                  <h3>{module.title}</h3>
                  <p>{module.promise}</p>
                </div>
                <span className={styles.milestone}>{module.milestone}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`ag-room ${styles.finalCta}`} aria-labelledby="final-title">
        <div className={`ag-container ${styles.finalCtaInner}`}>
          <p className="ag-label">Your first win is ready</p>
          <h2 id="final-title" className="ag-heading">Hear your first German line.</h2>
          <p className="ag-muted">Listen, say it aloud, repair one small mistake, and finish with a real win.</p>
          <Link className="ag-action" href="/intro">
            Start listening <ArrowRight className="ag-icon" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className={`ag-room ${styles.footer}`}>
        <div className={`ag-container ag-container--public ${styles.footerInner}`}>
          <BrandLockup variant="horizontal" surface="dark" />
          <div className={styles.footerLinks}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/auth/login">Learner log in</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
