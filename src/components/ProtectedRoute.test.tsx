import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ProtectedRoute from './ProtectedRoute'

const auth = vi.hoisted(() => ({
  value: { session: null as unknown, loading: false },
}))
vi.mock('../hooks/useAuth', () => ({ useAuth: () => auth.value }))

const renderAt = () =>
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/login" element={<p>tela de login</p>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <p>segredo</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  )

afterEach(cleanup)

describe('ProtectedRoute', () => {
  it('redireciona para /login sem sessão', () => {
    auth.value = { session: null, loading: false }
    renderAt()
    expect(screen.getByText('tela de login')).toBeTruthy()
    expect(screen.queryByText('segredo')).toBeNull()
  })
  it('não mostra o conteúdo enquanto verifica a sessão', () => {
    auth.value = { session: null, loading: true }
    renderAt()
    expect(screen.getByText('Verificando acesso…')).toBeTruthy()
    expect(screen.queryByText('segredo')).toBeNull()
  })
  it('mostra o conteúdo com sessão ativa', () => {
    auth.value = { session: {}, loading: false }
    renderAt()
    expect(screen.getByText('segredo')).toBeTruthy()
  })
})
