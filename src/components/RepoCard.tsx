import { Link } from 'react-router-dom'
import type { Repo } from '../services/github'
import { useTilt } from '../hooks/useTilt'

export default function RepoCard({ repo }: { repo: Repo }) {
  const tilt = useTilt<HTMLElement>()
  return (
    <article className="card tilt" {...tilt}>
      <h3>
        <Link to={`/projetos/${repo.name}`}>{repo.name}</Link>
      </h3>
      <p>{repo.description ?? 'Sem descrição.'}</p>
      <div className="meta">
        <span className="chip">{repo.language ?? 'Código'}</span>
        <small>{new Date(repo.pushed_at).toLocaleDateString('pt-BR')}</small>
      </div>
    </article>
  )
}
