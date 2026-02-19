import { ReactNode } from 'react'
import Image from '@/components/Image'
import Bleed from 'pliny/ui/Bleed'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import { Link } from '@/i18n/navigation'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
}

export default function PostBanner({ content, children }: LayoutProps) {
  const { slug, title, images, date, readingTime } = content
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/banner/1200/630'

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="py-10">
        <header className="mb-10">
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/"
              className="font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100"
            >
              Home
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
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
              {new Date(date).toLocaleDateString(siteMetadata.locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {readingTime?.text && (
              <>
                <span>·</span>
                <span>{readingTime.text}</span>
              </>
            )}
          </div>
        </header>
        <Bleed>
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl">
            <Image src={displayImage} alt={title} fill className="object-cover" />
          </div>
        </Bleed>
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none pt-10 pb-8 font-serif">
          {children}
        </div>
        {siteMetadata.comments && (
          <div
            className="border-t border-gray-200 pt-8 dark:border-gray-700"
            id="comment"
          >
            <Comments slug={slug} />
          </div>
        )}
      </article>
    </SectionContainer>
  )
}
