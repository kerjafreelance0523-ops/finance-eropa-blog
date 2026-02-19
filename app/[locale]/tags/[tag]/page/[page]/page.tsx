import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagDataEn from 'app/tag-data-en.json'
import tagDataDe from 'app/tag-data-de.json'
import tagDataNl from 'app/tag-data-nl.json'
import { notFound } from 'next/navigation'

const tagDataByLocale: Record<string, Record<string, number>> = {
  en: tagDataEn as Record<string, number>,
  de: tagDataDe as Record<string, number>,
  nl: tagDataNl as Record<string, number>,
}

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const paths: { locale: string; tag: string; page: string }[] = []
  for (const locale of ['en', 'de', 'nl']) {
    const tagCounts = tagDataByLocale[locale] || {}
    Object.keys(tagCounts).forEach((tag) => {
      const postCount = tagCounts[tag]
      const totalPages = Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE))
      Array.from({ length: totalPages }, (_, i) => {
        paths.push({
          locale,
          tag: encodeURI(tag),
          page: (i + 1).toString(),
        })
      })
    })
  }
  return paths
}

export default async function TagPage(props: {
  params: Promise<{ locale: string; tag: string; page: string }>
}) {
  const params = await props.params
  const locale = params.locale || 'en'
  const tag = decodeURI(params.tag)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const pageNumber = parseInt(params.page)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.locale === locale && post.tags && post.tags.map((t) => slug(t)).includes(tag)
      )
    )
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
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
