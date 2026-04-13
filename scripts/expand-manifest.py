#!/usr/bin/env python3
"""Expand cinematic-arc.json: extend V2-V6 to ~12 scenes, add V8-V12."""

import json
from pathlib import Path

MANIFEST = Path(__file__).parent / "cinematic-arc.json"

manifest = json.loads(MANIFEST.read_text())

# ── Helper ──────────────────────────────────────────────────────────────────

def scene(id_, title, strategy, still=None, anim="", dur=4, chain=None):
    s = {"id": id_, "title": title, "seed_strategy": strategy, "animation_prompt": anim, "duration": dur}
    if still:
        s["still_prompt"] = still
    if chain:
        s["chain_from"] = chain
    return s

def img(id_, title, still, anim, dur=4):
    return scene(id_, title, "imagen", still=still, anim=anim, dur=dur)

def chain(id_, title, anim, from_, dur=4):
    return scene(id_, title, "chain_from_previous", anim=anim, chain=from_, dur=dur)


# ── Extend V2: First German Words (6→12 scenes) ────────────────────────────

v2 = next(v for v in manifest["videos"] if v["id"] == 2)
v2["duration_target_seconds"] = 48
v2["narrative"] = "The morning after the spark. First real contact with the language. Starts on the Kerala veranda, then moves to a bus ride, a tea shop, and home at night. The full first day of learning."

v2["scenes"].extend([
    img("v2-s7", "On the Bus — Reading",
        "A young Malayali man in his early 20s sitting by the window of a Kerala public bus, afternoon light streaming in. He holds the German textbook open on his lap, reading intently. Other passengers softly blurred. The Kerala landscape slides by outside the window. White cotton shirt. His backpack on the seat beside him.",
        "Gentle bus vibration, his eyes scanning the page, slight sway with the bus movement. Kerala countryside sliding past the window in soft focus."),
    chain("v2-s8", "Bus — Mouthing Words", "He mouths a German word silently to himself on the bus, looking down at the textbook. Tiny lip movement, slight self-conscious glance around to check nobody noticed. Returns to reading.", "v2-s7"),
    img("v2-s9", "Tea Shop — Practicing",
        "A young Malayali man in his early 20s sitting at a small Kerala tea shop, a simple wooden bench and table. Steel glass of chai, the German textbook open in front of him, notebook beside it. He is writing in the notebook. Afternoon light, other customers in soft blur behind. A street and autorickshaw softly visible outside. White cotton shirt.",
        "Small pen movements writing in the notebook. Tiny sip of chai. Focused, present. The quiet contentment of studying in a new place."),
    img("v2-s10", "Walking Home — Muttering Words",
        "A young Malayali man in his early 20s walking on a quiet Kerala residential lane in late afternoon golden light. Textbook tucked under his arm. His lips are moving slightly — he is muttering German words to himself as he walks. Palm trees and Kerala houses in the background. White cotton shirt. Warm golden hour light.",
        "Steady walking pace. Lips moving slightly, practicing pronunciation. Tiny smile when a word comes out right. Gentle arm swing. Golden light on his face."),
    img("v2-s11", "Home — Showing the Parents",
        "A young Malayali man in his early 20s sitting in a Kerala home living room, holding the German textbook open and showing it to someone just off-camera. His expression is animated and excited, explaining something. Warm indoor lighting, a traditional Kerala living room with wooden furniture. White cotton shirt.",
        "Animated hand gestures pointing at the textbook. Excited expression, speaking enthusiastically. Small head nods. The energy of someone who found something they love."),
    img("v2-s12", "Night — Lying in Bed with the Book",
        "A young Malayali man in his early 20s lying on his bed in a Kerala bedroom at night, single warm lamp on. The German textbook rests open on his chest. He stares at the ceiling with a faint smile — the satisfied look of someone who had a good first day. The notebook and pen on the bedside. White t-shirt.",
        "Slow calm breath. Tiny smile. Eyes drift from the ceiling to the book on his chest. One hand gently touches the book cover. The lamp light flickers softly."),
])

# ── Extend V3: The German Class (5→12 scenes) ──────────────────────────────

v3 = next(v for v in manifest["videos"] if v["id"] == 3)
v3["duration_target_seconds"] = 48
v3["narrative"] = "First real classroom day at a Kerala German language institute. Nervous arrival, class scenes, tea break, library, auto-rickshaw ride, walking home energised. The full arc of a first day at school."

