import type { Module } from '../types';

export const MODULE_12: Module = {
  id: 12,
  title: "Hobbies & Free Time",
  titleGerman: "Freizeit",
  description: "Talk about your hobbies, the weather, and making plans with friends — basically your social survival kit for Germany!",
  icon: "🎮",
  color: "#84cc16",
  totalHours: 8,
  unlockRequirement: "Complete Module 11",
  lessons: [
    // ─── Lesson 12-1: Hobbies ────────────────────────────────────────
    {
      id: "12-1",
      title: "Hobbies",
      titleGerman: "Hobbys",
      description: "Learn to talk about your favourite hobbies and activities in German — from Fußball to Cricket, reading to reels scrolling! Ninte hobby enth aanu?",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v12-1-1",
          title: "Was machst du gern? - Hobbies",
          duration: "12:00",
          description: "Express your likes and dislikes using 'gern' and 'nicht gern' with hobby vocabulary — ithu easy aanu machaa!",
          scriptOutline: [
            "Opening: 'Was machst du in deiner Freizeit? — Let's talk hobbies! Ella Malayali-kkum hobbies undallo?'",
            "The magic word 'gern': Ich lese gern (I like to read) — 'gern' verb-nu shesham varum",
            "'nicht gern' for dislikes: Ich koche nicht gern (I don't like to cook) — athum easy thanne!",
            "Common hobbies: lesen, kochen, tanzen, reisen, fotografieren, malen, singen",
            "Digital age hobbies: Videospiele spielen, im Internet surfen, Podcasts hören",
            "Asking someone: 'Was machst du gern?' / 'Was sind deine Hobbys?' — ithu ninte go-to question aanu",
            "Practice: Describe 3 things you like and 2 you don't — 'Ich schwimme gern, aber ich koche nicht gern'",
            "Kerala connection: 'Ich höre gern Malayalam-Musik!' — Imagine telling your German flatmate!",
            "Cultural note: Germans take hobbies very seriously — they join 'Vereine' (clubs) for everything!",
            "Fun fact: Cricket hobby explain cheyyumbol — 'Es ist wie Baseball, aber viel besser!' ennu parayaam",
            "Quick recap: gern = like, nicht gern = don't like, verb + gern = you enjoy doing it"
          ],
          keyVocabulary: ["gern", "nicht gern", "die Freizeit", "das Hobby", "der Verein"],
          learningObjectives: [
            "Use 'gern' and 'nicht gern' to express likes and dislikes",
            "Name at least 8 common hobbies in German",
            "Ask and answer questions about hobbies"
          ],
          placeholderThumbnail: "/images/thumbnails/hobbies.jpg"
        },
        {
          id: "v12-1-2",
          title: "Sports & Activities",
          duration: "12:00",
          description: "Learn sports vocabulary — including the sports Malayalis love! Cricket muthal Fußball vare, ellaam German-il padikkaam!",
          scriptOutline: [
            "Opening: 'Fußball, Cricket, or Yoga? Let's learn sports in German! Adipoli sports vocab varunnu!'",
            "der Fußball — THE sport in Germany (like Cricket in India! Germans are CRAZY about it)",
            "das Schwimmen, das Joggen, das Yoga — popular activities in Germany",
            "das Cricket — 'In Indien spielt jeder Cricket' — explain to your German friends!",
            "Verbs: spielen (to play), schwimmen (to swim), laufen (to run), wandern (to hike)",
            "Sentence building: Ich spiele gern Fußball / Ich schwimme gern / Ich wandere gern",
            "Asking: 'Treibst du Sport?' (Do you do sports?) — gym, yoga, running ellaam 'Sport' aanu",
            "Kerala sports connection: Boat race = Bootsrennen, Kabaddi — how to explain them in German!",
            "Onam connection: 'Während Onam spielen wir viele Spiele' — Vadamvali (tug of war) = Tauziehen!",
            "Fun comparison: IPL cricket watching as a hobby — 'Ich schaue gern Cricket im Fernsehen'",
            "Germans and hiking: 'Wandern' is basically a national hobby — like how Malayalis love road trips!",
            "Wrap-up: 'Sport treiben' vs 'Sport spielen' — when to use which"
          ],
          keyVocabulary: ["der Fußball", "schwimmen", "Sport treiben", "spielen", "wandern"],
          learningObjectives: [
            "Name sports and physical activities in German",
            "Use 'spielen' and activity verbs correctly",
            "Talk about your favourite sports",
            "Explain Indian sports like Cricket and Kabaddi in German"
          ],
          placeholderThumbnail: "/images/thumbnails/sports.jpg"
        }
      ],
      exercises: [
        {
          id: "ex12-1-1",
          type: "fill-blank",
          question: "Complete: Ich spiele _____ Fußball. (I like playing football.)",
          options: ["gern", "nicht", "gut", "viel"],
          correctAnswer: "gern",
          explanation: "'Gern' (gladly/with pleasure) is placed after the verb to express that you like doing something.",
          xpReward: 10
        },
        {
          id: "ex12-1-2",
          type: "multiple-choice",
          question: "How do you say 'I don't like cooking' in German?",
          options: ["Ich koche nicht gern.", "Ich koche gern nicht.", "Ich nicht koche gern.", "Ich gern koche nicht."],
          correctAnswer: "Ich koche nicht gern.",
          explanation: "'Nicht gern' goes after the verb: Ich koche nicht gern.",
          xpReward: 10
        },
        {
          id: "ex12-1-3",
          type: "matching",
          question: "Match the hobby to its German translation:",
          options: ["reading", "travelling", "dancing", "cooking"],
          correctAnswer: ["lesen", "reisen", "tanzen", "kochen"],
          xpReward: 15
        },
        {
          id: "ex12-1-4",
          type: "multiple-choice",
          question: "What does 'Treibst du Sport?' mean?",
          options: ["Do you do sports?", "Do you play football?", "Do you like sports?", "Are you sporty?"],
          correctAnswer: "Do you do sports?",
          explanation: "'Sport treiben' means to do/practice sports. 'Treibst du Sport?' asks if someone does sports.",
          xpReward: 10
        },
        {
          id: "ex12-1-5",
          type: "ordering",
          question: "Put this sentence in the correct order: 'I like listening to music.'",
          options: ["gern", "Ich", "Musik", "höre"],
          correctAnswer: ["Ich", "höre", "gern", "Musik"],
          xpReward: 15
        },
        {
          id: "ex12-1-6",
          type: "fill-blank",
          question: "Complete: Was machst du in deiner _____? (What do you do in your free time?)",
          options: ["Freizeit", "Arbeit", "Schule", "Zeit"],
          correctAnswer: "Freizeit",
          explanation: "'Freizeit' means free time / leisure time.",
          xpReward: 10
        },
        {
          id: "ex12-1-7",
          type: "multiple-choice",
          question: "Which sentence correctly says 'I like swimming'?",
          options: ["Ich schwimme gern.", "Ich gern schwimme.", "Ich schwimmen gern.", "Gern ich schwimme."],
          correctAnswer: "Ich schwimme gern.",
          explanation: "The verb comes in second position, conjugated for 'ich' (schwimme), and 'gern' follows the verb.",
          xpReward: 10
        },
        {
          id: "ex12-1-8",
          type: "fill-blank",
          question: "Complete: Mein Hobby _____ Fotografieren. (My hobby is photography.)",
          options: ["ist", "sind", "hat", "bin"],
          correctAnswer: "ist",
          explanation: "'Mein Hobby' is singular, so we use 'ist' (is). 'Mein Hobby ist Fotografieren.'",
          xpReward: 10
        }
      ],
      vocabulary: [
        { id: "vocab12-1-1", german: "das Hobby", english: "hobby", malayalam: "ഹോബി", pronunciation: "ho-bee", example: "Mein Hobby ist Lesen.", exampleTranslation: "My hobby is reading." },
        { id: "vocab12-1-2", german: "lesen", english: "to read", malayalam: "വായിക്കുക", pronunciation: "ley-zen", example: "Ich lese gern Romane.", exampleTranslation: "I like reading novels." },
        { id: "vocab12-1-3", german: "kochen", english: "to cook", malayalam: "പാചകം ചെയ്യുക", pronunciation: "kokh-en", example: "Meine Mutter kocht gern.", exampleTranslation: "My mother likes cooking." },
        { id: "vocab12-1-4", german: "schwimmen", english: "to swim", malayalam: "നീന്തുക", pronunciation: "shvim-men", example: "Im Sommer schwimme ich oft.", exampleTranslation: "In summer I swim often." },
        { id: "vocab12-1-5", german: "der Fußball", english: "football / soccer", malayalam: "ഫുട്ബോൾ", pronunciation: "foos-bal", example: "Fußball ist sehr beliebt in Deutschland.", exampleTranslation: "Football is very popular in Germany." },
        { id: "vocab12-1-6", german: "Musik hören", english: "to listen to music", malayalam: "സംഗീതം കേൾക്കുക", pronunciation: "moo-zeek huh-ren", example: "Ich höre gern Musik.", exampleTranslation: "I like listening to music." },
        { id: "vocab12-1-7", german: "tanzen", english: "to dance", malayalam: "നൃത്തം ചെയ്യുക", pronunciation: "tan-tsen", example: "Am Wochenende gehen wir tanzen.", exampleTranslation: "On the weekend we go dancing." },
        { id: "vocab12-1-8", german: "reisen", english: "to travel", malayalam: "യാത്ര ചെയ്യുക", pronunciation: "ry-zen", example: "Ich reise gern nach Europa.", exampleTranslation: "I like travelling to Europe." },
        { id: "vocab12-1-9", german: "fotografieren", english: "to take photos", malayalam: "ഫോട്ടോ എടുക്കുക", pronunciation: "fo-to-gra-fee-ren", example: "Sie fotografiert gern Landschaften.", exampleTranslation: "She likes photographing landscapes." },
        { id: "vocab12-1-10", german: "die Freizeit", english: "free time / leisure", malayalam: "ഒഴിവു സമയം", pronunciation: "fry-tsyt", example: "Was machst du in deiner Freizeit?", exampleTranslation: "What do you do in your free time?" }
      ]
    },

    // ─── Lesson 12-2: Weather & Seasons ──────────────────────────────
    {
      id: "12-2",
      title: "Weather & Seasons",
      titleGerman: "Wetter und Jahreszeiten",
      description: "Talk about the weather and seasons in German — and discover how different Germany's climate is from Kerala! Mazha allenkil snow, Germany-il ellaam undu machaa!",
      duration: "55 min",
      xpReward: 140,
      videos: [
        {
          id: "v12-2-1",
          title: "Wie ist das Wetter? - Weather in Germany",
          duration: "12:00",
          description: "Master weather vocabulary and learn about Germany's four distinct seasons — quite the shock after Kerala's eternal summer!",
          scriptOutline: [
            "Opening: 'Wie ist das Wetter? — Spoiler: In Germany, it changes A LOT! Kerala-de monsoon pole alla!'",
            "Basic weather: Es regnet (it's raining), Es schneit (it's snowing!) — Snow! Nammude swapnam!",
            "Es ist sonnig / bewölkt / windig / kalt / warm / heiß — daily weather words",
            "Temperature talk: 'Es ist 5 Grad' / 'Es ist minus 10 Grad' — yes, MINUS!",
            "Kerala vs Germany: 'In Kerala regnet es im Monsun. In Deutschland... regnet es einfach immer!' Haha!",
            "Monsoon parallel: Kerala monsoon = 3-4 months of rain. German weather = unpredictable every day!",
            "The four seasons: der Frühling, der Sommer, der Herbst, der Winter — naalum different aanu",
            "'Im Winter ist es sehr kalt in Deutschland' — minus degrees! No more lungi weather machaa!",
            "der Frühling: flowers bloom, everyone gets happy (like Onam season mood! Pookalam-de season!)",
            "der Sommer: 30°C feels like a heatwave for Germans (Malayalis: 'Athu namukku winter aanu!')",
            "der Herbst: beautiful colours, leaves falling, getting colder — Instagram-nu adipoli season!",
            "der Winter: SNOW! Very cold. You'll need a Winterjacke! First snow kaanumbol nee excited aakum!"
          ],
          keyVocabulary: ["das Wetter", "Es regnet", "Es schneit", "der Frühling", "der Winter"],
          learningObjectives: [
            "Describe the weather using 'Es ist...' and 'Es...'",
            "Name all four seasons in German",
            "Compare German and Kerala weather/climate"
          ],
          placeholderThumbnail: "/images/thumbnails/weather.jpg"
        },
        {
          id: "v12-2-2",
          title: "Talking About Favourite Seasons & Activities",
          duration: "10:00",
          description: "Link weather and seasons to activities — what do Germans do in each season? Onam muthal Christmas vare, seasonal vibes padikkaam!",
          scriptOutline: [
            "Opening: 'Jede Jahreszeit hat etwas Besonderes! — Every season has something special, just like Kerala!'",
            "Im Frühling gehe ich gern spazieren — spring walks are a German tradition, like our evening nadakkal!",
            "Im Sommer schwimme ich gern — summer = pool time, beach time, Biergarten time!",
            "Im Herbst trinke ich gern heißen Tee — autumn is cozy chai time, just like monsoon + chaya in Kerala!",
            "Im Winter baue ich einen Schneemann — building snowmen! Nammude childhood dream!",
            "Seasonal Kerala parallels: Onam = Herbst time, Vishu = Frühling time! Calendar connect cheyyaam!",
            "Asking: 'Welche Jahreszeit magst du am liebsten?' — Which season do you like best?",
            "Answering: 'Am liebsten mag ich den Sommer, weil es warm ist.' — Practice this pattern!",
            "Weather + feelings: 'Wenn es regnet, lese ich gern' — When it rains, I like reading (monsoon vibes!)",
            "German weather small talk: Germans LOVE talking about the weather! Ithu oru national hobby aanu!",
            "Practice: Describe what you do in your favourite season using 'Im [season] + verb + gern'"
          ],
          keyVocabulary: ["die Jahreszeit", "Im Frühling", "Im Sommer", "spazieren gehen", "der Schneemann"],
          learningObjectives: [
            "Talk about seasonal activities in German",
            "Express your favourite season and give a reason",
            "Use 'Im + season' to describe when you do activities"
          ],
          placeholderThumbnail: "/images/thumbnails/seasons-activities.jpg"
        }
      ],
      exercises: [
        {
          id: "ex12-2-1",
          type: "multiple-choice",
          question: "How do you say 'It's raining' in German?",
          options: ["Es regnet.", "Es schneit.", "Es ist sonnig.", "Es windet."],
          correctAnswer: "Es regnet.",
          explanation: "'Es regnet' means 'It's raining.' 'Regnen' is the verb for 'to rain'.",
          xpReward: 10
        },
        {
          id: "ex12-2-2",
          type: "matching",
          question: "Match the season to its German name:",
          options: ["Spring", "Summer", "Autumn", "Winter"],
          correctAnswer: ["der Frühling", "der Sommer", "der Herbst", "der Winter"],
          xpReward: 15
        },
        {
          id: "ex12-2-3",
          type: "fill-blank",
          question: "Complete: Wie ist das _____ heute? (How is the weather today?)",
          options: ["Wetter", "Wasser", "Woche", "Welt"],
          correctAnswer: "Wetter",
          explanation: "'Wetter' means weather. 'Wie ist das Wetter?' is the standard way to ask about weather.",
          xpReward: 10
        },
        {
          id: "ex12-2-4",
          type: "multiple-choice",
          question: "What does 'Es schneit' mean?",
          options: ["It's snowing", "It's raining", "It's windy", "It's sunny"],
          correctAnswer: "It's snowing",
          explanation: "'Schneien' means 'to snow'. 'Es schneit' = It's snowing — something you'll rarely see in Kerala!",
          xpReward: 10
        },
        {
          id: "ex12-2-5",
          type: "ordering",
          question: "Put the seasons in the correct order starting from spring:",
          options: ["der Winter", "der Herbst", "der Frühling", "der Sommer"],
          correctAnswer: ["der Frühling", "der Sommer", "der Herbst", "der Winter"],
          xpReward: 15
        },
        {
          id: "ex12-2-6",
          type: "fill-blank",
          question: "Complete: Im _____ ist es sehr kalt in Deutschland. (In winter it's very cold in Germany.)",
          options: ["Winter", "Sommer", "Frühling", "Herbst"],
          correctAnswer: "Winter",
          explanation: "'Im Winter' means 'in winter'. German winters can reach well below 0°C!",
          xpReward: 10
        },
        {
          id: "ex12-2-7",
          type: "multiple-choice",
          question: "How would you say 'In summer I like swimming' in German?",
          options: ["Im Sommer schwimme ich gern.", "Im Sommer ich schwimme gern.", "Sommer ich gern schwimme.", "Im Sommer gern ich schwimme."],
          correctAnswer: "Im Sommer schwimme ich gern.",
          explanation: "When a sentence starts with a time expression like 'Im Sommer', the verb stays in second position and the subject moves after it (inversion).",
          xpReward: 15
        },
        {
          id: "ex12-2-8",
          type: "matching",
          question: "Match the weather description to its meaning:",
          options: ["Es ist heiß.", "Es ist windig.", "Es ist bewölkt.", "Es ist neblig."],
          correctAnswer: ["It's hot.", "It's windy.", "It's cloudy.", "It's foggy."],
          xpReward: 15
        }
      ],
      vocabulary: [
        { id: "vocab12-2-1", german: "das Wetter", english: "weather", malayalam: "കാലാവസ്ഥ", pronunciation: "vet-ter", example: "Wie ist das Wetter heute?", exampleTranslation: "How is the weather today?" },
        { id: "vocab12-2-2", german: "Es regnet", english: "It's raining", malayalam: "മഴ പെയ്യുന്നു", pronunciation: "es reyg-net", example: "Es regnet den ganzen Tag.", exampleTranslation: "It's raining the whole day." },
        { id: "vocab12-2-3", german: "Es schneit", english: "It's snowing", malayalam: "മഞ്ഞ് പെയ്യുന്നു", pronunciation: "es shnyt", example: "Im Dezember schneit es oft.", exampleTranslation: "In December it often snows." },
        { id: "vocab12-2-4", german: "sonnig", english: "sunny", malayalam: "വെയിലുള്ള", pronunciation: "zon-ikh", example: "Heute ist es sonnig und warm.", exampleTranslation: "Today it is sunny and warm." },
        { id: "vocab12-2-5", german: "bewölkt", english: "cloudy", malayalam: "മേഘാവൃതമായ", pronunciation: "beh-vulkt", example: "Es ist bewölkt, aber es regnet nicht.", exampleTranslation: "It's cloudy, but it's not raining." },
        { id: "vocab12-2-6", german: "kalt", english: "cold", malayalam: "തണുപ്പ്", pronunciation: "kalt", example: "Im Winter ist es sehr kalt.", exampleTranslation: "In winter it is very cold." },
        { id: "vocab12-2-7", german: "der Frühling", english: "spring", malayalam: "വസന്തം", pronunciation: "fry-ling", example: "Im Frühling blühen die Blumen.", exampleTranslation: "In spring the flowers bloom." },
        { id: "vocab12-2-8", german: "der Sommer", english: "summer", malayalam: "വേനൽക്കാലം", pronunciation: "zom-mer", example: "Der Sommer in Deutschland ist angenehm.", exampleTranslation: "Summer in Germany is pleasant." },
        { id: "vocab12-2-9", german: "der Herbst", english: "autumn / fall", malayalam: "ശരത്കാലം", pronunciation: "herpst", example: "Im Herbst werden die Blätter bunt.", exampleTranslation: "In autumn the leaves become colourful." },
        { id: "vocab12-2-10", german: "der Winter", english: "winter", malayalam: "ശീതകാലം", pronunciation: "vin-ter", example: "Der Winter dauert von Dezember bis Februar.", exampleTranslation: "Winter lasts from December to February." }
      ]
    },

    // ─── Lesson 12-3: Making Plans with Friends ──────────────────────
    {
      id: "12-3",
      title: "Making Plans with Friends",
      titleGerman: "Pläne mit Freunden machen",
      description: "Learn to suggest, accept, and decline plans in German — the social survival kit! Friends-ne koode plan cheyyaan padikkaam, katta set aakaam!",
      duration: "55 min",
      xpReward: 140,
      videos: [
        {
          id: "v12-3-1",
          title: "Hast du Lust? - Making Plans",
          duration: "12:00",
          description: "Master the art of suggesting plans, agreeing enthusiastically, and declining politely in German — social life unlock cheyyaam!",
          scriptOutline: [
            "Opening: 'Hast du Lust, Deutsch zu lernen? — Of course you do! Ippo plans make cheyyaan padikkaam!'",
            "Suggesting plans: 'Hast du Lust, ins Kino zu gehen?' (Do you feel like going to the cinema?)",
            "Structure breakdown: Hast du Lust, + zu + infinitive? — ithu memorize cheyyuka machaa!",
            "'Wollen wir...?' — Shall we...? 'Wollen wir essen gehen?' — simple and natural",
            "'Lass uns...!' — Let's...! 'Lass uns Pizza bestellen!' — casual and friendly",
            "Agreeing: 'Ja, gern!' / 'Super Idee!' / 'Klar!' / 'Na klar!' / 'Auf jeden Fall!'",
            "Declining politely: 'Leider kann ich nicht.' / 'Ich habe keine Zeit.' — very important!",
            "'Vielleicht nächstes Mal.' — Maybe next time (the polite brush-off — nammude 'pinnee nokkaam' pole!)",
            "Setting details: 'Wann?' (When?) / 'Wo?' (Where?) / 'Um wie viel Uhr?' (At what time?)",
            "'Wir treffen uns um 18 Uhr am Bahnhof.' — We'll meet at 6 PM at the station.",
            "Kerala parallel: Like planning a Katta — but Germans actually come ON TIME! IST vs German punctuality!",
            "Practice dialogue: Plan a movie night with a friend step by step"
          ],
          keyVocabulary: ["Hast du Lust?", "Wollen wir...?", "Lass uns...!", "Leider", "treffen"],
          learningObjectives: [
            "Suggest plans using three different structures",
            "Accept invitations enthusiastically",
            "Decline politely without being rude",
            "Set time and place for meeting up"
          ],
          placeholderThumbnail: "/images/thumbnails/making-plans.jpg"
        },
        {
          id: "v12-3-2",
          title: "Weekend Plans & Going Out",
          duration: "10:00",
          description: "Learn to talk about weekend activities and going-out plans — from Kino to Kneipe, weekend vibes full aanu!",
          scriptOutline: [
            "Opening: 'Was machst du am Wochenende? — The weekend question! Ella Friday-yum ithu chodichal mathi!'",
            "Weekend vocabulary: das Wochenende, am Samstag, am Sonntag — weekend = sacred time in Germany",
            "Going-out places: ins Kino (cinema), ins Restaurant, in die Kneipe (pub), in den Park",
            "Preposition magic: 'in + das = ins' — 'Wir gehen ins Kino' vs 'Wir gehen in den Park'",
            "'Was machst du am Wochenende?' — The most common Friday question in Germany!",
            "Typical answers: 'Ich gehe ins Kino' / 'Ich bleibe zu Hause' / 'Ich treffe Freunde'",
            "Kerala weekend vs German weekend: Sunday shops closed in Germany! No last-minute shopping machaa!",
            "Cricket match watching plans: 'Wollen wir am Sonntag Cricket schauen?' — for your Indian friend group!",
            "Making group plans: 'Wir könnten...' (We could...) — for bigger friend groups",
            "Confirming plans: 'Alles klar!' / 'Bis dann!' / 'Bis Samstag!' — conversation closers",
            "Practice: Make a weekend plan using today's vocabulary"
          ],
          keyVocabulary: ["das Wochenende", "ins Kino gehen", "zu Hause bleiben", "Bis dann!"],
          learningObjectives: [
            "Ask about and describe weekend plans",
            "Use correct prepositions with going-out places",
            "Confirm and finalize plans naturally"
          ],
          placeholderThumbnail: "/images/thumbnails/weekend-plans.jpg"
        }
      ],
      exercises: [
        {
          id: "ex12-3-1",
          type: "multiple-choice",
          question: "How do you say 'Do you feel like going to the cinema?' in German?",
          options: ["Hast du Lust, ins Kino zu gehen?", "Willst du Kino?", "Gehst du Kino?", "Kino, ja oder nein?"],
          correctAnswer: "Hast du Lust, ins Kino zu gehen?",
          explanation: "'Hast du Lust, ... zu + infinitive?' is the natural way to suggest plans in German.",
          xpReward: 10
        },
        {
          id: "ex12-3-2",
          type: "matching",
          question: "Match the German response to its meaning:",
          options: ["Ja, gern!", "Leider kann ich nicht.", "Vielleicht nächstes Mal.", "Auf jeden Fall!"],
          correctAnswer: ["Yes, gladly!", "Unfortunately I can't.", "Maybe next time.", "Definitely!"],
          xpReward: 15
        },
        {
          id: "ex12-3-3",
          type: "fill-blank",
          question: "Complete: _____ wir ins Restaurant gehen? (Shall we go to the restaurant?)",
          options: ["Wollen", "Haben", "Sind", "Gehen"],
          correctAnswer: "Wollen",
          explanation: "'Wollen wir...?' means 'Shall we...?' — a common way to suggest activities.",
          xpReward: 10
        },
        {
          id: "ex12-3-4",
          type: "multiple-choice",
          question: "Your friend invites you but you're busy. Which is the MOST polite decline?",
          options: ["Leider kann ich nicht. Ich habe keine Zeit.", "Nein.", "Ich will nicht.", "Das ist langweilig."],
          correctAnswer: "Leider kann ich nicht. Ich habe keine Zeit.",
          explanation: "'Leider' (unfortunately) softens the decline, and giving a reason is polite.",
          xpReward: 10
        },
        {
          id: "ex12-3-5",
          type: "ordering",
          question: "Put this plan-making conversation in order:",
          options: ["Super! Wir treffen uns um 19 Uhr.", "Hast du Lust, essen zu gehen?", "Ja, gern! Wann?", "Um 19 Uhr, passt das?"],
          correctAnswer: ["Hast du Lust, essen zu gehen?", "Ja, gern! Wann?", "Um 19 Uhr, passt das?", "Super! Wir treffen uns um 19 Uhr."],
          xpReward: 20
        },
        {
          id: "ex12-3-6",
          type: "fill-blank",
          question: "Complete: Um wie viel _____ treffen wir uns? (At what time do we meet?)",
          options: ["Uhr", "Zeit", "Tag", "Stunde"],
          correctAnswer: "Uhr",
          explanation: "'Um wie viel Uhr?' means 'At what time?' — 'Uhr' here means o'clock.",
          xpReward: 10
        },
        {
          id: "ex12-3-7",
          type: "multiple-choice",
          question: "Which phrase means 'Let's order pizza!'?",
          options: ["Lass uns Pizza bestellen!", "Wir Pizza bestellen!", "Pizza wir bestellen!", "Bestellen Pizza uns!"],
          correctAnswer: "Lass uns Pizza bestellen!",
          explanation: "'Lass uns + infinitive' means 'Let's + verb'. The infinitive goes to the end.",
          xpReward: 10
        },
        {
          id: "ex12-3-8",
          type: "fill-blank",
          question: "Complete: Was machst du am _____? (What are you doing on the weekend?)",
          options: ["Wochenende", "Wochentag", "Mittwoch", "Abend"],
          correctAnswer: "Wochenende",
          explanation: "'Am Wochenende' means 'on the weekend'. This is the most common Friday question in Germany!",
          xpReward: 10
        }
      ],
      vocabulary: [
        { id: "vocab12-3-1", german: "Hast du Lust?", english: "Do you feel like it?", malayalam: "നിനക്ക് താൽപ്പര്യമുണ്ടോ?", pronunciation: "hast doo loost", example: "Hast du Lust, ins Kino zu gehen?", exampleTranslation: "Do you feel like going to the cinema?" },
        { id: "vocab12-3-2", german: "Wollen wir...?", english: "Shall we...?", malayalam: "നമുക്ക്...?", pronunciation: "vol-len veer", example: "Wollen wir zusammen lernen?", exampleTranslation: "Shall we study together?" },
        { id: "vocab12-3-3", german: "Lass uns...!", english: "Let's...!", malayalam: "നമുക്ക്...!", pronunciation: "las oons", example: "Lass uns Pizza bestellen!", exampleTranslation: "Let's order pizza!" },
        { id: "vocab12-3-4", german: "Klar!", english: "Sure! / Of course!", malayalam: "തീർച്ചയായും!", pronunciation: "klar", example: "Kommst du mit? — Klar!", exampleTranslation: "Are you coming along? — Sure!" },
        { id: "vocab12-3-5", german: "Leider kann ich nicht.", english: "Unfortunately I can't.", malayalam: "നിർഭാഗ്യവശാൽ എനിക്ക് കഴിയില്ല.", pronunciation: "ly-der kan ikh nikht", example: "Leider kann ich nicht, ich muss arbeiten.", exampleTranslation: "Unfortunately I can't, I have to work." },
        { id: "vocab12-3-6", german: "Ich habe keine Zeit.", english: "I don't have time.", malayalam: "എനിക്ക് സമയമില്ല.", pronunciation: "ikh hah-be ky-ne tsyt", example: "Tut mir leid, ich habe keine Zeit.", exampleTranslation: "Sorry, I don't have time." },
        { id: "vocab12-3-7", german: "sich treffen", english: "to meet up", malayalam: "കണ്ടുമുട്ടുക", pronunciation: "zikh tre-fen", example: "Wir treffen uns um 18 Uhr.", exampleTranslation: "We're meeting at 6 PM." },
        { id: "vocab12-3-8", german: "Vielleicht nächstes Mal.", english: "Maybe next time.", malayalam: "ഒരുപക്ഷേ അടുത്ത തവണ.", pronunciation: "fee-lykht neykh-stes mahl", example: "Heute nicht, aber vielleicht nächstes Mal.", exampleTranslation: "Not today, but maybe next time." },
        { id: "vocab12-3-9", german: "das Wochenende", english: "weekend", malayalam: "വാരാന്ത്യം", pronunciation: "vokh-en-en-de", example: "Am Wochenende gehe ich ins Kino.", exampleTranslation: "On the weekend I'm going to the cinema." },
        { id: "vocab12-3-10", german: "Auf jeden Fall!", english: "Definitely! / For sure!", malayalam: "തീർച്ചയായും!", pronunciation: "owf yey-den fal", example: "Kommst du zur Party? — Auf jeden Fall!", exampleTranslation: "Are you coming to the party? — Definitely!" }
      ]
    },

    // ─── Lesson 12-4: Invitations ────────────────────────────────────
    {
      id: "12-4",
      title: "Invitations",
      titleGerman: "Einladungen",
      description: "Learn to invite, accept, and decline invitations in German — plus your first taste of 'weil' clauses and preference rankings with gern/lieber/am liebsten! Party invite muthal Onam sadya invite vare!",
      duration: "55 min",
      xpReward: 160,
      videos: [
        {
          id: "v12-4-1",
          title: "Einladungen - Accepting & Declining",
          duration: "12:00",
          description: "Master the art of invitations in German — from birthday parties to dinner invites, with gern/lieber/am liebsten preference magic!",
          scriptOutline: [
            "Opening: 'Du bist eingeladen! — You're invited! Invitations German-il engane handle cheyyaam ennu padikkaam!'",
            "Inviting someone: 'Ich lade dich ein!' / 'Du bist eingeladen!' — formal and informal ways",
            "'Kommst du zu meiner Party?' — Are you coming to my party? Simple and direct!",
            "Accepting: 'Ich komme gern!' / 'Danke für die Einladung!' / 'Super, ich bin dabei!'",
            "Declining: 'Es tut mir leid, ich kann leider nicht kommen.' — always be polite!",
            "Preference scale: gern / lieber / am liebsten — like / prefer / like most of all",
            "'Ich tanze gern, aber ich singe lieber, und am liebsten höre ich Musik.' — see the ranking!",
            "Real life example: 'Ich esse gern Dosa, aber lieber esse ich Biryani, am liebsten esse ich Sadya!'",
            "Kerala parallel: Onam sadya invite — 'Kommst du zu meiner Onam-Feier?' Germans love cultural events!",
            "German parties start on time! Nammude IST (Indian Standard Time) Germany-il work aakilla machaa!",
            "Bringing something: 'Soll ich etwas mitbringen?' — Always offer! Germans appreciate it.",
            "Practice dialogue: Invite a friend to your birthday party and handle both yes and no responses"
          ],
          keyVocabulary: ["einladen", "die Einladung", "gern", "lieber", "am liebsten"],
          learningObjectives: [
            "Invite someone to an event in German",
            "Accept and decline invitations politely",
            "Use gern/lieber/am liebsten to express preferences",
            "Offer to bring something to a gathering"
          ],
          placeholderThumbnail: "/images/thumbnails/invitations.jpg"
        },
        {
          id: "v12-4-2",
          title: "Weil-Clauses: Giving Reasons",
          duration: "12:00",
          description: "Your first subordinate clause! Learn 'weil' (because) to give reasons — verb end-il pokum, athu thanne ithin-de twist!",
          scriptOutline: [
            "Opening: 'Warum lernst du Deutsch? WEIL du schlau bist! — Let's learn 'weil' clauses!'",
            "What is 'weil'? It means 'because' — used to give reasons for things",
            "The BIG grammar rule: After 'weil', the conjugated verb goes to the END of the clause!",
            "Example: 'Ich kann nicht kommen, weil ich arbeiten muss.' — 'muss' goes to the end!",
            "Compare: 'Ich muss arbeiten' (normal) vs 'weil ich arbeiten muss' (weil-clause) — verb jumps!",
            "More examples: 'Ich lerne Deutsch, weil ich in Deutschland studieren möchte.' — 'möchte' at end!",
            "Kerala reason: 'Ich esse gern Biryani, weil es lecker ist.' — Because it's delicious! Adipoli!",
            "Practice pattern: 'Warum...?' + 'Weil...' — Question and answer pairs",
            "'Warum spielst du Cricket?' — 'Weil Cricket der beste Sport ist!' Nammude Cricket love!",
            "Common mistakes: Don't forget — verb MUST go to the end after 'weil'! Ithu important aanu!",
            "Combining with invitations: 'Ich kann nicht kommen, weil ich krank bin.' — decline + reason",
            "Quick drill: Give reasons for 5 everyday things using 'weil' — practice makes perfect!"
          ],
          keyVocabulary: ["weil", "warum", "deshalb", "der Grund"],
          learningObjectives: [
            "Form basic 'weil' (because) clauses with correct verb placement",
            "Give reasons for accepting or declining invitations",
            "Answer 'Warum?' questions with 'weil' clauses"
          ],
          placeholderThumbnail: "/images/thumbnails/weil-clauses.jpg"
        }
      ],
      exercises: [
        {
          id: "ex12-4-1",
          type: "multiple-choice",
          question: "How do you say 'You are invited!' in German?",
          options: ["Du bist eingeladen!", "Du bist einladung!", "Du hast eingeladen!", "Du wirst einladen!"],
          correctAnswer: "Du bist eingeladen!",
          explanation: "'Eingeladen' is the past participle of 'einladen'. 'Du bist eingeladen' = You are invited.",
          xpReward: 10
        },
        {
          id: "ex12-4-2",
          type: "fill-blank",
          question: "Complete: Ich kann nicht kommen, _____ ich arbeiten muss. (I can't come because I have to work.)",
          options: ["weil", "dass", "wenn", "aber"],
          correctAnswer: "weil",
          explanation: "'Weil' means 'because'. After 'weil', the verb moves to the end of the clause.",
          xpReward: 15
        },
        {
          id: "ex12-4-3",
          type: "matching",
          question: "Match the preference level to the correct German word:",
          options: ["like (doing something)", "prefer", "like most of all"],
          correctAnswer: ["gern", "lieber", "am liebsten"],
          xpReward: 15
        },
        {
          id: "ex12-4-4",
          type: "multiple-choice",
          question: "In a 'weil' clause, where does the conjugated verb go?",
          options: ["At the end of the clause", "At the beginning", "In the second position", "It doesn't change"],
          correctAnswer: "At the end of the clause",
          explanation: "In 'weil' clauses, the conjugated verb moves to the end: '...weil ich arbeiten muss' (not 'weil ich muss arbeiten').",
          xpReward: 15
        },
        {
          id: "ex12-4-5",
          type: "ordering",
          question: "Put this sentence in correct order: 'I can't come because I'm sick.'",
          options: ["krank", "weil", "ich", "bin", "Ich kann nicht kommen,"],
          correctAnswer: ["Ich kann nicht kommen,", "weil", "ich", "krank", "bin"],
          xpReward: 20
        },
        {
          id: "ex12-4-6",
          type: "fill-blank",
          question: "Complete: Ich tanze gern, aber ich singe _____. (I like dancing, but I prefer singing.)",
          options: ["lieber", "gern", "am liebsten", "nicht gern"],
          correctAnswer: "lieber",
          explanation: "'Lieber' is the comparative form of 'gern' and means 'prefer' or 'rather'.",
          xpReward: 10
        },
        {
          id: "ex12-4-7",
          type: "multiple-choice",
          question: "How do you politely decline an invitation in German?",
          options: ["Es tut mir leid, ich kann leider nicht kommen.", "Nein, ich komme nicht.", "Ich will nicht.", "Das ist mir egal."],
          correctAnswer: "Es tut mir leid, ich kann leider nicht kommen.",
          explanation: "'Es tut mir leid' (I'm sorry) + 'leider' (unfortunately) makes the decline very polite.",
          xpReward: 10
        },
        {
          id: "ex12-4-8",
          type: "ordering",
          question: "Put this weil-clause in correct order: 'because I want to study in Germany'",
          options: ["möchte", "in", "ich", "weil", "studieren", "Deutschland"],
          correctAnswer: ["weil", "ich", "in", "Deutschland", "studieren", "möchte"],
          xpReward: 20
        }
      ],
      vocabulary: [
        { id: "vocab12-4-1", german: "einladen", english: "to invite", malayalam: "ക്ഷണിക്കുക", pronunciation: "yn-lah-den", example: "Ich lade dich zu meiner Party ein.", exampleTranslation: "I'm inviting you to my party." },
        { id: "vocab12-4-2", german: "die Einladung", english: "invitation", malayalam: "ക്ഷണം", pronunciation: "yn-lah-doong", example: "Danke für die Einladung!", exampleTranslation: "Thank you for the invitation!" },
        { id: "vocab12-4-3", german: "gern", english: "gladly / like to", malayalam: "ഇഷ്ടപ്പെട്ട്", pronunciation: "gern", example: "Ich komme gern!", exampleTranslation: "I'd love to come!" },
        { id: "vocab12-4-4", german: "lieber", english: "rather / prefer", malayalam: "കൂടുതൽ ഇഷ്ടപ്പെട്ട്", pronunciation: "lee-ber", example: "Ich trinke lieber Tee als Kaffee.", exampleTranslation: "I prefer tea over coffee." },
        { id: "vocab12-4-5", german: "am liebsten", english: "most of all / like best", malayalam: "ഏറ്റവും ഇഷ്ടപ്പെട്ട്", pronunciation: "am leeb-sten", example: "Am liebsten esse ich Biryani.", exampleTranslation: "Most of all I like eating Biryani." },
        { id: "vocab12-4-6", german: "weil", english: "because", malayalam: "കാരണം", pronunciation: "vyl", example: "Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.", exampleTranslation: "I'm learning German because I want to work in Germany." },
        { id: "vocab12-4-7", german: "Es tut mir leid.", english: "I'm sorry.", malayalam: "ക്ഷമിക്കണം.", pronunciation: "es toot meer lyt", example: "Es tut mir leid, ich kann nicht kommen.", exampleTranslation: "I'm sorry, I can't come." },
        { id: "vocab12-4-8", german: "die Party", english: "party", malayalam: "പാർട്ടി", pronunciation: "par-tee", example: "Kommst du zu meiner Party am Samstag?", exampleTranslation: "Are you coming to my party on Saturday?" },
        { id: "vocab12-4-9", german: "mitbringen", english: "to bring along", malayalam: "കൊണ്ടുവരിക", pronunciation: "mit-bring-en", example: "Soll ich etwas mitbringen?", exampleTranslation: "Should I bring something?" },
        { id: "vocab12-4-10", german: "Ich bin dabei!", english: "Count me in!", malayalam: "ഞാൻ കൂടെയുണ്ട്!", pronunciation: "ikh bin da-by", example: "Party am Freitag? Ich bin dabei!", exampleTranslation: "Party on Friday? Count me in!" }
      ]
    }
  ]
};
