# Game Audit — Rating the non-strong games

Date: 2026-04-15
Scope: Every game in `src/app/games/` other than the 4 new strong games (Hör & Los, Was steht da, Sag es, Tipp es).
Method: Rate each on 4 dimensions (each 1–5, total /20), give a concrete verdict.

## Rating dimensions

| Dim | What it measures |
|---|---|
| **P** — Pedagogical value | Does it actually teach a real A1 skill, not just recognition-patterns? |
| **E** — Exam alignment | Does it map to Goethe A1 Hören/Lesen/Sprechen/Schreiben? |
| **N** — Engagement | Would the user actually play it repeatedly? Novel mechanic vs. drill? |
| **C** — Anti-clutter (phone) | One-screen playability; text density; tap target quality |

Verdicts: **Keep (flagship)** · **Keep (polish)** · **Keep (merge later)** · **Archive**

---

## The 4 new strong games — for context

Already shipped, not re-audited here: **Hör & Los!** 🎧 / **Was steht da?** 📖 / **Sag es!** 🎙️ / **Tipp es!** ⌨️ — each 4-skill aligned to one Goethe A1 section.

---

## Ratings — all 15 non-boss games + boss category

### 🗺️ Listen & Act — **19 / 20**
Hear German instructions, tap the correct location on a map. Novel mechanic, real Hören practice, action-based.
- P 5 · E 5 · N 5 · C 4
- **Verdict: Keep (flagship).** This is as strong as the 4 new games. Treat it as part of the A-tier.

### 🕐 Time Attack — **17 / 20**
Read a clock face, tell the time in German. Covers the notorious *halb* trap.
- P 4 · E 5 · N 4 · C 4
- **Verdict: Keep (flagship).** Core A1 skill, exam-tested directly, visual clock is tap-friendly.

### 🔢 Number Blitz — **17 / 20**
Cashier calls a price, you type the German number. Trains the reverse-order number trap.
- P 4 · E 5 · N 4 · C 4
- **Verdict: Keep (flagship).** Numbers are A1 Hören bread and butter.

### 💬 Dialogue Dash — **17 / 20**
Type responses inside real German conversations — café, doctor, train station.
- P 5 · E 5 · N 4 · C 3 (slightly text-heavy in long dialogues)
- **Verdict: Keep (flagship).** Closest to multi-turn Sprechen practice.

### 👂 Eavesdrop (formerly "Memory") — **16 / 20**
Overhear German conversations, figure out what's happening. Fly-on-the-wall framing.
- P 4 · E 4 · N 4 · C 4
- **Verdict: Keep (flagship).** The reframing from pair-matching memory to eavesdrop is great.

### 👹 Boss fights (9 scenarios) — **16 / 20**
Extended challenges: Bürgeramt Dame, Fahrkartenkontrolleur, strict Chef, Vermieter, Sternekoch…
- P 4 · E 4 · N 5 · C 3 (longer, more to read per round)
- **Verdict: Keep (flagship).** Signature feature — retain, but ensure settings are Kerala-mock-compliant (several currently set in Germany; Chef/Vermieter should be video-call scenarios).

### 🧩 Sentence Builder — **15 / 20**
Tap word tiles to arrange a correct German sentence. Word order is A1's key grammar test.
- P 4 · E 4 · N 3 · C 4
- **Verdict: Keep (polish).** Keep tiles big; keep sentences ≤8 words per round.

### ✏️ Fill the Gap — **14 / 20**
WG notes, WhatsApp texts, landlord emails — type the missing German word in context.
- P 4 · E 4 · N 3 · C 3
- **Verdict: Keep (polish).** Overlaps with Tipp es! but extends with longer context. Differentiator: focus on *reading-then-completing*, not standalone translation.

### 🍽️ Food Order — **14 / 20**
Help order food at a German restaurant. Tap menu items that match the order.
- P 3 · E 3 · N 4 · C 4
- **Verdict: Keep.** Fun and scenario-based. Limited scope but satisfying.

### 🎭 Scene Sort — **12 / 20**
Sort words by scene: Kitchen, Bahnhof, Arztpraxis. Tests vocab association with context.
- P 3 · E 2 · N 3 · C 4
- **Verdict: Keep (polish).** Weakest of the "Keeps." Consider merging with a future "Room Builder"-style drag game.

