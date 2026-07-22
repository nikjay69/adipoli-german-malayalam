import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import puppeteer, { type Browser, type Page } from "puppeteer";

const ROOT = path.resolve("marketing/adipoli-marketing-kit-v0.1");
const CREAM = "#F5F0E8";
const FOREST = "#102018";
const FOREST_DARK = "#0C1811";
const GOLD = "#D4A520";
const GOLD_BRIGHT = "#F1D27A";
const TEAL = "#17606B";
const RUST = "#B95B33";
const MUTED = "#66756A";
const SOFT = "#8FA093";

type Category = "templates" | "educational" | "promo";
type Master = {
  category: Category;
  file: string;
  label: string;
  width: number;
  height: number;
  safeArea: string;
  ownerSignoff?: string[];
  svg: string;
};

const ensureDir = (dir: string) => fs.mkdirSync(dir, { recursive: true });
const sha256 = (file: string) =>
  createHash("sha256").update(fs.readFileSync(file)).digest("hex").toUpperCase();

const css = `
  .impact { font-family: 'Archivo', 'Arial Narrow', Arial, sans-serif; font-weight: 800; }
  .serif { font-family: 'Source Serif 4', Georgia, serif; font-weight: 600; }
  .ui { font-family: 'Geist', Arial, sans-serif; }
  .mono { font-family: 'Geist Mono', 'Courier New', monospace; }
  text { text-rendering: geometricPrecision; }
`;

function svg(width: number, height: number, label: string, body: string, guides = "") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <title>${label}</title>
  <style>${css}</style>
${body}
  <g id="EDITING-GUIDES" style="display:none">${guides}</g>
</svg>
`;
}

function mark(x: number, y: number, size: number, reversed = false, opacity = 1) {
  const scale = size / 48;
  return `<g id="triangle-a" transform="translate(${x} ${y}) scale(${scale})" opacity="${opacity}">
    <path d="M24 6 L40 40 H33.6 L24 19.4 L14.4 40 H8 Z" fill="${reversed ? CREAM : FOREST}"/>
    <path d="M20.7 32 H27.3 L31 40 H17 Z" fill="${GOLD}"/>
  </g>`;
}

function tile(x: number, y: number, size: number) {
  const inset = size * 0.14;
  return `<g id="triangle-a-tile"><rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${size * 0.23}" fill="${FOREST}"/>${mark(x + inset, y + inset, size - inset * 2, true)}</g>`;
}

function wordmark(x: number, y: number, size: number, reversed = false, stacked = false) {
  const textColor = reversed ? CREAM : FOREST;
  const text = stacked
    ? `<text x="${x + size + 24}" y="${y + size * 0.43}" class="impact" font-size="${size * 0.32}" fill="${textColor}"><tspan x="${x + size + 24}">ADIPOLI</tspan><tspan x="${x + size + 24}" dy="${size * 0.34}">GERMAN</tspan></text>`
    : `<text x="${x + size + 24}" y="${y + size * 0.64}" class="impact" font-size="${size * 0.34}" letter-spacing="0.5" fill="${textColor}">ADIPOLI GERMAN</text>`;
  return `<g id="brand-lockup">${mark(x, y, size, reversed)}${text}</g>`;
}

function rectGuide(x: number, y: number, width: number, height: number, label: string) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="none" stroke="${RUST}" stroke-width="4" stroke-dasharray="14 12"/><text x="${x + 12}" y="${y + 30}" class="mono" font-size="20" fill="${RUST}">${label}</text>`;
}

function image(id: string, href: string, x: number, y: number, width: number, height: number, position = "xMidYMid slice") {
  return `<g id="${id}"><rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${FOREST_DARK}"/><image href="../assets/scenes/${href}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="${position}"/></g>`;
}

const reelCover = svg(1080, 1920, "Adipoli German reel cover", `
  <defs><linearGradient id="reel-shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${FOREST_DARK}" stop-opacity=".5"/><stop offset=".34" stop-color="${FOREST_DARK}" stop-opacity=".12"/><stop offset=".64" stop-color="${FOREST_DARK}" stop-opacity=".8"/><stop offset="1" stop-color="${FOREST_DARK}" stop-opacity=".98"/></linearGradient></defs>
  ${image("EDITABLE-SCENE", "hub-chayakkada.jpg", 0, 0, 1080, 1920)}
  <rect width="1080" height="1920" fill="url(#reel-shade)"/>
  ${wordmark(72, 166, 72, true)}
  <g id="EDITABLE-COPY">
    <text x="72" y="1310" class="mono" font-size="34" font-weight="600" letter-spacing="5" fill="${GOLD_BRIGHT}">THE GOETHE A1 COURSE FOR MALAYALIS</text>
    <text x="72" y="1435" class="impact" font-size="112" fill="${CREAM}"><tspan x="72">HEAR IT.</tspan><tspan x="72" dy="112">SAY IT.</tspan><tspan x="72" dy="112">REPAIR IT.</tspan><tspan x="72" dy="112">PROVE IT.</tspan></text>
  </g>
`, rectGuide(60, 140, 960, 1640, "REEL SAFE AREA · 140 PX TOP/BOTTOM"));

const reelEndcard = svg(1080, 1920, "Adipoli German reel end card", `
  <rect width="1080" height="1920" fill="${FOREST}"/>
  ${mark(432, 320, 216, true)}
  <g id="EDITABLE-COPY" text-anchor="middle">
    <text x="540" y="760" class="impact" font-size="90" fill="${CREAM}"><tspan x="540">BUILD EVIDENCE</tspan><tspan x="540" dy="104">THAT YOU’RE</tspan><tspan x="540" dy="104">A1 READY.</tspan></text>
    <text x="540" y="1160" class="mono" font-size="35" font-weight="600" letter-spacing="6" fill="${GOLD}">VIDEO-LED · APP-SUPPORTED</text>
    <rect x="280" y="1260" width="520" height="108" rx="24" fill="${GOLD}"/>
    <text x="540" y="1330" class="ui" font-size="38" font-weight="700" fill="${FOREST}">Follow [HANDLE TBD]</text>
  </g>
