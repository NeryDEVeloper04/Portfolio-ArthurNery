import { describe, expect, it } from 'vitest'
import { contactSchema } from './schema'

const base = {
  name: 'Arthur',
  email: 'a@b.com',
  message: 'Mensagem com mais de vinte caracteres',
}
const errors = (d: object) => {
  const r = contactSchema.safeParse(d)
  return r.success ? [] : r.error.issues.map((i) => i.message)
}

describe('contactSchema', () => {
  it('aceita dados válidos', () =>
    expect(contactSchema.safeParse(base).success).toBe(true))
  it('rejeita e-mail inválido', () =>
    expect(errors({ ...base, email: 'x' })).toContain('E-mail inválido'))
  it('rejeita mensagem curta', () =>
    expect(errors({ ...base, message: 'curta' })).toContain(
      'Mensagem com no mínimo 20 caracteres',
    ))
  it('rejeita nome curto', () =>
    expect(errors({ ...base, name: 'A' }).length).toBe(1))
})