v3["scenes"].extend([
    img("v3-s6", "Tea Break in the Corridor",
        "A young Malayali man in his early 20s standing in a simple corridor outside a Kerala classroom, holding a small steel glass of tea. He leans against the wall, looking thoughtful. The corridor has simple concrete walls and a window with light coming in. White cotton shirt.",
        "Small sip of tea. Eyes drifting, processing what he just learned. Tiny breath. The quiet pause of a tea break between classes."),
    img("v3-s7", "Library — Studying with a Dictionary",
        "A young Malayali man in his early 20s sitting at a wooden table in a small Kerala library. A German-English dictionary open in front of him, his notebook beside it. Bookshelves in soft focus behind. His expression is focused, tracing a word in the dictionary. Warm natural light from a window. White cotton shirt.",
        "Tiny finger movement tracing a word in the dictionary. Small writing movement in the notebook. Focused gaze. Quiet library atmosphere."),
    img("v3-s8", "Auto-Rickshaw — Reading Notes",
        "A young Malayali man in his early 20s sitting in the back of a Kerala auto-rickshaw, afternoon light. He holds his notebook open, reviewing the day's notes. The Kerala street is softly visible through the open sides of the auto. His expression is absorbed. White cotton shirt. Backpack beside him.",
        "Gentle rickshaw vibration and sway. Eyes scanning the notebook. Kerala street life sliding past in soft focus. Tiny nod of understanding."),
    chain("v3-s9", "Auto-Rickshaw — Looking Up Smiling",
        "He looks up from the notebook and out through the open side of the auto-rickshaw. A small genuine smile. The Kerala afternoon passes by. He is thinking about what he learned today.", "v3-s8"),
    img("v3-s10", "Evening — Terrace Review",
        "A young Malayali man in his early 20s sitting on the terrace of his Kerala home in the evening, orange sunset light. His notebook open on his lap, reviewing the day's notes. Kerala rooftops and palm trees in the background. His expression is calm and satisfied. White cotton shirt.",
        "Gentle page turn. Eyes scanning notes. Tiny smile of recall. Sunset light shifting slowly. Peaceful evening study."),
    img("v3-s11", "Night — Writing New Words",
        "A young Malayali man in his early 20s sitting at a simple desk in his Kerala bedroom at night, warm lamp light. He is writing new German vocabulary words in his notebook from the textbook. His posture is energised, not tired — the first class fuelled him. White cotton shirt.",
        "Steady pen movements. Small head tilts checking the textbook then writing. Focused and energised. The lamp light is warm and steady."),
    img("v3-s12", "Next Morning — Walking to Class Confidently",
        "A young Malayali man in his early 20s walking on a Kerala street in the morning, heading toward the language institute. Notebook under his arm, small backpack. His stride is more confident than yesterday — he knows where he is going now. Morning light. White cotton shirt. Small smile.",
        "Confident walking pace. Slight spring in his step. Morning light on his face. He belongs here now."),
])

# ── Extend V4: The Struggle (4→12 scenes) ──────────────────────────────────

v4 = next(v for v in manifest["videos"] if v["id"] == 4)
v4["duration_target_seconds"] = 48
v4["narrative"] = "Weeks have passed. The honeymoon is over. German grammar is hard. Kuttan is tired, frustrated, doubting himself. Multiple settings: bedroom at night, classroom confusion, bus staring, kitchen alone."

v4["scenes"].extend([
    img("v4-s5", "Morning — Dragging Out of Bed",
        "A young Malayali man in his early 20s sitting on the edge of his bed in a Kerala bedroom, early morning gray light. He looks exhausted, shoulders slumped, rubbing his face with one hand. The German textbook and messy notes visible on the floor nearby. White cotton shirt wrinkled from sleep.",
        "Slow heavy breath. Hands rubbing face. Reluctant posture. The weight of having to get up and do it again."),
    img("v4-s6", "Bus — Staring Blankly",
        "A young Malayali man in his early 20s sitting on a Kerala bus, afternoon. He stares blankly out the window, the German textbook closed on his lap. His expression is distant and tired. Kerala landscape passing outside. White cotton shirt. No energy.",
        "Blank stare out the window. No movement except gentle bus sway. Tired eyes. The look of someone going through the motions."),
    img("v4-s7", "Class — Not Understanding",
        "Medium close-up. A young Malayali man in his early 20s at his desk in a Kerala classroom. His expression is confused and frustrated — he does not understand what is being taught. His notebook is open but almost empty. He grips his pen but is not writing. White cotton shirt.",
        "Tiny frustrated breath. Brow furrowed. Eyes trying to follow something he cannot grasp. Small head shake. The isolation of not understanding."),
    chain("v4-s8", "Class — Putting the Pen Down",
        "He puts the pen down on the notebook. Leans back slightly in the chair. A small exhale of defeat. Eyes close for a second. The moment of wanting to give up in class.", "v4-s7"),
    img("v4-s9", "Kitchen — Eating Alone at Night",
        "A young Malayali man in his early 20s sitting alone at a small table in a Kerala home kitchen late at night. A plate of rice in front of him, barely touched. Single overhead light. His expression is tired and flat. The German textbook is visible on the counter behind him, but he is not looking at it. White cotton shirt.",
        "Slow mechanical eating. Tired gaze at nothing. The loneliness of struggling alone. Gentle kitchen sounds."),
    img("v4-s10", "Phone — Considering Quitting",
        "A young Malayali man in his early 20s lying on his bed at night, phone held up above his face, screen glow lighting his features. His expression is conflicted — considering whether to keep going. The German textbook lies discarded at the foot of the bed. White t-shirt.",
        "Tiny scroll movement on the phone. Conflicted expression. Small bite of the lip. Eyes that want to close. The weight of doubt."),
    img("v4-s11", "Rain — Standing at the Window",
        "A young Malayali man in his early 20s standing at the window of his Kerala bedroom, watching monsoon rain fall outside. Heavy rain on palm trees and rooftops. His expression is melancholy but not broken — somewhere between giving up and holding on. Dim gray light. White cotton shirt.",
        "Rain sounds. His breath fogs the glass slightly. Tiny head lean against the window frame. Watching the rain with heavy eyes. A moment of reckoning."),
    chain("v4-s12", "Rain — A Decision Forming",
        "His jaw tightens slightly. A small breath in. He turns away from the window slowly. Not defeated, not energised — just deciding to try one more time. Quiet resolve.", "v4-s11"),
])

