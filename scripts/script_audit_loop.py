#!/usr/bin/env python3
"""Adipoli script-audit loop.

For each of the 18 Adipoli modules:
  1. Load module-XX.ts via npx tsx scripts/lib/module_loader.ts <id> -> JSON.
  2. Draft a 25-30 min guide-video script via MiniMax (DRAFT_PROMPT).
  3. Score draft (SCORE_PROMPT) -> JSON. If all axes >= PASS_THRESHOLD, accept.
  4. Otherwise revise (REVISE_PROMPT) addressing failing axes; rescore; loop
     up to MAX_ITERATIONS.
  5. Write scripts/output/module-XX.script.md, append audit-log.md, ntfy ping.

Run end:
  - Telegram message via pollbot to user_chat_id summarising N/18 + weak axes.

Resume-safe via .checkpoint.json (lists completed module ids).
Time-capped via WALL_CLOCK_BUDGET_SEC (also enforced by systemd RuntimeMaxSec).
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

# --- Path setup ---------------------------------------------------------------

REPO_ROOT = Path("/shared/german-course")
SCRIPTS_DIR = REPO_ROOT / "scripts"
LIB_DIR = SCRIPTS_DIR / "lib"
OUTPUT_DIR = SCRIPTS_DIR / "output"
LOADER_TS = LIB_DIR / "module_loader.ts"

CHECKPOINT_FILE = OUTPUT_DIR / ".checkpoint.json"
AUDIT_LOG = OUTPUT_DIR / "audit-log.md"

SHARED_LIB = "/shared/lib"
for p in (SHARED_LIB, str(LIB_DIR)):
    if p not in sys.path:
        sys.path.insert(0, p)

import ai_client  # noqa: E402  (path injection above)
import secrets as homelab_secrets  # noqa: E402
from audit_prompts import (  # noqa: E402
    PROMPT_VERSION,
    PASS_THRESHOLD,
    MAX_ITERATIONS,
    RUBRIC_AXES,
    WORD_TARGET_MIN,
    WORD_TARGET_MAX,
    draft_prompt,
    score_prompt,
    revise_prompt,
)

# --- Config -------------------------------------------------------------------

WALL_CLOCK_BUDGET_SEC = int(os.environ.get("AUDIT_BUDGET_SEC", str(3 * 60 * 60)))
_modules_env = os.environ.get("AUDIT_MODULES", "")
if _modules_env:
    MODULES_TO_RUN = [int(x) for x in _modules_env.split(",") if x.strip()]
else:
    MODULES_TO_RUN = list(range(1, 19))
NTFY_TOPIC = os.environ.get("ADIPOLI_NTFY_TOPIC", "fyi")
REFINE_ONLY = os.environ.get("AUDIT_REFINE_ONLY", "").strip() in ("1", "true", "yes")
SCORE_MAX_TOKENS = 12000
DRAFT_MAX_TOKENS = 8000
REVISE_MAX_TOKENS = 12000
MIN_AVG_SCORE = float(os.environ.get("AUDIT_MIN_AVG", "8.5"))

# --- Helpers ------------------------------------------------------------------


def log(msg: str) -> None:
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{ts}] {msg}", flush=True)


def load_checkpoint() -> set[int]:
    if not CHECKPOINT_FILE.is_file():
        return set()
    try:
        data = json.loads(CHECKPOINT_FILE.read_text())
        return set(int(x) for x in data.get("completed", []))
    except Exception as e:
        log(f"checkpoint unreadable ({e}); starting fresh")
        return set()


def save_checkpoint(completed: set[int]) -> None:
    CHECKPOINT_FILE.write_text(
        json.dumps({"completed": sorted(completed), "updated_at": int(time.time())}, indent=2)
    )


def load_module_json(module_id: int) -> dict[str, Any]:
    """Run npx tsx loader and return parsed JSON."""
    cmd = ["npx", "--yes", "tsx", str(LOADER_TS), str(module_id)]
    proc = subprocess.run(
        cmd, cwd=REPO_ROOT, capture_output=True, text=True, timeout=300
    )
    if proc.returncode != 0:
        raise RuntimeError(
            f"loader failed for module {module_id} (exit {proc.returncode}): {proc.stderr.strip()}"
        )
    return json.loads(proc.stdout)


def summarise_prior_modules(completed_modules: list[dict]) -> str:
    """Short bullet list of prior modules' titles, for continuity context."""
    if not completed_modules:
        return ""
    lines = []
    for m in completed_modules:
        lines.append(f"- M{m['id']}: {m.get('title','?')} / {m.get('titleGerman','?')}")
    return "\n".join(lines)


