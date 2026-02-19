'use client'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock-upgrade'
import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import headerNavLinks from '@/data/headerNavLinks'

const hrefToNavKey: Record<string, string> = {
  '/': 'home',
  '/blog': 'blog',
  '/tags': 'tags',
  '/about': 'about',
}

const MobileNav = () => {
  const t = useTranslations('nav')
  const [navShow, setNavShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
    return clearAllBodyScrollLocks
  }, [])

  const onToggleNav = () => {
    setNavShow((status) => {
      const el = navRef.current
      if (el) {
        if (status) {
          enableBodyScroll(el)
        } else {
          disableBodyScroll(el)
        }
      }
      return !status
    })
  }

  return (
    <>
      <button aria-label="Toggle Menu" onClick={onToggleNav} className="lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {mounted && (
        <div
          className={`fixed inset-0 z-60 transition-opacity duration-300 ${
            navShow ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="fixed inset-0 bg-black/25" onClick={onToggleNav} />
          <div
            className={`bg-primary-50/98 fixed top-0 right-0 z-70 h-full w-full transform transition-transform duration-300 ease-in-out dark:bg-gray-950/98 ${
              navShow ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <nav
              ref={navRef}
              className="mt-8 flex h-full basis-0 flex-col items-start overflow-y-auto pt-2 pl-12 text-left"
            >
              {headerNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mb-4 py-2 pr-4 font-serif text-2xl font-bold tracking-wide text-gray-900 outline-0 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-400"
                  onClick={onToggleNav}
                >
                  {t(hrefToNavKey[link.href] || 'home')}
                </Link>
              ))}
            </nav>

            <button
              className="fixed top-7 right-4 z-80 h-16 w-16 p-4 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              aria-label="Toggle Menu"
              onClick={onToggleNav}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileNav
