import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { findBlogPost, getBlogsByLocale, getRelatedPosts } from '@/lib/blog'
import RelatedPosts from '@/components/RelatedPosts'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const locale = params.locale || 'en'
  const slug = decodeURI(params.slug.join('/'))
  const post = findBlogPost(slug, locale)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img && img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  const siteUrl = siteMetadata.siteUrl
  const canonicalPath = locale === 'en' ? `blog/${slug}` : `${locale}/blog/${slug}`
  const canonicalUrl = `${siteUrl}/${canonicalPath}`

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}/blog/${slug}`,
        de: `${siteUrl}/de/blog/${slug}`,
        nl: `${siteUrl}/nl/blog/${slug}`,
        'x-default': `${siteUrl}/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({
    locale: p.locale || 'en',
    slug: p.slug.split('/').map((name) => decodeURI(name)),
  }))
}

export default async function Page(props: { params: Promise<{ locale: string; slug: string[] }> }) {
  const params = await props.params
  const locale = params.locale || 'en'
  const slug = decodeURI(params.slug.join('/'))
  const post = findBlogPost(slug, locale)
  if (!post) {
    return notFound()
  }

  const sortedCoreContents = getBlogsByLocale(locale)
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  const prev = postIndex >= 0 ? sortedCoreContents[postIndex + 1] : undefined
  const next = postIndex > 0 ? sortedCoreContents[postIndex - 1] : undefined

  const authorList = post.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  const jsonLd = { ...post.structuredData }
  jsonLd['author'] = authorDetails.map((author) => ({
    '@type': 'Person',
    name: author.name,
  }))

  const relatedPosts = getRelatedPosts(slug, locale, post.tags || [], 3)
  const Layout = layouts[(post as Blog).layout || defaultLayout]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
        <RelatedPosts posts={relatedPosts} locale={locale} />
      </Layout>
    </>
  )
}
