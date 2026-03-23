# Module Readiness Assessment — Adipoli German für Malayalis

> Per-module launch readiness tracker. Evaluates each module across five dimensions:
> scripts, exercises, audio, production tasks, and exam alignment.
>
> **Created:** 2026-03-23 10:15 UTC (overnight cron run)
> **Source data:** MODULE_BLUEPRINTS.md, SCRIPT_PRODUCTION_TRACKER.md, COURSE_PLAN_10_10.md

---

## Readiness Scoring

Each module scored on 5 dimensions (0–3 each, max 15):

| Score | Meaning |
|-------|---------|
| 0 | Not started |
| 1 | Skeleton / architecture only |
| 2 | Drafted but needs review/gaps |
| 3 | Launch-ready |

Dimensions:
- **S** = Script layer (video narration scripts)
- **E** = Exercise coverage (recognition + production)
- **A** = Audio readiness (listening/Hören support)
- **P** = Production exercises (free-text, dictation, speaking drills)
- **X** = Exam alignment (direct Goethe A1 task mapping)

---

## Per-Module Readiness

> **Last updated:** 2026-03-23 11:03 UTC (overnight cron run 5)
> **Script audit:** 56 full scripts exist in docs/scripts/. Previous counts were stale.

### Module 1: Welcome to German! (Willkommen!)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 2 | 4/~8 scripts drafted (v1-2-1, v1-3-1, v1-3-2, v1-4-1). Missing: v1-1-1, v1-1-2, v1-2-2, v1-5-1, v1-6-1 |
| E | 2 | 48 exercises exist, mostly recognition |
| A | 0 | No audio clips generated |
| P | 0 | No production exercises (dictation, imitation, free-text) |
| X | 1 | Indirect exam relevance (phonetics → Hören/Sprechen) |
| **Total** | **5/15** | |

**Blockers:** Missing motivation/career scripts reduce onboarding power. No pronunciation audio drills.
**Next action:** Draft v1-1-1 and v1-2-2 (tricky sounds is higher teaching value than career stories). Add 3–5 audio imitation exercises for umlauts and `ch`/`sch`.

---

### Module 2: Who Are You? (Wer bist du?)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 2 | 3/4 scripts drafted (v2-1-1, v2-2-1, v2-3-1). Missing: v2-1-2 (supplementary) |
| E | 2 | 40 exercises, mainly recognition |
| A | 0 | No audio for listening drills |
| P | 1 | /practice/intro exists but not integrated into module flow |
| X | 3 | Directly maps to Sprechen Teil 1 + Schreiben Teil 1 |
| **Total** | **8/15** | |

**Blockers:** v2-1-2 is low-priority supplementary. Main gap is production exercises IN the module (not just practice page).
**Next action:** Add 3 free-text exercises (self-intro writing, form-filling, name-spelling) directly into lesson data. Wire /practice/intro more visibly from Module 2 completion screen.

---

### Module 3: Numbers & Time (Zahlen und Zeit)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 3 | ✅ All 4 core scripts drafted (v3-1-1 through v3-4-1) |
| E | 2 | 33 exercises, recognition-heavy |
| A | 0 | No audio — critical gap for a module where Hören is the #1 exam test |
| P | 0 | No dictation, no number-hearing drills |
| X | 3 | Directly maps to Hören (prices, times, dates, phone numbers) |
| **Total** | **8/15** | |

**Blockers:** AUDIO IS THE SINGLE BIGGEST GAP. Numbers/time are tested audio-first in Goethe A1. Without listening drills, this module teaches recognition but doesn't prepare for the exam.
**Next action:** Generate edge-tts audio for number sequences, clock times, and date dictation. Add 5–8 audio-only number discrimination exercises.

---

### Module 4: My Family & People (Meine Familie)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 3 | ✅ All 3 core scripts drafted (v4-1-1, v4-2-1, v4-3-1) |
| E | 2 | 33 exercises, recognition-based |
| A | 0 | No audio |
| P | 0 | No speaking or writing output tasks |
| X | 2 | Moderate exam relevance (family description in Sprechen, articles throughout) |
| **Total** | **7/15** | |

**Blockers:** Article/possessive practice is recognition-only. Needs production to build real accuracy.
**Next action:** Add 2 free-text exercises (describe your family, use possessives in sentences). Add 1 speaking task (present one family member).

---

