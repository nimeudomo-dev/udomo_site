'use client'

const MAIN_SOCIALS = [
  {
    name: 'Телеграм',
    handle: '@udomo_1',
    href: 'https://t.me/udomo_1',
    desc: 'Новости, объекты и общение',
    icon: <img src="/icons/telegram.png" width="28" height="28" alt="Telegram" style={{ objectFit: 'contain' }} />,
    cls: 'onl-tg',
  },
  {
    name: 'YouTube',
    handle: '@udomoufa',
    href: 'https://www.youtube.com/@udomoufa',
    desc: 'Видеообзоры объектов',
    icon: <img src="/icons/youtube.png" width="28" height="28" alt="YouTube" style={{ objectFit: 'contain' }} />,
    cls: 'onl-yt',
  },
  {
    name: 'Instagram',
    handle: 'udomo_ufa',
    href: 'https://www.instagram.com/udomo_ufa',
    desc: 'Фото и истории',
    icon: <img src="/icons/instagram.png" width="28" height="28" alt="Instagram" style={{ objectFit: 'contain' }} />,
    cls: 'onl-ig',
  },
]

const PANORAMA_SOCIALS = [
  {
    name: 'Телеграм',
    handle: '@panorama_27',
    href: 'https://t.me/panorama_27',
    desc: 'Новости и обновления проекта',
    icon: <img src="/icons/telegram.png" width="28" height="28" alt="Telegram" style={{ objectFit: 'contain' }} />,
    cls: 'onl-tg',
  },
]

function SocialCard({ s }: { s: typeof MAIN_SOCIALS[0] }) {
  return (
    <a href={s.href} target="_blank" rel="noopener" className={`onl-card ${s.cls}`}>
      <div className="onl-card-icon">{s.icon}</div>
      <div className="onl-card-body">
        <div className="onl-card-name">{s.name}</div>
        <div className="onl-card-handle">{s.handle}</div>
        <div className="onl-card-desc">{s.desc}</div>
      </div>
      <div className="onl-card-arrow">→</div>
    </a>
  )
}

export default function OnlinePage() {
  return (
    <div id="page-online">
      <div className="wrap" style={{ paddingTop: 96 }}>
        <div className="sec-tag">Компания</div>
        <div className="sec-title" style={{ marginBottom: 8 }}>Будь с нами</div>
        <div className="sec-sub">Подписывайтесь и следите за нашими новостями</div>
      </div>

      <div className="sec wrap" style={{ paddingTop: 32, paddingBottom: 20 }}>
        <div className="onl-section-title">Udomo — недвижимость</div>
        <div className="onl-grid">
          {MAIN_SOCIALS.map(s => <SocialCard key={s.name} s={s} />)}
        </div>
      </div>

      <div className="sec wrap" style={{ paddingTop: 16, paddingBottom: 60 }}>
        <div className="onl-section-title">Панорама — коттеджные посёлки</div>
        <div className="onl-grid">
          {PANORAMA_SOCIALS.map(s => <SocialCard key={s.name} s={s} />)}
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: 60 }}>
        <div className="onl-meta-note">
          Instagram принадлежит Meta Platforms Inc. — организация признана экстремистской, её деятельность запрещена на территории России.
        </div>
      </div>
    </div>
  )
}
