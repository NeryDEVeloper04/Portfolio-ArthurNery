export type Repo = {
  id: number
  name: string
  description: string | null
  language: string | null
  pushed_at: string
  html_url: string
  fork: boolean
}

export async function fetchRepos(): Promise<Repo[]> {
  const user = import.meta.env.VITE_GITHUB_USER ?? 'NeryDEVeloper04'
  const res = await fetch(
    `https://api.github.com/users/${user}/repos?sort=pushed&per_page=30`,
  )
  if (res.status === 403 || res.status === 429)
    throw new Error('Limite da API do GitHub atingido. Tente mais tarde.')
  if (!res.ok) throw new Error('Não foi possível carregar os projetos.')
  const data: Repo[] = await res.json()
  return data.filter((r) => !r.fork)
}
