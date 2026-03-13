'use client'
import { useState, useEffect } from 'react'

interface CallModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CallModal({ isOpen, onClose }: CallModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = async () => {
    if (!phone) return
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, source: 'call_modal' }),
      })
      setSent(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setSent(false); setName(''); setPhone(''); onClose()
  }

  return (
    <>
      <div className={`modal-overlay${isOpen ? ' open' : ''}`} onClick={handleClose} />
      <div className={`modal-box${isOpen ? ' open' : ''}`}>
        <button className="modal-close" onClick={handleClose}>✕</button>
        {sent ? (
          <div className="modal-success">
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <div className="modal-title">Заявка принята!</div>
            <div className="modal-sub">Перезвоним в течение 15 минут.</div>
          </div>
        ) : (
          <>
            <div className="modal-title">Заказать звонок</div>
            <div className="modal-sub">Перезвоним в течение 15 минут</div>
            <div className="modal-form">
              <div className="mf-group">
                <label className="mf-label">Имя</label>
                <input className="mf-input" type="text" placeholder="Ваше имя"
                  value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="mf-group">
                <label className="mf-label">Телефон</label>
                <input className="mf-input" type="tel" placeholder="+7 (___) ___-__-__"
                  value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <button className="mf-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Отправляем...' : 'Жду звонка →'}
              </button>
              <div className="mf-note">
                Нажимая кнопку, вы соглашаетесь с <a href="#">политикой конфиденциальности</a>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
