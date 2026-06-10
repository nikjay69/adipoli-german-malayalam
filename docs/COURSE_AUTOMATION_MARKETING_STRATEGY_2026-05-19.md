# Adipoli German — Full Course, Automation, and Marketing Strategy

Generated: 2026-05-19
Workspace: `/shared/german-course`

## Executive verdict

Adipoli German is strategically strong. The idea is not “another German app”; it is a **Kerala-rooted Goethe A1 preparation journey** built around Kuttan, Manglish explanations, games, speaking/listening/writing practice, and the emotional Kerala → Germany arc.

Current honest rating:

- **Product concept:** 9/10
- **Curriculum coverage:** 8/10
- **Exam-readiness execution:** 6.5–7/10
- **Automation foundation:** 7.5/10
- **Marketing readiness:** 6.5/10
- **Launch readiness:** not yet; beta-ready after fixes

The decisive next move is not adding more topics. It is converting the existing course from:

> expose → explain → quiz

into:

> story encounter → hear → produce → correct → review → checkpoint → exam confidence

## What exists now

### Core assets

- Workspace: `/shared/german-course`
- 18 A1 modules in `src/lib/content/modules/module-*.ts`
- 18 long module guide scripts in `scripts/output/module-*.script.md`
- 146 full lesson scripts in `docs/scripts/*_FULL_SCRIPT.md`
- 887 exercises total
- 197 production-style exercises, about 22.2% overall
- 758-ish vocabulary target from planning docs
- 8+ game/practice routes
- 54 app page routes
- Remotion video system
- TTS generation scripts
- Goethe A1 exam mapping docs
- Launch/payment scaffolding

### Key docs

