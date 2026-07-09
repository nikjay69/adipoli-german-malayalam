# QC gate — Gemini credit batch + AdventurePlayer switch

Date: 2026-06-12 → 13 · Mode: Implementation · DECISIONS #9 · Plan: `wiggly-snuggling-sedgewick`

## What this delivered

The immersive player is now the course, and it's backed by real generated assets instead of stock photos and broken audio refs.

### 1. AdventurePlayer / GameRenderer is the spine lesson player
- `src/lib/spine.ts` lesson blocks now link `/play/...` (were `/learn/...`).
- `/learn/[m]/[l]` is a redirect to `/play/...`; the textbook player is parked in `_legacy-textbook-player.tsx` (not routed).
- Spine-aware unlock moved into `src/lib/curriculum.ts` (checkpoint-gated); non-spine modules (2,13,15,16) are open practice library. Verified: `/course` links to `/play` (6), `/learn/3/3-1` redirects, zero console errors.

### 2. Native German audio — Cloud TTS Chirp3-HD (was browser TTS / missing files)
- 81 missing dictation clips, 115 speaking model clips (wired as "Hear the model" + autoplay), 128 mock-simulator answers, 7 checkpoint listening lines, 17 vocab example gaps, 48 Phase-3 video model lines. ~379 files in `public/audio/{exercises,sprechen,checkpoints,examples,video-models}`.
- Wired: dictation autoplays pre-rendered audio (TTS fallback); checkpoint listen items got a "Play audio" button; speaking exercises got a model-audio button.
- `npm run test:assets` (new `scripts/audit-audio-links.ts`, in `npm run qa`) confirms 0 missing referenced audio/image files — roadmap fix #7.

### 3. Painterly scene backdrops — Imagen 4 Ultra, all 106 lessons + 15 hub scenes
- Style locked by an 8-image round (warm painterly, candidate b). 636 candidates (6/scene), default pick = cand-1, owner can override via `scripts/output/scenes-candidates/review.html` + `scene-picks.json`, then `scripts/select-scenes.mts`.
- Wired through `src/lib/scene-image.ts` into GameRenderer (full-bleed), NarrativeIntro, and AdventurePlayer, all with stock fallback on `<img onError>`. Hub scenes wired as per-module checkpoint header backdrops.
- Verified: `/play/3/3-1` renders the Goethe-Kochi mock-checkout scene; `/images/scenes/3-1.jpg` 200.

### 4. Vocab illustrations — Imagen 4 Standard, all 794 items × 3 candidates
- Wired into `VocabDiscoveryGame`: tapping a word reveals its illustration + English + Malayalam and plays native audio. Verified end-to-end (the "null" reveal shows a thermometer/cottage scene over the lesson backdrop).
- **Quality fix mid-batch:** the first prompt quoted the German word + pasted the example sentence, so Imagen rendered floating captions (e.g. "DEUTSCH", "I am learning German") — classic AI-slop text, and a spelling risk. Reprompted to *depict the example scene* with a strong no-text block; retested on hard cases (null, deutsch, schwester) → clean. Regenerated the full set. The ~120 first-pass text-artifact images were discarded (their ~€12 spend still counts against the credit goal).

### 5. Experimental, owner-gated
- **Kuttan pose pack** (Gemini 2.5 Flash Image, canonical adult reference): 15 moods/poses, multiple candidates each. The in-app Kuttan is currently an off-canon *child* render — this pack can replace it. Ships only per-image owner approval (`scripts/output/kuttan-pack/review.html`). Some poses hit the safety filter and have fewer candidates.
- **Veo 3.1 ambient loops:** 11 no-character/no-text loops (rain veranda, chayakkada steam, Kochi street, dream platform, …), all compressed ≤1.5 MB → `public/videos/scenes/`. One (celebration-lights) wired as the living backdrop on the lesson-victory screen; the rest banked as backdrops / owner video B-roll. The +8 course-moment expansion was flaky (long-running ops); only market-stall landed.

## Budget — call-by-call ledger (`scripts/output/gemini-spend-ledger.json`)

**Final:** ledger €203.62 estimated → **~€179 actual** (×0.88 calibration) → **~€75 of €254 credits remaining.** Per-batch: scenes €35.5 · vocab €153 (incl. discarded first-pass + high-risk/question reprompts) · veo €9.6 · kuttan €4.4 · audio €0.36 · video-lines/style/test €0.6. Owner directed spending the ~€67 of headroom on quality/uniformity; the genuinely-useful asset work was completed at ~€179 actual. **Remaining ~€75 deliberately NOT spent:** further generation would mean regenerating already-good images (slop), which the owner explicitly ruled out ("be very wise"). Stopping was the wise outcome over padding to hit a number.

