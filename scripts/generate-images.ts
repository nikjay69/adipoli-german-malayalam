/**
 * AI Image Generation Script — Kuttan Reference & Scene Stills
 *
 * Generates character reference images and scene stills using
 * Gemini API with Imagen 3 (via Google AI Studio / Generative Language API).
 *
 * Usage:
 *   npx tsx scripts/generate-images.ts                    # Generate all images
 *   npx tsx scripts/generate-images.ts --type reference   # Kuttan reference only
 *   npx tsx scripts/generate-images.ts --type scenes      # Scene stills only
 *   npx tsx scripts/generate-images.ts --scene 3          # Specific video scene
 *   npx tsx scripts/generate-images.ts --dry-run          # Show prompts only
 *
 * Requires GEMINI_API_KEY in .env.local at the project root.
 *
 * Cost estimate:
 *   - Imagen 3: ~$0.04 per image (1024x1024)
 *   - Reference images: ~5 images × $0.04 = $0.20
 *   - Scene stills: ~15 images × $0.04 = $0.60
 *   - Total: ~$0.80
 */

import * as fs from 'fs';
import * as path from 'path';

// ── Configuration ──────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'output', 'images');
const REF_DIR = path.join(OUTPUT_DIR, 'reference');
const SCENES_DIR = path.join(OUTPUT_DIR, 'scenes');

const IMAGEN_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict';

// ── Kuttan Character Sheet ─────────────────────────────────────────────────

const KUTTAN_BASE_DESCRIPTION = `A young Malayali man, 24-26 years old. Warm brown skin, dark slightly-curly hair, bright curious eyes with eager but nervous energy. Lean build, average height. Always carries a small black backpack.`;

const KUTTAN_REFERENCE_PROMPTS = [
  {
    id: 'kuttan-casual',
    prompt: `Portrait of ${KUTTAN_BASE_DESCRIPTION} Wearing a casual white cotton shirt and jeans with rubber slippers. Standing in front of a Kerala home with terracotta tiles. Warm natural lighting, photorealistic, 4K quality.`,
    description: 'Kuttan casual look (early videos)',
  },
  {
    id: 'kuttan-smart',
    prompt: `Portrait of ${KUTTAN_BASE_DESCRIPTION} Wearing a neat collared shirt, jeans, and proper shoes. Standing in an urban Kochi setting with modern buildings. Confident posture. Warm afternoon light, photorealistic, 4K quality.`,
    description: 'Kuttan smart look (mid videos)',
  },
  {
    id: 'kuttan-formal',
    prompt: `Portrait of ${KUTTAN_BASE_DESCRIPTION} Wearing a clean formal shirt tucked into trousers, polished shoes. Standing in front of a language institute. Confident, exam-ready expression. Professional lighting, photorealistic, 4K quality.`,
    description: 'Kuttan formal look (exam videos)',
  },
  {
    id: 'kuttan-airport',
    prompt: `Portrait of ${KUTTAN_BASE_DESCRIPTION} Wearing a neat shirt, rolling a suitcase, holding a boarding pass. At an airport departure gate. Expression: quietly proud, emotional but composed. Cinematic golden hour lighting through terminal windows, photorealistic, 4K.`,
    description: 'Kuttan at airport (final video)',
  },
  {
    id: 'kuttan-study',
    prompt: `${KUTTAN_BASE_DESCRIPTION} Sitting at a small wooden desk at night, single desk lamp illuminating his face and notebook. Notebook open with handwritten verb tables. Tired but determined expression. Old t-shirt. Kerala home interior. Intimate, warm lighting, photorealistic, 4K.`,
    description: 'Kuttan studying late night',
  },
];

// ── Scene Stills (one per AI cinematic video) ──────────────────────────────

