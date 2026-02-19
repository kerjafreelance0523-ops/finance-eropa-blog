import { Link } from '@/i18n/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

interface RelatedPostsProps {
  posts: CoreContent<Blog>[]
  locale: string
}

const titles: Record<string, string> = {
  en: 'Related Articles',
  de: 'Verwandte Artikel',
  nl: 'Gerelateerde artikelen',
}

export default function RelatedPosts({ posts, locale }: RelatedPostsProps) {
  if (!posts.length) return null

  const title = titles[locale] || titles.en

  return (
    <section className="pt-8">
      <h2 className="mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            prefetch
            className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              {formatDate(post.date, siteMetadata.locale)}
            </p>
            <h3 className="text-primary-900 group-hover:text-primary-600 dark:group-hover:text-primary-300 mb-2 font-serif text-lg font-bold transition-colors dark:text-white">
              {post.title}
            </h3>
            {post.summary && (
              <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                {post.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
