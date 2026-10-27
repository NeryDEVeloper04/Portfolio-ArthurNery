import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -999, y: -999 }
    let w = 0
    let h = 0
    let raf = 0
    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    const pts = Array.from({ length: w < 640 ? 38 : 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
    }))
    const frame = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < 130) {
          p.x += (dx / d) * 1.6
          p.y += (dy / d) * 1.6
        }
        ctx.fillStyle = 'rgba(124,92,255,.9)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < 120) {
            ctx.strokeStyle = `rgba(56,189,248,${(1 - d / 120) * 0.45})`
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      if (!reduce) raf = requestAnimationFrame(frame)
    }
    const move = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    addEventListener('mousemove', move)
    addEventListener('resize', resize)
    frame()
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('mousemove', move)
      removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={ref} className="particles" aria-hidden="true" />
}
