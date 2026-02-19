'use client'

import { useEffect, useRef } from 'react'

interface AdSlotProps {
  slot?: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  position?: 'sidebar' | 'in-article' | 'banner'
  className?: string
}

export default function AdSlot({
  slot,
  format = 'auto',
  position = 'banner',
  className = '',
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const adsenseId = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_ADSENSE_ID : null

  useEffect(() => {
    if (!adsenseId || !slot) return
    try {
      ;((window as unknown as Record<string, unknown[]>).adsbygoogle =
        (window as unknown as Record<string, unknown[]>).adsbygoogle || []).push({})
    } catch {
      // AdSense not loaded
    }
  }, [adsenseId, slot])

  const sizeClass =
    position === 'sidebar'
      ? 'min-h-[250px]'
      : position === 'in-article'
        ? 'min-h-[100px]'
        : 'min-h-[90px]'

  if (!adsenseId || !slot) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 text-xs font-medium tracking-widest text-gray-600 uppercase dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400 ${sizeClass} ${className}`}
      >
        <span>Sponsored Content</span>
      </div>
    )
  }

  return (
    <div ref={adRef} className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
