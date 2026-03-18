'use client'

export interface FilterState {
  propClass: '' | 'residential' | 'commercial' | 'apartments'
  deal:      'all' | 'buy' | 'rent'
  category:  string
  priceMin:  string
  priceMax:  string
  areaMin:   string
  areaMax:   string
  floorMin:  string
  floorMax:  string
  rooms:     string[]
  sort:      string
}

export const defaultFilter: FilterState = {
  propClass: '',
  deal:      'all',
  category:  '',
  priceMin:  '',
  priceMax:  '',
  areaMin:   '',
  areaMax:   '',
  floorMin:  '',
  floorMax:  '',
  rooms:     [],
  sort:      'date',
}

export const RESIDENTIAL_GROUPS = [
  { label: 'Новостройки',        values: ['Новостройка'] },
  { label: 'Вторичная',          values: ['Вторичная', 'Комната'] },
  { label: 'Дома / Коттеджи',    values: ['Дом / Коттедж', 'Таунхаус', 'Дача'] },
  { label: 'Земельные участки',  values: ['Земельный участок'] },
  { label: 'Гаражи / Кладовые', values: ['Гараж'] },
  { label: 'Комнаты / Доли',     values: ['Комната'] },
]

export const COMMERCIAL_GROUPS = [
  { label: 'Офис',               values: ['Офис'] },
  { label: 'Здание',             values: ['Здание'] },
  { label: 'Торговое',           values: ['Торговое'] },
  { label: 'ПСН',                values: ['ПСН'] },
  { label: 'Производство',       values: ['Производство'] },
  { label: 'Склад',              values: ['Склад'] },
  { label: 'Коммерческая земля', values: ['Коммерческая земля'] },
  { label: 'Готовый бизнес',     values: ['Готовый бизнес'] },
  { label: 'Гостиница',          values: ['Гостиница'] },
  { label: 'Общепит',            values: ['Общепит'] },
  { label: 'Другое',             values: ['Коммерческая'] },
]

// Объединённый список для фильтрации в PropertyListPage
export const CATEGORY_GROUPS = [...RESIDENTIAL_GROUPS, ...COMMERCIAL_GROUPS]

const SORTS = [
  { value: 'date',       label: 'По дате' },
  { value: 'price-asc',  label: 'Дешевле' },
  { value: 'price-desc', label: 'Дороже' },
  { value: 'area-desc',  label: 'Площадь' },
]

const ROOMS = ['С', '1', '2', '3', '4+']

interface Props {
  filter:      FilterState
  onChange:    (f: FilterState) => void
  resultCount: number
  onMapView?:  () => void
}

