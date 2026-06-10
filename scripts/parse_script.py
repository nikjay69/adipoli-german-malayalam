#!/usr/bin/env python3
"""Parse a Module XX guide-video markdown script into the GuideScene[] JSON
that LessonGuideVideo.tsx expects.

Usage:
  python3 scripts/parse_script.py scripts/output/module-01.script.md > /tmp/m01.props.json

The markdown shape is defined in audit_prompts.py (SCRIPT_FORMAT_SPEC).
This parser is intentionally permissive: it tolerates extra blank lines, mild
heading drift, and missing optional fields. Hard requirements:
  - First H1 line is the module title.
  - Sections are H2 lines starting with "## [HH:MM]" — the [HH:MM] is the
    timestamp; the rest is the section label.
  - Vocab cards are introduced by a [VOCAB CARD: de — en — malayalam] line,
    optionally followed by **DE example:** and **EN gloss:** lines.
  - Practice scenes have [PROMPT: ...] + **Try in DE:** + **Answer (DE):** + **EN:**.

We classify each H2 section by name to decide the GuideScene kind:
  - section name contains 'vocab' -> emits one 'vocab' scene per card found
  - 'practice' -> 'practice'
  - 'recap' -> 'recap'
  - else -> 'section' header (and any DE/EN dialogue lines under it become a
    'dialogue' scene).
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

H1_RE = re.compile(r"^#\s+(.+?)$", re.M)
H1_TITLE_RE = re.compile(r"^Module\s+(\d+)\s*[—-]\s*(.+?)\s*/\s*(.+?)\s*$")
H2_RE = re.compile(r"^##\s+\[(\d{1,2}:\d{2})\]\s*(.+?)\s*$", re.M)
VOCAB_RE = re.compile(r"\[VOCAB CARD:\s*(.+?)\s*[—-]\s*(.+?)(?:\s*[—-]\s*(.+?))?\s*\]")
VISUAL_RE = re.compile(r"\[VISUAL:\s*(.+?)\s*\]")
PROMPT_RE = re.compile(r"\[PROMPT:\s*(.+?)\s*\]")
DE_LINE_RE = re.compile(r"^\*\*DE:\*\*\s*(.+?)\s*$", re.M)
EN_LINE_RE = re.compile(r"^\*\*EN:\*\*\s*(.+?)\s*$", re.M)
DE_EXAMPLE_RE = re.compile(r"^\*\*DE example:\*\*\s*(.+?)\s*$", re.M)
EN_GLOSS_RE = re.compile(r"^\*\*EN gloss:\*\*\s*(.+?)\s*$", re.M)
TRY_DE_RE = re.compile(r"^\*\*Try in DE:\*\*\s*(.+?)\s*$", re.M)
ANSWER_DE_RE = re.compile(r"^\*\*Answer \(DE\):\*\*\s*(.+?)\s*$", re.M)
ANSWER_EN_RE = re.compile(r"^\*\*EN:\*\*\s*(.+?)\s*$", re.M)


def parse_title_line(s: str) -> tuple[int, str, str]:
    """Pull module id + DE title + EN title from the H1 line."""
    h1 = H1_RE.search(s)
    if not h1:
        raise ValueError("no H1 title found")
    m = H1_TITLE_RE.match(h1.group(1).strip())
    if not m:
        raise ValueError(f"H1 doesn't match 'Module N — Title DE / Title EN': {h1.group(1)!r}")
    return int(m.group(1)), m.group(2).strip(), m.group(3).strip()


def split_sections(md: str) -> list[tuple[str, str, str]]:
    """Yield (timestamp, label, body) for each H2 section."""
    matches = list(H2_RE.finditer(md))
    out = []
    for i, m in enumerate(matches):
        ts, label = m.group(1), m.group(2).strip()
        body_start = m.end()
        body_end = matches[i + 1].start() if i + 1 < len(matches) else len(md)
        out.append((ts, label, md[body_start:body_end]))
    return out


def parse_vocab_block(body: str) -> list[dict[str, Any]]:
    """All [VOCAB CARD: ...] entries in the body, with paired example/gloss if present."""
    cards: list[dict[str, Any]] = []
    # Walk vocab markers; for each one, look at the lines until the next vocab marker
    indices = [m.start() for m in VOCAB_RE.finditer(body)]
    for idx, start in enumerate(indices):
        end = indices[idx + 1] if idx + 1 < len(indices) else len(body)
        chunk = body[start:end]
        m = VOCAB_RE.search(chunk)
        if not m:
            continue
        de = m.group(1).strip()
        en = m.group(2).strip()
        ml = (m.group(3) or "").strip() or None
        ex = DE_EXAMPLE_RE.search(chunk)
        ex_en = EN_GLOSS_RE.search(chunk)
        cards.append({
            "kind": "vocab",
            "german": de,
            "english": en,
            **({"malayalam": ml} if ml else {}),
            **({"example": ex.group(1).strip()} if ex else {}),
            **({"exampleEn": ex_en.group(1).strip()} if ex_en else {}),
        })
    return cards


def parse_dialogue_block(body: str) -> dict[str, Any] | None:
    """Convert paired **DE:** / **EN:** lines into a dialogue scene."""
    de_lines = DE_LINE_RE.findall(body)
    en_lines = EN_LINE_RE.findall(body)
    if not de_lines:
        return None
    pairs = list(zip(de_lines, en_lines + [""] * max(0, len(de_lines) - len(en_lines))))
    visual_m = VISUAL_RE.search(body)
    return {
        "kind": "dialogue",
        "visual": visual_m.group(1).strip() if visual_m else None,
        "lines": [{"speaker": "Kuttan", "de": de.strip(), "en": en.strip()} for de, en in pairs[:8]],
    }


def parse_practice_block(body: str) -> dict[str, Any] | None:
    p = PROMPT_RE.search(body)
    if not p:
        return None
    try_de = TRY_DE_RE.search(body)
    answer_de = ANSWER_DE_RE.search(body)
    # The answer's EN gloss is the **EN:** line that follows the **Answer (DE):** line.
    answer_en = ""
    if answer_de:
        rest = body[answer_de.end():]
        en_m = EN_LINE_RE.search(rest)
        if en_m:
            answer_en = en_m.group(1).strip()
    return {
        "kind": "practice",
        "promptEn": p.group(1).strip(),
        "tryDe": try_de.group(1).strip() if try_de else "",
        "answerDe": answer_de.group(1).strip() if answer_de else "",
        "answerEn": answer_en,
    }


def parse_recap_block(body: str) -> dict[str, Any]:
    """Pull bullet items: '- DE — EN' for vocab, grammar lines, next-module teaser."""
    vocab: list[dict[str, str]] = []
    grammar: list[str] = []
    next_teaser = ""
    in_vocab_section = False
    for raw in body.splitlines():
        line = raw.strip()
        if not line:
            continue
        low = line.lower()
        if "vocab recap" in low or "key vocab" in low:
            in_vocab_section = True
            continue
        if "grammar recap" in low or "grammar" in low and ":" in line:
            in_vocab_section = False
            continue
        if "next module" in low or "next-module" in low:
            in_vocab_section = False
            colon = line.find(":")
            if colon >= 0:
                next_teaser = line[colon + 1:].strip()
            continue
        if line.startswith("-") or line.startswith("*"):
            content = line.lstrip("-* ").strip()
            if in_vocab_section and ("—" in content or " - " in content):
                sep = "—" if "—" in content else " - "
                de, _, en = content.partition(sep)
                vocab.append({"de": de.strip(), "en": en.strip()})
            elif not in_vocab_section:
                grammar.append(content)
    return {
        "kind": "recap",
        "vocab": vocab,
        "grammar": grammar,
        "nextTeaser": next_teaser,
    }


def classify_section(label: str) -> str:
    low = label.lower()
    if "vocab" in low:
        return "vocab_block"
    if "practice" in low:
        return "practice"
    if "recap" in low or "next-module" in low or "next module" in low:
        return "recap"
    if low.startswith("intro") or "hook" in low:
        return "intro"
    return "scene"


def build_scenes(md: str) -> dict[str, Any]:
    module_id, title_de, title_en = parse_title_line(md)
    sections = split_sections(md)

    scenes: list[dict[str, Any]] = [
        {"kind": "title", "titleDe": title_de, "titleEn": title_en},
    ]

    for ts, label, body in sections:
        kind = classify_section(label)
        visual_m = VISUAL_RE.search(body)
        scenes.append({
            "kind": "section",
            "sectionLabel": label,
            "timestamp": ts,
            "visual": visual_m.group(1).strip() if visual_m else None,
        })
        if kind == "vocab_block":
            scenes.extend(parse_vocab_block(body))
            # Also include any dialogue/example lines under the vocab block as a tail dialogue scene
            tail = parse_dialogue_block(body)
            if tail and tail["lines"]:
                scenes.append(tail)
        elif kind == "practice":
            p = parse_practice_block(body)
            if p:
                scenes.append(p)
        elif kind == "recap":
            scenes.append(parse_recap_block(body))
        else:
            # Generic scene: if there are DE/EN lines, render as dialogue
            d = parse_dialogue_block(body)
            if d and d["lines"]:
                scenes.append(d)

    return {
        "moduleId": module_id,
        "titleEn": title_en,
        "titleDe": title_de,
        "accentColor": "#d4a520",
        "hasAudio": False,
        "scenes": scenes,
    }


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: parse_script.py <module-XX.script.md> [--has-audio]", file=sys.stderr)
        return 1
    path = Path(sys.argv[1])
    md = path.read_text(encoding="utf-8")
    props = build_scenes(md)
    if "--has-audio" in sys.argv:
        props["hasAudio"] = True
    print(json.dumps(props, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
