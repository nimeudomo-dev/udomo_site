'use client'
import { useState } from 'react'

export interface NavFilterPreset {
  propClass?: 'residential' | 'commercial' | 'apartments' | ''
  category?:  string
}

interface NavbarProps {
  currentPage: string
  onNavigate: (page: string, filterPreset?: NavFilterPreset) => void
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

export default function Navbar({ currentPage, onNavigate, favCount, onOpenModal }: NavbarProps) {
  const [svcOpen, setSvcOpen]         = useState(false)
  const [projOpen, setProjOpen]       = useState(false)
  const [compOpen, setCompOpen]       = useState(false)

  const closeSvc  = () => setSvcOpen(false)
  const closeComp = () => setCompOpen(false)

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="logo" href="#" onClick={e => { e.preventDefault(); onNavigate('home') }}>
          <img src="/logo.png" alt="Udomo" width={40} height={40} style={{ objectFit: 'contain' }} />
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

                {/* Купить — заголовок + всегда видимые подпункты */}
                <div className="nav-drop-section">
                  <a href="#" className="nav-drop-section-title"
                    onClick={e => { e.preventDefault(); onNavigate('buy', {}); closeSvc() }}>
                    Купить
                  </a>
                  <div className="nav-drop-section-body">
                    {BUY_ITEMS.map(it => (
                      <a key={it.label} href="#" className="nav-drop-sub-item"
                        onClick={e => { e.preventDefault(); onNavigate('buy', it.filter); closeSvc() }}>
                        {it.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="nav-drop-divider" />
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('sell'); closeSvc() }}>Продать</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('escrow'); closeSvc() }}>Сопровождение сделки</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('mortgage'); closeSvc() }}>Одобрение ипотеки</a>
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
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('projects') }}>КА Идея</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('projects') }}>КП Панорама 27</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('projects') }}>КП Панорама 14</a>
                <div className="nav-drop-divider" />
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('rent'); setProjOpen(false) }}>Аренда</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('tourism'); setProjOpen(false) }}>Туризм</a>
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
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('about'); closeComp() }}>О компании</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('blog'); closeComp() }}>Блог</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('careers'); closeComp() }}>Вакансии</a>
                <div className="nav-drop-divider" />
                <a href="#" onClick={e => e.preventDefault()}>Мы в интернете</a>
                <a href="#" onClick={e => { e.preventDefault(); closeComp(); onOpenModal() }}>Связаться</a>
              </div>
            </div>
          </div>

          <a href="#" className={`nav-link${currentPage === 'contacts' ? ' active' : ''}`}
            onClick={e => { e.preventDefault(); onNavigate('contacts') }}>Контакты</a>
        </div>

        <div className="nav-right">
          <button className={`fav-btn${favCount > 0 ? ' has-items' : ''}${currentPage === 'favorites' ? ' active' : ''}`}
            title="Избранные объекты" onClick={() => onNavigate('favorites')}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 15S2 10.5 2 6a3.5 3.5 0 0 1 5.95-2.48L9 4.8l1.05-1.28A3.5 3.5 0 0 1 16 6C16 10.5 9 15 9 15z"
                stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            <span className={`fav-counter${favCount > 0 ? ' visible' : ''}`}>{favCount}</span>
          </button>
<a className="nav-phone" href="tel:83472980899">8 347 298-08-99</a>
          <button className="btn btn-outline" onClick={onOpenModal}>Заказать звонок</button>
        </div>
      </div>
    </nav>
  )
}
