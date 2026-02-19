'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Tag from '@/components/Tag'
import AdSlot from '@/components/AdSlot'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from 'next/image'

const MAX_DISPLAY = 6

export default function Home({ posts }) {
  const t = useTranslations('blog')
  const featuredPost = posts[0]
  const sidebarPosts = posts.slice(1, 4)
  const gridPosts = posts.slice(0, MAX_DISPLAY)

  return (
    <div className="space-y-16 py-10">
      {featuredPost && (
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <article className="group cursor-pointer lg:col-span-8">
            <Link href={`/blog/${featuredPost.slug}`} prefetch>
              <div className="relative mb-6 overflow-hidden rounded-xl shadow-sm">
                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800">
                  {featuredPost.images?.[0] ? (
                    <Image
                      src={featuredPost.images[0]}
                      alt={featuredPost.title}
                      width={800}
                      height={450}
                      priority
                      fetchPriority="high"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="from-primary-800 to-primary-900 flex h-full items-center justify-center bg-gradient-to-br">
                      <span className="text-primary-600 text-6xl">&#x25B2;</span>
                    </div>
                  )}
                </div>
                {featuredPost.tags?.[0] && (
                  <div className="absolute bottom-4 left-4">
                    <span className="text-primary-900 rounded-full bg-white/90 px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur">
                      {String(featuredPost.tags[0])}
                    </span>
                  </div>
                )}
              </div>
              <h1 className="text-primary-900 group-hover:text-primary-600 dark:group-hover:text-primary-300 mb-4 font-serif text-3xl leading-tight font-bold transition-colors lg:text-4xl dark:text-white">
                {featuredPost.title}
              </h1>
            </Link>
            <p className="mb-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {featuredPost.summary}
            </p>
            <div className="flex items-center gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <div>
                <p className="text-primary-900 text-sm font-semibold dark:text-white">
                  {siteMetadata.author}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {formatDate(featuredPost.date, siteMetadata.locale)}
                  {featuredPost.readingTime?.text && ` · ${featuredPost.readingTime.text}`}
                </p>
              </div>
              {featuredPost.tags && (
                <div className="ml-auto flex gap-2">
                  {featuredPost.tags.slice(0, 3).map((tag) => (
                    <span
                      key={String(tag)}
                      className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    >
                      #{String(tag)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>

          <aside className="flex flex-col gap-6 border-l-0 pl-0 lg:col-span-4 lg:border-l lg:border-gray-200 lg:pl-6 dark:lg:border-gray-700">
            <h2 className="mb-2 text-sm font-bold tracking-widest text-gray-600 uppercase dark:text-gray-300">
              {t('allPosts')}
            </h2>
            {sidebarPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                prefetch
                className="group flex items-start gap-4 border-b border-gray-100 pb-6 last:border-0 dark:border-gray-700"
              >
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    {post.tags?.[0] && (
                      <span className="text-primary-900 dark:text-primary-300 text-[10px] font-bold tracking-wide uppercase">
                        {String(post.tags[0])}
                      </span>
                    )}
                    <span className="text-[10px] text-gray-600 dark:text-gray-300">
                      {formatDate(post.date, siteMetadata.locale)}
                    </span>
                  </div>
                  <h4 className="text-primary-900 group-hover:text-primary-600 dark:group-hover:text-primary-300 font-serif text-lg leading-snug font-semibold transition-colors dark:text-white">
                    {post.title}
                  </h4>
                </div>
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                  {post.images?.[0] ? (
                    <Image
                      src={post.images[0]}
                      alt={post.title}
                      width={80}
                      height={80}
                      sizes="80px"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700">
                      <span className="text-2xl text-gray-400 dark:text-gray-500">&#9650;</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
            <AdSlot position="sidebar" className="mt-4" />
          </aside>
        </section>
      )}

      <section className="bg-primary-900 overflow-hidden rounded-xl p-8 lg:p-12">
        <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="mb-2 font-serif text-3xl font-bold text-white">The Morning Briefing</h2>
            <p className="text-primary-200 text-lg">
              Essential market intelligence delivered to your inbox daily.
            </p>
          </div>
          <div className="w-full min-w-[300px] lg:w-auto">
            <form className="flex flex-col gap-3 sm:flex-row">
              <input
                className="placeholder-primary-300 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all focus:border-white focus:bg-white/20 focus:outline-none"
                placeholder="Enter your email"
                type="email"
              />
              <button
                className="text-primary-900 hover:bg-primary-50 rounded-lg bg-white px-6 py-3 font-bold shadow-lg transition-colors"
                type="button"
              >
                Subscribe
              </button>
            </form>
            <p className="text-primary-300 mt-3 text-center text-xs lg:text-left">
              Join 45,000+ professionals. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <AdSlot position="banner" />

      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-primary-900 font-serif text-3xl font-bold dark:text-white">
            Latest Intelligence
          </h2>
          <Link
            href="/blog"
            prefetch
            aria-label="View all blog posts"
            className="text-primary-700 hover:text-primary-900 dark:text-primary-300 flex items-center gap-1 text-sm font-semibold hover:underline dark:hover:text-white"
          >
            {t('allPosts')} &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post) => {
            const { slug, date, title, summary, tags, readingTime } = post
            return (
              <article
                key={slug}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <Link href={`/blog/${slug}`} prefetch className="block">
                  <div className="relative h-48 overflow-hidden">
                    {post.images?.[0] ? (
                      <Image
                        src={post.images[0]}
                        alt={title}
                        width={400}
                        height={200}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="from-primary-100 to-primary-200 flex h-full w-full items-center justify-center bg-gradient-to-br dark:from-gray-600 dark:to-gray-700">
                        <span className="text-primary-400 text-5xl dark:text-gray-500">
                          &#x25B2;
                        </span>
                      </div>
                    )}
                    {tags?.[0] && (
                      <div className="absolute top-3 left-3">
                        <span className="text-primary-900 rounded bg-white/95 px-2 py-1 text-xs font-bold shadow-sm">
                          {String(tags[0])}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <Link href={`/blog/${slug}`} prefetch>
                    <h3 className="text-primary-900 group-hover:text-primary-600 dark:group-hover:text-primary-300 mb-3 font-serif text-xl leading-tight font-bold transition-colors dark:text-white">
                      {title}
                    </h3>
                  </Link>
                  <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                    {summary}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {readingTime?.text || formatDate(date, siteMetadata.locale)}
                    </span>
                    <Link
                      href={`/blog/${slug}`}
                      prefetch
                      className="text-primary-700 hover:text-primary-900 dark:text-primary-300 text-xs font-bold dark:hover:text-white"
                    >
                      {t('readMore')} &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/blog"
              prefetch
              aria-label="View all blog posts"
              className="text-primary-900 hover:bg-primary-50 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              {t('allPosts')}
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