_JSON_BLOCK_RE = re.compile(r"\{.*\}", re.DOTALL)


def parse_score_json(raw: str) -> dict[str, Any]:
    """Recover the JSON object even when the model wraps it in prose.

    Strategy: scan for every balanced `{ ... }` block via brace counting; try
    json.loads() on each from longest to shortest, return the first success
    that contains a 'scores' key. Handles MiniMax-M2.7's habit of writing
    'Let me analyze...' analysis before the final JSON.
    """
    raw = raw.strip()
    if raw.startswith("```"):
        raw = raw.strip("`")
        if raw.lower().startswith("json"):
            raw = raw[4:]
        raw = raw.strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        pass
    blocks: list[str] = []
    depth = 0
    start = -1
    for i, ch in enumerate(raw):
        if ch == "{":
            if depth == 0:
                start = i
            depth += 1
        elif ch == "}":
            if depth > 0:
                depth -= 1
                if depth == 0 and start >= 0:
                    blocks.append(raw[start:i + 1])
                    start = -1
    # Prefer FIRST balanced block with 'scores' (prompt asks for JSON-first now)
    for blk in blocks:
        try:
            obj = json.loads(blk)
        except json.JSONDecodeError:
            continue
        if isinstance(obj, dict) and "scores" in obj:
            return obj
    # Fallback: longest valid JSON, anywhere
    blocks.sort(key=len, reverse=True)
    for blk in blocks:
        try:
            return json.loads(blk)
        except json.JSONDecodeError:
            continue
    raise ValueError(f"no JSON object in scorer reply: {raw[:200]!r}")


def all_axes_pass(scores: dict[str, Any]) -> bool:
    s = scores.get("scores", {})
    return all(int(s.get(ax, 0)) >= PASS_THRESHOLD for ax in RUBRIC_AXES)


def avg_score(scores: dict[str, Any]) -> float:
    s = scores.get("scores", {})
    vals = [int(s.get(ax, 0)) for ax in RUBRIC_AXES]
    return sum(vals) / len(vals) if vals else 0.0


def append_audit_log(line: str) -> None:
    with AUDIT_LOG.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def ntfy_publish(message: str, title: str = "Adipoli script audit") -> None:
    try:
        token = homelab_secrets.get("ntfy.publisher_token", default=None)
        if not token:
            log(f"ntfy skipped (no token): {message}")
            return
        url = f"http://192.168.180.11:8080/{NTFY_TOPIC}"
        req = urllib.request.Request(
            url,
            data=message.encode("utf-8")[:2000],
            method="POST",
            headers={
                "Title": title,
                "Tags": "books,de",
                "Authorization": f"Bearer {token}",
            },
        )
        urllib.request.urlopen(req, timeout=5).read()
    except Exception as e:
        log(f"ntfy publish failed: {e}")


def telegram_send(text: str) -> None:
    try:
        token = homelab_secrets.get("telegram.pollbot_token")
        chat_id = homelab_secrets.get("telegram.user_chat_id")
    except Exception as e:
        log(f"telegram secrets missing: {e}")
        return
    try:
        url = f"https://api.telegram.org/bot{token}/sendMessage"
        body = json.dumps({"chat_id": str(chat_id), "text": text[:4000]}).encode("utf-8")
        req = urllib.request.Request(
            url, data=body, method="POST",
            headers={"Content-Type": "application/json"},
        )
        urllib.request.urlopen(req, timeout=10).read()
    except Exception as e:
        log(f"telegram send failed: {e}")


# --- Per-module audit ---------------------------------------------------------