# ── Extend V5: Breakthrough (4→12 scenes) ──────────────────────────────────

v5 = next(v for v in manifest["videos"] if v["id"] == 5)
v5["duration_target_seconds"] = 48
v5["narrative"] = "Something clicks. German starts making sense. Multiple settings: bedroom study, phone video, classroom confidence, helping others, peaceful night study."

v5["scenes"].extend([
    img("v5-s5", "Phone — Understanding a German Video",
        "A young Malayali man in his early 20s sitting on his bed in a Kerala bedroom, morning light. He holds his phone, watching something on screen. His expression is one of surprised recognition — he is understanding German being spoken. A small amazed smile forming. White cotton shirt.",
        "Eyes widening slightly. Small smile of recognition. Tiny nod. The moment of understanding spoken German for the first time."),
    chain("v5-s6", "Phone — Laughing at Something",
        "He laughs — a genuine small laugh at something he understood on the German video. Hand comes up to his mouth briefly. Eyes bright. He understood a joke in German.", "v5-s5"),
    img("v5-s7", "Classroom — Answering Confidently",
        "Medium close-up. A young Malayali man in his early 20s at his desk in a Kerala classroom. He is mid-answer, mouth forming a German sentence, expression focused but confident. No other students visible — tight framing. White cotton shirt.",
        "Clear confident mouth movement. Steady gaze forward. Small emphatic hand gesture. The voice of someone who knows the answer."),
    img("v5-s8", "Library — Writing Fluently",
        "A young Malayali man in his early 20s at a library table, writing smoothly in his notebook. The writing is fluid now, not hesitant. The German textbook open beside him. His expression is calm and absorbed. Warm natural light. White cotton shirt.",
        "Smooth pen movements without stopping. Calm focused expression. Page filling up with neat German text. The ease of someone finding their rhythm."),
    img("v5-s9", "Helping a Classmate",
        "A young Malayali man in his early 20s standing in a simple Kerala classroom corridor, pointing at something in a notebook held by someone just off-camera. His expression is helpful and confident — explaining a German grammar point. White cotton shirt. Afternoon light.",
        "Animated hand pointing at the notebook. Small explanatory gestures. Confident expression. The role reversal of helping someone else."),
    img("v5-s10", "Evening Terrace — Reading a German Book",
        "A young Malayali man in his early 20s sitting on the terrace of his Kerala home in golden evening light. He reads a simple German book — not the textbook, a real book. His expression is relaxed and absorbed. Tea beside him. Kerala rooftops and palms in background. White cotton shirt.",
        "Gentle page turn. Absorbed reading expression. Small sip of tea. The peace of reading for pleasure, not studying."),
    img("v5-s11", "Night — Peaceful Study",
        "A young Malayali man in his early 20s at his desk in his Kerala bedroom at night. Warm lamp light. He is studying but the mood is completely different from V4 — calm, productive, in control. Neat notes, organised desk. Small smile. White cotton shirt.",
        "Steady confident pen strokes. Occasional look at the textbook and back. Small satisfied nod. Calm productive energy."),
    img("v5-s12", "Morning — Looking in the Mirror",
        "A young Malayali man in his early 20s standing in front of a mirror in his Kerala bedroom, morning light. He looks at his reflection with quiet confidence. He is different from the boy who started. No words needed — just a look that says he knows he can do this. White cotton shirt.",
        "Steady gaze at his own reflection. Small breath. Tiny nod to himself. Almost imperceptible smile. He sees someone who changed."),
])

# ── Extend V6: Goethe A1 Exam (5→12 scenes) ───────────────────────────────

v6 = next(v for v in manifest["videos"] if v["id"] == 6)
v6["duration_target_seconds"] = 48
v6["narrative"] = "Exam day arc: intense preparation, morning of, bus ride, waiting room, exam sections, walking out, getting the result, calling parents."

