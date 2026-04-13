#!/usr/bin/env python3
"""Generate 100 marketing reel prompts across 5 categories."""

import json
from pathlib import Path

STYLE = "Pixar-style 3D animation"
FMT = "9:16 vertical portrait"

prompts = []
n = 0

def add(cat, hook, de, en, desc, veo, dur=6):
    global n
    n += 1
    prompts.append({
        "number": n,
        "category": cat,
        "hook": hook,
        "german": de,
        "english": en,
        "description": desc,
        "veo_prompt": f"{STYLE}. {veo} {FMT}.",
        "duration": dur,
    })

# ═══════════════════════════════════════════════════════════════════════════
# PRONUNCIATION (30) — fun, surprising, useful German words
# ═══════════════════════════════════════════════════════════════════════════

add("pronunciation", "Can you say this?", "Brötchen", "bread roll",
    "The most common bread in Germany",
    "Inside a warm German bakery with golden lighting. A friendly baker says Brötchen slowly and clearly. Close framing. Warm cozy atmosphere.")

add("pronunciation", "Repeat after me", "Entschuldigung", "excuse me",
    "The most useful German word you'll ever learn",
    "A person on a busy German street politely says Entschuldigung to get past someone. Clear pronunciation. European city, afternoon light.")

add("pronunciation", "Try this German word", "Schmetterling", "butterfly",
    "German for butterfly sounds nothing like butterfly!",
    "A beautiful garden with colorful butterflies. A gentle voice says Schmetterling slowly. A butterfly lands on a flower. Warm sunlight, magical.")

add("pronunciation", "Most people can't say this", "Eichhörnchen", "squirrel",
    "The word that breaks every German learner",
    "A cute squirrel on a tree branch in a German park. A voice says Eichhörnchen carefully. Autumn leaves, warm light. Charming and fun.", 8)

add("pronunciation", "Your first German word", "Hallo", "hello",
    "Start here. Just say Hallo.",
    "A friendly person waving at the camera saying Hallo with a warm smile. Simple clean background. Direct and welcoming.")

add("pronunciation", "This means glove", "Handschuh", "glove (hand-shoe)",
    "In German, a glove is literally a hand-shoe. Handschuh!",
    "Close-up of hands putting on winter gloves in a snowy German scene. A voice says Handschuh clearly. Snow falling. The word appears naturally in context.")

add("pronunciation", "German for fridge", "Kühlschrank", "fridge (cool-cabinet)",
    "Kühlschrank = cool cabinet. German logic!",
    "A modern German kitchen. Someone opens a fridge. A voice says Kühlschrank clearly. Clean bright kitchen lighting. The compound word magic of German.")

add("pronunciation", "Say this at dinner", "Guten Appetit", "enjoy your meal",
    "Germans always say this before eating",
    "A dinner table with German food. Hands reaching for food. A warm voice says Guten Appetit. Cozy dining atmosphere, candle light.", 8)

add("pronunciation", "German for airplane", "Flugzeug", "airplane (fly-thing)",
    "Flugzeug literally means fly-thing. Germans keep it simple.",
    "A plane taking off into a beautiful sunset sky. A voice says Flugzeug clearly. Cinematic aviation scene. The beauty of German compound words.")

add("pronunciation", "This means turtle", "Schildkröte", "turtle (shield-toad)",
    "A turtle in German is a shield-toad. Schildkröte!",
    "A cute animated turtle slowly walking through a garden. A voice says Schildkröte. Warm sunlight on green grass. Adorable and educational.")

add("pronunciation", "Say cheers in German", "Prost!", "cheers!",
    "One word. Instant friends at any German bar.",
    "Friends clinking beer glasses together in a German beer garden. Everyone says Prost! together. Golden evening light. Joyful and social.", 8)

add("pronunciation", "German for lightbulb", "Glühbirne", "lightbulb (glow-pear)",
    "A lightbulb is literally a glow-pear in German",
    "A lightbulb turning on in a cozy room. Warm glow illuminating a face. A voice says Glühbirne. The playful logic of German words.")

