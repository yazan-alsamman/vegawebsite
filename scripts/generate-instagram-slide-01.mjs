import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync, existsSync, statSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "marketing", "instagram-carousel");
const sourceLogo = path.join(outDir, "vegacore-logo-source.png");
const logoTransparent = path.join(outDir, "vegacore-logo-transparent.png");
const outputPng = path.join(outDir, "slide-01-intro.png");
const outputHq = path.join(outDir, "slide-01-intro-hq.png");

const DESIGN = 1080;
const EXPORT = parseInt(process.env.EXPORT_SIZE || "2160", 10);
const SCALE = EXPORT / DESIGN;
const W = DESIGN;
const H = DESIGN;
const FONT = "Cairo, Segoe UI, Tahoma, Arial";

function svgOpen(exportSize = EXPORT) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${exportSize}" height="${exportSize}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;
}
const LOGO_WIDTH = 390;
const LOGO_TOP = 16;
const CARD_H = 236;

function fontDataUri(filename) {
  const file = path.join(root, "marketing", "fonts", filename);
  if (!existsSync(file)) return "";
  return `data:font/ttf;base64,${readFileSync(file).toString("base64")}`;
}

function buildFontFaces() {
  const bold = fontDataUri("Cairo-Bold.ttf");
  const semi = fontDataUri("Cairo-SemiBold.ttf");
  const medium = fontDataUri("Cairo-Medium.ttf");
  if (!bold) return "";

  return `<style>
    @font-face { font-family: Cairo; font-weight: 700; src: url('${bold}') format('truetype'); }
    @font-face { font-family: Cairo; font-weight: 600; src: url('${semi}') format('truetype'); }
    @font-face { font-family: Cairo; font-weight: 500; src: url('${medium}') format('truetype'); }
  </style>`;
}

async function makeLogoTransparent() {
  const { data, info } = await sharp(sourceLogo)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r > 238 && g > 238 && b > 238) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(logoTransparent);

  return logoTransparent;
}