v6["scenes"].extend([
    img("v6-s6", "Days Before — Intense Study",
        "A young Malayali man in his early 20s at his desk in his Kerala bedroom, surrounded by open books, flashcards, and notes. Intense concentrated expression. Multiple colored pens and highlighters. The desk is organised chaos. Evening lamp light. White cotton shirt.",
        "Quick pen movements. Eyes scanning between textbook and notes. Small mumbled German words. The focused energy of exam preparation."),
    img("v6-s7", "Exam Morning — Getting Ready",
        "A young Malayali man in his early 20s in his Kerala bedroom, morning light. He is buttoning his white cotton shirt carefully, looking in the mirror. His expression is nervous but determined. The German textbook and exam materials are packed in a bag on the bed behind him. Neat hair.",
        "Careful buttoning. Straightening the collar. Small breath in the mirror. Nervous but ready."),
    img("v6-s8", "On the Bus to the Exam",
        "A young Malayali man in his early 20s on a Kerala bus, morning. He holds a small revision sheet, eyes scanning it quickly. His expression is a mix of nervous energy and last-minute cramming. Other passengers softly blurred. White cotton shirt tucked in.",
        "Eyes darting across the revision sheet. Tiny lip movements mouthing words. Nervous foot tap. The energy of last-minute preparation."),
    img("v6-s9", "Waiting Room",
        "A young Malayali man in his early 20s sitting in a simple waiting room with plastic chairs. He sits alone, hands clasped, waiting to be called in. His expression is tense and focused. A clock on the wall. Simple institutional room. White cotton shirt tucked in.",
        "Small nervous weight shift. Hands clasping and unclasping. Glance at the clock. Deep breath. The tension of waiting."),
    img("v6-s10", "Celebration — Fist Pump",
        "A young Malayali man in his early 20s standing outside a Kerala building in afternoon light. He has just seen his result on his phone — a contained but real celebration. One fist pumping subtly, a big genuine smile, eyes bright. White cotton shirt. The relief and joy of passing.",
        "Fist pump. Big genuine smile breaking across his face. Eyes bright with joy. Small jump or weight shift of celebration. Pure relief."),
    chain("v6-s11", "Celebration — Calling Home",
        "He immediately puts the phone to his ear, calling someone. Excited expression. Mouth forming words rapidly — telling someone the news. Walking in circles with happy energy.", "v6-s10"),
    img("v6-s12", "Night — The Certificate on the Desk",
        "Close-up of a desk in a Kerala bedroom at night, warm lamp light. A Goethe-Institut A1 certificate (simple official-looking document, no readable text needed) lies on the desk next to the German textbook, notebook, and pen that started it all. A steel cup of chai beside them. No person visible — just the objects that represent the journey. Warm intimate lighting.",
        "Gentle lamp flicker. Tiny shadow shift. Stillness. The quiet dignity of an achievement resting on a desk."),
])

# ── New V8: Landing in Germany ──────────────────────────────────────────────

