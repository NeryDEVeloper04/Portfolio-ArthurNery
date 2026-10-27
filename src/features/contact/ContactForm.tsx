import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactData } from './schema'
import { sendMessage } from '../../services/messages'
import Button from '../../components/Button'

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema) })
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle')

  const onSubmit = async (data: ContactData) => {
    setStatus('idle')
    try {
      await sendMessage(data)
      setStatus('ok')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label>
        Nome
        <input {...register('name')} />
      </label>
      {errors.name && (
        <p role="alert" className="err">
          {errors.name.message}
        </p>
      )}
      <label>
        E-mail
        <input type="email" {...register('email')} />
      </label>
      {errors.email && (
        <p role="alert" className="err">
          {errors.email.message}
        </p>
      )}
      <label>
        Mensagem
        <textarea rows={5} {...register('message')} />
      </label>
      {errors.message && (
        <p role="alert" className="err">
          {errors.message.message}
        </p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando…' : 'Enviar'}
      </Button>
      {status === 'ok' && <p role="status">Mensagem enviada!</p>}
      {status === 'error' && (
        <p role="alert" className="err">
          Não foi possível enviar. Tente novamente.
        </p>
      )}
    </form>
  )
}
