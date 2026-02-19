import { getTranslations } from 'next-intl/server'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import { Link } from '@/i18n/navigation'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import LanguageSwitcher from './LanguageSwitcher'

const hrefToNavKey: Record<string, string> = {
  '/': 'home',
  '/blog': 'blog',
  '/tags': 'tags',
  '/about': 'about',
  '/projects': 'projects',
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      width="40"
      height="40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="20" cy="20" r="18.5" />
      <path d="M14 12v18M19 12v18M24 12v18M11 10h18M12 29h16" strokeWidth="1.2" />
      <path d="M10 28 L22 16 L28 20 L34 10 M30 10 L34 10 L34 14" strokeWidth="2" />
    </svg>
  )
}

const Header = async () => {
  const t = await getTranslations('nav')
  let headerClass =
    'flex items-center w-full justify-between h-20 border-b border-gray-200 dark:border-gray-800'
  if (siteMetadata.stickyNav) {
    headerClass +=
      ' sticky top-0 z-50 bg-primary-50/95 backdrop-blur-md dark:bg-gray-950/95 shadow-sm'
  } else {
    headerClass += ' bg-primary-50 dark:bg-gray-950'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle} prefetch>
        <div className="flex items-center gap-3">
          <div className="bg-primary-900 dark:text-primary-900 flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg text-white dark:bg-gray-100">
            <LogoIcon className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <span className="text-primary-900 hidden font-serif text-2xl font-bold tracking-tight sm:block dark:text-white">
              {siteMetadata.headerTitle}
            </span>
            <span className="hidden text-[10px] font-medium tracking-widest text-gray-600 uppercase sm:block dark:text-gray-300">
              Premium European Finance
            </span>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-4 leading-5 sm:gap-6">
        <nav className="no-scrollbar hidden items-center gap-x-6 overflow-x-auto lg:flex">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                className="hover:text-primary-900 text-sm font-semibold text-gray-600 transition-colors dark:text-gray-300 dark:hover:text-white"
              >
                {t(hrefToNavKey[link.href] || 'home')}
              </Link>
            ))}
        </nav>
        <SearchButton />
        <LanguageSwitcher />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
