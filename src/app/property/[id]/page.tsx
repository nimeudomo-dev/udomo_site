'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PROPERTIES } from '@/data/properties'
import { formatPrice } from '@/components/PropertyCard'
import CallModal from '@/components/CallModal'

export default function PropertyPage() {
  const { id } = useParams()
  const router  = useRouter()
  const property = PROPERTIES.find(p => p.id === Number(id))

  const [activeImg, setActiveImg] = useState(0)
  const [liked, setLiked]         = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  if (!property) return (
    <div style={{ padding: '140px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Объект не найден</div>
      <button className="btn btn-primary" onClick={() => router.push('/')}>На главную</button>
    </div>
  )

  const prev = () => setActiveImg(i => (i - 1 + property.images.length) % property.images.length)
  const next = () => setActiveImg(i => (i + 1) % property.images.length)

  return (
    <>
      {/* Header */}
      <header className="pd-nav">
        <div className="wrap pd-nav-inner">
          <button className="pd-back" onClick={() => router.back()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Назад
          </button>
          <a href="/" className="pd-nav-logo">
            <img src="/logo.png" alt="Udomo" width={34} height={34} style={{ objectFit: 'contain' }} />
            <span>Udomo</span>
          </a>
          <a className="pd-nav-phone" href="tel:83472980899">8 347 298-08-99</a>
        </div>
      </header>

      <main className="pd-root">
        <div className="wrap">
          {/* Breadcrumb */}
          <nav className="pd-breadcrumb">
            <a href="/">Главная</a>
            <span>/</span>
            <a href="/" onClick={e => { e.preventDefault(); router.push('/') }}>Объекты</a>
            <span>/</span>
            <span>{property.type}, {property.address}</span>
          </nav>

          <div className="pd-layout">
            {/* ── LEFT ── */}
            <div className="pd-content">

              {/* Gallery */}
              <div className="pd-gallery">
                <div className="pd-gallery-main">
                  <img src={property.images[activeImg]} alt={property.address} />
                  {property.images.length > 1 && (
                    <>
                      <button className="pd-arr pd-arr-prev" onClick={prev}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button className="pd-arr pd-arr-next" onClick={next}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </>
                  )}
                  <div className="pd-gallery-counter">{activeImg + 1} / {property.images.length}</div>
                </div>

                {property.images.length > 1 && (
                  <div className="pd-thumbs">
                    {property.images.map((img, i) => (
                      <button key={i}
                        className={`pd-thumb${activeImg === i ? ' active' : ''}`}
                        onClick={() => setActiveImg(i)}>
                        <img src={img} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <section className="pd-section">
                <h2 className="pd-section-title">Описание</h2>
                <div className="pd-desc">
                  {property.description.split('\n').map((line, i) =>
                    line.trim() ? <p key={i}>{line}</p> : <div key={i} style={{ height: 8 }} />
                  )}
                </div>
              </section>

              {/* Characteristics */}
              <section className="pd-section">
                <h2 className="pd-section-title">Характеристики</h2>
                <div className="pd-chars">
                  {property.characteristics.map((c, i) => (
                    <div key={i} className="pd-char-row">
                      <span className="pd-char-label">{c.label}</span>
                      <span className="pd-char-dots" />
                      <span className="pd-char-value">{c.value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Map */}
              <section className="pd-section">
                <h2 className="pd-section-title">На карте</h2>
                <div className="pd-map-box">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <div className="pd-map-addr">{property.address}</div>
                  <div className="pd-map-dist">{property.district}</div>
                </div>
              </section>

            </div>

            {/* ── SIDEBAR ── */}
            <aside className="pd-sidebar">
              <div className="pd-sidebar-card">
                <div className="pd-obj-id">id {property.id}</div>

                <h1 className="pd-obj-title">
                  {property.type}{property.rooms ? `, ${property.rooms}-комн.` : ''} — {property.area} м²
                </h1>

                <div className="pd-price-wrap">
                  <div className="pd-price">{formatPrice(property.price, property.deal)}</div>
                  <div className="pd-price-m2">{property.pricePerM2.toLocaleString('ru')} ₽/м²</div>
                </div>

                <div className="pd-stats-grid">
                  <div className="pd-stat">
                    <span className="pd-stat-lbl">Площадь</span>
                    <span className="pd-stat-val">{property.area} м²</span>
                  </div>
                  {property.floor && (
                    <div className="pd-stat">
                      <span className="pd-stat-lbl">Этаж</span>
                      <span className="pd-stat-val">{property.floor} / {property.totalFloors}</span>
                    </div>
                  )}
                </div>

                <div className="pd-addr-line">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {property.address}, {property.district}
                </div>

                <div className="pd-cta-block">
                  <a href="tel:83472980899" className="btn btn-primary pd-call-link">
                    8 347 298-08-99
                  </a>
                  <button className="btn btn-outline" onClick={() => setModalOpen(true)}>
                    Заказать звонок
                  </button>
                </div>

                <div className="pd-bottom-row">
                  <button
                    className={`pd-fav-btn${liked ? ' liked' : ''}`}
                    onClick={() => setLiked(v => !v)}>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                      <path d="M9 15S2 10.5 2 6a3.5 3.5 0 0 1 5.95-2.48L9 4.8l1.05-1.28A3.5 3.5 0 0 1 16 6C16 10.5 9 15 9 15z"
                        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
                        fill={liked ? 'currentColor' : 'none'} />
                    </svg>
                    {liked ? 'В избранном' : 'В избранное'}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <CallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
