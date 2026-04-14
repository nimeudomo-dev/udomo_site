'use client'
import { useState, useRef, useEffect } from 'react'

interface ContactsProps {
  onOpenModal: () => void
  autoOpenReq?: boolean
  onReqOpened?: () => void
}

const LAT = 54.737843
const LON = 55.948182
const ORG_ID = '186212681099'
const ROUTE_URL = `https://yandex.ru/maps/org/udomo/${ORG_ID}/?from=mapframe&ll=${LON}%2C${LAT}&pt=${LON}%2C${LAT}&z=19`
const MAP_URL = `https://yandex.ru/map-widget/v1/org/${ORG_ID}/?ll=${LON}%2C${LAT}&z=18&theme=light`

export default function Contacts({ onOpenModal, autoOpenReq, onReqOpened }: ContactsProps) {
  const [reqOpen, setReqOpen] = useState(false)
  const reqSectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (autoOpenReq) {
      setReqOpen(true)
      onReqOpened?.()
      setTimeout(() => {
        reqSectionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 100)
    }
  }, [autoOpenReq])

  const handleReqToggle = () => {
    const opening = !reqOpen
    setReqOpen(opening)
    if (opening) {
      setTimeout(() => {
        reqSectionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 50)
    }
  }

  return (
    <div id="page-contacts">

      {/* Шапка */}
      <div className="wrap" style={{ paddingTop: 90 }}>
        <div className="sec-tag">Контакты</div>
        <div className="sec-title" style={{ marginBottom: 8, textTransform: 'none' }}>Свяжитесь с нами</div>
        <div className="sec-sub">Работаем официально по договору</div>
      </div>

      {/* Основной блок: инфо + карта */}
      <div className="sec wrap" style={{ paddingTop: 32, paddingBottom: 0 }}>
        <div className="contacts-grid">

          {/* Карта */}
          <div className="contacts-map-wrap">
            <iframe
              src={MAP_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              title="Офис Udomo на карте"
            />
          </div>

          {/* Правая колонка */}
          <div className="contacts-info">

            {/* Список контактов */}
            <div className="ci-list">
              <div className="ci-item">
                <div className="ci-icon">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M10 1a6.5 6.5 0 0 1 6.5 6.5C16.5 12 10 19 10 19S3.5 12 3.5 7.5A6.5 6.5 0 0 1 10 1z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="10" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="ci-text">
                  <div className="ci-label">Адрес офиса</div>
                  <div className="ci-value">г. Уфа, ул. Карла Маркса, 48/1</div>
                </div>
              </div>

              <div className="ci-item">
                <div className="ci-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="ci-text">
                  <div className="ci-label">Телефон</div>
                  <a className="ci-value ci-link" href="tel:83472980899">8 347 298-08-99</a>
                </div>
              </div>

              <div className="ci-item">
                <div className="ci-icon">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="ci-text">
                  <div className="ci-label">Email</div>
                  <a className="ci-value ci-link" href="mailto:udomo@bk.ru">udomo@bk.ru</a>
                </div>
              </div>

              <div className="ci-item">
                <div className="ci-icon">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 5.5V10l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="ci-text">
                  <div className="ci-label">Режим работы</div>
                  <div className="ci-value">Пн – Пт: 9:30 – 18:00</div>
                </div>
              </div>
            </div>

            {/* Кнопки */}
            <div className="ci-btns-grid">
              <a href="#" onClick={e => e.preventDefault()} className="ci-msg-btn ci-msg-tg">
                <div className="ci-msg-icon">
                  <img src="/icons/telegram.png" width="26" height="26" alt="" style={{ objectFit: 'contain' }} />
                </div>
                Telegram
              </a>
              <a href="#" onClick={e => e.preventDefault()} className="ci-msg-btn ci-msg-max">
                <div className="ci-msg-icon">
                  <img src="/icons/max.webp" width="24" height="24" alt="" style={{ objectFit: 'contain' }} />
                </div>
                MAX
              </a>
              <button className="contacts-call-btn" style={{ gridColumn: 'span 2' }} onClick={onOpenModal}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <div>Получить консультацию</div>
                  <div className="ci-call-sub">Перезвоним в течение 10 минут</div>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Нижний блок: реквизиты */}
      <div className="sec wrap" style={{ paddingTop: 32, paddingBottom: 60 }}>
        <div className="contacts-requisites">
          <div className="contacts-req-title">Реквизиты</div>

          {/* Основное — всегда видно */}
          <div className="req-main">
            <div>
              <div className="req-main-brand">UDOMO®</div>
              <div className="req-main-tm">товарный знак № 826439</div>
            </div>
            <div className="req-main-name">ИП Гареев Александр Вячеславович</div>
            <div className="req-main-row">
              <span className="req-main-item"><span className="req-main-key">ИНН</span> 027720022853</span>
              <span className="req-main-sep" />
              <span className="req-main-item"><span className="req-main-key">ОГРНИП</span> 317028000057633</span>
            </div>
            <button className="req-toggle" onClick={handleReqToggle}>
              {reqOpen ? 'Скрыть' : 'Юридическая информация'}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ transform: reqOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Дополнительное — скрываемое */}
          {reqOpen && (
            <div className="req-sections" ref={reqSectionsRef}>
              <div className="req-section">
                <div className="req-section-label">Адреса</div>
                <div className="req-rows">
                  <div className="req-row">
                    <span className="req-key">Адрес регистрации</span>
                    <span className="req-val">РБ, г. Уфа, ул. Бакалинская, д. 64/3, кв. 151</span>
                  </div>
                  <div className="req-row">
                    <span className="req-key">Фактический адрес офиса</span>
                    <span className="req-val">РБ, г. Уфа, ул. Карла Маркса, 48/1</span>
                  </div>
                </div>
              </div>
              <div className="req-section">
                <div className="req-section-label">Банковские реквизиты</div>
                <div className="req-rows">
                  <div className="req-row">
                    <span className="req-key">Расчётный счёт</span>
                    <span className="req-val">40802810514500040010</span>
                  </div>
                  <div className="req-row">
                    <span className="req-key">Банк</span>
                    <span className="req-val">ООО «Банк Точка»</span>
                  </div>
                  <div className="req-row">
                    <span className="req-key">БИК</span>
                    <span className="req-val">044525104</span>
                  </div>
                  <div className="req-row">
                    <span className="req-key">Корр. счёт</span>
                    <span className="req-val">30101810745374525104</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
