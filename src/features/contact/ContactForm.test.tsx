import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ContactForm from './ContactForm'
import { sendMessage } from '../../services/messages'

vi.mock('../../services/messages', () => ({ sendMessage: vi.fn() }))

const fill = (name: string, email: string, message: string) => {
  fireEvent.change(screen.getByLabelText('Nome'), { target: { value: name } })
  fireEvent.change(screen.getByLabelText('E-mail'), {
    target: { value: email },
  })
  fireEvent.change(screen.getByLabelText('Mensagem'), {
    target: { value: message },
  })
}
const submit = () => fireEvent.click(screen.getByRole('button'))
const valid = 'Mensagem com mais de vinte caracteres'

beforeEach(() => {
  vi.mocked(sendMessage).mockReset()
  render(<ContactForm />)
})
afterEach(cleanup)

describe('ContactForm', () => {
  it('mostra a mensagem específica de cada campo inválido', async () => {
    fill('A', 'x', 'curta')
    submit()
    expect(
      await screen.findByText('Informe seu nome (mínimo 2 caracteres)'),
    ).toBeTruthy()
    expect(screen.getByText('E-mail inválido')).toBeTruthy()
    expect(
      screen.getByText('Mensagem com no mínimo 20 caracteres'),
    ).toBeTruthy()
    expect(sendMessage).not.toHaveBeenCalled()
  })

  it('envia e mostra sucesso com dados válidos', async () => {
    vi.mocked(sendMessage).mockResolvedValue(undefined)
    fill('Arthur', 'a@b.com', valid)
    submit()
    expect(await screen.findByText('Mensagem enviada!')).toBeTruthy()
    expect(sendMessage).toHaveBeenCalledTimes(1)
  })

  it('bloqueia o botão durante o envio, evitando duplicidade', async () => {
    vi.mocked(sendMessage).mockReturnValue(new Promise(() => {}))
    fill('Arthur', 'a@b.com', valid)
    submit()
    await waitFor(() =>
      expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(
        true,
      ),
    )
    submit()
    expect(sendMessage).toHaveBeenCalledTimes(1)
  })

  it('mostra erro quando o envio falha', async () => {
    vi.mocked(sendMessage).mockRejectedValue(new Error('falhou'))
    fill('Arthur', 'a@b.com', valid)
    submit()
    expect(
      await screen.findByText('Não foi possível enviar. Tente novamente.'),
    ).toBeTruthy()
  })
})
