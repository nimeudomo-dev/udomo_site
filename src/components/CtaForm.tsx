'use client'
import { useState, forwardRef } from 'react'

const CtaForm = forwardRef<HTMLDivElement>((_, ref) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!phone) return
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, source: 'cta_form' }),
      })
      setSent(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sec wrap" ref={ref} id="ctaSection">
      <div className="cta-block">
        <div className="cta-left">
          <div className="cta-lbl">Бесплатная консультация</div>
          <div className="cta-title">Подберём<br/>недвижимость<br/>под вашу задачу</div>
          <div className="cta-sub">Расскажите, что важно — и мы подготовим персональную подборку объектов в Уфе с понятной экономикой.</div>
        </div>
        <div className="cta-right">
          {sent ? (
            <div className="cta-success">✅ Заявка принята! Мы свяжемся в ближайшее время.</div>
          ) : (
            <>
              <div className="cta-inputs">
                <input className="cta-fi" type="text" placeholder="Ваше имя"
                  value={name} onChange={e => setName(e.target.value)} />
                <input className="cta-fi" type="tel" placeholder="Телефон / WhatsApp"
                  value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <button className="cta-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Отправляем...' : 'Получить подборку бесплатно →'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
})

CtaForm.displayName = 'CtaForm'
export default CtaForm