### Module 5: Daily Routine (Mein Tag)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 2 | 4/5 scripts drafted. Missing: v5-1-2 (Practice with Common Verbs — supplementary) |
| E | 2 | 32 exercises, recognition-focused |
| A | 0 | No audio |
| P | 0 | No conjugation production, no routine writing tasks |
| X | 3 | Present tense is the backbone of A1; daily routine is standard Sprechen topic |
| **Total** | **7/15** | |

**Blockers:** v5-1-2 is supplementary but useful. Main gap: no conjugation OUTPUT tasks. Students can recognize correct forms but can't produce them.
**Next action:** Add 3 conjugation production exercises (fill-in with typed answer, not multiple choice). Add 1 writing task ("describe your normal day"). Add 1 speaking task.

---

### Module 6: Food & Drink (Essen und Trinken)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 2 | 3/4 scripts drafted. Missing: v6-1-2 (Kerala Food in German) |
| E | 2 | 32 exercises, mostly recognition |
| A | 0 | No audio |
| P | 0 | No ordering dialogues, no menu tasks |
| X | 2 | Hören (café/restaurant), Sprechen (ordering), Lesen (menus) |
| **Total** | **6/15** | |

**Blockers:** v6-1-2 is fun/engagement content, not exam-critical. Main gap: no restaurant dialogue practice and no accusative production tasks.
**Next action:** Add 2 speaking tasks (order a meal, express preferences). Add 1 writing task (describe your favorite food). Generate audio for restaurant dialogue.

---

### Module 7: Shopping & Money (Einkaufen)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 3 | ✅ All 3 core scripts drafted (v7-1-1, v7-2-1, v7-3-1) |
| E | 2 | 30 exercises |
| A | 0 | No audio |
| P | 0 | No price dictation, no shopping dialogues |
| X | 2 | Hören (prices), Lesen (ads/offers), Sprechen (asking about items) |
| **Total** | **7/15** | |

**Blockers:** Scripts complete. Price listening is exam-relevant and needs audio.
**Next action:** Add price dictation exercises with edge-tts audio. Build shopping dialogue production exercise.

---

### Module 8: My Home (Meine Wohnung)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 3 | ✅ All 3 core scripts drafted (v8-1-1, v8-2-1, v8-3-1) |
| E | 2 | 25 exercises |
| A | 0 | No audio |
| P | 0 | No Wohnungsanzeige decoding tasks, no writing exercises |
| X | 2 | Lesen (apartment ads are classic A1), Schreiben (short messages about home) |
| **Total** | **7/15** | |

**Blockers:** Apartment ad reading is a Goethe A1 classic but only has recognition exercises. Needs reading-to-writing tasks.
**Next action:** Add 2 reading comprehension exercises based on realistic apartment ads. Add 1 writing task (short note to landlord/flatmate).

---

### Module 9: Travel & Directions (Reisen und Wege)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 3 | ✅ All 3 core scripts drafted (v9-1-1, v9-2-1, v9-3-1) |
| E | 2 | 40 exercises |
| A | 0 | No audio — needed for station announcements, direction listening |
| P | 0 | No ticket-buying dialogue practice, no direction-giving output |
| X | 2 | Hören (announcements), Sprechen (asking directions, buying tickets) |
| **Total** | **7/15** | |

**Blockers:** Travel is heavily Hören-dependent. Station announcements need real audio.
**Next action:** Generate audio for 3–5 simple station/travel announcement scenarios. Add 1 speaking task (buy a ticket). Add 1 direction writing task.

---

### Module 10: Health & Body (Gesundheit)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 3 | ✅ All 3 core scripts drafted (v10-1-1, v10-2-1, v10-3-1) |
| E | 2 | 38 exercises |
| A | 0 | No audio |
| P | 0 | No doctor dialogue output, no illness-message writing |
| X | 2 | Sprechen (symptoms), Schreiben (absence messages), Hören (doctor) |
| **Total** | **7/15** | |

**Blockers:** Doctor dialogue is a standard A1 scenario that needs production output.
**Next action:** Add 1 free-text exercise (write an absence message to employer/teacher). Add 1 speaking task (explain symptoms). Add audio for doctor dialogue.

---

### Module 11: Work & Study (Arbeit und Studium)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 3 | ✅ All 3/3 scripts drafted (v11-1-1, v11-2-1, v11-3-1) |
| E | 2 | 40 exercises |
| A | 0 | No audio |
| P | 1 | Email writing lesson exists but no structured production exercise |
| X | 2 | Schreiben (email), Sprechen (profession, skills) |
| **Total** | **7/15** | |

