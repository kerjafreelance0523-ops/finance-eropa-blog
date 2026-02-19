'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'nl', label: 'NL' },
] as const

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white p-0.5 dark:border-gray-700 dark:bg-gray-800">
      {locales.map(({ code, label }) => {
        // Manually strip existing locale prefix if present to prevent stacking
        let cleanPath = pathname
        locales.forEach((loc) => {
          if (cleanPath.startsWith(`/${loc.code}/`)) {
            // Remove /en/ part
            cleanPath = cleanPath.replace(`/${loc.code}`, '')
          } else if (cleanPath === `/${loc.code}`) {
            // Remove /en part
            cleanPath = '/'
          }
        })

        // Also handle the case where pathname starts with a slash but is just the locale
        if (cleanPath.startsWith('/') && locales.some((l) => cleanPath === `/${l.code}`)) {
          cleanPath = '/'
        }

        // Just in case, ensure we don't have double slashes if it was root
        if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath

        return (
          <Link
            key={code}
            href={cleanPath}
            locale={code}
            className={`min-w-[2rem] rounded-md px-2 py-1 text-center text-xs font-semibold transition-colors ${
              locale === code
                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
            }`}
            aria-label={`Switch to ${label}`}
            aria-current={locale === code ? 'true' : undefined}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
