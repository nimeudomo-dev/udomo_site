# Udomo — Next.js + Supabase + Telegram

## Быстрый старт

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Настройка (один раз)

### 1. Supabase
1. Зайди на supabase.com → создай проект `udomo`
2. Зайди в **SQL Editor** → вставь содержимое `supabase-schema.sql` → Run
3. Зайди в **Settings → API** → скопируй URL и anon key

### 2. Telegram Bot
1. Напиши @BotFather → /newbot → получи токен
2. Напиши своему боту любое сообщение
3. Открой: `https://api.telegram.org/bot<ТОКЕН>/getUpdates`
4. Скопируй `chat_id` из ответа

### 3. Заполни .env.local
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
TELEGRAM_BOT_TOKEN=1234567890:AAF...
TELEGRAM_CHAT_ID=123456789
```

---

## Структура проекта

```
src/
├── app/
│   ├── api/
│   │   ├── leads/route.ts       ← сохраняет заявки + Telegram
│   │   └── properties/route.ts  ← отдаёт объекты из базы
│   ├── layout.tsx
│   └── page.tsx                 ← главная страница + роутер
├── components/                  ← React компоненты
├── lib/
│   ├── supabase.ts              ← клиент базы данных
│   └── telegram.ts             ← отправка уведомлений
└── styles/globals.css

supabase-schema.sql              ← SQL для создания таблиц
.env.local                       ← твои ключи (не коммитить!)
```

---

## Деплой на Vercel
1. Залей проект на GitHub
2. Зайди на vercel.com → Import Project
3. В настройках добавь те же переменные из .env.local
4. Deploy — готово, сайт в интернете