`, rectGuide(60, 140, 960, 1640, "REEL SAFE AREA · 140 PX TOP/BOTTOM"));

const feed = svg(1080, 1350, "Adipoli German lesson-drop feed post", `
  <rect width="1080" height="1350" fill="${CREAM}"/>
  ${image("EDITABLE-SCENE", "hub-library.jpg", 0, 0, 1080, 790)}
  <g id="EDITABLE-COPY">
    <text x="72" y="885" class="mono" font-size="30" font-weight="700" letter-spacing="6" fill="#8A5A2A">LESSON DROP</text>
    <text x="72" y="980" class="serif" font-size="60" fill="${FOREST}"><tspan x="72">Wie viel kostet das? —</tspan><tspan x="72" dy="76">asking prices without panic</tspan></text>
    ${wordmark(72, 1215, 50, false)}
    <text x="1008" y="1250" text-anchor="end" class="mono" font-size="28" font-weight="500" fill="${MUTED}">M3 · MARKET</text>
  </g>
`, rectGuide(60, 60, 960, 1230, "FEED SAFE AREA · 60 PX"));

const announcement = svg(1080, 1080, "Adipoli German announcement post", `
  <rect width="1080" height="1080" fill="${FOREST}"/>
  ${mark(100, 112, 126, true)}
  <g id="EDITABLE-COPY">
    <text x="100" y="420" class="serif" font-size="78" fill="${CREAM}"><tspan x="100">56 dense owner-led</tspan><tspan x="100" dy="100">lessons. Every one</tspan><tspan x="100" dy="100">builds exam evidence.</tspan></text>
    <text x="100" y="860" class="mono" font-size="31" font-weight="700" letter-spacing="6" fill="${GOLD}">ANNOUNCEMENT TEMPLATE</text>
  </g>
`, rectGuide(60, 60, 960, 960, "FEED SAFE AREA · 60 PX"));

const youtube = svg(1280, 720, "Adipoli German YouTube thumbnail", `
  <defs><linearGradient id="yt-shade" x1="0" y1="0" x2="1" y2="0"><stop offset=".25" stop-color="${FOREST_DARK}" stop-opacity=".97"/><stop offset=".67" stop-color="${FOREST_DARK}" stop-opacity=".3"/><stop offset="1" stop-color="${FOREST_DARK}" stop-opacity=".06"/></linearGradient></defs>
  ${image("EDITABLE-SCENE", "hub-dream-platform.jpg", 0, 0, 1280, 720)}
  <rect width="1280" height="720" fill="url(#yt-shade)"/>
  ${wordmark(54, 48, 58, true)}
  <g id="EDITABLE-COPY">
    <text x="54" y="260" class="impact" font-size="92" fill="${CREAM}"><tspan x="54">HEAR IT.</tspan><tspan x="54" dy="92">SAY IT.</tspan><tspan x="54" dy="92" fill="${GOLD_BRIGHT}">PROVE IT.</tspan></text>
    <text x="54" y="650" class="mono" font-size="27" font-weight="600" letter-spacing="4" fill="#C8D0C9">LESSON 12 · AM BAHNHOF</text>
  </g>
`, `${rectGuide(24, 24, 1232, 672, "YOUTUBE SAFE AREA · 24 PX")}<rect x="1040" y="590" width="216" height="106" fill="none" stroke="${RUST}" stroke-width="4" stroke-dasharray="14 12"/><text x="1052" y="626" class="mono" font-size="18" fill="${RUST}">TIMESTAMP AVOID</text>`);

const og = svg(1200, 630, "Adipoli German Open Graph share image", `
  <rect width="1200" height="630" fill="${CREAM}"/>
  <g id="EDITABLE-COPY">
    ${tile(72, 84, 76)}
    <text x="176" y="133" class="impact" font-size="37" fill="${FOREST}">ADIPOLI GERMAN</text>
    <text x="72" y="265" class="serif" font-size="55" fill="${FOREST}"><tspan x="72">The Goethe A1 course</tspan><tspan x="72" dy="70">for Malayalis</tspan></text>
    <text x="72" y="445" class="ui" font-size="30" fill="#3F4D44"><tspan x="72">Video-led. App-supported.</tspan><tspan x="72" dy="45">Build evidence that you’re A1 ready.</tspan></text>
  </g>
  ${image("EDITABLE-SCENE", "hub-thrissur-home.jpg", 700, 0, 500, 630)}
`, rectGuide(40, 40, 1120, 550, "OPEN GRAPH SAFE AREA · 40 PX"));

const carousel = svg(1080, 1350, "Adipoli German carousel master", `
  <rect width="1080" height="1350" fill="${FOREST}"/>
  <g id="VARIANT-COVER">
    ${wordmark(80, 78, 54, true)}
    <text x="1000" y="120" text-anchor="end" class="mono" font-size="29" font-weight="700" fill="${GOLD}">01 / 07</text>
    <g id="EDITABLE-COPY">
      <text x="80" y="515" class="mono" font-size="32" font-weight="700" letter-spacing="7" fill="${GOLD}">CAROUSEL MASTER</text>
      <text x="80" y="640" class="serif" font-size="74" fill="${CREAM}"><tspan x="80">Hook slide asks the</tspan><tspan x="80" dy="92">question your learner</tspan><tspan x="80" dy="92">is already asking.</tspan></text>
      <text x="80" y="1200" class="ui" font-size="31" font-weight="500" fill="${SOFT}">Swipe → · 5–7 slides · last slide is always the quiet CTA</text>
    </g>
  </g>
  <g id="VARIANT-CONTENT" style="display:none"><rect width="1080" height="1350" fill="${CREAM}"/><text x="80" y="120" class="mono" font-size="28" fill="${RUST}">02 · CONTENT</text><text x="80" y="300" class="serif" font-size="72" fill="${FOREST}">One idea per slide.</text><rect x="80" y="390" width="920" height="620" rx="24" fill="#FFFFFF" stroke="${FOREST}" stroke-opacity=".16"/><text x="120" y="470" class="ui" font-size="36" fill="${MUTED}">[EDITABLE CONTENT]</text>${wordmark(80, 1180, 48, false)}</g>
  <g id="VARIANT-QUIET-CTA" style="display:none"><rect width="1080" height="1350" fill="${FOREST}"/>${mark(432, 250, 216, true)}<text x="540" y="650" text-anchor="middle" class="serif" font-size="72" fill="${CREAM}">Build evidence that</text><text x="540" y="735" text-anchor="middle" class="serif" font-size="72" fill="${CREAM}">you’re A1 ready.</text><text x="540" y="900" text-anchor="middle" class="ui" font-size="34" fill="${GOLD}">[HANDLE TBD]</text></g>
