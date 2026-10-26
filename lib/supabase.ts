import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

// Use the Service Role Key for backend operations (like bypassing RLS for inserts if needed)
// Or use Anon Key for public operations
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  }
})
