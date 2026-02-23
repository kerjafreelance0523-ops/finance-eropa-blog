/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'EuroCoinInvest',
  author: 'Marcus Reinhardt',
  headerTitle: 'EuroCoinInvest',
  description:
    'European financial intelligence, market analysis, and wealth strategies. Covering crypto, global markets, and investment insights across the Eurozone.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://eurocoinvest.com',
  siteRepo: 'https://github.com/eurocoinvest/blog',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  mastodon: '',
  email: 'editorial@eurocoinvest.com',
  github: '',
  x: 'https://twitter.com/eurocoinvest',
  facebook: '',
  youtube: '',
  linkedin: 'https://www.linkedin.com/company/eurocoinvest',
  threads: '',
  instagram: '',
  medium: '',
  bluesky: '',
  locale: 'en-US',
  stickyNav: true,
  /** Google AdSense publisher ID (ca-pub-xxxx). Override with NEXT_PUBLIC_ADSENSE_ID. */
  googleAdsenseId: 'ca-pub-6822525809788248',
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
