'use client'
import { createContext, useContext } from 'react'

interface ModalContextType {
  openModal: () => void
  openMortgageModal: () => void
}

export const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  openMortgageModal: () => {},
})

export const useModal = () => useContext(ModalContext)
