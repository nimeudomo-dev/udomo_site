'use client'
import { useState } from 'react'

const VACANCIES = [
  {
    id: 'tenders',
    title: 'Специалист по тендерам',
    type: 'Полная занятость',
    schedule: '5/2, 9:30 – 18:00',
    office: 'Офис, г. Уфа',
    about: 'Udomo — компания на рынке недвижимости, объединяющая несколько ключевых направлений: инвестиции, продажа жилой и коммерческой недвижимости, строительство и маркетинг. Благодаря инвестиционной деятельности мы располагаем широким портфелем объектов по привлекательным ценам. В связи с расширением компании открыта вакансия Специалиста по тендерам.',
    requirements: [
      'Законодательство РФ в сфере закупок (ФЗ и нормативные акты)',
      'Принципы участия в тендерах, аукционах и закупках',
      'Площадки для проведения электронных торгов',
      'Методы продвижения объектов недвижимости на муниципальном и коммерческом рынках',
      'Основы ценообразования',
      'Требования к конкурсной документации и порядок её подготовки',
      'Основные характеристики объектов недвижимости и земельных участков',
      'Правила деловой переписки и взаимодействия с заказчиками',
    ],
    duties: [
      'Мониторинг специализированных площадок и сайтов закупок',
      'Анализ тендеров и оценка целесообразности участия',
      'Подготовка финансовых расчётов',
      'Запрос и изучение конкурсной документации',
      'Подготовка полного пакета документов для участия',
      'Взаимодействие с внутренними отделами (менеджеры, руководство)',
      'Оформление заявок и ведение переписки с организаторами',
      'Ведение нескольких проектов одновременно',
      'Контроль возврата обеспечений заявок',
      'Ведение отчётности',
    ],
    conditions: [
      'Работа в профессиональной команде',
      'Официальное трудоустройство',
      'График: 5/2, с 9:30 до 18:00',
      'Офис в центре города',
      'Предоставляем технику (компьютер, телефон)',
      'Оплачиваем корпоративную связь',
    ],
  },
  {
    id: 'suburban',
    title: 'Специалист по продаже загородной недвижимости',
    type: 'Полная занятость',
    schedule: '5/2, 9:30 – 18:00',
    office: 'Офис + выезды',
    about: 'Udomo — международная компания, работающая в сфере инвестиций, строительства и продажи недвижимости. Мы создаём не просто объекты, а комфортную среду для жизни — загородные дома, в которых люди находят своё пространство и спокойствие.',
    requirements: [
      'Желание развиваться и зарабатывать',
      'Опыт в недвижимости — плюс, но не обязателен',
      'Грамотная речь и базовые навыки работы с ПК',
      'Ответственность и ориентация на результат',
    ],
    duties: [
      'Консультирование клиентов по покупке загородной недвижимости',
      'Организация показов объектов',
      'Ведение переговоров и сопровождение сделок',
      'Подготовка документов',
      'Работа в CRM-системе',
    ],
    conditions: [
      'Доход выше среднего по рынку — высокий % от сделок',
      'Стабильные выплаты 2 раза в месяц',
      'Прозрачная система бонусов и премий',
      'Возможность карьерного роста',
      'Поддержка маркетинга и личного бренда',
      'График: 5/2, с 9:30 до 18:00',
      'Оплата мобильной связи и рекламы',
      'Дружная команда и обучение',
    ],
    perks: [
      'Собственный продукт — продаём то, что строим сами',
      'Поддержка со стороны маркетинга',
      'Обучение с первого дня',
    ],
  },
]

function VacancyCard({ v }: { v: typeof VACANCIES[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`career-card${open ? ' career-card--open' : ''}`}>
      <div className="career-card-header" onClick={() => setOpen(o => !o)}>
        <div className="career-card-meta">
          <div className="career-card-title">{v.title}</div>
          <div className="career-card-tags">
            <span className="career-tag">{v.type}</span>
            <span className="career-tag">{v.schedule}</span>
            <span className="career-tag">{v.office}</span>
          </div>
        </div>
        <div className="career-card-toggle">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}>
            <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {open && (
        <div className="career-card-body">
          <div className="career-sections">
            <div className="career-section">
              <div className="career-section-title">Требования</div>
              <ul className="career-list">
                {v.requirements.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>

            <div className="career-section">
              <div className="career-section-title">Обязанности</div>
              <ul className="career-list">
                {v.duties.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>

            <div className="career-section">
              <div className="career-section-title">Условия</div>
              <ul className="career-list career-list--check">
                {v.conditions.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>

          <div className="career-apply" style={{ justifyContent: 'flex-end' }}>
            <a href="https://ufa.hh.ru/employer/3975685?hhtmFrom=vacancy&tab=DESCRIPTION" target="_blank" rel="noopener" className="career-hh-btn">
              <img src="/icons/hh_logo_red.svg" width={28} height={18} alt="hh.ru" style={{ objectFit: 'contain' }} />
              Мы на hh.ru
            </a>
            <a href="tel:+79033101565" className="career-apply-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Позвонить
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CareersPage() {
  return (
    <div id="page-careers">
      <div className="wrap" style={{ paddingTop: 90 }}>
        <div className="sec-tag">Карьера</div>
        <div className="sec-title" style={{ marginBottom: 8, textTransform: 'none' }}>Вакансии</div>
        <div className="sec-sub">Присоединяйтесь к команде Udomo — официальное трудоустройство и рост вместе с компанией</div>
      </div>

      <div className="sec wrap" style={{ paddingBottom: 80 }}>
        <div className="career-list-wrap">
          {VACANCIES.map(v => <VacancyCard key={v.id} v={v} />)}
        </div>
      </div>
    </div>
  )
}
