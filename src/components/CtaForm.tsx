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
          <div className="cta-title">Подберём<br/>недвижимость<br/>под ваш бюджет и цель</div>
          <div className="cta-sub">Предложим подходящие варианты и рассчитаем выгоду.</div>
        </div>
        <div className="cta-right">
          {sent ? (
            <div className="cta-success">✅ Заявка принята! Мы свяжемся в ближайшее время.</div>
          ) : (
            <>
              <div className="cta-inputs">
                <input className="cta-fi" type="text" placeholder="Ваше имя"
                  value={name} onChange={e => setName(e.target.value.replace(/[^a-zA-Zа-яёА-ЯЁ\s\-]/g, ''))} />
                <input className="cta-fi" type="tel" placeholder="Телефон"
                  value={phone} onChange={e => setPhone(e.target.value.replace(/[^0-9+\-\s()]/g, ''))} />
              </div>
              <button className="cta-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Отправляем...' : 'Получить подборку →'}
              </button>
              <div className="cta-pd">Нажимая кнопку «Получить подборку», вы соглашаетесь с <a href="/docs/privacy.pdf" target="_blank" rel="noopener noreferrer">политикой обработки персональных данных</a></div>
            </>
          )}
        </div>
      </div>
    </div>
  )
})

CtaForm.displayName = 'CtaForm'
export default CtaForm
