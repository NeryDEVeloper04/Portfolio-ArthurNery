import { useQuery } from '@tanstack/react-query'
import { fetchRepos } from '../services/github'

export const useRepos = () =>
  useQuery({
    queryKey: ['repos'],
    queryFn: fetchRepos,
    staleTime: 30 * 60 * 1000,
    retry: false,
  })
