import { supabase } from '../lib/supabase'

export type ContactInput = { name: string; email: string; message: string }
export type Message = ContactInput & {
  id: string
  answered: boolean
  created_at: string
}

export async function sendMessage(input: ContactInput) {
  const { error } = await supabase.from('messages').insert(input)
  if (error) throw error
}
export async function listMessages(): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}
export async function markAnswered(id: string) {
  const { error } = await supabase
    .from('messages')
    .update({ answered: true })
    .eq('id', id)
  if (error) throw error
}
