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
  digits: number // ожидаемое кол-во цифр в номере
}

const COUNTRIES: Country[] = [
  // СНГ
  { name: 'Россия',          flag: '🇷🇺', code: '+7',   digits: 10 },
  { name: 'Беларусь',        flag: '🇧🇾', code: '+375', digits: 9  },
  { name: 'Казахстан',       flag: '🇰🇿', code: '+7',   digits: 10 },
  { name: 'Украина',         flag: '🇺🇦', code: '+380', digits: 9  },
  { name: 'Узбекистан',      flag: '🇺🇿', code: '+998', digits: 9  },
  { name: 'Азербайджан',     flag: '🇦🇿', code: '+994', digits: 9  },
  { name: 'Армения',         flag: '🇦🇲', code: '+374', digits: 8  },
  { name: 'Грузия',          flag: '🇬🇪', code: '+995', digits: 9  },
  { name: 'Кыргызстан',      flag: '🇰🇬', code: '+996', digits: 9  },
  { name: 'Таджикистан',     flag: '🇹🇯', code: '+992', digits: 9  },
  { name: 'Туркменистан',    flag: '🇹🇲', code: '+993', digits: 8  },
  { name: 'Молдова',         flag: '🇲🇩', code: '+373', digits: 8  },
  // Европа
  { name: 'Германия',        flag: '🇩🇪', code: '+49',  digits: 10 },
  { name: 'Великобритания',  flag: '🇬🇧', code: '+44',  digits: 10 },
  { name: 'Франция',         flag: '🇫🇷', code: '+33',  digits: 9  },
  { name: 'Италия',          flag: '🇮🇹', code: '+39',  digits: 10 },
  { name: 'Испания',         flag: '🇪🇸', code: '+34',  digits: 9  },
  { name: 'Польша',          flag: '🇵🇱', code: '+48',  digits: 9  },
  { name: 'Нидерланды',      flag: '🇳🇱', code: '+31',  digits: 9  },
  { name: 'Австрия',         flag: '🇦🇹', code: '+43',  digits: 10 },
  { name: 'Швейцария',       flag: '🇨🇭', code: '+41',  digits: 9  },
  { name: 'Чехия',           flag: '🇨🇿', code: '+420', digits: 9  },
  { name: 'Швеция',          flag: '🇸🇪', code: '+46',  digits: 9  },
  { name: 'Норвегия',        flag: '🇳🇴', code: '+47',  digits: 8  },
  { name: 'Финляндия',       flag: '🇫🇮', code: '+358', digits: 9  },
  { name: 'Дания',           flag: '🇩🇰', code: '+45',  digits: 8  },
  { name: 'Португалия',      flag: '🇵🇹', code: '+351', digits: 9  },
  { name: 'Латвия',          flag: '🇱🇻', code: '+371', digits: 8  },
  { name: 'Литва',           flag: '🇱🇹', code: '+370', digits: 8  },
  { name: 'Эстония',         flag: '🇪🇪', code: '+372', digits: 7  },
  // Азия
  { name: 'Турция',          flag: '🇹🇷', code: '+90',  digits: 10 },
  { name: 'ОАЭ',             flag: '🇦🇪', code: '+971', digits: 9  },
  { name: 'Таиланд',         flag: '🇹🇭', code: '+66',  digits: 9  },
  { name: 'Китай',           flag: '🇨🇳', code: '+86',  digits: 11 },
  { name: 'Япония',          flag: '🇯🇵', code: '+81',  digits: 10 },
  { name: 'Индия',           flag: '🇮🇳', code: '+91',  digits: 10 },
  { name: 'Израиль',         flag: '🇮🇱', code: '+972', digits: 9  },
  { name: 'Саудовская Аравия',flag: '🇸🇦', code: '+966', digits: 9  },
  { name: 'Египет',          flag: '🇪🇬', code: '+20',  digits: 10 },
  // Америка
  { name: 'США',             flag: '🇺🇸', code: '+1',   digits: 10 },
  { name: 'Канада',          flag: '🇨🇦', code: '+1',   digits: 10 },
]

function formatPhone(digits: string, maxLen: number): string {
  const d = digits.slice(0, maxLen)
  if (maxLen === 10) {
    // (000) 000-00-00
    let r = ''
    if (d.length > 0) r += '(' + d.slice(0, 3)
    if (d.length >= 4) r += ') ' + d.slice(3, 6)
    if (d.length >= 7) r += '-' + d.slice(6, 8)
    if (d.length >= 9) r += '-' + d.slice(8, 10)
    return r
  }
  if (maxLen === 9) {
    // 000 000 000
    let r = ''
    if (d.length > 0) r += d.slice(0, 3)
    if (d.length >= 4) r += ' ' + d.slice(3, 6)
    if (d.length >= 7) r += ' ' + d.slice(6, 9)
    return r
  }
  if (maxLen === 11) {
    // 000 0000 0000
    let r = ''
    if (d.length > 0) r += d.slice(0, 3)
    if (d.length >= 4) r += ' ' + d.slice(3, 7)
    if (d.length >= 8) r += ' ' + d.slice(7, 11)
    return r
  }
  if (maxLen === 8) {
    // 0000 0000
    let r = ''
    if (d.length > 0) r += d.slice(0, 4)
    if (d.length >= 5) r += ' ' + d.slice(4, 8)
    return r
  }
  if (maxLen === 7) {
    // 000 0000
    let r = ''
    if (d.length > 0) r += d.slice(0, 3)
    if (d.length >= 4) r += ' ' + d.slice(3, 7)
    return r
  }
  return d
}

export default function CallModal({
  isOpen, onClose,
  title = 'Закажите звонок',
  subtitle = 'Оставьте контакты — перезвоним в ближайшее время'
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
    ? COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search))
    : COUNTRIES

  return (
    <>
      <div className={`modal-overlay${isOpen ? ' open' : ''}`} onClick={handleClose} />
      <div className={`modal-box${isOpen ? ' open' : ''}`}>
        <div className="modal-box-inner">
        <button className="modal-close" onClick={handleClose}>✕</button>

        {sent ? (
          <div className="modal-success">
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <div className="mf-section-title" style={{ fontSize: 20 }}>Заявка принята!</div>
            <div className="mf-section-sub" style={{ marginTop: 8 }}>Перезвоним в течение 15 минут.</div>
          </div>
        ) : (
          <>
            <div className="modal-title">Свяжитесь удобным способом</div>

            {/* Мессенджеры */}
            <div className="mf-section">
              <div className="mf-section-title">Напишите в мессенджер</div>
              <div className="mf-section-sub">Ответим прямо сейчас</div>
              <div className="mf-messengers">
                <a href="https://t.me/udomo_ufa" target="_blank" rel="noopener" className="mf-messenger-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0088cc">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>
                <a href="https://vk.me/udomo_ufa" target="_blank" rel="noopener" className="mf-messenger-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#0077FF"/>
                    <path d="M6.5 8.5h2.2c.3 0 .5.2.6.5l1 2.8c.1.4.7.4.9 0l1-2.8c.1-.3.3-.5.6-.5H15c.4 0 .7.4.5.8l-2.8 5.8c-.1.3-.4.4-.7.4H9.5c-.3 0-.6-.2-.7-.4L6.1 9.3c-.2-.4.1-.8.4-.8z" fill="white"/>
                  </svg>
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
                      placeholder={country.digits === 10 ? '(000) 000-00-00' : '0'.repeat(country.digits)}
                      value={formatPhone(phoneDigits, country.digits)}
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