`, rectGuide(60, 60, 960, 1230, "FEED SAFE AREA · 60 PX"));

const freePilot = svg(1080, 1350, "Adipoli German free-pilot recruitment template", `
  <rect width="1080" height="1350" fill="#F7EAD0"/>
  <rect x="7" y="7" width="1066" height="1336" rx="28" fill="none" stroke="${RUST}" stroke-width="7" stroke-dasharray="24 18"/>
  ${wordmark(80, 90, 60, false)}
  <g id="EDITABLE-COPY">
    <rect x="78" y="485" width="178" height="105" rx="10" fill="${GOLD_BRIGHT}" opacity=".74"/>
    <text x="80" y="460" class="serif" font-size="82" fill="${FOREST}"><tspan x="80">Free pilot —</tspan><tspan x="80" dy="112"><tspan fill="${FOREST}">[N]</tspan> seats for the</tspan><tspan x="80" dy="112">first batch.</tspan></text>
    <text x="80" y="900" class="ui" font-size="34" fill="#3F4D44"><tspan x="80">Owner sets seat count and dates at publish time.</tspan><tspan x="80" dy="52">No dates or scarcity are baked in.</tspan></text>
    <rect x="80" y="1050" width="360" height="94" rx="20" fill="${FOREST}"/>
    <text x="260" y="1110" text-anchor="middle" class="ui" font-size="31" font-weight="700" fill="${CREAM}">Apply — link in bio</text>
  </g>
`, rectGuide(60, 60, 960, 1230, "FEED SAFE AREA · 60 PX"));

const wordOfDay = svg(1080, 1350, "Adipoli German word-of-the-day educational post", `
  <defs><radialGradient id="word-glow"><stop offset="0" stop-color="${GOLD_BRIGHT}" stop-opacity=".18"/><stop offset=".72" stop-color="${GOLD_BRIGHT}" stop-opacity="0"/></radialGradient></defs>
  <rect width="1080" height="1350" fill="${FOREST}"/><circle cx="910" cy="120" r="330" fill="url(#word-glow)"/>
  <text x="1000" y="1325" text-anchor="end" class="serif" font-size="660" font-weight="700" fill="${CREAM}" opacity=".045">F</text>
  <text x="80" y="115" class="mono" font-size="31" font-weight="700" letter-spacing="6" fill="${GOLD}">WORT DES TAGES</text>${mark(945, 70, 48, true)}
  <g id="EDITABLE-COPY">
    <rect x="80" y="380" width="100" height="55" rx="10" fill="${GOLD_BRIGHT}"/><text x="130" y="418" text-anchor="middle" class="mono" font-size="29" font-weight="800" fill="${FOREST}">die</text>
    <text x="80" y="555" class="serif" font-size="132" fill="${CREAM}">Fahrkarte</text>
    <text x="80" y="645" class="ui" font-size="44" font-weight="600" fill="${GOLD_BRIGHT}">ticket · യാത്രാ ടിക്കറ്റ്</text>
    <rect x="80" y="700" width="550" height="70" rx="35" fill="${CREAM}" opacity=".08"/><text x="110" y="747" class="mono" font-size="32" font-weight="500" fill="${SOFT}">[ˈfaːɐ̯kaʁtə] · die, -n</text>
    <rect x="80" y="985" width="8" height="170" fill="${GOLD}"/><text x="120" y="1040" class="serif" font-size="49" font-style="italic" fill="${CREAM}"><tspan x="120">„Eine Fahrkarte nach</tspan><tspan x="120" dy="72">Berlin, bitte.“</tspan></text>
  </g>
`, rectGuide(60, 60, 960, 1230, "FEED SAFE AREA · 60 PX"));

const mistakeRepair = svg(1080, 1350, "Adipoli German mistake-repair educational post", `
  <rect width="1080" height="1350" fill="${CREAM}"/>
  <text x="80" y="115" class="mono" font-size="31" font-weight="700" letter-spacing="6" fill="#8A5A2A">SAG ES RICHTIG</text>${mark(945, 70, 48)}
  <g id="EDITABLE-COPY">
    <rect x="80" y="230" width="920" height="285" rx="30" fill="#F9E2D8" stroke="${RUST}" stroke-opacity=".42" stroke-width="5"/>
    <text x="130" y="320" class="mono" font-size="31" font-weight="800" letter-spacing="5" fill="${RUST}">✕ DER FEHLER</text>
    <text x="130" y="425" class="mono" font-size="55" font-weight="600" text-decoration="line-through" fill="${RUST}">Ich bin 25 Jahre.</text>
    <circle cx="540" cy="535" r="65" fill="${GOLD_BRIGHT}"/><text x="540" y="558" text-anchor="middle" class="ui" font-size="56" font-weight="800" fill="${FOREST}">↓</text>
    <rect x="80" y="555" width="920" height="305" rx="30" fill="#DCEBE9" stroke="${TEAL}" stroke-opacity=".42" stroke-width="5"/>
    <text x="130" y="670" class="mono" font-size="31" font-weight="800" letter-spacing="5" fill="${TEAL}">✓ DIE REPARATUR</text>
    <text x="130" y="780" class="mono" font-size="55" font-weight="600" fill="${TEAL}">Ich bin 25 Jahre <tspan fill="${FOREST}" style="paint-order:stroke;stroke:${GOLD_BRIGHT};stroke-width:24px;stroke-linejoin:round">alt</tspan>.</text>
    <text x="80" y="1060" class="ui" font-size="38" fill="#3F4D44"><tspan x="80">One slip, one fix, one habit.</tspan><tspan x="80" dy="58" font-weight="700">Say the repaired line aloud — twice.</tspan></text>
  </g>
