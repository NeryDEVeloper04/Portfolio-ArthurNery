import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome (mínimo 2 caracteres)'),
  email: z.string().trim().email('E-mail inválido'),
  message: z.string().trim().min(20, 'Mensagem com no mínimo 20 caracteres'),
})
export type ContactData = z.infer<typeof contactSchema>