v8 = {
    "id": 8,
    "title": "Landing in Germany",
    "status": "to-generate",
    "duration_target_seconds": 48,
    "narrative": "First moments in Germany. Airport, train, first glimpse of a German city, finding the dorm, first night alone. Everything is new, cold, and overwhelming.",
    "scenes": [
        img("v8-s1", "German Airport — Arrivals",
            "A young Malayali man in his early 20s walking through a modern German airport arrivals hall, pulling a large suitcase. Bright fluorescent lights, German signage softly visible. He wears a warm jacket over his white shirt — first time in winter clothing. His expression is overwhelmed and alert. Other travelers around him in soft blur.",
            "Steady walking, pulling suitcase. Head turning to take in the unfamiliar space. Wide eyes. The disorientation of arrival."),
        chain("v8-s2", "Airport — Standing Still",
            "He stops walking and stands still for a moment in the airport hall. People flow around him. He takes a breath, looks around, processes. The smallness of being new in a huge foreign place.", "v8-s1"),
        img("v8-s3", "German Train — Window",
            "A young Malayali man in his early 20s sitting on a German regional train, looking out the window. Winter European landscape rolling past — bare trees, gray sky, small towns. His expression is a mix of wonder and loneliness. Warm jacket. Suitcase in the luggage rack. Clean modern train interior.",
            "Eyes following the landscape. Gentle train vibration. Gray sky and bare trees reflected in the window. Breath fogs the cold glass slightly."),
        img("v8-s4", "German City Street — First Steps",
            "A young Malayali man in his early 20s walking on a German city street in winter, pulling his suitcase. European architecture, tram tracks, gray sky. A few snowflakes in the air. He is looking around at everything — street signs, buildings, people in winter coats. Warm jacket. The wonder and cold of a first walk in Europe.",
            "Walking slowly, head turning. Tiny shiver. Eyes wide at the unfamiliar architecture. Snowflakes catching the light. Steps on European cobblestones."),
        img("v8-s5", "Finding the Building",
            "A young Malayali man in his early 20s standing outside a German apartment building or student dormitory, looking up at it. Winter afternoon light. He holds a piece of paper with an address. His suitcase beside him. The building is plain European architecture. His expression is searching and hopeful.",
            "Looking up at the building. Glancing at the paper. Small breath. Reaching for the door buzzer. The threshold of his new life."),
        img("v8-s6", "The New Room",
            "A young Malayali man in his early 20s standing in a small, bare German dorm room. Single bed, simple desk, empty bookshelf, radiator. Winter gray light from the window. His suitcase stands unopened in the middle of the room. He looks around the empty space. Warm jacket still on.",
            "Slow look around the bare room. Small breath. Touching the desk surface. Sitting down on the bed. The emptiness of a new beginning."),
        chain("v8-s7", "Sitting on the Bed",
            "He sits on the edge of the bed in the bare room. Suitcase still packed. He looks at his hands, then out the window at the gray German sky. A long exhale. Not sad, not happy — just processing.", "v8-s6"),
        img("v8-s8", "Unpacking — The Textbook",
            "Close-up. Hands opening a suitcase on a bed in a German dorm room. Among clothes and belongings, the familiar German textbook from Kerala is visible. The hands pause on it. A connection to home and the journey that brought him here. Warm indoor light against gray window.",
            "Hands unzipping suitcase. Pausing on the textbook. Gentle touch. Lifting it out and placing it on the desk. A small anchor in a new world."),
        img("v8-s9", "Window — German Evening",
            "A young Malayali man in his early 20s standing at the window of his German dorm room at dusk. City lights beginning to glow. European rooftops and church steeples. His reflection faint in the glass. His expression is contemplative — taking in this new world. White shirt, no jacket now.",
            "Slow breath. Eyes scanning the unfamiliar skyline. Faint reflection in the glass. A hand touching the cold windowpane. The strangeness of being far from home."),
        img("v8-s10", "First Night — Lying Awake",
            "A young Malayali man in his early 20s lying in bed in his German dorm room at night. A single desk lamp on. The room is sparse but he has placed the German textbook and a small photo frame on the desk. He stares at the ceiling. The look of someone whose body is in Germany but whose mind is still in Kerala.",
            "Slow breath. Eyes open, staring at the ceiling. Tiny head turn toward the desk. Silence and loneliness. The weight of the first night abroad."),
        img("v8-s11", "Phone — Kerala at Night",
            "A young Malayali man in his early 20s in his German dorm room bed at night, holding his phone. The screen shows a video call — a familiar Kerala living room softly visible on screen. His expression shifts from lonely to a small warm smile. Phone glow on his face in the dark room.",
            "Small genuine smile seeing familiar faces. Tiny wave. Eyes glistening. The warmth of connection across distance."),
        img("v8-s12", "Morning — First German Morning",
            "A young Malayali man in his early 20s standing at the window of his German dorm room, early morning. Faint winter sunrise, a new day. He holds a cup of coffee or tea. His expression is calmer than last night — okay, he can do this. White shirt. The German textbook on the desk behind him.",
            "Slow sip of the warm drink. Watching the sunrise over the German city. Small breath. Tiny nod. A decision to begin."),
    ]
}

# ── New V9: The Difficult Days ──────────────────────────────────────────────