`, rectGuide(60, 60, 960, 1230, "FEED SAFE AREA · 60 PX"));

const wQuestions = [
  ["Wer?", "who · ആര്?"], ["Was?", "what · എന്ത്?"], ["Wo?", "where · എവിടെ?"],
  ["Wann?", "when · എപ്പോൾ?"], ["Wie?", "how · എങ്ങനെ?"], ["Warum?", "why · എന്തുകൊണ്ട്?"],
];
const questionCards = wQuestions.map(([q, gloss], index) => {
  const col = index % 2;
  const row = Math.floor(index / 2);
  const x = 80 + col * 470;
  const y = 375 + row * 205;
  return `<g id="QUESTION-${index + 1}"><rect x="${x}" y="${y}" width="430" height="165" rx="24" fill="#FFFFFF" stroke="${FOREST}" stroke-opacity=".14" stroke-width="3"/><text x="${x + 35}" y="${y + 68}" class="serif" font-size="51" fill="${FOREST}"><tspan fill="#8A5A2A">W</tspan>${q.slice(1)}</text><text x="${x + 35}" y="${y + 122}" class="ui" font-size="30" fill="${MUTED}">${gloss}</text></g>`;
}).join("\n");

const cheatsheetGrid = svg(1080, 1350, "Adipoli German W-question cheatsheet", `
  <rect width="1080" height="1350" fill="${CREAM}"/>
  <text x="80" y="115" class="mono" font-size="29" font-weight="700" letter-spacing="5" fill="#8A5A2A">SPICKZETTEL · CHEATSHEET</text>${mark(945, 70, 48)}
  <text x="80" y="270" class="serif" font-size="76" fill="${FOREST}">The 6 <tspan fill="#8A5A2A">W</tspan>-questions</text>
  <g id="EDITABLE-COPY">${questionCards}</g>
  <rect x="80" y="1080" width="105" height="52" rx="9" fill="${GOLD_BRIGHT}"/><text x="132" y="1116" text-anchor="middle" class="mono" font-size="24" font-weight="800" fill="${FOREST}">SAVE</text>
  <text x="210" y="1118" class="ui" font-size="29" fill="${MUTED}">Every W-question appears in Hören Teil 1.</text>
  <text x="210" y="1170" class="mono" font-size="22" fill="${RUST}">[OWNER VERIFIES EXAM FACT]</text>
`, rectGuide(60, 60, 960, 1230, "FEED SAFE AREA · 60 PX"));

const examRows = [
  ["Hören", "3 Teile", "≈20 MIN"], ["Lesen", "3 Teile", "≈25 MIN"],
  ["Schreiben", "2 Teile", "≈20 MIN"], ["Sprechen", "3 Teile", "≈15 MIN"],
];
const examCards = examRows.map(([skill, parts, time], index) => {
  const y = 485 + index * 130;
  return `<g><rect x="80" y="${y}" width="920" height="100" rx="18" fill="${CREAM}" opacity=".07"/><text x="115" y="${y + 63}" class="ui" font-size="36" fill="${CREAM}"><tspan font-weight="700">${skill}</tspan> · ${parts}</text><text x="955" y="${y + 63}" text-anchor="end" class="mono" font-size="31" fill="${GOLD_BRIGHT}">${time}</text></g>`;
}).join("\n");

const examCheatsheet = svg(1080, 1350, "Adipoli German exam-format cheatsheet", `
  <rect width="1080" height="1350" fill="${FOREST}"/><text x="1040" y="1340" text-anchor="end" class="impact" font-size="600" fill="${CREAM}" opacity=".04">A1</text>
  <text x="80" y="115" class="mono" font-size="29" font-weight="700" letter-spacing="5" fill="${GOLD}">PRÜFUNGS-SPICKZETTEL</text>${mark(945, 70, 48, true)}
  <text x="80" y="275" class="serif" font-size="73" fill="${CREAM}"><tspan x="80">Goethe A1: the exam</tspan><tspan x="80" dy="85">at a <tspan fill="${GOLD_BRIGHT}" font-style="italic">glance</tspan></tspan></text>
  <g id="EDITABLE-OWNER-VERIFIED-FACTS">${examCards}</g>
  <text x="80" y="1095" class="ui" font-size="28" fill="${SOFT}"><tspan x="80">Format summary for orientation — always confirm current</tspan><tspan x="80" dy="44">details with the exam centre.</tspan></text>
  <rect x="80" y="1190" width="460" height="58" rx="10" fill="${GOLD_BRIGHT}" opacity=".16"/><text x="105" y="1228" class="mono" font-size="24" fill="${GOLD_BRIGHT}">[OWNER VERIFIES FACTS]</text>
