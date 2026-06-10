#!/usr/bin/env python3
"""Fast QA gate for the Module 2 mission pilot.

Checks things Boss should not have to catch manually:
- Tailscale/local audio assets must return HTTP 200 audio/*.
- The opening screen must stay text-light.
- Browser SpeechSynthesis and hidden JS-only audio playback must not be used.
- The pilot must expose a simple custom audio button backed by a real <audio> element.
"""
from __future__ import annotations

import os
import re
import subprocess
import sys
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from typing import NoReturn

ROOT = Path(__file__).resolve().parents[1]
MISSION_PAGES = [
    ROOT / "src/app/missions/module-2/self-intro/page.tsx",
    ROOT / "src/app/missions/module-2/spell-name/page.tsx",
    ROOT / "src/app/missions/module-2/from-kerala/page.tsx",
    ROOT / "src/app/missions/module-2/job-languages/page.tsx",
    ROOT / "src/app/missions/module-2/final-self-intro/page.tsx",
]
MISSION_PAGE = MISSION_PAGES[0]
SPELL_NAME_PAGE = MISSION_PAGES[1]
FROM_KERALA_PAGE = MISSION_PAGES[2]
JOB_LANGUAGES_PAGE = MISSION_PAGES[3]
FINAL_SELF_INTRO_PAGE = MISSION_PAGES[4]
MODULE1_MISSION_PAGES = [
    ROOT / "src/app/missions/module-1/greet-frau-weber/page.tsx",
    ROOT / "src/app/missions/module-1/please-thanks/page.tsx",
    ROOT / "src/app/missions/module-1/polite-exit/page.tsx",
    ROOT / "src/app/missions/module-1/first-mini-conversation/page.tsx",
]
MODULE1_MISSION_PAGE = MODULE1_MISSION_PAGES[0]
MODULE1_LESSON2_PRACTICE_PAGE = ROOT / "src/app/missions/module-1/why-a1/page.tsx"
MODULE1_LESSON3_PRACTICE_PAGE = ROOT / "src/app/missions/module-1/german-sounds/page.tsx"
MODULE1_LESSON4_PRACTICE_PAGE = ROOT / "src/app/missions/module-1/formal-greetings/page.tsx"
MODULE1_CHECKPOINT_PAGE = ROOT / "src/app/missions/module-1/checkpoint/page.tsx"
MODULE1_MISSION_DATA = ROOT / "src/lib/missions/module1.ts"
MODULE1_CHECKPOINT_DATA = ROOT / "src/lib/missions/module1Checkpoint.ts"
MODULE1_PRACTICE_DATA = ROOT / "src/lib/missions/module1Practice.ts"
INTRO_PAGE = ROOT / "src/app/intro/page.tsx"
LEARN_PAGE = ROOT / "src/app/learn/page.tsx"
MODULE_PAGE = ROOT / "src/app/learn/[moduleId]/page.tsx"
NAVIGATION = ROOT / "src/components/layout/Navigation.tsx"
GLOBAL_SEARCH = ROOT / "src/components/ui/GlobalSearch.tsx"
MISSION_UI = ROOT / "src/app/missions/module-2/_components/MissionUI.tsx"
MISSION_DATA = ROOT / "src/lib/missions/module2.ts"
MODULE2_CONTENT = ROOT / "src/lib/content/modules/module-02.ts"
VIDEO_BASIS_FILES = [
    ROOT / "scripts/m1-video-defs.json",
    ROOT / "scripts/m2-video-defs.json",
    ROOT / "scripts/props/v1-1-1.json",
    ROOT / "scripts/props/v1-1-1-tts-input.json",
    *sorted((ROOT / "scripts/props").glob("v1-*-*.json")),
    *sorted((ROOT / "scripts/props").glob("v2-*-*.json")),
]
AUDIO_DIR = ROOT / "public/audio/missions/module-2/self-intro"
MISSION_DIALOGUE_AUDIO_FILES = [
    ROOT / "public/audio/missions/module-2/dialogue/spell-examiner-buchstabieren.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/spell-kuttan-model.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/spell-clarify-k-wie-kaiser.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/spell-letter-trap.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/origin-examiner-woher.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/origin-model-kerala-kochi.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/origin-aus-indien.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/origin-wohnort-kochi.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/job-examiner-beruf-sprachen.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/job-model-student-languages.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/job-pattern-student.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/job-language-pattern.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/final-examiner-stellen-sie-sich-vor.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/final-model-full.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/final-module-wrap.mp3",
    ROOT / "public/audio/missions/module-2/dialogue/final-rehearsal-prompt.mp3",
]
MODULE1_DIALOGUE_AUDIO_FILES = [
    ROOT / "public/audio/tts/v1-3-1/v1-3-1-line-1.mp3",
    ROOT / "public/audio/tts/v1-3-1/v1-3-1-line-2.mp3",
    ROOT / "public/audio/tts/v1-3-1/v1-3-1-line-3.mp3",
    ROOT / "public/audio/hoeren/module-01/ex1-1-prod-dictation.mp3",
    ROOT / "public/audio/tts/v1-4-1/v1-4-1-line-0.mp3",
    ROOT / "public/audio/tts/v1-4-1/v1-4-1-line-1.mp3",
    ROOT / "public/audio/tts/v1-4-1/v1-4-1-line-2.mp3",
    ROOT / "public/audio/tts/v1-4-1/v1-4-1-line-3.mp3",
]
BASE_URLS = [
    "http://127.0.0.1:3000",
    "http://100.96.56.53:3000",
]
ROUTE_PATHS = ["/", "/intro", "/learn", "/learn/1", "/learn/2", "/missions/module-1/greet-frau-weber", "/missions/module-1/why-a1", "/missions/module-1/german-sounds", "/missions/module-1/formal-greetings", "/missions/module-1/please-thanks", "/missions/module-1/polite-exit", "/missions/module-1/first-mini-conversation", "/missions/module-1/checkpoint", "/missions/module-2/self-intro", "/missions/module-2/spell-name", "/missions/module-2/from-kerala", "/missions/module-2/job-languages", "/missions/module-2/final-self-intro"]
MAX_OPENING_VISIBLE_WORDS = 42


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
    def handle_data(self, data: str) -> None:
        cleaned = data.strip()
        if cleaned:
            self.text.append(cleaned)


def fail(message: str) -> NoReturn:
    print(f"FAIL: {message}")
    sys.exit(1)


def assert_no_browser_tts() -> None:
    banned = ["SpeechSynthesisUtterance", "speechSynthesis", "new Audio("]
    hits = []
    for page in MISSION_PAGES + MODULE1_MISSION_PAGES + [MODULE1_LESSON2_PRACTICE_PAGE, MODULE1_LESSON3_PRACTICE_PAGE, MODULE1_LESSON4_PRACTICE_PAGE, MODULE1_CHECKPOINT_PAGE]:
        src = page.read_text(encoding="utf-8")
        hits.extend(f"{page.name}:{word}" for word in banned if word in src)
    if hits:
        fail(f"browser/JS-only audio still present: {hits}")


def assert_native_audio_controls() -> None:
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    if "<audio\n        ref={audioRef}" not in mission_ui:
        fail("shared NativeAudio component must keep a real <audio> element for browser-verifiable playback")
    if "<audio controls" in mission_ui:
        fail("shared NativeAudio component reintroduced Chrome-style native controls")
    required_custom_audio = [
        "useRef<HTMLAudioElement | null>(null)",
        "data-testid=\"custom-mission-audio\"",
        "aria-label={`${playing ? 'Pause' : 'Listen to'} ${label}`}",
        "onClick={toggleAudio}",
        "{playing ? 'Pause' : 'Listen'}",
        "className=\"sr-only\"",
        "preload=\"metadata\"",
    ]
    missing_custom_audio = [snippet for snippet in required_custom_audio if snippet not in mission_ui]
    if missing_custom_audio:
        fail(f"shared custom audio UI missing snippets: {missing_custom_audio}")
    required_play_gate = [
        "onPlay?: (src: string) => void",
        "onEnded?: (src: string) => void",
        "onPlay?.(src)",
        "onEnded?.(src)",
        "turnCue?: string",
        "autoContinueOnFinish?: boolean",
        "autoContinueOnFinish = false",
        "data-testid=\"mission-audio-turn-cue\"",
        "{ended ? turnCue : playing ? 'Listening…' : 'Listen first'}",
        "started?: boolean",
        "showStatus?: boolean",
        "const [endedSources, setEndedSources] = useState<string[]>([])",
        "endedRequiredCount",
        "`${endedRequiredCount}/${requiredAudioSources.length}`",
        "Audio finished.",
        "useEffect(() => {",
        "if (hasFinishedRequiredAudio && !heard)",
        "if (!autoContinueOnFinish || !hasFinishedRequiredAudio) return;",
        "window.setTimeout(onContinue, 220)",
        "started={endedSources.includes(audio.src)}",
        "turnCue={audio.turnCue}",
        "showStatus={endedSources.includes(audio.src)}",
        "Finish the scene audio to unlock the next action.",
        "Next action ready.",
        "!autoContinueOnFinish",
        "<PrimaryButton onClick={onContinue}>{cta}</PrimaryButton>",
    ]
    missing_play_gate = [snippet for snippet in required_play_gate if snippet not in mission_ui]
    if missing_play_gate:
        fail(f"shared audio play gate missing snippets: {missing_play_gate}")

    missing_audio_path = []
    audio_backed_step_snippets = ["NativeAudio", "ConversationSceneStep", "ConversationRepairStep"]
    for page in MISSION_PAGES:
        src = page.read_text(encoding="utf-8")
        if not any(snippet in src for snippet in audio_backed_step_snippets):
            missing_audio_path.append(str(page))
    if missing_audio_path:
        fail(f"custom audio path missing in: {missing_audio_path}")
    print(f"custom_audio_pages={len(MISSION_PAGES)} shared_audio_ui=ok")


def assert_audio_files() -> None:
    files = sorted(AUDIO_DIR.glob("*.mp3"))
    if len(files) < 5:
        fail(f"expected at least 5 mission mp3 files, found {len(files)}")
    all_files = files + MISSION_DIALOGUE_AUDIO_FILES + MODULE1_DIALOGUE_AUDIO_FILES
    for path in all_files:
        if not path.exists():
            fail(f"audio file missing: {path}")
        if path.stat().st_size < 10_000:
            fail(f"audio file too small/suspicious: {path.name} {path.stat().st_size} bytes")
    for base in BASE_URLS:
        for path in all_files:
            rel = path.relative_to(ROOT / "public")
            url = f"{base}/{rel.as_posix()}"
            try:
                with urllib.request.urlopen(url, timeout=5) as response:
                    ctype = response.headers.get("content-type", "")
                    status = response.status
                    head = response.read(3)
            except Exception as exc:  # noqa: BLE001
                fail(f"audio URL not reachable: {url} -> {exc!r}")
            if status != 200 or not ctype.startswith("audio/") or not head:
                fail(f"bad audio response: {url} status={status} type={ctype} head={head!r}")


def assert_opening_text_light() -> None:
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    required_intro_ui = [
        "export function MissionIntro",
        "Goethe A1 speaking win",
        "outputLabel = 'Your first line'",
        "meaning?: string",
        "lg:grid-cols-[1fr_0.72fr]",
        "promises = ['1 Listen', '2 Say aloud', '3 Fix mistake']",
        "promises.join(', ')",
        "KeralaClassroomScene",
    ]
    missing_intro_ui = [snippet for snippet in required_intro_ui if snippet not in mission_ui]
    if missing_intro_ui:
        fail(f"shared compact MissionIntro missing snippets: {missing_intro_ui}")
    for page in MISSION_PAGES + MODULE1_MISSION_PAGES:
        src = page.read_text(encoding="utf-8")
        direct_scene_allowed = "module-1/greet-frau-weber" in page.as_posix() or "module-1/please-thanks" in page.as_posix() or "module-1/polite-exit" in page.as_posix() or "module-1/first-mini-conversation" in page.as_posix() or "module-2/spell-name" in page.as_posix() or "module-2/from-kerala" in page.as_posix() or "module-2/job-languages" in page.as_posix()
        if "<MissionIntro" not in src and not direct_scene_allowed:
            fail(f"mission page should use compact shared MissionIntro or approved direct-scene start: {page}")
        # Extract the step===0 JSX block roughly. This is deliberately simple and conservative.
        m = re.search(r"\{step === 0 && \((.*?)\n\s*\)\}\n\n\s*\{step === 1", src, re.S)
        if not m and direct_scene_allowed:
            m = re.search(r"\{step === 0 && \((.*?)\n\s*\)\}\n\s*</PremiumCard>", src, re.S)
        if not m:
            fail(f"could not locate opening step block: {page}")
        block = m.group(1)
        if direct_scene_allowed:
            if "<ConversationRepairStep" not in block:
                fail(f"approved direct-scene start should open on the conversation repair beat: {page}")
        elif "<MissionIntro" not in block:
            fail(f"opening screen should use shared focused MissionIntro: {page}")
        if "note=\"" in block:
            fail(f"opening screen reintroduced explanatory note text instead of chips: {page}")
        old_crowding = ["Today’s output", "Mission 2.1", "Mission 2.2", "Mission 2.3", "Mission 2.4", "Mission 2.5"]
        hits = [snippet for snippet in old_crowding if snippet in block]
        if hits:
            fail(f"opening screen reintroduced duplicate/crowded intro chrome in {page.name}: {hits}")
        # Remove class names/import-ish noise; count only JSX text between tags plus obvious string literals.
        text_bits = re.findall(r">([^<>{}][^<>]*)<", block)
        text = " ".join(bit.strip() for bit in text_bits if bit.strip())
        words = re.findall(r"[A-Za-zÄÖÜäöüß]+", text)
        if len(words) > MAX_OPENING_VISIBLE_WORDS:
            fail(f"opening screen too text-heavy in {page.name}: {len(words)} words > {MAX_OPENING_VISIBLE_WORDS}: {text}")
        print(f"opening_words[{page.parent.name}]={len(words)}")


