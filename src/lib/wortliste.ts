import inventoryFile from '@/lib/wortliste-inventory.json';
import type { SpineLessonId } from '@/lib/spiral-ledger';

export const WORTLISTE_SOURCE_URL =
  'https://www.goethe.de/pro/relaunch/prf/sr/A1_SD1_Wortliste_02.pdf';

export type WortlisteThemeId =
  | 'person'
  | 'wohnen'
  | 'umwelt'
  | 'reisen-verkehr'
  | 'essen-trinken'
  | 'einkaufen-gebrauchsartikel'
  | 'dienstleistungen'
  | 'erziehung-ausbildung-lernen'
  | 'arbeit-beruf'
  | 'freizeit-unterhaltung'
  | 'cross-cutting';

export type WortlisteTarget = 'active' | 'passive';
export type WortlisteEntryKind = 'main' | 'derived';
export type WortlisteCoverage =
  | 'current-card'
  | 'lesson-evidence'
  | 'authoring-required';
export type WortlisteSrsStatus = 'current-card' | 'authoring-required';

export type WortlisteEntry = {
  id: string;
  headword: string;
  lemma: string;
  kind: WortlisteEntryKind;
  parentId: string | null;
  sourcePdfPage: number;
  themeId: WortlisteThemeId;
  homeLessonId: SpineLessonId;
  target: WortlisteTarget;
  plannedSrsId: string;
  currentVocabIds: string[];
  srsStatus: WortlisteSrsStatus;
  evidenceSourceLessonIds: string[];
  coverage: WortlisteCoverage;
};

type WortlisteInventoryFile = {
  source: {
    title: string;
    url: string;
    inventoryPages: string;
    checkedOn: string;
    selectionRule: string;
  };
  entries: WortlisteEntry[];
};

const typedInventory = inventoryFile as WortlisteInventoryFile;

export const WORTLISTE_SOURCE = typedInventory.source;
export const WORTLISTE_INVENTORY = typedInventory.entries;

export const WORTLISTE_THEMES: {
  id: WortlisteThemeId;
  officialLabel: string;
  homeLessonIds: SpineLessonId[];
}[] = [
  {
    id: 'person',
    officialLabel: 'Person',
    homeLessonIds: ['M2L1', 'M2L2', 'M2L3', 'M2L7', 'M3L1', 'M3L2', 'M7L1'],
  },
  {
    id: 'wohnen',
    officialLabel: 'Wohnen',
    homeLessonIds: ['M3L3', 'M3L4', 'M3L5', 'M7L5'],
  },
  {
    id: 'umwelt',
    officialLabel: 'Umwelt',
    homeLessonIds: ['M6L5', 'M7L5'],
  },
  {
    id: 'reisen-verkehr',
    officialLabel: 'Reisen/Verkehr',
    homeLessonIds: ['M5L1', 'M5L2', 'M5L3', 'M7L5'],
  },
  {
    id: 'essen-trinken',
    officialLabel: 'Essen/Trinken',
    homeLessonIds: ['M4L1', 'M4L2', 'M4L3', 'M4L4'],
  },
  {
    id: 'einkaufen-gebrauchsartikel',
    officialLabel: 'Einkaufen/Gebrauchsartikel',
    homeLessonIds: ['M4L4', 'M4L5', 'M4L6', 'M4L7'],
  },
  {
    id: 'dienstleistungen',
    officialLabel: 'Dienstleistungen',
    homeLessonIds: ['M5L5', 'M5L7', 'M7L3', 'M7L4'],
  },
  {
    id: 'erziehung-ausbildung-lernen',
    officialLabel: 'Erziehung/Ausbildung/Lernen',
    homeLessonIds: ['M1L2', 'M2L3', 'M6L1', 'M6L3'],
  },
  {
    id: 'arbeit-beruf',
    officialLabel: 'Arbeit/Beruf',
    homeLessonIds: ['M2L3', 'M6L1', 'M6L2', 'M6L3'],
  },
  {
    id: 'freizeit-unterhaltung',
    officialLabel: 'Freizeit/Unterhaltung',
    homeLessonIds: ['M6L4', 'M6L5', 'M6L6', 'M7L6', 'M7L7'],
  },
  {
    id: 'cross-cutting',
    officialLabel: 'Cross-cutting function/exam language',
    homeLessonIds: ['M1L5', 'M1L6', 'M2L7', 'M3L6', 'M3L7', 'M5L4', 'M7L5', 'M8L1'],
  },
];

export type WortlisteWordGroup = {
  id: string;
  officialLabel: string;
  sourcePdfPages: number[];
  members: string[];
  homeLessonIds: SpineLessonId[];
  plannedSrsId: string;
};