add("pronunciation", "How to say thank you", "Danke schön", "thank you very much",
    "Danke is good. Danke schön is better.",
    "Someone receiving flowers and saying Danke schön with genuine warmth. Bright natural lighting. Grateful expression. Simple and heartfelt.")

add("pronunciation", "German for hospital", "Krankenhaus", "hospital (sick-house)",
    "Krankenhaus = sick house. Hope you never need this one!",
    "A modern hospital building exterior. Ambulance arriving. A voice says Krankenhaus clearly. Informative, clear, useful vocabulary.")

add("pronunciation", "Say good night", "Gute Nacht", "good night",
    "The last thing you say before sleep in Germany",
    "A cozy German bedroom at night. Warm lamp light. Someone settling into bed. A soft voice says Gute Nacht. Peaceful, warm, sleepy atmosphere.")

add("pronunciation", "German for vacuum cleaner", "Staubsauger", "vacuum (dust-sucker)",
    "A vacuum cleaner is a dust-sucker in German!",
    "Someone vacuuming a German apartment. A voice says Staubsauger with amusement. Clean modern apartment. The hilarious literal translations of German.")

add("pronunciation", "How to count to 3", "Eins, Zwei, Drei", "one, two, three",
    "Your first German numbers",
    "Three fingers counting up. One, two, three. A clear voice says Eins, Zwei, Drei slowly. Clean background. Simple and foundational.", 8)

add("pronunciation", "Say this at the doctor", "Ich bin krank", "I am sick",
    "Three words that could save you in Germany",
    "A person at a doctor's office. They say Ich bin krank to the doctor. Medical setting, warm lighting. Practical and important vocabulary.", 8)

add("pronunciation", "German for birthday", "Geburtstag", "birthday",
    "Geburtstag — the German word for birthday",
    "A birthday cake with candles in a festive German setting. A voice says Geburtstag clearly. Balloons and warm party lighting. Celebratory mood.")

add("pronunciation", "The hardest German sound", "Hörnchen", "croissant (little horn)",
    "The ö sound. This is where it gets real.",
    "A German café with croissants on display. A voice carefully pronounces Hörnchen, emphasizing the ö sound. Warm café lighting. Language challenge content.", 8)

add("pronunciation", "German for train station", "Bahnhof", "train station",
    "You'll hear this word 100 times in Germany",
    "A busy German Hauptbahnhof with trains. Announcements in background. A voice says Bahnhof clearly. The bustle of German public transport.")

add("pronunciation", "Say I love you", "Ich liebe dich", "I love you",
    "Three words. One feeling. In German.",
    "A romantic sunset scene over a German city. Warm golden light. A gentle voice says Ich liebe dich. Emotional, beautiful, simple.", 8)

add("pronunciation", "German for ambulance", "Krankenwagen", "ambulance (sick-car)",
    "An ambulance is a sick-car. Krankenwagen!",
    "An ambulance driving through a German city with lights on. A voice says Krankenwagen. Urban German setting. Sirens faintly audible.")

add("pronunciation", "This word is worldwide", "Kindergarten", "kindergarten (children-garden)",
    "This German word conquered the world",
    "Happy children playing in a garden. Colorful, joyful scene. A voice says Kindergarten. The word that every language borrowed from German.")

add("pronunciation", "German for speed limit", "Geschwindigkeitsbegrenzung", "speed limit",
    "28 letters. One word. Only in German.",
    "An Autobahn scene with cars. A speed limit sign appearing. A voice attempts Geschwindigkeitsbegrenzung slowly. The legendary length of German words.", 8)

add("pronunciation", "Say excuse me formally", "Verzeihen Sie", "forgive me / pardon",
    "More formal than Entschuldigung — use this with older people",
    "An elegant interaction in a formal German setting. A person says Verzeihen Sie politely. Refined atmosphere. The politeness levels of German.", 8)

