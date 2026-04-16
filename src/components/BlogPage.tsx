'use client'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Country { name: string; flag: string; code: string; digits: number; iso: string }

const COUNTRIES: Country[] = [
  // СНГ
  { name: 'Россия',           flag: '🇷🇺', code: '+7',   digits: 10, iso: 'RU' },
  { name: 'Беларусь',         flag: '🇧🇾', code: '+375', digits: 9,  iso: 'BY' },
  { name: 'Казахстан',        flag: '🇰🇿', code: '+7',   digits: 10, iso: 'KZ' },
  { name: 'Украина',          flag: '🇺🇦', code: '+380', digits: 9,  iso: 'UA' },
  { name: 'Узбекистан',       flag: '🇺🇿', code: '+998', digits: 9,  iso: 'UZ' },
  { name: 'Азербайджан',      flag: '🇦🇿', code: '+994', digits: 9,  iso: 'AZ' },
  { name: 'Армения',          flag: '🇦🇲', code: '+374', digits: 8,  iso: 'AM' },
  { name: 'Грузия',           flag: '🇬🇪', code: '+995', digits: 9,  iso: 'GE' },
  { name: 'Кыргызстан',       flag: '🇰🇬', code: '+996', digits: 9,  iso: 'KG' },
  { name: 'Таджикистан',      flag: '🇹🇯', code: '+992', digits: 9,  iso: 'TJ' },
  { name: 'Туркменистан',     flag: '🇹🇲', code: '+993', digits: 8,  iso: 'TM' },
  { name: 'Молдова',          flag: '🇲🇩', code: '+373', digits: 8,  iso: 'MD' },
  // Европа
  { name: 'Германия',         flag: '🇩🇪', code: '+49',  digits: 10, iso: 'DE' },
  { name: 'Великобритания',   flag: '🇬🇧', code: '+44',  digits: 10, iso: 'GB' },
  { name: 'Франция',          flag: '🇫🇷', code: '+33',  digits: 9,  iso: 'FR' },
  { name: 'Италия',           flag: '🇮🇹', code: '+39',  digits: 10, iso: 'IT' },
  { name: 'Испания',          flag: '🇪🇸', code: '+34',  digits: 9,  iso: 'ES' },
  { name: 'Польша',           flag: '🇵🇱', code: '+48',  digits: 9,  iso: 'PL' },
  { name: 'Нидерланды',       flag: '🇳🇱', code: '+31',  digits: 9,  iso: 'NL' },
  { name: 'Австрия',          flag: '🇦🇹', code: '+43',  digits: 10, iso: 'AT' },
  { name: 'Швейцария',        flag: '🇨🇭', code: '+41',  digits: 9,  iso: 'CH' },
  { name: 'Чехия',            flag: '🇨🇿', code: '+420', digits: 9,  iso: 'CZ' },
  { name: 'Швеция',           flag: '🇸🇪', code: '+46',  digits: 9,  iso: 'SE' },
  { name: 'Норвегия',         flag: '🇳🇴', code: '+47',  digits: 8,  iso: 'NO' },
  { name: 'Финляндия',        flag: '🇫🇮', code: '+358', digits: 9,  iso: 'FI' },
  { name: 'Дания',            flag: '🇩🇰', code: '+45',  digits: 8,  iso: 'DK' },
  { name: 'Португалия',       flag: '🇵🇹', code: '+351', digits: 9,  iso: 'PT' },
  { name: 'Латвия',           flag: '🇱🇻', code: '+371', digits: 8,  iso: 'LV' },
  { name: 'Литва',            flag: '🇱🇹', code: '+370', digits: 8,  iso: 'LT' },
  { name: 'Эстония',          flag: '🇪🇪', code: '+372', digits: 7,  iso: 'EE' },
  // Азия
  { name: 'Турция',           flag: '🇹🇷', code: '+90',  digits: 10, iso: 'TR' },
  { name: 'ОАЭ',              flag: '🇦🇪', code: '+971', digits: 9,  iso: 'AE' },
  { name: 'Таиланд',          flag: '🇹🇭', code: '+66',  digits: 9,  iso: 'TH' },
  { name: 'Китай',            flag: '🇨🇳', code: '+86',  digits: 11, iso: 'CN' },
  { name: 'Япония',           flag: '🇯🇵', code: '+81',  digits: 10, iso: 'JP' },
  { name: 'Индия',            flag: '🇮🇳', code: '+91',  digits: 10, iso: 'IN' },
  { name: 'Израиль',          flag: '🇮🇱', code: '+972', digits: 9,  iso: 'IL' },
  { name: 'Саудовская Аравия',flag: '🇸🇦', code: '+966', digits: 9,  iso: 'SA' },
  { name: 'Египет',           flag: '🇪🇬', code: '+20',  digits: 10, iso: 'EG' },
  // Америка
  { name: 'США',              flag: '🇺🇸', code: '+1',   digits: 10, iso: 'US' },
  { name: 'Канада',           flag: '🇨🇦', code: '+1',   digits: 10, iso: 'CA' },
]