`, rectGuide(60, 60, 960, 1230, "FEED SAFE AREA · 60 PX"));

const sceneOfWeek = svg(1080, 1350, "Adipoli German scene-of-the-week post", `
  <defs><linearGradient id="scene-shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${FOREST_DARK}" stop-opacity=".08"/><stop offset="1" stop-color="${FOREST_DARK}" stop-opacity=".82"/></linearGradient></defs>
  <rect width="1080" height="1350" fill="${CREAM}"/>${image("EDITABLE-SCENE", "hub-chayakkada.jpg", 0, 0, 1080, 470)}<rect width="1080" height="470" fill="url(#scene-shade)"/>
  <text x="70" y="405" class="mono" font-size="30" font-weight="700" letter-spacing="5" fill="${GOLD_BRIGHT}">SZENE DER WOCHE · BEIM BÄCKER</text>${mark(945, 65, 48, true)}
  <g id="EDITABLE-DIALOGUE">
    <text x="70" y="585" class="serif" font-size="56" fill="${FOREST}">Three lines are enough:</text>
    <rect x="70" y="645" width="420" height="102" rx="28" fill="${FOREST}"/><text x="110" y="710" class="mono" font-size="34" font-weight="500" fill="${CREAM}">Guten Morgen!</text>
    <rect x="430" y="785" width="575" height="102" rx="28" fill="${GOLD_BRIGHT}"/><text x="470" y="850" class="mono" font-size="34" font-weight="500" fill="${FOREST}">Zwei Brötchen, bitte.</text>
    <rect x="70" y="925" width="430" height="102" rx="28" fill="${FOREST}"/><text x="110" y="990" class="mono" font-size="34" font-weight="500" fill="${CREAM}">Danke, tschüss!</text>
    <text x="70" y="1185" class="ui" font-size="29" fill="${MUTED}">Module 3 micro-dialogue · say it aloud before you scroll.</text>
  </g>
`, rectGuide(60, 60, 960, 1230, "FEED SAFE AREA · 60 PX"));

function promoFrame(label: string, body: string, guides = "") {
  return svg(1920, 1080, label, body, guides);
}

const promoTitle = promoFrame("Adipoli German promo opening title", `
  <rect width="1920" height="1080" fill="${FOREST}"/>
  ${mark(816, 215, 288, true)}
  <text x="960" y="645" text-anchor="middle" class="impact" font-stretch="125%" font-size="106" fill="${CREAM}">ADIPOLI GERMAN</text>
  <rect x="490" y="730" width="940" height="3" fill="${GOLD}"/>
  <text x="960" y="820" text-anchor="middle" class="mono" font-size="36" font-weight="700" letter-spacing="9" fill="${GOLD}">THE GOETHE A1 COURSE FOR MALAYALIS</text>
`);

const ownerFrame = promoFrame("Adipoli German owner-video frame", `
  <defs><pattern id="owner-slot" width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="24" height="48" fill="#13241B"/><rect x="24" width="24" height="48" fill="#0F1D15"/></pattern><linearGradient id="owner-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${FOREST_DARK}" stop-opacity="0"/><stop offset="1" stop-color="${FOREST_DARK}" stop-opacity=".95"/></linearGradient></defs>
  <rect width="1920" height="1080" fill="url(#owner-slot)"/>
  <rect x="560" y="330" width="800" height="150" rx="22" fill="none" stroke="${SOFT}" stroke-opacity=".55" stroke-width="5" stroke-dasharray="20 16"/><text x="960" y="420" text-anchor="middle" class="mono" font-size="41" font-weight="700" letter-spacing="6" fill="${SOFT}">OWNER FOOTAGE · 16:9 SLOT</text>
  <rect y="760" width="1920" height="320" fill="url(#owner-fade)"/>
  <rect x="72" y="860" width="9" height="115" rx="4" fill="${GOLD}"/>
  <g id="OWNER-SIGNOFF"><text x="120" y="908" class="ui" font-size="46" font-weight="700" fill="${CREAM}">Owner-teacher <tspan fill="${GOLD_BRIGHT}">[NAME TBD]</tspan></text><text x="120" y="962" class="mono" font-size="29" font-weight="500" letter-spacing="4" fill="${SOFT}">FOUNDER · ADIPOLI GERMAN</text></g>
  ${mark(1790, 922, 72, true, .55)}
`);

const appFrame = promoFrame("Adipoli German app-demo promo frame", `
  <rect width="1920" height="1080" fill="${FOREST}"/>
  <g id="EDITABLE-APP-SCREEN"><rect x="360" y="110" width="430" height="860" rx="70" fill="${CREAM}" stroke="${CREAM}" stroke-opacity=".24" stroke-width="16"/><rect x="405" y="260" width="340" height="520" rx="24" fill="#FFFFFF" stroke="${FOREST}" stroke-opacity=".1"/><circle cx="575" cy="465" r="58" fill="${FOREST}" opacity=".08"/>${mark(535, 425, 80)}<text x="575" y="835" text-anchor="middle" class="mono" font-size="29" fill="${MUTED}">APP SCREEN SLOT</text></g>
  <g id="EDITABLE-CALLOUT"><text x="920" y="365" class="mono" font-size="34" font-weight="700" letter-spacing="7" fill="${GOLD}">IN THE APP</text><text x="920" y="490" class="serif" font-size="74" fill="${CREAM}"><tspan x="920">Callout line describes</tspan><tspan x="920" dy="92">exactly what the</tspan><tspan x="920" dy="92">screen is doing.</tspan></text></g>
`);

const germanExample = promoFrame("Adipoli German example-card promo frame", `
  <rect width="1920" height="1080" fill="${CREAM}"/>
  <g id="EDITABLE-GERMAN" text-anchor="middle"><text x="960" y="455" class="serif" font-size="125" fill="${FOREST}">„Wo ist der Bahnhof?“</text><text x="960" y="575" class="ui" font-size="55" font-weight="500" fill="#3F4D44">Where is the station? · സ്റ്റേഷൻ എവിടെയാണ്?</text><text x="960" y="680" class="mono" font-size="43" font-weight="500" fill="#8A5A2A">[voː ɪst deːɐ̯ ˈbaːnhoːf]</text></g>
`);

const repairCard = promoFrame("Adipoli German mistake-repair promo frame", `
  <rect width="1920" height="1080" fill="${CREAM}"/>
  <g id="EDITABLE-SLIP" text-anchor="middle"><text x="570" y="425" class="mono" font-size="39" font-weight="700" letter-spacing="6" fill="${RUST}">SLIP</text><text x="570" y="535" class="mono" font-size="78" font-weight="500" text-decoration="line-through" fill="${RUST}">das Frau</text></g>
  <circle cx="960" cy="485" r="70" fill="${GOLD_BRIGHT}"/><text x="960" y="512" text-anchor="middle" class="ui" font-size="74" font-weight="800" fill="${FOREST}">→</text>
  <g id="EDITABLE-FIX" text-anchor="middle"><text x="1350" y="425" class="mono" font-size="39" font-weight="700" letter-spacing="6" fill="${TEAL}">FIX</text><text x="1350" y="535" class="mono" font-size="88" font-weight="600" fill="${TEAL}">die Frau ✓</text></g>
