interface AboutProps {
  onOpenModal: () => void
}

export default function About({ onOpenModal }: AboutProps) {
  return (
    <div id="page-about">
      {/* Hero */}
      <div className="wrap" style={{ paddingTop: 48 }}>
        <div className="about-hero">
          <div className="about-hero-text">
            <div className="sec-tag">О компании</div>
            <div className="about-hero-title">Udomo — агентство<br/>недвижимости Уфы</div>
            <div className="about-hero-sub">Мы помогаем людям находить, покупать, продавать и сдавать недвижимость в Уфе с 2014 года. За это время провели более 1200 сделок и стали одним из самых узнаваемых агентств города.</div>
            <button className="btn btn-primary" onClick={onOpenModal}
              style={{ marginTop: 24, height: 52, padding: '0 32px', fontSize: 14 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.6-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                <polyline points="16 2 16 8 22 8"/><line x1="22" y1="2" x2="16" y2="8"/>
              </svg>
              Связаться с нами
            </button>
          </div>
          <div className="about-stats-grid">
            {[
              { num: '10+', lbl: 'лет на рынке' },
              { num: '1200+', lbl: 'сделок закрыто' },
              { num: '150+', lbl: 'объектов в управлении' },
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
      <div className="sec wrap" >
        <div className="sec-head" style={{ marginBottom: 40 }}>
          <div>
            <div className="sec-tag">Наша история</div>
            <div className="sec-title">Как мы росли</div>
          </div>
        </div>
        <div className="about-timeline">
          {[
            { year: '2014', title: 'Открытие агентства', text: 'Артём Волков основал Udomo с командой из трёх специалистов. Первый офис на ул. Ленина, первые сделки — вторичная недвижимость Уфы.' },
            { year: '2017', title: 'Запуск управляющей компании', text: 'Начали направление доверительного управления. В первый год под управлением — 30 объектов.' },
            { year: '2020', title: 'Собственные коттеджные посёлки', text: 'Запуск КП «Панорама 27» и «Панорама 14». Стали застройщиком и девелопером — от участка до ключей.' },
            { year: '2024', title: '1000+ сделок и цифровая платформа', text: 'Перешагнули отметку в 1000 закрытых сделок. Запустили онлайн-платформу с каталогом и калькулятором.' },
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
      <div className="sec wrap" >
        <div className="sec-head" style={{ marginBottom: 40 }}>
          <div>
            <div className="sec-tag">Принципы работы</div>
            <div className="sec-title">Наши ценности</div>
          </div>
        </div>
        <div className="about-values">
          {[
            { icon: '🤝', title: 'Честность', text: 'Говорим только правду о состоянии объекта, рынке и рисках. Никаких скрытых комиссий.' },
            { icon: '⚡', title: 'Скорость', text: 'Средний срок сделки — 14 дней. Покупатель для вашего объекта — в среднем за 11 дней.' },
            { icon: '🛡️', title: 'Безопасность', text: 'Полная юридическая проверка каждого объекта. Работаем только с чистыми сделками.' },
            { icon: '📱', title: 'Инновации', text: 'Цифровые инструменты, онлайн-просмотры и личный кабинет для отслеживания сделки.' },
          ].map((v, i) => (
            <div key={i} className="about-value-card">
              <div className="about-value-icon">{v.icon}</div>
              <div className="about-value-title">{v.title}</div>
              <div className="about-value-text">{v.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Команда */}
      <div className="sec wrap" style={{ paddingBottom: 80 }}>
        <div className="sec-head" style={{ marginBottom: 40 }}>
          <div>
            <div className="sec-tag">Люди</div>
            <div className="sec-title">Наша команда</div>
          </div>
        </div>
        <div className="about-team">
          {[
            { initials: 'АВ', bg: 'linear-gradient(135deg,#1bc8a0,#0fa880)', name: 'Артём Волков', role: 'Основатель и CEO', text: '10 лет в недвижимости Уфы. Личный рекорд — 3 сделки в один день.' },
            { initials: 'МС', bg: 'linear-gradient(135deg,#9b3fc8,#7b2fa8)', name: 'Марина Соколова', role: 'Руководитель отдела продаж', text: 'Эксперт по новостройкам. Знает все жилые комплексы Уфы наизусть.' },
            { initials: 'ДК', bg: 'linear-gradient(135deg,#3b82f6,#2563eb)', name: 'Денис Карпов', role: 'Юрист по недвижимости', text: 'Проверяет каждый объект и документ. 0 проблемных сделок за 6 лет.' },
            { initials: 'АБ', bg: 'linear-gradient(135deg,#f59e0b,#d97706)', name: 'Анна Белова', role: 'Управляющая компания', text: 'Управляет 150+ объектами. Заполняемость — 98%, простой — менее 3 дней.' },
          ].map((m, i) => (
            <div key={i} className="about-team-card">
              <div className="about-team-avatar" style={{ background: m.bg }}>{m.initials}</div>
              <div className="about-team-name">{m.name}</div>
              <div className="about-team-role">{m.role}</div>
              <div className="about-team-text">{m.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
