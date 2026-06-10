"""Versioned prompt library for the Adipoli script-audit loop.

Three prompts:
  - DRAFT_PROMPT: build a v1 25-30 min guide-video script from the consolidated
    module JSON (used when the source has no real script yet, or to convert the
    storyScene + lessons into the unified guide-script format).
  - SCORE_PROMPT: rate a draft against the rubric. Returns strict JSON.
  - REVISE_PROMPT: rewrite the draft addressing specific axis feedback.

The output script format is the markdown shape from the plan file
(/shared/plans/the-german-language-course-gleaming-thacker.md). Section names,
[VISUAL: ...] / [VOCAB CARD: ...] directives, and timestamp anchors must be
preserved verbatim by the audit loop's downstream consumers (parse_script.py,
LessonGuideVideo Remotion composition).
"""

from __future__ import annotations

# Bumped whenever any prompt below changes — the loop logs this in audit-log.md
# so we can correlate quality drift with prompt edits.
PROMPT_VERSION = "2026-04-25.v1"

WORD_TARGET_MIN = 3500
WORD_TARGET_MAX = 4500
PASS_THRESHOLD = 7  # all six axes must hit >= this
MAX_ITERATIONS = 4

RUBRIC_AXES = [
    "length_fit",
    "cefr_alignment",
    "bilingual_balance",
    "pedagogy",
    "kuttan_voice",
    "remotion_ready",
]


SCRIPT_FORMAT_SPEC = """
The script MUST be a single markdown document with EXACTLY this shape:

# Module {id} — {title_de} / {title_en}
**Target length:** 25-30 min spoken | **Word target:** 3500-4500
**CEFR:** A1.x | **Goethe alignment:** <one-line topic summary>

---

## [00:00] Intro & Hook
[VISUAL: <one short scene direction, e.g. "Kuttan at Berlin Hauptbahnhof, dusk">]
**DE:** <German line>
**EN:** <English gloss>
*Kuttan (മലയാളം):* <occasional Malayalam aside; one or two per section, NOT every line>

(Continue the section with several DE/EN paragraphs and short Malayalam asides.)

---

## [03:00] Vocab Block 1 — <theme>
[VOCAB CARD: <der/die/das word> — <english> — <മലയാളം>]
**DE example:** <full German sentence using the word>
**EN gloss:** <english translation>

(Repeat 4-6 vocab cards per block. Pace blocks so the whole script lands at ~25-30 min.)

---

## [HH:MM] Example Dialogue: <scene>
[VISUAL: <scene>]
**Speaker A (DE):** ...
**Speaker B (DE):** ...
**EN gloss:** ...

---

## [HH:MM] Practice Prompt
[PROMPT: <one-line instruction in EN>]
**Try in DE:** <prompt sentence in German>
*(Pause 5 seconds, then reveal:)*
**Answer (DE):** ...
**EN:** ...

---

## [HH:MM] Recap & Next-module Teaser
- Vocab recap: 5-8 key items (DE — EN)
- Grammar recap: 1-2 patterns
- Next module: <one-sentence teaser>

RULES:
- ALL section headings MUST start with `## [HH:MM]` so timestamps parse cleanly.
- Every `**DE:**` line MUST be followed by `**EN:**` on the next non-blank line.
- Use [VISUAL: ...] for scene directions, [VOCAB CARD: ...] for vocab, [PROMPT: ...] for practice.
- Write 3500-4500 words total of actual spoken content (excluding directives).
- Include 1-2 brief Malayalam asides per section via *Kuttan (മലയാളം):* — NOT translations of every line.
- Keep German vocabulary within Goethe A1 scope appropriate for this module's position in the course.
- No table of contents, no preamble — start directly with the H1 title.
""".strip()


KUTTAN_VOICE_SPEC = """
Kuttan is a warm Kerala-born narrator/character. He addresses the learner as
"machane" (friend). He speaks Malayalam in short, encouraging asides — not
full translations. He references Kerala life (chaaya, monsoon, family) when
useful for analogy. He never sounds like a generic AI tutor. Voice rules:
- Malayalam asides are written in മലയാളം script, brief (5-15 words).
- Manglish (Latin-letter Malayalam) is acceptable for casual asides if it
  preserves the spoken feel: "Adipoli! Ithu nallathaanu, machane."
- No emojis except very rarely (max 1 per section).
- Tone: warm, direct, slightly playful. Never condescending.
""".strip()


