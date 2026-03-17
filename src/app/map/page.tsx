'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import type { Property } from '@/data/properties'
import { RESIDENTIAL_GROUPS, COMMERCIAL_GROUPS, CATEGORY_GROUPS } from '@/components/PropertyFilter'

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global { interface Window { L: any } }

const ROOMS_LIST = ['С', '1', '2', '3', '4+']

interface MapFilter {
  propClass: '' | 'residential' | 'commercial' | 'apartments'
  category:  string
  deal:      'all' | 'buy' | 'rent'
  priceMin:  string
  priceMax:  string
  areaMin:   string
  areaMax:   string
  rooms:     string[]
}

const defaultMapFilter: MapFilter = {
  propClass: '', category: '', deal: 'all',
  priceMin: '', priceMax: '', areaMin: '', areaMax: '', rooms: [],
}

function normalizeType(t: string) { return t === 'Вторичка' ? 'Вторичная' : t }

function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    const m = price / 1_000_000
    return `${m % 1 === 0 ? m : m.toFixed(1)} млн`
  }
  if (price >= 1000) return `${Math.round(price / 1000)} тыс`
  return `${price} ₽`
}

function parseFilterFromUrl(): MapFilter {
  if (typeof window === 'undefined') return defaultMapFilter
  const p = new URLSearchParams(window.location.search)
  return {
    propClass: (p.get('propClass') as MapFilter['propClass']) || '',
    category:  p.get('category')  || '',
    deal:      (p.get('deal') as MapFilter['deal']) || 'all',
    priceMin:  p.get('priceMin')  || '',
    priceMax:  p.get('priceMax')  || '',
    areaMin:   p.get('areaMin')   || '',
    areaMax:   p.get('areaMax')   || '',
    rooms:     p.get('rooms') ? p.get('rooms')!.split(',') : [],
  }
}

