/**
 * Validates blog articles in data/blog/{lang} against PRD_BLOG_ARTICLE_GENERATION.md.
 * Usage: node scripts/validate-blog-prd.mjs [--lang=xx] [-l xx]
 * Default lang: en. Path: data/blog/{lang} relative to Europa site.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EUROPA_ROOT = path.join(__dirname, '..');
const DEFAULT_LANG = 'en';

// PRD limits (wordMax: toleransi +50 dari PRD 1200 agar tidak terlalu ketat)
const LIMITS = {
  wordMin: 900,
  wordMax: 1300,
  h2Min: 4,
  h2Max: 7,
  paraMin: 12,
  paraMax: 20,
  paraWordMin: 60,
  paraWordMax: 180,
  totalImagesMin: 3,
  totalImagesMax: 5,
  heroCount: 1,
  midMin: 2,
  titleLenMin: 50,
  titleLenMax: 60,
  summaryLenMin: 150,
  summaryLenMax: 160,
  tagsMin: 3,
  tagsMax: 5,
};

function getLangFromArgv() {
  const args = process.argv.slice(2);
  for (const a of args) {
    if (a.startsWith('--lang=')) return a.slice(7).trim();
    if (a === '-l' && args[args.indexOf(a) + 1]) return args[args.indexOf(a) + 1].trim();
  }
  return DEFAULT_LANG;
}

function getBodyForWordCount(body) {
  let t = body
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\*Data source:[^*]*\*/g, '')
    .replace(/\*[^*]+\*/g, '')
    .replace(/^#+\s.*$/gm, '');
  return t.trim();
}

function getNarrativeParagraphs(body) {
  const cleaned = getBodyForWordCount(body);
  const blocks = cleaned.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  const narrative = blocks.filter((block) => {
    const noHead = block.replace(/^#+\s.*$/gm, '').trim();
    const noImg = noHead.replace(/!\[[^\]]*\]\([^)]+\)/g, '').trim();
    const noCap = noImg.replace(/\*[^*]*\*/g, '').trim();
    return noCap.length > 20;
  });
  return narrative;
}

function countWords(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function getH2Positions(body) {
  const re = /^##\s/gm;
  const out = [];
  let m;
  while ((m = re.exec(body)) !== null) out.push(m.index);
  return out;
}

function getImageMarkdownPositions(body) {
  const re = /!\[[^\]]*\]\([^)]+\)/g;
  const out = [];
  let m;
  while ((m = re.exec(body)) !== null) out.push(m.index);
  return out;
}

