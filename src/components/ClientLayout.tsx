'use client'
import { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CallModal from './CallModal'
import { useFavorites } from '@/hooks/useFavorites'
import { ModalContext } from '@/context/ModalContext'
import CookieBanner from './CookieBanner'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [mortgageModalOpen, setMortgageModalOpen] = useState(false)
  const { favIds } = useFavorites()

  return (
    <ModalContext.Provider value={{
      openModal: () => setModalOpen(true),
      openMortgageModal: () => setMortgageModalOpen(true),
    }}>
      <Navbar favCount={favIds.length} onOpenModal={() => setModalOpen(true)} />
      {children}
      <div className="ft-bridge" />
      <Footer />
      <CallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <CookieBanner />
      <CallModal
        isOpen={mortgageModalOpen}
        onClose={() => setMortgageModalOpen(false)}
        title="Подобрать ипотеку"
        subtitle="Оставьте номер — наш специалист свяжется и подберёт выгодные условия"
      />
    </ModalContext.Provider>
  )
}
