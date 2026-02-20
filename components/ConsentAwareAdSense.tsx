'use client'

import { useEffect, useRef } from 'react'

interface ConsentAwareAdSenseProps {
  publisherId: string
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

function getLocalStorage(key: string): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function getConsent(): 'accept' | 'reject' | null {
  const cookieConsent = getCookie('cookie_consent')
  const storageConsent = getLocalStorage('cookie_consent')
  const consent = cookieConsent || storageConsent
  if (consent === 'accept' || consent === 'reject') {
    return consent
  }
  return null
}

export default function ConsentAwareAdSense({ publisherId }: ConsentAwareAdSenseProps) {
  const scriptLoadedRef = useRef(false)
  const nonPersonalizedSetRef = useRef(false)

  const loadAdSenseScript = (nonPersonalized: boolean) => {
    if (scriptLoadedRef.current) {
      // Script already loaded, just update non-personalized flag if needed
      if (nonPersonalized && !nonPersonalizedSetRef.current) {
        if (typeof window !== 'undefined') {
          ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
          ;(window as any).adsbygoogle.requestNonPersonalizedAds = 1
          nonPersonalizedSetRef.current = true
        }
      }
      return
    }

    // Create script element
    const script = document.createElement('script')
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-ad-client', publisherId)

    // Set non-personalized ads before script loads if needed
    if (nonPersonalized) {
      script.onload = () => {
        if (typeof window !== 'undefined') {
          ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
          ;(window as any).adsbygoogle.requestNonPersonalizedAds = 1
          nonPersonalizedSetRef.current = true
        }
      }
    }

    // Append to head
    document.head.appendChild(script)
    scriptLoadedRef.current = true
  }

  useEffect(() => {
    const checkAndLoad = () => {
      const consent = getConsent()

      if (consent === 'accept') {
        loadAdSenseScript(false)
      } else if (consent === 'reject') {
        loadAdSenseScript(true)
      }
      // If no consent, don't load script
    }

    // Check on mount
    checkAndLoad()

    // Listen for consent updates
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ consent: 'accept' | 'reject' }>
      if (customEvent.detail?.consent === 'accept') {
        loadAdSenseScript(false)
      } else if (customEvent.detail?.consent === 'reject') {
        loadAdSenseScript(true)
      }
    }

    window.addEventListener('cookie-consent-updated', handleConsentUpdate)

    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate)
    }
  }, [publisherId])

  // This component doesn't render anything visible
  return null
}
