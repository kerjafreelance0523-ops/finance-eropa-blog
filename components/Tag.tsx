import { Link } from '@/i18n/navigation'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  const textStr = String(text)
  return (
    <Link
      href={`/tags/${slug(textStr)}`}
      className="hover:border-primary-900 hover:bg-primary-900 dark:hover:text-primary-900 mr-2 mb-2 inline-block rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:border-white dark:hover:bg-white"
    >
      {textStr.split(' ').join('-')}
    </Link>
  )
}

export default Tag
