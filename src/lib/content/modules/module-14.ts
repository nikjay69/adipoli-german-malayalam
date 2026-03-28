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
      storyScene: {
        setting: {
          name: "Bürgeramt Lobby (Im Amt)",
          sceneType: "office",
          timeOfDay: "morning",
          description: "You're in a highly organized, quiet waiting room with numbered tickets and a ticking clock. It's time for your 'Anmeldung' (registration). In Kerala, we might skip a few details on a form, but in Germany, every field is critical. Arjun holds the folder: 'Indha paper kittiye alle bank-um phone-um okke set aaku!'. You need to master the exact German way of filling out 'Formulare'. From your 'Vorname' to your 'Unterschrift'. Welcome to the world of German Bürokratie, machane!",
        },
        narrative: {
          previousRecap: "You've shared your past. Now, let's make your present in Germany official!",
          currentObjective: "Understand the Anmeldung process and correctly identify common form fields and formats",
          nextTeaser: "Next: More offices! Let's see how much paperwork the Ausländerbehörde wants!",
        },
        kuttanIntro: [
          "Machane! Germany-yil 'Anmeldung' is your golden ticket. Address register cheythille enkil you don't exist in the system. No bank, no Sim card. Heavy weight item aanu!",
          "Forms fill cheyyumpol 'Vorname' (First Name) and 'Nachname' (Surname) sradhikkanam. Date format eppolun 'TT.MM.JJJJ' with dots aayirikkum. No slashes!",
          "Final touch 'Unterschrift' (signature) aanu. Forms kandaal pedi venda, logic simple aanu. Let's make you official!",
        ],
        vocabEncounters: [
          { vocabId: "vocab14-1-1", encounterMoment: "The clerk calls: 'Die Anmeldung, bitte.' (Registration, please).", contextSentence: "Ich muss die Anmeldung machen." },
          { vocabId: "vocab14-1-2", encounterMoment: "You fill your name: 'Mein Vorname ist...'", contextSentence: "Mein Vorname ist Arun." },
          { vocabId: "vocab14-1-10", encounterMoment: "Arjun points to the bottom line: 'Und die Unterschrift hier.'", contextSentence: "Bitte hier Ihre Unterschrift." },
          { vocabId: "vocab14-1-6", encounterMoment: "You write under nationality: 'Indisch'.", contextSentence: "Meine Staatsangehörigkeit ist indisch." },
        ],
        decisionPoints: [
          {
            moment: "Which document do you need most for your legal existence in Germany?",
            options: [
              { text: "Die Anmeldung (Meldebescheinigung).", isCorrect: true, response: "Exactly! This registration paper is the basis for everything else.", kuttanReaction: "Adipoli! System logic perfectly capture cheythallo! 🔥" },
              { text: "A Netflix subscription.", isCorrect: false, response: "Aiyyo! Enthe ninnu parayunne? Registration illathe SIM card polum kittila!", kuttanReaction: "Vite machane! Paperwork first, entertainment late. Try again! 😬" },
            ],
          },
          {
            moment: "You need to write the date March 15, 1998 on the form. Which format is correct?",
            options: [
              { text: "15.03.1998", isCorrect: true, response: "Correct! Germany always uses DD.MM.YYYY with dots.", kuttanReaction: "Superb! Date logic correctly noted! ⭐" },
              { text: "03/15/1998", isCorrect: false, response: "No! This is the US format. In Germany, we use dots and lead with the day.", kuttanReaction: "Aiyyo! German officials confuse aakum ithu kandaal. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v14-1-1",
          title: "The Anmeldung - Registering in Germany",
          duration: "12:00",
          description: "Everything you need to know about Germany's mandatory registration process — crucial for every new arrival! Ithu ille enkil onnum nadakkilla!",
          scriptOutline: [
            "Opening: 'Germany vannaal first cheyyenda karyam — Anmeldung! Without this paper, you are a ghost here! Phone, Bank, Insurance — onnum nadakkilla!'",
            "What is it? Mandatory address registration within 14 days. 14 days machaa, not 14 months! Fine adikkum!",
            "OFFICE: Bürgeramt or Einwohnermeldeamt. Think of it like a super-organized Panchayat office.",
            "Must bring: Passport, Mietvertrag (rent contract), Wohnungsgeberbestätigung (landlord's letter).",
            "The Form: Anmeldeformular. Oru field polum skip cheyyanda. Full logic venam!",
            "Date Check: DD.MM.YYYY. 15.03.1998 format mathram accept cheyyu. Points for dots!",
            "Importance: Meldebescheinigung is your golden ticket. Address proof-inu Aadhaar pole thanne!",
            "TERMIN LAW: Appointment online book cheyyanam. No Termin, No Entry — athanu system!",
            "Kerala connection: Collectorate-il queue nilkkunna pole alla. 10 AM-in 10 AM-in reach aakanam!",
            "Pro tip: Sookshichu vekkuka! Without this paper, your German life is essentially PAUSE mode."
          ],
          keyVocabulary: ["Anmeldung", "Bürgeramt", "Mietvertrag", "Meldebescheinigung", "Termin", "Wohnungsgeberbestätigung", "Steuer-ID"],
          learningObjectives: [
            "Understand the Anmeldung process and its importance",
            "Know what documents you need for registration",
            "Navigate the registration office confidently",
            "Avoid common mistakes that delay registration"
          ],
          placeholderThumbnail: "/images/anmeldung.png",
          richContent: [
            {
              type: "table",
              title: "Anmeldung Checklist",
              headers: ["Document", "German", "Malayalam"],
              rows: [
                ["Passport", "Reisepass", "പാസ്‌പോർട്ട്"],
                ["Rent Contract", "Mietvertrag", "വാടക കരാർ"],
                ["Landlord Confirmation", "Wohnungsgeberbestätigung", "വീട്ടുടമ സ്ഥിരീകരണം"],
                ["Registration Form", "Anmeldeformular", "രജിസ്ട്രേഷൻ ഫോം"],
                ["Registration Certificate", "Meldebescheinigung", "രജിസ്ട്രേഷൻ സർട്ടിഫിക്കറ്റ്"]
              ]
            },
            {
              type: "note",
              title: "14-Day Deadline!",
              variant: "warning",
              content: "You MUST register within 14 days of moving in. Late registration can result in a fine up to 1000 EUR. Book your Termin (appointment) online as soon as possible!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "die Anmeldung", english: "registration", malayalam: "രജിസ്ട്രേഷൻ", pronunciation: "an-mel-dung" },
                { german: "das Bürgeramt", english: "citizens' office", malayalam: "പൗര കാര്യാലയം", pronunciation: "bür-ger-amt" },
                { german: "der Termin", english: "appointment", malayalam: "അപ്പോയിന്റ്മെന്റ്", pronunciation: "ter-meen" },
                { german: "die Meldebescheinigung", english: "registration certificate", malayalam: "രജിസ്ട്രേഷൻ സർട്ടിഫിക്കറ്റ്", pronunciation: "mel-de-be-shy-ni-gung" }
              ]
            }
          ]
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
          placeholderThumbnail: "/images/hiwi_student.png",
          richContent: [
            {
              type: "table",
              title: "Common German Form Fields",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["Vorname", "First name", "പേര്"],
                ["Nachname", "Surname", "കുടുംബപ്പേര്"],
                ["Geburtsdatum", "Date of birth", "ജനനത്തീയതി"],
                ["Geburtsort", "Place of birth", "ജനനസ്ഥലം"],
                ["Staatsangehörigkeit", "Nationality", "ദേശീയത"],
                ["Familienstand", "Marital status", "വൈവാഹിക നില"],
                ["Unterschrift", "Signature", "ഒപ്പ്"]
              ]
            },
            {
              type: "note",
              title: "Date Format",
              variant: "warning",
              content: "Germany uses DD.MM.YYYY with DOTS. Example: 15.03.1998. Never use slashes (03/15/1998) — that's the US format and will confuse everyone!"
            },
            {
              type: "note",
              title: "Address Order",
              variant: "tip",
              content: "German address: Straße (street) + Hausnummer (house number), then PLZ (5-digit postal code) + Ort (city). Example: Mozartstraße 12, 10115 Berlin."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex14-1-1",
          type: "matching",
          question: "Match the German form field to its English meaning:",
          options: ["Vorname", "Nachname", "Geburtsdatum", "Geburtsort", "Familienstand"],
          correctAnswer: ["first name", "surname", "date of birth", "place of birth", "marital status"],
          explanation: "These are the 'Core Five'. You will fill these out hundreds of times in Germany. 'Vor' means 'before', so Vor-name = Name-before (First name).",
          xpReward: 15
        },
        {
          id: "ex14-1-2",
          type: "multiple-choice",
          question: "What is the correct German date format for March 15, 1998?",
          options: ["15.03.1998", "03/15/1998", "1998-03-15", "15-March-1998"],
          correctAnswer: "15.03.1998",
          explanation: "CRUCIAL: Germany uses dots (.), not slashes (/). The order is Day.Month.Year. Using the US format (03/15) will confuse German officials or break automated forms!",
          xpReward: 10
        },
        {
          id: "ex14-1-3",
          type: "fill-blank",
          question: "Complete: Meine _____ ist Indisch. (My nationality is Indian.)",
          options: ["Staatsangehörigkeit", "Familienstand", "Geburtsdatum", "Adresse"],
          correctAnswer: "Staatsangehörigkeit",
          explanation: "Staats-angehörigkeit (State-belonging). It’s a long word, but just look for 'Staats' and you'll know they mean your passport/nationality.",
          xpReward: 10
        },
        {
          id: "ex14-1-4",
          type: "multiple-choice",
          question: "What is 'Anmeldung'?",
          options: ["Mandatory address registration", "A job application", "A bank account opening", "A visa application"],
          correctAnswer: "Mandatory address registration",
          explanation: "In Germany, you don't just 'live' somewhere; you 'register' (anmelden) there. This paper is the key to everything else—bank accounts, phone SIMs, and your Tax ID.",
          xpReward: 10
        },
        {
          id: "ex14-1-5",
          type: "multiple-choice",
          question: "If you are not married, what do you write for 'Familienstand'?",
          options: ["ledig", "verheiratet", "geschieden", "verwitwet"],
          correctAnswer: "ledig",
          explanation: "'Ledig' means single. 'Ver-heiratet' (married) comes from 'Heirat' (marriage). Getting this right affects your 'Steuerklasse' (tax class), so don't mis-fill!",
          xpReward: 10
        },
        {
          id: "ex14-1-6",
          type: "fill-blank",
          question: "Complete: Die _____ ist 5 Ziffern lang. (The postal code is 5 digits long.) [abbreviation]",
          options: ["PLZ", "DOB", "PIN", "ZIP"],
          correctAnswer: "PLZ",
          explanation: "PLZ stands for Post-leit-zahl. Every German city has a 5-digit code. Berlin starts with 1, Munich with 8, etc. Mentioning the PLZ helps people know exactly which city district you mean.",
          xpReward: 10
        },
        {
          id: "ex14-1-7",
          type: "ordering",
          question: "Put these Anmeldung steps in the correct order:",
          options: ["Receive your Meldebescheinigung", "Book a Termin online at the Bürgeramt", "Fill out the Anmeldeformular", "Collect documents: passport, Mietvertrag, Wohnungsgeberbestätigung", "Go to your appointment at the Bürgeramt"],
          correctAnswer: ["Book a Termin online at the Bürgeramt", "Collect documents: passport, Mietvertrag, Wohnungsgeberbestätigung", "Fill out the Anmeldeformular", "Go to your appointment at the Bürgeramt", "Receive your Meldebescheinigung"],
          explanation: "The logic of German Bureaucracy: 1. Get the slot (Termin), 2. Prepare the proof, 3. Show up (on time!), 4. Get the paper. No paper = no existence!",
          xpReward: 20
        },
        {
          id: "ex14-1-8",
          type: "matching",
          question: "Match these address-related German terms to their English meaning:",
          options: ["die Straße", "die Hausnummer", "der Ort", "die Postleitzahl", "die Unterschrift"],
          correctAnswer: ["street", "house number", "city / town", "postal code", "signature"],
          explanation: "Fun fact: In Germany, the Hausnummer ALWAYS comes AFTER the street name (e.g., Mainstreet 5). Don't swap them!",
          xpReward: 15
        },
        {
          id: "ex14-1-9",
          type: "dictation",
          question: "Listen and type: Mein Vorname ist Arun.",
          correctAnswer: "Mein Vorname ist Arun",
          explanation: "Great! 'Vorname' is your first name. Keep it simple and clear on forms.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-my-firstname.mp3"
        },
        {
          id: "ex14-1-10",
          type: "free-text",
          question: "Write your date of birth in German format (Example: 15.03.1998)",
          correctAnswer: "15.03.1998",
          explanation: "Wunderbar! Remember the dots (.) instead of slashes (/). DD.MM.YYYY is the way to go!",
          xpReward: 30
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
      storyScene: {
        setting: {
          name: "Foreigners Office (Ausländerbehörde)",
          sceneType: "office",
          timeOfDay: "morning",
          description: "You're in a waiting room filled with people from all over the world. The screen flashes numbers. Your 'Termin' (appointment) is at 10:15. In Kerala, a 10:15 appointment might mean 'around 11', but here, if you're not there at 10:14, you might lose your slot. You're clutching your folder of 'Unterlagen' (documents). One small paper missing could mean coming back next month. Deep breaths, machane. Let's get that 'Aufenthaltserlaubnis'!",
        },
        narrative: {
          previousRecap: "You've registered your address. Now, let's secure your legal right to stay in Germany!",
          currentObjective: "Understand the importance of appointments and punctuality and identify key office types",
          nextTeaser: "Next: Banking! Let's see how much paperwork the bank needs for your account!",
        },
        kuttanIntro: [
          "Machane! 'Ausländerbehörde' is probably the most important office for us. Visa matters and 'Aufenthaltserlaubnis' (residence permit) deal cheyyunnathu ivide aanu.",
          "Rule number one: Always have a 'Termin'. Rule number two: Bring ALL your 'Unterlagen'. Paperwork-il oru loose-um venam. Collectorate logic ivide rules-inte base-ilaanu!",
          "Pünktlichkeit is not a joke. 5 minutes late means your appointment is cancelled. Let's make sure we have everything ready!",
        ],
        vocabEncounters: [
          { vocabId: "vocab14-2-1", encounterMoment: "Arjun whispers: 'This is the Ausländerbehörde... stay sharp.'", contextSentence: "Ich habe einen Termin bei der Ausländerbehörde." },
          { vocabId: "vocab14-2-5", encounterMoment: "The screen shows: 'Termin 412 - Zimmer 102'.", contextSentence: "Ich brauche einen Termin." },
          { vocabId: "vocab14-2-6", encounterMoment: "You double-check: 'Hat wir alle Unterlagen?' (Do we have all docs?).", contextSentence: "Bringen Sie bitte alle Unterlagen mit." },
          { vocabId: "vocab14-2-4", encounterMoment: "The clerk says: 'Hier ist Ihre Aufenthaltserlaubnis.'", contextSentence: "Meine Aufenthaltserlaubnis ist zwei Jahre gültig." },
        ],
        decisionPoints: [
          {
            moment: "Your appointment is at 09:00. When should you arrive at the office?",
            options: [
              { text: "At 08:50 or 08:55.", isCorrect: true, response: "Exactly! In Germany, 'pünktlich' means being there a few minutes early.", kuttanReaction: "Adipoli! Punctuality logic perfectly capture cheythallo! 🔥" },
              { text: "At 09:15, because it's only 15 minutes.", isCorrect: false, response: "Aiyyo! 15 minutes late means your appointment is gone. No exceptions!", kuttanReaction: "Vite machane! German timing is absolute. Try again! 😬" },
            ],
          },
          {
            moment: "The clerk asks for your 'Unterlagen'. What do you give them?",
            options: [
              { text: "Your folder containing passport, contract, and photos.", isCorrect: true, response: "Correct! 'Unterlagen' means all your required documents.", kuttanReaction: "Superb! Paperwork logic correctly picked! ⭐" },
              { text: "Just your phone with digital copies.", isCorrect: false, response: "No! German offices usually insist on physical paper or original documents.", kuttanReaction: "Aiyyo! Physical paper is the king here. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v14-2-1",
          title: "Ausländerbehörde & Rathaus — Know Your Offices",
          duration: "12:00",
          description: "Know your way around the key German government offices — where to go for what. Ethu office-il pokanam ennullathu ariyaathe nadakkanda!",
          scriptOutline: [
            "Opening: 'Bürokratie is legendary! But ariyaam enkil easy aanu. Village/Panchayat office logic thanne!'",
            "Ausländerbehörde: Foreigners office for visa matters. FRRO pole powerful aanu machane!",
            "Rathaus: City Hall. Corporation/Municipality core location.",
            "Bürgeramt: Registration & certificates. Day-to-day paperwork house.",
            "Finanzamt: Tax office. Tax-ID set aakkan ivide varanam.",
            "PHRASE: 'Ich brauche einen Termin' (I need an appointment). Without this, nothing happens!",
            "Pünktlichkeit: 10:00 means 09:55. Late aayaal appointment reschedule cheyyendi varum!",
            "Kerala parallel: Collectorate file movement slow aakaam, but German offices rules-il tight aanu!",
            "Must Haves: Passport, documents, and patience. Full proof paperwork essential aanu."
          ],
          keyVocabulary: ["Ausländerbehörde", "Rathaus", "Bürgeramt", "Termin", "Unterlagen", "Finanzamt", "Pünktlichkeit"],
          learningObjectives: [
            "Know which office to visit for different needs",
            "Make appointments and communicate basic needs",
            "Prepare properly for office visits",
            "Understand the importance of punctuality in German bureaucracy"
          ],
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "Key German Offices",
              headers: ["Office", "Purpose", "Kerala Equivalent"],
              rows: [
                ["Bürgeramt", "Registration & certificates", "Panchayat Office"],
                ["Ausländerbehörde", "Visa & residence permit", "FRRO"],
                ["Rathaus", "City Hall / general admin", "Corporation Office"],
                ["Finanzamt", "Tax office / Tax-ID", "Income Tax Office"]
              ]
            },
            {
              type: "note",
              title: "Termin = MUST!",
              variant: "warning",
              content: "Almost every German office requires an appointment (Termin). Book online in advance! 'Ich brauche einen Termin' is your most important sentence. No Termin = No Entry!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "der Termin", english: "appointment", malayalam: "അപ്പോയിന്റ്മെന്റ്", pronunciation: "ter-meen" },
                { german: "die Unterlagen", english: "documents", malayalam: "രേഖകൾ", pronunciation: "oon-ter-lah-gen" },
                { german: "die Pünktlichkeit", english: "punctuality", malayalam: "സമയനിഷ്ഠ", pronunciation: "pünkt-likh-kite" }
              ]
            }
          ]
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
          placeholderThumbnail: "/images/hiwi_student.png",
          richContent: [
            {
              type: "table",
              title: "Essential Documents in Germany",
              headers: ["German", "English", "Who Needs It?"],
              rows: [
                ["Aufenthaltserlaubnis", "Residence permit", "All non-EU foreigners"],
                ["Reisepass", "Passport", "Everyone"],
                ["Meldebescheinigung", "Registration cert.", "Everyone in Germany"],
                ["Blaue Karte EU", "EU Blue Card", "Skilled workers"],
                ["Formular", "Form", "For every application"],
                ["Beglaubigung", "Certified copy", "For official copies"]
              ]
            },
            {
              type: "note",
              title: "Key Phrase at the Office",
              variant: "tip",
              content: "'Ich möchte meine Aufenthaltserlaubnis verlängern.' (I want to extend my residence permit.) — This is one of the most important sentences you'll ever say in Germany!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "der Antrag", english: "application", malayalam: "അപേക്ഷ", pronunciation: "an-trahg" },
                { german: "die Aufenthaltserlaubnis", english: "residence permit", malayalam: "താമസ അനുമതി", pronunciation: "owf-ent-halts-er-lowb-nis" },
                { german: "die Beglaubigung", english: "certification", malayalam: "സാക്ഷ്യപ്പെടുത്തൽ", pronunciation: "be-glow-bi-gung" }
              ]
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex14-2-1",
          type: "multiple-choice",
          question: "Where do you go to get your residence permit (Aufenthaltserlaubnis)?",
          options: ["Ausländerbehörde", "Rathaus", "Supermarkt", "Bahnhof"],
          correctAnswer: "Ausländerbehörde",
          explanation: "Literal meaning: Foreigner-Authority. This office is the boss of your legal stay. Keep their location pinned on your map!",
          xpReward: 10
        },
        {
          id: "ex14-2-2",
          type: "fill-blank",
          question: "Complete: Ich brauche einen _____ bei der Ausländerbehörde. (I need an appointment...)",
          options: ["Termin", "Ausweis", "Formular", "Brief"],
          correctAnswer: "Termin",
          explanation: "'No Termin, no entry' — that’s the golden rule of German offices. Even if the office is empty, they usually insist on a pre-booked appointment.",
          xpReward: 10
        },
        {
          id: "ex14-2-3",
          type: "matching",
          question: "Match the German office to its function:",
          options: ["Ausländerbehörde", "Bürgeramt", "Rathaus", "Finanzamt"],
          correctAnswer: ["residence permits for foreigners", "address registration & ID cards", "general city administration", "taxes & Steuer-ID"],
          explanation: "Knowing 'Wer macht was' (who does what) saves you hours of traveling to the wrong office!",
          xpReward: 15
        },
        {
          id: "ex14-2-4",
          type: "multiple-choice",
          question: "What does 'Unterlagen' mean?",
          options: ["documents / paperwork", "office hours", "appointment", "signature"],
          correctAnswer: "documents / paperwork",
          explanation: "The magic word for your file folder. When they say 'Haben Sie Ihre Unterlagen dabei?' they want to see your certificates and contracts.",
          xpReward: 10
        },
        {
          id: "ex14-2-5",
          type: "fill-blank",
          question: "Complete: Bitte füllen Sie das _____ aus. (Please fill out the form.)",
          options: ["Formular", "Termin", "Ausweis", "Konto"],
          correctAnswer: "Formular",
          explanation: "Formular (Form). The verb 'aus-füllen' (to fill out) is separable—the 'aus' jumps to the end of the instruction!",
          xpReward: 10
        },
        {
          id: "ex14-2-6",
          type: "ordering",
          question: "Put these steps in the correct order for visiting the Ausländerbehörde:",
          options: ["Get your residence permit", "Collect all required documents", "Go to your appointment on time", "Book a Termin online"],
          correctAnswer: ["Book a Termin online", "Collect all required documents", "Go to your appointment on time", "Get your residence permit"],
          explanation: "Structure is everything. Most offices won't even talk to you without a 'Terminbestätigung' (appointment confirmation).",
          xpReward: 20
        },
        {
          id: "ex14-2-7",
          type: "multiple-choice",
          question: "What is a 'Beglaubigung'?",
          options: ["A certified copy / notarization", "A bank statement", "An appointment booking", "A visa application"],
          correctAnswer: "A certified copy / notarization",
          explanation: "German offices love proof. A 'Beglaubigung' is an official stamp (usually from the Rathaus or Bürgeramt) confirming a copy is identical to the original.",
          xpReward: 10
        },
        {
          id: "ex14-2-8",
          type: "fill-blank",
          question: "Complete: Ich möchte einen _____ stellen. (I'd like to submit an application.)",
          options: ["Antrag", "Termin", "Ausweis", "Brief"],
          correctAnswer: "Antrag",
          explanation: "The phrase is 'einen Antrag stellen' (to place an application). It's formal legalese. You don't 'give' an application, you 'place' it.",
          xpReward: 10
        },
        {
          id: "ex14-2-9",
          type: "dictation",
          question: "Listen and type: Ich habe einen Termin.",
          correctAnswer: "Ich habe einen Termin",
          explanation: "Perfect! This is the most important sentence when you arrive at any German office.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-have-appointment.mp3"
        },
        {
          id: "ex14-2-10",
          type: "free-text",
          question: "Translate to German: 'I need a residence permit.' (residence permit = Aufenthaltserlaubnis)",
          correctAnswer: "Ich brauche eine Aufenthaltserlaubnis",
          explanation: "Excellent! 'Aufenthaltserlaubnis' is a long word, but you've mastered it. Don't forget 'eine' (feminine).",
          xpReward: 30
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
      storyScene: {
        setting: {
          name: "Local Bank (In der Sparkasse)",
          sceneType: "office",
          timeOfDay: "afternoon",
          description: "A sleek, quiet bank branch with high ceilings and glass partitions. You're here with Arjun to open a 'Girokonto' (current account). You're used to G-Pay and UPI in India, but Arjun warns you: 'Germany-yil cash is king, machaa!'. You see people withdrawing cash from the 'Geldautomat'. You also need to keep your 'Schufa' (credit score) clean from day one. Ready to manage your 'Geld' (money) the German way?",
        },
        narrative: {
          previousRecap: "You've survived the government offices. Now, let's set up your financial life!",
          currentObjective: "Identify key banking terms and understand the process of opening an account and using cash",
          nextTeaser: "Next: Formal letters! Let's see how much paperwork the landlord wants!",
        },
        kuttanIntro: [
          "Machane! Banking logic ivide different aanu. UPI illaa, so manual 'Überweisung' (transfer) oru regular duty aanu. Every month Rent transfer cheyyan marakkallae!",
          "Social security number pole 'Steuer-ID' and 'Schufa' eppolum bank-um landlords-um chodikkum. Keep your record clean, pinne pedikkanda!",
          "Cash backup eppolum venam. Many small cafes 'Only Cash' board vekkum. Let's find the 'Geldautomat' and get started!",
        ],
        vocabEncounters: [
          { vocabId: "vocab14-3-2", encounterMoment: "You tell the clerk: 'Ich möchte ein Girokonto eröffnen.'", contextSentence: "Ich möchte ein Girokonto eröffnen." },
          { vocabId: "vocab14-3-4", encounterMoment: "Arjun points outside: 'There is the Geldautomat.'", contextSentence: "Der Geldautomat ist um die Ecke." },
          { vocabId: "vocab14-3-7", encounterMoment: "You note: 'Ich brauche eine Schufa-Auskunft.'", contextSentence: "Für den Mietvertrag brauche ich eine Schufa-Auskunft." },
          { vocabId: "vocab14-3-5", encounterMoment: "You tap the card: 'Ich zahle mit EC-Karte.'", contextSentence: "Kann ich mit EC-Karte zahlen?" },
        ],
        decisionPoints: [
          {
            moment: "Which account type do you need for receiving salary and paying monthly rent?",
            options: [
              { text: "Ein Girokonto.", isCorrect: true, response: "Exactly! Girokonto is your daily checking/current account.", kuttanReaction: "Adipoli! Banking logic perfectly capture cheythallo! 🔥" },
              { text: "A savings-only account.", isCorrect: false, response: "Aiyyo! Rent and salary standard checking account ('Girokonto') vazhi aayirikkum.", kuttanReaction: "Vite machane! Daily usage account venam. Try again! 😬" },
            ],
          },
          {
            moment: "You see a sign in a small bakery: 'Nur Barzahlung'. What does it mean?",
            options: [
              { text: "Only cash payments.", isCorrect: true, response: "Correct! 'Bar' means cash. This is very common in Germany.", kuttanReaction: "Superb! Cash logic correctly picked! ⭐" },
              { text: "Cards only.", isCorrect: false, response: "No! 'Nur Bar' means cash only. Always keep 20-30 Euros with you!", kuttanReaction: "Aiyyo! Pettalao? Cash illa enkil bakshanam kittila. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v14-3-1",
          title: "Ein Konto eröffnen — Banking Basics in Germany",
          duration: "14:00",
          description: "Everything you need to know about opening and managing a German bank account. UPI illaa, cash anu king — but bank account venam!",
          scriptOutline: [
            "Opening: 'Cash is King here! Digital India experience expect cheyyaruthu machane, cash transaction heavy aanu!'",
            "Sparkasse: Every town-ilum undu. SBI of Germany ennu parayaam!",
            "Konto Logic: Passport + Registration paper (Anmeldung) MUST aanu.",
            "Girokonto: Checking account for rent and salary. Everyday life engine!",
            "Überweisung: Bank transfer. No UPI, so manually money transfer cheyyunnathu standard aanu.",
            "Dauerauftrag: Auto-pay for rent. Every month manual transfer venda!",
            "Lastschrift: Direct debit. Companies pull money based on your permission.",
            "Geldautomat: ATM. Cash collect cheyyaan ivide varanam.",
            "IBAN: DE + 20 digits. IFSC and number combo logic thanne.",
            "SCHUFA: Credit score like CIBIL. Record clean venam enkil bills on-time pay cheyuka!",
            "Key: 'Ich möchte ein Girokonto eröffnen' — Say this with confidence!"
          ],
          keyVocabulary: ["Konto", "Girokonto", "Überweisung", "Geldautomat", "EC-Karte", "IBAN", "Schufa", "Dauerauftrag", "Lastschrift"],
          learningObjectives: [
            "Know the vocabulary for German banking",
            "Understand the process of opening a bank account",
            "Handle basic banking tasks in German",
            "Understand transfer methods: Überweisung, Dauerauftrag, Lastschrift"
          ],
          placeholderThumbnail: "/images/supermarket_checkout.png",
          richContent: [
            {
              type: "table",
              title: "German Banking Vocabulary",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["das Girokonto", "checking account", "ചെക്കിംഗ് അക്കൗണ്ട്"],
                ["die Überweisung", "bank transfer", "ബാങ്ക് ട്രാൻസ്ഫർ"],
                ["der Dauerauftrag", "standing order", "സ്ഥിരം പേയ്മെന്റ്"],
                ["die Lastschrift", "direct debit", "നേരിട്ടുള്ള ഡെബിറ്റ്"],
                ["der Geldautomat", "ATM", "എടിഎം"],
                ["die EC-Karte", "debit card", "ഡെബിറ്റ് കാർഡ്"]
              ]
            },
            {
              type: "note",
              title: "Cash is King!",
              variant: "warning",
              content: "Germany is much more cash-heavy than India's UPI culture. Always carry 20-30 EUR in cash. Many restaurants and small shops only accept 'Nur Bar' (cash only)!"
            },
            {
              type: "note",
              title: "SCHUFA = German CIBIL",
              variant: "info",
              content: "SCHUFA is your German credit score. Pay all bills on time! A bad SCHUFA score can prevent you from renting an apartment or getting a phone contract."
            }
          ]
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
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "Useful Bank Dialogues",
              headers: ["Situation", "German Phrase"],
              rows: [
                ["Open account", "Ich möchte ein Girokonto eröffnen."],
                ["Ask about fees", "Was kostet das Girokonto pro Monat?"],
                ["Lost card", "Ich habe meine EC-Karte verloren."],
                ["Make transfer", "Ich möchte eine Überweisung machen."],
                ["Check balance", "Wie hoch ist mein Kontostand?"]
              ]
            },
            {
              type: "note",
              title: "Compound Noun Trick",
              variant: "tip",
              content: "German banking loves compound nouns! Konto+führungs+gebühren = account maintenance fees. Konto+auszug = bank statement. Always read from right to left — the last word is the main meaning."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex14-3-1",
          type: "multiple-choice",
          question: "What is a 'Girokonto'?",
          options: ["A checking / current account", "A savings account", "A credit card", "A loan"],
          correctAnswer: "A checking / current account",
          explanation: "In Germany, a 'Girokonto' is your survival account. Salary comes here, rent goes from here. It's the equivalent of a Checking or Current account.",
          xpReward: 10
        },
        {
          id: "ex14-3-2",
          type: "fill-blank",
          question: "Complete: Ich möchte ein Konto _____. (I'd like to open an account.)",
          options: ["eröffnen", "schließen", "kaufen", "machen"],
          correctAnswer: "eröffnen",
          explanation: "'Eröffnen' is the formal verb for opening something official like a bank account or a business. Use this to sound professional at the bank counter!",
          xpReward: 10
        },
        {
          id: "ex14-3-3",
          type: "matching",
          question: "Match the German banking term to its English meaning:",
          options: ["die Überweisung", "der Geldautomat", "die EC-Karte", "der Kontoauszug", "der Dauerauftrag"],
          correctAnswer: ["bank transfer", "ATM", "debit card", "bank statement", "standing order"],
          explanation: "Vocabulary is money! Knowing 'Überweisung' is key because there is no UPI in Germany—everyone uses bank transfers.",
          xpReward: 15
        },
        {
          id: "ex14-3-4",
          type: "multiple-choice",
          question: "What is 'Schufa'?",
          options: ["Germany's credit rating system", "A type of bank account", "A German bank name", "An insurance company"],
          correctAnswer: "Germany's credit rating system",
          explanation: "Schufa is the 'CIBIL' Score of Germany. Every time you pay (or miss) a bill, your Schufa record changes. Landlords will ALWAYS ask for a Schufa report!",
          xpReward: 10
        },
        {
          id: "ex14-3-5",
          type: "multiple-choice",
          question: "What do you need for opening a bank account in Germany?",
          options: ["Passport and Anmeldung", "Only a passport", "Only an email address", "A German driver's license"],
          correctAnswer: "Passport and Anmeldung",
          explanation: "The 'Golden Duo'. Without your registration paper (Anmeldung), most banks won't give you an account, even with a valid passport.",
          xpReward: 10
        },
        {
          id: "ex14-3-6",
          type: "fill-blank",
          question: "Complete: Wo ist der nächste _____? (Where is the nearest ATM?)",
          options: ["Geldautomat", "Kontoauszug", "Überweisung", "Girokonto"],
          correctAnswer: "Geldautomat",
          explanation: "Geld (Money) + Automat (Machine). Since Germany is very cash-heavy compared to India or the UK, you'll need to find these often!",
          xpReward: 10
        },
        {
          id: "ex14-3-7",
          type: "ordering",
          question: "Put the steps for opening a bank account in correct order:",
          options: ["Receive your EC-Karte and PIN by mail", "Choose a bank (Sparkasse, N26, etc.)", "Set up Onlinebanking", "Bring passport and Meldebescheinigung to the bank", "Sign the Kontoeröffnungsantrag (account opening form)"],
          correctAnswer: ["Choose a bank (Sparkasse, N26, etc.)", "Bring passport and Meldebescheinigung to the bank", "Sign the Kontoeröffnungsantrag (account opening form)", "Receive your EC-Karte and PIN by mail", "Set up Onlinebanking"],
          explanation: "German banks often send the card and the PIN in TWO separate letters for security. Don't throw away the first letter thinking it's trash!",
          xpReward: 20
        },
        {
          id: "ex14-3-8",
          type: "fill-blank",
          question: "Complete: Ich habe meine EC-Karte _____. Kann ich eine neue bekommen? (I lost my debit card.)",
          options: ["verloren", "gefunden", "gekauft", "bezahlt"],
          correctAnswer: "verloren",
          explanation: "'Ich habe ... verloren' (I have lost). This is the Perfekt tense form of 'verlieren'. Essential for reporting emergencies!",
          xpReward: 10
        },
        {
          id: "ex14-3-9",
          type: "dictation",
          question: "Listen and type: Ich möchte ein Girokonto eröffnen.",
          correctAnswer: "Ich möchte ein Girokonto eröffnen",
          explanation: "Great job! This is the correct way to tell the bank clerk your objective.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-open-account.mp3"
        },
        {
          id: "ex14-3-10",
          type: "free-text",
          question: "Write in German: 'Where is the ATM?' (use Geldautomat)",
          correctAnswer: "Wo ist der Geldautomat",
          explanation: "Wunderbar! 'Wo ist der Geldautomat?' is a survival must in cash-heavy Germany.",
          xpReward: 30
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
      storyScene: {
        setting: {
          name: "WG Desk (Am Schreibtisch)",
          sceneType: "home",
          timeOfDay: "evening",
          description: "It's late evening, and the room is quiet. You're focus on your laptop, trying to write a 'Kündigung' (cancellation) for a contract. In Kerala, we might write a emotional letter, but in Germany, the 'Betreff' (subject) must be bold and the greeting must be precise. Arjun looks over: 'Eda, comma sradhikkanne!'. You're learning the 'Sandwich' of formal writing: Header, Greeting, Body, and the final 'Mit freundlichen Grüßen'. One small mistake and it's ignored. Ready to sound like a pro, machane?",
        },
        narrative: {
          previousRecap: "You've set up your bank. Now, let's learn how to communicate formally with the rest of Germany!",
          currentObjective: "Correctly structure a formal letter and use 'weil/dass' clauses with verb-final placement",
          nextTeaser: "Module 14 complete! You're now a bureau-survivalist! Next: Module 15 - Shopping & Clothing!",
        },
        kuttanIntro: [
          "Machane! Formal writing German-il oru ritual aanu. 'Sehr geehrte Damen und Herren' (Dear Sir/Madam) is the gold standard if you don't know the name.",
          "Pinne 'Betreff' (subject line) bold aayi veykkunnu. Body-il 'weil' (because) or 'dass' (that) use cheyyumpol, remember: Verb goes to the end! 'Ich schreibe Ihnen, weil ich Hilfe BRAUCHE'.",
          "Closing eppolum 'Mit freundlichen Grüßen' (With friendly regards) mathram pora, signature-um venam. Let's draft your first official letter!",
        ],
        vocabEncounters: [
          { vocabId: "vocab14-4-2", encounterMoment: "You type: 'Sehr geehrte Damen und Herren,'", contextSentence: "Sehr geehrte Damen und Herren, ich schreibe Ihnen wegen..." },
          { vocabId: "vocab14-4-1", encounterMoment: "You center the text: 'Betreff: Terminanfrage'.", contextSentence: "Betreff: Terminanfrage" },
          { vocabId: "vocab14-4-3", encounterMoment: "You sign off: 'Mit freundlichen Grüßen'.", contextSentence: "Mit freundlichen Grüßen, Arun Nair" },
          { vocabId: "vocab14-4-9", encounterMoment: "Arjun reminds you: 'Kündigungsfrist (deadline) sradhikkani!'.", contextSentence: "Ich möchte eine Kündigung meines Vertrages einreichen." },
        ],
        decisionPoints: [
          {
            moment: "You know the recipient is 'Herr Müller'. How do you start the letter?",
            options: [
              { text: "Sehr geehrter Herr Müller,", isCorrect: true, response: "Exactly! For men, use 'geehrter'. For women, 'geehrte'.", kuttanReaction: "Adipoli! Greeting logic perfectly capture cheythallo! 🔥" },
              { text: "Respected Herr Müller,", isCorrect: false, response: "Aiyyo! 'Respected' works in India, but in Germany, we stay with 'Sehr geehrte'.", kuttanReaction: "Vite machane! Translation error aanu. Try again! 😬" },
            ],
          },
          {
            moment: "You want to say 'I am writing because I need help'. Where do you place 'brauche'?",
            options: [
              { text: "At the very end of the sentence.", isCorrect: true, response: "Correct! 'weil' kicks the verb to the end.", kuttanReaction: "Superb! Subordinate clause logic correctly noted! ⭐" },
              { text: "Position 2 after 'Ich'.", isCorrect: false, response: "No! In a 'weil' clause, the verb moves from Pos 2 to the end.", kuttanReaction: "Aiyyo! Sub-clause logic sradhikkanne machane. Try again! 🚫" },
            ],
          },
        ],
      },
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
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "Formal Letter Structure",
              headers: ["Part", "German", "Example"],
              rows: [
                ["Sender", "Absender", "Arun Nair, Mozartstr. 12, 10115 Berlin"],
                ["Recipient", "Empfänger", "Ausländerbehörde Berlin"],
                ["Date", "Datum", "Berlin, den 15. März 2026"],
                ["Subject", "Betreff", "Verlängerung meiner Aufenthaltserlaubnis"],
                ["Greeting", "Anrede", "Sehr geehrte Damen und Herren,"],
                ["Closing", "Schluss", "Mit freundlichen Grüßen"],
                ["Signature", "Unterschrift", "(your handwritten signature)"]
              ]
            },
            {
              type: "note",
              title: "Comma After Greeting!",
              variant: "warning",
              content: "In German formal letters, use a COMMA after the greeting (not a colon like English). 'Sehr geehrte Damen und Herren,' — and the next line starts with a SMALL letter (unless it's a noun)!"
            },
            {
              type: "note",
              title: "No Comma After Closing!",
              variant: "tip",
              content: "'Mit freundlichen Grüßen' has NO comma after it. Just your name below. This is the opposite of the greeting rule!"
            }
          ]
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
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "Email Greeting & Closing Formality Levels",
              headers: ["Level", "Greeting", "Closing"],
              rows: [
                ["Very formal", "Sehr geehrte Damen und Herren,", "Mit freundlichen Grüßen"],
                ["Formal", "Sehr geehrte Frau Müller,", "Freundliche Grüße"],
                ["Professional", "Guten Tag Frau Müller,", "Beste Grüße"],
                ["Informal", "Liebe/Lieber...,", "Viele Grüße"]
              ]
            },
            {
              type: "note",
              title: "weil & dass = Verb to the END!",
              variant: "warning",
              content: "'Ich schreibe, weil ich einen Termin BRAUCHE.' — In subordinate clauses with weil/dass, the verb moves to the LAST position. This is non-negotiable in German!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "die Kündigung", english: "cancellation", malayalam: "റദ്ദാക്കൽ", pronunciation: "kün-di-gung" },
                { german: "die Reklamation", english: "complaint", malayalam: "പരാതി", pronunciation: "re-kla-ma-tsion" },
                { german: "die Bestätigung", english: "confirmation", malayalam: "സ്ഥിരീകരണം", pronunciation: "be-shtay-ti-gung" }
              ]
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex14-4-1",
          type: "multiple-choice",
          question: "What is the standard formal greeting when you don't know the recipient's name?",
          options: ["Sehr geehrte Damen und Herren,", "Lieber Freund,", "Hallo zusammen,", "Hey,"],
          correctAnswer: "Sehr geehrte Damen und Herren,",
          explanation: "This is the king of formal greetings. Note: Always use a COMMA at the end, and the first word after the greeting starts with a SMALL letter (unless it's a noun)!",
          xpReward: 10
        },
        {
          id: "ex14-4-2",
          type: "fill-blank",
          question: "Complete the closing: Mit freundlichen _____",
          options: ["Grüßen", "Grüße", "Gruß", "Grüssen"],
          correctAnswer: "Grüßen",
          explanation: "Mit freundlichen Grüßen (With friendly regards). Pro tip: NO comma after this closing. Just your name on the next line.",
          xpReward: 10
        },
        {
          id: "ex14-4-3",
          type: "multiple-choice",
          question: "In a Nebensatz with 'weil', where does the verb go?",
          options: ["At the end of the clause", "At the beginning", "In the second position", "It doesn't change"],
          correctAnswer: "At the end of the clause",
          explanation: "THE VERB-FINAL RULE: Words like 'weil' (because) and 'dass' (that) kick the conjugated verb to the very end of the sub-clause. It's the ultimate test of B1-level fluency!",
          xpReward: 15
        },
        {
          id: "ex14-4-4",
          type: "matching",
          question: "Match the compound noun to its meaning:",
          options: ["Krankenversicherung", "Aufenthaltsgenehmigung", "Mietvertrag", "Kündigungsfrist", "Kontoeröffnung"],
          correctAnswer: ["health insurance", "residence authorization", "rental contract", "cancellation period", "account opening"],
          explanation: "Compound Nouns = Lego bricks. Krank (Sick) + Versicherung (Insurance). German stacks meanings like this. Break them apart to understand them!",
          xpReward: 15
        },
        {
          id: "ex14-4-5",
          type: "ordering",
          question: "Put the parts of a formal letter in the correct order:",
          options: ["Mit freundlichen Grüßen + Unterschrift", "Sehr geehrte Damen und Herren,", "Betreff: Terminanfrage", "Absender (your address) + Empfänger (their address) + Datum", "Ich schreibe Ihnen, weil ich einen Termin brauche."],
          correctAnswer: ["Absender (your address) + Empfänger (their address) + Datum", "Betreff: Terminanfrage", "Sehr geehrte Damen und Herren,", "Ich schreibe Ihnen, weil ich einen Termin brauche.", "Mit freundlichen Grüßen + Unterschrift"],
          explanation: "German formality is a ritual: Headers -> Topic -> Greeting -> Body -> Sign-off. Skipping any part makes the letter look unprofessional.",
          xpReward: 20
        },
        {
          id: "ex14-4-6",
          type: "fill-blank",
          question: "Complete: Ich schreibe, _____ ich einen Termin brauche. (I write because I need an appointment.)",
          options: ["weil", "dass", "wenn", "ob"],
          correctAnswer: "weil",
          explanation: "'Weil' is for reasons. Notice the verb 'brauche' at the end? That's the 'weil' effect in action!",
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
        },
        {
          id: "ex14-4-9",
          type: "dictation",
          question: "Listen and type: Sehr geehrte Damen und Herren,",
          correctAnswer: "Sehr geehrte Damen und Herren",
          explanation: "Perfect! This is the gold standard for formal greetings in letters.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-formal-greeting.mp3"
        },
        {
          id: "ex14-4-10",
          type: "free-text",
          question: "Write in German: 'With friendly regards' (the formal closing)",
          correctAnswer: "Mit freundlichen Grüßen",
          explanation: "Excellent! 'Mit freundlichen Grüßen' is the correct formal sign-off. No comma after it!",
          xpReward: 30
        },
        {
          id: "ex14-4-11",
          type: "free-text",
          question: "Translate to German: 'I am writing because I need help.' (use weil, help = Hilfe)",
          correctAnswer: "Ich schreibe, weil ich Hilfe brauche",
          explanation: "Wunderbar! 'brauche' moves to the end of the clause because of 'weil'.",
          xpReward: 30
        },
        {
          id: "ex14-4-12",
          type: "free-text",
          question: "Translate to German: 'I hereby cancel my contract.' (use kündige)",
          correctAnswer: "Hiermit kündige ich meinen Vertrag",
          explanation: "Great job! This is the standard legal phrase for cancellation.",
          xpReward: 30
        }
      ],
      vocabulary: [
        { id: "vocab14-4-1", german: "der Betreff", english: "subject (of a letter)", malayalam: "വിഷയം", pronunciation: "be-treff", example: "Betreff: Terminanfrage", exampleTranslation: "Subject: Appointment request" },
        { id: "vocab14-4-2", german: "Sehr geehrte Damen und Herren", english: "Dear Sir or Madam", malayalam: "ബഹുമാനപ്പെട്ട മഹാശയ/മഹാശയി", pronunciation: "zair ge-air-te dah-men oont hair-en", example: "Sehr geehrte Damen und Herren, ich schreibe Ihnen wegen...", exampleTranslation: "Dear Sir or Madam, I am writing to you regarding..." },
        { id: "vocab14-4-3", german: "Mit freundlichen Grüßen", english: "With kind regards / Yours sincerely", malayalam: "ആദരപൂർവ്വം", pronunciation: "mit froynt-li-khen grue-sen", example: "Mit freundlichen Grüßen, Arun Nair", exampleTranslation: "With kind regards, Arun Nair" },
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
