'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import { Link, usePathname } from '@/i18n/navigation'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
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

  const [searchValue, setSearchValue] = useState('')
  const [yearFilter, setYearFilter] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  const yearOptions = useMemo(() => {
    const years = [...new Set(posts.map((p) => new Date(p.date).getFullYear()))].sort((a, b) => b - a)
    return years
  }, [posts])

  const filteredAndSortedPosts = useMemo(() => {
    let result = posts

    if (searchValue.trim()) {
      const q = searchValue.trim().toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) || (p.summary && p.summary.toLowerCase().includes(q))
      )
    }

    if (yearFilter) {
      const y = Number(yearFilter)
      result = result.filter((p) => new Date(p.date).getFullYear() === y)
    }

    result = [...result].sort((a, b) => {
      const da = new Date(a.date).getTime()
      const db = new Date(b.date).getTime()
      return sortOrder === 'newest' ? db - da : da - db
    })

    return result
  }, [posts, searchValue, yearFilter, sortOrder])

  const hasActiveFilter = Boolean(searchValue.trim() || yearFilter)
  const displayPosts =
    hasActiveFilter ? filteredAndSortedPosts : initialDisplayPosts.length > 0 ? initialDisplayPosts : posts
  const showPagination = pagination && pagination.totalPages > 1 && !hasActiveFilter

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
        <div className="flex-1 min-w-0">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                aria-label="Search articles"
                placeholder="Search articles"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-200 bg-white py-2 pl-4 pr-10 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <svg
                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select
                aria-label="Filter by year"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
              >
                <option value="">All years</option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                aria-label="Sort order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
          {hasActiveFilter && (
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredAndSortedPosts.length} result{filteredAndSortedPosts.length !== 1 ? 's' : ''}
            </p>
          )}
          <ul className="space-y-6">
            {!displayPosts.length && 'No posts found.'}
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags, readingTime } = post
              const coverImage = post.images?.[0]
              return (
                <li key={path}>
                  <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-40 flex-shrink-0 overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none bg-gray-100 dark:bg-gray-700 aspect-video sm:aspect-auto sm:h-auto sm:min-h-[140px]">
                        {coverImage ? (
                          <Link href={`/${path}`} className="block h-full w-full">
                            <Image
                              src={coverImage}
                              alt=""
                              width={160}
                              height={90}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </Link>
                        ) : (
                          <div className="h-full w-full bg-gray-200 dark:bg-gray-600" aria-hidden />
                        )}
                      </div>
                      <div className="flex-1 p-4 sm:p-6 min-w-0">
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
          {showPagination && (
            <Pagination currentPage={pagination!.currentPage} totalPages={pagination!.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}
