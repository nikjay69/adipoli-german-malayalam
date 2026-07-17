# A1_COURSE_ARCHITECTURE.md — The 8-Module Spine

Status: **Source of truth.** Established 2026-06-11. Supersedes `A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md` (archived; consult it for per-lesson must-do sequences until they are wired into the app) and `WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`.

## Structure verdict

**Keep + bridge.** The 8-module MVP spine (June 2026) is the course. The existing 18 app modules (`src/lib/content/modules/module-*.ts`) are NOT deleted — they are remapped as the practice **Library** that the spine's recovery prescriptions and practice blocks point into.

## Module rhythm (every module, no exceptions)

`scene hook → video lesson → app practice → closed mini-check → secure: spiral forward / weak: exact recovery → fresh retest → module diagnostic → next module`

A learner never has to choose from a library. The app shows the next required block. The A1 foundation is common; results change the support, repetition and timing, not the destination (DECISIONS #22).

## The 8 modules

| # | Module | Learner outcome | Grammar | Skill milestones | Library source (old app modules) |
|---|---|---|---|---|---|
| 1 | **First German moment** | Hear, greet, pronounce, hold a tiny formal/informal exchange | sein basics, pronouns ich/du/Sie | 🗣 First real conversation | M1 + module-1 missions |
| 2 | **Identity, numbers, time** | Introduce self, spell, give origin/job/languages, numbers 0–100, time/dates | haben, present tense, W-Fragen | 🗣 Full self-intro (= Sprechen Teil 1) · ✍ name/address fields | M2 + M3 + module-2 missions |
| 3 | **People, home, daily life** | Family, describing people, home/rooms, present-tense routine | articles, possessives, plural basics, sentence order | 👂 Short dialogues | M4 + M5 + M8 basics |
| 4 | **Food, shopping, money** | Order, buy, prices, likes/dislikes | accusative survival (einen/eine/ein), negation nicht/kein | 🗣 W-Frage asking (Teil 2) · 📖 ads/menus · **Mini-mock gate** | M6 + M7 |
| 5 | **Travel, services, health** | Directions, tickets, announcements, appointments, doctor/pharmacy | modal verbs (können/müssen/möchten), common prepositions | 👂 announcements · 🗣 service requests · ✍ appointment-detail mini-form | M9 + M10 |
| 6 | **Work, study, free time, messages** | Work/study/hobbies/weather/plans, invitations, simple email/SMS | separable verbs (practical), simple connectors | ✍ 30-word email, 3 Inhaltspunkte (Teil 2) · 🗣 requests (Teil 3) · **Half-mock gate** | M11 + M12 |
| 7 | **Official life and exam skills** | Forms, notices, ads, emails, office/bank language, reading strategy | simple requests, spiral review | 📖 Notices/signs at exam level · audio-to-form transfer · **Full-mock gate** | M14 + M17 (Lesen/Hören prep) |
| 8 | **Goethe A1 Bootcamp** | Timed mocks, all section strategies, recovery loops, final 7-day plan | none new — spiral review | All four skills exam-ready · 2–3 timed full mocks | M17 + M18 + `goethe-tests.ts` (8 mocks) |
| + | **A1+ bridge** (optional, post-exam) | weil/dass, reflexives, dative depth | — | Clearly labeled "after your exam" | M16 |

The canonical one-row-per-video teaching, proof, recovery, retest and spiral contract is `reference/GOETHE_A1_EXAM_MAP.md`. Its 56 lesson IDs (`M1L1`–`M8L7`) are also the production inventory IDs. The old 18-module source IDs are reusable inputs, never the learner-facing curriculum identity.

### Module identity layer — 2A v0.1 candidate

All eight modules use one template and one state model. Identity comes from a numbered scene flag, a real scene anchor, one restrained accent, and the module’s existing outcome—not eight unrelated brands.

| Module | Scene anchor | Accent |
|---|---|---|
| M1 · First German moment | Goethe-Kochi classroom (`hub-goethe-kochi-classroom`) | rose `#E94560` |
| M2 · Identity, numbers, time | study desk (`hub-study-desk`) | berry `#B2467F` |
| M3 · People, home, daily life | Thrissur home (`hub-thrissur-home`) | moss `#7A8B2F` |
| M4 · Food, shopping, money | chayakkada (`hub-chayakkada`) | tangerine `#F97316` |
| M5 · Travel, services, health | dream platform (`hub-dream-platform`) | sky `#3B82F6` |
| M6 · Work, study, free time, messages | Kerala–Germany video call (`hub-video-call-wg`) | violet `#A855F7` |
| M7 · Official life and exam skills | Amt office (`hub-amt-office`) | teal `#14B8A6` |
| M8 · Goethe A1 Bootcamp | exam hall (`hub-exam-hall`) | forest + gold numeral; no competing action accent |

Required module states are completed, current, checkpoint due, recovery required, read-ahead, and focused/keyboard-active. Every state uses wording and/or an icon in addition to colour. Locked modules remain readable at outcome and lesson-title level; the gate blocks progression, not curiosity.

### Fate of old modules 13, 15, 16

- **M13 (Perfekt)**: only A1-safe chunks for short personal talk (`Ich war krank`, `Am Wochenende habe ich gelernt`) as score-boosters / Module 8 expression support. No Perfekt depth in must-do.
- **M15 (culture)**: short context inserts inside relevant spine modules. Not a standalone module.
- **M16 (A1+)**: the optional post-exam bridge unit only.

## Video lessons

- 7 owned video lessons per module, 56 total. **All 56 are a launch gate** (DECISIONS #21), not a post-launch enhancement backlog. At the 15–18 minute target, the honest planning range is roughly **14–17h finished**; the public promise is the 56 dense lessons, not an hour claim. Per-module runtime is whatever the material honestly needs after the boredom scan.
- Module 1's teaching structure passed its 2026-06-10 quality gate in `course-production/a1-mvp/module-01/`, but those scripts are **not record-ready again** until the cast constitution/migration is complete, all seven scripts are honestly rebudgeted against the 15–18 minute target (shorter only when the teaching is complete; overlong drafts cut/split), and their mastery artifacts match the 56-row contract.
- Each video lesson: one hook tied to a real A1 situation · 3–7 useful German chunks · Manglish explanation where it helps · practice pauses (`[PAUSE 3s]` model→silence→model) · exam link · the immediate next app task. Owner speaks Malayalam/Manglish; **all reviewable German lines are pre-rendered audio** (owner reacts, never voices the models).
- The app practice path remains a playback-resilience and reinforcement layer, but a valid app-only fallback does not make a lesson launch-complete. A lesson counts toward the 56 only when its approved video master, captions, native German audio, manifest/checksum, delivery URL, and mobile playback evidence all exist.
- Recording spec pattern and per-lesson outlines: see `course-production/a1-mvp/module-01/` and archived syllabus §3 for modules 2–8 lesson lists.

### Module 1 vertical-slice production contract

Module 1 is the template for scaling, but it is complete only as an end-to-end teaching system—not when seven videos merely render. Before the first final owner recording, all seven rows `M1L1`–`M1L7` must have:

1. a frozen learner outcome, 3–7 German chunks, Goethe transfer, Nivin/Meera/Frau Fischer scene role, exact transcript and native-model-audio list;
2. a dense script targeting 15–18 minutes—with a shorter runtime allowed only by the Reel Rule—with owner lines, `[PAUSE 3s]` learner turns, one Malayali mistake repair, insert map and explicit next app action;
3. app practice with listening, at least two speaking outputs, one typed/written output where relevant, and no recognition-only completion;
4. a closed mini-check with stable tags, one exact recovery route per emitted tag, at least two fresh retest variants, and a later SRS/spiral return;
5. the Module 1 survival-oral gate using unseen items and real production, plus zero unresolved core tags;
6. German correctness/native-audio review, Manglish read-aloud review, Wortliste/theme check, Feel Rubric playthrough and boredom scan;
7. the video delivery artifacts required by DECISIONS #21: approved master, captions/transcript, audio references, render report/full decode, checksum manifest, stable delivery URL and verified mobile playback.

The reviewed `M1L1` slice proves the production mechanics and measured effort. The completed seven-lesson module proves the reusable pedagogy. Neither proof authorises batch production of M2–M8 until its failed gate is corrected.

## Checkpoints and gates

**Lesson mini-checks** (after every video lesson): closed-book, 5–8 tasks in 5–8 min, ≥1 production action (say/type/fill/dictate), every miss emits weakness tags. Secure = ≥70% **and** every required production task complete. Any failed core tag → exact micro-recovery → fresh-item retest before the next required lesson. Supporting tags may travel only as mandatory scheduled recovery.

**Module diagnostics** (end of each module): closed-book, 20–35 min, weighted toward the module's exam-relevant output. Results: `secure` → continue + spiral review · `supported_progress` → no core/production failure, continue with mandatory scheduled recovery for supporting tags · `recovery_required` → next module locked until fresh weak-tag retest passes. Thresholds: recognition 70% · controlled grammar/vocab 70% · production rubric ≥3/5 with no missing required content point · modules 7–8: ≥60% per Goethe section. A high average never hides a failed core tag or missing production.

**Goethe-style gates:**

| Gate | After | Tests | Unlock rule |
|---|---|---|---|
| 1 Survival oral | M1 | Hören + Sprechen | Required speaking/greeting tasks complete |
| 2 Personal-info foundation | M2 | Sprechen Teil 1 + numbers/time Hören + form basics | No critical weakness in spelling/numbers/self-intro |
| 3 Daily-life interaction (mini-mock) | M4 | Hören details + requests + signs/prices | Pass Hören details + request rubric |
| 4 Writing & topic cards (half-mock) | M6 | Schreiben Teil 2 + Sprechen Teil 2 + messages | Message has all 3 content points |
| 5 Exam bridge (full mock) | M7 | Goethe Hören/Lesen + Schreiben Teil 1 | ≥60% per tested section, form complete |
| Final mocks | M8 | Full Goethe A1, timed ×2–3 | **A1 Ready:** two distinct mocks ≥75, no section <60, all core tags secure, writing evidence complete, full speaking simulation on two days |

Mock result bands: `ready` ≥75 & no section <60 · `close` 60–74 & no section <45 · `risky` one section <45 or 50–59 overall · `not ready` <50 or missing production. A single ready mock is evidence, not the final state; two distinct ready mocks are required.

## Revision system

- **SRS** (SM-2, exists in `src/lib/srs.ts`): daily 5-min due-card review surfaced on the Today screen from Module 1.
- **Recap**: every module ends with a recap mission before its diagnostic.
- **Spiral review**: each module diagnostic samples 2 earlier modules.
- **Cheatsheets/revision cards**: one per lesson (see `LESSON_QUALITY_STANDARD.md`).
- **No orphan weakness**: every emitted tag has an exact recovery and at least two unseen retest variants; every supporting tag is cleared before A1 Ready.

## Rule for adding content beyond the spine

Add video/lessons only when a checkpoint weakness repeats across learners; the addition must map to one weakness tag, have a retest task, and prefer *replacing* a weak lesson over increasing total hours. Never add hours to hit a duration promise (Reel Rule).

## Saved for A2

Module-16 depth beyond the bridge unit · Perfekt expansion · narrative content set physically in Germany · longer connected writing.
