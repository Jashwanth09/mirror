import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export async function saveInteraction(data) {
  try {
    const { data: result, error } = await supabase
      .from('interactions')
      .insert([data])
      .select()
      .single()
    if (error) {
      console.error('Supabase error:', error)
      return null
    }
    return result
  } catch (e) {
    console.error('Supabase save error:', e)
    return null
  }
}

export async function updateDependencyClick(id) {
  try {
    console.log('Updating dependency click for interaction:', id)
    const { data: current, error: fetchError } = await supabase
      .from('interactions')
      .select('dependencies_clicked')
      .eq('id', id)
      .single()
    
    if (fetchError) {
      console.error('Supabase fetch error:', fetchError)
      return
    }
    
    const newValue = (current.dependencies_clicked || 0) + 1
    console.log('Current dependencies_clicked:', current.dependencies_clicked, 'New value:', newValue)
    
    const { error } = await supabase
      .from('interactions')
      .update({ dependencies_clicked: newValue })
      .eq('id', id)
    
    if (error) {
      console.error('Supabase update error:', error)
    } else {
      console.log('Successfully updated dependencies_clicked to:', newValue)
    }
  } catch (e) {
    console.error('Supabase update error:', e)
  }
}

export async function fetchInteractions() {
  try {
    const { data, error } = await supabase
      .from('interactions')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50)
    if (error) return []
    return data
  } catch (e) {
    console.error('Supabase fetch error:', e)
    return []
  }
}
