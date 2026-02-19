import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const basePath = process.env.BASE_PATH || ''
  const sitemapUrl = `${siteMetadata.siteUrl}${basePath}/sitemap.xml`
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: sitemapUrl,
    host: siteMetadata.siteUrl,
  }
}
