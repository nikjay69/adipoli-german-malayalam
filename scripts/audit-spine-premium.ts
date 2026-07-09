/**
 * Spine premium-standard audit (docs/LESSON_QUALITY_STANDARD.md).
 *
 * Audits every lesson that is a required block in the 8-module spine against
 * the premium lesson standard: production floor (>=3 production, speaking >=2,
 * free-text >=1, dictation >=1), distribution caps, empty explanations, banned
 * exercise patterns, generic stems without scene tie-in, mechanical stems, and
 * mistake-repair presence.
 *
 * Run:
 *   npx tsx scripts/audit-spine-premium.ts            # markdown report to GermanCourse_QC/
 *   npx tsx scripts/audit-spine-premium.ts --json     # JSON to scripts/output/spine-premium-audit.json
 */

import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';
import { SPINE_SOURCE_MODULE_IDS } from '../src/lib/spine-map';

type Exercise = {
  id: string;
  type: string;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  audioUrl?: string;
};

type Lesson = {
  id: string;
  title: string;
  exercises?: Exercise[];
  storyScene?: { setting?: { name?: string }; decisionPoints?: unknown[]; vocabEncounters?: unknown[] };
};

type ModuleShape = { id: number; title: string; lessons: Lesson[] };

const ROOT = path.resolve(__dirname, '..');
const MODULES_DIR = path.join(ROOT, 'src', 'lib', 'content', 'modules');
const QC_DIR = path.join(ROOT, 'GermanCourse_QC');
const OUT_DIR = path.join(ROOT, 'scripts', 'output');

const PRODUCTION = new Set(['speaking', 'free-text', 'type-answer', 'dictation']);

const STORY_ANCHORS = [
  'kuttan', 'frau weber', 'goethe', 'kochi', 'kerala', 'thrissur', 'amma', 'achan',
  'arjun', 'priya', 'cousin', 'munich', 'münchen', 'berlin', 'exam', 'examiner', 'visa',
  'airport', 'whatsapp', 'video call', 'mock', 'chayakkada', 'ammachi', 'chettan',
];

const GENERIC_STEM_RE = /^(what does|how do you say|translate|match the|complete the|choose the correct|select the correct|which (word|sentence|german|number)|order these|put these|fill in|listen and type|write the|say aloud)/i;

