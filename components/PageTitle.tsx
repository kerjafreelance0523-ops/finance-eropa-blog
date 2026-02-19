import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="font-serif text-3xl leading-snug font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
      {children}
    </h1>
  )
}
