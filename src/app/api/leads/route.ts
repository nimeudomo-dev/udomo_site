import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendTelegramNotification } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, source = 'cta_form' } = body

    if (!phone) {
      return NextResponse.json({ error: 'Телефон обязателен' }, { status: 400 })
    }

    // 1. Сохранить в Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([{ name, phone, source }])
      .select()

    if (error) throw error

    // 2. Отправить в Telegram
    await sendTelegramNotification({ name, phone, source })

    return NextResponse.json({ success: true, lead: data?.[0] })
  } catch (err) {
    console.error('Lead error:', err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}
