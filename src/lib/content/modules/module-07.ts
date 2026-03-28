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
      storyScene: {
        setting: {
          name: "Lidl / Aldi Supermarket",
          sceneType: "market",
          timeOfDay: "afternoon",
          description: "The fluorescent lights hum, and the air is filled with the smell of the bakery section. People are moving with purpose. There's no time to chat like at a Kerala village store. It's a high-speed efficiency test. Time to find your groceries and get through that checkout line, machane!",
        },
        narrative: {
          previousRecap: "You've survived the restaurant meal. Now, let's learn how to fill your own fridge!",
          currentObjective: "Identify grocery items with articles and manage the 'express' checkout experience",
          nextTeaser: "Next: the price is right! Let me tell you about Euros and Cents!",
        },
        kuttanIntro: [
          "Machane! German supermarkets are separate scene. Nammude kirana shop-il 'chettan' ennu vilichu help chodikkam, but ivide full self-service aanu.",
          "Items-inte articles (der, die, das) focus cheyyane. 'Das Brot', 'Die Milch' — ithu fix cheythal billing simple aakum.",
          "Ettavum main point: Checkout. Scan cheyyumpol nammal bag ready aakki nilkkanam. Speed is key! Let's shop!",
        ],
        vocabEncounters: [
          { vocabId: "vocab7-1-1", encounterMoment: "You pick up a carton: 'Die Milch steht hier.' (The milk is here).", contextSentence: "Ich brauche die Milch." },
          { vocabId: "vocab7-1-2", encounterMoment: "You grab a loaf: 'Das Brot ist billig.' (The bread is cheap).", contextSentence: "Das Brot ist frisch." },
          { vocabId: "vocab7-1-4", encounterMoment: "You find some eggs: 'Sechs Eier, bitte.' (Six eggs, please).", contextSentence: "Ich kaufe sechs Eier." },
          { vocabId: "vocab7-1-5", encounterMoment: "You look for sugar: 'Wo finde ich den Zucker?' (Where can I find the sugar?).", contextSentence: "Wo finde ich den Zucker?" },
          { vocabId: "vocab7-1-7", encounterMoment: "You spot the pasta: 'Die Nudeln sind dort.' (The noodles are there).", contextSentence: "Die Nudeln sind lecker." },
        ],
        decisionPoints: [
          {
            moment: "You reach the register. The cashier scans everything at lightning speed. You haven't brought a bag. What do you say?",
            options: [
              { text: "Ich brauche eine Tüte, bitte.", isCorrect: true, response: "Exactly! You need to buy a bag (die Tüte). In Germany, no bag is free!", kuttanReaction: "Adipoli! Germany-il plastic bags free aayittilla. 'Tüte' venam enkal athu muthale parayanam. Correct move! 🔥" },
              { text: "Haben Sie Plastic-Cover?", isCorrect: false, response: "Aiyyo! 'Plastic-Cover' is Manglish. They use 'Tüte'. And remember, they cost money!", kuttanReaction: "Vite machane! 'Cover' ennu paranjal Germans-inu manassilaavoolla. 'Tüte' ennu fix cheythoru! Try again! 😬" },
            ],
          },
          {
            moment: "You are finished. How do you tell the cashier 'That's all'?",
            options: [
              { text: "Das ist alles, danke.", isCorrect: true, response: "Correct! This signals the end of the transaction.", kuttanReaction: "Superb! 'Das ist alles' signals the end. Next step: payment! ⭐" },
              { text: "Ich bin fertig.", isCorrect: false, response: "Technically okay, but 'Das ist alles' is the standard phrase at the checkout.", kuttanReaction: "Aiyyo! 'Fertig' is more for tasks. Checkout-il 'Das ist alles' aanu natural form. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v7-1-1",
          title: "Im Supermarkt - Shopping in Germany",
          duration: "12:00",
          description: "A complete guide to grocery shopping in a German supermarket — from entering to checkout.",
          scriptOutline: [
            "Opening: 'Welcome to a German Supermarkt! Nammude kirana shop pole alla, full self-service aanu!'",
            "Supermarket Layout: entry-il fruit pinne dairy, bread... standard plan aanu.",
            "Items with articles: die Milch, das Brot, die Butter, das Ei / die Eier. Articles focus venam!",
            "Essentials: der Zucker, das Mehl, die Nudeln (Malayalis-innu semiya pole!), der Joghurt.",
            "Helper phrase: 'Wo finde ich...?' (Where can I find...?)",
            "Checkout logic: 'Das ist alles.' (That's all.) Pinne speed venam! Germans are fast at the scan!",
            "Cultural shock: Bag free alla! Either bring your own or buy 'die Tüte'. No plastic freebies!",
            "Comparing: Personal kirana touch vs Efficient German self-service. Speed is respect!",
            "Challenge: List 5 items you need today in German!"
          ],
          keyVocabulary: ["die Milch", "das Brot", "die Butter", "das Ei", "die Eier", "der Zucker", "das Mehl", "die Nudeln", "der Joghurt", "Wo finde ich...?"],
          learningObjectives: [
            "Name at least 8 common grocery items with correct articles",
            "Ask where to find items using 'Wo finde ich...?'",
            "Use basic shopping phrases at the checkout",
            "Understand cultural differences in German shopping"
          ],
          placeholderThumbnail: "/images/supermarket_checkout.png",
          richContent: [
            {
              type: "table",
              title: "Supermarket Essentials",
              headers: ["German", "English", "Article"],
              rows: [
                ["die Milch", "milk", "die (f)"],
                ["das Brot", "bread", "das (n)"],
                ["die Butter", "butter", "die (f)"],
                ["das Ei / die Eier", "egg / eggs", "das (n)"],
                ["der Zucker", "sugar", "der (m)"],
                ["das Mehl", "flour", "das (n)"],
                ["die Nudeln", "pasta/noodles", "die (pl)"],
                ["der Joghurt", "yoghurt", "der (m)"]
              ]
            },
            {
              type: "note",
              title: "Bring Your Own Bag!",
              variant: "warning",
              content: "German supermarkets do NOT give free bags! You must bring your own or buy 'die Tüte' (bag) at the checkout. Also, be fast at packing — Germans scan items at lightning speed!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "Wo finde ich...?", english: "Where can I find...?", malayalam: "എവിടെ കിട്ടും...?", pronunciation: "vo fin-de ikh" },
                { german: "Das ist alles.", english: "That's all.", malayalam: "അത്രയേ ഉള്ളൂ.", pronunciation: "das ist al-les" },
                { german: "die Tüte", english: "bag", malayalam: "സഞ്ചി", pronunciation: "doo-te" }
              ]
            }
          ]
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
        },
        {
          id: "ex7-1-6",
          type: "dictation",
          question: "Listen and type: Ich kaufe sechs Eier.",
          correctAnswer: "Ich kaufe sechs Eier",
          explanation: "Great! 'Eier' is the plural of 'Ei'. And remember to capitalize all nouns!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-buy-eggs.mp3"
        },
        {
          id: "ex7-1-7",
          type: "free-text",
          question: "Write in German: 'Where can I find the milk?' (milk = Milch)",
          correctAnswer: "Wo finde ich die Milch",
          explanation: "Wunderbar! 'Wo finde ich...' is the perfect phrase for the supermarket. 'die Milch' because Milch is feminine.",
          xpReward: 30
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
      storyScene: {
        setting: {
          name: "Weekly Market (Annas Wochenmarkt)",
          sceneType: "market",
          timeOfDay: "morning",
          description: "Stalls are overflowing with fresh cheese, honey, and seasonal vegetables. No prices are fixed in your head yet — you need to ask! The air is chilly, and you need to calculate fast. Euro coins are heavy, and some stalls have a scary sign: 'Nur Barzahlung' (Cash Only). Time to handle the cash, machane!",
        },
        narrative: {
          previousRecap: "You've survived the supermarket speed test. Now, let's learn how to actually pay for all those groceries!",
          currentObjective: "Ask for prices, understand Euro/Cent combinations, and choose payment methods",
          nextTeaser: "Next: dressing up! Colors, clothes, and autumn vibes!",
        },
        kuttanIntro: [
          "Machane! Money matters are serious. German-il decimals parayumpo check cheyyam. Dot (.) alla, comma (,) aanu ivide use cheyyunnathu.",
          "Prices chodikkaan 'Was kostet das?' mathi. Bill kandaal 2,50 ennal 'Zwei Euro fünfzig' ennu parayanam.",
          "Main trap: Many small shops and markets only take cash. UPI nammude Kochi-il ulla athra ivide illatto! Keep some Euros in your pocket!",
        ],
        vocabEncounters: [
          { vocabId: "vocab7-2-1", encounterMoment: "You point to some cheese: 'Was kostet das Stück Käse?' (What does the piece of cheese cost?).", contextSentence: "Was kostet das Brot?" },
          { vocabId: "vocab7-2-4", encounterMoment: "You see some exotic fruits: 'Das ist sehr teuer!' (That is very expensive!). Better stick to apples.", contextSentence: "Das ist sehr teuer!" },
          { vocabId: "vocab7-2-7", encounterMoment: "You reach the counter: 'Ich möchte bar zahlen.' (I would like to pay cash).", contextSentence: "Ich möchte bar zahlen." },
          { vocabId: "vocab7-2-8", encounterMoment: "The seller hands you a piece of paper: 'Hier ist Ihre Quittung.' (Here is your receipt).", contextSentence: "Kann ich die Quittung haben?" },
          { vocabId: "vocab7-2-6", encounterMoment: "You find some discount milk: 'Das ist günstig.' (That is affordable).", contextSentence: "Der Supermarkt ist günstig." },
        ],
        decisionPoints: [
          {
            moment: "You see a price tag '3,50 €'. How do you say this amount correctly in German?",
            options: [
              { text: "Drei Euro fünfzig.", isCorrect: true, response: "Exactly! You say the big unit (Euro) then the smaller unit (Cent) without saying 'Cent' usually.", kuttanReaction: "Adipoli! Price logic perfect aayi handle cheythallo. You're ready for the market! 🔥" },
              { text: "Drei Punkt fünfzig Euro.", isCorrect: false, response: "Aiyyo! 'Punkt' means point, but in Germany we use a comma. 'Drei Euro fünfzig' is the way to say it.", kuttanReaction: "Vite machane! German-il comma decimal aanu system. 'Zwei Euro fünfzig' ennu fix cheytho! Try again! 😬" },
            ],
          },
          {
            moment: "You see a sign 'Nur Barzahlung'. What does this mean for your payment?",
            options: [
              { text: "I must pay with cash.", isCorrect: true, response: "Correct! 'Barzahlung' means cash payment only. No cards or mobile pay here!", kuttanReaction: "Superb! German cash culture logic catch cheythallo. ATM-il ninnu cash edukkan marakkaalle! ⭐" },
              { text: "I can pay with Google Pay.", isCorrect: false, response: "No! 'Nur' means only. If it says 'Barzahlung', no cards or apps will work!", kuttanReaction: "Aiyyo! 'Nur Barzahlung' kandaal katti poyene. Cash mathame edukkoolla ennanu artham. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v7-2-1",
          title: "Euro und Cent - Money in Germany",
          duration: "11:00",
          description: "Everything you need to know about German currency and talking about prices like a pro.",
          scriptOutline: [
            "Opening: 'Let's talk about paisa — German-il Geld (money)!'",
            "Euro and Cent: Coins and bills walkthrough. 1 and 2 Euro coins are heavy!",
            "Prices: 'Was kostet das?' and 'Wie viel kostet...?' Both logic-il same aanu.",
            "Comma logic: '3,50 €' (drei Euro fünfzig). German-il dot (.) alla, comma (,) aanu decimal!",
            "Adjectives: teuer (expensive), billig (cheap), günstig (value for money).",
            "Payment: bar zahlen (pay cash) vs mit Karte zahlen (pay by card).",
            "TRAP ALERT: Germany-il UPI illa! Cash is still king. 'Nur Barzahlung' kandaal katti povum!",
            "Quittung: Receipt ennalum Kassenbon ennalum paper kittiye theeroo!",
            "Culture: India-il scanning set aanu, but Germany-il cash venam pala shops-ilum.",
            "Rule: , (comma) decimal system arinjale budget set aavoo!"
          ],
          keyVocabulary: ["Was kostet das?", "Wie viel kostet...?", "der Euro", "der Cent", "teuer", "billig", "günstig", "bar", "mit Karte", "die Quittung"],
          learningObjectives: [
            "Ask and understand prices in German",
            "Say prices correctly using Euro and Cent",
            "Use vocabulary for expensive, cheap, and affordable",
            "Know common payment terms and cultural differences"
          ],
          placeholderThumbnail: "/images/supermarket_checkout.png",
          richContent: [
            {
              type: "table",
              title: "Talking About Prices",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["Was kostet das?", "What does this cost?", "ഇതിന്റെ വില എത്ര?"],
                ["Wie viel kostet...?", "How much does ... cost?", "എത്ര വിലയാണ്...?"],
                ["teuer", "expensive", "വിലകൂടിയ"],
                ["billig", "cheap", "വിലകുറഞ്ഞ"],
                ["günstig", "affordable / good value", "മിതമായ വില"]
              ]
            },
            {
              type: "note",
              title: "Comma = Decimal in Germany!",
              variant: "warning",
              content: "Germans write 3,50 € (not 3.50 €). The comma is the decimal separator! 'Drei Euro fünfzig' = €3.50. Also, dots are used for thousands: 1.000 = one thousand!"
            },
            {
              type: "table",
              title: "Payment Methods",
              headers: ["German", "English"],
              rows: [
                ["bar zahlen", "pay cash"],
                ["mit Karte zahlen", "pay by card"],
                ["die Quittung / der Kassenbon", "receipt"],
                ["Nur Barzahlung", "cash only"]
              ]
            },
            {
              type: "note",
              title: "Cash is King!",
              variant: "tip",
              content: "Unlike India's UPI revolution, many German shops still prefer cash. Always carry some Euro notes and coins. If you see 'Nur Barzahlung', it means cash only — no card accepted!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex7-2-1",
          type: "multiple-choice",
          question: "How do you ask 'How much does this cost?' in German?",
          options: ["Was ist das?", "Wie viel kostet das?", "Wo ist das?", "Was machst du?"],
          correctAnswer: "Wie viel kostet das?",
          imageUrl: "/images/german_menu.png",
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
        },
        {
          id: "ex7-2-7",
          type: "dictation",
          question: "Listen and type: Das kostet fünf Euro.",
          correctAnswer: "Das kostet fünf Euro",
          explanation: "Perfect! 'Euro' stays singular after a number: fünf Euro, zehn Euro.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-cost-5.mp3"
        },
        {
          id: "ex7-2-8",
          type: "free-text",
          question: "Translate to German: 'That is very expensive.' (expensive = teuer)",
          correctAnswer: "Das ist sehr teuer",
          explanation: "Excellent! 'sehr' means 'very'. 'Das ist sehr teuer!'",
          xpReward: 30
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
      storyScene: {
        setting: {
          name: "Shopping Center 'Arkaden'",
          sceneType: "mall",
          timeOfDay: "afternoon",
          description: "The mall is bright and crowded. Windows are full of autumn fashion. In Kochi, we mostly wear light clothes and Mundu, but here, the layers (Zwiebeltechnik — onion principle!) are essential. You need a jacket, a sweater, and some warm shoes. Time to pick your colors and build your German style, machane!",
        },
        narrative: {
          previousRecap: "You've mastered the market prices. Now, let's use that money to upgrade your wardrobe!",
          currentObjective: "Identify clothing items and colors, and use basic adjective endings (das rote Hemd)",
          nextTeaser: "Next: talk to the staff! Let's handle a real shopping dialogue!",
        },
        kuttanIntro: [
          "Machane! Dressing up in Germany is a separate level game. Autumn muthal winter vare nammal 'Zwiebel-prinzip' (onion principle) follow cheyyaam — layers layers mathame! 😄",
          "Colors (rot, blau, grün) and clothing (Hose, Hemd, Jacke) focus cheyyane. Adjective endings (rote, blaues) small peek ivide kittaam.",
          "Pinne 'die Hose' (trousers) singular aanu German-il ennorkkane. English-il oru pair aayirunnallo. Let's start shopping!",
        ],
        vocabEncounters: [
          { vocabId: "vocab7-3-1", encounterMoment: "You see a red shirt: 'Das rote Hemd gefällt mir.' (I like the red shirt).", contextSentence: "Die Blume ist rot." },
          { vocabId: "vocab7-3-10", encounterMoment: "You try on a jacket: 'Die Jacke ist grün.' (The jacket is green).", contextSentence: "Nimm die Jacke mit, es ist kalt!" },
          { vocabId: "vocab7-3-7", encounterMoment: "Lara suggests: 'Schau mal, das blaue Hemd!' (Look, the blue shirt!).", contextSentence: "Ich trage ein blaues Hemd." },
          { vocabId: "vocab7-3-12", encounterMoment: "You need shoes: 'Die schwarzen Schuhe sind teuer.' (The black shoes are expensive).", contextSentence: "Die schwarzen Schuhe gefallen mir." },
          { vocabId: "vocab7-3-8", encounterMoment: "You pick up trousers: 'Die Hose ist blau.' (The pants are blue).", contextSentence: "Die Hose ist zu lang." },
        ],
        decisionPoints: [
          {
            moment: "You see a beautiful red dress (das Kleid). How do you say 'The red dress' correctly?",
            options: [
              { text: "Das rote Kleid.", isCorrect: true, response: "Exactly! After 'das', the adjective gets an '-e' ending. Perfect agreement!", kuttanReaction: "Adipoli! 'das' + adjective + noun logic correctly catch cheythallo. You're a pro! 🔥" },
              { text: "Das rot Kleid.", isCorrect: false, response: "Aiyyo! Adjectives between the article and noun ALWAYS need an ending. 'rot' cannot stay pure here!", kuttanReaction: "Vite machane! Ending '-e' koodi add cheythal 'das rote Kleid' aavum. Try again! 😬" },
            ],
          },
          {
            moment: "Which statement about 'die Hose' (trousers) is correct in German?",
            options: [
              { text: "It is a singular noun (one item).", isCorrect: true, response: "Correct! Even though it has two legs, it's one 'Hose' in German.", kuttanReaction: "Superb! In English 'trousers' are plural, but in German 'die Hose' is singular. Point noted! ⭐" },
              { text: "It is always plural.", isCorrect: false, response: "No! Unlike English, German 'Hose' is singular. 'Die Hose ist...' not 'are'.", kuttanReaction: "Aiyyo! English logic ivide apply cheyyalle. German-il ithu singular aanu. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v7-3-1",
          title: "Farben - Colors in German",
          duration: "8:00",
          description: "Master all the basic colors in German with fun visual associations.",
          scriptOutline: [
            "Opening: 'World is colorful — let's describe it in German!'",
            "Primary: rot (red), blau (blue), gelb (yellow), grün (green).",
            "Neutrals: schwarz (black), weiß (white), grau (grey), braun (brown).",
            "Special: rosa (pink), lila (purple) — ithu marilla endings-il!",
            "Kerala connect: grüne Palmen (green palms), blaues Meer (blue sea). Vibes aanu!",
            "Pointing drill: Name 3 colors in your room right now!"
          ],
          keyVocabulary: ["rot", "blau", "grün", "gelb", "schwarz", "weiß", "braun", "grau", "rosa", "lila"],
          learningObjectives: [
            "Name all 10 basic colors in German",
            "Associate colors with everyday objects",
            "Understand that rosa and lila are special (indeclinable)"
          ],
          placeholderThumbnail: "/images/berlin_people.png",
          richContent: [
            {
              type: "table",
              title: "Basic Colors in German",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["rot", "red", "ചുവപ്പ്"],
                ["blau", "blue", "നീല"],
                ["grün", "green", "പച്ച"],
                ["gelb", "yellow", "മഞ്ഞ"],
                ["schwarz", "black", "കറുപ്പ്"],
                ["weiß", "white", "വെള്ള"],
                ["braun", "brown", "തവിട്ട്"],
                ["grau", "grey", "ചാരനിറം"],
                ["rosa", "pink", "പിങ്ക്"],
                ["lila", "purple", "നീലലോഹിതം"]
              ]
            },
            {
              type: "note",
              title: "Special Colors: rosa & lila",
              variant: "tip",
              content: "Unlike other colors, 'rosa' and 'lila' do NOT change their endings when used before nouns. They stay the same! Example: ein rosa Kleid (a pink dress), NOT 'ein rosas Kleid'."
            }
          ]
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
          placeholderThumbnail: "/images/supermarket_checkout.png",
          richContent: [
            {
              type: "table",
              title: "Clothing Vocabulary",
              headers: ["German", "English", "Article"],
              rows: [
                ["das Hemd", "shirt", "das (n)"],
                ["der Pullover", "sweater", "der (m)"],
                ["die Jacke", "jacket", "die (f)"],
                ["der Mantel", "coat", "der (m)"],
                ["die Hose", "trousers", "die (f)"],
                ["der Rock", "skirt", "der (m)"],
                ["das Kleid", "dress", "das (n)"],
                ["die Schuhe", "shoes (pl)", "die (pl)"]
              ]
            },
            {
              type: "table",
              title: "Adjective Endings After Definite Articles",
              headers: ["Article", "Pattern", "Example"],
              rows: [
                ["das (neuter)", "adj + -e", "das rote Kleid"],
                ["der (masculine)", "adj + -e", "der schwarze Mantel"],
                ["die (feminine)", "adj + -e", "die grüne Jacke"]
              ]
            },
            {
              type: "note",
              title: "Adjective Endings Preview",
              variant: "info",
              content: "Good news! After definite articles (der/die/das), adjectives always end in '-e' in the nominative case. Don't panic about other endings yet — we'll cover them step by step later!"
            }
          ]
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
        },
        {
          id: "ex7-3-7",
          type: "dictation",
          question: "Listen and type: Das rote Kleid ist schön.",
          correctAnswer: "Das rote Kleid ist schön",
          explanation: "Super! 'rote' is the adjective form after 'das'. And 'schön' means beautiful/nice.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-red-dress.mp3"
        },
        {
          id: "ex7-3-8",
          type: "free-text",
          question: "Write in German: 'I am wearing a white shirt.' (shirt = Hemd, white = weiß)",
          correctAnswer: "Ich trage ein weißes Hemd",
          explanation: "Wunderbar! 'Ich trage ein weißes Hemd.' — note the '-es' ending for neuter objects with 'ein'.",
          xpReward: 30
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
      storyScene: {
        setting: {
          name: "Global Fashion Store (H&M)",
          sceneType: "mall",
          timeOfDay: "afternoon",
          description: "Rows of clothes stretching as far as the eye can see. You've picked up a nice jacket, but you're not sure if it fits. A sales assistant is circling around. In Kochi, they might follow you closely, but here they wait until you look confused. Time to speak up and handle the dialogue, machane!",
        },
        narrative: {
          previousRecap: "You've picked your colors and clothes. Now, let's learn how to interact with the people in the shop!",
          currentObjective: "Navigate a complete shopping conversation including help requests, sizes, and fitting",
          nextTeaser: "Module 7 complete! Next: Let's travel! Train stations, tickets, and the DB experience!",
        },
        kuttanIntro: [
          "Machane! Shop-il ninnu help chodikkunnathu oru separate skill aanu. 'Ich suche...' (I'm looking for) ennu thudangiyaal baaki ellam simple aakum.",
          "Size-inte karyam parayumpo 'Größe M' (size M) ennu parayanam. Pinne dress try cheyyaan 'anprobieren' use cheyyam.",
          "Umkleidekabine (fitting room) evideyaannu nokkane. Ellaam polite aayi handle cheyyaam!",
        ],
        vocabEncounters: [
          { vocabId: "vocab7-4-1", encounterMoment: "The assistant approaches: 'Kann ich Ihnen helfen?' (Can I help you?). You're ready!", contextSentence: "Kann ich Ihnen helfen?" },
          { vocabId: "vocab7-4-2", encounterMoment: "You answer: 'Ich suche eine Jacke in Blau.' (I'm looking for a blue jacket).", contextSentence: "Ich suche einen Pullover." },
          { vocabId: "vocab7-4-4", encounterMoment: "You find the right one: 'Kann ich das anprobieren?' (Can I try this on?).", contextSentence: "Kann ich das anprobieren?" },
          { vocabId: "vocab7-4-5", encounterMoment: "The assistant points: 'Die Umkleidekabine ist dort.' (The fitting room is there).", contextSentence: "Die Umkleidekabine ist dort drüben." },
          { vocabId: "vocab7-4-6", encounterMoment: "Verdict: 'Das passt gut! Wo ist die Kasse?' (That fits well! Where is the checkout?).", contextSentence: "Bitte zahlen Sie an der Kasse." },
        ],
        decisionPoints: [
          {
            moment: "The assistant asks 'Kann ich Ihnen helfen?'. You want to say 'Yes, I am looking for a shirt'. What do you say?",
            options: [
              { text: "Ja, ich suche ein Hemd.", isCorrect: true, response: "Perfect! 'suche' is the right verb for shopping. The assistant starts looking for you!", kuttanReaction: "Adipoli! 'Ich suche' logic correctly catch cheythallo. Direct and polite. 🔥" },
              { text: "Ja, ich habe ein Hemd.", isCorrect: false, response: "Aiyyo! 'ich habe' means you already HAVE a shirt. They won't help you find one if you say that!", kuttanReaction: "Vite machane! 'Habe' means possess. Search cheyyumpo 'suche' venam. Try again! 😬" },
            ],
          },
          {
            moment: "The jacket is too small. How do you ask 'Do you have this in size L?'",
            options: [
              { text: "Haben Sie das in Größe L?", isCorrect: true, response: "Exactly! 'Größe' is the word for size. You've asked perfectly.", kuttanReaction: "Superb! Size selection logic correctly handled. 'Größe' is the key word! ⭐" },
              { text: "Haben Sie das in Nummer L?", isCorrect: false, response: "No, 'Nummer' is for numbers (like phone numbers). For clothes, we always use 'Größe'.", kuttanReaction: "Aiyyo! Number alla, 'Größe' aanu clothing context-il better. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v7-4-1",
          title: "Shopping Conversations - At the Store",
          duration: "12:00",
          description: "Real shopping dialogues you'll encounter in German clothing stores and shops.",
          scriptOutline: [
            "Opening: 'Shop-il ninnu help chodikkaan \"Ich suche...\" parayam!'",
            "Entering: 'Kann ich Ihnen helfen?' (Help venamo?) — polite 'Ihnen' form.",
            "Responding: 'Ich suche...' (I'm looking for...) + your list.",
            "Sizes: 'Haben Sie das in Größe M?' (M size undu?)",
            "Fitting: 'Kann ich das anprobieren?' (Try cheyyanam!)",
            "Logic: 'Die Umkleidekabine' (fitting room) evideya?",
            "Verdict: 'Das passt gut!' (Fits well) or 'Das passt nicht.'",
            "Register: 'Die Kasse' checkout logic.",
            "Lulu Mall Visual: Imagine shopping in Kochi but in full German logic!"
          ],
          keyVocabulary: ["Kann ich Ihnen helfen?", "Ich suche...", "Haben Sie das in Größe M?", "Kann ich das anprobieren?", "die Umkleidekabine", "die Kasse", "der Kassenzettel"],
          learningObjectives: [
            "Navigate a complete shopping conversation in German",
            "Ask for help, sizes, and fitting rooms",
            "Understand and respond to sales staff",
            "Complete a purchase using correct phrases"
          ],
          placeholderThumbnail: "/images/supermarket_checkout.png",
          richContent: [
            {
              type: "table",
              title: "Shopping Conversation Flow",
              headers: ["Step", "German", "English"],
              rows: [
                ["1. Greeting", "Kann ich Ihnen helfen?", "Can I help you?"],
                ["2. Looking for", "Ich suche...", "I'm looking for..."],
                ["3. Size", "Haben Sie das in Größe M?", "Do you have this in size M?"],
                ["4. Try on", "Kann ich das anprobieren?", "Can I try this on?"],
                ["5. Fitting room", "Wo ist die Umkleidekabine?", "Where is the fitting room?"],
                ["6. Verdict", "Das passt gut!", "That fits well!"],
                ["7. Checkout", "Wo ist die Kasse?", "Where is the checkout?"]
              ]
            },
            {
              type: "note",
              title: "Formal 'Ihnen' in Shops",
              variant: "info",
              content: "Shop staff will always use 'Sie/Ihnen' (formal you) with customers. Never switch to 'du' with staff you don't know — it's considered rude in Germany!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "die Umkleidekabine", english: "fitting room", malayalam: "ട്രയൽ റൂം", pronunciation: "oom-kly-de-ka-bee-ne" },
                { german: "die Kasse", english: "checkout", malayalam: "കൗണ്ടർ", pronunciation: "kas-se" },
                { german: "der Kassenzettel", english: "receipt", malayalam: "രസീത്", pronunciation: "kas-sen-tset-tel" }
              ]
            }
          ]
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
        },
        {
          id: "ex7-4-7",
          type: "dictation",
          question: "Listen and type: Kann ich das anprobieren?",
          correctAnswer: "Kann ich das anprobieren",
          explanation: "Excellent! 'anprobieren' is the verb for trying on clothes.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-try-on.mp3"
        },
        {
          id: "ex7-4-8",
          type: "free-text",
          question: "Translate to German: 'I am looking for a jacket.' (jacket = Jacke)",
          correctAnswer: "Ich suche eine Jacke",
          explanation: "Perfect! 'Ich suche eine Jacke.' — 'eine' because Jacke is feminine.",
          xpReward: 30
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
          pronunciation: "ikh zoo-khe",
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
      storyScene: {
        setting: {
          name: "Einkaufsstraße am Marktplatz",
          sceneType: "street",
          timeOfDay: "afternoon",
          description: "A busy German shopping street with store windows full of sale signs. You're comparing products and prices with a friend before deciding what to buy.",
        },
        narrative: {
          previousRecap: "You've learned adjectives and descriptions. Now it's time to COMPARE — bigger, cheaper, best!",
          currentObjective: "Use comparative (-er) and superlative (am -sten) forms to compare products and prices",
          nextTeaser: "Next: prepositions of place — where exactly IS that shop?",
        },
        kuttanIntro: [
          "Machane! Shopping time aanu! Germany-il sales season-il prices compare cheyyaan ariyaanam. Nammude Lulu Mall sale pole thanneyaanu!",
          "German-il comparison easy aanu — adjective + '-er' for comparative. 'Groß' becomes 'größer', 'billig' becomes 'billiger'. English-nte '-er' pole thanne!",
          "But some words are irregular — 'gut' becomes 'besser', not 'guter'. Pinne 'als' means 'than'. Let's go compare cheyyaam!",
        ],
        vocabEncounters: [
          { vocabId: "vocab7-5-1", encounterMoment: "You compare two bags: 'Diese Tasche ist größer als die andere.'", contextSentence: "Berlin ist größer als Kochi." },
          { vocabId: "vocab7-5-2", encounterMoment: "Your friend picks a small wallet: 'Das ist kleiner und praktischer.'", contextSentence: "Mein Zimmer ist kleiner als deins." },
          { vocabId: "vocab7-5-3", encounterMoment: "You spot a sale rack: 'Im Angebot! Alles ist billiger heute.'", contextSentence: "Im Supermarkt ist es billiger." },
          { vocabId: "vocab7-5-4", encounterMoment: "You try two chocolates: 'Diese Schokolade ist besser!'", contextSentence: "Dieses Brot ist besser." },
          { vocabId: "vocab7-5-5", encounterMoment: "You check a price tag and gasp: 'Das Kleid ist viel teurer als ich dachte!'", contextSentence: "Das Kleid ist teurer als die Hose." },
          { vocabId: "vocab7-5-6", encounterMoment: "Your friend declares: 'Dieses Geschäft ist am besten für Kleidung.'", contextSentence: "Dieses Restaurant ist am besten." },
        ],
        decisionPoints: [
          {
            moment: "You want to say the red jacket is cheaper than the blue one. How do you say it?",
            options: [
              { text: "Die rote Jacke ist billiger als die blaue.", isCorrect: true, response: "Correct! 'Billiger als' is the perfect comparative construction.", kuttanReaction: "Adipoli! Comparison king aayallo nee! 'Billiger als' — perfect use of comparative + als! 🔥" },
              { text: "Die rote Jacke ist mehr billig als die blaue.", isCorrect: false, response: "In German, you don't say 'mehr billig'. Unlike English 'more cheap', German uses 'billiger' directly.", kuttanReaction: "Aiyyo! German-il 'mehr + adjective' alla, direct '-er' add cheyyuka. 'Billiger' ennu mathram mathi!" },
            ],
          },
          {
            moment: "Your friend asks which shop has the best prices. You want to say 'This shop is the cheapest.' What do you say?",
            options: [
              { text: "Dieses Geschäft ist am billigsten.", isCorrect: true, response: "Perfect superlative! 'Am billigsten' = the cheapest. The 'am + -sten' pattern works great.", kuttanReaction: "Superb machane! Superlative form 'am billigsten' — nee shopping expert aanu ipo! ⭐" },
              { text: "Dieses Geschäft ist am billigeren.", isCorrect: false, response: "'Billigeren' is not the superlative form. Superlative uses 'am + stem + sten': am billigsten.", kuttanReaction: "Machane! Superlative-inu '-sten' venam, '-eren' alla. 'Am billigsten' aanu correct form!" },
              { text: "Dieses Geschäft ist der billigste.", isCorrect: false, response: "Close! 'Der billigste' works before a noun ('der billigste Laden'), but after 'ist' you need 'am billigsten'.", kuttanReaction: "Almost! 'Ist' kazhinjaal 'am billigsten' venam. 'Der billigste' noun-inu munpil mathram use cheyyuka!" },
            ],
          },
        ],
      },
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
          placeholderThumbnail: "/images/supermarket_checkout.png",
          richContent: [
            {
              type: "table",
              title: "Comparative & Superlative Forms",
              headers: ["Base", "Comparative (+er)", "Superlative (am ...sten)"],
              rows: [
                ["groß (big)", "größer", "am größten"],
                ["klein (small)", "kleiner", "am kleinsten"],
                ["billig (cheap)", "billiger", "am billigsten"],
                ["schnell (fast)", "schneller", "am schnellsten"],
                ["langsam (slow)", "langsamer", "am langsamsten"]
              ]
            },
            {
              type: "table",
              title: "Irregular Comparatives",
              headers: ["Base", "Comparative", "Superlative"],
              rows: [
                ["gut (good)", "besser", "am besten"],
                ["teuer (expensive)", "teurer", "am teuersten"],
                ["viel (much)", "mehr", "am meisten"],
                ["gern (gladly)", "lieber", "am liebsten"]
              ]
            },
            {
              type: "note",
              title: "The Comparison Word: als",
              variant: "tip",
              content: "'als' means 'than' in comparisons. Example: 'Berlin ist größer als Kochi.' (Berlin is bigger than Kochi.) Don't confuse 'als' with 'wie' — 'wie' is used for equals: 'so groß wie' (as big as)."
            }
          ]
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
        },
        {
          id: "ex7-5-8",
          type: "dictation",
          question: "Listen and type: Berlin ist größer als Kochi.",
          correctAnswer: "Berlin ist größer als Kochi",
          explanation: "Great job! 'größer als' = bigger than. A perfect comparison!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-berlin-kochi.mp3"
        },
        {
          id: "ex7-5-9",
          type: "free-text",
          question: "Write in German: 'This restaurant is the best.' (best = am besten)",
          correctAnswer: "Dieses Restaurant ist am besten",
          explanation: "Wunderbar! 'Dieses Restaurant ist am besten.' — using the superlative correctly!",
          xpReward: 30
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
