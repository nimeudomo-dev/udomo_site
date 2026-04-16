'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85&auto=format&fit=crop',
    alt: 'КП Панорама',
    tag: 'Собственный проект · UDOMO',
    title: 'КП Панорама 27',
    sub: 'Коттеджный посёлок в 20 минутах от Уфы. Природа, приватность и современная архитектура.',
    btn1: 'Смотреть посёлок',
    btn2: 'Узнать цены',
  },
  {
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85&auto=format&fit=crop',
    alt: 'Новостройки Уфа',
    tag: 'Новостройки Уфы',
    title: 'Квартиры\nв новых домах',
    sub: 'Подбираем квартиры в новостройках с ипотекой, рассрочкой и полным сопровождением сделки.',
    btn1: 'Смотреть квартиры',
    btn2: 'Получить подборку',
  },
  {
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=85&auto=format&fit=crop',
    alt: 'Управление',
    tag: 'Управляющая компания',
    title: 'Сдайте квартиру\nи получайте доход',
    sub: 'Доверительное управление и посуточная аренда. Берём на себя всё — от заселения до отчётности.',
    btn1: 'Передать в управление',
    btn2: 'Рассчитать доход',
  },
]

const DELAY = 6000

function scrollToCta() {
  const el = document.getElementById('ctaSection')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  setTimeout(() => {
    const input = document.querySelector('.cta-fi') as HTMLInputElement
    if (input) input.focus()
  }, 600)
}

export default function Hero() {
  const [cur, setCur] = useState(0)
  const [progress, setProgress] = useState(0)
  const startRef = useRef<number>(Date.now())
  const animRef = useRef<number | null>(null)
  const slideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback((n: number) => {
    setCur((n + slides.length) % slides.length)
  }, [])

  const resetProgress = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    if (slideTimerRef.current) clearTimeout(slideTimerRef.current)
    setProgress(0)
    startRef.current = Date.now()

    const tick = () => {
      if (document.hidden) {
        // Вкладка скрыта — сдвигаем стартовую точку, чтобы не было прыжка
        startRef.current = Date.now()
        animRef.current = requestAnimationFrame(tick)
        return
      }
      const elapsed = Date.now() - startRef.current
      const pct = Math.min((elapsed / DELAY) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        animRef.current = requestAnimationFrame(tick)
      }
    }
    animRef.current = requestAnimationFrame(tick)

    slideTimerRef.current = setTimeout(() => {
      setCur(c => (c + 1) % slides.length)
    }, DELAY)
  }, [])

  useEffect(() => {
    resetProgress()
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current)
    }
  }, [cur, resetProgress])

  useEffect(() => {
    const onVisible = () => { if (!document.hidden) resetProgress() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [resetProgress])

  return (
    <div className="wrap" style={{ paddingTop: 28, paddingBottom: 28 }}>
      <div className="hero">

        {slides.map((slide, i) => (
          <div key={i} className={`slide${i === cur ? ' active' : ''}`}>
            <div className="slide-photo">
              <img src={slide.img} alt={slide.alt} />
            </div>
            <div className="slide-overlay"></div>
            <div className="slide-stripes"></div>
            <div className="slide-content">
              <div className="slide-tag"><div className="tag-dot"></div>{slide.tag}</div>
              <h1 className="slide-title">
                {slide.title.split('\n').map((line, j) => (
                  <span key={j}>{line}{j < slide.title.split('\n').length - 1 && <br />}</span>
                ))}
              </h1>
              <p className="slide-sub">{slide.sub}</p>
              <div className="slide-actions">
                <a className="btn btn-white" href="#" onClick={e => { e.preventDefault(); scrollToCta() }}>{slide.btn1}</a>
                <a className="btn btn-ghost" href="#" onClick={e => { e.preventDefault(); scrollToCta() }}>{slide.btn2}</a>
              </div>
            </div>
          </div>
        ))}

        {/* Стрелки по бокам */}
        <button className="arr arr-left" onClick={() => goTo(cur - 1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8l4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="arr arr-right" onClick={() => goTo(cur + 1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Счётчик + точки — справа снизу */}
        <div className="hero-controls">
          <div className="hero-counter"><b>{cur + 1}</b>&nbsp;/&nbsp;{slides.length}</div>
          <div className="dots-row">
            {slides.map((_, i) => (
              <div key={i} className={`dot${i === cur ? ' active' : ''}`} onClick={() => goTo(i)} />
            ))}
          </div>
        </div>

        <div className="hero-progress">
          <div className="hero-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

      </div>
    </div>
  )
}
