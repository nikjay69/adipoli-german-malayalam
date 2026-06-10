# Adipoli German Product UX Redesign Audit

Date: 2026-05-20
Scope: first-time home, onboarding entry, lesson/play route, first vocab-discovery flow, source inspection.

## Verdict

Boss is right: the app has course content, but the product experience still feels messy rather than premium. The biggest issue is not only visual styling. It is product sequencing: too many systems compete before the learner gets a first win.

The app needs to behave like a guided, emotionally warm course product, not like a dashboard containing lessons, games, search, tips, streaks, onboarding, and practice tabs all fighting for attention.

## Evidence from visual QA

### First-time home before patch

Observed problems:

- Primary action competed with setup, daily challenge, tip card, progress stats, bottom nav, search, and mascot card.
- New user saw too much status before any learning had happened.
- The first CTA was less emotionally specific than it should be.
- Bottom navigation crowded lower content.
- Search floated on screens where the learner needed focus, not discovery.

### First-time home after patch

Improved:

- New-user home now centers one clear CTA: `Learn your first German words` → `LET'S GO`.
- Setup, daily challenge, and tip card are hidden until after first lesson progress.
- The first promise is better: `Hear, tap, and speak — get a real win before any setup.`
- Extra bottom padding prevents the bottom nav from swallowing the CTA area.

Still weak:

- Top progress header is still heavy for a zero-progress learner.
- Search still appears globally and may distract during first-run focus.
- The first module duration label still says `45 min`, which is truthful but not motivational for a first micro-win. The app needs a distinction between `first win` and `full lesson`.

### First vocab-discovery screen before patch

Observed problems:

- Auto-advanced from absorb to challenge after time / all taps. This made the flow feel rushed and potentially broken.
- Cards looked functional but not premium enough.
- Learner did not get enough explicit feedback that meaning appears after tap.
- The scene hint was too low-contrast.

### First vocab-discovery screen after patch

Improved:

- Learner now stays in absorb mode until they explicitly press `Start the quick check`.
- A central instruction card explains: `Listen to each German word.`
- Progress is explicit: `0/6 heard · meaning appears after tap`.
- Tapped cards reveal meaning + checkmark.
- Visual treatment is more premium: stronger contrast, card shadows, consistent speaker icon, less frantic pulsing.

Still weak:

- Search button still appears in focused play routes.
- Close and skip both exist; distinction may be unclear.

### WordNinja challenge

Observed problems:

- The moving target game clipped words at screen edges.
- Target sometimes did not visibly appear quickly enough.
- Distractors repeated visibly.
- The interaction asked for speed before confidence; bad for a first A1 moment.

Patch decision:

- WordNinja was removed from the first vocab-discovery cycle for now.
- First-time vocab challenge now uses safer challenge types: `listen-blast` and `word-builder`.
- WordNinja was partially improved but should not be used in early first-win flow until redesigned.

## Source-level findings

### Product architecture problem

`src/app/layout.tsx` injects both:

- `<Navigation />`
- `<GlobalSearch />`

globally. Navigation is hidden on `/play`, but `GlobalSearch` is not. This creates distraction during immersive learning moments.

### Home problem

`src/app/page.tsx` mixed these concerns for new users:

- progress dashboard
- Kuttan message
- study-plan setup
- next lesson
- readiness score
- daily challenge
- tip of the day
- bottom nav
- search

That is too much for low-attention first use.

### Challenge problem

`src/components/game-engine/VocabDiscoveryGame.tsx` previously auto-transitioned from learning to challenge. That violates user control and makes the course feel jumpy.

### WordNinja problem

`src/components/exercise-games/WordNinja.tsx` used random distractor selection and off-edge spawn positions. That is why the game can look repetitive/clipped and why a target can fail to feel available. It is not premium enough yet.

### Lint/build health problem

Full lint still fails with many pre-existing errors. Targeted lint for touched files passes:

- `src/app/page.tsx`
- `src/components/game-engine/VocabDiscoveryGame.tsx`
- `src/components/exercise-games/WordNinja.tsx`

Full TypeScript check currently fails in pre-existing file:

- `src/app/games/verb-rush/page.tsx` — JSX closing tag mismatch.

This matters because a premium product needs a clean CI gate, not only visual patches.

## Research-backed design principles to apply

Sources checked:

- NN/g 10 usability heuristics: visibility of system status, match with real-world language, user control/freedom, consistency, recognition over recall, aesthetic/minimalist design.
- NN/g recognition vs recall: recognition is easier than recall; memory activation improves with practice, recency, and context.

Translate that into Adipoli rules:

1. One screen = one job.
   - First screen should not ask for setup, games, search, practice, and tips.
   - First screen should produce one learning win.

2. Micro-win before configuration.
   - Do not ask for study plan before the learner has tasted value.
   - First 3 minutes should be: hear → tap → speak → tiny success.