`);

const lessonLabel = promoFrame("Adipoli German lesson-label promo frame", `
  <rect width="1920" height="1080" fill="${FOREST}"/>
  <g id="EDITABLE-LESSON-LABEL"><rect x="505" y="390" width="170" height="170" rx="36" fill="${CREAM}" opacity=".08" stroke="${CREAM}" stroke-opacity=".24" stroke-width="5"/><text x="590" y="500" text-anchor="middle" class="mono" font-size="68" font-weight="800" fill="${GOLD_BRIGHT}">3</text><text x="735" y="435" class="mono" font-size="34" font-weight="700" letter-spacing="7" fill="${GOLD}">MODUL 3 · AUF DEM MARKT</text><text x="735" y="525" class="ui" font-size="68" font-weight="700" fill="${CREAM}">Lesson 18 · Asking prices</text></g>
`);

const captionFrame = promoFrame("Adipoli German caption-treatment promo frame", `
  ${image("EDITABLE-FOOTAGE", "hub-study-desk.jpg", 0, 0, 1920, 1080)}<rect width="1920" height="1080" fill="${FOREST_DARK}" opacity=".42"/>
  <g id="EDITABLE-CAPTION"><rect x="360" y="680" width="1200" height="150" rx="30" fill="${FOREST_DARK}" opacity=".9"/><text x="960" y="775" text-anchor="middle" class="ui" font-size="52" font-weight="700" fill="${CREAM}">Captions sit in a forest pill — cream text, gold <tspan fill="${GOLD_BRIGHT}">emphasis</tspan> only.</text></g>
`, rectGuide(288, 640, 1344, 230, "CAPTION MAX WIDTH · 70%"));

const ctaFrame = promoFrame("Adipoli German promo CTA end card", `
  <rect width="1920" height="1080" fill="${FOREST}"/>${mark(860, 150, 200, true)}
  <text x="960" y="565" text-anchor="middle" class="serif" font-size="88" fill="${CREAM}">Build evidence that you’re A1 ready.</text>
  <rect x="600" y="665" width="720" height="118" rx="25" fill="${GOLD}"/><text x="960" y="740" text-anchor="middle" class="ui" font-size="44" font-weight="700" fill="${FOREST}">Start with your first German moment</text>
`);

const masters: Master[] = [
  { category: "templates", file: "reel-cover.svg", label: "Reel cover", width: 1080, height: 1920, safeArea: "Keep 140 px clear at top and bottom.", svg: reelCover },
  { category: "templates", file: "reel-endcard.svg", label: "Reel end card", width: 1080, height: 1920, safeArea: "Keep 140 px clear at top and bottom.", ownerSignoff: ["Confirm public social handle."], svg: reelEndcard },
  { category: "templates", file: "feed-1080x1350.svg", label: "Feed post", width: 1080, height: 1350, safeArea: "Keep key content inside 60 px margins.", svg: feed },
  { category: "templates", file: "announcement-1080.svg", label: "Announcement", width: 1080, height: 1080, safeArea: "Keep key content inside 60 px margins.", svg: announcement },
  { category: "templates", file: "youtube-1280x720.svg", label: "YouTube thumbnail", width: 1280, height: 720, safeArea: "Keep 24 px margins and avoid the bottom-right timestamp corner.", svg: youtube },
  { category: "templates", file: "og-1200x630.svg", label: "Open Graph share", width: 1200, height: 630, safeArea: "Keep key content inside 40 px margins.", svg: og },
  { category: "templates", file: "carousel-master.svg", label: "Carousel master", width: 1080, height: 1350, safeArea: "Keep key content inside 60 px margins.", ownerSignoff: ["Confirm public social handle before enabling the quiet CTA layer."], svg: carousel },
  { category: "templates", file: "free-pilot.svg", label: "Free-pilot recruitment", width: 1080, height: 1350, safeArea: "Keep key content inside 60 px margins.", ownerSignoff: ["Set seat count and publication dates at publish time."], svg: freePilot },
  { category: "educational", file: "word-of-day.svg", label: "Word of the day", width: 1080, height: 1350, safeArea: "Keep key content inside 60 px margins.", svg: wordOfDay },
  { category: "educational", file: "mistake-repair.svg", label: "Mistake repair", width: 1080, height: 1350, safeArea: "Keep key content inside 60 px margins.", svg: mistakeRepair },
  { category: "educational", file: "cheatsheet-grid.svg", label: "W-question cheatsheet", width: 1080, height: 1350, safeArea: "Keep key content inside 60 px margins.", ownerSignoff: ["Verify the Hören Teil 1 statement against current exam guidance."], svg: cheatsheetGrid },
  { category: "educational", file: "exam-cheatsheet.svg", label: "Exam cheatsheet", width: 1080, height: 1350, safeArea: "Keep key content inside 60 px margins.", ownerSignoff: ["Verify all exam-format facts against the current exam centre guidance."], svg: examCheatsheet },
  { category: "educational", file: "scene-of-week.svg", label: "Scene of the week", width: 1080, height: 1350, safeArea: "Keep key content inside 60 px margins.", svg: sceneOfWeek },
  { category: "promo", file: "title.svg", label: "Promo opening title", width: 1920, height: 1080, safeArea: "All key artwork is inset inside the frame.", svg: promoTitle },
  { category: "promo", file: "owner-frame.svg", label: "Owner frame", width: 1920, height: 1080, safeArea: "Lower-third and watermark are inset as drawn.", ownerSignoff: ["Replace [NAME TBD] with the confirmed owner name and title."], svg: ownerFrame },
  { category: "promo", file: "app-frame.svg", label: "App demo frame", width: 1920, height: 1080, safeArea: "All key artwork is inset inside the frame.", svg: appFrame },
  { category: "promo", file: "german-example.svg", label: "German example card", width: 1920, height: 1080, safeArea: "All key artwork is inset inside the frame.", svg: germanExample },
  { category: "promo", file: "repair-card.svg", label: "Mistake-repair card", width: 1920, height: 1080, safeArea: "All key artwork is inset inside the frame.", svg: repairCard },
  { category: "promo", file: "lesson-label.svg", label: "Lesson label", width: 1920, height: 1080, safeArea: "All key artwork is inset inside the frame.", svg: lessonLabel },
  { category: "promo", file: "caption.svg", label: "Caption treatment", width: 1920, height: 1080, safeArea: "Caption pill is no wider than 70% of the frame.", svg: captionFrame },
  { category: "promo", file: "cta.svg", label: "CTA end card", width: 1920, height: 1080, safeArea: "All key artwork is inset inside the frame.", svg: ctaFrame },
];

const scenes = ["hub-chayakkada.jpg", "hub-library.jpg", "hub-dream-platform.jpg", "hub-thrissur-home.jpg", "hub-study-desk.jpg"];

for (const dir of ["templates", "educational", "promo", "exports/templates", "exports/educational", "exports/promo", "assets/scenes", "preview"]) {
  ensureDir(path.join(ROOT, dir));
}

for (const scene of scenes) {
  fs.copyFileSync(path.resolve("public/images/scenes", scene), path.join(ROOT, "assets/scenes", scene));
}

for (const master of masters) {
  fs.writeFileSync(path.join(ROOT, master.category, master.file), master.svg, "utf8");
}

async function fontReady(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

function inlineSceneImages(source: string) {
  return source.replace(/href="\.\.\/assets\/scenes\/([^"]+)"/g, (_match, scene: string) => {
    const file = path.join(ROOT, "assets/scenes", scene);
    return `href="data:image/jpeg;base64,${fs.readFileSync(file).toString("base64")}"`;
  });
}

async function renderMaster(browser: Browser, master: Master) {
  const sourcePath = path.join(ROOT, master.category, master.file);
  const exportPath = path.join(ROOT, "exports", master.category, master.file.replace(/\.svg$/, ".png"));
  const source = inlineSceneImages(fs.readFileSync(sourcePath, "utf8"));
  const page = await browser.newPage();
  await page.setViewport({ width: master.width, height: master.height, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=Geist:wght@400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600;700;800&family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&display=swap" rel="stylesheet"><style>html,body{margin:0;width:${master.width}px;height:${master.height}px;overflow:hidden}svg{display:block}</style></head><body>${source}</body></html>`, { waitUntil: "networkidle0", timeout: 60_000 });
  await fontReady(page);
  await page.screenshot({ path: exportPath, clip: { x: 0, y: 0, width: master.width, height: master.height } });
  await page.close();
}