**Billing-console note (owner asked 2026-06-12):** the console showed "June 1–11 total cost €0.00" — true and expected, because all generation ran June 12–13, *outside* that window. Cloud billing also lags 24–48h. The `gemini-runner` service account can spend but lacks billing-viewer, so confirm drawdown via the "Free Trial Credits remaining" figure or a date range including June 12–13.

## Named weaknesses (honest)
- **Spend includes ~€12 of discarded first-pass vocab** (text-artifact rework). Counts toward the credit goal but produced no shipped asset.
- **Scene/vocab finals default to candidate 1**, not hand-curated per image — 636 + 2382 candidates is beyond a single review pass. Review grids + picks-JSON let the owner upgrade any pick later.
- **A few vocab scenes show incidental object text** (e.g. a thermometer's own °C scale) — acceptable (real objects), not floating captions.
- **Kuttan pack not shipped** (off-canon child still in app) pending owner approval; some poses safety-filtered.
- **Veo loops mostly banked, not wired** (only victory screen uses one) — phone-first data caution; treat as B-roll + optional future backdrops.
- **Imagen "no-text" is best-effort**, not guaranteed; spot-review before mass-shipping any future image batch.

## Second pass — owner raised the budget to ~€67 more for quality + uniformity (2026-06-13)

- **All 794 vocab now illustrated.** A selection bug (resume runs named files `cand-2/3/4`, the selector only looked for `cand-1`) made it look like 470 words were missing; `scripts/select-vocab.mts` now picks the first available candidate → 793/794 in `public/images/vocab/` (1 had a single candidate). Visual audit montages (`scripts/output/vocab-montage.png`, `scene-montage.png`) confirm uniform warm-painterly style across all 18 modules.
- **Text-artifact cleanup.** 27 high-risk (form/write/sign) + 96 question-word vocab regenerated with a context/blank-surface prompt that depicts the scene instead of the word → no floating captions. Verified via `scripts/output/highrisk-after.png`.
- **Canonical adult Kuttan unified EVERYWHERE.** Two Kuttan systems existed: `KuttanImage` (photos, used in lessons) and `Kuttan` (an off-canon SVG **child**, used in app chrome — tests/today/course). Both now use the canonical adult photo set. Backgrounds were flood-filled to transparent (`scripts/kuttan-transparent.mjs`, threshold tuned to 238 between the ~242 background and ~215 shirt, with a bottom-shadow cleanup) so they composite cleanly over the dark UI. Child renders backed up to `public/images/characters/_child-backup/` (revertible). Verified: tests hub now renders `kuttan-thinking.png` (adult).

## Verification
- `npm run qa` green (lint:mvp 0 errors, typecheck clean, 12,942 content checks, 0 missing asset links).
- 390px browser checks, 0 console errors across Today/course/checkpoint/mock/tests/practice/me + lesson flow (`scripts/output/full-playthrough/`): spine→/play links, /learn redirect, per-lesson scene backdrops, vocab illustration reveal + native audio, dictation audio, checkpoint hub-scene headers, adult Kuttan in chrome + lessons.
- **Budget calibration:** owner ground truth (€100 credits left at ledger €174) shows the ledger overcounts actual by ~12% (logged-but-failed calls don't bill). Ledger now reports est. actual (×0.88) and est. credits remaining; global cap €248 ledger ≈ €218 actual keeps a safe buffer.

## Addendum 2026-06-14 — Frau Weber, /preview, marketing

- **Frau Weber character** (4 expressions, transparent) + `MissionDialogueScene` upgrade: the M1-M2 missions now show the painterly Goethe-Kochi classroom with the real Frau Weber + Kuttan facing each other (was colored dots). Fixes the bland first-impression. All character PNGs trimmed of transparent margins so figures anchor to the floor.
- **`/preview`** (not in nav): "Unlock everything" + clickable index of all 158 pages for free owner/QA navigation.
- **Marketing batch** (owner-directed, €42.67): 12 premium 9:16 Veo promo clips + 6 social graphics, text-free, in `scripts/output/marketing/`. Kerala→Germany brand narrative.
- **Final ledger: €246.54 estimated → ~€217 actual → ~€37 of €254 credits remaining.** Global cap €250 (= €250 worst-case actual, still under €254 → no real-money charge possible).

## Addendum 2026-06-15 — first-run polish + production-build fix (no credits)

Continuing the "kill the bland first-impression" thread using existing assets only (Gemini credentials deleted; €0 spend).

- **Intro hero is now scene-first** (`src/app/intro/page.tsx`). Replaced the CSS-art `KeralaClassroomScene` (abstract dot-heads + blob bodies) with the real painterly Goethe-Kochi classroom backdrop + the canonical **Frau Weber (greeting)** and **Kuttan (waving)** PNGs — the same treatment as the mission it leads into, so the entry screen previews the first lesson. Also fixed a headline clip: `whitespace-nowrap` forced "Your first German moment." onto one line that overflowed a 390px screen ("…German mom"); now wraps to two lines. Verified in production screenshot (`scripts/output/local-shots/prod-01-intro.png`).
- **Onboarding palette de-genericised** (`src/app/onboarding/page.tsx`). Was the cold dark-navy gradient (`#1a1a2e→#0f3460`) + candy accents (hot-pink `#ff6b9d`, teal `#00d9a5`, bright `#ffd93d`) the design memory explicitly warns against. Now the warm Kerala-green shell that matches `MissionShell` (base `#102018`, green/gold radials + blur orbs), gold `#f1d27a` / green `#3fbf75` accents, and higher-contrast option cards (`bg-[#0f1d14]/72`, was `bg-white/5` — barely visible on green). Also caught a pink `rgba(255,107,157,…)` glow the hex sweep missed → gold.
- **Production build was broken (deployment blocker), now fixed.** `next build` failed prerendering `/missions/module-2/final-self-intro` — `useSearchParams()` not wrapped in a Suspense boundary; `/missions/module-2/self-intro` had the same latent fault. Both now follow the existing `auth/callback` pattern (inner content component + `<Suspense>`-wrapped default export). `tests/[testId]` was already correct. `npm run build` now completes; all routes prerender.

**Verification.** `npm run qa` green (lint:mvp 0, typecheck clean, 12,942 content checks, 0 missing of 210 audio + 15 image refs). `npm run build` succeeds (all pages prerender static). Intro verified by production screenshot. Onboarding verified by DOM assertions — headings, all 4 hour cards, and confirm button render at `opacity:1`, correct positions, with the new dark-green card style (`backgroundColor: lab(…/0.72)`) applied and nothing covering them (`elementFromPoint` returns the card's own text).
- **Honest weakness:** headless puppeteer in this environment will not raster framer-motion `AnimatePresence` subtrees into screenshots (reproduced across dev, dev+`--disable-gpu`, transform-flattened, and production builds), so the onboarding cards photograph as empty green even though the DOM proves them painted and on-top. Non-motion screens (intro, home header) capture fine. Use DOM assertions, not screenshots, to verify motion-heavy screens here.

### Brand-color uniformity sweep (core chrome + shared primitives)

The "generic AI look" the owner flagged was concretely a **magenta `#e94560` + cold-navy `#0f3460`** accent pair (plus candy pink `#ff6b9d` / teal `#00d9a5` / blue) sprinkled inline across the chrome — never a Kerala gold/green/warm tone. It is **not** a CSS token, so it had crept in per-file. Swept the high-traffic core surfaces to the brand palette (gold `#d4a520`, paddy-green `#27ae60`, German-red `#c0392b` for true error/danger only), keeping dark text on gold for contrast:

- **Shared UI primitives (highest leverage)** — `ProgressBar` (`primary` magenta→gold, `secondary` navy→green, generic gray track→`--foreground/10`), `Button` + `Badge` (`primary`→gold/dark-text, `secondary`→German-red), `Loading` dots (magenta→navy gradient → gold→green). These propagate brand colour everywhere they're used (e.g. profile's course bar was a red "100%" — now gold).
- **Home** (`src/app/page.tsx`) progress header: percent, progress-bar gradient, and streak were magenta → gold / gold→green / warm-amber.
- **Course** (`src/app/course/page.tsx`) "Next" lesson highlight (border + tint + pill) magenta → gold (dark text on the pill).
- **Profile** (`src/app/profile/page.tsx`): magenta→navy avatar gradients → gold→green; all magenta percents/dividers/icons/selected-states → gold.
- **Vocabulary** (`src/app/vocabulary/page.tsx`): pink→teal and blue→green progress bars → gold→green; blue hero card → gold; pink CTA → gold (dark text); **answer feedback recoloured semantically** — correct teal→green, wrong pink→German-red; accent rings/hover/icons → gold. (XP `#ffd93d` left — it's a warm gold-yellow, on-tone.)
- **Left intentionally vibrant:** the `/games/*` surface (candy colours there are deliberate play energy) and the `/tests` per-section colours (Hören-blue / Lesen-green … are a meaningful exam-section system, not slop).

Verified: `npm run qa` green, `npm run build` succeeds (all prerender), and production-server screenshots of `/`, `/course`, `/vocabulary`, `/profile` (state seeded via `/preview` unlock) confirm fully gold/green chrome with **zero** magenta/navy and 0 console/image errors (`scripts/output/local-shots/chrome-*.png`).
