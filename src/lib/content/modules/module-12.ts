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
  learningTips: [
    "Talk about YOUR hobbies in German — personal relevance makes vocabulary stick 3x faster.",
    "Watch weather forecasts in German on YouTube. Real-world input trains your ears.",
    "Making plans uses the future: 'Am Samstag gehe ich ins Kino.' Practice inviting friends auf Deutsch!",
  ],
  lessons: [
    // ─── Lesson 12-1: Hobbies ────────────────────────────────────────
    {
      id: "12-1",
      title: "Hobbies",
      titleGerman: "Hobbys",
      description: "Learn to talk about your favourite hobbies and activities in German — from Fußball to Cricket, reading to reels scrolling! Ninte hobby enth aanu?",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Main Park (Im Park)",
          sceneType: "station",
          timeOfDay: "afternoon",
          description: "A beautiful sunny Saturday at the city park. Families are picnicking, people are jogging, and a group of youngsters is practicing 'Fußball' (football) nearby. You're here with Arjun, taking in the 'Freizeit' (free time) vibes. In Kerala, a park is for evening snacks, but here, it's where everyone does their 'Hobby'. Whether it's reading or sports, Germans take their leisure time seriously. Ready to join in, machane?",
        },
        narrative: {
          previousRecap: "You've mastered the vocational world. Now, let's look at what helps you relax after work!",
          currentObjective: "Describe your personal hobbies and express likes/dislikes using 'gern'",
          nextTeaser: "Next: The Weather! Let's see if we can handle a German winter!",
        },
        kuttanIntro: [
          "Machane! 'Freizeit' (free time) is sacred in Germany. People wait for the weekend to do what they love. Nammude main tool 'gern' (to like) aanu. 'Ich lese gern' (I like reading).",
          "Germany-yil 'Fußball' (football) is like a religion, similar to Cricket in Kerala. Oru 'Verein' (club) illathe keralam illa, ithengine undallo?",
          "Pinne 'Sport treiben' ennu parayumbol, regular physical activity ennu mean cheyyunnu — gym or jogging. Let's find out what everyone's doing!",
        ],
        vocabEncounters: [
          { vocabId: "vocab12-1-10", encounterMoment: "Arjun exhales: 'Endlich Freizeit!' (Finally free time!).", contextSentence: "Was machst du in deiner Freizeit?" },
          { vocabId: "vocab12-1-1", encounterMoment: "A passerby asks: 'Was ist dein Hobby?' (What is your hobby?).", contextSentence: "Mein Hobby ist Lesen." },
          { vocabId: "vocab12-1-5", encounterMoment: "You watch the game: 'Fußball ist überall!' (Football is everywhere).", contextSentence: "Fußball ist sehr beliebt in Deutschland." },
          { vocabId: "vocab12-1-6", encounterMoment: "Arjun puts on headphones: 'Ich höre gern Musik.' (I like listening to music).", contextSentence: "Ich höre gern Musik." },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'I like swimming'. Where do you place 'gern'?",
            options: [
              { text: "Ich schwimme gern.", isCorrect: true, response: "Exactly! 'gern' goes after the verb.", kuttanReaction: "Adipoli! Word order logic perfectly capture cheythallo! 🔥" },
              { text: "Ich gern schwimme.", isCorrect: false, response: "Aiyyo! In German, 'gern' cannot come before the verb in a standard sentence.", kuttanReaction: "Vite machane! Verb configuration sradhikkanne. Try again! 😬" },
            ],
          },
          {
            moment: "A German friend asks if you want to join a 'Cricket-Verein'. What are they inviting you to?",
            options: [
              { text: "A formal Cricket club.", isCorrect: true, response: "Correct! 'Verein' is a registered club or association.", kuttanReaction: "Superb! German club culture correct aayi pick cheythallo! ⭐" },
              { text: "A casual meeting in the park.", isCorrect: false, response: "No! A 'Verein' implies a formal structure with membership and regular play.", kuttanReaction: "Aiyyo! 'Verein' indicates a formal club. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v12-1-1",
          title: "Was machst du gern? - Hobbies",
          duration: "12:00",
          description: "Express your likes and dislikes using 'gern' and 'nicht gern' with hobby vocabulary — ithu easy aanu machaa!",
          scriptOutline: [
            "Opening: 'Was machst du in deiner Freizeit? — Let's talk hobbies! Ella Malayali-kkum hobbies undallo?'",
            "The magic word 'gern': Ich lese gern (I like to read). 'gern' verb-nu shesham varum.",
            "'nicht gern' for dislikes: Ich koche nicht gern. Simple rejection logic!",
            "Words: lesen, kochen, tanzen, reisen, singen. Common activities stack!",
            "Digital: Videospiele spielen, im internet surfen, Reels scrollen!",
            "Question: 'Was machst du gern?' — Ithu ninte social life-inu go-to query aanu.",
            "Practice: Describe 3 likes and 2 dislikes. 'Ich schwimme gern, aber ich koche nicht gern'.",
            "Kerala: 'Ich höre gern Malayalam-Musik!' — Your flatmate should know!",
            "VEREINE: German clubs logic. Everything-inu oru association undu machane!",
            "Cricket: 'Es ist wie Baseball, aber viel besser!' — explain with pride!",
            "Recap: gern = like, nicht gern = don't like. Verb + gern = enjoy!"
          ],
          keyVocabulary: ["gern", "nicht gern", "die Freizeit", "das Hobby", "der Verein"],
          learningObjectives: [
            "Use 'gern' and 'nicht gern' to express likes and dislikes",
            "Name at least 8 common hobbies in German",
            "Ask and answer questions about hobbies"
          ],
          placeholderThumbnail: "/images/berlin_people.png",
          richContent: [
            {
              type: "table",
              title: "Common Hobbies in German",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["lesen", "reading", "വായിക്കുക"],
                ["kochen", "cooking", "പാചകം ചെയ്യുക"],
                ["tanzen", "dancing", "നൃത്തം ചെയ്യുക"],
                ["reisen", "travelling", "യാത്ര ചെയ്യുക"],
                ["singen", "singing", "പാടുക"],
                ["Musik hören", "listening to music", "സംഗീതം കേൾക്കുക"],
                ["Videospiele spielen", "playing video games", "വീഡിയോ ഗെയിം കളിക്കുക"]
              ]
            },
            {
              type: "table",
              title: "gern vs nicht gern",
              headers: ["Like", "Don't Like"],
              rows: [
                ["Ich lese gern.", "Ich lese nicht gern."],
                ["Ich koche gern.", "Ich koche nicht gern."],
                ["Ich schwimme gern.", "Ich schwimme nicht gern."]
              ]
            },
            {
              type: "note",
              title: "'gern' Goes After the Verb!",
              variant: "tip",
              content: "Place 'gern' right after the verb to say you enjoy doing something: Ich lese gern (I like reading). For dislikes, use 'nicht gern': Ich koche nicht gern (I don't like cooking). Super simple!"
            }
          ]
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
          placeholderThumbnail: "/images/berlin_people.png",
          richContent: [
            {
              type: "table",
              title: "Sports Vocabulary",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["der Fußball", "football/soccer", "ഫുട്ബോൾ"],
                ["das Schwimmen", "swimming", "നീന്തൽ"],
                ["das Joggen", "jogging", "ജോഗിങ്"],
                ["das Yoga", "yoga", "യോഗ"],
                ["das Cricket", "cricket", "ക്രിക്കറ്റ്"],
                ["das Wandern", "hiking", "ഹൈക്കിങ്"],
                ["das Tauziehen", "tug of war", "വടംവലി"]
              ]
            },
            {
              type: "table",
              title: "Sports Verbs & Phrases",
              headers: ["German", "English"],
              rows: [
                ["Ich spiele gern Fußball.", "I like playing football."],
                ["Ich schwimme gern.", "I like swimming."],
                ["Treibst du Sport?", "Do you do sports?"],
                ["Ich schaue gern Cricket.", "I like watching cricket."],
                ["Sport treiben", "to do sports (general)"]
              ]
            },
            {
              type: "note",
              title: "Wandern — The German National Hobby!",
              variant: "info",
              content: "Germans are obsessed with 'Wandern' (hiking). It's like how Malayalis love road trips! There are marked trails everywhere. A great way to make German friends: join a Wanderverein (hiking club)."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex12-1-1",
          type: "fill-blank",
          question: "At the Kerala park, Kuttan points to the football game. Complete: Ich spiele _____ Fußball. (I like playing football.)",
          options: ["gern", "nicht", "gut", "viel"],
          correctAnswer: "gern",
          explanation: "'Gern' (gladly/with pleasure) is placed after the verb to express that you like doing something.",
          xpReward: 10
        },
        {
          id: "ex12-1-2",
          type: "multiple-choice",
          question: "Kuttan is honest after a hostel cooking attempt. How do you say 'I don't like cooking' in German?",
          options: ["Ich koche nicht gern.", "Ich koche gern nicht.", "Ich nicht koche gern.", "Ich gern koche nicht."],
          correctAnswer: "Ich koche nicht gern.",
          explanation: "'Nicht gern' goes after the verb: Ich koche nicht gern.",
          xpReward: 10
        },
        {
          id: "ex12-1-3",
          type: "matching",
          question: "At the Kerala park, Arjun asks about weekend hobbies. Match each hobby to its German translation:",
          options: ["reading", "travelling", "dancing", "cooking"],
          correctAnswer: ["lesen", "reisen", "tanzen", "kochen"],
          xpReward: 15
        },
        {
          id: "ex12-1-4",
          type: "multiple-choice",
          question: "During Goethe Kochi speaking practice, Frau Weber asks: 'Treibst du Sport?' What does she mean?",
          options: ["Do you do sports?", "Do you play football?", "Do you like sports?", "Are you sporty?"],
          correctAnswer: "Do you do sports?",
          explanation: "'Sport treiben' is the idiomatic way to say 'engage in sports'. While you 'play' (spielen) football, you 'practice/do' (treiben) sports in general—like gym, swimming, or yoga.",
          xpReward: 10
        },
        {
          id: "ex12-1-5",
          type: "ordering",
          question: "Put this sentence in the correct order: 'I like listening to music.'",
          options: ["gern", "Ich", "Musik", "höre"],
          correctAnswer: ["Ich", "höre", "gern", "Musik"],
          explanation: "Verb-Second Rule: Subject (Ich) + Verb (höre) + The Quality (gern) + The Object (Musik). Grammatically, the 'gern' describes how you listen.",
          xpReward: 15
        },
        {
          id: "ex12-1-6",
          type: "fill-blank",
          question: "Kuttan asks about your Sunday after class. Complete: Was machst du in deiner _____? (What do you do in your free time?)",
          options: ["Freizeit", "Arbeit", "Schule", "Zeit"],
          correctAnswer: "Freizeit",
          explanation: "Frei (free) + Zeit (time). Simple compound! In Germany, your 'Freizeit' is protected by law—work-life balance is a real thing here.",
          xpReward: 10
        },
        {
          id: "ex12-1-7",
          type: "multiple-choice",
          question: "At the Kerala pool, Arjun wants a clean A1 sentence. Which sentence correctly says 'I like swimming'?",
          options: ["Ich schwimme gern.", "Ich gern schwimme.", "Ich schwimmen gern.", "Gern ich schwimme."],
          correctAnswer: "Ich schwimme gern.",
          explanation: "Conjugation check! For 'Ich', the verb must end in '-e' (schwimme). The word 'gern' cannot come before the verb in a standard statement.",
          xpReward: 10
        },
        {
          id: "ex12-1-8",
          type: "fill-blank",
          question: "Priya shows photos from the Kerala cafe wall. Complete: Mein Hobby _____ Fotografieren. (My hobby is photography.)",
          options: ["ist", "sind", "hat", "bin"],
          correctAnswer: "ist",
          explanation: "When using 'Mein Hobby' (singular), use 'ist'. When listing multiple hobbies ('Meine Hobbys'), use 'sind'.",
          xpReward: 10
        },
        {
          id: "ex12-1-9",
          type: "dictation",
          question: "Kuttan plays a short hobby audio at the Kerala park. Listen and type: Ich spiele gern Fußball.",
          correctAnswer: "Ich spiele gern Fußball",
          explanation: "Great! 'gern' goes after the verb 'spiele'. And don't forget the capital 'F'!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-like-football.mp3"
        },
        {
          id: "ex12-1-10",
          type: "free-text",
          question: "Write in German: 'What is your hobby?'",
          correctAnswer: "Was ist dein Hobby",
          explanation: "Wunderbar! 'Was ist dein Hobby?' is the correct way to ask a friend about their interests.",
          xpReward: 30
        }
      ,
        {
          id: "ex12-1-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Hobbies): 'Am Wochenende spiele ich gern Cricket.'",
          questionGerman: "Sprechen Sie laut: 'Am Wochenende spiele ich gern Cricket.'",
          correctAnswer: "Am Wochenende spiele ich gern Cricket",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
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
      storyScene: {
        setting: {
          name: "WG Balcony (Auf dem Balkon)",
          sceneType: "home",
          timeOfDay: "morning",
          description: "A cold morning in Germany. You step onto the balcony and see your breath for the first time. The sky is grey, but then — something magical! White flakes are falling. It's snowing! You quickly message Arjun: 'Es schneit!'. In Kerala, we have the heavy 'Regen' (rain) during monsoon, but here, the 'Wetter' (weather) changes every hour. Time to learn how to complain about the cold like a real German, machane!",
        },
        narrative: {
          previousRecap: "You've shared your hobbies. Now, let's see which weather suits them best!",
          currentObjective: "Identify various weather conditions and seasons and describe the temperature",
          nextTeaser: "Next: Making plans! Let's see if the rain stops us from going out!",
        },
        kuttanIntro: [
          "Machane! German weather is legendary for being unpredictable. 'Es regnet' (it rains) is most common, but 'Es schneit' (it snows) is the real hero!",
          "Nammude seasons-um Germany-yile 'Jahreszeiten' (seasons) different aanu. Winter-il 0 degrees common aanu. Cold alert is real!",
          "Fun fact: Germans 30 degrees choodayirikumpol 'Es ist heiß!' (it is hot) ennu parayum. Malayalis-inu ithu normal climate aanu. Let's check the forecast!",
        ],
        vocabEncounters: [
          { vocabId: "vocab12-2-1", encounterMoment: "You check the app: 'Wie ist das Wetter?' (How is the weather?).", contextSentence: "Wie ist das Wetter heute?" },
          { vocabId: "vocab12-2-3", encounterMoment: "You shout: 'Es schneit!' (It's snowing!).", contextSentence: "Im Dezember schneit es oft." },
          { vocabId: "vocab12-2-6", encounterMoment: "Arjun replies: 'Ja, es ist sehr kalt.' (Yes, it's very cold).", contextSentence: "Im Winter ist es sehr kalt." },
          { vocabId: "vocab12-2-2", encounterMoment: "You remember home: 'In Kerala regnet es viel.' (In Kerala it rains a lot).", contextSentence: "Es regnet den ganzen Tag." },
        ],
        decisionPoints: [
          {
            moment: "You see the first snow falling. How do you describe it in German?",
            options: [
              { text: "Es schneit.", isCorrect: true, response: "Exactly! 'schneien' is the verb for snowing.", kuttanReaction: "Adipoli! Snow logic perfectly capture cheythallo! ❄️" },
              { text: "Es regnet.", isCorrect: false, response: "Aiyyo! 'Regnen' is rain. Snow logic is 'schneien'.", kuttanReaction: "Vite machane! White powder snow aanu, rain alla. Try again! 😬" },
            ],
          },
          {
            moment: "It's a hot July day, 32°C. How do you describe the temperature?",
            options: [
              { text: "Es ist heiß.", isCorrect: true, response: "Correct! Even for a Malayali, 32°C in Germany feels hot because of the humidity and lack of AC.", kuttanReaction: "Superb! German summer logic correctly picked! ⭐" },
              { text: "Es ist kalt.", isCorrect: false, response: "No! 'kalt' is for winter. 32°C is definitely not cold!", kuttanReaction: "Aiyyo! Kalt logic winter-inu vendi ulla thaannu. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v12-2-1",
          title: "Wie ist das Wetter? - Weather in Germany",
          duration: "12:00",
          description: "Master weather vocabulary and learn about Germany's four distinct seasons — quite the shock after Kerala's eternal summer!",
          scriptOutline: [
            "Opening: 'Wie ist das Wetter? Germany-yil weather unpredictable aanu! Kerala-de monsoon pole alla machane!'",
            "Basics: Es regnet (raining), Es schneit (snowing!). First snow kaanumbol nee excited aakum!",
            "Words: sonnig / bewölkt / windig / kalt / warm / heiß. Daily check essential!",
            "Temp: 'Es ist 5 Grad' / 'Minus 10 Grad'. Winter jacket set aakanam!",
            "Parallel: Kerala-yil monsoon 3 months ulla pole alla, Germany-yil rain eppolum varum!",
            "Seasons: der Frühling, der Sommer, der Herbst, der Winter. Naalum unique aanu.",
            "Winter: 'Im Winter ist es sehr kalt'. No more lungi/shorts weather in the street!",
            "Frühling: Flowers bloom — Pookalam season vibe in full power!",
            "Sommer: 30°C and Germans go crazy. Malayalis: 'Ithu namukku winter aanu!'",
            "Herbst: Leaves color change. Instagram-nu vendi undakkiya season pole!",
            "Winter: SNOW! Christmas markets, cocoa, and pure cold magic."
          ],
          keyVocabulary: ["das Wetter", "Es regnet", "Es schneit", "der Frühling", "der Winter"],
          learningObjectives: [
            "Describe the weather using 'Es ist...' and 'Es...'",
            "Name all four seasons in German",
            "Compare German and Kerala weather/climate"
          ],
          placeholderThumbnail: "/images/german_train_station.png",
          richContent: [
            {
              type: "table",
              title: "Weather Vocabulary",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["Es regnet.", "It's raining.", "മഴ പെയ്യുന്നു."],
                ["Es schneit.", "It's snowing.", "മഞ്ഞ് പെയ്യുന്നു."],
                ["Es ist sonnig.", "It's sunny.", "വെയിലുണ്ട്."],
                ["Es ist bewölkt.", "It's cloudy.", "മേഘാവൃതമാണ്."],
                ["Es ist windig.", "It's windy.", "കാറ്റുണ്ട്."],
                ["Es ist kalt.", "It's cold.", "തണുപ്പാണ്."],
                ["Es ist warm.", "It's warm.", "ചൂടാണ്."]
              ]
            },
            {
              type: "table",
              title: "The Four Seasons",
              headers: ["German", "English", "Months", "Temperature"],
              rows: [
                ["der Frühling", "Spring", "March - May", "5-20°C"],
                ["der Sommer", "Summer", "June - August", "20-35°C"],
                ["der Herbst", "Autumn", "September - November", "5-15°C"],
                ["der Winter", "Winter", "December - February", "-10 to 5°C"]
              ]
            },
            {
              type: "note",
              title: "All Seasons Are Masculine!",
              variant: "tip",
              content: "All four seasons take 'der': der Frühling, der Sommer, der Herbst, der Winter. And yes, German winter can go to -10°C or below — a massive shock for anyone from Kerala's 25°C+ weather!"
            }
          ]
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
          placeholderThumbnail: "/images/kaffeeklatsch.png",
          richContent: [
            {
              type: "table",
              title: "Seasonal Activities",
              headers: ["Season", "German Activity", "English"],
              rows: [
                ["Frühling", "Im Frühling gehe ich gern spazieren.", "In spring I like going for walks."],
                ["Sommer", "Im Sommer schwimme ich gern.", "In summer I like swimming."],
                ["Herbst", "Im Herbst trinke ich gern heißen Tee.", "In autumn I like drinking hot tea."],
                ["Winter", "Im Winter baue ich einen Schneemann.", "In winter I build a snowman."]
              ]
            },
            {
              type: "table",
              title: "Kerala Seasons ↔ German Seasons",
              headers: ["Kerala Event", "Approx. German Season", "German"],
              rows: [
                ["Vishu (April)", "Frühling", "der Frühling"],
                ["Monsoon (June-Sept)", "Sommer/Herbst", "der Sommer"],
                ["Onam (Aug-Sept)", "Herbst", "der Herbst"],
                ["Christmas (Dec)", "Winter", "der Winter"]
              ]
            },
            {
              type: "note",
              title: "Weather = German Small Talk!",
              variant: "info",
              content: "Germans LOVE talking about the weather — it's their #1 small talk topic! 'Schönes Wetter heute!' (Nice weather today!) is the perfect conversation starter. Use 'Im [season] + verb + gern' to talk about what you enjoy in each season."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex12-2-1",
          type: "multiple-choice",
          question: "How do you say 'It's raining' in German?",
          options: ["Es regnet.", "Es schneit.", "Es ist sonnig.", "Es windet."],
          correctAnswer: "Es regnet.",
          explanation: "In German, weather uses the dummy subject 'Es' (it). 'Regnen' is the verb. 'Es regnet' Literally is 'It rains'. Easy to remember for Malayalis because we have so much rain back home!",
          xpReward: 10
        },
        {
          id: "ex12-2-2",
          type: "matching",
          question: "Match the season to its German name:",
          options: ["Spring", "Summer", "Autumn", "Winter"],
          correctAnswer: ["der Frühling", "der Sommer", "der Herbst", "der Winter"],
          explanation: "All four seasons are MASCULINE (der). Mnemonic: 'Seasons are like the kings of the year—always 'der'!",
          xpReward: 15
        },
        {
          id: "ex12-2-3",
          type: "fill-blank",
          question: "Complete: Wie ist das _____ heute? (How is the weather today?)",
          options: ["Wetter", "Wasser", "Woche", "Welt"],
          correctAnswer: "Wetter",
          explanation: "Das Wetter (the weather). It's a neutral noun. If you want to integrate with Germans, talk about this daily!",
          xpReward: 10
        },
        {
          id: "ex12-2-4",
          type: "multiple-choice",
          question: "What does 'Es schneit' mean?",
          options: ["It's snowing", "It's raining", "It's windy", "It's sunny"],
          correctAnswer: "It's snowing",
          explanation: "Schneien (to snow). For many Malayalis, the first snowfall in Germany is a core memory. Just remember: it's pretty, but it's cold!",
          xpReward: 10
        },
        {
          id: "ex12-2-5",
          type: "ordering",
          question: "Put the seasons in the correct order starting from spring:",
          options: ["der Winter", "der Herbst", "der Frühling", "der Sommer"],
          correctAnswer: ["der Frühling", "der Sommer", "der Herbst", "der Winter"],
          explanation: "The cycle goes: Flowers (Frühling) -> Sun (Sommer) -> Leaves falling (Herbst) -> Snow (Winter).",
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
        },
        {
          id: "ex12-2-9",
          type: "dictation",
          question: "Listen and type: Heute ist es sonnig.",
          correctAnswer: "Heute ist es sonnig",
          explanation: "Perfect! 'Heute' (today) can also start the sentence, followed by the verb 'ist'.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-today-sunny.mp3"
        },
        {
          id: "ex12-2-10",
          type: "free-text",
          question: "Translate to German: 'It is raining in Germany.'",
          correctAnswer: "Es regnet in Deutschland",
          explanation: "Excellent! 'Es regnet' is the standard weather phrase, followed by the location.",
          xpReward: 30
        }
      ,
        {
          id: "ex12-2-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Weather & Seasons): 'Am Wochenende spiele ich gern Cricket.'",
          questionGerman: "Sprechen Sie laut: 'Am Wochenende spiele ich gern Cricket.'",
          correctAnswer: "Am Wochenende spiele ich gern Cricket",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
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
        { id: "vocab12-2-10", german: "der Winter", english: "winter", malayalam: "ശീതകാലം", pronunciation: "vin-ter", example: "Der Winter dauert von Dezember bis Februar.", exampleTranslation: "Winter lasts from December to February." },
        { id: "vocab12-2-11", german: "die Sonne", english: "sun", malayalam: "സൂര്യൻ", pronunciation: "dee zon-ne", example: "Die Sonne scheint heute.", exampleTranslation: "The sun is shining today." },
        { id: "vocab12-2-12", german: "der Regen", english: "rain", malayalam: "മഴ", pronunciation: "dehr rey-gen", example: "Im Monsun gibt es viel Regen.", exampleTranslation: "In the monsoon there is a lot of rain." },
        { id: "vocab12-2-13", german: "warm", english: "warm", malayalam: "ചൂടുള്ള", pronunciation: "varm", example: "Es ist heute sehr warm.", exampleTranslation: "It is very warm today." }
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
      storyScene: {
        setting: {
          name: "WG Kitchen (In der Küche)",
          sceneType: "home",
          timeOfDay: "evening",
          description: "Arjun is looking at a movie trailer on his phone. He looks up and asks: 'Hast du Lust, ins Kino zu gehen?'. In Kerala, we might plan a movie 30 minutes before the show, but in Germany, the 'Wochenende' (weekend) is planned days in advance. You're learning how to suggest plans with 'Wollen wir...?' and how to decline politely with 'Leider'. Sunday shops are closed, so Saturday is your only chance! Ready to socialise, machane?",
        },
        narrative: {
          previousRecap: "You've complained about the cold. Now, let's find some fun indoor activities!",
          currentObjective: "Suggest and respond to plans using 'Hast du Lust...?' and 'Wollen wir...?'",
          nextTeaser: "Next: Formal Invitations! Let's see how we handle a party invite!",
        },
        kuttanIntro: [
          "Machane! Friends-ne invite cheyyaan 'Hast du Lust...?' (Have you desire / Do you feel like...?) is the most natural way. 'Hast du Lust, Pizza zu essen?'.",
          "Pinne 'Wollen wir...?' (Shall we...?) oru straight invitation aanu. Agreement-inu 'Klar!' or 'Ja, gern!' use cheyyaam.",
          "Sunday warning: Remember, shops and supermarkets Germany-yil Sunday closed aanu. So plan all your activities for Saturday! Let's get out there!",
        ],
        vocabEncounters: [
          { vocabId: "vocab12-3-1", encounterMoment: "Arjun asks: 'Hast du Lust, ins Kino zu gehen?'.", contextSentence: "Hast du Lust, ins Kino zu gehen?" },
          { vocabId: "vocab12-3-9", encounterMoment: "You say: 'Am Wochenende habe ich Zeit.' (On the weekend I have time).", contextSentence: "Am Wochenende gehe ich ins Kino." },
          { vocabId: "vocab12-3-2", encounterMoment: "You suggest: 'Wollen wir zusammen essen?' (Shall we eat together?).", contextSentence: "Wollen wir zusammen lernen?" },
          { vocabId: "vocab12-3-5", encounterMoment: "Stefan declines: 'Leider kann ich nicht.' (Unfortunately I can't).", contextSentence: "Leider kann ich nicht, ich muss arbeiten." },
        ],
        decisionPoints: [
          {
            moment: "Arjun asks 'Hast du Lust, ins Kino zu gehen?'. You really want to go. How do you respond?",
            options: [
              { text: "Ja, gern! Wann denn?", isCorrect: true, response: "Exactly! 'Ja, gern' is a enthusiastic acceptance.", kuttanReaction: "Adipoli! Social logic perfectly capture cheythallo! 🔥" },
              { text: "Nein, danke.", isCorrect: false, response: "Aiyyo! 'Nein, danke' is a polite no, but you wanted to go!", kuttanReaction: "Vite machane! Confused aano? Accept cheyyanne. Try again! 😬" },
            ],
          },
          {
            moment: "You want to suggest eating at a restaurant with 'Wollen'. Which is correct?",
            options: [
              { text: "Wollen wir ins Restaurant gehen?", isCorrect: true, response: "Correct! 'Wollen wir' starts the question.", kuttanReaction: "Superb! Question structure correct aayi pick cheythallo. ⭐" },
              { text: "Wir wollen ins Restaurant gehen?", isCorrect: false, response: "No! In a question, the verb 'Wollen' should come first.", kuttanReaction: "Aiyyo! Question logic marakkallae machane. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v12-3-1",
          title: "Hast du Lust? - Making Plans",
          duration: "12:00",
          description: "Master the art of suggesting plans, agreeing enthusiastically, and declining politely in German — social life unlock cheyyaam!",
          scriptOutline: [
            "Opening: 'Hast du Lust, plan cheyyaam? Together activities set aakaam machane!'",
            "Logic: 'Hast du Lust, [Activity] + zu + [Verb]?' — Fixed structure aanu.",
            "'Wollen wir...?': Shall we...? 'Wollen wir essen gehen?' — Natural everyday invite.",
            "'Lass uns...!': Let's...! 'Lass uns Pizza bestellen!' — Bestie mode ON.",
            "Agreement: 'Ja, gern!' / 'Super Idee!' / 'Auf jeden Fall!' (Definitely!).",
            "Decline: 'Leider kann ich nicht.' — Add 'Leider' to save the friendship!",
            "Alternative: 'Vielleicht nächstes Mal' (Polite way of saying Next Time).",
            "Details: 'Wann?' (When?) / 'Wo?' (Where?) / 'Um wie viel Uhr?'.",
            "RUHETAG: Sunday shops closed warning! Saturday night bakshanam set cheyyunilleyil 'pettupokum'!",
            "Time: German punctuality is 100% real. No 'on the way' lies please!"
          ],
          keyVocabulary: ["Hast du Lust?", "Wollen wir...?", "Lass uns...!", "Leider", "treffen"],
          learningObjectives: [
            "Suggest plans using three different structures",
            "Accept invitations enthusiastically",
            "Decline politely without being rude",
            "Set time and place for meeting up"
          ],
          placeholderThumbnail: "/images/kaffee_kuchen.png",
          richContent: [
            {
              type: "table",
              title: "Three Ways to Suggest Plans",
              headers: ["Structure", "German", "English"],
              rows: [
                ["Hast du Lust...?", "Hast du Lust, ins Kino zu gehen?", "Do you feel like going to the cinema?"],
                ["Wollen wir...?", "Wollen wir essen gehen?", "Shall we go eat?"],
                ["Lass uns...!", "Lass uns Pizza bestellen!", "Let's order pizza!"]
              ]
            },
            {
              type: "table",
              title: "Accepting & Declining",
              headers: ["Accepting", "Declining"],
              rows: [
                ["Ja, gern!", "Leider kann ich nicht."],
                ["Super Idee!", "Tut mir leid, ich habe keine Zeit."],
                ["Auf jeden Fall!", "Vielleicht nächstes Mal."],
                ["Ich bin dabei!", "Ich muss leider arbeiten."]
              ]
            },
            {
              type: "note",
              title: "German Punctuality for Social Plans Too!",
              variant: "warning",
              content: "When you agree to meet at 18:00, Germans expect you at 18:00 — not 18:15! The 'on my way' excuse doesn't work here. If you're running late, text immediately. Punctuality shows respect in Germany."
            }
          ]
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
          placeholderThumbnail: "/images/kaffee_kuchen.png",
          richContent: [
            {
              type: "table",
              title: "Weekend Places & Prepositions",
              headers: ["German", "English", "Preposition Pattern"],
              rows: [
                ["ins Kino gehen", "go to the cinema", "in + das = ins"],
                ["ins Restaurant gehen", "go to a restaurant", "in + das = ins"],
                ["in die Kneipe gehen", "go to the pub", "in + die = in die"],
                ["in den Park gehen", "go to the park", "in + den (Akk. masc.)"],
                ["zu Hause bleiben", "stay at home", "zu Hause (fixed phrase)"]
              ]
            },
            {
              type: "note",
              title: "The Friday Question",
              variant: "tip",
              content: "Every Friday, Germans ask: 'Was machst du am Wochenende?' (What are you doing this weekend?) Have an answer ready! 'Ich gehe ins Kino.' / 'Ich treffe Freunde.' / 'Ich bleibe zu Hause.'"
            },
            {
              type: "vocabulary",
              items: [
                { german: "Alles klar!", english: "All clear! / Got it!", malayalam: "ശരി!", pronunciation: "al-les klahr" },
                { german: "Bis dann!", english: "See you then!", malayalam: "പിന്നെ കാണാം!", pronunciation: "bis dan" },
                { german: "Bis Samstag!", english: "See you Saturday!", malayalam: "ശനിയാഴ്ച കാണാം!", pronunciation: "bis zams-tahk" }
              ]
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex12-3-1",
          type: "multiple-choice",
          question: "How do you say 'Do you feel like going to the cinema?' in German?",
          options: ["Hast du Lust, ins Kino zu gehen?", "Willst du Kino?", "Gehst du Kino?", "Kino, ja oder nein?"],
          correctAnswer: "Hast du Lust, ins Kino zu gehen?",
          explanation: "The 'Lust-Structure': [Hast du Lust] + [Activity] + [zu + Infinitive]. This is the most natural way to invite someone for a fun activity.",
          xpReward: 10
        },
        {
          id: "ex12-3-2",
          type: "matching",
          question: "Match the German response to its meaning:",
          options: ["Ja, gern!", "Leider kann ich nicht.", "Vielleicht nächstes Mal.", "Auf jeden Fall!"],
          correctAnswer: ["Yes, gladly!", "Unfortunately I can't.", "Maybe next time.", "Definitely!"],
          explanation: "Mastering these social responses helps you avoid coming off as rude or uninterested.",
          xpReward: 15
        },
        {
          id: "ex12-3-3",
          type: "fill-blank",
          question: "Complete: _____ wir ins Restaurant gehen? (Shall we go to the restaurant?)",
          options: ["Wollen", "Haben", "Sind", "Gehen"],
          correctAnswer: "Wollen",
          explanation: "Wollen (to want) + Subject (wir) = 'Do we want to...?' which functions as 'Shall we...?' in invitations.",
          xpReward: 10
        },
        {
          id: "ex12-3-4",
          type: "multiple-choice",
          question: "Your friend invites you but you're busy. Which is the MOST polite decline?",
          options: ["Leider kann ich nicht. Ich habe keine Zeit.", "Nein.", "Ich will nicht.", "Das ist langweilig."],
          correctAnswer: "Leider kann ich nicht. Ich habe keine Zeit.",
          explanation: "The magic word is 'Leider'. It signals that you WANT to come but circumstances (time) won't allow it. Essential for German politeness!",
          xpReward: 10
        },
        {
          id: "ex12-3-5",
          type: "ordering",
          question: "Put this plan-making conversation in order:",
          options: ["Super! Wir treffen uns um 19 Uhr.", "Hast du Lust, essen zu gehen?", "Ja, gern! Wann?", "Um 19 Uhr, passt das?"],
          correctAnswer: ["Hast du Lust, essen zu gehen?", "Ja, gern! Wann?", "Um 19 Uhr, passt das?", "Super! Wir treffen uns um 19 Uhr."],
          explanation: "The logical flow: Invite -> Accept & Ask time -> Propose time -> Confirm.",
          xpReward: 20
        },
        {
          id: "ex12-3-6",
          type: "fill-blank",
          question: "Complete: Um wie viel _____ treffen wir uns? (At what time do we meet?)",
          options: ["Uhr", "Zeit", "Tag", "Stunde"],
          correctAnswer: "Uhr",
          explanation: "Clock time is always 'Uhr'. 'Um wie viel Uhr?' is the fixed phrase for 'At what time?'.",
          xpReward: 10
        },
        {
          id: "ex12-3-7",
          type: "multiple-choice",
          question: "Which phrase means 'Let's order pizza!'?",
          options: ["Lass uns Pizza bestellen!", "Wir Pizza bestellen!", "Pizza wir bestellen!", "Bestellen Pizza uns!"],
          correctAnswer: "Lass uns Pizza bestellen!",
          explanation: "The 'Lass uns' (Let us) structure requires the verb (bestellen) to be in the infinitive at the very end.",
          xpReward: 10
        },
        {
          id: "ex12-3-8",
          type: "fill-blank",
          question: "Complete: Was machst du am _____? (What are you doing on the weekend?)",
          options: ["Wochenende", "Wochentag", "Mittwoch", "Abend"],
          correctAnswer: "Wochenende",
          explanation: "Am Wochenende (on the weekend). Noun starts with a capital 'W'! It’s the time most Germans use for their Hobbys.",
          xpReward: 10
        },
        {
          id: "ex12-3-9",
          type: "dictation",
          question: "Listen and type: Hast du Lust, ins Kino zu gehen?",
          correctAnswer: "Hast du Lust, ins Kino zu gehen",
          explanation: "Great job! This is the most natural way to invite someone to the cinema.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-lust-kino.mp3"
        },
        {
          id: "ex12-3-10",
          type: "free-text",
          question: "Write in German: 'Shall we go to a restaurant?' (using Wollen)",
          correctAnswer: "Wollen wir ins Restaurant gehen",
          explanation: "Wunderbar! 'Wollen wir' is an excellent way to propose plans.",
          xpReward: 30
        }
      ,
        {
          id: "ex12-3-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Making Plans with Friends): 'Am Wochenende spiele ich gern Cricket.'",
          questionGerman: "Sprechen Sie laut: 'Am Wochenende spiele ich gern Cricket.'",
          correctAnswer: "Am Wochenende spiele ich gern Cricket",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
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
      storyScene: {
        setting: {
          name: "WG Party (Die Einladung)",
          sceneType: "home",
          timeOfDay: "evening",
          description: "Music is playing, the kitchen is full of drinks, and the doorbell is ringing. You've received your first real 'Einladung' (invitation)! In Kerala, we just show up at a friend's house, but in Germany, invitations are official and usually include a request to 'mitbringen' (bring along) something. You're explaining why you're a bit late using 'weil'. It's your first time using complex German grammar. Good luck, machane!",
        },
        narrative: {
          previousRecap: "You've made casual plans. Now, let's learn how to handle formal invitations!",
          currentObjective: "Form 'weil' clauses correctly and express preference rankings using gern/lieber/am liebsten",
          nextTeaser: "Module 12 complete! You're now a social butterfly! Next: Module 13 - Media and Technology!",
        },
        kuttanIntro: [
          "Machane! Invitations accept cheyyan 'Ich komme gern' or 'Ich bin dabei!' use cheyyaam. Very cool phrases!",
          "Ivide oru grammar twist undu — 'weil' (because). After 'weil', the conjugated verb eppozhum clause-ude END-il pokum. 'Ich komme, weil ich Zeit HABE'. Catch the logic?",
          "Pinne preferences parayaan 'gern', 'lieber', 'am liebsten' scale use cheyyuka. 'Ich esse gern Pizza, aber am liebsten Biryani!'. Nammude taste buds marakkalle!",
        ],
        vocabEncounters: [
          { vocabId: "vocab12-4-2", encounterMoment: "Lara sends you a text: 'Danke für die Einladung!'", contextSentence: "Danke für die Einladung!" },
          { vocabId: "vocab12-4-6", encounterMoment: "You explain: 'Ich bin spät, weil ich gearbeitet habe.'", contextSentence: "Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte." },
          { vocabId: "vocab12-4-5", encounterMoment: "You point to the food: 'Am liebsten esse ich Biryani.'", contextSentence: "Am liebsten esse ich Biryani." },
          { vocabId: "vocab12-4-9", encounterMoment: "You ask Lara: 'Soll ich etwas mitbringen?' (Should I bring something?).", contextSentence: "Soll ich etwas mitbringen?" },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'I am learning German because I want to work in Germany'. Where does 'möchte' go?",
            options: [
              { text: "At the very end of the sentence.", isCorrect: true, response: "Exactly! In a 'weil' clause, the conjugated verb (möchte) goes to the end.", kuttanReaction: "Adipoli! Verb-final logic perfectly capture cheythallo! 🔥" },
              { text: "Right after 'weil'.", isCorrect: false, response: "Aiyyo! In German, 'weil' kicks the verb to the very end of the clause.", kuttanReaction: "Vite machane! Grammar logic catch aayillya. Try again! 😬" },
            ],
          },
          {
            moment: "You want to say you like Biryani the MOST. Which word do you use?",
            options: [
              { text: "am liebsten.", isCorrect: true, response: "Correct! 'am liebsten' is the superlative form for likes.", kuttanReaction: "Superb! Taste bud logic correctly noted! ⭐" },
              { text: "lieber.", isCorrect: false, response: "No! 'lieber' is for comparing two things. For the top choice, use 'am liebsten'.", kuttanReaction: "Aiyyo! 'lieber' comparison-u vendi ulla thaannu. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v12-4-1",
          title: "Einladungen - Accepting & Declining",
          duration: "12:00",
          description: "Master the art of invitations in German — from birthday parties to dinner invites, with gern/lieber/am liebsten preference magic!",
          scriptOutline: [
            "Opening: 'Du bist eingeladen! In-laws house muthal Onam sadya vare invite cheyyaam!'",
            "Phrases: 'Ich lade dich ein!' / 'Kommst du zu meiner Party?'",
            "Answers: 'Ich komme gern!' / 'Super, ich bin dabei!' (Count me in!).",
            "Preferences: gern (like) / lieber (prefer) / am liebsten (fave).",
            "Rankings: 'Ich esse gern Biryani, aber lieber Fried Rice, am liebsten Sadya!'",
            "German Punctuality: Parties are NOT 'flexi-time'. Prompt aayi reach cheyyanam!",
            "Mitbringen: 'Soll ich etwas mitbringen?' — Essential polite question. Beer? Cake? Chips?",
            "Exercise: Handle invitation yes/no responses with confidence!"
          ],
          keyVocabulary: ["einladen", "die Einladung", "gern", "lieber", "am liebsten"],
          learningObjectives: [
            "Invite someone to an event in German",
            "Accept and decline invitations politely",
            "Use gern/lieber/am liebsten to express preferences",
            "Offer to bring something to a gathering"
          ],
          placeholderThumbnail: "/images/kaffeeklatsch.png",
          richContent: [
            {
              type: "table",
              title: "Preference Scale: gern → lieber → am liebsten",
              headers: ["Level", "German", "English", "Example"],
              rows: [
                ["Like", "gern", "gladly", "Ich esse gern Biryani."],
                ["Prefer", "lieber", "rather/prefer", "Ich esse lieber Fried Rice."],
                ["Favourite", "am liebsten", "most of all", "Am liebsten esse ich Sadya!"]
              ]
            },
            {
              type: "table",
              title: "Invitation Phrases",
              headers: ["German", "English"],
              rows: [
                ["Ich lade dich ein!", "I'm inviting you!"],
                ["Kommst du zu meiner Party?", "Are you coming to my party?"],
                ["Ich komme gern!", "I'd love to come!"],
                ["Ich bin dabei!", "Count me in!"],
                ["Soll ich etwas mitbringen?", "Should I bring something?"]
              ]
            },
            {
              type: "note",
              title: "Always Offer to Bring Something!",
              variant: "tip",
              content: "When invited to a German home, always ask 'Soll ich etwas mitbringen?' (Should I bring something?). Bringing a bottle of wine, cake, or flowers is standard etiquette. Never arrive empty-handed!"
            }
          ]
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
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "weil-Clause: Verb Goes to the END!",
              headers: ["Normal Sentence", "With 'weil' (because)"],
              rows: [
                ["Ich muss arbeiten.", "...weil ich arbeiten muss."],
                ["Ich bin krank.", "...weil ich krank bin."],
                ["Es ist lecker.", "...weil es lecker ist."],
                ["Ich möchte studieren.", "...weil ich studieren möchte."],
                ["Cricket ist der beste Sport.", "...weil Cricket der beste Sport ist."]
              ]
            },
            {
              type: "table",
              title: "Warum? → Weil... (Question & Answer)",
              headers: ["Question", "Answer with weil"],
              rows: [
                ["Warum lernst du Deutsch?", "Weil ich in Deutschland studieren möchte."],
                ["Warum kannst du nicht kommen?", "Weil ich arbeiten muss."],
                ["Warum spielst du Cricket?", "Weil Cricket der beste Sport ist!"],
                ["Warum bist du müde?", "Weil ich bis spät gelernt habe."]
              ]
            },
            {
              type: "note",
              title: "The Big Grammar Shift!",
              variant: "warning",
              content: "After 'weil', the conjugated verb MUST jump to the end of the clause. This is your first taste of German subordinate clauses. Normal: 'Ich muss arbeiten.' → weil: '...weil ich arbeiten MUSS.' The verb flips position!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex12-4-1",
          type: "multiple-choice",
          question: "How do you say 'You are invited!' in German?",
          options: ["Du bist eingeladen!", "Du bist einladung!", "Du hast eingeladen!", "Du wirst einladen!"],
          correctAnswer: "Du bist eingeladen!",
          explanation: "Einladen (to invite) -> eingeladen (invited). Use the verb 'sein' (to be) for this state: 'Du BIST eingeladen'.",
          xpReward: 10
        },
        {
          id: "ex12-4-2",
          type: "fill-blank",
          question: "Complete: Ich kann nicht kommen, _____ ich arbeiten muss. (I can't come because I have to work.)",
          options: ["weil", "dass", "wenn", "aber"],
          correctAnswer: "weil",
          explanation: "THE VERB-FINAL RULE: After 'weil' (because), the conjugated verb (muss) MUST jump to the very end of the sentence. This is the biggest grammar shift for beginners!",
          xpReward: 15
        },
        {
          id: "ex12-4-3",
          type: "matching",
          question: "Match the preference level to the correct German word:",
          options: ["like (doing something)", "prefer", "like most of all"],
          correctAnswer: ["gern", "lieber", "am liebsten"],
          explanation: "The Gern-Scale: Gern (Like) -> Lieber (Better/Prefer) -> Am Liebsten (Best/Most).",
          xpReward: 15
        },
        {
          id: "ex12-4-4",
          type: "multiple-choice",
          question: "In a 'weil' clause, where does the conjugated verb go?",
          options: ["At the end of the clause", "At the beginning", "In the second position", "It doesn't change"],
          correctAnswer: "At the end of the clause",
          explanation: "In subordinate clauses like 'weil', German kicks the verb to the end. Think of it as the 'Abhibhashaka-Position' (The tail position).",
          xpReward: 15
        },
        {
          id: "ex12-4-5",
          type: "ordering",
          question: "Put this sentence in correct order: 'I can't come because I'm sick.'",
          options: ["krank", "weil", "ich", "bin", "Ich kann nicht kommen,"],
          correctAnswer: ["Ich kann nicht kommen,", "weil", "ich", "krank", "bin"],
          explanation: "1. Main clause, 2. Connector (weil), 3. Subject (ich), 4. Adjective (krank), 5. Verb (bin).",
          xpReward: 20
        },
        {
          id: "ex12-4-6",
          type: "fill-blank",
          question: "Complete: Ich tanze gern, aber ich singe _____. (I like dancing, but I prefer singing.)",
          options: ["lieber", "gern", "am liebsten", "nicht gern"],
          correctAnswer: "lieber",
          explanation: "Use 'lieber' for comparisons. 'I like this, but I like that BETTER (lieber)'.",
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
        },
        {
          id: "ex12-4-9",
          type: "dictation",
          question: "Listen and type: Ich komme gern zu deiner Party.",
          correctAnswer: "Ich komme gern zu deiner Party",
          explanation: "Perfect! 'Ich komme gern' is the standard way to accept an invite.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-come-party.mp3"
        },
        {
          id: "ex12-4-10",
          type: "free-text",
          question: "Translate to German: 'I can't come because I am sick.' (using weil)",
          correctAnswer: "Ich kann nicht kommen, weil ich krank bin",
          explanation: "Excellent! 'bin' moves to the end of the clause because of 'weil'.",
          xpReward: 30
        },
        {
          id: "ex12-4-11",
          type: "free-text",
          question: "Write in German: 'I prefer tea.' (tea = Tee, prefer = lieber)",
          correctAnswer: "Ich trinke lieber Tee",
          explanation: "Wunderbar! 'lieber' correctly expresses preference.",
          xpReward: 30
        },
        {
          id: "ex12-4-12",
          type: "free-text",
          question: "Translate: 'Should I bring something?'",
          correctAnswer: "Soll ich etwas mitbringen",
          explanation: "Great! A very polite question to ask when invited to someone's home.",
          xpReward: 30
        }
      ,
        {
          id: "ex12-4-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Invitations): 'Am Wochenende spiele ich gern Cricket.'",
          questionGerman: "Sprechen Sie laut: 'Am Wochenende spiele ich gern Cricket.'",
          correctAnswer: "Am Wochenende spiele ich gern Cricket",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
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
