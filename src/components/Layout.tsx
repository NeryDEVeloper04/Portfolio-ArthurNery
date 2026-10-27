import { useEffect, useRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Button from './Button'

export default function Layout() {
  const { theme, toggle } = useTheme()
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])
  return (
    <>
      <div ref={bar} className="progress" />
      <header className="bar">
        <Link to="/" className="logo">
          AN<span>.</span>
        </Link>
        <nav>
          <Link to="/#sobre">Sobre</Link>
          <Link to="/#habilidades">Habilidades</Link>
          <Link to="/#projetos">Projetos</Link>
          <Link to="/#contato">Contato</Link>
          <Button
            className="ghost icon"
            onClick={toggle}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </Button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="foot">
        © {new Date().getFullYear()} Arthur Nery ·{' '}
        <Link to="/dashboard">Painel</Link>
      </footer>
    </>
  )
}
