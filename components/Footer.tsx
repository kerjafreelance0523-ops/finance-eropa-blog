import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default async function Footer() {
  const t = await getTranslations('nav')
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-900 pt-16 pb-8 text-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 grid grid-cols-1 gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="mb-6 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 shrink-0"
                aria-hidden
              >
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z" />
              </svg>
              <h2 className="font-serif text-2xl font-bold">{siteMetadata.headerTitle}</h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-300">{siteMetadata.description}</p>
            <div className="flex gap-3">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
              <SocialIcon kind="x" href={siteMetadata.x} size={5} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
            </div>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-100 uppercase">
              Sections
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link href="/blog" prefetch className="transition-colors hover:text-white">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href="/tags" prefetch className="transition-colors hover:text-white">
                  {t('tags')}
                </Link>
              </li>
              <li>
                <Link href="/about" prefetch className="transition-colors hover:text-white">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/sitemap" prefetch className="transition-colors hover:text-white">
                  {t('sitemap')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-100 uppercase">
              Topics
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link href="/tags/bitcoin" prefetch className="transition-colors hover:text-white">
                  Bitcoin
                </Link>
              </li>
              <li>
                <Link href="/tags/crypto" prefetch className="transition-colors hover:text-white">
                  Crypto
                </Link>
              </li>
              <li>
                <Link href="/tags/gold" prefetch className="transition-colors hover:text-white">
                  Gold
                </Link>
              </li>
              <li>
                <Link
                  href="/tags/investment"
                  prefetch
                  className="transition-colors hover:text-white"
                >
                  Investment
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-100 uppercase">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link
                  href="/privacy-policy"
                  prefetch
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  prefetch
                  className="transition-colors hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" prefetch className="transition-colors hover:text-white">
                  Cookie Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-400 md:flex-row">
          <div className="flex flex-col gap-2">
            <p suppressHydrationWarning>
              &copy; {new Date().getFullYear()} {siteMetadata.headerTitle}. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Content on this site is for information only and is not investment or financial
              advice. Past performance and analysis do not guarantee future results.
            </p>
          </div>
          <div className="flex gap-6">
            <span>Zurich</span>
            <span>London</span>
            <span>Frankfurt</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
