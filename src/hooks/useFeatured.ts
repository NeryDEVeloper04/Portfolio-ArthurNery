import { useQuery } from '@tanstack/react-query'
import { listFeatured } from '../services/featured'

export const useFeatured = () =>
  useQuery({ queryKey: ['featured'], queryFn: listFeatured, retry: false })
