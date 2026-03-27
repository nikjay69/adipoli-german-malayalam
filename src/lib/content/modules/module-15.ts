import type { Module } from '../types';

export const MODULE_15: Module = {
  id: 15,
  title: "German Culture & Integration",
  titleGerman: "Kultur",
  description: "Understand German culture, customs, festivals, and how they compare to Kerala life!",
  icon: "🇩🇪",
  color: "#ea580c",
  totalHours: 8,
  unlockRequirement: "Complete Module 14",
  learningTips: [
    "Culture IS language. Understanding German customs (Mülltrennung, Ruhezeit) helps you understand German sentences about them.",
    "Watch one German TV show or movie per week with subtitles. Entertainment is stealth learning!",
    "Germans value directness — 'Das ist nicht gut' means exactly that, not a personal attack. Adjust your cultural filter.",
  ],
  lessons: [
    // ==================== LESSON 15-1 ====================
    {
      id: "15-1",
      title: "German Customs",
      titleGerman: "Deutsche Bräuche",
      description: "Discover the unwritten rules of living in Germany — from punctuality to trash sorting!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v15-1-1",
          title: "Pünktlichkeit & Other German Values",
          duration: "10:00",
          description: "Learn why being on time is sacred in Germany and other core cultural values",
          scriptOutline: [
            "Opening: 'In Kerala, IST = Indian Stretchable Time. In Germany, 10:00 means 9:55!'",
            "Pünktlichkeit (punctuality) — the #1 German value",
            "Ordnung muss sein — everything must have order",
            "Mülltrennung — trash sorting explained: Restmüll, Biomüll, Papier, Plastik, Glas",
            "Why Germans sort trash: environment is a big deal here",
            "Ruhezeit — quiet hours: 22:00-06:00 strictly enforced",
            "Sunday is sacred: no drilling, no lawn mowing, shops closed!",
            "Kerala parallel: We have flexible time, Germans absolutely do NOT",
            "Pro tip: If invited for 19:00 dinner, arrive at 19:00 — not 19:30 or 18:45!"
          ],
          keyVocabulary: ["die Pünktlichkeit", "die Mülltrennung", "die Ruhezeit", "die Ordnung"],
          learningObjectives: [
            "Understand the importance of punctuality in German culture",
            "Know the basics of waste sorting in Germany",
            "Be aware of quiet hours and Sunday rules",
            "Recognize key cultural differences from Kerala"
          ],
          placeholderThumbnail: "/images/thumbnails/german-customs.jpg"
        },
        {
          id: "v15-1-2",
          title: "Rules You Need to Know",
          duration: "10:00",
          description: "Essential everyday rules for living in Germany that nobody tells you before you arrive",
          scriptOutline: [
            "Anmeldung — registering your address (mandatory within 2 weeks!)",
            "Versicherung — you MUST have health insurance in Germany",
            "Rundfunkbeitrag — the TV/radio tax everyone must pay (yes, even if you only watch Netflix)",
            "Pfand — deposit on bottles, return them to get money back",
            "Bargeld — Germans love cash! Not everywhere accepts cards",
            "Jaywalking — don't cross on red, even if no cars! People WILL judge you",
            "Recycling culture: Pfandflaschen, Gelber Sack, Altglas containers",
            "Kerala comparison: In Kerala we have jugaad, in Germany we have Vorschriften (regulations)!",
            "Summary: Respect the rules and you'll fit right in"
          ],
          keyVocabulary: ["die Anmeldung", "die Versicherung", "das Pfand", "das Bargeld"],
          learningObjectives: [
            "Know about mandatory registration (Anmeldung)",
            "Understand the health insurance requirement",
            "Learn about the bottle deposit (Pfand) system",
            "Be prepared for cash-heavy culture"
          ],
          placeholderThumbnail: "/images/thumbnails/german-rules.jpg"
        }
      ],
      exercises: [
        {
          id: "ex15-1-1",
          type: "multiple-choice",
          question: "You're invited to dinner at a German friend's house at 19:00. When should you arrive?",
          options: ["At exactly 19:00", "Around 19:30 (fashionably late)", "At 18:30 (early to help)", "Anytime between 19:00 and 20:00"],
          correctAnswer: "At exactly 19:00",
          explanation: "In Germany, time is not a suggestion—it's a contract. Arriving at 19:05 is 'late', and 18:55 is 'early'. Aim for the exact minute to show respect for your host's planning!",
          xpReward: 10
        },
        {
          id: "ex15-1-2",
          type: "matching",
          question: "Match the trash type to the correct bin:",
          options: ["Banana peel", "Old newspaper", "Broken glass", "Plastic wrapper"],
          correctAnswer: ["Biomüll", "Papier", "Glas", "Gelber Sack / Plastik"],
          explanation: "Mülltrennung (Trash-sorting) is a German national hobby. Bio = natural/food. Papier = clean paper. Glas = jars/bottles. Yellow = plastic/packaging. Get it wrong, and your neighbors might leave you a polite 'note'!",
          xpReward: 15
        },
        {
          id: "ex15-1-3",
          type: "multiple-choice",
          question: "What is 'Ruhezeit' in Germany?",
          options: ["Quiet hours (22:00-06:00 and Sundays)", "Lunch break at work", "School holidays", "A type of German bread"],
          correctAnswer: "Quiet hours (22:00-06:00 and Sundays)",
          explanation: "Ruhe (Quiet) + Zeit (Time). From 10 PM to 6 AM, and ALL DAY Sunday, noise is restricted. No drilling, no loud music, no vacuuming. It's the law of the land!",
          xpReward: 10
        },
        {
          id: "ex15-1-4",
          type: "fill-blank",
          question: "Complete: Die _____ ist in Deutschland sehr wichtig. (Punctuality is very important in Germany.)",
          options: ["Pünktlichkeit", "Freundlichkeit", "Gemütlichkeit", "Sauberkeit"],
          correctAnswer: "Pünktlichkeit",
          explanation: "Pünkt-lich-keit. It comes from 'Punkt' (point/dot). Be 'on the point'. It's the foundation of trust in German society.",
          xpReward: 10
        },
        {
          id: "ex15-1-5",
          type: "multiple-choice",
          question: "What happens on Sundays in Germany?",
          options: ["Most shops are closed", "Everything is open as usual", "Only restaurants close", "People work overtime"],
          correctAnswer: "Most shops are closed",
          explanation: "Sonntagsruhe! Sunday is for family, church, or walking in the woods. Shops are CLOSED (except at main train stations). If you run out of milk on Sunday, you'll have to wait until Monday!",
          xpReward: 10
        },
        {
          id: "ex15-1-6",
          type: "dictation",
          question: "Listen and type: Pünktlichkeit ist sehr wichtig.",
          correctAnswer: "Pünktlichkeit ist sehr wichtig",
          explanation: "Perfect! This is the #1 rule for a successful life in Germany.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-punctuality-important.mp3"
        },
        {
          id: "ex15-1-7",
          type: "free-text",
          question: "Translate to German: 'Sunday is a quiet day.' (quiet = ruhig, day = Tag)",
          correctAnswer: "Sonntag ist ein ruhiger Tag",
          explanation: "Wunderbar! 'Sonntagsruhe' is a real thing. No loud noises allowed!",
          xpReward: 30
        }
      ],
      vocabulary: [
        {
          id: "vocab15-1-1",
          german: "die Pünktlichkeit",
          english: "punctuality",
          malayalam: "കൃത്യനിഷ്ഠ",
          pronunciation: "pynkt-likh-kite",
          example: "Pünktlichkeit ist in Deutschland sehr wichtig.",
          exampleTranslation: "Punctuality is very important in Germany."
        },
        {
          id: "vocab15-1-2",
          german: "die Mülltrennung",
          english: "waste sorting / recycling",
          malayalam: "മാലിന്യ വേര്‍തിരിക്കല്‍",
          pronunciation: "myll-tren-noong",
          example: "Die Mülltrennung ist in Deutschland Pflicht.",
          exampleTranslation: "Waste sorting is mandatory in Germany."
        },
        {
          id: "vocab15-1-3",
          german: "die Ruhezeit",
          english: "quiet hours",
          malayalam: "വിശ്രമ സമയം",
          pronunciation: "roo-he-tsayt",
          example: "Während der Ruhezeit darf man keinen Lärm machen.",
          exampleTranslation: "During quiet hours, you are not allowed to make noise."
        },
        {
          id: "vocab15-1-4",
          german: "die Ordnung",
          english: "order / tidiness",
          malayalam: "ക്രമം",
          pronunciation: "ort-noong",
          example: "Ordnung muss sein!",
          exampleTranslation: "There must be order!"
        },
        {
          id: "vocab15-1-5",
          german: "die Anmeldung",
          english: "registration",
          malayalam: "രജിസ്ട്രേഷന്‍",
          pronunciation: "an-mel-doong",
          example: "Die Anmeldung ist nach dem Umzug Pflicht.",
          exampleTranslation: "Registration is mandatory after moving."
        },
        {
          id: "vocab15-1-6",
          german: "das Pfand",
          english: "deposit (on bottles)",
          malayalam: "കുപ്പി നിക്ഷേപം",
          pronunciation: "pfant",
          example: "Die Flasche hat 25 Cent Pfand.",
          exampleTranslation: "The bottle has a 25 cent deposit."
        },
        {
          id: "vocab15-1-7",
          german: "das Bargeld",
          english: "cash",
          malayalam: "പണം (കൈയിലുള്ള)",
          pronunciation: "bar-gelt",
          example: "Viele Deutsche bezahlen mit Bargeld.",
          exampleTranslation: "Many Germans pay with cash."
        },
        {
          id: "vocab15-1-8",
          german: "die Versicherung",
          english: "insurance",
          malayalam: "ഇന്‍ഷുറന്‍സ്",
          pronunciation: "fer-zikh-er-oong",
          example: "In Deutschland braucht man eine Krankenversicherung.",
          exampleTranslation: "In Germany you need health insurance."
        }
      ]
    },

    // ==================== LESSON 15-2 ====================
    {
      id: "15-2",
      title: "Festivals & Holidays",
      titleGerman: "Feste und Feiertage",
      description: "Explore German festivals from Oktoberfest to Weihnachtsmarkt — and see how they compare to Kerala celebrations!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v15-2-1",
          title: "German Festivals",
          duration: "10:00",
          description: "Discover the major festivals celebrated across Germany",
          scriptOutline: [
            "Opening: 'Kerala has Onam, Vishu, Christmas. Germany has its own amazing festivals, often with deep historical roots!'",
            "Oktoberfest — world's biggest folk festival in Munich (September-October). Think beer, traditional clothes, and massive tents!",
            "Fun fact: Oktoberfest is actually mostly in September! It's a harvest festival, celebrating the end of the agricultural year.",
            "Karneval / Fasching — German carnival season (before Lent). A time for wild parties, costumes, and parades, especially in the Rhineland.",
            "Costumes, parades, and 'Helau!' or 'Alaaf!' depending on the region. It's a chance to let loose before the solemnity of Lent.",
            "Weihnachten (Christmas) — the BIG one in Germany. It's a magical time focused on family, reflection, and tradition.",
            "Weihnachtsmarkt — magical Christmas markets with Glühwein (mulled wine) and Lebkuchen (gingerbread). A must-experience sensory delight!",
            "Adventskranz — the Advent wreath, lighting candles each Sunday before Christmas. A beautiful tradition marking the countdown to Christmas.",
            "Kerala parallel: Onam vs Oktoberfest — BOTH are harvest festivals! Imagine the vibrant colors of Pookalam meeting the rustic charm of Lederhosen!",
            "Kerala parallel: Christmas in Kerala vs Christmas in Germany — both celebrate big, but with different styles and traditions. From fireworks to quiet family gatherings."
          ],
          keyVocabulary: ["Oktoberfest", "Weihnachten", "der Karneval", "der Weihnachtsmarkt"],
          learningObjectives: [
            "Know the major German festivals and when they occur",
            "Understand the cultural significance of Weihnachten",
            "Draw parallels between German and Kerala festivals",
            "Use festival-related vocabulary"
          ],
          placeholderThumbnail: "/images/thumbnails/german-festivals.jpg"
        },
        {
          id: "v15-2-2",
          title: "Public Holidays in Germany",
          duration: "10:00",
          description: "Learn about German public holidays and how they vary by state",
          scriptOutline: [
            "Opening: 'Germany has public holidays — but here's the twist: each state has different ones! It's a federal system, even for holidays.'",
            "National holidays everyone gets: Tag der Deutschen Einheit (October 3rd, German Unity Day), Neujahr (January 1st, New Year's Day).",
            "Ostern (Easter) — Good Friday and Easter Monday are holidays. A time for spring, family, and chocolate eggs.",
            "Christi Himmelfahrt — also Vatertag (Father's Day), where men often go on hikes with beer wagons! A unique German tradition.",
            "Silvester (New Year's Eve) — fireworks EVERYWHERE at midnight. Germans love their fireworks!",
            "Regional holidays: Heilige Drei Könige (January 6th, Epiphany) only in some states like Bavaria. Always check your Bundesland!",
            "Bayern (Bavaria) has the MOST holidays — lucky them! It's often due to strong Catholic traditions.",
            "Brückentag — 'bridge day' between a holiday and a weekend. Everyone takes off to create a long weekend. A smart way to maximize leisure time!",
            "Kerala parallel: We have Onam, Vishu, and SO many state holidays too! The concept of regional holidays is familiar.",
            "Pro tip: Check your Bundesland's holidays when planning trips or expecting closures. Don't get caught out!"
          ],
          keyVocabulary: ["der Feiertag", "Ostern", "Silvester", "Neujahr"],
          learningObjectives: [
            "Know the main German public holidays",
            "Understand that holidays vary by state",
            "Learn the concept of Brückentag",
            "Relate German holidays to familiar Kerala holidays"
          ],
          placeholderThumbnail: "/images/thumbnails/german-holidays.jpg"
        }
      ],
      exercises: [
        {
          id: "ex15-2-1",
          type: "multiple-choice",
          question: "What is the German word for Christmas?",
          options: ["Weihnachten", "Silvester", "Ostern", "Karneval"],
          correctAnswer: "Weihnachten",
          explanation: "Weih-nachten (Holy Nights). In Germany, the celebration peaks on the evening of Dec 24th (Heiligabend), unlike the morning focus in many other cultures.",
          xpReward: 10
        },
        {
          id: "ex15-2-2",
          type: "matching",
          question: "Match the German festival to its description:",
          options: ["Oktoberfest", "Karneval", "Silvester", "Ostern"],
          correctAnswer: ["Folk festival with beer in Munich", "Costume parades before Lent", "New Year's Eve fireworks", "Easter celebrations in spring"],
          explanation: "Germans work hard, but they celebrate HARD too. Every season has its major 'Event'!",
          xpReward: 15
        },
        {
          id: "ex15-2-3",
          type: "multiple-choice",
          question: "Which Kerala festival is most similar to Oktoberfest?",
          options: ["Onam (both are harvest festivals)", "Vishu", "Thrissur Pooram", "Christmas"],
          correctAnswer: "Onam (both are harvest festivals)",
          explanation: "Octoberfest is basically 'Bavarian Onam'—a celebration of the harvest, full of traditional clothes (Lederhosen/Sari), music, and community spirit!",
          xpReward: 10
        },
        {
          id: "ex15-2-4",
          type: "fill-blank",
          question: "Complete: Der _____ ist ein heißes Getränk auf dem Weihnachtsmarkt. (_____ is a hot drink at the Christmas market.)",
          options: ["Glühwein", "Kaffee", "Apfelsaft", "Bier"],
          correctAnswer: "Glühwein",
          explanation: "Glüh-wein (Mulled wine). It's hot, spiced wine that keeps you warm while you browse the stalls in -5°C weather. A true sensory experience of German winter!",
          xpReward: 10
        },
        {
          id: "ex15-2-5",
          type: "multiple-choice",
          question: "What is a 'Brückentag'?",
          options: ["A day off between a holiday and the weekend", "A special bridge in Germany", "A type of bread", "A festival in June"],
          correctAnswer: "A day off between a holiday and the weekend",
          explanation: "Brücke (Bridge) + Tag (Day). If Thursday is a holiday, Friday is the 'Bridge' to the weekend. Smart Germans book this day off months in advance!",
          xpReward: 10
        },
        {
          id: "ex15-2-6",
          type: "dictation",
          question: "Listen and type: Wir feiern Weihnachten.",
          correctAnswer: "Wir feiern Weihnachten",
          explanation: "Great! 'feiern' means to celebrate. Christmas is the biggest festival in Germany.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-celebrate-christmas.mp3"
        },
        {
          id: "ex15-2-7",
          type: "free-text",
          question: "Write in German: 'Oktoberfest is in Munich.' (Munich = München)",
          correctAnswer: "Oktoberfest ist in München",
          explanation: "Wunderbar! Munich is the home of the world-famous Oktoberfest.",
          xpReward: 30
        }
      ],
      vocabulary: [
        {
          id: "vocab15-2-1",
          german: "Weihnachten",
          english: "Christmas",
          malayalam: "ക്രിസ്മസ്",
          pronunciation: "vay-nakh-ten",
          example: "Wir feiern Weihnachten am 25. Dezember.",
          exampleTranslation: "We celebrate Christmas on December 25th."
        },
        {
          id: "vocab15-2-2",
          german: "Ostern",
          english: "Easter",
          malayalam: "ഈസ്റ്റര്‍",
          pronunciation: "oh-stern",
          example: "An Ostern suchen Kinder Ostereier.",
          exampleTranslation: "At Easter, children search for Easter eggs."
        },
        {
          id: "vocab15-2-3",
          german: "der Weihnachtsmarkt",
          english: "Christmas market",
          malayalam: "ക്രിസ്മസ് ചന്ത",
          pronunciation: "vay-nakhts-markt",
          example: "Der Weihnachtsmarkt in Nürnberg ist sehr berühmt.",
          exampleTranslation: "The Christmas market in Nuremberg is very famous."
        },
        {
          id: "vocab15-2-4",
          german: "der Glühwein",
          english: "mulled wine",
          malayalam: "ചൂടാക്കിയ വൈന്‍",
          pronunciation: "gly-vine",
          example: "Möchtest du einen Glühwein?",
          exampleTranslation: "Would you like a mulled wine?"
        },
        {
          id: "vocab15-2-5",
          german: "der Adventskranz",
          english: "Advent wreath",
          malayalam: "അഡ്വന്റ് മാല",
          pronunciation: "ad-vents-krants",
          example: "Wir zünden die erste Kerze am Adventskranz an.",
          exampleTranslation: "We light the first candle on the Advent wreath."
        },
        {
          id: "vocab15-2-6",
          german: "der Feiertag",
          english: "public holiday",
          malayalam: "പൊതു അവധി",
          pronunciation: "fay-er-tahk",
          example: "Morgen ist ein Feiertag.",
          exampleTranslation: "Tomorrow is a public holiday."
        },
        {
          id: "vocab15-2-7",
          german: "Silvester",
          english: "New Year's Eve",
          malayalam: "പുതുവര്‍ഷ രാവ്",
          pronunciation: "zil-ves-ter",
          example: "An Silvester gibt es ein großes Feuerwerk.",
          exampleTranslation: "On New Year's Eve there are big fireworks."
        },
        {
          id: "vocab15-2-8",
          german: "das Fest",
          english: "festival / celebration",
          malayalam: "ഉത്സവം",
          pronunciation: "fest",
          example: "Oktoberfest ist das größte Fest in München.",
          exampleTranslation: "Oktoberfest is the biggest festival in Munich."
        }
      ]
    },

    // ==================== LESSON 15-3 ====================
    {
      id: "15-3",
      title: "Differences from Kerala Culture",
      titleGerman: "Kulturelle Unterschiede",
      description: "A fun, honest look at what surprises Malayalis most about life in Germany — from cold dinners to personal space!",
      duration: "45 min",
      xpReward: 120,
      videos: [
        {
          id: "v15-3-1",
          title: "Kerala vs Germany - Cultural Differences (with humor!)",
          duration: "12:00",
          description: "A fun comparison of everyday cultural differences between Kerala and Germany",
          scriptOutline: [
            "Opening: 'Okay, let's talk about what will SHOCK you in Germany! Kerala life-um German life-um thammilulla main diffs!'",
            "THE BREAD TRAGEDY: Abendbrot (evening bread). Germans eat cold bread for dinner! No hot kanji or fish curry, machaa!",
            "FOOD: Brot for breakfast — IDLI-DOSA-nu full rest aanu. You'll miss your morning sambar!",
            "Socializing: Germans need PERSONAL SPACE. Imagine a 1.5-meter bubble. Don't stand too close in queues!",
            "Invitations: You MUST have a plan. In Kerala, we just drop by. In Germany, even parents might call a week before visiting!",
            "'In Kerala, the whole colony is family. In Germany, even your neighbor needs an appointment for a chat!'",
            "THE COMMON GROUND: Shoes OFF indoors. Same as our homes. At least something is easy!",
            "THE DIRECTNESS: If they say 'Das ist nicht gut,' it's not an insult. They just don't sugarcoat like we do.",
            "Small talk: Minimal. No 'Ninte veedu evideya?' to strangers on the train. Privacy is sacred.",
            "die Gastfreundschaft: Hospitality exists, but nobody will force-feed you. If you say 'No thanks', they actually believe you!",
            "Weather obsession: The national topic. 'Es ist kalt, oder?' is the German version of 'Enthella vishesham?'",
            "The good stuff: Life is organized, rules are for everyone, and your boss won't call you after 5 PM (Feierabend!)"
          ],
          keyVocabulary: ["die Gastfreundschaft", "das Abendbrot", "die Einladung", "die Direktheit"],
          learningObjectives: [
            "Understand key cultural differences between Kerala and Germany",
            "Know about German food habits and social norms",
            "Prepare mentally for common culture shocks",
            "Appreciate both cultures' unique qualities"
          ],
          placeholderThumbnail: "/images/thumbnails/kerala-vs-germany.jpg"
        }
      ],
      exercises: [
        {
          id: "ex15-3-1",
          type: "multiple-choice",
          question: "What is 'Abendbrot' in Germany?",
          options: ["A cold dinner, usually with bread", "A type of evening prayer", "A special cake eaten at night", "The evening news program"],
          correctAnswer: "A cold dinner, usually with bread",
          explanation: "Abend (Evening) + Brot (Bread). It’s the ritual of eating bread, cheese, and meats for dinner. For Malayalis used to hot rice, this is often the biggest culture shock!",
          xpReward: 10
        },
        {
          id: "ex15-3-2",
          type: "multiple-choice",
          question: "What should you do before visiting a German friend's home?",
          options: ["Get an invitation or call ahead", "Just drop by anytime", "Bring your whole family unannounced", "Wait outside until they notice you"],
          correctAnswer: "Get an invitation or call ahead",
          explanation: "Spontaneous visits are rare in Germany. 'Terminkultur' extends to friendship! Always ask 'Hast du Zeit?' before heading over.",
          xpReward: 10
        },
        {
          id: "ex15-3-3",
          type: "fill-blank",
          question: "Complete: Deutsche _____ ist anders als in Kerala — sie bieten Essen an, aber zwingen nicht! (German _____ is different from Kerala.)",
          options: ["Gastfreundschaft", "Freundschaft", "Partnerschaft", "Nachbarschaft"],
          correctAnswer: "Gastfreundschaft",
          explanation: "Gast-freund-schaft (Guest-friend-ship). In Germany, the guest's 'No' is respected immediately. In Kerala, you often have to say 'No' three times before people believe you!",
          xpReward: 10
        },
        {
          id: "ex15-3-4",
          type: "matching",
          question: "Match the cultural behavior to the correct country:",
          options: ["Cold dinner with bread is normal", "Dropping by friends' houses unannounced", "Very direct communication", "Flexible with time"],
          correctAnswer: ["Germany", "Kerala", "Germany", "Kerala"],
          explanation: "Understanding these differences helps you avoid 'Culture Shock' and helps you integrate faster.",
          xpReward: 15
        },
        {
          id: "ex15-3-5",
          type: "multiple-choice",
          question: "Which cultural habit is actually SIMILAR in both Kerala and Germany?",
          options: ["Taking shoes off indoors", "Eating bread for breakfast", "Being very punctual", "Cold dinner"],
          correctAnswer: "Taking shoes off indoors",
          explanation: "Surprise! Both cultures value clean floors. Taking your shoes off at the door is standard practice in both Kochi and Köln.",
          xpReward: 10
        },
        {
          id: "ex15-3-6",
          type: "dictation",
          question: "Listen and type: Ich esse gern Biryani.",
          correctAnswer: "Ich esse gern Biryani",
          explanation: "Perfect! You can always talk about your favorite food from home.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-like-biryani.mp3"
        },
        {
          id: "ex15-3-7",
          type: "free-text",
          question: "Translate to German: 'German hospitality is warm.' (hospitality = Gastfreundschaft, warm = herzlich)",
          correctAnswer: "Deutsche Gastfreundschaft ist herzlich",
          explanation: "Excellent! 'herzlich' (from the heart) is a great word for warm hospitality.",
          xpReward: 30
        },
        {
          id: "ex15-3-8",
          type: "free-text",
          question: "Write in German: 'I like bread.' (bread = Brot)",
          correctAnswer: "Ich mag Brot",
          explanation: "Wunderbar! Since bread is a staple in Germany, this is a useful sentence.",
          xpReward: 30
        }
      ],
      vocabulary: [
        {
          id: "vocab15-3-1",
          german: "die Gastfreundschaft",
          english: "hospitality",
          malayalam: "അതിഥി സല്‍ക്കാരം",
          pronunciation: "gast-froynt-shaft",
          example: "Deutsche Gastfreundschaft ist herzlich, aber anders als in Indien.",
          exampleTranslation: "German hospitality is warm, but different from India."
        },
        {
          id: "vocab15-3-2",
          german: "das Abendbrot",
          english: "evening meal (cold dinner)",
          malayalam: "രാത്രി ഭക്ഷണം (തണുത്തത്)",
          pronunciation: "ah-bent-broht",
          example: "Zum Abendbrot essen wir Brot mit Käse.",
          exampleTranslation: "For dinner we eat bread with cheese."
        },
        {
          id: "vocab15-3-3",
          german: "die Einladung",
          english: "invitation",
          malayalam: "ക്ഷണം",
          pronunciation: "ayn-lah-doong",
          example: "Hast du eine Einladung zur Party?",
          exampleTranslation: "Do you have an invitation to the party?"
        },
        {
          id: "vocab15-3-4",
          german: "die Direktheit",
          english: "directness",
          malayalam: "നേരിട്ടുള്ള സമീപനം",
          pronunciation: "di-rekt-hyte",
          example: "Die deutsche Direktheit ist nicht unhöflich.",
          exampleTranslation: "German directness is not impolite."
        },
        {
          id: "vocab15-3-5",
          german: "der Unterschied",
          english: "difference",
          malayalam: "വ്യത്യാസം",
          pronunciation: "oon-ter-sheet",
          example: "Es gibt viele Unterschiede zwischen Kerala und Deutschland.",
          exampleTranslation: "There are many differences between Kerala and Germany."
        },
        {
          id: "vocab15-3-6",
          german: "die Privatsphäre",
          english: "privacy",
          malayalam: "സ്വകാര്യത",
          pronunciation: "pri-vaht-sfeh-re",
          example: "Deutsche schätzen ihre Privatsphäre.",
          exampleTranslation: "Germans value their privacy."
        }
      ]
    },

    // ==================== LESSON 15-4 ====================
    {
      id: "15-4",
      title: "Useful Slang & Colloquial German",
      titleGerman: "Umgangssprache",
      description: "Learn everyday German slang and abbreviations that textbooks never teach you!",
      duration: "45 min",
      xpReward: 150,
      videos: [
        {
          id: "v15-4-1",
          title: "Umgangssprache - Everyday German Slang",
          duration: "12:00",
          description: "The slang, abbreviations, and colloquial expressions real Germans use every day",
          scriptOutline: [
            "Opening: 'Textbook German is great, but here's what REAL Germans say!'",
            "Cool — yes, Germans use 'cool' too! (borrowed from English)",
            "Geil — means 'awesome/cool' in slang (careful: it has other meanings!)",
            "Krass — 'crazy/extreme/wow' — can be positive or negative",
            "Alter! — 'Dude!' — used like machane in Malayalam!",
            "Na? — shortest German greeting, means 'Hey, what's up?'",
            "Bescheid sagen — 'let me know' — VERY commonly used",
            "Kein Bock — 'I don't feel like it' (informal)",
            "Keine Ahnung — 'No idea' — you'll hear this ALL the time",
            "Text abbreviations: LG (Liebe Grüße), MfG (Mit freundlichen Grüßen), vllt (vielleicht)",
            "Formal vs colloquial register: When to use what",
            "WhatsApp German vs Email German vs Business German",
            "Kerala parallel: Like how we switch between formal Malayalam and Manglish!",
            "Warning: Don't use slang in formal situations, job interviews, or with professors!"
          ],
          keyVocabulary: ["geil", "krass", "Alter", "Na?", "Bescheid sagen", "Kein Bock"],
          learningObjectives: [
            "Understand common German slang expressions",
            "Know when slang is appropriate vs inappropriate",
            "Recognize common German text abbreviations",
            "Distinguish between formal and colloquial registers"
          ],
          placeholderThumbnail: "/images/thumbnails/german-slang.jpg"
        }
      ],
      exercises: [
        {
          id: "ex15-4-1",
          type: "multiple-choice",
          question: "What does 'Kein Bock' mean in colloquial German?",
          options: ["I don't feel like it", "No goat", "No book", "No money"],
          correctAnswer: "I don't feel like it",
          explanation: "Literally 'No ram/male-goat'. In slang, it means 'I zero-percent want to do this'. It’s the German version of 'Oru mood-um illa'!",
          xpReward: 10
        },
        {
          id: "ex15-4-2",
          type: "matching",
          question: "Match the slang to its meaning:",
          options: ["Krass!", "Na?", "Alter!", "Keine Ahnung"],
          correctAnswer: ["Crazy / Wow!", "Hey, what's up?", "Dude!", "No idea"],
          explanation: "Slang makes you sound alive. 'Alter' is used exactly like 'Machane' or 'Aliya' in Malayalam.",
          xpReward: 15
        },
        {
          id: "ex15-4-3",
          type: "multiple-choice",
          question: "What does 'LG' stand for in a German text message?",
          options: ["Liebe Grüße (kind regards)", "Lustige Geschichte (funny story)", "Letzte Grenze (last border)", "Langsames Gehen (slow walking)"],
          correctAnswer: "Liebe Grüße (kind regards)",
          explanation: "The standard WhatsApp sign-off. If you're being slightly formal, you use 'VG' (Viele Grüße).",
          xpReward: 10
        },
        {
          id: "ex15-4-4",
          type: "fill-blank",
          question: "Complete: Kannst du mir _____ sagen? (Can you let me know?)",
          options: ["Bescheid", "Kein Bock", "Krass", "Geil"],
          correctAnswer: "Bescheid",
          explanation: "'Bescheid sagen' is a massive part of German life. It means 'to inform' or 'give a heads-up'. It helps everyone stay 'pünktlich'!",
          xpReward: 10
        },
        {
          id: "ex15-4-5",
          type: "multiple-choice",
          question: "In which situation should you NOT use slang like 'geil' or 'Alter'?",
          options: ["In a job interview", "Chatting with friends", "Texting your buddy", "At a party with peers"],
          correctAnswer: "In a job interview",
          explanation: "Formal situations demand 'Sie' and proper grammar. Slang is your 'off-duty' language for friends and family.",
          xpReward: 10
        },
        {
          id: "ex15-4-6",
          type: "matching",
          question: "Match the abbreviation to the full form:",
          options: ["MfG", "vllt", "LG"],
          correctAnswer: ["Mit freundlichen Grüßen", "vielleicht", "Liebe Grüße"],
          xpReward: 15
        },
        {
          id: "ex15-4-7",
          type: "dictation",
          question: "Listen and type: Keine Ahnung!",
          correctAnswer: "Keine Ahnung",
          explanation: "Great! This is the most common way to say 'No idea' in everyday German.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-no-idea.mp3"
        },
        {
          id: "ex15-4-8",
          type: "free-text",
          question: "Write 'Dude!' in German slang.",
          correctAnswer: "Alter",
          explanation: "Wunderbar! 'Alter' is the German equivalent of 'Machane' or 'Aliya'.",
          xpReward: 30
        },
        {
          id: "ex15-4-9",
          type: "free-text",
          question: "Translate to German: 'That is awesome!' (use geil)",
          correctAnswer: "Das ist geil",
          explanation: "Excellent! 'geil' is very common slang for awesome.",
          xpReward: 30
        }
      ],
      vocabulary: [
        {
          id: "vocab15-4-1",
          german: "geil",
          english: "awesome / cool (slang)",
          malayalam: "കിടിലന്‍ (slang)",
          pronunciation: "gayl",
          example: "Das Konzert war echt geil!",
          exampleTranslation: "The concert was really awesome!"
        },
        {
          id: "vocab15-4-2",
          german: "krass",
          english: "crazy / extreme / wow",
          malayalam: "കടുപ്പം / ഭയങ്കരം",
          pronunciation: "krahs",
          example: "Krass! Das habe ich nicht erwartet!",
          exampleTranslation: "Wow! I didn't expect that!"
        },
        {
          id: "vocab15-4-3",
          german: "Alter!",
          english: "Dude! (slang)",
          malayalam: "മച്ചാനേ!",
          pronunciation: "al-ter",
          example: "Alter, das war knapp!",
          exampleTranslation: "Dude, that was close!"
        },
        {
          id: "vocab15-4-4",
          german: "Na?",
          english: "Hey / What's up?",
          malayalam: "എന്താ?",
          pronunciation: "nah",
          example: "Na? Alles klar?",
          exampleTranslation: "Hey? Everything okay?"
        },
        {
          id: "vocab15-4-5",
          german: "Bescheid sagen",
          english: "to let someone know",
          malayalam: "അറിയിക്കുക",
          pronunciation: "be-shyte zah-gen",
          example: "Sag mir bitte Bescheid, wenn du kommst.",
          exampleTranslation: "Please let me know when you're coming."
        },
        {
          id: "vocab15-4-6",
          german: "Kein Bock",
          english: "don't feel like it (slang)",
          malayalam: "മൂഡ് ഇല്ല (slang)",
          pronunciation: "kyne bok",
          example: "Ich habe keinen Bock auf Hausaufgaben.",
          exampleTranslation: "I don't feel like doing homework."
        },
        {
          id: "vocab15-4-7",
          german: "Keine Ahnung",
          english: "no idea",
          malayalam: "ഒരു പിടിയും ഇല്ല",
          pronunciation: "ky-ne ah-noong",
          example: "Wo ist der Schlüssel? — Keine Ahnung!",
          exampleTranslation: "Where is the key? — No idea!"
        },
        {
          id: "vocab15-4-8",
          german: "die Umgangssprache",
          english: "colloquial language / slang",
          malayalam: "സംസാര ഭാഷ",
          pronunciation: "oom-gangs-shprah-khe",
          example: "In der Umgangssprache sagt man 'cool' statt 'toll'.",
          exampleTranslation: "In colloquial language, people say 'cool' instead of 'toll'."
        }
      ]
    }
  ]
};