add("pronunciation", "German for breakfast", "Frühstück", "breakfast (early-piece)",
    "Frühstück — literally an early piece. Germans love breakfast.",
    "A beautiful German breakfast spread — rolls, cheese, cold cuts, eggs, coffee. A voice says Frühstück. Morning light on the table. Appetizing.", 8)

add("pronunciation", "Say where is...?", "Wo ist...?", "where is...?",
    "Two words that will get you anywhere in Germany",
    "A person looking around on a German street. They ask Wo ist der Bahnhof? A helpful passerby points. Practical, essential, real.", 8)

add("pronunciation", "German for ice cream", "Eis", "ice cream",
    "One syllable. Maximum happiness.",
    "A colorful Italian-style ice cream shop (Eisdiele) in Germany. Scoops of ice cream. A happy voice says Eis! Bright summer day. Joy.", 8)

add("pronunciation", "The German R sound", "Rot", "red",
    "The German R comes from the back of the throat",
    "A red rose. Close-up. A voice says Rot, demonstrating the guttural German R. Beautiful visual, clear pronunciation focus. Language technique content.", 8)

# ═══════════════════════════════════════════════════════════════════════════
# POV SCENES (20) — immersive German experiences
# ═══════════════════════════════════════════════════════════════════════════

add("pov", "POV: First morning in Germany", "Guten Morgen", "Good morning",
    "Imagine waking up in Germany for the first time.",
    "POV first-person. Waking up in a German apartment. Eyes opening to unfamiliar ceiling. Window with gray winter light, European rooftops. Opening curtain — German city with snow. A voice says Guten Morgen. Church bells.", 8)

add("pov", "POV: German bakery at 7am", "Ein Brötchen, bitte", "One roll, please",
    "Fresh bread, warm light, your first German order.",
    "POV entering a German bakery. Warm golden light, fresh bread on display. Walking to counter. Baker looks expectantly. A voice says Ein Brötchen bitte. Baker hands over a Brötchen. Warm ambient sounds.", 8)

add("pov", "POV: Christmas market", "Einen Glühwein, bitte", "One mulled wine, please",
    "Lights, snow, Glühwein. Pure magic.",
    "POV walking through a German Christmas market at night. Twinkling lights, wooden stalls, gentle snow. Stopping at a Glühwein stand. Ordering. Receiving a steaming mug. Magical festive atmosphere.", 8)

add("pov", "POV: German train ride", "Ist hier frei?", "Is this seat free?",
    "Your first ride through the German countryside.",
    "POV sitting on a German regional train. Clean modern interior. Window showing German countryside — green fields, villages, church steeples. A voice asks Ist hier frei? Gentle train sounds.", 8)

add("pov", "POV: First snow ever", "Schnee!", "Snow!",
    "When a Malayali sees snow for the first time.",
    "POV looking out German apartment window. Snow starts falling. Excited gasp. Running outside. Looking up at snowflakes. Hands catching snowflakes. A voice says Schnee! with wonder.", 8)

add("pov", "POV: German supermarket", "Wo ist die Milch?", "Where is the milk?",
    "Everything is in German. You can't read anything.",
    "POV walking into a German supermarket. Bright lights. All labels in German. Looking confused at shelves. Picking up a product, squinting. Asking Wo ist die Milch? An employee points. Relief.", 8)

add("pov", "POV: U-Bahn in Berlin", "Nächster Halt...", "Next stop...",
    "Underground, fast, efficient. Welcome to German public transport.",
    "POV standing on a Berlin U-Bahn platform. Train arriving. Stepping in. Doors closing. Watching stations pass. Announcement: Nächster Halt. The rhythm of German city life.", 8)

add("pov", "POV: German beer garden", "Ein Bier, bitte!", "One beer, please!",
    "Summer evening. Trees. Beer. This is Germany.",
    "POV sitting in a German Biergarten under chestnut trees. Golden evening light. Large beer glasses. Ordering Ein Bier bitte. Receiving a huge glass. Prost! Ambient conversation and laughter.", 8)

