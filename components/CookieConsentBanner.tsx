'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const COOKIE_NAME = 'cookie_consent'
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60 // 1 year in seconds

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

function setCookie(name: string, value: string, maxAge: number) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`
}

function getLocalStorage(key: string): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function setLocalStorage(key: string, value: string) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, value)
  } catch {
    // Ignore localStorage errors
  }
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if consent already exists
    const consent = getCookie(COOKIE_NAME) || getLocalStorage(COOKIE_NAME)
    if (!consent || (consent !== 'accept' && consent !== 'reject')) {
      setVisible(true)
    }

    // Listen for show-cookie-settings event
    const handleShowSettings = () => {
      setVisible(true)
    }

    window.addEventListener('show-cookie-settings', handleShowSettings)
    return () => {
      window.removeEventListener('show-cookie-settings', handleShowSettings)
    }
  }, [])

  const handleAccept = () => {
    setCookie(COOKIE_NAME, 'accept', COOKIE_MAX_AGE)
    setLocalStorage(COOKIE_NAME, 'accept')
    setVisible(false)
    // Dispatch event for ConsentAwareAdSense
    window.dispatchEvent(
      new CustomEvent('cookie-consent-updated', { detail: { consent: 'accept' } })
    )
  }

  const handleReject = () => {
    setCookie(COOKIE_NAME, 'reject', COOKIE_MAX_AGE)
    setLocalStorage(COOKIE_NAME, 'reject')
    setVisible(false)
    // Dispatch event for ConsentAwareAdSense
    window.dispatchEvent(
      new CustomEvent('cookie-consent-updated', { detail: { consent: 'reject' } })
    )
  }

  if (!mounted || !visible) {
    return null
  }

  return (
    <div
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-gray-900 px-4 py-4 shadow-lg dark:border-gray-700 dark:bg-gray-950"
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="true"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-white">
            We use cookies and similar technologies for ads and analytics. You can accept or reject
            non-essential cookies.{' '}
            <Link
              href="/cookie-policy"
              className="text-primary-400 hover:text-primary-300 underline"
            >
              Learn more
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleReject}
            className="focus:ring-primary-500 rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
            aria-label="Reject non-essential cookies"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
            aria-label="Accept all cookies"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