async function renderContactSheet(browser: Browser, category: Category) {
  const items = masters.filter((master) => master.category === category);
  const columns = category === "educational" ? 3 : 4;
  const previewHeight = category === "promo" ? 180 : 390;
  const frameWidth = (1440 - 104 - (columns - 1) * 22) / columns - 32;
  const cards = items.map((master) => {
    const png = path.join(ROOT, "exports", category, master.file.replace(/\.svg$/, ".png"));
    const data = fs.readFileSync(png).toString("base64");
    const scale = Math.min(frameWidth / master.width, previewHeight / master.height);
    return `<article><div class="frame"><img src="data:image/png;base64,${data}" alt="" style="width:${master.width * scale}px;height:${master.height * scale}px"></div><strong>${master.label}</strong><span>${master.width} × ${master.height}</span></article>`;
  }).join("");
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=Geist:wght@400;600&family=Geist+Mono:wght@500&display=swap" rel="stylesheet"><style>*{box-sizing:border-box}body{margin:0;padding:52px;background:#e8e4da;color:${FOREST};font-family:Geist,Arial,sans-serif}header{display:flex;align-items:center;gap:18px;margin-bottom:30px}.mark{width:54px;height:54px;border-radius:13px;background:${FOREST};display:grid;place-items:center}.mark svg{width:38px}h1{font:800 36px Archivo,Arial,sans-serif;margin:0}.sub{font:500 15px 'Geist Mono',monospace;color:${MUTED};margin-top:5px}.grid{display:grid;grid-template-columns:repeat(${columns},1fr);gap:22px}article{background:${CREAM};border:1px solid rgba(16,32,24,.16);border-radius:16px;padding:16px;box-shadow:0 8px 22px rgba(16,32,24,.07)}.frame{height:${previewHeight}px;display:grid;place-items:center;background:#dcd8ce;border-radius:10px;overflow:hidden}.frame img{display:block}strong{display:block;font:700 17px Archivo,Arial,sans-serif;margin-top:12px}span{font:500 12px 'Geist Mono',monospace;color:${MUTED}}</style></head><body><header><div class="mark"><svg viewBox="0 0 48 48"><path d="M24 6 L40 40 H33.6 L24 19.4 L14.4 40 H8 Z" fill="${CREAM}"/><path d="M20.7 32 H27.3 L31 40 H17 Z" fill="${GOLD}"/></svg></div><div><h1>ADIPOLI GERMAN · ${category.toUpperCase()}</h1><div class="sub">EDITABLE SVG MASTERS + VERIFIED PNG EXPORTS</div></div></header><main class="grid">${cards}</main></body></html>`, { waitUntil: "networkidle0", timeout: 60_000 });
  await fontReady(page);
  await page.screenshot({ path: path.join(ROOT, "preview", `${category}-contact-sheet.png`), fullPage: true });
  await page.close();
}

const browser = await puppeteer.launch({ headless: true });
try {
  for (const master of masters) await renderMaster(browser, master);
  for (const category of ["templates", "educational", "promo"] as Category[]) await renderContactSheet(browser, category);
} finally {
  await browser.close();
}

