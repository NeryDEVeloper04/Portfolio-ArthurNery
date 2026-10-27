import { supabase } from '../lib/supabase'

export async function listFeatured(): Promise<string[]> {
  const { data, error } = await supabase
    .from('featured_repos')
    .select('repo_name')
  if (error) throw error
  return data.map((r) => r.repo_name)
}
export async function setFeatured(name: string, on: boolean) {
  const q = on
    ? supabase.from('featured_repos').insert({ repo_name: name })
    : supabase.from('featured_repos').delete().eq('repo_name', name)
  const { error } = await q
  if (error) throw error
}
