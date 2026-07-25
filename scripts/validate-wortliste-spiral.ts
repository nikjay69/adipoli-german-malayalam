import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { ALL_MODULES, getAllVocabulary } from '../src/lib/content/modules';
import {
  SPINE_LESSON_IDS,
  SPIRAL_LEDGER,
  type SpineLessonId,
} from '../src/lib/spiral-ledger';
import {
  WORTLISTE_COUNTS,
  WORTLISTE_INVENTORY,
  WORTLISTE_SOURCE,
  WORTLISTE_SOURCE_URL,
  WORTLISTE_THEMES,
  WORTLISTE_WORD_GROUPS,
} from '../src/lib/wortliste';

const OUTPUT_DIR = path.join(
  process.cwd(),
  'scripts',
  'output',
  '3p-12-wortliste-spiral-ledger',
);
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'audit.json');

const unique = <T>(values: T[]): T[] => [...new Set(values)];
const spineOrder = new Map(
  SPINE_LESSON_IDS.map((lessonId, index) => [lessonId, index]),
);
const allSourceLessons = ALL_MODULES.flatMap((courseModule) =>
  courseModule.lessons.map((lesson) => lesson.id),
);
const allSourceLessonIds = new Set(allSourceLessons);
const allVocabularyIds = new Set(getAllVocabulary().map((item) => item.id));
const themeIds = new Set(WORTLISTE_THEMES.map((theme) => theme.id));

assert.equal(
  WORTLISTE_SOURCE.url,
  WORTLISTE_SOURCE_URL,
  'inventory source must stay pinned to the official adult PDF',
);
assert.equal(
  WORTLISTE_SOURCE.inventoryPages,
  '9-27',
  'alphabetical inventory page range changed; re-audit the official PDF',
);
assert.deepEqual(
  WORTLISTE_COUNTS,
  {
    main: 637,
    derived: 59,
    allPrintedRows: 696,
    activeTarget: 318,
    currentCards: 302,
    srsAuthoringRequired: 394,
  },
  'official inventory or current-card mapping drifted; review and regenerate intentionally',
);

assert.equal(
  unique(WORTLISTE_INVENTORY.map((entry) => entry.id)).length,
  WORTLISTE_INVENTORY.length,
  'every printed Wortliste row needs a unique stable ID',
);
assert.equal(
  unique(WORTLISTE_INVENTORY.map((entry) => entry.plannedSrsId)).length,
  WORTLISTE_INVENTORY.length,
  'every printed Wortliste row needs a unique planned SRS ID',
);

const mainEntryIds = new Set(
  WORTLISTE_INVENTORY.filter((entry) => entry.kind === 'main').map(
    (entry) => entry.id,
  ),
);
for (const [index, entry] of WORTLISTE_INVENTORY.entries()) {
  assert.equal(
    entry.id,
    `goethe-a1-${String(index + 1).padStart(4, '0')}`,
    `${entry.headword}: stable inventory order changed`,
  );
  assert.ok(
    entry.sourcePdfPage >= 9 && entry.sourcePdfPage <= 27,
    `${entry.id}: source page must stay inside the official alphabetical inventory`,
  );
  assert.ok(entry.headword.trim(), `${entry.id}: headword is empty`);
  assert.ok(entry.lemma.trim(), `${entry.id}: normalized lemma is empty`);
  assert.ok(
    themeIds.has(entry.themeId),
    `${entry.id}: unknown theme ${entry.themeId}`,
  );
  assert.ok(
    spineOrder.has(entry.homeLessonId),
    `${entry.id}: invalid course home ${entry.homeLessonId}`,
  );
  assert.ok(
    entry.currentVocabIds.every((vocabId) => allVocabularyIds.has(vocabId)),
    `${entry.id}: current SRS mapping contains an invented vocabulary ID`,
  );
  assert.ok(
    entry.evidenceSourceLessonIds.every((lessonId) =>
      allSourceLessonIds.has(lessonId),
    ),
    `${entry.id}: lesson evidence contains an unknown source lesson`,
  );
  assert.equal(
    entry.srsStatus,
    entry.currentVocabIds.length ? 'current-card' : 'authoring-required',
    `${entry.id}: SRS state does not match current cards`,
  );
  if (entry.coverage === 'current-card') {
    assert.ok(
      entry.currentVocabIds.length > 0,
      `${entry.id}: current-card coverage needs a current card`,
    );
  } else if (entry.coverage === 'lesson-evidence') {
    assert.equal(
      entry.currentVocabIds.length,
      0,
      `${entry.id}: lesson-evidence must not hide a current card`,
    );
    assert.ok(
      entry.evidenceSourceLessonIds.length > 0,
      `${entry.id}: lesson-evidence needs a source lesson`,
    );
  } else {
    assert.equal(
      entry.currentVocabIds.length,
      0,
      `${entry.id}: authoring-required must not hide a current card`,
    );
    assert.equal(
      entry.evidenceSourceLessonIds.length,
      0,
      `${entry.id}: authoring-required must not hide lesson evidence`,
    );
  }

  if (entry.kind === 'main') {
    assert.equal(entry.parentId, null, `${entry.id}: main entry cannot have a parent`);
  } else {
    assert.ok(
      entry.parentId && mainEntryIds.has(entry.parentId),
      `${entry.id}: derived entry needs a real counted main parent`,
    );
    assert.equal(
      entry.target,
      'passive',
      `${entry.id}: derived rows are outside the counted active target`,
    );
  }
}

