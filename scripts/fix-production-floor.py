#!/usr/bin/env python3
"""Append safe production exercises to weak Adipoli German lessons.

This is a text-preserving patcher: it does not rewrite whole module files.
It reads /tmp/adipoli_audit.json from audit-app-readiness, then inserts small
exercise objects into each lesson's existing exercises array.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODULES = ROOT / "src/lib/content/modules"
AUDIO_ROOT = ROOT / "public/audio/hoeren"
AUDIT_JSON = Path("/tmp/adipoli_audit.json")

PROD_TYPES = {"speaking", "free-text", "type-answer", "dictation"}

# Conservative A1-safe dictation lines by rough module theme.
DICTATION_BY_MODULE = {
    1: "Ich lerne Deutsch.",
    2: "Ich heiße Kuttan.",
    3: "Der Termin ist um zehn Uhr.",
    4: "Meine Familie wohnt in Kerala.",
    5: "Ich stehe um sieben Uhr auf.",
    6: "Ich möchte einen Tee, bitte.",
    7: "Das kostet fünf Euro.",
    8: "Das Buch liegt auf dem Tisch.",
    9: "Gehen Sie bitte geradeaus.",
    10: "Ich habe Kopfschmerzen.",
    11: "Ich arbeite als Student.",
    12: "Ich spiele gern Fußball.",
    13: "Gestern habe ich gelernt.",
    14: "Ich brauche einen Termin.",
    15: "In Deutschland sagt man bitte und danke.",
    16: "Ich kann den Text verstehen.",
    17: "Ich höre die Ansage zweimal.",
    18: "Können Sie mir bitte helfen?",
}

SPEAKING_BY_MODULE = {
    1: "Ich lerne Deutsch.",
    2: "Ich heiße Kuttan und komme aus Kerala.",
    3: "Der Termin ist am Montag um zehn Uhr.",
    4: "Meine Mutter wohnt in Thrissur.",
    5: "Morgens trinke ich Tee.",
    6: "Ich möchte Reis und Fisch, bitte.",
    7: "Wie viel kostet das?",
    8: "Mein Zimmer ist klein, aber schön.",
    9: "Entschuldigung, wo ist der Bahnhof?",
    10: "Ich habe Kopfschmerzen und brauche einen Arzt.",
    11: "Ich studiere Deutsch und arbeite am Computer.",
    12: "Am Wochenende spiele ich gern Cricket.",
    13: "Gestern habe ich Deutsch gelernt.",
    14: "Ich möchte bitte einen Termin machen.",
    15: "Danke, das ist sehr freundlich.",
    16: "Ich verstehe den kurzen Text.",
    17: "Ich höre zuerst die Frage und dann den Text.",
    18: "Können Sie mir bitte helfen?",
}

FREE_BY_MODULE = {
    1: ("Write your first German learning sentence.", "Ich lerne Deutsch"),
    2: ("Write a complete A1 self-introduction sentence with your name.", "Ich heiße Kuttan"),
    3: ("Write one appointment sentence with a day and time.", "Der Termin ist am Montag um zehn Uhr"),
    4: ("Write one sentence about where your family lives.", "Meine Familie wohnt in Kerala"),
    5: ("Write one sentence about your morning routine.", "Ich stehe um sieben Uhr auf"),
    6: ("Write one polite food or drink order.", "Ich möchte einen Tee bitte"),
    7: ("Write one price question.", "Wie viel kostet das"),
    8: ("Write one sentence describing your room.", "Mein Zimmer ist klein"),
    9: ("Write one polite direction question.", "Entschuldigung wo ist der Bahnhof"),
    10: ("Write one sentence describing a health problem.", "Ich habe Kopfschmerzen"),
    11: ("Write one sentence about your work or study.", "Ich arbeite am Computer"),
    12: ("Write one sentence about your hobby.", "Ich spiele gern Fußball"),
    13: ("Write one simple past-perfect sentence about yesterday.", "Gestern habe ich Deutsch gelernt"),
    14: ("Write one polite appointment request.", "Ich möchte bitte einen Termin machen"),
    15: ("Write one polite culture sentence using bitte or danke.", "Danke das ist sehr freundlich"),
    16: ("Write one sentence about understanding a short text.", "Ich verstehe den kurzen Text"),
    17: ("Write one Goethe listening/reading strategy sentence.", "Ich lese zuerst die Frage"),
    18: ("Write one polite Goethe speaking request.", "Können Sie mir bitte helfen"),
}

def find_matching(text: str, open_idx: int, open_ch: str, close_ch: str) -> int:
    depth = 0
    in_str = None
    esc = False
    i = open_idx
    while i < len(text):
        c = text[i]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == in_str:
                in_str = None
        else:
            if c in ('"', "'", '`'):
                in_str = c
            elif c == open_ch:
                depth += 1
            elif c == close_ch:
                depth -= 1
                if depth == 0:
                    return i
        i += 1
    raise ValueError(f"No match for {open_ch} at {open_idx}")

def quote(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)

def exercise_obj(ex: dict, indent: str = "        ") -> str:
    lines = [indent + "{"]
    for k in ["id", "type", "question", "questionGerman", "audioUrl", "correctAnswer", "explanation", "xpReward"]:
        if k not in ex:
            continue
        v = ex[k]
        if isinstance(v, list):
            val = "[" + ", ".join(quote(x) for x in v) + "]"
        elif isinstance(v, int):
            val = str(v)
        else:
            val = quote(v)
        lines.append(indent + f"  {k}: {val},")
    lines[-1] = lines[-1].rstrip(',')
    lines.append(indent + "}")
    return "\n".join(lines)

def ensure_audio(module_id: int, lesson_id: str, text: str) -> str:
    out_dir = AUDIO_ROOT / f"module-{module_id:02d}"
    out_dir.mkdir(parents=True, exist_ok=True)
    file_name = f"ex{lesson_id}-prod-dictation.mp3"
    out = out_dir / file_name
    if not out.exists() or out.stat().st_size == 0:
        subprocess.run([
            "edge-tts", "--voice", "de-DE-ConradNeural", "--text", text, "--write-media", str(out)
        ], check=True, cwd=str(ROOT), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return f"/audio/hoeren/module-{module_id:02d}/{file_name}"

def build_additions(l: dict) -> list[dict]:
    module_id = int(l["moduleId"])
    lesson_id = l["lessonId"]
    title = l["title"]
    prod = int(l["productionExercises"])
    adds = []
    speak = SPEAKING_BY_MODULE[module_id]
    free_prompt, free_answer = FREE_BY_MODULE[module_id]
    dict_text = DICTATION_BY_MODULE[module_id]

    if int(l["speaking"]) == 0:
        adds.append({
            "id": f"ex{lesson_id}-prod-speaking",
            "type": "speaking",
            "question": f"Kuttan practice: Say aloud for this lesson ({title}): '{speak}'",
            "questionGerman": f"Sprechen Sie laut: '{speak}'",
            "correctAnswer": speak.rstrip('.?'),
            "explanation": "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
            "xpReward": 25,
        })
    if int(l["freeText"]) == 0:
        adds.append({
            "id": f"ex{lesson_id}-prod-writing",
            "type": "free-text",
            "question": f"Production writing: {free_prompt}",
            "questionGerman": "Schreiben Sie einen vollständigen Satz.",
            "correctAnswer": [free_answer, free_answer + "."],
            "explanation": "A1 writing must be short, complete, and usable. One correct sentence beats five half-known phrases.",
            "xpReward": 20,
        })
    if int(l["dictation"]) == 0:
        audio_url = ensure_audio(module_id, lesson_id, dict_text)
        adds.append({
            "id": f"ex{lesson_id}-prod-dictation",
            "type": "dictation",
            "question": "Listen and type the A1 sentence you hear.",
            "audioUrl": audio_url,
            "correctAnswer": dict_text.rstrip('.?'),
            "explanation": "Dictation connects Hören and Schreiben. Listen for the full sentence, not isolated words.",
            "xpReward": 25,
        })
    while prod + len([a for a in adds if a["type"] in PROD_TYPES]) < 3:
        n = len([a for a in adds if a["type"].startswith("free") or a["type"] == "type-answer"]) + 1
        adds.append({
            "id": f"ex{lesson_id}-prod-apply-{n}",
            "type": "free-text",
            "question": f"Apply it to Kuttan's Kerala-to-Goethe journey: {free_prompt}",
            "questionGerman": "Schreiben Sie einen einfachen A1-Satz.",
            "correctAnswer": [free_answer, free_answer + "."],
            "explanation": "This is a production-floor exercise: you must actively produce German, not only choose an option.",
            "xpReward": 20,
        })
    return adds

def patch_lesson(file_path: Path, lesson_id: str, additions: list[dict]) -> int:
    text = file_path.read_text(encoding="utf-8")
    if all(f'id: "{a["id"]}"' in text for a in additions):
        return 0
    lesson_match = re.search(r'id:\s*"' + re.escape(lesson_id) + r'"', text)
    if not lesson_match:
        raise ValueError(f"lesson {lesson_id} not found in {file_path}")
    lesson_start = text.rfind("{", 0, lesson_match.start())
    ex_match = re.search(r'exercises:\s*\[', text[lesson_match.end():])
    if not ex_match:
        raise ValueError(f"exercises array not found for {lesson_id}")
    arr_open = lesson_match.end() + ex_match.end() - 1
    arr_close = find_matching(text, arr_open, "[", "]")
    existing = text[arr_open:arr_close]
    needed = [a for a in additions if f'id: "{a["id"]}"' not in existing]
    if not needed:
        return 0
    insert = ",\n" + ",\n".join(exercise_obj(a) for a in needed)
    text = text[:arr_close] + insert + text[arr_close:]
    file_path.write_text(text, encoding="utf-8")
    return len(needed)

def main() -> None:
    if not AUDIT_JSON.exists():
        raise SystemExit("Run: npx tsx scripts/audit-app-readiness.ts --json > /tmp/adipoli_audit.json")
    audit = json.loads(AUDIT_JSON.read_text())
    weak = [l for l in audit["lessons"] if l["productionExercises"] < 3 or l["speaking"] == 0 or l["freeText"] == 0 or l["dictation"] == 0]
    total = 0
    touched = set()
    for l in weak:
        module_id = int(l["moduleId"])
        file_path = MODULES / f"module-{module_id:02d}.ts"
        adds = build_additions(l)
        if not adds:
            continue
        count = patch_lesson(file_path, l["lessonId"], adds)
        if count:
            touched.add(file_path.name)
            total += count
    print(f"added_exercises={total}")
    print("touched=" + ",".join(sorted(touched)))

if __name__ == "__main__":
    main()
