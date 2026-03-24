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
  lessons: [
    // ========== LESSON 9-1: Transportation ==========
    {
      id: "9-1",
      title: "Transportation",
      titleGerman: "Verkehrsmittel",
      description: "Learn all the ways to get around in Germany — buses, trains, bikes, and more. KSRTC bus-il kayari parichayam ullavarkku German bus system piece of cake aanu! Plus, master 'mit + Dativ' for saying how you travel!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v9-1-1",
          title: "Getting Around in Germany",
          duration: "12:00",
          description: "An overview of transportation options in Germany — from city buses to the Autobahn. Kerala-yile auto-rickshaw-inu pakaram taxi, KSRTC-ku pakaram Deutsche Bahn!",
          scriptOutline: [
            "Opening: 'Germany-yil ethra easy aanu travel cheyyaan — let's find out! Kerala-yile KSRTC bus kazhinja best system ithaanu!'",
            "der Bus — city buses run like clockwork in Germany (no hanging from the door like KSRTC super-fast!)",
            "die Bahn / der Zug — trains are the backbone of German transport, just like trains in India but WAY more punctual (usually!)",
            "die Straßenbahn — trams in cities like Munich, Dresden, Berlin — imagine a bus on rails, machane!",
            "die U-Bahn vs die S-Bahn — underground vs suburban rail explained. U = Untergrund (underground), S = Stadtschnell (city-fast)",
            "das Flugzeug — domestic flights exist, but trains are often better! Kerala-yil Kochi to Trivandrum flight edukkunna pole — overkill sometimes!",
            "das Auto & die Autobahn — cars and the famous no-speed-limit highways. Auto-rickshaw alla, actual auto!",
            "das Fahrrad — the German love for cycling. Cycle lane separate aanu — no dodging buses like in Kerala!",
            "das Taxi — more expensive than our auto-rickshaw, but meter always works! No bargaining needed!",
            "das Motorrad — motorcycles on the Autobahn, not like our scooter in Kochi traffic!",
            "Key phrase: 'Ich fahre mit dem Bus' — introducing mit + Dativ. 'mit' always changes the article!",
            "KSRTC vs Deutsche Bahn — fun comparison: both have delays, but Germany apologizes for theirs!",
            "Quick practice: How do YOU get to school/work? 'Wie fährst du zur Schule / zur Arbeit?'"
          ],
          keyVocabulary: ["der Bus", "der Zug", "die U-Bahn", "das Fahrrad", "Ich fahre mit...", "das Taxi", "die Autobahn"],
          learningObjectives: [
            "Name all major forms of transportation in German",
            "Use 'Ich fahre mit...' to describe how you travel",
            "Understand the difference between U-Bahn and S-Bahn",
            "Compare German and Kerala transport systems for cultural context"
          ],
          placeholderThumbnail: "/images/thumbnails/transport-overview.jpg"
        },
        {
          id: "v9-1-2",
          title: "Public Transport System",
          duration: "10:00",
          description: "How Germany's public transport actually works — DB, BVG, MVV, and more. Kerala KSRTC-yude German version!",
          scriptOutline: [
            "Deutsche Bahn (DB) — the national railway company. India-yile Indian Railways pole, but privatized!",
            "City transport companies: BVG (Berlin), MVV (Munich), HVV (Hamburg) — each city has its own, like KSRTC vs BMTC vs BEST",
            "Zones and tickets — how the zone system works. Ernakulam to Fort Kochi = 1 zone type idea!",
            "Fahrkartenautomat — the ticket machine (don't panic! English language option undu!)",
            "Schwarzfahren — travelling without a ticket (60 euro fine! Athinu shesham nalla pillayaakum!)",
            "Apps to use: DB Navigator, local transport apps. Phone-il app install cheythal life easy!",
            "Kerala KSRTC vs German buses — a fun comparison. German bus-il conductor illa, but cameras undu!",
            "Tip: Always validate your ticket if there's a stamping machine! Stamp cheyyanam — illenki fine kitum!",
            "Bahncard 25/50 — discount cards for frequent travelers. Student aanel BahnCard 25 must-have aanu!",
            "9-Euro-Ticket / Deutschlandticket — all-in-one monthly passes. Oru ticket-il ella bus, train okke kayaraam!",
            "Night buses and trains — Nachtbus, Nachtzug. Late night party kazhinjaal engane veetil ponam?",
            "Accessibility: Barrierefreiheit — wheelchair access, lifts, low-floor buses. Germany cares about this!"
          ],
          keyVocabulary: ["Deutsche Bahn", "die Fahrkarte", "der Automat", "die Zone", "Schwarzfahren", "die Bahncard"],
          learningObjectives: [
            "Understand how German public transport is organized",
            "Know the major transport companies (DB, BVG, MVV)",
            "Navigate basic ticket purchasing",
            "Learn about discount passes and apps"
          ],
          placeholderThumbnail: "/images/thumbnails/public-transport.jpg"
        }
      ],
      exercises: [
        { id: "ex9-1-1", type: "multiple-choice", question: "How do you say 'I travel by train' in German?", options: ["Ich fahre mit dem Zug", "Ich gehe mit dem Zug", "Ich fahre mit den Zug", "Ich fahre in dem Zug"], correctAnswer: "Ich fahre mit dem Zug", explanation: "'mit' always takes the Dativ case. 'der Zug' becomes 'dem Zug' in Dativ. 'fahren' is used for vehicle travel, not 'gehen' (walking).", xpReward: 10 },
        { id: "ex9-1-2", type: "matching", question: "Match the German transport word to its English meaning:", options: ["die Straßenbahn", "die U-Bahn", "das Fahrrad", "das Flugzeug"], correctAnswer: ["tram", "subway/underground", "bicycle", "airplane"], xpReward: 15 },
        { id: "ex9-1-3", type: "fill-blank", question: "Ich fahre mit ___ Bus zur Arbeit. (the — Dativ)", options: ["dem", "der", "den", "das"], correctAnswer: "dem", explanation: "'der Bus' is masculine. In Dativ (after 'mit'), 'der' becomes 'dem'. So: mit dem Bus.", xpReward: 10 },
        { id: "ex9-1-4", type: "multiple-choice", question: "What is the difference between U-Bahn and S-Bahn?", options: ["U-Bahn is underground, S-Bahn is suburban/above-ground", "U-Bahn is faster than S-Bahn", "S-Bahn is underground, U-Bahn is above-ground", "There is no difference"], correctAnswer: "U-Bahn is underground, S-Bahn is suburban/above-ground", explanation: "U-Bahn (Untergrundbahn) runs mostly underground in city centers. S-Bahn (Stadtschnellbahn) connects the city with suburban areas and mostly runs above ground.", xpReward: 10 },
        { id: "ex9-1-5", type: "ordering", question: "Arrange to say 'I ride my bicycle to work':", options: ["Ich", "fahre", "mit", "dem", "Fahrrad", "zur Arbeit"], correctAnswer: ["Ich", "fahre", "mit", "dem", "Fahrrad", "zur Arbeit"], xpReward: 15 },
        { id: "ex9-1-6", type: "fill-blank", question: "Wir fahren mit ___ S-Bahn. (the — Dativ, feminine)", options: ["der", "dem", "die", "den"], correctAnswer: "der", explanation: "'die S-Bahn' is feminine. In Dativ, 'die' becomes 'der'. So: mit der S-Bahn.", xpReward: 10 },
        { id: "ex9-1-7", type: "multiple-choice", question: "What is 'Schwarzfahren' in German public transport?", options: ["Travelling without a valid ticket", "Travelling at night", "Travelling first class", "Travelling by car"], correctAnswer: "Travelling without a valid ticket", explanation: "'Schwarzfahren' literally means 'black-riding'. It refers to using public transport without a valid ticket. The fine is usually 60 euros — so always buy your ticket!", xpReward: 10 },
        { id: "ex9-1-8", type: "fill-blank", question: "Mein Bruder fährt mit ___ Motorrad. (the — Dativ, neuter)", options: ["dem", "der", "den", "das"], correctAnswer: "dem", explanation: "'das Motorrad' is neuter. In Dativ (after 'mit'), 'das' becomes 'dem'. So: mit dem Motorrad.", xpReward: 10 }
      ],
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
          placeholderThumbnail: "/images/thumbnails/buying-tickets.jpg"
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
          placeholderThumbnail: "/images/thumbnails/smart-ticketing.jpg"
        }
      ],
      exercises: [
        { id: "ex9-2-1", type: "fill-blank", question: "Eine Fahrkarte nach München, bitte. ___ . (round trip)", options: ["Hin und zurück", "Einfach", "Erste Klasse", "Zweite Klasse"], correctAnswer: "Hin und zurück", explanation: "'Hin und zurück' means round trip (literally 'there and back'). 'Einfach' means one-way.", xpReward: 10 },
        { id: "ex9-2-2", type: "multiple-choice", question: "What does 'Ermäßigung' mean?", options: ["Discount", "Platform", "Schedule", "Delay"], correctAnswer: "Discount", explanation: "'Ermäßigung' means discount or reduction. Students, seniors, and children often get an Ermäßigung.", xpReward: 10 },
        { id: "ex9-2-3", type: "ordering", question: "Arrange to ask: 'A ticket to Hamburg, please. Round trip.'", options: ["Eine", "Fahrkarte", "nach", "Hamburg,", "bitte.", "Hin und zurück."], correctAnswer: ["Eine", "Fahrkarte", "nach", "Hamburg,", "bitte.", "Hin und zurück."], xpReward: 15 },
        { id: "ex9-2-4", type: "multiple-choice", question: "Where can you buy tickets in Germany?", options: ["All of the above", "Am Schalter (at the counter)", "Am Automaten (at the machine)", "Online or via app"], correctAnswer: "All of the above", explanation: "In Germany, you can buy tickets at the counter (Schalter), from machines (Automat), or online through apps like DB Navigator.", xpReward: 10 },
        { id: "ex9-2-5", type: "matching", question: "Match the German travel term to its English meaning:", options: ["einfach", "hin und zurück", "der Fahrplan", "der Automat"], correctAnswer: ["one-way", "round trip", "schedule/timetable", "ticket machine"], xpReward: 15 },
        { id: "ex9-2-6", type: "fill-blank", question: "Gibt es eine ___ für Studenten? (discount)", options: ["Ermäßigung", "Fahrkarte", "Verspätung", "Abfahrt"], correctAnswer: "Ermäßigung", explanation: "'Ermäßigung' means discount. Students (Studenten) can often get reduced fares in Germany.", xpReward: 10 },
        { id: "ex9-2-7", type: "ordering", question: "Arrange: 'I would like a round-trip ticket to Berlin, second class.'", options: ["Ich", "möchte", "eine Fahrkarte", "nach Berlin,", "zweite Klasse,", "hin und zurück."], correctAnswer: ["Ich", "möchte", "eine Fahrkarte", "nach Berlin,", "zweite Klasse,", "hin und zurück."], xpReward: 15 },
        { id: "ex9-2-8", type: "multiple-choice", question: "What is the 'Deutschlandticket'?", options: ["A monthly pass for all local public transport in Germany", "A one-time ticket for tourists", "A first-class train ticket", "A flight ticket within Germany"], correctAnswer: "A monthly pass for all local public transport in Germany", explanation: "The Deutschlandticket is a monthly subscription that lets you use all local and regional public transport across Germany — buses, trams, U-Bahn, S-Bahn, and regional trains!", xpReward: 10 }
      ],
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
          placeholderThumbnail: "/images/thumbnails/asking-directions.jpg"
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
          placeholderThumbnail: "/images/thumbnails/giving-directions.jpg"
        }
      ],
      exercises: [
        { id: "ex9-3-1", type: "multiple-choice", question: "How do you ask 'Where is the train station?' in German?", options: ["Wo ist der Bahnhof?", "Was ist der Bahnhof?", "Wer ist der Bahnhof?", "Wie ist der Bahnhof?"], correctAnswer: "Wo ist der Bahnhof?", explanation: "'Wo' means 'where'. 'Wo ist...?' is the standard way to ask where something is located.", xpReward: 10 },
        { id: "ex9-3-2", type: "fill-blank", question: "Wie komme ich ___ Supermarkt? (to the — masculine Dativ)", options: ["zum", "zur", "zu dem", "bei dem"], correctAnswer: "zum", explanation: "'zu + dem' contracts to 'zum' for masculine and neuter nouns in Dativ. 'der Supermarkt' is masculine, so: zum Supermarkt.", xpReward: 10 },
        { id: "ex9-3-3", type: "matching", question: "Match the German direction word to its English meaning:", options: ["geradeaus", "links", "rechts", "die Kreuzung", "die Ampel"], correctAnswer: ["straight ahead", "left", "right", "intersection", "traffic light"], xpReward: 15 },
        { id: "ex9-3-4", type: "fill-blank", question: "Wie komme ich ___ Post? (to the — feminine Dativ)", options: ["zur", "zum", "zu der", "bei der"], correctAnswer: "zur", explanation: "'zu + der' contracts to 'zur' for feminine nouns in Dativ. 'die Post' is feminine, so: zur Post.", xpReward: 10 },
        { id: "ex9-3-5", type: "ordering", question: "Arrange the directions: 'Go straight, then left at the traffic light'", options: ["Gehen Sie", "geradeaus,", "dann", "links", "an der", "Ampel"], correctAnswer: ["Gehen Sie", "geradeaus,", "dann", "links", "an der", "Ampel"], xpReward: 15 },
        { id: "ex9-3-6", type: "multiple-choice", question: "What does 'gegenüber dem Supermarkt' mean?", options: ["Opposite the supermarket", "Next to the supermarket", "Behind the supermarket", "Inside the supermarket"], correctAnswer: "Opposite the supermarket", explanation: "'gegenüber' means 'opposite' or 'across from'. It takes the Dativ case.", xpReward: 10 },
        { id: "ex9-3-7", type: "multiple-choice", question: "You want to ask politely for help with directions. What do you say first?", options: ["Entschuldigung, können Sie mir helfen?", "Hilfe! Wo ist der Bahnhof?", "Hey, wo ist der Bahnhof?", "Ich brauche den Bahnhof!"], correctAnswer: "Entschuldigung, können Sie mir helfen?", explanation: "Starting with 'Entschuldigung' (excuse me) and asking politely with 'können Sie mir helfen?' (can you help me?) is the standard polite approach in Germany.", xpReward: 10 },
        { id: "ex9-3-8", type: "fill-blank", question: "Nehmen Sie die zweite Straße ___ . (on the right)", options: ["rechts", "links", "geradeaus", "zurück"], correctAnswer: "rechts", explanation: "'Nehmen Sie die zweite Straße rechts' means 'Take the second street on the right'. This is a very common direction pattern in German.", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab9-3-1", german: "geradeaus", english: "straight ahead", malayalam: "നേരെ", pronunciation: "ge-rah-de-ows", example: "Gehen Sie geradeaus.", exampleTranslation: "Go straight ahead." },
        { id: "vocab9-3-2", german: "links", english: "left", malayalam: "ഇടത്ത്", pronunciation: "links", example: "Biegen Sie links ab.", exampleTranslation: "Turn left." },
        { id: "vocab9-3-3", german: "rechts", english: "right", malayalam: "വലത്ത്", pronunciation: "rekhts", example: "Die Apotheke ist rechts.", exampleTranslation: "The pharmacy is on the right." },
        { id: "vocab9-3-4", german: "die Kreuzung", english: "intersection / crossroads", malayalam: "കവല", pronunciation: "kroy-tsoong", example: "An der Kreuzung gehen Sie rechts.", exampleTranslation: "At the intersection, go right." },
        { id: "vocab9-3-5", german: "die Ampel", english: "traffic light", malayalam: "ട്രാഫിക് ലൈറ്റ്", pronunciation: "ahm-pel", example: "Bei der Ampel links abbiegen.", exampleTranslation: "Turn left at the traffic light." },
        { id: "vocab9-3-6", german: "die Ecke", english: "corner", malayalam: "മൂല", pronunciation: "eh-ke", example: "Das Café ist um die Ecke.", exampleTranslation: "The cafe is around the corner." },
        { id: "vocab9-3-7", german: "gegenüber", english: "opposite / across from", malayalam: "എതിർവശം", pronunciation: "ge-gen-ü-ber", example: "Die Bank ist gegenüber dem Rathaus.", exampleTranslation: "The bank is opposite the town hall." },
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
          placeholderThumbnail: "/images/thumbnails/airport-station.jpg"
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
          placeholderThumbnail: "/images/thumbnails/train-station.jpg"
        }
      ],
      exercises: [
        { id: "ex9-4-1", type: "multiple-choice", question: "How do you ask 'Which platform does the train to Berlin leave from?'", options: ["Auf welchem Gleis fährt der Zug nach Berlin?", "Wo ist der Zug nach Berlin?", "Wann fährt der Zug nach Berlin?", "Welcher Zug fährt nach Berlin?"], correctAnswer: "Auf welchem Gleis fährt der Zug nach Berlin?", explanation: "'Auf welchem Gleis' means 'on which platform'. 'Gleis' is the German word for platform/track at a train station.", xpReward: 10 },
        { id: "ex9-4-2", type: "matching", question: "Match the German airport/station word to its English meaning:", options: ["die Passkontrolle", "der Zoll", "das Gepäck", "das Gleis", "die Verspätung"], correctAnswer: ["passport control", "customs", "luggage", "platform/track", "delay"], xpReward: 15 },
        { id: "ex9-4-3", type: "multiple-choice", question: "What does 'der Abflug' mean?", options: ["Departure (flight)", "Arrival", "Gate", "Luggage"], correctAnswer: "Departure (flight)", explanation: "'der Abflug' means departure (for flights). 'Ab' means 'away/off' and 'Flug' means 'flight'. For trains, 'die Abfahrt' is used.", xpReward: 10 },
        { id: "ex9-4-4", type: "fill-blank", question: "Der Zug hat 20 Minuten ___ . (delay)", options: ["Verspätung", "Ankunft", "Abfahrt", "Gepäck"], correctAnswer: "Verspätung", explanation: "'Verspätung' means delay. German trains having Verspätung is almost a national joke! 'Der Zug hat ... Minuten Verspätung' = The train is ... minutes late.", xpReward: 10 },
        { id: "ex9-4-5", type: "ordering", question: "Arrange: 'The flight arrives at 3 o'clock'", options: ["Der Flug", "kommt", "um", "drei Uhr", "an"], correctAnswer: ["Der Flug", "kommt", "um", "drei Uhr", "an"], xpReward: 15 },
        { id: "ex9-4-6", type: "multiple-choice", question: "You see a sign that says 'Gepäckausgabe'. What does it mean?", options: ["Baggage claim", "Check-in counter", "Security check", "Passport control"], correctAnswer: "Baggage claim", explanation: "'Gepäckausgabe' = Gepäck (luggage) + Ausgabe (output/dispensing). It's where you collect your luggage after a flight.", xpReward: 10 },
        { id: "ex9-4-7", type: "fill-blank", question: "Ihren ___ , bitte. (passport)", options: ["Reisepass", "Fahrkarte", "Koffer", "Gepäck"], correctAnswer: "Reisepass", explanation: "'der Reisepass' means passport. At passport control, the officer will say 'Ihren Reisepass, bitte' — your passport, please.", xpReward: 10 },
        { id: "ex9-4-8", type: "ordering", question: "Arrange: 'I need to change trains in Frankfurt'", options: ["Ich", "muss", "in Frankfurt", "umsteigen"], correctAnswer: ["Ich", "muss", "in Frankfurt", "umsteigen"], xpReward: 15 }
      ],
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
      videos: [
        {
          id: "v9-5-1",
          title: "können, müssen, dürfen — The Power Verbs",
          duration: "12:00",
          description: "Master the first three modal verbs that you'll use every single day. Ee moonu verbs arinjaal German-il half the job done!",
          scriptOutline: [
            "Opening: 'German-il oru super power undu — modal verbs! Ivaru illathe sentences illa! Kerala-yil masala illathe curry pole — tasteless!'",
            "können (can/able to): Ich kann Deutsch sprechen — I can speak German. 'Enikku German samsaarikkan kazhiyum!'",
            "können conjugation: ich kann, du kannst, er/sie kann, wir können, ihr könnt, sie können — each one different!",
            "Real travel use: 'Können Sie mir helfen?' — Can you help me? Most useful polite phrase!",
            "müssen (must/have to): Ich muss den Zug nehmen — I must take the train. 'Enikku train edukkanam!'",
            "müssen conjugation: ich muss, du musst, er/sie muss, wir müssen, ihr müsst, sie müssen",
            "Real travel use: 'Ich muss um 8 Uhr am Flughafen sein.' — I must be at the airport at 8.",
            "dürfen (may/allowed to): Darf ich hier sitzen? — May I sit here? Permission chodikunnu!",
            "dürfen conjugation: ich darf, du darfst, er/sie darf, wir dürfen, ihr dürft, sie dürfen",
            "dürfen negative = FORBIDDEN: 'Hier darf man nicht rauchen.' — Smoking not allowed here!",
            "THE BIG RULE: Modal verb = position 2, main verb = END of sentence! Ithu maarunna alla, always same!",
            "Examples: Ich KANN Deutsch SPRECHEN. / Ich MUSS jetzt GEHEN. / Du DARFST hier nicht PARKEN.",
            "Kerala comparison: 'Enikku ponam' = 'Ich muss gehen' — same urgency, different language!",
            "Practice: Make sentences with each modal verb using travel vocabulary"
          ],
          keyVocabulary: ["können", "müssen", "dürfen"],
          learningObjectives: [
            "Conjugate können, müssen, and dürfen in the present tense",
            "Understand the sentence structure with modal verbs",
            "Use modal verbs in practical travel situations",
            "Know that dürfen + nicht = not allowed/forbidden"
          ],
          placeholderThumbnail: "/images/thumbnails/modal-verbs-1.jpg"
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
          placeholderThumbnail: "/images/thumbnails/modal-verbs-2.jpg"
        }
      ],
      exercises: [
        { id: "ex9-5-1", type: "multiple-choice", question: "What is the correct word order? 'I can speak German.'", options: ["Ich kann Deutsch sprechen.", "Ich Deutsch sprechen kann.", "Ich sprechen kann Deutsch.", "Ich kann sprechen Deutsch."], correctAnswer: "Ich kann Deutsch sprechen.", explanation: "With modal verbs, the modal goes in position 2 (conjugated) and the main verb (infinitive) goes to the END of the sentence.", xpReward: 15 },
        { id: "ex9-5-2", type: "fill-blank", question: "Ich ___ den Zug nehmen. (must)", options: ["muss", "kann", "darf", "will"], correctAnswer: "muss", explanation: "'müssen' means 'must/have to'. For 'ich', it becomes 'muss'. The main verb 'nehmen' goes to the end.", xpReward: 10 },
        { id: "ex9-5-3", type: "multiple-choice", question: "Which is the polite way to say 'I want a coffee'?", options: ["Ich möchte einen Kaffee.", "Ich will einen Kaffee.", "Ich muss einen Kaffee.", "Ich kann einen Kaffee."], correctAnswer: "Ich möchte einen Kaffee.", explanation: "'Ich möchte' (I would like) is much more polite than 'Ich will' (I want), which can sound demanding. Always use 'möchte' when ordering!", xpReward: 10 },
        { id: "ex9-5-4", type: "matching", question: "Match the modal verb to its meaning:", options: ["können", "müssen", "dürfen", "wollen", "sollen"], correctAnswer: ["can / be able to", "must / have to", "may / be allowed to", "want to", "should / be supposed to"], xpReward: 15 },
        { id: "ex9-5-5", type: "fill-blank", question: "___ ich hier sitzen? (May I)", options: ["Darf", "Kann", "Muss", "Will"], correctAnswer: "Darf", explanation: "'Dürfen' means 'to be allowed to / may'. 'Darf ich...?' is the polite way to ask permission. 'Kann ich...?' (Can I) is also possible but less formal.", xpReward: 10 },
        { id: "ex9-5-6", type: "ordering", question: "Arrange: 'We want to travel to Munich'", options: ["Wir", "wollen", "nach", "München", "fahren"], correctAnswer: ["Wir", "wollen", "nach", "München", "fahren"], xpReward: 15 },
        { id: "ex9-5-7", type: "fill-blank", question: "Du ___ mehr Deutsch lernen. (should)", options: ["sollst", "willst", "kannst", "darfst"], correctAnswer: "sollst", explanation: "'sollen' means 'should / be supposed to'. For 'du', it becomes 'sollst'.", xpReward: 10 },
        { id: "ex9-5-8", type: "multiple-choice", question: "What happens to the main verb in a sentence with a modal verb?", options: ["It goes to the end in infinitive form", "It stays next to the modal verb", "It gets conjugated too", "It disappears"], correctAnswer: "It goes to the end in infinitive form", explanation: "In German, when you use a modal verb, the main verb moves to the END of the sentence in its infinitive (unconjugated) form. E.g., Ich KANN gut SCHWIMMEN.", xpReward: 15 }
      ],
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
