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
    "Walk through your room and name everything in German: der Tisch, das Bett, der Stuhl...",
    "Prepositions with Dativ (in, auf, an) are used constantly with rooms. 'Ich bin IN der Küche.'",
    "German housing ads use abbreviations: ZKB = Zimmer, Küche, Bad. Learn to decode them!",
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
      videos: [
        {
          id: "v8-1-1",
          title: "Rooms in a German Home",
          duration: "10:00",
          description: "Take a virtual tour of a typical German apartment and learn the name of every room.",
          scriptOutline: [
            "Opening: Welcome to a German Wohnung (apartment)! Let's explore room by room.",
            "The entrance: der Flur (hallway) — first thing you see when entering a German home",
            "Heart of the home: die Küche (kitchen) — Germans love their kitchens!",
            "Living space: das Wohnzimmer (living room) — 'Wohn' = living, 'Zimmer' = room",
            "Sleep zone: das Schlafzimmer (bedroom) — 'Schlaf' = sleep",
            "Clean zone: das Badezimmer (bathroom) — 'Bad' = bath",
            "Outdoor bonus: der Balkon (balcony) — very common in German apartments",
            "Cultural note: German apartments often come WITHOUT a kitchen — you bring your own!",
            "Compound words trick: Zimmer = room → Wohn+zimmer, Schlaf+zimmer, Bade+zimmer",
            "Quick quiz: Name the rooms as we flash through images"
          ],
          keyVocabulary: ["die Küche", "das Wohnzimmer", "das Schlafzimmer", "das Badezimmer", "der Flur", "der Balkon"],
          learningObjectives: [
            "Name the 6 main rooms in a German home",
            "Understand German compound word patterns with 'Zimmer'",
            "Know cultural differences in German housing",
            "Use correct articles for each room"
          ],
          placeholderThumbnail: "/images/thumbnails/german-rooms.jpg"
        },
        {
          id: "v8-1-2",
          title: "Furniture & Appliances",
          duration: "10:00",
          description: "Learn the essential furniture and household items you'll find in every German home.",
          scriptOutline: [
            "Opening: Now that we know the rooms — let's fill them with Möbel (furniture)!",
            "Kitchen items: der Kühlschrank (fridge), der Herd (stove) — basics for cooking",
            "Living room: das Sofa, der Tisch (table), die Lampe (lamp) — cozy essentials",
            "Bedroom: das Bett (bed), der Schrank (cupboard/wardrobe) — where you sleep and store",
            "General: der Stuhl (chair) — found in every room",
            "Articles pattern: Notice — der Tisch, der Stuhl, der Schrank (many furniture = masculine!)",
            "Practice: 'In meinem Wohnzimmer gibt es...' (In my living room there is...)",
            "Cultural note: IKEA is huge in Germany — most students furnish their WG rooms from IKEA",
            "Kerala comparison: Think of how we describe rooms — 'settee vechu, TV vechu, fan vechu'",
            "Final challenge: Describe your own room using the new vocabulary"
          ],
          keyVocabulary: ["der Tisch", "der Stuhl", "das Bett", "der Schrank", "das Sofa", "die Lampe"],
          learningObjectives: [
            "Name at least 6 common furniture items with correct articles",
            "Place furniture in the correct rooms",
            "Begin describing your own living space in German",
            "Recognize patterns in German furniture vocabulary"
          ],
          placeholderThumbnail: "/images/thumbnails/german-furniture.jpg"
        }
      ],
      exercises: [
        {
          id: "ex8-1-1",
          type: "matching",
          question: "Match the German rooms with their English meanings:",
          options: [
            "die Küche → kitchen",
            "das Wohnzimmer → living room",
            "das Schlafzimmer → bedroom",
            "das Badezimmer → bathroom",
            "der Flur → hallway"
          ],
          correctAnswer: [
            "die Küche → kitchen",
            "das Wohnzimmer → living room",
            "das Schlafzimmer → bedroom",
            "das Badezimmer → bathroom",
            "der Flur → hallway"
          ],
          explanation: "Remember the compound word trick: Wohn(living)+zimmer(room), Schlaf(sleep)+zimmer, Bade(bath)+zimmer.",
          xpReward: 15
        },
        {
          id: "ex8-1-2",
          type: "multiple-choice",
          question: "Where would you find 'das Bett' (the bed)?",
          options: ["die Küche", "das Schlafzimmer", "der Flur", "der Balkon"],
          correctAnswer: "das Schlafzimmer",
          explanation: "Das Bett (bed) is found in das Schlafzimmer (bedroom). Schlaf = sleep!",
          xpReward: 10
        },
        {
          id: "ex8-1-3",
          type: "fill-blank",
          question: "Complete: 'Der Tisch ist in der _____.' (The table is in the kitchen.)",
          options: ["Küche", "Wohnzimmer", "Flur", "Balkon"],
          correctAnswer: "Küche",
          explanation: "'in der Küche' — Küche is feminine (die Küche), so with dative 'in', it becomes 'in der Küche'.",
          xpReward: 15
        },
        {
          id: "ex8-1-4",
          type: "multiple-choice",
          question: "What does 'der Schrank' mean?",
          options: ["shelf", "cupboard/wardrobe", "drawer", "mirror"],
          correctAnswer: "cupboard/wardrobe",
          explanation: "'der Schrank' is a cupboard or wardrobe — a large piece of furniture for storage.",
          xpReward: 10
        },
        {
          id: "ex8-1-5",
          type: "ordering",
          question: "Put these words in order: gibt / Wohnzimmer / ein Sofa / es / Im",
          options: ["Im", "Wohnzimmer", "gibt", "es", "ein Sofa"],
          correctAnswer: ["Im", "Wohnzimmer", "gibt", "es", "ein Sofa"],
          explanation: "'Im Wohnzimmer gibt es ein Sofa.' = 'In the living room there is a sofa.' ('gibt es' = there is)",
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
        }
      ],
      vocabulary: [
        {
          id: "vocab8-1-1",
          german: "die Küche",
          english: "kitchen",
          malayalam: "അടുക്കള",
          pronunciation: "dee kue-kheh",
          example: "Ich koche in der Küche.",
          exampleTranslation: "I cook in the kitchen."
        },
        {
          id: "vocab8-1-2",
          german: "das Wohnzimmer",
          english: "living room",
          malayalam: "സ്വീകരണമുറി",
          pronunciation: "dahs vohn-tsim-mer",
          example: "Wir sitzen im Wohnzimmer.",
          exampleTranslation: "We are sitting in the living room."
        },
        {
          id: "vocab8-1-3",
          german: "das Schlafzimmer",
          english: "bedroom",
          malayalam: "കിടപ്പുമുറി",
          pronunciation: "dahs shlahf-tsim-mer",
          example: "Das Schlafzimmer ist groß.",
          exampleTranslation: "The bedroom is big."
        },
        {
          id: "vocab8-1-4",
          german: "das Badezimmer",
          english: "bathroom",
          malayalam: "കുളിമുറി",
          pronunciation: "dahs bah-deh-tsim-mer",
          example: "Das Badezimmer ist klein.",
          exampleTranslation: "The bathroom is small."
        },
        {
          id: "vocab8-1-5",
          german: "der Flur",
          english: "hallway",
          malayalam: "ഇടനാഴി",
          pronunciation: "dehr floohr",
          example: "Die Schuhe sind im Flur.",
          exampleTranslation: "The shoes are in the hallway."
        },
        {
          id: "vocab8-1-6",
          german: "der Balkon",
          english: "balcony",
          malayalam: "ബാല്‍ക്കണി",
          pronunciation: "dehr bahl-kohn",
          example: "Ich trinke Kaffee auf dem Balkon.",
          exampleTranslation: "I drink coffee on the balcony."
        },
        {
          id: "vocab8-1-7",
          german: "der Tisch",
          english: "table",
          malayalam: "മേശ",
          pronunciation: "dehr tish",
          example: "Das Essen ist auf dem Tisch.",
          exampleTranslation: "The food is on the table."
        },
        {
          id: "vocab8-1-8",
          german: "der Stuhl",
          english: "chair",
          malayalam: "കസേര",
          pronunciation: "dehr shtool",
          example: "Bitte setz dich auf den Stuhl.",
          exampleTranslation: "Please sit on the chair."
        },
        {
          id: "vocab8-1-9",
          german: "das Bett",
          english: "bed",
          malayalam: "കട്ടില്‍",
          pronunciation: "dahs bet",
          example: "Ich liege im Bett.",
          exampleTranslation: "I am lying in bed."
        },
        {
          id: "vocab8-1-10",
          german: "der Schrank",
          english: "cupboard / wardrobe",
          malayalam: "അലമാര",
          pronunciation: "dehr shrahnk",
          example: "Die Kleidung ist im Schrank.",
          exampleTranslation: "The clothes are in the wardrobe."
        },
        {
          id: "vocab8-1-11",
          german: "das Sofa",
          english: "sofa",
          malayalam: "സോഫ",
          pronunciation: "dahs zoh-fah",
          example: "Das Sofa ist sehr bequem.",
          exampleTranslation: "The sofa is very comfortable."
        },
        {
          id: "vocab8-1-12",
          german: "die Lampe",
          english: "lamp",
          malayalam: "വിളക്ക് / ലാമ്പ്",
          pronunciation: "dee lahm-peh",
          example: "Mach bitte die Lampe an.",
          exampleTranslation: "Please turn on the lamp."
        },
        {
          id: "vocab8-1-13",
          german: "die Stadt",
          english: "city",
          malayalam: "നഗരം",
          pronunciation: "dee shtat",
          example: "Berlin ist eine große Stadt.",
          exampleTranslation: "Berlin is a big city."
        },
        {
          id: "vocab8-1-14",
          german: "die Kirche",
          english: "church",
          malayalam: "പള്ളി",
          pronunciation: "dee keer-kheh",
          example: "Die Kirche ist sehr alt.",
          exampleTranslation: "The church is very old."
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
      videos: [
        {
          id: "v8-2-1",
          title: "Prepositions of Place",
          duration: "12:00",
          description: "Learn the essential prepositions for describing where things are located in German.",
          scriptOutline: [
            "Opening: 'Where's my phone?' — Let's learn to answer that in German!",
            "The big 8 prepositions: in, auf, unter, neben, vor, hinter, zwischen, über",
            "Visual demos with objects: 'Die Katze ist AUF dem Tisch.' (The cat is ON the table.)",
            "auf = on top of, unter = under, neben = next to, vor = in front of, hinter = behind",
            "zwischen = between, über = above/over, in = in/inside",
            "KEY GRAMMAR: When talking about LOCATION (where something IS), these prepositions use DATIVE",
            "Dative articles: der → dem, die → der, das → dem",
            "Contractions: in dem = im, an dem = am — Germans love shortcuts!",
            "Practice with room layout: 'Der Stuhl ist neben dem Tisch.'",
            "Don't panic about dative — just memorize 'dem' for der/das and 'der' for die (location only)"
          ],
          keyVocabulary: ["in", "auf", "unter", "neben", "vor", "hinter", "zwischen", "über"],
          learningObjectives: [
            "Use 8 prepositions of place correctly",
            "Understand that location prepositions trigger dative case",
            "Know the basic dative article changes (der→dem, die→der, das→dem)",
            "Use contractions 'im' and 'am' naturally"
          ],
          placeholderThumbnail: "/images/thumbnails/prepositions.jpg"
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
          placeholderThumbnail: "/images/thumbnails/room-layout.jpg"
        }
      ],
      exercises: [
        {
          id: "ex8-2-1",
          type: "multiple-choice",
          question: "Complete: 'Die Katze ist _____ dem Tisch.' (The cat is under the table.)",
          options: ["auf", "unter", "neben", "über"],
          correctAnswer: "unter",
          explanation: "'unter' = under/beneath. 'Die Katze ist unter dem Tisch.' = The cat is under the table.",
          xpReward: 10
        },
        {
          id: "ex8-2-2",
          type: "fill-blank",
          question: "Complete: 'Die Lampe ist auf _____ Tisch.' (The lamp is on the table.)",
          options: ["dem", "der", "den", "das"],
          correctAnswer: "dem",
          explanation: "With location prepositions, 'der Tisch' (masculine) changes to 'dem Tisch' in dative. auf + dem = on the.",
          xpReward: 15
        },
        {
          id: "ex8-2-3",
          type: "multiple-choice",
          question: "What is the contraction of 'in dem'?",
          options: ["ins", "im", "am", "zum"],
          correctAnswer: "im",
          explanation: "'in dem' contracts to 'im'. Example: 'im Wohnzimmer' = in the living room.",
          xpReward: 10
        },
        {
          id: "ex8-2-4",
          type: "matching",
          question: "Match the prepositions with their meanings:",
          options: [
            "auf → on (top of)",
            "neben → next to",
            "hinter → behind",
            "zwischen → between",
            "vor → in front of"
          ],
          correctAnswer: [
            "auf → on (top of)",
            "neben → next to",
            "hinter → behind",
            "zwischen → between",
            "vor → in front of"
          ],
          explanation: "These 5 prepositions are the most commonly used for describing locations in a room.",
          xpReward: 15
        },
        {
          id: "ex8-2-5",
          type: "ordering",
          question: "Put these words in order: ist / dem / Der Stuhl / Tisch / neben",
          options: ["Der Stuhl", "ist", "neben", "dem", "Tisch"],
          correctAnswer: ["Der Stuhl", "ist", "neben", "dem", "Tisch"],
          explanation: "'Der Stuhl ist neben dem Tisch.' = The chair is next to the table.",
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
        }
      ],
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
      videos: [
        {
          id: "v8-3-1",
          title: "WG-Suche! Finding Housing in Germany",
          duration: "12:00",
          description: "Everything you need to know about finding a place to live in Germany — especially the WG (shared apartment) culture.",
          scriptOutline: [
            "Opening: Finding a home in Germany — the biggest challenge for every newcomer!",
            "WG = Wohngemeinschaft (shared apartment) — THE most common housing for students and young people",
            "How WG life works: shared kitchen, bathroom, living room — private bedroom",
            "Kerala parallel: Like paying guest / hostel — but you're equal roommates, not a guest",
            "Key terms: die Wohnung (apartment), das Zimmer (room), die Miete (rent)",
            "Kaltmiete vs Warmmiete: cold rent (base) vs warm rent (includes heating/utilities)",
            "Die Kaution (deposit) — usually 2-3 months of cold rent",
            "Die Nebenkosten (additional costs: water, heating, garbage collection)",
            "Where to search: WG-Gesucht.de, Immobilienscout24, eBay Kleinanzeigen",
            "Tips: Start searching early, be prepared with documents, and be polite!"
          ],
          keyVocabulary: ["die WG", "die Wohnung", "die Miete", "die Kaltmiete", "die Warmmiete", "die Kaution", "die Nebenkosten"],
          learningObjectives: [
            "Understand WG culture and how shared apartments work in Germany",
            "Know the difference between Kaltmiete and Warmmiete",
            "Recognize essential rental vocabulary",
            "Know where and how to search for housing in Germany"
          ],
          placeholderThumbnail: "/images/thumbnails/wg-suche.jpg"
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
          placeholderThumbnail: "/images/thumbnails/apartment-ads.jpg"
        }
      ],
      exercises: [
        {
          id: "ex8-3-1",
          type: "multiple-choice",
          question: "What does 'WG' stand for?",
          options: ["Wohnungsgebäude", "Wohngemeinschaft", "Wochengeschäft", "Wohngruppe"],
          correctAnswer: "Wohngemeinschaft",
          explanation: "WG = Wohngemeinschaft = shared apartment. It's the most popular living arrangement for students in Germany.",
          xpReward: 10
        },
        {
          id: "ex8-3-2",
          type: "multiple-choice",
          question: "What is the difference between Kaltmiete and Warmmiete?",
          options: [
            "Kaltmiete is for winter, Warmmiete for summer",
            "Kaltmiete is base rent, Warmmiete includes heating/utilities",
            "Kaltmiete is cheaper apartments, Warmmiete is expensive",
            "There is no difference"
          ],
          correctAnswer: "Kaltmiete is base rent, Warmmiete includes heating/utilities",
          explanation: "Kalt (cold) Miete = base rent only. Warm Miete = rent + Nebenkosten (utilities like heating, water, garbage).",
          xpReward: 10
        },
        {
          id: "ex8-3-3",
          type: "fill-blank",
          question: "In a housing ad, 'qm' stands for _____ (square meters).",
          options: ["Quadratmeter", "Quartal", "Qualität", "Quartier"],
          correctAnswer: "Quadratmeter",
          explanation: "'qm' = Quadratmeter = square meters. This tells you the size of the apartment.",
          xpReward: 10
        },
        {
          id: "ex8-3-4",
          type: "multiple-choice",
          question: "You see this ad: '2-Zi-Wohnung, 55 qm, 480€ warm, EG.' What floor is this apartment on?",
          options: ["1st floor", "2nd floor", "ground floor", "basement"],
          correctAnswer: "ground floor",
          explanation: "EG = Erdgeschoss = ground floor. 'Erde' means earth/ground.",
          xpReward: 10
        },
        {
          id: "ex8-3-5",
          type: "matching",
          question: "Match the housing abbreviations:",
          options: [
            "Zi → Zimmer (room)",
            "qm → Quadratmeter (square meter)",
            "OG → Obergeschoss (upper floor)",
            "EBK → Einbauküche (fitted kitchen)"
          ],
          correctAnswer: [
            "Zi → Zimmer (room)",
            "qm → Quadratmeter (square meter)",
            "OG → Obergeschoss (upper floor)",
            "EBK → Einbauküche (fitted kitchen)"
          ],
          explanation: "These abbreviations appear in almost every German apartment ad. Memorize them!",
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
        }
      ],
      vocabulary: [
        {
          id: "vocab8-3-1",
          german: "die Wohngemeinschaft (WG)",
          english: "shared apartment",
          malayalam: "പങ്കിട്ട അപ്പാര്‍ട്ട്‌മെന്റ്",
          pronunciation: "dee vohn-geh-mine-shahft (veh-geh)",
          example: "Ich wohne in einer WG.",
          exampleTranslation: "I live in a shared apartment."
        },
        {
          id: "vocab8-3-2",
          german: "die Miete",
          english: "rent",
          malayalam: "വാടക",
          pronunciation: "dee mee-teh",
          example: "Die Miete beträgt 500 Euro.",
          exampleTranslation: "The rent is 500 euros."
        },
        {
          id: "vocab8-3-3",
          german: "die Kaltmiete",
          english: "base rent (without utilities)",
          malayalam: "അടിസ്ഥാന വാടക",
          pronunciation: "dee kahlt-mee-teh",
          example: "Die Kaltmiete ist 400 Euro.",
          exampleTranslation: "The base rent is 400 euros."
        },
        {
          id: "vocab8-3-4",
          german: "die Warmmiete",
          english: "rent including utilities",
          malayalam: "യൂട്ടിലിറ്റി ഉള്‍പ്പെടെയുള്ള വാടക",
          pronunciation: "dee vahrm-mee-teh",
          example: "Die Warmmiete ist 550 Euro.",
          exampleTranslation: "The rent including utilities is 550 euros."
        },
        {
          id: "vocab8-3-5",
          german: "die Kaution",
          english: "security deposit",
          malayalam: "അഡ്വാന്‍സ് / സെക്യൂരിറ്റി ഡെപ്പോസിറ്റ്",
          pronunciation: "dee kau-tsee-ohn",
          example: "Die Kaution beträgt zwei Monatsmieten.",
          exampleTranslation: "The deposit is two months' rent."
        },
        {
          id: "vocab8-3-6",
          german: "die Nebenkosten",
          english: "additional costs / utilities",
          malayalam: "അധിക ചെലവുകള്‍",
          pronunciation: "dee neh-ben-kos-ten",
          example: "Die Nebenkosten sind 150 Euro pro Monat.",
          exampleTranslation: "The utility costs are 150 euros per month."
        },
        {
          id: "vocab8-3-7",
          german: "der Quadratmeter (qm)",
          english: "square meter",
          malayalam: "ചതുരശ്ര മീറ്റര്‍",
          pronunciation: "dehr kvah-draht-meh-ter",
          example: "Die Wohnung hat 65 Quadratmeter.",
          exampleTranslation: "The apartment has 65 square meters."
        },
        {
          id: "vocab8-3-8",
          german: "die Wohnung",
          english: "apartment",
          malayalam: "അപ്പാര്‍ട്ട്‌മെന്റ്",
          pronunciation: "dee voh-noong",
          example: "Ich suche eine Wohnung in Berlin.",
          exampleTranslation: "I am looking for an apartment in Berlin."
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
      videos: [
        {
          id: "v8-4-1",
          title: "Answering an Ad - Your First German Message",
          duration: "14:00",
          description: "Step-by-step guide to writing a formal message in German — essential for apartment hunting and beyond.",
          scriptOutline: [
            "Opening: You found the perfect WG ad — now you need to WRITE to them in German!",
            "Formal vs informal: When to use 'Sie' (formal) vs 'du' (informal) — WG ads are usually 'du'!",
            "Formal letter structure: Start with 'Sehr geehrte Damen und Herren,' (Dear Sir/Madam,)",
            "Informal start for WG: 'Hallo!' or 'Liebe WG,' (Dear WG,)",
            "Body paragraph 1: Introduce yourself — 'Mein Name ist... Ich bin... Jahre alt. Ich komme aus...'",
            "Body paragraph 2: Why you're interested — 'Ich suche ein Zimmer ab...' (I'm looking for a room from...)",
            "Grammar spotlight: 'es gibt' + accusative = 'there is/there are' — 'Gibt es noch freie Zimmer?'",
            "Closing formal: 'Mit freundlichen Grüßen' (With friendly regards) — the German standard",
            "Closing informal: 'Liebe Grüße' or 'Viele Grüße' (Best regards)",
            "Full sample message: Read through a complete WG application message together"
          ],
          keyVocabulary: ["Sehr geehrte Damen und Herren", "Mit freundlichen Grüßen", "es gibt", "Ich suche", "ab sofort"],
          learningObjectives: [
            "Write a formal message using correct German letter format",
            "Use 'es gibt' (there is/are) correctly with accusative",
            "Introduce yourself in writing",
            "Apply for a WG room or apartment via message"
          ],
          placeholderThumbnail: "/images/thumbnails/german-message.jpg"
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
        }
      ],
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
