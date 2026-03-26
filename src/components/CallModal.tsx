'use client'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface CallModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
}

interface Country {
  name: string
  flag: string
  code: string
  digits: number
  iso: string
}

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
      // (000) 000-00-00
      const d = digits.slice(0, 10)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 3)
      if (d.length >= 4) r += ') ' + d.slice(3, 6)
      if (d.length >= 7) r += '-' + d.slice(6, 8)
      if (d.length >= 9) r += '-' + d.slice(8, 10)
      return r
    }
    case '+375': {
      // (00) 000-00-00
      const d = digits.slice(0, 9)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 2)
      if (d.length >= 3) r += ') ' + d.slice(2, 5)
      if (d.length >= 6) r += '-' + d.slice(5, 7)
      if (d.length >= 8) r += '-' + d.slice(7, 9)
      return r
    }
    case '+380': {
      // (00) 000-00-00
      const d = digits.slice(0, 9)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 2)
      if (d.length >= 3) r += ') ' + d.slice(2, 5)
      if (d.length >= 6) r += '-' + d.slice(5, 7)
      if (d.length >= 8) r += '-' + d.slice(7, 9)
      return r
    }
    case '+998': {
      // (00) 000-00-00
      const d = digits.slice(0, 9)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 2)
      if (d.length >= 3) r += ') ' + d.slice(2, 5)
      if (d.length >= 6) r += '-' + d.slice(5, 7)
      if (d.length >= 8) r += '-' + d.slice(7, 9)
      return r
    }
    case '+994': {
      // (00) 000-00-00
      const d = digits.slice(0, 9)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 2)
      if (d.length >= 3) r += ') ' + d.slice(2, 5)
      if (d.length >= 6) r += '-' + d.slice(5, 7)
      if (d.length >= 8) r += '-' + d.slice(7, 9)
      return r
    }
    case '+374': {
      // (00) 00-00-00
      const d = digits.slice(0, 8)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 2)
      if (d.length >= 3) r += ') ' + d.slice(2, 4)
      if (d.length >= 5) r += '-' + d.slice(4, 6)
      if (d.length >= 7) r += '-' + d.slice(6, 8)
      return r
    }
    case '+995': {
      // (000) 00-00-00
      const d = digits.slice(0, 9)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 3)
      if (d.length >= 4) r += ') ' + d.slice(3, 5)
      if (d.length >= 6) r += '-' + d.slice(5, 7)
      if (d.length >= 8) r += '-' + d.slice(7, 9)
      return r
    }
    case '+996': {
      // (000) 000-000
      const d = digits.slice(0, 9)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 3)
      if (d.length >= 4) r += ') ' + d.slice(3, 6)
      if (d.length >= 7) r += '-' + d.slice(6, 9)
      return r
    }
    case '+992': {
      // (00) 000-00-00
      const d = digits.slice(0, 9)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 2)
      if (d.length >= 3) r += ') ' + d.slice(2, 5)
      if (d.length >= 6) r += '-' + d.slice(5, 7)
      if (d.length >= 8) r += '-' + d.slice(7, 9)
      return r
    }
    case '+993': {
      // (00) 00-00-00
      const d = digits.slice(0, 8)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 2)
      if (d.length >= 3) r += ') ' + d.slice(2, 4)
      if (d.length >= 5) r += '-' + d.slice(4, 6)
      if (d.length >= 7) r += '-' + d.slice(6, 8)
      return r
    }
    case '+373': {
      // (00) 000-000
      const d = digits.slice(0, 8)
      let r = ''
      if (d.length > 0) r += '(' + d.slice(0, 2)
      if (d.length >= 3) r += ') ' + d.slice(2, 5)
      if (d.length >= 6) r += '-' + d.slice(5, 8)
      return r
    }
    default: {
      return digits.slice(0, 10)
    }
  }
}

