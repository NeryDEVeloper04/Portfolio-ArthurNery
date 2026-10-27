import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Dashboard from './Dashboard'
import { listMessages, markAnswered } from '../services/messages'
import { listFeatured, setFeatured } from '../services/featured'
import { fetchRepos } from '../services/github'

vi.mock('../services/messages', () => ({
  listMessages: vi.fn(),
  markAnswered: vi.fn(),
}))
vi.mock('../services/featured', () => ({
  listFeatured: vi.fn(),
  setFeatured: vi.fn(),
}))
vi.mock('../services/github', () => ({ fetchRepos: vi.fn() }))
vi.mock('../lib/supabase', () => ({ supabase: { auth: { signOut: vi.fn() } } }))

const message = {
  id: '1',
  name: 'Ana',
  email: 'ana@x.com',
  message: 'Gostei muito do seu portfólio!',
  answered: false,
  created_at: '2026-10-01T00:00:00Z',
}
const repo = {
  id: 1,
  name: 'meu-app',
  description: null,
  language: 'JavaScript',
  pushed_at: '2026-10-01T00:00:00Z',
  html_url: 'https://github.com/x/meu-app',
  fork: false,
}

const renderDashboard = () =>
  render(
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <Dashboard />
    </QueryClientProvider>,
  )

beforeEach(() => {
  vi.mocked(listMessages).mockResolvedValue([message])
  vi.mocked(markAnswered).mockResolvedValue(undefined)
  vi.mocked(listFeatured).mockResolvedValue([])
  vi.mocked(setFeatured).mockResolvedValue(undefined)
  vi.mocked(fetchRepos).mockResolvedValue([repo])
})
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('Dashboard', () => {
  it('lista as mensagens recebidas', async () => {
    renderDashboard()
    expect(
      await screen.findByText('Gostei muito do seu portfólio!'),
    ).toBeTruthy()
    expect(screen.getByText('1 pendentes')).toBeTruthy()
  })

  it('marca uma mensagem como respondida', async () => {
    renderDashboard()
    fireEvent.click(await screen.findByText('Marcar como respondida'))
    await waitFor(() => expect(markAnswered).toHaveBeenCalled())
    expect(vi.mocked(markAnswered).mock.calls[0][0]).toBe('1')
  })

  it('seleciona um projeto em destaque', async () => {
    renderDashboard()
    fireEvent.click(await screen.findByLabelText('meu-app'))
    await waitFor(() =>
      expect(setFeatured).toHaveBeenCalledWith('meu-app', true),
    )
  })

  it('mostra estado vazio sem mensagens', async () => {
    vi.mocked(listMessages).mockResolvedValue([])
    renderDashboard()
    expect(await screen.findByText('Nenhuma mensagem ainda.')).toBeTruthy()
  })

  it('mostra erro quando as mensagens não carregam', async () => {
    vi.mocked(listMessages).mockRejectedValue(new Error('falhou'))
    renderDashboard()
    expect(await screen.findByText('Erro ao carregar mensagens.')).toBeTruthy()
  })
})
