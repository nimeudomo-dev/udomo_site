import LeadPage from './LeadPage'

const benefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Оценка за 24 часа',
    text: 'Бесплатно рассчитаем рыночную стоимость вашего объекта',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Реклама на 50+ площадках',
    text: 'Авито, ЦИАН, Домклик, соцсети и собственная база покупателей',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: 'Юридическое сопровождение',
    text: 'Проверим документы, подготовим договор и проведём сделку',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    title: 'Средний срок продажи — 45 дней',
    text: 'Работаем быстро и прозрачно, держим вас в курсе каждого шага',
  },
]

const stats = [
  { value: '500+', label: 'объектов продано' },
  { value: '12 лет', label: 'на рынке Уфы' },
  { value: '98%', label: 'клиентов довольны' },
]

export default function SellPage() {
  return (
    <LeadPage
      tag="Продажа недвижимости"
      title={'Продайте квартиру\nвыгодно и в срок'}
      subtitle="Возьмём на себя всё — от бесплатной оценки до получения денег на вашем счёте."
      benefits={benefits}
      formTitle="Оставьте заявку на оценку"
      formSubtitle="Перезвоним в течение 30 минут и договоримся об удобном времени"
      formSource="sell_page"
      stats={stats}
    />
  )
}