add("pov", "POV: Autobahn with no speed limit", "Schneller!", "Faster!",
    "200 km/h is normal here.",
    "POV driving on the German Autobahn. Dashboard visible. Speed increasing. Open road. A voice says Schneller! No speed limit sign visible. The thrill and freedom of the Autobahn.", 8)

add("pov", "POV: German university lecture", "Guten Tag, meine Damen und Herren", "Good day, ladies and gentlemen",
    "Your first lecture. Everything is in German. Deep breath.",
    "POV sitting in a large German university lecture hall. Professor at front. Slides in German. Looking around at other students. Professor says Guten Tag meine Damen und Herren. It begins. Nerve-wracking.", 8)

add("pov", "POV: Receiving your German visa", "Visum genehmigt", "Visa approved",
    "The email that changes everything.",
    "POV looking at a laptop screen. An official email arriving. Eyes scanning. The words 'genehmigt' (approved) visible. Hands shaking slightly. A gasp. Then a huge smile. The moment that changed everything.", 8)

add("pov", "POV: Cooking in a German kitchen", "Guten Appetit!", "Enjoy your meal!",
    "Making your first meal in your new German apartment.",
    "POV cooking pasta in a small German kitchen. Modern European stove. Looking through cupboards. Finding plates. Sitting down at the small table. Saying Guten Appetit to yourself. Eating alone but proud.", 8)

add("pov", "POV: Walking in the Black Forest", "Der Schwarzwald", "The Black Forest",
    "Fairy tales were written about this place.",
    "POV walking on a trail through the Black Forest. Tall dark pine trees. Misty atmosphere. Sunlight breaking through. Birdsong. Stepping over roots. A voice whispers Der Schwarzwald. Magical, ancient, deep.", 8)

add("pov", "POV: German sunset from a bridge", "Wunderschön", "Beautiful",
    "The moment you fall in love with Germany.",
    "POV standing on a bridge over a river in a German city at sunset. Golden light on old buildings. River reflecting the sky. A voice says Wunderschön. The moment of belonging. Breathtaking.", 8)

add("pov", "POV: Moving into your WG", "Willkommen!", "Welcome!",
    "Your new roommates. Your new life.",
    "POV opening a door to a German shared apartment. A friendly roommate greeting with Willkommen! Showing the room — small but cozy. A bed, a desk, a window with city view. The start of a new chapter.", 8)

add("pov", "POV: Oktoberfest", "O'zapft is!", "It's tapped!",
    "The world's biggest festival. And you're in it.",
    "POV walking into a massive Oktoberfest tent. Crowds, music, huge beer mugs. Colorful decorations. Sitting down at a long wooden table. Someone shouts O'zapft is! The energy is electric.", 8)

add("pov", "POV: German post office", "Ein Paket nach Indien", "A package to India",
    "Sending your first package home from Germany.",
    "POV at a German post office counter. Handing over a package. Saying Ein Paket nach Indien bitte. The clerk weighs it. Paying. Walking out. Sending love home. Bittersweet.", 8)

add("pov", "POV: First time on ICE train", "Nächster Halt: Berlin", "Next stop: Berlin",
    "300 km/h. Smooth. The future of travel.",
    "POV sitting in a German ICE high-speed train. Sleek modern interior. Countryside blurring past the window at incredible speed. Smooth and quiet. Announcement: Nächster Halt Berlin. Arriving in the capital.", 8)

add("pov", "POV: Studying at night in Germany", "Noch eine Seite...", "One more page...",
    "Late night. Desk lamp. German textbook. You're doing this.",
    "POV at a desk in a small German dorm room at night. Desk lamp on. German textbook open. Coffee mug. A tired voice says Noch eine Seite. Turning the page. The quiet dedication of studying abroad.", 8)

add("pov", "POV: German spring after long winter", "Endlich Frühling!", "Finally spring!",
    "After months of gray, the world comes alive.",
    "POV walking out of a German apartment building into spring sunshine. Trees blooming. People smiling. Warm breeze. A voice says Endlich Frühling! with relief and joy. Colors returning after gray winter.", 8)