export const WORTLISTE_WORD_GROUPS: WortlisteWordGroup[] = [
  {
    id: 'zahlen',
    officialLabel: 'Zahlen',
    sourcePdfPages: [6],
    members: [
      'eins',
      'zwei',
      'drei',
      'vier',
      'fünf',
      'sechs',
      'sieben',
      'acht',
      'neun',
      'zehn',
      'elf',
      'zwölf',
      'dreizehn',
      'vierzehn',
      'fünfzehn',
      'sechzehn',
      'siebzehn',
      'achtzehn',
      'neunzehn',
      'zwanzig',
      'einundzwanzig',
      'dreißig',
      'vierzig',
      'fünfzig',
      'sechzig',
      'siebzig',
      'achtzig',
      'neunzig',
      '(ein)hundert',
      'hunderteins',
      'zweihundert',
      '(ein)tausend',
      'eine Million',
      'eine Milliarde',
      'erste',
      'zweite',
      'dritte',
      'vierte',
    ],
    homeLessonIds: ['M2L4', 'M4L5', 'M7L2'],
    plannedSrsId: 'wortgruppe:zahlen',
  },
  {
    id: 'datum',
    officialLabel: 'Datum',
    sourcePdfPages: [6],
    members: ['ein halb', 'ein Viertel', 'Jahreszahlen', 'Ordnungszahlen im Datum'],
    homeLessonIds: ['M2L6', 'M5L5', 'M7L1'],
    plannedSrsId: 'wortgruppe:datum',
  },
  {
    id: 'uhrzeit',
    officialLabel: 'Uhrzeit',
    sourcePdfPages: [7],
    members: ['Uhr', 'Minute vor', 'Minute nach', 'Viertel vor', 'Viertel nach', 'halb'],
    homeLessonIds: ['M2L5', 'M5L3', 'M5L5'],
    plannedSrsId: 'wortgruppe:uhrzeit',
  },
  {
    id: 'zeitmasse-zeitangaben',
    officialLabel: 'Zeitmaße, Zeitangaben',
    sourcePdfPages: [7],
    members: ['Sekunde', 'Minute', 'Stunde', 'Tag', 'Woche', 'Jahr'],
    homeLessonIds: ['M2L5', 'M2L6'],
    plannedSrsId: 'wortgruppe:zeitmasse-zeitangaben',
  },
  {
    id: 'woche-wochentage',
    officialLabel: 'Woche/Wochentage',
    sourcePdfPages: [7],
    members: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag/Sonnabend', 'Sonntag', 'Wochenende'],
    homeLessonIds: ['M2L5', 'M3L7', 'M6L6'],
    plannedSrsId: 'wortgruppe:woche-wochentage',
  },
  {
    id: 'tag-tageszeiten',
    officialLabel: 'Tag/Tageszeiten',
    sourcePdfPages: [7],
    members: ['Morgen', 'Vormittag', 'Mittag', 'Nachmittag', 'Abend', 'Nacht'],
    homeLessonIds: ['M2L5', 'M3L6'],
    plannedSrsId: 'wortgruppe:tag-tageszeiten',
  },
  {
    id: 'monat-monatsnamen',
    officialLabel: 'Monat/Monatsnamen',
    sourcePdfPages: [7],
    members: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    homeLessonIds: ['M2L5', 'M2L6'],
    plannedSrsId: 'wortgruppe:monat-monatsnamen',
  },
  {
    id: 'jahr-jahreszeiten',
    officialLabel: 'Jahr/Jahreszeiten',
    sourcePdfPages: [8],
    members: ['Frühling/Frühjahr', 'Sommer', 'Herbst', 'Winter'],
    homeLessonIds: ['M2L6', 'M6L5'],
    plannedSrsId: 'wortgruppe:jahr-jahreszeiten',
  },
  {
    id: 'waehrungen',
    officialLabel: 'Währungen',
    sourcePdfPages: [8],
    members: ['Euro', 'Cent'],
    homeLessonIds: ['M4L5', 'M7L4'],
    plannedSrsId: 'wortgruppe:waehrungen',
  },
  {
    id: 'masse-gewichte',
    officialLabel: 'Maße und Gewichte',
    sourcePdfPages: [8],
    members: ['Meter', 'Zentimeter', 'Kilometer', 'Quadratmeter', 'Grad', 'Prozent', 'Liter', 'Gramm', 'Pfund', 'Kilogramm'],
    homeLessonIds: ['M4L4', 'M4L5', 'M6L5'],
    plannedSrsId: 'wortgruppe:masse-gewichte',
  },
  {
    id: 'laender-nationalitaeten',
    officialLabel: 'Länder/Ländernamen/Nationalitäten',
    sourcePdfPages: [8],
    members: ['Deutschland', 'Europa', 'deutsch', 'europäisch', 'Land', 'Bewohner', 'Nationalität'],
    homeLessonIds: ['M2L2', 'M2L7', 'M7L1'],
    plannedSrsId: 'wortgruppe:laender-nationalitaeten',
  },
  {
    id: 'farben',
    officialLabel: 'Farben',
    sourcePdfPages: [8],
    members: ['schwarz', 'grau', 'blau', 'grün', 'weiß', 'rot', 'gelb', 'braun'],
    homeLessonIds: ['M4L6', 'M7L6'],
    plannedSrsId: 'wortgruppe:farben',
  },
  {
    id: 'himmelsrichtungen',
    officialLabel: 'Himmelsrichtungen',
    sourcePdfPages: [8],
    members: ['Norden', 'Süden', 'Westen', 'Osten'],
    homeLessonIds: ['M5L2', 'M7L5'],
    plannedSrsId: 'wortgruppe:himmelsrichtungen',
  },
];

export const WORTLISTE_COUNTS = {
  main: WORTLISTE_INVENTORY.filter((entry) => entry.kind === 'main').length,
  derived: WORTLISTE_INVENTORY.filter((entry) => entry.kind === 'derived').length,
  allPrintedRows: WORTLISTE_INVENTORY.length,
  activeTarget: WORTLISTE_INVENTORY.filter(
    (entry) => entry.target === 'active',
  ).length,
  currentCards: WORTLISTE_INVENTORY.filter(
    (entry) => entry.srsStatus === 'current-card',
  ).length,
  srsAuthoringRequired: WORTLISTE_INVENTORY.filter(
    (entry) => entry.srsStatus === 'authoring-required',
  ).length,
};
