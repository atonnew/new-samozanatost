import { createClient } from "@supabase/supabase-js"

// Проверяем наличие переменных окружения
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.warn("NEXT_PUBLIC_SUPABASE_URL не настроен. Используется демо-режим.")
}

if (!supabaseAnonKey) {
  console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY не настроен. Используется демо-режим.")
}

// Создаем клиент с fallback значениями для демо
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Типы для TypeScript остаются те же
export type Profile = {
  id: string
  email: string
  full_name?: string
  phone?: string
  user_type: "freelancer" | "client" | "admin"
  region?: string
  city?: string
  avatar_url?: string
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Service = {
  id: number
  freelancer_id: string
  category_id: number
  title: string
  description: string
  price_from?: number
  price_to?: number
  price_type: "fixed" | "hourly" | "project"
  region?: string
  city?: string
  is_active: boolean
  views_count: number
  created_at: string
  updated_at: string
  profiles?: Profile
  categories?: Category
}

export type Category = {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
  is_active: boolean
  created_at: string
}

export type Request = {
  id: number
  client_id: string
  service_id: number
  freelancer_id: string
  message: string
  budget?: number
  status: "pending" | "accepted" | "rejected" | "completed"
  created_at: string
  updated_at: string
}
