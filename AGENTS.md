# AGENTS.md — Adipoli German (A1 Exam Success Course)

Entry point for ANY coding agent (Claude Code, Codex, OpenCode, Gemini CLI, …). `CLAUDE.md` just imports this file.

A guided Goethe A1 course for Malayali learners: owner-recorded video spine + app practice/checkpoints/recovery. Full vision: `docs/PRODUCT_VISION.md`.

## Start every session

1. Read `docs/PRODUCT_VISION.md`, the current phase in `docs/ROADMAP.md`, and the last 5 entries of `docs/DECISIONS.md`.
2. Declare ONE operating mode and stay in it:

| Mode | Use when | May edit | Gate before done |
|---|---|---|---|
| Audit | Health check / something feels wrong | nothing | QC report with evidence |
| Product Architect | Changing learner experience/course structure | VISION, ARCHITECTURE, JOURNEY + DECISIONS entry | Decision logged |
| Documentation | Docs stale after work | `docs/` only | Patched existing doc — never a new file |
| Technical Architect | Schema/stack/route changes | TECH_ARCHITECTURE + DECISIONS entry | Design before code |
| Implementation | Building a ROADMAP phase | `src/`, content, scripts | `npm run qa` green + 390px playthrough evidence |
| QA | Before any "done"/launch claim | nothing | PASS/WEAK/FAIL per gate (`docs/QA_AND_EVALUATION_HARNESS.md`) |
| Regression/Fix | Something broke | minimal diff | qa green + cause noted |

## Anti-drift laws (non-negotiable)

1. **No new strategy/planning docs.** The 11 docs in `docs/` are the source of truth — patch them. Old docs (`docs/archive/`, `DEPRECATED_DOCS.md`) are history, not instructions.
2. **Direction changes require a `docs/DECISIONS.md` entry** naming what they supersede.
3. **Autonomous loops run Implementation/QA only**, against an approved ROADMAP phase — never strategy or vision work.
4. **The Reel Rule:** zero boring content; boring = sev-1 bug; outranks deadlines.
5. **Evidence over vibes:** never claim quality without screenshots/qa output; a report with no weaknesses is hallucinated. A lesson feel-grade (FLAT/OK/ADIPOLI) requires an actual playthrough (`docs/LESSON_QUALITY_STANDARD.md` Feel Rubric).

## Hard boundaries

- Don't touch: payment webhooks, auth/passkeys, Supabase schema, games code (hidden, not deleted), Remotion internals, `pilot/` media (canonical Kuttan references), the 18-module content files (map into the spine, don't rewrite).
- AI budget €100 cap; Gemini sparingly with the sparkle badge; the app must work with zero AI budget.
- German for learners is always pre-rendered native audio — never browser SpeechSynthesis.
- UI labels in plain English; Manglish only in teaching voice (`docs/LANGUAGE_STRATEGY.md`).

## Key paths

Content: `src/lib/content/modules/` + `goethe-tests.ts` · Store: `src/lib/store.ts` · SRS: `src/lib/srs.ts` · Lesson player: `src/app/play/[moduleId]/[lessonId]/` · Missions: `src/app/missions/` · Module 1 video pack: `course-production/a1-mvp/module-01/` · QC gates: `GermanCourse_QC/` (dated gate reports only).

## Tooling notes

- Quality gate: `npm run qa` (lint:mvp + typecheck + content/player/checkpoint/asset tests). Required before claiming any task done.
- Screenshots/playthroughs: headless puppeteer does NOT raster framer-motion content here; use Playwright with `channel: 'chrome'` (a Playwright MCP is configured for Claude Code in the workspace-root `.mcp.json`; other agents can drive Playwright directly).
