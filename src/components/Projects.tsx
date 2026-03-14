'use client'

const PROJECTS = [
  { id: 'ka-idea', size: 'big', cat: 'ka-idea', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop', tag: 'Жилой комплекс', title: 'КА Идея', sub: 'Современные квартиры в сердце Уфы с продуманными планировками' },
  { id: 'panorama27', size: 'big', cat: 'panorama27', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format&fit=crop', tag: 'Коттеджный посёлок', title: 'КП Панорама 27', sub: 'Загородная жизнь нового уровня в 20 минутах от центра' },
  { id: 'panorama14', size: 'small', cat: 'panorama14', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&auto=format&fit=crop', tag: 'Коттеджный посёлок', title: 'КП Панорама 14', sub: 'Уютные дома у леса с собственной инфраструктурой' },
  { id: 'vtorichka', size: 'small', cat: 'vtorichka', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80&auto=format&fit=crop', tag: 'Готовое жильё', title: 'Вторичка', sub: 'Проверенные квартиры с юридической чистотой и торгом' },
  { id: 'arenda', size: 'small', cat: 'arenda', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80&auto=format&fit=crop', tag: 'Управляющая компания', title: 'Аренда', sub: 'Доверительное управление и посуточная аренда под ключ' },
  { id: 'commercial', size: 'big', cat: 'commercial', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop', tag: 'Недвижимость', title: 'Коммерческая', sub: 'Офисы, торговые площади и производственные помещения' },
]

export default function Projects() {
  const visible = PROJECTS

  return (
    <div className="sec wrap" style={{ paddingTop: 12 }}>
      <div className="sec-head">
        <div>
          <div className="sec-tag">Актуальные предложения</div>
          <div className="sec-title">Объекты в продаже</div>
          <div className="sec-sub">Квартиры, коттеджи и новостройки в Уфе.</div>
        </div>
      </div>

      <div className="proj-grid">
        {visible.map((p, idx) => {
          const isCommercial = p.id === 'commercial'
          const isFirstBig = p.id === 'ka-idea'
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
