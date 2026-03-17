'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import type { Property } from '@/data/properties'
import { formatPrice } from '@/components/PropertyCard'
import CallModal from '@/components/CallModal'
import Navbar from '@/components/Navbar'
import { useFavorites } from '@/hooks/useFavorites'

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global { interface Window { L: any } }

function loadLeaflet(): Promise<void> {
  return new Promise(resolve => {
    if (typeof window !== 'undefined' && window.L) { resolve(); return }
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}

function PropertyMap({ lat, lon, address }: { lat: number; lon: number; address: string }) {
  const mapElRef = useRef<HTMLDivElement>(null)
  const mapRef   = useRef<any>(null)

  useEffect(() => {
    if (!mapElRef.current || mapRef.current) return
    loadLeaflet().then(() => {
      if (!mapElRef.current || mapRef.current) return
      const L = window.L
      const map = L.map(mapElRef.current, { zoomControl: true, scrollWheelZoom: false })
        .setView([lat, lon], 15)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)
      const icon = L.divIcon({
        className: '',
        html: `<div class="pd-map-marker"></div>`,
        iconAnchor: [12, 12],
      })
      L.marker([lat, lon], { icon }).addTo(map).bindPopup(address).openPopup()
      mapRef.current = map
    })
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [lat, lon, address])

  return <div ref={mapElRef} className="pd-map-leaflet" />
}

export default function PropertyPage() {
  const { id }   = useParams()
  const router   = useRouter()

  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const { favIds, isFav, toggleFav } = useFavorites()

  useEffect(() => {
    fetch('/api/properties')
      .then(r => r.json())
      .then((data: Property[]) => {
        const found = data.find(p => String(p.id) === String(id))
        if (found) setProperty(found)
        else setNotFound(true)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  const prev = () => setActiveImg(i => (i - 1 + (property?.images.length ?? 1)) % (property?.images.length ?? 1))
  const next = () => setActiveImg(i => (i + 1) % (property?.images.length ?? 1))

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="pd-loading-spinner" />
    </div>
  )

  if (notFound || !property) return (
    <div style={{ padding: '140px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Объект не найден</div>
      <button className="btn btn-primary" onClick={() => router.push('/')}>На главную</button>
    </div>
  )

  const favActive = isFav(property.id as number)

  return (
    <>
      <Navbar
        currentPage="buy"
        onNavigate={(page) => router.push(page === 'home' ? '/' : `/?p=${page}`)}
        favCount={favIds.length}
        onOpenModal={() => setModalOpen(true)}
      />

      <main className="pd-root">
        <div className="wrap">
          {/* Breadcrumb */}
          <nav className="pd-breadcrumb">
            <a href="/">Главная</a>
            <span>/</span>
            <a href="/?p=buy">Объекты</a>
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

              {/* Characteristics */}
              {property.characteristics.length > 0 && (
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
              )}

              {/* Description */}
              {property.description && (
                <section className="pd-section">
                  <h2 className="pd-section-title">Описание</h2>
                  <div className="pd-desc">
                    {property.description.split('\n').map((line, i) =>
                      line.trim() ? <p key={i}>{line}</p> : <div key={i} style={{ height: 6 }} />
                    )}
                  </div>
                </section>
              )}

              {/* Address */}
              <section className="pd-section">
                <h2 className="pd-section-title">Адрес</h2>
                <div className="pd-map-addr-line">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {property.address}{property.district ? `, ${property.district}` : ''}
                </div>
                {property.lat && property.lon
                  ? <PropertyMap lat={property.lat} lon={property.lon} address={property.address} />
                  : <div className="pd-map-nocoords">Координаты объекта не указаны</div>
                }
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
                  {property.pricePerM2 > 0 && (
                    <div className="pd-price-m2">{property.pricePerM2.toLocaleString('ru')} ₽/м²</div>
                  )}
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
                  {property.address}{property.district ? `, ${property.district}` : ''}
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
                    className={`pd-fav-btn${favActive ? ' liked' : ''}`}
                    onClick={() => toggleFav(property.id as number)}>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                      <path d="M9 15S2 10.5 2 6a3.5 3.5 0 0 1 5.95-2.48L9 4.8l1.05-1.28A3.5 3.5 0 0 1 16 6C16 10.5 9 15 9 15z"
                        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
                        fill={favActive ? 'currentColor' : 'none'} />
                    </svg>
                    {favActive ? 'В избранном' : 'В избранное'}
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
