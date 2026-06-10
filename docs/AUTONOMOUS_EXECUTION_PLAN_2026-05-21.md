# Adipoli German — Autonomous Execution Plan

Generated: 2026-05-21

## Purpose

Boss does not have time to babysit. The agent must work autonomously, but not drift into the wrong direction.

This plan defines:

- what the agent can do alone,
- what needs Boss input,
- the order of execution,
- the quality gates,
- the reporting format.

## North star

Build a course people recommend because it feels made for their real Malayali/Germany/Goethe A1 journey.

The June 2026 MVP is not a games app and not an AI-tutor demo. It is:

> A spoon-fed A1 video course: ~35h guided lessons, must-do practice, closed tests, weakness diagnosis, exact recovery tasks, and Goethe A1 exam readiness.

The app should not feel like a dashboard, flashcard library, or random game pile. Missions/scenes are the lesson experience; diagnostics and recovery are the adaptive spine.

## Autonomous authority

### Agent can do without asking

The agent can independently:

1. Read all course docs and source files.
2. Create mission maps for modules.
3. Rewrite app/course docs to clarify direction.
4. Create new local routes/components for pilots.
5. Refactor local UI components if changes are reversible and scoped.
6. Add non-destructive files under `src/`, `docs/`, and `GermanCourse_QC/`.
7. Patch obvious UX blockers.
8. Patch obvious canon drift.
9. Patch obvious German label/artifact issues.
10. Run local dev server and browser QA.
11. Use screenshots/visual inspection to judge quality.
12. Write timestamped QC reports.
13. Create local scripts for audits or content inventories.
14. Keep work local until Boss approves deployment.

### Agent must ask before

The agent must ask before:

1. Deleting files or mass-archiving docs.
2. Rewriting entire modules in production content.
3. Changing pricing/payments/auth/business logic.
4. Deploying to Vercel or pushing to GitHub.
5. Using paid APIs or spending credits at scale.
6. Sending external messages/marketing.
7. Changing the core Kerala/Kuttan/Goethe identity.
8. Removing major existing features rather than hiding/quarantining them.
9. Committing to a large architecture migration after the pilot.

## What Boss needs to provide

Minimal. Only these high-leverage inputs:

### 1. Taste approval

Boss should review the compact syllabus/rubric first, then later test the first module path on Tailscale and answer:

- Does this feel like the right product?
- Is the spoon-feeding clear enough for the target audience?
- Would a Malayali beginner continue?
- Are Kuttan/Manglish/scene elements helpful or annoying?

This can be a 2-minute voice note.

### 2. Malayalam/Manglish taste corrections

Agent can draft Manglish, but Boss should correct anything that feels cringe, unnatural, or off-brand.

### 3. Real learner target nuance

Boss should correct assumptions about:

- target age,
- typical learner motivation,
- preferred Malayalam/Manglish tone,
- price/value expectation,
- what makes people recommend it.

Only when needed. The agent should not ask constantly.

### 4. Deployment/credential approvals

Boss must approve:

- GitHub push,
- Vercel deployment,
- paid generation,
- credential setup.

## What the agent should do next

### Phase 0 — Consolidate direction

Status: done on 2026-06-02.

Active source-of-truth files:

- `docs/README.md`
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `/shared/plans/adipoli-master.md`

Do not create new broad planning docs. Patch the brief/index.

### Phase 1 — A1 MVP syllabus + assessment spine

Create or patch the smallest possible artifact that defines:

1. learner-facing modules,
2. lesson count and video minutes toward ~35h,
3. Goethe A1 skill coverage,
4. must-do path,
5. score-booster path,
6. closed-test cadence,
7. weakness tags,
8. manual scoring rubrics for speaking/writing,
9. exact recovery prescriptions.

### Phase 2 — Build one module in final MVP format

Module 2 self-introduction is a strong first candidate, but the output must prove the full course/checkpoint pattern:

1. Video lesson outline/script.
2. Audio-first scene/mission.
3. Speaking production.
4. Writing production.
5. Hören/Lesen check.
6. Module diagnostic.
7. Manual scoring tags.
8. Recovery and score-booster prescriptions.

### Phase 3 — Visual QA loop

Test locally with browser at:

- desktop
- mobile viewport if possible
- Tailscale URL

QA criteria:

- one main action per screen,
- no tiny tap targets,
- no text walls,
- no broken animations,
- no confusing global UI,
- learner always knows why this matters,
- learner speaks/writes before completion.

### Phase 4 — Boss taste checkpoint

Send Boss:

- Tailscale URL,
- 3 screenshots max,
- what changed,
- exact questions for feedback.

Do not ask for long review. Ask for taste verdict.

### Phase 5 — Generalize only if pilot works

If Boss approves direction:

1. Convert pilot into reusable mission engine.
2. Apply to rest of Module 2.
3. Apply to Module 1 and 3.
4. Continue act by act.

If Boss rejects direction:

- fix the product model before scaling.

## Quality gates

A mission is not good enough unless:

1. Learner knows the situation in under 5 seconds.
2. German appears as a useful tool, not a random subject.
3. The learner hears German early.
4. The learner produces German before completion.
5. There is at least one mistake-repair moment.
6. Kuttan adds stakes or warmth, not noise.
7. Visual hierarchy is clear.
8. Motion helps feedback, not decoration.
9. Ending creates a concrete ability statement.
10. It maps to Goethe A1 skills.

## Reporting format

Each autonomous work block should report:

- **Built:** files/routes changed.
- **Why:** product reason.
- **Verified:** tests/browser/visual checks.
- **Weak:** what still bothers the agent.
- **Need Boss:** only high-leverage feedback/approval.

## Current recommendation

Start Phase 1 immediately:

> Draft the A1 MVP syllabus and test/recovery rubric, then convert Module 2 into the first complete module template.

Boss help needed only after there is a compact syllabus/rubric to approve or a real module path to taste.
