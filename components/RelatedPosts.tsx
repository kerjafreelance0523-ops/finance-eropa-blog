import { Link } from '@/i18n/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Image from '@/components/Image'

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
        {posts.map((post) => {
          const coverImage = post.images?.[0]
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              prefetch
              className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="aspect-[2/1] w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                {coverImage ? (
                  <Image
                    src={coverImage}
                    alt=""
                    width={400}
                    height={200}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 dark:bg-gray-600" aria-hidden />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
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
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
