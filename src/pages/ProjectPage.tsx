import { Link, useParams } from 'react-router-dom'
import { useRepos } from '../hooks/useRepos'
import NotFound from './NotFound'

export default function ProjectPage() {
  const { name } = useParams()
  const { data, isPending, isError, error } = useRepos()
  if (isPending) return <div className="card skeleton" aria-busy="true" />
  if (isError) return <p role="alert">{error.message}</p>
  const repo = data.find((r) => r.name === name)
  if (!repo) return <NotFound />
  return (
    <article>
      <h1>{repo.name}</h1>
      <p>{repo.description ?? 'Sem descrição.'}</p>
      <p>
        {repo.language ?? '—'} · atualizado em{' '}
        {new Date(repo.pushed_at).toLocaleDateString('pt-BR')}
      </p>
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        Ver no GitHub
      </a>{' '}
      · <Link to="/">Voltar</Link>
    </article>
  )
}
