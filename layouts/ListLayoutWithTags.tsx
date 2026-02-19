'use client'

import { useTranslations } from 'next-intl'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import { Link, usePathname } from '@/i18n/navigation'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  tagData?: Record<string, number>
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const t = useTranslations('blog')
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400 dark:border-gray-600"
            disabled={!prevPage}
          >
            {t('previous')}
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="text-primary-900 hover:bg-primary-50 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition-colors dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
          >
            {t('previous')}
          </Link>
        )}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400 dark:border-gray-600"
            disabled={!nextPage}
          >
            {t('next')}
          </button>
        )}
        {nextPage && (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="text-primary-900 hover:bg-primary-50 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition-colors dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
          >
            {t('next')}
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  tagData: tagDataProp,
}: ListLayoutProps) {
  const t = useTranslations('blog')
  const pathname = usePathname()
  const tagCounts = (tagDataProp ?? tagData) as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="py-10">
      <div className="pb-6">
        <h1 className="text-primary-900 font-serif text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
          {title}
        </h1>
      </div>
      <div className="flex gap-8 sm:gap-12">
        <div className="hidden h-full max-h-screen max-w-[280px] min-w-[250px] flex-wrap overflow-auto rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex dark:border-gray-700 dark:bg-gray-800">
          <div className="w-full">
            {pathname.includes('/blog') && !pathname.includes('/tags/') ? (
              <h3 className="text-primary-900 mb-4 font-bold uppercase dark:text-white">
                {t('allPosts')}
              </h3>
            ) : (
              <Link
                href="/blog"
                className="hover:text-primary-900 mb-4 block font-bold text-gray-500 uppercase transition-colors dark:text-gray-400 dark:hover:text-white"
              >
                {t('allPosts')}
              </Link>
            )}
            <ul className="space-y-2">
              {sortedTags.map((tagName) => {
                return (
                  <li key={tagName}>
                    {decodeURI(pathname.split('/tags/')[1]) === slug(tagName) ? (
                      <span className="bg-primary-900 dark:text-primary-900 inline-block rounded-full px-3 py-1 text-sm font-bold text-white dark:bg-white">
                        {tagName} ({tagCounts[tagName]})
                      </span>
                    ) : (
                      <Link
                        href={`/tags/${slug(tagName)}`}
                        className="hover:border-primary-900 hover:bg-primary-900 dark:hover:text-primary-900 inline-block rounded-full border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:text-white dark:border-gray-600 dark:text-gray-300 dark:hover:border-white dark:hover:bg-white"
                        aria-label={`View posts tagged ${tagName}`}
                      >
                        {tagName} ({tagCounts[tagName]})
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <ul className="space-y-6">
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags, readingTime } = post
              return (
                <li key={path}>
                  <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <dt className="sr-only">{t('publishedOn')}</dt>
                          <dd className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            <time dateTime={date} suppressHydrationWarning>
                              {formatDate(date, siteMetadata.locale)}
                            </time>
                          </dd>
                          {readingTime?.text && (
                            <>
                              <span className="text-gray-300 dark:text-gray-600">·</span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {readingTime.text}
                              </span>
                            </>
                          )}
                        </div>
                        <h2 className="mb-2 font-serif text-xl leading-tight font-bold tracking-tight">
                          <Link
                            href={`/${path}`}
                            className="text-primary-900 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors dark:text-white"
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="mb-3 flex flex-wrap">
                          {tags?.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                          {summary}
                        </p>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}