v9 = {
    "id": 9,
    "title": "The Difficult Days",
    "status": "to-generate",
    "duration_target_seconds": 48,
    "narrative": "The hard middle weeks in Germany. Language barrier in real life, university confusion, loneliness, homesickness, but also small beautiful moments — first snow, Kerala chai in a German kitchen.",
    "scenes": [
        img("v9-s1", "German Supermarket — Confused",
            "A young Malayali man in his early 20s standing in a German supermarket aisle, holding a product and reading the German label with confusion. Bright supermarket lighting, European products on shelves. His expression is bewildered — everything is unfamiliar. Winter jacket.",
            "Turning the product around, trying to read. Slight head shake. Putting it back, picking up another. The small daily confusion of a new country."),
        img("v9-s2", "Cooking Alone",
            "A young Malayali man in his early 20s standing in a small shared German kitchen, cooking something simple on the stove. He is alone. The kitchen is clean and European — different from Kerala. His expression is focused but lonely. Evening light. White shirt with sleeves rolled up.",
            "Small stirring motion. Tasting. A pause, looking at the pot. Cooking alone in a foreign kitchen. Missing home-cooked food."),
        img("v9-s3", "University Lecture — Lost",
            "A young Malayali man in his early 20s sitting in a large German university lecture hall. The hall is modern with tiered seating. He sits with a notebook open but barely anything written. His expression is lost — the German is too fast, too academic. Other students are focused. He is drifting. Winter clothes.",
            "Pen hovering but not writing. Eyes trying to follow. Small defeated exhale. The overwhelm of an academic lecture in a foreign language."),
        img("v9-s4", "Cafeteria — Eating Alone",
            "A young Malayali man in his early 20s sitting alone at a table in a German university Mensa (cafeteria). A tray of European food in front of him. Around him, groups of students are chatting. He eats quietly, looking at his food. The isolation of being the new foreign student.",
            "Slow eating. Eyes glancing at the chatting groups around him. Small swallow. Looking back at his food. Alone in a crowd."),
        img("v9-s5", "Video Call Home — Holding Back",
            "A young Malayali man in his early 20s sitting at the desk in his German dorm room, on a video call. The phone propped up. He is smiling for the camera but his eyes betray him — he is holding back how hard it actually is. The dorm room behind him. Evening.",
            "Maintained smile that doesn't reach the eyes. Small nod. Reassuring gestures. The performance of being okay for family. A tiny crack in the composure."),
        chain("v9-s6", "After the Call",
            "The call ends. His smile drops immediately. He sits back in the chair. A long exhale. Hands on his face for a moment. The mask coming off. Then he straightens up. He has to keep going.", "v9-s5"),
        img("v9-s7", "Making Kerala Chai",
            "Close-up of hands in a German kitchen, making chai the Kerala way — cardamom, ginger, milk boiling in a small pot. The hands are steady and practiced. This is the one thing that feels like home. A German stove, German mugs on the counter. White shirt sleeve.",
            "Practiced stirring. Adding spices. The ritual of making chai. Steam rising. Pouring into a mug. A small piece of Kerala in Germany."),
        chain("v9-s8", "Drinking Chai at the Window",
            "He carries the mug of chai to the dorm room window. Holds it with both hands, feeling the warmth. Looks out at the German city. Takes a sip. For a moment, with the chai in his hands, it feels a little less far from home.", "v9-s7"),
        img("v9-s9", "First Snow",
            "A young Malayali man in his early 20s standing outside on a German street, looking up. Snow is falling for the first time in his life. His expression is pure wonder — mouth slightly open, eyes wide, hand reaching out to catch a snowflake. Warm winter jacket. European buildings and bare trees dusted with snow.",
            "Face tilting up. Snowflakes landing on his jacket. Hand reaching out. A snowflake melting on his palm. Wonder breaking through the loneliness. A genuine moment of magic."),
        chain("v9-s10", "Snow — Laughing",
            "He laughs — a real, surprised laugh at the snow. Catches more snowflakes. Turns in a small circle. For a moment he forgets everything hard. Just a young man seeing snow for the first time.", "v9-s9"),
        img("v9-s11", "Night Dorm — Kerala Photos",
            "A young Malayali man in his early 20s sitting at his desk in his German dorm room at night. On the wall behind him: a few photos of Kerala — palm trees, family, his old bedroom. The German textbook open on the desk. His expression is homesick but not broken. Desk lamp. White shirt.",
            "Eyes drifting to the photos on the wall. Looking at a family photo. Then back to the textbook. A small breath. Two worlds in one small room."),
        img("v9-s12", "Walking in the Snow — Alone but Okay",
            "A young Malayali man in his early 20s walking alone on a snow-covered German sidewalk at dusk. Streetlights glowing, snow on the ground and bare trees. He walks with his hands in his jacket pockets. His expression is quiet — not happy, not sad. Somewhere between. The blue hour light of a German winter evening.",
            "Steady walking. Breath visible in cold air. Footsteps in fresh snow. Looking ahead. The quiet dignity of endurance."),
    ]
}

# ── New V10: Finding His Way ────────────────────────────────────────────────

