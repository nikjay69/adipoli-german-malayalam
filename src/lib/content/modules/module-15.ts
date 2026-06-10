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
      storyScene: {
        setting: {
          name: "Backyard Trash Area (Im Hinterhof)",
          sceneType: "home",
          timeOfDay: "afternoon",
          description: "A clean, paved backyard with five different colored bins (Blue, Yellow, Brown, Grey, Green). Arjun is watching you with a smirk: 'Indha machaa, trash sorting is the real citizenship test!'. In Kerala, we might have one or two bins, but here, it's a national sport called 'Mülltrennung'. You also learn about 'Ruhezeit'—if you vacuum on Sunday, the neighbors will send you more than just a dirty look. Welcome to the world of German 'Ordnung'!",
        },
        narrative: {
          previousRecap: "You've mastered the official paperwork. Now, let's learn the unofficial rules for daily life!",
          currentObjective: "Understand core German social values like Pünktlichkeit, Mülltrennung, and Ruhezeit",
          nextTeaser: "Next: Festivals! Let's see how Germany celebrates harvest versus Kerala!",
        },
        kuttanIntro: [
          "Machane! Germany-yil 'Pünktlichkeit' (punctuality) is not a suggestion, it's a social contract. 10:00 means 09:55-in reach aakanam!",
          "Pinne ee 'Mülltrennung' (trash sorting) logic sradhikkanne. Paper in the Blue bin, Food in the Brown bin. Skip cheythaal neighborhood-il big issue aakum!",
          "Finally, 'Ruhezeit' (quiet time). From 10 PM to 6 AM and ALL DAY Sunday, noise strictly forbidden. Total peace mode! Let's get sorted!",
        ],
        vocabEncounters: [
          { vocabId: "vocab15-1-2", encounterMoment: "You hold a pizza box: 'Wait, does this go in Blue or Grey?'", contextSentence: "Die Mülltrennung ist in Deutschland Pflicht." },
          { vocabId: "vocab15-1-1", encounterMoment: "Arjun checks his watch: 'We need to be at the party in 5 mins. Pünktlichkeit!'", contextSentence: "Pünktlichkeit ist in Deutschland sehr wichtig." },
          { vocabId: "vocab15-1-3", encounterMoment: "You turn down the music: 'It's 10 PM. Ruhezeit.'", contextSentence: "Während der Ruhezeit darf man keinen Lärm machen." },
          { vocabId: "vocab15-1-6", encounterMoment: "You put a bottle in a tote: 'Don't throw this, it has Pfand!'", contextSentence: "Die Flasche hat 25 Cent Pfand." },
        ],
        decisionPoints: [
          {
            moment: "You have an empty glass jar of jam. Where do you throw it?",
            options: [
              { text: "In the 'Glas' container (Altglas).", isCorrect: true, response: "Exactly! Glass must be separated by color (White, Brown, Green).", kuttanReaction: "Adipoli! Recycling logic perfectly capture cheythallo! 🔥" },
              { text: "In the general waste (Restmüll) bin.", isCorrect: false, response: "Aiyyo! Enthe ninnu parayunne? Jar logic different aanu, separate bin-ilaanu!", kuttanReaction: "Vite machane! Ordnung marakkallae. Try again! 😬" },
            ],
          },
          {
            moment: "It's 2 PM on a Sunday. Can you drill a hole in your wall to hang a picture?",
            options: [
              { text: "No, Sunday is 'Ruhezeit' all day.", isCorrect: true, response: "Correct! No loud noises allowed on Sundays in Germany.", kuttanReaction: "Superb! Peace logic correctly picked! ⭐" },
              { text: "Yes, it only takes 5 minutes.", isCorrect: false, response: "No! Even 1 minute of drilling will violate the peace. Wait for Monday!", kuttanReaction: "Aiyyo! Neighbors complaint tharum machane. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v15-1-1",
          title: "Pünktlichkeit & Other German Values",
          duration: "10:00",
          description: "Learn why being on time is sacred in Germany and other core cultural values",
          scriptOutline: [
            "Opening: 'Kerala-yil namukku IST (Indian Stretchable Time) undu, but Germany-yil athu work aakilla! 10:00 means 09:55-in sthalathu ethuka!'",
            "Pünktlichkeit: This is not a suggestion, it's a social contract. Late aayaal trust poyikkittum!",
            "Ordnung: Everything must have a designated place. No jugaad here!",
            "Mülltrennung: Trash sorting is a national sport! Bio, Paper, Plastic, Glass — skip cheythaal neighbors 'note' ezhuthum!",
            "Ruhezeit: 22:00 to 06:00. Quiet hours strictly enforced. Sunday vacuuming polum paadila!",
            "Sunday Sacredness: Shops closed, no drilling, total peace mode. Pre-planning venam!",
            "Parallel: Kerala flexible aanu, but living in Germany means following the clock 100%!",
            "Pro tip: If invited for 19:00, be there at 19:00. 19:15-in check-in cheythaal 'late' aanu machane!"
          ],
          keyVocabulary: ["die Pünktlichkeit", "die Mülltrennung", "die Ruhezeit", "die Ordnung"],
          learningObjectives: [
            "Understand the importance of punctuality in German culture",
            "Know the basics of waste sorting in Germany",
            "Be aware of quiet hours and Sunday rules",
            "Recognize key cultural differences from Kerala"
          ],
          placeholderThumbnail: "/images/kaffee_kuchen.png",
          richContent: [
            {
              type: "table",
              title: "German Cultural Rules",
              headers: ["Rule", "German", "What It Means"],
              rows: [
                ["Punctuality", "Pünktlichkeit", "10:00 means arrive by 09:55"],
                ["Order", "Ordnung", "Everything has its place"],
                ["Trash sorting", "Mülltrennung", "Separate Bio, Paper, Plastic, Glass"],
                ["Quiet hours", "Ruhezeit", "22:00-06:00 — no loud noise"],
                ["Sunday rest", "Sonntagsruhe", "No drilling, shops closed"]
              ]
            },
            {
              type: "note",
              title: "Sunday is Sacred!",
              variant: "warning",
              content: "Shops are CLOSED on Sundays. No drilling, no vacuuming, no loud music. Plan your grocery shopping for Saturday! Neighbors will complain if you break Sonntagsruhe."
            },
            {
              type: "vocabulary",
              items: [
                { german: "die Pünktlichkeit", english: "punctuality", malayalam: "സമയനിഷ്ഠ", pronunciation: "pünkt-likh-kite" },
                { german: "die Mülltrennung", english: "waste sorting", malayalam: "മാലിന്യ വേർതിരിക്കൽ", pronunciation: "mül-tren-nung" },
                { german: "die Ruhezeit", english: "quiet hours", malayalam: "നിശ്ശബ്ദ സമയം", pronunciation: "roo-he-tsayt" }
              ]
            }
          ]
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
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "Must-Know Rules in Germany",
              headers: ["Rule", "German", "Fine If Broken?"],
              rows: [
                ["Register address", "Anmeldung", "Up to 1000 EUR"],
                ["Health insurance", "Versicherung", "Mandatory!"],
                ["TV/Radio tax", "Rundfunkbeitrag", "18.36 EUR/month"],
                ["Bottle deposit", "Pfand", "Return to get money back"],
                ["No jaywalking", "Rote Ampel", "5-10 EUR fine"]
              ]
            },
            {
              type: "note",
              title: "Pfand System",
              variant: "tip",
              content: "Most bottles in Germany have a deposit (Pfand) of 0.08-0.25 EUR. Return them at the Pfandautomat in any supermarket to get your money back. It's also great for recycling!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "die Versicherung", english: "insurance", malayalam: "ഇൻഷുറൻസ്", pronunciation: "fer-zi-khe-rung" },
                { german: "das Pfand", english: "bottle deposit", malayalam: "കുപ്പി ഡെപ്പോസിറ്റ്", pronunciation: "pfant" },
                { german: "das Bargeld", english: "cash", malayalam: "പണം", pronunciation: "bar-gelt" }
              ]
            }
          ]
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
      ,
        {
          id: "ex15-1-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (German Customs): 'Danke, das ist sehr freundlich.'",
          questionGerman: "Sprechen Sie laut: 'Danke, das ist sehr freundlich.'",
          correctAnswer: "Danke, das ist sehr freundlich",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
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
      storyScene: {
        setting: {
          name: "Old Town Market (Am Weihnachtsmarkt)",
          sceneType: "station",
          timeOfDay: "evening",
          description: "A magical, freezing winter evening in the town square. Hundreds of tiny lights are draped over wooden huts. The air smells like roasted almonds and 'Glühwein'. Arjun handed you a steaming mug: 'Sookshichu kudikka, ithu nalla choodanu!'. You're experiencing your first 'Weihnachtsmarkt'. You talk about 'Oktoberfest' and realize that while the clothes and food are different, the spirit of celebration is exactly like Onam or Vishu. Cultures are closer than they look, machane!",
        },
        narrative: {
          previousRecap: "You've sorted the trash. Now, let's join the celebration!",
          currentObjective: "Identify major German festivals and understand their cultural parallels to Kerala culture",
          nextTeaser: "Next: Culture shock! Let's talk about those 'strange' German habits!",
        },
        kuttanIntro: [
          "Machane! German festivals are legendary. 'Oktoberfest' in Munich is the biggest. Like our harvest festivals, it's about food, music, and community.",
          "Winter-il 'Weihnachten' (Christmas) and the markets are the main events. Spiced 'Glühwein' is the standard fuel to keep you warm!",
          "Pinne 'Silvester' (New Year's Eve) fireworks vallya karyam aanu. Kerala-yil Vishu-vin padakkam pottikkunna pole thanne! Let's party!",
        ],
        vocabEncounters: [
          { vocabId: "vocab15-2-3", encounterMoment: "You look at the wooden stalls: 'Der Weihnachtsmarkt ist schön.'", contextSentence: "Der Weihnachtsmarkt in Nürnberg ist sehr berühmt." },
          { vocabId: "vocab15-2-1", encounterMoment: "Arjun talks about plan: 'Wir feiern Weihnachten.'", contextSentence: "Wir feiern Weihnachten am 25. Dezember." },
          { vocabId: "vocab15-2-4", encounterMoment: "You take a sip: 'Der Glühwein schmeckt gut.'", contextSentence: "Möchtest du einen Glühwein?" },
          { vocabId: "vocab15-2-6", encounterMoment: "You check the calendar: 'Morgen ist ein Feiertag.'", contextSentence: "Morgen ist ein Feiertag." },
        ],
        decisionPoints: [
          {
            moment: "You're at a Christmas market and it's 2°C. What is the traditional hot drink to try?",
            options: [
              { text: "Glühwein.", isCorrect: true, response: "Exactly! Hot spiced wine is the essence of German winter markets.", kuttanReaction: "Adipoli! Winter logic perfectly capture cheythallo! 🔥" },
              { text: "Cold Lemonade.", isCorrect: false, response: "Aiyyo! Enthe ninnu parayunne? 2 degree-yil ice-venda, machaa!", kuttanReaction: "Vite machane! Hot item venam. Try again! 😬" },
            ],
          },
          {
            moment: "Which German festival is most similar in origin to Kerala's 'Onam' (Harvest festival)?",
            options: [
              { text: "Oktoberfest.", isCorrect: true, response: "Correct! Both are traditional harvest celebrations with regional food and costumes.", kuttanReaction: "Superb! Cultural parallel logic correctly noted! ⭐" },
              { text: "Karneval.", isCorrect: false, response: "No! Karneval is a pre-Lent celebration of masks and parties. Oktoberfest is the harvest one.", kuttanReaction: "Aiyyo! Harvest logic sradhikkanne machane. Try again! 🚫" },
            ],
          },
        ],
      },
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
          placeholderThumbnail: "/images/kaffeeklatsch.png",
          richContent: [
            {
              type: "table",
              title: "Major German Festivals",
              headers: ["Festival", "When", "Kerala Parallel"],
              rows: [
                ["Oktoberfest", "Sep-Oct (Munich)", "Onam (harvest festival)"],
                ["Weihnachten", "Dec 24-26", "Christmas in Kerala"],
                ["Karneval/Fasching", "Feb-Mar (before Lent)", "Carnival/Theyyam season"],
                ["Silvester", "Dec 31", "New Year's Eve"]
              ]
            },
            {
              type: "note",
              title: "Weihnachtsmarkt Magic!",
              variant: "info",
              content: "Christmas markets (Weihnachtsmärkte) run from late November to December. Enjoy Glühwein (mulled wine), Lebkuchen (gingerbread), and a magical atmosphere. A must-experience in Germany!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "Weihnachten", english: "Christmas", malayalam: "ക്രിസ്മസ്", pronunciation: "vy-nakh-ten" },
                { german: "der Weihnachtsmarkt", english: "Christmas market", malayalam: "ക്രിസ്മസ് മാർക്കറ്റ്", pronunciation: "vy-nakhts-markt" },
                { german: "der Karneval", english: "carnival", malayalam: "കാർണിവൽ", pronunciation: "kar-ne-vahl" }
              ]
            }
          ]
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
          placeholderThumbnail: "/images/kaffeeklatsch.png",
          richContent: [
            {
              type: "table",
              title: "Key German Public Holidays",
              headers: ["Holiday", "Date", "German Name"],
              rows: [
                ["New Year's Day", "Jan 1", "Neujahr"],
                ["Easter", "Mar/Apr", "Ostern"],
                ["German Unity Day", "Oct 3", "Tag der Deutschen Einheit"],
                ["Christmas", "Dec 25-26", "Weihnachten"],
                ["New Year's Eve", "Dec 31", "Silvester"]
              ]
            },
            {
              type: "note",
              title: "Brückentag = Smart Holiday!",
              variant: "tip",
              content: "When a holiday falls on Thursday, Germans take Friday off as a 'Brückentag' (bridge day) to create a 4-day weekend. Plan your leave requests early — everyone does this!"
            },
            {
              type: "note",
              title: "Bayern = Most Holidays!",
              variant: "info",
              content: "Bavaria (Bayern) has the most public holidays in Germany (up to 14!). Other states may have fewer. Always check YOUR Bundesland's holiday calendar."
            }
          ]
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
      ,
        {
          id: "ex15-2-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Festivals & Holidays): 'Danke, das ist sehr freundlich.'",
          questionGerman: "Sprechen Sie laut: 'Danke, das ist sehr freundlich.'",
          correctAnswer: "Danke, das ist sehr freundlich",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
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
      storyScene: {
        setting: {
          name: "WG Dinner Table (Beim Abendessen)",
          sceneType: "home",
          timeOfDay: "evening",
          description: "It's 7 PM. You're sitting at the table, expecting something hot. Instead, Arjun brings out a variety of breads, some cheese, and pickles. 'Welcome to Abendbrot, machaa!'. You're learning that Germans love cold dinners. You're also learning about 'Direktheit'—if Arjun says the coffee is too bitter, he's just stating a fact, not starting a fight. And remember the Golden Rule of German hospitality: if someone says 'No', they actually mean it. No need for the Kerala 3-times-ask ritual!",
        },
        narrative: {
          previousRecap: "You've celebrated with the locals. Now, let's look at the daily shocks that every Malayali faces!",
          currentObjective: "Understand German social norms regarding food, directness, and personal space",
          nextTeaser: "Final Lesson: The local talk! Let's learn some real German slang!",
        },
        kuttanIntro: [
          "Machane! First culture shock 'Abendbrot' aanu. Cold bread for dinner is the standard. If you want hot Kanju-um Payarum, you have to cook it yourself!",
          "Pinne 'Direktheit' (directness) sradhikkanne. Germans don't sugarcoat. If they say 'Das ist falsch', it's just information. Don't take it personally!",
          "Privacy is the most important item here. Queue-il nilkkumpol physical distance venam. 'Muttu nilkkunna' habit strictly avoid cheయ్యുക! Let's adapt!",
        ],
        vocabEncounters: [
          { vocabId: "vocab15-3-2", encounterMoment: "You look at the plate: 'Ist das Abendbrot?'", contextSentence: "Zum Abendbrot essen wir Brot mit Käse." },
          { vocabId: "vocab15-3-4", encounterMoment: "Arjun gives direct feedback: 'That is not good.'", contextSentence: "Die deutsche Direktheit ist nicht unhöflich." },
          { vocabId: "vocab15-3-1", encounterMoment: "You talk about hospitality: 'Gastfreundschaft ist anders.'", contextSentence: "Deutsche Gastfreundschaft ist herzlich." },
          { vocabId: "vocab15-3-3", encounterMoment: "Arjun checks his mail: 'Ich habe eine Einladung.'", contextSentence: "Hast du eine Einladung zur Party?" },
        ],
        decisionPoints: [
          {
            moment: "You offer a German friend more Biryani. They say 'Nein, danke' once. What do you do?",
            options: [
              { text: "Accept it and stop offering.", isCorrect: true, response: "Exactly! In Germany, 'No' means 'No'. Repeated asking is felt as pressure.", kuttanReaction: "Adipoli! Social logic perfectly capture cheythallo! 🔥" },
              { text: "Ask two more times like we do in Kerala.", isCorrect: false, response: "Aiyyo! Ente machaa, they will think you are force-feeding them!", kuttanReaction: "Vite machane! One 'No' is enough here. Try again! 😬" },
            ],
          },
          {
            moment: "What does 'Abendbrot' literally mean?",
            options: [
              { text: "Evening bread.", isCorrect: true, response: "Correct! It refers to the traditional cold evening meal with bread.", kuttanReaction: "Superb! Food logic correctly noted! ⭐" },
              { text: "Late-night party.", isCorrect: false, response: "No! 'Abend' = Evening, 'Brot' = Bread. It's just a simple cold dinner.", kuttanReaction: "Aiyyo! Brot logic marakkallae machane. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v15-3-1",
          title: "Kerala vs Germany - Cultural Differences (with humor!)",
          duration: "12:00",
          description: "A fun comparison of everyday cultural differences between Kerala and Germany",
          scriptOutline: [
            "Opening: 'Germany-yil vannaal shock aakaan chance ulla karyangal parayaam! Core cultural diffs set aakaam!'",
            "BREAD TRAGEDY: Abendbrot. Cold bread for dinner. No hot kanji or fish curry every night, machaa!",
            "FOOD: Idli/Dosa rest-il aakum, Brot is the king. Start loving the crust!",
            "Personal Space: 1.5-meter bubble respect cheyyanam. Queue-il \"muttinilkkunnathu\" HATE aanu!",
            "Social Logic: No random drop-ins. Even parents call a week early! Plan your visits.",
            "Parallel: Shoes OFF indoors. Nammude homes pole thanne, simple common ground!",
            "Directness: 'Das ist nicht gut' is feedback, not a personal attack. Emotional drama avoid cheyuka!",
            "Small Talk: Minimal. No 'Ninte veedu evideya?' on the train. Privacy is high priority.",
            "Gastfreundschaft: If you say 'No thanks', they stop. Kerala style-il 3 times repeat cheyyilla!",
            "Feierabend: Work calls after 5 PM? Strictly forbidden! Enjoy your personal life."
          ],
          keyVocabulary: ["die Gastfreundschaft", "das Abendbrot", "die Einladung", "die Direktheit"],
          learningObjectives: [
            "Understand key cultural differences between Kerala and Germany",
            "Know about German food habits and social norms",
            "Prepare mentally for common culture shocks",
            "Appreciate both cultures' unique qualities"
          ],
          placeholderThumbnail: "/images/berlin_people.png",
          richContent: [
            {
              type: "table",
              title: "Kerala vs Germany — Cultural Differences",
              headers: ["Topic", "Kerala", "Germany"],
              rows: [
                ["Dinner", "Hot rice & curry", "Abendbrot (cold bread)"],
                ["Personal space", "Close contact normal", "1.5m bubble"],
                ["Visiting", "Drop-in anytime", "Call a week ahead"],
                ["Feedback", "Indirect / polite", "Direct & honest"],
                ["After work", "Calls ok anytime", "Feierabend = no work calls"]
              ]
            },
            {
              type: "note",
              title: "'No Thanks' Means No!",
              variant: "tip",
              content: "In Kerala, we offer chai 3 times before they accept. In Germany, if you say 'Nein, danke', they STOP offering. Mean what you say the first time!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "das Abendbrot", english: "cold evening meal", malayalam: "രാത്രി ഭക്ഷണം (ബ്രെഡ്)", pronunciation: "ah-bent-broht" },
                { german: "die Gastfreundschaft", english: "hospitality", malayalam: "ആതിഥ്യം", pronunciation: "gast-froynt-shaft" },
                { german: "die Direktheit", english: "directness", malayalam: "നേരിട്ടുള്ള സമീപനം", pronunciation: "di-rekt-hite" }
              ]
            }
          ]
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
      ,
        {
          id: "ex15-3-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Differences from Kerala Culture): 'Danke, das ist sehr freundlich.'",
          questionGerman: "Sprechen Sie laut: 'Danke, das ist sehr freundlich.'",
          correctAnswer: "Danke, das ist sehr freundlich",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
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
      storyScene: {
        setting: {
          name: "City Park (Im Park)",
          sceneType: "station",
          timeOfDay: "afternoon",
          description: "A sunny afternoon in the park. You're sitting on a bench with Arjun, watching skaters and students. A group nearby is laughing, calling each other 'Alter!'. You hear 'Krass!' and 'Geil!' every few seconds. Arjun translates the street-vibe for you: 'Aliya, textbook German oru side-il vekkam. Local aakan slang venam!'. You're learning the 'Umgangssprache' (slang)—the secret code of German friendship. Ready to sound like a real Berliner, machane?",
        },
        narrative: {
          previousRecap: "You've survived the culture shocks. Now, let's learn how to actually TALK like a local!",
          currentObjective: "Understand common German slang terms and identify appropriate contexts for their use",
          nextTeaser: "Module 15 Complete! You're officially a 'German-Malayali Expert'. Next: Module 16 - Health & Fitness!",
        },
        kuttanIntro: [
          "Machane! Textbook German and Slang are two different worlds. 'Alter!' is like our 'Aliya!' or 'Machane!'. Use it with your besties mathram!",
          "Pinne 'Krass' (wow) and 'Geil' (cool). Ivide everything 'Geil' aanu if it's good. But sradhikkanne, formal situations-il ithu paadilla!",
          "If you have zero mood for something, just say 'Kein Bock'. It's the ultimate 'Mood-illa' phrase. Let's get krass!",
        ],
        vocabEncounters: [
          { vocabId: "vocab15-4-3", encounterMoment: "You greet a friend: 'Na? Alles klar, Alter?'", contextSentence: "Alter, das war knapp!" },
          { vocabId: "vocab15-4-1", encounterMoment: "You look at a cool bike: 'Das ist geil!'", contextSentence: "Das Konzert war echt geil!" },
          { vocabId: "vocab15-4-2", encounterMoment: "Arjun tells a crazy story: 'Krass! Echt?'", contextSentence: "Krass! Das habe ich nicht erwartet!" },
          { vocabId: "vocab15-4-6", encounterMoment: "You're tired of studying: 'Ich habe keinen Bock.'", contextSentence: "Ich habe keinen Bock auf Hausaufgaben." },
        ],
        decisionPoints: [
          {
            moment: "You're with a group of friends and someone shows you a really cool new app. What do you say?",
            options: [
              { text: "Echt geil!", isCorrect: true, response: "Exactly! 'Geil' is the go-to word for 'cool' or 'awesome' among friends.", kuttanReaction: "Adipoli! Slang logic perfectly capture cheythallo! 🔥" },
              { text: "Sehr geehrte App.", isCorrect: false, response: "Aiyyo! Enthe ninnu parayunne? App-ine honorifics kodukkanda, machaa!", kuttanReaction: "Vite machane! Slang mode ON aakkuka. Try again! 😬" },
            ],
          },
          {
            moment: "Arjun asks if you want to go for a run, but you are exhausted. How do you say 'I don't feel like it'?",
            options: [
              { text: "Kein Bock.", isCorrect: true, response: "Correct! 'Kein Bock' is the perfect colloquial way to express lack of motivation.", kuttanReaction: "Superb! Vibe logic correctly noted! ⭐" },
              { text: "Ich habe kein Buch.", isCorrect: false, response: "No! 'Bock' (mood/ram) and 'Buch' (book) are totally different items!", kuttanReaction: "Aiyyo! Vocabulary mistake machane. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v15-4-1",
          title: "Umgangssprache - Everyday German Slang",
          duration: "12:00",
          description: "The slang, abbreviations, and colloquial expressions real Germans use every day",
          scriptOutline: [
            "Opening: 'Textbook German mathram pora, LOCAL aakaan slang venam! Krass expressions set aakaam!'",
            "Geil: Awesome/Cool! (But double meaning und, context ariyaathe use cheyyaruthu!).",
            "Krass: 'Polichu! Wow! Extreme!'. Positive and negative mode-il use cheyyaam.",
            "Alter!: 'Dude! Aliya! Machane!'. Your bestie-ne vikkaanaan best word.",
            "Na?: Shortest greeting. 'Enthund vishesham?' energy in 2 letters.",
            "Bescheid sagen: 'Heads-up parayuka / Information thirike tharuka'. Very useful!",
            "Kein Bock: 'Zero mood! No desire!'. 'Oru mood-um illa' equivalent.",
            "Text: LG (Kind regards), MfG (Formal), vllt (vielleicht/maybe).",
            "Logic: Slang is for friends, formal for office. Switch wisely machane!"
          ],
          keyVocabulary: ["geil", "krass", "Alter", "Na?", "Bescheid sagen", "Kein Bock"],
          learningObjectives: [
            "Understand common German slang expressions",
            "Know when slang is appropriate vs inappropriate",
            "Recognize common German text abbreviations",
            "Distinguish between formal and colloquial registers"
          ],
          placeholderThumbnail: "/images/berlin_people.png",
          richContent: [
            {
              type: "table",
              title: "German Slang Decoded",
              headers: ["Slang", "Meaning", "Malayalam Equivalent"],
              rows: [
                ["Geil!", "Awesome/Cool", "കിടു!"],
                ["Krass!", "Wow/Extreme", "പൊളിച്ചു!"],
                ["Alter!", "Dude!", "മച്ചാനേ!"],
                ["Na?", "What's up?", "എന്തുണ്ട്?"],
                ["Kein Bock", "No mood / Don't feel like it", "ഒരു മൂഡും ഇല്ല"],
                ["Bescheid sagen", "Give a heads-up", "അറിയിക്കുക"]
              ]
            },
            {
              type: "note",
              title: "Context Matters!",
              variant: "warning",
              content: "Slang is ONLY for friends and casual settings. Never say 'Geil!' or 'Alter!' in a formal meeting or at the Ausländerbehörde. Use 'Sie' in formal contexts, 'du' with friends."
            },
            {
              type: "table",
              title: "Common Text Abbreviations",
              headers: ["Abbreviation", "Full Form", "Meaning"],
              rows: [
                ["LG", "Liebe Grüße", "Kind regards"],
                ["MfG", "Mit freundlichen Grüßen", "With best regards"],
                ["vllt", "vielleicht", "maybe"],
                ["bzgl.", "bezüglich", "regarding"]
              ]
            }
          ]
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
      ,
        {
          id: "ex15-4-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Useful Slang & Colloquial German): 'Danke, das ist sehr freundlich.'",
          questionGerman: "Sprechen Sie laut: 'Danke, das ist sehr freundlich.'",
          correctAnswer: "Danke, das ist sehr freundlich",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
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