const SCENE_PROMPTS = [
  {
    id: 'scene-01-kerala-home',
    video: 1,
    prompt: `Wide shot of a simple, warm Kerala home interior — terracotta tile floor, wooden furniture, brass nilavilakku lamp glowing in background. Evening. A young Indian man sits cross-legged on the floor, face lit by phone screen. Ceiling fan slowly turning. Intimate, cinematic. 4K.`,
  },
  {
    id: 'scene-02-tea-stall',
    video: 2,
    prompt: `A narrow Kerala road with coconut trees. A small tea stall (chaayakada) with two young Indian men. One shows his phone to the other. Playful, warm afternoon light. Scooters parked outside. Church visible in background. Kerala street ambience. Photorealistic, 4K.`,
  },
  {
    id: 'scene-03-kochi-city',
    video: 3,
    prompt: `Busy Kochi MG Road area. A young Indian man with a backpack stops in front of a notice board with "Goethe Institut" branding. Kochi Metro visible in background. Golden hour light, urban, modern, aspirational. Photorealistic, 4K.`,
  },
  {
    id: 'scene-04-family-dinner',
    video: 4,
    prompt: `Kerala family dinner scene. Steel plates with rice and curry on a wooden table. A young Indian man sits with parents and younger sister. Warm tungsten kitchen light. Mother looking expectant. Intimate, warm family atmosphere. Photorealistic, 4K.`,
  },
  {
    id: 'scene-05-late-night',
    video: 5,
    prompt: `A small wooden desk in a Kerala bedroom at 1 AM. Single desk lamp, phone screen glowing, notebook open with handwritten German verb tables. Dark room, only the lamp and phone providing light. Intimate, determined atmosphere. Photorealistic, 4K.`,
  },
  {
    id: 'scene-06-video-call',
    video: 6,
    prompt: `A young Indian man on his bed in a Kerala room, laptop open showing a video call with someone in a European apartment (different light quality). Face lit by laptop screen. Night setting. Intimate, forward-looking. Photorealistic, 4K.`,
  },
  {
    id: 'scene-07-kochi-mall',
    video: 7,
    prompt: `Modern Kochi shopping mall interior. A young Indian man with a backpack holds up a product, lips moving as if practicing something. A shop assistant nearby looks curious. Playful, self-aware energy. Bright mall lighting. Photorealistic, 4K.`,
  },
  {
    id: 'scene-08-bedroom-tour',
    video: 8,
    prompt: `A young Indian man standing in his Kerala bedroom, gesturing around like a tour guide. Simple room with study table, calendar, ceiling fan. He points at furniture. Warm afternoon light. Slightly comedic, self-aware. Photorealistic, 4K.`,
  },
  {
    id: 'scene-09-bus-stand',
    video: 9,
    prompt: `Busy Kochi KSRTC bus stand. Crowds, colorful buses, noise. A young Indian man approaches a confused European tourist holding a map. They gesture and communicate. Vibrant, busy atmosphere. Photorealistic, 4K.`,
  },
  {
    id: 'scene-10-study-group',
    video: 10,
    prompt: `Kerala living room, evening. A young Indian man stands teaching three friends sitting on the floor. Phones out. He points to body parts, explaining. One friend checks their phone. Warm, playful group energy. Photorealistic, 4K.`,
  },
  {
    id: 'scene-11-cafe',
    video: 11,
    prompt: `A Kochi café. A young Indian man at a table with laptop and coffee. At the next table, a German tourist couple struggles to order. He leans over helpfully. Warm café light, smooth and confident energy. Photorealistic, 4K.`,
  },
  {
    id: 'scene-12-backwaters',
    video: 12,
    prompt: `Kerala backwaters at golden hour. Still water reflecting coconut trees. A young Indian man sits alone on the bank, phone to ear, smiling warmly. Deeply nostalgic, warm, bittersweet. Golden light. Photorealistic, 4K.`,
  },
  {
    id: 'scene-13-goethe-registration',
    video: 13,
    prompt: `Reception desk of a language institute. Clean professional interior, German language posters. A young Indian man in formal shirt fills a registration form. Professional atmosphere. Bright, aspirational. Photorealistic, 4K.`,
  },
  {
    id: 'scene-14-exam-hall',
    video: 14,
    prompt: `Bright quiet exam hall. Rows of white desks, fluorescent lighting. A young Indian man sits focused, pen ready, sealed exam booklet in front of him. Other candidates visible. Tense, cinematic silence. Photorealistic, 4K.`,
  },
  {
    id: 'scene-15-airport',
    video: 15,
    prompt: `Kochi International Airport departures. A young Indian man in neat shirt with rolling suitcase looks at a boarding pass, slow smile forming. Terminal windows show Kerala sky, golden light streaming in. Emotional, cinematic, earned. Photorealistic, 4K.`,
  },
];

// ── API ────────────────────────────────────────────────────────────────────

