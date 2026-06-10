import type { Module } from '../types';

export const MODULE_10: Module = {
  id: 10,
  title: "Health & Body",
  titleGerman: "Gesundheit",
  description: "Learn to talk about your body, describe symptoms, and visit the doctor in German.",
  icon: "🏥",
  color: "#ec4899",
  totalHours: 10,
  unlockRequirement: "Complete Module 9",
  learningTips: [
    "Touch each body part and say it in German: der Kopf, die Hand, das Bein. Physical association = faster recall.",
    "Practice saying 'Ich habe Kopfschmerzen' (I have a headache) — you WILL need this in Germany.",
    "German compound words are logical: Kopf (head) + Schmerzen (pain) = Kopfschmerzen. Break them apart to understand!",
  ],
  lessons: [
    {
      id: "10-1",
      title: "Body Parts",
      titleGerman: "Körperteile",
      description: "Learn the German words for body parts — from head to toe! Plus, learn to say 'My ... hurts' with 'tut weh'.",
      duration: "50 min",
      xpReward: 130,
      storyScene: {
        setting: {
          name: "WG Living Room (Morning Workout)",
          sceneType: "home",
          timeOfDay: "morning",
          description: "You're trying a home workout to stay fit in the German winter. Stefan is showing you some exercises. 'Kopf hoch!' (Head up!) he says. You're stretching your arms and legs. But wait, did you just pull a muscle? In Kerala, we'd say 'Ente thala vedanikkunnu'. Here, it's 'Mein Kopf tut weh'. Let's learn the parts before we break anything, machane!",
        },
        narrative: {
          previousRecap: "You've mastered the city transport. Now, let's focus on yourself — starting with your body!",
          currentObjective: "Identify basic body parts and express physical pain using 'tut weh' (singular) and 'tun weh' (plural)",
          nextTeaser: "Next: feeling a bit under the weather? Let's describe how we're feeling!",
        },
        kuttanIntro: [
          "Machane! Body parts padikkunnathu biology class pole alla, it's practical. Doctor-de aduthu chellan vayya ennu parayan ithu must aanu.",
          "Main pattern: [Body Part] + tut weh. Singular aanel 'tut', plural aanel 'tun'. Easy logic!",
          "Pinne 'Kopf' (head) eppozhum capitalize cheyyaname — German-il nouns ellaam capitals aanu. Let's do some reps!",
        ],
        vocabEncounters: [
          { vocabId: "vocab10-1-1", encounterMoment: "Stefan yells: 'Kopf hoch!' (Head up!).", contextSentence: "Mein Kopf tut weh." },
          { vocabId: "vocab10-1-6", encounterMoment: "You stretch: 'Meine Arme sind lang.' (My arms are long).", contextSentence: "Mein Arm ist gebrochen." },
          { vocabId: "vocab10-1-10", encounterMoment: "You lift a box and... 'Aiyyo, mein Rücken!' (Ouch, my back!).", contextSentence: "Ich have Rückenschmerzen." },
          { vocabId: "vocab10-1-11", encounterMoment: "Lara jokes: 'Kommst du ins Krankenhaus?' (Are you going to the hospital?).", contextSentence: "Mein Bruder ist im Krankenhaus." },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'My head hurts'. Which sentence is grammatically correct?",
            options: [
              { text: "Mein Kopf tut weh.", isCorrect: true, response: "Exactly! 'tut weh' is for singular objects like one head.", kuttanReaction: "Adipoli! Grammar correct aayi pick cheythallo. Rule noted! 🔥" },
              { text: "Mein Kopf tun weh.", isCorrect: false, response: "Aiyyo! 'tun weh' is for plural (two or more). For one head, use 'tut weh'.", kuttanReaction: "Vite machane! Singular/Plural difference sradhikkaname. Try again! 😬" },
            ],
          },
          {
            moment: "You are pointing to your back. What is the German word for it?",
            options: [
              { text: "der Rücken.", isCorrect: true, response: "Correct! 'der Rücken' means back.", kuttanReaction: "Superb! Body part logic catch cheythallo. ⭐" },
              { text: "der Mund.", isCorrect: false, response: "No! 'der Mund' is the mouth. Back is 'Rücken'.", kuttanReaction: "Aiyyo! Mouth-um Back-um thammil confuse aavalle! Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v10-1-1",
          title: "Der Körper - Body Parts in German",
          duration: "12:00",
          description: "A fun tour of body parts in German with easy memory tricks for Malayalam speakers",
          scriptOutline: [
            "Opening: 'Health is wealth, machane! Doctor-de aduthu poyal symptoms parayan ee lesson help cheyyum! Thalayil thudangi kaalil theerum!'",
            "der Kopf (head) — 'Top-il ulla Kopf! Logic simple aanu.'",
            "das Auge (eye) — 'Auge looks like eye! Plural: die Augen (two eyes).'",
            "die Nase (nose), der Mund (mouth), das Ohr (ear) — simple stackable words.",
            "der Arm (arm), die Hand (hand) — English logic pole thanne. Match aanu!",
            "das Bein (leg), der Fuß (foot) — 'Foot looks like foot!'. Remember: leg is 'Bein', bone logic.",
            "der Rücken (back), der Bauch (stomach) — 'Bauch' like the sound if someone hits you — Ouch-Bauch!",
            "Pain Logic: 'Mein Kopf tut weh' — My head hurts. Verb separable aanu.",
            "Pattern: [body part] + tut weh (one) or tun weh (many).",
            "Parallel: 'Ente thala vedanikkunnu' — here 'vedana' ends the logic, just like 'weh' in German!",
            "Drill: Point and name quick-fire! Are you ready?"
          ],
          keyVocabulary: ["der Kopf", "das Auge", "die Hand", "der Fuß", "tut weh"],
          learningObjectives: [
            "Name at least 10 body parts in German with correct articles",
            "Use 'tut weh' to express pain in a specific body part",
            "Know the plural forms of common body parts"
          ],
          placeholderThumbnail: "/images/doctor_waiting_room.png",
          richContent: [
            {
              type: "table",
              title: "Body Parts in German",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["der Kopf", "head", "തല"],
                ["das Auge (die Augen)", "eye (eyes)", "കണ്ണ് (കണ്ണുകൾ)"],
                ["die Nase", "nose", "മൂക്ക്"],
                ["der Mund", "mouth", "വായ"],
                ["das Ohr (die Ohren)", "ear (ears)", "ചെവി (ചെവികൾ)"],
                ["der Arm", "arm", "കൈ"],
                ["die Hand", "hand", "കൈപ്പത്തി"],
                ["das Bein", "leg", "കാൽ"],
                ["der Fuß", "foot", "പാദം"],
                ["der Rücken", "back", "മുതുക്"],
                ["der Bauch", "stomach/belly", "വയറ്"]
              ]
            },
            {
              type: "note",
              title: "The 'tut weh' Pattern",
              variant: "tip",
              content: "To say something hurts: [body part] + tut weh (singular) or tun weh (plural). 'Mein Kopf tut weh' (My head hurts). 'Meine Augen tun weh' (My eyes hurt). The 'weh' always goes to the end!"
            }
          ]
        },
        {
          id: "v10-1-2",
          title: "Tut weh! — Expressing Pain Like a Pro",
          duration: "8:00",
          description: "Master the 'tut weh' and 'tun weh' pattern to describe any ache or pain",
          scriptOutline: [
            "Opening: 'Oru body part vedanikkunnu ennu parayaan German-il super easy aanu!'",
            "Singular pattern: 'Mein Kopf tut weh' — one thing hurts",
            "Plural pattern: 'Meine Augen tun weh' — multiple things hurt",
            "Adding intensity: 'ein bisschen' (a little), 'sehr' (very), 'furchtbar' (terribly)",
            "Mein Kopf tut ein bisschen weh vs. Mein Kopf tut furchtbar weh — BIG difference!",
            "Formal at the doctor: 'Mein Rücken tut weh' — same pattern, works everywhere",
            "Quick drill: I show a body part, you say the 'tut weh' sentence!",
            "Wrap-up: 'Ippo ningalkku enthu vedanichaalum German-il parayaam!'"
          ],
          keyVocabulary: ["tut weh", "tun weh", "ein bisschen", "sehr", "furchtbar"],
          learningObjectives: [
            "Confidently use 'tut weh' for singular and 'tun weh' for plural body parts",
            "Add intensity modifiers to pain descriptions",
            "Produce full sentences about pain in different body parts"
          ],
          placeholderThumbnail: "/images/doctor_waiting_room.png",
          richContent: [
            {
              type: "table",
              title: "Pain Intensity Scale",
              headers: ["German", "English", "Level"],
              rows: [
                ["ein bisschen", "a little", "Mild"],
                ["etwas", "somewhat", "Moderate"],
                ["sehr", "very", "Strong"],
                ["stark", "strong/intense", "Severe"],
                ["furchtbar", "terribly", "Extreme"]
              ]
            },
            {
              type: "table",
              title: "tut weh vs tun weh",
              headers: ["Type", "Pattern", "Example"],
              rows: [
                ["Singular", "Mein [body part] tut weh", "Mein Kopf tut weh."],
                ["Plural", "Meine [body parts] tun weh", "Meine Augen tun weh."],
                ["With intensity", "Mein [part] tut [level] weh", "Mein Rücken tut sehr weh."]
              ]
            },
            {
              type: "note",
              title: "Doctor-Ready Phrases",
              variant: "info",
              content: "At the doctor, combine body part + intensity: 'Mein Kopf tut furchtbar weh' (My head hurts terribly). This helps the doctor understand exactly how bad it is. Keep it simple and direct!"
            }
          ]
        }
      ],
      exercises: [
        { id: "ex10-1-1", type: "matching", question: "Match the German body part to its English meaning:", options: ["der Kopf", "das Auge", "die Hand", "der Fuß", "der Bauch"], correctAnswer: ["head", "eye", "hand", "foot", "stomach/belly"], explanation: "Identifying basic body parts is the foundation of medical German. Note the genders: der (masc), die (fem), das (neut).", xpReward: 15 },
        { id: "ex10-1-2", type: "multiple-choice", question: "How do you say 'My head hurts' in German?", options: ["Mein Kopf tut weh.", "Mein Kopf ist weh.", "Ich habe Kopf weh.", "Mein Kopf schmerzt weh."], correctAnswer: "Mein Kopf tut weh.", explanation: "The standard pattern is [Body Part] + tut weh. 'Wehtun' is a separable verb, so 'weh' goes to the very end of the sentence.", xpReward: 10 },
        { id: "ex10-1-3", type: "fill-blank", question: "Meine Augen tun ___ . (hurt — plural form)", options: ["weh", "schlecht", "krank", "Schmerzen"], correctAnswer: "weh", explanation: "When the body part is plural (Augen), the verb changes from 'tut' to 'tun'. Think of it as 'My eyes DO hurt'.", xpReward: 10 },
        { id: "ex10-1-4", type: "multiple-choice", question: "What is the correct article for 'Nase' (nose)?", options: ["die Nase", "der Nase", "das Nase", "den Nase"], correctAnswer: "die Nase", explanation: "'Nase' is feminine. A good mnemonic: 'Nase' ends in 'e', and many feminine nouns in German end in 'e'.", xpReward: 10 },
        { id: "ex10-1-5", type: "ordering", question: "Arrange: 'My back hurts a lot'", options: ["Mein", "Rücken", "tut", "sehr", "weh"], correctAnswer: ["Mein", "Rücken", "tut", "sehr", "weh"], explanation: "Structure: Subject + Verb (tut) + Adverb (sehr) + Separable Prefix (weh).", xpReward: 15 },
        { id: "ex10-1-6", type: "fill-blank", question: "Mein ___ ist gebrochen. (arm)", options: ["Arm", "Bein", "Fuß", "Kopf"], correctAnswer: "Arm", explanation: "'Arm' is masculine ('der Arm'), so it uses 'Mein' (no ending for masculine/neuter nominative).", xpReward: 10 },
        { id: "ex10-1-7", type: "multiple-choice", question: "Which body part is 'das Ohr'?", options: ["ear", "eye", "mouth", "nose"], correctAnswer: "ear", explanation: "das Ohr (ear) is neuter. The plural is 'die Ohren'. Think of 'Hear' having 'ear' in it!", xpReward: 10 },
        { id: "ex10-1-8", type: "matching", question: "Match the body part to its correct article:", options: ["der Rücken", "die Hand", "das Bein", "der Mund", "das Ohr"], correctAnswer: ["back", "hand", "leg", "mouth", "ear"], explanation: "Memorizing articles with the nouns is non-negotiable in German. der Rücken (m), die Hand (f), das Bein (n).", xpReward: 15 },
        {
          id: "ex10-1-9",
          type: "dictation",
          question: "Listen and type: Mein Kopf tut weh.",
          correctAnswer: "Mein Kopf tut weh",
          explanation: "Great! 'tut weh' is for singular body parts. And remember to capitalize 'Kopf'!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-head-hurts.mp3"
        },
        {
          id: "ex10-1-10",
          type: "free-text",
          question: "Write in German: 'My hand hurts.' (hand = Hand)",
          correctAnswer: "Meine Hand tut weh",
          explanation: "Wunderbar! 'Meine Hand' because Hand is feminine. 'tut weh' because it's one hand.",
          xpReward: 30
        }
      ,
        {
          id: "ex10-1-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Body Parts): 'Ich habe Kopfschmerzen und brauche einen Arzt.'",
          questionGerman: "Sprechen Sie laut: 'Ich habe Kopfschmerzen und brauche einen Arzt.'",
          correctAnswer: "Ich habe Kopfschmerzen und brauche einen Arzt",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab10-1-1", german: "der Kopf", english: "head", malayalam: "തല", pronunciation: "kopf", example: "Mein Kopf tut weh.", exampleTranslation: "My head hurts." },
        { id: "vocab10-1-2", german: "das Auge", english: "eye", malayalam: "കണ്ണ്", pronunciation: "ow-ge", example: "Ich habe blaue Augen.", exampleTranslation: "I have blue eyes." },
        { id: "vocab10-1-3", german: "die Nase", english: "nose", malayalam: "മൂക്ക്", pronunciation: "nah-ze", example: "Meine Nase ist verstopft.", exampleTranslation: "My nose is blocked." },
        { id: "vocab10-1-4", german: "der Mund", english: "mouth", malayalam: "വായ", pronunciation: "moont", example: "Öffnen Sie den Mund, bitte.", exampleTranslation: "Open your mouth, please." },
        { id: "vocab10-1-5", german: "das Ohr", english: "ear", malayalam: "ചെവി", pronunciation: "ohr", example: "Mein Ohr tut weh.", exampleTranslation: "My ear hurts." },
        { id: "vocab10-1-6", german: "der Arm", english: "arm", malayalam: "കൈ", pronunciation: "ahrm", example: "Mein Arm ist gebrochen.", exampleTranslation: "My arm is broken." },
        { id: "vocab10-1-7", german: "die Hand", english: "hand", malayalam: "കൈപ്പത്തി", pronunciation: "hahnt", example: "Gib mir deine Hand.", exampleTranslation: "Give me your hand." },
        { id: "vocab10-1-8", german: "das Bein", english: "leg", malayalam: "കാൽ", pronunciation: "byne", example: "Mein Bein schmerzt.", exampleTranslation: "My leg hurts." },
        { id: "vocab10-1-9", german: "der Fuß", english: "foot", malayalam: "പാദം", pronunciation: "foos", example: "Mein Fuß tut weh.", exampleTranslation: "My foot hurts." },
        { id: "vocab10-1-10", german: "der Rücken", english: "back", malayalam: "മുതുക്", pronunciation: "rü-ken", example: "Ich habe Rückenschmerzen.", exampleTranslation: "I have back pain." },
        { id: "vocab10-1-11", german: "das Krankenhaus", english: "hospital", malayalam: "ആശുപത്രി", pronunciation: "dahs krahn-ken-hows", example: "Mein Bruder ist im Krankenhaus.", exampleTranslation: "My brother is in the hospital." }
      ]
    },
    {
      id: "10-2",
      title: "How Are You Feeling?",
      titleGerman: "Wie geht es dir?",
      description: "Express how you feel — from tired and sick to headaches and fever. Master the Dativ for feelings!",
      duration: "50 min",
      xpReward: 130,
      storyScene: {
        setting: {
          name: "WG Kitchen (Morning Breakfast)",
          sceneType: "home",
          timeOfDay: "morning",
          description: "The coffee is brewing, but you haven't touched your breakfast. You look a bit 'müde' (tired). Lara sits across from you and asks: 'Wie geht es dir?'. In Malayalam, we'd say 'Sugam thanne', but if you're not well, you need to say it. German uses Dativ for health: 'Mir geht es...' (To me it goes...). Time to describe the symptoms, machane!",
        },
        narrative: {
          previousRecap: "You've identified the body parts. Now, let's talk about the sensations inside them!",
          currentObjective: "Express health status using 'Mir geht es...' and describe ailments like fever and headaches",
          nextTeaser: "Next: Doctor's visit! Let's handle the clinical conversation!",
        },
        kuttanIntro: [
          "Machane! Physical feelings-inu German-il Dativ aanu artham. 'Mir ist kalt' (I feel cold) - 'Ich bin kalt' ennu parayalle!",
          "'Ich habe' eppozhum ailments-inte koode varum. 'Ich habe Kopfschmerzen', 'Ich habe Fieber'. Ithu fixed structure aanu.",
          "Pinne 'krank' (sick) enna word sradhikkanne. Kerala-yil nammukk vayya ennu parayunna pole Germany-yilum health important aanu. Let's express it!",
        ],
        vocabEncounters: [
          { vocabId: "vocab10-2-1", encounterMoment: "Lara checks your forehead: 'Bist du krank?' (Are you sick?).", contextSentence: "Ich bin heute krank." },
          { vocabId: "vocab10-2-3", encounterMoment: "You yawn: 'Ich bin sehr müde.' (I am very tired).", contextSentence: "Ich bin sehr müde." },
          { vocabId: "vocab10-2-4", encounterMoment: "You rub your temples: 'Ich habe Kopfschmerzen.' (I have a headache).", contextSentence: "Ich habe starke Kopfschmerzen." },
          { vocabId: "vocab10-2-6", encounterMoment: "Lara gets a thermometer: 'Hast du Fieber?' (Do you have a fever?).", contextSentence: "Ich habe hohes Fieber." },
        ],
        decisionPoints: [
          {
            moment: "Lara asks 'Wie geht es dir?'. You want to say 'I am not doing well'. Which response is correct?",
            options: [
              { text: "Mir geht es nicht gut.", isCorrect: true, response: "Exactly! Feelings use 'Mir' (Dativ) in German.", kuttanReaction: "Adipoli! Dativ power correctly use cheythallo! 🔥" },
              { text: "Ich gehe nicht gut.", isCorrect: false, response: "Aiyyo! 'Ich gehe' means you are actually walking poorly. For feelings, its 'Mir geht es...'.", kuttanReaction: "Vite machane! Walking alla purpose, health aanu. Try again! 😬" },
            ],
          },
          {
            moment: "You feel nauseous. How do you say 'I feel sick/unwell' without calling yourself a bad person?",
            options: [
              { text: "Mir ist schlecht.", isCorrect: true, response: "Correct! 'Mir ist schlecht' means you feel unwell. 'Ich bin schlecht' means you are a bad person!", kuttanReaction: "Superb! Dativ Trap-il ninnu escape aayallo! Avoided the 'bad person' logic! ⭐" },
              { text: "Ich bin schlecht.", isCorrect: false, response: "No! This means you are a villain or a bad human! Use 'Mir ist schlecht' for health.", kuttanReaction: "Aiyyo! Nee villain alla machane! Use 'Mir' for health. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v10-2-1",
          title: "Wie geht es dir? — Feelings & Health",
          duration: "12:00",
          description: "Learn to talk about how you feel, common ailments, and the Dativ pattern for feelings",
          scriptOutline: [
            "Opening: 'Sugam aanennu parayaan German-il ariyaam — but enikku vayya ennu engane parayum?'",
            "Mir geht es gut — I'm doing well (Dativ: MIR, not ICH! Ithu thettalle!)",
            "Mir geht es schlecht — I'm not doing well. Mood off case aanu.",
            "Words: müde (tired), krank (sick), gesund (healthy/fit).",
            "Ailments: 'Ich habe...' + Kopfschmerzen or Bauchschmerzen.",
            "Fever/Cold: Fieber (fever), Husten (cough), Schnupfen (cold). Flu season logic!",
            "DATIV TRAP: 'Mir ist kalt' (I feel cold). If you say 'Ich bin kalt', it means you are stone-hearted!",
            "Logic: In German, physical feelings happen *to* you, so use Dativ 'Mir'.",
            "Dialogue: 'Was ist los?' 'Mir geht es nicht gut. Ich habe Kopfschmerzen.'",
            "Drill: Describe your current energy level in German!"
          ],
          keyVocabulary: ["Mir geht es gut", "Kopfschmerzen", "Fieber", "krank", "müde"],
          learningObjectives: [
            "Express how you feel using 'Mir geht es...'",
            "Describe common ailments using 'Ich habe...'",
            "Understand why Dativ (Mir) is used for feelings, not Nominativ (Ich)"
          ],
          placeholderThumbnail: "/images/doctor_waiting_room.png",
          richContent: [
            {
              type: "table",
              title: "Health & Feelings Vocabulary",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["Mir geht es gut.", "I'm doing well.", "എനിക്ക് സുഖമാണ്."],
                ["Mir geht es schlecht.", "I'm not doing well.", "എനിക്ക് സുഖമില്ല."],
                ["müde", "tired", "ക്ഷീണം"],
                ["krank", "sick", "അസുഖം"],
                ["gesund", "healthy", "ആരോഗ്യം"],
                ["Kopfschmerzen", "headache", "തലവേദന"],
                ["Fieber", "fever", "പനി"],
                ["Husten", "cough", "ചുമ"],
                ["Schnupfen", "cold/runny nose", "ജലദോഷം"]
              ]
            },
            {
              type: "note",
              title: "DATIV Trap: 'Mir ist kalt' NOT 'Ich bin kalt'!",
              variant: "warning",
              content: "Physical feelings use Dativ (Mir), not Nominativ (Ich). 'Mir ist kalt' = I feel cold. 'Ich bin kalt' = I am cold-hearted! Same with 'Mir ist schlecht' (I feel nauseous) vs 'Ich bin schlecht' (I am a bad person)."
            }
          ]
        },
        {
          id: "v10-2-2",
          title: "Ich habe... — Ailments & the Dativ Trap",
          duration: "9:00",
          description: "Deep-dive into 'Ich habe + ailment' and the tricky Dativ feelings that catch every beginner",
          scriptOutline: [
            "Opening: 'Aiyyo, enikku vayya — ithu German-il engane parayum? Ailments-ine patti clear aayi padikkaam!'",
            "Recap: 'Ich habe' + noun for ailments — Kopfschmerzen, Fieber, Husten, Schnupfen.",
            "Compound nouns: Kopf+Schmerzen, Hals+Schmerzen, Zahn+Schmerzen — just stack them like Lego blocks!",
            "Halsschmerzen (sore throat) — 'Hals' = neck/throat. 'Enikku thonda-vedana undu'.",
            "Zahnschmerzen (toothache) — 'Zahn' = tooth. Don't forget the 'Z' sound (ts-ahn)!",
            "The Dativ Trap: 'Mir ist schlecht' (I feel nauseous) — NOT 'Ich bin schlecht'!",
            "Grammar Alert: 'Ich bin schlecht' means 'I am a bad person'. Unless you're a villain, don't say this!",
            "Mir ist warm / Mir ist kalt — physical sensations ALWAYS use Dativ 'Mir'. Why? Because the cold is happening *to* you.",
            "Practice dialogue: Two friends, one is sick — full conversation in real-time speed.",
            "Wrap-up: 'Ippo ningalkku doctor-nte aduthu poyal enthu parayanam ennu krithyamayi ariyaam!'"
          ],
          keyVocabulary: ["Halsschmerzen", "Zahnschmerzen", "Mir ist schlecht", "Mir ist kalt"],
          learningObjectives: [
            "Build compound nouns for different types of pain",
            "Avoid the 'Ich bin schlecht' vs 'Mir ist schlecht' mistake",
            "Use Dativ correctly for physical sensations"
          ],
          placeholderThumbnail: "/images/doctor_waiting_room.png",
          richContent: [
            {
              type: "table",
              title: "Compound Pain Nouns",
              headers: ["Body Part", "+ Schmerzen =", "English"],
              rows: [
                ["Kopf (head)", "Kopfschmerzen", "headache"],
                ["Hals (throat)", "Halsschmerzen", "sore throat"],
                ["Zahn (tooth)", "Zahnschmerzen", "toothache"],
                ["Bauch (stomach)", "Bauchschmerzen", "stomachache"],
                ["Rücken (back)", "Rückenschmerzen", "backache"]
              ]
            },
            {
              type: "table",
              title: "The Dativ Feeling Traps",
              headers: ["Correct (Dativ)", "Meaning", "WRONG (Nominativ)", "Wrong Meaning"],
              rows: [
                ["Mir ist kalt.", "I feel cold.", "Ich bin kalt.", "I am cold-hearted."],
                ["Mir ist schlecht.", "I feel nauseous.", "Ich bin schlecht.", "I am a bad person."],
                ["Mir ist warm.", "I feel warm.", "Ich bin warm.", "I am gay (slang)."]
              ]
            },
            {
              type: "note",
              title: "Why Dativ for Feelings?",
              variant: "info",
              content: "In German, physical sensations happen TO you — they aren't part of your identity. That's why you say 'Mir ist kalt' (to me it is cold) instead of 'Ich bin kalt'. The sensation is external, so Dativ is used!"
            }
          ]
        }
      ],
      exercises: [
        { id: "ex10-2-1", type: "multiple-choice", question: "How do you correctly say 'I'm not doing well' in German?", options: ["Mir geht es nicht gut.", "Ich gehe nicht gut.", "Mich geht es nicht gut.", "Ich bin nicht gut."], correctAnswer: "Mir geht es nicht gut.", explanation: "In German, feelings use the Dativ case: 'MIR geht es...' (literally: 'To me it goes...'). 'Mir' is the Dativ form of 'ich'.", xpReward: 10 },
        { id: "ex10-2-2", type: "fill-blank", question: "Ich habe ___ . (headache)", options: ["Kopfschmerzen", "Kopfweh", "Kopf tut weh", "Kopfkrank"], correctAnswer: "Kopfschmerzen", explanation: "'Kopfschmerzen' literally means 'head pains' (Kopf + Schmerzen). It's the standard way to say 'headache'. 'Ich habe Kopfschmerzen' = I have a headache.", xpReward: 10 },
        { id: "ex10-2-3", type: "matching", question: "Match the German health word to its English meaning:", options: ["müde", "krank", "das Fieber", "der Husten", "der Schnupfen"], correctAnswer: ["tired", "sick", "fever", "cough", "cold/runny nose"], xpReward: 15 },
        { id: "ex10-2-4", type: "multiple-choice", question: "Why is 'Mir ist kalt' correct, but 'Ich bin kalt' wrong?", options: ["Feelings use Dativ (Mir); 'Ich bin kalt' means 'I am cold-hearted'", "'Mir' and 'Ich' mean the same thing here", "'Ich bin kalt' is actually correct too", "There is no difference"], correctAnswer: "Feelings use Dativ (Mir); 'Ich bin kalt' means 'I am cold-hearted'", explanation: "Physical sensations use Dativ in German: 'Mir ist kalt' = I feel cold. 'Ich bin kalt' would mean you're a cold-hearted person — very different!", xpReward: 15 },
        { id: "ex10-2-5", type: "ordering", question: "Arrange: 'I am sick and have a fever'", options: ["Ich", "bin", "krank", "und", "habe", "Fieber"], correctAnswer: ["Ich", "bin", "krank", "und", "habe", "Fieber"], xpReward: 15 },
        { id: "ex10-2-6", type: "fill-blank", question: "___ geht es dir? (How are you? — informal)", options: ["Wie", "Was", "Wo", "Wer"], correctAnswer: "Wie", explanation: "'Wie geht es dir?' means 'How are you?' (informal). 'Wie' = how, 'geht' = goes, 'es' = it, 'dir' = to you (Dativ). Literally: 'How goes it to you?'", xpReward: 10 },
        { id: "ex10-2-7", type: "fill-blank", question: "Ich habe ___ . (sore throat)", options: ["Halsschmerzen", "Halsweh", "Halskrank", "Halsfieber"], correctAnswer: "Halsschmerzen", explanation: "'Halsschmerzen' = Hals (throat/neck) + Schmerzen (pains). German builds compound nouns by stacking — just combine the body part with 'Schmerzen'!", xpReward: 10 },
        { id: "ex10-2-8", type: "multiple-choice", question: "What does 'Mir ist schlecht' mean?", options: ["I feel nauseous / I feel unwell", "I am a bad person", "I am feeling sad", "I have bad luck"], correctAnswer: "I feel nauseous / I feel unwell", explanation: "'Mir ist schlecht' uses Dativ and means 'I feel unwell/nauseous'. If you said 'Ich bin schlecht', it would mean 'I am a bad person' — a classic beginner mistake!", xpReward: 10 },
        {
          id: "ex10-2-9",
          type: "dictation",
          question: "Listen and type: Mir geht es nicht gut.",
          correctAnswer: "Mir geht es nicht gut",
          explanation: "Perfect! Remember to use 'Mir' (Dative) when talking about how you are feeling.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-feel-not-good.mp3"
        },
        {
          id: "ex10-2-10",
          type: "free-text",
          question: "Translate to German: 'I have a fever and a cough.' (fever = Fieber, cough = Husten)",
          correctAnswer: "Ich habe Fieber und Husten",
          explanation: "Excellent! 'Ich habe Fieber und Husten.' — nouns are capitalized and no articles are needed here.",
          xpReward: 30
        }
      ,
        {
          id: "ex10-2-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (How Are You Feeling?): 'Ich habe Kopfschmerzen und brauche einen Arzt.'",
          questionGerman: "Sprechen Sie laut: 'Ich habe Kopfschmerzen und brauche einen Arzt.'",
          correctAnswer: "Ich habe Kopfschmerzen und brauche einen Arzt",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab10-2-1", german: "krank", english: "sick / ill", malayalam: "രോഗിയായ / അസുഖമുള്ള", pronunciation: "krahnk", example: "Ich bin heute krank.", exampleTranslation: "I am sick today." },
        { id: "vocab10-2-2", german: "gesund", english: "healthy", malayalam: "ആരോഗ്യമുള്ള", pronunciation: "ge-zoont", example: "Er ist wieder gesund.", exampleTranslation: "He is healthy again." },
        { id: "vocab10-2-3", german: "müde", english: "tired", malayalam: "ക്ഷീണിതനായ", pronunciation: "mü-de", example: "Ich bin sehr müde.", exampleTranslation: "I am very tired." },
        { id: "vocab10-2-4", german: "die Kopfschmerzen", english: "headache", malayalam: "തലവേദന", pronunciation: "kopf-shmer-tsen", example: "Ich habe starke Kopfschmerzen.", exampleTranslation: "I have a strong headache." },
        { id: "vocab10-2-5", german: "die Bauchschmerzen", english: "stomachache", malayalam: "വയറുവേദന", pronunciation: "bowkh-shmer-tsen", example: "Das Kind hat Bauchschmerzen.", exampleTranslation: "The child has a stomachache." },
        { id: "vocab10-2-6", german: "das Fieber", english: "fever", malayalam: "പനി", pronunciation: "fee-ber", example: "Ich habe hohes Fieber.", exampleTranslation: "I have a high fever." },
        { id: "vocab10-2-7", german: "der Husten", english: "cough", malayalam: "ചുമ", pronunciation: "hoo-sten", example: "Ich habe einen schlimmen Husten.", exampleTranslation: "I have a bad cough." },
        { id: "vocab10-2-8", german: "der Schnupfen", english: "cold / runny nose", malayalam: "ജലദോഷം", pronunciation: "shnoop-fen", example: "Ich habe Schnupfen.", exampleTranslation: "I have a cold." },
        { id: "vocab10-2-9", german: "die Halsschmerzen", english: "sore throat", malayalam: "തൊണ്ടവേദന", pronunciation: "hahls-shmer-tsen", example: "Ich habe seit gestern Halsschmerzen.", exampleTranslation: "I have had a sore throat since yesterday." },
        { id: "vocab10-2-10", german: "die Zahnschmerzen", english: "toothache", malayalam: "പല്ലുവേദന", pronunciation: "tsahn-shmer-tsen", example: "Meine Zahnschmerzen sind unerträglich.", exampleTranslation: "My toothache is unbearable." }
      ]
    },
    {
      id: "10-3",
      title: "At the Doctor",
      titleGerman: "Beim Arzt",
      description: "Navigate a doctor's visit in Germany — from making an appointment to getting a prescription.",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Reception (Arztpraxis)",
          sceneType: "station",
          timeOfDay: "afternoon",
          description: "The waiting room is quiet and smells faintly of disinfectant. There's a glass partition at the front. You need to present your 'Versicherungskarte' (insurance card) and explain why you're here. In Kerala, we might just walk into a clinic, but here, the 'Termin' (appointment) is king. Time to be professional, machane!",
        },
        narrative: {
          previousRecap: "You've identified how you feel. Now, let's get some professional help!",
          currentObjective: "Make an appointment, handle the reception paperwork, and describe symptoms to the doctor",
          nextTeaser: "Next: Pharmacy! Let's get that medicine!",
        },
        kuttanIntro: [
          "Machane! Doctor-de aduthu poyal first 'Termin' undo ennu chodikkanam. Appointment illathe chellan vayya unless it's an emergency.",
          "Main question doctor chodikkanth: 'Was fehlt Ihnen?' (What is missing from you? / What's wrong?). Ithoru fixed phrase aanu.",
          "Pinne 'Versicherungskarte' (health insurance card) eppozhum kayyil venam. Without it, things can get complicated. Let's talk to the doc!",
        ],
        vocabEncounters: [
          { vocabId: "vocab10-3-1", encounterMoment: "You arrive: 'Ich bin in der Arztpraxis.' (I am in the doctor's office).", contextSentence: "Ich muss zur Arztpraxis." },
          { vocabId: "vocab10-3-2", encounterMoment: "You ask: 'Haben Sie einen Termin?' (Do you have an appointment?).", contextSentence: "Haben Sie einen Termin?" },
          { vocabId: "vocab10-3-3", encounterMoment: "Receptionist asks: 'Ihre Versicherungskarte, bitte.' (Your insurance card, please).", contextSentence: "Ihre Versicherungskarte, bitte." },
          { vocabId: "vocab10-3-5", encounterMoment: "The doctor hands you a paper: 'Hier ist Ihr Rezept.' (Here is your prescription).", contextSentence: "Hier ist Ihr Rezept." },
        ],
        decisionPoints: [
          {
            moment: "You want to make an appointment. Which German phrase should you use?",
            options: [
              { text: "Ich möchte einen Termin machen.", isCorrect: true, response: "Exactly! 'Einen Termin machen' is the standard way to schedule an appointment.", kuttanReaction: "Adipoli! Appointment schedule cheyyunnathu super aayi padichallo! 🔥" },
              { text: "Ich will einen Platz haben.", isCorrect: false, response: "Aiyyo! 'Platz' is for a seat or a place. For a doctor's visit, you need a 'Termin'.", kuttanReaction: "Vite machane! Business or doctor logic-ail 'Termin' venam. Try again! 😬" },
            ],
          },
          {
            moment: "The doctor asks 'Was fehlt Ihnen?'. What is she asking you?",
            options: [
              { text: "What's wrong with you / What are your symptoms?", isCorrect: true, response: "Correct! Literally 'What is missing from you?'.", kuttanReaction: "Superb! Medical opening correctly manasilakkiyallo. Ready to describe symptoms! ⭐" },
              { text: "What's your name?", isCorrect: false, response: "No! That would be 'Wie heißen Sie?'. 'Was fehlt Ihnen?' is about your health.", kuttanReaction: "Aiyyo! Health-ine patti aanu choodickunnathu. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v10-3-1",
          title: "Beim Arzt - At the Doctor's Office",
          duration: "12:00",
          description: "Everything you need to know for visiting a doctor in Germany",
          scriptOutline: [
            "Opening: 'Germany-yil doctor-de aduthu poyal onnum pedi venda — namukku prepare aakaam!'",
            "die Arztpraxis — doctor's office (not hospital! Germans go to Praxis first)",
            "Making an appointment: 'Ich möchte einen Termin machen'",
            "At reception: die Versicherungskarte (insurance card) — VERY important!",
            "In the waiting room: das Wartezimmer",
            "The doctor asks: 'Was fehlt Ihnen?' (What's wrong with you?)",
            "'Seit wann haben Sie die Schmerzen?' (Since when have you had the pain?)",
            "'Nehmen Sie Medikamente?' (Do you take any medication?)",
            "Getting your Rezept (prescription) — needed for most medicines!",
            "Key difference: In Germany, you get prescription → go to Apotheke (separate!)"
          ],
          keyVocabulary: ["die Arztpraxis", "der Termin", "die Versicherungskarte", "Was fehlt Ihnen?"],
          learningObjectives: [
            "Make a doctor's appointment in German",
            "Describe symptoms to a doctor",
            "Understand the German healthcare process (Praxis → Rezept → Apotheke)"
          ],
          placeholderThumbnail: "/images/doctor_waiting_room.png",
          richContent: [
            {
              type: "table",
              title: "At the Doctor's Office",
              headers: ["Step", "German", "English"],
              rows: [
                ["1. Appointment", "Ich möchte einen Termin machen.", "I'd like to make an appointment."],
                ["2. Reception", "Hier ist meine Versicherungskarte.", "Here is my insurance card."],
                ["3. Waiting", "Bitte nehmen Sie im Wartezimmer Platz.", "Please take a seat in the waiting room."],
                ["4. Doctor asks", "Was fehlt Ihnen?", "What's wrong with you?"],
                ["5. Duration", "Seit wann haben Sie die Schmerzen?", "Since when have you had the pain?"],
                ["6. Medication", "Nehmen Sie Medikamente?", "Do you take any medication?"],
                ["7. Prescription", "Hier ist Ihr Rezept.", "Here is your prescription."]
              ]
            },
            {
              type: "note",
              title: "German Healthcare Flow",
              variant: "info",
              content: "In Germany: Arztpraxis (doctor's office) first, NOT the hospital! Doctor gives a Rezept (prescription), then you go to a separate Apotheke (pharmacy) to get medicine. Very different from Indian clinics that give medicine directly!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "die Arztpraxis", english: "doctor's office", malayalam: "ഡോക്ടറുടെ ക്ലിനിക്ക്", pronunciation: "ahrts-prah-xis" },
                { german: "die Versicherungskarte", english: "insurance card", malayalam: "ഇൻഷുറൻസ് കാർഡ്", pronunciation: "fer-zikh-er-oongs-kar-te" },
                { german: "das Rezept", english: "prescription", malayalam: "കുറിപ്പടി", pronunciation: "re-tsept" }
              ]
            }
          ]
        },
        {
          id: "v10-3-2",
          title: "Describing Symptoms",
          duration: "10:00",
          description: "Learn to describe exactly what's wrong — where it hurts, how long, and how bad",
          scriptOutline: [
            "'Ich habe Schmerzen hier' + pointing — the universal starter!",
            "Location: 'Hier tut es weh' (It hurts here)",
            "Duration: 'Seit gestern / seit drei Tagen / seit einer Woche'",
            "Intensity: 'ein bisschen' (a little), 'stark' (strong), 'unerträglich' (unbearable)",
            "Types of pain: stechend (stabbing), dumpf (dull), brennend (burning)",
            "Useful phrases: 'Mir ist schwindelig' (I'm dizzy), 'Mir ist übel' (I feel nauseous)",
            "Doctor's instructions: 'Machen Sie den Mund auf', 'Atmen Sie tief ein'",
            "das Rezept — the prescription you take to the Apotheke"
          ],
          keyVocabulary: ["die Schmerzen", "seit wann", "das Rezept", "die Tabletten"],
          learningObjectives: [
            "Describe the location, duration, and intensity of symptoms",
            "Understand common doctor instructions",
            "Know what to do with a Rezept (prescription)"
          ],
          placeholderThumbnail: "/images/doctor_waiting_room.png",
          richContent: [
            {
              type: "table",
              title: "Describing Symptoms to the Doctor",
              headers: ["Category", "German", "English"],
              rows: [
                ["Location", "Ich habe Schmerzen hier.", "I have pain here."],
                ["Location", "Hier tut es weh.", "It hurts here."],
                ["Duration", "Seit gestern", "Since yesterday"],
                ["Duration", "Seit drei Tagen", "For three days"],
                ["Duration", "Seit einer Woche", "For a week"],
                ["Intensity", "stark", "strong/intense"],
                ["Intensity", "unerträglich", "unbearable"],
                ["Type", "stechend", "stabbing"],
                ["Type", "dumpf", "dull"],
                ["Type", "brennend", "burning"]
              ]
            },
            {
              type: "note",
              title: "Doctor's Instructions",
              variant: "tip",
              content: "Common instructions you'll hear: 'Machen Sie den Mund auf' (Open your mouth), 'Atmen Sie tief ein' (Breathe in deeply), 'Zeigen Sie mir, wo es weh tut' (Show me where it hurts). Just follow along!"
            }
          ]
        }
      ],
      exercises: [
        { id: "ex10-3-1", type: "multiple-choice", question: "How does a German doctor ask 'What's wrong with you?' (formal)?", options: ["Was fehlt Ihnen?", "Was ist falsch?", "Wie geht es dir?", "Was haben Sie?"], correctAnswer: "Was fehlt Ihnen?", explanation: "'Was fehlt Ihnen?' is the standard medical opening. 'Fehlen' literally means 'to be missing'. So the doctor is asking 'What is missing from your health?'. Very central German phrasing!", xpReward: 10 },
        { id: "ex10-3-2", type: "fill-blank", question: "Ich möchte einen ___ machen. (appointment)", options: ["Termin", "Besuch", "Platz", "Dienst"], correctAnswer: "Termin", explanation: "'Einen Termin machen' is the colocation you need. In Germany, almost everything (doctor, bank, government) starts with a 'Termin'.", xpReward: 10 },
        { id: "ex10-3-3", type: "matching", question: "Match the German medical term to its English meaning:", options: ["die Arztpraxis", "das Rezept", "die Tabletten", "die Versicherungskarte", "der Termin"], correctAnswer: ["doctor's office", "prescription", "pills/tablets", "insurance card", "appointment"], explanation: "Mastering these 5 words makes your first doctor's visit 90% easier. Note that 'Rezept' means prescription, NOT food recipe (which is 'Rezept' too, but different context!)!", xpReward: 15 },
        { id: "ex10-3-4", type: "multiple-choice", question: "Your doctor asks 'Seit wann haben Sie die Schmerzen?' What does this mean?", options: ["Since when have you had the pain?", "Where do you have the pain?", "How strong is the pain?", "Do you have pain?"], correctAnswer: "Since when have you had the pain?", explanation: "'Seit wann' is a classic 'Since when' question. The doctor wants the timeline to diagnose you correctly.", xpReward: 10 },
        { id: "ex10-3-5", type: "ordering", question: "Arrange: 'I have had a stomachache since yesterday'", options: ["Ich", "habe", "seit", "gestern", "Bauchschmerzen"], correctAnswer: ["Ich", "habe", "seit", "gestern", "Bauchschmerzen"], explanation: "Structure: Subject + Verb + Time Clause (seit gestern) + The Ailment (Bauch+Schmerzen). Focus on the compound noun 'Bauchschmerzen'.", xpReward: 15 },
        { id: "ex10-3-6", type: "fill-blank", question: "Ich habe Schmerzen ___ . (here)", options: ["hier", "dort", "da", "wo"], correctAnswer: "hier", explanation: "'Hier' (here) is essential when pointing to where it hurts. Simple but very practical!", xpReward: 10 },
        { id: "ex10-3-7", type: "multiple-choice", question: "In Germany, where do you get your medicine after visiting the doctor?", options: ["At the Apotheke (pharmacy) with a Rezept", "The doctor gives you medicine directly", "At the supermarket", "At the Krankenhaus (hospital)"], correctAnswer: "At the Apotheke (pharmacy) with a Rezept", explanation: "CRITICAL: German doctors don't sell medicine. They give you a 'Rezept' (prescription), and you walk to a separate 'Apotheke'. This is a major cultural difference from many Indian clinics.", xpReward: 10 },
        { id: "ex10-3-8", type: "fill-blank", question: "Die Schmerzen sind ___ . (unbearable)", options: ["unerträglich", "stark", "dumpf", "brennend"], correctAnswer: "unerträglich", explanation: "'Un-erträglich' = Not-bearable. Use this only if the pain is truly extreme. For normal pain, use 'stark' (strong).", xpReward: 10 },
        {
          id: "ex10-3-9",
          type: "dictation",
          question: "Listen and type: Ich möchte einen Termin machen.",
          correctAnswer: "Ich möchte einen Termin machen",
          explanation: "Great job! This is the standard phrase for making an appointment in Germany.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-make-appointment.mp3"
        },
        {
          id: "ex10-3-10",
          type: "free-text",
          question: "Write in German: 'Where is the doctor's office?' (doctor's office = Arztpraxis)",
          correctAnswer: "Wo ist die Arztpraxis",
          explanation: "Wunderbar! 'Wo ist die Arztpraxis?' — 'die' because it's feminine.",
          xpReward: 30
        }
      ,
        {
          id: "ex10-3-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (At the Doctor): 'Ich habe Kopfschmerzen und brauche einen Arzt.'",
          questionGerman: "Sprechen Sie laut: 'Ich habe Kopfschmerzen und brauche einen Arzt.'",
          correctAnswer: "Ich habe Kopfschmerzen und brauche einen Arzt",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab10-3-1", german: "die Arztpraxis", english: "doctor's office", malayalam: "ഡോക്ടറുടെ ക്ലിനിക്ക്", pronunciation: "ahrts-prah-xis", example: "Ich muss zur Arztpraxis.", exampleTranslation: "I have to go to the doctor's office." },
        { id: "vocab10-3-2", german: "der Termin", english: "appointment", malayalam: "അപ്പോയിന്റ്മെന്റ്", pronunciation: "ter-meen", example: "Haben Sie einen Termin?", exampleTranslation: "Do you have an appointment?" },
        { id: "vocab10-3-3", german: "die Versicherungskarte", english: "insurance card", malayalam: "ഇൻഷുറൻസ് കാർഡ്", pronunciation: "fer-zikh-er-oongs-kar-te", example: "Ihre Versicherungskarte, bitte.", exampleTranslation: "Your insurance card, please." },
        { id: "vocab10-3-4", german: "die Schmerzen", english: "pain (plural)", malayalam: "വേദന", pronunciation: "shmer-tsen", example: "Wo genau sind die Schmerzen?", exampleTranslation: "Where exactly is the pain?" },
        { id: "vocab10-3-5", german: "das Rezept", english: "prescription", malayalam: "മരുന്ന് കുറിപ്പടി", pronunciation: "re-tsept", example: "Hier ist Ihr Rezept.", exampleTranslation: "Here is your prescription." },
        { id: "vocab10-3-6", german: "die Tabletten", english: "pills / tablets", malayalam: "ഗുളികകൾ", pronunciation: "tah-blet-ten", example: "Nehmen Sie diese Tabletten.", exampleTranslation: "Take these tablets." },
        { id: "vocab10-3-7", german: "die Untersuchung", english: "examination", malayalam: "പരിശോധന", pronunciation: "oon-ter-zoo-khoong", example: "Die Untersuchung ist fertig.", exampleTranslation: "The examination is finished." },
        { id: "vocab10-3-8", german: "der Arzt", english: "doctor (male)", malayalam: "ആൺ ഡോക്ടർ", pronunciation: "ahrts", example: "Ich bin Arzt von Beruf.", exampleTranslation: "I am a doctor by profession." },
        { id: "vocab10-3-9", german: "die Ärztin", english: "doctor (female)", malayalam: "പെൺ ഡോക്ടർ", pronunciation: "ehrts-tin", example: "Die Ärztin hilft mir.", exampleTranslation: "The (female) doctor helps me." },
        { id: "vocab10-3-10", german: "das Medikament", english: "medication", malayalam: "മരുന്ന്", pronunciation: "me-di-kah-ment", example: "Dieses Medikament ist stark.", exampleTranslation: "This medication is strong." }
      ]
    },
    {
      id: "10-4",
      title: "At the Pharmacy",
      titleGerman: "In der Apotheke",
      description: "The German Apotheke is special! Learn to buy medicine, understand prescriptions, and navigate this unique institution.",
      duration: "50 min",
      xpReward: 130,
      storyScene: {
        setting: {
          name: "The Pharmacy (Apotheke)",
          sceneType: "station",
          timeOfDay: "afternoon",
          description: "You've walked into a bright, clean shop with a big red 'A' sign. The shelves are full of medical-grade skincare and herbal teas. Behind the counter, a professional-looking pharmacist in a white coat is waiting. No paracetamol in the supermarket here, machane! You need to ask 'Apotheker' for everything. Ready to get your meds?",
        },
        narrative: {
          previousRecap: "You've got your prescription from the doctor. Now, let's turn that paper into pills!",
          currentObjective: "Understand the 'Apotheke' culture, use 'gegen' for medications, and understand dosage instructions",
          nextTeaser: "Final lesson: Emergency! What to do when things go really wrong!",
        },
        kuttanIntro: [
          "Machane! Apotheke-yil pokumpo oru important grammar rule undu. Always say 'etwas GEGEN Kopfschmerzen' (something AGAINST headache). 'Für' (for) ennu paranjaal logic maarum.",
          "Pinne 'rezeptfrei' enna word sradhikkanne. Prescription illathe kittunna medicine-inu 'rezeptfrei' ennu parayum. Like band-aids or light painkillers.",
          "Dosage instruction kettal 'täglich' (daily) enna word eppozhum pratheykichu sradhikkanam. Let's get our medicine!",
        ],
        vocabEncounters: [
          { vocabId: "vocab10-4-1", encounterMoment: "You find the red A: 'Das ist die Apotheke.' (That is the pharmacy).", contextSentence: "Die Apotheke ist neben dem Supermarkt." },
          { vocabId: "vocab10-4-8", encounterMoment: "You ask: 'Haben Sie ein Schmerzmittel?' (Do you have a painkiller?).", contextSentence: "Haben Sie ein Schmerzmittel?" },
          { vocabId: "vocab10-4-6", encounterMoment: "The pharmacist says: 'Das ist rezeptfrei.' (This is over-the-counter).", contextSentence: "Ibuprofen ist rezeptfrei." },
          { vocabId: "vocab10-4-10", encounterMoment: "The dosage: 'Nehmen Sie die Tablette täglich.' (Take the tablet daily).", contextSentence: "Nehmen Sie die Tablette zweimal täglich." },
        ],
        decisionPoints: [
          {
            moment: "You want to ask for something to help with your cough. Which phrasing is correct in German?",
            options: [
              { text: "Ich brauche etwas gegen Husten.", isCorrect: true, response: "Exactly! In German, you take medicine 'against' (gegen) an illness.", kuttanReaction: "Adipoli! Grammar logic correctly catch cheythallo! 🔥" },
              { text: "Ich brauche etwas für Husten.", isCorrect: false, response: "Aiyyo! If you say 'für Husten', it sounds like you WANT more cough. Use 'gegen'!", kuttanReaction: "Vite machane! Illness or pain logicaly 'against' aanu. Try again! 😬" },
            ],
          },
          {
            moment: "The pharmacist says 'Nehmen Sie die Tablette dreimal täglich'. How many times a day should you take it?",
            options: [
              { text: "Three times daily.", isCorrect: true, response: "Correct! 'dreimal' (three times) 'täglich' (daily).", kuttanReaction: "Superb! Timing logic correctly capture cheythallo. ⭐" },
              { text: "Once every three days.", isCorrect: false, response: "No! 'dreimal täglich' means 3 times every day. Don't miss your dose!", kuttanReaction: "Aiyyo! Every day moonu thavana edukkanam. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v10-4-1",
          title: "In der Apotheke - Getting Medicine",
          duration: "12:00",
          description: "Navigate the German pharmacy system — very different from what you're used to in Kerala!",
          scriptOutline: [
            "Opening: 'Pharmacy ennu parayumbol, nammude medical store alla machane! It's a pharmacy on legal steroids!'",
            "die Apotheke: Look for the big red 'A' sign. Bat-signal for medicine!",
            "Experts: Apotheke doctors expert aanu. Minor illness-inu prescription illathe help cheyyum.",
            "SHOCK: Paracetamol supermarket-il kittilla! Medical store thappi thanne pokanam!",
            "Rezeptfrei (OTC) vs Rezeptpflichtig (Doctor required). Rules strict aanu machane!",
            "Phrase: 'Ich brauche etwas gegen...' — I need something against... (not for!)",
            "Nouns: die Tablette (pill), der Sirup (syrup), die Salbe (ointment/cream).",
            "After-hours: Notdienst. Sunday or Night opens aayulla specific pharmacy undakum.",
            "Handover: 'Ich habe ein Rezept vom Arzt.' — I have a prescription!"
          ],
          keyVocabulary: ["die Apotheke", "rezeptfrei", "rezeptpflichtig", "die Salbe", "das Pflaster"],
          learningObjectives: [
            "Understand how German pharmacies differ from Indian ones",
            "Ask for specific medicines using 'Ich brauche etwas gegen...'",
            "Know the difference between rezeptfrei and rezeptpflichtig"
          ],
          placeholderThumbnail: "/images/german_apotheke.png",
          richContent: [
            {
              type: "table",
              title: "Pharmacy Vocabulary",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["die Apotheke", "pharmacy", "മരുന്നുകട"],
                ["die Tablette", "tablet/pill", "ഗുളിക"],
                ["der Sirup", "syrup", "സിറപ്പ്"],
                ["die Salbe", "ointment", "തേപ്പ്"],
                ["das Pflaster", "band-aid", "പ്ലാസ്റ്റർ"],
                ["rezeptfrei", "over-the-counter", "കുറിപ്പടി ഇല്ലാതെ"],
                ["rezeptpflichtig", "prescription required", "കുറിപ്പടി വേണം"]
              ]
            },
            {
              type: "note",
              title: "No Paracetamol at Supermarkets!",
              variant: "warning",
              content: "Even basic medicines like paracetamol can ONLY be bought at an Apotheke in Germany. Look for the big red 'A' sign. Supermarkets and convenience stores cannot sell any medicines — strict German law!"
            },
            {
              type: "note",
              title: "The Magic Phrase: 'etwas gegen...'",
              variant: "tip",
              content: "Say 'Ich brauche etwas gegen Kopfschmerzen' (I need something against headaches). Note: it's 'gegen' (against), not 'für' (for). In German, medicines fight AGAINST the illness!"
            }
          ]
        },
        {
          id: "v10-4-2",
          title: "Common Medicines & How to Ask for Them",
          duration: "8:00",
          description: "Learn the names of everyday medicines and how to ask the pharmacist for help",
          scriptOutline: [
            "Opening: 'Apotheke-yil chennal enthu parayanum — namukku padikkaam!'",
            "Starting phrase: 'Können Sie mir etwas empfehlen?' (Can you recommend something?)",
            "Pain relief: das Schmerzmittel — 'Haben Sie ein Schmerzmittel?'",
            "Specific medicines: Ibuprofen, Paracetamol — same names, different rules!",
            "For allergies: 'Ich brauche etwas gegen Allergien'",
            "For skin: die Creme (cream), die Salbe (ointment) — what's the difference?",
            "Dosage questions: 'Wie oft soll ich das nehmen?' (How often should I take this?)",
            "The pharmacist's answer: 'Dreimal täglich' (three times daily), 'nach dem Essen' (after eating)",
            "Wrap-up: 'Ippo ningalkku Apotheke-yil confident aayi pokaam!'"
          ],
          keyVocabulary: ["das Schmerzmittel", "die Creme", "empfehlen", "täglich"],
          learningObjectives: [
            "Ask the pharmacist for recommendations",
            "Name common types of medicine in German",
            "Understand dosage instructions"
          ],
          placeholderThumbnail: "/images/german_apotheke.png",
          richContent: [
            {
              type: "table",
              title: "Asking the Pharmacist",
              headers: ["German", "English"],
              rows: [
                ["Können Sie mir etwas empfehlen?", "Can you recommend something?"],
                ["Haben Sie ein Schmerzmittel?", "Do you have a painkiller?"],
                ["Ich brauche etwas gegen Allergien.", "I need something for allergies."],
                ["Wie oft soll ich das nehmen?", "How often should I take this?"],
                ["Ich habe ein Rezept vom Arzt.", "I have a prescription from the doctor."]
              ]
            },
            {
              type: "table",
              title: "Dosage Instructions",
              headers: ["German", "English"],
              rows: [
                ["einmal täglich", "once daily"],
                ["zweimal täglich", "twice daily"],
                ["dreimal täglich", "three times daily"],
                ["vor dem Essen", "before eating"],
                ["nach dem Essen", "after eating"]
              ]
            },
            {
              type: "note",
              title: "After-Hours Pharmacy (Notdienst)",
              variant: "info",
              content: "Need medicine on Sunday or at night? Every area has a rotating 'Notdienst' (emergency service) pharmacy that stays open. Check apotheken.de or look for the green cross sign lit up at night!"
            }
          ]
        }
      ],
      exercises: [
        { id: "ex10-4-1", type: "multiple-choice", question: "What makes German pharmacies (Apotheke) different from Indian medical stores?", options: ["Even basic medicines like paracetamol can only be bought at an Apotheke", "They are open 24/7", "They are cheaper than Indian stores", "They sell groceries too"], correctAnswer: "Even basic medicines like paracetamol can only be bought at an Apotheke", explanation: "Germany has a strict 'Apothekenpflicht'. Even simple painkillers can't be sold in supermarkets. This ensures every medicine sale is supervised by a professional pharmacist.", xpReward: 10 },
        { id: "ex10-4-2", type: "fill-blank", question: "Ich brauche etwas ___ Kopfschmerzen. (for/against)", options: ["gegen", "für", "mit", "von"], correctAnswer: "gegen", explanation: "In German, medications are 'gegen' (against) an illness, not 'für' (for) it. If you say 'für', it sounds like you want to keep the headache!", xpReward: 10 },
        { id: "ex10-4-3", type: "matching", question: "Match the German pharmacy item to its English meaning:", options: ["die Tablette", "der Sirup", "die Salbe", "das Pflaster", "das Schmerzmittel"], correctAnswer: ["tablet/pill", "syrup", "ointment/cream", "band-aid/plaster", "painkiller"], explanation: "Pflaster (band-aid) and Schmerzmittel (pain-killer) are the most common things people buy rezeptfrei (without prescription).", xpReward: 15 },
        { id: "ex10-4-4", type: "multiple-choice", question: "What does 'rezeptpflichtig' mean?", options: ["Requires a prescription", "Over-the-counter", "Very expensive", "Only for children"], correctAnswer: "Requires a prescription", explanation: "Pflicht = duty/obligation. Rezept-pflichtig means a prescription is an absolute requirement. You can't talk your way out of it in Germany!", xpReward: 10 },
        { id: "ex10-4-5", type: "ordering", question: "Arrange: 'I have a prescription from the doctor'", options: ["Ich", "habe", "ein", "Rezept", "vom", "Arzt"], correctAnswer: ["Ich", "habe", "ein", "Rezept", "vom", "Arzt"], explanation: "Structure: Subject (Ich) + Verb (habe) + Object (ein Rezept) + Origin (vom Arzt).", xpReward: 15 },
        { id: "ex10-4-6", type: "fill-blank", question: "Wie oft ___ ich das nehmen? (should)", options: ["soll", "will", "kann", "muss"], correctAnswer: "soll", explanation: "Use the modal verb 'sollen' (should) when asking for advice or instructions. Use 'müssen' (must) if the doctor ordered it.", xpReward: 10 },
        { id: "ex10-4-7", type: "multiple-choice", question: "You need something for allergies. How do you ask at the Apotheke?", options: ["Ich brauche etwas gegen Allergien.", "Ich will Allergien haben.", "Wo sind die Allergien?", "Haben Sie Allergien?"], correctAnswer: "Ich brauche etwas gegen Allergien.", explanation: "'Ich brauche etwas gegen...' is the universal formula. Learn it, use it, survive!", xpReward: 10 },
        { id: "ex10-4-8", type: "ordering", question: "Arrange: 'Take one tablet three times daily'", options: ["Nehmen", "Sie", "dreimal", "täglich", "eine", "Tablette"], correctAnswer: ["Nehmen", "Sie", "dreimal", "täglich", "eine", "Tablette"], explanation: "Command structure: Verb (Nehmen) + Polite Subject (Sie) + Frequency (dreimal täglich) + Object (eine Tablette).", xpReward: 15 },
        {
          id: "ex10-4-9",
          type: "dictation",
          question: "Listen and type: Ich brauche etwas gegen Kopfschmerzen.",
          correctAnswer: "Ich brauche etwas gegen Kopfschmerzen",
          explanation: "Perfect! 'gegen' is used for medications. And remember to capitalize 'Kopfschmerzen'!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-need-headache-med.mp3"
        },
        {
          id: "ex10-4-10",
          type: "free-text",
          question: "Translate to German: 'Is it over-the-counter?' (over-the-counter = rezeptfrei)",
          correctAnswer: "Ist es rezeptfrei",
          explanation: "Excellent! 'Ist es rezeptfrei?' — very important question at the pharmacy.",
          xpReward: 30
        }
      ,
        {
          id: "ex10-4-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (At the Pharmacy): 'Ich habe Kopfschmerzen und brauche einen Arzt.'",
          questionGerman: "Sprechen Sie laut: 'Ich habe Kopfschmerzen und brauche einen Arzt.'",
          correctAnswer: "Ich habe Kopfschmerzen und brauche einen Arzt",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab10-4-1", german: "die Apotheke", english: "pharmacy", malayalam: "ഫാർമസി / മരുന്നുകട", pronunciation: "ah-po-tey-ke", example: "Die Apotheke ist neben dem Supermarkt.", exampleTranslation: "The pharmacy is next to the supermarket." },
        { id: "vocab10-4-2", german: "die Tablette", english: "tablet / pill", malayalam: "ഗുളിക", pronunciation: "tah-blet-te", example: "Nehmen Sie eine Tablette vor dem Essen.", exampleTranslation: "Take one tablet before eating." },
        { id: "vocab10-4-3", german: "der Sirup", english: "syrup", malayalam: "സിറപ്പ്", pronunciation: "zee-roop", example: "Der Hustensirup schmeckt süß.", exampleTranslation: "The cough syrup tastes sweet." },
        { id: "vocab10-4-4", german: "die Salbe", english: "ointment / cream", malayalam: "തേപ്പ് / മരുന്ന്", pronunciation: "zahl-be", example: "Diese Salbe hilft gegen Schmerzen.", exampleTranslation: "This ointment helps against pain." },
        { id: "vocab10-4-5", german: "das Pflaster", english: "band-aid / plaster", malayalam: "പ്ലാസ്റ്റർ", pronunciation: "pflah-ster", example: "Ich brauche ein Pflaster für meinen Finger.", exampleTranslation: "I need a band-aid for my finger." },
        { id: "vocab10-4-6", german: "rezeptfrei", english: "over-the-counter (no prescription needed)", malayalam: "കുറിപ്പടി ഇല്ലാതെ", pronunciation: "re-tsept-fry", example: "Ibuprofen ist rezeptfrei.", exampleTranslation: "Ibuprofen is over-the-counter." },
        { id: "vocab10-4-7", german: "rezeptpflichtig", english: "prescription-only", malayalam: "കുറിപ്പടി ആവശ്യമുള്ള", pronunciation: "re-tsept-pflikh-tikh", example: "Antibiotika sind rezeptpflichtig.", exampleTranslation: "Antibiotics are prescription-only." },
        { id: "vocab10-4-8", german: "das Schmerzmittel", english: "painkiller", malayalam: "വേദനസംഹാരി", pronunciation: "shmertz-mit-tel", example: "Haben Sie ein Schmerzmittel?", exampleTranslation: "Do you have a painkiller?" },
        { id: "vocab10-4-9", german: "die Creme", english: "cream", malayalam: "ക്രീം", pronunciation: "krehm", example: "Diese Creme ist gut für die Haut.", exampleTranslation: "This cream is good for the skin." },
        { id: "vocab10-4-10", german: "täglich", english: "daily", malayalam: "ദിവസേന", pronunciation: "tehg-likh", example: "Nehmen Sie die Tablette zweimal täglich.", exampleTranslation: "Take the tablet twice daily." }
      ]
    },
    {
      id: "10-5",
      title: "Emergency!",
      titleGerman: "Notfall!",
      description: "Know what to do in a German emergency — dial the right number, call for help, and navigate the Notaufnahme (ER).",
      duration: "50 min",
      xpReward: 140,
      storyScene: {
        setting: {
          name: "Busy Street Corner (The Accident)",
          sceneType: "station",
          timeOfDay: "afternoon",
          description: "Suddenly, you hear a screech of tires and a thud. A delivery rider on a bicycle has collided with a car door. People are gathering. Someone needs to call for help. In Kerala, everyone would rush in, but here, it's about following the system. Do you know the number? Do you know what to say? This is a 'Notfall', machane. Stay calm!",
        },
        narrative: {
          previousRecap: "You've survived the pharmacy. Now, let's learn the language of emergencies!",
          currentObjective: "Identify emergency numbers (112 for ambulance/fire, 110 for police) and call for help in German",
          nextTeaser: "Module 10 complete! You're ready for anything Germany throws at you! See you in Module 11!",
        },
        kuttanIntro: [
          "Machane! Emergency situations-il panic aavenam venda. Numbers eppozhum memory-yil venam. 112 for ambulance/fire, 110 for police.",
          "First phrase eppozhum 'Ich brauche Hilfe!' (I need help) aayirikkaname. Use it loud and clear to get attention.",
          "Pinne 'Krankenwagen' (ambulance) enna word sradhikkanne. Literally 'Sick-car'. Let's report this accident!",
        ],
        vocabEncounters: [
          { vocabId: "vocab10-5-1", encounterMoment: "Someone yells: 'Das ist ein Notfall!' (That is an emergency!).", contextSentence: "Das ist ein Notfall!" },
          { vocabId: "vocab10-5-3", encounterMoment: "You say: 'Es gab einen Unfall.' (There was an accident).", contextSentence: "Es gab einen Unfall auf der Straße." },
          { vocabId: "vocab10-5-2", encounterMoment: "You shout: 'Rufen Sie einen Krankenwagen!' (Call an ambulance!).", contextSentence: "Ich brauche einen Krankenwagen!" },
          { vocabId: "vocab10-5-7", encounterMoment: "The police arrive: 'Die Polizei ist hier.' (The police are here).", contextSentence: "Rufen Sie die Polizei! Die Nummer ist 110." },
          { vocabId: "vocab10-5-4", encounterMoment: "You point: 'Die Verletzung ist am Bein.' (The injury is on the leg).", contextSentence: "Die Verletzung ist nicht schlimm." },
        ],
        decisionPoints: [
          {
            moment: "Someone is hurt and needs an ambulance. Which number do you dial in Germany?",
            options: [
              { text: "112.", isCorrect: true, response: "Exactly! 112 is the European emergency number for ambulance and fire.", kuttanReaction: "Adipoli! Number correct aayi pick cheythallo. Life-saver! 🔥" },
              { text: "110.", isCorrect: false, response: "Aiyyo! 110 is only for the Police. For medical help, you need 112.", kuttanReaction: "Vite machane! Ambulance-inu 112 venam. Ithu fix cheytho! Try again! 😬" },
            ],
          },
          {
            moment: "You need to ask for help immediately. What is the clearest phrase?",
            options: [
              { text: "Ich brauche Hilfe!", isCorrect: true, response: "Correct! Simple, loud, and effective.", kuttanReaction: "Superb! Emergency communication logic catch cheythallo. ⭐" },
              { text: "Was ist los?", isCorrect: false, response: "No! 'Was ist los?' means 'What's happening?'. You need to ask for help!", kuttanReaction: "Aiyyo! 'Hilfe' word missing aanu machane! Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v10-5-1",
          title: "Notfall! — Emergencies in Germany",
          duration: "14:00",
          description: "Critical German phrases for emergencies — from calling 112 to arriving at the Notaufnahme",
          scriptOutline: [
            "Opening: 'Ithu aarkkum venda situation aanu — but Germany-yil irunnal ee words arinjirikanam!'",
            "THE most important numbers: 112 (Feuerwehr & Rettungsdienst) and 110 (Polizei)",
            "112 = fire brigade AND ambulance — one number for both! Works all over Europe!",
            "110 = police only — remember: 'Ein-Eins-Null for the Polizei!'",
            "First phrase to learn: 'Ich brauche Hilfe!' (I need help!) — say it LOUD and CLEAR",
            "'Rufen Sie einen Krankenwagen!' (Call an ambulance!) — for bystanders",
            "'Es gab einen Unfall!' (There was an accident!) — reporting what happened",
            "Describing the emergency: Unfall (accident), Verletzung (injury), Blut (blood), Feuer (fire)",
            "'Jemand ist verletzt!' (Someone is injured!) — when you see someone hurt",
            "Location: 'Ich bin in der [Straße]' — always give your street name",
            "At the Notaufnahme (emergency room): 'Ich brauche sofort Hilfe!'",
            "The triage system: you may have to wait if it's not life-threatening",
            "Cultural note: In Germany, don't go to Notaufnahme for minor issues — use Bereitschaftsdienst (on-call service) or call 116117",
            "Wrap-up: 'Ee words oru diary-yil ezhuthi vekku — but use cheyyenda situation varaathirikkatte!'"
          ],
          keyVocabulary: ["der Notfall", "der Krankenwagen", "der Unfall", "die Verletzung", "die Notaufnahme", "112"],
          learningObjectives: [
            "Know the correct emergency numbers in Germany (112 and 110)",
            "Call for an ambulance and describe an emergency situation",
            "Use key emergency vocabulary: Unfall, Verletzung, Blut, Krankenwagen",
            "Understand how the Notaufnahme (ER) works in Germany"
          ],
          placeholderThumbnail: "/images/doctor_waiting_room.png",
          richContent: [
            {
              type: "table",
              title: "Emergency Numbers & Vocabulary",
              headers: ["Number/Word", "Service", "Malayalam"],
              rows: [
                ["112", "Ambulance & Fire", "ആംബുലൻസ് & ഫയർ"],
                ["110", "Police", "പോലീസ്"],
                ["der Notfall", "emergency", "അടിയന്തരാവസ്ഥ"],
                ["der Krankenwagen", "ambulance", "ആംബുലൻസ്"],
                ["der Unfall", "accident", "അപകടം"],
                ["die Verletzung", "injury", "പരിക്ക്"],
                ["die Notaufnahme", "emergency room", "എമർജൻസി റൂം"]
              ]
            },
            {
              type: "table",
              title: "Emergency Phrases",
              headers: ["German", "English"],
              rows: [
                ["Ich brauche Hilfe!", "I need help!"],
                ["Rufen Sie einen Krankenwagen!", "Call an ambulance!"],
                ["Es gab einen Unfall!", "There was an accident!"],
                ["Jemand ist verletzt!", "Someone is injured!"],
                ["Ich bin in der [Straße].", "I am on [street name]."]
              ]
            },
            {
              type: "note",
              title: "112 Works All Over Europe!",
              variant: "warning",
              content: "112 is the universal emergency number across all EU countries. It works even without a SIM card or credit! For police-only emergencies, use 110. For non-emergencies, call 116117 (doctor on-call service)."
            }
          ]
        }
      ],
      exercises: [
        { id: "ex10-5-1", type: "multiple-choice", question: "Which number do you call for an ambulance in Germany?", options: ["112", "110", "108", "911"], correctAnswer: "112", explanation: "EUROPE-WIDE RULE: Dial 112 for Ambulance and Fire. Dial 110 for Police. No credit? No SIM? 112 often still works! Memorize the 'Duo' — 110/112.", xpReward: 10 },
        { id: "ex10-5-2", type: "fill-blank", question: "Ich brauche einen ___ ! (ambulance)", options: ["Krankenwagen", "Polizei", "Feuerwehr", "Arzt"], correctAnswer: "Krankenwagen", explanation: "Krank-en-wagen. Literally 'Sick-car'. It's the most important word in an emergency. If you forget, just scream 'Hilfe' and '112'!", xpReward: 10 },
        { id: "ex10-5-3", type: "matching", question: "Match the German emergency word to its English meaning:", options: ["der Unfall", "die Verletzung", "das Blut", "die Notaufnahme", "der Notfall"], correctAnswer: ["accident", "injury", "blood", "emergency room", "emergency"], explanation: "Knowing these words helps the dispatcher send the right help. Note: 'Notfall' is any emergency; 'Unfall' is specifically an accident.", xpReward: 15 },
        { id: "ex10-5-4", type: "ordering", question: "Arrange: 'Someone is injured, call an ambulance!'", options: ["Jemand", "ist", "verletzt,", "rufen", "Sie", "einen", "Krankenwagen!"], correctAnswer: ["Jemand", "ist", "verletzt,", "rufen", "Sie", "einen", "Krankenwagen!"], explanation: "Command: rufen Sie! Object: einen Krankenwagen! Information: Jemand ist verletzt!", xpReward: 15 },
        { id: "ex10-5-5", type: "multiple-choice", question: "What does 'Es gab einen Unfall' mean?", options: ["There was an accident", "There is a fire", "Someone is bleeding", "I need a doctor"], correctAnswer: "There was an accident", explanation: "'Es gab' is the past of 'Es gibt' (There is). Use this to report what already happened when the police arrive.", xpReward: 10 },
        { id: "ex10-5-6", type: "fill-blank", question: "Jemand ist ___ ! (injured)", options: ["verletzt", "krank", "müde", "tot"], correctAnswer: "verletzt", explanation: "Verletzt comes from 'verletzen' (to injure). It's a key word for reporting casualties at an accident scene.", xpReward: 10 },
        {
          id: "ex10-5-7",
          type: "dictation",
          question: "Listen and type: Rufen Sie einen Krankenwagen!",
          correctAnswer: "Rufen Sie einen Krankenwagen",
          explanation: "Perfect! A life-saving sentence. Remember the capital 'K' for 'Krankenwagen'!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-call-ambulance.mp3"
        },
        {
          id: "ex10-5-8",
          type: "free-text",
          question: "Write in German: 'I need help!' (help = Hilfe)",
          correctAnswer: "Ich brauche Hilfe",
          explanation: "Wunderbar! 'Ich brauche Hilfe!' — direct and clear.",
          xpReward: 30
        }
      ,
        {
          id: "ex10-5-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Emergency!): 'Ich habe Kopfschmerzen und brauche einen Arzt.'",
          questionGerman: "Sprechen Sie laut: 'Ich habe Kopfschmerzen und brauche einen Arzt.'",
          correctAnswer: "Ich habe Kopfschmerzen und brauche einen Arzt",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab10-5-1", german: "der Notfall", english: "emergency", malayalam: "അടിയന്തരാവസ്ഥ", pronunciation: "noht-fahl", example: "Das ist ein Notfall!", exampleTranslation: "This is an emergency!" },
        { id: "vocab10-5-2", german: "der Krankenwagen", english: "ambulance", malayalam: "ആംബുലൻസ്", pronunciation: "krahn-ken-vah-gen", example: "Ich brauche einen Krankenwagen!", exampleTranslation: "I need an ambulance!" },
        { id: "vocab10-5-3", german: "der Unfall", english: "accident", malayalam: "അപകടം", pronunciation: "oon-fahl", example: "Es gab einen Unfall auf der Straße.", exampleTranslation: "There was an accident on the street." },
        { id: "vocab10-5-4", german: "die Verletzung", english: "injury", malayalam: "പരിക്ക്", pronunciation: "fer-let-tsoong", example: "Die Verletzung ist nicht schlimm.", exampleTranslation: "The injury is not serious." },
        { id: "vocab10-5-5", german: "das Blut", english: "blood", malayalam: "രക്തം", pronunciation: "bloot", example: "Es gibt viel Blut!", exampleTranslation: "There is a lot of blood!" },
        { id: "vocab10-5-6", german: "die Notaufnahme", english: "emergency room (ER)", malayalam: "എമർജൻസി റൂം", pronunciation: "noht-owf-nah-me", example: "Wir müssen sofort in die Notaufnahme.", exampleTranslation: "We must go to the ER immediately." },
        { id: "vocab10-5-7", german: "die Polizei", english: "police", malayalam: "പോലീസ്", pronunciation: "po-li-tsai", example: "Rufen Sie die Polizei! Die Nummer ist 110.", exampleTranslation: "Call the police! The number is 110." },
        { id: "vocab10-5-8", german: "die Feuerwehr", english: "fire brigade", malayalam: "അഗ്നിശമനസേന", pronunciation: "foy-er-vehr", example: "Die Feuerwehr kommt in fünf Minuten.", exampleTranslation: "The fire brigade is coming in five minutes." }
      ]
    }
  ]
};