function buildBackgroundSvg(exportSize = EXPORT) {
  const nodes = [
    [120, 180], [960, 220], [80, 720], [1000, 680], [200, 900], [880, 860],
    [540, 120], [340, 400], [740, 380], [160, 480], [920, 500],
  ];
  const edges = [
    [0, 6], [1, 6], [6, 7], [6, 8], [7, 9], [8, 10], [2, 9], [3, 10], [4, 2], [5, 3],
  ];

  const networkLines = edges
    .map(([a, b]) => {
      const [x1, y1] = nodes[a];
      const [x2, y2] = nodes[b];
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#3b82f6" stroke-opacity="0.08" stroke-width="1"/>`;
    })
    .join("");

  const networkDots = nodes
    .map(([x, y], i) => {
      const r = i === 6 ? 3.5 : 2;
      const op = i === 6 ? 0.35 : 0.2;
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="#60a5fa" opacity="${op}"/>`;
    })
    .join("");

  return Buffer.from(`${svgOpen(exportSize)}
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#040a14"/>
      <stop offset="40%" stop-color="#0a1628"/>
      <stop offset="100%" stop-color="#0d1b33"/>
    </linearGradient>
    <radialGradient id="orbTL" cx="0%" cy="0%" r="55%">
      <stop offset="0%" stop-color="#1d4ed8" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orbBR" cx="100%" cy="100%" r="50%">
      <stop offset="0%" stop-color="#2563eb" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#2563eb" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="headBand" cx="50%" cy="32%" r="45%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.1"/>
      <stop offset="70%" stop-color="#3b82f6" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="horizon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0"/>
      <stop offset="50%" stop-color="#60a5fa" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.38"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#orbTL)"/>
  <rect width="${W}" height="${H}" fill="url(#orbBR)"/>
  <rect width="${W}" height="${H}" fill="url(#headBand)"/>

  <g opacity="0.045" stroke="#93c5fd" stroke-width="0.7">
    ${Array.from({ length: 18 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="${H}"/>`).join("")}
    ${Array.from({ length: 18 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="${W}" y2="${i * 60}"/>`).join("")}
  </g>

  <g opacity="0.06">
    <line x1="0" y1="340" x2="${W}" y2="340" stroke="url(#horizon)" stroke-width="1"/>
    <line x1="0" y1="520" x2="${W}" y2="520" stroke="url(#horizon)" stroke-width="1"/>
  </g>

  <path d="M-40 780 Q270 720 540 760 T1120 740" fill="none" stroke="#3b82f6" stroke-opacity="0.06" stroke-width="1.5"/>
  <path d="M-20 200 Q300 260 540 220 T1100 180" fill="none" stroke="#60a5fa" stroke-opacity="0.05" stroke-width="1"/>

  <g>${networkLines}${networkDots}</g>

  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>`);
}

function serviceLine(rightX, y, label) {
  return `
    <text x="${rightX - 14}" y="${y}" text-anchor="end" font-family="${FONT}" font-size="16" font-weight="500" fill="#b8c9dc">${label}</text>
    <circle cx="${rightX - 2}" cy="${y - 5}" r="3.5" fill="#60a5fa"/>
  `;
}

function computeLayout(logoHeight) {
  const logoBottom = LOGO_TOP + logoHeight;
  const headlineY1 = logoBottom + 30;
  const headlineY2 = headlineY1 + 76;
  const pillY = headlineY2 + 38;
  const pillH = 48;
  const cardsY = pillY + pillH + 18;

  return {
    logoBottom,
    headlineY1,
    headlineY2,
    pillY,
    pillH,
    cardsY,
    navY: cardsY + CARD_H + 24,
  };
}

function card(x, w, y, num, title, services) {
  const h = CARD_H;
  const pad = 24;
  const rightEdge = x + w - pad;

  const serviceRows = services
    .map((s, i) => serviceLine(rightEdge, y + 108 + i * 34, s))
    .join("");

  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="#0b182c" fill-opacity="0.96" stroke="#3b82f6" stroke-opacity="0.28" stroke-width="1.2"/>
      <rect x="${x + 1}" y="${y + 1}" width="${w - 2}" height="${h - 2}" rx="19" fill="none" stroke="#60a5fa" stroke-opacity="0.06" stroke-width="1"/>
      <rect x="${x}" y="${y}" width="${w}" height="4" rx="2" fill="url(#accentBar)"/>
      <text x="${x + pad}" y="${y + 32}" text-anchor="start" font-family="${FONT}" font-size="12" font-weight="600" fill="#60a5fa" opacity="0.55">${num}</text>

      <text x="${rightEdge}" y="${y + 58}" text-anchor="end" font-family="${FONT}" font-size="30" font-weight="700" fill="#ffffff">${title}</text>
      <line x1="${x + pad}" y1="${y + 72}" x2="${rightEdge}" y2="${y + 72}" stroke="#1e3a5f" stroke-width="1"/>
      ${serviceRows}
    </g>
  `;
}

function buildConnectorSvg(cardY) {
  const midY = cardY + CARD_H / 2;

  return `
    <defs>
      <linearGradient id="bridge" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2563eb" stop-opacity="0.3"/>
        <stop offset="35%" stop-color="#60a5fa" stop-opacity="1"/>
        <stop offset="65%" stop-color="#60a5fa" stop-opacity="1"/>
        <stop offset="100%" stop-color="#2563eb" stop-opacity="0.3"/>
      </linearGradient>
      <linearGradient id="beam" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#60a5fa" stop-opacity="0"/>
        <stop offset="50%" stop-color="#60a5fa" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#60a5fa" stop-opacity="0"/>
      </linearGradient>
      <filter id="bridgeGlow">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="coreGlow">
        <feGaussianBlur stdDeviation="10" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <rect x="532" y="${cardY + 18}" width="16" height="${CARD_H - 36}" rx="8" fill="url(#beam)" opacity="0.5"/>
    <line x1="514" y1="${midY}" x2="566" y2="${midY}" stroke="url(#bridge)" stroke-width="4" filter="url(#bridgeGlow)"/>
    <line x1="518" y1="${midY}" x2="562" y2="${midY}" stroke="#bfdbfe" stroke-width="1.5" opacity="0.6"/>
    <circle cx="540" cy="${midY}" r="26" fill="#0c1a30" stroke="url(#bridge)" stroke-width="2.5" filter="url(#bridgeGlow)"/>
    <circle cx="540" cy="${midY}" r="18" fill="#1e3a5f" stroke="#60a5fa" stroke-opacity="0.5" stroke-width="1" filter="url(#coreGlow)"/>
    <path d="M532 ${midY} L540 ${midY - 8} L548 ${midY} L540 ${midY + 8} Z" fill="#93c5fd"/>
    <path d="M524 ${midY - 48} Q540 ${midY - 24} 556 ${midY - 48}" fill="none" stroke="#60a5fa" stroke-opacity="0.35" stroke-width="1.5"/>
    <path d="M524 ${midY + 48} Q540 ${midY + 24} 556 ${midY + 48}" fill="none" stroke="#60a5fa" stroke-opacity="0.35" stroke-width="1.5"/>
    <circle cx="524" cy="${midY - 48}" r="3" fill="#60a5fa" opacity="0.6"/>
    <circle cx="556" cy="${midY - 48}" r="3" fill="#60a5fa" opacity="0.6"/>
    <circle cx="524" cy="${midY + 48}" r="3" fill="#60a5fa" opacity="0.6"/>
    <circle cx="556" cy="${midY + 48}" r="3" fill="#60a5fa" opacity="0.6"/>
  `;
}

function buildTextOverlaySvg(fontFaces, layout, exportSize = EXPORT) {
  const cardW = 468;
  const cardL = 48;
  const cardR = 564;
  const { headlineY1, headlineY2, pillY, pillH, cardsY, navY } = layout;

  return Buffer.from(`${svgOpen(exportSize)}
  <defs>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#dbeafe"/>
      <stop offset="45%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="50%" stop-color="#e0f2fe"/>
      <stop offset="100%" stop-color="#93c5fd"/>
    </linearGradient>
    <linearGradient id="accentBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#60a5fa"/>
    </linearGradient>
  </defs>
  ${fontFaces}

  <!-- Headline (positioned below logo) -->
  <text x="540" y="${headlineY1}" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="600" fill="#94a3b8">شركة واحدة</text>
  <text x="540" y="${headlineY2}" text-anchor="middle" font-family="${FONT}" font-size="68" font-weight="700" fill="url(#heroGrad)">قسمان متخصصان</text>

  <!-- Tagline -->
  <rect x="228" y="${pillY}" width="624" height="${pillH}" rx="24" fill="#0f1f38" fill-opacity="0.92" stroke="#3b82f6" stroke-opacity="0.32" stroke-width="1.2"/>
  <rect x="228" y="${pillY}" width="624" height="${pillH}" rx="24" fill="url(#titleGrad)" fill-opacity="0.07"/>
  <text x="540" y="${pillY + 32}" text-anchor="middle" font-family="${FONT}" font-size="21" font-weight="600" fill="#dbeafe">نجمع بين البرمجة والتسويق لبناء أعمال تنمو بثبات</text>

  ${card(cardL, cardW, cardsY, "01 · PROGRAMMING", "قسم البرمجة", ["مواقع إلكترونية", "تطبيقات ويب", "أنظمة مخصصة"])}
  ${buildConnectorSvg(cardsY)}
  ${card(cardR, cardW, cardsY, "02 · MARKETING", "قسم الماركيتنغ", ["إدارة محتوى", "إعلانات ممولة", "بناء العلامة التجارية"])}

  <!-- Carousel navigation -->
  <rect x="486" y="${navY}" width="28" height="8" rx="4" fill="#3b82f6"/>
  <circle cx="530" cy="${navY + 4}" r="5" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <circle cx="560" cy="${navY + 4}" r="5" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <circle cx="590" cy="${navY + 4}" r="5" fill="#1e293b" stroke="#334155" stroke-width="1"/>

  <rect x="180" y="${navY + 28}" width="720" height="64" rx="32" fill="#0c1a30" fill-opacity="0.95" stroke="#3b82f6" stroke-opacity="0.45" stroke-width="1.5"/>
  <rect x="180" y="${navY + 28}" width="720" height="64" rx="32" fill="url(#titleGrad)" fill-opacity="0.08"/>

  <text x="400" y="${navY + 70}" text-anchor="middle" font-family="Segoe UI" font-size="38" font-weight="700" fill="#60a5fa">←</text>
  <text x="560" y="${navY + 70}" text-anchor="middle" font-family="${FONT}" font-size="23" font-weight="700" fill="#f1f5f9">اسحب للتعرف على خدماتنا</text>
  <text x="760" y="${navY + 70}" text-anchor="middle" font-family="Segoe UI" font-size="32" font-weight="700" fill="#60a5fa" opacity="0.85">‹</text>
  <text x="800" y="${navY + 70}" text-anchor="middle" font-family="Segoe UI" font-size="28" font-weight="700" fill="#3b82f6" opacity="0.55">‹</text>
  <text x="832" y="${navY + 70}" text-anchor="middle" font-family="Segoe UI" font-size="24" font-weight="700" fill="#3b82f6" opacity="0.3">‹</text>

  <rect x="320" y="${navY + 112}" width="440" height="4" rx="2" fill="#1e293b"/>
  <rect x="320" y="${navY + 112}" width="110" height="4" rx="2" fill="url(#titleGrad)"/>
</svg>`);
}

async function renderSlide(exportSize) {
  const scale = exportSize / DESIGN;
  const logoPath = await makeLogoTransparent();
  const trimmedLogo = await sharp(logoPath)
    .trim({ threshold: 12 })
    .resize(Math.round(LOGO_WIDTH * scale), null, { fit: "inside" })
    .png()
    .toBuffer();

  const logoMeta = await sharp(trimmedLogo).metadata();
  const logoHeightDesign = Math.round(logoMeta.height / scale);
  const logoWidthDesign = Math.round(logoMeta.width / scale);
  const layout = computeLayout(logoHeightDesign);

  const background = await sharp(buildBackgroundSvg(exportSize)).png().toBuffer();
  const textLayer = await sharp(buildTextOverlaySvg(buildFontFaces(), layout, exportSize)).png().toBuffer();
  const logoLeft = Math.round(((W - logoWidthDesign) / 2) * scale);

  return sharp(background)
    .composite([
      { input: textLayer, left: 0, top: 0 },
      { input: trimmedLogo, left: logoLeft, top: Math.round(LOGO_TOP * scale) },
    ])
    .png({ compressionLevel: 0, effort: 10 });
}

async function main() {
  const hq = await renderSlide(EXPORT);
  await hq.clone().toFile(outputHq);
  await hq.clone().toFile(outputPng);

  const meta = await sharp(outputHq).metadata();
  const sizeMb = (statSync(outputHq).size / (1024 * 1024)).toFixed(2);
  console.log(`Saved HQ (${meta.width}x${meta.height}, ${sizeMb} MB):`, outputHq);
  console.log("Saved:", outputPng);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
