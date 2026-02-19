import Main from './Main'
import { getBlogsByLocale } from '@/lib/blog'

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params
  const locale = params.locale || 'en'
  const posts = getBlogsByLocale(locale)
  return <Main posts={posts} />
}
