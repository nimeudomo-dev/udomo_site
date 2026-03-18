'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import type { Property } from '@/data/properties'
import { RESIDENTIAL_GROUPS, COMMERCIAL_GROUPS, CATEGORY_GROUPS } from '@/components/PropertyFilter'

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global { interface Window { ymaps: any } }

const YMAPS_KEY = '4a43ac3b-bbe7-4e03-b6bb-568b1f3fce70'
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

function formatPriceShort(price: number): string {
  if (price >= 1_000_000) {
    const m = price / 1_000_000
    return `${m % 1 === 0 ? m : m.toFixed(1)}М`
  }
  if (price >= 1000) return `${Math.round(price / 1000)}К`
  return `${price}₽`
}

function formatPriceFull(price: number): string {
  if (price >= 1_000_000) {
    const m = price / 1_000_000
    return `${m % 1 === 0 ? m : m.toFixed(1)} млн ₽`
  }
  if (price >= 1000) return `${Math.round(price / 1000)} тыс ₽`
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

function loadYandexMaps(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (window.ymaps?.Map) { resolve(window.ymaps); return }
    if (document.querySelector('script[data-ymaps]')) {
      const poll = setInterval(() => {
        if (window.ymaps?.Map) { clearInterval(poll); resolve(window.ymaps) }
      }, 50)
      return
    }
    const script = document.createElement('script')
    script.setAttribute('data-ymaps', '1')
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YMAPS_KEY}&lang=ru_RU`
    script.onload = () => window.ymaps.ready(() => resolve(window.ymaps))
    script.onerror = reject
    document.head.appendChild(script)
  })
}

function MapPopup({ property, onClose }: { property: Property; onClose: () => void }) {
  return (
    <div className="map-react-popup">
      <button className="map-react-popup-close" onClick={onClose}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      {property.images?.[0] && (
        <img className="map-react-popup-img" src={property.images[0]} alt={property.address} />
      )}
      <div className="map-react-popup-body">
        <div className="map-popup-type">{property.type}</div>
        <div className="map-popup-price">{formatPriceFull(property.price)}</div>
        <div className="map-popup-addr">
          {property.address}{property.area ? ` · ${property.area} м²` : ''}
          {property.floor ? ` · ${property.floor}/${property.totalFloors} эт.` : ''}
        </div>
        <a className="map-popup-link" href={`/property/${property.id}`} target="_blank">
          Открыть объект →
        </a>
      </div>
    </div>
  )
}

export default function MapPage() {
  const mapElRef      = useRef<HTMLDivElement>(null)
  const mapRef        = useRef<any>(null)
  const collectionRef = useRef<any>(null)

  const [properties, setProperties] = useState<Property[]>([])
  const [mapReady, setMapReady]     = useState(false)
  const [filter, setFilter]         = useState<MapFilter>(defaultMapFilter)
  const [selected, setSelected]     = useState<Property | null>(null)

  useEffect(() => { setFilter(parseFilterFromUrl()) }, [])

  useEffect(() => {
    fetch('/api/properties')
      .then(r => r.json())
      .then((data: Property[]) =>
        setProperties(data.map(p => ({ ...p, type: normalizeType(p.type) })))
      )
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!mapElRef.current || mapRef.current) return
    loadYandexMaps().then(ymaps => {
      if (!mapElRef.current || mapRef.current) return
      const map = new ymaps.Map(mapElRef.current, {
        center: [54.7355, 55.9663],
        zoom: 11,
        controls: ['zoomControl'],
      })
      map.events.add('click', () => setSelected(null))
      mapRef.current = map
      setMapReady(true)
    }).catch(() => {})
    return () => {
      if (mapRef.current) { mapRef.current.destroy(); mapRef.current = null }
    }
  }, [])

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

  useEffect(() => {
    if (!mapReady || !mapRef.current || !window.ymaps) return
    const ymaps = window.ymaps
    if (collectionRef.current) mapRef.current.geoObjects.remove(collectionRef.current)

    const collection = new ymaps.GeoObjectCollection()
    filtered.forEach(p => {
      if (!p.lat || !p.lon) return
      const placemark = new ymaps.Placemark(
        [p.lat, p.lon],
        { iconContent: formatPriceShort(p.price) },
        { preset: 'islands#tealStretchyIcon' }
      )
      placemark.events.add('click', () => setSelected(p))
      collection.add(placemark)
    })
    mapRef.current.geoObjects.add(collection)
    collectionRef.current = collection
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

  const subGroups = filter.propClass === 'commercial' ? COMMERCIAL_GROUPS
    : filter.propClass === 'residential' ? RESIDENTIAL_GROUPS : null

  const showRooms = filter.propClass === 'apartments' ||
    (filter.propClass !== 'commercial' && ['Новостройки', 'Вторичная', 'Дома / Коттеджи', 'Апартаменты'].includes(filter.category))

  const withCoords = filtered.filter(p => p.lat && p.lon).length

  return (
    <div className="map-page">
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
              {(['residential', 'commercial', 'apartments'] as const).map(cls => (
                <button key={cls} className={`map-f-btn${filter.propClass === cls ? ' active' : ''}`}
                  onClick={() => setClass(cls)}>
                  {cls === 'residential' ? 'Жилая' : cls === 'commercial' ? 'Коммерческая' : 'Апартаменты'}
                </button>
              ))}
            </div>
          </div>

          <div className="map-f-section">
            <div className="map-f-btns">
              {(['buy', 'rent'] as const).map(d => (
                <button key={d} className={`map-f-btn${filter.deal === d ? ' active' : ''}`}
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
                  <button key={r} className={`map-f-btn map-f-room-btn${filter.rooms.includes(r) ? ' active' : ''}`}
                    onClick={() => toggleRoom(r)}>{r}</button>
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

      <div className="map-area-wrap">
        <div className="map-area" ref={mapElRef} />
        {selected && <MapPopup property={selected} onClose={() => setSelected(null)} />}
      </div>
    </div>
  )
}
