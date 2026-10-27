import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type Theme = 'light' | 'dark'
const Ctx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})
export const useTheme = () => useContext(Ctx)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* armazenamento indisponível */
    }
  }, [theme])
  return (
    <Ctx.Provider
      value={{
        theme,
        toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      }}
    >
      {children}
    </Ctx.Provider>
  )
}
