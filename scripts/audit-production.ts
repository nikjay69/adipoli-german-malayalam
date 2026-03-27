/**
 * Production Audit Script
 * 
 * Scans all module files and calculates the ratio of 
 * Recognition (MCQ, Matching) vs. Production (Free-text, Dictation, Speaking) 
 * exercises to ensure exam readiness (Target > 15%).
 */

import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';

const MODULES_DIR = path.join(__dirname, '..', 'src', 'lib', 'content', 'modules');

async function auditModule(moduleNum: number) {
  const padded = String(moduleNum).padStart(2, '0');
  const filePath = path.join(MODULES_DIR, `module-${padded}.ts`);
  
  if (!fs.existsSync(filePath)) return null;

  try {
    const fileUrl = pathToFileURL(filePath).href;
    const mod = await import(fileUrl);
    const module = mod[`MODULE_${moduleNum}`];

    let total = 0;
    let production = 0;
    let recognition = 0;

    module.lessons.forEach((lesson: any) => {
      lesson.exercises.forEach((ex: any) => {
        total++;
        if (['free-text', 'dictation', 'speaking'].includes(ex.type)) {
          production++;
        } else {
          recognition++;
        }
      });
    });

    return {
      id: moduleNum,
      title: module.title,
      total,
      production,
      recognition,
      ratio: total > 0 ? (production / total) * 100 : 0
    };
  } catch (e) {
    console.error(`Error auditing module ${moduleNum}:`, e);
    return null;
  }
}

async function main() {
  console.log('=== Adipoli German: Production Exercise Audit ===\n');
  console.log(`${'MOD'.padEnd(5)} | ${'TITLE'.padEnd(25)} | ${'TOTAL'.padEnd(5)} | ${'PROD'.padEnd(5)} | ${'RATIO'.padEnd(7)}`);
  console.log('-'.repeat(60));

  let overallTotal = 0;
  let overallProd = 0;

  for (let i = 1; i <= 18; i++) {
    const stats = await auditModule(i);
    if (stats) {
      const ratioStr = stats.ratio.toFixed(1) + '%';
      const indicator = stats.ratio >= 15 ? '✅' : '⚠️';
      console.log(
        `${String(stats.id).padEnd(5)} | ` +
        `${stats.title.substring(0, 25).padEnd(25)} | ` +
        `${String(stats.total).padEnd(5)} | ` +
        `${String(stats.production).padEnd(5)} | ` +
        `${ratioStr.padEnd(7)} ${indicator}`
      );
      overallTotal += stats.total;
      overallProd += stats.production;
    }
  }

  const overallRatio = (overallProd / overallTotal) * 100;
  console.log('-'.repeat(60));
  console.log(`OVERALL: ${overallTotal} exercises, ${overallProd} production (${overallRatio.toFixed(1)}%)`);
  console.log(`TARGET: > 15.0% for all modules.`);
}

main();
