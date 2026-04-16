'use client'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_accepted')) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_accepted', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner">
      <span>
        Используем <a href="/docs/cookie.pdf" target="_blank" rel="noopener noreferrer" className="cookie-link">куки</a>, это делает удобнее вашу работу с сайтом
      </span>
      <button className="cookie-btn" onClick={accept}>Хорошо</button>
    </div>
  )
}