# ═══════════════════════════════════════════════════════════════════════════
# MINI LESSONS (20) — practical phrases for real situations
# ═══════════════════════════════════════════════════════════════════════════

add("lesson", "At the café", "Einen Kaffee, bitte", "One coffee, please",
    "Order your first coffee in German",
    "Inside a cozy German café. A person at the counter says Einen Kaffee bitte clearly. Barista nods and prepares espresso. Warm café lighting. Coffee placed on counter. Simple, achievable.", 8)

add("lesson", "Meeting someone new", "Freut mich!", "Nice to meet you!",
    "Two words for every first impression",
    "Two people meeting for the first time. Handshake. One says Freut mich! with a friendly smile. Bright modern setting. Professional but warm.")

add("lesson", "Saying thank you properly", "Vielen Dank!", "Thank you very much!",
    "Danke is fine. Vielen Dank hits different.",
    "A person receiving a kind gesture. They say Vielen Dank with genuine warmth. Close-up grateful expression. Warm lighting. Sincere.")

add("lesson", "Asking for help", "Können Sie mir helfen?", "Can you help me?",
    "The one sentence that will save you",
    "A person looking slightly lost on a German street. Approaches someone and says Können Sie mir helfen? The other person smiles and helps. German city, daytime.", 8)

add("lesson", "At the restaurant", "Die Rechnung, bitte", "The bill, please",
    "Smooth and simple. Like a local.",
    "Inside a German restaurant. A person raises hand slightly and says Die Rechnung bitte. Waiter nods. Evening lighting, European décor.")

add("lesson", "At the pharmacy", "Ich brauche Medizin", "I need medicine",
    "Know this before you need it",
    "A person at a German Apotheke (pharmacy) counter. Green cross sign visible. They say Ich brauche Medizin. Pharmacist listens and helps. Clean, professional setting.", 8)

add("lesson", "Asking the time", "Wie spät ist es?", "What time is it?",
    "Germans live by the clock. Better learn this one.",
    "A person looking at their wrist (no watch) then asking a passerby Wie spät ist es? on a German street. The passerby checks their phone and answers. Daytime, urban.", 8)

add("lesson", "Introducing yourself", "Ich heiße...", "My name is...",
    "Your identity in German. Start here.",
    "A person in a social setting. They smile and say Ich heiße followed by a name. Friendly atmosphere. University or party setting. Warm lighting.", 8)

add("lesson", "At the supermarket checkout", "Eine Tüte, bitte", "A bag, please",
    "Bags aren't free in Germany!",
    "A person at a German supermarket checkout. Groceries on the belt. They say Eine Tüte bitte. Cashier hands over a bag. Bright supermarket. Real everyday German.", 8)

add("lesson", "Apologizing properly", "Es tut mir leid", "I'm sorry",
    "When Entschuldigung isn't enough",
    "A person looking genuinely apologetic. They say Es tut mir leid with sincerity. Close-up on the expression. Warm lighting. Emotional and real.")

add("lesson", "On the phone", "Wer spricht bitte?", "Who is speaking?",
    "German phone etiquette — always identify yourself",
    "A person answering a phone call in a German office. They say Wer spricht bitte? Professional setting. The formality of German phone culture.", 8)

add("lesson", "Asking for directions", "Wo ist der Bahnhof?", "Where is the train station?",
    "Lost? This sentence is your GPS.",
    "A person on a German street looking around. Approaches someone and asks Wo ist der Bahnhof? Person points down the street. Urban German setting. Practical and essential.", 8)

add("lesson", "Saying goodbye", "Tschüss!", "Bye!",
    "Casual, friendly, universal. Just Tschüss!",
    "Friends parting ways on a German street. Waving. One says Tschüss! with a warm smile. Other waves back. Afternoon light. Simple and warm.")

add("lesson", "At the hotel", "Ich habe eine Reservierung", "I have a reservation",
    "Check in like a pro",
    "A person at a hotel reception desk in Germany. Suitcase beside them. They say Ich habe eine Reservierung. Receptionist checks computer and smiles. Elegant lobby.", 8)

