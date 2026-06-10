/**
 * App-level readiness audit for Adipoli German.
 *
 * This is intentionally broader than an exercise-count audit. It checks the online
 * lesson unit as a learner experiences it: story scene -> video/script -> vocab ->
 * exercises -> production practice -> review/exam readiness signals.
 *
 * Run:
 *   npx tsx scripts/audit-app-readiness.ts
 *   npx tsx scripts/audit-app-readiness.ts --json
 */

import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';

type ExerciseType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'matching'
  | 'ordering'
  | 'speaking'
  | 'free-text'
  | 'dictation'
  | 'image-prompt'
  | 'type-answer';

type Exercise = {
  id: string;
  type: ExerciseType;
  question: string;
  questionGerman?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  xpReward: number;
  audioUrl?: string;
};

type Lesson = {
  id: string;
  title: string;
  titleGerman: string;
  description: string;
  duration: string;
  videos?: Array<{
    id: string;
    title: string;
    duration: string;
    description: string;
    videoUrl?: string;
    script?: string;
    scriptOutline?: string[];
    richContent?: unknown[];
  }>;
  exercises?: Exercise[];
  vocabulary?: unknown[];
  storyScene?: {
    setting?: { name?: string; description?: string; sceneType?: string };
    narrative?: { currentObjective?: string; previousRecap?: string; nextTeaser?: string };
    kuttanIntro?: string[];
    vocabEncounters?: unknown[];
    decisionPoints?: unknown[];
  };
};

type ModuleShape = {
  id: number;
  title: string;
  titleGerman: string;
  description: string;
  lessons: Lesson[];
};

type LessonAudit = {
  moduleId: number;
  moduleTitle: string;
  lessonId: string;
  title: string;
  videos: number;
  videoUrls: number;
  richContentVideos: number;
  exercises: number;
  productionExercises: number;
  speaking: number;
  freeText: number;
  dictation: number;
  dictationWithAudio: number;
  vocab: number;
  hasStoryScene: boolean;
  hasVocabEncounter: boolean;
  hasDecisionPoint: boolean;
  genericQuestions: string[];
  issues: string[];
  readinessScore: number;
};

type ModuleAudit = {
  id: number;
  title: string;
  lessons: number;
  videos: number;
  videoUrls: number;
  exercises: number;
  productionExercises: number;
  vocab: number;
  readinessAverage: number;
  weakLessons: LessonAudit[];
};

const ROOT = path.resolve(__dirname, '..');
const MODULES_DIR = path.join(ROOT, 'src', 'lib', 'content', 'modules');
const QC_DIR = path.join(ROOT, 'GermanCourse_QC');
const DOC_SCRIPTS_DIR = path.join(ROOT, 'docs', 'scripts');
const GUIDE_SCRIPTS_DIR = path.join(ROOT, 'scripts', 'output');

const PRODUCTION_TYPES = new Set<ExerciseType>(['speaking', 'free-text', 'type-answer', 'dictation']);
const STORY_ANCHORS = [
  'Kuttan',
  'Frau Weber',
  'Goethe',
  'Kochi',
  'Kerala',
  'Thrissur',
  'Amma',
  'Achan',
  'Arjun',
  'Priya',
  'cousin',
  'Munich',
  'exam',
  'visa',
  'airport',
  'WhatsApp',
  'video call',
  'mock',
];

const GENERIC_STEM_RE = /^(what does|how do you say|translate|match the|complete|choose the correct|select the correct|which (word|sentence)|order these|fill in|listen and type)/i;

function countFiles(dir: string, predicate: (fileName: string) => boolean): number {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir).filter(predicate).length;
}

function isGenericQuestion(question: string): boolean {
  const q = question.trim();
  if (!GENERIC_STEM_RE.test(q)) return false;
  return !STORY_ANCHORS.some((anchor) => q.toLowerCase().includes(anchor.toLowerCase()));
}

function scoreLesson(a: Omit<LessonAudit, 'readinessScore'>): number {
  let score = 0;
  if (a.hasStoryScene) score += 15;
  if (a.hasVocabEncounter) score += 10;
  if (a.hasDecisionPoint) score += 10;
  if (a.videos > 0) score += 10;
  if (a.videoUrls > 0) score += 5;
  if (a.richContentVideos > 0) score += 5;
  if (a.vocab > 0) score += 10;
  if (a.exercises >= 6) score += 10;
  if (a.productionExercises >= 3) score += 15;
  else if (a.productionExercises >= 1) score += 7;
  if (a.speaking >= 1) score += 4;
  if (a.freeText >= 1) score += 4;
  if (a.dictation >= 1) score += 4;
  if (a.dictation > 0 && a.dictationWithAudio === 0) score -= 8;
  score -= Math.min(10, a.genericQuestions.length * 2);
  score -= Math.min(20, a.issues.length * 2);
  return Math.max(0, Math.min(100, score));
}

