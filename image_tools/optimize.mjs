import sharp from "sharp";
import { readdir, stat, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, join, basename, extname } from "node:path";

const SRC_DIR = resolve("../val-global-frontend/public/images");
const OUT_DIR = SRC_DIR;
const WIDTHS = [480, 768, 1200];
const QUALITY = 75;

// Images used as product cards in Products.jsx
const PRODUCT_IMAGES = new Set([
  "vegetables.webp",
  "rice.webp",
  "spices.webp",
  "masala.webp",
  "eggs.webp",
  "oil.webp",
  "coconut.webp",
  "grains.webp",
  "jaggery.webp",
  "honey.webp",
  "tea-coffee.webp",
  "lifestyle.webp",
]);

const fmtKB = (n) => (n / 1024).toFixed(1) + " KB";

async function getOriginalDims(file) {
  const meta = await sharp(file).metadata();
  return { width: meta.width, height: meta.height };
}

async function fileSize(p) {
  try {
    return (await stat(p)).size;
  } catch {
    return 0;
  }
}

async function processImage(filename) {
  const src = join(SRC_DIR, filename);
  const base = basename(filename, extname(filename));
  const orig = await fileSize(src);
  const { width: srcW } = await getOriginalDims(src);

  const rows = [];
  for (const w of WIDTHS) {
    const target = Math.min(w, srcW); // never upscale
    const outName = `${base}-${w}.webp`;
    const outPath = join(OUT_DIR, outName);

    await sharp(src)
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outPath);

    rows.push({
      variant: outName,
      width: target,
      bytes: await fileSize(outPath),
    });
  }

  return { filename, originalBytes: orig, sourceWidth: srcW, variants: rows };
}

async function main() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });
  const files = (await readdir(SRC_DIR)).filter((f) => PRODUCT_IMAGES.has(f));
  files.sort();

  const results = [];
  for (const f of files) {
    process.stdout.write(`Processing ${f} ... `);
    const r = await processImage(f);
    console.log("done");
    results.push(r);
  }

  console.log("\n=== Optimization Report ===\n");
  let totalBefore = 0;
  let totalAfter = 0;
  for (const r of results) {
    totalBefore += r.originalBytes;
    console.log(
      `${r.filename}  (orig ${fmtKB(r.originalBytes)}, ${r.sourceWidth}px wide)`
    );
    for (const v of r.variants) {
      totalAfter += v.bytes;
      console.log(`   -> ${v.variant.padEnd(28)} ${String(v.width).padStart(5)}w   ${fmtKB(v.bytes).padStart(9)}`);
    }
    console.log();
  }
  console.log(
    `Total original (12 cards): ${fmtKB(totalBefore)}\n` +
      `Total variants generated: ${fmtKB(totalAfter)}\n`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
