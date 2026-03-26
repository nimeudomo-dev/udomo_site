import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramNotification } from '@/lib/telegram'

async function sendToVisionCRM(name: string, phone: string, source: string): Promise<string | null> {
  const token = process.env.VISION_CRM_TOKEN
  const baseUrl = process.env.VISION_CRM_URL
  if (!token || !baseUrl) {
    console.error('Vision CRM: VISION_CRM_TOKEN или VISION_CRM_URL не заданы в .env.local')
    return null
  }

  const payload = {
    Name: name || '',
    Phone: phone,
    LeadType: 'Udomo.ru',
    section_id: 32,
    Comment: source,
  }

  const res = await fetch(`${baseUrl}/api/leads/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

  const json = await res.json()
  const leadId = json?.data?.lead_id
  return leadId ? `${baseUrl}/leads/${leadId}` : null
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, source = 'cta_form' } = body

    if (!phone) {
      return NextResponse.json({ error: 'Телефон обязателен' }, { status: 400 })
    }

    // 1. Отправить в Vision CRM (получаем ссылку на лид)
    let crmUrl: string | null = null
    try {
      crmUrl = await sendToVisionCRM(name, phone, source)
    } catch (e) {
      console.error('Vision CRM error:', e)
    }

    // 2. Отправить в Telegram (со ссылкой на лид)
    try {
      await sendTelegramNotification({ name, phone, source, crmUrl })
    } catch (e) {
      console.error('Telegram error:', e)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead error:', err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