**Blockers:** Scripts complete. Email writing needs a production exercise with correction.
**Next action:** Add 1 structured email-writing production exercise with model answer. Add 1 speaking task (profession description).

---

### Module 12: Hobbies & Free Time (Freizeit)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 3 | ✅ All 5/5 scripts drafted (v12-1-1, v12-2-1, v12-3-1, v12-4-1, v12-4-2) |
| E | 2 | 32 exercises |
| A | 0 | No audio |
| P | 0 | No invitation writing practice, no plan-making dialogues |
| X | 2 | Schreiben (invitations), Sprechen (hobbies, plans) |
| **Total** | **6/15** | |

**Blockers:** Scripts are complete. Main gap is production exercises and audio.
**Next action:** Add 2 production exercises (invitation writing, hobby description speaking). Generate audio for plan-making dialogues.

---

### Module 13: Talking About the Past (Was hast du gemacht?)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 3 | ✅ All 4 core scripts drafted (v13-1-1 through v13-4-1) |
| E | 2 | 40 exercises |
| A | 0 | No audio |
| P | 0 | No past-tense writing or speaking output |
| X | 2 | Sprechen (weekend descriptions), Schreiben (past-event messages) |
| **Total** | **7/15** | |

**Blockers:** Perfekt tense needs production practice to stick. Recognition alone doesn't build real control.
**Next action:** Add 2 free-text exercises (what did you do last weekend, transform present→Perfekt). Add 1 speaking task.

---

### Module 14: Formal Life in Germany (Offizielles Leben)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 3 | ✅ All 3/3 scripts drafted (v14-1-1, v14-1-2, v14-2-1) |
| E | 2 | 32 exercises |
| A | 0 | No audio |
| P | 1 | Form-filling exists but limited variety |
| X | 3 | Directly maps to Schreiben Teil 1 (form-filling) |
| **Total** | **8/15** | |

**Blockers:** Scripts complete. Form-filling variety is the main gap — only 1-2 form templates exist.
**Next action:** Add 3 varied form-filling exercises (Anmeldung, bank, course registration). Add dictation exercise (fill form from spoken details). Wire more explicitly to Module 18 Schreiben Teil 1.

---

### Module 15: German Culture & Integration (Kultur)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 1 | All 5 scripts at ARCH only (Wave 5, lowest priority) |
| E | 1 | 21 exercises, mostly cultural awareness |
| A | 0 | No audio |
| P | 0 | No production tasks (acceptable — culture module) |
| X | 0 | No direct exam relevance |
| **Total** | **2/15** | |

**Blockers:** Lowest priority module. ARCH exists and is sufficient for planning. Scripts should only be drafted after all Waves 1–4 are complete.
**Next action:** None until Waves 1–4 are fully drafted. This module is enrichment content.

---

### Module 16: A1+ Bonus Bridge (Optional)
| Dim | Score | Notes |
|-----|-------|-------|
| S | 1 | All 5 scripts at ARCH only (Wave 5, lowest priority) |
| E | 2 | 39 exercises |
| A | 0 | No audio |
| P | 0 | No grammar transformation production |
| X | 1 | Indirect — strengthens accuracy but not directly tested |
| **Total** | **4/15** | |

**Blockers:** Optional module. ARCH exists. Scripts should be last priority.
**Next action:** None until all other modules are stronger.

---

### Module 17: Goethe A1 Exam — Hören & Lesen
| Dim | Score | Notes |
|-----|-------|-------|
| S | 3 | ✅ All 3 strategy scripts drafted (v17-1-1, v17-2-1, v17-3-1) |
| E | 3 | 65 exercises — strong volume |
| A | 1 | UI supports audio-only Hören, but audio files not yet generated |
| P | 1 | Exercises exist but lack audio-first delivery |
| X | 3 | Direct exam training |
| **Total** | **11/15** | |

**Blockers:** THE AUDIO GAP. Without generated audio clips, Hören exercises show text instead of playing audio. This is the single most important technical blocker for exam readiness.
**Next action:** Run audio generation pipeline (edge-tts) for all Hören exercise items. Wire audio playback into test UI.

---

### Module 18: Goethe A1 Exam — Schreiben & Sprechen
| Dim | Score | Notes |
|-----|-------|-------|
| S | 3 | ✅ All 5/5 scripts drafted (v18-1-1 through v18-5-1) |
| E | 3 | 70 exercises — highest count in course |
| A | 0 | No audio (needed for Sprechen model answers) |
| P | 2 | /practice/write and /practice/intro exist |
| X | 3 | Direct exam training — capstone module |
| **Total** | **10/15** | |