def assert_no_learner_facing_meta_labels() -> None:
    banned_visible_copy = [
        "not a mascot joke",
        "Still in Kerala:",
        "M1 Danke/Bitte model",
        "M1 polite exit model",
        "sideNote",
        "Kuttan is still in Kerala, rehearsing",
        "No dashboard stop.",
        "Module 1 sequence progress",
        "Module 2 sequence progress",
        "<span className=\"hidden sm:inline\"> mission</span>",
        "{safeIndex + 1}/5",
        "{safeIndex + 1}/{module1MissionCards.length}",
        "Sentence slots",
        "Undo last chip",
        "Reset slots",
        "I said it aloud",
        "Speak + type",
        "Say + type",
        "Repair trap",
        "Repair the trap",
        "Repair common mistake",
        "Repair the article trap",
        "Repair the final trap",
        "Write one A1 answer",
        "Model answer",
        "Reply model",
        "Name model",
        "Origin model",
        "Profile model",
        "Full intro model",
        "Exit model",
        "Ability unlocked",
        "Aus pattern",
        "Job pattern",
        "Module wrap",
        "Classroom phrases",
        "M1 wins",
        "M2 wins",
        "className=\"text-sm font-black uppercase tracking-[0.22em] text-[#f1d27a]\"",
        "{done ? <Check className=\"h-3.5 w-3.5\" aria-hidden=\"true\" /> : index + 1}",
    ]
    hits = []
    for page in MISSION_PAGES + MODULE1_MISSION_PAGES + [MISSION_UI]:
        src = page.read_text(encoding="utf-8")
        for snippet in banned_visible_copy:
            if snippet in src:
                hits.append(f"{page.parent.name}:{snippet}")
    if hits:
        fail(f"learner-facing meta/internal labels present: {hits}")
    print("visible_meta_labels=clean")


def assert_module1_audio_labels_are_human() -> None:
    wrong_labels = []
    missing_labels = []
    for page in MODULE1_MISSION_PAGES:
        src = page.read_text(encoding="utf-8")
        if 'audioLabel="Your reply"' in src:
            wrong_labels.append(str(page))
        if 'audioLabel="Your line"' not in src:
            missing_labels.append(str(page))
    if wrong_labels or missing_labels:
        fail(
            "Module 1 audio labels should be a short learner action label, not system-ish reply copy: "
            f"wrong={wrong_labels} missing={missing_labels}"
        )
    print("module1_audio_labels=your_line")


def assert_choice_subtitles_stay_compact() -> None:
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    required = [
        "const selected = value === option.id;",
        "<span className={selected ? 'text-white/60' : 'sr-only'}>{option.subtitle}</span>",
    ]
    missing = [snippet for snippet in required if snippet not in mission_ui]
    if missing:
        fail(f"choice/repair subtitles must stay hidden until selected: {missing}")
    always_visible_subtitle = "<span className=\"text-white/60\">{option.subtitle}</span>"
    if always_visible_subtitle in mission_ui:
        fail("choice/repair option subtitles are always visible again")
    print("choice_subtitles=compact")


def assert_choice_continue_is_not_a_dead_button() -> None:
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    choice_section = mission_ui.split("export function ChoiceStep", 1)[1].split("export function RepairStep", 1)[0]
    recognition_section = mission_ui.split("export function RecognitionStep", 1)[1].split("export function ReplyAloudStep", 1)[0]
    required = [
        "autoContinueOnCorrect",
        "window.setTimeout(onContinue",
        "{!continueDisabled && !autoContinueOnCorrect && (",
        "<PrimaryButton onClick={onContinue}>{cta}</PrimaryButton>",
        "Choose the correct answer to continue.",
        "Correct. Moving forward.",
    ]
    missing_choice = [snippet for snippet in required if snippet not in choice_section]
    missing_recognition = [snippet for snippet in required if snippet not in recognition_section]
    if missing_choice or missing_recognition:
        fail(
            "choice/recognition continue controls must stay hidden until useful: "
            f"choice_missing={missing_choice} recognition_missing={missing_recognition}"
        )
    dead_cta = "<PrimaryButton onClick={onContinue} disabled={continueDisabled}>{cta}</PrimaryButton>"
    if dead_cta in choice_section or dead_cta in recognition_section:
        fail("choice/recognition screens reintroduced a visible disabled Continue chore")
    print("choice_continue=no_dead_button")


def assert_repair_explainer_stays_compact() -> None:
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    required = [
        "const hasSelectedRepair = value !== null;",
        "data-testid=\"repair-explanation\"",
        "hasSelectedRepair ? 'mt-3 text-sm leading-6 text-white/56' : 'sr-only'",
        "data-testid=\"repair-bridge-note\"",
        "? 'mt-4 rounded-2xl border border-[#f1d27a]/18 bg-[#f1d27a]/7 p-3 text-sm leading-6 text-white/64'",
        ": 'sr-only'",
    ]
    missing = [snippet for snippet in required if snippet not in mission_ui]
    if missing:
        fail(f"repair left-panel explainer must stay hidden/compact until selection: {missing}")
    banned_always_visible = [
        "<p className=\"mt-4 text-lg leading-8 text-white/70\">{explanation}</p>",
        "<div className=\"mt-6 rounded-2xl border border-[#f1d27a]/22 bg-[#f1d27a]/9 p-4 text-white/72\">",
    ]
    hits = [snippet for snippet in banned_always_visible if snippet in mission_ui]
    if hits:
        fail(f"repair explainer copy is always visible again: {hits}")
    print("repair_explainer=compact")


def assert_scene_check_copy_stays_visual_minimal() -> None:
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    self_intro = MISSION_PAGE.read_text(encoding="utf-8")
    required = [
        "<p className=\"sr-only\" data-testid=\"hear-step-instructions\">{instructions}</p>",
        "<p className=\"sr-only\" data-testid=\"recognition-prompt\">{prompt}</p>",
        "data-testid=\"recognition-scene-audio\"",
        "bare?: boolean",
        "data-audio-surface={bare ? 'flat' : 'card'}",
    ]
    missing = [snippet for snippet in required if snippet not in mission_ui]
    if missing:
        fail(f"hear/recognition screens must keep instructional copy accessible-only and visual-light: {missing}")

    hear_section = mission_ui.split("export function HearStep", 1)[1].split("export function RecognitionStep", 1)[0]
    recognition_section = mission_ui.split("export function RecognitionStep", 1)[1].split("export function ReplyAloudStep", 1)[0]
    banned_visible_patterns = [
        "<p className=\"mt-3 max-w-xl text-base leading-7 text-white/66\">{instructions}</p>",
        "<p className=\"mt-4 text-lg text-white/70\">{prompt}</p>",
    ]
    hits = [snippet for snippet in banned_visible_patterns if snippet in hear_section or snippet in recognition_section]
    if hits:
        fail(f"hear/recognition instruction prose is visible again: {hits}")

    old_audio_labels = []
    for page in MISSION_PAGES + MODULE1_MISSION_PAGES:
        src = page.read_text(encoding="utf-8")
        if "Full self-introduction model" in src:
            old_audio_labels.append(str(page))
    if old_audio_labels:
        fail(f"learner-facing audio label still says model: {old_audio_labels}")
    required_flat_question = [
        "data-testid=\"flat-question-card\"",
        "<NativeAudio src={currentQuestionReference.audio} label=\"Question\" compact bare />",
    ]
    missing_flat_question = [snippet for snippet in required_flat_question if snippet not in self_intro]
    if missing_flat_question:
        fail(f"self-intro recognition card must stay flat/light: {missing_flat_question}")
    nested_question_card = [
        "rounded-[1.8rem] border border-white/12 bg-white/[0.04] p-4",
        "rounded-2xl border border-white/10 bg-[#0f1d14]/65 p-4",
    ]
    nested_hits = [snippet for snippet in nested_question_card if snippet in self_intro]
    if nested_hits:
        fail(f"self-intro recognition question card is nested/dashboard-like again: {nested_hits}")
    print("scene_check_copy=visual_minimal")


