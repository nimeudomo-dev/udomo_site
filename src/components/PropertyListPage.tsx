'use client'
import { useState } from 'react'
import PropertyCard from './PropertyCard'
import { PROPERTIES } from '@/data/properties'

const DEALS = [
  { value: 'all',  label: 'Все' },
  { value: 'buy',  label: 'Купить' },
  { value: 'rent', label: 'Аренда' },
]

const TYPES = ['Все', 'Квартира', 'Дом', 'Коммерческая', 'Участок']

const SORTS = [
  { value: 'date',       label: 'По дате' },
  { value: 'price-asc',  label: 'Дешевле' },
  { value: 'price-desc', label: 'Дороже' },
  { value: 'area-desc',  label: 'Больше площадь' },
]

interface Props {
  favIds: number[]
  onToggleFav: (id: number) => void
}

export default function PropertyListPage({ favIds, onToggleFav }: Props) {
  const [deal, setDeal]   = useState('all')
  const [type, setType]   = useState('Все')
  const [sort, setSort]   = useState('date')

  const filtered = PROPERTIES
    .filter(p => {
      if (deal !== 'all' && p.deal !== deal) return false
      if (type !== 'Все' && p.type !== type) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'price-asc')  return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'area-desc')  return b.area - a.area
      return b.id - a.id
    })

  return (
    <div className="pl-root">
      <div className="wrap">
        {/* Header */}
        <div className="pl-head">
          <div>
            <h1 className="pl-title">Недвижимость</h1>
            <p className="pl-sub">Квартиры, дома, коммерческая недвижимость в Уфе</p>
          </div>
          <span className="pl-count">{filtered.length} объект{filtered.length === 1 ? '' : filtered.length < 5 ? 'а' : 'ов'}</span>
        </div>

        {/* Filters */}
        <div className="pl-filters">
          <div className="pl-filter-row">
            {DEALS.map(d => (
              <button key={d.value}
                className={`pl-chip${deal === d.value ? ' active' : ''}`}
                onClick={() => setDeal(d.value)}>
                {d.label}
              </button>
            ))}
            <div className="pl-filter-sep" />
            {TYPES.map(t => (
              <button key={t}
                className={`pl-chip${type === t ? ' active' : ''}`}
                onClick={() => setType(t)}>
                {t}
              </button>
            ))}
          </div>
          <div className="pl-sort-row">
            <span className="pl-sort-label">Сортировка:</span>
            {SORTS.map(s => (
              <button key={s.value}
                className={`pl-sort-btn${sort === s.value ? ' active' : ''}`}
                onClick={() => setSort(s.value)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="pl-grid">
            {filtered.map(p => (
              <PropertyCard key={p.id} property={p}
                isFav={favIds.includes(p.id)}
                onToggleFav={() => onToggleFav(p.id)} />
            ))}
          </div>
        ) : (
          <div className="pl-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <div>Объекты не найдены</div>
            <button className="btn btn-outline" onClick={() => { setDeal('all'); setType('Все') }}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