function getPlaceholder(code: string): string {
  switch (code) {
    case '+7':   return '(000) 000-00-00'
    case '+375': return '(00) 000-00-00'
    case '+380': return '(00) 000-00-00'
    case '+998': return '(00) 000-00-00'
    case '+994': return '(00) 000-00-00'
    case '+374': return '(00) 00-00-00'
    case '+995': return '(000) 00-00-00'
    case '+996': return '(000) 000-000'
    case '+992': return '(00) 000-00-00'
    case '+993': return '(00) 00-00-00'
    case '+373': return '(00) 000-000'
    default:     return '000 000 000'
  }
}

function formatPhone(digits: string, code: string): string {
  switch (code) {
    case '+7': {
      const d = digits.slice(0, 10)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 3)
      if (d.length >= 4) r += ') ' + d.slice(3, 6)
      if (d.length >= 7) r += '-' + d.slice(6, 8)
      if (d.length >= 9) r += '-' + d.slice(8, 10)
      return r
    }
    case '+375': case '+380': case '+998': case '+994': {
      const d = digits.slice(0, 9)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 2)
      if (d.length >= 3) r += ') ' + d.slice(2, 5)
      if (d.length >= 6) r += '-' + d.slice(5, 7)
      if (d.length >= 8) r += '-' + d.slice(7, 9)
      return r
    }
    case '+374': case '+993': {
      const d = digits.slice(0, 8)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 2)
      if (d.length >= 3) r += ') ' + d.slice(2, 4)
      if (d.length >= 5) r += '-' + d.slice(4, 6)
      if (d.length >= 7) r += '-' + d.slice(6, 8)
      return r
    }
    case '+995': {
      const d = digits.slice(0, 9)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 3)
      if (d.length >= 4) r += ') ' + d.slice(3, 5)
      if (d.length >= 6) r += '-' + d.slice(5, 7)
      if (d.length >= 8) r += '-' + d.slice(7, 9)
      return r
    }
    case '+996': {
      const d = digits.slice(0, 9)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 3)
      if (d.length >= 4) r += ') ' + d.slice(3, 6)
      if (d.length >= 7) r += '-' + d.slice(6, 9)
      return r
    }
    case '+373': {
      const d = digits.slice(0, 8)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 2)
      if (d.length >= 3) r += ') ' + d.slice(2, 5)
      if (d.length >= 6) r += '-' + d.slice(5, 8)
      return r
    }
    default: return digits
  }
}

