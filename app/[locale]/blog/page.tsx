import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { getBlogsByLocale } from '@/lib/blog'
import tagDataEn from 'app/tag-data-en.json'
import tagDataDe from 'app/tag-data-de.json'
import tagDataNl from 'app/tag-data-nl.json'

const tagDataByLocale: Record<string, Record<string, number>> = {
  en: tagDataEn as Record<string, number>,
  de: tagDataDe as Record<string, number>,
  nl: tagDataNl as Record<string, number>,
}

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage(props: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page: string }>
}) {
  const params = await props.params
  const locale = params.locale || 'en'
  const posts = getBlogsByLocale(locale)
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
      tagData={tagDataByLocale[locale] || tagDataByLocale.en}
    />
  )
}