def assert_start_path_source() -> None:
    intro = INTRO_PAGE.read_text(encoding="utf-8")
    learn = LEARN_PAGE.read_text(encoding="utf-8")
    module = MODULE_PAGE.read_text(encoding="utf-8")
    mission_data = MISSION_DATA.read_text(encoding="utf-8")
    home = (ROOT / "src/app/page.tsx").read_text(encoding="utf-8")
    navigation = NAVIGATION.read_text(encoding="utf-8")
    global_search = GLOBAL_SEARCH.read_text(encoding="utf-8")
    required_intro = [
        "Your first German moment.",
        "Meet Frau Weber, hear a real classroom greeting",
        "Begin lesson 1 <ArrowRight",
        "const FIRST_MISSION_HREF = '/missions/module-1/greet-frau-weber'",
        "router.replace(FIRST_MISSION_HREF)",
        "KeralaClassroomScene",
        "variant=\"kochi-room\"",
    ]
    missing_intro = [snippet for snippet in required_intro if snippet not in intro]
    if missing_intro:
        fail(f"intro start path missing CTA/copy snippets: {missing_intro}")
    if "router.replace('/onboarding')" in intro:
        fail("intro should not dump first-run learners into setup before the mission path")
    intro_crowding = [snippet for snippet in ["IntroNextButton", "const SCENES", "AnimatePresence", "What happens next", "Go to the first mission", "Your first win: greet the class.", "Skip"] if snippet in intro]
    if intro_crowding:
        fail(f"intro reintroduced multi-slide/crowded first-run flow: {intro_crowding}")
    required_home = [
        "Guided A1 start",
        "KeralaClassroomScene",
        "variant=\"ai-study\"",
        "nextModule1Mission",
        "completedModule1MissionCount",
        "Start listening",
        "`${nextModule1Mission.href}?start=listen`",
        "Five short Goethe A1 speaking missions: listen, answer aloud, then repair one real mistake.",
        "nextModule2Mission.title",
        "module2CompleteHomeTitle",
        "module2CompleteHomeProof",
        "module2CompleteHomeHref = '/learn/3'",
        "module2CompleteHomeCta = 'Start Module 3'",
        "module2HomeHref",
        "href={module2HomeHref}",
        "module2HomeCta",
        "readCompletedModule2Missions",
        "module2-mission-completed",
        "module2HomeCta",
        "Start listening",
        "from-[#d4a520] to-[#b8891a]",
        "const shouldShowModule2ResumeStrip = completedCount > 0 || completedModule1MissionCount > 0 || completedModule2MissionCount > 0;",
        "const shouldSuppressHomeExtras = shouldShowModule2ResumeStrip;",
        "module2ResumeEyebrow = !module1Complete",
        "Ability unlocked",
        "? 'Module 1'",
        ": 'Module 2'",
        "? nextModule1Mission.output",
        ": nextModule2Mission.output",
        "module2ResumeCta",
        "module2ResumeProgressLabel",
        "You can introduce yourself.",
        "Ich heiße ... Ich komme aus Kerala.",
        "showOldLessonQueue",
        "Old lesson queue",
        "Optional: open the previous lesson card.",
        "!shouldSuppressHomeExtras && schedule && studyPlan",
        "isVisible={!!newAchievement && !shouldSuppressHomeExtras}",
        "nextLesson && !schedule && shouldShowModule2ResumeStrip && !shouldSuppressHomeExtras && !showOldLessonQueue",
        "nextLesson && !schedule && !shouldSuppressHomeExtras && (!shouldShowModule2ResumeStrip || showOldLessonQueue)",
        "completedCount > 0 && !shouldSuppressHomeExtras",
    ]
    missing_home = [snippet for snippet in required_home if snippet not in home]
    if missing_home:
        fail(f"homepage start path missing mission-first snippets: {missing_home}")
    banned_home_crowding = [
        "Mission path",
        "playable missions",
        "speaking room",
        "lesson dump",
        "First win",
        "M1 done",
        "Open Module 2 mission path",
        "Continue your speaking path.",
        "`Continue ${nextModule2Mission.missionNumber}`",
        "Begin the speaking path",
        "Start speaking path",
        "<Zap",
        "href=\"/intro\"",
    ]
    home_crowding = [snippet for snippet in banned_home_crowding if snippet in home]
    if home_crowding:
        fail(f"homepage start path reintroduced gamey/ambiguous labels: {home_crowding}")

    required_learn = [
        "module2MissionCards",
        "readCompletedModule2Missions",
        "module2-mission-completed",
        "nextModule2Mission",
        "learnHeroKicker",
        "learnHeroTitle",
        "learnHeroContext",
        "learnHeroPreview",
        "Speaking mission · ${nextModule2Mission.missionNumber.replace('Mission ', '')}",
        "nextModule2MissionHref",
        "`${nextModule2Mission.href}?start=listen`",
        "learnHeroHref",
        "learnHeroCta",
        "KeralaClassroomScene",
        "One classroom line. Listen first.",
        "One exam-room answer. Listen first.",
        "Complete. Replay before Module 3.",
        "Review your 20-second self-intro.",
        "Ich heiße ... Ich komme aus Kerala. Ich spreche ...",
        "Old lesson map",
        "Optional classic lesson queue; not the first-session path.",
        "showCourseTools",
        "useState(false)",
    ]
    banned_learn_crowding = [
        "Need the old lesson map?",
        "Optional — not the first-session path.",
        "`Next: ${nextMissionOutputSentence}`",
        "`Next: ${nextModule1Mission.output}`",
        "<Flame",
        "Classic map hidden",
        "Guided mission lane",
        "Today’s proof",
        "Native audio controls",
        "Start mission 1: name answer",
        "See the five-mission path",
        "See all 5 missions",
        "See Module 1",
        "Start lesson",
        "Module 2 · Lesson 1",
        "Introduce yourself in German.",
        "learnHeroCopy",
        "learnHeroWhy",
        "A short Goethe-room drill",
        "Mission flow",
        "learnHeroPromises",
        "Hear model",
        "Answer aloud",
        "Fix mistake",
        "`Continue ${nextModule2Mission.missionNumber}`",
    ]
    learn_crowding = [snippet for snippet in banned_learn_crowding if snippet in learn]
    if learn_crowding:
        fail(f"/learn entry path reintroduced over-named product/UI proof labels: {learn_crowding}")
    missing_learn = [snippet for snippet in required_learn if snippet not in learn]
    if missing_learn:
        fail(f"/learn entry path missing guided Module 2 snippets: {missing_learn}")
    required_module_static = [
        "courseModule.titleGerman &&",
        "module2NextOutput",
        "Now handle numbers.",
        "Price or phone number. Listen first.",
        "0–20, prices, phone numbers",
        "listening, answering aloud, tiny writing, and one repair",
        "readCompletedModule2Missions",
        "module2-mission-completed",
        "Module 2 · ${module2SequenceComplete ? 'complete' : nextModule2Mission.missionNumber}",
        "Module 2 mission progress",
        "Module 2 complete; Module 3 numbers is ready",
        "Start listening",
        "Start Module 3 numbers",
        "nextModule2Mission.href",
        "nextModule2MissionHref",
        "module2SequenceComplete\n    ? '/learn/3'\n    : `${nextModule2Mission.href}?start=listen`",
        "module1CompletionHref = module2MissionCards[0]?.href ? `${module2MissionCards[0].href}?start=listen` : '/learn/2'",
        "showPrimaryCta = isModule1 ? true : isModule2 ? true : Boolean(nextLesson)",
        "{showPrimaryCta && (",
        "Boss wants one action, not dashboard proof labels.",
    ]
    missing_module_static = [snippet for snippet in required_module_static if snippet not in module]
    if missing_module_static:
        fail(f"module 2 path missing mission-sequence snippets: {missing_module_static}")
    module2_crowding = [snippet for snippet in ["Continue ${nextModule2Mission.missionNumber.replace('Mission ', '')}", "Start mission 1: name answer", "Start mission ${nextModule2Mission.missionNumber.replace('Mission ', '')}", "5 speaking wins", "Say now", "5 playable missions", ">Playable<", "Continue</span>", "Open step", "Do the next speaking win now.", "Do this now", "Launch current Module 2 mission", "One active mission is spotlighted", "Quiet path for review — main action is above.", "Tap any mission only if you want to jump or review.", "module2PathPreview", "One guided speaking arc", "Path: {module2PathPreview.join(' → ')}", "Recommended: start the next mission above; use this row to jump or review.", "Recommended start", "Five-mission sequence", "cards below are for review", "Module 2 · speaking mission sequence", "Module 2 path", "Your speaking mission sequence", "Speaking path", "Open mission map", "Start: ${nextModule2Mission.title}", "Exam answers", "See your path", "Next line", "Next win", "Next answer", "Module 1 mission progress dots", "Module 2 mission progress dots", "Module 1 compact mission dots", "Module 2 compact mission dots"] if snippet in module]
    if module2_crowding:
        fail(f"module 2 path reintroduced ambiguous CTA/system labels: {module2_crowding}")
    required_module_data = [
        "/missions/module-2/self-intro",
        "/missions/module-2/spell-name",
        "/missions/module-2/from-kerala",
        "audio • answer aloud • quick repair",
        "/missions/module-2/job-languages",
        "audio • answer aloud • quick repair",
        "/missions/module-2/final-self-intro",
        "listen • answer aloud • repair",
        "Playable now",
        "/audio/missions/module-2/dialogue/spell-examiner-buchstabieren.mp3",
        "/audio/missions/module-2/dialogue/origin-examiner-woher.mp3",
        "/audio/missions/module-2/dialogue/job-examiner-beruf-sprachen.mp3",
        "/audio/missions/module-2/dialogue/final-model-full.mp3",
    ]
    missing_module_data = [snippet for snippet in required_module_data if snippet not in mission_data]
    if missing_module_data:
        fail(f"shared Module 2 mission data missing launch/audio snippets: {missing_module_data}")
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    mission_page = MISSION_PAGE.read_text(encoding="utf-8")
    module1_data = MODULE1_MISSION_DATA.read_text(encoding="utf-8")
    required_direct_handoff = [
        "const opensModule2 = nextMission?.href.startsWith('/missions/module-2')",
        "const opensCheckpoint = nextMission?.href === '/missions/module-1/checkpoint'",
        "const nextHref = nextMission ? `${nextMission.href}${nextMission.href.includes('?') ? '&' : '?'}start=listen` : '/learn/2'",
        "Opens the examiner audio directly.",
        "Opens the closed Module 1 checkpoint directly.",
        "Opens the next classroom audio directly.",
    ]
    missing_direct_handoff = [snippet for snippet in required_direct_handoff if snippet not in mission_ui]
    if missing_direct_handoff:
        fail(f"Module 1 direct-listen handoff missing snippets: {missing_direct_handoff}")
    if "href: '/missions/module-1/checkpoint'" not in module1_data:
        fail("Module 1 final mission should target the scored checkpoint before Module 2")
    required_module2_direct_listen = [
        "useSearchParams",
        "searchParams.get('start') !== 'listen'",
        "setStep((value) => (value === 0 ? 1 : value))",
    ]
    missing_module2_direct_listen = [snippet for snippet in required_module2_direct_listen if snippet not in mission_page]
    if missing_module2_direct_listen:
        fail(f"Module 2 self-intro direct-listen guard missing snippets: {missing_module2_direct_listen}")
    tts_reuse = re.findall(r"/audio/tts/[^'\"]+", mission_data)
    if tts_reuse:
        fail(f"Module 2 mission sequence should use mission-specific dialogue audio, not generic lesson TTS: {tts_reuse}")
    if "pathname === '/'" not in navigation or 'pathname === \'/\'' not in navigation:
        fail("homepage start path should hide fixed bottom navigation")
    if "pathname === '/learn'" not in navigation or 'pathname === \'/learn\'' not in navigation:
        fail("/learn focused entry path should hide fixed bottom navigation")
    if 'pathname === \'/learn/2\'' not in navigation:
        fail("focused Module 2 landing should hide fixed bottom navigation")
    if "pathname === '/'" not in global_search or 'pathname === \'/\'' not in global_search:
        fail("homepage start path should hide floating global search")
    if "pathname === '/learn'" not in global_search or 'pathname === \'/learn\'' not in global_search:
        fail("/learn focused entry path should hide floating global search")
    if 'pathname === \'/learn/2\'' not in global_search:
        fail("focused Module 2 landing should hide floating global search")
    print("start_path_source=ok")


def assert_mission_data_drives_path() -> None:
    data = MISSION_DATA.read_text(encoding="utf-8")
    module = MODULE_PAGE.read_text(encoding="utf-8")
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    expected = [
        ("selfIntro", "/missions/module-2/self-intro"),
        ("spellName", "/missions/module-2/spell-name"),
        ("fromKerala", "/missions/module-2/from-kerala"),
        ("jobLanguages", "/missions/module-2/job-languages"),
        ("finalSelfIntro", "/missions/module-2/final-self-intro"),
    ]
    for mission_id, route in expected:
        if mission_id not in data or route not in data:
            fail(f"shared Module 2 mission data missing {mission_id}/{route}")
    if "nextModule2Mission" not in module or "module2MissionCards" not in module:
        fail("/learn/2 must route from shared module2MissionCards without local mission card data")
    if "const module2Missions = [" in module:
        fail("/learn/2 reintroduced local mission card data instead of shared mission data")
    required_sequence_ui = [
        "MissionSequenceRibbon",
        "Current mission {safeIndex + 1} of 5:",
        "truncate font-bold",
        "Next mission: ${nextMission.title}",
        "Module 2 review opens from the win card.",
        "Module 2 completion ribbon",
        "Module 2 mission completion status",
        "role=\"listitem\"",
        "const status = done ? 'completed' : active ? 'current mission' : 'not completed yet';",
        "aria-label={`${mission.missionNumber}: ${mission.title} — ${status}`}",
        "aria-hidden=\"true\"",
        "{completedCount}/5 done",
        "readCompletedModule2Missions()",
        "completedMissionSet.has(mission.id)",
        "window.addEventListener('module2-mission-completed', refreshCompletedMissions)",
        "currentMissionId?: Module2MissionId",
        "Module2SequenceStatus",
        "Speaking wins",
        "One guided speaking arc, not five loose pages.",
        "Module 2 compact win progress",
        "Module 2 complete. Review from the landing page.",
        "module2MissionCards.map",
        "flex h-8 w-8 items-center justify-center rounded-full",
        "h-2.5 w-2.5 items-center justify-center rounded-full",
        "min-h-[calc(100vh-42px)]",
        "export function NextMissionCard",
        "nextMission.pull",
        "finalPull?.title",
        "Next mission",
        "Start next",
        "Start M3",
        "MODULE2_COMPLETED_MISSIONS_STORAGE_KEY",
        "readCompletedModule2Missions",
        "writeCompletedModule2Mission",
        "window.localStorage.setItem",
        "new CustomEvent('module2-mission-completed'",
        "writeCompletedModule2Mission(currentMissionId)",
    ]
    missing_sequence_ui = [snippet for snippet in required_sequence_ui if snippet not in mission_ui]
    if missing_sequence_ui:
        fail(f"shared mission sequence progress UI missing snippets: {missing_sequence_ui}")
    if not re.search(r"function MissionSequenceRibbon[\s\S]+?return \(\n    <div className=\"sr-only\">", mission_ui):
        fail("Module 2 sequence ribbon must stay accessible-only on mission screens; visible ribbons/dots feel like dashboard clutter")
    ribbon_crowding = [
        "<span className=\"sm:hidden\">Next mission</span>",
        "Next: {nextMission.title}",
        "sm:border-0 sm:bg-transparent",
        "Continue sequence:",
        "Module 2 complete — review the full path",
    ]
    ribbon_crowding_hits = [snippet for snippet in ribbon_crowding if snippet in mission_ui]
    if ribbon_crowding_hits:
        fail(f"mission win/ribbon reintroduced duplicate next CTA clutter: {ribbon_crowding_hits}")
    if "<Module2SequenceStatus currentMissionId={currentMissionId} />" in mission_ui:
        fail("mission win screen should not duplicate the top sequence ribbon with a second visible M2 progress block")
    for page in MISSION_PAGES:
        src = page.read_text(encoding="utf-8")
        if "module2MissionById" not in src or "module2MissionAudio" not in src:
            fail(f"mission page not wired to shared mission data/audio: {page}")
        if "const audioSources = {" in src or "const missionSteps = [" in src:
            fail(f"mission page reintroduced local steps/audio data: {page}")
        if "currentMissionId={mission.id}" not in src:
            fail(f"mission shell missing cross-mission sequence ribbon wiring: {page}")
        if page in (SPELL_NAME_PAGE, FROM_KERALA_PAGE):
            inline_testid = 'spell-name-inline-win' if page == SPELL_NAME_PAGE else 'from-kerala-inline-win'
            if f'data-testid="{inline_testid}"' not in src or "writeCompletedModule2Mission" not in src:
                fail(f"direct-scene mission should keep one-screen inline win/completion wiring: {page}")
        else:
            if "<MissionWinStep" not in src:
                fail(f"mission win screen missing shared MissionWinStep: {page}")
        if "<NextMissionCard currentMissionId={mission.id}" not in src:
            fail(f"mission win side card should use shared NextMissionCard: {page}")
        if "<Sparkles" in src or "Next pull" in src or "Next mission" in src:
            fail(f"mission page reintroduced custom next-pull card markup: {page}")
    print("module2_mission_data=shared sequence_progress=ok")


def assert_self_intro_recognition_stays_focused() -> None:
    src = MISSION_PAGE.read_text(encoding="utf-8")
    banned = [
        "catchCards.map",
        "hint: 'heißen = to be called'",
        "hint: 'kommen aus = come from'",
        "hint: 'sprechen = speak'",
        "Welche Sprachen sprechen Sie?",
        "label=\"Native audio\"",
    ]
    hits = [snippet for snippet in banned if snippet in src]
    if hits:
        fail(f"self-intro recognition step reintroduced dense reference cards: {hits}")
    required = [
        "const currentQuestionReference = {",
        "prompt: 'Wie heißen Sie?',",
        "answer: 'Your name?',",
        "src={currentQuestionReference.audio}",
        "label=\"Question\"",
        "<SpeakRepairStep",
        "Answer, then fix.",
        "data-typing-required=\"false\"",
        "inline-repair-choice",
    ]
    missing = [snippet for snippet in required if snippet not in src and snippet not in MISSION_UI.read_text(encoding="utf-8")]
    if missing:
        fail(f"self-intro recognition/production step lost compact optional-anchor behavior: {missing}")
    print("self_intro_recognition_reference=focused optional_anchor=ok")


