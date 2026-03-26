'use client'

interface ComingSoonProps {
  title: string
  onBack: () => void
}

export default function ComingSoon({ title, onBack }: ComingSoonProps) {
  return (
    <div className="coming-soon-wrap">
      <div className="coming-soon-card">

        {/* Анимированный домик */}
        <div className="coming-soon-icon">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            {/* Тень */}
            <ellipse cx="36" cy="66" rx="18" ry="4" fill="var(--teal)" opacity="0.12" className="cs-shadow"/>
            {/* Дом */}
            <rect x="16" y="36" width="40" height="28" rx="3" fill="var(--teal)" opacity="0.15"/>
            <rect x="16" y="36" width="40" height="28" rx="3" stroke="var(--teal2)" strokeWidth="1.8"/>
            {/* Крыша */}
            <path d="M10 38L36 14L62 38" stroke="var(--teal2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Дверь */}
            <rect x="29" y="48" width="14" height="16" rx="2" fill="var(--teal2)" opacity="0.25"/>
            <rect x="29" y="48" width="14" height="16" rx="2" stroke="var(--teal2)" strokeWidth="1.5"/>
            {/* Окно */}
            <rect x="19" y="42" width="10" height="8" rx="1.5" fill="var(--teal2)" opacity="0.3"/>
            <rect x="43" y="42" width="10" height="8" rx="1.5" fill="var(--teal2)" opacity="0.3"/>
            {/* Ключ */}
            <circle cx="56" cy="22" r="5" stroke="var(--teal2)" strokeWidth="1.6" fill="none"/>
            <path d="M60 26l6 6M64 30l2 2M66 32l2-2" stroke="var(--teal2)" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>

        <h1 className="coming-soon-title">{title}</h1>
        <p className="coming-soon-text">
          Данная страница ушла выбирать квартиру,<br/>вернётся позже
        </p>

        <button className="btn btn-dark coming-soon-btn" onClick={onBack}>
          ← На главную
        </button>
      </div>
    </div>
  )
}