function auditLesson(moduleId: number, moduleTitle: string, lesson: Lesson): LessonAudit {
  const videos = lesson.videos ?? [];
  const exercises = lesson.exercises ?? [];
  const vocab = lesson.vocabulary ?? [];
  const production = exercises.filter((ex) => PRODUCTION_TYPES.has(ex.type));
  const speaking = exercises.filter((ex) => ex.type === 'speaking').length;
  const freeText = exercises.filter((ex) => ex.type === 'free-text' || ex.type === 'type-answer').length;
  const dictation = exercises.filter((ex) => ex.type === 'dictation').length;
  const dictationWithAudio = exercises.filter((ex) => ex.type === 'dictation' && !!ex.audioUrl).length;
  const genericQuestions = exercises.filter((ex) => isGenericQuestion(ex.question)).map((ex) => ex.id);

  const issues: string[] = [];
  if (!lesson.storyScene) issues.push('missing storyScene');
  if (!lesson.storyScene?.vocabEncounters?.length) issues.push('missing vocabEncounter');
  if (!lesson.storyScene?.decisionPoints?.length) issues.push('missing decisionPoint');
  if (videos.length === 0) issues.push('no videos');
  if (videos.length > 0 && videos.filter((v) => !!v.videoUrl).length === 0) issues.push('videos not wired to videoUrl');
  if (videos.length > 0 && videos.filter((v) => !!v.richContent?.length).length === 0) issues.push('no richContent on videos');
  if (exercises.length < 6) issues.push('thin exercise set (<6)');
  if (production.length < 3) issues.push('below production floor (<3)');
  if (speaking === 0) issues.push('no speaking exercise');
  if (freeText === 0) issues.push('no writing/free-text exercise');
  if (dictation === 0) issues.push('no dictation/listening production');
  if (dictation > 0 && dictationWithAudio === 0) issues.push('dictation has no audioUrl');
  if (vocab.length === 0) issues.push('no lesson vocabulary array');
  if (genericQuestions.length >= 3) issues.push(`generic exercise stems (${genericQuestions.length})`);

  const base = {
    moduleId,
    moduleTitle,
    lessonId: lesson.id,
    title: lesson.title,
    videos: videos.length,
    videoUrls: videos.filter((v) => !!v.videoUrl).length,
    richContentVideos: videos.filter((v) => !!v.richContent?.length).length,
    exercises: exercises.length,
    productionExercises: production.length,
    speaking,
    freeText,
    dictation,
    dictationWithAudio,
    vocab: vocab.length,
    hasStoryScene: !!lesson.storyScene,
    hasVocabEncounter: !!lesson.storyScene?.vocabEncounters?.length,
    hasDecisionPoint: !!lesson.storyScene?.decisionPoints?.length,
    genericQuestions,
    issues,
  };

  return { ...base, readinessScore: scoreLesson(base) };
}

async function loadModule(moduleId: number): Promise<ModuleShape> {
  const padded = String(moduleId).padStart(2, '0');
  const modulePath = path.join(MODULES_DIR, `module-${padded}.ts`);
  const imported = await import(pathToFileURL(modulePath).href);
  const data = imported[`MODULE_${moduleId}`] as ModuleShape;
  if (!data) throw new Error(`Missing export MODULE_${moduleId} in ${modulePath}`);
  return data;
}