const activeEntries = WORTLISTE_INVENTORY.filter(
  (entry) => entry.target === 'active',
);
assert.equal(activeEntries.length, 318, 'active target must remain half of 637');
assert.ok(
  activeEntries.every((entry) => entry.kind === 'main'),
  'active target may only select counted main entries',
);
assert.equal(
  activeEntries.filter((entry) => entry.coverage === 'authoring-required')
    .length,
  6,
  'active lesson-authoring debt changed; review it deliberately',
);
assert.equal(
  activeEntries.filter((entry) => entry.srsStatus === 'authoring-required')
    .length,
  39,
  'active SRS authoring debt changed; review it deliberately',
);

assert.equal(
  WORTLISTE_THEMES.length,
  11,
  'ten official themes plus one explicit cross-cutting bucket are required',
);
assert.equal(
  unique(WORTLISTE_THEMES.map((theme) => theme.id)).length,
  WORTLISTE_THEMES.length,
  'theme IDs must be unique',
);
for (const theme of WORTLISTE_THEMES) {
  assert.ok(theme.officialLabel.trim(), `${theme.id}: theme label is empty`);
  assert.ok(theme.homeLessonIds.length > 0, `${theme.id}: theme has no course home`);
  assert.ok(
    theme.homeLessonIds.every((lessonId) => spineOrder.has(lessonId)),
    `${theme.id}: theme contains an invalid course home`,
  );
}

assert.equal(
  WORTLISTE_WORD_GROUPS.length,
  13,
  'the official PDF defines exactly 13 word groups',
);
assert.equal(
  unique(WORTLISTE_WORD_GROUPS.map((group) => group.id)).length,
  13,
  'word-group IDs must be unique',
);
assert.equal(
  unique(WORTLISTE_WORD_GROUPS.map((group) => group.plannedSrsId)).length,
  13,
  'word groups need unique planned SRS IDs',
);
for (const group of WORTLISTE_WORD_GROUPS) {
  assert.ok(group.members.length > 0, `${group.id}: word group has no members`);
  assert.ok(group.homeLessonIds.length > 0, `${group.id}: word group has no home`);
  assert.ok(
    group.homeLessonIds.every((lessonId) => spineOrder.has(lessonId)),
    `${group.id}: word group contains an invalid course home`,
  );
}

assert.equal(SPIRAL_LEDGER.length, 56, 'the course needs exactly 56 spiral rows');
assert.deepEqual(
  SPIRAL_LEDGER.map((row) => row.lessonId),
  SPINE_LESSON_IDS,
  'spiral rows must cover the canonical 56 IDs in order',
);
for (const row of SPIRAL_LEDGER) {
  assert.ok(row.sourceLessonIds.length > 0, `${row.lessonId}: no source lesson`);
  assert.ok(
    row.sourceLessonIds.every((lessonId) => allSourceLessonIds.has(lessonId)),
    `${row.lessonId}: unknown source lesson`,
  );
  assert.ok(row.srsVocabIds.length > 0, `${row.lessonId}: empty SRS card set`);
  assert.ok(
    row.srsVocabIds.every((vocabId) => allVocabularyIds.has(vocabId)),
    `${row.lessonId}: SRS card set contains an invented vocabulary ID`,
  );
  assert.equal(
    unique(row.srsVocabIds).length,
    row.srsVocabIds.length,
    `${row.lessonId}: duplicate SRS card ID`,
  );
  assert.ok(row.laterReturns.length > 0, `${row.lessonId}: no named later return`);
  assert.equal(
    unique(row.laterReturns).length,
    row.laterReturns.length,
    `${row.lessonId}: duplicate later return`,
  );
  for (const laterReturn of row.laterReturns) {
    if (laterReturn === 'exam-day-srs') {
      assert.equal(
        row.lessonId,
        'M8L7',
        `${row.lessonId}: only the final row may return at exam-day SRS`,
      );
      continue;
    }
    assert.ok(
      (spineOrder.get(laterReturn) ?? -1) >
        (spineOrder.get(row.lessonId) ?? Number.MAX_SAFE_INTEGER),
      `${row.lessonId}: ${laterReturn} is not later in the spine`,
    );
  }
}

