import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { listMessages, markAnswered } from '../services/messages'
import { setFeatured } from '../services/featured'
import { useRepos } from '../hooks/useRepos'
import { useFeatured } from '../hooks/useFeatured'
import { supabase } from '../lib/supabase'
import Button from '../components/Button'

export default function Dashboard() {
  const qc = useQueryClient()
  const msgs = useQuery({
    queryKey: ['messages'],
    queryFn: listMessages,
    retry: false,
  })
  const repos = useRepos()
  const featured = useFeatured()
  const answer = useMutation({
    mutationFn: markAnswered,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['messages'] }),
  })
  const toggle = useMutation({
    mutationFn: ({ name, on }: { name: string; on: boolean }) =>
      setFeatured(name, on),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['featured'] }),
  })
  const pending = msgs.data?.filter((m) => !m.answered).length ?? 0

  return (
    <section className="section">
      <h1>Painel</h1>
      <Button className="ghost" onClick={() => supabase.auth.signOut()}>
        Sair
      </Button>
      <h2>
        Mensagens{' '}
        {msgs.data && <span className="chip">{pending} pendentes</span>}
      </h2>
      {msgs.isPending && <p>Carregando…</p>}
      {msgs.isError && <p role="alert">Erro ao carregar mensagens.</p>}
      {msgs.data?.length === 0 && <p>Nenhuma mensagem ainda.</p>}
      {answer.isError && (
        <p role="alert" className="err">
          Não foi possível marcar como respondida.
        </p>
      )}
      {msgs.data?.map((m) => (
        <article key={m.id} className="card">
          <strong>{m.name}</strong> ·{' '}
          <a href={`mailto:${m.email}`}>{m.email}</a>
          <p>{m.message}</p>
          {m.answered ? (
            <span className="chip">Respondida</span>
          ) : (
            <Button
              onClick={() => answer.mutate(m.id)}
              disabled={answer.isPending}
            >
              Marcar como respondida
            </Button>
          )}
        </article>
      ))}
      <h2>Projetos em destaque</h2>
      {repos.isPending && <p>Carregando…</p>}
      {repos.isError && <p role="alert">{repos.error.message}</p>}
      {toggle.isError && (
        <p role="alert" className="err">
          Não foi possível atualizar o destaque.
        </p>
      )}
      {repos.data?.map((r) => (
        <label key={r.id} className="check">
          <input
            type="checkbox"
            checked={featured.data?.includes(r.name) ?? false}
            disabled={toggle.isPending}
            onChange={(e) =>
              toggle.mutate({ name: r.name, on: e.target.checked })
            }
          />
          {r.name}
        </label>
      ))}
    </section>
  )
}