### 👋 Greeting Time — **13 / 20**
Pick the right greeting for each situation. Time-of-day + formal/informal choice.
- P 3 · E 3 · N 3 · C 4
- **Verdict: Keep.** Short, useful, early-unlock. But narrow — covers a single chapter of A1.

### ⚡ Article Blitz — **13 / 20**
Pick der/die/das in real situations. Gender-of-noun drill.
- P 3 · E 3 · N 3 · C 4
- **Verdict: Keep (merge later).** Gender is core A1 but drill-like; consider folding into a future "Grammar Gym" hub alongside verb-rush rather than standalone.

### 🔥 Verb Rush — **13 / 20**
Type the right conjugation. Professor asks / flatmate says / partner wonders…
- P 4 · E 4 · N 2 · C 3
- **Verdict: Keep (merge later).** Essential skill, boring format. Same "Grammar Gym" folding as article-blitz makes sense.

### 🇩🇪 Situation Sprint (formerly Speed Quiz) — **13 / 20**
Real German situations fire at you fast: "would you survive?"
- P 3 · E 3 · N 4 · C 3
- **Verdict: Keep (polish).** Good energy; scenarios need tightening and Kerala-mock reframing where they assume learner is in Germany.

### 🏠 Room Builder — **12 / 20**
Furnish Kuttan's WG in Berlin, answer preposition questions.
- P 3 · E 3 · N 3 · C 3
- **Verdict: Keep (polish).** Prepositions matter but drag-interaction is fiddly on mobile. **Kerala-setting compliance issue:** currently "WG in Berlin"; should be reframed as "Furnishing the new apartment for when you move" or "mock room at Goethe Kochi prep class."

### 📖 Story Builder — **13 / 20**
Help Kuttan tell stories in Perfekt (past tense). Arrange Perfekt sentences.
- P 4 · E 3 · N 3 · C 3
- **Verdict: Keep (for A2 tier).** Perfekt is A1+/A2 — doesn't help pure A1 but retains for the A2 roadmap. Keep it unlocked late (M13+).

---

## Tier summary

| Tier | Score | Games | Count |
|---|---|---|---|
| **A — Flagship** | 16–19 | Listen & Act · Time Attack · Number Blitz · Dialogue Dash · Eavesdrop · Boss fights | 6 (+ 4 new strong games = 10 total A-tier) |
| **B — Solid** | 13–15 | Sentence Builder · Fill the Gap · Food Order · Greeting Time · Article Blitz · Verb Rush · Situation Sprint · Story Builder | 8 |
| **C — Needs polish** | 12 | Scene Sort · Room Builder | 2 |

## Honest read

**None of the 15 games are clear archive candidates.** Earlier I pushed for aggressive archiving, but reading each game's actual concept, they all serve a pedagogical purpose — just with varying depth.

The real problems aren't "too many games" — they're:

1. **Kerala-setting violations** in a few games (Room Builder's "WG in Berlin," Situation Sprint scenarios, boss settings). Fix these to match the A1 Story Bible.
2. **Grammar drill monotony** — Article Blitz + Verb Rush individually feel like flashcards. Folding them into a single "Grammar Gym" with multiple modes would make the catalog feel less padded.
3. **Discovery** — 19 games on the catalog page is a wall. Needs better categorization by skill (Hören / Lesen / Sprechen / Schreiben / Vocab / Grammar / Boss).

## Recommended next actions (not this session)

1. Fix Kerala-setting violations in Room Builder, Situation Sprint scenarios, boss fights 2/4/5/6/7/8/9.
2. Reorganize `/games` page into skill-tagged sections so users find the right game for their goal.
3. Merge Article Blitz + Verb Rush into a "Grammar Gym" hub (keeps both, reduces top-level clutter).
4. Expand Listen & Act content pool — it's the best mechanic in the catalog and deserves more rounds.

## Flagship list (10 games — the real catalog)

If you want a ruthlessly curated "these are the games we promote," it's:

1. 🎧 Hör & Los!
2. 📖 Was steht da?
3. 🎙️ Sag es!
4. ⌨️ Tipp es!
5. 🗺️ Listen & Act
6. 🕐 Time Attack
7. 🔢 Number Blitz
8. 💬 Dialogue Dash
9. 👂 Eavesdrop
10. 👹 Boss fights (showcase 2–3 best)

Everything else stays in the catalog but in a "More games" section below the fold.
