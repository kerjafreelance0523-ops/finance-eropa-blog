'use client'

import { useLocale } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'nl', label: 'NL' },
] as const

/** Build href for a locale: full path with locale prefix so switching triggers a full page load and content updates. */
function getHrefForLocale(pathnameWithoutLocale: string, localeCode: string): string {
  const path = pathnameWithoutLocale.startsWith('/')
    ? pathnameWithoutLocale
    : '/' + pathnameWithoutLocale
  const isDefaultLocale = localeCode === routing.defaultLocale
  if (isDefaultLocale && routing.localePrefix === 'as-needed') {
    return path
  }
  return `/${localeCode}${path}`
}

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  // pathname from next-intl is already without locale prefix
  const pathWithoutLocale = pathname.startsWith('/') ? pathname : '/' + pathname

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white p-0.5 dark:border-gray-700 dark:bg-gray-800">
      {locales.map(({ code, label }) => {
        const href = getHrefForLocale(pathWithoutLocale, code)
        const isActive = locale === code

        return (
          <a
            key={code}
            href={href}
            className={`min-w-[2rem] rounded-md px-2 py-1 text-center text-xs font-semibold transition-colors ${
              isActive
                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
            }`}
            aria-label={`Switch to ${label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {label}
          </a>
        )
      })}
    </div>
  )
}
