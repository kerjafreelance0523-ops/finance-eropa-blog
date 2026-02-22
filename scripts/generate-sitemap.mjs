/**
 * Generate sitemap.xml from Contentlayer data.
 *
 * Runs automatically after every build via scripts/postbuild.mjs.
 * Run manually after build: node scripts/generate-sitemap.mjs
 * Output: public/sitemap.xml
 */
import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
import { slug } from 'github-slugger'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import siteMetadata from '../data/siteMetadata.js'
import tagDataEn from '../app/tag-data-en.json' with { type: 'json' }
import tagDataDe from '../app/tag-data-de.json' with { type: 'json' }
import tagDataNl from '../app/tag-data-nl.json' with { type: 'json' }

const POSTS_PER_PAGE = 5
const OUT_DIR = process.env.EXPORT ? 'out' : 'public'
const SITE_URL = siteMetadata.siteUrl.replace(/\/$/, '')

const LOCALES = [
  { code: 'en', prefix: '' },
  { code: 'de', prefix: 'de/' },
  { code: 'nl', prefix: 'nl/' },
]

const tagDataByLocale = {
  en: tagDataEn,
  de: tagDataDe,
  nl: tagDataNl,
}

function isPublished(post) {
  if (post.draft === true) return false
  if (!post.date) return false
  const d = new Date(post.date)
  return !Number.isNaN(d.getTime()) && d <= new Date()
}

function getLastmod(post) {
  const d = post.lastmod || post.date
  if (!d) return new Date().toISOString()
  const date = new Date(d)
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}

function escapeXml(s) {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function urlEntry(loc, lastmod, priority) {
  const lastmodStr = lastmod ? new Date(lastmod).toISOString() : new Date().toISOString()
  return `<url>
  <loc>${escapeXml(loc)}</loc>
  <lastmod>${lastmodStr}</lastmod>
  <priority>${Number(priority).toFixed(2)}</priority>
</url>
`
}

function addUrl(urls, pathname, lastmod = null, priority = 0.8) {
  let loc
  if (pathname.startsWith('http')) {
    loc = pathname
  } else {
    const pathNorm = pathname.replace(/\/+/g, '/').replace(/^\/+/, '').replace(/\/$/, '')
    const raw = (SITE_URL + (pathNorm ? '/' + pathNorm : '')).replace(/\/$/, '')
    const trailing = pathname === '' || pathname.endsWith('/')
    loc = raw + (trailing ? '/' : '')
  }
  urls.push({ loc, lastmod: lastmod || new Date(), priority })
}

async function generate() {
  const published = allBlogs.filter(isPublished)
  const urls = []

  // Static pages (default locale = en, no prefix). Exclude sitemap/ — sitemap must not index itself.
  const staticPaths = [
    { path: '', priority: 1.0 },
    { path: 'blog/', priority: 0.8 },
    { path: 'tags/', priority: 0.8 },
    { path: 'about/', priority: 0.8 },
    { path: 'privacy-policy', priority: 0.7 },
    { path: 'cookie-policy', priority: 0.7 },
    { path: 'terms-of-service', priority: 0.7 },
  ]

  for (const { path: p, priority } of staticPaths) {
    addUrl(urls, p, new Date(), priority)
  }

  // Per-locale: locale home, blog index, blog pages, tags index, tag pages, post URLs
  for (const { code, prefix } of LOCALES) {
    const localePosts = sortPosts(published.filter((p) => (p.locale || 'en') === code))
    const tagCounts = tagDataByLocale[code] || {}

    if (prefix) {
      addUrl(urls, prefix, new Date(), prefix === 'de/' ? 0.8 : 0.8)
    }
    addUrl(urls, prefix + 'blog/', new Date(), 0.64)
    addUrl(urls, prefix + 'tags/', new Date(), 0.64)
    addUrl(urls, prefix + 'about/', new Date(), 0.64)

    // Blog pagination
    const totalBlogPages = Math.max(1, Math.ceil(localePosts.length / POSTS_PER_PAGE))
    for (let p = 1; p <= totalBlogPages; p++) {
      const pathname = p === 1 ? prefix + 'blog/' : prefix + 'blog/page/' + p + '/'
      addUrl(urls, pathname, localePosts[0]?.date || new Date(), 0.64)
    }

    // Tag pages: only index page 1 per tag (SEO best practice; avoid thin pagination)
    for (const tagSlug of Object.keys(tagCounts)) {
      if (!tagSlug) continue
      addUrl(urls, prefix + 'tags/' + encodeURIComponent(tagSlug) + '/', new Date(), 0.64)
    }

    // Post URLs
    for (const post of localePosts) {
      const pathname = prefix + 'blog/' + post.slug + '/'
      addUrl(urls, pathname, getLastmod(post), 0.64)
    }
  }

  // Deduplicate by loc (same URL can be added from static paths + per-locale)
  const uniqueUrls = Array.from(new Map(urls.map((u) => [u.loc, u])).values())

  // Sort: home first, then by priority desc, then by path
  uniqueUrls.sort((a, b) => {
    if (a.loc === SITE_URL + '/') return -1
    if (b.loc === SITE_URL + '/') return 1
    if (b.priority !== a.priority) return b.priority - a.priority
    return a.loc.localeCompare(b.loc)
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${uniqueUrls.map((u) => urlEntry(u.loc, u.lastmod, u.priority)).join('')}
</urlset>
`

  const outPath = path.join(OUT_DIR, 'sitemap.xml')
  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(outPath, xml, 'utf8')
  console.log(`Sitemap written: ${outPath} (${uniqueUrls.length} URLs)`)
}

export default generate

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)
if (isMain) {
  generate().catch((err) => {
    console.error('Generate sitemap failed. Run after build so .contentlayer/generated exists.')
    console.error(err)
    process.exit(1)
  })
}
