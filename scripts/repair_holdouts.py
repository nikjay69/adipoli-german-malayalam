#!/usr/bin/env python3
"""Insert missing [VISUAL: ...] directives after H2 sections that lack them.

Targeted repair for modules where the rubric flags `remotion_ready` because the
model dropped scene directions during one of the revise cycles. Deterministic;
no AI needed.

A section is considered to "have" a VISUAL if a [VISUAL: ...] directive appears
within the next 6 non-blank content lines after the H2 heading. If not, we
insert a contextually appropriate placeholder so the Remotion composition has
something to render.

Usage:
    python3 repair_holdouts.py 1 2 16
"""
from __future__ import annotations
import re
import sys
from pathlib import Path

OUTPUT_DIR = Path("/shared/german-course/scripts/output")
H2_RE = re.compile(r"^## \[(\d{1,2}:\d{2})\]\s*(.+?)\s*$")
VISUAL_RE = re.compile(r"\[VISUAL:")


def visual_for(section_label: str) -> str:
    """Pick a reasonable scene direction based on the section name."""
    low = section_label.lower()
    if "intro" in low or "hook" in low or "welcome" in low:
        return "Kuttan smiles at camera, warm Thrissur evening light, motivational hook"
    if "vocab" in low:
        return "Animated vocab cards float on screen; Kuttan points encouragingly"
    if "practice" in low or "prompt" in low:
        return "Kuttan with notebook in hand, thinking pose, prompts hover beside him"
    if "recap" in low or "summary" in low or "next-module" in low or "next module" in low:
        return "Recap montage of key vocab; Kuttan with celebratory pose"
    if "dialogue" in low or "scene" in low or "conversation" in low:
        return f"Kuttan in scene: {section_label}"
    if "outro" in low or "farewell" in low or "goodbye" in low:
        return "Kuttan waves goodbye, Adipoli logo fades in"
    if "grammar" in low or "rule" in low:
        return "Animated grammar diagram; Kuttan as patient teacher"
    if "exam" in low or "goethe" in low or "test" in low:
        return "Kuttan at a desk with Goethe-Institut paperwork, focused"
    if "culture" in low or "integration" in low:
        return "Split-screen: Kerala scene fades into German equivalent"
    if "story" in low or "kuttan" in low:
        return f"Kuttan central, scene context: {section_label}"
    return f"Kuttan in module context: {section_label}"


def repair_one(module_id: int) -> dict:
    p = OUTPUT_DIR / f"module-{module_id:02d}.script.md"
    md = p.read_text(encoding="utf-8")
    lines = md.splitlines()
    out: list[str] = []
    inserted = 0
    sections_seen = 0
    sections_already_ok = 0
    i = 0
    while i < len(lines):
        line = lines[i]
        m = H2_RE.match(line)
        if not m:
            out.append(line)
            i += 1
            continue
        # Found a section heading.
        sections_seen += 1
        ts, label = m.group(1), m.group(2)
        out.append(line)
        i += 1
        # Look ahead for an existing [VISUAL: ...] within next 6 non-blank lines.
        lookahead_lines = []
        j = i
        non_blank_seen = 0
        next_h2_at = None
        while j < len(lines):
            if H2_RE.match(lines[j]):
                next_h2_at = j
                break
            if lines[j].strip():
                non_blank_seen += 1
            lookahead_lines.append(lines[j])
            if non_blank_seen >= 6:
                break
            j += 1
        chunk = "\n".join(lookahead_lines)
        if VISUAL_RE.search(chunk):
            sections_already_ok += 1
        else:
            # Insert a [VISUAL: ...] right after the heading.
            out.append(f"[VISUAL: {visual_for(label)}]")
            inserted += 1
            # Keep an empty line for readability if the next line isn't already blank.
            if i < len(lines) and lines[i].strip():
                out.append("")
        # Keep walking from where we left off (don't skip the lookahead lines —
        # they need to be emitted normally).
    new_md = "\n".join(out)
    if not new_md.endswith("\n"):
        new_md += "\n"
    if inserted > 0:
        p.write_text(new_md, encoding="utf-8")
    return {
        "module_id": module_id,
        "sections": sections_seen,
        "already_ok": sections_already_ok,
        "inserted": inserted,
        "size_before": len(md),
        "size_after": len(new_md),
    }


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: repair_holdouts.py <module_id> [<module_id> ...]", file=sys.stderr)
        return 1
    mods = [int(a) for a in sys.argv[1:]]
    for m in mods:
        r = repair_one(m)
        print(f"M{r['module_id']:>2}: sections={r['sections']} already_ok={r['already_ok']} inserted={r['inserted']} size {r['size_before']}->{r['size_after']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
