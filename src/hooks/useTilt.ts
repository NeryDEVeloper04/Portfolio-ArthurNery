import { useRef, type MouseEvent } from 'react'

export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const onMouseMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  return { ref, onMouseMove, onMouseLeave }
}
