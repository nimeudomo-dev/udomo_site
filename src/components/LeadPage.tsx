'use client'
import { useState } from 'react'

interface Benefit {
  icon: React.ReactNode
  title: string
  text: string
}

interface LeadPageProps {
  tag: string
  title: string
  subtitle: string
  benefits: Benefit[]
  formTitle: string
  formSubtitle: string
  formSource: string
  stats?: { value: string; label: string }[]
}

export default function LeadPage({
  tag, title, subtitle, benefits, formTitle, formSubtitle, formSource, stats
}: LeadPageProps) {
  const [name, setName]     = useState('')
  const [phone, setPhone]   = useState('')
  const [comment, setComment] = useState('')
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!phone) return
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, comment, source: formSource }),
      })
      setSent(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lp-root">
      <div className="lp-hero wrap">

        {/* LEFT */}
        <div className="lp-left">
          <div className="lp-tag">{tag}</div>
          <h1 className="lp-title">{title}</h1>
          <p className="lp-subtitle">{subtitle}</p>

          <div className="lp-benefits">
            {benefits.map((b, i) => (
              <div key={i} className="lp-benefit">
                <div className="lp-benefit-icon">{b.icon}</div>
                <div>
                  <div className="lp-benefit-title">{b.title}</div>
                  <div className="lp-benefit-text">{b.text}</div>
                </div>
              </div>
            ))}
          </div>

          {stats && (
            <div className="lp-stats">
              {stats.map((s, i) => (
                <div key={i} className="lp-stat">
                  <div className="lp-stat-value">{s.value}</div>
                  <div className="lp-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — form */}
        <div className="lp-form-card">
          {sent ? (
            <div className="lp-success">
              <div className="lp-success-icon">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="17" stroke="var(--teal2)" strokeWidth="1.5"/>
                  <path d="M11 18l5 5 9-10" stroke="var(--teal2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="lp-success-title">Заявка принята!</div>
              <div className="lp-success-text">Перезвоним в течение 30 минут в рабочее время.</div>
            </div>
          ) : (
            <>
              <div className="lp-form-title">{formTitle}</div>
              <div className="lp-form-sub">{formSubtitle}</div>
              <div className="lp-form-fields">
                <input
                  className="lp-input" type="text" placeholder="Ваше имя"
                  value={name} onChange={e => setName(e.target.value)}
                />
                <input
                  className="lp-input" type="tel" placeholder="Телефон / WhatsApp"
                  value={phone} onChange={e => setPhone(e.target.value)}
                />
                <textarea
                  className="lp-input lp-textarea" placeholder="Комментарий (необязательно)"
                  value={comment} onChange={e => setComment(e.target.value)}
                  rows={3}
                />
              </div>
              <button className="lp-submit" onClick={handleSubmit} disabled={loading || !phone}>
                {loading ? 'Отправляем...' : 'Отправить заявку →'}
              </button>
              <div className="lp-form-note">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</div>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
