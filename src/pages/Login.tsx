import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Button from '../components/Button'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    if (error)
      setError(
        error.message.toLowerCase().includes('invalid')
          ? 'E-mail ou senha incorretos.'
          : 'Não foi possível conectar. Tente novamente.',
      )
    else navigate('/dashboard')
  }

  return (
    <form className="form" onSubmit={submit}>
      <h1>Login</h1>
      <label>
        E-mail
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Senha
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error && (
        <p role="alert" className="err">
          {error}
        </p>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? 'Entrando…' : 'Entrar'}
      </Button>
    </form>
  )
}
