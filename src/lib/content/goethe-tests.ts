// =============================================================================
// Goethe A1 (Start Deutsch 1) Simulation Tests
// 8 complete test sets with ~45 questions each (~360 questions total)
// All German content is grammatically correct at A1 level.
// =============================================================================

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------

export interface GoetheTest {
  id: string;
  name: string;
  description: string;
  hoeren: HoerenSection;
  lesen: LesenSection;
  schreiben: SchreibenSection;
  sprechen: SprechenSection;
}

export interface HoerenSection {
  teil1: HoerenTeil1Question[]; // 6 Richtig/Falsch
  teil2: HoerenTeil2Question[]; // 4 multiple choice
  teil3: HoerenTeil3Question[]; // 5 matching
}

export interface HoerenTeil1Question {
  id: string;
  audio_text: string;
  statement: string;
  correct: boolean;
  explanation: string;
}

export interface HoerenTeil2Question {
  id: string;
  audio_text: string;
  question: string;
  options: [string, string, string];
  correct: 'a' | 'b' | 'c';
  explanation: string;
}

export interface HoerenTeil3Question {
  id: string;
  audio_text: string;
  question: string;
  options: [string, string, string];
  correct: 'a' | 'b' | 'c';
  explanation: string;
}

export interface LesenSection {
  teil1: LesenTeil1Question[];
  teil2: LesenTeil2Question[];
  teil3: LesenTeil3Question[];
}

export interface LesenTeil1Question {
  id: string;
  text: string;
  statement: string;
  correct: boolean;
  explanation: string;
}

export interface LesenTeil2Question {
  id: string;
  ad_text: string;
  statement: string;
  correct: boolean;
  explanation: string;
}

export interface LesenTeil3Question {
  id: string;
  email_text: string;
  question: string;
  options: [string, string, string];
  correct: 'a' | 'b' | 'c';
  explanation: string;
}

export interface SchreibenSection {
  teil1: SchreibenTeil1;
  teil2: SchreibenTeil2;
}

export interface SchreibenTeil1 {
  context: string;
  fields: { label: string; answer: string }[];
}

export interface SchreibenTeil2 {
  prompt: string;
  points: [string, string, string];
  sample_answer: string;
}

export interface SprechenSection {
  teil1: { topic: string; sample_answer: string }[];
  teil2: { word_card: string; sample_question: string; sample_answer: string }[];
  teil3: { situation: string; sample_request: string }[];
}

// ---------------------------------------------------------------------------
// Test 1 — Self-introduction, basic personal info, shopping
// ---------------------------------------------------------------------------

