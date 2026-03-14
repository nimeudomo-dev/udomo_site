'use client'

interface ComingSoonProps {
  title: string
  onBack: () => void
}

export default function ComingSoon({ title, onBack }: ComingSoonProps) {
  return (
    <div className="coming-soon-wrap">
      <div className="coming-soon-card">

        {/* Animated building icon */}
        <div className="coming-soon-icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="20" width="22" height="36" rx="3" fill="var(--teal)" opacity="0.15"/>
            <rect x="8" y="20" width="22" height="36" rx="3" stroke="var(--teal2)" strokeWidth="1.8"/>
            <rect x="34" y="10" width="22" height="46" rx="3" fill="var(--teal)" opacity="0.25"/>
            <rect x="34" y="10" width="22" height="46" rx="3" stroke="var(--teal2)" strokeWidth="1.8"/>
            <rect x="13" y="26" width="5" height="5" rx="1" fill="var(--teal2)" opacity="0.6"/>
            <rect x="22" y="26" width="5" height="5" rx="1" fill="var(--teal2)" opacity="0.6"/>
            <rect x="13" y="36" width="5" height="5" rx="1" fill="var(--teal2)" opacity="0.6"/>
            <rect x="22" y="36" width="5" height="5" rx="1" fill="var(--teal2)" opacity="0.6"/>
            <rect x="39" y="17" width="5" height="5" rx="1" fill="var(--teal2)" opacity="0.8"/>
            <rect x="49" y="17" width="5" height="5" rx="1" fill="var(--teal2)" opacity="0.8"/>
            <rect x="39" y="27" width="5" height="5" rx="1" fill="var(--teal2)" opacity="0.8"/>
            <rect x="49" y="27" width="5" height="5" rx="1" fill="var(--teal2)" opacity="0.8"/>
            <rect x="39" y="37" width="5" height="5" rx="1" fill="var(--teal2)" opacity="0.8"/>
            <rect x="49" y="37" width="5" height="5" rx="1" fill="var(--teal2)" opacity="0.8"/>
            {/* Crane */}
            <line x1="19" y1="6" x2="19" y2="20" stroke="var(--teal2)" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="10" y1="6" x2="34" y2="6" stroke="var(--teal2)" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="28" y1="6" x2="28" y2="14" stroke="var(--teal2)" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 2"/>
          </svg>
        </div>

        <div className="coming-soon-label">Скоро</div>
        <h1 className="coming-soon-title">{title}</h1>
        <p className="coming-soon-text">
          Мы активно работаем над этим разделом.<br/>
          Совсем скоро здесь появится всё необходимое.
        </p>

        <div className="coming-soon-dots">
          <span /><span /><span />
        </div>

        <button className="btn btn-dark coming-soon-btn" onClick={onBack}>
          ← На главную
        </button>
      </div>
    </div>
  )
}