add("lesson", "Talking about weather", "Es regnet", "It's raining",
    "Germans love talking about weather. Now you can too.",
    "Rain falling on a German street. A person looking out a window at the rain. Saying Es regnet with a sigh. Cozy indoor lighting contrasting gray outside. Relatable.", 8)

add("lesson", "Saying you don't understand", "Ich verstehe nicht", "I don't understand",
    "The most honest sentence in any language",
    "A person looking confused during a conversation. They say Ich verstehe nicht with an apologetic smile. The other person slows down and explains differently. Understanding and patience.", 8)

add("lesson", "Asking what something costs", "Was kostet das?", "What does that cost?",
    "Shopping in Germany starts with this question",
    "A person at a market stall in Germany pointing at something. They ask Was kostet das? The seller answers. German market atmosphere, colorful produce.", 8)

add("lesson", "Saying you're from India", "Ich komme aus Indien", "I come from India",
    "Pride and identity in one sentence",
    "A social gathering. Someone asks where a person is from. They say Ich komme aus Indien with pride. Smiles and interest from others. Warm social atmosphere.", 8)

add("lesson", "Asking to repeat", "Können Sie das wiederholen?", "Can you repeat that?",
    "The sentence you'll use most as a beginner",
    "A person in a conversation looking slightly confused. They politely say Können Sie das wiederholen? The speaker repeats slower. Understanding forming. Real learning moment.", 8)

add("lesson", "Saying I want to learn German", "Ich möchte Deutsch lernen", "I want to learn German",
    "Say this and watch Germans light up",
    "A person saying Ich möchte Deutsch lernen to a German friend. The friend's face lights up with encouragement. Warm café setting. The beginning of everything.", 8)

# ═══════════════════════════════════════════════════════════════════════════
# CULTURE FACTS (15) — surprising, shareable German knowledge
# ═══════════════════════════════════════════════════════════════════════════

add("fact", "Germany has 3000+ types of bread", "Das Brot", "the bread",
    "More than any country. UNESCO-recognized!",
    "Montage of German breads in a bakery — dark rye, Brötchen, Brezel, Pumpernickel. Camera panning across display. Golden bakery lighting. Narrator says Germany has over three thousand types of bread.", 8)

add("fact", "Sunday = everything closed", "Sonntag", "Sunday",
    "In Germany, almost all shops close on Sunday.",
    "A quiet German city street on Sunday. Closed shutters on shops. Empty peaceful streets. A person walks past looking for open stores. Narrator explains Sunday closing. Church bells.", 8)

add("fact", "Germans return bottles for money", "Das Pfand", "the deposit",
    "The Pfand system — return bottles, get money!",
    "A person putting bottles into a Pfand machine in a supermarket. Machine beeps, prints receipt. Satisfied smile. Narrator explains the deposit system.", 8)

add("fact", "No speed limit on Autobahn", "Die Autobahn", "the highway",
    "Parts of the German Autobahn have NO speed limit.",
    "Cars racing on the German Autobahn. No speed limit sign. Speedometer climbing. Landscape blurring. Narrator explains the famous no-speed-limit zones. Thrilling.", 8)

add("fact", "German is Europe's most spoken language", "Deutsch", "German",
    "100 million native speakers. The biggest in Europe.",
    "A map of Europe highlighting German-speaking countries — Germany, Austria, Switzerland, parts of Belgium and Luxembourg. Narrator states the fact. Educational and impressive.", 8)

add("fact", "Free university in Germany", "Die Universität", "the university",
    "University in Germany is (almost) free. Even for internationals.",
    "A beautiful German university campus. Students walking. Modern buildings. Narrator explains that tuition is nearly free. The opportunity that changes lives.", 8)

