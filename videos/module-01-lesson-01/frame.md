---
name: Adipoli German — Module 01 motion system
version: 1
canvas:
  width: 1920
  height: 1080
  background: "#0d1a0d"
colors:
  canvas: "#0d1a0d"
  canvas_deep: "#081108"
  surface: "#162416"
  surface_raised: "#203520"
  ink: "#f7f0dd"
  ink_muted: "#c8c2b1"
  gold: "#f1d27a"
  gold_deep: "#b8891a"
  success: "#3fbf75"
  success_ink: "#bcf7d0"
  danger: "#c0392b"
  danger_ink: "#ffc9c2"
  listening: "#9dc4ff"
typography:
  display:
    family: "Oswald"
    weight: 700
    tracking: "-0.025em"
  teaching:
    family: "EB Garamond"
    weight: 700
    tracking: "-0.015em"
  chrome:
    family: "IBM Plex Mono"
    weight: 700
    tracking: "0.12em"
spacing:
  safe_x: 144
  safe_y: 96
  scene_gap: 48
  card_padding: 56
components:
  card_radius: 28
  pill_radius: 999
  border_width: 2
  rule_width: 3
motion:
  default_ease: "power3.out"
  secondary_ease: "power2.out"
  ambient_ease: "sine.inOut"
  transition: "editorial push with short blur crossfade"
---

# Overview

An adult, premium motion system for a Goethe A1 course made for Malayali learners. The visual world combines a warm Kerala evening study desk with the clarity of a serious language-school blackboard: deep forest canvas, exam-gold structure, precise German typography, and calm feedback colors.

The system must support two modes without changing identity:

- full-frame teaching graphics for tables, comparisons, timelines, pronunciation, dialogue, and checks;
- overlays around the learner's filmed presenter footage, added after the user uploads the final camera-and-voice recordings.

# The frame

- Use a persistent deep forest ground, never pure black.
- Gold is the structural signal: rules, active states, section numbers, speaker focus, and the final action.
- Cream carries primary text; muted cream carries translations and supporting copy.
- Blue is reserved for listening/model-audio moments.
- Green and red are semantic only: better/correct and risky/wrong.
- Every frame has three depths: atmospheric background, teaching content, and foreground production chrome.
- Anchor content toward edges. Avoid a centered web-card stack unless the teaching moment truly needs a single focal phrase.

# Typography

- Oswald is the institutional display voice: scene titles, compact labels, time-of-day headings.
- EB Garamond is the language-learning voice: German phrases, translations, dialogue, and large teaching sentences.
- IBM Plex Mono is production chrome only: module labels, timestamps, speaker cues, step numbers, and tiny metadata.
- German phrases get the greatest scale and reading time. Malayalam/Manglish remains in the presenter's voice, not dense on-screen paragraphs.

# Motion language

- Smooth beats bouncy. Entrances use `power3.out`; no cartoon overshoot.
- Build information in the order the learner should think: cue, German phrase, meaning, use.
- Lines draw, chips lock in, timelines fill, cards slide from their semantic side, and dialogue turns step on one at a time.
- Keep ambient motion to subtle drift or a low-amplitude light pulse. Sequential reveal does the real work.
- Reusable graphic inserts end on a stable hold so an editor can extend them under presenter narration.
- Related teaching beats use a short horizontal push; section changes use a restrained blur crossfade.

# Composition rules

- 16:9 course-player canvas, 1920 × 1080.
- Title-safe area: 144 px horizontal, 96 px vertical.
- Headlines: 72–120 px. Primary German phrases: 96–160 px. Body: 30–42 px. Chrome: 18–24 px.
- Tables are comparison instruments, not spreadsheets: at most five rows, one highlighted row at a time, no grid-heavy dashboard styling.
- Dialogue practice shows one current line prominently; prior turns recede instead of competing.
- Keep two focal points in most frames: the phrase and its teaching device, or the comparison and its correction.

# Do

- Use exact German from the approved Lesson 1 script.
- Use Kerala warmth through color, paper texture, lamp-like radial light, and restrained local atmosphere rather than decorative clichés.
- Make every explanation usable as a standalone insert and as part of the full lesson assembly.
- Reserve clear zones for future talking-head picture-in-picture when a scene needs the presenter on screen.

# Do not

- No mascot, childish badges, confetti, XP counters, or game tiles.
- No cyan/purple AI gradients, gradient text, glassmorphism, or generic SaaS dashboards.
- No tiny table text, long paragraphs, or full dialogue blocks during practice.
- No fake Goethe branding or generated text baked into images.
- No AI avatar for the presenter; the user supplies the presenter footage and voice.