function loadApiKey(): string {
  const envPath = path.join(PROJECT_ROOT, '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('ERROR: .env.local not found at', envPath);
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf-8');
  const match = content.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
  if (!match) {
    console.error('ERROR: GEMINI_API_KEY not found in .env.local');
    process.exit(1);
  }
  return match[1].trim().replace(/^["']|["']$/g, '');
}

async function generateImage(
  apiKey: string,
  prompt: string,
  outputPath: string
): Promise<void> {
  const body = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: '16:9',
      personGeneration: 'allow_adult',
    },
  };

  const response = await fetch(`${IMAGEN_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Imagen API error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as {
    predictions?: Array<{
      bytesBase64Encoded?: string;
      mimeType?: string;
    }>;
  };

  const imageData = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!imageData) {
    throw new Error('Imagen returned no image data: ' + JSON.stringify(data).slice(0, 200));
  }

  const buffer = Buffer.from(imageData, 'base64');
  fs.writeFileSync(outputPath, buffer);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Adipoli German — AI Image Generator ===\n');

  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const typeFilter = args.indexOf('--type') >= 0 ? args[args.indexOf('--type') + 1] : null;
  const sceneFilter = args.indexOf('--scene') >= 0 ? Number(args[args.indexOf('--scene') + 1]) : null;

  const doReference = !typeFilter || typeFilter === 'reference';
  const doScenes = !typeFilter || typeFilter === 'scenes';

  if (dryRun) {
    console.log('--- DRY RUN (showing prompts only) ---\n');

    if (doReference) {
      console.log('## Reference Images');
      for (const ref of KUTTAN_REFERENCE_PROMPTS) {
        console.log(`\n  ${ref.id}: ${ref.description}`);
        console.log(`  Prompt: ${ref.prompt.slice(0, 120)}...`);
      }
    }

    if (doScenes) {
      console.log('\n## Scene Stills');
      const scenes = sceneFilter
        ? SCENE_PROMPTS.filter((s) => s.video === sceneFilter)
        : SCENE_PROMPTS;
      for (const scene of scenes) {
        console.log(`\n  ${scene.id} (Video ${scene.video}):`);
        console.log(`  Prompt: ${scene.prompt.slice(0, 120)}...`);
      }
    }

    const refCount = doReference ? KUTTAN_REFERENCE_PROMPTS.length : 0;
    const sceneCount = doScenes
      ? (sceneFilter ? 1 : SCENE_PROMPTS.length)
      : 0;
    const total = refCount + sceneCount;
    console.log(`\nTotal images: ${total} (~$${(total * 0.04).toFixed(2)} estimated)`);
    return;
  }

  const apiKey = loadApiKey();
  console.log('API key loaded.\n');

  // Ensure output dirs
  if (doReference) fs.mkdirSync(REF_DIR, { recursive: true });
  if (doScenes) fs.mkdirSync(SCENES_DIR, { recursive: true });

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  // Generate reference images
  if (doReference) {
    console.log('--- Kuttan Reference Images ---');
    for (const ref of KUTTAN_REFERENCE_PROMPTS) {
      const outPath = path.join(REF_DIR, `${ref.id}.png`);

      if (fs.existsSync(outPath)) {
        console.log(`  [SKIP] ${ref.id} — exists`);
        skipped++;
        continue;
      }

      console.log(`  Generating: ${ref.id} (${ref.description})`);
      try {
        await generateImage(apiKey, ref.prompt, outPath);
        console.log(`    -> Saved: ${outPath}`);
        generated++;
      } catch (err) {
        console.error(`    -> FAILED: ${(err as Error).message}`);
        failed++;
      }

      await sleep(1000); // Rate limit
    }
  }

  // Generate scene stills
  if (doScenes) {
    console.log('\n--- Scene Stills ---');
    const scenes = sceneFilter
      ? SCENE_PROMPTS.filter((s) => s.video === sceneFilter)
      : SCENE_PROMPTS;

    for (const scene of scenes) {
      const outPath = path.join(SCENES_DIR, `${scene.id}.png`);

      if (fs.existsSync(outPath)) {
        console.log(`  [SKIP] ${scene.id} — exists`);
        skipped++;
        continue;
      }

      console.log(`  Generating: ${scene.id} (Video ${scene.video})`);
      try {
        await generateImage(apiKey, scene.prompt, outPath);
        console.log(`    -> Saved: ${outPath}`);
        generated++;
      } catch (err) {
        console.error(`    -> FAILED: ${(err as Error).message}`);
        failed++;
      }

      await sleep(1000);
    }
  }

  console.log('\n=== Summary ===');
  console.log(`  Generated: ${generated}`);
  console.log(`  Skipped:   ${skipped}`);
  console.log(`  Failed:    ${failed}`);
  console.log(`  Estimated cost: ~$${((generated * 0.04).toFixed(2))}`);
  console.log(`  Output dirs: ${REF_DIR}, ${SCENES_DIR}`);
}

main().catch((err) => {
  console.error('\n[FATAL ERROR]', err);
  process.exit(1);
});
