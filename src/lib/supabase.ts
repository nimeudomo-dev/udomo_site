import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Lead = {
  id?: number
  name: string
  phone: string
  source: string
  page?: string
  created_at?: string
}

export type Property = {
  id: number
  title: string
  category: string
  price: number
  area: number
  address: string
  description: string
  image_url: string
  is_active: boolean
  created_at?: string
}