def draft_prompt(module_id: int, module_json_str: str, prior_modules_summary: str = "") -> list[dict]:
    """Build a draft 25-30 min guide script from module source JSON."""
    system = (
        "You are an expert German-as-a-foreign-language curriculum designer. "
        "You also speak Malayalam fluently and write engaging Kerala-inflected "
        "narration. You produce production-ready video scripts for a Goethe-A1 "
        "German course aimed at Malayali learners moving to Germany."
    )
    user = f"""
Build a single guide-video script for Module {module_id} of the Adipoli German course.
This script will be used as a recording reference: a human narrator will re-record
following it. Target length: ~25-30 minutes spoken (3500-4500 words).

KUTTAN CHARACTER VOICE:
{KUTTAN_VOICE_SPEC}

OUTPUT FORMAT (strict):
{SCRIPT_FORMAT_SPEC}

PRIOR MODULES (for continuity, do not repeat their content):
{prior_modules_summary or "(this is module 1 — no prior context)"}

MODULE SOURCE JSON (consolidate ALL lessons in this module into ONE unified
25-30 min guide script — extract vocab from every lesson's vocabulary[] and
storyScene.vocabEncounters[], use the storyScene settings as visual scene cues,
and weave in the storyScene.decisionPoints as practice prompts):

{module_json_str}

Now produce ONLY the markdown script. No preamble, no commentary, no code fences.
""".strip()
    return [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]


def score_prompt(module_id: int, draft_md: str) -> list[dict]:
    """Score a draft against the 6-axis rubric. Returns strict JSON."""
    system = (
        "You are a strict curriculum reviewer. You score draft scripts on a "
        "0-10 integer scale per axis and return ONLY a JSON object — no prose, "
        "no markdown, no code fences."
    )
    user = f"""
Score this draft script for Module {module_id} of the Adipoli German course.

Word-count target: {WORD_TARGET_MIN}-{WORD_TARGET_MAX} words of spoken content
(exclude directives like [VISUAL:...], [VOCAB CARD:...], [PROMPT:...] and headings
when judging length_fit).

Pass threshold per axis: {PASS_THRESHOLD}/10. Be strict — do not award 7+ unless
the axis is genuinely solid.

AXES (score each 0-10):
- length_fit: Word count within {WORD_TARGET_MIN}-{WORD_TARGET_MAX}? Section pacing balanced?
- cefr_alignment: Vocabulary and grammar within Goethe A1 scope appropriate to
  this module's position (modules 1-6 = A1.1, 7-12 = A1.2, 13-18 = A1.2/A2 transition)?
- bilingual_balance: ~70% German content, ~25% English scaffolding, ~5% Malayalam
  asides via Kuttan? Every **DE:** followed by **EN:** gloss?
- pedagogy: Hook → introduce → demonstrate → practice → recap arc holds across
  the whole script? Vocab introduced before being used in dialogue?
- kuttan_voice: Kerala lens present? "machane" warmth? Malayalam asides use
  മലയാളം script (or Manglish acceptable). No generic chatbot prose?
- remotion_ready: All headings `## [HH:MM]`? [VISUAL:], [VOCAB CARD:], [PROMPT:]
  directives present and parseable? No malformed markdown?

DRAFT:
---
{draft_md}
---

CRITICAL OUTPUT RULES (the response is parsed for the FIRST balanced JSON object):
- Output the JSON object FIRST. The FIRST character of your reply MUST be `{{`.
- After the closing `}}` you MAY write internal notes if helpful, but the JSON
  object MUST be complete and valid before any other text. Anything after the
  closing `}}` is discarded.
- Do NOT wrap in markdown code fences (no ```json).
- Do NOT think out loud before the JSON. Score directly.
- All keys quoted, all string values quoted, all integers as bare numbers.

JSON SHAPE (output this FIRST):
{{
  "scores": {{
    "length_fit": <int 0-10>,
    "cefr_alignment": <int 0-10>,
    "bilingual_balance": <int 0-10>,
    "pedagogy": <int 0-10>,
    "kuttan_voice": <int 0-10>,
    "remotion_ready": <int 0-10>
  }},
  "word_count": <int — count actual spoken words, exclude directives/headings>,
  "weakest_axis": "<axis name with lowest score>",
  "feedback": {{
    "length_fit": "<one-sentence specific issue or 'OK'>",
    "cefr_alignment": "<one sentence>",
    "bilingual_balance": "<one sentence>",
    "pedagogy": "<one sentence>",
    "kuttan_voice": "<one sentence>",
    "remotion_ready": "<one sentence>"
  }}
}}
""".strip()
    return [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]


