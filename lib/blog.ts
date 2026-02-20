import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts, coreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

function isPostVisible(post: Blog, locale: string, now: Date): boolean {
  if (post.locale !== locale) {
    return false
  }

  const isDev = process.env.NODE_ENV === 'development'

  if (!isDev && post.draft) {
    return false
  }

  if (!post.date) {
    return isDev
  }

  const publishedAt = new Date(post.date)
  if (Number.isNaN(publishedAt.getTime())) {
    return isDev
  }

  if (isDev) {
    return true
  }

  return publishedAt <= now
}

export function getBlogsByLocale(locale: string) {
  const now = new Date()
  const filtered = allBlogs.filter((b) => isPostVisible(b as Blog, locale, now))
  return allCoreContent(sortPosts(filtered))
}

export function findBlogPost(slug: string, locale: string) {
  return allBlogs.find((b) => b.slug === slug && b.locale === locale)
}

export function getRelatedPosts(
  currentSlug: string,
  locale: string,
  tags: string[],
  maxPosts: number = 3
) {
  const now = new Date()
  const localePosts = allBlogs.filter(
    (post) => post.slug !== currentSlug && isPostVisible(post as Blog, locale, now)
  )

  const scored = localePosts.map((post) => {
    const matchingTags = (post.tags || []).filter((t) => tags.includes(t))
    return { post, score: matchingTags.length }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    )
    .slice(0, maxPosts)
    .map((s) => coreContent(s.post))
}
