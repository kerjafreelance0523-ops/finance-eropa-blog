import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

const locales = ['en', 'de', 'nl'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    const prefix = locale === 'en' ? '' : `/${locale}`
    const localePosts = allBlogs.filter(
      (p) => !p.draft && (p as { locale?: string }).locale === locale
    )
    for (const post of localePosts) {
      const slug = (post as { slug?: string }).slug ?? post.path?.replace(/^blog\//, '') ?? ''
      entries.push({
        url: `${siteUrl}${prefix}/blog/${slug}`,
        lastModified: new Date(post.lastmod || post.date).toISOString(),
        alternates: {
          languages: {
            en: `${siteUrl}/blog/${slug}`,
            de: `${siteUrl}/de/blog/${slug}`,
            nl: `${siteUrl}/nl/blog/${slug}`,
          },
        },
      })
    }
  }

  entries.push(
    { url: siteUrl, lastModified: new Date().toISOString().split('T')[0] },
    { url: `${siteUrl}/blog`, lastModified: new Date().toISOString().split('T')[0] },
    { url: `${siteUrl}/projects`, lastModified: new Date().toISOString().split('T')[0] },
    { url: `${siteUrl}/tags`, lastModified: new Date().toISOString().split('T')[0] },
    { url: `${siteUrl}/de`, lastModified: new Date().toISOString().split('T')[0] },
    { url: `${siteUrl}/de/blog`, lastModified: new Date().toISOString().split('T')[0] },
    { url: `${siteUrl}/de/projects`, lastModified: new Date().toISOString().split('T')[0] },
    { url: `${siteUrl}/de/tags`, lastModified: new Date().toISOString().split('T')[0] },
    { url: `${siteUrl}/nl`, lastModified: new Date().toISOString().split('T')[0] },
    { url: `${siteUrl}/nl/blog`, lastModified: new Date().toISOString().split('T')[0] },
    { url: `${siteUrl}/nl/projects`, lastModified: new Date().toISOString().split('T')[0] },
    { url: `${siteUrl}/nl/tags`, lastModified: new Date().toISOString().split('T')[0] }
  )

  return entries
}