// stems produced by the old fix-production-floor batch: mechanical, groan-test fails
const MECHANICAL_STEM_RE = /Kuttan practice: Say aloud for this lesson|Say aloud for this lesson \(/i;

const BARE_MATCHING_RE = /match.*(english|meaning|translation)|match the german/i;
const PHONETIC_OPTION_RE = /^[a-z]+(-[a-z]+)+$/i; // "tsvye", "eye-ns" style pseudo-phonetics

const REPAIR_RE = /(mistake|wrong|falsch|common error|trap|repair|fix|watch out|don'?t say|never say|not correct|incorrect)/i;

type LessonRow = {
  spineModule: number;
  sourceModule: number;
  lessonId: string;
  title: string;
  exercises: number;
  production: number;
  speaking: number;
  freeText: number;
  dictation: number;
  multipleChoice: number;
  fillBlank: number;
  matchingOrdering: number;
  emptyExplanations: string[];
  genericStems: string[];
  mechanicalStems: string[];
  bannedExercises: string[];
  hasMistakeRepair: boolean;
  hasStoryScene: boolean;
  verdict: 'PASS' | 'WEAK' | 'FAIL';
  fixes: string[];
};

function hasAnchor(text: string): boolean {
  const t = text.toLowerCase();
  return STORY_ANCHORS.some((a) => t.includes(a));
}

function auditLesson(spineModule: number, sourceModule: number, lesson: Lesson): LessonRow {
  const exercises = lesson.exercises ?? [];
  const byType = (t: string) => exercises.filter((e) => e.type === t).length;

  const production = exercises.filter((e) => PRODUCTION.has(e.type)).length;
  const speaking = byType('speaking');
  const freeText = byType('free-text') + byType('type-answer');
  const dictation = byType('dictation');
  const multipleChoice = byType('multiple-choice');
  const fillBlank = byType('fill-blank');
  const matchingOrdering = byType('matching') + byType('ordering');

  const emptyExplanations = exercises
    .filter((e) => e.type !== 'speaking' && (!e.explanation || !e.explanation.trim()))
    .map((e) => e.id);

  const genericStems = exercises
    .filter((e) => GENERIC_STEM_RE.test(e.question.trim()) && !hasAnchor(e.question))
    .map((e) => e.id);

  const mechanicalStems = exercises.filter((e) => MECHANICAL_STEM_RE.test(e.question)).map((e) => e.id);

  const bannedExercises = exercises
    .filter((e) => {
      if (e.type !== 'matching') return false;
      if (BARE_MATCHING_RE.test(e.question) && !hasAnchor(e.question)) return true;
      return (e.options ?? []).some((o) => PHONETIC_OPTION_RE.test(o.trim()) && o.includes('-'));
    })
    .map((e) => e.id);

  const hasMistakeRepair = exercises.some((e) => REPAIR_RE.test(`${e.question} ${e.explanation ?? ''}`));

  const fixes: string[] = [];
  if (production < 3) fixes.push(`production floor: ${production}/3`);
  if (speaking < 2) fixes.push(`speaking ${speaking}/2`);
  if (freeText < 1) fixes.push('no free-text/type-answer');
  if (dictation < 1) fixes.push('no dictation');
  if (multipleChoice > 2) fixes.push(`MC over cap (${multipleChoice}/2)`);
  if (fillBlank > 1) fixes.push(`fill-blank over cap (${fillBlank}/1)`);
  if (matchingOrdering > 1) fixes.push(`matching/ordering over cap (${matchingOrdering}/1)`);
  if (emptyExplanations.length) fixes.push(`${emptyExplanations.length} empty explanations`);
  if (genericStems.length) fixes.push(`${genericStems.length} generic stems`);
  if (mechanicalStems.length) fixes.push(`${mechanicalStems.length} mechanical stems`);
  if (bannedExercises.length) fixes.push(`${bannedExercises.length} banned matching`);
  if (!hasMistakeRepair) fixes.push('no mistake-repair');
  if (!lesson.storyScene) fixes.push('no storyScene');

  // FAIL: hard floor broken or banned content. WEAK: premium gaps. PASS: clean.
  // Speaking floor is >=2 per LESSON_QUALITY_STANDARD ("speaking >=2" hard floor).
  const fail = production < 3 || speaking < 2 || bannedExercises.length > 0;
  const weak = fixes.length > 0;
  const verdict: LessonRow['verdict'] = fail ? 'FAIL' : weak ? 'WEAK' : 'PASS';

  return {
    spineModule,
    sourceModule,
    lessonId: lesson.id,
    title: lesson.title,
    exercises: exercises.length,
    production,
    speaking,
    freeText,
    dictation,
    multipleChoice,
    fillBlank,
    matchingOrdering,
    emptyExplanations,
    genericStems,
    mechanicalStems,
    bannedExercises,
    hasMistakeRepair,
    hasStoryScene: !!lesson.storyScene,
    verdict,
    fixes,
  };
}

async function loadModule(moduleId: number): Promise<ModuleShape> {
  const padded = String(moduleId).padStart(2, '0');
  const modulePath = path.join(MODULES_DIR, `module-${padded}.ts`);
  const imported = await import(pathToFileURL(modulePath).href);
  const data = imported[`MODULE_${moduleId}`] as ModuleShape;
  if (!data) throw new Error(`Missing export MODULE_${moduleId} in ${modulePath}`);
  return data;
}

function toMarkdown(rows: LessonRow[]): string {
  const lines: string[] = [];
  lines.push('# Spine premium-standard audit (LESSON_QUALITY_STANDARD.md)');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('Verdicts: FAIL = hard floor broken (production <3, speaking <2, or banned exercise). WEAK = premium gaps named in fixes. PASS = clean against automated checks (human boredom scan still required).');
  lines.push('');

  const bySpine = new Map<number, LessonRow[]>();
  for (const r of rows) {
    if (!bySpine.has(r.spineModule)) bySpine.set(r.spineModule, []);
    bySpine.get(r.spineModule)!.push(r);
  }

  for (const [spineId, moduleRows] of [...bySpine.entries()].sort((a, b) => a[0] - b[0])) {
    const pass = moduleRows.filter((r) => r.verdict === 'PASS').length;
    const weak = moduleRows.filter((r) => r.verdict === 'WEAK').length;
    const fail = moduleRows.filter((r) => r.verdict === 'FAIL').length;
    lines.push(`## Spine module ${spineId} — ${pass} PASS / ${weak} WEAK / ${fail} FAIL`);
    lines.push('');
    for (const r of moduleRows) {
      lines.push(`- **${r.lessonId} ${r.title}** (lib M${r.sourceModule}) — ${r.verdict}`);
      lines.push(`  - ex=${r.exercises} prod=${r.production} spk=${r.speaking} ft=${r.freeText} dict=${r.dictation} mc=${r.multipleChoice} fb=${r.fillBlank} match/ord=${r.matchingOrdering} repair=${r.hasMistakeRepair ? 'yes' : 'NO'}`);
      if (r.fixes.length) lines.push(`  - fixes: ${r.fixes.join(' · ')}`);
      if (r.genericStems.length) lines.push(`  - generic stems: ${r.genericStems.join(', ')}`);
      if (r.mechanicalStems.length) lines.push(`  - mechanical stems: ${r.mechanicalStems.join(', ')}`);
      if (r.bannedExercises.length) lines.push(`  - banned: ${r.bannedExercises.join(', ')}`);
    }
    lines.push('');
  }

  const totals = {
    lessons: rows.length,
    pass: rows.filter((r) => r.verdict === 'PASS').length,
    weak: rows.filter((r) => r.verdict === 'WEAK').length,
    fail: rows.filter((r) => r.verdict === 'FAIL').length,
    genericStems: rows.reduce((n, r) => n + r.genericStems.length, 0),
    mechanicalStems: rows.reduce((n, r) => n + r.mechanicalStems.length, 0),
    emptyExplanations: rows.reduce((n, r) => n + r.emptyExplanations.length, 0),
    noRepair: rows.filter((r) => !r.hasMistakeRepair).length,
  };
  lines.push('## Totals');
  lines.push(`- Spine lessons audited: ${totals.lessons} — ${totals.pass} PASS / ${totals.weak} WEAK / ${totals.fail} FAIL`);
  lines.push(`- Generic stems needing scene tie-in: ${totals.genericStems}`);
  lines.push(`- Mechanical batch-generated stems: ${totals.mechanicalStems}`);
  lines.push(`- Empty explanations: ${totals.emptyExplanations}`);
  lines.push(`- Lessons with no mistake-repair: ${totals.noRepair}`);
  lines.push('');
  return lines.join('\n');
}

async function main() {
  const rows: LessonRow[] = [];
  for (const [spineIdStr, sourceIds] of Object.entries(SPINE_SOURCE_MODULE_IDS)) {
    const spineId = Number(spineIdStr);
    for (const sourceId of sourceIds) {
      const mod = await loadModule(sourceId);
      for (const lesson of mod.lessons) rows.push(auditLesson(spineId, sourceId, lesson));
    }
  }

  if (process.argv.includes('--json')) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    const outPath = path.join(OUT_DIR, 'spine-premium-audit.json');
    fs.writeFileSync(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), lessons: rows }, null, 2), 'utf8');
    console.log(`Wrote ${outPath}`);
  } else {
    fs.mkdirSync(QC_DIR, { recursive: true });
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    const reportPath = path.join(QC_DIR, `${stamp}_spine-premium-audit.md`);
    fs.writeFileSync(reportPath, toMarkdown(rows), 'utf8');
    console.log(`Wrote ${reportPath}`);
  }

  const fail = rows.filter((r) => r.verdict === 'FAIL');
  const weak = rows.filter((r) => r.verdict === 'WEAK');
  console.log(`lessons=${rows.length} PASS=${rows.length - weak.length - fail.length} WEAK=${weak.length} FAIL=${fail.length}`);
  console.log(`genericStems=${rows.reduce((n, r) => n + r.genericStems.length, 0)} mechanicalStems=${rows.reduce((n, r) => n + r.mechanicalStems.length, 0)} emptyExplanations=${rows.reduce((n, r) => n + r.emptyExplanations.length, 0)} noRepair=${rows.filter((r) => !r.hasMistakeRepair).length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
