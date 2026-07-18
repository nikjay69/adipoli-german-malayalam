import type { Metadata } from 'next';
import {
  ArrowRight,
  Check,
  Circle,
  Headphones,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import {
  AnswerSheet,
  DarkRoom,
  DaylightCanvas,
  FoundationAction,
  GermanLine,
  SceneFlag,
  StatusChip,
} from '@/components/foundation';

export const metadata: Metadata = {
  title: 'Design foundation review · Adipoli German',
  robots: { index: false, follow: false },
};

const iconProps = {
  className: 'ag-icon',
  strokeWidth: 1.75,
  'aria-hidden': true,
} as const;

export default function DesignSystemPreviewPage() {
  return (
    <main id="main-content" className="ag-foundation-shell ag-daylight">
      <DaylightCanvas aria-labelledby="foundation-title">
        <div className="ag-container ag-container--public">
          <header className="ag-foundation-section ag-foundation-stack">
            <SceneFlag number="00" kicker="Foundation" title="Owner review · 3p-04" />
            <div className="ag-foundation-stack">
              <p className="ag-label">Adipoli German · design language v0.1</p>
              <h1 id="foundation-title" className="ag-display">Scenes &amp; Daylight</h1>
              <p className="ag-body ag-muted">
                One calm foundation for sustained learning, with forest rooms used briefly to establish place and attention.
              </p>
              <StatusChip tone="success" icon={<Check {...iconProps} />}>Approved working direction</StatusChip>
            </div>
          </header>

          <section className="ag-foundation-section ag-foundation-stack" aria-labelledby="daylight-title">
            <div>
              <p className="ag-label">Sustained work</p>
              <h2 id="daylight-title" className="ag-heading">Daylight carries the learning.</h2>
            </div>

            <div className="ag-foundation-grid">
              <article className="ag-layer ag-foundation-stack" style={{ padding: 'var(--ag-space-6)' }}>
                <div className="ag-foundation-stack">
                  <StatusChip icon={<Circle {...iconProps} />}>Ready</StatusChip>
                  <GermanLine>Ich heiße Meera. Und du?</GermanLine>
                  <p className="ag-body ag-muted">
                    German is typographically primary. The instruction stays short, comfortable, and immediately actionable.
                  </p>
                </div>
                <div className="ag-action-row">
                  <FoundationAction>
                    Answer aloud <ArrowRight {...iconProps} />
                  </FoundationAction>
                  <FoundationAction variant="secondary">
                    <Volume2 {...iconProps} /> Hear again
                  </FoundationAction>
                </div>
              </article>

              <article className="ag-answer-sheet ag-foundation-stack">
                <div>
                  <p className="ag-label">Meaningful state</p>
                  <h3 className="ag-heading">Feedback explains, then returns you to action.</h3>
                </div>
                <StatusChip tone="recovery" icon={<RotateCcw {...iconProps} />}>Needs one repair</StatusChip>
                <p className="ag-body">
                  Use <strong>heiße</strong> for your name. Say the complete line once more.
                </p>
                <div className="ag-field">
                  <label htmlFor="review-answer">Your corrected line</label>
                  <input id="review-answer" defaultValue="Ich heiße Meera." />
                </div>
                <div className="ag-action-row">
                  <FoundationAction>Check repair</FoundationAction>
                  <FoundationAction
                    id="locked-example"
                    disabled
                    disabledReason="Record one full answer to continue."
                  >
                    Continue
                  </FoundationAction>
                </div>
              </article>
            </div>
          </section>

          <section className="ag-foundation-section" aria-labelledby="room-title">
            <DarkRoom className="ag-foundation-stack">
              <SceneFlag number="01" kicker="First German moment" title="Goethe Kochi · morning" />
              <div className="ag-foundation-grid">
                <div className="ag-foundation-stack">
                  <Headphones {...iconProps} />
                  <div>
                    <p className="ag-label">Brief immersive frame</p>
                    <h2 id="room-title" className="ag-heading">Listen in the room. Work on the answer sheet.</h2>
                  </div>
                  <p className="ag-body ag-muted">
                    Dark establishes the moment; it does not become the fifteen-minute reading or practice canvas.
                  </p>
                  <StatusChip tone="success" icon={<Check {...iconProps} />}>Audio ready</StatusChip>
                </div>

                <AnswerSheet className="ag-foundation-stack">
                  <p className="ag-label">Your response</p>
                  <GermanLine>Guten Morgen, Frau Fischer.</GermanLine>
                  <p lang="ml" className="ag-malayalam ag-muted">സുപ്രഭാതം — ഇനി ശബ്ദമായി പറയൂ.</p>
                  <div className="ag-action-row">
                    <FoundationAction variant="secondary">
                      <Volume2 {...iconProps} /> Model audio
                    </FoundationAction>
                    <FoundationAction>
                      Say it now <ArrowRight {...iconProps} />
                    </FoundationAction>
                  </div>
                </AnswerSheet>
              </div>
            </DarkRoom>
          </section>

          <section className="ag-foundation-section ag-foundation-stack" aria-labelledby="tokens-title">
            <div>
              <p className="ag-label">Central tokens</p>
              <h2 id="tokens-title" className="ag-heading">Four surfaces, one product family.</h2>
            </div>
            <div className="ag-foundation-swatches" aria-label="Foundation surface colors">
              <div className="ag-swatch" style={{ background: 'var(--ag-daylight-canvas)' }}>DAYLIGHT · #F5F0E8</div>
              <div className="ag-swatch" style={{ background: 'var(--ag-answer-sheet)' }}>ANSWER · #F7EAD0</div>
              <div className="ag-swatch" data-contrast="room" style={{ background: 'var(--ag-forest-deepest)' }}>ROOM · #0C1811</div>
              <div className="ag-swatch" data-contrast="room" style={{ background: 'var(--ag-forest-raised)' }}>RAISED · #16281C</div>
            </div>
            <div className="ag-foundation-grid">
              <p className="ag-heading">Source Serif makes German and display language feel authored.</p>
              <p className="ag-impact" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>One clear action</p>
            </div>
          </section>

          <footer className="ag-foundation-section">
            <p className="ag-body ag-muted">
              Review surface only. No learner route has been redesigned in this chunk.
            </p>
          </footer>
        </div>
      </DaylightCanvas>
    </main>
  );
}