3. Recognition before production, then production.
   - A1 learners first recognize words with context.
   - Then they speak/write one tiny output.
   - Do not jump into speed games before the learner feels competent.

4. User control beats surprise animation.
   - Animations should support attention, not yank the learner into a new phase.
   - No hidden auto-advance in core learning steps.

5. Kuttan should create emotional continuity, not clutter.
   - Kuttan should appear as a companion at meaningful transitions.
   - Do not use mascot text as another random card fighting the CTA.

6. Premium means restraint.
   - Fewer widgets.
   - Better hierarchy.
   - Clear affordances.
   - Calm movement.
   - No clipped game objects.
   - No visible broken/placeholder behaviors.

## Changes made in this pass

### `src/app/page.tsx`

- Added bottom padding to reduce nav overlap.
- Hid study-plan setup until after first lesson progress.
- Hid daily challenge until after first lesson progress.
- Hid tip card until after first lesson progress.
- Rewrote first CTA card around a first learning win.
- Improved CTA hierarchy and first-use message.

### `src/components/game-engine/VocabDiscoveryGame.tsx`

- Removed auto-advance from absorb mode.
- Added explicit instruction/progress card.
- Improved vocab card contrast, speaker icon, and tapped-state feedback.
- Added explicit `Start the quick check` button.
- Removed WordNinja from the first vocab-discovery challenge cycle.

### `src/components/exercise-games/WordNinja.tsx`

- Rotates distractors instead of pure random repeats.
- Spawns from visible screen edges instead of off-screen coordinates.
- Shows target first.
- Adds clearer instruction text.
- Moves win/lose handling into event/update handlers.

Note: WordNinja is still not safe enough for early learner flow. It needs a redesign lane.

## New quality bar

A screen fails if any of these happen:

- More than one primary action is competing.
- Learner sees setup before value.
- Learner is forced into a transition without choosing it.
- Game words are clipped, repeated, or invisible.
- A first-time learner can ask, “what am I supposed to do?”
- A learner must read a paragraph before taking action.
- Mascot/progress/search/nav distract from the current task.
- The screen looks like a component dump instead of a guided lesson.

## Recommended redesign lanes

### Lane 1 — First 3 minutes / activation flow

Goal: make the first session addictive enough that a learner wants lesson 2.

Required flow:

1. Home: one CTA only.
2. Kuttan sets emotional mission in one line.
3. Hear 4–6 words.
4. Tap to reveal meaning.
5. Quick recognition check.
6. Speak one phrase.
7. Celebration: `You can already say X in German.`
8. Ask for study plan only after that.

### Lane 2 — Module 2 gold-standard product flow

Module 2 should become the first full standard because self-introduction is high-value and Goethe-relevant.

Score it on:

- first screen hook
- video placement
- exercise variety
- speaking output
- visual polish
- Kuttan emotional beat
- Goethe usefulness
- next-lesson pull

### Lane 3 — Immersive mode cleanup

- Hide global search on `/play`, `/intro`, `/onboarding`, `/tests/*`, and focused practice routes. **Status: first patch applied.**
- Ensure close vs skip are semantically clear.
- Create one consistent top bar for immersive lessons.
- Reduce bottom/floating controls in focused moments.

### Lane 4 — Exercise redesign

Replace repetitive clicking with a ladder:

1. Recognize.
2. Match.
3. Choose in context.
4. Say it.
5. Type/write it.
6. Use it in Kuttan scene.

Every lesson should avoid repeating the same click pattern more than twice in a row.

### Lane 5 — CI/product health

- Fix TypeScript JSX error in `verb-rush`.
- Clean lint enough to make touched flow reliable.
- Add route smoke tests for `/`, `/play/1/1-1`, `/play/2/2-1`, `/games`, `/practice`, `/tests`.
- Add visual screenshot checks for mobile.

## Next safe implementation slice

Do not redesign the whole app at once.

Next slice should be:

1. Hide `GlobalSearch` on `/play`, `/intro`, `/onboarding`, `/tests/*`, and focused practice routes. **Done for first pass.**
2. Patch `/play/1/1-1` first-win ending to include a speak-aloud moment and a clearer celebration.
3. Build Module 2 scorecard using `docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md`.
4. Then redesign Module 2 as the gold-standard full product flow.

## Current local test endpoint

- Tailscale: `http://100.96.56.53:3000`
- Local: `http://127.0.0.1:3000`

## Evidence screenshots from browser QA

- Revised home screenshot: `/home/nikhi/.hermes/cache/screenshots/browser_screenshot_6ec1fb75a22e4e82a58c8b3da2a0de4b.png`
- Revised vocab absorb screenshot: `/home/nikhi/.hermes/cache/screenshots/browser_screenshot_875a15fdc2eb4108a095c8923dcc3ee4.png`
- Problematic WordNinja screenshot: `/home/nikhi/.hermes/cache/screenshots/browser_screenshot_2da995586bd246b3952fcba6776c0b68.png`
