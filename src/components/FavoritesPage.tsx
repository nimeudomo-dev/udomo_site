'use client'
import { PROPERTIES } from '@/data/properties'
import PropertyCard from './PropertyCard'

interface Props {
  favIds: number[]
  onToggleFav: (id: number) => void
  onClearAll: () => void
  onNavigate: (page: string) => void
}

export default function FavoritesPage({ favIds, onToggleFav, onClearAll, onNavigate }: Props) {
  const properties = PROPERTIES.filter(p => favIds.includes(p.id))
  const count = properties.length

  return (
    <div className="fav-root">
      <div className="wrap">

        {/* Header */}
        <div className="fav-head">
          <div>
            <h1 className="fav-title">
              Избранное
              {count > 0 && <span className="fav-title-count">{count}</span>}
            </h1>
            <p className="fav-sub">
              {count === 0
                ? 'Сохраняйте понравившиеся объекты, чтобы вернуться к ним позже'
                : `${count} объект${count === 1 ? '' : count < 5 ? 'а' : 'ов'} сохранено`}
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

        {count === 0 ? (
          /* Empty state */
          <div className="fav-empty">
            <div className="fav-empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  stroke="url(#fav-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <defs>
                  <linearGradient id="fav-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1bc8a0" />
                    <stop offset="100%" stopColor="#9b3fc8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h2 className="fav-empty-title">Пока здесь пусто</h2>
            <p className="fav-empty-text">
              Нажимайте на <svg width="14" height="14" viewBox="0 0 18 18" fill="none" style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }}>
                <path d="M9 15S2 10.5 2 6a3.5 3.5 0 0 1 5.95-2.48L9 4.8l1.05-1.28A3.5 3.5 0 0 1 16 6C16 10.5 9 15 9 15z"
                  stroke="#8892b0" strokeWidth="1.6" strokeLinejoin="round" />
              </svg> на карточках объектов, чтобы добавить их в избранное
            </p>
            <button className="btn btn-primary fav-cta" onClick={() => onNavigate('buy')}>
              Смотреть объекты →
            </button>
          </div>
        ) : (
          /* Grid */
          <div className="pl-grid">
            {properties.map(p => (
              <PropertyCard
                key={p.id}
                property={p}
                isFav={true}
                onToggleFav={() => onToggleFav(p.id)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
