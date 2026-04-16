'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Property } from '@/data/properties'
import PropertyCard from './PropertyCard'
import { useFavorites } from '@/hooks/useFavorites'

export default function FavoritesPage() {
  const router = useRouter()
  const { favIds, toggleFav: onToggleFav, clearAll: onClearAll } = useFavorites()
  const [allProperties, setAllProperties] = useState<Property[]>([])

  useEffect(() => {
    fetch('/api/properties')
      .then(r => r.json())
      .then(setAllProperties)
      .catch(() => {})
  }, [])

  const properties = allProperties.filter(p => favIds.includes(p.id as number))
  const count = properties.length

  return (
    <div className="fav-root">
      <div className="wrap">

        <div className="fav-head">
          <div>
            <h1 className="fav-title">Избранное</h1>
            <p className="fav-sub">
              {count > 0
                ? `${count} объект${count === 1 ? '' : count < 5 ? 'а' : 'ов'} сохранено`
                : count === 0 && favIds.length > 0
                  ? 'Загрузка...'
                  : ''}
            </p>
          </div>
          {count > 0 && (
            <button className="fav-clear-btn" onClick={onClearAll}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
              Очистить всё
            </button>
          )}
        </div>

        {favIds.length === 0 ? (
          <div className="fav-empty">
            <h2 className="fav-empty-title">Нет добавленных объектов</h2>
            <p className="fav-empty-text">
              Нажимайте на{' '}
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }}>
                <path d="M9 15S2 10.5 2 6a3.5 3.5 0 0 1 5.95-2.48L9 4.8l1.05-1.28A3.5 3.5 0 0 1 16 6C16 10.5 9 15 9 15z"
                  stroke="#8892b0" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>{' '}
              в карточках объектов, чтобы добавить их в избранное
            </p>
            <button className="btn btn-primary fav-cta" onClick={() => router.push('/buy')}>
              Смотреть объекты →
            </button>
          </div>
        ) : (
          <div className="pl-grid">
            {properties.map(p => (
              <PropertyCard
                key={p.id}
                property={p}
                isFav={true}
                onToggleFav={() => onToggleFav(p.id as number)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