function loadLeaflet(): Promise<void> {
  return new Promise(resolve => {
    if (window.L) { resolve(); return }

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

export default function MapPage() {
  const mapElRef   = useRef<HTMLDivElement>(null)
  const mapRef     = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [mapReady, setMapReady]     = useState(false)
  const [filter, setFilter]         = useState<MapFilter>(defaultMapFilter)

  useEffect(() => { setFilter(parseFilterFromUrl()) }, [])

  // Fetch properties
  useEffect(() => {
    fetch('/api/properties')
      .then(r => r.json())
      .then((data: Property[]) =>
        setProperties(data.map(p => ({ ...p, type: normalizeType(p.type) })))
      )
      .catch(() => {})
  }, [])

  // Init Leaflet map
  useEffect(() => {
    if (!mapElRef.current || mapRef.current) return
    loadLeaflet().then(() => {
      if (!mapElRef.current || mapRef.current) return
      const L = window.L
      const map = L.map(mapElRef.current, { zoomControl: true }).setView([54.7355, 55.9663], 11)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)
      mapRef.current = map
      setMapReady(true)
    })
    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null }
    }
  }, [])

  // Filter properties
  const filtered = useMemo(() => {
    const allResTypes = RESIDENTIAL_GROUPS.flatMap(g => g.values)
    const allComTypes = COMMERCIAL_GROUPS.flatMap(g => g.values)
    let allowedTypes: string[] | null = null
    if (filter.category) {
      allowedTypes = CATEGORY_GROUPS.find(g => g.label === filter.category)?.values ?? []
    } else if (filter.propClass === 'residential') {
      allowedTypes = allResTypes
    } else if (filter.propClass === 'commercial') {
      allowedTypes = allComTypes
    } else if (filter.propClass === 'apartments') {
      allowedTypes = ['Апартаменты']
    }
    const pMin = filter.priceMin ? parseFloat(filter.priceMin) : null
    const pMax = filter.priceMax ? parseFloat(filter.priceMax) : null
    const aMin = filter.areaMin  ? parseFloat(filter.areaMin)  : null
    const aMax = filter.areaMax  ? parseFloat(filter.areaMax)  : null

    return properties.filter(p => {
      if (filter.deal !== 'all' && p.deal !== filter.deal) return false
      if (allowedTypes && !allowedTypes.includes(p.type)) return false
      if (pMin !== null && p.price < pMin) return false
      if (pMax !== null && p.price > pMax) return false
      if (aMin !== null && p.area < aMin) return false
      if (aMax !== null && p.area > aMax) return false
      if (filter.rooms.length > 0) {
        const ok = filter.rooms.some(r => {
          if (r === 'С') return !p.rooms || p.rooms === 0
          if (r === '4+') return (p.rooms ?? 0) >= 4
          return p.rooms === parseInt(r)
        })
        if (!ok) return false
      }
      return true
    })
  }, [properties, filter])

  // Update markers
  useEffect(() => {
    if (!mapReady || !mapRef.current) return
    const L = window.L

    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    filtered.forEach(p => {
      if (!p.lat || !p.lon) return
      const icon = L.divIcon({
        className: '',
        html: `<div class="map-price-pin">${formatPrice(p.price)}</div>`,
        iconAnchor: [32, 14],
      })
      const marker = L.marker([p.lat, p.lon], { icon })
        .addTo(mapRef.current)
        .bindPopup(`
          <div class="map-popup">
            <div class="map-popup-type">${p.type}</div>
            <div class="map-popup-price">${formatPrice(p.price)}</div>
            <div class="map-popup-addr">${p.address}${p.area ? ` · ${p.area} м²` : ''}</div>
            <a class="map-popup-link" href="/property/${p.id}" target="_blank">Открыть →</a>
          </div>
        `)
      markersRef.current.push(marker)
    })
  }, [filtered, mapReady])

  const set = (patch: Partial<MapFilter>) => setFilter(f => ({ ...f, ...patch }))
  const setClass = (cls: '' | 'residential' | 'commercial' | 'apartments') =>
    set({ propClass: filter.propClass === cls ? '' : cls, category: '' })
  const selectCategory = (label: string) =>
    set({ category: filter.category === label ? '' : label })
  const toggleRoom = (r: string) =>
    set({ rooms: filter.rooms.includes(r) ? filter.rooms.filter(x => x !== r) : [...filter.rooms, r] })
  const toggleDeal = (d: 'buy' | 'rent') =>
    set({ deal: filter.deal === d ? 'all' : d })

  const subGroups = filter.propClass === 'commercial'
    ? COMMERCIAL_GROUPS
    : filter.propClass === 'residential'
      ? RESIDENTIAL_GROUPS
      : null

  const showRooms = filter.propClass === 'apartments' ||
    (filter.propClass !== 'commercial' && ['Новостройки', 'Вторичная', 'Дома / Коттеджи', 'Апартаменты'].includes(filter.category))

  const withCoords = filtered.filter(p => p.lat && p.lon).length

  return (
    <div className="map-page">

      {/* Sidebar */}
      <aside className="map-sidebar">
        <div className="map-sb-head">
          <a href="/?p=buy" className="map-back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            К списку
          </a>
        </div>

        <div className="map-sb-body">
          <div className="map-f-section">
            <div className="map-f-btns">
              <button className={`map-f-btn${filter.propClass === 'residential' ? ' active' : ''}`}
                onClick={() => setClass('residential')}>Жилая</button>
              <button className={`map-f-btn${filter.propClass === 'commercial' ? ' active' : ''}`}
                onClick={() => setClass('commercial')}>Коммерческая</button>
              <button className={`map-f-btn${filter.propClass === 'apartments' ? ' active' : ''}`}
                onClick={() => setClass('apartments')}>Апартаменты</button>
            </div>
          </div>

          <div className="map-f-section">
            <div className="map-f-btns">
              {(['buy', 'rent'] as const).map(d => (
                <button key={d}
                  className={`map-f-btn${filter.deal === d ? ' active' : ''}`}
                  onClick={() => toggleDeal(d)}>
                  {d === 'buy' ? 'Купить' : 'Аренда'}
                </button>
              ))}
            </div>
          </div>

          {subGroups && (
            <div className="map-f-section">
              <div className="map-f-label">Категория</div>
              <div className="map-f-cats">
                {subGroups.map(g => (
                  <button key={g.label}
                    className={`map-f-btn${filter.category === g.label ? ' active' : ''}`}
                    onClick={() => selectCategory(g.label)}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showRooms && (
            <div className="map-f-section">
              <div className="map-f-label">Комнатность</div>
              <div className="map-f-rooms">
                {ROOMS_LIST.map(r => (
                  <button key={r}
                    className={`map-f-btn map-f-room-btn${filter.rooms.includes(r) ? ' active' : ''}`}
                    onClick={() => toggleRoom(r)}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="map-f-section">
            <div className="map-f-label">Площадь, м²</div>
            <div className="map-f-range">
              <input className="map-f-input" type="number" placeholder="от"
                value={filter.areaMin} onChange={e => set({ areaMin: e.target.value })} />
              <span className="map-f-dash">—</span>
              <input className="map-f-input" type="number" placeholder="до"
                value={filter.areaMax} onChange={e => set({ areaMax: e.target.value })} />
            </div>
          </div>

          <div className="map-f-section">
            <div className="map-f-label">Стоимость, ₽</div>
            <div className="map-f-range">
              <input className="map-f-input" type="number" placeholder="от"
                value={filter.priceMin} onChange={e => set({ priceMin: e.target.value })} />
              <span className="map-f-dash">—</span>
              <input className="map-f-input" type="number" placeholder="до"
                value={filter.priceMax} onChange={e => set({ priceMax: e.target.value })} />
            </div>
          </div>
        </div>

        <div className="map-sb-foot">
          <button className="map-show-btn">
            {withCoords} на карте
            {filtered.length !== withCoords && (
              <span className="map-show-total"> ({filtered.length} всего)</span>
            )}
          </button>
          <button className="map-reset-btn" onClick={() => setFilter(defaultMapFilter)}>
            Сбросить
          </button>
        </div>
      </aside>

      <div className="map-area" ref={mapElRef} />
    </div>
  )
}
