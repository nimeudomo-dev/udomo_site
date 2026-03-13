'use client'
import { useState } from 'react'

const PROJECTS = [
  { id: 'ka-idea', size: 'big', cat: 'ka-idea', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop', tag: 'Жилой комплекс', title: 'КА Идея', sub: 'Современные квартиры в сердце Уфы с продуманными планировками' },
  { id: 'panorama27', size: 'big', cat: 'panorama27', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format&fit=crop', tag: 'Коттеджный посёлок', title: 'КП Панорама 27', sub: 'Загородная жизнь нового уровня в 20 минутах от центра' },
  { id: 'panorama14', size: 'small', cat: 'panorama14', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&auto=format&fit=crop', tag: 'Коттеджный посёлок', title: 'КП Панорама 14', sub: 'Уютные дома у леса с собственной инфраструктурой' },
  { id: 'vtorichka', size: 'small', cat: 'vtorichka', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80&auto=format&fit=crop', tag: 'Готовое жильё', title: 'Вторичка', sub: 'Проверенные квартиры с юридической чистотой и торгом' },
  { id: 'arenda', size: 'small', cat: 'arenda', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80&auto=format&fit=crop', tag: 'Управляющая компания', title: 'Аренда', sub: 'Доверительное управление и посуточная аренда под ключ' },
  { id: 'commercial', size: 'big', cat: 'commercial', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop', tag: 'Недвижимость', title: 'Коммерческая', sub: 'Офисы, торговые площади и производственные помещения' },
]

const FILTER_BTNS = [
  { key: 'novostr', label: 'Новостройки' },
  { key: 'vtorichka', label: 'Вторичка' },
  { key: 'doma', label: 'Дома / Коттеджи' },
  { key: 'commercial', label: 'Коммерческая' },
  { key: 'land', label: 'Земельные участки' },
  { key: 'garage', label: 'Гаражи / Кладовые' },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleFilter = (key: string) => {
    setActiveFilter(prev => prev === key ? '' : key)
  }

  const visible = activeFilter
    ? PROJECTS.filter(p => p.cat === activeFilter)
    : PROJECTS

  return (
    <div className="sec wrap" style={{ paddingTop: 12 }}>
      <div className="sec-head">
        <div>
          <div className="sec-tag">Актуальные предложения</div>
          <div className="sec-title">Объекты в продаже</div>
          <div className="sec-sub">Квартиры, коттеджи и новостройки в Уфе.</div>
        </div>
      </div>

      <div className="proj-filter">
        <div className="pf-tags">
          {FILTER_BTNS.map(f => (
            <button
              key={f.key}
              className={`pf-btn${activeFilter === f.key ? ' active' : ''}`}
              onClick={() => handleFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          className={`pf-all-filters${showAdvanced ? ' open' : ''}`}
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          Все фильтры
        </button>
      </div>

      {showAdvanced && (
        <div className="proj-advanced open">
          <div className="pf-group pf-group--deal">
            <div className="pf-label">Тип сделки</div>
            <div className="pf-deal-btns">
              <button className="pf-room pf-deal active">Покупка</button>
              <button className="pf-room pf-deal">Аренда</button>
            </div>
          </div>

          <div className="pf-group">
            <div className="pf-label">Стоимость, ₽</div>
            <div className="pf-inputs">
              <input className="pf-input" type="text" placeholder="от 1 000 000"/>
              <span className="pf-sep"></span>
              <input className="pf-input" type="text" placeholder="до 30 000 000"/>
            </div>
          </div>

          <div className="pf-group">
            <div className="pf-label">Площадь, м²</div>
            <div className="pf-inputs">
              <input className="pf-input" type="text" placeholder="от 20"/>
              <span className="pf-sep"></span>
              <input className="pf-input" type="text" placeholder="до 300"/>
            </div>
          </div>

          <div className="pf-group">
            <div className="pf-label">Этаж</div>
            <div className="pf-inputs">
              <input className="pf-input" type="text" placeholder="от 1"/>
              <span className="pf-sep"></span>
              <input className="pf-input" type="text" placeholder="до 25"/>
            </div>
          </div>

          <div className="pf-group">
            <div className="pf-label">Комнат</div>
            <div className="pf-rooms">
              <button className="pf-room">С</button>
              <button className="pf-room">1</button>
              <button className="pf-room">2</button>
              <button className="pf-room">3</button>
              <button className="pf-room">4+</button>
            </div>
          </div>

          <div className="pf-apply-wrap">
            <button className="pf-map-btn" style={{ marginBottom: 8, width: '100%' }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 1a4.5 4.5 0 0 1 4.5 4.5C12 9 7.5 14 7.5 14S3 9 3 5.5A4.5 4.5 0 0 1 7.5 1z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="7.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              На карте
            </button>
            <button className="pf-apply">Применить</button>
          </div>
        </div>
      )}

      <div className="proj-grid">
        {visible.map((p, idx) => {
          const isCommercial = p.id === 'commercial'
          const isFirstBig = p.id === 'ka-idea' && !activeFilter
          return (
            <a
              key={p.id}
              className={`proj-card proj-${p.size}`}
              href="#"
              style={{
                backgroundImage: `url('${p.img}')`,
                ...(isCommercial ? { gridColumn: 'span 3', height: 280 } : {}),
                ...(isFirstBig ? { gridColumn: 'span 2' } : {}),
              }}
              onClick={e => e.preventDefault()}
            >
              <div className="proj-overlay"></div>
              <div className="proj-stripes"></div>
              <div className="proj-content">
                <div className="proj-tag">{p.tag}</div>
                <div className="proj-title">{p.title}</div>
                <div className="proj-sub">{p.sub}</div>
                <div className="proj-link">Подробнее →</div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
