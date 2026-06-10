import type { Module } from '../types';

export const MODULE_6: Module = {
  id: 6,
  title: "Food & Drink",
  titleGerman: "Essen und Trinken",
  description:
    "Learn to talk about food, order at restaurants, and share your love of Kerala cuisine in German!",
  icon: "🍽️",
  color: "#ef4444",
  totalHours: 12,
  unlockRequirement: "Complete Module 5",
  learningTips: [
    "Learn food words with their articles: das Brot, der Reis, die Kartoffel. Gender is part of the word!",
    "Next time you eat, describe your meal in German. 'Ich esse Reis mit Curry. Das ist lecker!'",
    "'Gern' is magic: add it after any verb to say you LIKE doing it. 'Ich esse gern' = I like to eat.",
  ],
  lessons: [
    // ──────────────────────────────────────────────
    // Lesson 6-1: Common Foods
    // ──────────────────────────────────────────────
    {
      id: "6-1",
      title: "Common Foods",
      titleGerman: "Häufige Lebensmittel",
      description:
        "Learn the German names for everyday foods — from bread and rice to Kerala favourites like dal and curry!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Local Bäckerei Schmidt",
          sceneType: "bakery",
          timeOfDay: "morning",
          description: "The smell of fresh Brot and Brötchen is everywhere. The counter is filled with loaves of all shapes and sizes — 300 varieties! It feels like a high-stakes puzzle trying to choose just one. For a Malayali, bread is usually a side, but here it's the king of the table. Time to learn your staples, machane!",
        },
        narrative: {
          previousRecap: "You've mastered the daily routine. Now, let's fuel up! Food is the heart of every culture, and Germany is no different.",
          currentObjective: "Identify common foods with their correct articles and compare German/Kerala staples",
          nextTeaser: "Next: thirst quenchers! From Kaffee to the sparkling water mystery!",
        },
        kuttanIntro: [
          "Machane! Food-inde karyathil no compromise. Germany-il bread ('Brot') aanu main player. Nammukku choru (rice) poleyaanu ivide bread.",
          "Articles (der, die, das) food words-innu valare important aanu. 'Die Kartoffel' (potato) is like our rice substitute. Ellaam articles-oodu koodi vegam set aakkaam!",
          "Pinne 'scharf' (spicy) — German level-um Kerala level-um thammil valya difference undorkkane! Let's eat!",
        ],
        vocabEncounters: [
          { vocabId: "vocab6-1-1", encounterMoment: "The baker points to a loaf: 'Das Brot ist frisch.' (The bread is fresh).", contextSentence: "Ich esse Brot zum Frühstück." },
          { vocabId: "vocab6-1-7", encounterMoment: "You see a potato salad: 'Die Kartoffel ist sehr wichtig hier.' (The potato is very important here).", contextSentence: "Deutsche essen viele Kartoffeln." },
          { vocabId: "vocab6-1-9", encounterMoment: "You spot some lentil soup: 'Linsen sind wie Dal.' (Lentils are like dal).", contextSentence: "Linsen sind wie Dal." },
          { vocabId: "vocab6-1-10", encounterMoment: "A sign on a curry bowl: 'Vorsicht, sehr scharf!' (Caution, very spicy!). Challenge accepted?", contextSentence: "Das Curry ist sehr scharf!" },
          { vocabId: "vocab6-1-2", encounterMoment: "The baker asks if you want rice: 'Der Reis ist da.' (The rice is there).", contextSentence: "In Kerala essen wir viel Reis." },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'The potato is delicious' (Kartoffel = bread of Germany). Which article do you use?",
            options: [
              { text: "Die Kartoffel ist lecker.", isCorrect: true, response: "Exactly! Kartoffel is feminine (die). You correctly paired the article and adjective!", kuttanReaction: "Adipoli! Food genders theriyaathe handle cheyyunnathu valya karyamaanu. You're a pro! 🔥" },
              { text: "Der Kartoffel ist lecker.", isCorrect: false, response: "Aiyyo! 'Kartoffel' is feminine (die). Most vegetable words end in '-e' and are often feminine.", kuttanReaction: "Vite machane! Gender article care venam. 'die Kartoffel' ennu thanne parayanam. Try again! 😬" },
            ],
          },
          {
            moment: "How do you tell someone 'I like it spicy' (scharf)?",
            options: [
              { text: "Ich esse gern scharf.", isCorrect: true, response: "Correct! 'gern' (with pleasure) and 'scharf' (spicy) is a powerful combo for any Malayali!", kuttanReaction: "Superb! Kerala taste-inte brand ambassador thanne thanne! 'Scharf' is the way! ⭐" },
              { text: "Ich esse scharf.", isCorrect: false, response: "Technically okay, but adding 'gern' makes it much more natural when speaking about preferences.", kuttanReaction: "Aiyyo! 'Gern' koodi add cheythal nalla vibe aayirunnu. Preference parayumpol athannu better. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v6-1-1",
          title: "German Foods You Should Know",
          duration: "10:00",
          description:
            "Discover the most common German food vocabulary with articles and pronunciation.",
          scriptOutline: [
            "Opening: 'Essen! Food! — Nammude favourite topic alle? Let's eat German!'",
            "das Brot (bread) — German-il 300-il adhikam bread varieties undu! Nammude parotta pole common aanu.",
            "der Reis (rice) — 'Choru' universal aanu, but quality-il difference undu.",
            "das Fleisch (meat), der Fisch (fish) — fish lovers-innu scene illa evide!",
            "das Gemüse (vegetables) — collective noun aanu, plural venda.",
            "das Obst (fruit) — fruits-um collective aanu.",
            "die Kartoffel (potato) — Malayalis-innu rice pole aanu Germans-innu potato!",
            "der Käse (cheese) — 'Kä-ze' (kay-zeh), not cheese/case!",
            "Remember: Article (der, die, das) arinjale food order cheyyan pattu!"
          ],
          keyVocabulary: [
            "das Brot",
            "der Reis",
            "das Fleisch",
            "das Gemüse",
            "die Kartoffel",
            "der Käse"
          ],
          learningObjectives: [
            "Name 8+ common foods in German with correct articles",
            "Understand the importance of grammatical gender with food nouns",
            "Recognize German food culture basics"
          ],
          placeholderThumbnail: "/images/german_bakery.png",
          richContent: [
            {
              type: "table",
              title: "Essential Food Vocabulary",
              headers: ["German", "Article", "English", "Malayalam"],
              rows: [
                ["Brot", "das", "bread", "റൊട്ടി"],
                ["Reis", "der", "rice", "ചോറ്"],
                ["Fleisch", "das", "meat", "ഇറച്ചി"],
                ["Fisch", "der", "fish", "മീൻ"],
                ["Gemüse", "das", "vegetables", "പച്ചക്കറി"],
                ["Obst", "das", "fruit", "പഴം"],
                ["Kartoffel", "die", "potato", "ഉരുളക്കിഴങ്ങ്"],
                ["Käse", "der", "cheese", "ചീസ്"]
              ]
            },
            {
              type: "note",
              title: "Bread is King in Germany!",
              variant: "info",
              content: "Germany has over 300 types of bread — more than any other country! 'Brot' and 'Brötchen' (bread rolls) are staple items. For Malayalis, think of bread as the German equivalent of rice."
            },
            {
              type: "note",
              title: "Articles Matter for Food!",
              variant: "tip",
              content: "Learn every food word WITH its article: 'das Brot', 'der Reis', 'die Kartoffel'. You will need the correct article when ordering: 'Ich nehme DEN Reis' (accusative!)."
            }
          ]
        },
        {
          id: "v6-1-2",
          title: "Indian Food in German",
          duration: "10:00",
          description:
            "How to describe your favourite Kerala and Indian dishes using German vocabulary.",
          scriptOutline: [
            "Opening: 'Nammude Kerala food German-il parayam!'",
            "das Curry — same word, but 'kuh-ree' ennu parayanam.",
            "die Linsen — parippu/dal logic! 'Ich esse gern Linsen.'",
            "das Naan / das Chapati — Germans-innu ithu parayanda aavashyam illa, standard aanu.",
            "scharf (spicy) — 'Kerala Curry ist sehr scharf!' — Germans-innu ithu thangan pattiya level alla! 😄",
            "Lieblingsessen: 'Mein Lieblingsessen ist Biryani.' — biryani-il no compromise!",
            "Vegetarian/vegan: vegetarisch, vegan. Germany-il ithu valya scene illa, ellidathum undu."
          ],
          keyVocabulary: [
            "das Curry",
            "die Linsen",
            "das Hühnchen",
            "scharf",
            "vegetarisch"
          ],
          learningObjectives: [
            "Describe Indian/Kerala foods in German",
            "Use 'scharf' and other food adjectives",
            "Talk about dietary preferences (vegetarisch, vegan)"
          ],
          placeholderThumbnail: "/images/kaffeeklatsch.png",
          richContent: [
            {
              type: "table",
              title: "Indian/Kerala Foods in German",
              headers: ["Food", "German", "Useful Phrase"],
              rows: [
                ["Curry", "das Curry", "Ich esse gern Curry."],
                ["Dal/Parippu", "die Linsen", "Ich esse gern Linsen."],
                ["Chicken", "das Hühnchen", "Hühnchen Curry, bitte!"],
                ["Biryani", "der Biryani", "Mein Lieblingsessen ist Biryani."],
                ["Naan", "das Naan", "Naan mit Curry."],
                ["Chapati", "das Chapati", "Zwei Chapati, bitte."]
              ]
            },
            {
              type: "table",
              title: "Dietary Preferences",
              headers: ["German", "English", "Sentence"],
              rows: [
                ["vegetarisch", "vegetarian", "Ich bin Vegetarier/in."],
                ["vegan", "vegan", "Ich esse vegan."],
                ["scharf", "spicy", "Ich esse gern scharf."],
                ["Lieblingsessen", "favourite food", "Mein Lieblingsessen ist..."]
              ]
            },
            {
              type: "note",
              title: "Germans and Spice",
              variant: "tip",
              content: "What Malayalis consider 'mild' is already 'sehr scharf' (very spicy) for most Germans! When describing Kerala food, always warn: 'Vorsicht, das ist SEHR scharf!' They will thank you later."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex6-1-1",
          type: "matching",
          question: "Match the German food to its English meaning:",
          options: ["das Brot", "der Reis", "das Gemüse", "der Käse", "das Obst"],
          correctAnswer: ["bread", "rice", "vegetables", "cheese", "fruit"],
          xpReward: 15
        },
        {
          id: "ex6-1-2",
          type: "multiple-choice",
          question: "What is the correct article for 'Kartoffel' (potato)?",
          options: ["der Kartoffel", "die Kartoffel", "das Kartoffel", "ein Kartoffel"],
          correctAnswer: "die Kartoffel",
          imageUrl: "/images/german_potato_dish.png",
          explanation:
            "Die Kartoffel (feminine). Germans love potatoes like Malayalis love rice! Tip: there's no reliable rule for food gender — just memorize der/die/das with each word.",
          xpReward: 10
        },
        {
          id: "ex6-1-3",
          type: "multiple-choice",
          question: "How do you say 'Rice is also important in Kerala' in German?",
          options: [
            "Reis ist auch in Kerala wichtig",
            "Reis auch ist in Kerala wichtig",
            "Reis in Kerala ist auch wichtig",
            "Auch Reis Kerala ist wichtig"
          ],
          correctAnswer: "Reis ist auch in Kerala wichtig",
          explanation:
            "German word order rule: the verb is ALWAYS in position 2. 'Auch' (also) and other adverbs slot in after the verb: Reis IST auch in Kerala wichtig.",
          xpReward: 10
        },
        {
          id: "ex6-1-4",
          type: "fill-blank",
          question: "Die _____ sind wie Parippu/Dal! (lentils)",
          options: ["Linsen", "Kartoffeln", "Bohnen", "Erbsen"],
          correctAnswer: "Linsen",
          explanation:
            "'Die Linsen' (plural) = lentils = parippu! Learning food words is easy when you connect them to foods you already love. Linsen = parippu. Done!",
          xpReward: 10
        },
        {
          id: "ex6-1-5",
          type: "multiple-choice",
          question: "What does 'scharf' mean when describing food?",
          options: ["sweet", "sour", "spicy", "bitter"],
          correctAnswer: "spicy",
          explanation:
            "'Scharf' = spicy (for food) or sharp (for objects). Germans consider food 'scharf' at levels Malayalis call 'mild'. Useful phrase: 'Ich mag es scharf!' (I like it spicy!)",
          xpReward: 10
        },
        {
          id: "ex6-1-6",
          type: "multiple-choice",
          question: "What does 'Mein Lieblingsessen' mean?",
          options: ["My favourite food", "My breakfast", "My cooking", "My restaurant"],
          correctAnswer: "My favourite food",
          explanation: "German builds compound words: Lieblings (favourite) + Essen (food) = Lieblingsessen. You can use 'Lieblings-' with anything: Lieblingsfilm (favourite movie), Lieblingslied (favourite song)!",
          xpReward: 10
        },
        {
          id: "ex6-1-7",
          type: "dictation",
          question: "Listen and type: Ich esse gern Reis mit Curry.",
          correctAnswer: "Ich esse gern Reis mit Curry",
          explanation: "Super! A very typical sentence for a Malayali learning German. No article needed for 'Reis' or 'Curry' when speaking generally!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-rice-curry.mp3"
        },
        {
          id: "ex6-1-8",
          type: "free-text",
          question: "Translate to German: 'Bread is healthy.' (Bread = Brot, healthy = gesund)",
          correctAnswer: "Brot ist gesund",
          explanation: "Wunderbar! 'Brot ist gesund.' — remember that all nouns must be capitalized!",
          xpReward: 30
        }
      ,
        {
          id: "ex6-1-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Common Foods): 'Ich möchte Reis und Fisch, bitte.'",
          questionGerman: "Sprechen Sie laut: 'Ich möchte Reis und Fisch, bitte.'",
          correctAnswer: "Ich möchte Reis und Fisch, bitte",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab6-1-1",
          german: "das Brot",
          english: "bread",
          malayalam: "റൊട്ടി",
          pronunciation: "broht",
          example: "Ich esse Brot zum Frühstück.",
          exampleTranslation: "I eat bread for breakfast."
        },
        {
          id: "vocab6-1-2",
          german: "der Reis",
          english: "rice",
          malayalam: "ചോറ് / അരി",
          pronunciation: "rys",
          example: "In Kerala essen wir viel Reis.",
          exampleTranslation: "In Kerala we eat a lot of rice."
        },
        {
          id: "vocab6-1-3",
          german: "das Fleisch",
          english: "meat",
          malayalam: "മാംസം",
          pronunciation: "flysh",
          example: "Ich esse kein Fleisch.",
          exampleTranslation: "I don't eat meat."
        },
        {
          id: "vocab6-1-4",
          german: "der Fisch",
          english: "fish",
          malayalam: "മീൻ",
          pronunciation: "fish",
          example: "Der Fisch ist frisch.",
          exampleTranslation: "The fish is fresh."
        },
        {
          id: "vocab6-1-5",
          german: "das Gemüse",
          english: "vegetables",
          malayalam: "പച്ചക്കറി",
          pronunciation: "ge-mü-ze",
          example: "Ich esse gern Gemüse.",
          exampleTranslation: "I like eating vegetables."
        },
        {
          id: "vocab6-1-6",
          german: "das Obst",
          english: "fruit",
          malayalam: "പഴം",
          pronunciation: "ohpst",
          example: "Obst ist gesund.",
          exampleTranslation: "Fruit is healthy."
        },
        {
          id: "vocab6-1-7",
          german: "die Kartoffel",
          english: "potato",
          malayalam: "ഉരുളക്കിഴങ്ങ്",
          pronunciation: "kar-to-fel",
          example: "Deutsche essen viele Kartoffeln.",
          exampleTranslation: "Germans eat a lot of potatoes."
        },
        {
          id: "vocab6-1-8",
          german: "der Käse",
          english: "cheese",
          malayalam: "ചീസ്",
          pronunciation: "kä-ze",
          example: "Ich mag Käse auf Brot.",
          exampleTranslation: "I like cheese on bread."
        },
        {
          id: "vocab6-1-9",
          german: "die Linsen",
          english: "lentils",
          malayalam: "പരിപ്പ്",
          pronunciation: "lin-zen",
          example: "Linsen sind wie Dal.",
          exampleTranslation: "Lentils are like dal."
        },
        {
          id: "vocab6-1-10",
          german: "scharf",
          english: "spicy / hot",
          malayalam: "എരിവുള്ള",
          pronunciation: "sharf",
          example: "Das Curry ist sehr scharf!",
          exampleTranslation: "The curry is very spicy!"
        },
        {
          id: "vocab6-1-11",
          german: "das Ei",
          english: "egg",
          malayalam: "മുട്ട",
          pronunciation: "dahs eye",
          example: "Ich esse ein Ei zum Frühstück.",
          exampleTranslation: "I eat an egg for breakfast."
        },
        {
          id: "vocab6-1-12",
          german: "das Salz",
          english: "salt",
          malayalam: "ഉപ്പ്",
          pronunciation: "dahs zalts",
          example: "Kannst du mir das Salz geben?",
          exampleTranslation: "Can you pass me the salt?"
        }
      ]
    },

    // ──────────────────────────────────────────────
    // Lesson 6-2: Drinks
    // ──────────────────────────────────────────────
    {
      id: "6-2",
      title: "Drinks",
      titleGerman: "Getränke",
      description:
        "From Kaffee to Chai — learn to talk about your favourite drinks and use 'gern' to say what you like!",
      duration: "45 min",
      xpReward: 120,
      storyScene: {
        setting: {
          name: "WG Kitchen, Weekend Breakfast",
          sceneType: "home",
          timeOfDay: "morning",
          description: "The sun is streaming through the window. Stefan is brewing coffee, and the smell is amazing. He offers you a glass of water, but wait! It's fizzy. 'Sprudel' or 'Stilles Wasser'? In Germany, this is a life-changing decision. Time to pick your potion, machane!",
        },
        narrative: {
          previousRecap: "You've survived the 300-bread bakery. Now, let's wash it down with some drinks!",
          currentObjective: "Identify drinks with articles and express likes/dislikes using 'gern'",
          nextTeaser: "Next: formal dining! Let's order at a real German restaurant!",
        },
        kuttanIntro: [
          "Machane! Welcome to the juice and water capital. Germans love their 'Saft' (juice) and their 'Sprudel' (sparkling water).",
          "Most drinks are masculine ('der Kaffee', 'der Tee'), but 'das Wasser' is neuter. Ithu oru shortcut aayi orkkane.",
          "Pinne order cheyyumpol 'Ich hätte gern...' ennu parayenam. Nalla polite aayi drinks set aakkaam!",
        ],
        vocabEncounters: [
          { vocabId: "vocab6-2-1", encounterMoment: "Stefan hands you a mug: 'Hier ist dein Kaffee.' Strong onset of the day!", contextSentence: "Morgens trinke ich Kaffee." },
          { vocabId: "vocab6-2-3", encounterMoment: "You look at the bottle: 'Ist das Wasser mit Kohlensäure?' You're hoping for still water!", contextSentence: "Kann ich ein Glas Wasser haben?" },
          { vocabId: "vocab6-2-2", encounterMoment: "You prefer tea: 'Ich trinke gern Tee mit Milch.' Pure Kerala vibes!", contextSentence: "Ich trinke gern Tee mit Milch." },
          { vocabId: "vocab6-2-4", encounterMoment: "Stefan drinks juice: 'Ich liebe Orangensaft.' Fruit power!", contextSentence: "Ich trinke Orangensaft." },
          { vocabId: "vocab6-2-8", encounterMoment: "You summarize: 'Ich esse gern Brot and trinke gern Kaffee.' Perfect breakfast intro!", contextSentence: "Ich esse gern Curry." },
        ],
        decisionPoints: [
          {
            moment: "You want a plain water (no gas). What do you ask for?",
            options: [
              { text: "Stilles Wasser, bitte.", isCorrect: true, response: "Exactly! 'Still' or 'ohne Gas' is what you need for non-fizzy water. You've avoided the trap!", kuttanReaction: "Adipoli! Sparkling water kudippikkaathe nallonam handle cheythallo. You're a pro! 🔥" },
              { text: "Wasser mit Gas, bitte.", isCorrect: false, response: "Aiyyo! 'Mit Gas' means sparkling! Your mouth is about to get a bubble surprise!", kuttanReaction: "Vite machane! Bubbles venda enkil 'still' ennu thanne parayanam. Try again! 😬" },
            ],
          },
          {
            moment: "How do you say 'I like to drink tea' properly in German?",
            options: [
              { text: "Ich trinke gern Tee.", isCorrect: true, response: "Correct! 'gern' (to like doing something) follows the verb immediately.", kuttanReaction: "Superb! 'Ich trinke gern' — regular pattern exactly catch cheythallo! ⭐" },
              { text: "Ich gern trinke Tee.", isCorrect: false, response: "No, 'gern' doesn't come before the verb. Position 2 is for the verb, and 'gern' follows it.", kuttanReaction: "Aiyyo! Verb first, 'gern' second. Position properly fix cheyyaam. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v6-2-1",
          title: "Was trinkst du? - German Drinks",
          duration: "10:00",
          description:
            "Learn common drink vocabulary and how to express your preferences using 'gern'.",
          scriptOutline: [
            "Opening: 'Was trinkst du? — Chai? Kaffee? Let's order!'",
            "der Kaffee (coffee) — Germans drink MORE coffee than beer! Satyam!",
            "der Tee (tea) — 'Ich trinke gern Tee.' — chai lovers point!",
            "das Wasser (water) — THE TRAP: 'mit Kohlensäure' (soda/fizz) or 'ohne Kohlensäure' (still).",
            "Cultural shock: Plain water order cheyyaan 'still' or 'ohne Gas' parayenam!",
            "der Saft (juice) — Orangensaft, Apfelsaft (apple juice is HUGE here).",
            "die Milch (milk) — standard article care.",
            "Using 'gern': 'Ich trinke gern Tee.' (I enjoy drinking tea.)",
            "Ordering: 'Ich hätte gern einen Kaffee, bitte.' (The magic polite phrase!)"
          ],
          keyVocabulary: [
            "der Kaffee",
            "der Tee",
            "das Wasser",
            "der Saft",
            "die Milch",
            "gern"
          ],
          learningObjectives: [
            "Name 7 common drinks in German with correct articles",
            "Use 'gern' and 'nicht gern' to express drink preferences",
            "Order a drink politely in German"
          ],
          placeholderThumbnail: "/images/water_types.png",
          richContent: [
            {
              type: "table",
              title: "Common German Drinks",
              headers: ["German", "Article", "English"],
              rows: [
                ["Kaffee", "der", "coffee"],
                ["Tee", "der", "tea"],
                ["Wasser", "das", "water"],
                ["Saft", "der", "juice"],
                ["Milch", "die", "milk"],
                ["Bier", "das", "beer"],
                ["Wein", "der", "wine"]
              ]
            },
            {
              type: "note",
              title: "The Water Trap!",
              variant: "warning",
              content: "If you order 'Wasser' in Germany, you will get SPARKLING water (mit Kohlensäure)! For still water, always say: 'Stilles Wasser, bitte' or 'Wasser ohne Kohlensäure'. Otherwise, prepare for bubbles!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "Ich hätte gern...", english: "I would like...", malayalam: "എനിക്ക് ... വേണം", pronunciation: "ikh het-te gairn" },
                { german: "mit Kohlensäure", english: "sparkling", malayalam: "സോഡ/ബബിൾസ്", pronunciation: "mit ko-len-zoy-re" },
                { german: "ohne Kohlensäure", english: "still (no gas)", malayalam: "സാധാരണ വെള്ളം", pronunciation: "oh-ne ko-len-zoy-re" }
              ]
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex6-2-1",
          type: "matching",
          question: "Match the German drink to its English meaning:",
          options: ["der Kaffee", "der Tee", "das Wasser", "die Milch", "der Saft"],
          correctAnswer: ["coffee", "tea", "water", "milk", "juice"],
          xpReward: 15
        },
        {
          id: "ex6-2-2",
          type: "multiple-choice",
          question: "How do you say 'I like to drink tea'?",
          options: [
            "Ich trinke gern Tee.",
            "Ich gern trinke Tee.",
            "Ich trinke Tee gern.",
            "Gern ich trinke Tee."
          ],
          correctAnswer: "Ich trinke gern Tee.",
          explanation:
            "'Gern' goes right after the verb and means 'with pleasure'. Ich trinke GERN Tee = I LIKE drinking tea. Add 'nicht' before gern to say you DON'T like it.",
          xpReward: 10
        },
        {
          id: "ex6-2-3",
          type: "fill-blank",
          question: "Ich hätte _____ einen Orangensaft, bitte. (I would like)",
          options: ["gern", "nicht", "auch", "sehr"],
          correctAnswer: "gern",
          explanation:
            "'Ich hätte gern...' is the magic ordering phrase. Literally: 'I would have gladly...' Use it everywhere: restaurants, shops, bakeries. It's polite and universally understood.",
          xpReward: 10
        },
        {
          id: "ex6-2-4",
          type: "multiple-choice",
          question: "What is the correct article for 'Milch' (milk)?",
          options: ["der Milch", "die Milch", "das Milch", "den Milch"],
          correctAnswer: "die Milch",
          explanation: "Die Milch (feminine). Drink genders to memorize: der Kaffee (m), der Tee (m), das Wasser (n), die Milch (f), der Saft (m). Most drinks are masculine (der)!",
          xpReward: 10
        },
        {
          id: "ex6-2-5",
          type: "fill-blank",
          question:
            "Ich trinke _____ gern Bier. (not — to say you don't like it)",
          options: ["nicht", "kein", "nie", "sehr"],
          correctAnswer: "nicht",
          explanation:
            "Like → gern, Don't like → nicht gern. Position: verb + NICHT + gern. 'Ich trinke nicht gern Bier.' This pattern works with any verb!",
          xpReward: 10
        },
        {
          id: "ex6-2-6",
          type: "dictation",
          question: "Listen and type: Ich trinke gern Tee mit Milch.",
          correctAnswer: "Ich trinke gern Tee mit Milch",
          explanation: "Perfect! 'Tee mit Milch' — exactly how many Malayalis like their chai!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-tea-milk.mp3"
        },
        {
          id: "ex6-2-7",
          type: "free-text",
          question: "Write in German: 'I would like a water, please.' (I would like = Ich hätte gern, water = Wasser)",
          correctAnswer: "Ich hätte gern ein Wasser, bitte",
          explanation: "Excellent! 'Ich hätte gern ein Wasser, bitte.' — the most polite way to order!",
          xpReward: 30
        }
      ,
        {
          id: "ex6-2-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Drinks): 'Ich möchte Reis und Fisch, bitte.'",
          questionGerman: "Sprechen Sie laut: 'Ich möchte Reis und Fisch, bitte.'",
          correctAnswer: "Ich möchte Reis und Fisch, bitte",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab6-2-1",
          german: "der Kaffee",
          english: "coffee",
          malayalam: "കാപ്പി",
          pronunciation: "ka-fay",
          example: "Morgens trinke ich Kaffee.",
          exampleTranslation: "In the morning I drink coffee."
        },
        {
          id: "vocab6-2-2",
          german: "der Tee",
          english: "tea",
          malayalam: "ചായ",
          pronunciation: "tay",
          example: "Ich trinke gern Tee mit Milch.",
          exampleTranslation: "I like to drink tea with milk."
        },
        {
          id: "vocab6-2-3",
          german: "das Wasser",
          english: "water",
          malayalam: "വെള്ളം",
          pronunciation: "va-ser",
          example: "Kann ich ein Glas Wasser haben?",
          exampleTranslation: "Can I have a glass of water?"
        },
        {
          id: "vocab6-2-4",
          german: "der Saft",
          english: "juice",
          malayalam: "ജ്യൂസ്",
          pronunciation: "zaft",
          example: "Ich trinke Orangensaft.",
          exampleTranslation: "I drink orange juice."
        },
        {
          id: "vocab6-2-5",
          german: "die Milch",
          english: "milk",
          malayalam: "പാൽ",
          pronunciation: "milkh",
          example: "Die Milch ist im Kühlschrank.",
          exampleTranslation: "The milk is in the fridge."
        },
        {
          id: "vocab6-2-6",
          german: "das Bier",
          english: "beer",
          malayalam: "ബിയർ",
          pronunciation: "beer",
          example: "Deutschland ist berühmt für Bier.",
          exampleTranslation: "Germany is famous for beer."
        },
        {
          id: "vocab6-2-7",
          german: "der Wein",
          english: "wine",
          malayalam: "വൈൻ",
          pronunciation: "vyn",
          example: "Möchten Sie Rot- oder Weißwein?",
          exampleTranslation: "Would you like red or white wine?"
        },
        {
          id: "vocab6-2-8",
          german: "gern / gerne",
          english: "gladly / to like (doing)",
          malayalam: "ഇഷ്ടത്തോടെ",
          pronunciation: "gairn / gair-ne",
          example: "Ich esse gern Curry.",
          exampleTranslation: "I like to eat curry."
        }
      ]
    },

    // ──────────────────────────────────────────────
    // Lesson 6-3: At the Restaurant
    // ──────────────────────────────────────────────
    {
      id: "6-3",
      title: "At the Restaurant",
      titleGerman: "Im Restaurant",
      description:
        "Master the essential phrases for ordering food, asking for recommendations, and paying the bill in a German restaurant!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Gasthaus 'Zum Hirschen'",
          sceneType: "restaurant",
          timeOfDay: "evening",
          description: "A cozy, traditional German restaurant with wooden tables and a warm atmosphere. The menu (Speisekarte) is filled with hearty dishes. Stefan is across from you, and the waiter is approaching. It's time to put your German to the ultimate test: ordering a full meal and handled the bill like a local, machane!",
        },
        narrative: {
          previousRecap: "You've survived the breakfast drinks. Now, it's time for the main event — a real German dinner!",
          currentObjective: "Order food and drinks politely, ask for recommendations, and handle the bill/tipping",
          nextTeaser: "Next: opinions! What do you like? What do you hate? Let's talk about preferences!",
        },
        kuttanIntro: [
          "Machane! Restaurant experience is separate level scene aanu. Ivide nammal polite aayi 'Ich hätte gern...' ennu thanne parayanam.",
          "Speisekarte read cheyyunnathu pichakamaayi orkkane — Vorspeise (starter), Hauptgericht (main), Nachspeise (dessert).",
          "Pinne billing-il 'Stimmt so!' magic marakkaruthu. Tipping culture Germany-il special aanu. Let's order!",
        ],
        vocabEncounters: [
          { vocabId: "vocab6-3-1", encounterMoment: "The waiter hands you the menu: 'Die Speisekarte, bitte!'", contextSentence: "Die Speisekarte, bitte!" },
          { vocabId: "vocab6-3-2", encounterMoment: "You're ready: 'Ich möchte bestellen.' (I would like to order).", contextSentence: "Ich möchte bestellen." },
          { vocabId: "vocab6-3-8", encounterMoment: "The food arrives: 'Das Essen war sehr lecker!' You tell the waiter.", contextSentence: "Das Essen war sehr lecker!" },
          { vocabId: "vocab6-3-3", encounterMoment: "Time to go: 'Die Rechnung, bitte!'", contextSentence: "Die Rechnung, bitte!" },
          { vocabId: "vocab6-3-10", encounterMoment: "Paying: 'Kann ich mit Karte zahlen?' (Can I pay by card?).", contextSentence: "Kann ich mit Karte zahlen?" },
        ],
        decisionPoints: [
          {
            moment: "The waiter asks what you'd like. How do you order the Schnitzel politely?",
            options: [
              { text: "Ich hätte gern das Schnitzel.", isCorrect: true, response: "Perfect! 'Ich hätte gern' is the most polite and natural way to order. The waiter is impressed!", kuttanReaction: "Adipoli! 'Ich hätte gern' formula application super! Germany-il ithu oru magic phrase aanu. 🔥" },
              { text: "Ich will das Schnitzel.", isCorrect: false, response: "Aiyyo! 'Ich will' (I want) sounds very rude and demanding. Use 'Ich hätte gern' instead!", kuttanReaction: "Vite machane! 'Ich will' command pole aayirikkum. Courteous aayi 'hätte gern' parayaam. Try again! 😬" },
            ],
          },
          {
            moment: "The bill is 18.50 Euro. You give the waiter 20 Euro and want him to keep the change as a tip. What do you say?",
            options: [
              { text: "Stimmt so!", isCorrect: true, response: "Exactly! This tells the waiter to keep the rest as a tip. It's the standard German way.", kuttanReaction: "Superb! 'Stimmt so!' means 'it fits like this'. Tipping culture perfect aayi catch cheythallo! ⭐" },
              { text: "Danke, kein Geld.", isCorrect: false, response: "No, that doesn't make sense. If you say that, the waiter might think you're Refusing to pay or just confused!", kuttanReaction: "Aiyyo! 'Stimmt so!' aanu phrase. Tipping context-il ithu thanne fixed aanu. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v6-3-1",
          title: "Ordering Food in German",
          duration: "10:00",
          description:
            "Learn how to read a menu, order food, and interact with the waiter in German.",
          scriptOutline: [
            "Opening: 'You walk into a German restaurant... what do you say?'",
            "Entering: 'Einen Tisch für zwei, bitte.' (A table for two, please.)",
            "Asking for the menu: 'Die Speisekarte, bitte!' (The menu, please!)",
            "Reading the menu: Vorspeise (starter), Hauptgericht (main course), Nachspeise (dessert)",
            "Ordering: 'Ich hätte gern das Schnitzel.' / 'Ich nehme die Suppe.'",
            "Asking for recommendations: 'Was empfehlen Sie?' (What do you recommend?)",
            "Special requests: 'Ohne Zwiebeln, bitte.' (Without onions, please.)",
            "Kerala touch: 'Imagine ordering at a toddy shop — but in German! Ich hätte gern Karimeen!' 😄"
          ],
          keyVocabulary: [
            "die Speisekarte",
            "bestellen",
            "Ich hätte gern...",
            "Was empfehlen Sie?"
          ],
          learningObjectives: [
            "Order food politely at a German restaurant",
            "Read basic menu sections (Vorspeise, Hauptgericht, Nachspeise)",
            "Ask for recommendations and make special requests"
          ],
          placeholderThumbnail: "/images/german_menu.png",
          richContent: [
            {
              type: "table",
              title: "Restaurant Ordering Phrases",
              headers: ["German", "English", "When to Use"],
              rows: [
                ["Einen Tisch für zwei, bitte.", "A table for two, please.", "Entering"],
                ["Die Speisekarte, bitte!", "The menu, please!", "Sitting down"],
                ["Ich hätte gern das Schnitzel.", "I would like the schnitzel.", "Ordering"],
                ["Ich nehme die Suppe.", "I'll take the soup.", "Ordering"],
                ["Was empfehlen Sie?", "What do you recommend?", "Unsure"],
                ["Ohne Zwiebeln, bitte.", "Without onions, please.", "Special request"]
              ]
            },
            {
              type: "table",
              title: "Menu Sections",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["die Vorspeise", "starter/appetizer", "സ്റ്റാർട്ടർ"],
                ["das Hauptgericht", "main course", "പ്രധാന വിഭവം"],
                ["die Nachspeise", "dessert", "ഡെസ്സേർട്ട്"],
                ["die Getränke", "drinks", "പാനീയങ്ങൾ"]
              ]
            },
            {
              type: "note",
              title: "Speisekarte vs Menü",
              variant: "warning",
              content: "Don't say 'das Menü' when you want the menu! 'Menü' means a fixed set meal (like a combo). The word for menu is 'die Speisekarte' (literally: food card). This is a classic mistake!"
            }
          ]
        },
        {
          id: "v6-3-2",
          title: "Restaurant Phrases & Tipping",
          duration: "10:00",
          description:
            "Learn how to ask for the bill, pay, and tip in Germany — quite different from India!",
          scriptOutline: [
            "Asking for the bill: 'Die Rechnung, bitte!' or 'Zahlen, bitte!'",
            "The Split: 'Zusammen oder getrennt?' (Together or separate?) — Friends often pay separately!",
            "Tipping: State the total you want to pay. E.g., 18.50-innu 20 ennu parayuka.",
            "Stimmt so!: 'Keep the change!' machane. Most common way to tip.",
            "Cash/Card: 'Kann ich mit Karte zahlen?' (Always check first, small shops love cash!).",
            "Yummy: 'Das war sehr lecker!' — waiter happy aavum!",
            "Culture: Nobody rushes you in a German restaurant. Feel free to chill!"
          ],
          keyVocabulary: [
            "die Rechnung",
            "zahlen",
            "das Trinkgeld",
            "Stimmt so!",
            "lecker"
          ],
          learningObjectives: [
            "Ask for and pay the bill in German",
            "Understand German tipping culture",
            "Use polite restaurant exit phrases"
          ],
          placeholderThumbnail: "/images/tipping_gesture.png",
          richContent: [
            {
              type: "table",
              title: "Paying & Tipping Phrases",
              headers: ["German", "English", "Context"],
              rows: [
                ["Die Rechnung, bitte!", "The bill, please!", "Asking to pay"],
                ["Zahlen, bitte!", "Pay, please!", "Shorter version"],
                ["Zusammen oder getrennt?", "Together or separate?", "Waiter asks"],
                ["Stimmt so!", "Keep the change!", "Leaving a tip"],
                ["Kann ich mit Karte zahlen?", "Can I pay by card?", "Checking payment"]
              ]
            },
            {
              type: "note",
              title: "German Tipping Culture",
              variant: "info",
              content: "In Germany, tips are 5-10% (not 15-20% like the USA). The easiest way: if the bill is 18.50, say 'Zwanzig, bitte' or 'Stimmt so!' when handing over 20 euros. The waiter keeps the rest."
            },
            {
              type: "note",
              title: "Cash is Still King!",
              variant: "warning",
              content: "Many German restaurants, bakeries, and small shops ONLY accept cash (Nur Barzahlung). Always carry some cash with you! 'Kann ich mit Karte zahlen?' — ask this BEFORE ordering at small places."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex6-3-1",
          type: "multiple-choice",
          question: "How do you ask for the menu in German?",
          options: [
            "Die Speisekarte, bitte!",
            "Die Rechnung, bitte!",
            "Das Menü, bitte!",
            "Das Essen, bitte!"
          ],
          correctAnswer: "Die Speisekarte, bitte!",
          explanation:
            "Speisekarte = menu (Speise=food, Karte=card). Don't say 'Menü' — that means a fixed set meal. 'Die Rechnung' = the bill. Learn these two words separately!",
          xpReward: 10
        },
        {
          id: "ex6-3-2",
          type: "fill-blank",
          question: "Ich _____ gern das Schnitzel. (I would like)",
          options: ["hätte", "habe", "hatte", "hat"],
          correctAnswer: "hätte",
          explanation:
            "'Hätte' is the subjunctive of 'haben' (to have). 'Ich hätte gern...' = 'I would like...' Two alternatives: 'Ich nehme...' (I'll take...) or 'Für mich bitte...' (For me please...).",
          xpReward: 10
        },
        {
          id: "ex6-3-3",
          type: "multiple-choice",
          question: "What does 'Was empfehlen Sie?' mean?",
          options: [
            "What do you recommend?",
            "What do you want?",
            "What is this?",
            "Where is the kitchen?"
          ],
          correctAnswer: "What do you recommend?",
          explanation:
            "'Empfehlen' = to recommend (a stem-changer: du empfiehlst). 'Was empfehlen Sie?' is a great restaurant phrase — waiters love it when you ask for their recommendation!",
          xpReward: 10
        },
        {
          id: "ex6-3-4",
          type: "ordering",
          question:
            "Put these restaurant steps in the correct order:",
          options: [
            "Die Rechnung bezahlen",
            "Einen Tisch bekommen",
            "Die Speisekarte lesen",
            "Das Essen bestellen",
            "Das Essen genießen"
          ],
          correctAnswer: [
            "Einen Tisch bekommen",
            "Die Speisekarte lesen",
            "Das Essen bestellen",
            "Das Essen genießen",
            "Die Rechnung bezahlen"
          ],
          explanation:
            "Get a table → Read the menu → Order food → Enjoy the food → Pay the bill.",
          xpReward: 15
        },
        {
          id: "ex6-3-5",
          type: "multiple-choice",
          question: "What does 'Stimmt so!' mean when paying?",
          options: [
            "Keep the change!",
            "That's wrong!",
            "Give me more!",
            "I need the receipt."
          ],
          correctAnswer: "Keep the change!",
          explanation:
            "'Stimmt so!' = keep the change. German tipping etiquette: round up or add 5-10%. If your bill is 17.50, say 'Zwanzig, bitte' (Twenty, please) and they keep the difference.",
          xpReward: 10
        },
        {
          id: "ex6-3-6",
          type: "fill-blank",
          question: "Das war sehr _____! (delicious)",
          options: ["lecker", "schlecht", "teuer", "scharf"],
          correctAnswer: "lecker",
          explanation:
            "'Lecker' = delicious/yummy — the ultimate food compliment in German. Say 'Das war sehr lecker!' when you finish eating. Your host/waiter will beam with pride!",
          xpReward: 10
        },
        {
          id: "ex6-3-7",
          type: "matching",
          question: "Match the German restaurant phrase to its meaning:",
          options: [
            "Die Rechnung, bitte!",
            "Einen Tisch für zwei",
            "Zahlen, bitte!",
            "Zusammen oder getrennt?"
          ],
          correctAnswer: [
            "The bill, please!",
            "A table for two",
            "Pay, please! / Check, please!",
            "Together or separate?"
          ],
          xpReward: 15
        },
        {
          id: "ex6-3-8",
          type: "dictation",
          question: "Listen and type: Die Rechnung, bitte!",
          correctAnswer: "Die Rechnung, bitte",
          explanation: "Great! This is the most important phrase when you're finished eating!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-bill-please.mp3"
        },
        {
          id: "ex6-3-9",
          type: "free-text",
          question: "Translate to German: 'A table for two, please.'",
          correctAnswer: "Einen Tisch für zwei, bitte",
          explanation: "Wunderbar! 'Tisch' is masculine, so it's 'einen Tisch' in this context.",
          xpReward: 30
        }
      ,
        {
          id: "ex6-3-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (At the Restaurant): 'Ich möchte Reis und Fisch, bitte.'",
          questionGerman: "Sprechen Sie laut: 'Ich möchte Reis und Fisch, bitte.'",
          correctAnswer: "Ich möchte Reis und Fisch, bitte",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab6-3-1",
          german: "die Speisekarte",
          english: "the menu",
          malayalam: "മെനു",
          pronunciation: "shpy-ze-kar-te",
          example: "Die Speisekarte, bitte!",
          exampleTranslation: "The menu, please!"
        },
        {
          id: "vocab6-3-2",
          german: "bestellen",
          english: "to order",
          malayalam: "ഓർഡർ ചെയ്യുക",
          pronunciation: "be-shtel-en",
          example: "Ich möchte bestellen.",
          exampleTranslation: "I would like to order."
        },
        {
          id: "vocab6-3-3",
          german: "die Rechnung",
          english: "the bill / the check",
          malayalam: "ബിൽ",
          pronunciation: "rekh-nung",
          example: "Die Rechnung, bitte!",
          exampleTranslation: "The bill, please!"
        },
        {
          id: "vocab6-3-4",
          german: "das Trinkgeld",
          english: "the tip",
          malayalam: "ടിപ്പ്",
          pronunciation: "trink-gelt",
          example: "In Deutschland gibt man 5-10% Trinkgeld.",
          exampleTranslation: "In Germany you give 5-10% tip."
        },
        {
          id: "vocab6-3-5",
          german: "die Vorspeise",
          english: "starter / appetizer",
          malayalam: "സ്റ്റാർട്ടർ",
          pronunciation: "for-shpy-ze",
          example: "Als Vorspeise nehme ich die Suppe.",
          exampleTranslation: "As a starter I'll have the soup."
        },
        {
          id: "vocab6-3-6",
          german: "das Hauptgericht",
          english: "main course",
          malayalam: "പ്രധാന വിഭവം",
          pronunciation: "howpt-ge-rikht",
          example: "Das Hauptgericht ist Schnitzel mit Kartoffeln.",
          exampleTranslation: "The main course is schnitzel with potatoes."
        },
        {
          id: "vocab6-3-7",
          german: "die Nachspeise",
          english: "dessert",
          malayalam: "ഡെസേർട്ട്",
          pronunciation: "nahkh-shpy-ze",
          example: "Als Nachspeise hätte ich gern ein Eis.",
          exampleTranslation: "For dessert I would like an ice cream."
        },
        {
          id: "vocab6-3-8",
          german: "lecker",
          english: "delicious / yummy",
          malayalam: "രുചികരമായ",
          pronunciation: "le-ker",
          example: "Das Essen war sehr lecker!",
          exampleTranslation: "The food was very delicious!"
        },
        {
          id: "vocab6-3-9",
          german: "empfehlen",
          english: "to recommend",
          malayalam: "ശുപാർശ ചെയ്യുക",
          pronunciation: "emp-fay-len",
          example: "Was empfehlen Sie?",
          exampleTranslation: "What do you recommend?"
        },
        {
          id: "vocab6-3-10",
          german: "zahlen",
          english: "to pay",
          malayalam: "പണം കൊടുക്കുക",
          pronunciation: "tsah-len",
          example: "Kann ich mit Karte zahlen?",
          exampleTranslation: "Can I pay by card?"
        }
      ]
    },

    // ──────────────────────────────────────────────
    // Lesson 6-4: Likes & Dislikes
    // ──────────────────────────────────────────────
    {
      id: "6-4",
      title: "Likes & Dislikes",
      titleGerman: "Was ich mag und nicht mag",
      description:
        "Express your food preferences like a pro — using mögen, möchten, and gern!",
      duration: "45 min",
      xpReward: 120,
      storyScene: {
        setting: {
          name: "WG Kitchen, Late Night Dinner",
          sceneType: "home",
          timeOfDay: "evening",
          description: "Everyone is finally home, and the table is covered in various dishes. Stefan has made pasta, Lara has brought some salad, and you've shared some Kerala curry. The conversation turns to food preferences. What do you like? What can't you stand? This is the moment to be honest and practice 'mögen' and 'möchten'!",
        },
        narrative: {
          previousRecap: "You've mastered ordering at a restaurant. Now, let's learn how to have a real conversation about your personal tastes!",
          currentObjective: "Express likes and dislikes generally (mögen) and specifically (möchten/gern)",
          nextTeaser: "Module 6 complete! Next: Let's go shopping! Clothes, colors, and the U-Bahn!",
        },
        kuttanIntro: [
          "Machane! Preferences parayumpo confusion varaam. 'Ich mag' means you like it in general. 'Ich möchte' means you want it right now.",
          "Nammude Kerala food-ine patti parayumpol 'Ich mag Biryani' ennu vishamillathe parayaam. Germans-inu 'scharf' (spicy) food istam aanu, but level nokkanam!",
          "Vegetarian aano? 'Ich bin Vegetarier' ennu parayenam. Nammude preferences clear aayi German-il express cheyyaam!",
        ],
        vocabEncounters: [
          { vocabId: "vocab6-4-1", encounterMoment: "Stefan asks: 'Magst du Pizza?' You answer: 'Ja, ich mag Pizza sehr!'", contextSentence: "Ich mag Reis." },
          { vocabId: "vocab6-4-7", encounterMoment: "Lara offers more pasta: 'Möchtest du noch mehr?' (Would you like more?). You're full!", contextSentence: "Ich möchte einen Kaffee." },
          { vocabId: "vocab6-1-10", encounterMoment: "You warn them about the curry: 'Es ist sehr scharf!' Stefan takes a small bite.", contextSentence: "Das Curry ist sehr scharf!" },
          { vocabId: "vocab6-4-3", encounterMoment: "Lara mentions: 'Ich bin Vegetarierin.' (I am a vegetarian). She avoids the meat.", contextSentence: "Ich bin Vegetarier." },
          { vocabId: "vocab6-4-8", encounterMoment: "You summarize: 'Ich esse gern Fleisch, aber ich mag kein Schweinefleisch.' (I like eating meat, but I don't like pork).", contextSentence: "Ich mag keinen Fisch." },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'I like Biryani' in general. What is the correct German sentence?",
            options: [
              { text: "Ich mag Biryani.", isCorrect: true, response: "Exactly! 'mögen' is for general likes. Everyone loves Biryani, machane!", kuttanReaction: "Adipoli! 'Ich mag' formula universal aanu. Biryani lovers unit! 🔥" },
              { text: "Ich möchte Biryani.", isCorrect: false, response: "Nearly! But 'Ich möchte' means you want Biryani RIGHT NOW. 'Ich mag' is for general preference.", kuttanReaction: "Vite machane! Ithu 'wanted now' context alla. General like parayumpol 'mag' mathi. Try again! 😬" },
            ],
          },
          {
            moment: "How do you correctly say 'I don't like coffee' (der Kaffee)?",
            options: [
              { text: "Ich mag keinen Kaffee.", isCorrect: true, response: "Correct! 'Kaffee' is masculine, so 'kein' becomes 'keinen' (accusative case). Advanced move!", kuttanReaction: "Superb! Negative preference correct aayi handle cheythallo. You're getting better every day! ⭐" },
              { text: "Ich mag nicht Kaffee.", isCorrect: false, response: "No, when negating a noun with 'like/have', we use 'kein/keine'.", kuttanReaction: "Aiyyo! Noun negation-u 'kein' venam. 'Ich mag keinen Kaffee' aanu correct form. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v6-4-1",
          title: "Ich mag... Ich möchte... — Expressing Preferences",
          duration: "10:00",
          description:
            "Three ways to talk about what you like, dislike, and want in German.",
          scriptOutline: [
            "Opening: 'Everybody has food opinions — let's express yours in German!'",
            "mögen (to like): Ich mag Reis. Ich mag Curry. — for general likes",
            "Negative: Ich mag kein Fleisch. Ich mag keinen Fisch. — vegetarian? No problem!",
            "Vegetarier (m) / Vegetarierin (f) — 'Ich bin Vegetarier/Vegetarierin.'",
            "möchten (would like): Ich möchte einen Kaffee. — for ordering/requesting",
            "Difference: 'Ich mag Kaffee' (I like coffee in general) vs 'Ich möchte einen Kaffee' (I want one now)",
            "gern/nicht gern: Ich esse gern Curry. Ich esse nicht gern Fisch.",
            "Comparing all three: mag = general like, gern = enjoy doing, möchte = want right now",
            "Practice dialogue: 'Was magst du?' — 'Ich mag Biryani!' — 'Ich auch!'"
          ],
          keyVocabulary: [
            "mögen",
            "möchten",
            "gern",
            "nicht gern",
            "Vegetarier"
          ],
          learningObjectives: [
            "Use 'mögen' to express general likes and dislikes",
            "Use 'möchten' for polite requests",
            "Differentiate between mögen, möchten, and gern"
          ],
          placeholderThumbnail: "/images/kaffee_kuchen.png",
          richContent: [
            {
              type: "table",
              title: "3 Ways to Express Likes",
              headers: ["Form", "Meaning", "Example", "Use When"],
              rows: [
                ["mögen", "to like (general)", "Ich mag Reis.", "Talking about general taste"],
                ["gern + verb", "enjoy doing", "Ich esse gern Curry.", "Talking about activities"],
                ["möchten", "would like (polite)", "Ich möchte einen Kaffee.", "Ordering / requesting now"]
              ]
            },
            {
              type: "table",
              title: "Conjugation of 'mögen' (to like)",
              headers: ["Person", "mögen", "möchten"],
              rows: [
                ["ich", "mag", "möchte"],
                ["du", "magst", "möchtest"],
                ["er/sie/es", "mag", "möchte"],
                ["wir", "mögen", "möchten"],
                ["ihr", "mögt", "möchtet"],
                ["sie/Sie", "mögen", "möchten"]
              ]
            },
            {
              type: "note",
              title: "Negation with 'kein'",
              variant: "info",
              content: "To say you don't like something: 'Ich mag KEIN Fleisch.' (neuter) / 'Ich mag KEINEN Fisch.' (masculine) / 'Ich mag KEINE Milch.' (feminine). Use 'kein' (not 'nicht') when negating a noun after mögen."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex6-4-1",
          type: "multiple-choice",
          question: "How do you say 'I like rice' (in general)?",
          options: [
            "Ich mag Reis.",
            "Ich möchte Reis.",
            "Ich esse Reis.",
            "Ich habe Reis."
          ],
          correctAnswer: "Ich mag Reis.",
          explanation:
            "'Mögen' expresses a general preference. 'Ich mag Reis.' = I like rice (in general).",
          xpReward: 10
        },
        {
          id: "ex6-4-2",
          type: "fill-blank",
          question: "Ich mag _____ Fleisch. Ich bin Vegetarier. (no/not any)",
          options: ["kein", "nicht", "keinen", "keine"],
          correctAnswer: "kein",
          explanation:
            "'Kein' negates a noun: 'Ich mag kein Fleisch.' = I don't like meat. ('Fleisch' is neuter → kein.)",
          xpReward: 10
        },
        {
          id: "ex6-4-3",
          type: "multiple-choice",
          question:
            "You're at a cafe and want to order a coffee right now. Which do you say?",
          options: [
            "Ich möchte einen Kaffee.",
            "Ich mag Kaffee.",
            "Ich trinke gern Kaffee.",
            "Kaffee ist gut."
          ],
          correctAnswer: "Ich möchte einen Kaffee.",
          explanation:
            "'Möchten' is used for specific, immediate requests. 'Ich möchte einen Kaffee.' = I would like a coffee (now).",
          xpReward: 10
        },
        {
          id: "ex6-4-4",
          type: "matching",
          question: "Match the expression to its use:",
          options: [
            "Ich mag Curry.",
            "Ich esse gern Curry.",
            "Ich möchte Curry."
          ],
          correctAnswer: [
            "I like curry (general preference).",
            "I enjoy eating curry (action).",
            "I would like curry (right now)."
          ],
          xpReward: 15
        },
        {
          id: "ex6-4-5",
          type: "fill-blank",
          question: "Ich esse _____ gern Fisch. (not — I don't enjoy eating fish)",
          options: ["nicht", "kein", "nie", "sehr"],
          correctAnswer: "nicht",
          explanation:
            "'Nicht gern' expresses disliking an activity: 'Ich esse nicht gern Fisch.' = I don't like eating fish.",
          xpReward: 10
        },
        {
          id: "ex6-4-6",
          type: "multiple-choice",
          question: "How does a female vegetarian introduce herself in German?",
          options: [
            "Ich bin Vegetarierin.",
            "Ich bin Vegetarier.",
            "Ich bin vegetarisch.",
            "Ich esse Vegetarier."
          ],
          correctAnswer: "Ich bin Vegetarierin.",
          explanation:
            "Feminine form: Vegetarierin. Masculine: Vegetarier. 'Ich bin Vegetarierin.' = I am a vegetarian (female).",
          xpReward: 15
        },
        {
          id: "ex6-4-7",
          type: "dictation",
          question: "Listen and type: Ich mag indisches Essen.",
          correctAnswer: "Ich mag indisches Essen",
          explanation: "Perfect! 'indisches' describes the food. And don't forget the capital 'E' for 'Essen'!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-indian-food.mp3"
        },
        {
          id: "ex6-4-8",
          type: "free-text",
          question: "Translate to German: 'I don't like meat.' (meat = Fleisch)",
          correctAnswer: "Ich mag kein Fleisch",
          explanation: "Excellent! 'kein' is used to negate nouns like 'Fleisch'.",
          xpReward: 30
        }
      ,
        {
          id: "ex6-4-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Likes & Dislikes): 'Ich möchte Reis und Fisch, bitte.'",
          questionGerman: "Sprechen Sie laut: 'Ich möchte Reis und Fisch, bitte.'",
          correctAnswer: "Ich möchte Reis und Fisch, bitte",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab6-4-1",
          german: "mögen",
          english: "to like",
          malayalam: "ഇഷ്ടപ്പെടുക",
          pronunciation: "mö-gen",
          example: "Ich mag indisches Essen.",
          exampleTranslation: "I like Indian food."
        },
        {
          id: "vocab6-4-2",
          german: "möchten",
          english: "would like",
          malayalam: "ആഗ്രഹിക്കുക",
          pronunciation: "möch-ten",
          example: "Ich möchte einen Tee, bitte.",
          exampleTranslation: "I would like a tea, please."
        },
        {
          id: "vocab6-4-3",
          german: "kein / keine / keinen",
          english: "no / not any",
          malayalam: "ഇല്ല / ഒന്നുമില്ല",
          pronunciation: "kyn / ky-ne / ky-nen",
          example: "Ich mag keinen Fisch.",
          exampleTranslation: "I don't like (any) fish."
        },
        {
          id: "vocab6-4-4",
          german: "der Vegetarier / die Vegetarierin",
          english: "vegetarian (m/f)",
          malayalam: "സസ്യാഹാരി",
          pronunciation: "ve-ge-tah-ree-er / ve-ge-tah-ree-er-in",
          example: "Ich bin Vegetarierin.",
          exampleTranslation: "I am a vegetarian (female)."
        },
        {
          id: "vocab6-4-5",
          german: "das Lieblingsessen",
          english: "favourite food",
          malayalam: "ഇഷ്ട ഭക്ഷണം",
          pronunciation: "leeb-lings-es-en",
          example: "Mein Lieblingsessen ist Biryani.",
          exampleTranslation: "My favourite food is biryani."
        },
        {
          id: "vocab6-4-6",
          german: "schmecken",
          english: "to taste",
          malayalam: "രുചിക്കുക",
          pronunciation: "shmek-en",
          example: "Das schmeckt gut!",
          exampleTranslation: "That tastes good!"
        },
        {
          id: "vocab6-4-7",
          german: "süß",
          english: "sweet",
          malayalam: "മധുരമുള്ള",
          pronunciation: "züss",
          example: "Payasam ist sehr süß.",
          exampleTranslation: "Payasam is very sweet."
        },
        {
          id: "vocab6-4-8",
          german: "sauer",
          english: "sour",
          malayalam: "പുളിയുള്ള",
          pronunciation: "zow-er",
          example: "Die Zitrone ist sauer.",
          exampleTranslation: "The lemon is sour."
        }
      ]
    },

    // ──────────────────────────────────────────────
    // Lesson 6-5: Accusative Case
    // ──────────────────────────────────────────────
    {
      id: "6-5",
      title: "Accusative Case - Ich nehme EINEN Kaffee",
      titleGerman: "Der Akkusativ",
      description:
        "Unlock the accusative case — the key to saying what you eat, drink, buy, and want in German!",
      duration: "60 min",
      xpReward: 180,
      storyScene: {
        setting: {
          name: "Gasthaus zum Goldenen Hirsch",
          sceneType: "cafe",
          timeOfDay: "afternoon",
          description: "A cozy German restaurant with chalkboard menus and the smell of fresh Schnitzel. Time to order lunch — and every order needs the accusative case!",
        },
        narrative: {
          previousRecap: "You know your articles and basic sentence structure. Now let's see what happens when nouns become OBJECTS.",
          currentObjective: "Use accusative articles correctly when ordering food and expressing wants",
          nextTeaser: "Next up: dative case — giving things TO people gets even trickier!",
        },
        kuttanIntro: [
          "Machane! Namukkipozhum restaurant-il aanu. German-il food order cheyyumbol articles maarum — 'ein' becomes 'einen'. Ithaanu accusative case!",
          "Think of it like this: subject cheyyunna action-nte object-aanu accusative. 'Ich nehme EINEN Kaffee' — 'einen' because Kaffee is masculine and it's the object.",
          "Ayyo don't worry, feminine and neuter articles don't change at all! Only masculine ones get the 'n' upgrade. Let's order!",
        ],
        vocabEncounters: [
          { vocabId: "vocab6-5-1", encounterMoment: "The waiter points at the fish special: 'Ich empfehle den Fisch.'", contextSentence: "Ich esse den Fisch." },
          { vocabId: "vocab6-5-2", encounterMoment: "You try to order coffee: 'Ich nehme einen Kaffee, bitte.'", contextSentence: "Ich nehme einen Kaffee." },
          { vocabId: "vocab6-5-3", encounterMoment: "Your friend declines dessert: 'Ich habe keinen Hunger mehr.'", contextSentence: "Ich habe keinen Hunger." },
          { vocabId: "vocab6-5-4", encounterMoment: "The waiter asks what you'd like: 'Was nehmen Sie?'", contextSentence: "Ich nehme das Schnitzel." },
          { vocabId: "vocab6-5-5", encounterMoment: "You tell the waiter you're thirsty: 'Ich habe Durst.'", contextSentence: "Ich habe Durst." },
          { vocabId: "vocab6-5-6", encounterMoment: "Your stomach growls and you admit: 'Ich habe großen Hunger!'", contextSentence: "Ich habe großen Hunger!" },
        ],
        decisionPoints: [
          {
            moment: "You want to order a coffee. The waiter is waiting. Which is correct?",
            options: [
              { text: "Ich nehme einen Kaffee, bitte.", isCorrect: true, response: "Perfect! 'Kaffee' is masculine, so 'ein' becomes 'einen' in the accusative.", kuttanReaction: "Adipoli machane! Accusative case sheriyaakki. Waiter impressed aayirikkum! 🔥" },
              { text: "Ich nehme ein Kaffee, bitte.", isCorrect: false, response: "'Kaffee' is masculine. When it's the object (accusative), 'ein' must become 'einen'.", kuttanReaction: "Aiyyo! Masculine objects-inu 'ein' alla, 'einen' venam. That extra '-en' is the accusative magic!" },
            ],
          },
          {
            moment: "You're full and want to say you don't want any soup. How do you say it?",
            options: [
              { text: "Ich möchte keine Suppe.", isCorrect: true, response: "Correct! 'Suppe' is feminine, and feminine accusative stays 'keine' — no change needed!", kuttanReaction: "Superb! Feminine accusative same aanu — no changes. Easy win! ⭐" },
              { text: "Ich möchte keinen Suppe.", isCorrect: false, response: "'Suppe' is feminine (die Suppe). Only masculine words change in accusative. Feminine stays 'keine'.", kuttanReaction: "Machane, 'Suppe' feminine aanu! Masculine maathram aanu accusative-il maarunnathu. 'Keine Suppe' thanne correct!" },
              { text: "Ich möchte kein Suppe.", isCorrect: false, response: "'Kein' is for neuter nouns. 'Suppe' is feminine, so it needs 'keine'.", kuttanReaction: "Aiyyo! 'Kein' neuter-inu aanu. Feminine-inu 'keine' venam. Gender article always check cheyyuka!" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v6-5-1",
          title: "The Accusative Case Explained",
          duration: "12:00",
          description:
            "Understand why German articles change and master the accusative case rules.",
          scriptOutline: [
            "Opening: 'Why does German say EINEN Kaffee, not EIN Kaffee? Let's find out!'",
            "What is a case? It shows the ROLE of a noun in a sentence.",
            "Nominative = subject (who/what does it): Der Mann trinkt.",
            "Accusative = direct object (who/what receives the action): Ich sehe den Mann.",
            "The big rule: ONLY masculine articles change! der → den, ein → einen",
            "Feminine: die → die, eine → eine (NO change!)",
            "Neuter: das → das, ein → ein (NO change!)",
            "Plural: die → die (NO change!)",
            "Think of it this way: masculine is the drama queen — only he changes!",
            "Examples with food: Ich nehme den Reis. Ich esse eine Kartoffel. Ich trinke ein Wasser."
          ],
          keyVocabulary: [
            "den",
            "einen",
            "Akkusativ",
            "der Nominativ"
          ],
          learningObjectives: [
            "Understand the difference between nominative and accusative case",
            "Know that only masculine articles change in the accusative",
            "Apply accusative articles in food-related sentences"
          ],
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "Accusative Case — Article Changes",
              headers: ["Gender", "Nominative (Subject)", "Accusative (Object)", "Change?"],
              rows: [
                ["Masculine", "der / ein", "den / einen", "YES!"],
                ["Feminine", "die / eine", "die / eine", "No change"],
                ["Neuter", "das / ein", "das / ein", "No change"],
                ["Plural", "die", "die", "No change"]
              ]
            },
            {
              type: "note",
              title: "Only Masculine Changes!",
              variant: "tip",
              content: "Think of it this way: masculine is the 'drama queen' of German grammar — ONLY masculine articles change in the accusative. Feminine, neuter, and plural all stay exactly the same. Just remember: der -> den, ein -> einen."
            },
            {
              type: "note",
              title: "Subject vs Object",
              variant: "info",
              content: "Nominative = the doer (subject): 'DER Mann trinkt.' Accusative = the receiver (direct object): 'Ich sehe DEN Mann.' Ask 'Who does it?' (nominative) vs 'Who/what receives the action?' (accusative)."
            }
          ]
        },
        {
          id: "v6-5-2",
          title: "Practice Accusative with Food",
          duration: "10:00",
          description:
            "Apply accusative case rules with lots of food ordering and preference examples.",
          scriptOutline: [
            "Quick recap: only masculine changes — der → den, ein → einen",
            "Ordering practice: 'Ich nehme einen Kaffee und eine Cola.'",
            "More examples: 'Ich esse den Fisch.' (masc) 'Ich esse die Suppe.' (fem) 'Ich esse das Brot.' (neut)",
            "Negation with kein: kein → keinen (masc), keine (fem), kein (neut)",
            "'Ich habe keinen Hunger.' (I'm not hungry.) — Hunger is masculine!",
            "'Ich trinke keine Milch.' (fem) 'Ich esse kein Fleisch.' (neut)",
            "Common verbs that take accusative: essen, trinken, nehmen, haben, möchten, kaufen",
            "Practice dialogue: ordering a full meal using accusative correctly",
            "Kerala touch: 'Just like Malayalam has different case markers, German changes articles!'"
          ],
          keyVocabulary: [
            "keinen",
            "keine",
            "nehmen",
            "haben"
          ],
          learningObjectives: [
            "Use accusative articles correctly when ordering food",
            "Negate nouns with kein/keine/keinen in the accusative",
            "Build complete sentences with accusative objects"
          ],
          placeholderThumbnail: "/images/supermarket_checkout.png",
          richContent: [
            {
              type: "table",
              title: "Accusative with Food — Practice",
              headers: ["Nominative", "Accusative", "Example"],
              rows: [
                ["der Reis (masc)", "den Reis", "Ich nehme den Reis."],
                ["die Suppe (fem)", "die Suppe", "Ich esse die Suppe."],
                ["das Brot (neut)", "das Brot", "Ich kaufe das Brot."],
                ["ein Kaffee (masc)", "einen Kaffee", "Ich trinke einen Kaffee."],
                ["eine Cola (fem)", "eine Cola", "Ich möchte eine Cola."],
                ["ein Wasser (neut)", "ein Wasser", "Ich hätte gern ein Wasser."]
              ]
            },
            {
              type: "table",
              title: "Negation with 'kein' in Accusative",
              headers: ["Gender", "kein (Nom)", "kein (Akk)", "Example"],
              rows: [
                ["Masculine", "kein", "keinen", "Ich habe keinen Hunger."],
                ["Feminine", "keine", "keine", "Ich trinke keine Milch."],
                ["Neuter", "kein", "kein", "Ich esse kein Fleisch."]
              ]
            },
            {
              type: "note",
              title: "Verbs That Take Accusative",
              variant: "info",
              content: "These common verbs always need an accusative object: essen (eat), trinken (drink), nehmen (take), haben (have), möchten (would like), kaufen (buy), sehen (see). If you use these verbs, the noun after them is in accusative!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex6-5-1",
          type: "multiple-choice",
          question: "Ich trinke _____ Kaffee. (der Kaffee — masculine)",
          options: ["der", "den", "ein", "einen"],
          correctAnswer: "einen",
          explanation:
            "'Kaffee' is masculine. In the accusative: ein → einen. 'Ich trinke einen Kaffee.'",
          xpReward: 10
        },
        {
          id: "ex6-5-2",
          type: "multiple-choice",
          question: "Ich esse _____ Suppe. (die Suppe — feminine)",
          options: ["die", "den", "eine", "einen"],
          correctAnswer: "eine",
          explanation:
            "'Suppe' is feminine. Feminine doesn't change in accusative: eine Suppe.",
          xpReward: 10
        },
        {
          id: "ex6-5-3",
          type: "fill-blank",
          question: "Ich nehme _____ Brot. (das Brot — neuter, with ein)",
          options: ["ein", "einen", "eine", "einem"],
          correctAnswer: "ein",
          explanation:
            "'Brot' is neuter. Neuter doesn't change in accusative: ein Brot.",
          xpReward: 10
        },
        {
          id: "ex6-5-4",
          type: "multiple-choice",
          question:
            "Which is the ONLY gender where the article changes in the accusative?",
          options: ["Feminine", "Masculine", "Neuter", "Plural"],
          correctAnswer: "Masculine",
          explanation:
            "Only masculine articles change: der → den, ein → einen. Feminine, neuter, and plural stay the same!",
          xpReward: 15
        },
        {
          id: "ex6-5-5",
          type: "fill-blank",
          question: "Ich habe _____ Hunger. (no/not any — Hunger is masculine)",
          options: ["keinen", "kein", "keine", "keinem"],
          correctAnswer: "keinen",
          explanation:
            "'Hunger' is masculine. In accusative: kein → keinen. 'Ich habe keinen Hunger.' = I'm not hungry.",
          xpReward: 15
        },
        {
          id: "ex6-5-6",
          type: "matching",
          question: "Match nominative → accusative:",
          options: ["der → ?", "die → ?", "das → ?", "ein (masc) → ?"],
          correctAnswer: ["den", "die", "das", "einen"],
          xpReward: 20
        },
        {
          id: "ex6-5-7",
          type: "multiple-choice",
          question:
            "Choose the correct sentence: 'I would like a coffee and a cola.'",
          options: [
            "Ich möchte einen Kaffee und eine Cola.",
            "Ich möchte ein Kaffee und ein Cola.",
            "Ich möchte der Kaffee und die Cola.",
            "Ich möchte einen Kaffee und einen Cola."
          ],
          correctAnswer: "Ich möchte einen Kaffee und eine Cola.",
          explanation:
            "Kaffee is masculine → einen Kaffee. Cola is feminine → eine Cola. Only masculine changes!",
          xpReward: 15
        },
        {
          id: "ex6-5-8",
          type: "fill-blank",
          question: "Ich esse _____ Fleisch. Ich bin Vegetarier. (no/not any — neuter)",
          options: ["kein", "keinen", "keine", "nicht"],
          correctAnswer: "kein",
          explanation:
            "'Fleisch' is neuter. Neuter kein doesn't change in accusative: 'Ich esse kein Fleisch.'",
          xpReward: 10
        },
        {
          id: "ex6-5-9",
          type: "fill-blank",
          question: "Type in German: 'I would like a tea, please.' (Ich möchte...)",
          options: ["Ich möchte einen Tee, bitte", "Ich will einen Tee, bitte", "Ich möchte ein Tee, bitte", "Ich möchte eine Tee, bitte"],
          correctAnswer: "Ich möchte einen Tee, bitte",
          explanation: "'Ich möchte' (I would like) is the polite way to order. 'Tee' is masculine, so accusative: einen Tee. Don't forget 'bitte'!",
          xpReward: 15
        },
        {
          id: "ex6-5-10",
          type: "fill-blank",
          question: "Type in German: 'The soup is very good.' (Die Suppe...)",
          options: ["Die Suppe ist sehr gut", "Die Suppe sehr gut ist", "Die Suppe ist sehr lecker", "Der Suppe ist sehr gut"],
          correctAnswer: "Die Suppe ist sehr gut",
          explanation: "'Die Suppe ist sehr gut.' — 'Die' because Suppe is feminine, 'sehr' means very, 'gut' means good. Simple and correct!",
          xpReward: 15
        },
        {
          id: "ex6-5-11",
          type: "dictation",
          question: "Listen and type: Ich nehme einen Kaffee.",
          correctAnswer: "Ich nehme einen Kaffee",
          explanation: "Great! Remember the accusative: 'einen Kaffee' because it's the object of the action.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-take-coffee.mp3"
        },
        {
          id: "ex6-5-12",
          type: "free-text",
          question: "Write in German: 'I am not hungry.' (Hunger is masculine)",
          correctAnswer: "Ich habe keinen Hunger",
          explanation: "Wunderbar! 'keinen' because Hunger is masculine and in the accusative case.",
          xpReward: 30
        }
      ,
        {
          id: "ex6-5-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Accusative Case - Ich nehme EINEN Kaffee): 'Ich möchte Reis und Fisch, bitte.'",
          questionGerman: "Sprechen Sie laut: 'Ich möchte Reis und Fisch, bitte.'",
          correctAnswer: "Ich möchte Reis und Fisch, bitte",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab6-5-1",
          german: "den",
          english: "the (masculine accusative)",
          malayalam: "ആ (പുല്ലിംഗം, കർമ്മം)",
          pronunciation: "dayn",
          example: "Ich esse den Fisch.",
          exampleTranslation: "I eat the fish."
        },
        {
          id: "vocab6-5-2",
          german: "einen",
          english: "a (masculine accusative)",
          malayalam: "ഒരു (പുല്ലിംഗം, കർമ്മം)",
          pronunciation: "ay-nen",
          example: "Ich nehme einen Kaffee.",
          exampleTranslation: "I'll have a coffee."
        },
        {
          id: "vocab6-5-3",
          german: "keinen",
          english: "no / not a (masculine accusative)",
          malayalam: "ഒന്നുമില്ല (പുല്ലിംഗം, കർമ്മം)",
          pronunciation: "ky-nen",
          example: "Ich habe keinen Hunger.",
          exampleTranslation: "I'm not hungry."
        },
        {
          id: "vocab6-5-4",
          german: "nehmen",
          english: "to take / to have (ordering)",
          malayalam: "എടുക്കുക",
          pronunciation: "nay-men",
          example: "Ich nehme das Schnitzel.",
          exampleTranslation: "I'll have the schnitzel."
        },
        {
          id: "vocab6-5-5",
          german: "haben",
          english: "to have",
          malayalam: "ഉണ്ടായിരിക്കുക",
          pronunciation: "hah-ben",
          example: "Ich habe Durst.",
          exampleTranslation: "I am thirsty."
        },
        {
          id: "vocab6-5-6",
          german: "der Hunger",
          english: "hunger",
          malayalam: "വിശപ്പ്",
          pronunciation: "hoon-ger",
          example: "Ich habe großen Hunger!",
          exampleTranslation: "I am very hungry!"
        },
        {
          id: "vocab6-5-7",
          german: "der Durst",
          english: "thirst",
          malayalam: "ദാഹം",
          pronunciation: "doorst",
          example: "Hast du Durst?",
          exampleTranslation: "Are you thirsty?"
        },
        {
          id: "vocab6-5-8",
          german: "die Suppe",
          english: "soup",
          malayalam: "സൂപ്പ്",
          pronunciation: "zoo-pe",
          example: "Ich esse eine Suppe.",
          exampleTranslation: "I eat a soup."
        }
      ]
    }
  ]
};