const test1: GoetheTest = {
  id: 'goethe-a1-test-1',
  name: 'Goethe A1 — Test 1',
  description: 'Self-introduction, basic personal info, shopping',
  hoeren: {
    teil1: [
      {
        id: 't1-h1-1',
        audio_text: 'Guten Tag, ich heiße Maria Schmidt. Ich komme aus Berlin und ich bin 25 Jahre alt.',
        statement: 'Maria ist dreißig Jahre alt.',
        correct: false,
        explanation: 'Maria says she is 25 years old (fünfundzwanzig), not 30 (dreißig).',
      },
      {
        id: 't1-h1-2',
        audio_text: 'Das Geschäft ist heute von neun Uhr bis achtzehn Uhr geöffnet.',
        statement: 'Das Geschäft schließt um 18 Uhr.',
        correct: true,
        explanation: 'The store is open from 9:00 to 18:00, so it closes at 18:00.',
      },
      {
        id: 't1-h1-3',
        audio_text: 'Achtung, bitte! Der Supermarkt hat heute ein Sonderangebot: Äpfel kosten nur 1 Euro pro Kilo.',
        statement: 'Die Äpfel kosten 2 Euro pro Kilo.',
        correct: false,
        explanation: 'The announcement says apples cost 1 Euro per kilo, not 2 Euro.',
      },
      {
        id: 't1-h1-4',
        audio_text: 'Hallo, ich bin Thomas. Ich wohne in München und arbeite als Lehrer.',
        statement: 'Thomas ist Lehrer.',
        correct: true,
        explanation: 'Thomas says he works as a teacher (arbeite als Lehrer).',
      },
      {
        id: 't1-h1-5',
        audio_text: 'Liebe Kunden, die Bäckerei ist am Montag geschlossen. Wir sind am Dienstag wieder für Sie da.',
        statement: 'Die Bäckerei ist am Dienstag geschlossen.',
        correct: false,
        explanation: 'The bakery is closed on Monday (Montag), not Tuesday (Dienstag). It reopens on Tuesday.',
      },
      {
        id: 't1-h1-6',
        audio_text: 'Mein Name ist Anna Müller. Ich spreche Deutsch und Englisch.',
        statement: 'Anna spricht zwei Sprachen.',
        correct: true,
        explanation: 'Anna says she speaks German and English — that is two languages.',
      },
    ],
    teil2: [
      {
        id: 't1-h2-1',
        audio_text:
          'Mann: Entschuldigung, was kostet die Jacke?\nFrau: Die Jacke kostet 49 Euro. Aber heute haben wir 10 Euro Rabatt.\nMann: Gut, dann nehme ich sie.',
        question: 'Was bezahlt der Mann für die Jacke?',
        options: ['49 Euro', '39 Euro', '10 Euro'],
        correct: 'b',
        explanation: 'The jacket costs 49 Euro with a 10 Euro discount, so the man pays 39 Euro.',
      },
      {
        id: 't1-h2-2',
        audio_text:
          'Frau: Woher kommen Sie?\nMann: Ich komme aus der Türkei, aber ich lebe jetzt in Hamburg.\nFrau: Und was machen Sie beruflich?\nMann: Ich bin Ingenieur.',
        question: 'Wo wohnt der Mann jetzt?',
        options: ['In der Türkei', 'In Hamburg', 'In Berlin'],
        correct: 'b',
        explanation: 'The man says he now lives in Hamburg (ich lebe jetzt in Hamburg).',
      },
      {
        id: 't1-h2-3',
        audio_text:
          'Mann: Haben Sie den Pullover auch in Blau?\nFrau: Nein, leider nicht. Wir haben ihn in Rot und Grün.\nMann: Dann nehme ich den grünen.',
        question: 'Welche Farbe wählt der Mann?',
        options: ['Blau', 'Rot', 'Grün'],
        correct: 'c',
        explanation: 'Blue is not available; the man chooses green (den grünen).',
      },
      {
        id: 't1-h2-4',
        audio_text:
          'Frau: Guten Tag, ich möchte mich anmelden. Mein Name ist Petra Hoffmann.\nMann: Wie ist Ihre Adresse?\nFrau: Berliner Straße 12, 80331 München.\nMann: Und Ihre Telefonnummer?\nFrau: 089 1234567.',
        question: 'Was möchte die Frau machen?',
        options: ['Etwas kaufen', 'Sich anmelden', 'Einen Freund besuchen'],
        correct: 'b',
        explanation: 'The woman says "ich möchte mich anmelden" — she wants to register.',
      },
    ],
    teil3: [
      {
        id: 't1-h3-1',
        audio_text: 'Achtung: Der Deutschkurs am Montag beginnt nicht um 9 Uhr, sondern um 10 Uhr.',
        question: 'Wann beginnt der Deutschkurs am Montag?',
        options: ['Um 9 Uhr', 'Um 10 Uhr', 'Um 11 Uhr'],
        correct: 'b',
        explanation: 'The announcement corrects: the course starts at 10, not 9.',
      },
      {
        id: 't1-h3-2',
        audio_text: 'Liebe Kunden, heute finden Sie frische Erdbeeren im Sonderangebot für nur 2 Euro 50.',
        question: 'Was kostet das Sonderangebot?',
        options: ['1 Euro 50', '2 Euro 50', '3 Euro 50'],
        correct: 'b',
        explanation: 'The strawberries are on special offer for 2 Euro 50.',
      },
      {
        id: 't1-h3-3',
        audio_text: 'Willkommen im Kaufhaus Schneider. Schuhe finden Sie in der dritten Etage.',
        question: 'Wo sind die Schuhe?',
        options: ['In der ersten Etage', 'In der zweiten Etage', 'In der dritten Etage'],
        correct: 'c',
        explanation: 'Shoes are on the third floor (dritte Etage).',
      },
      {
        id: 't1-h3-4',
        audio_text: 'Der nächste Bus zum Hauptbahnhof fährt in 15 Minuten von Haltestelle 3 ab.',
        question: 'Von welcher Haltestelle fährt der Bus?',
        options: ['Haltestelle 1', 'Haltestelle 2', 'Haltestelle 3'],
        correct: 'c',
        explanation: 'The bus leaves from stop 3 (Haltestelle 3).',
      },
      {
        id: 't1-h3-5',
        audio_text: 'Das Büro von Frau Berger ist heute Nachmittag ab 14 Uhr geöffnet. Am Vormittag ist es geschlossen.',
        question: 'Wann ist das Büro geöffnet?',
        options: ['Am Vormittag', 'Ab 14 Uhr', 'Den ganzen Tag'],
        correct: 'b',
        explanation: 'The office is open from 14:00 in the afternoon; it is closed in the morning.',
      },
    ],
  },
  lesen: {
    teil1: [
      {
        id: 't1-l1-1',
        text: 'ÖFFNUNGSZEITEN\nMontag – Freitag: 8:00 – 20:00\nSamstag: 8:00 – 16:00\nSonntag: geschlossen',
        statement: 'Am Sonntag kann man hier einkaufen.',
        correct: false,
        explanation: 'The sign says Sunday is closed (geschlossen).',
      },
      {
        id: 't1-l1-2',
        text: 'Bitte hier nicht rauchen!\nDanke für Ihr Verständnis.',
        statement: 'Man darf hier nicht rauchen.',
        correct: true,
        explanation: '"Bitte hier nicht rauchen" means smoking is not allowed here.',
      },
      {
        id: 't1-l1-3',
        text: 'AUSVERKAUF!\nAlle Winterjacken 50 % reduziert!\nNur diese Woche!',
        statement: 'Die Winterjacken sind billiger.',
        correct: true,
        explanation: '50% reduziert means the winter jackets are cheaper (reduced by half).',
      },
      {
        id: 't1-l1-4',
        text: 'Fahrstuhl außer Betrieb.\nBitte benutzen Sie die Treppe.',
        statement: 'Der Fahrstuhl funktioniert.',
        correct: false,
        explanation: '"Außer Betrieb" means out of order — the elevator does not work.',
      },
      {
        id: 't1-l1-5',
        text: 'Parkplatz nur für Kunden!\nMax. 2 Stunden.',
        statement: 'Jeder darf hier parken.',
        correct: false,
        explanation: 'The parking is only for customers (nur für Kunden), not everyone.',
      },
    ],
    teil2: [
      {
        id: 't1-l2-1',
        ad_text: 'Verkaufe Fahrrad, 2 Jahre alt, sehr guter Zustand. Preis: 120 Euro. Telefon: 0176 9876543.',
        statement: 'Das Fahrrad ist neu.',
        correct: false,
        explanation: 'The bicycle is 2 years old, so it is not new.',
      },
      {
        id: 't1-l2-2',
        ad_text: 'Suche 2-Zimmer-Wohnung in der Stadtmitte. Bis 500 Euro warm. Kontakt: julia@email.de',
        statement: 'Julia möchte eine Wohnung mieten.',
        correct: true,
        explanation: '"Suche Wohnung" means she is looking for an apartment to rent.',
      },
      {
        id: 't1-l2-3',
        ad_text: 'Biete Nachhilfe in Mathematik für Schüler ab Klasse 5. 15 Euro pro Stunde. Ruf an: 030 5551234.',
        statement: 'Die Nachhilfe ist kostenlos.',
        correct: false,
        explanation: 'The tutoring costs 15 Euro per hour, so it is not free.',
      },
      {
        id: 't1-l2-4',
        ad_text: 'Babysitter gesucht! Für zwei Kinder (3 und 5 Jahre), Montag und Mittwoch, 15–18 Uhr. Bitte melden bei Familie Braun, Tel. 040 7778899.',
        statement: 'Familie Braun sucht einen Babysitter für drei Tage pro Woche.',
        correct: false,
        explanation: 'They need a babysitter for two days (Monday and Wednesday), not three.',
      },
      {
        id: 't1-l2-5',
        ad_text: 'Verschenke Sofa, braun, guter Zustand. Nur Selbstabholung. Adresse: Gartenstraße 8, Hamburg.',
        statement: 'Das Sofa kostet nichts.',
        correct: true,
        explanation: '"Verschenke" means giving away for free — it costs nothing.',
      },
    ],
    teil3: [
      {
        id: 't1-l3-1',
        email_text:
          'Liebe Frau Meier,\nvielen Dank für Ihre E-Mail. Ja, der Deutschkurs beginnt am 5. Oktober. Der Kurs ist montags und mittwochs von 18 bis 20 Uhr. Bitte bringen Sie Ihren Ausweis mit.\nMit freundlichen Grüßen\nVHS Stuttgart',
        question: 'Wann ist der Deutschkurs?',
        options: ['Montag und Mittwoch abends', 'Dienstag und Donnerstag abends', 'Montag bis Freitag morgens'],
        correct: 'a',
        explanation: 'The course is on Mondays and Wednesdays from 18:00 to 20:00 (evenings).',
      },
      {
        id: 't1-l3-2',
        email_text:
          'Hallo Tom,\nich habe am Samstag eine Party! Sie beginnt um 19 Uhr. Kannst du einen Salat mitbringen? Meine Adresse ist Blumenstraße 5.\nBis Samstag!\nLisa',
        question: 'Was soll Tom mitbringen?',
        options: ['Einen Kuchen', 'Einen Salat', 'Getränke'],
        correct: 'b',
        explanation: 'Lisa asks Tom to bring a salad (Kannst du einen Salat mitbringen?).',
      },
      {
        id: 't1-l3-3',
        email_text:
          'Sehr geehrter Herr Klein,\nIhr Paket ist da. Sie können es ab morgen in unserer Filiale in der Hauptstraße 10 abholen. Bitte bringen Sie Ihren Personalausweis mit. Die Filiale ist von 9 bis 17 Uhr geöffnet.\nMit freundlichen Grüßen\nDHL',
        question: 'Was muss Herr Klein mitbringen?',
        options: ['Sein Paket', 'Seinen Personalausweis', 'Einen Brief'],
        correct: 'b',
        explanation: 'He must bring his ID card (Personalausweis) to pick up the package.',
      },
      {
        id: 't1-l3-4',
        email_text:
          'Liebe Maria,\nleider kann ich morgen nicht zum Kino kommen. Ich bin krank. Können wir nächste Woche gehen? Vielleicht am Freitag?\nLiebe Grüße\nSofia',
        question: 'Warum kann Sofia nicht ins Kino gehen?',
        options: ['Sie hat keine Zeit.', 'Sie ist krank.', 'Sie hat kein Geld.'],
        correct: 'b',
        explanation: 'Sofia says she is sick (Ich bin krank).',
      },
      {
        id: 't1-l3-5',
        email_text:
          'Hallo Frau Weber,\nder Termin am Dienstag um 10 Uhr ist leider nicht mehr frei. Können Sie am Mittwoch um 14 Uhr kommen? Bitte rufen Sie uns an.\nPraxis Dr. Schulz',
        question: 'Was ist das Problem?',
        options: [
          'Der Arzt ist krank.',
          'Der Termin am Dienstag ist nicht frei.',
          'Die Praxis ist geschlossen.',
        ],
        correct: 'b',
        explanation: 'The Tuesday appointment at 10:00 is no longer available.',
      },
    ],
  },
  schreiben: {
    teil1: {
      context: 'You want to register for a German language course at the Volkshochschule (community college). Fill out the registration form.',
      fields: [
        { label: 'Vorname', answer: 'Arjun' },
        { label: 'Nachname', answer: 'Nair' },
        { label: 'Geburtsdatum', answer: '15.03.1998' },
        { label: 'Adresse', answer: 'Mozartstraße 12, 80336 München' },
        { label: 'Telefonnummer', answer: '0176 12345678' },
      ],
    },
    teil2: {
      prompt:
        'Your friend Lisa has invited you to her birthday party on Saturday. Write a short message to Lisa.',
      points: [
        'Thank her for the invitation.',
        'Say whether you can come or not.',
        'Ask what you should bring.',
      ],
      sample_answer:
        'Liebe Lisa, vielen Dank für die Einladung! Ich komme gern am Samstag. Was soll ich mitbringen? Vielleicht einen Kuchen? Bis Samstag! Viele Grüße, Arjun',
    },
  },
  sprechen: {
    teil1: [
      { topic: 'Name', sample_answer: 'Mein Name ist Arjun Nair.' },
      { topic: 'Alter', sample_answer: 'Ich bin 26 Jahre alt.' },
      { topic: 'Land', sample_answer: 'Ich komme aus Indien.' },
      { topic: 'Wohnort', sample_answer: 'Ich wohne in München.' },
      { topic: 'Sprachen', sample_answer: 'Ich spreche Malayalam, Englisch und ein bisschen Deutsch.' },
      { topic: 'Beruf / Studium', sample_answer: 'Ich studiere Informatik an der Universität München.' },
    ],
    teil2: [
      {
        word_card: 'Einkaufen',
        sample_question: 'Wo kaufen Sie gern ein?',
        sample_answer: 'Ich kaufe gern im Supermarkt ein. Manchmal gehe ich auch auf den Markt.',
      },
      {
        word_card: 'Hobby',
        sample_question: 'Was machen Sie in Ihrer Freizeit?',
        sample_answer: 'In meiner Freizeit lese ich gern Bücher und spiele Fußball.',
      },
      {
        word_card: 'Essen',
        sample_question: 'Was essen Sie gern?',
        sample_answer: 'Ich esse gern Reis mit Curry. Ich mag auch Pizza.',
      },
      {
        word_card: 'Sprachen lernen',
        sample_question: 'Warum lernen Sie Deutsch?',
        sample_answer: 'Ich lerne Deutsch, weil ich in Deutschland studieren möchte.',
      },
    ],
    teil3: [
      {
        situation: 'You are in a shop and want to buy a shirt, but you need a bigger size.',
        sample_request: 'Entschuldigung, haben Sie dieses Hemd auch in Größe L?',
      },
      {
        situation: 'You are at the register and want to pay by card.',
        sample_request: 'Kann ich mit Karte bezahlen?',
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Test 2 — Daily routine, time, appointments
// ---------------------------------------------------------------------------

const test2: GoetheTest = {
  id: 'goethe-a1-test-2',
  name: 'Goethe A1 — Test 2',
  description: 'Daily routine, time, appointments',
  hoeren: {
    teil1: [
      {
        id: 't2-h1-1',
        audio_text: 'Ich stehe jeden Tag um halb sieben auf. Dann frühstücke ich und gehe um acht Uhr zur Arbeit.',
        statement: 'Die Person steht um sieben Uhr auf.',
        correct: false,
        explanation: 'The person gets up at half past six (halb sieben), not seven.',
      },
      {
        id: 't2-h1-2',
        audio_text: 'Der Zahnarzt hat am Mittwochnachmittag keine Sprechstunde.',
        statement: 'Am Mittwochnachmittag ist die Zahnarztpraxis zu.',
        correct: true,
        explanation: 'No consultation hours (keine Sprechstunde) on Wednesday afternoon means the practice is closed.',
      },
      {
        id: 't2-h1-3',
        audio_text: 'Achtung: Der Spanischkurs am Donnerstag fällt heute aus. Der nächste Termin ist am Montag.',
        statement: 'Der Spanischkurs ist heute am Donnerstag.',
        correct: false,
        explanation: 'The Thursday Spanish course is cancelled today (fällt aus).',
      },
      {
        id: 't2-h1-4',
        audio_text: 'Mein Arbeitstag endet normalerweise um 17 Uhr. Dann fahre ich mit der U-Bahn nach Hause.',
        statement: 'Die Person fährt mit dem Bus nach Hause.',
        correct: false,
        explanation: 'The person takes the subway (U-Bahn), not the bus.',
      },
      {
        id: 't2-h1-5',
        audio_text: 'Guten Morgen! Es ist jetzt Viertel nach acht. Die Nachrichten kommen um halb neun.',
        statement: 'Die Nachrichten kommen um 8 Uhr 30.',
        correct: true,
        explanation: 'Halb neun means 8:30, which matches 8 Uhr 30.',
      },
      {
        id: 't2-h1-6',
        audio_text: 'Frau Richter hat morgen um 9 Uhr einen Termin beim Augenarzt.',
        statement: 'Frau Richter geht morgen zum Augenarzt.',
        correct: true,
        explanation: 'Frau Richter has an appointment with the eye doctor (Augenarzt) tomorrow.',
      },
    ],
    teil2: [
      {
        id: 't2-h2-1',
        audio_text:
          'Frau: Wann stehst du morgens auf?\nMann: Um sechs Uhr. Ich muss um halb acht bei der Arbeit sein.\nFrau: Das ist aber früh!\nMann: Ja, aber ich gehe auch früh schlafen, um zehn Uhr abends.',
        question: 'Wann muss der Mann bei der Arbeit sein?',
        options: ['Um 6 Uhr', 'Um halb acht', 'Um 10 Uhr'],
        correct: 'b',
        explanation: 'He must be at work at half past seven (halb acht).',
      },
      {
        id: 't2-h2-2',
        audio_text:
          'Mann: Guten Tag, ich möchte einen Termin beim Hausarzt.\nFrau: Geht es am Freitag um 11 Uhr?\nMann: Nein, freitags arbeite ich. Haben Sie etwas am Montag?\nFrau: Ja, Montag um 15 Uhr.\nMann: Das passt. Danke!',
        question: 'Wann hat der Mann seinen Termin?',
        options: ['Freitag um 11 Uhr', 'Montag um 15 Uhr', 'Montag um 11 Uhr'],
        correct: 'b',
        explanation: 'He cannot do Friday, so the appointment is Monday at 15:00.',
      },
      {
        id: 't2-h2-3',
        audio_text:
          'Frau: Was machst du heute Abend?\nMann: Ich gehe ins Kino. Der Film fängt um 20 Uhr an.\nFrau: Welchen Film siehst du?\nMann: Den neuen Actionfilm.\nFrau: Oh, der soll gut sein!',
        question: 'Was macht der Mann heute Abend?',
        options: ['Er geht ins Restaurant.', 'Er geht ins Kino.', 'Er bleibt zu Hause.'],
        correct: 'b',
        explanation: 'The man is going to the cinema (ins Kino).',
      },
      {
        id: 't2-h2-4',
        audio_text:
          'Mann: Hast du morgen Zeit? Wir können zusammen Mittag essen.\nFrau: Morgen ist Dienstag, oder? Ja, das geht. Um zwölf Uhr?\nMann: Perfekt. Treffen wir uns in der Kantine?\nFrau: Ja, gern.',
        question: 'Wo treffen sich die beiden?',
        options: ['Im Restaurant', 'Zu Hause', 'In der Kantine'],
        correct: 'c',
        explanation: 'They agree to meet in the canteen (Kantine).',
      },
    ],
    teil3: [
      {
        id: 't2-h3-1',
        audio_text: 'Der Yoga-Kurs beginnt jeden Dienstag um 18 Uhr im Raum 204.',
        question: 'Wann ist der Yoga-Kurs?',
        options: ['Montag um 18 Uhr', 'Dienstag um 18 Uhr', 'Mittwoch um 18 Uhr'],
        correct: 'b',
        explanation: 'The yoga class is every Tuesday at 18:00.',
      },
      {
        id: 't2-h3-2',
        audio_text: 'Liebe Patienten, die Praxis ist vom 23. bis 30. Dezember geschlossen. Ab dem 2. Januar sind wir wieder für Sie da.',
        question: 'Ab wann ist die Praxis wieder offen?',
        options: ['Ab dem 30. Dezember', 'Ab dem 31. Dezember', 'Ab dem 2. Januar'],
        correct: 'c',
        explanation: 'The practice reopens on January 2nd (ab dem 2. Januar).',
      },
      {
        id: 't2-h3-3',
        audio_text: 'Die Bibliothek hat neue Öffnungszeiten: Montag bis Freitag von 10 bis 19 Uhr. Am Samstag von 10 bis 14 Uhr.',
        question: 'Wie lange ist die Bibliothek am Samstag geöffnet?',
        options: ['Von 10 bis 19 Uhr', 'Von 10 bis 14 Uhr', 'Sie ist geschlossen.'],
        correct: 'b',
        explanation: 'On Saturday the library is open from 10 to 14 (10 bis 14 Uhr).',
      },
      {
        id: 't2-h3-4',
        audio_text: 'Sehr geehrte Eltern, der Elternabend am Donnerstag beginnt um 19 Uhr 30 in der Aula.',
        question: 'Wo findet der Elternabend statt?',
        options: ['Im Klassenzimmer', 'In der Aula', 'In der Kantine'],
        correct: 'b',
        explanation: 'The parents\' evening takes place in the assembly hall (Aula).',
      },
      {
        id: 't2-h3-5',
        audio_text: 'Bitte beachten Sie: Das Schwimmbad ist wegen Renovierung bis zum 15. März geschlossen.',
        question: 'Warum ist das Schwimmbad geschlossen?',
        options: ['Wegen Urlaub', 'Wegen Renovierung', 'Wegen des Wetters'],
        correct: 'b',
        explanation: 'The swimming pool is closed due to renovation (wegen Renovierung).',
      },
    ],
  },
  lesen: {
    teil1: [
      {
        id: 't2-l1-1',
        text: 'Sprechzeiten Praxis Dr. Lang:\nMo, Di, Do: 8:00–12:00 und 14:00–18:00\nMi, Fr: 8:00–12:00\nTermin nur nach Vereinbarung.',
        statement: 'Am Mittwoch kann man auch am Nachmittag zum Arzt gehen.',
        correct: false,
        explanation: 'On Wednesday (Mi) the practice is only open from 8:00 to 12:00 — no afternoon hours.',
      },
      {
        id: 't2-l1-2',
        text: 'ACHTUNG!\nAm 15. Oktober kein Wasser von 9:00 bis 14:00 Uhr.\nWir bitten um Verständnis.',
        statement: 'Am 15. Oktober gibt es am Vormittag kein Wasser.',
        correct: true,
        explanation: 'There is no water from 9:00 to 14:00, which includes the morning (Vormittag).',
      },
      {
        id: 't2-l1-3',
        text: 'Fundbüro\nÖffnungszeiten: Mo–Fr 9:00–16:00\nTelefon: 089 233-96045\nRathaus, Zimmer 12',
        statement: 'Das Fundbüro ist auch am Samstag geöffnet.',
        correct: false,
        explanation: 'The lost-and-found office is only open Monday to Friday (Mo–Fr).',
      },
      {
        id: 't2-l1-4',
        text: 'Kurs: Deutsch A1 Intensiv\nDauer: 4 Wochen\nZeit: Mo–Fr, 9:00–13:00\nPreis: 320 Euro\nAnmeldung an der Rezeption',
        statement: 'Der Kurs dauert einen Monat.',
        correct: true,
        explanation: '4 Wochen (4 weeks) is approximately one month (ein Monat).',
      },
      {
        id: 't2-l1-5',
        text: 'Bitte bis 22 Uhr leise sein.\nAb 22 Uhr: Nachtruhe!\nVielen Dank, Ihre Hausverwaltung.',
        statement: 'Man soll nach 22 Uhr keinen Lärm machen.',
        correct: true,
        explanation: 'Nachtruhe (quiet hours) starts at 22:00 — one should not make noise after that.',
      },
    ],
    teil2: [
      {
        id: 't2-l2-1',
        ad_text: 'Deutschlehrerin gibt Privatunterricht. Alle Niveaus: A1–C1. 25 Euro pro Stunde. Auch online möglich. Kontakt: anna.lehmann@web.de',
        statement: 'Der Unterricht ist nur für Anfänger.',
        correct: false,
        explanation: 'The teacher offers all levels from A1 to C1 (Alle Niveaus: A1–C1).',
      },
      {
        id: 't2-l2-2',
        ad_text: 'Suche Mitfahrgelegenheit von Stuttgart nach München, am Freitag, 10. November. Kann 15 Euro zahlen. SMS an 0171 9998877.',
        statement: 'Die Person möchte am Freitag nach München fahren.',
        correct: true,
        explanation: 'The person is looking for a ride from Stuttgart to Munich on Friday.',
      },
      {
        id: 't2-l2-3',
        ad_text: 'Verkaufe Waschmaschine, 5 Jahre alt, funktioniert gut. 80 Euro VB. Abholung in Berlin-Kreuzberg. Tel.: 030 4445566.',
        statement: 'Die Waschmaschine wird nach Hause geliefert.',
        correct: false,
        explanation: '"Abholung" means pick-up — the buyer must collect it themselves.',
      },
      {
        id: 't2-l2-4',
        ad_text: 'Fitnessstudio „FitFun" – Jetzt anmelden und 3 Monate kostenlos trainieren! Danach nur 29,90 Euro im Monat. Info: www.fitfun.de',
        statement: 'Die ersten drei Monate im Fitnessstudio sind gratis.',
        correct: true,
        explanation: '"3 Monate kostenlos trainieren" — the first 3 months are free.',
      },
      {
        id: 't2-l2-5',
        ad_text: 'Netter Hund sucht neues Zuhause! Rocky ist 3 Jahre alt, freundlich und mag Kinder. Nur an Familie mit Garten. Tel.: 0157 1112233.',
        statement: 'Der Hund kann auch in einer kleinen Wohnung leben.',
        correct: false,
        explanation: 'The ad says only to a family with a garden (nur an Familie mit Garten).',
      },
    ],
    teil3: [
      {
        id: 't2-l3-1',
        email_text:
          'Hallo Peter,\nkannst du morgen um 8 Uhr zum Friseur gehen? Ich habe einen Termin, aber ich kann leider nicht kommen. Der Friseur ist in der Schillerstraße 5. Sag bitte Bescheid!\nViele Grüße\nMarkus',
        question: 'Was soll Peter machen?',
        options: [
          'Den Friseurtermin absagen',
          'Zum Friseur gehen',
          'Markus anrufen',
        ],
        correct: 'b',
        explanation: 'Markus asks Peter to go to the hairdresser in his place.',
      },
      {
        id: 't2-l3-2',
        email_text:
          'Liebe Frau Hansen,\nhiermit bestätige ich Ihren Termin am Montag, den 14. März, um 10:30 Uhr. Bitte bringen Sie Ihre Versichertenkarte mit.\nMit freundlichen Grüßen\nDr. Neumann',
        question: 'Was soll Frau Hansen mitbringen?',
        options: ['Ihren Personalausweis', 'Ihre Versichertenkarte', 'Einen Brief'],
        correct: 'b',
        explanation: 'She should bring her insurance card (Versichertenkarte).',
      },
      {
        id: 't2-l3-3',
        email_text:
          'Hallo zusammen,\nunsere Besprechung am Mittwoch wird von 14 Uhr auf 16 Uhr verschoben. Der Raum bleibt gleich: Raum 305.\nViele Grüße\nHerr Fischer',
        question: 'Was ändert sich?',
        options: ['Der Raum', 'Die Uhrzeit', 'Der Tag'],
        correct: 'b',
        explanation: 'The time changes from 14:00 to 16:00; the room stays the same.',
      },
      {
        id: 't2-l3-4',
        email_text:
          'Lieber Tim,\nich fahre am Wochenende zu meinen Eltern nach Köln. Kannst du bitte meine Blumen gießen? Der Schlüssel liegt unter der Fußmatte.\nDanke dir!\nSara',
        question: 'Wo ist der Schlüssel?',
        options: ['Bei den Nachbarn', 'Unter der Fußmatte', 'Im Briefkasten'],
        correct: 'b',
        explanation: 'The key is under the doormat (unter der Fußmatte).',
      },
      {
        id: 't2-l3-5',
        email_text:
          'Sehr geehrter Herr Bauer,\nIhre Bestellung ist unterwegs. Die Lieferung kommt voraussichtlich am Donnerstag zwischen 10 und 14 Uhr. Bitte seien Sie zu Hause.\nFreundliche Grüße\nOnline-Shop24',
        question: 'Wann kommt die Lieferung?',
        options: ['Am Mittwoch', 'Am Donnerstag', 'Am Freitag'],
        correct: 'b',
        explanation: 'The delivery is expected on Thursday (Donnerstag).',
      },
    ],
  },
  schreiben: {
    teil1: {
      context: 'You want to make an appointment with a new doctor. Fill out the patient registration form.',
      fields: [
        { label: 'Name', answer: 'Arjun Nair' },
        { label: 'Geburtsdatum', answer: '15.03.1998' },
        { label: 'Adresse', answer: 'Schillerstraße 20, 80336 München' },
        { label: 'Telefon', answer: '0176 12345678' },
        { label: 'Krankenkasse', answer: 'AOK Bayern' },
      ],
    },
    teil2: {
      prompt:
        'You cannot come to your German class tomorrow. Write a message to your teacher, Frau Schmidt.',
      points: [
        'Say you cannot come to class tomorrow.',
        'Give a reason.',
        'Ask about homework.',
      ],
      sample_answer:
        'Liebe Frau Schmidt, ich kann morgen leider nicht zum Unterricht kommen. Ich bin krank und muss zum Arzt gehen. Können Sie mir bitte die Hausaufgaben schicken? Vielen Dank! Arjun',
    },
  },
  sprechen: {
    teil1: [
      { topic: 'Name', sample_answer: 'Ich heiße Arjun Nair.' },
      { topic: 'Alter', sample_answer: 'Ich bin sechsundzwanzig Jahre alt.' },
      { topic: 'Land', sample_answer: 'Ich komme aus Indien, aus Kerala.' },
      { topic: 'Wohnort', sample_answer: 'Ich wohne jetzt in München.' },
      { topic: 'Sprachen', sample_answer: 'Ich spreche Malayalam, Englisch, Hindi und ein bisschen Deutsch.' },
      { topic: 'Hobbys', sample_answer: 'Meine Hobbys sind Lesen, Kochen und Schwimmen.' },
    ],
    teil2: [
      {
        word_card: 'Tagesablauf',
        sample_question: 'Wann stehen Sie morgens auf?',
        sample_answer: 'Ich stehe um sieben Uhr auf. Dann dusche ich und frühstücke.',
      },
      {
        word_card: 'Arbeit',
        sample_question: 'Was machen Sie beruflich?',
        sample_answer: 'Ich bin Student. Ich studiere Informatik an der Universität.',
      },
      {
        word_card: 'Freizeit',
        sample_question: 'Was machen Sie am Wochenende?',
        sample_answer: 'Am Wochenende treffe ich Freunde und gehe spazieren.',
      },
      {
        word_card: 'Termine',
        sample_question: 'Haben Sie morgen einen Termin?',
        sample_answer: 'Ja, ich habe morgen um 10 Uhr einen Termin beim Arzt.',
      },
    ],
    teil3: [
      {
        situation: 'You want to change the time of your doctor\'s appointment.',
        sample_request: 'Entschuldigung, kann ich meinen Termin verschieben? Geht es auch am Nachmittag?',
      },
      {
        situation: 'You arrive late to your language class and want to apologize.',
        sample_request: 'Entschuldigung, ich bin zu spät. Darf ich mich setzen?',
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Test 3 — Family, descriptions, housing
// ---------------------------------------------------------------------------

const test3: GoetheTest = {
  id: 'goethe-a1-test-3',
  name: 'Goethe A1 — Test 3',
  description: 'Family, descriptions, housing',
  hoeren: {
    teil1: [
      {
        id: 't3-h1-1',
        audio_text: 'Ich habe zwei Kinder: einen Sohn und eine Tochter. Mein Sohn ist zehn und meine Tochter ist sieben.',
        statement: 'Die Tochter ist zehn Jahre alt.',
        correct: false,
        explanation: 'The daughter is seven (sieben), the son is ten (zehn).',
      },
      {
        id: 't3-h1-2',
        audio_text: 'Unsere neue Wohnung hat drei Zimmer, eine Küche und ein Bad. Sie ist 75 Quadratmeter groß.',
        statement: 'Die Wohnung hat drei Zimmer.',
        correct: true,
        explanation: 'The apartment has three rooms (drei Zimmer).',
      },
      {
        id: 't3-h1-3',
        audio_text: 'Mein Bruder wohnt in Frankfurt. Er ist verheiratet und hat ein Kind.',
        statement: 'Der Bruder ist ledig.',
        correct: false,
        explanation: 'The brother is married (verheiratet), not single (ledig).',
      },
      {
        id: 't3-h1-4',
        audio_text: 'Die Wohnung in der Gartenstraße kostet 650 Euro Miete im Monat, ohne Nebenkosten.',
        statement: 'Die Miete kostet 650 Euro inklusive Nebenkosten.',
        correct: false,
        explanation: 'The rent is 650 Euro without additional costs (ohne Nebenkosten).',
      },
      {
        id: 't3-h1-5',
        audio_text: 'Meine Großmutter ist 82 Jahre alt. Sie lebt allein, aber sie ist sehr aktiv.',
        statement: 'Die Großmutter lebt allein.',
        correct: true,
        explanation: 'The grandmother lives alone (lebt allein).',
      },
      {
        id: 't3-h1-6',
        audio_text: 'Wir suchen eine Wohnung mit Balkon in der Nähe vom Bahnhof. Maximal 800 Euro warm.',
        statement: 'Die Familie möchte eine Wohnung mit Garten.',
        correct: false,
        explanation: 'They want a balcony (Balkon), not a garden (Garten).',
      },
    ],
    teil2: [
      {
        id: 't3-h2-1',
        audio_text:
          'Frau: Wie groß ist Ihre Familie?\nMann: Wir sind zu viert: meine Frau, meine zwei Töchter und ich.\nFrau: Wie alt sind Ihre Töchter?\nMann: Lena ist acht und Sophie ist fünf.',
        question: 'Wie viele Personen sind in der Familie?',
        options: ['Drei', 'Vier', 'Fünf'],
        correct: 'b',
        explanation: 'The family has four members: the man, his wife, and two daughters.',
      },
      {
        id: 't3-h2-2',
        audio_text:
          'Mann: Ich suche eine 2-Zimmer-Wohnung in Hamburg.\nFrau: Wie viel möchten Sie ausgeben?\nMann: Nicht mehr als 600 Euro im Monat.\nFrau: Ich habe eine Wohnung in Altona für 580 Euro. Möchten Sie sie sehen?\nMann: Ja, gern!',
        question: 'Wie viel kostet die Wohnung in Altona?',
        options: ['600 Euro', '580 Euro', '560 Euro'],
        correct: 'b',
        explanation: 'The apartment in Altona costs 580 Euro.',
      },
      {
        id: 't3-h2-3',
        audio_text:
          'Frau: Mein Mann und ich haben ein Haus gekauft!\nMann: Toll! Wo ist das Haus?\nFrau: In Potsdam, bei Berlin. Es hat einen großen Garten.\nMann: Wie viele Zimmer hat es?\nFrau: Fünf Zimmer, zwei Bäder und eine große Küche.',
        question: 'Wo ist das Haus?',
        options: ['In Berlin', 'In Potsdam', 'In Hamburg'],
        correct: 'b',
        explanation: 'The house is in Potsdam, near Berlin.',
      },
      {
        id: 't3-h2-4',
        audio_text:
          'Mann: Wie sieht dein neues Zimmer aus?\nFrau: Es ist groß und hell. Ich habe ein Bett, einen Schreibtisch und einen großen Schrank.\nMann: Hast du auch ein Regal?\nFrau: Nein, noch nicht. Ich muss eins kaufen.',
        question: 'Was hat die Frau noch nicht?',
        options: ['Einen Schreibtisch', 'Einen Schrank', 'Ein Regal'],
        correct: 'c',
        explanation: 'She says she does not have a shelf yet (noch nicht) and must buy one.',
      },
    ],
    teil3: [
      {
        id: 't3-h3-1',
        audio_text: 'Zu vermieten: 3-Zimmer-Wohnung, 80 Quadratmeter, mit Balkon, Nähe Stadtpark. 720 Euro warm. Besichtigung am Samstag um 11 Uhr.',
        question: 'Wann ist die Besichtigung?',
        options: ['Am Freitag', 'Am Samstag um 11 Uhr', 'Am Sonntag um 11 Uhr'],
        correct: 'b',
        explanation: 'The viewing is on Saturday at 11 o\'clock.',
      },
      {
        id: 't3-h3-2',
        audio_text: 'Familie Schneider hat drei Kinder: zwei Jungen und ein Mädchen. Das Mädchen ist das jüngste Kind.',
        question: 'Wie viele Jungen hat Familie Schneider?',
        options: ['Einen', 'Zwei', 'Drei'],
        correct: 'b',
        explanation: 'The family has two boys (zwei Jungen).',
      },
      {
        id: 't3-h3-3',
        audio_text: 'Die Wohnung im Erdgeschoss hat keinen Balkon, aber einen kleinen Garten. Im zweiten Stock gibt es einen Balkon.',
        question: 'Welche Wohnung hat einen Garten?',
        options: ['Die Wohnung im Erdgeschoss', 'Die Wohnung im zweiten Stock', 'Beide Wohnungen'],
        correct: 'a',
        explanation: 'The ground-floor apartment (Erdgeschoss) has a small garden.',
      },
      {
        id: 't3-h3-4',
        audio_text: 'Liebe Mieter, am Montag kommt ein Handwerker. Er repariert die Heizung im Haus. Bitte seien Sie zwischen 9 und 12 Uhr zu Hause.',
        question: 'Was wird repariert?',
        options: ['Das Wasser', 'Die Heizung', 'Die Tür'],
        correct: 'b',
        explanation: 'The heating (Heizung) will be repaired.',
      },
      {
        id: 't3-h3-5',
        audio_text: 'Meine Schwester hat letzte Woche geheiratet. Ihr Mann heißt Daniel. Er kommt aus Österreich.',
        question: 'Woher kommt der Mann der Schwester?',
        options: ['Aus Deutschland', 'Aus der Schweiz', 'Aus Österreich'],
        correct: 'c',
        explanation: 'Daniel comes from Austria (Österreich).',
      },
    ],
  },
  lesen: {
    teil1: [
      {
        id: 't3-l1-1',
        text: 'Zu vermieten:\n2-Zimmer-Wohnung, 55 m²\n3. Stock, kein Fahrstuhl\nMiete: 490 € + 120 € Nebenkosten\nAb 1. April frei',
        statement: 'In dem Haus gibt es einen Aufzug.',
        correct: false,
        explanation: '"Kein Fahrstuhl" means there is no elevator.',
      },
      {
        id: 't3-l1-2',
        text: 'Hausordnung:\nRuhezeiten: 13:00–15:00 Uhr und 22:00–7:00 Uhr\nHaustiere nur mit Erlaubnis des Vermieters.',
        statement: 'Man darf immer ein Haustier haben.',
        correct: false,
        explanation: 'Pets are only allowed with the landlord\'s permission (nur mit Erlaubnis).',
      },
      {
        id: 't3-l1-3',
        text: 'Möbelhaus König\nGroßer Sommerschlussverkauf!\nAlle Sofas 30 % günstiger\n1. Juli bis 31. Juli',
        statement: 'Der Verkauf ist im Juli.',
        correct: true,
        explanation: 'The summer sale runs from July 1 to July 31.',
      },
      {
        id: 't3-l1-4',
        text: 'EINGANG NUR FÜR BEWOHNER\nBitte Tür immer schließen!',
        statement: 'Gäste dürfen diesen Eingang benutzen.',
        correct: false,
        explanation: 'The entrance is only for residents (nur für Bewohner).',
      },
      {
        id: 't3-l1-5',
        text: 'Treppenhausreinigung:\nJede Woche ist eine andere Familie dran.\nDiese Woche: Familie Özdemir (2. OG)',
        statement: 'Alle Familien putzen jede Woche zusammen.',
        correct: false,
        explanation: 'Each week a different family cleans (jede Woche ist eine andere Familie dran), not all together.',
      },
    ],
    teil2: [
      {
        id: 't3-l2-1',
        ad_text: 'Suche Nachmieter für schöne 3-Zimmer-Wohnung in Schwabing, München. 85 m², Balkon, Einbauküche. 890 € warm. Frei ab 1. Mai. Tel.: 089 556677.',
        statement: 'Die Wohnung hat keine Küche.',
        correct: false,
        explanation: 'The apartment has a fitted kitchen (Einbauküche).',
      },
      {
        id: 't3-l2-2',
        ad_text: 'Verkaufe Kinderbett, weiß, 70x140 cm, mit Matratze. Sehr guter Zustand. 60 Euro. Nur Abholung in Berlin-Mitte.',
        statement: 'Das Kinderbett wird mit Matratze verkauft.',
        correct: true,
        explanation: 'The ad says "mit Matratze" — the mattress is included.',
      },
      {
        id: 't3-l2-3',
        ad_text: 'WG-Zimmer frei! 18 m², möbliert, in 3er-WG in Köln-Ehrenfeld. 350 € inkl. Internet. Wir sind zwei Studentinnen (23 und 25 Jahre). Du sollst freundlich und ordentlich sein.',
        statement: 'In der WG wohnen momentan drei Personen.',
        correct: false,
        explanation: 'Currently two students live there (Wir sind zwei Studentinnen); they are looking for a third.',
      },
      {
        id: 't3-l2-4',
        ad_text: 'Suche 1-Zimmer-Wohnung in Düsseldorf, Nähe Universität. Bis 400 Euro warm. Am besten ab sofort. E-Mail: lars99@email.de',
        statement: 'Lars sucht eine Wohnung in der Nähe der Universität.',
        correct: true,
        explanation: 'He is looking for an apartment near the university (Nähe Universität).',
      },
      {
        id: 't3-l2-5',
        ad_text: 'Zu verschenken: großer Esstisch aus Holz, 6 Stühle. Nur zusammen. Abholung in Hannover-Linden. Tel.: 0511 2233445.',
        statement: 'Man kann nur den Tisch nehmen, ohne die Stühle.',
        correct: false,
        explanation: '"Nur zusammen" means they must be taken together (table and chairs).',
      },
    ],
    teil3: [
      {
        id: 't3-l3-1',
        email_text:
          'Lieber Herr Kumar,\nIhre neue Wohnung in der Bergstraße 7 ist ab dem 1. März fertig. Bitte kommen Sie am 28. Februar um 10 Uhr ins Büro. Dann bekommen Sie die Schlüssel. Bringen Sie bitte Ihren Personalausweis und die Kaution (1400 Euro) mit.\nMit freundlichen Grüßen\nHausverwaltung Schmid',
        question: 'Was soll Herr Kumar am 28. Februar machen?',
        options: [
          'Die Wohnung besichtigen',
          'Die Schlüssel abholen',
          'Die Wohnung renovieren',
        ],
        correct: 'b',
        explanation: 'He should come to the office to receive the keys (Schlüssel bekommen).',
      },
      {
        id: 't3-l3-2',
        email_text:
          'Hallo Nina,\nmein Bruder und seine Frau kommen am Wochenende zu Besuch. Ich möchte am Sonntag für alle kochen. Hast du Lust zu kommen? Wir essen um 13 Uhr.\nLiebe Grüße\nElena',
        question: 'Wer kommt am Wochenende zu Elena?',
        options: ['Ihre Eltern', 'Ihr Bruder und seine Frau', 'Ihre Freundin Nina'],
        correct: 'b',
        explanation: 'Elena\'s brother and his wife are coming to visit.',
      },
      {
        id: 't3-l3-3',
        email_text:
          'Sehr geehrte Mieter,\nab nächsten Monat gibt es neue Mülltonnen: Grün für Biomüll, Blau für Papier, Gelb für Plastik. Bitte trennen Sie Ihren Müll. Die alten Tonnen werden am 30. September abgeholt.\nMit freundlichen Grüßen\nHausverwaltung',
        question: 'Was sollen die Mieter machen?',
        options: [
          'Die alten Tonnen verkaufen',
          'Den Müll trennen',
          'Neue Tonnen kaufen',
        ],
        correct: 'b',
        explanation: 'The tenants should separate their waste (Müll trennen).',
      },
      {
        id: 't3-l3-4',
        email_text:
          'Hallo Jan,\nkannst du mir helfen? Ich ziehe nächste Woche um und brauche jemanden mit einem Auto. Ich habe nicht so viele Möbel — nur ein Bett, einen Schreibtisch und ein paar Kisten. Es dauert vielleicht zwei Stunden.\nViele Grüße\nMax',
        question: 'Warum schreibt Max an Jan?',
        options: [
          'Er möchte Möbel kaufen.',
          'Er braucht Hilfe beim Umzug.',
          'Er hat ein neues Auto.',
        ],
        correct: 'b',
        explanation: 'Max is moving and needs help (Hilfe beim Umzug).',
      },
      {
        id: 't3-l3-5',
        email_text:
          'Liebe Frau Yilmaz,\nwillkommen in unserem Haus! Hier ein paar Infos: Ihre Post ist im Briefkasten im Erdgeschoss. Der Waschkeller ist im Untergeschoss. Der Müll kommt montags. Bei Fragen können Sie mich gern anrufen.\nViele Grüße\nIhr Nachbar, Herr Wolff',
        question: 'Wo ist der Waschkeller?',
        options: ['Im Erdgeschoss', 'Im Untergeschoss', 'Im ersten Stock'],
        correct: 'b',
        explanation: 'The laundry room is in the basement (Untergeschoss).',
      },
    ],
  },
  schreiben: {
    teil1: {
      context: 'You want to rent an apartment. Fill out the application form for the landlord.',
      fields: [
        { label: 'Vor- und Nachname', answer: 'Arjun Nair' },
        { label: 'Geburtsdatum', answer: '15.03.1998' },
        { label: 'Beruf', answer: 'Student' },
        { label: 'Monatliches Einkommen', answer: '1200 Euro' },
        { label: 'Anzahl der Personen', answer: '1' },
      ],
    },
    teil2: {
      prompt:
        'Something in your apartment is broken. Write a message to your landlord, Herr Krause.',
      points: [
        'Say what is broken.',
        'Describe the problem.',
        'Ask when someone can come to repair it.',
      ],
      sample_answer:
        'Sehr geehrter Herr Krause, meine Heizung im Schlafzimmer funktioniert nicht mehr. Es ist sehr kalt. Können Sie bitte einen Handwerker schicken? Wann kann jemand kommen? Vielen Dank! Mit freundlichen Grüßen, Arjun Nair',
    },
  },
  sprechen: {
    teil1: [
      { topic: 'Name', sample_answer: 'Mein Name ist Arjun Nair.' },
      { topic: 'Alter', sample_answer: 'Ich bin 26 Jahre alt.' },
      { topic: 'Land', sample_answer: 'Ich komme aus Indien.' },
      { topic: 'Familie', sample_answer: 'Ich habe eine Schwester und einen Bruder. Meine Eltern wohnen in Indien.' },
      { topic: 'Wohnort', sample_answer: 'Ich wohne in einer kleinen Wohnung in München.' },
      { topic: 'Sprachen', sample_answer: 'Ich spreche Malayalam, Englisch und lerne Deutsch.' },
    ],
    teil2: [
      {
        word_card: 'Familie',
        sample_question: 'Haben Sie Geschwister?',
        sample_answer: 'Ja, ich habe eine Schwester. Sie ist 23 Jahre alt und studiert in Kochi.',
      },
      {
        word_card: 'Wohnung',
        sample_question: 'Wie ist Ihre Wohnung?',
        sample_answer: 'Meine Wohnung hat zwei Zimmer, eine Küche und ein Bad. Sie ist klein, aber gemütlich.',
      },
      {
        word_card: 'Möbel',
        sample_question: 'Was haben Sie in Ihrem Zimmer?',
        sample_answer: 'Ich habe ein Bett, einen Schreibtisch, einen Stuhl und ein Regal.',
      },
      {
        word_card: 'Nachbarn',
        sample_question: 'Kennen Sie Ihre Nachbarn?',
        sample_answer: 'Ja, mein Nachbar heißt Herr Müller. Er ist sehr nett.',
      },
    ],
    teil3: [
      {
        situation: 'Your washing machine is broken. Ask your neighbor if you can use theirs.',
        sample_request: 'Entschuldigung, meine Waschmaschine ist kaputt. Kann ich bitte Ihre Waschmaschine benutzen?',
      },
      {
        situation: 'You want to know where the nearest supermarket is.',
        sample_request: 'Entschuldigung, wo ist der nächste Supermarkt?',
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Test 4 — Food & drink, restaurant, preferences
// ---------------------------------------------------------------------------

const test4: GoetheTest = {
  id: 'goethe-a1-test-4',
  name: 'Goethe A1 — Test 4',
  description: 'Food & drink, restaurant, preferences',
  hoeren: {
    teil1: [
      {
        id: 't4-h1-1',
        audio_text: 'Ich trinke morgens immer Kaffee mit Milch. Tee mag ich nicht so gern.',
        statement: 'Die Person trinkt morgens Tee.',
        correct: false,
        explanation: 'The person drinks coffee in the morning; they don\'t like tea.',
      },
      {
        id: 't4-h1-2',
        audio_text: 'Heute ist unser Mittagsmenü: Gemüsesuppe und Hähnchen mit Reis. Dazu gibt es einen Salat.',
        statement: 'Das Mittagsmenü hat auch einen Salat.',
        correct: true,
        explanation: '"Dazu gibt es einen Salat" — a salad is included.',
      },
      {
        id: 't4-h1-3',
        audio_text: 'Das Restaurant „Zum Löwen" hat montags Ruhetag. Von Dienstag bis Sonntag sind wir von 11 bis 22 Uhr geöffnet.',
        statement: 'Das Restaurant ist montags geöffnet.',
        correct: false,
        explanation: 'Monday is the rest day (Ruhetag); the restaurant is closed.',
      },
      {
        id: 't4-h1-4',
        audio_text: 'Ich bin Vegetarierin. Ich esse kein Fleisch und keinen Fisch, aber ich esse Käse und Eier.',
        statement: 'Die Frau isst auch Fisch.',
        correct: false,
        explanation: 'She says she eats no fish (keinen Fisch).',
      },
      {
        id: 't4-h1-5',
        audio_text: 'Im Sonderangebot heute: ein Kilo Tomaten für 1 Euro 99, frisch vom Bauernhof!',
        statement: 'Die Tomaten kommen vom Bauernhof.',
        correct: true,
        explanation: '"Frisch vom Bauernhof" — fresh from the farm.',
      },
      {
        id: 't4-h1-6',
        audio_text: 'Wir haben leider keine Pizza mehr. Aber wir können Ihnen Pasta oder einen Burger anbieten.',
        statement: 'Man kann noch Pizza bestellen.',
        correct: false,
        explanation: 'They have no more pizza (keine Pizza mehr).',
      },
    ],
    teil2: [
      {
        id: 't4-h2-1',
        audio_text:
          'Kellner: Was möchten Sie trinken?\nFrau: Ich nehme ein Glas Weißwein, bitte.\nMann: Und für mich ein Bier.\nKellner: Gern. Möchten Sie auch etwas essen?\nMann: Ja, die Speisekarte bitte.',
        question: 'Was bestellt die Frau?',
        options: ['Ein Bier', 'Ein Glas Weißwein', 'Ein Glas Wasser'],
        correct: 'b',
        explanation: 'The woman orders a glass of white wine (Weißwein).',
      },
      {
        id: 't4-h2-2',
        audio_text:
          'Frau: Was kochst du heute Abend?\nMann: Ich mache Spaghetti Bolognese.\nFrau: Lecker! Soll ich etwas mitbringen?\nMann: Ja, kannst du Parmesan kaufen?\nFrau: Klar, kein Problem.',
        question: 'Was soll die Frau kaufen?',
        options: ['Spaghetti', 'Parmesan', 'Tomaten'],
        correct: 'b',
        explanation: 'The man asks her to buy Parmesan cheese.',
      },
      {
        id: 't4-h2-3',
        audio_text:
          'Mann: Ich hätte gern ein Schnitzel mit Pommes.\nKellnerin: Möchten Sie dazu einen Salat?\nMann: Ja, bitte. Und zum Trinken ein Mineralwasser.\nKellnerin: Mit oder ohne Kohlensäure?\nMann: Ohne, bitte.',
        question: 'Was trinkt der Mann?',
        options: [
          'Mineralwasser mit Kohlensäure',
          'Mineralwasser ohne Kohlensäure',
          'Apfelsaft',
        ],
        correct: 'b',
        explanation: 'He orders mineral water without carbonation (ohne Kohlensäure).',
      },
      {
        id: 't4-h2-4',
        audio_text:
          'Frau: Ich möchte gern die Gemüsesuppe. Ist die vegetarisch?\nKellner: Ja, natürlich. Sie ist mit Kartoffeln, Karotten und Bohnen.\nFrau: Sehr gut. Und danach ein Stück Apfelkuchen als Nachtisch.\nKellner: Gern. Mit Sahne?\nFrau: Ja, bitte!',
        question: 'Was bestellt die Frau als Nachtisch?',
        options: ['Eis', 'Apfelkuchen mit Sahne', 'Schokoladenkuchen'],
        correct: 'b',
        explanation: 'She orders apple cake with cream (Apfelkuchen mit Sahne).',
      },
    ],
    teil3: [
      {
        id: 't4-h3-1',
        audio_text: 'Unser Tagesangebot: Wiener Schnitzel mit Kartoffelsalat für nur 8 Euro 90.',
        question: 'Was kostet das Tagesangebot?',
        options: ['7 Euro 90', '8 Euro 90', '9 Euro 90'],
        correct: 'b',
        explanation: 'The daily special costs 8 Euro 90.',
      },
      {
        id: 't4-h3-2',
        audio_text: 'Liebe Gäste, die Küche schließt heute um 21 Uhr. Letzte Bestellung bitte bis 20 Uhr 30.',
        question: 'Bis wann kann man bestellen?',
        options: ['Bis 20 Uhr', 'Bis 20 Uhr 30', 'Bis 21 Uhr'],
        correct: 'b',
        explanation: 'Last orders are at 20:30 (20 Uhr 30).',
      },
      {
        id: 't4-h3-3',
        audio_text: 'Am Samstagabend gibt es Live-Musik im Restaurant. Tischreservierung empfohlen. Rufen Sie an: 089 3344556.',
        question: 'Wann gibt es Live-Musik?',
        options: ['Am Freitagabend', 'Am Samstagabend', 'Am Sonntagabend'],
        correct: 'b',
        explanation: 'Live music is on Saturday evening (Samstagabend).',
      },
      {
        id: 't4-h3-4',
        audio_text: 'Heute im Café: Kaufen Sie zwei Stück Kuchen und bekommen Sie einen Kaffee gratis dazu!',
        question: 'Was bekommt man gratis?',
        options: ['Ein Stück Kuchen', 'Einen Kaffee', 'Einen Tee'],
        correct: 'b',
        explanation: 'Buy two pieces of cake and get a free coffee.',
      },
      {
        id: 't4-h3-5',
        audio_text: 'Das Frühstücksbuffet im Hotel ist von 6 Uhr 30 bis 10 Uhr geöffnet. Es kostet 12 Euro pro Person.',
        question: 'Wie viel kostet das Frühstücksbuffet?',
        options: ['10 Euro', '12 Euro', '15 Euro'],
        correct: 'b',
        explanation: 'The breakfast buffet costs 12 Euro per person.',
      },
    ],
  },
  lesen: {
    teil1: [
      {
        id: 't4-l1-1',
        text: 'SPEISEKARTE\nMittagsmenü (11:30–14:00)\nSuppe + Hauptgericht: 7,50 €\nGetränke nicht inklusive',
        statement: 'Das Mittagsmenü kostet 7,50 Euro mit Getränk.',
        correct: false,
        explanation: 'Drinks are not included (Getränke nicht inklusive).',
      },
      {
        id: 't4-l1-2',
        text: 'Bäckerei Fischer\nTäglich frische Brötchen ab 6 Uhr!\nMontag bis Samstag\nSonn- und Feiertage: geschlossen',
        statement: 'Am Sonntag kann man hier Brötchen kaufen.',
        correct: false,
        explanation: 'The bakery is closed on Sundays and holidays.',
      },
      {
        id: 't4-l1-3',
        text: 'ACHTUNG: NUSSALLERGIE!\nDieses Produkt enthält Spuren von Nüssen.',
        statement: 'Dieses Produkt ist für Menschen mit Nussallergie gefährlich.',
        correct: true,
        explanation: '"Enthält Spuren von Nüssen" means it contains traces of nuts — dangerous for people with nut allergies.',
      },
      {
        id: 't4-l1-4',
        text: 'Eiscafé Venezia\nNeu: Veganes Eis! 🌱\n2 Kugeln: 3,00 €\n3 Kugeln: 4,00 €',
        statement: 'Drei Kugeln Eis kosten 4 Euro.',
        correct: true,
        explanation: '3 scoops cost 4 Euro as stated on the sign.',
      },
      {
        id: 't4-l1-5',
        text: 'Kein Essen und Trinken in der Bibliothek!\nDanke für Ihr Verständnis.',
        statement: 'Man darf in der Bibliothek essen.',
        correct: false,
        explanation: 'No eating or drinking is allowed in the library.',
      },
    ],
    teil2: [
      {
        id: 't4-l2-1',
        ad_text: 'Koch gesucht! Restaurant „Bella Italia" sucht Koch/Köchin für italienische Küche. Vollzeit, Mo–Sa. Erfahrung nötig. Bewerbung an: info@bellaitalia.de',
        statement: 'Man braucht keine Erfahrung für den Job.',
        correct: false,
        explanation: '"Erfahrung nötig" means experience is required.',
      },
      {
        id: 't4-l2-2',
        ad_text: 'Lieferdienst „Schnell & Lecker" – Wir liefern Pizza, Pasta und Salate direkt zu Ihnen nach Hause! Bestellung ab 10 Euro. Lieferung kostenlos. Tel.: 0800 5555666.',
        statement: 'Die Lieferung kostet extra.',
        correct: false,
        explanation: 'Delivery is free (Lieferung kostenlos).',
      },
      {
        id: 't4-l2-3',
        ad_text: 'Kochkurs für Anfänger: Lernen Sie, einfache deutsche Gerichte zu kochen! 4 Abende, jeweils Mittwoch, 18–21 Uhr. 80 Euro inkl. Zutaten. VHS Frankfurt.',
        statement: 'Der Kochkurs ist an vier Abenden.',
        correct: true,
        explanation: 'The cooking course has 4 evenings (4 Abende).',
      },
      {
        id: 't4-l2-4',
        ad_text: 'Café Sonnenschein sucht Kellnerin für das Wochenende (Sa + So), 10–16 Uhr. 12 Euro pro Stunde. Keine Erfahrung nötig. Bewirb dich bei: cafe-sonnenschein@web.de',
        statement: 'Man arbeitet dort nur am Wochenende.',
        correct: true,
        explanation: 'The position is for weekends only (Sa + So).',
      },
      {
        id: 't4-l2-5',
        ad_text: 'Bio-Gemüsekiste: Jede Woche frisches Obst und Gemüse aus der Region, direkt an Ihre Haustür! Klein (1–2 Pers.): 15 €. Groß (3–4 Pers.): 25 €. Bestellung: www.biokiste.de',
        statement: 'Die große Kiste ist für fünf Personen.',
        correct: false,
        explanation: 'The large box is for 3–4 persons, not five.',
      },
    ],
    teil3: [
      {
        id: 't4-l3-1',
        email_text:
          'Hallo Leute,\nich lade euch am Freitag zu mir ein! Ich koche indisches Curry. Wer möchte, kann Nachtisch mitbringen. Bitte sagt mir bis Mittwoch Bescheid, ob ihr kommt.\nViele Grüße\nRavi',
        question: 'Was sollen die Freunde mitbringen?',
        options: ['Getränke', 'Nachtisch', 'Reis'],
        correct: 'b',
        explanation: 'Ravi suggests that whoever wants to can bring dessert (Nachtisch).',
      },
      {
        id: 't4-l3-2',
        email_text:
          'Liebe Frau Nair,\nvielen Dank für Ihre Reservierung. Wir haben einen Tisch für vier Personen am Samstagabend um 19 Uhr für Sie reserviert. Bei Änderungen rufen Sie uns bitte an.\nMit freundlichen Grüßen\nRestaurant Rheinblick',
        question: 'Für wie viele Personen ist der Tisch?',
        options: ['Zwei', 'Vier', 'Sechs'],
        correct: 'b',
        explanation: 'The table is reserved for four persons (vier Personen).',
      },
      {
        id: 't4-l3-3',
        email_text:
          'Hallo Sarah,\nich habe das Rezept für den Schokoladenkuchen gefunden. Du brauchst: 200 g Butter, 200 g Zucker, 4 Eier, 200 g Schokolade und 150 g Mehl. Der Kuchen muss 45 Minuten im Ofen backen.\nViele Grüße\nMama',
        question: 'Wie lange muss der Kuchen backen?',
        options: ['30 Minuten', '45 Minuten', '60 Minuten'],
        correct: 'b',
        explanation: 'The cake must bake for 45 minutes.',
      },
      {
        id: 't4-l3-4',
        email_text:
          'Lieber Herr Petrov,\nleider können wir Ihre Bestellung nicht liefern. Die Tomatensuppe ist ausverkauft. Wir können Ihnen stattdessen Kartoffelsuppe schicken. Ist das in Ordnung? Bitte antworten Sie.\nIhr Lieferservice',
        question: 'Was ist das Problem?',
        options: [
          'Der Lieferservice hat geschlossen.',
          'Die Tomatensuppe ist nicht mehr da.',
          'Die Adresse ist falsch.',
        ],
        correct: 'b',
        explanation: 'The tomato soup is sold out (ausverkauft).',
      },
      {
        id: 't4-l3-5',
        email_text:
          'Hallo zusammen,\nam Sonntag machen wir ein Picknick im Park. Jeder bringt etwas mit: Tom bringt Brot und Käse, ich bringe Obst und Saft. Könnt ihr vielleicht Kuchen mitbringen? Wir treffen uns um 12 Uhr am Eingang.\nBis Sonntag!\nKlara',
        question: 'Was bringt Klara mit?',
        options: ['Brot und Käse', 'Obst und Saft', 'Kuchen'],
        correct: 'b',
        explanation: 'Klara says she brings fruit and juice (Obst und Saft).',
      },
    ],
  },
  schreiben: {
    teil1: {
      context: 'You want to reserve a table at a restaurant for a birthday dinner. Fill out the online reservation form.',
      fields: [
        { label: 'Name', answer: 'Arjun Nair' },
        { label: 'Datum', answer: '25.04.2026' },
        { label: 'Uhrzeit', answer: '19:00 Uhr' },
        { label: 'Personenanzahl', answer: '6' },
        { label: 'Telefonnummer', answer: '0176 12345678' },
      ],
    },
    teil2: {
      prompt:
        'You had dinner at Restaurant Löwengarten. The food was very good, but the waiter was unfriendly. Write a message to the restaurant.',
      points: [
        'Say when you were at the restaurant.',
        'Say what was good.',
        'Describe the problem.',
      ],
      sample_answer:
        'Sehr geehrte Damen und Herren, ich war am Samstag in Ihrem Restaurant. Das Essen war sehr lecker, besonders die Suppe. Aber der Kellner war leider nicht freundlich. Ich hoffe, das wird besser. Mit freundlichen Grüßen, Arjun Nair',
    },
  },
  sprechen: {
    teil1: [
      { topic: 'Name', sample_answer: 'Ich heiße Arjun.' },
      { topic: 'Alter', sample_answer: 'Ich bin 26 Jahre alt.' },
      { topic: 'Land', sample_answer: 'Ich komme aus Indien, aus dem Bundesstaat Kerala.' },
      { topic: 'Wohnort', sample_answer: 'Ich wohne in München.' },
      { topic: 'Beruf', sample_answer: 'Ich bin Student.' },
      { topic: 'Lieblingsessen', sample_answer: 'Mein Lieblingsessen ist Biryani. Ich mag auch Pizza und Pasta.' },
    ],
    teil2: [
      {
        word_card: 'Essen',
        sample_question: 'Was frühstücken Sie normalerweise?',
        sample_answer: 'Ich esse normalerweise Brot mit Marmelade und trinke Kaffee.',
      },
      {
        word_card: 'Kochen',
        sample_question: 'Kochen Sie gern?',
        sample_answer: 'Ja, ich koche gern. Am Wochenende koche ich indisches Essen.',
      },
      {
        word_card: 'Restaurant',
        sample_question: 'Gehen Sie oft ins Restaurant?',
        sample_answer: 'Nein, nicht so oft. Vielleicht einmal im Monat gehe ich mit Freunden essen.',
      },
      {
        word_card: 'Trinken',
        sample_question: 'Was trinken Sie am liebsten?',
        sample_answer: 'Ich trinke am liebsten Tee. In Kerala trinken wir viel Tee.',
      },
    ],
    teil3: [
      {
        situation: 'You are in a restaurant and want to order. But you don\'t understand one word on the menu.',
        sample_request: 'Entschuldigung, was bedeutet „Knödel"? Können Sie mir das erklären?',
      },
      {
        situation: 'You want to pay the bill at a restaurant.',
        sample_request: 'Entschuldigung, können wir bitte bezahlen? Die Rechnung, bitte.',
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Test 5 — Travel, directions, transportation
// ---------------------------------------------------------------------------

const test5: GoetheTest = {
  id: 'goethe-a1-test-5',
  name: 'Goethe A1 — Test 5',
  description: 'Travel, directions, transportation',
  hoeren: {
    teil1: [
      {
        id: 't5-h1-1',
        audio_text: 'Der Zug nach Berlin fährt heute von Gleis 7, nicht von Gleis 5.',
        statement: 'Der Zug fährt von Gleis 5.',
        correct: false,
        explanation: 'The train departs from platform 7, not 5.',
      },
      {
        id: 't5-h1-2',
        audio_text: 'Entschuldigung, wie komme ich zum Bahnhof? — Gehen Sie geradeaus und dann die zweite Straße links.',
        statement: 'Man muss die zweite Straße links nehmen.',
        correct: true,
        explanation: 'The directions say to go straight and then take the second street on the left.',
      },
      {
        id: 't5-h1-3',
        audio_text: 'Das Flugzeug nach Istanbul hat 30 Minuten Verspätung. Der neue Abflug ist um 14 Uhr 30.',
        statement: 'Das Flugzeug fliegt pünktlich.',
        correct: false,
        explanation: 'The flight is delayed by 30 minutes (Verspätung).',
      },
      {
        id: 't5-h1-4',
        audio_text: 'Eine Tageskarte für den Bus kostet 6 Euro 50. Sie können damit den ganzen Tag fahren.',
        statement: 'Die Tageskarte kostet 6 Euro 50.',
        correct: true,
        explanation: 'A day ticket costs 6 Euro 50.',
      },
      {
        id: 't5-h1-5',
        audio_text: 'Wir fliegen nächste Woche nach Spanien. Wir haben ein Hotel am Strand gebucht.',
        statement: 'Das Hotel ist im Stadtzentrum.',
        correct: false,
        explanation: 'The hotel is at the beach (am Strand), not in the city center.',
      },
      {
        id: 't5-h1-6',
        audio_text: 'Achtung: Die U-Bahn-Linie 3 fährt heute nur bis Marienplatz. Zwischen Marienplatz und Olympiazentrum gibt es einen Ersatzbus.',
        statement: 'Die U3 fährt heute normal.',
        correct: false,
        explanation: 'The U3 only goes to Marienplatz today; there is a replacement bus for the rest.',
      },
    ],
    teil2: [
      {
        id: 't5-h2-1',
        audio_text:
          'Mann: Entschuldigung, fährt dieser Bus zum Hauptbahnhof?\nFrau: Nein, Sie brauchen die Linie 5. Die fährt von der Haltestelle gegenüber.\nMann: Danke. Wie oft fährt der Bus?\nFrau: Alle zehn Minuten.',
        question: 'Welche Buslinie braucht der Mann?',
        options: ['Linie 3', 'Linie 5', 'Linie 10'],
        correct: 'b',
        explanation: 'He needs bus line 5 (die Linie 5).',
      },
      {
        id: 't5-h2-2',
        audio_text:
          'Frau: Ich möchte eine Fahrkarte nach Hamburg, bitte.\nMann: Einfach oder hin und zurück?\nFrau: Hin und zurück, bitte.\nMann: Das macht 89 Euro.\nFrau: Kann ich mit Karte bezahlen?\nMann: Ja, natürlich.',
        question: 'Wie viel kostet die Fahrkarte?',
        options: ['45 Euro', '89 Euro', '98 Euro'],
        correct: 'b',
        explanation: 'The round-trip ticket costs 89 Euro.',
      },
      {
        id: 't5-h2-3',
        audio_text:
          'Mann: Wo ist das Museum, bitte?\nFrau: Das ist nicht weit. Gehen Sie hier rechts, dann über die Brücke. Das Museum ist direkt danach auf der linken Seite.\nMann: Wie lange dauert das zu Fuß?\nFrau: Ungefähr zehn Minuten.',
        question: 'Wie weit ist das Museum?',
        options: ['5 Minuten', '10 Minuten', '20 Minuten'],
        correct: 'b',
        explanation: 'It takes about 10 minutes on foot (zehn Minuten).',
      },
      {
        id: 't5-h2-4',
        audio_text:
          'Frau: Wann fährt der nächste Zug nach Frankfurt?\nMann: Um 13 Uhr 45. Von Gleis 12.\nFrau: Muss ich umsteigen?\nMann: Nein, der Zug fährt direkt.\nFrau: Sehr gut, danke.',
        question: 'Muss die Frau umsteigen?',
        options: ['Ja, einmal.', 'Ja, zweimal.', 'Nein, der Zug fährt direkt.'],
        correct: 'c',
        explanation: 'The train goes directly (direkt) — no transfer needed.',
      },
    ],
    teil3: [
      {
        id: 't5-h3-1',
        audio_text: 'Achtung, auf Gleis 3: Der ICE 579 nach Köln fährt in fünf Minuten ab. Bitte einsteigen!',
        question: 'Von welchem Gleis fährt der Zug?',
        options: ['Gleis 1', 'Gleis 3', 'Gleis 5'],
        correct: 'b',
        explanation: 'The train departs from platform 3 (Gleis 3).',
      },
      {
        id: 't5-h3-2',
        audio_text: 'Der Flughafen München ist mit der S-Bahn S1 und S8 erreichbar. Die Fahrt dauert ungefähr 40 Minuten.',
        question: 'Wie kommt man zum Flughafen?',
        options: ['Mit dem Bus', 'Mit der S-Bahn', 'Mit der U-Bahn'],
        correct: 'b',
        explanation: 'The airport is reachable by S-Bahn (S1 and S8).',
      },
      {
        id: 't5-h3-3',
        audio_text: 'Das Hotel „Zur Post" liegt direkt am Marktplatz. Es gibt kostenlose Parkplätze für Gäste.',
        question: 'Wo ist das Hotel?',
        options: ['Am Bahnhof', 'Am Marktplatz', 'Am Flughafen'],
        correct: 'b',
        explanation: 'The hotel is directly at the market square (am Marktplatz).',
      },
      {
        id: 't5-h3-4',
        audio_text: 'Die Touristeninformation am Rathausplatz ist täglich von 9 bis 18 Uhr geöffnet. Hier bekommen Sie Stadtpläne und Informationen zu Führungen.',
        question: 'Was kann man dort bekommen?',
        options: ['Fahrkarten', 'Stadtpläne', 'Essen'],
        correct: 'b',
        explanation: 'You can get city maps (Stadtpläne) and tour information.',
      },
      {
        id: 't5-h3-5',
        audio_text: 'Die Fähre nach Helgoland fährt morgens um 8 Uhr und kommt um 12 Uhr an. Die Rückfahrt ist um 16 Uhr.',
        question: 'Wann fährt die Fähre zurück?',
        options: ['Um 12 Uhr', 'Um 14 Uhr', 'Um 16 Uhr'],
        correct: 'c',
        explanation: 'The return trip is at 16:00 (um 16 Uhr).',
      },
    ],
  },
  lesen: {
    teil1: [
      {
        id: 't5-l1-1',
        text: 'Fahrradverleih am Bahnhof\nMo–So: 7:00–21:00\nPreise: 1 Stunde 3 €, 1 Tag 12 €\nAusweis erforderlich!',
        statement: 'Man kann Fahrräder auch am Sonntag mieten.',
        correct: true,
        explanation: 'The rental is open Monday through Sunday (Mo–So).',
      },
      {
        id: 't5-l1-2',
        text: 'EINBAHNSTRASSE\nDurchfahrt nur in Pfeilrichtung!\nGegenverkehr verboten.',
        statement: 'Man darf in beide Richtungen fahren.',
        correct: false,
        explanation: 'It\'s a one-way street — traffic in the opposite direction is forbidden.',
      },
      {
        id: 't5-l1-3',
        text: 'Flughafen-Shuttle\nAbfahrt: alle 20 Minuten\nHaltestelle: vor dem Terminal 2\nPreis: 11 Euro (einfach)',
        statement: 'Der Shuttle fährt alle 20 Minuten.',
        correct: true,
        explanation: 'The shuttle departs every 20 minutes.',
      },
      {
        id: 't5-l1-4',
        text: 'BAUSTELLE!\nGehweg gesperrt.\nBitte Umleitung über die Parkstraße benutzen.',
        statement: 'Man kann hier normal durchgehen.',
        correct: false,
        explanation: 'The sidewalk is closed (Gehweg gesperrt) — use the detour.',
      },
      {
        id: 't5-l1-5',
        text: 'Stadtrundfahrt München\nTäglich um 10:00, 12:00, 14:00 Uhr\nDauer: 2 Stunden\nErwachsene: 18 €, Kinder (6–14): 9 €\nKinder unter 6: frei',
        statement: 'Kinder unter 6 Jahren fahren kostenlos.',
        correct: true,
        explanation: 'Children under 6 ride free (frei).',
      },
    ],
    teil2: [
      {
        id: 't5-l2-1',
        ad_text: 'Reise nach Mallorca! 7 Tage, All Inclusive, 4-Sterne-Hotel. Flug ab Frankfurt. Ab 599 Euro pro Person. Buchung: www.sonnenreisen.de oder Tel.: 069 1122334.',
        statement: 'Der Flug geht von München.',
        correct: false,
        explanation: 'The flight departs from Frankfurt (Flug ab Frankfurt).',
      },
      {
        id: 't5-l2-2',
        ad_text: 'Mitfahrgelegenheit: Frankfurt → München, Samstag, 8. Juni, 9 Uhr. Noch 2 Plätze frei. 20 Euro pro Person. Kontakt: 0171 8889900.',
        statement: 'Es gibt noch Plätze frei.',
        correct: true,
        explanation: 'There are still 2 seats available (2 Plätze frei).',
      },
      {
        id: 't5-l2-3',
        ad_text: 'Ferienwohnung in Österreich! Gemütliche Wohnung für 4 Personen, 2 Schlafzimmer, Küche, Balkon mit Bergblick. 70 Euro pro Nacht. Hunde willkommen! Info: alpenhaus@email.at',
        statement: 'Man darf keine Haustiere mitbringen.',
        correct: false,
        explanation: 'Dogs are welcome (Hunde willkommen).',
      },
      {
        id: 't5-l2-4',
        ad_text: 'Gebrauchtes Auto zu verkaufen: VW Golf, Baujahr 2018, 85.000 km, TÜV bis 2027. Farbe: silber. Preis: 8.500 Euro VB. Kontakt: automax@web.de',
        statement: 'Das Auto ist von 2018.',
        correct: true,
        explanation: 'The car is from 2018 (Baujahr 2018).',
      },
      {
        id: 't5-l2-5',
        ad_text: 'Busreise: Weihnachtsmarkt in Nürnberg, am 15. Dezember. Abfahrt um 8 Uhr in Stuttgart, Rückfahrt um 20 Uhr. Preis: 25 Euro. Anmeldung bis 10. Dezember bei Reisebüro Sommer.',
        statement: 'Man kann sich noch am 14. Dezember anmelden.',
        correct: false,
        explanation: 'Registration deadline is December 10 (bis 10. Dezember).',
      },
    ],
    teil3: [
      {
        id: 't5-l3-1',
        email_text:
          'Sehr geehrter Herr Nair,\nvielen Dank für Ihre Buchung. Hier Ihre Reisedaten: Flug LH 1234, München → Delhi, am 20. Dezember um 22:10 Uhr. Bitte seien Sie 2 Stunden vor Abflug am Flughafen. Ihr E-Ticket ist im Anhang.\nMit freundlichen Grüßen\nLufthansa',
        question: 'Wann muss Herr Nair am Flughafen sein?',
        options: ['Um 20:10 Uhr', 'Um 20:00 Uhr', 'Um 22:10 Uhr'],
        correct: 'a',
        explanation: 'The flight is at 22:10, and he should be there 2 hours early — so around 20:10.',
      },
      {
        id: 't5-l3-2',
        email_text:
          'Liebe Julia,\nwir sind in Wien! Die Stadt ist wunderschön. Gestern haben wir das Schloss Schönbrunn besucht. Das Wetter ist leider nicht so gut — es regnet. Morgen fahren wir weiter nach Salzburg.\nLiebe Grüße\nAnna und Max',
        question: 'Wie ist das Wetter in Wien?',
        options: ['Sonnig', 'Es regnet.', 'Es schneit.'],
        correct: 'b',
        explanation: 'It is raining in Vienna (es regnet).',
      },
      {
        id: 't5-l3-3',
        email_text:
          'Hallo,\nich habe meine Tasche gestern im Zug ICE 891 (München–Hamburg) vergessen. Es ist eine schwarze Reisetasche. Darin sind Kleidung und ein Buch. Können Sie bitte nachsehen? Meine Telefonnummer ist 0176 5554433.\nDanke!\nStefan',
        question: 'Was hat Stefan verloren?',
        options: ['Seinen Koffer', 'Seine Reisetasche', 'Sein Handy'],
        correct: 'b',
        explanation: 'Stefan forgot his travel bag (Reisetasche) on the train.',
      },
      {
        id: 't5-l3-4',
        email_text:
          'Lieber Gast,\nwillkommen im Hotel Alpenblick! Ihr Zimmer (Nr. 305) ist ab 15 Uhr bereit. Das Frühstück ist von 7 bis 10 Uhr im Restaurant im Erdgeschoss. Das WLAN-Passwort ist: alpen2026. Bei Fragen wenden Sie sich an die Rezeption.\nFreundliche Grüße\nHotel Alpenblick',
        question: 'Ab wann kann der Gast ins Zimmer?',
        options: ['Ab 12 Uhr', 'Ab 14 Uhr', 'Ab 15 Uhr'],
        correct: 'c',
        explanation: 'The room is ready from 15:00 (ab 15 Uhr).',
      },
      {
        id: 't5-l3-5',
        email_text:
          'Hallo Marco,\nkomm am Samstag nicht zum Bahnhof — ich hole dich mit dem Auto ab! Mein Auto ist ein roter VW Golf. Ich bin um 18 Uhr am Flughafen, Ausgang B.\nBis Samstag!\nLukas',
        question: 'Wo holt Lukas Marco ab?',
        options: ['Am Bahnhof', 'Am Flughafen', 'Zu Hause'],
        correct: 'b',
        explanation: 'Lukas will pick up Marco at the airport (Flughafen), exit B.',
      },
    ],
  },
  schreiben: {
    teil1: {
      context: 'You are at a hotel and need to fill out the guest registration form.',
      fields: [
        { label: 'Vor- und Nachname', answer: 'Arjun Nair' },
        { label: 'Nationalität', answer: 'Indisch' },
        { label: 'Passnummer', answer: 'M1234567' },
        { label: 'Anreisedatum', answer: '20.12.2026' },
        { label: 'Abreisedatum', answer: '27.12.2026' },
      ],
    },
    teil2: {
      prompt:
        'You are on vacation and want to write a postcard to your friend Kevin in Germany.',
      points: [
        'Say where you are.',
        'Say what the weather is like.',
        'Say what you have done or plan to do.',
      ],
      sample_answer:
        'Lieber Kevin, ich bin gerade in Barcelona! Das Wetter ist super, es ist warm und sonnig. Gestern war ich am Strand und morgen besuche ich die Sagrada Familia. Viele Grüße aus Spanien! Arjun',
    },
  },
  sprechen: {
    teil1: [
      { topic: 'Name', sample_answer: 'Ich heiße Arjun Nair.' },
      { topic: 'Alter', sample_answer: 'Ich bin sechsundzwanzig.' },
      { topic: 'Land', sample_answer: 'Ich komme aus Indien.' },
      { topic: 'Wohnort', sample_answer: 'Ich wohne in München.' },
      { topic: 'Sprachen', sample_answer: 'Ich spreche Malayalam, Englisch, Hindi und lerne Deutsch.' },
      { topic: 'Reisen', sample_answer: 'Ich reise gern. Ich war schon in Dubai und Sri Lanka.' },
    ],
    teil2: [
      {
        word_card: 'Reisen',
        sample_question: 'Wohin möchten Sie gern reisen?',
        sample_answer: 'Ich möchte gern nach Japan reisen. Ich finde die Kultur sehr interessant.',
      },
      {
        word_card: 'Verkehrsmittel',
        sample_question: 'Wie fahren Sie zur Arbeit oder zur Uni?',
        sample_answer: 'Ich fahre mit der U-Bahn zur Uni. Manchmal fahre ich auch mit dem Fahrrad.',
      },
      {
        word_card: 'Urlaub',
        sample_question: 'Was machen Sie gern im Urlaub?',
        sample_answer: 'Im Urlaub gehe ich gern an den Strand. Ich schwimme gern und lese Bücher.',
      },
      {
        word_card: 'Stadt',
        sample_question: 'Welche Stadt gefällt Ihnen?',
        sample_answer: 'München gefällt mir sehr gut. Die Stadt ist schön und es gibt viele Parks.',
      },
    ],
    teil3: [
      {
        situation: 'You are at the train station and your train is delayed. Ask at the information desk.',
        sample_request: 'Entschuldigung, mein Zug nach Berlin hat Verspätung. Wann fährt der nächste Zug?',
      },
      {
        situation: 'You are lost in a city. Ask someone for directions to the hotel.',
        sample_request: 'Entschuldigung, können Sie mir helfen? Wie komme ich zum Hotel am Marktplatz?',
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Test 6 — Health, body, doctor visits
// ---------------------------------------------------------------------------

const test6: GoetheTest = {
  id: 'goethe-a1-test-6',
  name: 'Goethe A1 — Test 6',
  description: 'Health, body, doctor visits',
  hoeren: {
    teil1: [
      {
        id: 't6-h1-1',
        audio_text: 'Ich habe seit drei Tagen Kopfschmerzen. Ich muss zum Arzt gehen.',
        statement: 'Die Person hat seit einer Woche Kopfschmerzen.',
        correct: false,
        explanation: 'The person has had headaches for three days (drei Tagen), not a week.',
      },
      {
        id: 't6-h1-2',
        audio_text: 'Die Apotheke am Marktplatz ist auch nachts geöffnet. Sie ist eine Notapotheke.',
        statement: 'Die Apotheke am Marktplatz hat auch nachts auf.',
        correct: true,
        explanation: 'It is an emergency pharmacy (Notapotheke) and open at night.',
      },
      {
        id: 't6-h1-3',
        audio_text: 'Der Arzt sagt, ich soll viel Wasser trinken und drei Tage im Bett bleiben.',
        statement: 'Der Arzt sagt, die Person soll arbeiten gehen.',
        correct: false,
        explanation: 'The doctor says to stay in bed for three days, not to go to work.',
      },
      {
        id: 't6-h1-4',
        audio_text: 'Nehmen Sie die Tabletten dreimal am Tag, morgens, mittags und abends, nach dem Essen.',
        statement: 'Man soll die Tabletten vor dem Essen nehmen.',
        correct: false,
        explanation: 'The tablets should be taken after eating (nach dem Essen).',
      },
      {
        id: 't6-h1-5',
        audio_text: 'Meine Tochter hat Fieber: 38,5 Grad. Ich mache mir Sorgen.',
        statement: 'Das Kind hat Fieber.',
        correct: true,
        explanation: '38.5 degrees indicates fever (Fieber).',
      },
      {
        id: 't6-h1-6',
        audio_text: 'Die Praxis von Dr. Werner ist im zweiten Stock. Bitte nehmen Sie im Wartezimmer Platz.',
        statement: 'Die Praxis ist im Erdgeschoss.',
        correct: false,
        explanation: 'The practice is on the second floor (zweiter Stock), not the ground floor.',
      },
    ],
    teil2: [
      {
        id: 't6-h2-1',
        audio_text:
          'Ärztin: Was fehlt Ihnen?\nMann: Ich habe starke Halsschmerzen und kann nicht gut schlucken.\nÄrztin: Seit wann?\nMann: Seit gestern Abend.\nÄrztin: Ich schaue mir das mal an. Machen Sie bitte den Mund auf.',
        question: 'Was hat der Mann?',
        options: ['Kopfschmerzen', 'Halsschmerzen', 'Bauchschmerzen'],
        correct: 'b',
        explanation: 'The man has a sore throat (Halsschmerzen).',
      },
      {
        id: 't6-h2-2',
        audio_text:
          'Frau: Guten Tag, ich brauche etwas gegen Husten.\nApotheker: Ist der Husten trocken oder mit Schleim?\nFrau: Trocken.\nApotheker: Dann empfehle ich diesen Hustensaft. Nehmen Sie dreimal täglich einen Löffel.',
        question: 'Was empfiehlt der Apotheker?',
        options: ['Tabletten', 'Hustensaft', 'Nasenspray'],
        correct: 'b',
        explanation: 'The pharmacist recommends cough syrup (Hustensaft).',
      },
      {
        id: 't6-h2-3',
        audio_text:
          'Mann: Ich habe mir beim Sport den Fuß verletzt.\nÄrztin: Können Sie auftreten?\nMann: Ja, aber es tut sehr weh.\nÄrztin: Wir machen erst mal ein Röntgenbild.',
        question: 'Was macht die Ärztin?',
        options: ['Sie gibt ihm Tabletten.', 'Sie macht ein Röntgenbild.', 'Sie schreibt ihn krank.'],
        correct: 'b',
        explanation: 'The doctor will do an X-ray (Röntgenbild).',
      },
      {
        id: 't6-h2-4',
        audio_text:
          'Frau: Mein Sohn ist vier Jahre alt und hat seit heute Morgen Durchfall.\nÄrztin: Hat er auch Fieber?\nFrau: Nein, kein Fieber.\nÄrztin: Er soll viel trinken. Wenn es morgen nicht besser ist, kommen Sie bitte wieder.',
        question: 'Was hat der Sohn?',
        options: ['Fieber', 'Durchfall', 'Husten'],
        correct: 'b',
        explanation: 'The son has diarrhea (Durchfall).',
      },
    ],
    teil3: [
      {
        id: 't6-h3-1',
        audio_text: 'Liebe Patienten, bitte denken Sie an Ihre Versichertenkarte. Ohne Karte können wir Sie leider nicht behandeln.',
        question: 'Was braucht man beim Arzt?',
        options: ['Einen Personalausweis', 'Die Versichertenkarte', 'Einen Brief'],
        correct: 'b',
        explanation: 'You need your insurance card (Versichertenkarte).',
      },
      {
        id: 't6-h3-2',
        audio_text: 'Kostenlose Grippeschutzimpfung! Jeden Mittwoch von 10 bis 12 Uhr. Keine Anmeldung nötig.',
        question: 'Muss man sich anmelden?',
        options: ['Ja, telefonisch.', 'Ja, online.', 'Nein, keine Anmeldung nötig.'],
        correct: 'c',
        explanation: 'No registration is needed (Keine Anmeldung nötig).',
      },
      {
        id: 't6-h3-3',
        audio_text: 'Die Kinderarztpraxis Dr. Braun hat eine neue Adresse: Friedrichstraße 22, direkt neben der Apotheke.',
        question: 'Was hat sich geändert?',
        options: ['Die Telefonnummer', 'Die Öffnungszeiten', 'Die Adresse'],
        correct: 'c',
        explanation: 'The pediatric practice has a new address (neue Adresse).',
      },
      {
        id: 't6-h3-4',
        audio_text: 'Achtung: In unserer Praxis tragen alle Patienten bitte eine Maske. Masken können Sie an der Rezeption bekommen.',
        question: 'Was sollen die Patienten tragen?',
        options: ['Handschuhe', 'Eine Maske', 'Eine Brille'],
        correct: 'b',
        explanation: 'Patients should wear a mask (Maske).',
      },
      {
        id: 't6-h3-5',
        audio_text: 'Ihre Blutwerte sind gut. Sie müssen nicht noch einmal kommen. Wenn Sie Probleme haben, rufen Sie uns an.',
        question: 'Was sind die Ergebnisse?',
        options: ['Schlecht', 'Gut', 'Noch nicht fertig'],
        correct: 'b',
        explanation: 'The blood values are good (Blutwerte sind gut).',
      },
    ],
  },
  lesen: {
    teil1: [
      {
        id: 't6-l1-1',
        text: 'Praxis Dr. Yilmaz — Hausarzt\nSprechzeiten:\nMo, Di, Do: 8:00–12:00 und 15:00–18:00\nMi, Fr: nur vormittags\nTermin nur mit Voranmeldung!',
        statement: 'Man kann ohne Termin kommen.',
        correct: false,
        explanation: 'An appointment is required (Termin nur mit Voranmeldung).',
      },
      {
        id: 't6-l1-2',
        text: 'NOTAUFNAHME →\n24 Stunden geöffnet\nBitte melden Sie sich an der Rezeption.',
        statement: 'Die Notaufnahme ist rund um die Uhr offen.',
        correct: true,
        explanation: '24 Stunden geöffnet means it is open around the clock.',
      },
      {
        id: 't6-l1-3',
        text: 'Hinweis:\nDieses Medikament kann müde machen.\nBitte kein Auto fahren!',
        statement: 'Man darf nach der Einnahme Auto fahren.',
        correct: false,
        explanation: 'The warning says not to drive after taking the medication.',
      },
      {
        id: 't6-l1-4',
        text: 'Zahnarztpraxis Schneider\nNeu: Jetzt auch samstags!\nSamstag: 9:00–13:00\nTermine unter: 030 9988776',
        statement: 'Die Zahnarztpraxis hat jetzt auch am Samstag Sprechstunde.',
        correct: true,
        explanation: 'The dental practice is now open on Saturdays too (Jetzt auch samstags).',
      },
      {
        id: 't6-l1-5',
        text: 'Bitte nehmen Sie im Wartezimmer Platz.\nSie werden aufgerufen.\nHandy bitte auf lautlos stellen.',
        statement: 'Man soll sein Handy leise machen.',
        correct: true,
        explanation: '"Handy auf lautlos stellen" means put your phone on silent.',
      },
    ],
    teil2: [
      {
        id: 't6-l2-1',
        ad_text: 'Physiotherapie Müller — Wir helfen bei Rückenschmerzen, Sportverletzungen und Gelenkproblemen. Termine: Mo–Fr 7:00–19:00. Alle Kassen. Tel.: 089 6677889.',
        statement: 'Die Praxis akzeptiert alle Krankenkassen.',
        correct: true,
        explanation: '"Alle Kassen" means all health insurance providers are accepted.',
      },
      {
        id: 't6-l2-2',
        ad_text: 'Yoga für Anfänger – gut für Körper und Geist! Jeden Donnerstag, 17:00–18:30. Sportcenter Grün, Berliner Straße 15. Erste Stunde kostenlos!',
        statement: 'Man muss für die erste Stunde bezahlen.',
        correct: false,
        explanation: 'The first class is free (Erste Stunde kostenlos).',
      },
      {
        id: 't6-l2-3',
        ad_text: 'Augenarzt Dr. Chen – Neue Patienten willkommen! Kurze Wartezeiten. Online-Terminbuchung unter: www.augenarzt-chen.de. Adresse: Kaiserstraße 40, Frankfurt.',
        statement: 'Man kann online einen Termin buchen.',
        correct: true,
        explanation: 'Online appointment booking is available (Online-Terminbuchung).',
      },
      {
        id: 't6-l2-4',
        ad_text: 'Blutspende-Aktion im Rathaus! Am 5. November von 10 bis 16 Uhr. Alle gesunden Erwachsenen ab 18 Jahren können mitmachen. Personalausweis mitbringen!',
        statement: 'Jugendliche unter 18 können auch Blut spenden.',
        correct: false,
        explanation: 'Only healthy adults aged 18 and over can participate (ab 18 Jahren).',
      },
      {
        id: 't6-l2-5',
        ad_text: 'Apotheke am Rathaus – Service: Medikamente, Beratung, Blutdruckmessung, Corona-Tests. Mo–Fr 8–19 Uhr, Sa 9–14 Uhr. Notdienst-Telefon: 0800 111222.',
        statement: 'Die Apotheke macht auch Corona-Tests.',
        correct: true,
        explanation: 'Corona tests are listed among the services.',
      },
    ],
    teil3: [
      {
        id: 't6-l3-1',
        email_text:
          'Lieber Herr Nair,\nIhr Bluttest vom letzten Freitag ist fertig. Die Ergebnisse sind normal. Sie müssen nicht noch einmal kommen. Bitte denken Sie an den nächsten Termin in sechs Monaten.\nMit freundlichen Grüßen\nPraxis Dr. Huber',
        question: 'Wann ist der nächste Termin?',
        options: ['In einer Woche', 'In einem Monat', 'In sechs Monaten'],
        correct: 'c',
        explanation: 'The next appointment is in six months (in sechs Monaten).',
      },
      {
        id: 't6-l3-2',
        email_text:
          'Hallo Praxis Dr. Wagner,\nich brauche bitte ein neues Rezept für meine Tabletten. Ich nehme jeden Tag Metformin 500 mg. Können Sie das Rezept an die Apotheke am Markt schicken?\nVielen Dank!\nPetra Klein',
        question: 'Was möchte Frau Klein?',
        options: [
          'Einen neuen Termin',
          'Ein neues Rezept',
          'Neue Testergebnisse',
        ],
        correct: 'b',
        explanation: 'She needs a new prescription (neues Rezept) for her medication.',
      },
      {
        id: 't6-l3-3',
        email_text:
          'Sehr geehrte Frau Becker,\nwir erinnern Sie an Ihren Termin am Montag, den 18. März, um 9:30 Uhr bei Dr. Schmidt. Bitte kommen Sie 15 Minuten vorher. Wenn Sie den Termin absagen möchten, rufen Sie uns bitte an.\nIhre Praxis Dr. Schmidt',
        question: 'Wann soll Frau Becker da sein?',
        options: ['Um 9:15 Uhr', 'Um 9:30 Uhr', 'Um 9:45 Uhr'],
        correct: 'a',
        explanation: 'She should arrive 15 minutes before the 9:30 appointment, so at 9:15.',
      },
      {
        id: 't6-l3-4',
        email_text:
          'Hallo Stefan,\nich war gestern beim Arzt. Er sagt, ich habe eine Erkältung. Ich muss drei Tage zu Hause bleiben. Kannst du mir bitte morgen Suppe und Tee aus dem Supermarkt mitbringen?\nDanke!\nOliver',
        question: 'Was soll Stefan mitbringen?',
        options: ['Medikamente', 'Suppe und Tee', 'Obst'],
        correct: 'b',
        explanation: 'Oliver asks Stefan to bring soup and tea (Suppe und Tee).',
      },
      {
        id: 't6-l3-5',
        email_text:
          'Liebe Eltern,\nin der Schule gibt es diese Woche mehrere Fälle von Magen-Darm-Grippe. Bitte achten Sie darauf, dass Ihre Kinder oft die Hände waschen. Wenn Ihr Kind krank ist, lassen Sie es bitte zu Hause.\nMit freundlichen Grüßen\nSchulleitung',
        question: 'Was sollen die Eltern tun?',
        options: [
          'Sofort zum Arzt gehen',
          'Kranke Kinder zu Hause lassen',
          'Die Schule anrufen',
        ],
        correct: 'b',
        explanation: 'Sick children should stay at home (zu Hause lassen).',
      },
    ],
  },
  schreiben: {
    teil1: {
      context: 'You are feeling sick and need to fill out a form at the doctor\'s office.',
      fields: [
        { label: 'Vor- und Nachname', answer: 'Arjun Nair' },
        { label: 'Geburtsdatum', answer: '15.03.1998' },
        { label: 'Krankenkasse', answer: 'Techniker Krankenkasse' },
        { label: 'Versichertennummer', answer: 'A123456789' },
        { label: 'Grund des Besuchs', answer: 'Kopfschmerzen und Fieber' },
      ],
    },
    teil2: {
      prompt:
        'You are sick and cannot come to work. Write a message to your colleague, Herr Meier.',
      points: [
        'Say you are sick and cannot come.',
        'Say what is wrong with you.',
        'Ask about something important at work.',
      ],
      sample_answer:
        'Lieber Herr Meier, leider bin ich heute krank und kann nicht zur Arbeit kommen. Ich habe Fieber und Halsschmerzen. Können Sie mir bitte die Dokumente für das Meeting am Mittwoch schicken? Vielen Dank! Viele Grüße, Arjun',
    },
  },
  sprechen: {
    teil1: [
      { topic: 'Name', sample_answer: 'Mein Name ist Arjun Nair.' },
      { topic: 'Alter', sample_answer: 'Ich bin 26 Jahre alt.' },
      { topic: 'Land', sample_answer: 'Ich komme aus Indien.' },
      { topic: 'Wohnort', sample_answer: 'Ich wohne in München.' },
      { topic: 'Sprachen', sample_answer: 'Ich spreche Malayalam, Englisch und lerne Deutsch.' },
      { topic: 'Beruf', sample_answer: 'Ich arbeite als Softwareentwickler.' },
    ],
    teil2: [
      {
        word_card: 'Gesundheit',
        sample_question: 'Was machen Sie, wenn Sie krank sind?',
        sample_answer: 'Wenn ich krank bin, gehe ich zum Arzt und bleibe zu Hause. Ich trinke viel Tee.',
      },
      {
        word_card: 'Sport',
        sample_question: 'Treiben Sie Sport?',
        sample_answer: 'Ja, ich gehe dreimal pro Woche joggen. Sport ist wichtig für die Gesundheit.',
      },
      {
        word_card: 'Arzt',
        sample_question: 'Wie oft gehen Sie zum Arzt?',
        sample_answer: 'Ich gehe einmal im Jahr zum Arzt, zur Kontrolle. Wenn ich krank bin, natürlich öfter.',
      },
      {
        word_card: 'Ernährung',
        sample_question: 'Was essen Sie, um gesund zu bleiben?',
        sample_answer: 'Ich esse viel Obst und Gemüse. Ich trinke auch viel Wasser.',
      },
    ],
    teil3: [
      {
        situation: 'You have a bad headache and go to a pharmacy. Ask for something.',
        sample_request: 'Guten Tag, ich habe starke Kopfschmerzen. Können Sie mir etwas empfehlen?',
      },
      {
        situation: 'You need to call your doctor\'s office to cancel an appointment.',
        sample_request: 'Guten Tag, hier ist Arjun Nair. Ich muss leider meinen Termin am Montag absagen. Kann ich einen neuen Termin bekommen?',
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Test 7 — Work, study, skills
// ---------------------------------------------------------------------------

const test7: GoetheTest = {
  id: 'goethe-a1-test-7',
  name: 'Goethe A1 — Test 7',
  description: 'Work, study, skills',
  hoeren: {
    teil1: [
      {
        id: 't7-h1-1',
        audio_text: 'Ich arbeite als Krankenschwester im Krankenhaus. Ich arbeite oft nachts.',
        statement: 'Die Person arbeitet tagsüber.',
        correct: false,
        explanation: 'The person often works at night (oft nachts), not during the day.',
      },
      {
        id: 't7-h1-2',
        audio_text: 'Der Computerkurs beginnt nächste Woche Montag. Sie brauchen einen eigenen Laptop.',
        statement: 'Man braucht einen Laptop für den Kurs.',
        correct: true,
        explanation: 'You need your own laptop (eigenen Laptop).',
      },
      {
        id: 't7-h1-3',
        audio_text: 'Mein Bruder studiert Medizin in Heidelberg. Er ist jetzt im vierten Semester.',
        statement: 'Der Bruder studiert in München.',
        correct: false,
        explanation: 'The brother studies in Heidelberg, not Munich.',
      },
      {
        id: 't7-h1-4',
        audio_text: 'Wir suchen einen Praktikanten für drei Monate. Der Praktikant bekommt 450 Euro im Monat.',
        statement: 'Das Praktikum dauert sechs Monate.',
        correct: false,
        explanation: 'The internship lasts three months (drei Monate).',
      },
      {
        id: 't7-h1-5',
        audio_text: 'Ich habe letztes Jahr meinen Deutschkurs B1 abgeschlossen. Jetzt mache ich den B2-Kurs.',
        statement: 'Die Person macht jetzt den B2-Kurs.',
        correct: true,
        explanation: 'The person is now doing the B2 course.',
      },
      {
        id: 't7-h1-6',
        audio_text: 'In unserer Firma arbeiten wir von Montag bis Freitag, 9 bis 17 Uhr. Am Freitag können wir um 15 Uhr gehen.',
        statement: 'Am Freitag arbeitet man bis 17 Uhr.',
        correct: false,
        explanation: 'On Friday they can leave at 15:00 (um 15 Uhr gehen).',
      },
    ],
    teil2: [
      {
        id: 't7-h2-1',
        audio_text:
          'Frau: Was sind Sie von Beruf?\nMann: Ich bin Programmierer. Ich arbeite bei einer IT-Firma.\nFrau: Gefällt Ihnen die Arbeit?\nMann: Ja, sehr. Die Kollegen sind nett und ich kann manchmal von zu Hause arbeiten.',
        question: 'Was gefällt dem Mann an seiner Arbeit?',
        options: [
          'Das Gehalt ist hoch.',
          'Die Kollegen sind nett und er kann von zu Hause arbeiten.',
          'Er muss nicht viel arbeiten.',
        ],
        correct: 'b',
        explanation: 'He likes the nice colleagues and the option to work from home.',
      },
      {
        id: 't7-h2-2',
        audio_text:
          'Mann: Ich habe die Stellenanzeige gesehen. Ich möchte mich als Verkäufer bewerben.\nFrau: Haben Sie Erfahrung im Verkauf?\nMann: Ja, ich habe zwei Jahre in einem Geschäft gearbeitet.\nFrau: Gut. Bitte schicken Sie uns Ihren Lebenslauf per E-Mail.',
        question: 'Was soll der Mann schicken?',
        options: ['Ein Foto', 'Seinen Lebenslauf', 'Seine Zeugnisse'],
        correct: 'b',
        explanation: 'He should send his CV (Lebenslauf) by email.',
      },
      {
        id: 't7-h2-3',
        audio_text:
          'Frau: Wie war die Prüfung?\nMann: Schwer! Besonders der Schreibteil.\nFrau: Und der Hörteil?\nMann: Der war okay. Ich glaube, ich habe bestanden.\nFrau: Wann bekommst du die Ergebnisse?\nMann: In zwei Wochen.',
        question: 'Was war besonders schwer?',
        options: ['Der Hörteil', 'Der Schreibteil', 'Der Sprechteil'],
        correct: 'b',
        explanation: 'The writing part (Schreibteil) was especially hard.',
      },
      {
        id: 't7-h2-4',
        audio_text:
          'Mann: Ich suche eine Ausbildung als Elektriker.\nFrau: Haben Sie einen Schulabschluss?\nMann: Ja, Realschulabschluss.\nFrau: Gut. Die Ausbildung dauert dreieinhalb Jahre.\nMann: Und wie ist die Bezahlung?\nFrau: Im ersten Jahr 750 Euro im Monat.',
        question: 'Wie lange dauert die Ausbildung?',
        options: ['Zwei Jahre', 'Drei Jahre', 'Dreieinhalb Jahre'],
        correct: 'c',
        explanation: 'The apprenticeship lasts three and a half years (dreieinhalb Jahre).',
      },
    ],
    teil3: [
      {
        id: 't7-h3-1',
        audio_text: 'Alle Studierenden müssen sich bis zum 15. Oktober für das Wintersemester anmelden. Die Anmeldung ist online möglich.',
        question: 'Bis wann muss man sich anmelden?',
        options: ['Bis zum 1. Oktober', 'Bis zum 15. Oktober', 'Bis zum 30. Oktober'],
        correct: 'b',
        explanation: 'Registration deadline is October 15.',
      },
      {
        id: 't7-h3-2',
        audio_text: 'Für die Stelle als Büroassistent brauchen Sie gute Computerkenntnisse und Erfahrung mit Microsoft Office.',
        question: 'Was braucht man für die Stelle?',
        options: ['Sprachkenntnisse', 'Computerkenntnisse', 'Führerschein'],
        correct: 'b',
        explanation: 'Good computer skills (Computerkenntnisse) are needed.',
      },
      {
        id: 't7-h3-3',
        audio_text: 'Der Werkstudentenjob ist 15 Stunden pro Woche, montags, mittwochs und freitags jeweils 5 Stunden.',
        question: 'Wie viele Stunden pro Woche arbeitet man?',
        options: ['10 Stunden', '15 Stunden', '20 Stunden'],
        correct: 'b',
        explanation: 'The job is 15 hours per week (15 Stunden pro Woche).',
      },
      {
        id: 't7-h3-4',
        audio_text: 'Die Vorlesung in Raum 110 fällt heute aus. Die nächste Vorlesung ist am Donnerstag.',
        question: 'Was passiert heute?',
        options: [
          'Die Vorlesung beginnt später.',
          'Die Vorlesung fällt aus.',
          'Die Vorlesung ist in einem anderen Raum.',
        ],
        correct: 'b',
        explanation: 'The lecture is cancelled today (fällt aus).',
      },
      {
        id: 't7-h3-5',
        audio_text: 'Liebe Kursteilnehmer, bitte bringen Sie zur nächsten Stunde Ihr Wörterbuch mit. Wir schreiben einen Vokabeltest.',
        question: 'Was sollen die Teilnehmer mitbringen?',
        options: ['Ein Heft', 'Ein Wörterbuch', 'Einen Computer'],
        correct: 'b',
        explanation: 'They should bring a dictionary (Wörterbuch).',
      },
    ],
  },
  lesen: {
    teil1: [
      {
        id: 't7-l1-1',
        text: 'Stellenanzeige:\nKellner/in gesucht!\nTeilzeit, 20 Std./Woche\nAbends und am Wochenende\nMindestlohn + Trinkgeld\nBewerbung: restaurant-stern@web.de',
        statement: 'Die Stelle ist Vollzeit.',
        correct: false,
        explanation: 'The position is part-time (Teilzeit, 20 hours per week).',
      },
      {
        id: 't7-l1-2',
        text: 'MENSA geöffnet:\nMo–Fr: 11:30–14:00\nAbendessen: 17:30–19:30\nSa, So: geschlossen',
        statement: 'Am Wochenende kann man in der Mensa essen.',
        correct: false,
        explanation: 'The canteen is closed on Saturday and Sunday (Sa, So: geschlossen).',
      },
      {
        id: 't7-l1-3',
        text: 'PRÜFUNGSTERMINE Sommersemester 2026:\nDeutsch A1: 15. Juli, 10:00 Uhr, Raum 201\nBitte Ausweis mitbringen!',
        statement: 'Die A1-Prüfung ist am 15. Juli.',
        correct: true,
        explanation: 'The A1 exam is on July 15.',
      },
      {
        id: 't7-l1-4',
        text: 'Kopierer im 3. OG\nKosten: s/w 5 Cent, farbig 20 Cent\nKopierkarte an der Information erhältlich.',
        statement: 'Farbige Kopien kosten 5 Cent.',
        correct: false,
        explanation: 'Color copies cost 20 cents; black and white (s/w) costs 5 cents.',
      },
      {
        id: 't7-l1-5',
        text: 'Willkommen im Studentenwohnheim!\nWLAN-Passwort: UniWohn2026\nMüll: Montag und Donnerstag\nRuhezeit: 22:00–7:00',
        statement: 'Der Müll wird zweimal pro Woche abgeholt.',
        correct: true,
        explanation: 'Garbage collection is on Monday and Thursday — twice a week.',
      },
    ],
    teil2: [
      {
        id: 't7-l2-1',
        ad_text: 'IT-Firma sucht Werkstudent/in für Webentwicklung. Gute Kenntnisse in HTML und CSS nötig. 15 Std./Woche, 14 Euro/Std. Bewerbung: hr@webtech.de',
        statement: 'Man braucht Kenntnisse in Programmierung.',
        correct: true,
        explanation: 'HTML and CSS knowledge is required (gute Kenntnisse in HTML und CSS).',
      },
      {
        id: 't7-l2-2',
        ad_text: 'Suche Tandempartner! Ich spreche Arabisch (Muttersprache) und lerne Deutsch (B1). Suche jemanden, der Deutsch spricht und Arabisch lernen möchte. Treffen 1x pro Woche. Kontakt: amira@email.de',
        statement: 'Amira möchte eine Deutschlehrerin finden.',
        correct: false,
        explanation: 'She is looking for a tandem partner, not a teacher — mutual language exchange.',
      },
      {
        id: 't7-l2-3',
        ad_text: 'Sprachschule Dialog — Intensivkurs Deutsch A1: 4 Wochen, Mo–Fr, 9–13 Uhr. Max. 12 Teilnehmer. 480 Euro inkl. Kursbuch. Start: jeden Monat. Info: 030 5556677.',
        statement: 'Der Kurs hat maximal zwölf Personen.',
        correct: true,
        explanation: 'Maximum 12 participants (Max. 12 Teilnehmer).',
      },
      {
        id: 't7-l2-4',
        ad_text: 'Minijob: Zeitungen austragen. Mo–Sa, morgens 5–7 Uhr. 520 Euro/Monat. Eigenes Fahrrad nötig. Bewerbung: vertrieb@morgenpost.de',
        statement: 'Man arbeitet auch am Sonntag.',
        correct: false,
        explanation: 'The job is Monday to Saturday (Mo–Sa), not Sunday.',
      },
      {
        id: 't7-l2-5',
        ad_text: 'Ehrenamtliche Helfer gesucht! Deutschunterricht für Flüchtlinge, 2x pro Woche abends. Keine Ausbildung als Lehrer nötig, Geduld und Freundlichkeit reichen! Kontakt: hilfe-verein@web.de',
        statement: 'Man muss Lehrer sein, um mitzumachen.',
        correct: false,
        explanation: 'No teaching qualification is needed (keine Ausbildung als Lehrer nötig).',
      },
    ],
    teil3: [
      {
        id: 't7-l3-1',
        email_text:
          'Sehr geehrter Herr Nair,\nvielen Dank für Ihre Bewerbung als Werkstudent in unserer IT-Abteilung. Wir möchten Sie gern zu einem Vorstellungsgespräch einladen. Können Sie am Dienstag, den 20. März, um 14 Uhr zu uns kommen? Bitte bestätigen Sie den Termin.\nMit freundlichen Grüßen\nFrau Müller, Personalabteilung',
        question: 'Was soll Herr Nair machen?',
        options: [
          'Sofort anfangen zu arbeiten',
          'Den Termin bestätigen',
          'Neue Dokumente schicken',
        ],
        correct: 'b',
        explanation: 'He should confirm the interview appointment (Termin bestätigen).',
      },
      {
        id: 't7-l3-2',
        email_text:
          'Hallo Arjun,\nherzlichen Glückwunsch! Du hast die A1-Prüfung bestanden! Dein Ergebnis: Hören 24/30, Lesen 27/30, Schreiben 12/15, Sprechen 13/15. Dein Zertifikat kannst du ab nächster Woche im Sekretariat abholen.\nViele Grüße\nDein Deutschlehrer, Herr Braun',
        question: 'In welchem Teil war Arjun am besten?',
        options: ['Hören', 'Lesen', 'Sprechen'],
        correct: 'b',
        explanation: 'Lesen (reading) had the highest score: 27/30.',
      },
      {
        id: 't7-l3-3',
        email_text:
          'Liebe Studierende,\ndie Bibliothek hat ab Oktober neue Öffnungszeiten: Mo–Fr 8:00–22:00, Sa 10:00–18:00. Am Sonntag bleibt die Bibliothek geschlossen. Die Rückgabe von Büchern ist auch am Automaten vor dem Eingang möglich.\nViele Grüße\nBibliotheksteam',
        question: 'Wie kann man Bücher zurückgeben?',
        options: [
          'Nur an der Rezeption',
          'Auch am Automaten vor dem Eingang',
          'Nur am Montag',
        ],
        correct: 'b',
        explanation: 'Books can also be returned at the machine at the entrance.',
      },
      {
        id: 't7-l3-4',
        email_text:
          'Sehr geehrter Herr Nair,\nleider müssen wir Ihnen mitteilen, dass wir die Stelle an einen anderen Bewerber vergeben haben. Wir wünschen Ihnen viel Erfolg bei Ihrer weiteren Jobsuche.\nMit freundlichen Grüßen\nFirma TechPlus',
        question: 'Hat Herr Nair die Stelle bekommen?',
        options: ['Ja', 'Nein', 'Er muss noch warten.'],
        correct: 'b',
        explanation: 'The company gave the job to another applicant — he did not get it.',
      },
      {
        id: 't7-l3-5',
        email_text:
          'Hallo zusammen,\nam Freitag um 16 Uhr gibt es eine kleine Feier für unsere Kollegin Frau Berger — sie geht in Rente! Bitte kommt alle in den Konferenzraum. Wer möchte, kann etwas für das Buffet mitbringen.\nViele Grüße\nTeam Marketing',
        question: 'Warum gibt es eine Feier?',
        options: [
          'Ein Kollege hat Geburtstag.',
          'Frau Berger geht in Rente.',
          'Die Firma hat einen neuen Kunden.',
        ],
        correct: 'b',
        explanation: 'Frau Berger is retiring (geht in Rente).',
      },
    ],
  },
  schreiben: {
    teil1: {
      context: 'You want to register for a computer course at the adult education center. Fill out the registration form.',
      fields: [
        { label: 'Vor- und Nachname', answer: 'Arjun Nair' },
        { label: 'E-Mail-Adresse', answer: 'arjun.nair@email.de' },
        { label: 'Kursname', answer: 'Computerkurs für Anfänger' },
        { label: 'Telefonnummer', answer: '0176 12345678' },
        { label: 'Beruf', answer: 'Student' },
      ],
    },
    teil2: {
      prompt:
        'You see a job advertisement for a part-time position as a waiter at a restaurant. Write a short message to apply.',
      points: [
        'Say which job you are interested in.',
        'Say something about your experience or skills.',
        'Ask about the working hours.',
      ],
      sample_answer:
        'Sehr geehrte Damen und Herren, ich habe Ihre Anzeige für den Kellner-Job gelesen. Ich habe Erfahrung in einem Café und spreche Deutsch und Englisch. Wann sind die Arbeitszeiten genau? Ich freue mich auf Ihre Antwort. Mit freundlichen Grüßen, Arjun Nair',
    },
  },
  sprechen: {
    teil1: [
      { topic: 'Name', sample_answer: 'Ich bin Arjun Nair.' },
      { topic: 'Alter', sample_answer: 'Ich bin 26.' },
      { topic: 'Land', sample_answer: 'Ich komme aus Indien.' },
      { topic: 'Beruf / Studium', sample_answer: 'Ich studiere Informatik.' },
      { topic: 'Sprachen', sample_answer: 'Ich spreche Malayalam, Englisch und Deutsch.' },
      { topic: 'Hobbys', sample_answer: 'Ich programmiere gern und spiele Cricket.' },
    ],
    teil2: [
      {
        word_card: 'Beruf',
        sample_question: 'Was möchten Sie in der Zukunft arbeiten?',
        sample_answer: 'Ich möchte als Softwareentwickler in Deutschland arbeiten.',
      },
      {
        word_card: 'Schule',
        sample_question: 'Wie war Ihre Schulzeit?',
        sample_answer: 'Meine Schulzeit war gut. Meine Lieblingsfächer waren Mathematik und Englisch.',
      },
      {
        word_card: 'Computer',
        sample_question: 'Benutzen Sie oft den Computer?',
        sample_answer: 'Ja, ich benutze jeden Tag den Computer. Ich programmiere und lese Nachrichten.',
      },
      {
        word_card: 'Deutsch lernen',
        sample_question: 'Wie lernen Sie Deutsch?',
        sample_answer: 'Ich gehe zweimal pro Woche zum Deutschkurs. Zu Hause lerne ich mit einer App.',
      },
    ],
    teil3: [
      {
        situation: 'You are at university and need to extend the deadline for a paper.',
        sample_request: 'Entschuldigung, Herr Professor, kann ich die Hausarbeit eine Woche später abgeben? Ich habe ein Problem mit meinem Computer.',
      },
      {
        situation: 'You are at work and you don\'t understand a task. Ask your colleague for help.',
        sample_request: 'Entschuldigung, können Sie mir bitte helfen? Ich verstehe die Aufgabe nicht ganz.',
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Test 8 — Culture, weather, free time
// ---------------------------------------------------------------------------

const test8: GoetheTest = {
  id: 'goethe-a1-test-8',
  name: 'Goethe A1 — Test 8',
  description: 'Culture, weather, free time',
  hoeren: {
    teil1: [
      {
        id: 't8-h1-1',
        audio_text: 'Am Wochenende gehen wir ins Museum. Die Ausstellung über moderne Kunst ist sehr interessant.',
        statement: 'Die Ausstellung ist über klassische Musik.',
        correct: false,
        explanation: 'The exhibition is about modern art (moderne Kunst), not classical music.',
      },
      {
        id: 't8-h1-2',
        audio_text: 'Das Wetter morgen: Am Vormittag sonnig, am Nachmittag bewölkt. Temperaturen bis 22 Grad.',
        statement: 'Am Vormittag ist es sonnig.',
        correct: true,
        explanation: 'The weather is sunny in the morning (am Vormittag sonnig).',
      },
      {
        id: 't8-h1-3',
        audio_text: 'Das Oktoberfest in München beginnt im September und dauert ungefähr zwei Wochen.',
        statement: 'Das Oktoberfest beginnt im Oktober.',
        correct: false,
        explanation: 'Despite its name, Oktoberfest starts in September (beginnt im September).',
      },
      {
        id: 't8-h1-4',
        audio_text: 'Morgen gibt es ein Konzert im Stadtpark. Der Eintritt ist frei. Beginn ist um 19 Uhr.',
        statement: 'Das Konzert kostet Eintritt.',
        correct: false,
        explanation: 'The entry is free (Eintritt ist frei).',
      },
      {
        id: 't8-h1-5',
        audio_text: 'Im Winter kann es in München sehr kalt werden. Manchmal hat es minus 10 Grad.',
        statement: 'Im Winter ist es in München manchmal sehr kalt.',
        correct: true,
        explanation: 'In winter Munich can get very cold, sometimes minus 10 degrees.',
      },
      {
        id: 't8-h1-6',
        audio_text: 'Das Kino zeigt heute Abend einen deutschen Film mit englischen Untertiteln.',
        statement: 'Der Film hat deutsche Untertitel.',
        correct: false,
        explanation: 'The film has English subtitles (englische Untertitel), not German.',
      },
    ],
    teil2: [
      {
        id: 't8-h2-1',
        audio_text:
          'Frau: Was machst du am Samstag?\nMann: Ich gehe mit Freunden wandern. Wir fahren in die Alpen.\nFrau: Das klingt toll! Wie wird das Wetter?\nMann: Sonnig und warm. Perfekt zum Wandern.',
        question: 'Was macht der Mann am Samstag?',
        options: ['Er geht schwimmen.', 'Er geht wandern.', 'Er bleibt zu Hause.'],
        correct: 'b',
        explanation: 'He is going hiking (wandern) with friends.',
      },
      {
        id: 't8-h2-2',
        audio_text:
          'Mann: Hast du Lust, morgen ins Theater zu gehen?\nFrau: Ja, gern! Was läuft?\nMann: Ein Stück von Brecht. Es beginnt um 20 Uhr.\nFrau: Gut. Soll ich die Karten kaufen?\nMann: Ja, bitte. Zwei Karten.',
        question: 'Was beginnt um 20 Uhr?',
        options: ['Ein Film', 'Ein Konzert', 'Ein Theaterstück'],
        correct: 'c',
        explanation: 'A theater play (Theaterstück) by Brecht starts at 20:00.',
      },
      {
        id: 't8-h2-3',
        audio_text:
          'Frau: Wie war der Weihnachtsmarkt?\nMann: Super! Wir haben Glühwein getrunken und Bratwurst gegessen.\nFrau: Hast du auch etwas gekauft?\nMann: Ja, ich habe eine schöne Kerze für meine Mutter gekauft.',
        question: 'Was hat der Mann für seine Mutter gekauft?',
        options: ['Einen Schal', 'Eine Kerze', 'Schokolade'],
        correct: 'b',
        explanation: 'He bought a candle (Kerze) for his mother.',
      },
      {
        id: 't8-h2-4',
        audio_text:
          'Mann: Was machst du bei schlechtem Wetter?\nFrau: Ich lese ein Buch oder sehe einen Film. Manchmal backe ich auch einen Kuchen.\nMann: Und bei gutem Wetter?\nFrau: Dann gehe ich in den Park oder fahre Fahrrad.',
        question: 'Was macht die Frau bei gutem Wetter?',
        options: [
          'Sie liest ein Buch.',
          'Sie backt einen Kuchen.',
          'Sie geht in den Park oder fährt Fahrrad.',
        ],
        correct: 'c',
        explanation: 'In good weather she goes to the park or rides a bike.',
      },
    ],
    teil3: [
      {
        id: 't8-h3-1',
        audio_text: 'Die Wettervorhersage für das Wochenende: Am Samstag Regen bei 12 Grad. Am Sonntag trocken und etwas wärmer, bis 16 Grad.',
        question: 'Wie ist das Wetter am Sonntag?',
        options: ['Regen', 'Trocken', 'Schnee'],
        correct: 'b',
        explanation: 'Sunday is dry (trocken) and a bit warmer.',
      },
      {
        id: 't8-h3-2',
        audio_text: 'Das Stadtfest findet dieses Jahr am zweiten Wochenende im Juli statt. Es gibt Musik, Essen und Spiele für Kinder.',
        question: 'Wann ist das Stadtfest?',
        options: ['Im Juni', 'Im Juli', 'Im August'],
        correct: 'b',
        explanation: 'The city festival is in July (im Juli).',
      },
      {
        id: 't8-h3-3',
        audio_text: 'Achtung: Das Freibad schließt am 15. September. Ab Oktober können Sie im Hallenbad schwimmen.',
        question: 'Wo kann man ab Oktober schwimmen?',
        options: ['Im Freibad', 'Im Hallenbad', 'Im See'],
        correct: 'b',
        explanation: 'From October you can swim in the indoor pool (Hallenbad).',
      },
      {
        id: 't8-h3-4',
        audio_text: 'Die Stadtbibliothek bietet jeden Samstag eine Lesestunde für Kinder an. Von 10 bis 11 Uhr, für Kinder von 4 bis 8 Jahren.',
        question: 'Für wen ist die Lesestunde?',
        options: ['Für Erwachsene', 'Für Kinder von 4 bis 8 Jahren', 'Für Jugendliche'],
        correct: 'b',
        explanation: 'The reading hour is for children aged 4 to 8.',
      },
      {
        id: 't8-h3-5',
        audio_text: 'Am 3. Oktober ist Tag der Deutschen Einheit. Das ist ein Feiertag. Geschäfte und Büros sind geschlossen.',
        question: 'Was ist am 3. Oktober?',
        options: ['Weihnachten', 'Tag der Deutschen Einheit', 'Ostern'],
        correct: 'b',
        explanation: 'October 3 is German Unity Day (Tag der Deutschen Einheit).',
      },
    ],
  },
  lesen: {
    teil1: [
      {
        id: 't8-l1-1',
        text: 'KINO ROYAL\nHeute: „Der Untergang" — 20:00 Uhr\nEintritt: Erwachsene 10 €, ermäßigt 7 €\nMittwoch = Kinotag: alle Filme 6 €!',
        statement: 'Am Mittwoch sind alle Filme günstiger.',
        correct: true,
        explanation: 'Wednesday is cinema day (Kinotag) with all films at 6 Euro — that is cheaper.',
      },
      {
        id: 't8-l1-2',
        text: 'GRILLVERBOT im Stadtpark!\nGrillen nur auf dem offiziellen Grillplatz am See erlaubt.',
        statement: 'Man darf überall im Park grillen.',
        correct: false,
        explanation: 'Grilling is only allowed at the official barbecue area by the lake.',
      },
      {
        id: 't8-l1-3',
        text: 'Volksfest Rosenheim\n12.–20. August\nEintritt frei!\nFahrgeschäfte, Bierzelt, Live-Musik\nKinderprogramm jeden Nachmittag',
        statement: 'Das Volksfest dauert neun Tage.',
        correct: true,
        explanation: 'From August 12 to 20 is nine days.',
      },
      {
        id: 't8-l1-4',
        text: 'HALLENBAD ÖFFNUNGSZEITEN\nMo–Fr: 6:30–21:00\nSa, So: 8:00–20:00\nDienstag ab 18 Uhr: nur für Frauen',
        statement: 'Am Dienstagabend können Männer schwimmen.',
        correct: false,
        explanation: 'Tuesday from 18:00 is women only (nur für Frauen).',
      },
      {
        id: 't8-l1-5',
        text: 'Flohmarkt am Rathausplatz\nJeden ersten Sonntag im Monat\n8:00–15:00 Uhr\nStandgebühr: 10 €\nAnmeldung: flohmarkt@stadt.de',
        statement: 'Der Flohmarkt ist jede Woche.',
        correct: false,
        explanation: 'The flea market is every first Sunday of the month, not every week.',
      },
    ],
    teil2: [
      {
        id: 't8-l2-1',
        ad_text: 'Wandergruppe „Bergfreunde" — Jeden Sonntag wandern wir in den bayerischen Alpen! Für Anfänger und Fortgeschrittene. Treffpunkt: 8 Uhr, Hauptbahnhof München. Kontakt: bergfreunde@web.de',
        statement: 'Die Gruppe wandert nur an Werktagen.',
        correct: false,
        explanation: 'They hike every Sunday (jeden Sonntag), not on weekdays.',
      },
      {
        id: 't8-l2-2',
        ad_text: 'Gitarrenkurs für Anfänger! 10 Stunden, jeden Montag 18–19 Uhr. Keine Vorkenntnisse nötig. Gitarre kann geliehen werden. 120 Euro. Musikschule Harmonie, Tel.: 089 1239876.',
        statement: 'Man muss eine eigene Gitarre haben.',
        correct: false,
        explanation: 'A guitar can be borrowed (Gitarre kann geliehen werden).',
      },
      {
        id: 't8-l2-3',
        ad_text: 'Fotoausstellung „München bei Nacht" — Fotografien von Thomas Keller. Museum für Fotografie, Türkenstraße 35. Bis 30. November. Eintritt: 5 Euro. Dienstags frei.',
        statement: 'Am Dienstag ist der Eintritt kostenlos.',
        correct: true,
        explanation: '"Dienstags frei" means entry is free on Tuesdays.',
      },
      {
        id: 't8-l2-4',
        ad_text: 'Bollywood-Tanzgruppe in München! Wir tanzen jeden Freitag von 19–20:30 Uhr im Kulturzentrum. Spaß ist wichtiger als Technik! Erste Stunde gratis. Info: bollymuc@email.de',
        statement: 'Man muss gut tanzen können, um mitzumachen.',
        correct: false,
        explanation: '"Spaß ist wichtiger als Technik" — fun matters more than skill; beginners are welcome.',
      },
      {
        id: 't8-l2-5',
        ad_text: 'Weihnachtsmarkt am Marienplatz — Vom 25. November bis 24. Dezember, täglich 10–21 Uhr. Glühwein, Lebkuchen, Kunsthandwerk und mehr! Eintritt frei.',
        statement: 'Der Weihnachtsmarkt hat auch am Vormittag geöffnet.',
        correct: true,
        explanation: 'The market opens at 10:00, which is in the morning.',
      },
    ],
    teil3: [
      {
        id: 't8-l3-1',
        email_text:
          'Hallo Arjun,\nwir machen am Samstag einen Spieleabend bei mir zu Hause! Wir spielen Karten und Brettspiele. Kommst du auch? Wir fangen um 19 Uhr an. Bring gern Snacks mit!\nBis Samstag!\nFelix',
        question: 'Was passiert am Samstag?',
        options: ['Eine Geburtstagsparty', 'Ein Spieleabend', 'Ein Filmabend'],
        correct: 'b',
        explanation: 'Felix is hosting a game night (Spieleabend).',
      },
      {
        id: 't8-l3-2',
        email_text:
          'Liebe Nachbarn,\nam 1. Mai feiern wir unser Straßenfest! Von 14 bis 20 Uhr auf der Gartenstraße. Es gibt Grill, Kuchen und Musik. Jede Familie bringt bitte einen Kuchen oder Salat mit. Bei Regen feiern wir im Gemeindesaal.\nViele Grüße\nIhr Nachbarschaftsverein',
        question: 'Was passiert bei Regen?',
        options: [
          'Das Fest fällt aus.',
          'Sie feiern im Gemeindesaal.',
          'Sie feiern am nächsten Tag.',
        ],
        correct: 'b',
        explanation: 'If it rains, the party moves to the community hall (Gemeindesaal).',
      },
      {
        id: 't8-l3-3',
        email_text:
          'Hallo zusammen,\nich habe zwei Karten für das Fußballspiel FC Bayern gegen Dortmund am Samstag. Wer möchte mitkommen? Das Spiel beginnt um 15:30 Uhr in der Allianz Arena. Bitte schnell antworten — die Karten sind sehr beliebt!\nViele Grüße\nChris',
        question: 'Wo ist das Fußballspiel?',
        options: ['Im Olympiastadion', 'In der Allianz Arena', 'Im Westfalenstadion'],
        correct: 'b',
        explanation: 'The match is in the Allianz Arena.',
      },
      {
        id: 't8-l3-4',
        email_text:
          'Liebe Kursteilnehmer,\nam letzten Kurstag (Freitag, 15. Dezember) machen wir eine kleine Weihnachtsfeier. Bitte bringt etwas zu essen oder zu trinken mit — gern etwas Typisches aus eurem Land! Um 17 Uhr beginnen wir.\nViele Grüße\nEure Lehrerin, Frau Sommer',
        question: 'Was sollen die Kursteilnehmer mitbringen?',
        options: [
          'Geschenke',
          'Etwas Typisches aus ihrem Land zum Essen oder Trinken',
          'Fotos',
        ],
        correct: 'b',
        explanation: 'They should bring typical food or drink from their country.',
      },
      {
        id: 't8-l3-5',
        email_text:
          'Hallo Priya,\ngestern war ich auf dem Tollwood-Festival in München. Die Atmosphäre war super! Es gab Live-Musik, Theater und leckeres Essen aus verschiedenen Ländern. Nächstes Mal musst du unbedingt mitkommen!\nLiebe Grüße\nMeena',
        question: 'Wie fand Meena das Festival?',
        options: ['Langweilig', 'Super', 'Zu teuer'],
        correct: 'b',
        explanation: 'Meena says the atmosphere was great (super).',
      },
    ],
  },
  schreiben: {
    teil1: {
      context: 'You want to join a sports club. Fill out the membership form.',
      fields: [
        { label: 'Vor- und Nachname', answer: 'Arjun Nair' },
        { label: 'Geburtsdatum', answer: '15.03.1998' },
        { label: 'Adresse', answer: 'Mozartstraße 12, 80336 München' },
        { label: 'E-Mail', answer: 'arjun.nair@email.de' },
        { label: 'Gewünschte Sportart', answer: 'Fußball' },
      ],
    },
    teil2: {
      prompt:
        'You want to organize a movie night for your language class. Write a message to your classmates.',
      points: [
        'Say when and where the movie night is.',
        'Say which film you want to watch.',
        'Ask who can come.',
      ],
      sample_answer:
        'Hallo zusammen! Am Samstag mache ich einen Filmabend bei mir zu Hause. Wir schauen einen lustigen deutschen Film. Es beginnt um 19 Uhr. Wer hat Lust und kann kommen? Bitte schreibt mir bis Freitag! Viele Grüße, Arjun',
    },
  },
  sprechen: {
    teil1: [
      { topic: 'Name', sample_answer: 'Mein Name ist Arjun Nair.' },
      { topic: 'Alter', sample_answer: 'Ich bin 26 Jahre alt.' },
      { topic: 'Land', sample_answer: 'Ich komme aus Indien, aus Kerala.' },
      { topic: 'Wohnort', sample_answer: 'Ich wohne in München.' },
      { topic: 'Hobbys', sample_answer: 'Ich spiele gern Fußball und höre Musik.' },
      { topic: 'Lieblingsfilm / -musik', sample_answer: 'Ich höre gern Malayalam-Musik und Pop-Musik. Mein Lieblingsfilm ist „3 Idiots".' },
    ],
    teil2: [
      {
        word_card: 'Wetter',
        sample_question: 'Wie ist das Wetter heute?',
        sample_answer: 'Heute ist es sonnig und warm. Ich mag warmes Wetter.',
      },
      {
        word_card: 'Feste / Feiertage',
        sample_question: 'Welche Feste feiern Sie?',
        sample_answer: 'In Kerala feiern wir Onam. Das ist ein großes Fest mit Essen und Tanz. In Deutschland feiere ich auch Weihnachten.',
      },
      {
        word_card: 'Musik',
        sample_question: 'Spielen Sie ein Instrument?',
        sample_answer: 'Nein, ich spiele kein Instrument. Aber ich höre gern Musik und gehe manchmal auf Konzerte.',
      },
      {
        word_card: 'Wochenende',
        sample_question: 'Was machen Sie am liebsten am Wochenende?',
        sample_answer: 'Am Wochenende schlafe ich lange und treffe mich mit Freunden. Manchmal gehen wir in ein Café.',
      },
    ],
    teil3: [
      {
        situation: 'You are at a museum and want to know if photography is allowed.',
        sample_request: 'Entschuldigung, darf man hier fotografieren?',
      },
      {
        situation: 'You want to invite a German colleague to an Indian cultural event.',
        sample_request: 'Hallo, am Samstag gibt es ein indisches Kulturfest. Hast du Lust mitzukommen? Es gibt leckeres Essen und Tanz!',
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Combined export & helper
// ---------------------------------------------------------------------------

export const GOETHE_TESTS: GoetheTest[] = [
  test1,
  test2,
  test3,
  test4,
  test5,
  test6,
  test7,
  test8,
];

export function getTestById(id: string): GoetheTest | undefined {
  return GOETHE_TESTS.find((test) => test.id === id);
}