- `docs/README.md`
- `docs/COURSE_PLAN_10_10.md`
- `docs/A1_STORY_BIBLE.md`
- `docs/MODULE_BLUEPRINTS.md`
- `docs/LESSON_BLUEPRINTS_PRIORITY.md`
- `docs/GOETHE_A1_EXAM_MAP.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `docs/SCRIPT_ARCHITECTURE.md`
- `docs/LAUNCH_CHECKLIST.md`
- `docs/INTRO_VIDEO_SCRIPT.md`
- `docs/AI_CINEMATIC_SCRIPTS_V4.md`

## Strategic identity

### The course should be sold as

**German A1 for Malayalis — a Kerala-to-Germany story course that prepares you for Goethe A1 with Kuttan, games, speaking, listening, writing, mock tests, and Manglish explanations.**

### Do not position it as

- generic Duolingo clone
- pure flashcard app
- random YouTube video bundle
- “AI generated German course”
- grammar dump

### The winning frame

The user is not buying “German lessons.” They are buying:

- confidence to start the Germany journey
- less fear of der/die/das
- a Malayalam/Manglish bridge into German
- exam structure instead of YouTube chaos
- emotional companionship through Kuttan
- proof they can actually speak/write/listen at A1

## Full course strategy

## 1. Canon and narrative discipline

The strongest differentiator is the story world. It must stay consistent.

### Canon rule

- A1 happens in Kerala.
- Kuttan prepares in Kerala.
- Germany is the destination/future dream, not the physical setting yet.
- Course ends with airport departure.
- A2 starts with arrival in Germany.
- Appu is a silent mascot/UI guide, not a speaking character unless deliberately changed.

### Current issue

Generated scripts still drift into Germany settings:

- Berlin supermarket
- German bakery
- TU Berlin Mensa
- Berlin WG
- Stefan/Lara scenes
- Tempelhofer Feld

That breaks the Kerala A1 arc. This must be corrected before serious video production.

### Action

Run script canon QA across all `scripts/output/module-*.script.md` and `docs/scripts/*_FULL_SCRIPT.md`:

- flag Germany-location scenes
- rewrite as Kerala preparation / imagined target / cousin call / exam scenario
- preserve practical German content
- keep emotional goal: “Kuttan is preparing to leave”

## 2. A1 exam-readiness spine

The course already covers many A1 topics. The gap is performance under exam conditions.

### Priority skills

1. Hören — highest risk
2. Schreiben — high risk
3. Sprechen — high risk
4. Lesen — relatively strongest

### The course spine should become

1. Module learning
2. Audio-first practice
3. Production exercises
4. SRS review
5. Checkpoint gate
6. Remediation loop
7. Goethe mock readiness

### Mandatory checkpoints

Add or enforce gates:

- After Module 2: self-intro + spelling name + basic form fields
- After Module 3: number/time/date/appointment dictation
- After Module 5: daily routine speaking/writing
- After Module 6: restaurant/shop roleplay
- After Module 14: form fill + formal email
- After Module 17: timed Hören/Lesen mock
- After Module 18: full Schreiben/Sprechen mock

### Scoring

- Under 50%: retry/remediation required
- 50–69%: warning + recommended retry
- 70–89%: pass
- 90%+: mastery

## 3. Hören strategy

Hören is the launch-critical exam gap.

### Current risk

If listening tasks show readable text, they are not real Hören prep.

### Required state

For every listening exercise:

- audio plays first
- transcript hidden until after answer
- replay limits where exam-like
- slow/natural speed variants for learning mode
- no visible German prompt unless task demands it

### Priority modules

- Module 3: numbers, times, dates, appointments
- Module 7: prices and shopping
- Module 9: travel/directions/announcements
- Module 14: forms and official life
- Module 17: Goethe Hören
- Module 18: final mock practice

### Automation

Generate:

- `public/audio/hoeren/{exerciseId}.mp3`
- `public/audio/dictation/{exerciseId}.mp3`
- transcript manifest
- duration manifest
- missing-audio report

## 4. Production exercise strategy

Docs demand at least 3 production exercises per lesson, but current overall production ratio is about 22.2%. The old audit threshold is too weak.

### Target

Every lesson should include:

- 1 free-text/type-answer task
- 1 speaking/shadowing task
- 1 listening/dictation task
- plus recognition tasks if useful

### Priority upgrades

- Module 2: self-introduction, name, age, origin, form fields
- Module 3: numbers/time/date appointment outputs
- Module 5: sentence building and routine narration
- Module 6: ordering and polite requests
- Module 14: forms, email, official messages
- Module 17: Hören/Lesen exam drills
- Module 18: Schreiben/Sprechen exam simulation

### Product rule

If a student can complete a lesson without typing/speaking/hearing German, that lesson is not finished.

## 5. Writing strategy

Schreiben should be practical and exam-safe.

### Need

- blank form-fill drills
- audio-to-form drills
- short email/message trainer
- model answer bank
- A1-safe correction rubric
- common error feedback

### Message templates

Build templates for:

- invitation
- cancellation
- appointment request
- thank-you
- asking for information
- apology
- short personal update

### Feedback principle

Reward short, correct, high-probability A1 German. Do not reward fancy B1/B2 language.

## 6. Speaking strategy

Speaking needs repeated performance, not just “practice page exists.”

### Required tools

- self-intro trainer
- topic-card generator
- request-card generator
- reaction phrase drills
- timed speaking prompts
- pronunciation/intelligibility feedback
- model answer replay

### A1 speaking patterns to drill

- `Ich heiße ...`
- `Ich komme aus ...`
- `Ich wohne in ...`
- `Ich lerne Deutsch.`
- `Ich möchte ...`
- `Können Sie bitte ...?`
- `Was kostet ...?`
- `Wann ist ...?`
- `Ich habe eine Frage.`

## 7. Lesen strategy

Reading is the strongest area but should become more exam-like.

### Add

- timed reading mode
- signs/ads/notices/email snippets
- keyword scanning drills
- distractor explanations
- short official forms/notices

## 8. Vocabulary and Goethe Wortliste strategy

### Principle

Do not maximize vocabulary count. Maximize:

- Goethe A1 coverage
- migrant survival usefulness
- production readiness
- repeated retrieval

### Actions

- Finish Wortliste cross-reference
- Add the missing A1 words
- mark out-of-scope words as optional/deferred
- ensure early modules contain the true basics early: hello, thank you, please, yes/no, name, origin, numbers
- auto-tag vocab by module, skill, frequency, exam relevance

## 9. Module 16 strategy

Module 16 should stay optional/A1+ bridge.

Do not make it mandatory before exam prep. It contains useful but potentially overload-heavy grammar:

- deeper dative
- two-way prepositions
- reflexives
- subordinate clauses

Exam-focused learners should go:

Modules 1–15 → Modules 17–18 → optional 16 if time.

## 10. Video strategy

Do not mass-render videos yet.

### Reason

Script quality is not stable enough:

- canon drift
- German-labelled English lines
- weird artifacts
- pacing issues
- too much explanation vs active output

### Correct order

1. Script QA
2. Canon cleanup
3. A1/pedagogy cleanup
4. Production-prompt insertion
5. TTS readiness check
6. Render pilot videos
7. learner test
8. scale only what works

### Pilot videos first

- Module 1: pronunciation/greetings
- Module 2: self-introduction
- Module 3: numbers/time
- Module 6: ordering
- Module 14: forms/email
- Module 17: Hören strategy
- Module 18: Schreiben/Sprechen mock

## Automation strategy

## Current automation base

Already present:

- `scripts/generate-scripts.ts`
- `scripts/validate-scripts.ts`
- `scripts/script_audit_loop.py`
- `scripts/repair_holdouts.py`
- `scripts/generate-narration.ts`
- `scripts/gen-tts.ts`
- `scripts/gen-pimsleur.ts`
- `scripts/generate-vocab-audio.ts`
- `scripts/generate-images.ts`
- `scripts/generate-thumbnails.ts`
- `scripts/render-video.ts`
- `scripts/compose-videos.ts`
- `scripts/audit-production.ts`
- `scripts/audit-missing-scripts.ts`
- Remotion components
- app routes for learn/practice/tests/games

The problem is not missing scripts. The problem is orchestration and mismatch between sources.

## Automation issue: source mismatch

Important finding:

- `docs/scripts` contains 146 full scripts.
- `validate-scripts.ts` only sees 6 source scripts and reports 140 missing.

That means script storage/wiring is inconsistent. Before generating more, build a sync layer.

## Recommended production CLI

Create one orchestrator with dry-run default:

`npm run course:inventory`

- count modules, lessons, exercises, scripts, audio, videos, thumbnails
- produce JSON + markdown report

`npm run course:qc`

- run content schema checks
- script validation
- exercise production audit
- Goethe coverage audit
- asset existence audit
- canon/story audit

`npm run course:repair-scripts`

- fix German-labelled English
- remove weird artifacts
- enforce script structure
- insert missing vocabulary examples
- add CTA/practice prompts
- preserve backup

`npm run course:sync-scripts`

- ingest `docs/scripts/*_FULL_SCRIPT.md`
- normalize into app-consumable content
- update `src/lib/content/video-scripts.ts` or generated module files
- preserve markdown as canonical or generated artifact

`npm run course:generate-audio`

- generate Hören audio
- generate dictation audio
- generate vocab audio
- generate narration audio
- verify mp3 duration

`npm run course:generate-exercises`

- detect lessons below production floor
- generate missing free-text/speaking/dictation/form tasks
- attach acceptable answers/rubrics

`npm run course:goethe-map`

- tag exercises by exam skill
- show Hören/Lesen/Schreiben/Sprechen coverage
- show missing task types

`npm run course:render-pilots`

- render only priority videos
- no bulk expensive rendering

`npm run course:marketing`

- generate reels, carousels, captions, WhatsApp posts, YouTube scripts from course content

`npm run course:predeploy`

- lint/build
- schema audit
- content audit
- media audit
- payment env audit
- route smoke tests

## Automation priority order

### P0 — this week

1. Script source sync: resolve docs/scripts vs app scripts mismatch
2. Batch script QC: `DE:` lines that are English, weird artifacts, canon drift
3. Upgrade production audit to lesson-level threshold
4. Missing audio/Hören audit
5. Marketing docs creation

### P1 — next

1. Hören/dictation audio generation
2. Production exercise generator
3. Goethe coverage dashboard
4. Script repair loop with backups
5. Preview index for scripts/audio/video status

### P2 — later

1. Remotion pilot batch render
2. Marketing content engine
3. Supabase analytics dashboards
4. Adaptive remediation
5. automated weekly release report

## Marketing strategy

## Positioning

### Primary line

**German for Malayalis. Kerala to Germany. Goethe A1 confidence.**

### Strong alternatives

- Pass Goethe A1, the Kerala way.
- Learn German with Kuttan — from Kerala to Germany.
- Der/die/das explained in Manglish.
- The first German A1 course built for Malayalis.

### Avoid overclaiming

Do not say “guaranteed pass” publicly until actual learner outcomes prove it. Use:

- Goethe A1 confidence
- exam-focused A1 prep
- structured A1 path
- mock-test readiness

## Target users

### Primary

- Malayali students planning Germany
- Goethe A1 beginners
- Ausbildung/nursing/study/work aspirants
- learners confused by generic German apps
- people who tried YouTube but need structure

### Secondary

- parents/family supporting Germany plans
- Malayali diaspora in Germany
- study abroad consultants
- Kerala language/institute partners

## Funnel

### Awareness

Channels:

- Instagram Reels
- YouTube Shorts
- WhatsApp shares
- Telegram/WhatsApp communities
- SEO pages
- Kerala/Germany creator partnerships

Hooks:

- “Der Die Das explained in Manglish.”
- “Goethe A1 speaking sample for Malayalis.”
- “Don’t say ‘Ich bin Kerala’.”
- “Kuttan’s first German sentence.”
- “Germany dream? A1 starts here.”

CTA:

- Try Lesson 1 free
- Start 3 modules free
- Download A1 checklist
- Take free readiness check

### Lead capture

Lead magnets:

- Goethe A1 checklist for Malayalis
- 50 German phrases Malayalis need first
- 7-day Kuttan Challenge
- A1 self-introduction template
- A1 writing/email template PDF

Capture:

- name
- email/WhatsApp
- goal
- exam timeline
- daily study time

### Activation

Goal: finish Lesson 1.

First session must deliver:

- Kuttan hook
- one German sentence spoken/typed
- one game/exercise win
- study plan setup
- save progress/signup

### Conversion

Free plan should unlock Modules 1–3.

Upgrade moments:

- tries Module 4
- completes Module 3
- opens mock tests
- enters exam date
- fails readiness and needs plan

Premium should be framed around exam outcome:

- mocks
- writing/speaking correction
- PDF scripts
- roleplay
- direct doubt clearing if available

### Retention

Loops:

- daily SRS due reminders
- weekly progress report
- Kuttan story progress
- checkpoint gates
- WhatsApp nudges
- streak protection
- readiness score

## Launch plan

### Pre-launch week 1: fix public contradictions

- Fix pricing inconsistency:
  - `src/lib/pricing.ts` says €14.99/€24.99
  - landing/pricing pages say €9.99/€19.99
- Remove unsupported “1000+ Malayalees” unless true
- Make payment readiness clear
- Create missing marketing docs or update README references

### Pre-launch week 2: beta cohort

Recruit 30–50 learners:

- friends/family network
- Kerala Germany aspirant groups
- study abroad contacts
- diaspora contacts

Ask them to complete Module 1 and give feedback.

Track:

- Lesson 1 completion
- confusion points
- signup friction
- upgrade intent
- testimonial permission

### Pre-launch week 3: content warmup

Post daily:

- Reels: micro-lessons and Kuttan story
- Carousels: Goethe A1 tips
- Stories: polls/quizzes
- YouTube Shorts: A1 speaking/listening samples

CTA: free Lesson 1 / waitlist / checklist

### Launch week

Daily themes:

1. Product reveal
2. Kuttan story
3. Goethe A1 exam prep
4. Games/mobile learning
5. Speaking/listening practice
6. Kerala cultural bridge
7. user proof + live Q&A

Offer:

- Free Modules 1–3
- founder discount
- free A1 checklist
- 7-day Kuttan Challenge

## Content calendar

Weekly structure:

- Monday: Germany dream / motivation
- Tuesday: micro German lesson
- Wednesday: Goethe A1 exam prep
- Thursday: culture bridge
- Friday: product demo
- Saturday: community/proof
- Sunday: live/Q&A/long-form

## 30-day starter topics

### Week 1

- German grammar feels impossible? Start here.
- Goethe A1 exam parts explained.
- Kuttan says Guten Morgen for the first time.
- Why Germany? study/job/Ausbildung poll.
- 3 German words every Malayali should know.
- Lesson 1 walkthrough.
- Live: How to start German from zero.

### Week 2

- Der Die Das in Manglish.
- A1 self-introduction template.
- Malayali mistake: “Ich bin Kerala.”
- German greetings quiz.
- Speaking practice product demo.
- beta learner quote.
- Goethe A1 speaking full sample.

### Week 3

- How to order coffee in German.
- 10 useful German verbs.
- Kuttan at a Kochi café practicing German.
- Choose Kuttan’s next line.
- Games product demo.
- Modules 1–3 free offer.
- Writing correction live.

### Week 4

- Can you pass this A1 listening question?
- A1 email format.
- Kuttan exam-day scene.
- When is your A1 exam? poll.
- Mock tests product demo.
- user progress/testimonial.
- upgrade CTA.

## Pricing recommendation

Use one consistent public price.

Recommended early-stage:

- India Pro: ₹499/month
- India Premium: ₹999/month
- EU/global Pro: €9.99/month
- EU/global Premium: €19.99/month

Reason:

- Kerala price sensitivity
- early product still needs proof
- premium can be exam-focused, not feature clutter

Add annual plan later after retention is known.

## Metrics

### North-star

- Lesson 1 completions
- Module 3 completions
- free-to-paid conversion
- Goethe readiness score improvement

### Activation

- landing → lesson start
- lesson start → completion
- completion → signup
- first speaking/listening task
- first SRS review

### Conversion

- Module 3 completion → upgrade
- pricing page → checkout start
- checkout start → payment
- free → Pro
- free → Premium

### Retention

- D1 / D7 / D14 / D30
- weekly active learners
- SRS completion
- checkpoint pass rate
- lessons per week

### Learning outcome

- Hören accuracy
- Schreiben score
- Sprechen completion
- vocabulary retention
- mock test score

## Immediate action plan

## Next 48 hours

1. Continue overnight QC on scripts.
2. Batch-scan scripts for:
   - English under `DE:` labels
   - weird non-German/Malayalam artifacts
   - Germany-setting canon drift
3. Generate a master course inventory report.
4. Fix pricing inconsistency decision doc.
5. Create missing marketing docs:
   - `docs/CAMPAIGN_PLAN.md`
   - `docs/INSTAGRAM_MARKETING_PLAN.md`
   - `docs/MARKETING_VIDEO_PLAN.md`

## Next 7 days

1. Upgrade production audit to lesson-level rules.
2. Build script sync plan for `docs/scripts` → app content.
3. Build Hören audio missing report.
4. Fix Module 2/3 canon drift first.
5. Generate 10 launch reels scripts from course assets.
6. Prepare beta cohort intake + feedback form.

## Next 30 days

1. Lock canon-safe scripts for Modules 1–3, 14, 17, 18.
2. Add missing production exercises in priority modules.
3. Generate Hören/dictation audio for priority modules.
4. Render only 5–7 pilot videos.
5. Run 30–50 learner beta.
6. Fix onboarding, pricing, payment, analytics.
7. Launch free Modules 1–3 with Instagram/YouTube/WhatsApp funnel.

## Decision points for Boss

1. Public pricing:
   - keep €9.99/€19.99 or raise to €14.99/€24.99?
2. Promise strength:
   - “Goethe A1 confidence” vs “pass Goethe A1” vs “guaranteed pass”
3. Canon strictness:
   - A1 fully Kerala-only, or allow some Germany scenes as simulations?
4. Premium support:
   - direct doubt clearing included or not?
5. Launch mode:
   - private beta first, or public soft launch?

## My recommendation

Choose:

- pricing: ₹499/₹999 and €9.99/€19.99
- promise: “Goethe A1 confidence”
- canon: strict Kerala A1, Germany only as dream/future/simulation
- launch: private beta first, then public soft launch
- premium: include exam mocks + writing/speaking correction; avoid promising unlimited human support unless operationally ready

Bottom line:

**This can become a very strong product. But the next phase must be disciplined: QC, production exercises, Hören realism, Goethe checkpoints, and a clean Malayali-first launch funnel. No more shiny generation until the course spine is reliable.**