def assert_module1_first_mission_path() -> None:
    home = (ROOT / "src/app/page.tsx").read_text(encoding="utf-8")
    learn = LEARN_PAGE.read_text(encoding="utf-8")
    module = MODULE_PAGE.read_text(encoding="utf-8")
    data = MODULE1_MISSION_DATA.read_text(encoding="utf-8")
    checkpoint_data = MODULE1_CHECKPOINT_DATA.read_text(encoding="utf-8")
    checkpoint_page = MODULE1_CHECKPOINT_PAGE.read_text(encoding="utf-8")
    practice_data = MODULE1_PRACTICE_DATA.read_text(encoding="utf-8")
    module1_product_spec = (ROOT / "course-production/a1-mvp/module-01/module-01-app-practice-wiring-spec.md").read_text(encoding="utf-8")
    navigation = NAVIGATION.read_text(encoding="utf-8")
    global_search = GLOBAL_SEARCH.read_text(encoding="utf-8")
    mission_pages = [(page, page.read_text(encoding="utf-8")) for page in MODULE1_MISSION_PAGES]

    required = [
        ("module1 data", data, [
            "greetFrauWeber",
            "pleaseThanks",
            "politeExit",
            "firstMiniConversation",
            "/missions/module-1/greet-frau-weber",
            "/missions/module-1/please-thanks",
            "/missions/module-1/polite-exit",
            "/missions/module-1/first-mini-conversation",
            "Guten Morgen, Frau Weber. Ich lerne Deutsch.",
            "Danke. Bitte.",
            "Vielen Dank. Auf Wiedersehen.",
            "Guten Tag, Frau Weber. Gut, danke. Auf Wiedersehen.",
            "/missions/module-1/checkpoint",
            "Do Module 1 checkpoint",
            "readCompletedModule1Missions",
            "writeCompletedModule1Mission",
            "module1-mission-completed",
            "/audio/tts/v1-3-1/v1-3-1-line-1.mp3",
            "/audio/tts/v1-4-1/v1-4-1-line-0.mp3",
        ]),
        ("module1 practice data", practice_data, [
            "module1AnswerFrauWeberPractice",
            "Practice: answer Frau Weber",
            "/missions/module-1/greet-frau-weber",
            "Guten Morgen, Frau Weber.",
            "Ich lerne Deutsch.",
            "correctChoiceId: 'guten-morgen'",
            "Wrong moment. Replay once; morning class needs Guten Morgen.",
            "Closed check: no Google, no notes.",
            "schreiben:first_sentence",
            "Practice: Danke + Bitte",
        ]),
        ("module1 app practice spec", module1_product_spec, [
            "Practice: answer Frau Weber",
            "Required learner flow",
            "Closed mini-check for this practice set",
            "Recovery cards",
            "Current status: **PASS/WEAK**",
        ]),
        ("/learn hero", learn, [
            "Module 1 · ${nextModule1Mission.missionNumber}",
            "Start listening",
            "`${nextModule1Mission.href}?start=listen`",
            "readCompletedModule1Missions",
        ]),
        ("/learn/1 module page", module, [
            "Module 1 · ${module1Complete ? 'mission review' : nextModule1Mission.missionNumber}",
            "Module 1 mission progress",
            "Module 1 complete; Module 2 speaking is ready",
            "KeralaClassroomScene",
            "variant={isModule1 ? 'ai-study' : 'abstract'}",
            "Frau Weber speaks. You answer.",
            "Examiner speaks. You answer.",
            "module1SceneLine",
            "Ich heiße ...",
            "nextModule1Mission.href",
            "module1CompletionHref = module2MissionCards[0]?.href",
            "module1PrimaryHref",
            "`${nextModule1Mission.href}?start=listen`",
            "module1NextOutput",
            "Boss wants one action, not dashboard proof labels.",
            "Start Module 2 speaking",
        ]),
        ("home", home, [
            "nextModule1Mission",
            "completedModule1MissionCount",
            "Start listening",
            "`${nextModule1Mission.href}?start=listen`",
            "readCompletedModule1Missions",
        ]),
    ]
    for label, src, snippets in required:
        missing = [snippet for snippet in snippets if snippet not in src]
        if missing:
            fail(f"{label} missing Module 1 sequence snippets: {missing}")
    if module.count("`Start ${nextModule1Mission.missionNumber}`") > 1:
        fail("/learn/1 should expose one obvious primary Start Mission CTA, not a duplicate lower CTA")
    module1_landing_crowding = [
        "Module 1 path",
        "Three classroom wins.",
        "Finish greeting, thanks, and goodbye. Then Module 2 speaking opens.",
        "is queued",
        "Open the three-mission map",
        "Your path",
        "See your path",
        "3 steps",
        "Module 1 compact mission dots",
        "Module 2 compact mission dots",
        "Module 1 ability certificate",
        "Classroom survival",
        "Replay goodbye",
        "Start Module 2</Link>",
    ]
    module1_landing_crowding_hits = [snippet for snippet in module1_landing_crowding if snippet in module]
    if module1_landing_crowding_hits:
        fail(f"/learn/1 reintroduced duplicate lower-card text: {module1_landing_crowding_hits}")
    if "pathname === '/learn/1'" not in navigation and "pathname === \'/learn/1\'" not in navigation:
        fail("focused Module 1 landing should hide fixed bottom navigation")
    if "pathname === '/learn/1'" not in global_search and "pathname === \'/learn/1\'" not in global_search:
        fail("focused Module 1 landing should hide floating global search")
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    required_module1_shared = [
        "function Module1SequenceRibbon",
        "aria-label=\"Module 1 completion ribbon\"",
        "aria-label=\"Module 1 mission completion status\"",
        "export function Module1MissionWinStep",
        "export function Module1NextMissionCard",
        "<p className=\"sr-only\">Next mission:",
        "const opensCheckpoint = nextMission?.href === '/missions/module-1/checkpoint';",
        "? 'Module 1 checkpoint'",
        "{nextVisibleLine}",
        ">\n        Listen\n      </span>",
        "writeCompletedModule1Mission(currentMissionId)",
        "currentModule1MissionId?: Module1MissionId",
        "export function Module1SequenceStatus",
        "Classroom wins",
        "Four classroom survival wins before Module 2 speaking.",
        "Module 1 compact win progress",
        "Module 2 opens from the card on the right.",
        "data-testid=\"say-aloud-then-tap\"",
        "Say it aloud. Then tap it.",
    ]
    missing_module1_shared = [snippet for snippet in required_module1_shared if snippet not in mission_ui]
    if missing_module1_shared:
        fail(f"shared Module 1 sequence UI missing snippets: {missing_module1_shared}")
    if not re.search(r"function Module1SequenceRibbon[\s\S]+?return \(\n    <div className=\"sr-only\">", mission_ui):
        fail("Module 1 sequence ribbon must stay accessible-only on mission screens; visible ribbons/dots feel like dashboard clutter")
    module1_crowding = [
        "Continue sequence: {nextMission?.cta ?? 'Open Module 2'}",
        "<span className=\"hidden sm:inline\">Next: {nextMission?.title ?? 'Module 2'}</span>",
        "className=\"mt-5 inline-flex items-center gap-2 font-black text-[#f1d27a]\"",
        "{nextMission?.cta ?? 'Start Module 2 speaking'}",
    ]
    module1_crowding_hits = [snippet for snippet in module1_crowding if snippet in mission_ui]
    if module1_crowding_hits:
        fail(f"Module 1 win/ribbon reintroduced duplicate next CTA clutter: {module1_crowding_hits}")
    for page, src in mission_pages:
        page_path = page.as_posix()
        direct_scene_allowed = "module-1/greet-frau-weber" in page_path or "module-1/please-thanks" in page_path or "module-1/polite-exit" in page_path or "module-1/first-mini-conversation" in page_path or "module-2/spell-name" in page_path or "module-2/job-languages" in page_path
        module1_one_screen = "module-1/greet-frau-weber" in page_path or "module-1/please-thanks" in page_path or "module-1/polite-exit" in page_path or "module-1/first-mini-conversation" in page_path
        required_page = [
            "Module1NextMissionCard",
            "currentModule1MissionId={mission.id}",
            "useMissionStepForQA(0, missionSteps.length - 1)",
        ]
        if module1_one_screen:
            inline_win_testid = (
                "data-testid=\"greet-frau-weber-inline-win\"" if "module-1/greet-frau-weber" in page_path
                else "data-testid=\"please-thanks-inline-win\"" if "module-1/please-thanks" in page_path
                else "data-testid=\"polite-exit-inline-win\"" if "module-1/polite-exit" in page_path
                else "data-testid=\"first-mini-conversation-inline-win\""
            )
            required_page.extend([
                "writeCompletedModule1Mission",
                inline_win_testid,
                "{repairCorrect && (",
                "onContinue={() => {}}",
            ])
        else:
            required_page.extend([
                "Module1MissionWinStep",
                "<Module1MissionWinStep",
                "side={<Module1NextMissionCard currentMissionId={mission.id} />}",
            ])
        if not direct_scene_allowed:
            required_page.append("MissionIntro")
        extra_missing_page = []
        if "HearStep" not in src and "ConversationSceneStep" not in src and "ConversationRepairStep" not in src:
            extra_missing_page.append("HearStep, ConversationSceneStep, or ConversationRepairStep")
        has_speak_write = "<SpeakWriteStep" in src
        has_speak_repair = "<SpeakRepairStep" in src or "<ConversationRepairStep" in src
        has_reply_aloud = "<ReplyAloudStep" in src
        if not (has_speak_write or has_speak_repair or has_reply_aloud):
            extra_missing_page.append("<SpeakWriteStep, <SpeakRepairStep, or <ReplyAloudStep")
        if "<RepairStep" not in src and not has_speak_repair:
            extra_missing_page.append("<RepairStep")
        if not any(slug in str(page) for slug in ("module-1/greet-frau-weber", "module-1/please-thanks", "module-1/polite-exit", "module-1/first-mini-conversation")) and page != MODULE1_MISSION_PAGE and "RecognitionStep" not in src:
            extra_missing_page.append("RecognitionStep")
        if "<TinyWriteStep" in src:
            fail(f"Module 1 mission must not add a separate tiny-write chore screen: {page}")
        if "<BuilderStep" in src or "<ProductionStep" in src:
            fail(f"Module 1 mission must use immersive reply + optional anchor/repair, not builder/production chores: {page}")
        if not has_speak_repair and not has_reply_aloud and "requireTyped={false}" not in src:
            fail(f"Module 1 phone path must make tiny writing optional after audio: {page}")
        if "title=\"Say it, then type it.\"" in src:
            fail(f"Module 1 chore copy returned on immersive step: {page}")
        missing_page = [snippet for snippet in required_page if snippet not in src] + extra_missing_page
        if missing_page:
            fail(f"{page.name} missing Module 1 shared mission snippets: {missing_page}")
        if "SpeechSynthesisUtterance" in src or "speechSynthesis" in src or "new Audio(" in src:
            fail(f"Module 1 mission must not use browser/JS-only audio: {page}")
    greet_src = MODULE1_MISSION_PAGE.read_text(encoding="utf-8")
    no_typing_required = [
        "<ConversationRepairStep",
        "title=\"Morning class.\"",
        "Guten Morgen, Frau Weber. Ich lerne Deutsch.",
        "data-testid=\"greet-frau-weber-inline-win\"",
        "data-testid=\"lesson-1-mini-check-recovery-card\"",
        "practice.miniCheck.items.map",
        "practice.recoveryCards.map",
        "steps: ['Scene + repair']",
    ]
    missing_no_typing = [snippet for snippet in no_typing_required if snippet not in greet_src + data + practice_data]
    if missing_no_typing:
        fail(f"Module 1 first mission must keep the first production beat voice-first/no-typing: {missing_no_typing}")
    if "const repairCorrect = repairChoice === practice.repair.correctChoiceId" not in greet_src:
        fail("Module 1 first mission must use the shared practice repair correctChoiceId, not a hardcoded answer")
    if "module1AnswerFrauWeberPractice" not in greet_src:
        fail("Module 1 first mission must import the shared Lesson 1 practice set")
    banned_first_mission_typing = ["typedAnswer", "typedNormalized", "placeholder=\"Guten Morgen\"", "Tiny anchor", "requireTyped={false}"]
    typing_hits = [snippet for snippet in banned_first_mission_typing if snippet in greet_src]
    if typing_hits:
        fail(f"Module 1 first mission reintroduced typing chore snippets: {typing_hits}")
    lesson2_src = MODULE1_LESSON2_PRACTICE_PAGE.read_text(encoding="utf-8")
    required_lesson2_practice = [
        "module1WhyA1Practice",
        "title=\"Ich lerne Deutsch.\"",
        "audioSrc={practice.scene.audioSrc}",
        "data-testid=\"lesson-2-reason-micro-check-card\"",
        "practice.miniCheck.items.map",
        "practice.recoveryCards.map",
        "A1 exam",
        "Germany plan",
        "No resource browsing.",
        "href=\"/missions/module-1/german-sounds?start=listen\"",
        "const missionSteps = ['Line + reason']",
    ]
    missing_lesson2_practice = [snippet for snippet in required_lesson2_practice if snippet not in lesson2_src + practice_data]
    if missing_lesson2_practice:
        fail(f"Lesson 2 reason practice route missing spoon-fed micro-check snippets: {missing_lesson2_practice}")
    required_lesson2_data = [
        "module1WhyA1Practice",
        "Practice: why I am learning German",
        "/missions/module-1/why-a1",
        "/audio/hoeren/module-01/ex1-1-prod-dictation.mp3",
        "Ich lerne Deutsch.",
        "I am learning German for _____",
        "correctChoiceId: 'ich-lerne-deutsch'",
        "planning:reason_unclear",
        "planning:path_confusion",
        "Next: train German sounds",
    ]
    missing_lesson2_data = [snippet for snippet in required_lesson2_data if snippet not in practice_data]
    if missing_lesson2_data:
        fail(f"Lesson 2 reason practice data missing required snippets: {missing_lesson2_data}")
    if "SpeechSynthesisUtterance" in lesson2_src or "speechSynthesis" in lesson2_src or "new Audio(" in lesson2_src:
        fail("Lesson 2 reason practice must use real audio UI, not browser/JS-only audio")

    lesson3_src = MODULE1_LESSON3_PRACTICE_PAGE.read_text(encoding="utf-8")
    required_lesson3 = [
        "module1GermanSoundsPractice",
        "data-testid=\"lesson-3-sounds-micro-check-card\"",
        "data-testid=\"lesson-3-mini-check-items\"",
        "data-testid=\"lesson-3-recovery-cards\"",
        "practice.miniCheck.items.map",
        "practice.recoveryCards.map",
        "focusChoices",
        "audioLabel=\"Sound line\"",
        "ich · schön · Weber · Tschüss",
    ]
    missing_lesson3 = [item for item in required_lesson3 if item not in lesson3_src]
    practice_lesson3 = [
        "export const module1GermanSoundsPractice",
        "route: '/missions/module-1/german-sounds'",
        "audioSrc: '/audio/tts/v1-2-1/v1-2-1-line-3.mp3'",
        "pronunciation:ch_sch",
        "pronunciation:w_v",
        "pronunciation:umlaut",
        "nextTask: 'Next: formal greetings'",
    ]
    missing_lesson3.extend(f"practice:{item}" for item in practice_lesson3 if item not in practice_data)
    if missing_lesson3:
        fail(f"Lesson 3 German sounds practice wiring missing snippets: {missing_lesson3}")
    if "SpeechSynthesisUtterance" in lesson3_src or "speechSynthesis" in lesson3_src or "new Audio(" in lesson3_src:
        fail("Lesson 3 German sounds practice must use real audio UI, not browser/JS-only audio")

    lesson4_src = MODULE1_LESSON4_PRACTICE_PAGE.read_text(encoding="utf-8")
    required_lesson4 = [
        "module1FormalGreetingsPractice",
        "title=\"Guten Tag.\"",
        "hideTitle",
        "data-testid=\"lesson-4-formal-greetings-micro-check-card\"",
        "data-testid=\"lesson-4-mini-check-items\"",
        "data-testid=\"lesson-4-recovery-cards\"",
        "practice.miniCheck.items.map",
        "practice.recoveryCards.map",
        "teacher/office",
        "Guten Tag.",
        "href=\"/missions/module-1/please-thanks?start=listen\"",
    ]
    missing_lesson4 = [item for item in required_lesson4 if item not in lesson4_src]
    practice_lesson4 = [
        "export const module1FormalGreetingsPractice",
        "route: '/missions/module-1/formal-greetings'",
        "audioSrc: '/audio/tts/v1-3-1/v1-3-1-line-1.mp3'",
        "hoeren:greetings",
        "sprechen:formality",
        "vocab:gute_nacht_trap",
        "nextTask: 'Next: Danke + Bitte'",
    ]
    missing_lesson4.extend(f"practice:{item}" for item in practice_lesson4 if item not in practice_data)
    if missing_lesson4:
        fail(f"Lesson 4 formal greetings practice wiring missing snippets: {missing_lesson4}")
    if "SpeechSynthesisUtterance" in lesson4_src or "speechSynthesis" in lesson4_src or "new Audio(" in lesson4_src:
        fail("Lesson 4 formal greetings practice must use real audio UI, not browser/JS-only audio")

    please_src = MODULE1_MISSION_PAGES[1].read_text(encoding="utf-8")
    required_please_thanks_focus = [
        "module1PolitenessPractice",
        "title=\"Danke.\"",
        "hideTitle",
        "data-testid=\"lesson-5-politeness-micro-check-card\"",
        "data-testid=\"lesson-5-mini-check-items\"",
        "data-testid=\"lesson-5-recovery-cards\"",
        "practice.miniCheck.items.map",
        "practice.recoveryCards.map",
        "data-testid=\"please-thanks-inline-win\"",
    ]
    missing_please_thanks_focus = [snippet for snippet in required_please_thanks_focus if snippet not in please_src]
    if missing_please_thanks_focus:
        fail(f"Lesson 5 politeness practice wiring missing snippets: {missing_please_thanks_focus}")
    required_lesson5_data = [
        "export const module1PolitenessPractice",
        "route: '/missions/module-1/please-thanks'",
        "audioSrc: '/audio/tts/v1-4-1/v1-4-1-line-1.mp3'",
        "Danke. Bitte. Entschuldigung.",
        "vocab:bitte_danke_swap",
        "sprechen:request_phrase",
        "vocab:entschuldigung",
        "nextTask: 'Next: polite exit'",
    ]
    missing_lesson5_data = [snippet for snippet in required_lesson5_data if snippet not in practice_data]
    if missing_lesson5_data:
        fail(f"Lesson 5 politeness practice data missing snippets: {missing_lesson5_data}")
    if "{ id: 'gute-nacht', title: 'Gute Nacht.' }" in please_src or "Notebook help." in please_src or "Good. Danke" in please_src:
        fail("Module 1 please-thanks reintroduced extra trap/copy clutter")
    spell_name_src = MISSION_PAGES[1].read_text(encoding="utf-8")
    required_spell_name_focus = [
        "title=\"K-U-T-T-A-N.\"",
        "hideTitle",
        "speakerLine=\"Buchstabieren Sie bitte.\"",
        "data-testid=\"spell-name-inline-win\"",
    ]
    missing_spell_name_focus = [snippet for snippet in required_spell_name_focus if snippet not in spell_name_src]
    if missing_spell_name_focus:
        fail(f"Module 2 spell-name must start scene-first without duplicate visible heading: {missing_spell_name_focus}")
    polite_src = MODULE1_MISSION_PAGES[2].read_text(encoding="utf-8")
    required_polite_exit_focus = [
        "module1GoodbyeRepairPractice",
        "title=\"Auf Wiedersehen.\"",
        "hideTitle",
        "data-testid=\"lesson-6-goodbye-repair-micro-check-card\"",
        "data-testid=\"lesson-6-mini-check-items\"",
        "data-testid=\"lesson-6-recovery-cards\"",
        "practice.miniCheck.items.map",
        "practice.recoveryCards.map",
        "cta={<>Fix goodbye",
        "data-testid=\"polite-exit-inline-win\"",
    ]
    missing_polite_exit_focus = [snippet for snippet in required_polite_exit_focus if snippet not in polite_src]
    if missing_polite_exit_focus:
        fail(f"Lesson 6 goodbye/repair practice wiring missing snippets: {missing_polite_exit_focus}")
    required_lesson6_data = [
        "export const module1GoodbyeRepairPractice",
        "route: '/missions/module-1/polite-exit'",
        "audioSrc: '/audio/tts/v1-4-1/v1-4-1-line-0.mp3'",
        "Auf Wiedersehen. Tschüss.",
        "Noch einmal, bitte. Langsam, bitte.",
        "vocab:formal_casual",
        "sprechen:request_phrase",
        "vocab:phone_goodbye",
        "nextTask: 'Next: first mini-conversation'",
    ]
    missing_lesson6_data = [snippet for snippet in required_lesson6_data if snippet not in practice_data]
    if missing_lesson6_data:
        fail(f"Lesson 6 goodbye/repair practice data missing snippets: {missing_lesson6_data}")
    first_conversation_src = MODULE1_MISSION_PAGES[3].read_text(encoding="utf-8")
    required_first_conversation_focus = [
        "module1FirstConversationPractice",
        "title=\"Guten Tag.\"",
        "hideTitle",
        "data-testid=\"lesson-7-first-conversation-micro-check-card\"",
        "data-testid=\"lesson-7-mini-check-items\"",
        "data-testid=\"lesson-7-recovery-cards\"",
        "practice.miniCheck.items.map",
        "practice.recoveryCards.map",
        "cta={<>Fix mini-conversation",
        "data-testid=\"first-mini-conversation-inline-win\"",
    ]
    missing_first_conversation_focus = [snippet for snippet in required_first_conversation_focus if snippet not in first_conversation_src]
    if missing_first_conversation_focus:
        fail(f"Lesson 7 first mini-conversation practice wiring missing snippets: {missing_first_conversation_focus}")
    required_lesson7_data = [
        "export const module1FirstConversationPractice",
        "route: '/missions/module-1/first-mini-conversation'",
        "audioSrc: '/audio/tts/v1-3-1/v1-3-1-line-3.mp3'",
        "Guten Tag, Frau Weber. Gut, danke.",
        "Noch einmal, bitte. Auf Wiedersehen.",
        "sprechen:question_answer",
        "sprechen:request_phrase",
        "vocab:goodbye_set",
        "nextTask: 'Module 1 checkpoint'",
    ]
    missing_lesson7_data = [snippet for snippet in required_lesson7_data if snippet not in practice_data]
    if missing_lesson7_data:
        fail(f"Lesson 7 first mini-conversation practice data missing snippets: {missing_lesson7_data}")
    if "SpeechSynthesisUtterance" in first_conversation_src or "speechSynthesis" in first_conversation_src or "new Audio(" in first_conversation_src:
        fail("Lesson 7 first mini-conversation practice must use real audio UI, not browser/JS-only audio")
    checkpoint_required = [
        "module1CheckpointSections",
        "scoreModule1Checkpoint",
        "MODULE1_CHECKPOINT_RESULT_STORAGE_KEY",
        "module-1-scored-checkpoint",
        "module-1-checkpoint-score",
        "module-1-checkpoint-result",
        "module-1-checkpoint-recovery-cards",
        "No Google, no YouTube, no ChatGPT, no dictionary, no notes.",
        "Start Module 2",
        "Redo Module 1 recovery",
    ]
    missing_checkpoint_page = [snippet for snippet in checkpoint_required if snippet not in checkpoint_page]
    if missing_checkpoint_page:
        fail(f"Module 1 scored checkpoint page missing snippets: {missing_checkpoint_page}")
    checkpoint_data_required = [
        "export const module1CheckpointSections",
        "export const module1CheckpointRecoveryCards",
        "export function scoreModule1Checkpoint",
        "hoeren:greetings",
        "sprechen:greeting_reply",
        "schreiben:first_sentence",
        "vocab:deutsch_vs_deutschland",
        "percent < 60 || hoerenFailed || !passed.has('sprechen-three-chunks')",
        "Start Module 2 self-introduction.",
    ]
    missing_checkpoint_data = [snippet for snippet in checkpoint_data_required if snippet not in checkpoint_data]
    if missing_checkpoint_data:
        fail(f"Module 1 scored checkpoint data missing snippets: {missing_checkpoint_data}")
    if "SpeechSynthesisUtterance" in checkpoint_page or "speechSynthesis" in checkpoint_page or "new Audio(" in checkpoint_page:
        fail("Module 1 scored checkpoint must not use browser/JS-only audio")
    if "Gute Nacht." in polite_src or "Bedtime trap" in polite_src or "goodbye mistake" in polite_src or "Correct. Formal goodbye" in polite_src:
        fail("Module 1 polite-exit reintroduced extra trap/copy clutter")
    print("module1_mission_sequence_path=ok")


