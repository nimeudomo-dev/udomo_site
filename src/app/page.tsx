'use client'
import { useState, useRef, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Mortgage from '@/components/Mortgage'
import Reviews from '@/components/Reviews'
import CtaForm from '@/components/CtaForm'
import Footer from '@/components/Footer'
import CallModal from '@/components/CallModal'
import About from '@/components/About'

type Page = 'home' | 'buy' | 'projects' | 'rent' | 'about' | 'contacts'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [modalOpen, setModalOpen] = useState(false)
  const ctaRef = useRef<HTMLDivElement>(null)

  const navigateTo = useCallback((page: string) => {
    setCurrentPage(page as Page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const scrollToCta = useCallback(() => {
    setCurrentPage('home')
    setTimeout(() => {
      const el = document.getElementById('ctaSection')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        const input = document.querySelector('.cta-fi') as HTMLInputElement
        if (input) input.focus()
      }, 600)
    }, 50)
  }, [])

  return (
    <>
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        favCount={0}
        onOpenModal={() => setModalOpen(true)}
      />

      {/* HOME */}
      <div style={{ display: currentPage === 'home' ? 'block' : 'none' }}>
        <Hero onScrollToCta={scrollToCta} />
        <Projects />
        <Mortgage onScrollToCta={scrollToCta} />
        <Reviews />
        <CtaForm ref={ctaRef} />
      </div>

      {/* ABOUT */}
      <div style={{ display: currentPage === 'about' ? 'block' : 'none' }}>
        <About onOpenModal={() => setModalOpen(true)} />
      </div>

      {/* PLACEHOLDER PAGES */}
      {(['buy', 'projects', 'rent', 'contacts'] as Page[]).map(page => (
        <div key={page} style={{ display: currentPage === page ? 'block' : 'none' }}>
          <div className="sec wrap" style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 80, paddingBottom: 80, textAlign: 'center' }}>
            <div className="sec-title" style={{ marginBottom: 16 }}>
              {{ buy: 'Купить', projects: 'Проекты', rent: 'Аренда', contacts: 'Контакты' }[page]}
            </div>
            <div className="sec-sub">Раздел в разработке</div>
            <button className="btn btn-primary" onClick={() => navigateTo('home')}
              style={{ marginTop: 32, height: 52, padding: '0 32px' }}>
              На главную →
            </button>
          </div>
        </div>
      ))}

      <Footer onNavigate={navigateTo} />

      <CallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
