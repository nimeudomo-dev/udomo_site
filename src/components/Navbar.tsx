'use client'
import { useState } from 'react'

interface NavbarProps {
  currentPage: string
  onNavigate: (page: string) => void
  favCount: number
  onOpenModal: () => void
}

export default function Navbar({ currentPage, onNavigate, favCount, onOpenModal }: NavbarProps) {
  const [buyOpen, setBuyOpen] = useState(false)
  const [projOpen, setProjOpen] = useState(false)
  const [lang, setLang] = useState<'ru' | 'en'>('ru')

  const ChevronIcon = () => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 3, verticalAlign: 'middle' }}>
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="logo" href="#" onClick={e => { e.preventDefault(); onNavigate('home') }}>
          <img src="/logo.png" alt="Udomo" width={52} height={52} style={{ objectFit: 'contain' }} />
          <span className="logo-name">Udomo</span>
        </a>

        <div className="nav-links">
          <a href="#" className={`nav-link${currentPage === 'home' ? ' active' : ''}`}
            onClick={e => { e.preventDefault(); onNavigate('home') }}>Главная</a>

          <div className="nav-dropdown"
            onMouseEnter={() => setBuyOpen(true)}
            onMouseLeave={() => setBuyOpen(false)}>
            <a href="#" className="nav-drop-trigger" onClick={e => e.preventDefault()}>
              Купить <ChevronIcon />
            </a>
            <div className={`nav-drop-menu nav-drop-menu--center${buyOpen ? ' show' : ''}`}>
              <div className="nav-drop-menu-inner">
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Новостройки</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Вторичка</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Дома / Коттеджи</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Коммерческая</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Земельные участки</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Гаражи / Кладовые</a>
              </div>
            </div>
          </div>

          <a href="#" className={`nav-link${currentPage === 'rent' ? ' active' : ''}`}
            onClick={e => { e.preventDefault(); onNavigate('rent') }}>Аренда</a>

          <div className="nav-dropdown"
            onMouseEnter={() => setProjOpen(true)}
            onMouseLeave={() => setProjOpen(false)}>
            <a href="#" className="nav-drop-trigger" onClick={e => e.preventDefault()}>
              Проекты <ChevronIcon />
            </a>
            <div className={`nav-drop-menu nav-drop-menu--center${projOpen ? ' show' : ''}`}>
              <div className="nav-drop-menu-inner">
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('projects') }}>КА Идея</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('projects') }}>КП Панорама 27</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('projects') }}>КП Панорама 14</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Вторичка</a>
                <a href="#" onClick={e => { e.preventDefault(); onNavigate('rent') }}>Аренда</a>
              </div>
            </div>
          </div>

          <a href="#" className={`nav-link${currentPage === 'contacts' ? ' active' : ''}`}
            onClick={e => { e.preventDefault(); onNavigate('contacts') }}>Контакты</a>

          <a href="#" className={`nav-link${currentPage === 'about' ? ' active' : ''}`}
            onClick={e => { e.preventDefault(); onNavigate('about') }}>О компании</a>
        </div>

        <div className="nav-right">
          <button className={`fav-btn${favCount > 0 ? ' has-items' : ''}${currentPage === 'favorites' ? ' active' : ''}`} title="Избранные объекты" onClick={() => onNavigate('favorites')}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 15S2 10.5 2 6a3.5 3.5 0 0 1 5.95-2.48L9 4.8l1.05-1.28A3.5 3.5 0 0 1 16 6C16 10.5 9 15 9 15z"
                stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            <span className={`fav-counter${favCount > 0 ? ' visible' : ''}`}>{favCount}</span>
          </button>
          <div className="lang-switch">
            <button className={`lang-btn${lang === 'ru' ? ' active' : ''}`} onClick={() => setLang('ru')}>RU</button>
            <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>
          <a className="nav-phone" href="tel:83472980899">8 347 298-08-99</a>
          <button className="btn btn-outline" onClick={onOpenModal}>Заказать звонок</button>
        </div>
      </div>
    </nav>
  )
}
