import { useRepos } from '../hooks/useRepos'
import { useFeatured } from '../hooks/useFeatured'
import RepoCard from './RepoCard'
import Button from './Button'

export default function ProjectList({
  onlyFeatured = false,
}: {
  onlyFeatured?: boolean
}) {
  const { data, isPending, isError, error, refetch } = useRepos()
  const featured = useFeatured()
  if (isPending)
    return (
      <div className="grid" aria-busy="true">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="card skeleton" />
        ))}
      </div>
    )
  if (isError)
    return (
      <div role="alert">
        <p>{error.message}</p>
        <Button onClick={() => refetch()}>Tentar novamente</Button>
      </div>
    )
  const list =
    onlyFeatured && featured.data?.length
      ? data.filter((r) => featured.data.includes(r.name))
      : data
  if (!list.length) return <p>Nenhum projeto encontrado.</p>
  return (
    <div className="grid">
      {list.map((r) => (
        <RepoCard key={r.id} repo={r} />
      ))}
    </div>
  )
}