v10 = {
    "id": 10,
    "title": "Finding His Way",
    "status": "to-generate",
    "duration_target_seconds": 48,
    "narrative": "Spring comes. Things start getting better. Study group, first German friends, cooking Kerala food for roommates, cycling, speaking confidently. Integration happening naturally.",
    "scenes": [
        img("v10-s1", "Spring Morning — New Energy",
            "A young Malayali man in his early 20s walking on a German city street in early spring. Trees budding, warmer light, blue sky. He has a lighter jacket, more spring in his step. His expression is brighter — something has shifted. The city looks friendlier in spring.",
            "Confident walking pace. Eyes noticing the spring buds. A genuine small smile. The mood lift of a season changing."),
        img("v10-s2", "Study Group",
            "A young Malayali man in his early 20s sitting at a table in a German university library with two other international students (blurred or partially visible). They share textbooks and notes. He is pointing at something in a notebook, explaining. His expression is engaged and confident. No tight close-up of other faces.",
            "Animated pointing at notebook. Small discussion gestures. Confident expression. The comfort of finding your people."),
        img("v10-s3", "German Friend — Walking Together",
            "A young Malayali man in his early 20s walking on a German university campus path with another student beside him (partially visible). They are mid-conversation, walking together. Spring trees and a German university building in background. He is gesturing while talking — comfortable, natural. Lighter jacket.",
            "Walking and talking naturally. Genuine expression. Hand gestures in conversation. The ease of a real friendship forming."),
        img("v10-s4", "Cooking Kerala Food",
            "A young Malayali man in his early 20s cooking in a German shared kitchen. Multiple pots on the stove — he is making a proper Kerala meal. Spices visible on the counter. His expression is happy, focused, in his element. Rolled-up sleeves. The kitchen smells like home.",
            "Confident cooking movements. Stirring, tasting, adding spices. A happy focused expression. Cooking as an act of identity."),
        img("v10-s5", "Friends Eating Together",
            "A young Malayali man in his early 20s sitting at a table in a German shared apartment, plates of Kerala food on the table. He watches with anticipation as a hand reaches for a plate (other people not fully visible). His expression is proud and hopeful — sharing his culture. Warm kitchen light.",
            "Watching with anticipation. Small proud smile. Gesturing to encourage someone to try. The joy of sharing food from home."),
        img("v10-s6", "Cycling Through the City",
            "A young Malayali man in his early 20s cycling on a German city bike path. Spring greenery, European buildings, blue sky. He rides with a relaxed posture, a small smile. This city is becoming his city. Light jacket or just a shirt.",
            "Smooth cycling motion. Wind in his hair. Looking around with familiarity, not wonder. A city becoming home."),
        img("v10-s7", "Speaking German to a Shopkeeper",
            "A young Malayali man in his early 20s at the counter of a small German shop (Bäckerei or similar). He is mid-conversation with someone behind the counter (not fully visible). His expression is relaxed and natural — speaking German without stress. Casual clothes.",
            "Natural speaking gestures. Relaxed expression. Small smile. Receiving something across the counter. The normalcy of daily life in German."),
        img("v10-s8", "Phone Call Home — Excited",
            "A young Malayali man in his early 20s walking on a German street in spring, phone to his ear, talking animatedly. He is telling his family about his life here. His expression is genuinely excited and happy. Trees and spring light around him. Casual clothes.",
            "Animated talking. Big genuine smile. Gesturing even though nobody can see. The excitement of telling family it is going well."),
        img("v10-s9", "Park Bench — Reading in German",
            "A young Malayali man in his early 20s sitting on a bench in a German city park in spring. He reads a German novel — a real book, not a textbook. Trees in bloom around him. His expression is absorbed and peaceful. Casual clothes. Dappled spring sunlight.",
            "Gentle page turn. Absorbed reading expression. Spring breeze moving his hair. The peace of reading for pleasure in a language he once could not speak."),
        img("v10-s10", "Sunset — Rooftop or Bridge",
            "A young Malayali man in his early 20s standing on a German rooftop terrace or bridge at sunset. The German city skyline in warm golden light. He looks out with a calm, content expression — this place is home now too. Casual clothes. Golden hour light on his face.",
            "Slow breath. Eyes scanning the skyline. A genuine peaceful smile. The stillness of belonging."),
        img("v10-s11", "Night — Writing Home in German",
            "A young Malayali man in his early 20s at his desk in his German dorm room at night. He is writing in his notebook — but now the handwriting is German, fluid and confident. The Kerala photos still on the wall. The German textbook from Kerala is on the shelf, well-worn. Desk lamp. A cup of chai beside him.",
            "Smooth confident writing. Small pauses to think, then continuing. The old Kerala textbook visible like a memento. Two worlds in one room, but at peace now."),
        img("v10-s12", "Walking Home — He Belongs",
            "A young Malayali man in his early 20s walking on a German street at dusk. City lights coming on. His stride is easy, hands in pockets. He knows these streets now. A small smile. He is home in both worlds. Spring evening light.",
            "Easy confident stride. Familiar with the streets. Small smile. Evening light. The quiet confidence of someone who made it."),
    ]
}

# ── New V11: Home in Both Worlds ────────────────────────────────────────────

