#!/usr/bin/env node
/**
 * Optimize blog images per PRD_BLOG_ARTICLE_GENERATION.md:
 * - Hero: 1200×675 px, WebP, target ≤ 80 KB
 * - Chart: 800×600 px, WebP, target ≤ 80 KB
 * - Quality 80–85, overwrites originals
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BLOG_IMAGES = join(__dirname, '..', 'public', 'static', 'images', 'blog');

const HERO_SIZE = { width: 1200, height: 675 };
const CHART_SIZE = { width: 800, height: 600 };
const TARGET_KB = 80;
const WEBP_QUALITY_START = 82;

function isHero(name) {
  return name.includes('-hero.');
}

function isChart(name) {
  return /-chart\d*\./.test(name) || (name.includes('-chart') && !name.includes('-hero'));
}

async function optimizeFile(filePath, name, force = false) {
  const { size: inputBytes } = await stat(filePath);
  const inputKB = inputBytes / 1024;
  const ext = extname(name).toLowerCase();
  if (ext !== '.webp' && ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') return null;
  if (!force && inputKB <= TARGET_KB) {
    console.log(`${name}: ${inputKB.toFixed(1)} KB (already ≤ ${TARGET_KB} KB, skip)`);
    return null;
  }

  const isHeroFile = isHero(name);
  const { width, height } = isHeroFile ? HERO_SIZE : CHART_SIZE;

  let quality = WEBP_QUALITY_START;
  let buffer;
  let outputKB;

  // Reduce quality until under TARGET_KB (with a minimum quality of 60)
  for (; quality >= 60; quality -= 4) {
    buffer = await sharp(filePath)
      .resize(width, height, {
        fit: 'contain',
        position: 'center',
        background: { r: 240, g: 244, b: 248 },
      })
      .webp({ quality, effort: 6 })
      .toBuffer();
    outputKB = buffer.length / 1024;
    if (outputKB <= TARGET_KB) break;
  }

  const { writeFile, unlink, rename } = await import('fs/promises');
  const outPath = filePath.replace(/\.[a-z]+$/i, '.webp');
  const tmpPath = outPath + '.tmp';
  await writeFile(tmpPath, buffer);
  await rename(tmpPath, outPath);
  if (outPath !== filePath) await unlink(filePath).catch(() => {});

  console.log(`${name}: ${inputKB.toFixed(1)} KB → ${outputKB.toFixed(1)} KB (${width}×${height}, q${quality})`);
  return { name, inputKB, outputKB, quality };
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force') || args.includes('-f');

  const files = await readdir(BLOG_IMAGES);
  const toProcess = files.filter(
    (f) =>
      (f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg')) &&
      (isHero(f) || isChart(f))
  );

  console.log(`Optimizing ${toProcess.length} images in ${BLOG_IMAGES}${force ? ' (--force)' : ''}\n`);
  const results = [];
  for (const name of toProcess) {
    try {
      const r = await optimizeFile(join(BLOG_IMAGES, name), name, force);
      if (r) results.push(r);
    } catch (err) {
      console.error(`Error ${name}:`, err.message);
    }
  }

  const totalIn = results.reduce((a, r) => a + r.inputKB, 0);
  const totalOut = results.reduce((a, r) => a + r.outputKB, 0);
  console.log(`\nTotal: ${(totalIn / 1024).toFixed(2)} MB → ${(totalOut / 1024).toFixed(2)} MB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
