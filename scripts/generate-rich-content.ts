
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const SCRIPT_DIR = path.join(process.cwd(), 'docs', 'scripts');
const MODULE_DIR = path.join(process.cwd(), 'src', 'lib', 'content', 'modules');

async function generateRichContent(scriptText: string, videoId: string) {
  const prompt = `
    You are a curriculum designer for a German course for Malayalis ("Adipoli German").
    Based on the following lesson script (Video ID: ${videoId}), extract 3-5 "Rich Elements" to be displayed on the lesson page.
    The elements must be high-impact, educational, and reflect the "Adipoli" (fun, relatable, peer-to-peer) tone.

    Use these JSON structures ONLY:
    - { "type": "table", "title": "...", "headers": ["...", "..."], "rows": [["...", "..."], ["...", "..."]] }
    - { "type": "note", "title": "...", "content": "...", "variant": "info" | "tip" | "warning" }
    - { "type": "list", "title": "...", "items": ["...", "..."] }
    - { "type": "vocabulary", "items": [{ "german": "...", "english": "...", "malayalam": "...", "pronunciation": "..." }] }

    Rules:
    1. If there is a comparison (e.g., Sie vs Du), use a table or note.
    2. If there are cultural tips (e.g., punctuality), use a note with variant "tip".
    3. If there is a summary of rules, use a list.
    4. Keep the Malayali context in notes (use Manglish/Malayalam phrases if appropriate).
    5. Output ONLY the JSON array. No markdown, no "here is the output".

    SCRIPT:
    ${scriptText}
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Clean JSON from potential markdown blocks
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error(`Error generating content for ${videoId}:`, e);
    return null;
  }
}

async function run() {
  const scriptFiles = fs.readdirSync(SCRIPT_DIR).filter(f => f.endsWith('.md'));
  
  for (const file of scriptFiles) {
    if (!file.includes('v1-1-1')) continue;
    const videoId = file.split('_')[0]; // e.g. v1-1-1
    const moduleId = videoId.split('-')[0].replace('v', '');
    const modulePath = path.join(MODULE_DIR, `module-${moduleId.padStart(2, '0')}.ts`);

    if (!fs.existsSync(modulePath)) {
      console.warn(`Module file not found: ${modulePath}`);
      continue;
    }

    console.log(`Processing ${videoId}...`);
    const scriptText = fs.readFileSync(path.join(SCRIPT_DIR, file), 'utf-8');

    // Skip if already in the file (pseudo-check)
    let moduleContent = fs.readFileSync(modulePath, 'utf-8');
    if (moduleContent.includes(`id: "${videoId}"`) && moduleContent.includes('richContent:')) {
      console.log(`Skipping ${videoId} - already has richContent.`);
      continue;
    }

    const richContent = await generateRichContent(scriptText, videoId);
    if (richContent) {
      // Very crude injection based on ID match
      const videoIdLiteral = `id: "${videoId}"`;
      const placeholderThumbnailLiteral = `placeholderThumbnail: `;
      
      // We look for the end of the video object
      const videoBlockRegex = new RegExp(`{.*?id: "${videoId}".*?placeholderThumbnail: ".*?".*?}`, 's');
      const match = moduleContent.match(videoBlockRegex);
      
      if (match) {
        const originalBlock = match[0];
        const updatedBlock = originalBlock.replace(
          /placeholderThumbnail: "(.*?)"/,
          `placeholderThumbnail: "$1",\n          richContent: ${JSON.stringify(richContent, null, 2).replace(/\n/g, '\n          ')}`
        );
        moduleContent = moduleContent.replace(originalBlock, updatedBlock);
        fs.writeFileSync(modulePath, moduleContent);
        console.log(`Updated ${videoId} with richContent!`);
      } else {
        console.warn(`Could not find video block for ${videoId} in ${modulePath}`);
      }
    }
  }
}

run();