def audit_one_module(module_id: int, prior_summary: str) -> dict[str, Any]:
    """Run the draft → score → revise loop for one module. Returns a result dict."""
    log(f"M{module_id}: loading source")
    src = load_module_json(module_id)
    src_json_str = json.dumps(src, ensure_ascii=False)
    raw_len = len(src_json_str)
    if raw_len > 50000:
        # MiniMax slows linearly with input size; trim non-essential data.
        # Keep storyScene + lesson titles + vocabulary fully — drop heavy
        # exercise detail and old per-lesson video outlines (those bias the
        # unified guide script).
        trimmed = dict(src)
        for lesson in trimmed.get("lessons", []):
            if not isinstance(lesson, dict):
                continue
            for v in lesson.get("videos", []) or []:
                if isinstance(v, dict):
                    v.pop("scriptOutline", None)
                    v.pop("placeholderThumbnail", None)
                    v.pop("description", None)
            ex_list = lesson.get("exercises", []) or []
            kept = []
            for ex in ex_list[:4]:
                if isinstance(ex, dict):
                    kept.append({k: ex[k] for k in ("type", "question") if k in ex})
                else:
                    kept.append(ex)
            if len(ex_list) > 4:
                kept.append({"_trimmed": f"{len(ex_list) - 4} more exercises omitted"})
            lesson["exercises"] = kept
        src_json_str = json.dumps(trimmed, ensure_ascii=False)
        log(f"M{module_id}: trimmed source from {raw_len} to {len(src_json_str)} chars")

    out_path_existing = OUTPUT_DIR / f"module-{module_id:02d}.script.md"
    if REFINE_ONLY and out_path_existing.is_file() and out_path_existing.stat().st_size > 0:
        draft = out_path_existing.read_text(encoding="utf-8")
        log(f"M{module_id}: refine-only — loaded existing draft ({len(draft)} chars)")
    else:
        if REFINE_ONLY:
            log(f"M{module_id}: refine-only requested but no existing draft — falling back to fresh draft")
        else:
            log(f"M{module_id}: drafting v1")
        draft = ai_client.call(
            draft_prompt(module_id, src_json_str, prior_summary),
            max_tokens=DRAFT_MAX_TOKENS,
            temperature=0.5,
            timeout=480,
        )

    final_scores: dict[str, Any] = {}
    iterations = 0
    for it in range(1, MAX_ITERATIONS + 1):
        iterations = it
        log(f"M{module_id}: scoring iter {it}")
        try:
            score_raw = ai_client.call(
                score_prompt(module_id, draft),
                max_tokens=SCORE_MAX_TOKENS,
                temperature=0.0,
                timeout=120,
                strip_thinking=False,
            )
            final_scores = parse_score_json(score_raw)
        except Exception as e:
            log(f"M{module_id}: scorer failed iter {it}: {e}")
            final_scores = {"scores": {ax: 0 for ax in RUBRIC_AXES},
                            "feedback": {ax: f"scorer error: {e}" for ax in RUBRIC_AXES},
                            "word_count": 0,
                            "weakest_axis": "scorer_error"}
            break
        avg = avg_score(final_scores)
        if all_axes_pass(final_scores) and avg >= MIN_AVG_SCORE:
            log(f"M{module_id}: passed at iter {it} (avg {avg:.1f})")
            break
        if all_axes_pass(final_scores):
            log(f"M{module_id}: per-axis ok but avg {avg:.1f} < {MIN_AVG_SCORE}, keep refining")
        log(f"M{module_id}: iter {it} weakest={final_scores.get('weakest_axis')} avg={avg_score(final_scores):.1f}")
        if it == MAX_ITERATIONS:
            log(f"M{module_id}: hit MAX_ITERATIONS, accepting current draft")
            break
        log(f"M{module_id}: revising")
        prev_draft = draft
        try:
            new_draft = ai_client.call(
                revise_prompt(module_id, draft, final_scores),
                max_tokens=REVISE_MAX_TOKENS,
                temperature=0.4,
                timeout=480,
            )
        except Exception as e:
            log(f"M{module_id}: revise failed iter {it}: {e} — keeping previous draft")
            break
        # Safety: catch catastrophic regressions (M3-style 0-byte wipe, M7-style 50% trim).
        # If the revise result is suspiciously short or malformed, keep the previous draft.
        if not new_draft or len(new_draft.strip()) < max(5000, int(len(prev_draft) * 0.5)):
            log(f"M{module_id}: revise rejected — too short ({len(new_draft.strip())} < {int(len(prev_draft) * 0.5)}), keeping previous")
            break
        if not new_draft.lstrip().startswith("# Module"):
            log(f"M{module_id}: revise rejected — doesn't start with '# Module ...', keeping previous")
            break
        draft = new_draft

    out_path = OUTPUT_DIR / f"module-{module_id:02d}.script.md"
    out_path.write_text(draft, encoding="utf-8")
    log(f"M{module_id}: wrote {out_path} ({len(draft)} chars)")

    return {
        "module_id": module_id,
        "title": src.get("title", "?"),
        "titleGerman": src.get("titleGerman", "?"),
        "iterations": iterations,
        "scores": final_scores.get("scores", {}),
        "word_count": final_scores.get("word_count", 0),
        "weakest_axis": final_scores.get("weakest_axis", "?"),
        "passed": all_axes_pass(final_scores),
        "out_path": str(out_path),
    }


