'use client'
import { useState } from 'react'

interface AboutProps {
  onOpenModal: () => void
}

export default function About({ onOpenModal }: AboutProps) {
  const [ctaName, setCtaName] = useState('')
  const [ctaPhone, setCtaPhone] = useState('')
  const [ctaSent, setCtaSent] = useState(false)

  const handleCtaSubmit = async () => {
    if (!ctaName.trim() || !ctaPhone.trim()) return
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: ctaName, phone: ctaPhone, source: 'about_cta' }),
      })
      setCtaSent(true)
    } catch (e) { console.error(e) }
  }
  return (
    <div id="page-about">
      {/* Hero */}
      <div className="wrap" style={{ paddingTop: 48 }}>
        <div className="about-hero">
          <div className="about-hero-text">
            <div className="sec-tag">О компании</div>
            <div className="about-hero-title"><span style={{ color: 'var(--teal2)' }}>Udomo</span> — агентство<br/>недвижимости Уфы</div>
            <div className="about-hero-sub">Мы помогаем людям находить, покупать, продавать и инвестировать в Уфе с 2017 года. За это время провели более 1200 сделок и стали одним из самых узнаваемых агентств города.</div>
            <button className="contacts-call-btn" onClick={onOpenModal}
              style={{ marginTop: 24, padding: '0 32px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/>
              </svg>
              Получить консультацию
            </button>
          </div>
          <div className="about-stats-grid">
            {[
              { num: '8+', lbl: 'лет на рынке' },
              { num: '1200+', lbl: 'сделок закрыто' },
              { num: '150+', lbl: 'объектов в продаже' },
              { num: '98%', lbl: 'клиентов довольны' },
            ].map((s, i) => (
              <div key={i} className="about-stat">
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* История */}
      <div className="sec wrap" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <div className="sec-head" style={{ marginBottom: 8 }}>
          <div>
            <div className="sec-tag">Наша история</div>
            <div className="sec-title">Как мы росли</div>
          </div>
        </div>
        <div className="about-timeline">
          {[
            { year: '2017', title: 'Основание Udomo', text: 'Гареев Александр основал агентство недвижимости Udomo в Уфе. Команда из пяти специалистов — и большие планы на рынок.' },
            { year: '2020', title: 'Коттеджный посёлок «Панорама 27»', text: 'Построили собственный коттеджный посёлок в Ногаево. От проекта до ключей — полностью своими силами.' },
            { year: '2022', title: 'Выход на международный рынок', text: 'Открыли офис в Таиланде. Теперь помогаем клиентам со всего мира приобретать недвижимость на тайских курортах.' },
            { year: '2024', title: 'Рост команды и строительство вилл', text: 'Значительно расширили штат сотрудников и запустили строительство собственных вилл в Таиланде.' },
          ].map((item, i) => (
            <div key={i} className="about-tl-item">
              <div className="about-tl-year">{item.year}</div>
              <div className="about-tl-body">
                <div className="about-tl-title">{item.title}</div>
                <div className="about-tl-text">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ценности */}
      <div className="sec wrap" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <div className="sec-head" style={{ marginBottom: 24 }}>
          <div>
            <div className="sec-tag">Принципы работы</div>
            <div className="sec-title">Наши ценности</div>
          </div>
        </div>
        <div className="about-values">
          {[
            {
              title: 'Честность',
              text: 'Никаких скрытых комиссий — вы заранее знаете все условия сделки.',
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
              color: '#1bc8a0', bg: 'rgba(27,200,160,.12)', accent: '#1bc8a0',
            },
            {
              title: 'Скорость',
              text: 'Подбираем варианты в течение 1 дня.',
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              color: '#8b5cf6', bg: 'rgba(139,92,246,.12)', accent: '#8b5cf6',
            },
            {
              title: 'Безопасность',
              text: 'Проверяем каждый объект и сопровождаем сделку юридически.',
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
              color: '#1bc8a0', bg: 'rgba(27,200,160,.12)', accent: '#1bc8a0',
            },
            {
              title: 'Удобство',
              text: 'Берём на себя все этапы сделки — вы экономите время.',
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
              color: '#8b5cf6', bg: 'rgba(139,92,246,.12)', accent: '#8b5cf6',
            },
          ].map((v, i) => (
            <div key={i} className="about-value-card" style={{ borderTop: `3px solid ${(v as any).accent}` }}>
              <div className="about-value-icon-wrap" style={{ background: v.bg, color: v.color }}>
                {v.icon}
              </div>
              <div className="about-value-title">{v.title}</div>
              <div className="about-value-text">{v.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Команда */}
      <div className="sec wrap" style={{ paddingTop: 20, paddingBottom: 48 }}>
        <div className="sec-head" style={{ marginBottom: 24 }}>
          <div>
            <div className="sec-tag">Люди</div>
            <div className="sec-title">Наша команда</div>
          </div>
        </div>
        {[
          [
            { initials: 'ГИ', bg: 'linear-gradient(135deg,#1bc8a0,#0fa880)', name: 'Грызлов Илья', role: 'Руководитель отдела инвестиций', text: '', phone: '+79174909030', phoneLabel: '+7 917 490-90-30' },
            { initials: 'ГД', bg: 'linear-gradient(135deg,#3b82f6,#2563eb)', name: 'Гарифуллин Данис', role: 'Руководитель отдела коммерческой недвижимости', text: '', phone: '+79656502429', phoneLabel: '+7 965 650-24-29' },
            { initials: 'ЯР', bg: 'linear-gradient(135deg,#9b3fc8,#7b2fa8)', name: 'Ягудин Рустем', role: 'Руководитель отдела жилой недвижимости', text: '', phone: '+79061067781', phoneLabel: '+7 906 106-77-81' },
          ],
          [
            { initials: 'АБ', bg: 'linear-gradient(135deg,#f59e0b,#d97706)', name: 'Анна Белова', role: 'Управляющая компания', text: 'Управляет 150+ объектами. Заполняемость — 98%, простой — менее 3 дней.' },
            { initials: 'ИП', bg: 'linear-gradient(135deg,#ef4444,#dc2626)', name: 'Иван Попов', role: 'Агент по продажам', text: 'Специализируется на вторичном рынке. Более 200 закрытых сделок.' },
            { initials: 'ОК', bg: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', name: 'Ольга Кузнецова', role: 'Ипотечный специалист', text: 'Помогает подобрать лучшие условия ипотеки. Одобрение в 3 банках за 1 день.' },
            { initials: 'РН', bg: 'linear-gradient(135deg,#06b6d4,#0891b2)', name: 'Руслан Назаров', role: 'Агент по аренде', text: 'Эксперт по аренде жилой и коммерческой недвижимости в Уфе.' },
          ],
          [
            { initials: 'ЕС', bg: 'linear-gradient(135deg,#10b981,#059669)', name: 'Елена Смирнова', role: 'Менеджер по работе с клиентами', text: 'Сопровождает клиентов на всех этапах сделки. Всегда на связи.' },
            { initials: 'ВМ', bg: 'linear-gradient(135deg,#f97316,#ea580c)', name: 'Виктор Морозов', role: 'Специалист по КП Панорама', text: 'Отвечает за продажи в коттеджных посёлках Панорама 27 и Панорама 14.' },
            { initials: 'НА', bg: 'linear-gradient(135deg,#ec4899,#db2777)', name: 'Наталья Андреева', role: 'Фотограф и визуализация', text: 'Профессиональная съёмка объектов. Делает недвижимость привлекательнее.' },
          ],
        ].map((row, ri) => (
          <div key={ri} className={`about-team about-team-row-${ri}`}>
            {row.map((m, i) => (
              <div key={i} className="about-team-card" style={{ '--card-color': (m as any).cardColor || m.bg } as React.CSSProperties}>
                <div className="about-team-card-bg">
                  <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 90V45L40 15L70 45V90H10Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                    <rect x="28" y="60" width="14" height="30" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <rect x="46" y="50" width="12" height="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M75 90V55L95 35L115 55V90" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                    <rect x="83" y="65" width="10" height="25" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <rect x="97" y="62" width="10" height="12" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <line x1="0" y1="90" x2="120" y2="90" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="about-team-avatar-wrap">
                  <div className="about-team-avatar" style={{ background: m.bg }}>{m.initials}</div>
                </div>
                <div className="about-team-name">{m.name}</div>
                <div className="about-team-role">{m.role}</div>
                {m.text && <div className="about-team-text">{m.text}</div>}
                {(m as any).phone && (
                  <a href={`tel:${(m as any).phone}`} className="about-team-phone">
                    {(m as any).phoneLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* CTA */}
      <div className="wrap" style={{ paddingBottom: 80 }}>
        <div className="about-cta">
          <div className="about-cta-left">
            <div className="sec-tag">Бесплатная консультация</div>
            <div className="about-cta-title">Подберём недвижимость<br/>под ваш бюджет и цель</div>
            <div className="about-cta-sub">Предложим подходящие варианты и рассчитаем выгоду.</div>
          </div>
          <div className="about-cta-right">
            {ctaSent ? (
              <div className="about-cta-success">✅ Заявка принята! Свяжемся с вами в ближайшее время.</div>
            ) : (
              <>
                <div className="about-cta-inputs">
                  <input className="about-cta-input" placeholder="Ваше имя" value={ctaName} onChange={e => setCtaName(e.target.value.replace(/[^a-zA-Zа-яёА-ЯЁ\s\-]/g, ''))} />
                  <input className="about-cta-input" placeholder="Телефон" type="tel" value={ctaPhone} onChange={e => setCtaPhone(e.target.value.replace(/[^0-9+\-\s()]/g, ''))} />
                </div>
                <button className="about-cta-btn" onClick={handleCtaSubmit}>
                  Получить подборку →
                </button>
                <div className="about-cta-pd">Нажимая кнопку «Получить подборку», вы соглашаетесь с <a href="#">политикой обработки персональных данных</a></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
