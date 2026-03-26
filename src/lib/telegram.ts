export async function sendTelegramNotification(lead: {
  name: string
  phone: string
  source: string
  crmUrl?: string | null
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('Telegram not configured')
    return
  }

  const sourceLabel: Record<string, string> = {
    cta_form:   '📋 Форма на главной',
    call_modal: '📞 Получить консультацию',
    mortgage:   '🏦 Калькулятор ипотеки',
  }

  const lines = [
    '🔔 *Новая заявка — Udomo*',
    '',
    `👤 Имя: ${lead.name || 'не указано'}`,
    `📱 Телефон: ${lead.phone}`,
    `📍 Источник: ${sourceLabel[lead.source] || lead.source}`,
    `🕐 Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' })}`,
  ]

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: lines.join('\n'), parse_mode: 'Markdown' }),
  })
}
