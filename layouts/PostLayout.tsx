import { ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import { Link } from '@/i18n/navigation'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import AdSlot from '@/components/AdSlot'
import ArticleShare from '@/components/ArticleShare'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string; images?: string[] }
  prev?: { path: string; title: string; images?: string[] }
  children: ReactNode
  shareUrl?: string
}

export default async function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  shareUrl: shareUrlProp,
}: LayoutProps) {
  const tCommon = await getTranslations('common')
  const tBlog = await getTranslations('blog')
  const { path, slug, date, title, tags, images, readingTime, summary } = content
  const heroImage = images?.[0]
  const shareUrl =
    shareUrlProp ||
    (path ? `${siteMetadata.siteUrl}/${path}` : `${siteMetadata.siteUrl}/blog/${slug}`)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    image: heroImage ? [`${siteMetadata.siteUrl}${heroImage}`] : [],
    datePublished: date,
    dateModified: content.lastmod || date,
    author: authorDetails.map((a) => ({ '@type': 'Person', name: a.name })),
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: { '@type': 'ImageObject', url: `${siteMetadata.siteUrl}/static/images/logo.png` },
    },
    description: summary || '',
  }

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <header className="pb-8">
              <div className="mb-4 flex items-center gap-2 text-sm">
                <Link
                  href="/"
                  prefetch
                  className="hover:text-primary-900 font-medium text-gray-500 transition-colors dark:text-gray-400 dark:hover:text-white"
                >
                  Home
                </Link>
                <span className="text-gray-400 dark:text-gray-500">/</span>
                <Link
                  href="/blog"
                  prefetch
                  className="hover:text-primary-900 font-medium text-gray-500 transition-colors dark:text-gray-400 dark:hover:text-white"
                >
                  Blog
                </Link>
                <span className="text-gray-400 dark:text-gray-500">/</span>
                <span className="text-primary-900 font-bold dark:text-white">Article</span>
              </div>
              <h1 className="text-primary-900 mb-6 font-serif text-3xl leading-tight font-bold tracking-tight md:text-4xl lg:text-5xl dark:text-white">
                {title}
              </h1>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {authorDetails.map((author, index) => (
                    <div
                      key={author.slug || author.name || index}
                      className="flex items-center gap-3"
                    >
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={40}
                          height={40}
                          alt={`Avatar of ${author.name}`}
                          className="h-10 w-10 rounded-full shadow-sm ring-2 ring-white dark:ring-gray-700"
                        />
                      )}
                      <div>
                        <p className="text-primary-900 text-sm font-bold dark:text-white">
                          {author.name}
                        </p>
                        {author.occupation && (
                          <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            {author.occupation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <time dateTime={date} suppressHydrationWarning>
                    {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                  </time>
                  {readingTime?.text && (
                    <>
                      <span className="mx-1 text-gray-400">·</span>
                      <span>{readingTime.text}</span>
                    </>
                  )}
                </div>
              </div>
            </header>

            {heroImage && (
              <figure className="mb-10 overflow-hidden rounded-xl">
                <Image
                  src={heroImage}
                  alt={title}
                  width={960}
                  height={540}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
                  className="h-auto w-full object-cover"
                  priority={true}
                  fetchPriority="high"
                />
                <figcaption className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                  {title}
                </figcaption>
              </figure>
            )}

            <div className="prose prose-lg prose-headings:text-primary-900 prose-a:text-primary-700 prose-a:underline prose-a:decoration-primary-400 prose-strong:text-primary-900 prose-code:text-primary-700 dark:prose-headings:text-white dark:prose-a:text-primary-100 dark:prose-a:decoration-primary-300 dark:prose-a:hover:text-white dark:prose-strong:text-white dark:prose-code:text-primary-300 max-w-none min-w-0 overflow-x-hidden pt-4 pb-8 font-serif text-gray-700 dark:text-gray-200">
              {children}
            </div>

            {tags && (
              <div className="flex flex-wrap gap-2 border-t border-gray-200 pt-6 dark:border-gray-700">
                <span className="mr-2 py-1 text-sm font-bold text-gray-600 dark:text-gray-300">
                  {tCommon('tags')}:
                </span>
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            )}

            <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
              <ArticleShare url={shareUrl} title={title} />
            </div>

            {(next || prev) && (
              <div className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-200 pt-8 sm:grid-cols-2 dark:border-gray-700">
                {prev && prev.path && (
                  <Link
                    href={`/${prev.path}`}
                    prefetch
                    className="group hover:border-primary-500 dark:hover:border-primary-400 flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div>
                      <span className="mb-2 block text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        {tCommon('previousArticle')}
                      </span>
                      {prev.images && prev.images[0] && (
                        <div className="mb-3 overflow-hidden rounded-md">
                          <Image
                            src={prev.images[0]}
                            alt={prev.title}
                            width={200}
                            height={120}
                            className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <span className="text-primary-900 group-hover:text-primary-600 dark:group-hover:text-primary-300 font-serif text-base font-semibold transition-colors dark:text-white">
                        &larr; {prev.title}
                      </span>
                    </div>
                  </Link>
                )}
                {next && next.path && (
                  <Link
                    href={`/${next.path}`}
                    prefetch
                    className="group hover:border-primary-500 dark:hover:border-primary-400 flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 text-right transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div>
                      <span className="mb-2 block text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        {tCommon('nextArticle')}
                      </span>
                      {next.images && next.images[0] && (
                        <div className="mb-3 overflow-hidden rounded-md">
                          <Image
                            src={next.images[0]}
                            alt={next.title}
                            width={200}
                            height={120}
                            className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <span className="text-primary-900 group-hover:text-primary-600 dark:group-hover:text-primary-300 font-serif text-base font-semibold transition-colors dark:text-white">
                        {next.title} &rarr;
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            )}

            <AdSlot position="in-article" className="mt-8" />

            {siteMetadata.comments && (
              <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700" id="comment">
                <Comments slug={slug} />
              </div>
            )}
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-primary-900 text-xs font-bold tracking-widest uppercase dark:text-white">
                  The Daily Briefing
                </span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                Join{' '}
                <span className="text-primary-900 font-bold dark:text-white">
                  50,000+ investors
                </span>{' '}
                who start their day with our curated insights.
              </p>
              <form className="space-y-3">
                <input
                  className="text-primary-900 focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm placeholder-gray-400 transition-all focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  placeholder="your@email.com"
                  type="email"
                />
                <button
                  className="bg-primary-900 hover:bg-primary-800 dark:text-primary-900 w-full rounded-lg px-4 py-2.5 text-sm font-bold text-white shadow-md transition-colors dark:bg-white dark:hover:bg-gray-100"
                  type="button"
                >
                  Get Access
                </button>
              </form>
            </div>
            <AdSlot position="sidebar" />
          </aside>
        </div>
      </article>
    </SectionContainer>
  )
}
