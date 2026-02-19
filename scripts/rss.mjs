import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import tagDataEn from '../app/tag-data-en.json' with { type: 'json' }
import tagDataDe from '../app/tag-data-de.json' with { type: 'json' }
import tagDataNl from '../app/tag-data-nl.json' with { type: 'json' }
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'

const outputFolder = process.env.EXPORT ? 'out' : 'public'
const locales = [
  { code: 'en', prefix: '', tagData: tagDataEn },
  { code: 'de', prefix: 'de/', tagData: tagDataDe },
  { code: 'nl', prefix: 'nl/', tagData: tagDataNl },
]

const getPostUrl = (config, post, localePrefix) =>
  localePrefix
    ? `${config.siteUrl}/${localePrefix}blog/${post.slug}`
    : `${config.siteUrl}/blog/${post.slug}`

const generateRssItem = (config, post, localePrefix) => {
  const link = getPostUrl(config, post, localePrefix)
  return `
  <item>
    <guid>${link}</guid>
    <title>${escape(post.title)}</title>
    <link>${link}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`
}

const generateRss = (config, posts, page, localePrefix) => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}${localePrefix ? `/${localePrefix.replace(/\/$/, '')}` : ''}/blog</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post, localePrefix)).join('')}
    </channel>
  </rss>
`

async function generateRSS(config, allBlogs, page, localeCode, localePrefix, tagData) {
  const publishPosts = allBlogs
    .filter((post) => post.draft !== true && (post.locale || 'en') === localeCode)
  const sorted = sortPosts(publishPosts)

  if (sorted.length > 0) {
    const rss = generateRss(config, sorted, page, localePrefix)
    const outPath = path.join(outputFolder, path.dirname(page))
    mkdirSync(outPath, { recursive: true })
    writeFileSync(path.join(outputFolder, page), rss)
  }

  if (publishPosts.length > 0 && tagData) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = publishPosts.filter((post) =>
        post.tags && post.tags.map((t) => slug(t)).includes(tag)
      )
      if (filteredPosts.length === 0) continue
      const tagPage = localePrefix ? `${localePrefix}tags/${tag}/feed.xml` : `tags/${tag}/feed.xml`
      const rss = generateRss(config, sortPosts(filteredPosts), tagPage, localePrefix)
      const rssPath = path.join(outputFolder, localePrefix, 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, 'feed.xml'), rss)
    }
  }
}

const rss = async () => {
  for (const { code, prefix, tagData } of locales) {
    const page = prefix ? `${prefix}feed.xml` : 'feed.xml'
    await generateRSS(siteMetadata, allBlogs, page, code, prefix, tagData)
  }
  console.log('RSS feeds generated (en, de, nl)...')
}
export default rss
