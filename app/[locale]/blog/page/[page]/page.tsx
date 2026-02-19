import ListLayout from '@/layouts/ListLayoutWithTags'
import { notFound } from 'next/navigation'
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

export const generateStaticParams = async () => {
  const locales = ['en', 'de', 'nl']
  const paths: { locale: string; page: string }[] = []
  for (const locale of locales) {
    const posts = getBlogsByLocale(locale)
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
    for (let i = 1; i <= totalPages; i++) {
      paths.push({ locale, page: i.toString() })
    }
  }
  return paths
}

export default async function Page(props: { params: Promise<{ locale: string; page: string }> }) {
  const params = await props.params
  const locale = params.locale || 'en'
  const posts = getBlogsByLocale(locale)
  const pageNumber = parseInt(params.page as string)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
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