function BlogCta() {
  const [name, setName] = useState('')
  const [phoneDigits, setPhoneDigits] = useState('')
  const [country, setCountry] = useState<Country>(COUNTRIES[0])
  const [dropOpen, setDropOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const dropRef = useRef<HTMLDivElement>(null)
  const portalDropRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 0 })

  useEffect(() => {
    if (!dropOpen) return
    const handleClick = (e: MouseEvent) => {
      const inTrigger = dropRef.current?.contains(e.target as Node)
      const inDrop = portalDropRef.current?.contains(e.target as Node)
      if (!inTrigger && !inDrop) { setDropOpen(false); setSearch('') }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [dropOpen])

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, country.digits)
    setPhoneDigits(digits)
    if (phoneError && digits.length === country.digits) setPhoneError('')
  }

  const selectCountry = (c: Country) => {
    setCountry(c); setPhoneDigits(''); setPhoneError(''); setDropOpen(false); setSearch('')
  }

  const nameValid = name.trim().length >= 2
  const phoneValid = phoneDigits.length >= country.digits
  const canSubmit = nameValid && phoneValid && !loading

  const handleSubmit = async () => {
    let valid = true
    if (!nameValid) { setNameError('Введите имя'); valid = false }
    if (!phoneValid) { setPhoneError(`Введите полный номер — ${country.digits} цифр`); valid = false }
    if (!valid) return
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone: country.code + phoneDigits, comment, source: 'blog_article' }),
      })
      setSent(true)
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  const filtered = search
    ? COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search))
    : COUNTRIES

  if (sent) {
    return (
      <div className="blog-sidebar-form">
        <div className="blog-sf-success">Заявка принята! Мы свяжемся в ближайшее время.</div>
      </div>
    )
  }

  return (
    <div className="blog-sidebar-form">
      <div className="blog-sf-title">Получить консультацию</div>
      <div className="blog-sf-sub">Разберём вашу ситуацию и предложим подходящие варианты</div>
      <div className="blog-sf-fields">
        <div className="blog-sf-field-wrap">
          <input
            className={`blog-sf-input${nameError ? ' blog-sf-input--error' : ''}`}
            type="text" placeholder="Ваше имя"
            value={name}
            onChange={e => {
              setName(e.target.value.replace(/[^a-zA-Zа-яёА-ЯЁ\s\-]/g, ''))
              if (nameError) setNameError('')
            }}
          />
          {nameError && <div className="blog-sf-error">{nameError}</div>}
        </div>
        <div className="blog-sf-field-wrap">
          <div className={`blog-sf-phone-wrap${phoneError ? ' blog-sf-input--error' : ''}`}>
            <div className="blog-sf-country" ref={dropRef}>
              <button
                type="button"
                ref={triggerRef}
                className="blog-sf-country-trigger"
                onClick={() => {
                  if (!dropOpen && triggerRef.current) {
                    const r = triggerRef.current.getBoundingClientRect()
                    setDropPos({ top: r.bottom + 6, left: r.left, width: Math.max(r.width, 260) })
                  }
                  setDropOpen(v => !v)
                }}
              >
                <span>{country.flag}</span>
                <span className="blog-sf-country-code">{country.code}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.4 }}>
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {dropOpen && typeof window !== 'undefined' && createPortal(
                <div ref={portalDropRef} className="mf-country-drop"
                  style={{ position: 'fixed', top: dropPos.top, left: dropPos.left, width: dropPos.width, zIndex: 9999 }}>
                  <div className="mf-country-search-wrap">
                    <input className="mf-country-search" type="text" placeholder="Поиск..."
                      value={search} onChange={e => setSearch(e.target.value)} autoFocus />
                  </div>
                  <div className="mf-country-list">
                    {filtered.map((c, i) => (
                      <div key={i} className={`mf-country-item${c.name === country.name ? ' active' : ''}`} onClick={() => selectCountry(c)}>
                        <span className="mf-country-item-flag">{c.flag}</span>
                        <span className="mf-country-item-name">{c.name}</span>
                        <span className="mf-country-item-code">{c.code}</span>
                      </div>
                    ))}
                  </div>
                </div>,
                document.body
              )}
            </div>
            <input
              className="blog-sf-phone-input"
              type="tel"
              placeholder={getPlaceholder(country.code)}
              value={formatPhone(phoneDigits, country.code)}
              onChange={e => handlePhoneChange(e.target.value)}
            />
          </div>
          {phoneError && <div className="blog-sf-error">{phoneError}</div>}
        </div>
      </div>
      <button className="blog-sf-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Отправляем...' : 'Отправить →'}
      </button>
      <div className="blog-sf-pd">Отправляя форму, я соглашаюсь с <a href="/docs/privacy.pdf" target="_blank" rel="noopener noreferrer">политикой обработки персональных данных</a></div>
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
    id: 'market-ufa-2026',
    category: 'Аналитика',
    title: 'Что будет с рынком недвижимости Уфы в 2026–2027: простой разбор без иллюзий',
    excerpt: 'Цены не падают, но и не растут. Сделок стало меньше. Разбираемся, что происходит на рынке и стоит ли покупать сейчас или подождать.',
    date: '18 апреля 2026',
    readTime: '6 мин',
    content: (
      <div className="blog-article-content">
        <p className="blog-lead">Сейчас рынок недвижимости в Уфе выглядит странно. Цены не падают, но и не растут так, как раньше. Сделок стало меньше, а решения люди принимают дольше. И у многих возникает вопрос: покупать сейчас или лучше подождать?</p>

        <h2>2026 год — рынок без движения</h2>
        <p>Если коротко, 2026 — это не про рост. Это про паузу. Цены держатся, покупатели осторожничают, продавцы не хотят уступать. В итоге рынок как будто «завис».</p>
        <p>Основная причина — дорогая ипотека. Пока кредиты остаются дорогими, люди просто не спешат заходить в сделки.</p>

        <h2>Почему кажется, что «всё стоит»</h2>
        <p>Раньше рынок был простой: покупаешь — через время дороже. Сейчас так не работает. В Уфе уже видно разделение:</p>
        <div className="blog-compare">
          <div className="blog-compare-col">
            <div className="blog-compare-title">Продаётся быстро:</div>
            <ul>
              <li>новые дома</li>
              <li>нормальные районы</li>
              <li>понятные планировки</li>
            </ul>
          </div>
          <div className="blog-compare-col">
            <div className="blog-compare-title">Стоит месяцами:</div>
            <ul>
              <li>старый фонд</li>
              <li>слабые локации</li>
              <li>переоценённые квартиры</li>
            </ul>
          </div>
        </div>
        <p>Рынок стал выборочным.</p>

        <h2>Будут ли падать цены</h2>
        <p>Резкого падения не ждут. Застройщики не готовы сильно снижать цены — себестоимость высокая, новых проектов становится меньше. Скорее всего цены будут либо стоять, либо расти на уровне инфляции.</p>

        <h2>Что может изменить ситуацию</h2>
        <p>Главный фактор — ипотека. Если ставки начнут снижаться, спрос вернётся, сделки ускорятся, цены могут снова пойти вверх. Это может произойти ближе к 2027 году.</p>
        <p>Ещё один момент: застройщики сейчас осторожничают — меньше новых проектов, меньше объёмов строительства. Через 1–2 года это может привести к тому, что нормальных объектов станет меньше.</p>

        <h2>Что это значит для покупателя</h2>
        <div className="blog-compare">
          <div className="blog-compare-col">
            <div className="blog-compare-title">Покупка в 2026:</div>
            <ul>
              <li>нет ажиотажа</li>
              <li>можно выбирать</li>
              <li>можно торговаться</li>
            </ul>
          </div>
          <div className="blog-compare-col">
            <div className="blog-compare-title">Ожидание до 2027:</div>
            <ul>
              <li>если ставки упадут — спрос резко вырастет</li>
              <li>хорошие объекты уйдут быстро</li>
              <li>цены начнут расти</li>
            </ul>
          </div>
        </div>

        <h2>Главная ошибка сейчас</h2>
        <p>Ждать «идеальный момент». На практике его почти не бывает. Рынок всегда либо дорогой, либо непонятный, либо нестабильный.</p>

        <h2>Итог</h2>
        <p>2026–2027 — это не рынок, где зарабатывают «на автомате». Это рынок, где важно не спешить, нормально оценивать объект и понимать, зачем ты покупаешь.</p>
        <p>Если вы рассматриваете покупку в Уфе — сейчас важно не угадать рынок, а выбрать правильный объект.</p>

      </div>
    ),
  },
  {
    id: 'sell-flat-ufa',
    category: 'Продажа',
    title: 'Как продать квартиру в Уфе быстрее и не терять деньги',
    excerpt: 'Одни квартиры продаются за 2–3 недели, другие висят месяцами при той же цене. Разница обычно не в удаче — разберёмся, что реально влияет на результат.',
    date: '16 апреля 2026',
    readTime: '5 мин',
    content: (
      <div className="blog-article-content">
        <p className="blog-lead">Когда речь заходит о продаже квартиры, многие думают, что главное — поставить цену и подождать. На практике всё немного иначе. Одни квартиры продаются за 2–3 недели, другие могут висеть месяцами, даже если цена кажется рыночной. Разница обычно не в удаче.</p>

        <h2>Первая ошибка — завышенная цена «на всякий случай»</h2>
        <p>Часто логика такая: поставлю чуть выше, если что — потом скину. Проблема в том, что рынок это видит сразу.</p>
        <p>Первые 2–3 недели — самые важные. Именно в этот момент объявление смотрят чаще всего. Если цена завышена:</p>
        <ul>
          <li>нет звонков</li>
          <li>нет просмотров</li>
          <li>объявление «остывает»</li>
        </ul>
        <p>И потом его приходится продавать уже со скидкой.</p>

        <h2>Как сильно влияет подача</h2>
        <p>Две одинаковые квартиры могут продаваться по-разному. Причина — в подаче: фотографии, описание, первое впечатление. Плохие фото и сухой текст могут «убить» даже хороший объект. И наоборот — нормальная подача даёт больше звонков.</p>

        <h2>Что на самом деле важно покупателю</h2>
        <p>Покупатель не просто смотрит квартиру. Он оценивает: удобно ли жить, насколько всё понятно, есть ли риски. И часто принимает решение не на логике, а на ощущении — <em>«здесь нормально, можно рассматривать»</em>.</p>

        <h2>Где чаще всего теряют деньги</h2>
        <div className="blog-mistakes">
          <div className="blog-mistake"><span className="blog-mistake-num">1</span><div><strong>Долго не могут продать</strong><p>В итоге делают большую скидку под давлением</p></div></div>
          <div className="blog-mistake"><span className="blog-mistake-num">2</span><div><strong>Неправильно выбрали цену</strong><p>Завышенная цена отпугивает покупателей в самый активный период</p></div></div>
          <div className="blog-mistake"><span className="blog-mistake-num">3</span><div><strong>Не подготовили квартиру</strong><p>Слабые фото и показы → меньше интереса → продают дешевле, чем могли</p></div></div>
        </div>

        <h2>Самостоятельная продажа или с помощью специалиста</h2>
        <p>Продать квартиру самому возможно. Но нужно учитывать: общение с покупателями, показы, переговоры, документы. И самое сложное — правильно оценить рынок. Без этого можно либо долго продавать, либо потерять деньги.</p>

        <h2>Итог</h2>
        <p>Продажа квартиры — это не просто «разместить объявление». Это комбинация правильной цены, нормальной подачи и понимания рынка.</p>
        <p>Если вы планируете продать квартиру в Уфе — лучше сразу выстроить стратегию, чем потом снижать цену из-за отсутствия спроса.</p>

      </div>
    ),
  },
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
  {
    id: 'new-builds-ufa',
    category: 'Инвестиции',
    title: 'Стоит ли покупать новостройку в Уфе: где реальная выгода, а где иллюзия',
    excerpt: 'Новостройки в Уфе активно продаются. Реклама, рендеры, «выгодные цены на старте» — всё выглядит убедительно. Но не каждая новостройка — это выгодная покупка.',
    date: '1 апреля 2026',
    readTime: '6 мин',
    content: (
      <div className="blog-article-content">
        <p className="blog-lead">Новостройки в Уфе активно продаются. Реклама, рендеры, «выгодные цены на старте» — всё выглядит убедительно. И большинство покупателей в какой-то момент думают: <em>«может взять сейчас, пока дешевле?»</em></p>
        <p>Но здесь есть нюанс. Не каждая новостройка — это выгодная покупка.</p>

        <h2>Почему новостройки вообще привлекают</h2>
        <p>Причины понятны: новый дом, современные планировки, цена ниже на этапе строительства. И главный аргумент — «потом подорожает».</p>
        <p>Иногда так и происходит. Но не всегда.</p>

        <h2>Где ожидания не совпадают с реальностью</h2>
        <p>Есть распространённая ситуация: человек покупает квартиру на этапе котлована, ждёт сдачи дома и рассчитывает, что цена вырастет. Проходит 1–2 года. Дом сдан. Но цена почти не изменилась.</p>
        <p>Почему так происходит? Потому что рост цены зависит не только от стадии строительства.</p>
        <p>Важно:</p>
        <ul>
          <li>сколько таких же домов строится рядом</li>
          <li>есть ли реальный спрос</li>
          <li>развивается ли район</li>
        </ul>
        <p>Если вокруг много аналогичных предложений — роста может не быть.</p>

        <h2>Когда новостройка — не лучший выбор</h2>
        <p>Есть случаи, когда стоит подумать дважды:</p>
        <div className="blog-mistakes">
          <div className="blog-mistake"><span className="blog-mistake-num">1</span><div><strong>Район «на перспективу»</strong><p>Обещают инфраструктуру, но её пока нет</p></div></div>
          <div className="blog-mistake"><span className="blog-mistake-num">2</span><div><strong>Массовая застройка</strong><p>Много одинаковых домов — высокая конкуренция при перепродаже</p></div></div>
          <div className="blog-mistake"><span className="blog-mistake-num">3</span><div><strong>Покупка «на всякий случай»</strong><p>Без чёткого понимания, зачем именно этот объект</p></div></div>
        </div>

        <h2>Когда новостройка действительно выгодна</h2>
        <p>Есть ситуации, где это хороший вариант:</p>
        <ul>
          <li>покупка на раннем этапе у надёжного застройщика</li>
          <li>точечный проект, не массовая застройка</li>
          <li>хорошая локация с реальным спросом</li>
        </ul>
        <p>В таких случаях рост цены действительно возможен.</p>

        <h2>Что важно понять перед покупкой</h2>
        <p>Главный вопрос не в том, дёшево сейчас или нет. Главный вопрос:</p>
        <p><strong>За счёт чего этот объект будет расти в цене?</strong></p>
        <p>Если на него нет чёткого ответа — это уже повод задуматься.</p>

        <h2>Самостоятельный выбор или помощь специалиста</h2>
        <p>Новостройки активно продаются, и информации много. Но проблема в том, что реклама показывает только плюсы, а риски обычно остаются «за кадром». Без опыта сложно понять, где реальная перспектива, а где просто хороший маркетинг.</p>
        <p>Специалист помогает оценить объект трезво: не опираясь на презентацию застройщика, а на реальные данные по рынку.</p>

      </div>
    ),
  },
  {
    id: 'legal-risks-ufa',
    category: 'Юридическое',
    title: 'Юридические риски при покупке квартиры в Уфе: что действительно важно проверить',
    excerpt: 'Снаружи всё может выглядеть нормально. Но у недвижимости почти всегда есть история — и именно в ней чаще всего кроются проблемы.',
    date: '21 марта 2026',
    readTime: '5 мин',
    content: (
      <div className="blog-article-content">
        <p className="blog-lead">Когда люди покупают квартиру первый раз, они чаще всего смотрят на сам объект: район, цену, состояние. Юридическая часть остаётся «на потом». Проблема в том, что если с документами что-то не так — это уже не «мелочь», а риск потерять деньги или время.</p>

        <h2>Почему с документами не всё так просто</h2>
        <p>Снаружи всё может выглядеть нормально: квартира есть, продавец адекватный, документы «вроде в порядке». Но у недвижимости почти всегда есть история. И именно в ней чаще всего и кроются проблемы.</p>

        <h2>Основные юридические риски</h2>
        <div className="blog-mistakes">
          <div className="blog-mistake"><span className="blog-mistake-num">1</span><div><strong>Несколько собственников</strong><p>Квартира может принадлежать супругам, родственникам или наследникам. Если хотя бы один не согласен — сделка может быть оспорена.</p></div></div>
          <div className="blog-mistake"><span className="blog-mistake-num">2</span><div><strong>Обременения</strong><p>Квартира может быть в ипотеке, под арестом или с долгами. Иногда об этом не говорят напрямую — и покупатель узнаёт уже после начала сделки.</p></div></div>
          <div className="blog-mistake"><span className="blog-mistake-num">3</span><div><strong>Наследство</strong><p>Если квартира получена по наследству — могут появиться другие наследники и попытаться оспорить сделку. Особенно если прошло мало времени.</p></div></div>
          <div className="blog-mistake"><span className="blog-mistake-num">4</span><div><strong>Прописанные люди</strong><p>В квартире могут быть зарегистрированы люди, которых сложно выписать — особенно если есть дети или спорные ситуации.</p></div></div>
          <div className="blog-mistake"><span className="blog-mistake-num">5</span><div><strong>Ошибки в документах</strong><p>Неправильные данные, старые документы, несоответствия — это не мошенничество, но может затянуть или сорвать сделку.</p></div></div>
        </div>

        <h2>Главная ошибка покупателей</h2>
        <p>Люди думают: «если продают — значит всё проверено». Но на практике ответственность за проверку лежит на покупателе.</p>

        <h2>Что нужно проверить перед покупкой</h2>
        <p>Минимум, который стоит сделать:</p>
        <ul>
          <li>проверить собственника</li>
          <li>убедиться, что нет обременений</li>
          <li>изучить историю квартиры</li>
          <li>посмотреть, кто прописан</li>
          <li>сверить документы</li>
        </ul>
        <p>Это базовые вещи, но именно они закрывают большинство рисков.</p>

        <h2>Можно ли сделать всё самому</h2>
        <p>Теоретически — да. Но нужно понимать где проверять, какие документы смотреть и на что обращать внимание. Без опыта часть проблем просто не видна.</p>

        <h2>Итог</h2>
        <p>Юридические риски — это не что-то редкое. Это обычная часть рынка. Разница только в том, заметили вы их до сделки или после.</p>
        <p>Если вы планируете покупку квартиры в Уфе — лучше заранее проверить объект, чем потом разбираться с последствиями.</p>

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
        <div className="wrap" style={{ paddingTop: 96, paddingBottom: 32 }}>
          <div className="blog-article-meta">
            <button className="blog-back" onClick={() => setOpen(null)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Все статьи
            </button>
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