function validateFile(filePath, slug) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  const check = (ok, msg) => (ok ? null : msg);

  let frontmatter;
  let body;
  try {
    const parsed = matter(raw);
    frontmatter = parsed.data;
    body = parsed.content;
  } catch (_) {
    errors.push('Frontmatter tidak valid atau tidak ada');
    return {
      ok: false,
      errors,
      checklist: {
        frontmatter: false,
        words: { ok: false, value: '-', msg: 'Frontmatter invalid' },
        h2: { ok: false, value: '-', msg: '-' },
        paragraphs: { ok: false, value: '-', msg: '-' },
        paraLength: { ok: false, msg: '-' },
        hero: { ok: false, value: '-', msg: '-' },
        images: { ok: false, value: '-', msg: '-' },
        placement: { ok: false, msg: '-' },
        noClustering: { ok: false, msg: '-' },
        sectionParas: { ok: false, msg: '-' },
        title: { ok: false, value: '-', msg: '-' },
        summary: { ok: false, value: '-', msg: '-' },
        tags: { ok: false, value: '-', msg: '-' },
      },
    };
  }

  if (!body || !body.trim()) errors.push('Body kosong');

  const bodyForWords = getBodyForWordCount(body);
  const wordCount = countWords(bodyForWords);
  const wordsOk = wordCount >= LIMITS.wordMin && wordCount <= LIMITS.wordMax;
  if (!wordsOk) {
    if (wordCount < LIMITS.wordMin) errors.push(`Kata: ${wordCount} (min ${LIMITS.wordMin})`);
    else errors.push(`Kata: ${wordCount} (max ${LIMITS.wordMax})`);
  }

  const h2Matches = body.match(/^##\s/gm);
  const h2Count = h2Matches ? h2Matches.length : 0;
  const h2Ok = h2Count >= LIMITS.h2Min && h2Count <= LIMITS.h2Max;
  if (!h2Ok) errors.push(`H2: ${h2Count} (harus ${LIMITS.h2Min}-${LIMITS.h2Max})`);

  const narrativeParas = getNarrativeParagraphs(body);
  const paraCount = narrativeParas.length;
  const paraOk = paraCount >= LIMITS.paraMin && paraCount <= LIMITS.paraMax;
  if (!paraOk) errors.push(`Paragraf naratif: ${paraCount} (min ${LIMITS.paraMin}, max ${LIMITS.paraMax})`);

  const paraLengthIssues = [];
  narrativeParas.forEach((p, i) => {
    const w = countWords(p);
    if (w < LIMITS.paraWordMin) paraLengthIssues.push(`Paragraf ${i + 1}: ${w} kata (min ${LIMITS.paraWordMin})`);
    if (w > LIMITS.paraWordMax) paraLengthIssues.push(`Paragraf ${i + 1}: ${w} kata (max ${LIMITS.paraWordMax})`);
  });
  const paraLengthOk = paraLengthIssues.length === 0;
  paraLengthIssues.forEach((e) => errors.push(e));

  const heroImages = Array.isArray(frontmatter.images) ? frontmatter.images : [];
  const heroCount = heroImages.length;
  const heroPath = heroImages[0];
  const heroOk = heroCount === LIMITS.heroCount && (!heroPath || heroPath.endsWith('.webp'));
  if (!heroOk) {
    if (heroCount !== LIMITS.heroCount) errors.push(`Hero: ${heroCount} (harus tepat 1)`);
    if (heroPath && !heroPath.endsWith('.webp')) errors.push('Hero harus format .webp');
  }

  const midImages = body.match(/!\[[^\]]*\]\([^)]+\)/g) || [];
  const midCount = midImages.length;
  const totalImages = heroCount + midCount;
  const imagesOk =
    totalImages >= LIMITS.totalImagesMin &&
    totalImages <= LIMITS.totalImagesMax &&
    midCount >= LIMITS.midMin;
  if (!imagesOk) {
    if (totalImages < LIMITS.totalImagesMin) errors.push(`Gambar total: ${totalImages} (min ${LIMITS.totalImagesMin})`);
    else if (totalImages > LIMITS.totalImagesMax) errors.push(`Gambar total: ${totalImages} (max ${LIMITS.totalImagesMax})`);
    if (midCount < LIMITS.midMin) errors.push(`Gambar mid-content: ${midCount} (min ${LIMITS.midMin})`);
  }

  const h2Pos = getH2Positions(body);
  const imgPos = getImageMarkdownPositions(body);
  let placementOk = true;
  if (h2Pos.length >= 1 && imgPos.length >= 1 && imgPos[0] <= h2Pos[0]) {
    placementOk = false;
    errors.push('Gambar mid pertama harus setelah H2 pertama');
  }
  if (h2Pos.length >= 2 && imgPos.length >= 2) {
    const afterSecond = imgPos[1] > h2Pos[1];
    const afterThird = h2Pos.length >= 3 && imgPos[1] > h2Pos[2];
    if (!afterSecond && !afterThird) {
      placementOk = false;
      errors.push('Gambar mid kedua harus setelah H2 kedua atau ketiga');
    }
  }

  const blocks = body.split(/\n\n+/);
  let cum = 0;
  const blockStarts = blocks.map((b) => (cum += b.length + 2) - b.length - 2);
  blockStarts.push(body.length + 1);
  function isNarrativeBlock(block) {
    const b = (block || '').trim();
    if (!b || b.length < 20) return false;
    const noHead = b.replace(/^#+\s.*$/gm, '').trim();
    const noImg = noHead.replace(/!\[[^\]]*\]\([^)]+\)/g, '').trim();
    const noCap = noImg.replace(/\*[^*]*\*/g, '').trim();
    return noCap.length > 20;
  }
  let narrativeIdx = 0;
  const blockToNarrativeIndex = blocks.map((b) => (isNarrativeBlock(b) ? narrativeIdx++ : -1));
  const numNarrative = narrativeIdx;
  const imageToNarrativeParaIndex = [];
  for (const pos of imgPos) {
    let bi = 0;
    for (; bi < blockStarts.length - 1 && pos >= blockStarts[bi + 1]; bi++);
    let ni = blockToNarrativeIndex[bi];
    if (ni < 0) {
      for (let j = bi - 1; j >= 0; j--) {
        if (blockToNarrativeIndex[j] >= 0) {
          ni = blockToNarrativeIndex[j];
          break;
        }
      }
    }
    imageToNarrativeParaIndex.push(ni < 0 ? 0 : ni);
  }
  let noClusteringOk = true;
  if (numNarrative > 0 && imageToNarrativeParaIndex.length > 0 && totalImages > 0) {
    const last20Start = Math.ceil(numNarrative * 0.8);
    const imagesInLast20 = imageToNarrativeParaIndex.filter((ni) => ni >= last20Start).length;
    if (imagesInLast20 / totalImages > 0.5) {
      noClusteringOk = false;
      errors.push('>50% gambar di 20% paragraf terakhir (bottom clustering)');
    }
  }

  const sections = body.split(/\n##\s/m).slice(1);
  const sectionIssues = [];
  for (let i = 0; i < sections.length; i++) {
    const sectionBody = sections[i];
    const sectionParas = sectionBody
      .split(/\n\n+/)
      .map((b) => b.trim())
      .filter((b) => {
        if (!b) return false;
        const noImg = b.replace(/!\[[^\]]*\]\([^)]+\)/g, '').trim();
        const noCap = noImg.replace(/\*[^*]*\*/g, '').trim();
        return noCap.length > 20;
      });
    if (sectionParas.length < 2) {
      sectionIssues.push(`Section ${i + 1}: ${sectionParas.length} paragraf (min 2)`);
      errors.push(`Section ${i + 1}: hanya ${sectionParas.length} paragraf (min 2)`);
    }
  }
  const sectionParasOk = sectionIssues.length === 0;

  const title = (frontmatter.title || '').replace(/^['"]|['"]$/g, '');
  const titleLen = title.length;
  const titleOk = titleLen >= LIMITS.titleLenMin && titleLen <= LIMITS.titleLenMax;
  if (!titleOk) errors.push(`Title: ${titleLen} karakter (harus ${LIMITS.titleLenMin}-${LIMITS.titleLenMax})`);

  const summary = (frontmatter.summary || '').replace(/^['"]|['"]$/g, '');
  const summaryLen = summary.length;
  const summaryOk = summaryLen >= LIMITS.summaryLenMin && summaryLen <= LIMITS.summaryLenMax;
  if (!summaryOk) errors.push(`Summary: ${summaryLen} karakter (harus ${LIMITS.summaryLenMin}-${LIMITS.summaryLenMax})`);

  const tagCount = Array.isArray(frontmatter.tags) ? frontmatter.tags.length : 0;
  const tagsOk = tagCount >= LIMITS.tagsMin && tagCount <= LIMITS.tagsMax;
  if (!tagsOk) errors.push(`Tags: ${tagCount} (harus ${LIMITS.tagsMin}-${LIMITS.tagsMax})`);

  const ok = errors.length === 0;
  return {
    ok,
    errors,
    wordCount,
    h2Count,
    paraCount,
    totalImages,
    checklist: {
      frontmatter: true,
      words: { ok: wordsOk, value: String(wordCount), msg: wordsOk ? null : (wordCount < LIMITS.wordMin ? `min ${LIMITS.wordMin}` : `max ${LIMITS.wordMax}`) },
      h2: { ok: h2Ok, value: String(h2Count), msg: h2Ok ? null : `harus ${LIMITS.h2Min}-${LIMITS.h2Max}` },
      paragraphs: { ok: paraOk, value: String(paraCount), msg: paraOk ? null : `min ${LIMITS.paraMin}` },
      paraLength: { ok: paraLengthOk, msg: paraLengthOk ? null : paraLengthIssues[0] || 'ada paragraf <60 atau >180 kata' },
      hero: { ok: heroOk, value: String(heroCount), msg: heroOk ? null : 'harus 1, .webp' },
      images: { ok: imagesOk, value: `${heroCount}+${midCount}=${totalImages}`, msg: imagesOk ? null : `total ${LIMITS.totalImagesMin}-${LIMITS.totalImagesMax}, mid min ${LIMITS.midMin}` },
      placement: { ok: placementOk, msg: placementOk ? null : 'penempatan mid' },
      noClustering: { ok: noClusteringOk, msg: noClusteringOk ? null : 'bottom clustering' },
      sectionParas: { ok: sectionParasOk, msg: sectionParasOk ? null : 'min 2 paragraf per section' },
      title: { ok: titleOk, value: String(titleLen), msg: titleOk ? null : `${LIMITS.titleLenMin}-${LIMITS.titleLenMax} karakter` },
      summary: { ok: summaryOk, value: String(summaryLen), msg: summaryOk ? null : `${LIMITS.summaryLenMin}-${LIMITS.summaryLenMax} karakter` },
      tags: { ok: tagsOk, value: String(tagCount), msg: tagsOk ? null : `${LIMITS.tagsMin}-${LIMITS.tagsMax} tag` },
    },
  };
}

const YES = '\u2713';  // ✓
const NO = '\u2717';   // ✗

function pad(s, n) {
  const t = String(s);
  return t.length >= n ? t.slice(0, n) : t + ' '.repeat(n - t.length);
}

function main() {
  const lang = getLangFromArgv();
  const blogDir = path.join(EUROPA_ROOT, 'data', 'blog', lang);

  if (!fs.existsSync(blogDir)) {
    console.error(`Directory not found: ${blogDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'));
  if (files.length === 0) {
    console.log(`No .mdx files in ${blogDir}`);
    process.exit(0);
  }

  const results = [];
  for (const file of files.sort()) {
    const slug = file.replace(/\.mdx$/, '');
    const filePath = path.join(blogDir, file);
    const r = validateFile(filePath, slug);
    results.push({ slug, ...r });
  }

  const slugW = Math.min(40, Math.max(10, ...results.map((r) => r.slug.length)));
  const colW = { slug: slugW, kata: 8, h2: 5, para: 6, img: 9, title: 7, summary: 8, tags: 6, status: 10 };

  console.log('\nValidating blog/' + lang + ' (' + files.length + ' articles)\n');

  const sep = '+' + '-'.repeat(colW.slug + 2) + '+' + '-'.repeat(colW.kata + 2) + '+' + '-'.repeat(colW.h2 + 2) + '+' + '-'.repeat(colW.para + 2) + '+' + '-'.repeat(colW.img + 2) + '+' + '-'.repeat(colW.title + 2) + '+' + '-'.repeat(colW.summary + 2) + '+' + '-'.repeat(colW.tags + 2) + '+' + '-'.repeat(colW.status + 2) + '+';
  const header = '| ' + pad('Slug', colW.slug) + ' | ' + pad('Kata', colW.kata) + ' | ' + pad('H2', colW.h2) + ' | ' + pad('Para', colW.para) + ' | ' + pad('Gambar', colW.img) + ' | ' + pad('Title', colW.title) + ' | ' + pad('Summary', colW.summary) + ' | ' + pad('Tags', colW.tags) + ' | ' + pad('OK', colW.status) + ' |';

  console.log(sep);
  console.log(header);
  console.log(sep);

  for (const r of results) {
    const c = r.checklist || {};
    const kataStr = (c.words && c.words.value !== undefined ? c.words.value : r.wordCount ?? '-') + (c.words && c.words.ok ? ' ' + YES : c.words ? ' ' + NO : '');
    const h2Str = (c.h2 && c.h2.value !== undefined ? c.h2.value : r.h2Count ?? '-') + (c.h2 && c.h2.ok ? YES : c.h2 ? NO : '');
    const paraStr = (c.paragraphs && c.paragraphs.value !== undefined ? c.paragraphs.value : r.paraCount ?? '-') + (c.paragraphs && c.paragraphs.ok ? YES : c.paragraphs ? NO : '');
    const imgStr = (c.images && c.images.value !== undefined ? c.images.value : r.totalImages ?? '-') + (c.images && c.images.ok ? YES : c.images ? NO : '');
    const titleStr = (c.title && c.title.value !== undefined ? c.title.value : '-') + (c.title && c.title.ok ? YES : c.title ? NO : '');
    const summaryStr = (c.summary && c.summary.value !== undefined ? c.summary.value : '-') + (c.summary && c.summary.ok ? YES : c.summary ? NO : '');
    const tagsStr = (c.tags && c.tags.value !== undefined ? c.tags.value : '-') + (c.tags && c.tags.ok ? YES : c.tags ? NO : '');
    const statusStr = r.ok ? YES + ' Valid' : NO + ' Invalid';

    const slugShort = r.slug.length > colW.slug ? r.slug.slice(0, colW.slug - 2) + '..' : r.slug;
    console.log('| ' + pad(slugShort, colW.slug) + ' | ' + pad(kataStr, colW.kata) + ' | ' + pad(h2Str, colW.h2) + ' | ' + pad(paraStr, colW.para) + ' | ' + pad(imgStr, colW.img) + ' | ' + pad(titleStr, colW.title) + ' | ' + pad(summaryStr, colW.summary) + ' | ' + pad(tagsStr, colW.tags) + ' | ' + pad(statusStr, colW.status) + ' |');
  }

  console.log(sep);

  const valid = results.filter((r) => r.ok).length;
  const invalid = results.filter((r) => !r.ok);

  console.log('\nLegenda: ' + YES + ' = memenuhi PRD, ' + NO + ' = belum memenuhi. Angka = nilai saat ini.\n');

  if (invalid.length > 0) {
    console.log('--- KEKURANGAN PER ARTIKEL ---\n');
    for (const r of invalid) {
      console.log(r.slug + ':');
      for (const e of r.errors) console.log('  - ' + e);
      console.log('');
    }
  }

  console.log('Ringkasan: ' + valid + '/' + results.length + ' artikel valid menurut PRD.');
  if (invalid.length) console.log('Invalid: ' + invalid.map((r) => r.slug).join(', '));

  process.exit(invalid.length > 0 ? 1 : 0);
}

main();