function toMarkdown(modules: ModuleAudit[], lessons: LessonAudit[]): string {
  const totals = modules.reduce(
    (acc, m) => ({
      lessons: acc.lessons + m.lessons,
      videos: acc.videos + m.videos,
      videoUrls: acc.videoUrls + m.videoUrls,
      exercises: acc.exercises + m.exercises,
      production: acc.production + m.productionExercises,
      vocab: acc.vocab + m.vocab,
    }),
    { lessons: 0, videos: 0, videoUrls: 0, exercises: 0, production: 0, vocab: 0 },
  );
  const avg = lessons.reduce((n, l) => n + l.readinessScore, 0) / Math.max(1, lessons.length);
  const belowProd = lessons.filter((l) => l.productionExercises < 3);
  const noSpeaking = lessons.filter((l) => l.speaking === 0);
  const noDictation = lessons.filter((l) => l.dictation === 0);
  const weak = [...lessons].sort((a, b) => a.readinessScore - b.readinessScore).slice(0, 20);
  const genericTotal = lessons.reduce((n, l) => n + l.genericQuestions.length, 0);

  const lines: string[] = [];
  lines.push('# Adipoli German — App-level readiness audit');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('## What this audits');
  lines.push('This is not just an exercise-count audit. It checks the online lesson unit as the learner experiences it: story scene → video/script → vocabulary → exercises → production → review/exam readiness signals.');
  lines.push('');
  lines.push('## Totals');
  lines.push(`- Modules: ${modules.length}`);
  lines.push(`- App lessons: ${totals.lessons}`);
  lines.push(`- Videos in lessons: ${totals.videos}`);
  lines.push(`- Videos with videoUrl: ${totals.videoUrls}`);
  lines.push(`- Exercises: ${totals.exercises}`);
  lines.push(`- Production exercises: ${totals.production}`);
  lines.push(`- Vocab items: ${totals.vocab}`);
  lines.push(`- docs/scripts lesson scripts: ${countFiles(DOC_SCRIPTS_DIR, (f) => f.endsWith('.md'))}`);
  lines.push(`- scripts/output module guide scripts: ${countFiles(GUIDE_SCRIPTS_DIR, (f) => /^module-\d{2}\.script\.md$/.test(f))}`);
  lines.push(`- Average app-readiness score: ${avg.toFixed(1)} / 100`);
  lines.push('');
  lines.push('## Module summary');
  for (const m of modules) {
    lines.push(`- M${String(m.id).padStart(2, '0')} ${m.title}: ${m.lessons} lessons, ${m.videos} videos, ${m.exercises} exercises, ${m.productionExercises} production, avg readiness ${m.readinessAverage.toFixed(1)}`);
  }
  lines.push('');
  lines.push('## Key gaps');
  lines.push(`- Lessons below production floor (<3 production exercises): ${belowProd.length}`);
  lines.push(`- Lessons with no speaking exercise: ${noSpeaking.length}`);
  lines.push(`- Lessons with no dictation/listening-production exercise: ${noDictation.length}`);
  lines.push(`- Generic exercise stems needing story tie-in: ${genericTotal}`);
  lines.push('');
  lines.push('## Weakest online lesson units');
  for (const l of weak) {
    lines.push(`- ${l.lessonId} ${l.title} — score ${l.readinessScore}; issues: ${l.issues.join('; ') || 'none'}`);
  }
  lines.push('');
  lines.push('## Correct interpretation');
  lines.push('- A lesson is not the same as an exercise set. The exercise layer can be weak while the lesson still has story/video/vocab value.');
  lines.push('- Launch quality requires the whole chain: story encounter → teaching video/rich content → vocab encounter → active production → correction/review → exam checkpoint.');
  lines.push('- The safest next content work is not random rewriting; it is upgrading weak lessons by adding targeted speaking/free-text/dictation tasks tied to the existing storyScene.');
  lines.push('');
  lines.push('## Recommended next implementation lane');
  lines.push('1. Start with Modules 17–18 because they directly control Goethe exam confidence.');
  lines.push('2. Add production tasks to the weakest lessons without deleting existing recognition exercises.');
  lines.push('3. Add audioUrl-backed dictation/Hören tasks where the course already has audio infrastructure.');
  lines.push('4. Story-tie generic stems only after the production holes are filled.');
  lines.push('');
  return lines.join('\n');
}

async function main() {
  const lessonAudits: LessonAudit[] = [];
  const moduleAudits: ModuleAudit[] = [];

  for (let id = 1; id <= 18; id++) {
    const moduleData = await loadModule(id);
    const lessons = moduleData.lessons.map((lesson) => auditLesson(moduleData.id, moduleData.title, lesson));
    lessonAudits.push(...lessons);
    const moduleAudit: ModuleAudit = {
      id: moduleData.id,
      title: moduleData.title,
      lessons: lessons.length,
      videos: lessons.reduce((n, l) => n + l.videos, 0),
      videoUrls: lessons.reduce((n, l) => n + l.videoUrls, 0),
      exercises: lessons.reduce((n, l) => n + l.exercises, 0),
      productionExercises: lessons.reduce((n, l) => n + l.productionExercises, 0),
      vocab: lessons.reduce((n, l) => n + l.vocab, 0),
      readinessAverage: lessons.reduce((n, l) => n + l.readinessScore, 0) / Math.max(1, lessons.length),
      weakLessons: lessons.filter((l) => l.readinessScore < 70),
    };
    moduleAudits.push(moduleAudit);
  }

  const output = { generatedAt: new Date().toISOString(), modules: moduleAudits, lessons: lessonAudits };
  if (process.argv.includes('--json')) {
    process.stdout.write(JSON.stringify(output, null, 2));
    return;
  }

  fs.mkdirSync(QC_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const reportPath = path.join(QC_DIR, `${stamp}_app-level-readiness-audit.md`);
  fs.writeFileSync(reportPath, toMarkdown(moduleAudits, lessonAudits), 'utf8');

  const totalLessons = lessonAudits.length;
  const avg = lessonAudits.reduce((n, l) => n + l.readinessScore, 0) / Math.max(1, totalLessons);
  const belowProd = lessonAudits.filter((l) => l.productionExercises < 3).length;
  const noSpeaking = lessonAudits.filter((l) => l.speaking === 0).length;
  const noDictation = lessonAudits.filter((l) => l.dictation === 0).length;
  console.log(`Wrote ${reportPath}`);
  console.log(`Lessons=${totalLessons} avgReadiness=${avg.toFixed(1)} belowProductionFloor=${belowProd} noSpeaking=${noSpeaking} noDictation=${noDictation}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
