# Script Quality Standard — v1.0 → v2.0 Revision Checklist

> Use this when revising any FIRST DRAFT (v1.0) script to production-grade (v2.0).
> Captures the consistent patterns from 25+ successful revisions.

---

## The 8 Quality Axes

### 1. Hook (0:10–0:40)
- [ ] Under 40 seconds, ideally 25–35s
- [ ] Opens with a **concrete scenario** (exam question, real-life situation, mistake to avoid)
- [ ] States the specific payoff: "By the end, you'll be able to..."
- [ ] NO vague openers like "Today we learn about..." or "X is important because..."
- [ ] Malayalam hook line reinforcing the promise

### 2. Teach → Drill → Apply (No Stacking)
- [ ] **Max 3–4 new items per block** before drilling
- [ ] Each vocabulary/grammar block follows: introduce → practice pause → active recall
- [ ] NO "table dump" — items appear one at a time with pronunciation + context
- [ ] NO stacking 8+ items before first practice opportunity
- [ ] Each drill has a **specific prompt** ("Say: 'Ich habe einen Bruder'") AND a **reveal**

### 3. Active Recall (Before Summaries)
- [ ] At least **3 active recall checkpoints** scattered through the script
- [ ] Recall happens BEFORE summaries (test → then confirm), not after
- [ ] Final section starts with a **recall drill** before the recap list
- [ ] Use formats: fill-the-gap, English→German, article test, rapid-fire

### 4. Energy Cues
- [ ] Every section has a **🎬 [Energy: ...]** tag describing tone/pace
- [ ] Energy varies across the video (not monotone throughout)
- [ ] Cultural moments get lighter energy; grammar gets focused energy
- [ ] Hooks get urgency; practice gets encouragement

### 5. Malayalam Bridges
- [ ] Used as **structural parallels** or cultural connections, not just translations
- [ ] Address the **gap** (what Malayalam has that German doesn't, or vice versa)
- [ ] Written in natural Manglish, not formal Malayalam transliteration
- [ ] At least 2–3 substantial bridges per script, not just "X = Y"
- [ ] Bridges illuminate WHY something works differently, not just THAT it does

### 6. Exam Usefulness
- [ ] Specific exam sections cited: Hören / Lesen / Schreiben / Sprechen Teil 1/2/3
- [ ] [EXAM-TIP] boxes with actionable advice (not just "this is on the exam")
- [ ] At least one exam-simulation exercise (listen→write, speak→respond, form→fill)
- [ ] Template sentences that directly answer common exam prompts

### 7. Pacing & Word Count
- [ ] **10–15% word count reduction** from v1.0 (cut filler, merge redundant sections)
- [ ] Pre-roll compressed to ≤10 seconds
- [ ] No section longer than 2 minutes of narration
- [ ] Cultural notes woven INTO teaching blocks (not standalone tangent sections)
- [ ] Homework is 2–3 sentences max

### 8. Scene Structure
- [ ] Sections numbered with clear timestamps
- [ ] Visual cues described (what appears on screen, not just narration)
- [ ] Practice pauses marked with ⏸️ and specific instructions
- [ ] Forward/backward references to other modules where grammar connects
- [ ] Clean break between "learn this" and "now you try"

---

## Red Flags to Fix in v1.0 Scripts

| Red Flag | Fix |
|----------|-----|
| Hook > 45 seconds | Cut to concrete scenario, 25–35s |
| Section with 6+ new vocab items before any drill | Split into 2 blocks of 3 |
| "This is important because..." preamble | Delete — show importance through use |
| Malayalam translation only ("X = Y") | Add structural parallel or cultural insight |
| Summary before recall | Flip: recall drill → then summary card |
| 15-line tables appearing at once | One-at-a-time reveals with drill after 3–4 |
| No energy cues | Add 🎬 [Energy: ...] every section |
| Generic exam tip ("useful for the exam") | Specific: "Sprechen Teil 1 will ask..." |
| Standalone cultural tangent section | Weave into nearest vocabulary block |
| Production notes section duplicating checklist | Remove — keep only checklist |

---

## v2.0 Script Template (Section Pattern)

```markdown
## Section N: [Topic] (start–end)
### Visual: [What appears on screen]
### Narration:

"Teaching content — max 3-4 new items..."

### ⚡ Drill:
⏸️ Prompt → ? → Reveal
⏸️ Prompt → ? → Reveal

### 🔁 Active Recall:
⏸️ Previous section check → ? → Answer

🎬 [Energy: descriptor]
```

---

## Tracker Integration

When a script is revised to v2.0:
1. Update the script file header: `Status: REVISED — v2.0` with date and revision notes
2. Add a `## v2.0 Revision Notes` section at the bottom listing specific changes
3. Update `SCRIPT_PRODUCTION_TRACKER.md` — add the video ID to the v2.0 list
4. Commit with message: `quality: revise vX-Y-Z to v2.0 — [1-line summary]`

---

*Created: 2026-03-23 12:45 UTC — distilled from 25 successful v1.0→v2.0 revisions*
