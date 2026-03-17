'use client'

interface ContactsProps {
  onOpenModal: () => void
}

const ROUTE_URL = 'https://yandex.ru/maps/172/ufa/?ll=55.9663%2C54.7355&mode=routes&rtext=~54.7355%2C55.9663&rtt=auto&z=16'
const MAP_URL = 'https://yandex.ru/map-widget/v1/?ll=55.9663%2C54.7355&z=17&pt=55.9663%2C54.7355%2Cpm2rdl&theme=light'

export default function Contacts({ onOpenModal }: ContactsProps) {
  return (
    <div id="page-contacts">

      {/* Шапка */}
      <div className="wrap" style={{ paddingTop: 96 }}>
        <div className="sec-tag">Контакты</div>
        <div className="sec-title" style={{ marginBottom: 8 }}>Свяжитесь с нами</div>
        <div className="sec-sub">Работаем в Уфе — поможем с любым вопросом по недвижимости лично, по телефону или онлайн.</div>
      </div>

      {/* Основной блок: инфо + карта */}
      <div className="sec wrap" style={{ paddingTop: 32 }}>
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
            <div className="contacts-map-badge">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1a4 4 0 0 1 4 4C11 8.5 7 13 7 13S3 8.5 3 5a4 4 0 0 1 4-4z" fill="var(--teal)"/>
                <circle cx="7" cy="5" r="1.5" fill="white"/>
              </svg>
              г. Уфа, ул. Ленина, 70
            </div>
          </div>

          {/* Правая колонка */}
          <div className="contacts-info">

            {/* Карточки с контактами */}
            <div className="contacts-cards">
              <div className="contacts-card">
                <div className="contacts-card-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 1a6.5 6.5 0 0 1 6.5 6.5C16.5 12 10 19 10 19S3.5 12 3.5 7.5A6.5 6.5 0 0 1 10 1z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="10" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <div className="contacts-card-label">Адрес офиса</div>
                  <div className="contacts-card-value">г. Уфа, ул. Ленина, 70</div>
                  <div className="contacts-card-sub">офис 215, 2 этаж</div>
                </div>
              </div>

              <div className="contacts-card">
                <div className="contacts-card-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5.5 3h-1C3.67 3 3 3.67 3 4.5c0 7.456 6.044 13.5 13.5 13.5.83 0 1.5-.67 1.5-1.5v-1a1.5 1.5 0 0 0-1.5-1.5c-.78 0-1.5-.5-1.76-1.26l-.44-1.24a1.5 1.5 0 0 0-1.06-1.06l-.9-.24A1.5 1.5 0 0 0 11 12.5v.3A7.5 7.5 0 0 1 7.2 9l.3-.5a1.5 1.5 0 0 0 .1-1.34L7.1 5.76A1.5 1.5 0 0 0 5.5 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="contacts-card-label">Телефон</div>
                  <a className="contacts-card-value contacts-card-link" href="tel:83472980899">8 347 298-08-99</a>
                  <div className="contacts-card-sub">звонок бесплатный</div>
                </div>
              </div>

              <div className="contacts-card">
                <div className="contacts-card-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="contacts-card-label">Email</div>
                  <a className="contacts-card-value contacts-card-link" href="mailto:info@udomo.ru">info@udomo.ru</a>
                  <div className="contacts-card-sub">ответим в течение часа</div>
                </div>
              </div>

              <div className="contacts-card">
                <div className="contacts-card-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 5.5V10l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="contacts-card-label">Режим работы</div>
                  <div className="contacts-card-value">Пн – Пт: 9:00 – 19:00</div>
                  <div className="contacts-card-sub">Сб – Вс: 10:00 – 17:00</div>
                </div>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="contacts-socials">
              <div className="contacts-socials-title">Мы в мессенджерах и соцсетях</div>
              <div className="contacts-socials-row">
                <a href="https://wa.me/78005553535" target="_blank" rel="noopener" className="contacts-social-btn contacts-social-wa">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a href="https://t.me/udomo_ufa" target="_blank" rel="noopener" className="contacts-social-btn contacts-social-tg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>
                <a href="https://vk.com/udomo_ufa" target="_blank" rel="noopener" className="contacts-social-btn contacts-social-vk">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.745-.576.745z"/>
                  </svg>
                  ВКонтакте
                </a>
                <a href="https://www.youtube.com/@udomo" target="_blank" rel="noopener" className="contacts-social-btn contacts-social-yt">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
              </div>
            </div>

            {/* Кнопки */}
            <div className="contacts-actions">
              <a
                href={ROUTE_URL}
                target="_blank"
                rel="noopener"
                className="contacts-route-btn"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1a5 5 0 0 1 5 5C14 10 9 17 9 17S4 10 4 6a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="9" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Построить маршрут до офиса
              </a>
              <button className="contacts-call-btn" onClick={onOpenModal}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M5 2.5h-1C3.17 2.5 2.5 3.17 2.5 4c0 6.627 5.373 12 12 12 .83 0 1.5-.67 1.5-1.5v-1a1.5 1.5 0 0 0-1.5-1.5c-.78 0-1.5-.5-1.76-1.26l-.44-1.24A1.5 1.5 0 0 0 11.24 9.5l-.9-.24A1.5 1.5 0 0 0 9 10.5v.3A7.5 7.5 0 0 1 5.2 7l.3-.5A1.5 1.5 0 0 0 5.6 5.16L5.1 3.76A1.5 1.5 0 0 0 5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                Заказать звонок
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Нижний блок: реквизиты */}
      <div className="sec wrap" style={{ paddingBottom: 60 }}>
        <div className="contacts-requisites">
          <div className="contacts-req-title">Реквизиты компании</div>
          <div className="contacts-req-grid">
            <div><span className="contacts-req-label">Полное наименование</span><span className="contacts-req-val">ООО «УДОМО»</span></div>
            <div><span className="contacts-req-label">ИНН</span><span className="contacts-req-val">0278123456</span></div>
            <div><span className="contacts-req-label">ОГРН</span><span className="contacts-req-val">1140278000123</span></div>
            <div><span className="contacts-req-label">Юридический адрес</span><span className="contacts-req-val">450000, РБ, г. Уфа, ул. Ленина, 70, оф. 215</span></div>
          </div>
        </div>
      </div>

    </div>
  )
}