**Blockers:** Scripts complete. Writing/speaking practice pages exist but need feedback rubrics.
**Next action:** Add scoring rubrics to /practice/write responses. Integrate mock exam flow connecting Modules 17+18 into a full simulated test. Add model answers for each Schreiben prompt.

---

## Summary Dashboard

| Module | S | E | A | P | X | Total | Status |
|--------|---|---|---|---|---|-------|--------|
| 1: Welcome | 2 | 2 | 0 | 0 | 1 | **5** | 🟡 Gaps |
| 2: Who Are You? | 2 | 2 | 0 | 1 | 3 | **8** | 🟡 Near-ready |
| 3: Numbers & Time | 3 | 2 | 0 | 0 | 3 | **8** | 🟡 Audio-blocked |
| 4: Family | 3 | 2 | 0 | 0 | 2 | **7** | 🟡 Needs production |
| 5: Daily Routine | 2 | 2 | 0 | 0 | 3 | **7** | 🟡 Needs production |
| 6: Food & Drink | 2 | 2 | 0 | 0 | 2 | **6** | 🟡 Gaps |
| 7: Shopping | 3 | 2 | 0 | 0 | 2 | **7** | 🟡 Needs production+audio |
| 8: Home | 3 | 2 | 0 | 0 | 2 | **7** | 🟡 Needs production |
| 9: Travel | 3 | 2 | 0 | 0 | 2 | **7** | 🟡 Needs audio |
| 10: Health | 3 | 2 | 0 | 0 | 2 | **7** | 🟡 Needs production |
| 11: Work & Study | 3 | 2 | 0 | 1 | 2 | **8** | 🟡 Needs production |
| 12: Hobbies | 3 | 2 | 0 | 0 | 2 | **7** | 🟡 Needs production |
| 13: Past Tense | 3 | 2 | 0 | 0 | 2 | **7** | 🟡 Needs production |
| 14: Formal Life | 3 | 2 | 0 | 1 | 3 | **9** | 🟡 Near-ready |
| 15: Culture | 1 | 1 | 0 | 0 | 0 | **2** | ⬜ Optional |
| 16: A1+ Bridge | 1 | 2 | 0 | 0 | 1 | **4** | ⬜ Optional |
| 17: Hören & Lesen | 3 | 3 | 1 | 1 | 3 | **11** | 🟢 Nearest to ready |
| 18: Schreiben & Sprechen | 3 | 3 | 0 | 2 | 3 | **11** | 🟢 Near-ready |

### Course-wide patterns

**Strongest areas:**
- Script architectures: ALL 18 modules have complete scene-by-scene architecture
- Exercise volume: 690 exercises across 18 modules
- Exam-direct modules (17, 18) are the most developed

**Weakest areas (in priority order):**
1. **Audio generation: 0/18 modules have audio** — blocks all Hören prep
2. **Production exercises: ~0/18 modules have real output tasks** — blocks Schreiben/Sprechen prep
3. **Remaining ARCH-only scripts: 15 scripts** need drafting (see tracker)

### Remaining unscripted videos by priority

**Module 1 (onboarding — medium priority):**
- v1-1-1 — Why German? A Malayali's Gateway
- v1-1-2 — Malayalis in Germany Success Stories
- v1-2-2 — Tricky Sounds for Malayalis (pronunciation value)
- v1-5-1 — Your First Conversation
- v1-6-1 — Formal vs Informal Deep Dive

**Module 2 (supplementary only):**
- v2-1-2 — What's Your Name? Part 2

**Module 5 (supplementary only):**
- v5-1-2 — Practice with Common Verbs

**Module 6 (engagement content):**
- v6-1-2 — Kerala Food in German

**Modules 15-16 (optional, do last):**
- All ~10 Module 15/16 scripts

**Total remaining:** ~18 scripts, but only v1-2-2 and v1-5-1 have meaningful teaching value for A1. The rest are supplementary, motivational, or optional content.

---

## Launch Readiness Criteria

A module is **launch-ready** (score 12+/15) when:
- All core scripts are drafted (S ≥ 2)
- Exercises include production tasks (P ≥ 2)
- Audio exists for listening-dependent content (A ≥ 2 where relevant)
- Exam alignment is clear and actionable (X ≥ 2)

**Current: 0/18 modules are launch-ready.**
**Nearest to ready: Module 17 (11/15), Module 18 (10/15).**
**Biggest single improvement: audio generation pipeline would move every module's A score from 0 to 2+.**
