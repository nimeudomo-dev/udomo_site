import LeadPage from './LeadPage'

const benefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: '15+ банков-партнёров',
    text: 'Подберём банк с лучшей ставкой под вашу ситуацию',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Одобрение за 1 день',
    text: 'Подаём заявки одновременно в несколько банков — экономим ваше время',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Ставка от 6,5% годовых',
    text: 'Льготные программы: семейная, ИТ-ипотека, господдержка',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'Сопровождение бесплатно',
    text: 'Наш ипотечный брокер ведёт вас от заявки до получения ключей',
  },
]

const stats = [
  { value: '96%', label: 'одобрений с первого раза' },
  { value: '15+', label: 'банков-партнёров' },
  { value: '−1,5%', label: 'к рыночной ставке' },
]

export default function MortgagePage() {
  return (
    <LeadPage
      tag="Ипотечный брокер"
      title={'Ипотека на\nлучших условиях'}
      subtitle="Подберём банк, поможем с документами и добьёмся одобрения — даже в сложных случаях."
      benefits={benefits}
      formTitle="Узнайте свою ставку"
      formSubtitle="Оставьте номер — рассчитаем условия за 10 минут и подберём программу"
      formSource="mortgage_page"
      stats={stats}
    />
  )
}
