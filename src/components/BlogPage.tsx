'use client'
import { useState } from 'react'

function BlogCta() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!phone) return
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, comment, source: 'blog_article' }),
      })
      setSent(true)
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  return (
    <div className="blog-sidebar-form">
      <div className="blog-sf-title">Получить консультацию</div>
      <div className="blog-sf-sub">Расскажем про все этапы и стоимость — бесплатно и без обязательств</div>
      {sent ? (
        <div className="blog-sf-success">✅ Заявка принята! Мы свяжемся в ближайшее время.</div>
      ) : (
        <>
          <div className="blog-sf-fields">
            <input className="blog-sf-input" type="text" placeholder="Ваше имя"
              value={name} onChange={e => setName(e.target.value.replace(/[^a-zA-Zа-яёА-ЯЁ\s\-]/g, ''))} />
            <input className="blog-sf-input" type="tel" placeholder="Телефон / WhatsApp"
              value={phone} onChange={e => setPhone(e.target.value.replace(/[^0-9+\-\s()]/g, ''))} />
            <textarea className="blog-sf-input blog-sf-textarea" placeholder="Комментарий (необязательно)"
              value={comment} onChange={e => setComment(e.target.value)} rows={3} />
          </div>
          <button className="blog-sf-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Отправляем...' : 'Отправить заявку →'}
          </button>
          <div className="blog-sf-pd">Нажимая кнопку, вы соглашаетесь с <a href="#">обработкой персональных данных</a></div>
        </>
      )}
    </div>
  )
}

interface Article {
  id: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  content: React.ReactNode
}

const ARTICLES: Article[] = [
  {
    id: 'buy-flat-ufa',
    category: 'Покупка',
    title: 'Как купить квартиру в Уфе без ошибок: простое объяснение для тех, кто делает это впервые',
    excerpt: 'Покупка квартиры — это ситуация, в которой большинство людей оказываются 1–2 раза в жизни. Разберёмся спокойно: как подойти к покупке без лишних рисков.',
    date: '12 апреля 2026',
    readTime: '7 мин',
    content: (
      <div className="blog-article-content">
        <p className="blog-lead">Покупка квартиры — это ситуация, в которой большинство людей оказываются 1–2 раза в жизни. И почти всегда без опыта. Из-за этого люди либо тянут с решением, либо делают его слишком быстро.</p>
        <p>Разберёмся спокойно: как подойти к покупке квартиры в Уфе без лишних рисков.</p>

        <h2>С чего начать, если вы только думаете о покупке</h2>
        <p>Первое, что важно понять — нет «идеальной квартиры».</p>
        <p>Есть: ваш бюджет, ваши задачи и реальные предложения на рынке. Поэтому начинать нужно не с объявлений, а с ответа на 3 вопроса:</p>
        <ul>
          <li>Какой бюджет — реально, а не «примерно»</li>
          <li>Для себя или как вложение</li>
          <li>Насколько срочно нужна покупка</li>
        </ul>
        <p>Это сразу сужает круг вариантов в несколько раз.</p>

        <h2>Новостройка или вторичка — что выбрать</h2>
        <p>Самый частый вопрос.</p>
        <div className="blog-compare">
          <div className="blog-compare-col">
            <div className="blog-compare-title">Новостройка подойдёт, если:</div>
            <ul>
              <li>вы готовы подождать сдачу</li>
              <li>хотите современный дом</li>
              <li>рассматриваете покупку дешевле на старте</li>
            </ul>
          </div>
          <div className="blog-compare-col">
            <div className="blog-compare-title">Вторичка подойдёт, если:</div>
            <ul>
              <li>нужно заехать сразу</li>
              <li>важна готовая инфраструктура</li>
              <li>не хотите ждать</li>
            </ul>
          </div>
        </div>
        <p>Нет «правильного варианта» — есть подходящий под вашу ситуацию.</p>

        <h2>Где чаще всего ошибаются при покупке</h2>
        <p>Вот реальные ошибки, которые делают чаще всего:</p>
        <div className="blog-mistakes">
          <div className="blog-mistake"><span className="blog-mistake-num">1</span><div><strong>Выбирают слишком быстро</strong><p>Посмотрели 2–3 варианта → «этот норм» → покупка</p></div></div>
          <div className="blog-mistake"><span className="blog-mistake-num">2</span><div><strong>Ориентируются только на цену</strong><p>Дешевле ≠ лучше</p></div></div>
          <div className="blog-mistake"><span className="blog-mistake-num">3</span><div><strong>Не проверяют объект</strong><p>Документы, обременения, собственники — всё это критично</p></div></div>
          <div className="blog-mistake"><span className="blog-mistake-num">4</span><div><strong>Доверяют словам без проверки</strong><p>«всё чисто», «сдадут вовремя», «район перспективный»</p></div></div>
        </div>

        <h2>Сколько стоит квартира в Уфе</h2>
        <p>Цены постоянно меняются, но ориентир такой:</p>
        <div className="blog-prices">
          <div className="blog-price-item"><div className="blog-price-val">от 160 000 ₽/м²</div><div className="blog-price-lbl">Новостройки</div></div>
          <div className="blog-price-item"><div className="blog-price-val">от 110 000 ₽/м²</div><div className="blog-price-lbl">Вторичное жильё</div></div>
        </div>
        <p>На стоимость влияют: район, дом, состояние, инфраструктура.</p>

        <h2>Что важно понять заранее</h2>
        <p>Квартиру покупают не на месяц и не на год. Даже если вы берёте «для себя», со временем могут измениться работа, семья, планы. И тогда важно, чтобы квартиру можно было продать или сдать. Поэтому лучше сразу выбирать вариант, который будет востребован на рынке.</p>

        <h2>Почему люди обращаются к специалистам</h2>
        <p>Самостоятельно купить квартиру можно. Это факт. Но чаще всего люди обращаются за помощью, потому что не хотят разбираться в документах, боятся сделать ошибку, хотят сэкономить время или не уверены в выборе.</p>
        <p>Специалист помогает отобрать нормальные варианты, проверить объект и провести сделку спокойно.</p>

      </div>
    ),
  },
]

