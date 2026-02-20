import { Link } from '@/i18n/navigation'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagDataEn from '../../tag-data-en.json'
import tagDataDe from '../../tag-data-de.json'
import tagDataNl from '../../tag-data-nl.json'
import { genPageMetadata } from '../../seo'

const tagDataByLocale: Record<string, Record<string, number>> = {
  en: tagDataEn as Record<string, number>,
  de: tagDataDe as Record<string, number>,
  nl: tagDataNl as Record<string, number>,
}

export const metadata = genPageMetadata({ title: 'Tags', description: 'Explore topics' })

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params
  const locale = params.locale || 'en'
  const tagCounts = tagDataByLocale[locale] || tagDataByLocale.en
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <div className="py-10">
      <div className="mb-10 border-b border-gray-200 pb-8 dark:border-gray-700">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Topics
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Explore our coverage across finance, markets, and digital assets.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {tagKeys.length === 0 && <p className="text-gray-500 dark:text-gray-400">No tags found.</p>}
        {sortedTags.map((t) => {
          return (
            <Link
              key={t}
              href={`/tags/${slug(t)}`}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-100 dark:hover:bg-gray-100 dark:hover:text-gray-900"
              aria-label={`View posts tagged ${t}`}
            >
              {t}
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {tagCounts[t]}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
