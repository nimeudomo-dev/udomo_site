import LeadPage from './LeadPage'

const benefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Юридическая чистота',
    text: 'Проверим историю объекта, собственников и все обременения',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/>
      </svg>
    ),
    title: 'Подготовка договора',
    text: 'Составим и согласуем договор купли-продажи с защитой ваших интересов',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
    title: 'Безопасные расчёты',
    text: 'Аккредитив или банковская ячейка — деньги защищены до регистрации',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Регистрация в Росреестре',
    text: 'Подадим документы и сопроводим до получения выписки ЕГРН',
  },
]

const stats = [
  { value: '1 200+', label: 'сделок проведено' },
  { value: '0', label: 'случаев мошенничества' },
  { value: '7 дней', label: 'средний срок сделки' },
]

export default function EscrowPage() {
  return (
    <LeadPage
      tag="Сопровождение сделки"
      title={'Безопасная сделка\nпод ключ'}
      subtitle="Проведём весь процесс от проверки документов до регистрации права собственности."
      benefits={benefits}
      formTitle="Получить консультацию"
      formSubtitle="Разберём вашу ситуацию и предложим подходящие варианты"
      formSource="escrow_page"
      stats={stats}
    />
  )
}
