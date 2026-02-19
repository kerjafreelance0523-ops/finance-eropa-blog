import { getTranslations } from 'next-intl/server'
import { getBlogsByLocale } from '@/lib/blog'
import SectionContainer from '@/components/SectionContainer'
import { Link } from '@/i18n/navigation'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Sitemap',
  description: 'Complete list of pages and articles on this site.',
})

export default async function SitemapPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params
  const locale = params.locale || 'en'
  const t = await getTranslations('nav')
  const posts = getBlogsByLocale(locale)

  return (
    <SectionContainer>
      <div className="space-y-10 py-10">
        <header>
          <h1 className="text-primary-900 font-serif text-3xl font-bold tracking-tight dark:text-white">
            {t('sitemap')}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Complete list of pages and articles. You can submit this page in Google Search Console.
          </p>
        </header>

        <section>
          <h2 className="text-primary-900 mb-3 font-serif text-xl font-semibold dark:text-white">
            Pages
          </h2>
          <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
            <li>
              <Link
                href="/"
                prefetch
                className="text-primary-700 dark:text-primary-300 hover:underline"
              >
                {t('home')}
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                prefetch
                className="text-primary-700 dark:text-primary-300 hover:underline"
              >
                {t('blog')}
              </Link>
            </li>
            <li>
              <Link
                href="/tags"
                prefetch
                className="text-primary-700 dark:text-primary-300 hover:underline"
              >
                {t('tags')}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                prefetch
                className="text-primary-700 dark:text-primary-300 hover:underline"
              >
                {t('about')}
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-primary-900 mb-3 font-serif text-xl font-semibold dark:text-white">
            {t('blog')}
          </h2>
          <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  prefetch
                  className="text-primary-700 dark:text-primary-300 hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SectionContainer>
  )
}
