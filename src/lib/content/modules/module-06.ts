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
          placeholderThumbnail: "/images/thumbnails/german-foods.jpg"
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
          placeholderThumbnail: "/images/thumbnails/indian-food-german.jpg"
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
      ],
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
          placeholderThumbnail: "/images/thumbnails/german-drinks.jpg"
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
      ],
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
          placeholderThumbnail: "/images/thumbnails/restaurant-order.jpg"
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
          placeholderThumbnail: "/images/thumbnails/restaurant-bill.jpg"
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
      ],
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
          placeholderThumbnail: "/images/thumbnails/likes-dislikes.jpg"
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
      ],
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
          placeholderThumbnail: "/images/thumbnails/accusative-explained.jpg"
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
          placeholderThumbnail: "/images/thumbnails/accusative-food.jpg"
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
      ],
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