export default function CallModal({
  isOpen, onClose,
  title = 'Закажите звонок',
  subtitle = 'Самый быстрый способ связи'
}: CallModalProps) {
  const [name, setName] = useState('')
  const [phoneDigits, setPhoneDigits] = useState('')
  const [country, setCountry] = useState<Country>(COUNTRIES[0])
  const [dropOpen, setDropOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)
  const portalDropRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 0 })

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { if (dropOpen) setDropOpen(false); else onClose() } }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, dropOpen])

  useEffect(() => {
    if (!dropOpen) return
    const handleClick = (e: MouseEvent) => {
      const inTrigger = dropRef.current?.contains(e.target as Node)
      const inDrop = portalDropRef.current?.contains(e.target as Node)
      if (!inTrigger && !inDrop) {
        setDropOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [dropOpen])

  const handleNameChange = (val: string) => {
    const filtered = val.replace(/[^a-zA-Zа-яёА-ЯЁ\s\-]/g, '')
    setName(filtered)
    if (nameError && filtered) setNameError('')
  }

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, country.digits)
    setPhoneDigits(digits)
    if (phoneError && digits.length === country.digits) setPhoneError('')
  }

  const selectCountry = (c: Country) => {
    setCountry(c)
    setPhoneDigits('')
    setPhoneError('')
    setDropOpen(false)
    setSearch('')
  }

  const handleSubmit = async () => {
    let valid = true
    if (!name.trim()) { setNameError('Введите ваше имя'); valid = false }
    if (phoneDigits.length < country.digits) {
      setPhoneError(`Введите полный номер — ${country.digits} цифр`)
      valid = false
    }
    if (!valid) return
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone: country.code + phoneDigits, source: 'call_modal' }),
      })
      setSent(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setSent(false); setName(''); setPhoneDigits('')
    setNameError(''); setPhoneError(''); setDropOpen(false); setSearch('')
    onClose()
  }

  const filtered = search
    ? COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.includes(search) ||
        c.iso.toLowerCase().includes(search.toLowerCase())
      )
    : COUNTRIES

  return (
    <>
      <div className={`modal-overlay${isOpen ? ' open' : ''}`} onClick={handleClose} />
      <div className={`modal-box${isOpen ? ' open' : ''}`}>
        <div className="modal-box-inner">
        <button className="modal-close" onClick={handleClose}>✕</button>

        {sent ? (
          <div className="modal-success">
            <div className="modal-success-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="modal-success-title">Заявка принята!</div>
            <div className="modal-success-sub">Мы скоро свяжемся с вами</div>
          </div>
        ) : (
          <>
            <div className="modal-title">Свяжитесь удобным способом</div>

            {/* Мессенджеры */}
            <div className="mf-section">
              <div className="mf-section-title">Напишите в мессенджер</div>
              <div className="mf-section-sub">Ответим в ближайшее время</div>
              <div className="mf-messengers">
                <a href="https://t.me/udomo_ufa" target="_blank" rel="noopener" className="mf-messenger-btn mf-tg">
                  <div className="mf-messenger-icon">
                    <img src="/icons/telegram.png" width="26" height="26" alt="" style={{ objectFit: 'contain' }} />
                  </div>
                  Telegram
                </a>
                <a href="https://vk.me/udomo_ufa" target="_blank" rel="noopener" className="mf-messenger-btn mf-max">
                  <div className="mf-messenger-icon">
                    <img src="/icons/max.webp" width="22" height="22" alt="" style={{ objectFit: 'contain' }} />
                  </div>
                  MAX
                </a>
              </div>
            </div>

            <div className="mf-divider" />

            {/* Звонок */}
            <div className="mf-section">
              <div className="mf-section-title">{title}</div>
              <div className="mf-section-sub">{subtitle}</div>
              <div className="mf-form">
                <div className="mf-field">
                  <input
                    className={`mf-input${nameError ? ' mf-input--error' : ''}`}
                    type="text" placeholder="Ваше имя"
                    value={name} onChange={e => handleNameChange(e.target.value)}
                  />
                  {nameError && <div className="mf-error">{nameError}</div>}
                </div>

                <div className="mf-field">
                  <div className="mf-phone-wrap">
                    {/* Селектор страны */}
                    <div className="mf-country-select" ref={dropRef}>
                      <button
                        type="button"
                        ref={triggerRef}
                        className="mf-country-trigger"
                        onClick={() => {
                          if (!dropOpen && triggerRef.current) {
                            const r = triggerRef.current.getBoundingClientRect()
                            setDropPos({ top: r.bottom + 6, left: r.left, width: Math.max(r.width, 280) })
                          }
                          setDropOpen(v => !v)
                        }}
                      >
                        <span>{country.flag}</span>
                        <span className="mf-country-code">{country.code}</span>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 2, opacity: 0.4 }}>
                          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>

                      {dropOpen && typeof window !== 'undefined' && createPortal(
                        <div
                          ref={portalDropRef}
                          className="mf-country-drop"
                          style={{ position: 'fixed', top: dropPos.top, left: dropPos.left, width: dropPos.width, zIndex: 9999 }}
                        >
                          <div className="mf-country-search-wrap">
                            <input
                              className="mf-country-search"
                              type="text"
                              placeholder="Поиск страны..."
                              value={search}
                              onChange={e => setSearch(e.target.value)}
                              autoFocus
                            />
                          </div>
                          <div className="mf-country-list">
                            {filtered.map((c, i) => (
                              <div
                                key={i}
                                className={`mf-country-item${c.name === country.name ? ' active' : ''}`}
                                onClick={() => selectCountry(c)}
                              >
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
                      className={`mf-input mf-phone-input${phoneError ? ' mf-input--error' : ''}`}
                      type="tel"
                      placeholder={getPlaceholder(country.code)}
                      value={formatPhone(phoneDigits, country.code)}
                      onChange={e => handlePhoneChange(e.target.value)}
                    />
                  </div>
                  {phoneError && <div className="mf-error">{phoneError}</div>}
                </div>

                <button className="mf-submit" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Отправляем...' : 'Отправить'}
                  {!loading && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
                <div className="mf-note">
                  Отправляя форму, я соглашаюсь с <a href="#">политикой обработки персональных данных</a>
                </div>
              </div>
            </div>
          </>
        )}
        </div>
      </div>
    </>
  )
}