def assert_m1_m2_optional_anchors_are_not_gates() -> None:
    pages = MODULE1_MISSION_PAGES + MISSION_PAGES
    for page in pages:
        src = page.read_text(encoding="utf-8")
        voice_first_no_type = "<SpeakRepairStep" in src or "<ConversationRepairStep" in src or "<ReplyAloudStep" in src or "data-typing-required=\"false\"" in src
        optional_tiny_write = "requireTyped={false}" in src
        if not (voice_first_no_type or optional_tiny_write):
            fail(f"M1/M2 production step must be voice-first: optional tiny writing or no typing gate: {page}")
        if "title=\"Say it, then type it.\"" in src:
            fail(f"M1/M2 production step reintroduced chore copy: {page}")
        if not voice_first_no_type and "Optional" not in src:
            fail(f"M1/M2 production step should label the written anchor as optional: {page}")
    browser_guard = ROOT / "scripts/qa_module2_production_mobile.mjs"
    guard_src = browser_guard.read_text(encoding="utf-8")
    required_guard = [
        "phone-first path must make tiny writing optional after audio, not a gate",
        "data-typing-required",
        "phone path still gates progression on typing after audio",
        "repair choices must not be visible/clickable before audio finishes",
        "data-pre-audio-buttons",
        "repairButtonsBeforeAudio",
        "afterAudioBeforeTyping",
    ]
    missing_guard = [snippet for snippet in required_guard if snippet not in guard_src]
    if missing_guard:
        fail(f"browser guard must prove optional anchors are not typing gates: {missing_guard}")
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    required_post_correct_collapse = [
        "collapseOnCorrect?: boolean",
        "const showOptions = !(collapseOnCorrect && isCorrect)",
        "data-options-collapsed={showOptions ? 'false' : 'true'}",
        "collapseOnCorrect",
    ]
    missing_collapse = [snippet for snippet in required_post_correct_collapse if snippet not in mission_ui]
    if missing_collapse:
        fail(f"post-correct repair choices must collapse so one-screen missions do not keep stale buttons visible: {missing_collapse}")
    print(f"m1_m2_optional_anchor_gate=ok pages={len(pages)} post_correct_choices=collapsed")


