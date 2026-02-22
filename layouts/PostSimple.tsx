import { ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import { Link } from '@/i18n/navigation'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import siteMetadata from '@/data/siteMetadata'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  shareUrl?: string
}

export default async function PostSimple({ content, children }: LayoutProps) {
  const t = await getTranslations('blog')
  const { date, title, slug, readingTime } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="py-10">
        <header className="border-b border-gray-200 pb-8 dark:border-gray-700">
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/"
              className="font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100"
            >
              Home
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3 w-3"
              aria-hidden
            >
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
            </svg>
            <Link
              href="/blog"
              className="font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100"
            >
              Blog
            </Link>
          </div>
          <PageTitle>{title}</PageTitle>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={date} suppressHydrationWarning>
              {formatDate(date, siteMetadata.locale)}
            </time>
            {readingTime?.text && (
              <>
                <span>·</span>
                <span>{readingTime.text}</span>
              </>
            )}
          </div>
        </header>
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none pt-10 pb-8 font-serif">
          {children}
        </div>
        {siteMetadata.comments && (
          <div className="border-t border-gray-200 pt-8 dark:border-gray-700" id="comment">
            <Comments slug={slug} />
          </div>
        )}
      </article>
    </SectionContainer>
  )
}
