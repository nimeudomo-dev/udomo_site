'use client'
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import PropertyCard from './PropertyCard'
import PropertyFilter, { defaultFilter, CATEGORY_GROUPS, RESIDENTIAL_GROUPS, COMMERCIAL_GROUPS, type FilterState } from './PropertyFilter'
import type { Property } from '@/data/properties'
import { useFavorites } from '@/hooks/useFavorites'

const PAGE_SIZE = 9

function normalizeType(type: string): string {
  return type === 'Вторичка' ? 'Вторичная' : type
}

function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null

  const pages: (number | '…')[] = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (page > 3) pages.push('…')
    for (let i = Math.max(2, page - 1); i <= Math.min(total - 1, page + 1); i++) pages.push(i)
    if (page < total - 2) pages.push('…')
    pages.push(total)
  }

  return (
    <div className="pl-pagination">
      <button className="pl-pg-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      {pages.map((p, i) =>
        p === '…'
          ? <span key={`e${i}`} className="pl-pg-dots">…</span>
          : <button key={p} className={`pl-pg-btn${page === p ? ' active' : ''}`} onClick={() => onChange(p as number)}>{p}</button>
      )}
      <button className="pl-pg-btn" disabled={page === total} onClick={() => onChange(page + 1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  )
}

export default function PropertyListPage() {
  const searchParams = useSearchParams()
  const { favIds, toggleFav: onToggleFav } = useFavorites()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(false)
  const [filter, setFilter]         = useState<FilterState>(defaultFilter)
  const [page, setPage]             = useState(1)

  // Применяем фильтр из URL-параметров
  useEffect(() => {
    const propClass = searchParams.get('class')
    if (propClass) {
      setFilter({ ...defaultFilter, propClass: propClass as FilterState['propClass'] })
      setPage(1)
    }
  }, [searchParams])

  useEffect(() => {
    fetch('/api/properties')
      .then(r => r.json())
      .then((data: Property[]) => setProperties(data.map(p => ({ ...p, type: normalizeType(p.type) }))))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const pMin = filter.priceMin ? parseFloat(filter.priceMin) : null
    const pMax = filter.priceMax ? parseFloat(filter.priceMax) : null
    const aMin = filter.areaMin  ? parseFloat(filter.areaMin)  : null
    const aMax = filter.areaMax  ? parseFloat(filter.areaMax)  : null
    const fMin = filter.floorMin ? parseInt(filter.floorMin)   : null
    const fMax = filter.floorMax ? parseInt(filter.floorMax)   : null

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

    return properties
      .filter(p => {
        if (filter.deal !== 'all' && p.deal !== filter.deal) return false
        if (allowedTypes !== null && !allowedTypes.includes(p.type)) return false
        if (pMin !== null && p.price < pMin) return false
        if (pMax !== null && p.price > pMax) return false
        if (aMin !== null && p.area < aMin)  return false
        if (aMax !== null && p.area > aMax)  return false
        if (fMin !== null && p.floor != null && p.floor < fMin) return false
        if (fMax !== null && p.floor != null && p.floor > fMax) return false
        if (filter.rooms.length > 0) {
          const matches = filter.rooms.some(r => {
            if (r === 'С') return !p.rooms || p.rooms === 0
            if (r === '4+') return (p.rooms ?? 0) >= 4
            return p.rooms === parseInt(r)
          })
          if (!matches) return false
        }
        return true
      })
      .sort((a, b) => {
        if (filter.sort === 'price-asc')  return a.price - b.price
        if (filter.sort === 'price-desc') return b.price - a.price
        if (filter.sort === 'area-desc')  return b.area - a.area
        return (b.id as number) - (a.id as number)
      })
  }, [properties, filter])

  // Сбрасываем на 1 страницу при смене фильтра
  useEffect(() => { setPage(1) }, [filter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handlePageChange = (p: number) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="pl-root">
      <div className="wrap">

        {/* Header */}
        <div className="pl-head">
          <div>
            <h1 className="pl-title">Недвижимость</h1>
            <p className="pl-sub">Квартиры, дома, коммерческая недвижимость</p>
          </div>
        </div>

        {/* Filter */}
        {!loading && !error && (
          <PropertyFilter
            filter={filter}
            onChange={setFilter}
            resultCount={filtered.length}
            onMapView={() => {
              const p = new URLSearchParams()
              if (filter.propClass) p.set('propClass', filter.propClass)
              if (filter.deal !== 'all') p.set('deal', filter.deal)
              if (filter.category) p.set('category', filter.category)
              if (filter.priceMin) p.set('priceMin', filter.priceMin)
              if (filter.priceMax) p.set('priceMax', filter.priceMax)
              if (filter.areaMin)  p.set('areaMin',  filter.areaMin)
              if (filter.areaMax)  p.set('areaMax',  filter.areaMax)
              if (filter.rooms.length) p.set('rooms', filter.rooms.join(','))
              window.open(`/map?${p.toString()}`, '_blank')
            }}
          />
        )}

        {/* Error */}
        {error && (
          <div className="pl-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>Не удалось загрузить объекты</div>
            <button className="btn btn-outline" onClick={() => {
              setError(false); setLoading(true)
              fetch('/api/properties').then(r => r.json()).then(setProperties).catch(() => setError(true)).finally(() => setLoading(false))
            }}>
              Попробовать снова
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="pl-grid">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="prop-card-skeleton">
                <div className="skel skel-img" />
                <div className="skel-body">
                  <div className="skel skel-line w70" />
                  <div className="skel skel-line w50" />
                  <div className="skel skel-line w90" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && paginated.length > 0 && (
          <>
            <div className="pl-grid">
              {paginated.map(p => (
                <PropertyCard key={p.id} property={p}
                  isFav={favIds.includes(p.id as number)}
                  onToggleFav={() => onToggleFav(p.id as number)} />
              ))}
            </div>
            <Pagination page={page} total={totalPages} onChange={handlePageChange} />
          </>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="pl-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <div>Объекты не найдены</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <button className="btn btn-dark" onClick={() => window.open('/?cta=1', '_blank')}>
                Заказать подборку
              </button>
              <button className="btn btn-outline" onClick={() => setFilter(defaultFilter)}>
                Сбросить фильтры
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
