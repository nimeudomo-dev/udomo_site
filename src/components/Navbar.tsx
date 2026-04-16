'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export interface NavFilterPreset {
  propClass?: 'residential' | 'commercial' | 'apartments' | ''
  category?:  string
}

interface NavbarProps {
  favCount: number
  onOpenModal: () => void
}

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 3, flexShrink: 0 }}>
    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const BUY_ITEMS: { label: string; filter: NavFilterPreset }[] = [
  { label: 'Жилая',         filter: { propClass: 'residential', category: '' } },
  { label: 'Коммерческая',  filter: { propClass: 'commercial',  category: '' } },
  { label: 'Апартаменты',   filter: { propClass: 'apartments',  category: '' } },
]

export default function Navbar({ favCount, onOpenModal }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [svcOpen, setSvcOpen]   = useState(false)
  const [projOpen, setProjOpen] = useState(false)
  const [compOpen, setCompOpen] = useState(false)

  const nav = (path: string) => router.push(path)
  const closeSvc  = () => setSvcOpen(false)
  const closeComp = () => setCompOpen(false)

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="logo" href="/" onClick={e => { e.preventDefault(); nav('/') }}>
          <img src="/logo.png" alt="Udomo" width={40} height={40} style={{ objectFit: 'contain', transform: 'translateY(-6px)' }} />
          <span className="logo-name">Udomo</span>
        </a>

        <div className="nav-links">
          {/* ─── УСЛУГИ ─── */}
          <div className="nav-dropdown" onMouseLeave={closeSvc}>
            <a href="#" className="nav-drop-trigger"
              onMouseEnter={() => setSvcOpen(true)}
              onClick={e => e.preventDefault()}>
              Услуги <ChevronDown />
            </a>
            <div className={`nav-drop-menu${svcOpen ? ' show' : ''}`}>
              <div className="nav-drop-menu-inner">
                <div className="nav-drop-section">
                  <a href="/buy" className="nav-drop-section-title"
                    onClick={e => { e.preventDefault(); nav('/buy'); closeSvc() }}>
                    Купить
                  </a>
                  <div className="nav-drop-section-body">
                    {BUY_ITEMS.map(it => (
                      <a key={it.label} href="/buy" className="nav-drop-sub-item"
                        onClick={e => {
                          e.preventDefault()
                          const params = new URLSearchParams()
                          if (it.filter.propClass) params.set('class', it.filter.propClass)
                          nav('/buy?' + params.toString())
                          closeSvc()
                        }}>
                        {it.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="nav-drop-divider" />
                <a href="/sell"     onClick={e => { e.preventDefault(); nav('/sell');     closeSvc() }}>Продать</a>
                <a href="/escrow"   onClick={e => { e.preventDefault(); nav('/escrow');   closeSvc() }}>Сопровождение сделки</a>
                <a href="/mortgage" onClick={e => { e.preventDefault(); nav('/mortgage'); closeSvc() }}>Одобрение ипотеки</a>
              </div>
            </div>
          </div>

          {/* ─── ПРОЕКТЫ ─── */}
          <div className="nav-dropdown"
            onMouseEnter={() => setProjOpen(true)}
            onMouseLeave={() => setProjOpen(false)}>
            <a href="#" className="nav-drop-trigger" onClick={e => e.preventDefault()}>
              Проекты <ChevronDown />
            </a>
            <div className={`nav-drop-menu${projOpen ? ' show' : ''}`}>
              <div className="nav-drop-menu-inner">
                <a href="/projects" onClick={e => { e.preventDefault(); nav('/projects'); setProjOpen(false) }}>КА Идея</a>
                <a href="/projects" onClick={e => { e.preventDefault(); nav('/projects'); setProjOpen(false) }}>КП Панорама 27</a>
                <a href="/projects" onClick={e => { e.preventDefault(); nav('/projects'); setProjOpen(false) }}>КП Панорама 14</a>
                <div className="nav-drop-divider" />
                <a href="/rent"    onClick={e => { e.preventDefault(); nav('/rent');    setProjOpen(false) }}>Аренда</a>
              </div>
            </div>
          </div>

          {/* ─── КОМПАНИЯ ─── */}
          <div className="nav-dropdown"
            onMouseEnter={() => setCompOpen(true)}
            onMouseLeave={closeComp}>
            <a href="#" className="nav-drop-trigger" onClick={e => e.preventDefault()}>
              Компания <ChevronDown />
            </a>
            <div className={`nav-drop-menu${compOpen ? ' show' : ''}`}>
              <div className="nav-drop-menu-inner">
                <a href="/about"   onClick={e => { e.preventDefault(); nav('/about');   closeComp() }}>О компании</a>
                <a href="/blog"    onClick={e => { e.preventDefault(); nav('/blog');    closeComp() }}>Блог</a>
                <a href="/careers" onClick={e => { e.preventDefault(); nav('/careers'); closeComp() }}>Вакансии</a>
                <div className="nav-drop-divider" />
                <a href="/online" className="nav-drop-icon-link" onClick={e => { e.preventDefault(); nav('/online'); closeComp() }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  Будь с нами
                </a>
                <a href="#" className="nav-drop-icon-link nav-drop-contact" onClick={e => { e.preventDefault(); closeComp(); onOpenModal() }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Связаться
                </a>
              </div>
            </div>
          </div>

          <a href="/contacts" className={`nav-link${pathname === '/contacts' ? ' active' : ''}`}
            onClick={e => { e.preventDefault(); nav('/contacts') }}>Контакты</a>
        </div>

        <div className="nav-right">
          <button className={`fav-btn${favCount > 0 ? ' has-items' : ''}${pathname === '/favorites' ? ' active' : ''}`}
            title="Избранные объекты" onClick={() => nav('/favorites')}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 15S2 10.5 2 6a3.5 3.5 0 0 1 5.95-2.48L9 4.8l1.05-1.28A3.5 3.5 0 0 1 16 6C16 10.5 9 15 9 15z"
                stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            <span className={`fav-counter${favCount > 0 ? ' visible' : ''}`}>{favCount}</span>
          </button>
          <a className="nav-phone" href="tel:83472980899">8 347 298-08-99</a>
          <button className="btn btn-outline" onClick={onOpenModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Получить консультацию
          </button>
        </div>
      </div>
    </nav>
  )
}