def assert_repair_ctas_sound_human() -> None:
    """Keep the post-speaking CTA from sounding like an agent/debug workflow."""
    banned_cta_copy = [
        "Repair the trap",
        "Repair common mistake",
        "Repair the article trap",
        "Repair the final trap",
    ]
    required_fix_ctas = [
        "Fix greeting mistake",
        "Fix Danke/Bitte",
        "Fix goodbye",
        "Fix mini-conversation",
        "Fix ich komme",
        "Fix letters",
        "Fix aus/in",
        "Fix job article",
        "Fix final mistake",
    ]
    sources = "\n".join(page.read_text(encoding="utf-8") for page in MODULE1_MISSION_PAGES + MISSION_PAGES)
    hits = [snippet for snippet in banned_cta_copy if snippet in sources]
    if hits:
        fail(f"repair CTA reintroduced chore wording: {hits}")
    missing = [snippet for snippet in required_fix_ctas if snippet not in sources]
    if missing:
        fail(f"repair CTA lost specific human wording: {missing}")
    print("repair_ctas=specific_fix_copy")


def assert_hear_steps_are_one_tap_scene() -> None:
    """First-path listening must be a visible two-person scene, not an audio card."""
    pages = MISSION_PAGES + MODULE1_MISSION_PAGES
    old_chore_copy = [
        "Play the clips",
        "First the examiner, then",
        "Try this reply",
        "Reply model",
        "model answer",
        "Full model answer",
        "Polite words",
    ]
    for page in pages:
        src = page.read_text(encoding="utf-8")
        scene_match = re.search(r"<Conversation(?:Scene|Repair)Step(?P<block>.*?)\n\s*/>", src, re.S)
        if "<HearStep" in src:
            fail(f"first-path mission still uses an audio-card HearStep instead of a two-person scene: {page}")
        if scene_match is None:
            fail(f"mission page missing ConversationSceneStep/ConversationRepairStep: {page}")
        block = scene_match.group("block")
        required_scene = ["speakerName=", "speakerLine=", "learnerLine=", "audioSrc=", "data-step-kind=\"conversation-scene\""]
        mission_ui = MISSION_UI.read_text(encoding="utf-8")
        missing_scene = [snippet for snippet in required_scene if snippet not in block + mission_ui]
        if missing_scene:
            fail(f"ConversationSceneStep missing two-person scene/source guards in {page.name}: {missing_scene}")
        is_conversation_repair = "<ConversationRepairStep" in scene_match.group(0)
        if "autoContinueOnFinish" not in block and not is_conversation_repair:
            fail(f"Listening scene should auto-advance after audio in {page.name}, not ask for another tap")
        hits = [snippet for snippet in old_chore_copy if snippet in block]
        if hits:
            fail(f"Listening scene reintroduced multi-clip/chore copy in {page.name}: {hits}")
    print(f"one_tap_scene_steps={len(pages)}")


def assert_mission_mobile_controls() -> None:
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    required_shared = [
        "fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2",
        "w-[min(calc(100%-1rem),42rem)] -translate-x-1/2",
        "bg-[#102018]/88 p-2 shadow-xl",
        "const [portalActions, setPortalActions] = useState(false)",
        "window.matchMedia('(max-width: 1023px)')",
        "const inlineRowClass = 'mt-7 flex flex-wrap items-center gap-3'",
        "const portalRowClass = 'fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))]",
        "return portalActions ? createPortal(row, document.body) : row;",
        "backdrop-blur-md sm:flex sm:flex-wrap sm:items-center sm:justify-center",
        "export function SecondaryLink",
        "export function RepairChoiceButton",
        "export type ChoiceOption",
        "export function ChoiceStep",
        "export function RepairStep",
        "bridgeNote?: React.ReactNode",
        "<ShieldCheck className=\"mb-4 h-11 w-11 text-[#f1d27a]\" />",
        "export function HearStep",
        "export function ConversationSceneStep",
        "export function ConversationRepairStep",
        "sceneVisualVariant?: SceneVisualVariant",
        "variant={sceneVisualVariant}",
        "data-testid=\"conversation-scene-step\"",
        "data-step-kind=\"conversation-scene\"",
        "speakerLine: string",
        "learnerLine: string",
        "sceneLabel = 'Goethe Kochi mock'",
        "sceneLabel?: string",
        "audios: Array<{ src: string; label: string; turnCue?: string }>",
        "lg:col-span-2 lg:mt-1",
        "space-y-3 rounded-[1.55rem] border border-white/12 bg-black/18 p-3",
        "compact\n          />",
        "export function RecognitionStep",
        "<ActionRow className=\"lg:col-span-2\">",
        "export function SpeakWriteStep",
        "export function MissionWinStep",
        "export function Module1MissionWinStep",
        "Replay mission",
        "const [modelAudioFinished, setModelAudioFinished] = useState(false)",
        "onEnded={() => setModelAudioFinished(true)}",
        "data-testid=\"speak-write-step\"",
        "data-testid=\"immersive-reply-step\"",
        "data-testid=\"immersive-model-line\"",
        "data-testid=\"speak-write-prompt\"",
        "data-testid=\"tiny-write-step\"",
        "data-testid=\"tiny-write-input\"",
        "data-testid=\"optional-anchor-note\"",
        "data-model-audio-finished={modelAudioFinished ? 'true' : 'false'}",
        "data-typing-locked={modelAudioFinished ? 'false' : 'true'}",
        "placeholder={modelAudioFinished ? placeholder : 'Listen first…'}",
        "disabled={!modelAudioFinished}",
        "const primaryDisabled = !modelAudioFinished || (requireTyped && continueDisabled)",
        "turnCue = 'Your turn.'",
        "requireTyped = true",
        "Optional. Speak first.",
        "side?: React.ReactNode",
        "lg:grid-cols-[0.85fr_1fr]",
        "lg:items-start",
        "data-testid=\"recognition-scene-audio\"",
        "wrongFeedback",
        "correctFeedback",
        "value && !isCorrect",
        "w-full min-h-16 rounded-2xl border p-4 text-left transition",
        "pointer-events-none fixed inset-0 overflow-hidden",
        "export function useMissionStepForQA",
        "params.get('adipoliQa') !== '1'",
        "window.location.hostname.startsWith('100.96.')",
    ]
    missing_shared = [snippet for snippet in required_shared if snippet not in mission_ui]
    if missing_shared:
        fail(f"shared mobile action controls missing snippets: {missing_shared}")

    m1_scene_sources = {
        "greet-frau-weber": (ROOT / "src/app/missions/module-1/greet-frau-weber/page.tsx").read_text(encoding="utf-8"),
        "please-thanks": (ROOT / "src/app/missions/module-1/please-thanks/page.tsx").read_text(encoding="utf-8"),
        "polite-exit": (ROOT / "src/app/missions/module-1/polite-exit/page.tsx").read_text(encoding="utf-8"),
    }
    missing_m1_scene_labels = [name for name, src in m1_scene_sources.items() if 'sceneLabel="Kerala classroom"' not in src]
    if missing_m1_scene_labels:
        fail(f"Module 1 conversation scenes must label the Kerala classroom, not hard-code Goethe mock: {missing_m1_scene_labels}")
    missing_m1_scene_visuals = [name for name, src in m1_scene_sources.items() if 'sceneVisualVariant="ai-study"' not in src]
    if missing_m1_scene_visuals:
        fail(f"Module 1 conversation scenes must keep the route-scoped AI study visual inside the scene: {missing_m1_scene_visuals}")
    please_thanks_src = m1_scene_sources["please-thanks"]
    if "Danke after help. Bitte replies when someone thanks you." in please_thanks_src:
        fail("please-thanks correct feedback is too explanatory for the one-screen scene; keep it short")
    for required_short in ["wrongFeedback: 'After help, say Danke.", "correctFeedback: 'Correct. After help: Danke.'"]:
        if required_short not in MODULE1_PRACTICE_DATA.read_text(encoding="utf-8"):
            fail(f"please-thanks shared practice data lost concise repair copy: {required_short}")

    old_inline_patterns = [
        "mt-7 flex flex-wrap gap-3",
        "mt-8 flex flex-wrap gap-3",
        "mt-5 flex flex-wrap gap-3",
        "mt-7 grid gap-3 sm:flex sm:flex-wrap",
        "mt-8 grid gap-3 sm:flex sm:flex-wrap",
        "<div className=\"mt-8\"><PrimaryButton onClick={onContinue} disabled={continueDisabled}>{cta}</PrimaryButton></div>",
        "inline-flex min-h-14 items-center gap-2 rounded-2xl px-5 py-4 font-black transition",
        "inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-5 py-4 font-black transition",
        "inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-black transition sm:w-auto",
        "rounded-2xl border border-white/12 bg-white/[0.07] px-5 py-3 text-lg font-black",
        "rounded-2xl bg-white/10 px-4 py-3 font-bold text-white/70",
        "rounded-2xl bg-white/8 px-4 py-3 text-white/55",
        "rounded-2xl border p-4 text-left transition', repairChoice",
        "rounded-2xl border p-4 text-left text-lg font-black transition",
        "w-full rounded-2xl border p-4 text-left transition",
    ]
    retired_chore_patterns = [
        "<BuilderStep",
        "<ProductionStep",
        "<BuilderWordBank",
        "<BuilderWordButton",
        "<BuilderSupportRow",
        "<BuilderResetButton",
        "<BuilderFeedback",
        "isBuilderChipUsed(",
        "canAddBuilderChip(",
        "const isChipUsed",
        "const isLetterChipUsed",
        "selectedCount >= occurrence",
        "module2-production-textarea",
        "Said it",
    ]
    pages_missing_shared = []
    pages_with_old_inline = []
    for page in MISSION_PAGES:
        src = page.read_text(encoding="utf-8")
        if page in (SPELL_NAME_PAGE, FROM_KERALA_PAGE):
            inline_testid = 'spell-name-inline-win' if page == SPELL_NAME_PAGE else 'from-kerala-inline-win'
            if f'data-testid="{inline_testid}"' not in src or "writeCompletedModule2Mission" not in src:
                pages_missing_shared.append(f"{page.name}:inline win/completion")
        elif "<MissionWinStep" not in src and "<Module1MissionWinStep" not in src:
            pages_missing_shared.append(f"{page.name}:mission win step")
        has_conversation_repair = "<ConversationRepairStep" in src
        if "<HearStep" not in src and "<ConversationSceneStep" not in src and not has_conversation_repair:
            pages_missing_shared.append(f"{page.name}:<HearStep, <ConversationSceneStep, or <ConversationRepairStep")
        has_speak_write = "<SpeakWriteStep" in src
        has_speak_repair = "<SpeakRepairStep" in src or has_conversation_repair
        if not (has_speak_write or has_speak_repair):
            pages_missing_shared.append(f"{page.name}:<SpeakWriteStep, <SpeakRepairStep, or <ConversationRepairStep")
        if "<RepairStep" not in src and not has_speak_repair:
            pages_missing_shared.append(f"{page.name}:<RepairStep")
        if "<ChoiceStep" in src:
            pages_with_old_inline.append(f"{page.name}:direct ChoiceStep")
        if "<RecognitionStep" not in src and not has_conversation_repair:
            pages_missing_shared.append(f"{page.name}:<RecognitionStep")
        if "useMissionStepForQA(0, missionSteps.length - 1)" not in src:
            pages_missing_shared.append(f"{page.name}:useMissionStepForQA")
        if "<RepairChoiceButton" in src:
            pages_with_old_inline.append(f"{page.name}:direct RepairChoiceButton")
        retired_hits = [snippet for snippet in retired_chore_patterns if snippet in src]
        if retired_hits:
            pages_with_old_inline.append(f"{page.name}:retired chore primitives {retired_hits}")
        hits = [pattern for pattern in old_inline_patterns if pattern in src]
        if hits:
            pages_with_old_inline.append(f"{page.name}:{hits}")
    if pages_missing_shared:
        fail(f"mission pages not using shared mobile-safe action primitives: {pages_missing_shared}")
    if pages_with_old_inline:
        fail(f"mission pages reintroduced old inline/crowded action classes: {pages_with_old_inline}")
    if "I heard it" in mission_ui or "disabled={!hasFinishedRequiredAudio}" in mission_ui:
        fail("HearStep reintroduced redundant post-audio confirmation; audio finish should unlock the primary CTA directly")
    print(f"mobile_action_controls=shared_voice_first all_missions={len(MISSION_PAGES)}")


