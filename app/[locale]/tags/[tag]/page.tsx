import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagDataEn from 'app/tag-data-en.json'
import tagDataDe from 'app/tag-data-de.json'
import tagDataNl from 'app/tag-data-nl.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

const tagDataByLocale: Record<string, Record<string, number>> = {
  en: tagDataEn as Record<string, number>,
  de: tagDataDe as Record<string, number>,
  nl: tagDataNl as Record<string, number>,
}

const POSTS_PER_PAGE = 5

export async function generateMetadata(props: {
  params: Promise<{ locale: string; tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const paths: { locale: string; tag: string }[] = []
  for (const locale of ['en', 'de', 'nl']) {
    const tagCounts = tagDataByLocale[locale] || {}
    Object.keys(tagCounts).forEach((tag) => {
      paths.push({ locale, tag: encodeURI(tag) })
    })
  }
  return paths
}

export default async function TagPage(props: { params: Promise<{ locale: string; tag: string }> }) {
  const params = await props.params
  const locale = params.locale || 'en'
  const tag = decodeURI(params.tag)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.locale === locale && post.tags && post.tags.map((t) => slug(t)).includes(tag)
      )
    )
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
      tagData={tagDataByLocale[locale] || tagDataByLocale.en}
    />
  )
}
