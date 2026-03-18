'use client'
import Link from 'next/link'
import { Property } from '@/data/properties'

export function formatPrice(p: number, deal: 'buy' | 'rent') {
  const suffix = deal === 'rent' ? ' ₽/мес' : ' ₽'
  return p.toLocaleString('ru') + suffix
}

interface PropertyCardProps {
  property: Property
  isFav?: boolean
  onToggleFav?: () => void
}

export default function PropertyCard({ property, isFav = false, onToggleFav }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`} className="prop-card" target="_blank" rel="noopener noreferrer">
      <div className="prop-card-img-wrap">
        <img src={property.images[0]} alt={property.address} className="prop-card-img" />

        <button
          className={`prop-card-fav${isFav ? ' liked' : ''}`}
          title={isFav ? 'Убрать из избранного' : 'В избранное'}
          onClick={e => { e.preventDefault(); onToggleFav?.() }}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M9 15S2 10.5 2 6a3.5 3.5 0 0 1 5.95-2.48L9 4.8l1.05-1.28A3.5 3.5 0 0 1 16 6C16 10.5 9 15 9 15z"
              stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
              fill={isFav ? 'currentColor' : 'none'} />
          </svg>
        </button>

        <div className="prop-card-photo-count">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          {property.images.length}
        </div>

        {property.isNew && <div className="prop-card-badge prop-badge-new">Новинка</div>}
        {property.isHot && <div className="prop-card-badge prop-badge-hot">Горячее</div>}
      </div>

      <div className="prop-card-body">
        <div className="prop-card-price-row">
          <span className="prop-card-price">{formatPrice(property.price, property.deal)}</span>
          <span className="prop-card-ppm">{property.pricePerM2.toLocaleString('ru')} ₽/м²</span>
        </div>

        <div className="prop-card-meta">
          {property.rooms === 0 && <span>Студия</span>}
          {property.rooms != null && property.rooms > 0 && !['Офис','Склад','Торговое','ПСН','Производство','Здание','Гостиница','Общепит','Готовый бизнес','Коммерческая земля','Коммерческая','Гараж','Земельный участок'].includes(property.type) && <span>{property.rooms}-комн.</span>}
          {property.rooms != null && property.rooms > 0 && !['Офис','Склад','Торговое','ПСН','Производство','Здание','Гостиница','Общепит','Готовый бизнес','Коммерческая земля','Коммерческая','Гараж','Земельный участок'].includes(property.type) && <span className="prop-dot">·</span>}
          {property.rooms === 0 && <span className="prop-dot">·</span>}
          <span>{property.type}</span>
          <span className="prop-dot">·</span>
          <span>{property.area} м²</span>
          {property.floor && (
            <>
              <span className="prop-dot">·</span>
              <span>{property.floor}/{property.totalFloors} эт.</span>
            </>
          )}
        </div>

        <div className="prop-card-address">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div>
            <div>{property.address}</div>
            <div className="prop-card-district">{property.district}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
