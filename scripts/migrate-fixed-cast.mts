import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import ts from 'typescript';

type Edit = { start: number; end: number; text: string };

function propertyName(node: ts.ObjectLiteralElementLike): string | undefined {
  if (!('name' in node) || !node.name) return undefined;
  return ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) ? node.name.text : undefined;
}

function stringProperty(node: ts.ObjectLiteralExpression, name: string): string | undefined {
  const property = node.properties.find((candidate) => propertyName(candidate) === name);
  if (!property || !ts.isPropertyAssignment(property)) return undefined;
  return ts.isStringLiteral(property.initializer) ? property.initializer.text : undefined;
}

function storySceneProperty(node: ts.ObjectLiteralExpression): ts.PropertyAssignment | undefined {
  const property = node.properties.find((candidate) => propertyName(candidate) === 'storyScene');
  return property && ts.isPropertyAssignment(property) && ts.isObjectLiteralExpression(property.initializer)
    ? property
    : undefined;
}

function migrateModule(path: string) {
  const source = readFileSync(path, 'utf8');
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const lessons: Array<{ node: ts.ObjectLiteralExpression; scene: ts.PropertyAssignment; lessonNumber: number }> = [];

  function collect(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      const id = stringProperty(node, 'id');
      const scene = storySceneProperty(node);
      const match = id?.match(/^\d+-(\d+)$/);
      if (scene && match) lessons.push({ node, scene, lessonNumber: Number(match[1]) });
    }
    ts.forEachChild(node, collect);
  }
  collect(file);

  const edits: Edit[] = [];
  for (const lesson of lessons) {
    const peer = lesson.lessonNumber % 2 === 1 ? 'nivin' : 'meera';
    const peerName = peer === 'nivin' ? 'Nivin' : 'Meera';
    const sceneObject = lesson.scene.initializer as ts.ObjectLiteralExpression;

    if (!sceneObject.properties.some((property) => propertyName(property) === 'learnerOwner')) {
      edits.push({
        start: sceneObject.getStart(file) + 1,
        end: sceneObject.getStart(file) + 1,
        text: `\n        learnerOwner: '${peer}',`,
      });
    }

    function migrateLessonStrings(node: ts.Node) {
      if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && node.getStart(file) >= lesson.node.getStart(file) && node.end <= lesson.node.end) {
        const raw = source.slice(node.getStart(file), node.end);
        const migrated = raw.replaceAll('Kuttan', peerName).replaceAll('Frau Weber', 'Frau Fischer');
        if (migrated !== raw) edits.push({ start: node.getStart(file), end: node.end, text: migrated });
      }
      ts.forEachChild(node, migrateLessonStrings);
    }
    migrateLessonStrings(lesson.node);
  }

  // Canonical story schema names. These identifiers are not compatibility assets.
  for (const match of source.matchAll(/\bkuttanIntro\b|\bkuttanReaction\b/g)) {
    const oldName = match[0];
    edits.push({
      start: match.index,
      end: match.index + oldName.length,
      text: oldName === 'kuttanIntro' ? 'peerIntro' : 'peerReaction',
    });
  }

  const unique = new Map(edits.map((edit) => [`${edit.start}:${edit.end}`, edit]));
  let output = source;
  for (const edit of [...unique.values()].sort((a, b) => b.start - a.start)) {
    output = output.slice(0, edit.start) + edit.text + output.slice(edit.end);
  }
  writeFileSync(path, output);
  return lessons.length;
}

let lessonCount = 0;
for (const path of globSync('src/lib/content/modules/module-*.ts')) {
  lessonCount += migrateModule(path);
}

console.log(`migrated fixed-cast ownership across ${lessonCount} lessons`);