def assert_sequence_status_uses_completion_storage() -> None:
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    if "const done = index <= currentIndex;" in mission_ui:
        fail("mission win sequence status must not mark earlier missions done just because the learner jumped ahead")
    required_storage_status = [
        "const [completedMissionIds, setCompletedMissionIds] = useState<Module1MissionId[]>([])",
        "const [completedMissionIds, setCompletedMissionIds] = useState<Module2MissionId[]>([])",
        "window.addEventListener('module1-mission-completed', refreshCompletedMissions)",
        "window.addEventListener('module2-mission-completed', refreshCompletedMissions)",
        "const completedMissionSet = new Set(completedMissionIds)",
        "const visibleCompletedCount = Math.min(",
        "const storedDone = completedMissionSet.has(mission.id);",
        "const done = storedDone || active;",
        "const status = active ? 'current win' : storedDone ? 'completed' : 'not done';",
        "{visibleCompletedCount}/{module1MissionCards.length} done",
        "{visibleCompletedCount}/5 done",
        "aria-label={`${mission.missionNumber}: ${mission.output} — ${status}`}",
        "(active || storedDone)",
    ]
    missing_storage_status = [snippet for snippet in required_storage_status if snippet not in mission_ui]
    if missing_storage_status:
        fail(f"mission win sequence status missing completion-storage snippets: {missing_storage_status}")
    print("sequence_status_completion_storage=ok")


def assert_m1_m2_video_basis_adult_safe() -> None:
    """Keep M1/M2 video source aligned with the mission-first adult product direction."""
    banned_snippets = [
        "Machaane!",
        "Machane!",
        "you'll face your first day",
        "Airport immigration",
        "meeting your housemate",
        "your roommate",
        "Flughafen, Café, WG",
        "Ich heiße Kuttan",
        "K-U-T-T-A-N",
        "Kidu impression",
        "Malayali pride auf Deutsch",
        "English brain — rewire",
        "Ich bin glucklich",
    ]
    required_snippets = {
        ROOT / "scripts/m1-video-defs.json": [
            "Mission one: greet Frau Weber politely",
            "Dress rehearsal in Kerala: Goethe desk",
            "Guten Tag, Frau Weber.",
        ],
        ROOT / "scripts/m2-video-defs.json": [
            "Mission start: tell the examiner your name",
            "Ich heiße Arun.",
            "Four lines, no drama.",
        ],
    }
    hits = []
    for path in VIDEO_BASIS_FILES:
        if not path.exists():
            fail(f"M1/M2 video basis file missing: {path}")
        src = path.read_text(encoding="utf-8")
        hits.extend(f"{path.relative_to(ROOT)}:{snippet}" for snippet in banned_snippets if snippet in src)
    if hits:
        fail(f"M1/M2 video basis still has childish or A1-canon-risk wording: {hits}")
    missing_required = []
    for path, snippets in required_snippets.items():
        src = path.read_text(encoding="utf-8")
        missing_required.extend(f"{path.relative_to(ROOT)}:{snippet}" for snippet in snippets if snippet not in src)
    if missing_required:
        fail(f"M1/M2 video basis lost mission-aligned adult wording: {missing_required}")
    print(f"m1_m2_video_basis_adult_safe={len(VIDEO_BASIS_FILES)}")


def assert_module2_legacy_scenes_stay_kerala_rehearsal() -> None:
    """Prevent old Module 2 lesson pages from drifting back into physical-Germany fantasy scenes."""
    src = MODULE2_CONTENT.read_text(encoding="utf-8")
    banned_scene_snippets = [
        "Zum goldenen Hirschen (Kneipe), Berlin",
        "International Stammtisch",
        "WG interview",
        "TU Berlin Mensa",
        "Mensa (Cafeteria)",
        "Mauerpark, Berlin",
        "Mauerpark-il Sunday park vibes",
        "Scenario 1 — Airport Arrival in Frankfurt",
        "Scenario 2 — University Orientation in Munich",
        "Scenario 3 — First Day at Office in Berlin",
        "University / WG",
    ]
    required_rehearsal_snippets = [
        "Goethe-Institut Kochi — Origin Drill",
        "Goethe-Institut Kochi — Beruf Role-Play",
        "Goethe-Institut Kochi — Language Circle",
        "Scenario — Goethe Kochi speaking mock",
        "Future-use rehearsal: the same intro later helps at airports, universities, and offices — but today the scene stays in Kerala.",
    ]
    hits = [snippet for snippet in banned_scene_snippets if snippet in src]
    if hits:
        fail(f"Module 2 legacy lessons reintroduced physical-Germany setting drift: {hits}")
    missing = [snippet for snippet in required_rehearsal_snippets if snippet not in src]
    if missing:
        fail(f"Module 2 legacy lessons lost Kerala/Goethe rehearsal framing: {missing}")
    print("module2_legacy_scenes_kerala_rehearsal=pass")


def assert_intro_start_path_browser_guard() -> None:
    script = ROOT / "scripts/qa_intro_start_path.mjs"
    if not script.exists():
        fail(f"intro start-path browser QA guard missing: {script}")
    src = script.read_text(encoding="utf-8")
    required = [
        "German for Malayalis.",
        "Goethe A1 with Kerala context and real German audio.",
        "Guten Morgen, Frau Weber.",
        "Meet the course and learning path",
        "Your first German moment.",
        "buttons.length === 1",
        "toLowerCase().includes('begin lesson 1')",
        "toLowerCase().includes('start listening')",
        "window.location.pathname === '/missions/module-1/greet-frau-weber'",
        "/missions/module-1/greet-frau-weber",
        "Module 1 landing should lead with the spoken scene line",
        "Module 1 landing should use the adult-safe AI study visual as scene support, not the abstract placeholder",
        "Module 1 landing primary CTA should jump straight to listening",
        "Open a classroom moment.",
        "Next output",
        "Three short classroom wins",
        "PASS: intro start-path browser QA (/ → first mission, /intro → mission, /learn/1 → listening, /learn/2 fresh+partial+origin → listening)",
    ]
    missing = [snippet for snippet in required if snippet not in src]
    if missing:
        fail(f"intro start-path browser QA guard missing snippets: {missing}")
    try:
        result = subprocess.run(
            ["node", str(script)],
            cwd=ROOT,
            check=False,
            capture_output=True,
            text=True,
            timeout=95,
        )
    except Exception as exc:  # noqa: BLE001
        fail(f"intro start-path browser QA guard could not run: {exc!r}")
        return
    if result.returncode != 0:
        fail(
            "intro start-path browser QA guard failed:\n"
            f"STDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}"
        )
    print(result.stdout.strip())


def assert_direct_final_sequence_status_browser_guard() -> None:
    script = ROOT / "scripts/qa_direct_final_sequence_status.mjs"
    if not script.exists():
        fail(f"direct-final browser QA guard missing: {script}")
    try:
        result = subprocess.run(
            ["node", str(script)],
            cwd=ROOT,
            check=False,
            capture_output=True,
            text=True,
            timeout=95,
        )
    except Exception as exc:  # noqa: BLE001
        fail(f"direct-final browser QA guard could not run: {exc!r}")
        return
    if result.returncode != 0:
        fail(
            "direct-final browser QA guard failed:\n"
            f"STDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}"
        )
    print(result.stdout.strip())


def assert_completed_ability_landings_browser_guard() -> None:
    script = ROOT / "scripts/qa_completed_ability_landings.mjs"
    if not script.exists():
        fail(f"completed ability landing browser QA guard missing: {script}")
    src = script.read_text(encoding="utf-8")
    required = [
        "Wie heißen Sie?",
        "Examiner speaks. You answer.",
        "Module 1 completed bridge should not show a lower certificate card",
        "Module 1 completed hero CTA should start Module 2 directly at listening",
        "Ich heiße ...",
        "Replay goodbye",
        "Now handle numbers.",
        "Price or phone number. Listen first.",
        "0–20, prices, phone numbers",
        "Module 2 completed bridge should not show a lower certificate card",
        "Module 2 completed hero CTA should start Module 3 directly",
        "Start Module 3 numbers",
        "Replay answer",
        "!state.text.includes('YOUR PATH')",
        "!state.text.includes('See your path')",
        "!state.text.includes('3 steps')",
        "!state.text.includes('Exam answers')",
        "PASS: completed ability landing QA",
    ]
    missing = [snippet for snippet in required if snippet not in src]
    if missing:
        fail(f"completed ability landing browser QA guard missing snippets: {missing}")
    for base in BASE_URLS:
        env = os.environ.copy()
        env["ADIPOLI_BASE_URL"] = base
        try:
            result = subprocess.run(
                ["node", str(script)],
                cwd=ROOT,
                check=False,
                capture_output=True,
                text=True,
                timeout=70,
                env=env,
            )
        except Exception as exc:  # noqa: BLE001
            fail(f"completed ability landing browser QA guard could not run for {base}: {exc!r}")
            return
        if result.returncode != 0:
            fail(
                f"completed ability landing browser QA guard failed for {base}:\n"
                f"STDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}"
            )
        print(result.stdout.strip())


def assert_m1_m2_builder_browser_guard() -> None:
    script = ROOT / "scripts/qa_module2_production_mobile.mjs"
    if not script.exists():
        fail(f"M1/M2 immersive browser QA guard missing: {script}")
    src = script.read_text(encoding="utf-8")
    required = [
        "const immersiveMissions = [",
        "'/missions/module-1/greet-frau-weber'",
        "'/missions/module-2/self-intro'",
        "'/missions/module-2/final-self-intro'",
        "data-testid=\"immersive-reply-step\"",
        "data-testid=\"speak-write-step\"",
        "data-testid=\"tiny-write-step\"",
        "data-optional-anchor-hidden={!requireTyped && !modelAudioFinished ? 'true' : 'false'}",
        "className={clsx(!requireTyped && !modelAudioFinished && 'sr-only')}",
        "data-testid=\"tiny-write-input\"",
        "async function inspectImmersiveStep",
        "modelLineHidden",
        "data-model-line-hidden={modelAudioFinished ? 'false' : 'true'}",
        "modelAudioFinished ? 'opacity-100' : 'sr-only'",
        "immersive reply not audio-first/text-hidden before audio finish",
        "immersive_reply_tiny_write[${name}]=PASS",
        "M1/M2 immersive mobile QA",
        "'/missions/module-1/please-thanks'",
        "'/missions/module-1/polite-exit'",
        "async function clearBrowserAppState",
        "async function withQaPage",
        "navigator.serviceWorker.getRegistrations",
        "caches.delete(key)",
        "window.sessionStorage.clear()",
        "route:${name}",
        "immersive:${name}",
    ]
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    missing = [snippet for snippet in required if snippet not in src and snippet not in mission_ui]
    if missing:
        fail(f"M1/M2 immersive browser QA guard missing snippets: {missing}")
    env = os.environ.copy()
    env["ADIPOLI_QA_BASE_URL"] = BASE_URLS[0]
    try:
        result = subprocess.run(
            ["node", str(script)],
            cwd=ROOT,
            check=False,
            capture_output=True,
            text=True,
            timeout=130,
            env=env,
        )
    except Exception as exc:  # noqa: BLE001
        fail(f"M1/M2 immersive browser QA guard could not run: {exc!r}")
        return
    if result.returncode != 0:
        fail(
            "M1/M2 immersive browser QA guard failed:\n"
            f"STDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}"
        )
    print(result.stdout.strip())


def assert_gold_slice_first_journey_browser_guard() -> None:
    script = ROOT / "scripts/qa_gold_slice_first_journey.mjs"
    if not script.exists():
        fail(f"gold-slice first-journey browser QA guard missing: {script}")
    src = script.read_text(encoding="utf-8")
    required = [
        "Your first German moment.",
        "Meet Frau Weber, hear a real classroom greeting",
        "Begin lesson 1",
        "Morning class.",
        "playAllVisibleAudio",
        "modelLineHidden",
        "first mission should be one-screen voice-first and hide repair choices until model audio finishes",
        "Guten Morgen, Frau Weber. Ich lerne Deutsch.",
        "first mission repair must stay no-typing after audio",
        "First class win.",
        "Handle thank-you politely",
        "adipoli:module1:completedMissions",
    ]
    missing = [snippet for snippet in required if snippet not in src]
    if missing:
        fail(f"gold-slice first-journey browser QA guard missing snippets: {missing}")
    for base in BASE_URLS:
        env = os.environ.copy()
        env["ADIPOLI_BASE_URL"] = base
        try:
            result = subprocess.run(
                ["node", str(script)],
                cwd=ROOT,
                check=False,
                capture_output=True,
                text=True,
                timeout=90,
                env=env,
            )
        except Exception as exc:  # noqa: BLE001
            fail(f"gold-slice first-journey browser QA guard could not run for {base}: {exc!r}")
            return
        if result.returncode != 0:
            fail(
                f"gold-slice first-journey browser QA guard failed for {base}:\n"
                f"STDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}"
            )
        print(result.stdout.strip())


def assert_mission_motion_respects_preferences() -> None:
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    required = [
        "import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';",
        "const shouldReduceMotion = useReducedMotion();",
        "transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}",
        "initial={false}",
        "animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}",
        "exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}",
        "transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }}",
    ]
    missing = [snippet for snippet in required if snippet not in mission_ui]
    if missing:
        fail(f"mission motion must honor prefers-reduced-motion: {missing}")
    print("mission_motion=reduced_motion_safe")