export default function PropertyFilter({ filter, onChange, resultCount, onMapView }: Props) {
  const set = (patch: Partial<FilterState>) => onChange({ ...filter, ...patch })

  const setClass = (cls: '' | 'residential' | 'commercial' | 'apartments') =>
    set({ propClass: filter.propClass === cls ? '' : cls, category: '' })

  const selectCategory = (label: string) =>
    set({ category: filter.category === label ? '' : label })

  const toggleDeal = (d: 'buy' | 'rent') =>
    set({ deal: filter.deal === d ? 'all' : d })

  const toggleRoom = (r: string) => {
    const next = filter.rooms.includes(r)
      ? filter.rooms.filter(x => x !== r)
      : [...filter.rooms, r]
    set({ rooms: next })
  }

  const extraCount = [
    filter.priceMin, filter.priceMax,
    filter.areaMin,  filter.areaMax,
    filter.floorMin, filter.floorMax,
  ].filter(Boolean).length + filter.rooms.length

  const isDefault = JSON.stringify(filter) === JSON.stringify(defaultFilter)

  const subGroups = filter.propClass === 'commercial'
    ? COMMERCIAL_GROUPS
    : filter.propClass === 'residential'
      ? RESIDENTIAL_GROUPS
      : null

  const cat = filter.category
  const showDetailedFilters = cat !== '' || filter.propClass === 'apartments'
  const showRooms = filter.propClass === 'apartments' ||
    (filter.propClass !== 'commercial' && ['Новостройки', 'Вторичная', 'Дома / Коттеджи'].includes(cat))
  const showFloor = filter.propClass !== 'apartments' &&
    !['Земельные участки', 'Гаражи / Кладовые', 'Коммерческая земля'].includes(cat)

  return (
    <div className="pf-root">

      {/* ── Строка 1: Жилая / Коммерческая + Купить/Аренда + Фильтры + Сбросить ── */}
      <div className="pf-top">
        <div className="pf-class-group">
          <button className={`pf-btn pf-class-btn${filter.propClass === 'residential' ? ' active' : ''}`}
            onClick={() => setClass('residential')}>Жилая</button>
          <button className={`pf-btn pf-class-btn${filter.propClass === 'commercial' ? ' active' : ''}`}
            onClick={() => setClass('commercial')}>Коммерческая</button>
          <button className={`pf-btn pf-class-btn${filter.propClass === 'apartments' ? ' active' : ''}`}
            onClick={() => setClass('apartments')}>Апартаменты</button>
        </div>

        <div className="pf-sep" />

        <div className="pf-deal-group">
          {(['buy', 'rent'] as const).map(d => (
            <button key={d}
              className={`pf-btn${filter.deal === d ? ' active' : ''}`}
              onClick={() => toggleDeal(d)}>
              {d === 'buy' ? 'Купить' : 'Аренда'}
            </button>
          ))}
        </div>

        <div className="pf-top-right">
          {onMapView && (
            <button className="pf-btn" onClick={onMapView}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
              На карте
            </button>
          )}
          <button className={`pf-reset-btn${isDefault ? ' dimmed' : ''}`}
            onClick={() => onChange(defaultFilter)}>
            Сбросить
          </button>
        </div>
      </div>

      {/* ── Строка 2: подкатегории (если выбран класс) ── */}
      {subGroups && (
        <div className="pf-cats-row">
          {subGroups.map(g => (
            <button key={g.label}
              className={`pf-btn${filter.category === g.label ? ' active' : ''}`}
              onClick={() => selectCategory(g.label)}>
              {g.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Строка 3: детальные фильтры (после выбора категории) ── */}
      {showDetailedFilters && (
        <div className="pf-body">
          <div className="pf-fields">

            <div className="pf-field">
              <label className="pf-label">Стоимость, ₽</label>
              <div className="pf-range">
                <input className="pf-input" type="number" placeholder="от"
                  value={filter.priceMin} onChange={e => set({ priceMin: e.target.value })} />
                <span className="pf-dash">—</span>
                <input className="pf-input" type="number" placeholder="до"
                  value={filter.priceMax} onChange={e => set({ priceMax: e.target.value })} />
              </div>
            </div>

            <div className="pf-field">
              <label className="pf-label">Площадь, м²</label>
              <div className="pf-range">
                <input className="pf-input" type="number" placeholder="от"
                  value={filter.areaMin} onChange={e => set({ areaMin: e.target.value })} />
                <span className="pf-dash">—</span>
                <input className="pf-input" type="number" placeholder="до"
                  value={filter.areaMax} onChange={e => set({ areaMax: e.target.value })} />
              </div>
            </div>

            {showFloor && (
              <div className="pf-field">
                <label className="pf-label">Этаж</label>
                <div className="pf-range">
                  <input className="pf-input" type="number" placeholder="от"
                    value={filter.floorMin} onChange={e => set({ floorMin: e.target.value })} />
                  <span className="pf-dash">—</span>
                  <input className="pf-input" type="number" placeholder="до"
                    value={filter.floorMax} onChange={e => set({ floorMax: e.target.value })} />
                </div>
              </div>
            )}

            {showRooms && (
              <div className="pf-field">
                <label className="pf-label">Комнатность</label>
                <div className="pf-rooms">
                  {ROOMS.map(r => (
                    <button key={r}
                      className={`pf-btn pf-room-btn${filter.rooms.includes(r) ? ' active' : ''}`}
                      onClick={() => toggleRoom(r)}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ── Нижняя строка: сортировка + счётчик ── */}
      <div className="pf-bottom">
        <div className="pf-sort">
          <span className="pf-sort-label">Сортировка:</span>
          {SORTS.map(s => (
            <button key={s.value}
              className={`pf-btn pf-sort-btn${filter.sort === s.value ? ' active' : ''}`}
              onClick={() => set({ sort: s.value })}>
              {s.label}
            </button>
          ))}
        </div>
        <span className="pf-count">
          {resultCount} объект{resultCount === 1 ? '' : resultCount < 5 ? 'а' : 'ов'}
        </span>
      </div>

    </div>
  )
}