# --- Main ---------------------------------------------------------------------


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    if not LOADER_TS.is_file():
        log(f"FATAL: loader missing at {LOADER_TS}")
        return 1

    completed = load_checkpoint()
    log(f"prompt_version={PROMPT_VERSION} completed={sorted(completed)} budget={WALL_CLOCK_BUDGET_SEC}s")
    if not AUDIT_LOG.is_file():
        AUDIT_LOG.write_text(
            f"# Adipoli script audit log\n\nPrompt version: {PROMPT_VERSION}\n"
            f"Pass threshold: {PASS_THRESHOLD}/10 across {len(RUBRIC_AXES)} axes.\n"
            f"Word target: {WORD_TARGET_MIN}-{WORD_TARGET_MAX}.\n\n"
            f"| run_started | module | title | iters | passed | avg | word_count | weakest |\n"
            f"|---|---|---|---|---|---|---|---|\n"
        )

    started = time.monotonic()
    run_started_iso = time.strftime("%Y-%m-%dT%H:%M:%S")
    results: list[dict] = []
    prior_modules: list[dict] = []

    ntfy_publish(f"Audit run starting. {len(MODULES_TO_RUN) - len([m for m in MODULES_TO_RUN if m in completed])} modules pending.")

    for module_id in MODULES_TO_RUN:
        if module_id in completed:
            log(f"M{module_id}: skipped (checkpoint)")
            continue
        elapsed = time.monotonic() - started
        if elapsed > WALL_CLOCK_BUDGET_SEC:
            log(f"wall-clock budget exhausted at {elapsed:.0f}s; stopping early at M{module_id}")
            ntfy_publish(f"Budget hit at M{module_id}. {len(completed)}/18 done.")
            break
        try:
            r = audit_one_module(module_id, summarise_prior_modules(prior_modules))
        except Exception as e:
            log(f"M{module_id}: FAILED — {e}")
            append_audit_log(
                f"| {run_started_iso} | M{module_id} | (load-failed) | 0 | NO | 0 | 0 | error: {str(e)[:80]} |"
            )
            ntfy_publish(f"M{module_id} failed: {str(e)[:120]}", title="Adipoli audit error")
            continue

        results.append(r)
        prior_modules.append({"id": r["module_id"], "title": r["title"], "titleGerman": r["titleGerman"]})
        completed.add(module_id)
        save_checkpoint(completed)
        avg = sum(int(v) for v in r["scores"].values()) / max(len(r["scores"]), 1)
        append_audit_log(
            f"| {run_started_iso} | M{r['module_id']} | {r['title']} | {r['iterations']} | "
            f"{'YES' if r['passed'] else 'no'} | {avg:.1f} | {r['word_count']} | {r['weakest_axis']} |"
        )
        ntfy_publish(
            f"M{r['module_id']} {'PASS' if r['passed'] else 'partial'} "
            f"({r['iterations']} iters, avg {avg:.1f}, {r['word_count']} wc, weak: {r['weakest_axis']})"
        )

    # ---- Final summary ----
    total = len(results)
    passed_n = sum(1 for r in results if r["passed"])
    total_iters = sum(r["iterations"] for r in results)
    weak_counter: dict[str, int] = {}
    for r in results:
        weak_counter[r["weakest_axis"]] = weak_counter.get(r["weakest_axis"], 0) + 1
    weakest_overall = max(weak_counter.items(), key=lambda kv: kv[1])[0] if weak_counter else "n/a"

    summary = (
        f"Adipoli script audit complete.\n"
        f"{passed_n}/{len(MODULES_TO_RUN)} modules at passing grade ({total} processed this run).\n"
        f"{total_iters} total iterations.\n"
        f"Most-flagged weak axis: {weakest_overall}.\n"
        f"Outputs: {OUTPUT_DIR}/module-XX.script.md\n"
        f"Log: {AUDIT_LOG}"
    )
    log(summary)
    telegram_send(summary)
    ntfy_publish(summary, title="Adipoli audit done")
    return 0


if __name__ == "__main__":
    sys.exit(main())
