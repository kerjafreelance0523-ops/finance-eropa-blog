import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="mx-auto max-w-7xl overflow-x-hidden px-4 sm:px-6">{children}</section>
}
