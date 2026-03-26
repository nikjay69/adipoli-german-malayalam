import type { Module } from '../types';

// Module 7: Shopping & Money (Einkaufen)
export const MODULE_7: Module = {
  id: 7,
  title: "Shopping & Money",
  titleGerman: "Einkaufen",
  description: "Learn to shop, talk about prices, and compare things in German!",
  icon: "🛒",
  color: "#06b6d4",
  totalHours: 10,
  unlockRequirement: "Complete Module 6",
  learningTips: [
    "Practice prices at home: look at items and say their price in German. 'Das kostet drei Euro fünfzig.'",
    "Comparatives in German follow a simple pattern: add '-er'. Bigger = größer, cheaper = billiger.",
    "At a German supermarket, you bag your own groceries FAST. Learn 'die Tüte' (bag) early!",
  ],
  lessons: [
    // ─── Lesson 7-1: At the Supermarket ───
    {
      id: "7-1",
      title: "At the Supermarket",
      titleGerman: "Im Supermarkt",
      description: "Learn everyday grocery items and how to navigate a German supermarket. Kerala kirana store vibes, but make it Deutsch!",
      duration: "45 min",
      xpReward: 120,
      videos: [
        {
          id: "v7-1-1",
          title: "Im Supermarkt - Shopping in Germany",
          duration: "12:00",
          description: "A complete guide to grocery shopping in a German supermarket — from entering to checkout.",
          scriptOutline: [
            "Opening: Welcome to a German Supermarkt! Very different from our kirana stores back home.",
            "Walkthrough of a typical German supermarket layout — produce, dairy, bakery, frozen",
            "Key grocery items with articles: die Milch, das Brot, die Butter, das Ei / die Eier",
            "More essentials: der Zucker, das Mehl, die Nudeln, der Joghurt",
            "Useful phrases: 'Wo finde ich...?' (Where can I find...?)",
            "Asking for help: 'Haben Sie...?' (Do you have...?) and 'Entschuldigung...'",
            "At the checkout: 'Das ist alles.' (That's all.) and bringing your own bag!",
            "Cultural note: Germans bring their own bags — no free plastic bags like in India",
            "Quick comparison: supermarket culture vs Kerala kirana stores — self-service vs personal touch",
            "Practice: Mini shopping list challenge — can you say all items in German?"
          ],
          keyVocabulary: ["die Milch", "das Brot", "die Butter", "das Ei", "die Eier", "der Zucker", "das Mehl", "die Nudeln", "der Joghurt", "Wo finde ich...?"],
          learningObjectives: [
            "Name at least 8 common grocery items with correct articles",
            "Ask where to find items using 'Wo finde ich...?'",
            "Use basic shopping phrases at the checkout",
            "Understand cultural differences in German shopping"
          ],
          placeholderThumbnail: "/images/thumbnails/supermarkt.jpg"
        }
      ],
      exercises: [
        {
          id: "ex7-1-1",
          type: "multiple-choice",
          question: "What is the correct article for 'Brot' (bread)?",
          options: ["der Brot", "die Brot", "das Brot", "den Brot"],
          correctAnswer: "das Brot",
          explanation: "Brot is a neuter noun, so it takes 'das'. Das Brot = the bread.",
          xpReward: 10
        },
        {
          id: "ex7-1-2",
          type: "fill-blank",
          question: "Complete: '_____ finde ich die Milch?' (Where can I find the milk?)",
          options: ["Wo", "Was", "Wie", "Wer"],
          correctAnswer: "Wo",
          explanation: "'Wo finde ich...?' means 'Where can I find...?' — Wo = Where.",
          xpReward: 10
        },
        {
          id: "ex7-1-3",
          type: "matching",
          question: "Match the German grocery items with their English meanings:",
          options: ["die Milch → milk", "das Ei → egg", "der Zucker → sugar", "die Nudeln → noodles/pasta"],
          correctAnswer: ["die Milch → milk", "das Ei → egg", "der Zucker → sugar", "die Nudeln → noodles/pasta"],
          explanation: "These are everyday grocery items you'll find in any German supermarket.",
          xpReward: 15
        },
        {
          id: "ex7-1-4",
          type: "multiple-choice",
          question: "How do you say 'That's all' at the checkout in German?",
          options: ["Das ist gut.", "Das ist alles.", "Das ist fertig.", "Das ist genug."],
          correctAnswer: "Das ist alles.",
          explanation: "'Das ist alles.' literally means 'That is everything.' — used when you're done shopping.",
          xpReward: 10
        },
        {
          id: "ex7-1-5",
          type: "multiple-choice",
          question: "What is the plural of 'das Ei' (egg)?",
          options: ["die Eis", "die Eien", "die Eier", "die Eie"],
          correctAnswer: "die Eier",
          explanation: "The plural of das Ei is die Eier. All plural nouns in German use the article 'die'.",
          xpReward: 10
        }
      ],
      vocabulary: [
        {
          id: "vocab7-1-1",
          german: "die Milch",
          english: "milk",
          malayalam: "പാല്‍",
          pronunciation: "dee milkh",
          example: "Ich brauche die Milch.",
          exampleTranslation: "I need the milk."
        },
        {
          id: "vocab7-1-2",
          german: "das Brot",
          english: "bread",
          malayalam: "റൊട്ടി",
          pronunciation: "dahs broht",
          example: "Das Brot ist frisch.",
          exampleTranslation: "The bread is fresh."
        },
        {
          id: "vocab7-1-3",
          german: "die Butter",
          english: "butter",
          malayalam: "വെണ്ണ",
          pronunciation: "dee boo-ter",
          example: "Haben Sie Butter?",
          exampleTranslation: "Do you have butter?"
        },
        {
          id: "vocab7-1-4",
          german: "das Ei / die Eier",
          english: "egg / eggs",
          malayalam: "മുട്ട / മുട്ടകള്‍",
          pronunciation: "dahs eye / dee eye-er",
          example: "Ich kaufe sechs Eier.",
          exampleTranslation: "I am buying six eggs."
        },
        {
          id: "vocab7-1-5",
          german: "der Zucker",
          english: "sugar",
          malayalam: "പഞ്ചസാര",
          pronunciation: "dehr tsoo-ker",
          example: "Wo finde ich den Zucker?",
          exampleTranslation: "Where can I find the sugar?"
        },
        {
          id: "vocab7-1-6",
          german: "das Mehl",
          english: "flour",
          malayalam: "മൈദ / ഗോതമ്പുപൊടി",
          pronunciation: "dahs mehl",
          example: "Ich brauche Mehl für den Kuchen.",
          exampleTranslation: "I need flour for the cake."
        },
        {
          id: "vocab7-1-7",
          german: "die Nudeln",
          english: "noodles / pasta",
          malayalam: "നൂഡില്‍സ് / പാസ്ത",
          pronunciation: "dee noo-deln",
          example: "Die Nudeln sind lecker.",
          exampleTranslation: "The pasta is delicious."
        },
        {
          id: "vocab7-1-8",
          german: "der Joghurt",
          english: "yogurt",
          malayalam: "തൈര്",
          pronunciation: "dehr yoh-goort",
          example: "Der Joghurt ist im Kühlschrank.",
          exampleTranslation: "The yogurt is in the fridge."
        }
      ]
    },

    // ─── Lesson 7-2: Prices & Currency ───
    {
      id: "7-2",
      title: "Prices & Currency",
      titleGerman: "Preise und Währung",
      description: "Master talking about prices, understanding Euro currency, and handling money conversations in German.",
      duration: "45 min",
      xpReward: 120,
      videos: [
        {
          id: "v7-2-1",
          title: "Euro und Cent - Money in Germany",
          duration: "11:00",
          description: "Everything you need to know about German currency and talking about prices like a pro.",
          scriptOutline: [
            "Opening: Let's talk about paisa — I mean, Geld (money)!",
            "Euro and Cent: denominations, coins, and bills — visual walkthrough",
            "Asking prices: 'Was kostet das?' and 'Wie viel kostet...?'",
            "Saying prices: 'Das kostet drei Euro fünfzig' (3,50 €) — note: comma instead of decimal point!",
            "Key vocabulary: teuer (expensive), billig (cheap), günstig (affordable/good value)",
            "Payment methods: bar zahlen (pay cash), mit Karte zahlen (pay by card)",
            "Die Quittung / der Kassenbon — always keep your receipt in Germany!",
            "Cultural note: Germany loves cash! Many places don't accept cards — unlike India's UPI revolution",
            "Practice: Price guessing game with common German products",
            "Tip: German number system in prices — 3,50 not 3.50"
          ],
          keyVocabulary: ["Was kostet das?", "Wie viel kostet...?", "der Euro", "der Cent", "teuer", "billig", "günstig", "bar", "mit Karte", "die Quittung"],
          learningObjectives: [
            "Ask and understand prices in German",
            "Say prices correctly using Euro and Cent",
            "Use vocabulary for expensive, cheap, and affordable",
            "Know common payment terms and cultural differences"
          ],
          placeholderThumbnail: "/images/thumbnails/euro-cent.jpg"
        }
      ],
      exercises: [
        {
          id: "ex7-2-1",
          type: "multiple-choice",
          question: "How do you ask 'How much does this cost?' in German?",
          options: ["Was ist das?", "Wie viel kostet das?", "Wo ist das?", "Was machst du?"],
          correctAnswer: "Wie viel kostet das?",
          explanation: "'Wie viel kostet das?' = 'How much does that cost?' You can also say 'Was kostet das?'",
          xpReward: 10
        },
        {
          id: "ex7-2-2",
          type: "fill-blank",
          question: "Complete: 'Das _____ fünf Euro.' (That costs five euros.)",
          options: ["kostet", "kosten", "kauft", "gibt"],
          correctAnswer: "kostet",
          explanation: "'Das kostet...' = 'That costs...' — kostet is the verb 'kosten' conjugated for es/das.",
          xpReward: 10
        },
        {
          id: "ex7-2-3",
          type: "multiple-choice",
          question: "What does 'günstig' mean?",
          options: ["expensive", "free", "affordable / good value", "broken"],
          correctAnswer: "affordable / good value",
          explanation: "'günstig' means affordable or good value — it's more positive than 'billig' (cheap), which can sound negative.",
          xpReward: 10
        },
        {
          id: "ex7-2-4",
          type: "ordering",
          question: "Put these words in order to say 'I would like to pay by card': Ich / mit / möchte / Karte / zahlen",
          options: ["Ich", "möchte", "mit", "Karte", "zahlen"],
          correctAnswer: ["Ich", "möchte", "mit", "Karte", "zahlen"],
          explanation: "'Ich möchte mit Karte zahlen.' = 'I would like to pay by card.' Note: möchte + verb at the end.",
          xpReward: 15
        },
        {
          id: "ex7-2-5",
          type: "multiple-choice",
          question: "How would a German write the price 'two euros and fifty cents'?",
          options: ["2.50 €", "2,50 €", "2:50 €", "2-50 €"],
          correctAnswer: "2,50 €",
          explanation: "Germans use a comma (not a period) for decimals. So 2,50 € = two euros fifty cents.",
          xpReward: 10
        },
        {
          id: "ex7-2-6",
          type: "matching",
          question: "Match the German money words with their meanings:",
          options: ["teuer → expensive", "billig → cheap", "bar → cash", "die Quittung → receipt"],
          correctAnswer: ["teuer → expensive", "billig → cheap", "bar → cash", "die Quittung → receipt"],
          explanation: "These are essential words for any shopping situation in Germany.",
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab7-2-1",
          german: "Was kostet das?",
          english: "What does that cost?",
          malayalam: "അതിന്റെ വില എത്രയാണ്?",
          pronunciation: "vahs kos-tet dahs",
          example: "Was kostet das Brot?",
          exampleTranslation: "What does the bread cost?"
        },
        {
          id: "vocab7-2-2",
          german: "der Euro",
          english: "euro (currency)",
          malayalam: "യൂറോ",
          pronunciation: "dehr oy-roh",
          example: "Das kostet drei Euro.",
          exampleTranslation: "That costs three euros."
        },
        {
          id: "vocab7-2-3",
          german: "der Cent",
          english: "cent",
          malayalam: "സെന്റ്",
          pronunciation: "dehr tsent",
          example: "Fünfzig Cent, bitte.",
          exampleTranslation: "Fifty cents, please."
        },
        {
          id: "vocab7-2-4",
          german: "teuer",
          english: "expensive",
          malayalam: "വിലകൂടിയ",
          pronunciation: "toy-er",
          example: "Das ist sehr teuer!",
          exampleTranslation: "That is very expensive!"
        },
        {
          id: "vocab7-2-5",
          german: "billig",
          english: "cheap",
          malayalam: "വിലകുറഞ്ഞ",
          pronunciation: "bill-ikh",
          example: "Die Nudeln sind billig.",
          exampleTranslation: "The pasta is cheap."
        },
        {
          id: "vocab7-2-6",
          german: "günstig",
          english: "affordable / good value",
          malayalam: "ന്യായവിലയുള്ള",
          pronunciation: "guens-tikh",
          example: "Der Supermarkt ist günstig.",
          exampleTranslation: "The supermarket is affordable."
        },
        {
          id: "vocab7-2-7",
          german: "bar zahlen",
          english: "to pay cash",
          malayalam: "പണമായി നല്‍കുക",
          pronunciation: "bahr tsah-len",
          example: "Ich möchte bar zahlen.",
          exampleTranslation: "I would like to pay cash."
        },
        {
          id: "vocab7-2-8",
          german: "die Quittung",
          english: "receipt",
          malayalam: "രസീത്",
          pronunciation: "dee kvit-toong",
          example: "Kann ich die Quittung haben?",
          exampleTranslation: "Can I have the receipt?"
        }
      ]
    },

    // ─── Lesson 7-3: Colors & Clothing ───
    {
      id: "7-3",
      title: "Colors & Clothing",
      titleGerman: "Farben und Kleidung",
      description: "Learn to describe colors, name clothing items, and get a first taste of adjective endings in German!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v7-3-1",
          title: "Farben - Colors in German",
          duration: "8:00",
          description: "Master all the basic colors in German with fun visual associations.",
          scriptOutline: [
            "Opening: The world is colorful — let's learn to describe it in German!",
            "Primary colors: rot (red), blau (blue), gelb (yellow), grün (green)",
            "Neutral colors: schwarz (black), weiß (white), grau (grey), braun (brown)",
            "Extra colors: rosa (pink), lila (purple) — these don't change form!",
            "Memory trick: Think of Kerala — grüne Palmen (green palms), blaues Meer (blue sea)",
            "Quick practice: Point and name colors around you"
          ],
          keyVocabulary: ["rot", "blau", "grün", "gelb", "schwarz", "weiß", "braun", "grau", "rosa", "lila"],
          learningObjectives: [
            "Name all 10 basic colors in German",
            "Associate colors with everyday objects",
            "Understand that rosa and lila are special (indeclinable)"
          ],
          placeholderThumbnail: "/images/thumbnails/farben.jpg"
        },
        {
          id: "v7-3-2",
          title: "Kleidung - What to Wear",
          duration: "10:00",
          description: "Learn the names of common clothing items and how to combine them with colors.",
          scriptOutline: [
            "Opening: Getting dressed in German — let's build your wardrobe vocabulary!",
            "Upper body: das Hemd (shirt), der Pullover (sweater/pullover), die Jacke (jacket), der Mantel (coat)",
            "Lower body: die Hose (trousers), der Rock (skirt), das Kleid (dress)",
            "Feet: die Schuhe (shoes) — always plural when talking about a pair",
            "Combining color + clothing: 'das rote Kleid' (the red dress) — first peek at adjective endings!",
            "Pattern: after 'das' → adjective gets '-e': das rote Kleid, das blaue Hemd",
            "Pattern: after 'der' → adjective gets '-e': der schwarze Mantel",
            "Pattern: after 'die' → adjective gets '-e': die grüne Jacke",
            "Don't panic about adjective endings — we'll cover them more later!",
            "Practice: Describe what you're wearing right now in German"
          ],
          keyVocabulary: ["das Hemd", "die Hose", "der Rock", "das Kleid", "die Jacke", "der Mantel", "die Schuhe", "der Pullover"],
          learningObjectives: [
            "Name 8 common clothing items with correct articles",
            "Combine colors with clothing items",
            "Understand the basic pattern of adjective endings after definite articles",
            "Describe what you or others are wearing"
          ],
          placeholderThumbnail: "/images/thumbnails/kleidung.jpg"
        }
      ],
      exercises: [
        {
          id: "ex7-3-1",
          type: "matching",
          question: "Match the German colors with their English meanings:",
          options: ["rot → red", "blau → blue", "gelb → yellow", "grün → green", "schwarz → black"],
          correctAnswer: ["rot → red", "blau → blue", "gelb → yellow", "grün → green", "schwarz → black"],
          explanation: "These are the five most essential German colors to know.",
          xpReward: 15
        },
        {
          id: "ex7-3-2",
          type: "multiple-choice",
          question: "What is 'die Hose' in English?",
          options: ["shirt", "trousers", "socks", "hat"],
          correctAnswer: "trousers",
          explanation: "'die Hose' means trousers/pants. Note: in German it's singular (die Hose), not plural like English 'trousers'.",
          xpReward: 10
        },
        {
          id: "ex7-3-3",
          type: "fill-blank",
          question: "Complete: 'Das _____ Kleid ist schön.' (The red dress is beautiful.)",
          options: ["rote", "rot", "roter", "rotes"],
          correctAnswer: "rote",
          explanation: "After 'das' (neuter definite article), the adjective takes the ending '-e': das rote Kleid.",
          xpReward: 15
        },
        {
          id: "ex7-3-4",
          type: "multiple-choice",
          question: "Which color word does NOT change its form (no adjective endings)?",
          options: ["rot", "blau", "rosa", "grün"],
          correctAnswer: "rosa",
          explanation: "'rosa' and 'lila' are special — they stay the same regardless of the noun: das rosa Kleid, die rosa Jacke.",
          xpReward: 10
        },
        {
          id: "ex7-3-5",
          type: "ordering",
          question: "Put these words in order to say 'I am wearing a blue shirt': Ich / ein / trage / blaues / Hemd",
          options: ["Ich", "trage", "ein", "blaues", "Hemd"],
          correctAnswer: ["Ich", "trage", "ein", "blaues", "Hemd"],
          explanation: "'Ich trage ein blaues Hemd.' — After 'ein' (neuter accusative), the adjective gets '-es'.",
          xpReward: 15
        },
        {
          id: "ex7-3-6",
          type: "multiple-choice",
          question: "What is 'der Mantel'?",
          options: ["scarf", "coat", "belt", "gloves"],
          correctAnswer: "coat",
          explanation: "'der Mantel' = the coat. Think of it as a 'mantle' — they share the same root!",
          xpReward: 10
        }
      ],
      vocabulary: [
        {
          id: "vocab7-3-1",
          german: "rot",
          english: "red",
          malayalam: "ചുവപ്പ്",
          pronunciation: "roht",
          example: "Die Blume ist rot.",
          exampleTranslation: "The flower is red."
        },
        {
          id: "vocab7-3-2",
          german: "blau",
          english: "blue",
          malayalam: "നീല",
          pronunciation: "blau (rhymes with 'ow')",
          example: "Der Himmel ist blau.",
          exampleTranslation: "The sky is blue."
        },
        {
          id: "vocab7-3-3",
          german: "grün",
          english: "green",
          malayalam: "പച്ച",
          pronunciation: "gruenn",
          example: "Kerala ist sehr grün!",
          exampleTranslation: "Kerala is very green!"
        },
        {
          id: "vocab7-3-4",
          german: "gelb",
          english: "yellow",
          malayalam: "മഞ്ഞ",
          pronunciation: "gelp",
          example: "Die Banane ist gelb.",
          exampleTranslation: "The banana is yellow."
        },
        {
          id: "vocab7-3-5",
          german: "schwarz",
          english: "black",
          malayalam: "കറുപ്പ്",
          pronunciation: "shvarts",
          example: "Die Schuhe sind schwarz.",
          exampleTranslation: "The shoes are black."
        },
        {
          id: "vocab7-3-6",
          german: "weiß",
          english: "white",
          malayalam: "വെള്ള",
          pronunciation: "vice",
          example: "Das Hemd ist weiß.",
          exampleTranslation: "The shirt is white."
        },
        {
          id: "vocab7-3-7",
          german: "das Hemd",
          english: "shirt",
          malayalam: "ഷര്‍ട്ട്",
          pronunciation: "dahs hemmt",
          example: "Ich trage ein blaues Hemd.",
          exampleTranslation: "I am wearing a blue shirt."
        },
        {
          id: "vocab7-3-8",
          german: "die Hose",
          english: "trousers / pants",
          malayalam: "പാന്റ്സ്",
          pronunciation: "dee hoh-zeh",
          example: "Die Hose ist zu lang.",
          exampleTranslation: "The trousers are too long."
        },
        {
          id: "vocab7-3-9",
          german: "das Kleid",
          english: "dress",
          malayalam: "ഉടുപ്പ്",
          pronunciation: "dahs klite",
          example: "Das rote Kleid ist schön.",
          exampleTranslation: "The red dress is beautiful."
        },
        {
          id: "vocab7-3-10",
          german: "die Jacke",
          english: "jacket",
          malayalam: "ജാക്കറ്റ്",
          pronunciation: "dee yah-keh",
          example: "Nimm die Jacke mit, es ist kalt!",
          exampleTranslation: "Take the jacket along, it's cold!"
        },
        {
          id: "vocab7-3-11",
          german: "der Mantel",
          english: "coat",
          malayalam: "കോട്ട്",
          pronunciation: "dehr mahn-tel",
          example: "Im Winter brauche ich einen Mantel.",
          exampleTranslation: "In winter I need a coat."
        },
        {
          id: "vocab7-3-12",
          german: "die Schuhe",
          english: "shoes",
          malayalam: "ഷൂസ് / ചെരുപ്പുകള്‍",
          pronunciation: "dee shoo-eh",
          example: "Die schwarzen Schuhe gefallen mir.",
          exampleTranslation: "I like the black shoes."
        }
      ]
    },

    // ─── Lesson 7-4: Shopping Dialogues ───
    {
      id: "7-4",
      title: "Shopping Dialogues",
      titleGerman: "Einkaufsgespräche",
      description: "Practice real-world shopping conversations — from asking for help to trying on clothes and paying at the register.",
      duration: "45 min",
      xpReward: 150,
      videos: [
        {
          id: "v7-4-1",
          title: "Shopping Conversations - At the Store",
          duration: "12:00",
          description: "Real shopping dialogues you'll encounter in German clothing stores and shops.",
          scriptOutline: [
            "Opening: Time to actually TALK in a German shop — no more pointing and hoping!",
            "Scene 1 — Entering a shop: 'Kann ich Ihnen helfen?' (Can I help you?) — polite 'Ihnen' form",
            "Responding: 'Ich suche...' (I'm looking for...) + item name",
            "Asking about sizes: 'Haben Sie das in Größe M?' (Do you have this in size M?)",
            "Trying on: 'Kann ich das anprobieren?' (Can I try this on?)",
            "The fitting room: 'Die Umkleidekabine ist dort drüben.' (The fitting room is over there.)",
            "Giving opinions: 'Das steht Ihnen gut!' (That suits you!) / 'Das passt nicht.' (That doesn't fit.)",
            "At checkout: 'Die Kasse ist dort.' — der Kassenzettel (receipt)",
            "Full dialogue: Role-play a complete shopping scenario from entry to purchase",
            "Kerala parallel: Imagine shopping at Lulu Mall but everything is in German!"
          ],
          keyVocabulary: ["Kann ich Ihnen helfen?", "Ich suche...", "Haben Sie das in Größe M?", "Kann ich das anprobieren?", "die Umkleidekabine", "die Kasse", "der Kassenzettel"],
          learningObjectives: [
            "Navigate a complete shopping conversation in German",
            "Ask for help, sizes, and fitting rooms",
            "Understand and respond to sales staff",
            "Complete a purchase using correct phrases"
          ],
          placeholderThumbnail: "/images/thumbnails/shopping-dialogue.jpg"
        }
      ],
      exercises: [
        {
          id: "ex7-4-1",
          type: "multiple-choice",
          question: "A shop assistant says 'Kann ich Ihnen helfen?' — what does this mean?",
          options: ["Can you help me?", "Can I help you?", "Where is the exit?", "Are you looking for something?"],
          correctAnswer: "Can I help you?",
          explanation: "'Kann ich Ihnen helfen?' = 'Can I help you?' (formal). This is the standard greeting from sales staff.",
          xpReward: 10
        },
        {
          id: "ex7-4-2",
          type: "fill-blank",
          question: "Complete: 'Ich _____ ein schwarzes Hemd.' (I am looking for a black shirt.)",
          options: ["suche", "finde", "kaufe", "brauche"],
          correctAnswer: "suche",
          explanation: "'Ich suche...' = 'I am looking for...' — suche is the ich-form of 'suchen' (to search/look for).",
          xpReward: 10
        },
        {
          id: "ex7-4-3",
          type: "multiple-choice",
          question: "How do you ask 'Can I try this on?' in German?",
          options: ["Kann ich das kaufen?", "Kann ich das anprobieren?", "Kann ich das sehen?", "Kann ich das haben?"],
          correctAnswer: "Kann ich das anprobieren?",
          explanation: "'anprobieren' = to try on (clothing). 'Kann ich das anprobieren?' is essential for clothes shopping.",
          xpReward: 10
        },
        {
          id: "ex7-4-4",
          type: "ordering",
          question: "Put these shopping steps in the correct order:",
          options: [
            "Kann ich Ihnen helfen?",
            "Ich suche eine Jacke.",
            "Kann ich das anprobieren?",
            "Das passt gut! Ich nehme es.",
            "An der Kasse zahlen."
          ],
          correctAnswer: [
            "Kann ich Ihnen helfen?",
            "Ich suche eine Jacke.",
            "Kann ich das anprobieren?",
            "Das passt gut! Ich nehme es.",
            "An der Kasse zahlen."
          ],
          explanation: "A typical shopping flow: greeting → stating what you want → trying on → deciding → paying.",
          xpReward: 15
        },
        {
          id: "ex7-4-5",
          type: "multiple-choice",
          question: "What is 'die Umkleidekabine'?",
          options: ["checkout counter", "fitting room", "parking lot", "storage room"],
          correctAnswer: "fitting room",
          explanation: "'die Umkleidekabine' = fitting room. 'Umkleiden' means to change clothes, 'Kabine' means cabin/booth.",
          xpReward: 10
        },
        {
          id: "ex7-4-6",
          type: "fill-blank",
          question: "Complete: 'Haben Sie das in _____ L?' (Do you have this in size L?)",
          options: ["Größe", "Farbe", "Nummer", "Länge"],
          correctAnswer: "Größe",
          explanation: "'Größe' means 'size'. 'Haben Sie das in Größe L?' is how you ask about available sizes.",
          xpReward: 10
        }
      ],
      vocabulary: [
        {
          id: "vocab7-4-1",
          german: "Kann ich Ihnen helfen?",
          english: "Can I help you? (formal)",
          malayalam: "ഞാന്‍ നിങ്ങളെ സഹായിക്കട്ടെ?",
          pronunciation: "kahn ikh ee-nen hel-fen",
          example: "Kann ich Ihnen helfen? — Ja, ich suche eine Hose.",
          exampleTranslation: "Can I help you? — Yes, I'm looking for trousers."
        },
        {
          id: "vocab7-4-2",
          german: "Ich suche...",
          english: "I'm looking for...",
          malayalam: "ഞാന്‍ തിരയുകയാണ്...",
          pronunciation: "ikh zoo-kheh",
          example: "Ich suche einen Pullover.",
          exampleTranslation: "I'm looking for a sweater."
        },
        {
          id: "vocab7-4-3",
          german: "die Größe",
          english: "size",
          malayalam: "വലിപ്പം / സൈസ്",
          pronunciation: "dee gruh-seh",
          example: "Welche Größe haben Sie?",
          exampleTranslation: "What size do you have?"
        },
        {
          id: "vocab7-4-4",
          german: "anprobieren",
          english: "to try on",
          malayalam: "ധരിച്ചു നോക്കുക",
          pronunciation: "ahn-pro-beer-en",
          example: "Kann ich das anprobieren?",
          exampleTranslation: "Can I try this on?"
        },
        {
          id: "vocab7-4-5",
          german: "die Umkleidekabine",
          english: "fitting room",
          malayalam: "ഫിറ്റിംഗ് റൂം",
          pronunciation: "dee oom-kly-deh-kah-bee-neh",
          example: "Die Umkleidekabine ist dort drüben.",
          exampleTranslation: "The fitting room is over there."
        },
        {
          id: "vocab7-4-6",
          german: "die Kasse",
          english: "checkout / cash register",
          malayalam: "കൗണ്ടര്‍ / ക്യാഷ് രജിസ്റ്റര്‍",
          pronunciation: "dee kah-seh",
          example: "Bitte zahlen Sie an der Kasse.",
          exampleTranslation: "Please pay at the checkout."
        },
        {
          id: "vocab7-4-7",
          german: "der Kassenzettel",
          english: "receipt",
          malayalam: "രസീത്",
          pronunciation: "dehr kah-sen-tset-tel",
          example: "Möchten Sie den Kassenzettel?",
          exampleTranslation: "Would you like the receipt?"
        },
        {
          id: "vocab7-4-8",
          german: "Das steht Ihnen gut!",
          english: "That suits you! (formal)",
          malayalam: "അത് നിങ്ങള്‍ക്ക് നന്നായി ചേരുന്നു!",
          pronunciation: "dahs shteht ee-nen goot",
          example: "Das rote Kleid steht Ihnen gut!",
          exampleTranslation: "The red dress suits you!"
        }
      ]
    },

    // ─── Lesson 7-5: Comparing Things ───
    {
      id: "7-5",
      title: "Comparing Things",
      titleGerman: "Vergleiche",
      description: "Learn to compare things in German — bigger, better, cheapest! Master comparatives and superlatives.",
      duration: "45 min",
      xpReward: 150,
      videos: [
        {
          id: "v7-5-1",
          title: "Bigger, Better, Best! - Comparisons in German",
          duration: "13:00",
          description: "Master comparative and superlative forms to compare prices, sizes, and quality in German.",
          scriptOutline: [
            "Opening: Which is better — dosa or appam? Let's learn to compare in German!",
            "Comparative basics: adjective + '-er' → groß → größer, klein → kleiner",
            "The comparison word: 'als' (than) — 'Berlin ist größer als Kochi.'",
            "Regular comparatives: billig → billiger, schnell → schneller, langsam → langsamer",
            "Irregular comparatives: gut → besser (good → better), teuer → teurer (note the 'e' drops!)",
            "Superlative basics: 'am + adjective + -sten' → am größten, am kleinsten, am billigsten",
            "Irregular superlatives: gut → am besten, teuer → am teuersten",
            "Umlaut changes: groß → größer → am größten (a/o/u often get umlauts!)",
            "Practice: Compare products — 'Das ist billiger als...' / 'Das ist am billigsten.'",
            "Summary: Regular pattern + common irregulars to memorize"
          ],
          keyVocabulary: ["größer", "kleiner", "billiger", "besser", "teurer", "am größten", "am besten", "am billigsten", "als"],
          learningObjectives: [
            "Form regular comparative adjectives with '-er'",
            "Use 'als' (than) for comparisons",
            "Form superlatives with 'am ...sten'",
            "Handle common irregular comparatives (gut → besser, teuer → teurer)",
            "Apply comparisons to real shopping scenarios"
          ],
          placeholderThumbnail: "/images/thumbnails/comparisons.jpg"
        }
      ],
      exercises: [
        {
          id: "ex7-5-1",
          type: "fill-blank",
          question: "Complete: 'Berlin ist _____ als München.' (Berlin is bigger than Munich.)",
          options: ["größer", "großer", "größter", "groß"],
          correctAnswer: "größer",
          explanation: "'groß' (big) → 'größer' (bigger). The 'o' gets an umlaut in the comparative form.",
          xpReward: 15
        },
        {
          id: "ex7-5-2",
          type: "multiple-choice",
          question: "What is the comparative form of 'gut' (good)?",
          options: ["guter", "güter", "besser", "am besten"],
          correctAnswer: "besser",
          explanation: "'gut → besser → am besten' is irregular, just like English 'good → better → best'.",
          xpReward: 10
        },
        {
          id: "ex7-5-3",
          type: "multiple-choice",
          question: "How do you say 'This is the cheapest' in German?",
          options: ["Das ist billiger.", "Das ist am billigsten.", "Das ist billigste.", "Das ist der billig."],
          correctAnswer: "Das ist am billigsten.",
          explanation: "Superlative with 'am': 'am billigsten' = the cheapest. Pattern: am + adjective + -sten.",
          xpReward: 10
        },
        {
          id: "ex7-5-4",
          type: "fill-blank",
          question: "Complete: 'Dieses Handy ist teurer _____ das andere.' (This phone is more expensive than the other one.)",
          options: ["als", "wie", "und", "oder"],
          correctAnswer: "als",
          explanation: "'als' = 'than' in comparisons. Always use 'als' (not 'wie') when comparing with '-er' forms.",
          xpReward: 10
        },
        {
          id: "ex7-5-5",
          type: "ordering",
          question: "Put these in order from positive → comparative → superlative: am kleinsten / kleiner / klein",
          options: ["klein", "kleiner", "am kleinsten"],
          correctAnswer: ["klein", "kleiner", "am kleinsten"],
          explanation: "klein (small) → kleiner (smaller) → am kleinsten (smallest). A regular pattern!",
          xpReward: 10
        },
        {
          id: "ex7-5-6",
          type: "matching",
          question: "Match the comparative forms:",
          options: ["groß → größer", "gut → besser", "billig → billiger", "schnell → schneller"],
          correctAnswer: ["groß → größer", "gut → besser", "billig → billiger", "schnell → schneller"],
          explanation: "Note: groß gets an umlaut, gut is completely irregular, but billig and schnell are regular.",
          xpReward: 15
        },
        {
          id: "ex7-5-7",
          type: "multiple-choice",
          question: "Which sentence correctly compares two items?",
          options: [
            "Das Kleid ist schöner wie die Hose.",
            "Das Kleid ist schöner als die Hose.",
            "Das Kleid ist schön als die Hose.",
            "Das Kleid ist am schöneren als die Hose."
          ],
          correctAnswer: "Das Kleid ist schöner als die Hose.",
          explanation: "Use 'als' (not 'wie') with comparatives. 'schöner als' = more beautiful than.",
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab7-5-1",
          german: "größer",
          english: "bigger",
          malayalam: "കൂടുതല്‍ വലിയ",
          pronunciation: "gruh-ser",
          example: "Berlin ist größer als Kochi.",
          exampleTranslation: "Berlin is bigger than Kochi."
        },
        {
          id: "vocab7-5-2",
          german: "kleiner",
          english: "smaller",
          malayalam: "കൂടുതല്‍ ചെറിയ",
          pronunciation: "kly-ner",
          example: "Mein Zimmer ist kleiner als deins.",
          exampleTranslation: "My room is smaller than yours."
        },
        {
          id: "vocab7-5-3",
          german: "billiger",
          english: "cheaper",
          malayalam: "കൂടുതല്‍ വിലകുറഞ്ഞ",
          pronunciation: "bill-ig-er",
          example: "Im Supermarkt ist es billiger.",
          exampleTranslation: "It's cheaper in the supermarket."
        },
        {
          id: "vocab7-5-4",
          german: "besser",
          english: "better",
          malayalam: "മികച്ച / കൂടുതല്‍ നല്ല",
          pronunciation: "bess-er",
          example: "Dieses Brot ist besser.",
          exampleTranslation: "This bread is better."
        },
        {
          id: "vocab7-5-5",
          german: "teurer",
          english: "more expensive",
          malayalam: "കൂടുതല്‍ വിലകൂടിയ",
          pronunciation: "toy-rer",
          example: "Das Kleid ist teurer als die Hose.",
          exampleTranslation: "The dress is more expensive than the trousers."
        },
        {
          id: "vocab7-5-6",
          german: "am besten",
          english: "the best",
          malayalam: "ഏറ്റവും നല്ല",
          pronunciation: "ahm bes-ten",
          example: "Dieses Restaurant ist am besten.",
          exampleTranslation: "This restaurant is the best."
        },
        {
          id: "vocab7-5-7",
          german: "am billigsten",
          english: "the cheapest",
          malayalam: "ഏറ്റവും വിലകുറഞ്ഞ",
          pronunciation: "ahm bill-ig-sten",
          example: "Hier ist es am billigsten.",
          exampleTranslation: "It's the cheapest here."
        },
        {
          id: "vocab7-5-8",
          german: "als",
          english: "than (in comparisons)",
          malayalam: "...നേക്കാള്‍ / ...യേക്കാള്‍",
          pronunciation: "ahls",
          example: "Deutsch ist schwerer als Englisch.",
          exampleTranslation: "German is harder than English."
        }
      ]
    }
  ]
};
