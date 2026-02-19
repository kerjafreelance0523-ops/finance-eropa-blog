import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts, coreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

export function getBlogsByLocale(locale: string) {
  const filtered = allBlogs.filter(
    (b) => b.locale === locale && (process.env.NODE_ENV === 'development' || !b.draft)
  )
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
  const localePosts = allBlogs.filter(
    (post) =>
      post.locale === locale &&
      post.slug !== currentSlug &&
      (process.env.NODE_ENV === 'development' || !post.draft)
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