v11 = {
    "id": 11,
    "title": "Home in Both Worlds",
    "status": "to-generate",
    "duration_target_seconds": 48,
    "narrative": "The full circle. German spring. University success. Video call showing the city to parents. Visiting a Kerala restaurant in Germany. Planning a trip home. The final scene mirrors the opening — but now he is the one who made the journey.",
    "scenes": [
        img("v11-s1", "German Spring — Campus Walk",
            "A young Malayali man in his early 20s walking across a beautiful German university campus in full spring bloom. Cherry blossoms or spring flowers. Modern campus buildings. He walks with confidence and ease, a bag over his shoulder. Casual shirt. Warm spring light.",
            "Confident stride. Eyes appreciating the spring bloom. The walk of someone who earned this. Warm light on his face."),
        img("v11-s2", "University — Presenting in German",
            "A young Malayali man in his early 20s standing at the front of a German university seminar room, speaking to an audience (blurred). A presentation screen behind him. He speaks German with confidence and clarity. Professional but relaxed. Button-up shirt.",
            "Clear confident speaking. Hand gestures emphasizing points. Engaged expression. The payoff of years of language learning."),
        img("v11-s3", "Good Grades",
            "Close-up. Hands holding a university transcript or result sheet on a desk. Good marks visible (no specific readable text needed). The familiar German textbook from Kerala is beside it on the desk. The notebook. A cup of chai. Warm lighting. Just the objects — the journey in objects.",
            "Hands steady on the paper. A moment of stillness. Achievement measured in a simple document. The textbook that started it all beside it."),
        img("v11-s4", "Video Call — Showing the City",
            "A young Malayali man in his early 20s on a German street in spring, holding his phone out in selfie mode for a video call. He is showing the street behind him to someone on the call — pointing at buildings, the spring trees, the tram. His expression is excited and proud. Casual clothes. Beautiful German street.",
            "Turning the phone to show the city. Pointing at things. Excited narration. The pride of showing family where he lives now."),
        img("v11-s5", "Kerala Restaurant in Germany",
            "A young Malayali man in his early 20s sitting in a small Indian/Kerala restaurant in Germany. A plate of Kerala food in front of him — sadya or biryani. He eats with his hands, the Kerala way. His expression is nostalgic and happy — taste of home in a foreign land. Warm restaurant lighting. Casual clothes.",
            "Eating with the hands, Kerala style. Eyes closing briefly at a familiar taste. Small satisfied smile. Home in a plate."),
        img("v11-s6", "Notebook — German and Malayalam",
            "Close-up of an open notebook on a desk. The page shows writing in both German and Malayalam script — notes, thoughts, mixing both languages naturally. A pen rests across the page. The German textbook from Kerala visible nearby. Desk lamp. The visual representation of living in two languages.",
            "Gentle pen movement adding a word. The two scripts side by side on one page. Stillness. Beautiful visual metaphor."),
        img("v11-s7", "Train Station — Planning a Trip Home",
            "A young Malayali man in his early 20s standing in a German train station, looking at the departure board. He holds his phone — booking a flight home. His expression is excited and emotional — he is going back to visit. Casual clothes. Grand European station architecture.",
            "Looking up at the departure board. Glancing at his phone. A big genuine smile forming. The excitement of going home after making it."),
        img("v11-s8", "Plane — Window Seat",
            "A young Malayali man in his early 20s sitting in a plane, looking out the window. Clouds and sunlight. His expression is peaceful and emotional — going home changed, grown, proud. He rests his head against the window slightly. Casual clothes.",
            "Watching the clouds. Peaceful expression. A tiny tear at the corner of his eye. Resting against the window. The emotion of return."),
        img("v11-s9", "Kerala Airport — Arrival",
            "A young Malayali man in his early 20s walking through a Kerala airport arrivals gate. His expression is overwhelmed with emotion — he is home. The warm Kerala light pours in. He walks faster, searching for familiar faces. Casual clothes. Suitcase.",
            "Walking faster. Scanning the crowd. Breaking into a smile. The warmth and color of Kerala after months of German gray."),
        img("v11-s10", "Family Reunion",
            "A young Malayali man in his early 20s standing outside the Kerala airport, embracing someone — just arms and shoulders visible of the other person. His expression is pure joy and relief. Warm Kerala sunlight. The green of Kerala visible behind. The moment of coming home.",
            "Tight embrace. Closed eyes. The release of months of distance. Genuine emotion. Kerala warmth."),
        img("v11-s11", "Kerala Veranda — Full Circle",
            "A young Malayali man in his early 20s sitting on the familiar Kerala veranda steps — the same veranda from Video 2. But now he has the German textbook, a German novel, and his university notebook. Morning light, palm trees. He sits exactly where he sat on day one. But everything is different now. White cotton shirt.",
            "Looking at the familiar garden. Touching the old veranda step. Looking down at the German textbook that started it all. A full-circle moment. Small emotional smile."),
        img("v11-s12", "Veranda — Looking Forward",
            "A young Malayali man in his early 20s on the Kerala veranda, morning light. He looks out at the Kerala garden one more time. His expression is calm, grateful, and ready. He has been here before but he is not the same person. A quiet breath. The story continues. White cotton shirt. Final shot.",
            "Long slow breath. Eyes on the horizon. The faintest smile. Head lifting. Ready for whatever comes next. Fade-worthy final moment."),
    ]
}

# ── Assemble and write ──────────────────────────────────────────────────────

manifest["videos"].extend([v8, v9, v10, v11])

with open(MANIFEST, "w") as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)

# Count totals
total_scenes = sum(len(v["scenes"]) for v in manifest["videos"])
total_new = total_scenes - 24  # 24 existing scenes before expansion
total_duration = sum(v.get("duration_target_seconds", 0) for v in manifest["videos"])
print(f"Manifest updated:")
print(f"  Videos: {len(manifest['videos'])}")
print(f"  Total scenes: {total_scenes}")
print(f"  New scenes to generate: {total_new}")
print(f"  Total target duration: {total_duration}s ({total_duration/60:.1f} min)")
print(f"  Est. cost: ~${total_new * 0.18:.2f}")