def revise_prompt(module_id: int, draft_md: str, scores_json: dict) -> list[dict]:
    """Revise a draft addressing the specific axis feedback."""
    system = (
        "You are an expert German-as-a-foreign-language curriculum designer "
        "revising a draft script. Apply the reviewer's feedback precisely. "
        "Preserve everything that already works — only change what the feedback "
        "calls out. Output the FULL revised script, not a diff."
    )
    weak_axes = [
        ax for ax in RUBRIC_AXES
        if scores_json.get("scores", {}).get(ax, 10) < PASS_THRESHOLD
    ]
    feedback_lines = []
    for ax in weak_axes:
        s = scores_json.get("scores", {}).get(ax, "?")
        fb = scores_json.get("feedback", {}).get(ax, "(no feedback)")
        feedback_lines.append(f"- {ax} ({s}/10): {fb}")
    feedback_block = "\n".join(feedback_lines) if feedback_lines else "(no axes below threshold)"

    current_wc = scores_json.get('word_count', '?')
    user = f"""
Revise this Module {module_id} draft script. Address ONLY the failing axes:

{feedback_block}

Current word count: {current_wc} (target {WORD_TARGET_MIN}-{WORD_TARGET_MAX}).

AXIS-SPECIFIC GUIDANCE (apply where the axis is failing):

LENGTH_FIT (most important if word count is wrong):
- If current word count < {WORD_TARGET_MIN}: you MUST EXPAND the script.
  ADD more vocab cards, ADD more example dialogues, ADD more Kuttan asides,
  EXPAND existing sections with deeper explanation. DO NOT TRIM existing
  spoken content. Aim for {WORD_TARGET_MIN}-{WORD_TARGET_MAX} spoken words.
- If current word count > {WORD_TARGET_MAX}: trim selectively, prioritize
  removing redundant explanations. Keep all vocab cards.
- Spoken content = lines starting with **DE:**, **EN:**, **DE example:**,
  **EN gloss:**, dialogue lines, *Kuttan ...:* asides. Directives like
  [VISUAL:], [VOCAB CARD:], [PROMPT:] DO NOT count as spoken content.

REMOTION_READY:
- Every section MUST start with `## [HH:MM] Section Name` (timestamps in HH:MM).
- Every scene/section MUST have a [VISUAL: ...] directive.
- Every vocab block MUST have [VOCAB CARD: <de> — <en> — <മലയാളം>] entries.
- Every practice section MUST have a [PROMPT: ...] directive.
- ADD missing directives, do not remove them.

CEFR_ALIGNMENT (Goethe A1 scope by module position):
- Modules 1-6 (A1.1): basic verbs (sein/haben/heißen/kommen/wohnen),
  present tense only, simple SVO sentences, basic question words (Was/Wer/Wo),
  numbers, time, family, food, greetings. Avoid Perfekt, Konjunktiv, modal verbs.
- Modules 7-12 (A1.2): add modal verbs (können/möchten/müssen), separable verbs,
  basic Akkusativ/Dativ, possessives. Avoid Perfekt and Plusquamperfekt.
- Modules 13-18 (A1.2 / A2 bridge): add Perfekt (haben/sein + ge-...-en),
  comparatives (mehr/weniger), simple Konjunktiv II (würde + Infinitiv).
- If vocabulary or grammar exceeds the level, REPLACE with simpler equivalents.

BILINGUAL_BALANCE:
- Roughly 70% German, 25% English scaffolding, 5% Malayalam asides.
- Every **DE:** line MUST be followed by an **EN:** line (gloss).
- Malayalam asides via `*Kuttan (മലയാളം):*` should appear once or twice
  per section, not on every line.

PEDAGOGY:
- Hook → introduce vocab → demonstrate in dialogue → practice → recap.
- Vocab should be introduced (in a [VOCAB CARD:]) BEFORE being used in dialogue.
- End with recap and next-module teaser.

KUTTAN VOICE:
- "machane" warmth, Kerala-lens analogies, brief asides in മലയാളം script.
- No generic chatbot prose.

KUTTAN CHARACTER VOICE (do not drift):
{KUTTAN_VOICE_SPEC}

OUTPUT FORMAT (strict, must be preserved):
{SCRIPT_FORMAT_SPEC}

CURRENT DRAFT:
---
{draft_md}
---

Now produce the FULL revised markdown script. No preamble, no commentary,
no code fences. Same H1 title. Keep what already works; fix what failed.
If length_fit was failing because the script is too short, your output MUST
be substantially LONGER than the input.
""".strip()
    return [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]