const readme = `# Adipoli German marketing kit v0.1

This is the single upload-ready production folder reconstructed from the owner-approved Stage 2 design board.

## What is inside

- \`templates/\` — 8 editable social and campaign SVG masters.
- \`educational/\` — 5 editable teaching and cheatsheet SVG masters.
- \`promo/\` — 8 editable 1920×1080 owner-led video graphic frames.
- \`exports/\` — verified PNG exports at each master’s published dimensions.
- \`assets/scenes/\` — the five approved scene images referenced by the editable SVGs.
- \`preview/\` — three mobile-friendly contact sheets for rapid visual review.
- \`manifest.md\` and \`manifest.json\` — usage rules, dimensions, safe areas, sign-offs, hashes, and complete inventory.

## Editing

Open any SVG in Figma, Illustrator, Affinity Designer, Inkscape, or a text editor. Named groups such as \`EDITABLE-COPY\`, \`EDITABLE-SCENE\`, and \`OWNER-SIGNOFF\` identify the intended edit points. Keep this entire folder together so relative scene-image links resolve.

Use Archivo for impact/wordmark text, Source Serif 4 for German and editorial lines, Geist for UI/body text, and Geist Mono for labels. All four are available from Google Fonts. The SVGs include sensible fallbacks when those fonts are not installed.

## Publishing guardrails

Use the approved claims verbatim: “The Goethe A1 course for Malayalis.”, “56 dense owner-led lessons.”, “Video-led. App-supported.”, “Hear it. Say it. Repair it. Prove it.”, and “Build evidence that you’re A1 ready.”

Do not add pass guarantees, invented results or testimonials, learner/review counts, prices or discounts, urgency, hour totals, A2/B1 positioning, institutional affiliation, legacy characters, fabricated owner portraits, “Kerala Style” positioning, or unapproved flag imagery.

Resolve every bracketed owner placeholder before publishing. The free-pilot master must stay undated until the owner supplies the publish-time values.
`;
fs.writeFileSync(path.join(ROOT, "README.md"), readme, "utf8");

const table = masters.map((master) => `| ${master.category}/${master.file} | ${master.width}×${master.height} | ${master.safeArea} | ${master.ownerSignoff?.join(" ") ?? "None"} |`).join("\n");
const manifestMd = `# Adipoli German marketing kit manifest

Source: owner-approved \`# 2A Product System Completion (6).zip\`

Source SHA-256: \`AFEEEC516489C4EB595C6777946957691988FD0AE3B2396445CFB32C89F535A1\`

Selected mark: Triangle-A option 4a

| Editable source | Dimensions | Safe area | Owner sign-off |
| --- | ---: | --- | --- |
${table}

## Global safe areas

- Reel 1080×1920: keep 140 px top and bottom clear.
- Feed 1080×1350 and 1080×1080: keep 60 px margins.
- YouTube 1280×720: keep 24 px margins and avoid the bottom-right timestamp corner.
- Open Graph 1200×630: keep 40 px margins.
- Promo frames: use the drawn insets; captions stay within 70% frame width.

## Owner sign-off register

- Confirm the public social handle.
- Replace the owner name/title placeholder in \`promo/owner-frame.svg\`.
- Supply pilot seat count and dates only at publish time.
- Verify exam-format facts against current exam-centre guidance.
- Meera placement remains optional; no character placement is baked into these masters.

The machine-readable inventory in \`manifest.json\` lists every other file in this folder and pins its SHA-256 hash.
`;
fs.writeFileSync(path.join(ROOT, "manifest.md"), manifestMd, "utf8");

const inventoryFiles = fs.readdirSync(ROOT, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => path.relative(ROOT, path.join(entry.parentPath, entry.name)).replaceAll("\\", "/"))
  .filter((file) => file !== "manifest.json")
  .sort();

const masterByPath = new Map(masters.map((master) => [`${master.category}/${master.file}`, master]));
const exportByPath = new Map(masters.map((master) => [`exports/${master.category}/${master.file.replace(/\.svg$/, ".png")}`, master]));
const inventory = inventoryFiles.map((file) => {
  const absolute = path.join(ROOT, file);
  const master = masterByPath.get(file) ?? exportByPath.get(file);
  const extension = path.extname(file).toLowerCase();
  return {
    path: file,
    mimeType: extension === ".svg" ? "image/svg+xml" : extension === ".png" ? "image/png" : extension === ".jpg" ? "image/jpeg" : extension === ".json" ? "application/json" : "text/markdown",
    bytes: fs.statSync(absolute).size,
    sha256: sha256(absolute),
    ...(master ? { width: master.width, height: master.height, safeArea: master.safeArea } : {}),
  };
});

const manifest = {
  schemaVersion: 1,
  packageVersion: "0.1",
  brand: "Adipoli German",
  selectedMark: "4a Triangle-A",
  source: {
    file: "# 2A Product System Completion (6).zip",
    sha256: "AFEEEC516489C4EB595C6777946957691988FD0AE3B2396445CFB32C89F535A1",
    authority: "Owner-approved Stage 2 design board",
  },
  counts: { editableSvgMasters: masters.length, pngExports: masters.length, contactSheets: 3, sceneAssets: scenes.length },
  fonts: ["Archivo", "Source Serif 4", "Geist", "Geist Mono"],
  palette: { forest: FOREST, cream: CREAM, gold: GOLD, goldBright: GOLD_BRIGHT, teal: TEAL, rust: RUST },
  ownerSignoff: [
    "Confirm public social handle.",
    "Confirm owner name and title.",
    "Supply pilot seat count and dates at publish time.",
    "Verify exam-format facts against current exam-centre guidance.",
    "Approve any optional Meera placement separately.",
  ],
  inventory,
};
fs.writeFileSync(path.join(ROOT, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(`Built ${masters.length} editable masters, ${masters.length} PNG exports, and 3 contact sheets in ${ROOT}`);
