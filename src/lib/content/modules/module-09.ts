import type { Module } from '../types';

export const MODULE_9: Module = {
  id: 9,
  title: "Travel & Directions",
  titleGerman: "Reisen und Wege",
  description: "Navigate Germany like a pro — transportation, directions, and getting around! KSRTC-yil kayariya experience undenki, Deutsche Bahn easy aanu!",
  icon: "🚌",
  color: "#3b82f6",
  totalHours: 12,
  unlockRequirement: "Complete Module 8",
  learningTips: [
    "Modal verbs change the sentence: the main verb goes to the END. 'Ich KANN Deutsch SPRECHEN.'",
    "Practice buying a train ticket in your head every time you commute.",
    "German public transport runs on time. So should your German: verb always in position 2!",
  ],
  lessons: [
    // ========== LESSON 9-1: Transportation ==========
    {
      id: "9-1",
      title: "Transportation",
      titleGerman: "Verkehrsmittel",
      description: "Learn all the ways to get around in Germany — buses, trains, bikes, and more. KSRTC bus-il kayari parichayam ullavarkku German bus system piece of cake aanu! Plus, master 'mit + Dativ' for saying how you travel!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Hauptbahnhof (Central Station)",
          sceneType: "station",
          timeOfDay: "morning",
          description: "The station is a massive glass and steel cathedral of movement. Trains (Züge) are pulling in and overground/underground lines (S-Bahn/U-Bahn) are crisscrossing. In Kerala, we might wait for the 'Fast Passenger', but here, timing is everything. It's a symphony of efficiency, machane! Time to find your ride.",
        },
        narrative: {
          previousRecap: "You've settled into your room. Now, let's explore the whole city!",
          currentObjective: "Identify different modes of transport and use 'mit + Dativ' correctly",
          nextTeaser: "Next: ticket trauma! Let's learn to use the ticket machine without panic!",
        },
        kuttanIntro: [
          "Machane! Germany-yil travel cheyyunnathu oru separate experience aanu. Nammude KSRTC-yil 'chechi, side seat tharumo' ennu chodikkunnathu pole alla ivide logic.",
          "Main modes of transport (Bus, Zug, S-Bahn, U-Bahn) focus cheyyane. Pinne 'mit' logic eppozhum Dativ case edukkum.",
          "Important point: U-Bahn = Underground (city center focus), S-Bahn = Suburban (connecting the suburbs). Don't get lost on the wrong platform!",
        ],
        vocabEncounters: [
          { vocabId: "vocab9-1-1", encounterMoment: "A bright yellow bus pulls up: 'Der Bus ist pünktlich.' (The bus is on time).", contextSentence: "Der Bus kommt in fünf Minuten." },
          { vocabId: "vocab9-1-2", encounterMoment: "An ICE train screams past: 'Der Zug fährt nach Berlin.' (The train goes to Berlin).", contextSentence: "Der Zug fährt nach Berlin." },
          { vocabId: "vocab9-1-4", encounterMoment: "You head down the escalator: 'Die U-Bahn fährt alle fünf Minuten.' (The subway runs every 5 min).", contextSentence: "Die U-Bahn ist sehr schnell." },
          { vocabId: "vocab9-1-8", encounterMoment: "You see someone cycling past: 'Das Fahrrad ist schnell.' (The bicycle is fast).", contextSentence: "Ich fahre gern mit dem Fahrrad." },
          { vocabId: "vocab9-1-10", encounterMoment: "Stefan explains: 'Ich fahre mit dem Bus.' (I travel by bus).", contextSentence: "Ich fahre mit dem Bus." },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'I travel by train' (der Zug). Which sentence uses the correct Dativ article after 'mit'?",
            options: [
              { text: "Ich fahre mit dem Zug.", isCorrect: true, response: "Exactly! 'mit' takes Dativ, so 'der Zug' becomes 'dem Zug'. Perfect agreement!", kuttanReaction: "Adipoli! Dative logic correct aayi travel-il apply cheythallo! 🔥" },
              { text: "Ich fahre mit den Zug.", isCorrect: false, response: "Aiyyo! 'den' is for Accusative (masculine). After 'mit', it MUST be 'dem' (Dativ).", kuttanReaction: "Vite machane! 'mit' kandaal article 'dem' aayi maarum. Ithu fixed rule aanu. Try again! 😬" },
            ],
          },
          {
            moment: "You are in the city center and need the underground metro. Which one are you looking for?",
            options: [
              { text: "Die U-Bahn.", isCorrect: true, response: "Correct! 'U' stands for 'Untergrund' (Underground). Perfect for city travel.", kuttanReaction: "Superb! U-Bahn logic catch cheythallo. Suburban connecting train venal 'S-Bahn' edukkanam. ⭐" },
              { text: "Der ICE.", isCorrect: false, response: "No! ICE is the high-speed long-distance train. For city center underground, you need the U-Bahn.", kuttanReaction: "Aiyyo! ICE long-distance long-trip aanu. City center-il U-Bahn mathi! Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v9-1-1",
          title: "Getting Around in Germany",
          duration: "12:00",
          description: "An overview of transportation options in Germany — from city buses to the Autobahn. Kerala-yile auto-rickshaw-inu pakaram taxi, KSRTC-ku pakaram Deutsche Bahn!",
          scriptOutline: [
            "Opening: 'Germany-yil travel cheyyaan mass aanu! KSRTC kazhinjaal pinne next best system Deutsche Bahn thanne! Let's explore.'",
            "der Bus — city buses are super punctual. Door-il thuongaruthu, KSRTC alla!",
            "die Bahn / der Zug — Backbone of Germany. India-yile train pole thanne, but speed and timing level vere!",
            "die Straßenbahn — Trams! Rails-il odunna bus pole visual chey, machane!",
            "die U-Bahn / die S-Bahn — U = Underground (metro), S = Suburban. Ithu confusing aavalle!",
            "das Flugzeug — Kerala-yil Kochi-Trivandrum flight edukkunna pole overkill aanu domestic flights evide.",
            "das Auto & die Autobahn — Auto-rickshaw alla, actual car! Pinne speed-inu boundary illa!",
            "das Fahrrad — Separate cycle lanes undu. Pedestrian status-inu respect kitti theeroo!",
            "das Taxi — expensive aanu, logic-il meter mathrame ulu. No bargaining scenes!",
            "mit + Dativ: 'Ich fahre mit dem Bus'. 'Mit' kandaal article maarum, athu logic fixed aanu!",
            "KSRTC vs DB: Logic same, but DB delay aayyal reason parayum. Nammude bus-il athu expect cheyyenda!",
            "Drill: Wie fährst du zur Arbeit? Cycle or Train? Choose chey!"
          ],
          keyVocabulary: ["der Bus", "der Zug", "die U-Bahn", "das Fahrrad", "Ich fahre mit...", "das Taxi", "die Autobahn"],
          learningObjectives: [
            "Name all major forms of transportation in German",
            "Use 'Ich fahre mit...' to describe how you travel",
            "Understand the difference between U-Bahn and S-Bahn",
            "Compare German and Kerala transport systems for cultural context"
          ],
          placeholderThumbnail: "/images/german_train_station.png",
          richContent: [
            {
              type: "table",
              title: "German Transportation",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["der Bus", "bus", "ബസ്"],
                ["der Zug / die Bahn", "train", "ട്രെയിൻ"],
                ["die Straßenbahn", "tram", "ട്രാം"],
                ["die U-Bahn", "underground/metro", "മെട്രോ"],
                ["die S-Bahn", "suburban train", "സബർബൻ ട്രെയിൻ"],
                ["das Fahrrad", "bicycle", "സൈക്കിൾ"],
                ["das Auto", "car", "കാർ"],
                ["das Taxi", "taxi", "ടാക്സി"],
                ["das Flugzeug", "airplane", "വിമാനം"]
              ]
            },
            {
              type: "note",
              title: "'mit' + Dative for Transport",
              variant: "tip",
              content: "Use 'Ich fahre mit + DATIV' to say how you travel. der Bus → mit dem Bus, die Bahn → mit der Bahn, das Fahrrad → mit dem Fahrrad. The preposition 'mit' always triggers the dative case!"
            },
            {
              type: "note",
              title: "U-Bahn vs S-Bahn",
              variant: "info",
              content: "U-Bahn (Untergrundbahn) runs underground in city centres. S-Bahn (Stadtschnellbahn) connects the city with suburbs and mostly runs above ground. Both use the same ticket system!"
            }
          ]
        },
        {
          id: "v9-1-2",
          title: "Public Transport System",
          duration: "10:00",
          description: "How Germany's public transport actually works — DB, BVG, MVV, and more. Kerala KSRTC-yude German version!",
          scriptOutline: [
            "Deutsche Bahn (DB) — National railway. India-yile IRCTC pole, but app efficient aanu!",
            "Local Companies: BVG, MVV, HVV. Cities-inu swantham companies undu.",
            "Zones: Ernakulam to Aluva logic pole distance zones undu tickets-inu.",
            "Fahrkartenautomat: Ticket machine kandaal njettenda, English language option undu!",
            "Schwarzfahren: Ticket illathe kayariyaal 60 Euro pottum! Ithu 'black riding' aanu. Trap-il veezharuthu!",
            "App Power: DB Navigator is must. Phone-il undenkil full set aanu.",
            "Bus Culture: Conductor illa, but camera and random check undu. Honesty is respect!",
            "Deutschlandticket: 49-Euro-Ticket logic. Oru ticket-il Germany full kkarayam regional trains-il!",
            "Night Travel: Nachtbus. Late night party kazhinjaal security guarantee aanu.",
            "Accessibility: Wheelchair and lift access 100% fixed aanu. Civilized logic!"
          ],
          keyVocabulary: ["Deutsche Bahn", "die Fahrkarte", "der Automat", "die Zone", "Schwarzfahren", "die Bahncard"],
          learningObjectives: [
            "Understand how German public transport is organized",
            "Know the major transport companies (DB, BVG, MVV)",
            "Navigate basic ticket purchasing",
            "Learn about discount passes and apps"
          ],
          placeholderThumbnail: "/images/german_train_station.png",
          richContent: [
            {
              type: "table",
              title: "Public Transport System",
              headers: ["Term", "German", "English"],
              rows: [
                ["National Rail", "Deutsche Bahn (DB)", "German Railways"],
                ["Ticket", "die Fahrkarte", "ticket"],
                ["Machine", "der Fahrkartenautomat", "ticket machine"],
                ["Zone", "die Zone", "fare zone"],
                ["Fine", "Schwarzfahren", "riding without ticket"],
                ["Discount Card", "die BahnCard", "rail discount card"],
                ["Monthly Pass", "das Deutschlandticket", "Germany-wide pass"]
              ]
            },
            {
              type: "note",
              title: "Schwarzfahren = €60 Fine!",
              variant: "warning",
              content: "Travelling without a valid ticket ('Schwarzfahren') results in an immediate €60 fine. There are no conductors on most buses/trams, but random inspectors check tickets. Always validate your ticket!"
            },
            {
              type: "note",
              title: "DB Navigator App",
              variant: "tip",
              content: "Download the 'DB Navigator' app — it's the Google Maps of German trains. You can check schedules, buy tickets, and even see real-time delays. English language option available!"
            }
          ]
        }
      ],
      exercises: [
        { id: "ex9-1-1", type: "free-text", question: "The Hamburg cousin asks how Kuttan would get around Germany. Type his answer in German — 'I travel by train.' (der Zug, and mit pulls Dativ):", correctAnswer: "Ich fahre mit dem Zug", explanation: "'mit' always takes the Dativ case: der Zug → dem Zug. And it's 'fahren' for vehicles — 'gehen' means going on foot.", xpReward: 30 },
        { id: "ex9-1-2", type: "matching", question: "Your cousin quizzes you on his commute options. Match each transport word:", options: ["die Straßenbahn", "die U-Bahn", "das Fahrrad", "das Flugzeug"], correctAnswer: ["tram", "subway/underground", "bicycle", "airplane"], explanation: "die Straßenbahn, die U-Bahn (Bahn is always die), das Fahrrad, das Flugzeug. The article decides 'mit der' vs 'mit dem' later in this lesson.", xpReward: 15 },
        { id: "ex9-1-3", type: "fill-blank", question: "Ich fahre mit ___ Bus zur Arbeit. (the — Dativ)", options: ["dem", "der", "den", "das"], correctAnswer: "dem", explanation: "'der Bus' is masculine. In Dativ (after 'mit'), 'der' becomes 'dem'. So: mit dem Bus.", xpReward: 10 },
        { id: "ex9-1-4", type: "multiple-choice", question: "What is the difference between U-Bahn and S-Bahn?", options: ["U-Bahn is underground, S-Bahn is suburban/above-ground", "U-Bahn is faster than S-Bahn", "S-Bahn is underground, U-Bahn is above-ground", "There is no difference"], correctAnswer: "U-Bahn is underground, S-Bahn is suburban/above-ground", explanation: "U-Bahn (Untergrundbahn) runs mostly underground in city centers. S-Bahn (Stadtschnellbahn) connects the city with suburban areas and mostly runs above ground.", xpReward: 10 },
        { id: "ex9-1-5", type: "free-text", question: "Eco-warrior week: Kuttan tells the cousin how he'd commute in Germany. Type it in German — 'I ride my bicycle to work.' (das Fahrrad, zur Arbeit):", correctAnswer: "Ich fahre mit dem Fahrrad zur Arbeit", explanation: "mit dem Fahrrad — 'mit' always pulls Dativ, so das Fahrrad becomes dem Fahrrad. And zur Arbeit = zu der Arbeit.", xpReward: 30 },
        { id: "ex9-1-6", type: "type-answer", question: "The S-Bahn trap: die S-Bahn is feminine, but after 'mit' it changes. 'Wir fahren mit ___ S-Bahn.' Type the missing word:", correctAnswer: "der", explanation: "'die S-Bahn' is feminine. In Dativ, 'die' becomes 'der'. So: mit der S-Bahn — the swap everyone gets wrong first time.", xpReward: 15 },
        { id: "ex9-1-7", type: "multiple-choice", question: "What is 'Schwarzfahren' in German public transport?", options: ["Travelling without a valid ticket", "Travelling at night", "Travelling first class", "Travelling by car"], correctAnswer: "Travelling without a valid ticket", explanation: "'Schwarzfahren' literally means 'black-riding'. It refers to using public transport without a valid ticket. The fine is usually 60 euros — so always buy your ticket!", xpReward: 10 },
        { id: "ex9-1-8", type: "type-answer", question: "Kuttan's brother and his beloved Bullet, German edition: 'Mein Bruder fährt mit ___ Motorrad.' (das Motorrad — neuter). Type the missing word:", correctAnswer: "dem", explanation: "'das Motorrad' is neuter. In Dativ (after 'mit'), 'das' becomes 'dem'. So: mit dem Motorrad.", xpReward: 15 },
        {
          id: "ex9-1-9",
          type: "dictation",
          question: "The cousin describes his boring daily commute on the video call. Listen and type exactly what you hear.",
          correctAnswer: "Ich fahre mit dem Bus",
          explanation: "'mit dem Bus' — 'mit' always takes the dative case. Four words that carry the whole rule.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-travel-bus.mp3"
        }
      ,
        {
          id: "ex9-1-prod-speaking",
          type: "speaking",
          question: "Lost in your imagined first Munich morning — stop a stranger and ask aloud: 'Entschuldigung, wo ist der Bahnhof?'",
          questionGerman: "Sprechen Sie laut: 'Entschuldigung, wo ist der Bahnhof?'",
          correctAnswer: "Entschuldigung, wo ist der Bahnhof",
          explanation: "'Entschuldigung' opens, 'wo ist...' asks. This exact line is in the Sprechen Teil 3 question bank.",
          audioUrl: "/audio/exercises/ex9-1-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex9-1-spk2",
          type: "speaking",
          question: "Repair Kuttan's slip: he tells the cousin 'Ich gehe mit dem Bus.' — gehen is walking! Vehicles take fahren. Say it right: 'Ich fahre mit dem Bus.'",
          questionGerman: "Sprechen Sie laut: 'Ich fahre mit dem Bus.'",
          correctAnswer: "Ich fahre mit dem Bus",
          explanation: "English says 'go by bus', Malayalam says pokunnu — German insists on fahren for anything with wheels. 'Ich gehe mit dem Bus' paints you walking beside the bus.",
          audioUrl: "/audio/exercises/ex9-1-spk2-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab9-1-1", german: "der Bus", english: "bus", malayalam: "ബസ്", pronunciation: "boos", example: "Der Bus kommt in fünf Minuten.", exampleTranslation: "The bus is coming in five minutes." },
        { id: "vocab9-1-2", german: "der Zug", english: "train", malayalam: "തീവണ്ടി", pronunciation: "tsook", example: "Der Zug fährt nach Berlin.", exampleTranslation: "The train goes to Berlin." },
        { id: "vocab9-1-3", german: "die Straßenbahn", english: "tram", malayalam: "ട്രാം", pronunciation: "shtrah-sen-bahn", example: "Die Straßenbahn hält hier.", exampleTranslation: "The tram stops here." },
        { id: "vocab9-1-4", german: "die U-Bahn", english: "subway / underground", malayalam: "ഭൂഗർഭ തീവണ്ടി", pronunciation: "oo-bahn", example: "Die U-Bahn ist sehr schnell.", exampleTranslation: "The subway is very fast." },
        { id: "vocab9-1-5", german: "die S-Bahn", english: "suburban train", malayalam: "നഗരപ്രാന്ത തീവണ്ടി", pronunciation: "ess-bahn", example: "Ich nehme die S-Bahn zum Flughafen.", exampleTranslation: "I take the suburban train to the airport." },
        { id: "vocab9-1-6", german: "das Flugzeug", english: "airplane", malayalam: "വിമാനം", pronunciation: "flook-tsoyk", example: "Das Flugzeug fliegt nach Mumbai.", exampleTranslation: "The airplane flies to Mumbai." },
        { id: "vocab9-1-7", german: "das Auto", english: "car", malayalam: "കാർ", pronunciation: "ow-toh", example: "Mein Auto ist blau.", exampleTranslation: "My car is blue." },
        { id: "vocab9-1-8", german: "das Fahrrad", english: "bicycle", malayalam: "സൈക്കിൾ", pronunciation: "fahr-raht", example: "Ich fahre gern mit dem Fahrrad.", exampleTranslation: "I like riding my bicycle." },
        { id: "vocab9-1-9", german: "die Bahn", english: "train / railway", malayalam: "തീവണ്ടി / റെയിൽവേ", pronunciation: "bahn", example: "Die Bahn hat Verspätung.", exampleTranslation: "The train is delayed." },
        { id: "vocab9-1-10", german: "fahren", english: "to drive / to travel (by vehicle)", malayalam: "യാത്ര ചെയ്യുക / ഓടിക്കുക", pronunciation: "fah-ren", example: "Ich fahre mit dem Bus.", exampleTranslation: "I travel by bus." }
      ]
    },

    // ========== LESSON 9-2: Buying Tickets ==========
    {
      id: "9-2",
      title: "Buying Tickets",
      titleGerman: "Fahrkarten kaufen",
      description: "Master the art of buying travel tickets in Germany — at the counter, from machines, and online. KSRTC conductor-inu cheyyunna pole alla, ivide automat-il nee thanne ticket vanganum!",
      duration: "45 min",
      xpReward: 120,
      storyScene: {
        setting: {
          name: "Ticket Machine (Fahrkartenautomat)",
          sceneType: "station",
          timeOfDay: "afternoon",
          description: "You're standing in front of a large, glowing red machine. There's a small line behind you, and you feel the pressure. Do you want one-way? Round trip? First class? In Kochi, the conductor just comes to you, but here, the 'Automat' is the gatekeeper. Time to pick your destination and pay up, machane!",
        },
        narrative: {
          previousRecap: "You've identified your ride. Now, let's learn how to pay for it!",
          currentObjective: "Navigate the ticket machine and choose between 'einfach' and 'hin und zurück' options",
          nextTeaser: "Next: lost in the city? Let's learn how to ask for directions!",
        },
        kuttanIntro: [
          "Machane! Ticket machine kandaal panic aavenda. Touch screen-il language change cheyyaan option undu. Athu first fix cheyyane.",
          "'Einfach' ennal one-way trip, 'Hin und zurück' ennal round trip (there and back) ennanu artham. Weekend trip poyal pinne thirichu varunnamallo, so round trip choose cheyyaam.",
          "Pinne students-innum young people-innum 'Ermäßigung' (discount) undakum. Athu check cheythaal paisa save cheyyaam. Let's get that ticket!",
        ],
        vocabEncounters: [
          { vocabId: "vocab9-2-1", encounterMoment: "You select: 'Eine Fahrkarte, bitte.' (A ticket, please).", contextSentence: "Ich brauche eine Fahrkarte." },
          { vocabId: "vocab9-2-3", encounterMoment: "You decide on a weekend visit: 'Hin und zurück, bitte.' (There and back, please).", contextSentence: "Einmal Hamburg, hin und zurück." },
          { vocabId: "vocab9-2-7", encounterMoment: "Stefan points to the screen: 'Am Automaten ist es billiger.' (At the machine it is cheaper).", contextSentence: "Am Automaten kann man Fahrkarten kaufen." },
          { vocabId: "vocab9-2-5", encounterMoment: "You check for savings: 'Gibt es eine Ermäßigung für Studenten?' (Is there a student discount?).", contextSentence: "Studenten bekommen eine Ermäßigung." },
          { vocabId: "vocab9-2-10", encounterMoment: "Final step: 'Ich möchte mit Karte bezahlen.' (I want to pay by card).", contextSentence: "Kann ich mit Karte bezahlen?" },
        ],
        decisionPoints: [
          {
            moment: "You are going to Berlin and coming back on Sunday. Which ticket type should you buy?",
            options: [
              { text: "Hin und zurück.", isCorrect: true, response: "Exactly! 'Hin und zurück' means round trip. It's often cheaper than two single tickets.", kuttanReaction: "Adipoli! Round trip logic correct aayi pick cheythallo. Paisa save cheythallo! 🔥" },
              { text: "Einfach.", isCorrect: false, response: "Aiyyo! 'Einfach' is just one-way. You'll need to buy another ticket to come back!", kuttanReaction: "Vite machane! Thirichu varunnamallo, so 'Hin und zurück' mathiri set aakkunnathaanu easy. Try again! 😬" },
            ],
          },
          {
            moment: "What does 'Ermäßigung' mean in the ticket context?",
            options: [
              { text: "A discount or reduced price.", isCorrect: true, response: "Correct! Always check for 'Ermäßigung' if you are a student or under 27.", kuttanReaction: "Superb! Student context kandaal 'Ermäßigung' chodikkaan marakkaalle! ⭐" },
              { text: "A first-class seat.", isCorrect: false, response: "No! 'Ermäßigung' means a discount. First class is 'Erste Klasse'.", kuttanReaction: "Aiyyo! Ithu price reduction aanu artham. 'Eerste Klasse' vere logic. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v9-2-1",
          title: "Am Schalter - Buying Travel Tickets",
          duration: "12:00",
          description: "Learn to buy tickets at the counter and from ticket machines like a pro. Kerala-yile bus-il kayari conductor-inu paisa kodukkunna simplicity miss cheyyum, but this is also easy!",
          scriptOutline: [
            "Opening: 'Ticket vangaan Germany-yil pedi venda — it's easier than you think! Kerala-yil KSRTC counter-il ninnu ticket vangiya experience undenki, ithu cake walk!'",
            "At the counter: 'Eine Fahrkarte nach Berlin, bitte.' — The magic sentence! Berlin-nu pakaram oru city name matti paranjaal mathi!",
            "Einfach (one-way) vs hin und zurück (round trip) — oru vazhikku mathi-yo, back-um veno?",
            "Erste Klasse vs Zweite Klasse — first vs second class. AC vs non-AC train compartment pole think chey!",
            "Asking for discounts: 'Gibt es eine Ermäßigung?' — Student aanel always chodikkanam!",
            "Using the Fahrkartenautomat (ticket machine) — step by step. Touch screen, language select, destination, pay!",
            "der Fahrplan — reading the schedule display. Abfahrt = departure, Ankunft = arrival, Gleis = platform",
            "Pro tip: Buy online with the DB Navigator app for Sparpreis (saver fares) — early bird catches the Sparpreis!",
            "Dialogue practice: buying a ticket at a Schalter — full roleplay with natural phrases",
            "Common mistakes: 'nach' for cities (nach Berlin), 'in die' for countries with article (in die Schweiz)",
            "Payment words: bar (cash), mit Karte (by card), kontaktlos (contactless). Germany LOVES cash — always carry some!",
            "Group tickets: Gruppenkarte — friends-nu koodey yathra cheyyumbol oru ticket mathi sometimes!"
          ],
          keyVocabulary: ["die Fahrkarte", "einfach", "hin und zurück", "der Fahrplan", "die Ermäßigung", "bar", "mit Karte"],
          learningObjectives: [
            "Buy a train ticket at a counter using proper German phrases",
            "Understand the difference between one-way and round-trip tickets",
            "Read a basic Fahrplan (schedule)",
            "Use a ticket machine (Fahrkartenautomat) confidently"
          ],
          placeholderThumbnail: "/images/german_train_station.png",
          richContent: [
            {
              type: "table",
              title: "Buying Tickets — Key Phrases",
              headers: ["German", "English"],
              rows: [
                ["Eine Fahrkarte nach Berlin, bitte.", "A ticket to Berlin, please."],
                ["Einfach oder hin und zurück?", "One-way or round trip?"],
                ["Erste Klasse oder zweite Klasse?", "First class or second class?"],
                ["Gibt es eine Ermäßigung?", "Is there a discount?"],
                ["Wann fährt der nächste Zug?", "When does the next train leave?"]
              ]
            },
            {
              type: "table",
              title: "Reading the Departure Board",
              headers: ["German", "English"],
              rows: [
                ["Abfahrt", "Departure"],
                ["Ankunft", "Arrival"],
                ["Gleis", "Platform/Track"],
                ["Verspätung", "Delay"],
                ["Umsteigen", "Transfer/Change"]
              ]
            },
            {
              type: "note",
              title: "nach vs in die",
              variant: "warning",
              content: "Use 'nach' for cities (nach Berlin, nach München). Use 'in die' for countries with articles (in die Schweiz, in die Türkei). Most countries have no article, so use 'nach' (nach Indien, nach Deutschland)."
            }
          ]
        },
        {
          id: "v9-2-2",
          title: "Smart Ticketing — Sparpreise & Discount Cards",
          duration: "10:00",
          description: "Save money on German transport! Paisa ullavar-kku vendi alla, smart aayittu yathra cheyyan padikkaam!",
          scriptOutline: [
            "Opening: 'Germany-yil train ticket-inu ethra paisa aakum ennortha scare aakenda! Ivide njan money-saving tips tharaam!'",
            "Sparpreis explained — book early and save up to 70%! Kerala-yil Tatkal booking pole, but reverse — early booking = cheaper!",
            "Super Sparpreis — the cheapest option, but non-refundable and fixed to one train",
            "Flexpreis — full price but you can take any train. Freedom undu, but costly!",
            "BahnCard 25 — 25% discount on all tickets. Frequent traveler aanel must-have!",
            "BahnCard 50 — 50% discount! Student aanel BahnCard 25 just 40 euros per year!",
            "Deutschlandticket (49-Euro-Ticket) — one monthly pass for ALL local transport in Germany. Mind-blowing!",
            "Comparing: A single Munich to Berlin ticket vs Deutschlandticket savings",
            "Group tickets and weekend tickets (Schönes-Wochenende-Ticket concept)",
            "Online vs counter vs machine — price comparison. Online is usually cheapest!",
            "Refunds and changes: 'Kann ich mein Ticket umbuchen?' (Can I change my ticket?)"
          ],
          keyVocabulary: ["der Sparpreis", "die BahnCard", "das Deutschlandticket", "umbuchen", "die Erstattung"],
          learningObjectives: [
            "Understand different ticket pricing tiers in Germany",
            "Know about BahnCard discount options",
            "Make informed decisions about which ticket type to buy",
            "Ask about refunds and changes in German"
          ],
          placeholderThumbnail: "/images/german_train_station.png",
          richContent: [
            {
              type: "table",
              title: "Ticket Pricing Tiers",
              headers: ["Type", "Price", "Flexibility"],
              rows: [
                ["Super Sparpreis", "Cheapest (book early)", "Non-refundable, fixed train"],
                ["Sparpreis", "Cheap (book early)", "Limited changes, small fee"],
                ["Flexpreis", "Full price", "Any train, fully refundable"],
                ["Deutschlandticket", "€49/month", "All local/regional transport"]
              ]
            },
            {
              type: "table",
              title: "BahnCard Discount Options",
              headers: ["Card", "Discount", "Student Price"],
              rows: [
                ["BahnCard 25", "25% off all tickets", "~€40/year"],
                ["BahnCard 50", "50% off all tickets", "~€70/year"],
                ["BahnCard 100", "Free travel", "€4,000+/year"]
              ]
            },
            {
              type: "note",
              title: "Book Early = Save Big!",
              variant: "tip",
              content: "Unlike India's Tatkal (last-minute = expensive), German trains work the opposite way — early booking = cheapest fares! Sparpreis tickets are available up to 6 months in advance. Set a reminder!"
            }
          ]
        }
      ],
      exercises: [
        { id: "ex9-2-1", type: "fill-blank", question: "Eine Fahrkarte nach München, bitte. ___ . (round trip)", options: ["Hin und zurück", "Einfach", "Erste Klasse", "Zweite Klasse"], correctAnswer: "Hin und zurück", explanation: "'Hin und zurück' means round trip (literally 'there and back'). 'Einfach' means one-way.", xpReward: 10 },
        { id: "ex9-2-2", type: "type-answer", question: "The ticket-machine screen at the imagined Hauptbahnhof shows 'Ermäßigung' next to a student icon, and Kuttan perks up. Type in English what it's offering:", correctAnswer: "Discount", explanation: "'Ermäßigung' means discount or reduction. Students, seniors, and children often get an Ermäßigung — always worth asking.", xpReward: 15 },
        { id: "ex9-2-4", type: "multiple-choice", question: "Where can you buy tickets in Germany?", options: ["All of the above", "Am Schalter (at the counter)", "Am Automaten (at the machine)", "Online or via app"], correctAnswer: "All of the above", explanation: "In Germany, you can buy tickets at the counter (Schalter), from machines (Automat), or online through apps like DB Navigator.", xpReward: 10 },
        { id: "ex9-2-5", type: "matching", question: "Ticket machine screen, German-only. Match the terms before it times out:", options: ["einfach", "hin und zurück", "der Fahrplan", "der Automat"], correctAnswer: ["one-way", "round trip", "schedule/timetable", "ticket machine"], explanation: "einfach = one-way, hin und zurück = return, der Fahrplan tells you when, der Automat sells the ticket — usually with less queue than the counter.", xpReward: 15 },
        { id: "ex9-2-6", type: "type-answer", question: "Student ID in hand, Kuttan tries his luck at the counter: 'Gibt es eine ___ für Studenten?' Type the missing word (discount):", correctAnswer: "Ermäßigung", explanation: "'Ermäßigung' — the money-saving word. Students (Studenten) can often get reduced fares in Germany.", xpReward: 20 },
        { id: "ex9-2-7", type: "free-text", question: "The full order, counter rehearsal: a return ticket to Berlin, second class. Type it in German, starting with 'Ich möchte…':", correctAnswer: "Ich möchte eine Fahrkarte nach Berlin, zweite Klasse, hin und zurück.", explanation: "möchte holds position 2 and everything else stacks behind: destination, class, return. Longer sentence, same verb-second skeleton.", xpReward: 30 },
        { id: "ex9-2-8", type: "multiple-choice", question: "What is the 'Deutschlandticket'?", options: ["A monthly pass for all local public transport in Germany", "A one-time ticket for tourists", "A first-class train ticket", "A flight ticket within Germany"], correctAnswer: "A monthly pass for all local public transport in Germany", explanation: "The Deutschlandticket is a monthly subscription that lets you use all local and regional public transport across Germany — buses, trams, U-Bahn, S-Bahn, and regional trains!", xpReward: 10 },
        {
          id: "ex9-2-9",
          type: "dictation",
          question: "The person ahead of Kuttan in the queue orders first — a perfect model. Listen and type exactly what they say.",
          correctAnswer: "Eine Fahrkarte nach Berlin, bitte",
          explanation: "The most common ticket request in Germany, word for word. Steal it — it's yours now.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-ticket-berlin.mp3"
        },
        {
          id: "ex9-2-10",
          type: "free-text",
          question: "Class role-play: Kuttan is the ticket clerk now, and Priya wants a ticket to Kochi. Ask the clerk's classic follow-up — type in German: 'One-way or round trip?':",
          correctAnswer: "Einfach oder hin und zurück",
          explanation: "'Einfach' for one-way, 'hin und zurück' for round trip — the question every counter asks, so know it from both sides.",
          xpReward: 30
        }
      ,
        {
          id: "ex9-2-prod-speaking",
          type: "speaking",
          question: "Front of the ticket queue, eyes on you — order aloud: 'Einmal nach Berlin, bitte. Hin und zurück.'",
          questionGerman: "Sprechen Sie laut: 'Einmal nach Berlin, bitte. Hin und zurück.'",
          correctAnswer: "Einmal nach Berlin, bitte. Hin und zurück",
          explanation: "einmal = one ticket, hin und zurück = return. Four words buy you any train ride in Germany.",
          audioUrl: "/audio/exercises/ex9-2-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex9-2-spk2",
          type: "speaking",
          question: "Repair Kuttan's slip: at the counter he asks for 'eine Fahrkarte ZU Berlin'. Cities take nach, not zu! Say it right: 'Eine Fahrkarte nach Berlin, bitte.'",
          questionGerman: "Sprechen Sie laut: 'Eine Fahrkarte nach Berlin, bitte.'",
          correctAnswer: "Eine Fahrkarte nach Berlin, bitte",
          explanation: "nach for cities and countries (nach Berlin, nach Indien), zu for people and places-as-buildings (zum Arzt, zur Bank). The zu/nach swap is a signature A1 slip — fix it in your mouth, not just your notes.",
          audioUrl: "/audio/exercises/ex9-2-spk2-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab9-2-1", german: "die Fahrkarte", english: "ticket (travel)", malayalam: "ടിക്കറ്റ്", pronunciation: "fahr-kar-te", example: "Ich brauche eine Fahrkarte.", exampleTranslation: "I need a ticket." },
        { id: "vocab9-2-2", german: "einfach", english: "one-way / simple", malayalam: "ഒരു വഴി", pronunciation: "ayn-fakh", example: "Eine Fahrkarte, einfach, bitte.", exampleTranslation: "A one-way ticket, please." },
        { id: "vocab9-2-3", german: "hin und zurück", english: "round trip", malayalam: "പോയിട്ട് തിരിച്ച്", pronunciation: "hin oont tsoo-rük", example: "Einmal Hamburg, hin und zurück.", exampleTranslation: "One to Hamburg, round trip." },
        { id: "vocab9-2-4", german: "der Fahrplan", english: "schedule / timetable", malayalam: "സമയക്രമം", pronunciation: "fahr-plahn", example: "Der Fahrplan hängt an der Wand.", exampleTranslation: "The timetable hangs on the wall." },
        { id: "vocab9-2-5", german: "die Ermäßigung", english: "discount / reduction", malayalam: "കിഴിവ്", pronunciation: "air-meh-si-goong", example: "Studenten bekommen eine Ermäßigung.", exampleTranslation: "Students get a discount." },
        { id: "vocab9-2-6", german: "der Schalter", english: "counter / ticket window", malayalam: "കൗണ്ടർ", pronunciation: "shahl-ter", example: "Gehen Sie bitte zum Schalter.", exampleTranslation: "Please go to the counter." },
        { id: "vocab9-2-7", german: "der Automat", english: "ticket machine", malayalam: "ടിക്കറ്റ് മെഷീൻ", pronunciation: "ow-toh-maht", example: "Am Automaten kann man Fahrkarten kaufen.", exampleTranslation: "You can buy tickets at the machine." },
        { id: "vocab9-2-8", german: "die Klasse", english: "class (first/second)", malayalam: "ക്ലാസ്", pronunciation: "klah-se", example: "Ich fahre zweite Klasse.", exampleTranslation: "I travel second class." },
        { id: "vocab9-2-9", german: "der Sparpreis", english: "saver fare / discount price", malayalam: "ലാഭവില", pronunciation: "shpahr-pryce", example: "Der Sparpreis ist viel günstiger.", exampleTranslation: "The saver fare is much cheaper." },
        { id: "vocab9-2-10", german: "bezahlen", english: "to pay", malayalam: "പണം നൽകുക", pronunciation: "be-tsah-len", example: "Kann ich mit Karte bezahlen?", exampleTranslation: "Can I pay by card?" }
      ]
    },

    // ========== LESSON 9-3: Asking for Directions ==========
    {
      id: "9-3",
      title: "Asking for Directions",
      titleGerman: "Nach dem Weg fragen",
      description: "Never get lost in Germany! Learn to ask 'Wo ist...?' and understand direction words like geradeaus, links, and rechts. Kerala-yil 'chettan, bus stand evide aanu?' ennodu chodicha pole German-ilum chodichu padikkaam!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Main Square (Lost in the City)",
          sceneType: "station",
          timeOfDay: "afternoon",
          description: "Google Maps is spinning, and you're at a busy crossroads. There's a fountain, a church, and about five different streets. You need to find the station (Bahnhof) before your train leaves. In Kochi, we'd just ask someone 'Chetta, station evideya?'. Here, we need to be a bit more formal but the goal is the same. Time to speak up, machane!",
        },
        narrative: {
          previousRecap: "You've got your ticket. Now, you just need to find the train!",
          currentObjective: "Ask for directions politely and understand navigational words (links, rechts, geradeaus)",
          nextTeaser: "Next: landing! Let's handle the airport and station logistics!",
        },
        kuttanIntro: [
          "Machane! Lost aavunnathu oru normal thing aanu. Google Maps eppozhum correct aavenam ennilla. So asking someone is a great skill.",
          "Direction words eppozhum fixed aanu: 'links' (left), 'rechts' (right), 'geradeaus' (straight). Ithu munnittennu padichal full set!",
          "Pinne oru person approach cheyyumpo eppozhum 'Entschuldigung' (excuse me) ennu thudangane. Polite aayirunnal aalukal help cheyyunthine oru sandhosham ulu. Let's find the way!",
        ],
        vocabEncounters: [
          { vocabId: "vocab9-3-1", encounterMoment: "A passerby points: 'Gehen Sie geradeaus.' (Go straight ahead).", contextSentence: "Gehen Sie geradeaus." },
          { vocabId: "vocab9-3-2", encounterMoment: "Then add: 'Biegen Sie links ab.' (Turn left).", contextSentence: "Biegen Sie links ab." },
          { vocabId: "vocab9-3-3", encounterMoment: "Or maybe: 'Die Apotheke ist rechts.' (The pharmacy is on the right).", contextSentence: "Die Apotheke ist rechts." },
          { vocabId: "vocab9-3-8", encounterMoment: "You ask: 'Können Sie mir den Weg zeigen?' (Can you show me the way?).", contextSentence: "Können Sie mir den Weg zeigen?" },
          { vocabId: "vocab9-3-9", encounterMoment: "You ask: 'Ist es weit von hier?' (Is it far from here?).", contextSentence: "Ist es weit von hier?" },
        ],
        decisionPoints: [
          {
            moment: "You see a person you want to ask for directions. How do you start the conversation politely?",
            options: [
              { text: "Entschuldigung, können Sie mir helfen?", isCorrect: true, response: "Exactly! Starting with 'Entschuldigung' is essential for politeness in Germany.", kuttanReaction: "Adipoli! Politeness level super level-il maintain cheythallo. You're ready to communicate! 🔥" },
              { text: "He, wo ist der Bahnhof?", isCorrect: false, response: "Aiyyo! Too blunt. In Germany, 'Entschuldigung' is the key to getting a friendly response.", kuttanReaction: "Vite machane! 'Entschuldigung' illathe thudangiyar sariyaavoolla. Ithu fix cheytho! Try again! 😬" },
            ],
          },
          {
            moment: "The person says 'Gehen Sie rechts'. Which direction should you turn?",
            options: [
              { text: "Right.", isCorrect: true, response: "Correct! 'rechts' = right.", kuttanReaction: "Superb! Direction logic perfect aayi handle cheythallo. Destination is near! ⭐" },
              { text: "Left.", isCorrect: false, response: "No! 'links' is left. 'rechts' is right.", kuttanReaction: "Aiyyo! 'links' left, 'rechts' right. Marakkaruthu, machane! Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v9-3-1",
          title: "Wo ist...? Finding Your Way",
          duration: "10:00",
          description: "Learn to ask where things are and understand basic directions. Lost aayaal aarodu chodikanam ennariyanam!",
          scriptOutline: [
            "Opening: 'Lost in Berlin? No problem — ivide njan undu! Kerala-yil vazhi chodichal aalukal detailed aayittu parayum, Germany-yilum same aanu!'",
            "'Wo ist der Bahnhof?' — Where is the train station? Most useful question ever!",
            "'Wie komme ich zum Bahnhof?' — How do I get to the station? (zu + dem = zum)",
            "'Wie komme ich zur Post?' — How do I get to the post office? (zu + der = zur)",
            "'Ist es weit von hier?' — Is it far from here? Distance ariyaan important question!",
            "Polite opener: 'Entschuldigung, können Sie mir helfen?' — Always start polite, machane!",
            "'Können Sie das bitte wiederholen?' — Can you repeat that please? Because they WILL speak fast!",
            "Listening for key direction words in the answer — panic cheyyanam venda, keywords catch chey!",
            "'Ich suche den Bahnhof.' — I'm looking for the train station. Alternative way to ask!",
            "'Gibt es hier in der Nähe einen Supermarkt?' — Is there a supermarket nearby?",
            "Practice dialogue: asking a stranger for directions — full scene from lost tourist to found!",
            "Google Maps vs asking humans — Germany-yil old people prefer you ask them! It's considered polite!"
          ],
          keyVocabulary: ["Wo ist...?", "Wie komme ich zum/zur...?", "Ist es weit?", "Entschuldigung", "Ich suche...", "in der Nähe"],
          learningObjectives: [
            "Ask for directions politely in German",
            "Use 'zum' (zu + dem) and 'zur' (zu + der) correctly",
            "Understand basic responses about locations",
            "Use alternative phrasing when asking for places"
          ],
          placeholderThumbnail: "/images/german_train_station.png",
          richContent: [
            {
              type: "table",
              title: "Asking for Directions",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["Wo ist der Bahnhof?", "Where is the station?", "സ്റ്റേഷൻ എവിടെയാണ്?"],
                ["Wie komme ich zum Bahnhof?", "How do I get to the station?", "സ്റ്റേഷനിലേക്ക് എങ്ങനെ പോകും?"],
                ["Wie komme ich zur Post?", "How do I get to the post office?", "പോസ്റ്റ് ഓഫീസിലേക്ക് എങ്ങനെ?"],
                ["Ist es weit von hier?", "Is it far from here?", "ഇവിടെ നിന്ന് ദൂരമുണ്ടോ?"],
                ["Entschuldigung, können Sie mir helfen?", "Excuse me, can you help me?", "ക്ഷമിക്കണം, സഹായിക്കാമോ?"]
              ]
            },
            {
              type: "table",
              title: "zum vs zur",
              headers: ["Gender", "zu + Article", "Contraction", "Example"],
              rows: [
                ["Masculine/Neuter", "zu + dem", "zum", "zum Bahnhof, zum Krankenhaus"],
                ["Feminine", "zu + der", "zur", "zur Post, zur Uni"]
              ]
            },
            {
              type: "note",
              title: "Always Start Polite!",
              variant: "tip",
              content: "Begin with 'Entschuldigung' (excuse me) before asking for directions. Germans appreciate politeness. If you don't understand the answer, say: 'Können Sie das bitte wiederholen?' (Can you please repeat that?)"
            }
          ]
        },
        {
          id: "v9-3-2",
          title: "Giving Directions",
          duration: "10:00",
          description: "Understand direction words so you know where to go when someone answers. Aalukal parayunnathu manasilaakanam ennalle!",
          scriptOutline: [
            "geradeaus (straight ahead) — 'Go straight, machane! Nere nere pokuka!'",
            "links (left) and rechts (right) — left and right, basic but essential!",
            "die Kreuzung (intersection) — 'an der Kreuzung links' — kavala-yil left edukku!",
            "die Ampel (traffic light) — 'bei der Ampel rechts' — signal light-il right edukku!",
            "die Ecke (corner) — 'um die Ecke' — corner-inu chuttum! Angadi moola pole!",
            "'Gehen Sie geradeaus, dann links an der Ampel' — straight poi, signal-il left!",
            "gegenüber (opposite) — 'gegenüber dem Supermarkt' — supermarket-inu nere ethir vashathhu!",
            "neben (next to), zwischen (between) — location prepositions that Germans love!",
            "die Brücke (bridge) — 'über die Brücke gehen' — paalam kadannu pokuka!",
            "die erste/zweite/dritte Straße — the first/second/third street. Count the streets!",
            "Full practice: Following a set of directions on a map — real Berlin map example!",
            "Common scenario: Finding a restaurant — 'Entschuldigung, wo ist das nächste Restaurant?'"
          ],
          keyVocabulary: ["geradeaus", "links", "rechts", "die Kreuzung", "die Ampel", "die Brücke", "die Straße"],
          learningObjectives: [
            "Understand and use basic direction words",
            "Follow a set of directions given in German",
            "Use location prepositions (gegenüber, neben, zwischen)",
            "Count streets and identify landmarks in directions"
          ],
          placeholderThumbnail: "/images/german_train_station.png",
          richContent: [
            {
              type: "table",
              title: "Direction Words",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["geradeaus", "straight ahead", "നേരെ പോകൂ"],
                ["links", "left", "ഇടത്ത്"],
                ["rechts", "right", "വലത്ത്"],
                ["die Kreuzung", "intersection", "കവല"],
                ["die Ampel", "traffic light", "ട്രാഫിക് ലൈറ്റ്"],
                ["die Ecke", "corner", "മൂല"],
                ["gegenüber", "opposite", "എതിർവശം"],
                ["die Brücke", "bridge", "പാലം"]
              ]
            },
            {
              type: "note",
              title: "Direction Sentence Pattern",
              variant: "tip",
              content: "Typical direction sentences: 'Gehen Sie geradeaus, dann links an der Ampel.' (Go straight, then left at the traffic light.) Listen for the keywords: geradeaus, links, rechts, Kreuzung, Ampel — you'll understand the route!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "die erste Straße", english: "the first street", malayalam: "ആദ്യത്തെ തെരുവ്", pronunciation: "dee ers-te shtrah-se" },
                { german: "die zweite Straße", english: "the second street", malayalam: "രണ്ടാമത്തെ തെരുവ്", pronunciation: "dee tsvai-te shtrah-se" },
                { german: "die dritte Straße", english: "the third street", malayalam: "മൂന്നാമത്തെ തെരുവ്", pronunciation: "dee drit-te shtrah-se" }
              ]
            }
          ]
        }
      ],
      exercises: [
        { id: "ex9-3-2", type: "fill-blank", question: "Wie komme ich ___ Supermarkt? (to the — masculine Dativ)", options: ["zum", "zur", "zu dem", "bei dem"], correctAnswer: "zum", explanation: "'zu + dem' contracts to 'zum' for masculine and neuter nouns in Dativ. 'der Supermarkt' is masculine, so: zum Supermarkt.", xpReward: 10 },
        { id: "ex9-3-3", type: "matching", question: "A helpful local fires directions at you. Match the words you just heard:", options: ["geradeaus", "links", "rechts", "die Kreuzung", "die Ampel"], correctAnswer: ["straight ahead", "left", "right", "intersection", "traffic light"], explanation: "geradeaus, links, rechts are the action words; die Kreuzung and die Ampel are the landmarks they hang on. Catch these five and any direction makes sense.", xpReward: 15 },
        { id: "ex9-3-4", type: "type-answer", question: "Stamps for Amma's letter — Kuttan needs the post office: 'Wie komme ich ___ Post?' (die Post — feminine). Type the missing word:", correctAnswer: "zur", explanation: "'zu + der' contracts to 'zur' for feminine nouns in Dativ. 'die Post' is feminine, so: zur Post.", xpReward: 15 },
        { id: "ex9-3-5", type: "free-text", question: "Kuttan plays the helpful local in the class role-play. Give the directions in German — 'Go straight, then left at the traffic light.' (Gehen Sie…):", correctAnswer: "Gehen Sie geradeaus, dann links an der Ampel", explanation: "Sie-imperative: verb first (Gehen Sie), then the route. 'an der Ampel' is Dativ — the location where you turn.", xpReward: 30 },
        { id: "ex9-3-6", type: "multiple-choice", question: "The local says the pharmacy is 'gegenüber dem Supermarkt'. Kuttan should look…", options: ["Opposite the supermarket", "Next to the supermarket", "Behind the supermarket", "Inside the supermarket"], correctAnswer: "Opposite the supermarket", explanation: "'gegenüber' means 'opposite' or 'across from'. It takes the Dativ case.", xpReward: 10 },
        { id: "ex9-3-7", type: "multiple-choice", question: "You want to ask politely for help with directions. What do you say first?", options: ["Entschuldigung, können Sie mir helfen?", "Hilfe! Wo ist der Bahnhof?", "Hey, wo ist der Bahnhof?", "Ich brauche den Bahnhof!"], correctAnswer: "Entschuldigung, können Sie mir helfen?", explanation: "Starting with 'Entschuldigung' (excuse me) and asking politely with 'können Sie mir helfen?' (can you help me?) is the standard polite approach in Germany.", xpReward: 10 },
        { id: "ex9-3-8", type: "type-answer", question: "The local points: 'Nehmen Sie die zweite Straße ___.' — second street on the RIGHT. Type the missing word:", correctAnswer: "rechts", explanation: "'Nehmen Sie die zweite Straße rechts' — take the second street on the right. The zweite/dritte + links/rechts pattern covers most directions you'll ever hear.", xpReward: 15 },
        {
          id: "ex9-3-9",
          type: "dictation",
          question: "A tourist stops Kuttan near Marine Drive and asks one desperate question in German. Listen and type exactly what you hear.",
          correctAnswer: "Wo ist der Bahnhof",
          explanation: "The most essential traveller question in Germany — and in Hören, someone asks it in almost every dialogue.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-where-station.mp3"
        },
        {
          id: "ex9-3-10",
          type: "free-text",
          question: "Now answer the lost tourist like a pro. Type in German: 'Go straight ahead.' (polite Sie form):",
          correctAnswer: "Gehen Sie geradeaus",
          explanation: "'Gehen Sie geradeaus.' — the polite Sie-imperative puts the verb first, and geradeaus does the pointing.",
          xpReward: 30
        }
      ,
        {
          id: "ex9-3-prod-speaking",
          type: "speaking",
          question: "The Bahnhof is hiding. Ask for the route aloud: 'Entschuldigung, wie komme ich zum Bahnhof?'",
          questionGerman: "Sprechen Sie laut: 'Entschuldigung, wie komme ich zum Bahnhof?'",
          correctAnswer: "Entschuldigung, wie komme ich zum Bahnhof",
          explanation: "'Wie komme ich zu...?' asks for the way, not just the location. zum = zu + dem — your first useful dative contraction.",
          audioUrl: "/audio/exercises/ex9-3-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex9-3-spk2",
          type: "speaking",
          question: "Repair Kuttan's slip: giving directions, he barks 'Gehen geradeaus!' — the polite command needs its Sie! Say it right: 'Gehen Sie geradeaus.'",
          questionGerman: "Sprechen Sie laut: 'Gehen Sie geradeaus.'",
          correctAnswer: "Gehen Sie geradeaus",
          explanation: "The Sie-imperative is verb + Sie: Gehen Sie, Nehmen Sie, Kommen Sie. Dropping the Sie turns polite directions into drill-sergeant German — a real register error the exam hears instantly.",
          audioUrl: "/audio/exercises/ex9-3-spk2-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab9-3-1", german: "geradeaus", english: "straight ahead", malayalam: "നേരെ", pronunciation: "ge-rah-de-ows", example: "Gehen Sie geradeaus.", exampleTranslation: "Go straight ahead." },
        { id: "vocab9-3-2", german: "links", english: "left", malayalam: "ഇടത്ത്", pronunciation: "links", example: "Biegen Sie links ab.", exampleTranslation: "Turn left." },
        { id: "vocab9-3-3", german: "rechts", english: "right", malayalam: "വലത്ത്", pronunciation: "rekhts", example: "Die Apotheke ist rechts.", exampleTranslation: "The pharmacy is on the right." },
        { id: "vocab9-3-4", german: "die Kreuzung", english: "intersection / crossroads", malayalam: "കവല", pronunciation: "kroy-tsoong", example: "An der Kreuzung gehen Sie rechts.", exampleTranslation: "At the intersection, go right." },
        { id: "vocab9-3-5", german: "die Ampel", english: "traffic light", malayalam: "ട്രാഫിക് ലൈറ്റ്", pronunciation: "ahm-pel", example: "Bei der Ampel links abbiegen.", exampleTranslation: "Turn left at the traffic light." },
        { id: "vocab9-3-6", german: "die Ecke", english: "corner", malayalam: "മൂല", pronunciation: "eh-ke", example: "Das Café ist um die Ecke.", exampleTranslation: "The cafe is around the corner." },
        { id: "vocab9-3-7", german: "gegenüber", english: "opposite / across from", malayalam: "എതിർവശം", pronunciation: "ge-gen-ue-ber", example: "Die Bank ist gegenüber dem Rathaus.", exampleTranslation: "The bank is opposite the town hall." },
        { id: "vocab9-3-8", german: "der Weg", english: "way / path", malayalam: "വഴി", pronunciation: "vehk", example: "Können Sie mir den Weg zeigen?", exampleTranslation: "Can you show me the way?" },
        { id: "vocab9-3-9", german: "weit", english: "far", malayalam: "ദൂരം", pronunciation: "vyte", example: "Ist es weit von hier?", exampleTranslation: "Is it far from here?" },
        { id: "vocab9-3-10", german: "nah", english: "near / close", malayalam: "അടുത്ത്", pronunciation: "nah", example: "Der Bahnhof ist ganz nah.", exampleTranslation: "The train station is very close." }
      ]
    },

    // ========== LESSON 9-4: At the Airport & Train Station ==========
    {
      id: "9-4",
      title: "At the Airport & Train Station",
      titleGerman: "Am Flughafen und Bahnhof",
      description: "Navigate airports and train stations with confidence — from passport control to finding your platform. Kochi airport-il ninnu Frankfurt airport-il irangunna Malayali-kku vendi ulla survival guide!",
      duration: "45 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Kuttan's Home, Thrissur — Frankfurt Arrival Rehearsal",
          sceneType: "home",
          timeOfDay: "morning",
          description: "Kuttan is still in Thrissur, watching his cousin's Frankfurt arrival video call and rehearsing the first airport steps before the real journey. The signs, passport control, baggage claim, and train station all become practice scenes — not a physical arrival yet.",
        },
        narrative: {
          previousRecap: "You've successfully navigated the city directions. Now, let's look at the bigger picture — international travel!",
          currentObjective: "Handle airport procedures (passport control, baggage claim) and understand train station logistics (delays, platforms)",
          nextTeaser: "Next: Power Verbs! Let's learn to say what you 'can' and 'must' do!",
        },
        kuttanIntro: [
          "Machane! Cousin video call-il Frankfurt airport kandappol manasilayi — landing oru separate scene aanu. Kochi-ye kalum valre big aanu ithu. Practice-il thanne 'Reisepass' (passport) ready aakkam.",
          "Luggage collector-inu 'Gepäckausgabe' ennu parayum. Athu vertical signs-il sradhikkanam.",
          "Pinne train station-il 'Verspätung' (delay) announcement kettal panic aavenda — Germans-inu athu oru common headache aanu. Platform-nu 'Gleis' ennu parayum. Let's find your train!",
        ],
        vocabEncounters: [
          { vocabId: "vocab9-4-1", encounterMoment: "On the video call, Kuttan sees the terminal: 'Der Flughafen ist riesig!' (The airport is huge!).", contextSentence: "Der Flughafen ist sehr groß." },
          { vocabId: "vocab9-4-4", encounterMoment: "In the rehearsal, he asks: 'Wo ist mein Gepäck?' (Where is my luggage?).", contextSentence: "Mein Gepäck ist schwer." },
          { vocabId: "vocab9-4-2", encounterMoment: "Frau Weber plays the officer: 'Ihren Reisepass, bitte.' (Your passport, please).", contextSentence: "Die Passkontrolle war schnell." },
          { vocabId: "vocab9-4-10", encounterMoment: "The mock board flashes red: 'Der Zug hat Verspätung.' (The train is delayed). Aiyyo!", contextSentence: "Der Zug hat zehn Minuten Verspätung." },
          { vocabId: "vocab9-4-9", encounterMoment: "Kuttan reads the mock sign: 'Der Zug fährt auf Gleis 4.' (The train departs from platform 4).", contextSentence: "Der Zug fährt auf Gleis 3 ab." },
        ],
        decisionPoints: [
          {
            moment: "In the passport-control rehearsal, the officer says 'Ihren Reisepass, bitte.' What is your polite response?",
            options: [
              { text: "Hier ist mein Reisepass.", isCorrect: true, response: "Exactly! Handing over the passport with a clear sentence is perfect.", kuttanReaction: "Adipoli! Confidence level super aanu. Passport check clear! 🔥" },
              { text: "Was möchten Sie?", isCorrect: false, response: "Aiyyo! Too confrontational. They asked for your passport, so just give it to them!", kuttanReaction: "Vite machane! Asking 'what do you want' to a police officer is not recommended! Try again! 😬" },
            ],
          },
          {
            moment: "An announcement says 'Der Zug hat zehn Minuten Verspätung'. What does this mean?",
            options: [
              { text: "The train is 10 minutes late.", isCorrect: true, response: "Correct! 'Verspätung' = delay. You'll have extra time for a coffee.", kuttanReaction: "Superb! Announcement logic correctly catch cheythallo. 10 mins wait cheyyam! ⭐" },
              { text: "The train is on platform 10.", isCorrect: false, response: "No! 'Gleis' is platform. 'Verspätung' is delay.", kuttanReaction: "Aiyyo! 'Verspätung' kandaal timing-il problem undu ennanu artham. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v9-4-1",
          title: "Am Flughafen — At the Airport",
          duration: "14:00",
          description: "Everything you need to know about German airports. Cochin International-il ninnu Frankfurt-il ethumbol enna cheyyanum!",
          scriptOutline: [
            "Opening: 'Frankfurt airport-il irangi confused aayal — this video is for you! Cochin International-il ninnu irangumbol athilum big aanu Frankfurt!'",
            "Airport vocabulary: der Flughafen, die Passkontrolle, der Zoll — the three stages after landing!",
            "das Gepäck (luggage), das Handgepäck (hand luggage) — Malayalam-il 'saamaanam' ennokke parayunnathu!",
            "das Gate, der Abflug (departure), die Ankunft (arrival) — departure board vaayikkan padikkaam!",
            "Signs you'll see: Ausgang (exit), Ankunft, Abflug, Gepäckausgabe (baggage claim), Toiletten",
            "Check-in phrases: 'Ich möchte einchecken.' / 'Hier ist mein Reisepass.'",
            "Security: 'Bitte legen Sie Ihre Taschen auf das Band.' — Put your bags on the belt!",
            "At passport control: 'Ihren Reisepass, bitte.' — Your passport, please!",
            "Customs: 'Haben Sie etwas zu verzollen?' — Do you have anything to declare?",
            "Finding your connecting flight: Umsteigen (transfer), der Anschlussflug (connecting flight)",
            "Duty free: 'Zollfreier Bereich' — shopping before boarding!",
            "Emergency phrases: 'Ich habe meinen Koffer verloren!' — I've lost my suitcase!"
          ],
          keyVocabulary: ["der Flughafen", "der Abflug", "die Ankunft", "der Reisepass", "das Gepäck", "einchecken"],
          learningObjectives: [
            "Navigate airport vocabulary confidently",
            "Handle check-in, security, and passport control conversations",
            "Read airport signs in German",
            "Ask for help when something goes wrong"
          ],
          placeholderThumbnail: "/images/german_train_station.png",
          richContent: [
            {
              type: "table",
              title: "Airport Vocabulary",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["der Flughafen", "airport", "വിമാനത്താവളം"],
                ["die Passkontrolle", "passport control", "പാസ്പോർട്ട് ചെക്ക്"],
                ["der Zoll", "customs", "കസ്റ്റംസ്"],
                ["das Gepäck", "luggage", "സാധനങ്ങൾ"],
                ["das Handgepäck", "hand luggage", "ഹാൻഡ് ബാഗ്"],
                ["der Abflug", "departure", "പുറപ്പാട്"],
                ["die Ankunft", "arrival", "വരവ്"],
                ["die Gepäckausgabe", "baggage claim", "ലഗേജ് കളക്ഷൻ"]
              ]
            },
            {
              type: "table",
              title: "Airport Phrases",
              headers: ["Situation", "German Phrase"],
              rows: [
                ["Check in", "Ich möchte einchecken."],
                ["Show passport", "Hier ist mein Reisepass."],
                ["Lost luggage", "Ich habe meinen Koffer verloren!"],
                ["Customs", "Ich habe nichts zu verzollen."],
                ["Connecting flight", "Wo ist mein Anschlussflug?"]
              ]
            },
            {
              type: "note",
              title: "Airport Signs to Know",
              variant: "info",
              content: "Key signs: Ausgang (exit), Ankunft (arrivals), Abflug (departures), Gepäckausgabe (baggage claim), Toiletten. Look for these words when you land — they won't always have English translations!"
            }
          ]
        },
        {
          id: "v9-4-2",
          title: "Am Bahnhof — At the Train Station",
          duration: "12:00",
          description: "Master the German train station — platforms, announcements, and delays. Ernakulam Junction-inte German version padikkaam!",
          scriptOutline: [
            "Opening: 'German Bahnhof = Kerala-yile railway station, but cleaner and more organized! Let's explore!'",
            "der Bahnhof, der Hauptbahnhof (Hbf) — main station. Every city has a Hauptbahnhof!",
            "das Gleis (platform) — 'Auf welchem Gleis fährt der Zug nach Berlin?' — which platform?",
            "die Abfahrt vs die Ankunft — departure vs arrival boards. Yellow board = Abfahrt, White board = Ankunft!",
            "die Verspätung — delays (very common with Deutsche Bahn!). KSRTC delay pole, but Germans get VERY upset about it!",
            "Announcements: 'Der Zug auf Gleis 5 hat 10 Minuten Verspätung' — train on platform 5 is 10 min late",
            "Umsteigen (changing trains): 'Müssen Sie umsteigen?' — Do you need to change?",
            "der Wartesaal (waiting room), die Information (info desk) — useful places in the station",
            "die Schließfächer (lockers) — store your luggage! Kerala-yile cloak room pole!",
            "Important announcement phrases: 'Zurückbleiben, bitte!' — Stand back, please! (doors closing)",
            "Reading the Abfahrtstafel (departure board): train number, destination, platform, time, delays",
            "Practical scenario: You arrive at München Hbf and need to catch a connecting train to Salzburg"
          ],
          keyVocabulary: ["das Gleis", "die Verspätung", "die Abfahrt", "umsteigen", "der Hauptbahnhof", "die Schließfächer"],
          learningObjectives: [
            "Navigate train station vocabulary and signs",
            "Ask which platform a train departs from",
            "Understand common announcements about delays",
            "Handle train connections and changes"
          ],
          placeholderThumbnail: "/images/german_train_station.png",
          richContent: [
            {
              type: "table",
              title: "Train Station Vocabulary",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["der Bahnhof", "train station", "റെയിൽവേ സ്റ്റേഷൻ"],
                ["der Hauptbahnhof (Hbf)", "main station", "പ്രധാന സ്റ്റേഷൻ"],
                ["das Gleis", "platform/track", "പ്ലാറ്റ്ഫോം"],
                ["die Verspätung", "delay", "താമസം"],
                ["die Abfahrt", "departure (train)", "പുറപ്പാട്"],
                ["die Schließfächer", "lockers", "ലോക്കർ"]
              ]
            },
            {
              type: "table",
              title: "Useful Station Phrases",
              headers: ["German", "English"],
              rows: [
                ["Auf welchem Gleis fährt der Zug?", "Which platform does the train leave from?"],
                ["Muss ich umsteigen?", "Do I need to change trains?"],
                ["Der Zug hat 10 Minuten Verspätung.", "The train is 10 minutes late."],
                ["Zurückbleiben, bitte!", "Stand back, please! (doors closing)"]
              ]
            },
            {
              type: "note",
              title: "Departure Board Color Code",
              variant: "tip",
              content: "Yellow board = Abfahrt (departures). White board = Ankunft (arrivals). Check the board for: train number, destination (Ziel), platform (Gleis), time, and delays (shown in red). Deutsche Bahn delays are so famous that Germans joke about it!"
            }
          ]
        }
      ],
      exercises: [
        { id: "ex9-4-1", type: "multiple-choice", question: "How do you ask 'Which platform does the train to Berlin leave from?'", options: ["Auf welchem Gleis fährt der Zug nach Berlin?", "Wo ist der Zug nach Berlin?", "Wann fährt der Zug nach Berlin?", "Welcher Zug fährt nach Berlin?"], correctAnswer: "Auf welchem Gleis fährt der Zug nach Berlin?", explanation: "'Auf welchem Gleis' means 'on which platform'. 'Gleis' is the German word for platform/track at a train station.", xpReward: 10 },
        { id: "ex9-4-2", type: "matching", question: "Kuttan lands at the imagined Frankfurt airport — five signs decide his next hour. Match each one to what it does:", options: ["die Passkontrolle", "der Zoll", "das Gepäck", "das Gleis", "die Verspätung"], correctAnswer: ["passport control", "customs", "luggage", "platform/track", "delay"], explanation: "Five signs that matter: Passkontrolle, Zoll, Gepäck, Gleis, Verspätung. You'll meet all five in your first hour in Germany.", xpReward: 15 },
        { id: "ex9-4-3", type: "multiple-choice", question: "The imagined Frankfurt airport board has a column headed 'Abflug' — Kuttan's flight is in it. That column lists…", options: ["Departures", "Arrivals", "Gates", "Delays"], correctAnswer: "Departures", explanation: "'der Abflug' = departure (for flights): Ab (away/off) + Flug (flight). For trains it's 'die Abfahrt' instead.", xpReward: 10 },
        { id: "ex9-4-4", type: "fill-blank", question: "Der Zug hat 20 Minuten ___ . (delay)", options: ["Verspätung", "Ankunft", "Abfahrt", "Gepäck"], correctAnswer: "Verspätung", explanation: "'Verspätung' means delay. German trains having Verspätung is almost a national joke! 'Der Zug hat ... Minuten Verspätung' = The train is ... minutes late.", xpReward: 10 },
        { id: "ex9-4-5", type: "free-text", question: "Amma wants to know exactly when the cousin's flight lands. Type it in German — 'The flight arrives at 3 o'clock.' (ankommen is separable!):", correctAnswer: "Der Flug kommt um drei Uhr an", explanation: "ankommen is separable: kommt ... an. The prefix waits at the end of the sentence — even for flights.", xpReward: 30 },
        { id: "ex9-4-6", type: "type-answer", question: "Off the plane, Kuttan follows everyone toward a sign: 'Gepäckausgabe'. Type in English where that sign leads:", correctAnswer: "Baggage claim", explanation: "'Gepäckausgabe' = Gepäck (luggage) + Ausgabe (handing out). It's where you collect your suitcase after a flight.", xpReward: 15 },
        { id: "ex9-4-7", type: "type-answer", question: "Passport control. The officer holds out a hand: 'Ihren ___, bitte.' Type the missing word (passport):", correctAnswer: "Reisepass", explanation: "'der Reisepass' — at passport control the officer says 'Ihren Reisepass, bitte'. Have the word ready before they say it.", xpReward: 15 },
        {
          id: "ex9-4-9",
          type: "dictation",
          question: "An announcement crackles over the imagined station speakers — the words every German traveller dreads. Listen and type exactly what you hear.",
          correctAnswer: "Der Zug hat Verspätung",
          explanation: "'Verspätung' (delay) — you'll hear it constantly at German stations; it's practically a national running joke.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-train-delay.mp3"
        },
        {
          id: "ex9-4-10",
          type: "free-text",
          question: "Role-play flip: Kuttan plays the passport officer, Priya the traveller. Say the officer's line — type in German: 'Your passport, please.':",
          correctAnswer: "Ihren Reisepass, bitte",
          explanation: "'Ihren' — capital I for the formal your, and -en because 'Reisepass' is masculine accusative. Two letters, two rules.",
          xpReward: 30
        }
      ,
        {
          id: "ex9-4-prod-speaking",
          type: "speaking",
          question: "Platform chaos, departures board flickering — ask the conductor aloud: 'Wann fährt der nächste Zug nach Berlin?'",
          questionGerman: "Sprechen Sie laut: 'Wann fährt der nächste Zug nach Berlin?'",
          correctAnswer: "Wann fährt der nächste Zug nach Berlin",
          explanation: "Wann + fährt + nach: the question that pairs with every announcement in Hören. Ask it, then listen for the time.",
          audioUrl: "/audio/exercises/ex9-4-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex9-4-spk2",
          type: "speaking",
          question: "Repair Kuttan's slip: rushing for the connection, he says 'Ich muss umsteigen in Frankfurt.' The infinitive belongs at the END! Say it right: 'Ich muss in Frankfurt umsteigen.'",
          questionGerman: "Sprechen Sie laut: 'Ich muss in Frankfurt umsteigen.'",
          correctAnswer: "Ich muss in Frankfurt umsteigen",
          explanation: "Modal müssen takes slot 2 and umsteigen waits at the end — English word order ('I must change in Frankfurt') is exactly the trap. The exam scores this bracket hard.",
          audioUrl: "/audio/exercises/ex9-4-spk2-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab9-4-1", german: "der Flughafen", english: "airport", malayalam: "വിമാനത്താവളം", pronunciation: "flook-hah-fen", example: "Der Flughafen ist sehr groß.", exampleTranslation: "The airport is very big." },
        { id: "vocab9-4-2", german: "die Passkontrolle", english: "passport control", malayalam: "പാസ്പോർട്ട് പരിശോധന", pronunciation: "pahs-kon-troh-le", example: "Die Passkontrolle war schnell.", exampleTranslation: "The passport control was quick." },
        { id: "vocab9-4-3", german: "der Zoll", english: "customs", malayalam: "കസ്റ്റംസ്", pronunciation: "tsohl", example: "Haben Sie etwas zu verzollen?", exampleTranslation: "Do you have anything to declare?" },
        { id: "vocab9-4-4", german: "das Gepäck", english: "luggage / baggage", malayalam: "ലഗേജ്", pronunciation: "ge-pek", example: "Mein Gepäck ist schwer.", exampleTranslation: "My luggage is heavy." },
        { id: "vocab9-4-5", german: "das Gate", english: "gate (airport)", malayalam: "ഗേറ്റ്", pronunciation: "geyt", example: "Das Gate ist B12.", exampleTranslation: "The gate is B12." },
        { id: "vocab9-4-6", german: "der Abflug", english: "departure (flight)", malayalam: "പുറപ്പാട് (വിമാനം)", pronunciation: "ahp-flook", example: "Der Abflug ist um 14 Uhr.", exampleTranslation: "The departure is at 2 PM." },
        { id: "vocab9-4-7", german: "die Ankunft", english: "arrival", malayalam: "വരവ്", pronunciation: "ahn-koonft", example: "Die Ankunft ist pünktlich.", exampleTranslation: "The arrival is on time." },
        { id: "vocab9-4-8", german: "der Bahnhof", english: "train station", malayalam: "റെയിൽവേ സ്റ്റേഷൻ", pronunciation: "bahn-hohf", example: "Der Hauptbahnhof ist im Zentrum.", exampleTranslation: "The main station is in the center." },
        { id: "vocab9-4-9", german: "das Gleis", english: "platform / track", malayalam: "പ്ലാറ്റ്ഫോം", pronunciation: "glyse", example: "Der Zug fährt auf Gleis 3 ab.", exampleTranslation: "The train departs from platform 3." },
        { id: "vocab9-4-10", german: "die Verspätung", english: "delay", malayalam: "താമസം / കാലതാമസം", pronunciation: "fer-shpeh-toong", example: "Der Zug hat zehn Minuten Verspätung.", exampleTranslation: "The train is ten minutes late." }
      ]
    },

    // ========== LESSON 9-5: Modal Verbs ==========
    {
      id: "9-5",
      title: "Modal Verbs",
      titleGerman: "Modalverben",
      description: "Unlock the power verbs of German! können, müssen, dürfen, wollen, sollen, mögen — the verbs that change everything. Ee verbs illathe German sentences undaakkaan pattoola, machane! Think of them as the masala in your sentence-curry!",
      duration: "60 min",
      xpReward: 180,
      storyScene: {
        setting: {
          name: "WG Kitchen (Weekend Planning)",
          sceneType: "home",
          timeOfDay: "evening",
          description: "The team is gathered around a laptop. You're planning a trip to the Alps. Everyone has their own ideas and constraints. 'Ich will wandern' (I want to hike), 'Ich muss arbeiten' (I must work), 'Ich kann kochen' (I can cook). These modal verbs are the engine of your conversation. Time to master the power verbs, machane!",
        },
        narrative: {
          previousRecap: "You've survived the airport and the station. Now, let's learn how to express your wishes and duties!",
          currentObjective: "Master all 6 modal verbs and understand the 'verb at the end' sentence structure",
          nextTeaser: "Module 9 complete! Next: Let's talk about Health! Doctor visits, body parts, and lifestyle!",
        },
        kuttanIntro: [
          "Machane! Modal verbs German-il valare essential aanu. 'Can', 'Must', 'Want' — ithoke illathe nammalku onnum parayan pattoola.",
          "Main rule: Modal verb 2nd position-il aayirukkum, but actual action verb sentence-inte ETTAVUM END-ilekk pokum. 'Ich KANN Deutsch SPRECHEN.'",
          "Politeness context-il 'wollen' (want) kurachu rude aayirukkum, so 'möchten' (would like) use cheyyunthinaan nallathu. Let's plan that trip!",
        ],
        vocabEncounters: [
          { vocabId: "vocab9-5-1", encounterMoment: "Lara says: 'Ich kann gut Karten lesen.' (I can read maps well).", contextSentence: "Ich kann Deutsch sprechen." },
          { vocabId: "vocab9-5-2", encounterMoment: "Stefan sighs: 'Ich muss am Samstag arbeiten.' (I must work on Sat).", contextSentence: "Ich muss jetzt gehen." },
          { vocabId: "vocab9-5-7", encounterMoment: "You suggest: 'Ich möchte nach München fahren.' (I would like to go to Munich).", contextSentence: "Ich möchte einen Tee, bitte." },
          { vocabId: "vocab9-5-11", encounterMoment: "Lara asks: 'Wollen wir fliegen?' (Do we want to fly?). Stefan says 'Zu teuer!'.", contextSentence: "Wir fliegen morgen nach Berlin." },
          { vocabId: "vocab9-5-9", encounterMoment: "Stefan offers: 'Ich kann euch helfen.' (I can help you guys).", contextSentence: "Können Sie mir bitte helfen?" },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'I can speak German' (Ich / können / Deutsch / sprechen). Which word order is correct?",
            options: [
              { text: "Ich kann Deutsch sprechen.", isCorrect: true, response: "Exactly! Modal verb follows the subject, and the main verb (sprechen) goes to the end.", kuttanReaction: "Adipoli! Sentence structure logic perfect aayi handle cheythallo. Rule noted! 🔥" },
              { text: "Ich kann sprechen Deutsch.", isCorrect: false, response: "Aiyyo! In English, 'speak' comes after 'can'. But in German, it MUST go to the end of the sentence!", kuttanReaction: "Vite machane! Action verb-ine thalli end-ilekk vidanam. Ithu fix cheytho! Try again! 😬" },
            ],
          },
          {
            moment: "You are at a ticket counter. Which modal verb is more polite to use for your request?",
            options: [
              { text: "möchten (would like)", isCorrect: true, response: "Correct! 'Ich möchte...' is the standard polite way to ask for things.", kuttanReaction: "Superb! Politnes logic correct aayi pick cheythallo. 'Wollen' children use cheyyana demanding tone aanu. ⭐" },
              { text: "wollen (want)", isCorrect: false, response: "No! 'Ich will...' sounds like a demand. In service situations, 'möchten' is much better.", kuttanReaction: "Aiyyo! 'möchten' uses politeness. 'wollen' kurachu rude aannu artham. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v9-5-1",
          title: "können, müssen, dürfen — The Power Verbs",
          duration: "12:00",
          description: "Master the first three modal verbs that you'll use every single day. Ee moonu verbs arinjaal German-il half the job done!",
          scriptOutline: [
            "Opening: 'German-il oru super power undu — modal verbs! Masala illathe curry pole aanu ivar illathe speech!',",
            "können (can/able to): Ich kann Deutsch sprechen — I can speak German. 'Enikku German samsaarikkan kazhiyum!'",
            "können conjugation: ich kann, du kannst, er/sie kann, wir können, ihr könnt, sie können",
            "Real travel use: 'Können Sie mir helfen?' — Can you help me? Universal shortcut!",
            "müssen (must/have to): Ich muss den Zug nehmen. 'Enikku train edukkanam!'",
            "müssen conjugation: ich muss, du musst, er/sie muss, wir müssen, ihr müsst, sie müssen",
            "dürfen (allowed to): Darf ich hier sitzen? — Permission logic. 'Njaan cheyyatte?'",
            "dürfen negative = FORBIDDEN: 'Hier darf man nicht rauchen.' — Strict NO logic!",
            "THE BIG RULE: Modal verb = position 2, main verb = END of sentence! Never forget!",
            "Examples: Ich KANN Deutsch SPRECHEN. / Ich MUSS jetzt GEHEN. / Du DARFST hier nicht PARKEN.",
            "Practice: Make sentences with each modal verb using travel vocabulary — set aakkaam!"
          ],
          keyVocabulary: ["können", "müssen", "dürfen"],
          learningObjectives: [
            "Conjugate können, müssen, and dürfen in the present tense",
            "Understand the sentence structure with modal verbs",
            "Use modal verbs in practical travel situations",
            "Know that dürfen + nicht = not allowed/forbidden"
          ],
          placeholderThumbnail: "/images/home_office.png",
          richContent: [
            {
              type: "table",
              title: "Modal Verbs: können, müssen, dürfen",
              headers: ["Pronoun", "können (can)", "müssen (must)", "dürfen (may)"],
              rows: [
                ["ich", "kann", "muss", "darf"],
                ["du", "kannst", "musst", "darfst"],
                ["er/sie/es", "kann", "muss", "darf"],
                ["wir", "können", "müssen", "dürfen"],
                ["ihr", "könnt", "müsst", "dürft"],
                ["sie/Sie", "können", "müssen", "dürfen"]
              ]
            },
            {
              type: "note",
              title: "The BIG Modal Verb Rule",
              variant: "warning",
              content: "Modal verb goes to position 2 (conjugated), main verb goes to the END (infinitive). Example: Ich KANN Deutsch SPRECHEN. Ich MUSS jetzt GEHEN. Du DARFST hier nicht PARKEN. Never put both verbs together!"
            },
            {
              type: "note",
              title: "dürfen + nicht = FORBIDDEN",
              variant: "info",
              content: "'nicht dürfen' means something is forbidden/not allowed. 'Hier darf man nicht rauchen' = Smoking is not allowed here. It's much stronger than 'kann nicht' (cannot). Think of it as a legal restriction!"
            }
          ]
        },
        {
          id: "v9-5-2",
          title: "wollen, sollen, mögen — More Power Verbs",
          duration: "10:00",
          description: "Complete your modal verb toolkit with wollen, sollen, and mögen/möchten. Ithokke combine cheythaal nee German-il anything parayan kazhiyum!",
          scriptOutline: [
            "wollen (want to): Ich will nach Berlin fahren — I want to go to Berlin. 'Enikku Berlin-il ponam!'",
            "wollen conjugation: ich will, du willst, er/sie will, wir wollen, ihr wollt, sie wollen",
            "WARNING: 'Ich will' can sound RUDE — like a demand! Kerala-yil 'enikku venam!' enna tone pole!",
            "sollen (should/supposed to): Ich soll mehr lernen — I should study more. Amma paranja pole!",
            "sollen conjugation: ich soll, du sollst, er/sie soll, wir sollen, ihr sollt, sie sollen",
            "Real use: 'Was soll ich machen?' — What should I do? When you're confused at the station!",
            "mögen (to like) and möchten (would like): Two related but different verbs!",
            "möchten is more polite than wollen — 'I would like' vs 'I want'. Restaurant-il always use möchten!",
            "'Ich möchte einen Kaffee, bitte.' vs 'Ich will einen Kaffee!' — feel the difference!",
            "All 6 modal verbs summary chart — oru page-il ellaathinum oru cheat sheet!",
            "Common mistake: Using 'wollen' when you should use 'möchten' — sounds like a toddler demanding candy!",
            "Practice sentences combining modal verbs with ALL travel vocabulary from this module"
          ],
          keyVocabulary: ["wollen", "sollen", "mögen", "möchten"],
          learningObjectives: [
            "Conjugate wollen, sollen, and mögen in the present tense",
            "Know when to use möchten instead of wollen for politeness",
            "Combine modal verbs with travel vocabulary",
            "Understand cultural implications of verb choice"
          ],
          placeholderThumbnail: "/images/home_office.png",
          richContent: [
            {
              type: "table",
              title: "Modal Verbs: wollen, sollen, mögen/möchten",
              headers: ["Pronoun", "wollen (want)", "sollen (should)", "möchten (would like)"],
              rows: [
                ["ich", "will", "soll", "möchte"],
                ["du", "willst", "sollst", "möchtest"],
                ["er/sie/es", "will", "soll", "möchte"],
                ["wir", "wollen", "sollen", "möchten"],
                ["ihr", "wollt", "sollt", "möchtet"],
                ["sie/Sie", "wollen", "sollen", "möchten"]
              ]
            },
            {
              type: "table",
              title: "wollen vs möchten — Politeness",
              headers: ["Situation", "Rude (wollen)", "Polite (möchten)"],
              rows: [
                ["Ordering coffee", "Ich will einen Kaffee!", "Ich möchte einen Kaffee, bitte."],
                ["At a restaurant", "Ich will die Rechnung!", "Ich möchte die Rechnung, bitte."],
                ["Asking to leave", "Ich will gehen!", "Ich möchte gehen."]
              ]
            },
            {
              type: "note",
              title: "möchten > wollen in Public!",
              variant: "warning",
              content: "'Ich will' sounds like a demand — like a child saying 'I WANT!' Always use 'Ich möchte' (I would like) in restaurants, shops, and with strangers. Save 'wollen' for casual situations with friends."
            }
          ]
        }
      ],
      exercises: [
        { id: "ex9-5-1", type: "multiple-choice", question: "What is the correct word order? 'I can speak German.'", options: ["Ich kann Deutsch sprechen.", "Ich Deutsch sprechen kann.", "Ich sprechen kann Deutsch.", "Ich kann sprechen Deutsch."], correctAnswer: "Ich kann Deutsch sprechen.", explanation: "With modal verbs, the modal goes in position 2 (conjugated) and the main verb (infinitive) goes to the END of the sentence.", xpReward: 15 },
        { id: "ex9-5-2", type: "fill-blank", question: "Ich ___ den Zug nehmen. (must)", options: ["muss", "kann", "darf", "will"], correctAnswer: "muss", explanation: "'müssen' means 'must/have to'. For 'ich', it becomes 'muss'. The main verb 'nehmen' goes to the end.", xpReward: 10 },
        { id: "ex9-5-3", type: "multiple-choice", question: "Which is the polite way to say 'I want a coffee'?", options: ["Ich möchte einen Kaffee.", "Ich will einen Kaffee.", "Ich muss einen Kaffee.", "Ich kann einen Kaffee."], correctAnswer: "Ich möchte einen Kaffee.", explanation: "'Ich möchte' (I would like) is much more polite than 'Ich will' (I want), which can sound demanding. Always use 'möchte' when ordering!", xpReward: 10 },
        { id: "ex9-5-4", type: "matching", question: "Five modal verbs run your whole German life. Match each one to the job it does:", options: ["können", "müssen", "dürfen", "wollen", "sollen"], correctAnswer: ["can / be able to", "must / have to", "may / be allowed to", "want to", "should / be supposed to"], explanation: "können (ability), müssen (necessity), dürfen (permission), wollen (desire), sollen (advice). Every one of them kicks its main verb to the end.", xpReward: 15 },
        { id: "ex9-5-5", type: "type-answer", question: "Crowded train, one free seat next to a stern-looking uncle. Ask permission: '___ ich hier sitzen?' Type the missing word (May):", correctAnswer: "Darf", explanation: "'Dürfen' = to be allowed to. 'Darf ich...?' is the polite permission-asker. 'Kann ich...?' also works but is more casual.", xpReward: 15 },
        { id: "ex9-5-6", type: "free-text", question: "The whole class is plotting an imaginary trip. Type it in German — 'We want to travel to Munich.' (wollen, nach):", correctAnswer: "Wir wollen nach München fahren", explanation: "wollen in position 2, fahren at the end. 'nach München' sits in the middle — destinations with nach need no article.", xpReward: 30 },
        { id: "ex9-5-7", type: "type-answer", question: "Amma's eternal advice, now in German: 'Du ___ mehr Deutsch lernen.' Type the missing word (should):", correctAnswer: "sollst", explanation: "'sollen' means 'should / be supposed to'. For 'du', it becomes 'sollst'. Amma-approved grammar.", xpReward: 15 },
        {
          id: "ex9-5-9",
          type: "dictation",
          question: "Kuttan's proudest sentence yet, delivered to the Hamburg cousin mid-call. Listen and type exactly what you hear.",
          correctAnswer: "Ich kann Deutsch sprechen",
          explanation: "Modal verb in position 2, main verb at the end — and the sentence every A1 learner earns the right to say.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-can-speak.mp3"
        },
        {
          id: "ex9-5-10",
          type: "free-text",
          question: "Chaya break is over and Frau Weber is watching the door. Type Kuttan's exit line in German — 'I must go now.' (müssen, jetzt):",
          correctAnswer: "Ich muss jetzt gehen",
          explanation: "'muss' holds slot 2, 'gehen' moves to the end — the modal bracket even applies to escaping the canteen.",
          xpReward: 30
        }
      ,
        {
          id: "ex9-5-prod-speaking",
          type: "speaking",
          question: "Ticket desk, modal verb test — say your plan aloud: 'Ich möchte eine Fahrkarte kaufen.'",
          questionGerman: "Sprechen Sie laut: 'Ich möchte eine Fahrkarte kaufen.'",
          correctAnswer: "Ich möchte eine Fahrkarte kaufen",
          explanation: "Modal in position 2, kaufen exiled to the end. If your sentence ends on the infinitive, you've got the modal pattern.",
          audioUrl: "/audio/exercises/ex9-5-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex9-5-spk2",
          type: "speaking",
          question: "Repair Kuttan's slip: bragging to the cousin, he says 'Ich kann sprechen Deutsch.' The infinitive goes LAST! Say it right: 'Ich kann Deutsch sprechen.'",
          questionGerman: "Sprechen Sie laut: 'Ich kann Deutsch sprechen.'",
          correctAnswer: "Ich kann Deutsch sprechen",
          explanation: "English order ('I can speak German') is the trap — German brackets it: kann … sprechen. Repair this one slip and every modal sentence you ever say improves.",
          audioUrl: "/audio/exercises/ex9-5-spk2-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab9-5-1", german: "können", english: "can / to be able to", malayalam: "കഴിയുക / സാധിക്കുക", pronunciation: "kuh-nen", example: "Ich kann Deutsch sprechen.", exampleTranslation: "I can speak German." },
        { id: "vocab9-5-2", german: "müssen", english: "must / to have to", malayalam: "വേണം / ചെയ്യണം", pronunciation: "mü-sen", example: "Ich muss jetzt gehen.", exampleTranslation: "I must go now." },
        { id: "vocab9-5-3", german: "dürfen", english: "may / to be allowed to", malayalam: "അനുവദിക്കുക", pronunciation: "dür-fen", example: "Darf ich hier rauchen?", exampleTranslation: "May I smoke here?" },
        { id: "vocab9-5-4", german: "wollen", english: "to want to", malayalam: "ആഗ്രഹിക്കുക", pronunciation: "voh-len", example: "Ich will nach Berlin fahren.", exampleTranslation: "I want to go to Berlin." },
        { id: "vocab9-5-5", german: "sollen", english: "should / to be supposed to", malayalam: "വേണ്ടതാണ്", pronunciation: "zoh-len", example: "Du sollst mehr lernen.", exampleTranslation: "You should study more." },
        { id: "vocab9-5-6", german: "mögen", english: "to like", malayalam: "ഇഷ്ടപ്പെടുക", pronunciation: "muh-gen", example: "Ich mag Schokolade.", exampleTranslation: "I like chocolate." },
        { id: "vocab9-5-7", german: "möchten", english: "would like to", malayalam: "ആഗ്രഹിക്കുന്നു (മര്യാദയോടെ)", pronunciation: "mökh-ten", example: "Ich möchte einen Tee, bitte.", exampleTranslation: "I would like a tea, please." },
        { id: "vocab9-5-8", german: "sprechen", english: "to speak", malayalam: "സംസാരിക്കുക", pronunciation: "shpre-khen", example: "Können Sie Englisch sprechen?", exampleTranslation: "Can you speak English?" },
        { id: "vocab9-5-9", german: "helfen", english: "to help", malayalam: "സഹായിക്കുക", pronunciation: "hel-fen", example: "Können Sie mir bitte helfen?", exampleTranslation: "Can you please help me?" },
        { id: "vocab9-5-10", german: "brauchen", english: "to need", malayalam: "ആവശ്യമുണ്ട്", pronunciation: "brow-khen", example: "Ich brauche eine Fahrkarte.", exampleTranslation: "I need a ticket." },
        { id: "vocab9-5-11", german: "fliegen", english: "to fly", malayalam: "പറക്കുക", pronunciation: "flee-gen", example: "Wir fliegen morgen nach Berlin.", exampleTranslation: "We fly to Berlin tomorrow." },
        { id: "vocab9-5-12", german: "finden", english: "to find", malayalam: "കണ്ടെത്തുക", pronunciation: "fin-den", example: "Ich kann den Bahnhof nicht finden.", exampleTranslation: "I cannot find the train station." }
      ]
    }
  ]
};
