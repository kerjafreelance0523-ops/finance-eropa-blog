/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'WealthEuro',
  author: 'Marcus Reinhardt',
  headerTitle: 'WealthEuro',
  description:
    'European financial intelligence, market analysis, and wealth strategies. Covering crypto, global markets, and investment insights across the Eurozone.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://finance-eropa-blog.vercel.app',
  siteRepo: 'https://github.com/wealthEuro/blog',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  mastodon: '',
  email: 'editorial@finance-eropa-blog.vercel.app',
  github: '',
  x: 'https://twitter.com/wealthEuro',
  facebook: '',
  youtube: '',
  linkedin: 'https://www.linkedin.com/company/wealthEuro',
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
