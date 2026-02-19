import 'css/tailwind.css'
import 'remark-github-blockquote-alert/alert.css'

import { Inter, Lora } from 'next/font/google'
import Script from 'next/script'
import { getLocale } from 'next-intl/server'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()
  const basePath = process.env.BASE_PATH || ''
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || siteMetadata.googleAdsenseId

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${lora.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#102a43"
      />
      <meta name="msapplication-TileColor" content="#102a43" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f0f4f8" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a1929" />
      <meta name="google-site-verification" content="33KXzGh9Ug2tLMLGVl2ZBkSkAZtOAl1NHhBcwmx9UY8" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body className="bg-primary-50 text-primary-900 pl-[calc(100vw-100%)] font-sans antialiased dark:bg-gray-950 dark:text-gray-100">
        {adsenseId && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        )}
        <NextIntlClientProvider messages={messages}>
          <ThemeProviders>{children}</ThemeProviders>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
