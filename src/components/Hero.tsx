'use client'
import { useState, useEffect, useCallback } from 'react'

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

export default function Hero({ onScrollToCta }: { onScrollToCta: () => void }) {
  const [cur, setCur] = useState(0)

  const goTo = useCallback((n: number) => {
    setCur((n + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => goTo(cur + 1), 6000)
    return () => clearInterval(timer)
  }, [cur, goTo])

  const slide = slides[cur]

  return (
    <div className="wrap" style={{ paddingTop: 16, paddingLeft: 40, paddingRight: 40 }}>
      <div className="hero">
        <div className="slide active">
          <div className="slide-photo">
            <img src={slide.img} alt={slide.alt} />
          </div>
          <div className="slide-overlay"></div>
          <div className="slide-stripes"></div>
          <div className="slide-content">
            <div className="slide-tag"><div className="tag-dot"></div>{slide.tag}</div>
            <h1 className="slide-title">
              {slide.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i < slide.title.split('\n').length - 1 && <br />}</span>
              ))}
            </h1>
            <p className="slide-sub">{slide.sub}</p>
            <div className="slide-actions">
              <a className="btn btn-white" href="#" onClick={e => { e.preventDefault(); onScrollToCta() }}>{slide.btn1}</a>
              <a className="btn btn-ghost" href="#" onClick={e => { e.preventDefault(); onScrollToCta() }}>{slide.btn2}</a>
            </div>
          </div>
        </div>

        <div className="hero-controls">
          <div className="hero-counter"><b>{cur + 1}</b>&nbsp;/&nbsp;{slides.length}</div>
          <div className="dots-row">
            {slides.map((_, i) => (
              <div key={i} className={`dot${i === cur ? ' active' : ''}`} onClick={() => goTo(i)} />
            ))}
          </div>
          <button className="arr" onClick={() => goTo(cur - 1)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="arr" onClick={() => goTo(cur + 1)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
