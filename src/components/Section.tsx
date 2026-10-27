import type { ReactNode } from 'react'
import Reveal from './Reveal'

export default function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="section">
      <Reveal>
        <h2 className="title">{title}</h2>
      </Reveal>
      {children}
    </section>
  )
}