const coverageCounts = Object.fromEntries(
  ['current-card', 'lesson-evidence', 'authoring-required'].map((coverage) => [
    coverage,
    WORTLISTE_INVENTORY.filter((entry) => entry.coverage === coverage).length,
  ]),
);
const targetCounts = Object.fromEntries(
  ['active', 'passive'].map((target) => [
    target,
    WORTLISTE_INVENTORY.filter((entry) => entry.target === target).length,
  ]),
);
const themeCounts = Object.fromEntries(
  WORTLISTE_THEMES.map((theme) => [
    theme.id,
    WORTLISTE_INVENTORY.filter((entry) => entry.themeId === theme.id).length,
  ]),
);
const activeSrsAuthoring = activeEntries
  .filter((entry) => entry.srsStatus === 'authoring-required')
  .map((entry) => ({
    id: entry.id,
    headword: entry.headword,
    homeLessonId: entry.homeLessonId,
    evidenceSourceLessonIds: entry.evidenceSourceLessonIds,
  }));
const activeLessonAuthoring = activeEntries
  .filter((entry) => entry.coverage === 'authoring-required')
  .map((entry) => ({
    id: entry.id,
    headword: entry.headword,
    themeId: entry.themeId,
    homeLessonId: entry.homeLessonId,
    sourcePdfPage: entry.sourcePdfPage,
  }));
const passiveAuthoringGaps = WORTLISTE_INVENTORY.filter(
  (entry) => entry.coverage === 'authoring-required',
).map((entry) => ({
  id: entry.id,
  headword: entry.headword,
  themeId: entry.themeId,
  homeLessonId: entry.homeLessonId,
  sourcePdfPage: entry.sourcePdfPage,
}));
const spiralRows = SPIRAL_LEDGER.map((row) => ({
  lessonId: row.lessonId,
  sourceLessonIds: row.sourceLessonIds,
  srsCardCount: row.srsVocabIds.length,
  wortlisteHomeCount: WORTLISTE_INVENTORY.filter(
    (entry) => entry.homeLessonId === row.lessonId,
  ).length,
  laterReturns: row.laterReturns,
}));

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(
  OUTPUT_PATH,
  `${JSON.stringify(
    {
      chunk: '3p-12-wortliste-spiral-ledger',
      checkedOn: WORTLISTE_SOURCE.checkedOn,
      source: WORTLISTE_SOURCE,
      counts: {
        ...WORTLISTE_COUNTS,
        themes: WORTLISTE_THEMES.length,
        wordGroups: WORTLISTE_WORD_GROUPS.length,
        spiralRows: SPIRAL_LEDGER.length,
      },
      coverageCounts,
      targetCounts,
      themeCounts,
      activeSrsAuthoring,
      activeLessonAuthoring,
      passiveAuthoringGaps,
      spiralRows,
      checks: {
        officialRowsRepresented: true,
        activeTargetSelected: true,
        currentVocabIdsResolve: true,
        themesAndWordGroupsMapped: true,
        all56RowsHaveSrsCards: true,
        all56RowsHaveNamedLaterReturn: true,
      },
    },
    null,
    2,
  )}\n`,
  'utf8',
);

console.log(
  `Wortliste + spiral: ${WORTLISTE_COUNTS.main} main + ` +
    `${WORTLISTE_COUNTS.derived} derived rows, ${activeEntries.length} active, ` +
    `${WORTLISTE_COUNTS.currentCards} current cards, ` +
    `${activeSrsAuthoring.length} active SRS cards to author, ` +
    `${activeLessonAuthoring.length} active lesson gaps, ` +
    `${SPIRAL_LEDGER.length}/56 named returns; audit ${path.relative(
      process.cwd(),
      OUTPUT_PATH,
    )}`,
);
