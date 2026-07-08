import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public", "images");

const BRAND = {
  oak: "#8B6F47",
  moss: "#4A5D3A",
  cream: "#F0E9DD",
  navy: "#1B2A41",
  brass: "#B08D57",
};

function lighten(hex, amount) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `rgb(${r}, ${g}, ${b})`;
}

function darken(hex, amount) {
  return lighten(hex, -amount);
}

/**
 * Editorial-style placeholder standing in for real photography: a soft
 * gradient field, an arched motif (nods to the retail corner's arched
 * mirror), a small S14 monogram, and a label identifying what the shot
 * would actually show once real photography replaces it.
 */
function svgPlaceholder({
  width,
  height,
  bg,
  label,
  sublabel,
  monogram = true,
  archScale = 1,
}) {
  const textColor = bg === BRAND.cream ? BRAND.navy : BRAND.cream;
  const archFill = bg === BRAND.cream ? darken(bg, 12) : lighten(bg, 22);
  const archWidth = width * 0.46 * archScale;
  const archHeight = height * 0.62 * archScale;
  const archX = (width - archWidth) / 2;
  const archY = height * 0.14;
  const archRadius = archWidth / 2;

  const monogramMarkup = monogram
    ? `
    <circle cx="${width - 56}" cy="56" r="26" fill="none" stroke="${textColor}" stroke-opacity="0.5" stroke-width="1.5" />
    <text x="${width - 56}" y="62" font-family="Georgia, 'Times New Roman', serif" font-size="15" fill="${textColor}" fill-opacity="0.75" text-anchor="middle">S14</text>
  `
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${lighten(bg, 10)}" />
      <stop offset="100%" stop-color="${darken(bg, 14)}" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)" />
  <path d="M ${archX} ${archY + archHeight} L ${archX} ${archY + archRadius} A ${archRadius} ${archRadius} 0 0 1 ${archX + archWidth} ${archY + archRadius} L ${archX + archWidth} ${archY + archHeight} Z" fill="${archFill}" fill-opacity="0.55" />
  ${monogramMarkup}
  <text x="40" y="${height - 64}" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="${textColor}">${label}</text>
  ${sublabel ? `<text x="40" y="${height - 34}" font-family="Helvetica, Arial, sans-serif" font-size="15" fill="${textColor}" fill-opacity="0.7">${sublabel}</text>` : ""}
</svg>`;
}

function write(relativePath, contents) {
  const fullPath = join(ROOT, relativePath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, contents, "utf8");
  console.log("wrote", relativePath);
}

// --- Hero chapters (portrait, full-bleed) ---
const HERO = [
  { file: "hero/brown.svg", bg: BRAND.oak, label: "Reformer Set", sublabel: "Brown — placeholder frame" },
  { file: "hero/sage.svg", bg: BRAND.moss, label: "Reformer Set", sublabel: "Sage — placeholder frame" },
  { file: "hero/cream.svg", bg: BRAND.cream, label: "Studio Zip Jacket", sublabel: "Cream — placeholder frame" },
];
HERO.forEach(({ file, bg, label, sublabel }) => {
  write(file, svgPlaceholder({ width: 1200, height: 1600, bg, label, sublabel }));
});

// --- Products (portrait, 3 angles each) ---
const PRODUCTS = [
  { slug: "reformer-set-brown", bg: BRAND.oak, name: "Reformer Set — Brown" },
  { slug: "reformer-set-sage", bg: BRAND.moss, name: "Reformer Set — Sage" },
  { slug: "reformer-set-cream", bg: BRAND.cream, name: "Reformer Set — Cream" },
  { slug: "reformer-bra-navy", bg: BRAND.navy, name: "Reformer Bra Top — Navy" },
  { slug: "studio-zip-jacket-cream", bg: BRAND.cream, name: "Studio Zip Jacket — Cream" },
  { slug: "studio-zip-jacket-brass", bg: BRAND.brass, name: "Studio Zip Jacket — Brass" },
  { slug: "studio-zip-jacket-navy", bg: BRAND.navy, name: "Studio Zip Jacket — Navy" },
  { slug: "wide-leg-denim-oak", bg: BRAND.oak, name: "Wide Leg Denim — Oak Wash" },
  { slug: "court-sneaker-cream", bg: BRAND.cream, name: "Court Sneaker — Cream" },
];
const ANGLES = [
  { suffix: "front", sublabel: "Front" },
  { suffix: "angle", sublabel: "Side angle" },
  { suffix: "detail", sublabel: "Fabric detail" },
];
PRODUCTS.forEach(({ slug, bg, name }) => {
  ANGLES.forEach(({ suffix, sublabel }) => {
    write(
      `products/${slug}-${suffix}.svg`,
      svgPlaceholder({
        width: 900,
        height: 1200,
        bg,
        label: name,
        sublabel,
        archScale: suffix === "detail" ? 1.3 : 1,
      })
    );
  });
});

// --- Studios ---
write(
  "studios/city-walk-studio.svg",
  svgPlaceholder({
    width: 1200,
    height: 900,
    bg: BRAND.oak,
    label: "Studio Floor",
    sublabel: "Studio 14 — City Walk, Dubai",
  })
);
write(
  "studios/city-walk-retail.svg",
  svgPlaceholder({
    width: 1200,
    height: 900,
    bg: BRAND.moss,
    label: "Retail Corner",
    sublabel: "Oak fixtures, brass lighting, arched mirror",
  })
);

// --- Journal ---
const JOURNAL = [
  { file: "journal/power-in-your-nature.svg", bg: BRAND.navy, label: "Power in Your Nature" },
  { file: "journal/shop-where-you-train.svg", bg: BRAND.oak, label: "Shop Where You Train" },
  { file: "journal/fabric-notes.svg", bg: BRAND.moss, label: "Fabric Notes" },
];
JOURNAL.forEach(({ file, bg, label }) => {
  write(file, svgPlaceholder({ width: 1200, height: 900, bg, label, sublabel: "Journal" }));
});

// --- About / Philosophy still ---
write(
  "about/philosophy.svg",
  svgPlaceholder({
    width: 1200,
    height: 1200,
    bg: BRAND.moss,
    label: "Moss Wall & Arch",
    sublabel: "Studio 14 retail corner",
  })
);

console.log("Done. All placeholders are stand-ins for real studio photography.");