function ArticleCard({ a, onClick }: { a: Article; onClick: () => void }) {
  return (
    <div className="blog-card" onClick={onClick}>
      <div className="blog-card-top">
        <span className="blog-card-cat">{a.category}</span>
      </div>
      <div className="blog-card-title">{a.title}</div>
      <p className="blog-card-excerpt">{a.excerpt}</p>
      <div className="blog-card-footer">
        <span className="blog-card-date">{a.date}</span>
        <span className="blog-card-read">Читать →</span>
      </div>
    </div>
  )
}

export default function BlogPage() {
  const [open, setOpen] = useState<Article | null>(null)

  if (open) {
    return (
      <div id="page-blog">
        <div className="wrap" style={{ paddingTop: 90, paddingBottom: 32 }}>
          <button className="blog-back" onClick={() => setOpen(null)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Все статьи
          </button>
          <div className="blog-article-meta">
            <span className="blog-card-cat">{open.category}</span>
            <span className="blog-card-date">{open.date}</span>
          </div>
          <div className="blog-article-layout">
            <div className="blog-article-main">
              <h1 className="blog-article-title">{open.title}</h1>
              {open.content}
            </div>
            <aside className="blog-article-aside">
              <div className="blog-aside-sticky">
                <BlogCta />
              </div>
            </aside>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="page-blog">
      <div className="wrap" style={{ paddingTop: 90 }}>
        <div className="sec-tag">Блог</div>
        <div className="sec-title" style={{ marginBottom: 8, textTransform: 'none' }}>Статьи и советы</div>
        <div className="sec-sub">Полезные материалы о покупке, продаже и инвестициях в недвижимость</div>
      </div>
      <div className="sec wrap" style={{ paddingBottom: 80 }}>
        <div className="blog-grid">
          {ARTICLES.map(a => <ArticleCard key={a.id} a={a} onClick={() => setOpen(a)} />)}
        </div>
      </div>
    </div>
  )
}
