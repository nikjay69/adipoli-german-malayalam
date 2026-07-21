import type { Metadata } from 'next';
import Image from 'next/image';
import { Check, ShieldCheck } from 'lucide-react';
import { BrandLockup, BrandMark, BrandWatermark } from '@/components/brand';
import {
  DarkRoom,
  DaylightCanvas,
  SceneFlag,
  StatusChip,
} from '@/components/foundation';
import { brandAssets, brandUsage } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Triangle-A brand review · Adipoli German',
  robots: { index: false, follow: false },
};

const iconProps = {
  className: 'ag-icon',
  strokeWidth: 1.75,
  'aria-hidden': true,
} as const;

export default function BrandPreviewPage() {
  return (
    <main id="main-content" className="ag-foundation-shell ag-daylight">
      <DaylightCanvas aria-labelledby="brand-title">
        <div className="ag-container ag-container--public">
          <header className="ag-foundation-section ag-foundation-stack">
            <SceneFlag number="04A" kicker="Approved identity" title="Triangle AG · product integration" />
            <div className="ag-foundation-stack">
              <p className="ag-label">Adipoli German · brand v0.1</p>
              <h1 id="brand-title" className="ag-display">One mark. Every product surface.</h1>
              <p className="ag-body ag-muted">
                The open Triangle-A and gold trapezoid now carry the app, favicon, install icon, and shared lockups.
              </p>
              <StatusChip tone="success" icon={<Check {...iconProps} />}>
                Approved flat system installed
              </StatusChip>
            </div>
          </header>

          <section className="ag-foundation-section ag-foundation-stack" aria-labelledby="lockups-title">
            <div>
              <p className="ag-label">Default product identity</p>
              <h2 id="lockups-title" className="ag-heading">Flat, calm, and unmistakably Adipoli.</h2>
            </div>
            <div className="ag-brand-lockup-grid">
              <article className="ag-layer ag-brand-review-card">
                <p className="ag-label">Primary horizontal</p>
                <BrandLockup />
                <p className="ag-body ag-muted">Headers, product chrome, and documents · minimum 120px wide.</p>
              </article>
              <article className="ag-layer ag-brand-review-card">
                <p className="ag-label">Stacked</p>
                <BrandLockup variant="stacked" />
                <p className="ag-body ag-muted">Compact centred placements where the horizontal lockup cannot breathe.</p>
              </article>
              <article className="ag-layer ag-brand-review-card">
                <p className="ag-label">With descriptor</p>
                <BrandLockup variant="descriptor" />
                <p className="ag-body ag-muted">Use at 200px or wider so the learner promise stays readable.</p>
              </article>
            </div>
          </section>

          <section className="ag-foundation-section" aria-labelledby="dark-title">
            <DarkRoom className="ag-foundation-stack">
              <SceneFlag number="D" kicker="Forest surface" title="Reversed mark · no recolour" />
              <div className="ag-foundation-grid">
                <div className="ag-foundation-stack">
                  <p className="ag-label">Dark-room lockup</p>
                  <h2 id="dark-title" className="ag-heading">Cream mark. Gold trapezoid. Same identity.</h2>
                  <BrandLockup surface="dark" />
                </div>
                <div className="ag-brand-watermark-stage ag-brand-watermark-stage--dark">
                  <span className="ag-label">Dark-footage watermark · 58%</span>
                  <BrandWatermark footage="dark" size={144} />
                </div>
              </div>
            </DarkRoom>
          </section>

          <section className="ag-foundation-section ag-foundation-stack" aria-labelledby="icons-title">
            <div>
              <p className="ag-label">Icon ladder</p>
              <h2 id="icons-title" className="ag-heading">The Triangle-A survives the smallest tab and the largest install tile.</h2>
            </div>
            <div className="ag-brand-icon-grid">
              <article className="ag-layer ag-brand-review-card">
                <p className="ag-label">Favicon scale</p>
                <div className="ag-brand-favicon-row" aria-label="Approved 16, 32, and 48 pixel favicons">
                  <Image src={brandAssets.icons.favicon16} alt="16 pixel Triangle-A favicon" width={16} height={16} unoptimized />
                  <Image src={brandAssets.icons.favicon32} alt="32 pixel Triangle-A favicon" width={32} height={32} unoptimized />
                  <Image src={brandAssets.icons.favicon48} alt="48 pixel Triangle-A favicon" width={48} height={48} unoptimized />
                </div>
                <div className="ag-brand-minimum-row" aria-label="Approved mark minimum-size examples">
                  <BrandMark size={12} alt="Triangle-A at 12 pixels" />
                  <BrandMark size={24} alt="Triangle-A at 24 pixels" />
                  <BrandMark size={48} alt="Triangle-A at 48 pixels" />
                </div>
              </article>

              <article className="ag-layer ag-brand-review-card">
                <p className="ag-label">Circle crop</p>
                <div className="ag-brand-crop ag-brand-crop--circle">
                  <Image src={brandAssets.icons.avatar1080} alt="Triangle-A social avatar in a circle crop" width={160} height={160} unoptimized />
                </div>
                <StatusChip tone="success" icon={<ShieldCheck {...iconProps} />}>Avatar remains centred</StatusChip>
              </article>

              <article className="ag-layer ag-brand-review-card">
                <p className="ag-label">Maskable safe zone</p>
                <div className="ag-brand-maskable-check">
                  <Image src={brandAssets.icons.maskable512} alt="Maskable Triangle-A app icon" width={160} height={160} unoptimized />
                  <span aria-hidden="true" />
                </div>
                <StatusChip tone="success" icon={<ShieldCheck {...iconProps} />}>Central 80% circle protected</StatusChip>
              </article>
            </div>
          </section>

          <section className="ag-foundation-section ag-foundation-stack" aria-labelledby="guardrails-title">
            <div>
              <p className="ag-label">Usage guardrails</p>
              <h2 id="guardrails-title" className="ag-heading">Beautiful by default, flexible by reviewed context.</h2>
            </div>
            <div className="ag-foundation-grid">
              <article className="ag-layer ag-brand-review-card">
                <BrandWatermark footage="bright" size={128} />
                <p className="ag-body"><strong>Product default:</strong> {brandUsage.productDefault}</p>
                <p className="ag-body ag-muted">{brandUsage.darkSurface}</p>
              </article>
              <article className="ag-answer-sheet ag-foundation-stack">
                <p className="ag-body"><strong>Celebration:</strong> {brandUsage.celebration}</p>
                <p className="ag-body"><strong>Marketing only:</strong> {brandUsage.marketingOnly}</p>
                <p className="ag-body ag-muted">{brandUsage.forbidden}</p>
              </article>
            </div>
          </section>

          <footer className="ag-foundation-section">
            <p className="ag-body ag-muted">
              Brand integration review only. No learner or public page has been redesigned in this chunk.
            </p>
          </footer>
        </div>
      </DaylightCanvas>
    </main>
  );
}