def assert_no_retired_chore_components() -> None:
    mission_ui = MISSION_UI.read_text(encoding="utf-8")
    retired_snippets = [
        "export function BuilderStep",
        "export function BuilderWordBank",
        "export function BuilderWordButton",
        "export function BuilderResetButton",
        "data-testid=\"builder-chip\"",
        "data-testid=\"builder-slots\"",
        "data-testid=\"builder-built-sentence\"",
        "Sentence builder:",
        "Undo",
        "Clear",
        "export function ProductionStep",
        "data-testid=\"module2-production-step\"",
        "module2-production-textarea",
        "Said it",
    ]
    hits = [snippet for snippet in retired_snippets if snippet in mission_ui]
    if hits:
        fail(f"retired builder/production chore components still present in shared mission UI: {hits}")
    print("retired_chore_components=absent")


def assert_spell_name_is_voice_first_merged_repair() -> None:
    spell_name = SPELL_NAME_PAGE.read_text(encoding="utf-8")
    mission_data = MISSION_DATA.read_text(encoding="utf-8")
    required = [
        "ConversationRepairStep",
        "title=\"K-U-T-T-A-N.\"",
        "speakerLine=\"Buchstabieren Sie bitte.\"",
        "learnerLine=\"K-U-T-T-A-N.\"",
        "audioSrc={audioSources.kuttanModel}",
        "turnCue=\"Now spell.\"",
        "data-testid=\"spell-name-inline-win\"",
        "writeCompletedModule2Mission",
        "steps: ['Scene + repair']",
        "proof: 'audio • spell aloud • quick repair'",
    ]
    missing = [snippet for snippet in required if snippet not in spell_name + mission_data]
    if missing:
        fail(f"spell-name mission must keep one-screen voice-first repair path: {missing}")
    retired_spell_snippets = [
        "SpeakWriteStep",
        "<RepairStep",
        "typedLetters",
        "typedStrong",
        "inputId=\"typed-spelling\"",
        "Optional spelling anchor",
        "<RecognitionStep",
        "MissionIntro",
        "MissionWinStep",
        "useSearchParams",
        "ChevronLeft",
        "What does she want?",
        "Catch instruction",
        "const [meaning",
        "case 4:\n        return repairCorrect;",
        "{step === 1 && (",
        "{step === 2 && (",
        "{step === 5 && (",
        "subtitle: 'English letter names.'",
        "subtitle: 'German letter names.'",
        "Correct. Slow German letters win.",
        "That is the common mistake.",
        "Fix letter names",
    ]
    hits = [snippet for snippet in retired_spell_snippets if snippet in spell_name]
    if hits:
        fail(f"spell-name reintroduced separate intro/win/typing chore path: {hits}")
    print("spell_name_voice_first=one_screen_inline_win")


def assert_from_kerala_is_voice_first_merged_repair() -> None:
    from_kerala = (ROOT / "src/app/missions/module-2/from-kerala/page.tsx").read_text(encoding="utf-8")
    mission_data = MISSION_DATA.read_text(encoding="utf-8")
    required = [
        "ConversationRepairStep",
        "title=\"Woher kommen Sie?\"",
        "hideTitle",
        "speakerLine=\"Woher kommen Sie?\"",
        "learnerLine=\"Ich komme aus Kerala. Ich wohne in Kochi.\"",
        "audioSrc={audioSources.modelKerala}",
        "turnCue=\"Now answer.\"",
        "{step === 0 && (",
        "data-testid=\"from-kerala-inline-win\"",
        "steps: ['Scene + repair']",
        "proof: 'audio • answer aloud • quick repair'",
    ]
    missing = [snippet for snippet in required if snippet not in from_kerala + mission_data]
    if missing:
        fail(f"from-kerala mission must keep one-screen no-typing origin repair path: {missing}")
    retired = [
        "SpeakWriteStep",
        "<RepairStep",
        "<RecognitionStep",
        "<ConversationSceneStep",
        "typedAnswer",
        "typedNormalized",
        "typedStrong",
        "inputId=\"typed-origin\"",
        "Optional origin anchor",
        "What is she asking?",
        "Catch meaning",
        "const [meaning",
        "const [heard",
        "case 4:\n        return repairCorrect;",
        "Speak + write",
        "{step === 5 && (",
    ]
    hits = [snippet for snippet in retired if snippet in from_kerala]
    if hits:
        fail(f"from-kerala reintroduced separate scene/recognition/typing chore path: {hits}")
    print("from_kerala_voice_first=one_screen_conversation_repair")


def assert_job_languages_is_voice_first_merged_repair() -> None:
    job_languages = JOB_LANGUAGES_PAGE.read_text(encoding="utf-8")
    mission_data = MISSION_DATA.read_text(encoding="utf-8")
    required = [
        "ConversationRepairStep",
        "title=\"Job + languages.\"",
        "speakerLine=\"Was sind Sie von Beruf? Welche Sprachen sprechen Sie?\"",
        "learnerLine=\"Ich bin Student und spreche Malayalam und Englisch.\"",
        "audioSrc={audioSources.modelLanguages}",
        "turnCue=\"Now answer.\"",
        "{step === 1 && (",
        "steps: ['Scene + repair', 'Win']",
        "proof: 'audio • answer aloud • quick repair'",
    ]
    missing = [snippet for snippet in required if snippet not in job_languages + mission_data]
    if missing:
        fail(f"job-languages mission must keep direct no-typing profile repair path: {missing}")
    retired = [
        "MissionIntro",
        "SpeakWriteStep",
        "<RepairStep",
        "<RecognitionStep",
        "<ConversationSceneStep",
        "typedAnswer",
        "typedNormalized",
        "typedStrong",
        "inputId=\"typed-profile\"",
        "Optional profile anchor",
        "What does she want now?",
        "Catch meaning",
        "const [meaning",
        "const [heard",
        "case 4:\n        return repairCorrect;",
        "Speak + write",
        "Start profile mission",
        "{step === 5 && (",
    ]
    hits = [snippet for snippet in retired if snippet in job_languages]
    if hits:
        fail(f"job-languages reintroduced separate scene/recognition/typing chore path: {hits}")
    print("job_languages_voice_first=direct_conversation_repair")


def assert_final_self_intro_is_voice_first_merged_repair() -> None:
    final_self_intro = FINAL_SELF_INTRO_PAGE.read_text(encoding="utf-8")
    mission_data = MISSION_DATA.read_text(encoding="utf-8")
    required = [
        "SpeakRepairStep",
        "title=\"Say the full intro.\"",
        "prompt=\"Hear it once. Say your version. Then fix the one exam trap.\"",
        "audioSrc={audioSources.modelFull}",
        "turnCue=\"Your turn.\"",
        "{step === 4 && (",
        "steps: ['Start', 'Scene', 'Catch', 'Speak + repair', 'Win']",
        "proof: 'listen • answer aloud • repair'",
    ]
    missing = [snippet for snippet in required if snippet not in final_self_intro + mission_data]
    if missing:
        fail(f"final self-intro must keep merged voice-first repair path: {missing}")
    retired = [
        "SpeakWriteStep",
        "<RepairStep",
        "typedAnswer",
        "typedNormalized",
        "typedStrong",
        "inputId=\"typed-final-anchor\"",
        "Optional final anchor",
        "{step === 5 && (",
        "Speak + write",
    ]
    hits = [snippet for snippet in retired if snippet in final_self_intro]
    if hits:
        fail(f"final self-intro reintroduced separate typing/repair chore path: {hits}")
    print("final_self_intro_voice_first=merged_repair")


def assert_please_thanks_is_voice_first_merged_repair() -> None:
    please_thanks = (ROOT / "src/app/missions/module-1/please-thanks/page.tsx").read_text(encoding="utf-8")
    mission_data = MODULE1_MISSION_DATA.read_text(encoding="utf-8")
    required = [
        "ConversationRepairStep",
        "title=\"Danke.\"",
        "speakerLine={practice.scene.speakerLine}",
        "learnerLine=\"Danke.\"",
        "cta={<>Fix Danke/Bitte",
        "writeCompletedModule1Mission",
        "data-testid=\"please-thanks-inline-win\"",
        "{repairCorrect && (",
        "steps: ['Scene + repair']",
        "proof: 'audio • answer aloud • quick repair'",
    ]
    missing = [snippet for snippet in required if snippet not in please_thanks + mission_data]
    if missing:
        fail(f"please-thanks mission must keep merged no-typing repair path: {missing}")
    retired = [
        "SpeakWriteStep",
        "<RepairStep",
        "typedAnswer",
        "Optional polite anchor",
        "inputId=\"typed-module1-please-thanks\"",
        "<RecognitionStep",
        "Pick the thank-you.",
        "Choose the response",
        "responseOptions",
        "const [recognition",
        "MissionIntro",
        "Module1MissionWinStep",
        "Start danke drill",
        "{step === 2 && (",
        "{step === 5 && (",
    ]
    hits = [snippet for snippet in retired if snippet in please_thanks]
    if hits:
        fail(f"please-thanks reintroduced separate typing/repair chore path: {hits}")
    print("please_thanks_voice_first=merged_repair")


def assert_polite_exit_is_voice_first_merged_repair() -> None:
    polite_exit = (ROOT / "src/app/missions/module-1/polite-exit/page.tsx").read_text(encoding="utf-8")
    mission_data = MODULE1_MISSION_DATA.read_text(encoding="utf-8")
    required = [
        "ConversationRepairStep",
        "title=\"Auf Wiedersehen.\"",
        "speakerLine={practice.scene.speakerLine}",
        "learnerLine=\"Vielen Dank. Auf Wiedersehen.\"",
        "audioSrc={practice.scene.audioSrc}",
        "turnCue={practice.scene.turnCue}",
        "correctFeedback={practice.repair.correctFeedback}",
        "cta={<>Fix goodbye",
        "writeCompletedModule1Mission",
        "data-testid=\"polite-exit-inline-win\"",
        "{repairCorrect && (",
        "onContinue={() => {}}",
        "steps: ['Scene + repair']",
        "proof: 'audio • answer aloud • quick repair'",
    ]
    missing = [snippet for snippet in required if snippet not in polite_exit + mission_data]
    if missing:
        fail(f"polite-exit mission must keep one-screen no-typing conversation repair path: {missing}")
    retired = [
        "SpeakWriteStep",
        "SpeakRepairStep",
        "<RepairStep",
        "typedAnswer",
        "Optional exit anchor",
        "inputId=\"typed-module1-polite-exit\"",
        "<RecognitionStep",
        "<ConversationSceneStep",
        "Pick the adult exit.",
        "Choose the exit",
        "exitOptions",
        "const [recognition",
        "MissionIntro",
        "Module1MissionWinStep",
        "Start polite exit",
        "title=\"Leave the room.\"",
        "Gute Nacht.",
        "Bedtime trap",
        "goodbye mistake",
        "Correct. Formal goodbye",
        "{step === 2 && (",
        "Sorry vs goodbye",
        "title=\"Answer, then fix.\"",
        "prompt=\"Close the class out loud. Then catch the goodbye trap.\"",
        "modelText=\"Vielen Dank. Auf Wiedersehen.\"",
        "{step === 3 && (",
        "{step === 5 && (",
    ]
    hits = [snippet for snippet in retired if snippet in polite_exit]
    if hits:
        fail(f"polite-exit reintroduced separate scene/speaking/typing chore path: {hits}")
    print("polite_exit_voice_first=one_screen_conversation_repair")


def assert_routes_reachable() -> None:
    for base in BASE_URLS:
        for path in ROUTE_PATHS:
            url = f"{base}{path}"
            try:
                with urllib.request.urlopen(url, timeout=8) as response:
                    status = response.status
                    ctype = response.headers.get("content-type", "")
            except Exception as exc:  # noqa: BLE001
                fail(f"route not reachable: {url} -> {exc!r}")
            if status != 200 or "text/html" not in ctype:
                fail(f"bad route response: {url} status={status} type={ctype}")
    print(f"routes_reachable={len(BASE_URLS) * len(ROUTE_PATHS)}")


def main() -> None:
    assert_no_browser_tts()
    assert_native_audio_controls()
    assert_audio_files()
    assert_opening_text_light()
    assert_no_learner_facing_meta_labels()
    assert_module1_audio_labels_are_human()
    assert_choice_subtitles_stay_compact()
    assert_choice_continue_is_not_a_dead_button()
    assert_repair_explainer_stays_compact()
    assert_scene_check_copy_stays_visual_minimal()
    assert_start_path_source()
    assert_mission_data_drives_path()
    assert_self_intro_recognition_stays_focused()
    assert_module1_first_mission_path()
    assert_m1_m2_optional_anchors_are_not_gates()
    assert_repair_ctas_sound_human()
    assert_hear_steps_are_one_tap_scene()
    assert_mission_mobile_controls()
    assert_sequence_status_uses_completion_storage()
    assert_m1_m2_video_basis_adult_safe()
    assert_module2_legacy_scenes_stay_kerala_rehearsal()
    assert_intro_start_path_browser_guard()
    assert_direct_final_sequence_status_browser_guard()
    assert_completed_ability_landings_browser_guard()
    assert_m1_m2_builder_browser_guard()
    assert_gold_slice_first_journey_browser_guard()
    assert_mission_motion_respects_preferences()
    assert_no_retired_chore_components()
    assert_please_thanks_is_voice_first_merged_repair()
    assert_polite_exit_is_voice_first_merged_repair()
    assert_spell_name_is_voice_first_merged_repair()
    assert_from_kerala_is_voice_first_merged_repair()
    assert_job_languages_is_voice_first_merged_repair()
    assert_final_self_intro_is_voice_first_merged_repair()
    assert_routes_reachable()
    print("PASS: mission pilot QA basics")


if __name__ == "__main__":
    main()
