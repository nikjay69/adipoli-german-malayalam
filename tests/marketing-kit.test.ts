import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("marketing/adipoli-marketing-kit-v0.1");
const MANIFEST = path.join(ROOT, "manifest.json");

type InventoryEntry = {
  path: string;
  bytes: number;
  sha256: string;
  width?: number;
  height?: number;
  safeArea?: string;
};

type Manifest = {
  counts: {
    editableSvgMasters: number;
    pngExports: number;
    contactSheets: number;
    sceneAssets: number;
  };
  inventory: InventoryEntry[];
  ownerSignoff: string[];
  source: { sha256: string };
};

const sha256 = (file: string) =>
  createHash("sha256").update(fs.readFileSync(file)).digest("hex").toUpperCase();

function pngDimensions(file: string) {
  const bytes = fs.readFileSync(file);
  assert.equal(bytes.subarray(1, 4).toString("ascii"), "PNG", `${file} is not a PNG`);
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

const expectedSources = [
  "templates/reel-cover.svg",
  "templates/reel-endcard.svg",
  "templates/feed-1080x1350.svg",
  "templates/announcement-1080.svg",
  "templates/youtube-1280x720.svg",
  "templates/og-1200x630.svg",
  "templates/carousel-master.svg",
  "templates/free-pilot.svg",
  "educational/word-of-day.svg",
  "educational/mistake-repair.svg",
  "educational/cheatsheet-grid.svg",
  "educational/exam-cheatsheet.svg",
  "educational/scene-of-week.svg",
  "promo/title.svg",
  "promo/owner-frame.svg",
  "promo/app-frame.svg",
  "promo/german-example.svg",
  "promo/repair-card.svg",
  "promo/lesson-label.svg",
  "promo/caption.svg",
  "promo/cta.svg",
].sort();

assert.ok(fs.existsSync(MANIFEST), "manifest.json is missing");
const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8")) as Manifest;
assert.equal(manifest.source.sha256, "AFEEEC516489C4EB595C6777946957691988FD0AE3B2396445CFB32C89F535A1");
assert.deepEqual(manifest.counts, {
  editableSvgMasters: 21,
  pngExports: 21,
  contactSheets: 3,
  sceneAssets: 5,
});
assert.equal(manifest.ownerSignoff.length, 5);

const actualFiles = fs.readdirSync(ROOT, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => path.relative(ROOT, path.join(entry.parentPath, entry.name)).replaceAll("\\", "/"))
  .filter((file) => file !== "manifest.json")
  .sort();
const declaredFiles = manifest.inventory.map((entry) => entry.path).sort();
assert.deepEqual(declaredFiles, actualFiles, "manifest inventory must exactly match the package folder");

for (const entry of manifest.inventory) {
  const absolute = path.join(ROOT, entry.path);
  assert.equal(fs.statSync(absolute).size, entry.bytes, `${entry.path} byte count drifted`);
  assert.equal(sha256(absolute), entry.sha256, `${entry.path} hash drifted`);
}

const sourceFiles = actualFiles.filter((file) => /^(templates|educational|promo)\/.+\.svg$/.test(file)).sort();
assert.deepEqual(sourceFiles, expectedSources, "the promised 21-source master set changed");

const bannedCopy = [
  /guaranteed[- ]pass/i,
  /pass rate/i,
  /limited time/i,
  /discount/i,
  /Goethe-Institut/i,
  /Kerala Style/i,
  /Kuttan/i,
  /Frau Weber/i,
  /A2\/B1/i,
];

for (const sourceFile of sourceFiles) {
  const absolute = path.join(ROOT, sourceFile);
  const source = fs.readFileSync(absolute, "utf8");
  const width = Number(source.match(/<svg[^>]* width="(\d+)"/)?.[1]);
  const height = Number(source.match(/<svg[^>]* height="(\d+)"/)?.[1]);
  assert.ok(width > 0 && height > 0, `${sourceFile} must declare dimensions`);
  assert.ok(source.includes(`viewBox="0 0 ${width} ${height}"`), `${sourceFile} viewBox must match dimensions`);
  assert.ok(source.includes("EDITING-GUIDES"), `${sourceFile} must preserve editable guides`);
  const approvedColours = ["#102018", "#0C1811", "#F5F0E8", "#D4A520", "#F1D27A", "#17606B", "#B95B33"];
  assert.ok(approvedColours.filter((colour) => source.includes(colour)).length >= 2, `${sourceFile} must use the approved colour system`);
  assert.ok(!/href="https?:|@import\s+url\(\s*["']?https?:/i.test(source), `${sourceFile} must not depend on external URLs`);
  assert.ok(!/<script\b/i.test(source), `${sourceFile} must not contain scripts`);
  for (const pattern of bannedCopy) assert.ok(!pattern.test(source), `${sourceFile} contains banned copy: ${pattern}`);

  for (const match of source.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    assert.ok(href.startsWith("../assets/scenes/"), `${sourceFile} has a non-package image reference`);
    assert.ok(fs.existsSync(path.resolve(path.dirname(absolute), href)), `${sourceFile} references missing ${href}`);
  }

  const exportFile = path.join(ROOT, "exports", sourceFile.replace(/\.svg$/, ".png"));
  assert.ok(fs.existsSync(exportFile), `${sourceFile} is missing its PNG export`);
  assert.deepEqual(pngDimensions(exportFile), { width, height }, `${sourceFile} export dimensions drifted`);

  const sourceEntry = manifest.inventory.find((entry) => entry.path === sourceFile);
  const exportEntry = manifest.inventory.find((entry) => entry.path === path.relative(ROOT, exportFile).replaceAll("\\", "/"));
  assert.deepEqual({ width: sourceEntry?.width, height: sourceEntry?.height }, { width, height });
  assert.deepEqual({ width: exportEntry?.width, height: exportEntry?.height }, { width, height });
  assert.ok(sourceEntry?.safeArea && exportEntry?.safeArea, `${sourceFile} must document its safe area`);
}

assert.match(fs.readFileSync(path.join(ROOT, "templates/reel-endcard.svg"), "utf8"), /\[HANDLE TBD\]/);
assert.match(fs.readFileSync(path.join(ROOT, "templates/free-pilot.svg"), "utf8"), /\[N\]/);
assert.match(fs.readFileSync(path.join(ROOT, "promo/owner-frame.svg"), "utf8"), /\[NAME TBD\]/);
assert.match(fs.readFileSync(path.join(ROOT, "educational/exam-cheatsheet.svg"), "utf8"), /\[OWNER VERIFIES FACTS\]/);
assert.match(fs.readFileSync(path.join(ROOT, "templates/carousel-master.svg"), "utf8"), /VARIANT-COVER/);
assert.match(fs.readFileSync(path.join(ROOT, "templates/carousel-master.svg"), "utf8"), /VARIANT-CONTENT/);
assert.match(fs.readFileSync(path.join(ROOT, "templates/carousel-master.svg"), "utf8"), /VARIANT-QUIET-CTA/);

const promoTitle = fs.readFileSync(path.join(ROOT, "promo/title.svg"), "utf8");
assert.match(promoTitle, /class="impact" font-stretch="125%"[^>]*>ADIPOLI GERMAN<\/text>/, "promo opening title must use the canonical 125% Archivo wordmark treatment");
const builder = fs.readFileSync(path.resolve("scripts/build-marketing-kit.mts"), "utf8");
assert.match(builder, /Archivo:wdth,wght@62\.\.125,300\.\.900/, "marketing exports must load Archivo's approved width axis");
assert.match(fs.readFileSync(path.resolve(".gitattributes"), "utf8"), /marketing\/adipoli-marketing-kit-v0\.1\/\*\* -text/, "marketing-kit hashes must be protected from checkout line-ending conversion");

for (const preview of ["templates", "educational", "promo"]) {
  const file = path.join(ROOT, "preview", `${preview}-contact-sheet.png`);
  const dimensions = pngDimensions(file);
  assert.equal(dimensions.width, 1440);
  assert.ok(dimensions.height >= 600, `${preview} contact sheet is unexpectedly short`);
}

console.log("marketing-kit: 21 editable masters, exports, copy guardrails, safe areas, placeholders, hashes, and review sheets verified");