add("fact", "Germans separate trash into 6 types", "Der Müll", "the trash",
    "Recycling in Germany is serious business.",
    "A German apartment hallway with color-coded recycling bins. Someone sorting trash carefully. Yellow for plastic, blue for paper, brown for bio. Narrator explains. Germany's recycling culture.", 8)

add("fact", "Punctuality is sacred", "Pünktlichkeit", "punctuality",
    "5 minutes late = you're late. Period.",
    "A clock showing exactly the meeting time. A person arriving right on time. Satisfied nod. Narrator explains German punctuality culture. A ticking clock. Precise.", 8)

add("fact", "Germany has 1500+ types of beer", "Das Bier", "the beer",
    "1500 breweries. Thousands of beers. One Reinheitsgebot.",
    "Montage of different German beers — Weizen, Pilsner, Dunkel, Kölsch. Beer glasses clinking. A Biergarten scene. Narrator states the fact. Golden beer in sunlight.", 8)

add("fact", "Kindergarten is a German word", "Der Kindergarten", "children's garden",
    "This German word is used in every language on Earth.",
    "Happy animated children playing in a garden. Colorful, joyful. Narrator explains that Kindergarten is German and used worldwide. The word that conquered every language.")

add("fact", "German has 3 genders", "der, die, das", "the (m, f, n)",
    "Every noun has a gender. And there are three. Good luck!",
    "Three doors labeled der die das in a hallway. A confused person looking at all three. Which one? Narrator explains the three genders. The comedy and pain of German grammar.", 8)

add("fact", "Schadenfreude has no English translation", "Schadenfreude", "joy from others' misfortune",
    "The Germans have a word for everything. Even this.",
    "A person watching someone else slip on ice and trying not to laugh. The concept visualized. Narrator explains Schadenfreude. A uniquely German concept.", 8)

add("fact", "Germany has the most zoos", "Der Zoo", "the zoo",
    "More zoos than any other country in the world!",
    "A beautiful German zoo with animals. Families visiting. Green spaces. Narrator states that Germany has over 400 zoos — more than any other country. Educational.", 8)

add("fact", "Cash is king in Germany", "Bargeld", "cash",
    "Many German shops still don't accept cards. Bring cash!",
    "A person trying to pay with a card at a small German shop. Shopkeeper shakes head and points to Nur Bargeld sign. The person pulls out cash. Narrator explains Germany's cash culture.", 8)

add("fact", "The Berlin Wall fell in 1989", "Die Mauer", "the wall",
    "35 years ago, a wall divided Germany. Now it unites the world.",
    "The Brandenburg Gate in golden light. Where the wall once stood. People walking freely. Historic photos transitioning to modern day. Narrator tells the story briefly. Powerful.", 8)

# ═══════════════════════════════════════════════════════════════════════════
# MOTIVATION (15) — emotional, aspirational, journey content
# ═══════════════════════════════════════════════════════════════════════════

add("motivation", "The journey starts with one word", "Hallo", "hello",
    "Every German speaker started exactly where you are now.",
    "Emotional cinematic sequence. A person looking at German text nervously. Montage: studying, struggling, gaining confidence. Final: standing confidently in a German city, smiling. Inspirational music. No dialogue.", 8)

add("motivation", "6 months from now", "Ich spreche Deutsch", "I speak German",
    "6 months ago you couldn't say Hallo. Now look at you.",
    "Split narrative: a nervous beginner struggling with German. Transition to the same person months later, chatting confidently at a German café. A voice says Ich spreche Deutsch with quiet pride.", 8)

add("motivation", "Your accent is beautiful", "Akzent", "accent",
    "Your accent isn't a weakness. It's your story.",
    "A person speaking German with a non-native accent. Other people listening with warmth and respect, not judgment. The accent makes it unique and real. Emotional, affirming.", 8)

add("motivation", "Not easy, but worth it", "Es lohnt sich", "It's worth it",
    "The struggle is temporary. Germany is permanent.",
    "Montage of struggle moments — late night study, confusion, loneliness. Then breakthrough moments — understanding, laughing, belonging. A voice says Es lohnt sich. Emotional music.", 8)

