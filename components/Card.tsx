import Image from './Image'
import { Link } from '@/i18n/navigation'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50">
    {imgSrc &&
      (href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          <Image
            alt={title}
            src={imgSrc}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={544}
            height={306}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="h-48 w-full object-cover"
          width={544}
          height={306}
        />
      ))}
    <div className="p-6">
      <h2 className="mb-3 font-serif text-xl font-bold tracking-tight">
        {href ? (
          <Link
            href={href}
            className="text-gray-900 transition-colors group-hover:text-gray-600 dark:text-gray-100 dark:group-hover:text-gray-400"
            aria-label={`Link to ${title}`}
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      <p className="mb-4 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      {href && (
        <Link
          href={href}
          className="text-sm font-bold text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-400"
          aria-label={`Link to ${title}`}
        >
          Read more &rarr;
        </Link>
      )}
    </div>
  </div>
)

export default Card
