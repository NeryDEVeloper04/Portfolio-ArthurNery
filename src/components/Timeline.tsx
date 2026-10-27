import type { TimelineItem } from '../data/profile'
import Reveal from './Reveal'

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="timeline">
      {items.map((it, i) => (
        <li key={it.title}>
          <Reveal delay={i * 120}>
            <small>{it.period}</small>
            <h3>{it.title}</h3>
            <em>{it.place}</em>
            <p>{it.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