add("motivation", "One word at a time", "Schritt für Schritt", "Step by step",
    "You don't need to run. Just keep walking.",
    "Footsteps walking on a path. Each step a German word appears. Slow, steady, accumulating. The path leads to a German city skyline. A voice says Schritt für Schritt. Patient, determined.", 8)

add("motivation", "Imagine telling your family", "Ich hab's geschafft", "I made it",
    "The video call where you tell them you made it.",
    "A person on a video call from Germany. Showing their German apartment, the city outside. Family on screen cheering. Tears and smiles. Ich hab es geschafft. The payoff of sacrifice.", 8)

add("motivation", "The view from the other side", "Deutschland", "Germany",
    "This is what's waiting for you.",
    "Cinematic montage of beautiful Germany — castles, mountains, rivers, cities, Christmas markets, spring gardens. Majestic, aspirational. No words needed. Just beauty. Inspirational music.", 8)

add("motivation", "Every expert was a beginner", "Anfänger", "beginner",
    "Every person speaking fluent German once said their first Hallo too.",
    "A timeline sequence: a child learning to walk, then run. A student learning alphabet, then reading. A German learner saying Hallo, then having full conversations. Growth is the point.", 8)

add("motivation", "German opens doors", "Türen öffnen", "opening doors",
    "90 million speakers. Free universities. Europe's biggest economy.",
    "Doors opening one by one — university, office, apartment, café. Each door represents an opportunity. A confident person walking through them. Germany's opportunities. Aspirational.", 8)

add("motivation", "From dreaming to doing", "Mach es!", "Do it!",
    "Stop dreaming about Germany. Start learning German.",
    "A person lying in bed dreaming about Germany — German cities in thought bubbles. Then sitting up. Picking up their phone. Opening a German learning app. Taking action. A voice says Mach es!", 8)

add("motivation", "Your future self will thank you", "Danke, ich", "Thank you, me",
    "Start today. Your future self is already grateful.",
    "Two versions of the same person — present and future. Future self in Germany, looking back with gratitude. Present self studying. The connection across time. Emotional music.", 8)

add("motivation", "Malayalam to Deutsch", "Von Malayalam zu Deutsch", "From Malayalam to German",
    "If you learned one of the hardest languages as a child, German is possible.",
    "Malayalam script transitioning beautifully into German script. Two complex beautiful languages. A voice says From Malayalam to Deutsch — you can do this. Cultural pride meets new ambition.", 8)

add("motivation", "The first step is the hardest", "Der erste Schritt", "The first step",
    "After the first step, everything gets easier.",
    "A person standing at the edge of something — a doorway, a path, a starting line. Taking one step. Then another. Then walking confidently. A voice says Der erste Schritt. The courage to begin.", 8)

add("motivation", "Study abroad changes everything", "Auslandsstudium", "study abroad",
    "You leave as one person. You come back as another.",
    "Airport departure. Plane. New city. New friends. New language. New confidence. A transformation montage. Inspirational, cinematic. The life-changing power of studying abroad.", 8)

add("motivation", "You are not alone", "Du bist nicht allein", "You are not alone",
    "Thousands of Indians are learning German right now. You're one of them.",
    "A map showing dots lighting up across India and Kerala — people learning German. Then dots appearing across Germany — Indians who made it. Connection across distance. Community. A voice says Du bist nicht allein.", 8)


# ═══════════════════════════════════════════════════════════════════════════

Path("scripts/marketing-prompts.json").write_text(
    json.dumps(prompts, indent=2, ensure_ascii=False)
)

cats = {}
for p in prompts:
    cats[p["category"]] = cats.get(p["category"], 0) + 1

print(f"Generated {len(prompts)} prompts:")
for cat, count in sorted(cats.items()):
    print(f"  {cat}: {count}")
est_cost = sum(p["duration"] * VEO_USD_PER_SECOND for p in prompts)
print(f"Estimated Veo cost: ${est_cost:.2f}")

VEO_USD_PER_SECOND = 0.035
