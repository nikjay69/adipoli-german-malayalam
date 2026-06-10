import type { Module } from '../types';

// Module 8: My Home (Meine Wohnung)
export const MODULE_8: Module = {
  id: 8,
  title: "My Home",
  titleGerman: "Meine Wohnung",
  description: "Learn to describe your home, find an apartment, and navigate the German housing market!",
  icon: "🏠",
  color: "#a855f7",
  totalHours: 10,
  unlockRequirement: "Complete Module 7",
  learningTips: [
    "Walk through your room and name everything in German: der Tisch, das Bett, der Stuhl. Physical association is the fastest way to learn!",
    "Prepositions with Dativ (in, auf, an) are used constantly with rooms. 'Ich bin IN der Küche.'",
    "German housing ads look like coding! ZKB = Zimmer, Küche, Bad (Room, Kitchen, Bath). Once you crack the code, finding a flat is easy!",
    "In Germany, the 'Flur' (hallway) is more than just a passage—it's where you leave your shoes (never wear them inside a German home!)",
  ],
  lessons: [
    // ─── Lesson 8-1: Rooms & Furniture ───
    {
      id: "8-1",
      title: "Rooms & Furniture",
      titleGerman: "Zimmer und Möbel",
      description: "Learn the names of rooms in a German home and the furniture you'll find in them. From Küche to Schlafzimmer!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "The WG (First Apartment Tour)",
          sceneType: "home",
          timeOfDay: "afternoon",
          description: "Your new WG (Wohngemeinschaft) is spacious and light. Stefan is showing you around. Each room has a different vibe — the cozy living room, the busy kitchen, and your own private sanctuary. But before you step further, there's a sacred German ritual to follow: the shoe-swap in the Flur. Time to name your territory, machane!",
        },
        narrative: {
          previousRecap: "You've survived the shopping mall. Now, let's settle into your new German home!",
          currentObjective: "Identify rooms and furniture with correct articles and understand the 'Flur' culture",
          nextTeaser: "Next: decoration! Let's arrange your furniture using prepositions!",
        },
        kuttanIntro: [
          "Machane! Flat-il thamasichu thudangumbol first priority 'der Flur' aanu. Shoes ellam avide thanne vekkanam. Germany-il house interiors valare clean aayittaanu Germans maintain cheyyunnathu.",
          "Rooms-inde names simple aanu — Zimmer (room) with the activity. 'Wohnzimmer' (living), 'Schlafzimmer' (sleeping), 'Badezimmer' (bathing).",
          "Pinne kitchen (die Küche) — ithu WG-ile main social spot aanu. Ellaam articles-oodu koodi vegam set aakkaam!",
        ],
        vocabEncounters: [
          { vocabId: "vocab8-1-5", encounterMoment: "Stefan points to the rack: 'Lass deine Schuhe im Flur.' (Leave your shoes in the hallway).", contextSentence: "Die Schuhe sind im Flur." },
          { vocabId: "vocab8-1-2", encounterMoment: "The living room: 'Das Wohnzimmer ist gemütlich.' (The living room is cozy).", contextSentence: "Das Wohnzimmer ist gemütlich." },
          { vocabId: "vocab8-1-1", encounterMoment: "The kitchen: 'Die Küche ist klein, aber fein.' (The kitchen is small but nice).", contextSentence: "In der Küche kochen wir Curry." },
          { vocabId: "vocab8-1-12", encounterMoment: "You look for a snack: 'Unser Kühlschrank ist voll.' (Our fridge is full).", contextSentence: "Die Milch ist im Kühlschrank." },
          { vocabId: "vocab8-1-7", encounterMoment: "You sit down: 'Der Tisch ist aus Holz.' (The table is made of wood).", contextSentence: "Das Essen ist auf dem Tisch." },
        ],
        decisionPoints: [
          {
            moment: "You enter the flat for the first time. Where is the correct place to leave your shoes?",
            options: [
              { text: "Im Flur.", isCorrect: true, response: "Exactly! Shoes stay in the hallway rack. You've respected the first house rule!", kuttanReaction: "Adipoli! German house culture-il ithu valre important aanu. First impression thanne super! 🔥" },
              { text: "Im Wohnzimmer.", isCorrect: false, response: "Aiyyo! No one wears outdoor shoes in the living room in Germany. You'll make the floor dirty!", kuttanReaction: "Vite machane! 'Flur'-il thanne shoes vekkanam. Ithu oru strict rule aanu pala house-ilum. Try again! 😬" },
            ],
          },
          {
            moment: "How do you correctly say 'The fridge' (Cool-Cupboard)?",
            options: [
              { text: "Der Kühlschrank.", isCorrect: true, response: "Correct! Kühl (cool) + Schrank (cupboard). Masculine like most furniture.", kuttanReaction: "Superb! Compound words logic perfect aayi handle cheythallo. 'Cool-cupboard' logic simple alle? ⭐" },
              { text: "Die Kühlschrank.", isCorrect: false, response: "No, 'Schrank' is masculine, so 'Kühlschrank' is also masculine.", kuttanReaction: "Aiyyo! Furniture items mostly 'der' aayirukkum. Masculine gender fix cheyyane! Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v8-1-1",
          title: "Rooms in a German Home",
          duration: "10:00",
          description: "Take a virtual tour of a typical German apartment and learn the name of every room.",
          scriptOutline: [
            "Opening: 'Swantham flat-il thamasikan ishtamulla ellarkkum oru special lesson aanu ithu! Welcome to a German Wohnung!'",
            "The entrance: der Flur (hallway) — 'Germany-yil default rule! Shoes akathu allow cheyilla. Flur-il thanne shoes vekkanam!'",
            "Heart: die Küche (kitchen) — 'Nammalkku kitchen pachanayulla sthalam, Germans-innu ithu oru laboratory pole aanu!'",
            "Living: das Wohnzimmer (living room) — 'Wohn' means living, 'Zimmer' means room. Set aanu machane!",
            "Sleep: das Schlafzimmer (bedroom) — 'Schlaf' = sleep. Usually simple setup.",
            "Bath: das Badezimmer. Advice on 'Lüften' (airing out) winter-ilum important aanu!",
            "Balcony: der Balkon — 'Balkon-il irunnu chai kudikkunnathinte oru sukham! Most flats-ilum undakum.'",
            "SHOCK: German apartments often come WITHOUT a kitchen — 'Nee thanne kitchen setup vanganum! Imagine that!'",
            "Logic: Just attach the activity to 'Zimmer' and you have the room name!",
            "Practice: Name 3 rooms in your house in German, right now!"
          ],
          keyVocabulary: ["die Wohnung", "der Flur", "die Küche", "das Wohnzimmer", "das Schlafzimmer", "der Balkon"],
          learningObjectives: [
            "Name the 7 main areas of a German apartment with correct articles",
            "Understand the 'no-shoes-inside' rule and the 'Flur' concept",
            "Recognize the unique German situation of 'apartments without kitchens'",
            "Master the compound word pattern with '-zimmer'"
          ],
          placeholderThumbnail: "/images/german_apartment.png",
          richContent: [
            {
              type: "table",
              title: "Rooms in a German Apartment",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["die Wohnung", "apartment", "ഫ്ലാറ്റ്"],
                ["der Flur", "hallway", "ഇടനാഴി"],
                ["die Küche", "kitchen", "അടുക്കള"],
                ["das Wohnzimmer", "living room", "സ്വീകരണ മുറി"],
                ["das Schlafzimmer", "bedroom", "കിടപ്പുമുറി"],
                ["das Badezimmer", "bathroom", "കുളിമുറി"],
                ["der Balkon", "balcony", "ബാൽക്കണി"]
              ]
            },
            {
              type: "note",
              title: "The Zimmer Trick",
              variant: "tip",
              content: "German room names are compound words: activity + Zimmer (room). Wohn (living) + Zimmer = Wohnzimmer. Schlaf (sleep) + Zimmer = Schlafzimmer. Learn the activity word and you know the room!"
            },
            {
              type: "note",
              title: "Shoes Off at the Door!",
              variant: "warning",
              content: "In Germany, shoes stay in the 'Flur' (hallway). Walking inside with shoes is considered extremely rude. Many homes even provide 'Hausschuhe' (house slippers) for guests!"
            }
          ]
        },
        {
          id: "v8-1-2",
          title: "Furniture & Appliances",
          duration: "10:00",
          description: "Learn the essential furniture and household items you'll find in every German home.",
          scriptOutline: [
            "Opening: 'Rooms mathram porallo, filled with Möbel (furniture) aakanam!'",
            "Kitchen: der Kühlschrank (fridge/cool-cupboard), der Herd (stove) — basic cooking setup.",
            "Living room: das Sofa, der Tisch (table), die Lampe (lamp).",
            "Bedroom: das Bett (bed), der Schrank (cupboard). 'Alle saamanangalum Schrank-il vekkam!'",
            "The versatile 'Stuhl' (chair) — masculine article: DER Stuhl.",
            "Masc-pattern: Notice der Tisch, der Stuhl, der Schrank... most big furniture is 'der'!",
            "Practice: 'In meinem Wohnzimmer gibt es...' (In my living room there is...)",
            "IKEA culture: 'Germany-yil aarum thachanmaar-e vilikarilla, furniture ellaam nammal thanne assemble cheyyanam!'",
            "Kerala comparison: Think of how we describe rooms — 'settee vechu, TV vechu, fan vechu'. Same logic, German words!",
            "Vocabulary hack: Use the articles correctly from day one. Say 'der Tisch', never just 'Tisch'!"
          ],
          keyVocabulary: ["der Kühlschrank", "der Herd", "das Bett", "der Schrank", "das Sofa", "die Lampe"],
          learningObjectives: [
            "Name 8 common furniture/appliance items with correct articles",
            "Identify which furniture belongs to which room",
            "Understand the 'Do-It-Yourself' assembly culture in Germany",
            "Use 'es gibt' to describe what is in a room"
          ],
          placeholderThumbnail: "/images/german_apartment_living_room_v2.png",
          richContent: [
            {
              type: "table",
              title: "Furniture & Appliances",
              headers: ["German", "English", "Article"],
              rows: [
                ["der Kühlschrank", "fridge", "der (m)"],
                ["der Herd", "stove", "der (m)"],
                ["das Sofa", "sofa", "das (n)"],
                ["der Tisch", "table", "der (m)"],
                ["die Lampe", "lamp", "die (f)"],
                ["das Bett", "bed", "das (n)"],
                ["der Schrank", "cupboard/wardrobe", "der (m)"],
                ["der Stuhl", "chair", "der (m)"]
              ]
            },
            {
              type: "note",
              title: "Big Furniture = Masculine!",
              variant: "tip",
              content: "Notice a pattern? Most big furniture items are masculine (der): der Tisch, der Stuhl, der Schrank, der Kühlschrank. This isn't a 100% rule, but it helps as a memory trick!"
            },
            {
              type: "note",
              title: "IKEA Assembly Culture",
              variant: "info",
              content: "In Germany, most people assemble furniture themselves from IKEA or similar stores. There's no calling a 'thachan' (carpenter)! 'Es gibt' (there is/are) is key: 'In meinem Wohnzimmer gibt es ein Sofa.'"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex8-1-1",
          type: "matching",
          question: "Match the German rooms with their English meanings:",
          options: [
            "die Küche",
            "das Wohnzimmer",
            "das Schlafzimmer",
            "das Badezimmer",
            "der Flur"
          ],
          correctAnswer: [
            "kitchen",
            "living room",
            "bedroom",
            "bathroom",
            "hallway"
          ],
          explanation: "Remember the compound word trick: Wohn(living)+zimmer(room), Schlaf(sleep)+zimmer, Bade(bath)+zimmer. In Germany, the 'Flur' is very important—it's where you leave your shoes!",
          xpReward: 15
        },
        {
          id: "ex8-1-2",
          type: "multiple-choice",
          question: "In which room do you typically leave your shoes when entering a German home?",
          options: ["die Küche", "das Schlafzimmer", "der Flur", "der Balkon"],
          correctAnswer: "der Flur",
          explanation: "In Germany, almost no one wears shoes inside. The 'Flur' (hallway/entrance area) is where you swap your street shoes for 'Hausschuhe' (house shoes).",
          xpReward: 10
        },
        {
          id: "ex8-1-3",
          type: "fill-blank",
          question: "Complete: 'Der Tisch ist in der ___.' (The table is in the kitchen.)",
          options: ["Küche", "Wohnzimmer", "Flur", "Balkon"],
          correctAnswer: "Küche",
          explanation: "'in der Küche' — Küche is feminine (die Küche), so with the preposition 'in' (showing location), it becomes 'in der Küche'. This is our first peek at the Dativ case!",
          xpReward: 15
        },
        {
          id: "ex8-1-4",
          type: "multiple-choice",
          question: "What does 'der Kühlschrank' literally mean?",
          options: ["Cool cupboard", "Cold room", "Ice machine", "Electricity box"],
          correctAnswer: "Cool cupboard",
          explanation: "German is like Lego! Kühl (cool) + Schrank (cupboard) = Kühlschrank (fridge). If you know the parts, you know the word!",
          xpReward: 10
        },
        {
          id: "ex8-1-5",
          type: "ordering",
          question: "Put these words in order: 'In the living room there is a sofa'",
          options: ["Wohnzimmer", "gibt", "es", "ein Sofa", "Im"],
          correctAnswer: ["Im", "Wohnzimmer", "gibt", "es", "ein Sofa"],
          explanation: "'Im Wohnzimmer' (In the living room) + 'gibt es' (there is) + 'ein Sofa'. 'Es gibt' is the magic phrase for 'There is'!",
          xpReward: 15
        },
        {
          id: "ex8-1-6",
          type: "multiple-choice",
          question: "What is unusual about German apartments compared to Indian homes?",
          options: [
            "They don't have bathrooms",
            "They often come without a kitchen (you bring your own!)",
            "They never have balconies",
            "They always have two floors"
          ],
          correctAnswer: "They often come without a kitchen (you bring your own!)",
          explanation: "In Germany, many rental apartments come without a fitted kitchen. Tenants buy and install their own — and take it with them when they move!",
          xpReward: 10
        },
        {
          id: "ex8-1-7",
          type: "dictation",
          question: "Listen and type: Das Wohnzimmer ist groß.",
          correctAnswer: "Das Wohnzimmer ist groß",
          explanation: "Great! 'Wohnzimmer' is neuter (das) and must be capitalized.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-livingroom-big.mp3"
        },
        {
          id: "ex8-1-8",
          type: "free-text",
          question: "Write in German: 'The kitchen is clean.' (clean = sauber)",
          correctAnswer: "Die Küche ist sauber",
          explanation: "Wunderbar! 'Die Küche' because it is feminine. Good job!",
          xpReward: 30
        }
      ,
        {
          id: "ex8-1-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Rooms & Furniture): 'Mein Zimmer ist klein, aber schön.'",
          questionGerman: "Sprechen Sie laut: 'Mein Zimmer ist klein, aber schön.'",
          correctAnswer: "Mein Zimmer ist klein, aber schön",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab8-1-1",
          german: "die Küche",
          english: "kitchen",
          malayalam: "അടുക്കള",
          pronunciation: "kue-khe",
          example: "In der Küche kochen wir Curry.",
          exampleTranslation: "In the kitchen we cook curry."
        },
        {
          id: "vocab8-1-2",
          german: "das Wohnzimmer",
          english: "living room",
          malayalam: "സ്വീകരണമുറി",
          pronunciation: "vohn-tsim-mer",
          example: "Das Wohnzimmer ist gemütlich.",
          exampleTranslation: "The living room is cozy."
        },
        {
          id: "vocab8-1-3",
          german: "das Schlafzimmer",
          english: "bedroom",
          malayalam: "കിടപ്പുമുറി",
          pronunciation: "shlahf-tsim-mer",
          example: "Das Schlafzimmer ist groß.",
          exampleTranslation: "The bedroom is big."
        },
        {
          id: "vocab8-1-4",
          german: "das Badezimmer",
          english: "bathroom",
          malayalam: "കുളിമുറി",
          pronunciation: "bah-deh-tsim-mer",
          example: "Das Badezimmer ist sauber.",
          exampleTranslation: "The bathroom is clean."
        },
        {
          id: "vocab8-1-5",
          german: "der Flur",
          english: "hallway",
          malayalam: "ഇടനാഴി",
          pronunciation: "floohr",
          example: "Die Schuhe sind im Flur.",
          exampleTranslation: "The shoes are in the hallway."
        },
        {
          id: "vocab8-1-6",
          german: "der Balkon",
          english: "balcony",
          malayalam: "ബാല്‍ക്കണി",
          pronunciation: "bahl-kohn",
          example: "Ich trinke Kaffee auf dem Balkon.",
          exampleTranslation: "I drink coffee on the balcony."
        },
        {
          id: "vocab8-1-7",
          german: "der Tisch",
          english: "table",
          malayalam: "മേശ",
          pronunciation: "tish",
          example: "Das Essen ist auf dem Tisch.",
          exampleTranslation: "The food is on the table."
        },
        {
          id: "vocab8-1-8",
          german: "der Stuhl",
          english: "chair",
          malayalam: "കസേര",
          pronunciation: "shtool",
          example: "Der Stuhl ist bequem.",
          exampleTranslation: "The chair is comfortable."
        },
        {
          id: "vocab8-1-9",
          german: "das Bett",
          english: "bed",
          malayalam: "കട്ടില്‍",
          pronunciation: "bet",
          example: "Ich liege im Bett.",
          exampleTranslation: "I am lying in bed."
        },
        {
          id: "vocab8-1-10",
          german: "der Schrank",
          english: "cupboard / wardrobe",
          malayalam: "അലമാര",
          pronunciation: "shrahnk",
          example: "Die Kleidung ist im Schrank.",
          exampleTranslation: "The clothes are in the wardrobe."
        },
        {
          id: "vocab8-1-11",
          german: "das Sofa",
          english: "sofa",
          malayalam: "സോഫ",
          pronunciation: "zoh-fah",
          example: "Das Sofa ist neu.",
          exampleTranslation: "The sofa is new."
        },
        {
          id: "vocab8-1-12",
          german: "der Kühlschrank",
          english: "fridge",
          malayalam: "ഫ്രിഡ്ജ്",
          pronunciation: "kuehl-shrahnk",
          example: "Die Milch ist im Kühlschrank.",
          exampleTranslation: "The milk is in the fridge."
        }
      ]
    },

    // ─── Lesson 8-2: Where Is It? ───
    {
      id: "8-2",
      title: "Where Is It?",
      titleGerman: "Wo ist es?",
      description: "Master prepositions of place and describe where things are in a room. Plus: your first taste of the dative case!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Your New Bedroom",
          sceneType: "home",
          timeOfDay: "afternoon",
          description: "Boxes are scattered everywhere. You've just finished assembling your bed and desk (assemble cheyyan IKEA instructions help cheythilla, but German grammar will!). Now you need to decide where everything goes. Is the lamp on the table? Are the shoes under the bed? This is Dative Case training in action, machane!",
        },
        narrative: {
          previousRecap: "You've seen the whole flat. Now, let's make your room a home!",
          currentObjective: "Use prepositions of place correctly and apply dative article changes (dem/der)",
          nextTeaser: "Next: house hunting! Let's learn how to read apartment ads like a pro!",
        },
        kuttanIntro: [
          "Machane! Room set cheyyunpathu oru valya karyamaanu. Prepositions (auf, unter, neben) use cheyyanam.",
          "Location (Wo?) parayumpo Dative case logic switch aakum. Masculine and Neuter articles 'dem' aayi maarum. 'Auf dem Tisch', 'Unter dem Bett'.",
          "Feminine 'die' becomes 'der'. 'In der Küche'. Ithu oru fixed pattern aanu, vegam catch cheyyaam!",
        ],
        vocabEncounters: [
          { vocabId: "vocab8-2-2", encounterMoment: "You place a cup: 'Die Tasse ist auf dem Tisch.' (The cup is on the table).", contextSentence: "Die Tasse ist auf dem Tisch." },
          { vocabId: "vocab8-2-3", encounterMoment: "You tuck away your sneakers: 'Die Schuhe sind unter dem Bett.' (The shoes are under the bed).", contextSentence: "Die Schuhe sind unter dem Bett." },
          { vocabId: "vocab8-2-4", encounterMoment: "You place the chair: 'Der Stuhl ist neben dem Tisch.' (The chair is next to the table).", contextSentence: "Der Stuhl ist neben dem Tisch." },
          { vocabId: "vocab8-2-9", encounterMoment: "You're finally resting: 'Ich bin im Wohnzimmer.' (in + dem = im).", contextSentence: "Ich bin im Wohnzimmer." },
          { vocabId: "vocab8-2-7", encounterMoment: "You put a book between others: 'Das Buch ist zwischen den Heften.'", contextSentence: "Die Lampe steht zwischen dem Sofa und dem Tisch." },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'The lamp is on the table' (der Tisch). What is the correct dative article?",
            options: [
              { text: "Die Lampe ist auf dem Tisch.", isCorrect: true, response: "Exactly! For masculine 'Tisch', the article 'der' becomes 'dem' in the dative case for location.", kuttanReaction: "Adipoli! Dative case logic catch cheythallo. 'dem' is the way! 🔥" },
              { text: "Die Lampe ist auf der Tisch.", isCorrect: false, response: "Aiyyo! 'der' is for feminine in dative. 'Tisch' is masculine, so it must be 'dem'.", kuttanReaction: "Vite machane! Masculine/Neuter = 'dem'. Ithu mathrame orkkanam. Try again! 😬" },
            ],
          },
          {
            moment: "How do you say 'The shoes are under the bed' (das Bett)?",
            options: [
              { text: "Die Schuhe sind unter dem Bett.", isCorrect: true, response: "Correct! 'das Bett' also changes to 'dem Bett' in dative.", kuttanReaction: "Superb! Masculine and Neuter same logical pattern follow cheyyunnathu valare helpful alle? ⭐" },
              { text: "Die Schuhe sind unter das Bett.", isCorrect: false, response: "No! 'unter das' is for motion (putting them there). For location (they ARE there), we use dative 'dem'.", kuttanReaction: "Aiyyo! Location = Dative. 'dem' venam ennanu artham. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v8-2-1",
          title: "Prepositions of Place",
          duration: "12:00",
          description: "Learn the essential prepositions for describing where things are located in German.",
          scriptOutline: [
            "Opening: 'Mobile evide? Keys evide? Finding things in German is all about Prepositions!'",
            "The big 8: in, auf, unter, neben, vor, hinter, zwischen, über.",
            "Visuals: 'Die Katze ist AUF dem Tisch.' (cat is ON table). 'Die Maus ist UNTER dem Bett.'",
            "Trap: auf = surface contact, über = floating above. Ithu confuse aavalle!",
            "BOSS LEVEL: Location (Wo?) = Dative Case. This is where German gets real, machane!",
            "Dative logic: der → dem, das → dem. 'Dem' replaces 'der/das' for location.",
            "Feminine: die → der. 'In der Küche'. Strange right? But logic fixed aanu.",
            "Shortcuts: in + dem = im, an + dem = am. Always use 'im', natural sound kitti theeroo!",
            "Kerala Home Tip: Describe your room to a friend in German for practice.",
            "Summary: Location always needs Dative. Masculine/Neuter = DEM, Feminine = DER."
          ],
          keyVocabulary: ["im", "am", "auf dem", "unter dem", "neben dem", "hinter dem"],
          learningObjectives: [
            "Use 8 prepositions of place correctly",
            "Apply Dative article changes (dem/der) for location",
            "Use contractions 'im' and 'am' naturally",
            "Describe the position of objects in any room"
          ],
          placeholderThumbnail: "/images/german_apartment_living_room_v2.png",
          richContent: [
            {
              type: "table",
              title: "8 Key Prepositions of Place",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["in", "in/inside", "ഉള്ളിൽ"],
                ["auf", "on (surface)", "മുകളിൽ"],
                ["unter", "under", "അടിയിൽ"],
                ["neben", "next to", "അടുത്ത്"],
                ["vor", "in front of", "മുൻപിൽ"],
                ["hinter", "behind", "പിറകിൽ"],
                ["zwischen", "between", "ഇടയിൽ"],
                ["über", "above (floating)", "മുകളിൽ (തൊടാതെ)"]
              ]
            },
            {
              type: "table",
              title: "Dative Article Changes (Location)",
              headers: ["Nominative", "Dative (Wo?)", "Contraction"],
              rows: [
                ["der (masculine)", "dem", "in + dem = im"],
                ["das (neuter)", "dem", "an + dem = am"],
                ["die (feminine)", "der", "—"]
              ]
            },
            {
              type: "note",
              title: "Location = DATIVE!",
              variant: "warning",
              content: "When describing WHERE something is (Wo?), you MUST use dative articles. der → dem, das → dem, die → der. Use 'im' and 'am' contractions — they sound much more natural!"
            }
          ]
        },
        {
          id: "v8-2-2",
          title: "Describing Room Layout",
          duration: "10:00",
          description: "Put prepositions into practice by describing where furniture and items are placed in rooms.",
          scriptOutline: [
            "Opening: Let's furnish a room and describe everything — in German!",
            "Example room tour: 'Das Bett ist neben dem Fenster.' (The bed is next to the window.)",
            "Kitchen description: 'Der Kühlschrank ist neben dem Herd.'",
            "Living room: 'Die Lampe ist auf dem Tisch.' 'Das Sofa ist vor dem Fernseher.'",
            "Bedroom: 'Der Schrank ist neben dem Bett.' 'Die Bücher sind auf dem Regal.'",
            "Practice the pattern: [Thing] ist [preposition] [dem/der] [location].",
            "Common mistake: Don't confuse 'auf' (on a surface) with 'über' (floating above)",
            "Challenge: Describe YOUR room — 'In meinem Zimmer gibt es...' + where things are",
            "Kerala home comparison: Describe a typical Kerala home layout in German!",
            "Summary: Location = dative. Just remember 'dem' and you're 80% there!"
          ],
          keyVocabulary: ["im Wohnzimmer", "auf dem Tisch", "neben dem Bett", "vor dem Fenster", "hinter der Tür"],
          learningObjectives: [
            "Describe the layout of a room using prepositions",
            "Combine furniture vocabulary with location prepositions",
            "Use dative articles naturally in context",
            "Describe your own room in German"
          ],
          placeholderThumbnail: "/images/german_apartment.png",
          richContent: [
            {
              type: "table",
              title: "Room Descriptions — Example Sentences",
              headers: ["German", "English"],
              rows: [
                ["Das Bett ist neben dem Fenster.", "The bed is next to the window."],
                ["Der Kühlschrank ist neben dem Herd.", "The fridge is next to the stove."],
                ["Die Lampe ist auf dem Tisch.", "The lamp is on the table."],
                ["Das Sofa ist vor dem Fernseher.", "The sofa is in front of the TV."],
                ["Die Bücher sind auf dem Regal.", "The books are on the shelf."]
              ]
            },
            {
              type: "note",
              title: "The Golden Pattern",
              variant: "tip",
              content: "[Thing] + ist + [preposition] + [dem/der] + [location]. Master this one pattern and you can describe any room! Remember: 'dem' for masculine/neuter, 'der' for feminine."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex8-2-1",
          type: "multiple-choice",
          question: "Where is the cat? 'Die Katze ist ___ dem Tisch.' (under)",
          options: ["auf", "unter", "neben", "über"],
          correctAnswer: "unter",
          explanation: "'unter' = under/beneath. Notice: 'der Tisch' became 'dem Tisch' because we are talking about location (Dativ).",
          xpReward: 10
        },
        {
          id: "ex8-2-2",
          type: "fill-blank",
          question: "Complete: 'Die Lampe ist auf ___ Tisch.' (The lamp is on the table.)",
          options: ["dem", "der", "den", "das"],
          correctAnswer: "dem",
          explanation: "Preposition 'auf' (on) + Location = Dativ. For masculine 'Tisch', der changes to dem. 'Auf dem Tisch' = On the table.",
          xpReward: 15
        },
        {
          id: "ex8-2-3",
          type: "multiple-choice",
          question: "How do you say 'In the living room' naturally?",
          options: ["In das Wohnzimmer", "Im Wohnzimmer", "In der Wohnzimmer", "In dem Wohnzimmer (less common)"],
          correctAnswer: "Im Wohnzimmer",
          explanation: "Germans always contract 'in dem' to 'im'. It's smoother! 'In das' is for motion (going into), not location.",
          xpReward: 10
        },
        {
          id: "ex8-2-4",
          type: "matching",
          question: "Match the prepositions with their meanings:",
          options: [
            "auf",
            "neben",
            "hinter",
            "zwischen",
            "vor"
          ],
          correctAnswer: [
            "on (top of)",
            "next to",
            "behind",
            "between",
            "in front of"
          ],
          explanation: "These prepositions are your best friends in any German home!",
          xpReward: 15
        },
        {
          id: "ex8-2-5",
          type: "multiple-choice",
          question: "What does 'hinter der Tür' mean?",
          options: ["Behind the door", "In front of the door", "Next to the door", "Under the door"],
          correctAnswer: "Behind the door",
          explanation: "'hinter' = behind. 'die Tür' (door) changed to 'der Tür' in Dativ. Yes, feminine 'die' becomes 'der' in Dativ—tricky, right?",
          xpReward: 15
        },
        {
          id: "ex8-2-6",
          type: "fill-blank",
          question: "Complete: 'Das Bild hängt _____ dem Sofa.' (The picture hangs above the sofa.)",
          options: ["über", "unter", "neben", "auf"],
          correctAnswer: "über",
          explanation: "'über' = above/over. 'Das Bild hängt über dem Sofa.' = The picture hangs above the sofa.",
          xpReward: 10
        },
        {
          id: "ex8-2-7",
          type: "multiple-choice",
          question: "In dative case, what does 'die Küche' become after a preposition?",
          options: ["dem Küche", "der Küche", "den Küche", "des Küche"],
          correctAnswer: "der Küche",
          explanation: "Feminine nouns: die → der in dative. So 'in die Küche' (accusative/motion) but 'in der Küche' (dative/location).",
          xpReward: 15
        },
        {
          id: "ex8-2-8",
          type: "dictation",
          question: "Listen and type: Die Katze ist auf dem Tisch.",
          correctAnswer: "Die Katze ist auf dem Tisch",
          explanation: "Perfect! 'auf dem Tisch' — 'dem' because of the dative case for location.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-cat-table.mp3"
        },
        {
          id: "ex8-2-9",
          type: "free-text",
          question: "Translate to German: 'The shoes are under the bed.' (shoes = die Schuhe, bed = Bett)",
          correctAnswer: "Die Schuhe sind unter dem Bett",
          explanation: "Excellent! 'unter dem Bett' — 'dem' is the dative article for 'das Bett'.",
          xpReward: 30
        }
      ,
        {
          id: "ex8-2-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Where Is It?): 'Mein Zimmer ist klein, aber schön.'",
          questionGerman: "Sprechen Sie laut: 'Mein Zimmer ist klein, aber schön.'",
          correctAnswer: "Mein Zimmer ist klein, aber schön",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab8-2-1",
          german: "in",
          english: "in / inside",
          malayalam: "അകത്ത് / ഉള്ളില്‍",
          pronunciation: "in",
          example: "Das Buch ist in dem Schrank.",
          exampleTranslation: "The book is in the cupboard."
        },
        {
          id: "vocab8-2-2",
          german: "auf",
          english: "on (top of)",
          malayalam: "മുകളില്‍ / മേലെ",
          pronunciation: "owf",
          example: "Die Tasse ist auf dem Tisch.",
          exampleTranslation: "The cup is on the table."
        },
        {
          id: "vocab8-2-3",
          german: "unter",
          english: "under / beneath",
          malayalam: "അടിയില്‍ / കീഴില്‍",
          pronunciation: "oon-ter",
          example: "Die Schuhe sind unter dem Bett.",
          exampleTranslation: "The shoes are under the bed."
        },
        {
          id: "vocab8-2-4",
          german: "neben",
          english: "next to / beside",
          malayalam: "അരികില്‍ / അടുത്ത്",
          pronunciation: "neh-ben",
          example: "Der Stuhl ist neben dem Tisch.",
          exampleTranslation: "The chair is next to the table."
        },
        {
          id: "vocab8-2-5",
          german: "vor",
          english: "in front of",
          malayalam: "മുന്‍പില്‍",
          pronunciation: "fohr",
          example: "Das Auto steht vor dem Haus.",
          exampleTranslation: "The car is in front of the house."
        },
        {
          id: "vocab8-2-6",
          german: "hinter",
          english: "behind",
          malayalam: "പിന്നില്‍",
          pronunciation: "hin-ter",
          example: "Der Garten ist hinter dem Haus.",
          exampleTranslation: "The garden is behind the house."
        },
        {
          id: "vocab8-2-7",
          german: "zwischen",
          english: "between",
          malayalam: "ഇടയില്‍",
          pronunciation: "tsvi-shen",
          example: "Die Lampe steht zwischen dem Sofa und dem Tisch.",
          exampleTranslation: "The lamp is between the sofa and the table."
        },
        {
          id: "vocab8-2-8",
          german: "über",
          english: "above / over",
          malayalam: "മുകളിലായി",
          pronunciation: "ue-ber",
          example: "Das Bild hängt über dem Sofa.",
          exampleTranslation: "The picture hangs above the sofa."
        },
        {
          id: "vocab8-2-9",
          german: "im (= in dem)",
          english: "in the (contraction)",
          malayalam: "...ല്‍ / ...ഉള്ളില്‍",
          pronunciation: "im",
          example: "Ich bin im Wohnzimmer.",
          exampleTranslation: "I am in the living room."
        },
        {
          id: "vocab8-2-10",
          german: "am (= an dem)",
          english: "at the (contraction)",
          malayalam: "...ന്റെ അടുത്ത്",
          pronunciation: "ahm",
          example: "Das Bild hängt am Fenster.",
          exampleTranslation: "The picture hangs at the window."
        }
      ]
    },

    // ─── Lesson 8-3: Looking for an Apartment ───
    {
      id: "8-3",
      title: "Looking for an Apartment",
      titleGerman: "Wohnungssuche",
      description: "Navigate the German housing market! Learn to read apartment ads, understand WG culture, and decode rental terminology.",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "WG Kitchen (Late Night Chat)",
          sceneType: "home",
          timeOfDay: "evening",
          description: "Stefan and Lara are sharing some snacks in the kitchen. They're telling you stories about their own 'WG-Casting' experiences — it sounds like a reality TV show! You also see a laptop open with some apartment ads. Time to learn the code of the German housing market, machane!",
        },
        narrative: {
          previousRecap: "You've arranged your own room. Now, let's learn how to find one in the first place!",
          currentObjective: "Understand WG search culture and decode abbreviations in apartment ads (EBK, OG, Zi)",
          nextTeaser: "Next: writing the email! Let's get you that viewing appointment!",
        },
        kuttanIntro: [
          "Machane! Apartment searching in Germany is a separate level struggle. 'WG-Casting' ennu paranjaal oru interview pole aanu, nammude vibe set aano ennu nokkana sthalam.",
          "Ads-il abbreviations valare common aanu. Zi (Zimmer), EBK (Einbauküche), OG (Obergeschoss). Ithu decode cheyyunnathu oru puzzle poleyaanu.",
          "Miete-il 'Warm' and 'Kalt' difference valare important aanu. Warm covers building costs, but electricity separate aayirukkum. Let's crack the code!",
        ],
        vocabEncounters: [
          { vocabId: "vocab8-3-1", encounterMoment: "Lara explains: 'In einer WG teilt man sich alles.' (In a WG, you share everything).", contextSentence: "Wir wohnen in einer WG." },
          { vocabId: "vocab8-3-2", encounterMoment: "Stefan checks the price: 'Die Miete ist 450 Euro warm.' (The rent is 450 Euro warm).", contextSentence: "Die Miete ist 500 Euro warm." },
          { vocabId: "vocab8-3-3", encounterMoment: "You ask about safety: 'Wie hoch ist die Kaution?' (How high is the deposit?).", contextSentence: "Die Kaution ist hoch." },
          { vocabId: "vocab8-3-4", encounterMoment: "You find an ad: 'Ich brauche einen Besichtigungstermin.' (I need a viewing appointment).", contextSentence: "Haben Sie einen Besichtigungstermin?" },
          { vocabId: "vocab8-3-7", encounterMoment: "Lara points to the wall: 'Schau, unser Putzplan.' (Look, our cleaning schedule). Sacred document!", contextSentence: "Wir haben einen Putzplan in der WG." },
        ],
        decisionPoints: [
          {
            moment: "You see an ad that says '500€ warm'. What does 'warm' usually mean in this context?",
            options: [
              { text: "Includes heating and building utilities.", isCorrect: true, response: "Exactly! Warmmiete includes the building's operating costs (heating, water, garbage).", kuttanReaction: "Adipoli! Rent logic correctly catch cheythallo. 'Warm' is the all-in building price. 🔥" },
              { text: "Includes electricity and internet.", isCorrect: false, response: "Aiyyo! Usually, electricity (Strom) and Internet are separate private contracts, even in 'warm' rent!", kuttanReaction: "Vite machane! Strom and Internet separate bills aayirukkum. Ithu koodi orkkanam. Try again! 😬" },
            ],
          },
          {
            moment: "What does the abbreviation 'EBK' stand for in an ad?",
            options: [
              { text: "Einbauküche (Fitted Kitchen).", isCorrect: true, response: "Correct! If the ad has EBK, you don't need to bring your own stove or sink!", kuttanReaction: "Superb! EBK kandaal flat luck aanu machane. Kitchen already set aanu! ⭐" },
              { text: "Extra Bad (Extra Bathroom).", isCorrect: false, response: "No! EBK is all about the kitchen (Küche).", kuttanReaction: "Aiyyo! EBK = Einbau-Küche. Kitchen setup ready aano ennu nokkana abbreviation aayirunnu ithu. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v8-3-1",
          title: "WG-Suche! Finding Housing in Germany",
          duration: "12:00",
          description: "Everything you need to know about finding a place to live in Germany — especially the WG (shared apartment) culture.",
          scriptOutline: [
            "Opening: 'Germany-yil flat kittan oru interview pass aakanam ennu paranjaal viswasikkumo? Welcome to WG-Suche!'",
            "WG = Wohngemeinschaft. 'Shared flat culture aanu. Dorm pole alla, it's a family!'",
            "Sacred rule: Putzplan (cleaning schedule). Rules follow cheyyanam, machane!",
            "WG-CASTING: 'Flat-inu vendi audition perform cheyyunnathu pole aanu! Best of luck!'",
            "Money talk: die Miete (rent), die Kaution (deposit). Kaution level set cheyyanam!",
            "Cold vs Warm: Kaltmiete (base) vs Warmmiete (all-in). Warm covers heating/water.",
            "Nebenkosten (NK): Extra charges. Electricity and Internet usually separate aanu.",
            "Bible sites: WG-Gesucht.de and eBay Kleinanzeigen. Scams avoid cheyyaan care venam!",
            "Parallel: Like a PG, but with freedom and equal responsibilities. No warden scenes!"
          ],
          keyVocabulary: ["die WG", "das Casting", "die Miete", "die Kaution", "die Warmmiete", "die Nebenkosten"],
          learningObjectives: [
            "Understand the social 'Casting' culture in German housing",
            "Differentiate between Kaltmiete and Warmmiete like a pro",
            "Recognize common rental red flags and scams",
            "Navigate the top housing websites in Germany"
          ],
          placeholderThumbnail: "/images/german_apartment.png",
          richContent: [
            {
              type: "table",
              title: "WG & Rental Vocabulary",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["die WG (Wohngemeinschaft)", "shared apartment", "ഷെയർഡ് ഫ്ലാറ്റ്"],
                ["die Miete", "rent", "വാടക"],
                ["die Kaution", "deposit", "കോഷൻ മണി"],
                ["die Warmmiete", "rent incl. heating", "ഹീറ്റിങ് ഉൾപ്പെടെ വാടക"],
                ["die Kaltmiete", "base rent", "അടിസ്ഥാന വാടക"],
                ["die Nebenkosten", "extra charges", "അധിക ചെലവുകൾ"],
                ["der Putzplan", "cleaning schedule", "വൃത്തിയാക്കൽ ഷെഡ്യൂൾ"]
              ]
            },
            {
              type: "note",
              title: "WG-Casting = Flatmate Interview!",
              variant: "info",
              content: "In Germany, finding a WG is like an audition! Current flatmates will interview you to check if you fit their vibe. Be prepared to talk about your hobbies, cooking, and cleaning habits. First impressions matter!"
            },
            {
              type: "note",
              title: "Kaltmiete vs Warmmiete",
              variant: "warning",
              content: "Always check if the rent is 'kalt' (base only) or 'warm' (includes heating/water/garbage). Electricity and internet are usually separate even in Warmmiete. Ask: 'Ist das kalt oder warm?'"
            }
          ]
        },
        {
          id: "v8-3-2",
          title: "Reading Apartment Ads",
          duration: "10:00",
          description: "Decode real German apartment advertisements — all those mysterious abbreviations explained!",
          scriptOutline: [
            "Opening: German apartment ads look like alien code — let's crack them!",
            "Sample ad: '2-Zi-Wohnung, 65 qm, 550€ warm, 3. OG, Balkon' — let's decode it",
            "Zi = Zimmer (rooms): 2-Zi = 2 rooms (usually 1 bedroom + 1 living room + kitchen & bath)",
            "qm = Quadratmeter (square meters): 65 qm = 65 square meters",
            "OG = Obergeschoss (upper floor): 3. OG = 3rd floor — EG = Erdgeschoss (ground floor)",
            "warm/kalt: 550€ warm means rent INCLUDING heating and utilities",
            "Other abbreviations: EBK = Einbauküche (fitted kitchen — a big plus!), NK = Nebenkosten",
            "Practice: Read 3 real-style apartment ads and extract the key information",
            "Size guide: How big is 65 qm? About 700 sq ft — a typical 2-room apartment",
            "Red flags vs green flags in apartment ads — what to watch out for"
          ],
          keyVocabulary: ["Quadratmeter (qm)", "Obergeschoss (OG)", "Erdgeschoss (EG)", "Einbauküche (EBK)", "2-Zi-Wohnung"],
          learningObjectives: [
            "Read and understand a German apartment advertisement",
            "Decode common abbreviations in housing ads",
            "Extract key information: size, price, floor, amenities",
            "Compare apartments based on ad descriptions"
          ],
          placeholderThumbnail: "/images/home_office.png",
          richContent: [
            {
              type: "table",
              title: "Apartment Ad Abbreviations",
              headers: ["Abbreviation", "Full Form", "English"],
              rows: [
                ["Zi", "Zimmer", "rooms"],
                ["qm", "Quadratmeter", "square meters"],
                ["OG", "Obergeschoss", "upper floor"],
                ["EG", "Erdgeschoss", "ground floor"],
                ["EBK", "Einbauküche", "fitted kitchen"],
                ["NK", "Nebenkosten", "additional costs"],
                ["warm/kalt", "Warmmiete/Kaltmiete", "incl./excl. heating"]
              ]
            },
            {
              type: "note",
              title: "Decoding a Real Ad",
              variant: "tip",
              content: "Sample: '2-Zi-Wohnung, 65 qm, 550€ warm, 3. OG, Balkon' = 2-room apartment, 65 square meters, €550 rent (heating included), 3rd floor, with a balcony. EBK is a big plus — it means the kitchen is already installed!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex8-3-1",
          type: "multiple-choice",
          question: "What is a 'WG-Casting'?",
          options: [
            "A movie audition",
            "An interview with potential flatmates to see if you fit in",
            "A meeting with the police for registration",
            "A traditional German housewarming party"
          ],
          correctAnswer: "An interview with potential flatmates to see if you fit in",
          explanation: "In Germany, living in a WG is social. Current flatmates will 'cast' (interview) you to see if you match their vibe. Be prepared to talk about your hobbies and cleaning habits!",
          xpReward: 10
        },
        {
          id: "ex8-3-2",
          type: "multiple-choice",
          question: "You see '600€ warm' in an ad. What does this include?",
          options: [
            "Base rent only",
            "Rent plus heating, water, and garbage collection",
            "Rent plus electricity and internet",
            "Rent plus breakfast"
          ],
          correctAnswer: "Rent plus heating, water, and garbage collection",
          explanation: "'Warmmiete' covers the building costs (Nebenkosten) like heating and water. BUT usually, you still need to pay for your own Electricity (Strom) and Internet!",
          xpReward: 10
        },
        {
          id: "ex8-3-3",
          type: "fill-blank",
          question: "The security deposit you pay at the start is called die ___ .",
          options: ["Kaution", "Miete", "Quittung", "Rechnung"],
          correctAnswer: "Kaution",
          explanation: "Die Kaution is the deposit. Usually it is 2 to 3 'Kaltmieten'. You get it back when you move out if you haven't damaged the room.",
          xpReward: 10
        },
        {
          id: "ex8-3-4",
          type: "matching",
          question: "Decode these housing abbreviations:",
          options: [
            "Zi",
            "EBK",
            "EG",
            "OG",
            "NK"
          ],
          correctAnswer: [
            "Zimmer (Room)",
            "Einbauküche (Fitted Kitchen)",
            "Erdgeschoss (Ground Floor)",
            "Obergeschoss (Upper Floor)",
            "Nebenkosten (Extra Costs)"
          ],
          explanation: "Crack the code! EBK is the most important one—it means the kitchen is already there and you don't have to buy a sink!",
          xpReward: 15
        },
        {
          id: "ex8-3-6",
          type: "multiple-choice",
          question: "What is 'die Kaution'?",
          options: ["monthly rent", "security deposit", "utility bill", "insurance"],
          correctAnswer: "security deposit",
          explanation: "'die Kaution' = security deposit. Usually 2-3 months of Kaltmiete, returned when you move out (if no damage).",
          xpReward: 10
        },
        {
          id: "ex8-3-7",
          type: "dictation",
          question: "Listen and type: Ich suche eine WG.",
          correctAnswer: "Ich suche eine WG",
          explanation: "Great! 'WG' stands for 'Wohngemeinschaft' — shared apartment.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-seek-wg.mp3"
        },
        {
          id: "ex8-3-8",
          type: "free-text",
          question: "Write in German: 'The rent is 500 Euro.'",
          correctAnswer: "Die Miete ist 500 Euro",
          explanation: "Wunderbar! 'Die Miete ist 500 Euro.' — Euro remains singular in this context.",
          xpReward: 30
        }
      ,
        {
          id: "ex8-3-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Looking for an Apartment): 'Mein Zimmer ist klein, aber schön.'",
          questionGerman: "Sprechen Sie laut: 'Mein Zimmer ist klein, aber schön.'",
          correctAnswer: "Mein Zimmer ist klein, aber schön",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab8-3-1",
          german: "die Wohngemeinschaft (WG)",
          english: "shared apartment",
          malayalam: "പങ്കിട്ട അപ്പാര്‍ട്ട്‌മെന്റ്",
          pronunciation: "veh-geh",
          example: "Wir wohnen in einer WG.",
          exampleTranslation: "We live in a shared apartment."
        },
        {
          id: "vocab8-3-2",
          german: "die Miete",
          english: "rent",
          malayalam: "വാടക",
          pronunciation: "mee-teh",
          example: "Die Miete ist 500 Euro warm.",
          exampleTranslation: "The rent is 500 Euros including utilities."
        },
        {
          id: "vocab8-3-3",
          german: "die Kaution",
          english: "security deposit",
          malayalam: "സെക്യൂരിറ്റി ഡെപ്പോസിറ്റ്",
          pronunciation: "kau-tsion",
          example: "Die Kaution ist hoch.",
          exampleTranslation: "The deposit is high."
        },
        {
          id: "vocab8-3-4",
          german: "der Besichtigungstermin",
          english: "viewing appointment",
          malayalam: "ഫ്‌ളാറ്റ് കാണാനുള്ള സമയം",
          pronunciation: "be-zikh-ti-goongs-ter-meen",
          example: "Haben Sie einen Besichtigungstermin?",
          exampleTranslation: "Do you have a viewing appointment?"
        },
        {
          id: "vocab8-3-5",
          german: "die Nebenkosten (NK)",
          english: "utility costs",
          malayalam: "മറ്റ് ചെലവുകൾ",
          pronunciation: "neh-ben-kos-ten",
          example: "Die Nebenkosten sind extra.",
          exampleTranslation: "The utility costs are extra."
        },
        {
          id: "vocab8-3-6",
          german: "einziehen",
          english: "to move in",
          malayalam: "താമസം മാറിച്ചെല്ലുക",
          pronunciation: "ine-tsee-en",
          example: "Ich möchte am Montag einziehen.",
          exampleTranslation: "I want to move in on Monday."
        },
        {
          id: "vocab8-3-7",
          german: "der Putzplan",
          english: "cleaning schedule",
          malayalam: "വൃത്തിയാക്കൽ പട്ടിക",
          pronunciation: "poots-plahn",
          example: "Wir haben einen Putzplan in der WG.",
          exampleTranslation: "We have a cleaning schedule in the WG."
        },
        {
          id: "vocab8-3-8",
          german: "möbliert",
          english: "furnished",
          malayalam: "ഫർണിഷ് ചെയ്ത",
          pronunciation: "muh-bleert",
          example: "Das Zimmer ist möbliert.",
          exampleTranslation: "The room is furnished."
        }
      ]
    },

    // ─── Lesson 8-4: Writing a Simple Message ───
    {
      id: "8-4",
      title: "Writing a Simple Message",
      titleGerman: "Eine einfache Nachricht schreiben",
      description: "Learn to write a formal message in German — reply to apartment ads, use 'es gibt', and master the polite letter format.",
      duration: "45 min",
      xpReward: 180,
      storyScene: {
        setting: {
          name: "WG Desk (Writing Session)",
          sceneType: "home",
          timeOfDay: "evening",
          description: "You're sitting at your desk, the glow of your laptop lighting up the room. Your friend Arjun just moved to Germany and is struggling to get a reply for apartments. 'Machane, help me write a proper German email!' he says. This is your chance to master formal structures and 'es gibt' once and for all!",
        },
        narrative: {
          previousRecap: "You've decoded the apartment ads. now, let's write the message that gets you through the door!",
          currentObjective: "Write a formal/semi-formal apartment application using correct greetings and 'es gibt' (Accusative)",
          nextTeaser: "Module 8 complete! Next: Let's explore the city! Directions, locations, and city life!",
        },
        kuttanIntro: [
          "Machane! German email writing is a separate level game. Formal aayi ezhuthumpol 'Sehr geehrte...' ennu thanne thudanganam.",
          "Nammude interest express cheyyaan 'Ich interessiere mich für...' use cheyyaam. Pinne flat-ile details chodikkaan 'Gibt es...?' logic simple aanu.",
          "Main grammar rule: 'es gibt' eppozhum Accusative case edukkum. 'Gibt es EINEN Balkon?' ennu chodikkaam. Let's write that email!",
        ],
        vocabEncounters: [
          { vocabId: "vocab8-4-1", encounterMoment: "You start the draft: 'Sehr geehrte Damen und Herren,' — the classic formal opening.", contextSentence: "Sehr geehrte Damen und Herren," },
          { vocabId: "vocab8-4-5", encounterMoment: "You ask about features: 'Es gibt einen Balkon, richtig?' (There is a balcony, right?).", contextSentence: "Es gibt einen Balkon." },
          { vocabId: "vocab8-3-4", encounterMoment: "The goal: 'Ich möchte einen Besichtigungstermin.' (I would like a viewing appointment).", contextSentence: "Haben Sie einen Besichtigungstermin?" },
          { vocabId: "vocab8-4-4", encounterMoment: "Closing: 'Mit freundlichen Grüßen,' — the polite way to say goodbye.", contextSentence: "Mit freundlichen Grüßen," },
          { vocabId: "vocab8-1-1", encounterMoment: "Checking features: 'Gibt es eine Küche?' (Is there a kitchen?). Important for the rent!", contextSentence: "In der Küche kochen wir Curry." },
        ],
        decisionPoints: [
          {
            moment: "You are writing to a formal landlord. Which greeting do you use?",
            options: [
              { text: "Sehr geehrte Damen und Herren,", isCorrect: true, response: "Exactly! This is the standard formal greeting when you don't know the recipient's name.", kuttanReaction: "Adipoli! Formal tone perfect aayi set cheythallo. Professionalism is key in Germany! 🔥" },
              { text: "Hallo, wie geht's?", isCorrect: false, response: "Aiyyo! Too informal for a landlord. Save this for your friends!", kuttanReaction: "Vite machane! Rental market competition-il formal tone venam. 'Sehr geehrte' thanne use cheyyane. Try again! 😬" },
            ],
          },
          {
            moment: "You want to ask 'Is there a balcony?' (der Balkon). Which sentence is grammatically correct with 'es gibt'?",
            options: [
              { text: "Gibt es einen Balkon?", isCorrect: true, response: "Correct! 'es gibt' takes the Accusative case, so 'der' becomes 'einen'.", kuttanReaction: "Superb! Accusative agreement 'es gibt'-inu correct aayi apply cheythallo! ⭐" },
              { text: "Gibt es ein Balkon?", isCorrect: false, response: "No! 'Balkon' is masculine, so it needs 'einen' in the Accusative case after 'es gibt'.", kuttanReaction: "Aiyyo! 'es gibt' takes Accusative. Masculine ends in '-en'. 'Einen Balkon' ennu fix cheyyane! Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v8-4-1",
          title: "Answering an Ad - Your First German Message",
          duration: "14:00",
          description: "Step-by-step guide to writing a formal message in German — essential for apartment hunting and beyond.",
          scriptOutline: [
            "Opening: 'Worm-il ad kandaal matti, ezhuthanam! First impressions are everything!'",
            "Anrede: Formal for landlords (Sehr geehrte...), Informal for WGs (Hallo, liebe WG!).",
            "Introduction: 'Ich heiße... und ich komme aus Indien.' Mention you are a student or working.",
            "Body: 'Ich interessiere mich für das Zimmer.' (I am interested in the room).",
            "Questions: 'Gibt es einen Putzplan?' (Is there a cleaning plan?) — WGs love this question!",
            "Grammar check: 'es gibt' ALWAYS takes Accusative. 'Es gibt EINEN Balkon.'",
            "Closing: 'Über eine Nachricht würde ich mich freuen.' (I'd be happy about a message).",
            "Closing phrases: 'Mit freundlichen Grüßen' (Formal) vs 'Liebe Grüße' (Friends).",
            "Pro Tip: Attach your 'Schufa' or 'Einkommensnachweis' (proof of income) if you want the room fast!"
          ],
          keyVocabulary: ["Sehr geehrte", "interessieren", "Besichtigungstermin", "Mit freundlichen Grüßen", "es gibt"],
          learningObjectives: [
            "Write a winning WG application message",
            "Use 'es gibt' correctly with the Accusative case",
            "Distinguish between formal and informal email structures",
            "Suggest a viewing appointment (Besichtigungstermin) politely"
          ],
          placeholderThumbnail: "/images/home_office.png",
          richContent: [
            {
              type: "table",
              title: "Formal vs Informal Email Structure",
              headers: ["Part", "Formal (Landlord)", "Informal (WG)"],
              rows: [
                ["Greeting", "Sehr geehrte Damen und Herren,", "Hallo, liebe WG!"],
                ["Intro", "Ich heiße... und ich komme aus...", "Ich bin... aus..."],
                ["Interest", "Ich interessiere mich für das Zimmer.", "Das Zimmer klingt super!"],
                ["Closing", "Über eine Nachricht würde ich mich freuen.", "Ich freue mich auf eure Antwort!"],
                ["Sign-off", "Mit freundlichen Grüßen", "Liebe Grüße"]
              ]
            },
            {
              type: "note",
              title: "'es gibt' Takes Accusative!",
              variant: "warning",
              content: "'Es gibt' (there is/are) ALWAYS uses the Accusative case. 'Es gibt einen Balkon' (There is a balcony) — 'einen' because Balkon is masculine. This is a common grammar trap!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "Sehr geehrte Damen und Herren", english: "Dear Sir/Madam", malayalam: "ബഹുമാനപ്പെട്ടവരേ", pronunciation: "zehr ge-ehr-te dah-men oont heh-ren" },
                { german: "Mit freundlichen Grüßen", english: "With kind regards", malayalam: "സ്നേഹപൂർവ്വം", pronunciation: "mit froynt-likh-en grue-sen" },
                { german: "der Besichtigungstermin", english: "viewing appointment", malayalam: "സന്ദർശന സമയം", pronunciation: "be-zikh-ti-goongs-ter-meen" }
              ]
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex8-4-1",
          type: "multiple-choice",
          question: "How do you begin a formal letter in German?",
          options: [
            "Hallo!",
            "Sehr geehrte Damen und Herren,",
            "Lieber Freund,",
            "Hey!"
          ],
          correctAnswer: "Sehr geehrte Damen und Herren,",
          explanation: "'Sehr geehrte Damen und Herren,' = 'Dear Sir/Madam,' — the standard formal opening in German letters and emails.",
          xpReward: 10
        },
        {
          id: "ex8-4-2",
          type: "fill-blank",
          question: "Complete: '_____ freundlichen Grüßen' (With friendly regards — formal closing)",
          options: ["Mit", "Von", "Für", "Aus"],
          correctAnswer: "Mit",
          explanation: "'Mit freundlichen Grüßen' = 'With friendly regards' — the most common formal closing in German letters.",
          xpReward: 10
        },
        {
          id: "ex8-4-3",
          type: "multiple-choice",
          question: "What does 'es gibt' mean?",
          options: ["it gives", "there is / there are", "it goes", "it gets"],
          correctAnswer: "there is / there are",
          explanation: "'es gibt' literally means 'it gives' but is used as 'there is / there are'. It always takes the accusative case.",
          xpReward: 10
        },
        {
          id: "ex8-4-4",
          type: "ordering",
          question: "Put these parts of a formal message in the correct order:",
          options: [
            "Sehr geehrte Damen und Herren,",
            "Mein Name ist Arun und ich komme aus Kerala.",
            "Ich suche ein Zimmer ab dem 1. April.",
            "Mit freundlichen Grüßen",
            "Arun Kumar"
          ],
          correctAnswer: [
            "Sehr geehrte Damen und Herren,",
            "Mein Name ist Arun und ich komme aus Kerala.",
            "Ich suche ein Zimmer ab dem 1. April.",
            "Mit freundlichen Grüßen",
            "Arun Kumar"
          ],
          explanation: "German formal letters follow: Greeting → Introduction → Request/Body → Closing → Name.",
          xpReward: 15
        },
        {
          id: "ex8-4-5",
          type: "fill-blank",
          question: "Complete: 'Gibt _____ noch ein freies Zimmer?' (Is there still a free room?)",
          options: ["es", "er", "sie", "das"],
          correctAnswer: "es",
          explanation: "'Gibt es...?' = 'Is there...?' — the question form of 'es gibt'. The 'es' comes after the verb in questions.",
          xpReward: 15
        },
        {
          id: "ex8-4-6",
          type: "multiple-choice",
          question: "Which closing is appropriate for an INFORMAL WG message?",
          options: [
            "Mit freundlichen Grüßen",
            "Hochachtungsvoll",
            "Liebe Grüße",
            "Sehr geehrte Damen und Herren"
          ],
          correctAnswer: "Liebe Grüße",
          explanation: "'Liebe Grüße' = 'Best regards' (informal). For WG applications, a friendly tone with 'du' is usually preferred.",
          xpReward: 10
        },
        {
          id: "ex8-4-7",
          type: "dictation",
          question: "Listen and type: Mit freundlichen Grüßen",
          correctAnswer: "Mit freundlichen Grüßen",
          explanation: "Perfect! This is the most formal way to end a letter in German.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-formal-closing.mp3"
        },
        {
          id: "ex8-4-8",
          type: "free-text",
          question: "Translate to German: 'May I introduce myself?'",
          correctAnswer: "Darf ich mich vorstellen",
          explanation: "Excellent! 'Darf ich mich vorstellen?' is a very polite opening.",
          xpReward: 30
        }
      ,
        {
          id: "ex8-4-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Writing a Simple Message): 'Mein Zimmer ist klein, aber schön.'",
          questionGerman: "Sprechen Sie laut: 'Mein Zimmer ist klein, aber schön.'",
          correctAnswer: "Mein Zimmer ist klein, aber schön",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab8-4-1",
          german: "Sehr geehrte Damen und Herren",
          english: "Dear Sir/Madam (formal greeting)",
          malayalam: "ബഹുമാന്യരായ മഹാശയരേ / മഹാശയിമാരേ",
          pronunciation: "zehr geh-ehr-teh dah-men oont heh-ren",
          example: "Sehr geehrte Damen und Herren, ich schreibe Ihnen wegen der Wohnung.",
          exampleTranslation: "Dear Sir/Madam, I am writing to you regarding the apartment."
        },
        {
          id: "vocab8-4-2",
          german: "Mit freundlichen Grüßen",
          english: "With friendly regards (formal closing)",
          malayalam: "സൗഹൃദപൂര്‍വ്വം",
          pronunciation: "mit froynt-likh-en grues-en",
          example: "Mit freundlichen Grüßen, Priya Nair",
          exampleTranslation: "With friendly regards, Priya Nair"
        },
        {
          id: "vocab8-4-3",
          german: "es gibt",
          english: "there is / there are",
          malayalam: "ഉണ്ട് / ഉണ്ടായിരിക്കുന്നു",
          pronunciation: "es gipt",
          example: "Es gibt einen Balkon in der Wohnung.",
          exampleTranslation: "There is a balcony in the apartment."
        },
        {
          id: "vocab8-4-4",
          german: "ab sofort",
          english: "immediately / from now",
          malayalam: "ഉടനടി / ഇപ്പോള്‍ മുതല്‍",
          pronunciation: "ahp zoh-fort",
          example: "Das Zimmer ist ab sofort frei.",
          exampleTranslation: "The room is available immediately."
        },
        {
          id: "vocab8-4-5",
          german: "die Nachricht",
          english: "message",
          malayalam: "സന്ദേശം",
          pronunciation: "dee nahkh-rikht",
          example: "Ich schreibe eine Nachricht.",
          exampleTranslation: "I am writing a message."
        },
        {
          id: "vocab8-4-6",
          german: "Liebe Grüße",
          english: "Best regards (informal closing)",
          malayalam: "സ്നേഹപൂര്‍വ്വം",
          pronunciation: "lee-beh grues-eh",
          example: "Liebe Grüße, Arun",
          exampleTranslation: "Best regards, Arun"
        },
        {
          id: "vocab8-4-7",
          german: "sich vorstellen",
          english: "to introduce oneself",
          malayalam: "സ്വയം പരിചയപ്പെടുത്തുക",
          pronunciation: "zikh fohr-shtell-en",
          example: "Darf ich mich vorstellen?",
          exampleTranslation: "May I introduce myself?"
        },
        {
          id: "vocab8-4-8",
          german: "das Zimmer frei",
          english: "room available",
          malayalam: "മുറി ലഭ്യമാണ്",
          pronunciation: "dahs tsim-mer fry",
          example: "Ist das Zimmer noch frei?",
          exampleTranslation: "Is the room still available?"
        }
      ]
    }
  ]
};
