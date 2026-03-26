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
      videos: [
        {
          id: "v8-1-1",
          title: "Rooms in a German Home",
          duration: "10:00",
          description: "Take a virtual tour of a typical German apartment and learn the name of every room.",
          scriptOutline: [
            "Opening: 'Swantham flat-il thamasikan ishtamulla ellarkkum oru special lesson aanu ithu! Welcome to a German Wohnung!'",
            "The entrance: der Flur (hallway) — 'Germany-yil veerinte akathu footwear allow cheyyില്ല! Flur-il thanne shoes vekkanam!'",
            "Heart of the home: die Küche (kitchen) — 'Nammalkku kitchen pachanayulla sthalam aanel, Germans-inu ithu oru laboratory pole aanu!'",
            "Living space: das Wohnzimmer (living room) — 'Wohn' means living, 'Zimmer' means room. Easy, machane!",
            "Sleep zone: das Schlafzimmer (bedroom) — 'Schlaf' = sleep. No TV usually, just for rest!",
            "Clean zone: das Badezimmer (bathroom). Tips on 'Lüften' (airing out) even in winter!",
            "Outdoor bonus: der Balkon (balcony) — 'Balkon-il irunnu chai kudikkunnathinte oru sukham! Very common here.'",
            "CULTURAL SHOCK: German apartments often come WITHOUT a kitchen — 'Nee thanne kitchen counter-um sink-um vanganum! Imagine that!'",
            "Word building: Just attach the activity to 'Zimmer' and you have the room name!",
            "Practical Check: Can you name every room in your Kerala home in German now?"
          ],
          keyVocabulary: ["die Wohnung", "der Flur", "die Küche", "das Wohnzimmer", "das Schlafzimmer", "der Balkon"],
          learningObjectives: [
            "Name the 7 main areas of a German apartment with correct articles",
            "Understand the 'no-shoes-inside' rule and the 'Flur' concept",
            "Recognize the unique German situation of 'apartments without kitchens'",
            "Master the compound word pattern with '-zimmer'"
          ],
          placeholderThumbnail: "/images/thumbnails/german-rooms.jpg"
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
          placeholderThumbnail: "/images/thumbnails/german-furniture.jpg"
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
        }
      ],
      vocabulary: [
        {
          id: "vocab8-1-1",
          german: "die Küche",
          english: "kitchen",
          malayalam: "അടുക്കള",
          pronunciation: "kue-kheh",
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
      videos: [
        {
          id: "v8-2-1",
          title: "Prepositions of Place",
          duration: "12:00",
          description: "Learn the essential prepositions for describing where things are located in German.",
          scriptOutline: [
            "Opening: 'Mobile evide? Keys evide? Finding things in German is all about Prepositions!'",
            "The big 8: in, auf, unter, neben, vor, hinter, zwischen, über.",
            "Visual demos: 'Die Katze ist AUF dem Tisch.' (cat is ON the table). 'Die Maus ist UNTER dem Bett.'",
            "auf = surface contact, über = floating above. Don't mix them up, machane!",
            "KEY GRAMMAR: Location (Wo?) = Dative Case. This is the first boss level of German!",
            "Dative shortcut: der → dem, das → dem. 'Dem' replaces 'der/das' for location.",
            "Feminine check: die → der. 'In der Küche' (in the kitchen).",
            "Contractions are key: in + dem = im, an + dem = am. Always use 'im' it sounds more natural!",
            " Kerala Home Tip: Describe your room layout to a friend in German for practice.",
            "Summary: Location always needs Datur. Just memorize: Masculine/Neuter = DEM, Feminine = DER."
          ],
          keyVocabulary: ["im", "am", "auf dem", "unter dem", "neben dem", "hinter dem"],
          learningObjectives: [
            "Use 8 prepositions of place correctly",
            "Apply Dative article changes (dem/der) for location",
            "Use contractions 'im' and 'am' naturally",
            "Describe the position of objects in any room"
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
            "Opening: 'Germany-yil flat kittan oru interview pass aakanam ennu paranjaal viswasikkumo? Welcome to WG-Suche!'",
            "WG = Wohngemeinschaft. 'Namukku college hostels pole oru internal system, but for adults!'",
            "How WG life works: You don't just 'rent' a room, you join a 'community'. Cleaning schedules (Putzplan) are sacred!",
            "CULTURAL HOCK: The 'WG-Casting'. 'Oru job interview pole flatmates-inte munnil poyi performance tharanam!'",
            "Key phrases: die Miete (rent), die Kaution (deposit). 'Kaution usually 3 months rent aanu — budget set cheyyanam!'",
            "Kaltmiete (base) vs Warmmiete (all-in). 'Warmmiete-yil heating-um water-um okke undakum.'",
            "Nebenkosten (NK): Extra costs. 'Electricity and Internet are usually extra — chodikkan marakkenda!'",
            "Where to look: WG-Gesucht.de is the Bible for students. 'eBay Kleinanzeigen also works, but beware of scams!'",
            "Indian Parallel: Like a PG, but you have equal rights and shared chores. No 'warden' here!"
          ],
          keyVocabulary: ["die WG", "das Casting", "die Miete", "die Kaution", "die Warmmiete", "die Nebenkosten"],
          learningObjectives: [
            "Understand the social 'Casting' culture in German housing",
            "Differentiate between Kaltmiete and Warmmiete like a pro",
            "Recognize common rental red flags and scams",
            "Navigate the top housing websites in Germany"
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
        }
      ],
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
