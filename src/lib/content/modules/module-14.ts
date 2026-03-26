import type { Module } from '../types';

export const MODULE_14: Module = {
  id: 14,
  title: "Formal Life in Germany",
  titleGerman: "Offizielles Leben",
  description: "Navigate German bureaucracy — forms, offices, banks, and formal letters! India-yile office pani pole thanne, but with more rules and appointments!",
  icon: "📝",
  color: "#dc2626",
  totalHours: 10,
  unlockRequirement: "Complete Module 13",
  learningTips: [
    "Fill out a practice Anmeldeformular (registration form) in German — you'll do this for real on day one in Germany.",
    "German bureaucracy runs on paper. Learn key form words: Vorname, Nachname, Geburtsdatum, Unterschrift.",
    "Formal letters follow a strict format. Memorize: Sehr geehrte... → body → Mit freundlichen Grüßen.",
  ],
  lessons: [
    // =========================================================
    // LESSON 14-1: Filling Out Forms
    // =========================================================
    {
      id: "14-1",
      title: "Filling Out Forms",
      titleGerman: "Formulare ausfüllen",
      description: "Master the Anmeldung and learn to fill out German forms — the FIRST thing you'll do when you arrive in Germany! India-yile ration card form pole, but German style!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v14-1-1",
          title: "The Anmeldung - Registering in Germany",
          duration: "12:00",
          description: "Everything you need to know about Germany's mandatory registration process — crucial for every new arrival! Ithu ille enkil onnum nadakkilla!",
          scriptOutline: [
            "Opening: 'Germany vannaal first cheyyenda karyam — Anmeldung! Without this, nothing else works! Bank account venda? Anmeldung venam. Phone contract venda? Anmeldung venam!'",
            "What is Anmeldung? Mandatory address registration within 14 days of moving — 14 days machaa, not 14 months!",
            "Where: Bürgeramt or Einwohnermeldeamt (citizens' registration office) — think of it like the Panchayat office, but super organized",
            "You need: Passport, rental contract (Mietvertrag), Wohnungsgeberbestätigung (landlord confirmation) — landlord-nte oru confirmation letter venam",
            "The form: Anmeldeformular — let's go through it field by field, oru form field-um skip cheyyanda!",
            "Actual form walkthrough: Vorname, Nachname, Geburtsdatum, Geburtsort, Staatsangehörigkeit, Familienstand, Religionszugehörigkeit",
            "Date format WARNING: DD.MM.YYYY — India-yile format pole thanne, but with dots! 15.03.1998 annenkil correct, 03/15/1998 ennaal WRONG!",
            "Why it matters: Bank account, tax ID (Steuer-ID), insurance — all need your Anmeldung! Ithu basically your golden ticket in Germany!",
            "Kerala connection: India-yil address proof-nu Aadhaar card undo? Germany-yil Meldebescheinigung — same level of importance, maybe even more!",
            "Pro tip: Book your Termin (appointment) online — walk-ins can mean hours of waiting. Collectorate-il queue nilkkunna experience venda enkil, Termin book cheyyuu!",
            "What you get: Meldebescheinigung (registration certificate) — ithu oru treasure pole sookshikkanam!",
            "Common mistakes: Wrong date format, forgetting Wohnungsgeberbestätigung, not bringing passport ORIGINAL"
          ],
          keyVocabulary: ["Anmeldung", "Bürgeramt", "Mietvertrag", "Meldebescheinigung", "Termin", "Wohnungsgeberbestätigung", "Steuer-ID"],
          learningObjectives: [
            "Understand the Anmeldung process and its importance",
            "Know what documents you need for registration",
            "Navigate the registration office confidently",
            "Avoid common mistakes that delay registration"
          ],
          placeholderThumbnail: "/images/thumbnails/anmeldung.jpg"
        },
        {
          id: "v14-1-2",
          title: "Common Form Fields — Every Line Explained",
          duration: "14:00",
          description: "Learn to read and fill out German official forms — every field explained with Indian context. Oru German form kandaal pedi venda!",
          scriptOutline: [
            "Opening: 'German forms can look scary — angane oru 3-page form kandaal pedi thonnum! But once you know the words, it's just fill in the blanks!'",
            "Vorname — first name (your given name). India-yil first name ennu parayunnathu thanne — Arun, Priya, Deepak",
            "Nachname / Familienname — surname / family name — Nair, Menon, Thomas, Pillai",
            "Geburtsdatum — date of birth (format: TT.MM.JJJJ — day.month.year!) — TT = Tag (day), MM = Monat (month), JJJJ = Jahr (year)",
            "Geburtsort — place of birth: write your city, e.g., Kochi, Thiruvananthapuram, Kozhikode",
            "Staatsangehörigkeit — nationality: Indisch — ithu easy aanu, always 'Indisch'!",
            "Familienstand — marital status: ledig (single), verheiratet (married), geschieden (divorced), verwitwet (widowed)",
            "Religionszugehörigkeit — religious affiliation: This is OPTIONAL but they ask! Hindu, Muslimisch, Christlich, or konfessionslos (no religion)",
            "Adresse — address: Straße (street), Hausnummer (house number) — Germany-yil house number ALWAYS comes AFTER street name!",
            "PLZ — Postleitzahl (postal code, like PIN code) — 5 digits, e.g., 10115 for Berlin",
            "Ort — city/town name, e.g., Berlin, München, Hamburg",
            "Telefonnummer — phone number: include country code if needed",
            "E-Mail-Adresse — email address: Germans LOVE email for official communication",
            "Unterschrift — signature: Sign as in your passport! Passport-il sign cheythathu pole thanne!",
            "Common mistake: Writing date in wrong format — it's DD.MM.YYYY in Germany, not MM/DD/YYYY! American format follow cheythaal form reject aakum!",
            "ACTUAL FORM EXAMPLE: Let's fill out a sample Anmeldeformular together for our friend Arun Nair from Kochi"
          ],
          keyVocabulary: ["Vorname", "Nachname", "Geburtsdatum", "Geburtsort", "Staatsangehörigkeit", "Familienstand", "PLZ", "Unterschrift", "Religionszugehörigkeit", "Hausnummer"],
          learningObjectives: [
            "Read and understand all common German form fields",
            "Fill out forms correctly with your personal information",
            "Know the German date format and address format",
            "Avoid format errors that cause form rejection"
          ],
          placeholderThumbnail: "/images/thumbnails/form-fields.jpg"
        }
      ],
      exercises: [
        {
          id: "ex14-1-1",
          type: "matching",
          question: "Match the German form field to its English meaning:",
          options: ["Vorname", "Nachname", "Geburtsdatum", "Geburtsort", "Familienstand"],
          correctAnswer: ["first name", "surname", "date of birth", "place of birth", "marital status"],
          xpReward: 15
        },
        {
          id: "ex14-1-2",
          type: "multiple-choice",
          question: "What is the correct German date format for March 15, 1998?",
          options: ["15.03.1998", "03/15/1998", "1998-03-15", "15-March-1998"],
          correctAnswer: "15.03.1998",
          explanation: "Germany uses TT.MM.JJJJ (day.month.year) with dots as separators.",
          xpReward: 10
        },
        {
          id: "ex14-1-3",
          type: "fill-blank",
          question: "Complete: Meine _____ ist Indisch. (My nationality is Indian.)",
          options: ["Staatsangehörigkeit", "Familienstand", "Geburtsdatum", "Adresse"],
          correctAnswer: "Staatsangehörigkeit",
          explanation: "Staatsangehörigkeit = nationality. For Indians: Indisch.",
          xpReward: 10
        },
        {
          id: "ex14-1-4",
          type: "multiple-choice",
          question: "What is 'Anmeldung'?",
          options: ["Mandatory address registration", "A job application", "A bank account opening", "A visa application"],
          correctAnswer: "Mandatory address registration",
          explanation: "Anmeldung is the mandatory registration of your address — you must do it within 14 days of moving to a new city in Germany.",
          xpReward: 10
        },
        {
          id: "ex14-1-5",
          type: "multiple-choice",
          question: "If you are not married, what do you write for 'Familienstand'?",
          options: ["ledig", "verheiratet", "geschieden", "verwitwet"],
          correctAnswer: "ledig",
          explanation: "ledig = single/unmarried. verheiratet = married, geschieden = divorced, verwitwet = widowed.",
          xpReward: 10
        },
        {
          id: "ex14-1-6",
          type: "fill-blank",
          question: "Complete: Die _____ ist 5 Ziffern lang. (The postal code is 5 digits long.) [abbreviation]",
          options: ["PLZ", "DOB", "PIN", "ZIP"],
          correctAnswer: "PLZ",
          explanation: "PLZ = Postleitzahl (postal code). German PLZ codes are 5 digits, e.g., 10115 for Berlin Mitte.",
          xpReward: 10
        },
        {
          id: "ex14-1-7",
          type: "ordering",
          question: "Put these Anmeldung steps in the correct order:",
          options: ["Receive your Meldebescheinigung", "Book a Termin online at the Bürgeramt", "Fill out the Anmeldeformular", "Collect documents: passport, Mietvertrag, Wohnungsgeberbestätigung", "Go to your appointment at the Bürgeramt"],
          correctAnswer: ["Book a Termin online at the Bürgeramt", "Collect documents: passport, Mietvertrag, Wohnungsgeberbestätigung", "Fill out the Anmeldeformular", "Go to your appointment at the Bürgeramt", "Receive your Meldebescheinigung"],
          xpReward: 20
        },
        {
          id: "ex14-1-8",
          type: "matching",
          question: "Match these address-related German terms to their English meaning:",
          options: ["die Straße", "die Hausnummer", "der Ort", "die Postleitzahl", "die Unterschrift"],
          correctAnswer: ["street", "house number", "city / town", "postal code", "signature"],
          xpReward: 15
        }
      ],
      vocabulary: [
        { id: "vocab14-1-1", german: "die Anmeldung", english: "registration", malayalam: "രജിസ്ട്രേഷൻ", pronunciation: "an-mel-doong", example: "Ich muss die Anmeldung machen.", exampleTranslation: "I must do the registration." },
        { id: "vocab14-1-2", german: "der Vorname", english: "first name", malayalam: "പേര് (ആദ്യനാമം)", pronunciation: "for-nah-me", example: "Mein Vorname ist Arun.", exampleTranslation: "My first name is Arun." },
        { id: "vocab14-1-3", german: "der Nachname", english: "surname / last name", malayalam: "കുടുംബപ്പേര്", pronunciation: "nahkh-nah-me", example: "Mein Nachname ist Nair.", exampleTranslation: "My surname is Nair." },
        { id: "vocab14-1-4", german: "das Geburtsdatum", english: "date of birth", malayalam: "ജനനത്തീയതി", pronunciation: "ge-burts-dah-tum", example: "Mein Geburtsdatum ist der 10. Mai 1998.", exampleTranslation: "My date of birth is May 10, 1998." },
        { id: "vocab14-1-5", german: "der Geburtsort", english: "place of birth", malayalam: "ജന്മസ്ഥലം", pronunciation: "ge-burts-ort", example: "Mein Geburtsort ist Kochi, Indien.", exampleTranslation: "My place of birth is Kochi, India." },
        { id: "vocab14-1-6", german: "die Staatsangehörigkeit", english: "nationality", malayalam: "ദേശീയത", pronunciation: "shtahts-an-ge-hu-rikh-kyte", example: "Meine Staatsangehörigkeit ist indisch.", exampleTranslation: "My nationality is Indian." },
        { id: "vocab14-1-7", german: "der Familienstand", english: "marital status", malayalam: "വൈവാഹിക നില", pronunciation: "fa-mee-lee-en-shtant", example: "Familienstand: ledig.", exampleTranslation: "Marital status: single." },
        { id: "vocab14-1-8", german: "die Adresse", english: "address", malayalam: "വിലാസം", pronunciation: "a-dress-e", example: "Meine Adresse ist Berliner Straße 5.", exampleTranslation: "My address is Berliner Straße 5." },
        { id: "vocab14-1-9", german: "die Postleitzahl (PLZ)", english: "postal code", malayalam: "പോസ്റ്റൽ കോഡ്", pronunciation: "post-lyte-tsahl", example: "Die PLZ von Berlin Mitte ist 10115.", exampleTranslation: "The postal code of Berlin Mitte is 10115." },
        { id: "vocab14-1-10", german: "die Unterschrift", english: "signature", malayalam: "ഒപ്പ്", pronunciation: "oon-ter-shrift", example: "Bitte hier Ihre Unterschrift.", exampleTranslation: "Please your signature here." }
      ]
    },

    // =========================================================
    // LESSON 14-2: At the Office
    // =========================================================
    {
      id: "14-2",
      title: "At the Office",
      titleGerman: "Auf dem Amt",
      description: "Navigate German government offices — Ausländerbehörde, Rathaus, and more. Survive the Bürokratie! Collectorate-il poi queue nilkkunna experience undo? Ithu athinekkal organized aanu, but equally intense!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v14-2-1",
          title: "Ausländerbehörde & Rathaus — Know Your Offices",
          duration: "12:00",
          description: "Know your way around the key German government offices — where to go for what. Ethu office-il pokanam ennullathu ariyaathe nadakkanda!",
          scriptOutline: [
            "Opening: 'German bureaucracy is legendary — but ithu survive cheyyaam if you know the vocab! India-yile Collectorate, Taluk Office, Village Office — allemokke Germany-yilum und, but different names-il!'",
            "die Ausländerbehörde — the foreigners office: Your main office for visa & residence permit. India-yile FRRO (Foreigners Regional Registration Office) pole — but way more powerful!",
            "das Rathaus — city hall: For general city administration matters. Nammude Municipal Corporation office pole!",
            "das Bürgeramt — citizens' office: For Anmeldung, ID cards, and certificates. Village office-nte German version ennoru vishayam!",
            "das Einwohnermeldeamt — residents' registration office: Sometimes separate from Bürgeramt",
            "das Finanzamt — tax office: Where you get your Steuer-ID and deal with taxes",
            "Key phrase: 'Ich brauche einen Termin' — I need an appointment. Ithu ALWAYS parayan pattanam!",
            "Key phrase: 'Ich habe einen Termin um 10 Uhr' — I have an appointment at 10 o'clock",
            "Always book online! Walk-in waits can be 3-4 hours. Berlin-il Bürgeramt appointment kittan 2 weeks munpe book cheyyanam!",
            "What to bring: Passport, Anmeldung confirmation, photos, application form — oru document maranaal appointment waste aakum!",
            "Kerala comparison: India-yil Collectorate-il poi queue nilkkunna experience undo? Germany-yilum same feeling, but appointments und!",
            "Pro tip: Be early, be polite, have ALL documents ready. Germans value Pünktlichkeit (punctuality)! 5 minutes early is ON TIME!"
          ],
          keyVocabulary: ["Ausländerbehörde", "Rathaus", "Bürgeramt", "Termin", "Unterlagen", "Finanzamt", "Pünktlichkeit"],
          learningObjectives: [
            "Know which office to visit for different needs",
            "Make appointments and communicate basic needs",
            "Prepare properly for office visits",
            "Understand the importance of punctuality in German bureaucracy"
          ],
          placeholderThumbnail: "/images/thumbnails/german-offices.jpg"
        },
        {
          id: "v14-2-2",
          title: "Getting Official Documents — Your Paper Trail",
          duration: "12:00",
          description: "Learn the vocabulary for residence permits, IDs, and other essential documents in Germany. Documents illathe Germany-yil onnum nadakkilla!",
          scriptOutline: [
            "Opening: 'Documents, documents, documents — Germany runs on paper! India-yil paperwork valiya karyam aanenkil, Germany-yil athinekkal vallya karyam aanu! Let's learn what you need.'",
            "die Aufenthaltserlaubnis — residence permit: Your most important document after passport. India-yil visa sticker pole — but this is a separate card!",
            "Types: Aufenthaltserlaubnis (temporary), Niederlassungserlaubnis (permanent), Blaue Karte EU (Blue Card)",
            "der Reisepass — passport: Always keep it valid! Expire aayaal BIG problem!",
            "der Personalausweis — ID card (for German/EU citizens only, not for us!)",
            "der Ausweis — general ID — 'Ihren Ausweis bitte' ennu kelpikkunnathu very common aanu offices-il",
            "die Unterlagen — documents/paperwork: 'Bringen Sie bitte alle Unterlagen mit' — ALWAYS bring everything!",
            "das Formular — form: 'Bitte füllen Sie das Formular aus' — form fill cheyyaan parayan 100% sure!",
            "die Beglaubigung — certified copy / notarization: Some documents need to be beglaubigt (certified)",
            "der Antrag — application: 'Ich möchte einen Antrag stellen' = I'd like to submit an application",
            "Practice dialogue: At the Ausländerbehörde asking about your Aufenthaltserlaubnis — 'Guten Tag, ich habe einen Termin. Ich möchte meine Aufenthaltserlaubnis verlängern.'",
            "Key phrase: 'Ich möchte meine Aufenthaltserlaubnis verlängern' — I want to extend my residence permit",
            "Pro tip: ALWAYS keep copies of everything. Germany-yil paper copies venam, digital copy mathram poraa!"
          ],
          keyVocabulary: ["Aufenthaltserlaubnis", "Reisepass", "Ausweis", "Unterlagen", "Formular", "Beglaubigung", "Antrag", "Niederlassungserlaubnis"],
          learningObjectives: [
            "Know the names of important official documents",
            "Understand requests from office staff",
            "Ask about document status and requirements",
            "Handle basic interactions at the Ausländerbehörde"
          ],
          placeholderThumbnail: "/images/thumbnails/documents.jpg"
        }
      ],
      exercises: [
        {
          id: "ex14-2-1",
          type: "multiple-choice",
          question: "Where do you go to get your residence permit (Aufenthaltserlaubnis)?",
          options: ["Ausländerbehörde", "Rathaus", "Supermarkt", "Bahnhof"],
          correctAnswer: "Ausländerbehörde",
          explanation: "The Ausländerbehörde (foreigners office) handles all visa and residence permit matters.",
          xpReward: 10
        },
        {
          id: "ex14-2-2",
          type: "fill-blank",
          question: "Complete: Ich brauche einen _____ bei der Ausländerbehörde. (I need an appointment...)",
          options: ["Termin", "Ausweis", "Formular", "Brief"],
          correctAnswer: "Termin",
          explanation: "Termin = appointment. Always book a Termin before visiting German offices!",
          xpReward: 10
        },
        {
          id: "ex14-2-3",
          type: "matching",
          question: "Match the German office to its function:",
          options: ["Ausländerbehörde", "Bürgeramt", "Rathaus", "Finanzamt"],
          correctAnswer: ["residence permits for foreigners", "address registration & ID cards", "general city administration", "taxes & Steuer-ID"],
          xpReward: 15
        },
        {
          id: "ex14-2-4",
          type: "multiple-choice",
          question: "What does 'Unterlagen' mean?",
          options: ["documents / paperwork", "office hours", "appointment", "signature"],
          correctAnswer: "documents / paperwork",
          explanation: "Unterlagen = documents/paperwork. 'Bringen Sie Ihre Unterlagen mit' means 'Bring your documents along'.",
          xpReward: 10
        },
        {
          id: "ex14-2-5",
          type: "fill-blank",
          question: "Complete: Bitte füllen Sie das _____ aus. (Please fill out the form.)",
          options: ["Formular", "Termin", "Ausweis", "Konto"],
          correctAnswer: "Formular",
          explanation: "Formular = form. 'ausfüllen' = to fill out.",
          xpReward: 10
        },
        {
          id: "ex14-2-6",
          type: "ordering",
          question: "Put these steps in the correct order for visiting the Ausländerbehörde:",
          options: ["Get your residence permit", "Collect all required documents", "Go to your appointment on time", "Book a Termin online"],
          correctAnswer: ["Book a Termin online", "Collect all required documents", "Go to your appointment on time", "Get your residence permit"],
          xpReward: 20
        },
        {
          id: "ex14-2-7",
          type: "multiple-choice",
          question: "What is a 'Beglaubigung'?",
          options: ["A certified copy / notarization", "A bank statement", "An appointment booking", "A visa application"],
          correctAnswer: "A certified copy / notarization",
          explanation: "Beglaubigung = certified copy / notarization. Some German offices require beglaubigte Kopien (certified copies) of your documents.",
          xpReward: 10
        },
        {
          id: "ex14-2-8",
          type: "fill-blank",
          question: "Complete: Ich möchte einen _____ stellen. (I'd like to submit an application.)",
          options: ["Antrag", "Termin", "Ausweis", "Brief"],
          correctAnswer: "Antrag",
          explanation: "Antrag = application. 'Einen Antrag stellen' = to submit/file an application. Very common phrase at German offices!",
          xpReward: 10
        }
      ],
      vocabulary: [
        { id: "vocab14-2-1", german: "die Ausländerbehörde", english: "foreigners office / immigration office", malayalam: "വിദേശ കാര്യാലയം", pronunciation: "ows-len-der-be-hur-de", example: "Ich habe einen Termin bei der Ausländerbehörde.", exampleTranslation: "I have an appointment at the foreigners office." },
        { id: "vocab14-2-2", german: "das Rathaus", english: "city hall / town hall", malayalam: "നഗരസഭാ ഹാൾ", pronunciation: "raht-hows", example: "Das Rathaus ist am Marktplatz.", exampleTranslation: "The city hall is at the market square." },
        { id: "vocab14-2-3", german: "das Bürgeramt", english: "citizens' office", malayalam: "പൗര കാര്യാലയം", pronunciation: "byr-ger-amt", example: "Im Bürgeramt kann man die Anmeldung machen.", exampleTranslation: "You can do the registration at the citizens' office." },
        { id: "vocab14-2-4", german: "die Aufenthaltserlaubnis", english: "residence permit", malayalam: "താമസ അനുമതി", pronunciation: "owf-ent-halts-er-lowb-nis", example: "Meine Aufenthaltserlaubnis ist zwei Jahre gültig.", exampleTranslation: "My residence permit is valid for two years." },
        { id: "vocab14-2-5", german: "der Termin", english: "appointment", malayalam: "അപ്പോയിന്റ്മെന്റ്", pronunciation: "ter-meen", example: "Ich brauche einen Termin.", exampleTranslation: "I need an appointment." },
        { id: "vocab14-2-6", german: "die Unterlagen", english: "documents / paperwork", malayalam: "രേഖകൾ", pronunciation: "oon-ter-lah-gen", example: "Bringen Sie bitte alle Unterlagen mit.", exampleTranslation: "Please bring all documents along." },
        { id: "vocab14-2-7", german: "der Ausweis", english: "ID card / identification", malayalam: "തിരിച്ചറിയൽ കാർഡ്", pronunciation: "ows-vyce", example: "Kann ich Ihren Ausweis sehen?", exampleTranslation: "Can I see your ID?" },
        { id: "vocab14-2-8", german: "das Formular", english: "form (document)", malayalam: "ഫോം", pronunciation: "for-moo-lahr", example: "Bitte füllen Sie das Formular aus.", exampleTranslation: "Please fill out the form." },
        { id: "vocab14-2-9", german: "der Antrag", english: "application / request", malayalam: "അപേക്ഷ", pronunciation: "an-trahk", example: "Ich möchte einen Antrag auf Aufenthaltserlaubnis stellen.", exampleTranslation: "I'd like to submit an application for a residence permit." },
        { id: "vocab14-2-10", german: "die Beglaubigung", english: "certified copy / notarization", malayalam: "സാക്ഷ്യപ്പെടുത്തൽ", pronunciation: "be-glow-bi-goong", example: "Ich brauche eine Beglaubigung meines Zeugnisses.", exampleTranslation: "I need a certified copy of my certificate." }
      ]
    },

    // =========================================================
    // LESSON 14-3: Opening a Bank Account
    // =========================================================
    {
      id: "14-3",
      title: "Opening a Bank Account",
      titleGerman: "Ein Konto eröffnen",
      description: "Learn the essential banking vocabulary to open an account, make transfers, and manage your money in Germany. India-yile SBI account pole alla machaa, ithu vere level!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v14-3-1",
          title: "Ein Konto eröffnen — Banking Basics in Germany",
          duration: "14:00",
          description: "Everything you need to know about opening and managing a German bank account. UPI illaa, cash anu king — but bank account venam!",
          scriptOutline: [
            "Opening: 'Germany still loves cash — UPI polulla system illa machaa! But you absolutely need a bank account! Let's learn how!'",
            "Step 1: Choose a bank — Traditional: Deutsche Bank, Sparkasse, Commerzbank. Online: N26, DKB, ING",
            "Sparkasse — the most common bank in Germany, like SBI of Germany! Every small town-ilum und!",
            "What you need: Passport, Anmeldung (Meldebescheinigung), sometimes Aufenthaltserlaubnis — same documents again!",
            "das Girokonto — checking/current account: Your everyday account for salary, rent, bills. India-yile savings account pole thanne!",
            "das Sparkonto — savings account: For saving money, higher interest. FD/RD pole thanne, but different rules!",
            "die Überweisung — bank transfer: Germans LOVE Überweisungen! UPI illaathathukond, ellaam transfer cheyyum! Rent, electricity, internet — ellaam Überweisung!",
            "der Dauerauftrag — standing order: Automatic monthly transfer — like auto-debit for rent every month",
            "die Lastschrift — direct debit: Company pulls money from your account — like ECS mandate in India",
            "der Geldautomat — ATM: For cash withdrawals. Sparkasse ATM-il Sparkasse card use cheythaal free!",
            "die EC-Karte / Girokarte — debit card: Your everyday payment card. Credit card-neykkaal EC-Karte aanu Germans prefer cheyyunnathu!",
            "die IBAN — International Bank Account Number: 22 characters in Germany, starts with DE. India-yile IFSC + account number combined pole!",
            "Schufa — Germany's credit score system like CIBIL. New arrivals usually have no Schufa score — ithu oru problem aanu flat rent cheyyumpol!",
            "Key phrase: 'Ich möchte ein Girokonto eröffnen' — I'd like to open a checking account",
            "Pro tip: Online banks like N26 are easier for newcomers — no Schufa needed, app-il thanne ellaam cheyyaam!"
          ],
          keyVocabulary: ["Konto", "Girokonto", "Überweisung", "Geldautomat", "EC-Karte", "IBAN", "Schufa", "Dauerauftrag", "Lastschrift"],
          learningObjectives: [
            "Know the vocabulary for German banking",
            "Understand the process of opening a bank account",
            "Handle basic banking tasks in German",
            "Understand transfer methods: Überweisung, Dauerauftrag, Lastschrift"
          ],
          placeholderThumbnail: "/images/thumbnails/banking.jpg"
        },
        {
          id: "v14-3-2",
          title: "At the Bank — Dialogues and Practical Phrases",
          duration: "12:00",
          description: "Real dialogues you'll have at a German bank — from opening an account to reporting a lost card. Bank-il poi German-il samsaarikkan padikkaam!",
          scriptOutline: [
            "Opening: 'Bank-il poyi German-il samsaarikkanam enkil, ee phrases mathram arinjaal mathi!'",
            "Dialogue 1: Opening an account — 'Guten Tag, ich möchte ein Girokonto eröffnen. Was brauche ich dafür?'",
            "Bank response: 'Sie brauchen Ihren Reisepass und eine Meldebescheinigung.'",
            "Dialogue 2: Asking about fees — 'Was kostet das Girokonto pro Monat?' (What does the account cost per month?)",
            "Monthly fees: Kontoführungsgebühren — account maintenance fees. Some banks charge 5-10 EUR/month! N26-yil free aanu basic account!",
            "Dialogue 3: Getting a new card — 'Ich habe meine EC-Karte verloren. Kann ich eine neue bekommen?' (I lost my debit card. Can I get a new one?)",
            "Dialogue 4: Making a transfer — 'Ich möchte eine Überweisung machen. Hier ist die IBAN.' (I'd like to make a transfer. Here is the IBAN.)",
            "Dialogue 5: Asking about balance — 'Wie hoch ist mein Kontostand?' (What is my account balance?)",
            "Key compound nouns: Kontoführungsgebühren (account fees), Kontoauszug (bank statement), Kontonummer (account number)",
            "Online banking vocabulary: Onlinebanking einrichten (set up online banking), Passwort ändern (change password), Überweisungslimit (transfer limit)",
            "India comparison: SBI-yil passbook update cheyyunnathu pole, Germany-yil Kontoauszugsdrucker (statement printer) undu!",
            "Pro tip: Download your bank's app — most tasks don't need a branch visit!"
          ],
          keyVocabulary: ["Kontoführungsgebühren", "Kontostand", "Kontoauszug", "Onlinebanking", "verloren", "Überweisungslimit"],
          learningObjectives: [
            "Handle bank conversations in German",
            "Ask about fees, balances, and card issues",
            "Understand compound nouns in banking context",
            "Navigate online banking terminology"
          ],
          placeholderThumbnail: "/images/thumbnails/bank-dialogue.jpg"
        }
      ],
      exercises: [
        {
          id: "ex14-3-1",
          type: "multiple-choice",
          question: "What is a 'Girokonto'?",
          options: ["A checking / current account", "A savings account", "A credit card", "A loan"],
          correctAnswer: "A checking / current account",
          explanation: "Girokonto is the standard everyday bank account (checking/current account) for salary, payments, and transfers.",
          xpReward: 10
        },
        {
          id: "ex14-3-2",
          type: "fill-blank",
          question: "Complete: Ich möchte ein Konto _____. (I'd like to open an account.)",
          options: ["eröffnen", "schließen", "kaufen", "machen"],
          correctAnswer: "eröffnen",
          explanation: "eröffnen = to open (an account, a shop). 'Ein Konto eröffnen' = to open an account.",
          xpReward: 10
        },
        {
          id: "ex14-3-3",
          type: "matching",
          question: "Match the German banking term to its English meaning:",
          options: ["die Überweisung", "der Geldautomat", "die EC-Karte", "der Kontoauszug", "der Dauerauftrag"],
          correctAnswer: ["bank transfer", "ATM", "debit card", "bank statement", "standing order"],
          xpReward: 15
        },
        {
          id: "ex14-3-4",
          type: "multiple-choice",
          question: "What is 'Schufa'?",
          options: ["Germany's credit rating system", "A type of bank account", "A German bank name", "An insurance company"],
          correctAnswer: "Germany's credit rating system",
          explanation: "Schufa is the main credit reporting agency in Germany, similar to CIBIL in India.",
          xpReward: 10
        },
        {
          id: "ex14-3-5",
          type: "multiple-choice",
          question: "What do you need for opening a bank account in Germany?",
          options: ["Passport and Anmeldung", "Only a passport", "Only an email address", "A German driver's license"],
          correctAnswer: "Passport and Anmeldung",
          explanation: "Most German banks require your passport and Meldebescheinigung (proof of registration/Anmeldung).",
          xpReward: 10
        },
        {
          id: "ex14-3-6",
          type: "fill-blank",
          question: "Complete: Wo ist der nächste _____? (Where is the nearest ATM?)",
          options: ["Geldautomat", "Kontoauszug", "Überweisung", "Girokonto"],
          correctAnswer: "Geldautomat",
          explanation: "Geldautomat = ATM (literally: money machine). Geld = money, Automat = machine.",
          xpReward: 10
        },
        {
          id: "ex14-3-7",
          type: "ordering",
          question: "Put the steps for opening a bank account in correct order:",
          options: ["Receive your EC-Karte and PIN by mail", "Choose a bank (Sparkasse, N26, etc.)", "Set up Onlinebanking", "Bring passport and Meldebescheinigung to the bank", "Sign the Kontoeröffnungsantrag (account opening form)"],
          correctAnswer: ["Choose a bank (Sparkasse, N26, etc.)", "Bring passport and Meldebescheinigung to the bank", "Sign the Kontoeröffnungsantrag (account opening form)", "Receive your EC-Karte and PIN by mail", "Set up Onlinebanking"],
          xpReward: 20
        },
        {
          id: "ex14-3-8",
          type: "fill-blank",
          question: "Complete: Ich habe meine EC-Karte _____. Kann ich eine neue bekommen? (I lost my debit card.)",
          options: ["verloren", "gefunden", "gekauft", "bezahlt"],
          correctAnswer: "verloren",
          explanation: "verloren = lost (past participle of verlieren). 'Ich habe meine Karte verloren' = I lost my card.",
          xpReward: 10
        }
      ],
      vocabulary: [
        { id: "vocab14-3-1", german: "das Konto", english: "account", malayalam: "അക്കൗണ്ട്", pronunciation: "kon-to", example: "Ich habe ein Konto bei der Sparkasse.", exampleTranslation: "I have an account at the Sparkasse." },
        { id: "vocab14-3-2", german: "das Girokonto", english: "checking / current account", malayalam: "കറന്റ് അക്കൗണ്ട്", pronunciation: "gee-ro-kon-to", example: "Ich möchte ein Girokonto eröffnen.", exampleTranslation: "I'd like to open a checking account." },
        { id: "vocab14-3-3", german: "die Überweisung", english: "bank transfer", malayalam: "ബാങ്ക് ട്രാൻസ്ഫർ", pronunciation: "oo-ber-vy-zoong", example: "Ich mache eine Überweisung für die Miete.", exampleTranslation: "I'm making a transfer for the rent." },
        { id: "vocab14-3-4", german: "der Geldautomat", english: "ATM", malayalam: "എടിഎം", pronunciation: "gelt-ow-to-maht", example: "Der Geldautomat ist um die Ecke.", exampleTranslation: "The ATM is around the corner." },
        { id: "vocab14-3-5", german: "die EC-Karte", english: "debit card", malayalam: "ഡെബിറ്റ് കാർഡ്", pronunciation: "ay-tsay-kar-te", example: "Kann ich mit EC-Karte zahlen?", exampleTranslation: "Can I pay with debit card?" },
        { id: "vocab14-3-6", german: "die IBAN", english: "IBAN (International Bank Account Number)", malayalam: "ഐബാൻ", pronunciation: "ee-bahn", example: "Meine IBAN beginnt mit DE.", exampleTranslation: "My IBAN starts with DE." },
        { id: "vocab14-3-7", german: "die Schufa", english: "credit rating / credit score", malayalam: "ക്രെഡിറ്റ് സ്കോർ", pronunciation: "shoo-fa", example: "Für den Mietvertrag brauche ich eine Schufa-Auskunft.", exampleTranslation: "For the rental contract I need a Schufa report." },
        { id: "vocab14-3-8", german: "der Kontoauszug", english: "bank statement", malayalam: "ബാങ്ക് സ്റ്റേറ്റ്‌മെന്റ്", pronunciation: "kon-to-ows-tsook", example: "Ich brauche einen Kontoauszug.", exampleTranslation: "I need a bank statement." },
        { id: "vocab14-3-9", german: "der Dauerauftrag", english: "standing order", malayalam: "സ്ഥിര നിർദ്ദേശം", pronunciation: "dow-er-owf-trahk", example: "Ich habe einen Dauerauftrag für die Miete eingerichtet.", exampleTranslation: "I set up a standing order for the rent." },
        { id: "vocab14-3-10", german: "die Lastschrift", english: "direct debit", malayalam: "ഡയറക്ട് ഡെബിറ്റ്", pronunciation: "lahst-shrift", example: "Die Stromrechnung wird per Lastschrift bezahlt.", exampleTranslation: "The electricity bill is paid by direct debit." }
      ]
    },

    // =========================================================
    // LESSON 14-4: Writing Formal Letters & Emails
    // =========================================================
    {
      id: "14-4",
      title: "Writing Formal Letters & Emails",
      titleGerman: "Formelle Briefe und E-Mails schreiben",
      description: "Master the art of formal German writing — letter structure, polite phrases, email templates, and important compound nouns. 'Respected Sir' enna Indian style alla machaa, German-il vere formality aanu!",
      duration: "60 min",
      xpReward: 180,
      videos: [
        {
          id: "v14-4-1",
          title: "Formal Letter Structure — Every Line Matters",
          duration: "14:00",
          description: "Learn the exact structure of a formal German letter — from Absender to Mit freundlichen Grüßen. India-yile 'Respected Sir' format alla, German format vere aanu!",
          scriptOutline: [
            "Opening: 'Formal letters in German have a VERY specific structure — get it right, and you look professional! India-yile letter format ariyaam, but German-il EVERY detail counts!'",
            "ACTUAL LETTER TEMPLATE walkthrough — let's write one together!",
            "Line 1: Absender (sender) — Your name and full address (top left or top right)",
            "Line 2: Empfänger (recipient) — Recipient's name, title, company/office, full address",
            "Line 3: Ort, Datum — City, Date (e.g., Berlin, den 15. März 2026) — date format is important!",
            "Betreff: Subject line — bold, no period at the end! Example: 'Betreff: Verlängerung meiner Aufenthaltserlaubnis'",
            "Greeting options: 'Sehr geehrte Damen und Herren,' (Dear Sir or Madam) — note the COMMA, not colon like in English!",
            "If you know the name: 'Sehr geehrter Herr Müller,' / 'Sehr geehrte Frau Schmidt,' — geehrter for men, geehrte for women!",
            "Body paragraph 1: State your purpose — 'Ich schreibe Ihnen, weil...' or 'Bezug nehmend auf Ihr Schreiben vom...'",
            "Body paragraph 2: Details and requests — 'Ich bitte Sie höflich um...' / 'Könnten Sie mir bitte...'",
            "Closing: 'Mit freundlichen Grüßen' (With friendly greetings) — NO comma after this! India-yile 'Yours faithfully' pole!",
            "Your name and signature (Unterschrift) below — handwritten signature if it's a printed letter!",
            "Anlagen (attachments/enclosures): List any documents you're including — 'Anlage: Kopie des Reisepasses'",
            "Kerala comparison: India-yil 'Respected Sir, I am writing this letter to bring to your kind notice...' ennokke ezhuthum. Germany-yil shorter and more direct!",
            "COMPLETE EXAMPLE LETTER: Requesting a Termin at Ausländerbehörde — full letter shown and explained line by line"
          ],
          keyVocabulary: ["Betreff", "Sehr geehrte Damen und Herren", "Mit freundlichen Grüßen", "Unterschrift", "Absender", "Empfänger", "Anlagen"],
          learningObjectives: [
            "Structure a formal German letter correctly",
            "Use the proper greeting and closing formulas",
            "Know German letter formatting conventions",
            "Write a complete formal letter from scratch"
          ],
          placeholderThumbnail: "/images/thumbnails/formal-letter.jpg"
        },
        {
          id: "v14-4-2",
          title: "Formal Emails & Real-Life Letter Templates",
          duration: "14:00",
          description: "Write formal emails and letters for real-life situations — appointment requests, complaints, cancellations, and more! Actual templates with examples!",
          scriptOutline: [
            "Opening: 'Let's write actual letters and emails you'll NEED in Germany! Ithu just theory alla — real templates that you can copy and use!'",
            "EMAIL vs LETTER differences: Email greetings can be slightly less formal — 'Sehr geehrte Frau Müller,' still standard, but 'Guten Tag Frau Müller,' also acceptable in emails",
            "Email closing options: 'Mit freundlichen Grüßen' (most formal), 'Freundliche Grüße' (slightly less formal), 'Beste Grüße' (friendly but professional)",
            "TEMPLATE 1 — Requesting an appointment:\n  Betreff: Terminanfrage\n  Sehr geehrte Damen und Herren,\n  ich möchte gerne einen Termin bei Ihnen vereinbaren. Es geht um die Verlängerung meiner Aufenthaltserlaubnis.\n  Bitte teilen Sie mir einen verfügbaren Termin mit.\n  Mit freundlichen Grüßen\n  Arun Nair",
            "TEMPLATE 2 — Cancelling a contract (Kündigung):\n  Betreff: Kündigung meines Vertrages\n  Sehr geehrte Damen und Herren,\n  hiermit kündige ich meinen Vertrag (Vertragsnummer: 12345) zum nächstmöglichen Zeitpunkt.\n  Ich bitte um eine schriftliche Bestätigung der Kündigung.\n  Mit freundlichen Grüßen",
            "TEMPLATE 3 — Complaint about a faulty product:\n  Betreff: Reklamation — defektes Gerät\n  Sehr geehrte Damen und Herren,\n  am 10. Februar 2026 habe ich bei Ihnen einen Laptop gekauft. Leider ist das Gerät defekt.\n  Ich bitte um einen Umtausch oder eine Reparatur.\n  Mit freundlichen Grüßen",
            "Important compound nouns: Krankenversicherung (health insurance), Aufenthaltsgenehmigung (residence authorization), Kündigungsfrist (cancellation period)",
            "Grammar spotlight: Nebensätze with weil and dass — the verb goes to the END!",
            "'Ich schreibe, weil ich einen Termin brauche.' — verb 'brauche' at the END of the weil-clause!",
            "'Ich hoffe, dass Sie mir helfen können.' — verb 'können' at the END of the dass-clause!",
            "More Nebensatz practice: 'Ich möchte den Vertrag kündigen, weil ich nach Indien zurückkehre.' (I want to cancel the contract because I'm returning to India.)",
            "'Ich bestätige, dass ich alle Unterlagen eingereicht habe.' (I confirm that I have submitted all documents.)",
            "Pro tip: Keep sentences short and formal. Avoid slang or casual language! 'Sie' (formal you) ALWAYS, never 'du' in formal writing!",
            "Email etiquette: Reply within 24-48 hours, always include Betreff, always sign with full name!"
          ],
          keyVocabulary: ["Bezug nehmend auf", "Ich bitte Sie höflich um", "Krankenversicherung", "Mietvertrag", "weil", "dass", "Kündigung", "Reklamation", "Bestätigung"],
          learningObjectives: [
            "Write formal letters for common real-life situations",
            "Use key formal phrases and compound nouns",
            "Apply Nebensätze with weil and dass in formal writing",
            "Differentiate between letter and email conventions",
            "Use ready-made templates for appointment, cancellation, and complaint"
          ],
          placeholderThumbnail: "/images/thumbnails/sample-letters.jpg"
        }
      ],
      exercises: [
        {
          id: "ex14-4-1",
          type: "multiple-choice",
          question: "What is the standard formal greeting when you don't know the recipient's name?",
          options: ["Sehr geehrte Damen und Herren,", "Lieber Freund,", "Hallo zusammen,", "Hey,"],
          correctAnswer: "Sehr geehrte Damen und Herren,",
          explanation: "Sehr geehrte Damen und Herren (Dear Ladies and Gentlemen) is the standard formal greeting for unknown recipients.",
          xpReward: 10
        },
        {
          id: "ex14-4-2",
          type: "fill-blank",
          question: "Complete the closing: Mit freundlichen _____",
          options: ["Grüßen", "Grüße", "Gruß", "Grüssen"],
          correctAnswer: "Grüßen",
          explanation: "Mit freundlichen Grüßen (With friendly greetings) is the standard formal letter closing.",
          xpReward: 10
        },
        {
          id: "ex14-4-3",
          type: "multiple-choice",
          question: "In a Nebensatz with 'weil', where does the verb go?",
          options: ["At the end of the clause", "At the beginning", "In the middle", "Before weil"],
          correctAnswer: "At the end of the clause",
          explanation: "In subordinate clauses with weil (because) or dass (that), the conjugated verb goes to the END: 'Ich schreibe, weil ich einen Termin brauche.'",
          xpReward: 15
        },
        {
          id: "ex14-4-4",
          type: "matching",
          question: "Match the compound noun to its meaning:",
          options: ["Krankenversicherung", "Aufenthaltsgenehmigung", "Mietvertrag", "Kündigungsfrist", "Kontoeröffnung"],
          correctAnswer: ["health insurance", "residence authorization", "rental contract", "cancellation period", "account opening"],
          xpReward: 15
        },
        {
          id: "ex14-4-5",
          type: "ordering",
          question: "Put the parts of a formal letter in the correct order:",
          options: ["Mit freundlichen Grüßen + Unterschrift", "Sehr geehrte Damen und Herren,", "Betreff: Terminanfrage", "Absender (your address) + Empfänger (their address) + Datum", "Ich schreibe Ihnen, weil ich einen Termin brauche."],
          correctAnswer: ["Absender (your address) + Empfänger (their address) + Datum", "Betreff: Terminanfrage", "Sehr geehrte Damen und Herren,", "Ich schreibe Ihnen, weil ich einen Termin brauche.", "Mit freundlichen Grüßen + Unterschrift"],
          xpReward: 20
        },
        {
          id: "ex14-4-6",
          type: "fill-blank",
          question: "Complete: Ich schreibe, _____ ich einen Termin brauche. (I write because I need an appointment.)",
          options: ["weil", "dass", "wenn", "ob"],
          correctAnswer: "weil",
          explanation: "weil = because. It introduces a reason: 'Ich schreibe, weil ich einen Termin brauche.' Note: the verb goes to the end!",
          xpReward: 10
        },
        {
          id: "ex14-4-7",
          type: "multiple-choice",
          question: "What does 'Betreff' mean in a formal letter?",
          options: ["Subject line", "Greeting", "Closing", "Signature"],
          correctAnswer: "Subject line",
          explanation: "Betreff = subject line. It tells the reader what the letter is about, placed before the greeting.",
          xpReward: 10
        },
        {
          id: "ex14-4-8",
          type: "fill-blank",
          question: "Complete: Hiermit _____ ich meinen Vertrag zum nächstmöglichen Zeitpunkt. (I hereby cancel my contract at the earliest possible date.)",
          options: ["kündige", "eröffne", "schreibe", "bestätige"],
          correctAnswer: "kündige",
          explanation: "kündigen = to cancel/terminate. 'Hiermit kündige ich...' is the standard phrase for contract cancellation letters.",
          xpReward: 10
        }
      ],
      vocabulary: [
        { id: "vocab14-4-1", german: "der Betreff", english: "subject (of a letter)", malayalam: "വിഷയം", pronunciation: "be-treff", example: "Betreff: Terminanfrage", exampleTranslation: "Subject: Appointment request" },
        { id: "vocab14-4-2", german: "Sehr geehrte Damen und Herren", english: "Dear Sir or Madam", malayalam: "ബഹുമാനപ്പെട്ട മഹാശയ/മഹാശയി", pronunciation: "zair ge-air-te dah-men oont hair-en", example: "Sehr geehrte Damen und Herren, ich schreibe Ihnen wegen...", exampleTranslation: "Dear Sir or Madam, I am writing to you regarding..." },
        { id: "vocab14-4-3", german: "Mit freundlichen Grüßen", english: "With kind regards / Yours sincerely", malayalam: "ആദരപൂർവ്വം", pronunciation: "mit froynt-li-khen gry-sen", example: "Mit freundlichen Grüßen, Arun Nair", exampleTranslation: "With kind regards, Arun Nair" },
        { id: "vocab14-4-4", german: "die Krankenversicherung", english: "health insurance", malayalam: "ആരോഗ്യ ഇൻഷുറൻസ്", pronunciation: "krank-en-fer-zikh-er-oong", example: "Die Krankenversicherung ist in Deutschland Pflicht.", exampleTranslation: "Health insurance is mandatory in Germany." },
        { id: "vocab14-4-5", german: "der Mietvertrag", english: "rental contract / lease", malayalam: "വാടക കരാർ", pronunciation: "meet-fer-trahk", example: "Ich habe den Mietvertrag unterschrieben.", exampleTranslation: "I signed the rental contract." },
        { id: "vocab14-4-6", german: "weil", english: "because", malayalam: "കാരണം / എന്തുകൊണ്ടെന്നാൽ", pronunciation: "vyle", example: "Ich schreibe, weil ich einen Termin brauche.", exampleTranslation: "I am writing because I need an appointment." },
        { id: "vocab14-4-7", german: "dass", english: "that (conjunction)", malayalam: "എന്ന്", pronunciation: "dass", example: "Ich hoffe, dass Sie mir helfen können.", exampleTranslation: "I hope that you can help me." },
        { id: "vocab14-4-8", german: "Ich bitte Sie höflich um", english: "I politely request", malayalam: "ഞാൻ വിനയപൂർവ്വം അഭ്യർത്ഥിക്കുന്നു", pronunciation: "ikh bit-te zee huf-likh oom", example: "Ich bitte Sie höflich um eine Bestätigung.", exampleTranslation: "I politely request a confirmation." },
        { id: "vocab14-4-9", german: "die Kündigung", english: "cancellation / termination", malayalam: "റദ്ദാക്കൽ", pronunciation: "kyn-di-goong", example: "Ich möchte eine Kündigung meines Vertrages einreichen.", exampleTranslation: "I'd like to submit a cancellation of my contract." },
        { id: "vocab14-4-10", german: "die Bestätigung", english: "confirmation", malayalam: "സ്ഥിരീകരണം", pronunciation: "be-shtay-ti-goong", example: "Ich bitte um eine schriftliche Bestätigung.", exampleTranslation: "I request a written confirmation." }
      ]
    }
  ]
};
