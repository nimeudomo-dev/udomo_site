'use client'
import { useRouter } from 'next/navigation'

export default function Footer() {
  const router = useRouter()

  return (
    <footer>
      <div className="ft-main">

        <div className="ft-brand">
          <div className="ft-logo">
            <img src="/logo.png" alt="Udomo" width={46} height={46}
              style={{ objectFit: 'contain', transform: 'translateY(-5px)' }} />
            <span className="ft-logo-name">Udomo</span>
          </div>
          <p className="ft-tagline">Недвижимость в Уфе — продажа и аренда</p>
          <a href="tel:83472980899" className="ft-phone">8 347 298-08-99</a>
          <div className="ft-contact-list">
            <a href="mailto:udomo@bk.ru" className="ft-contact-item">udomo@bk.ru</a>
            <span className="ft-contact-item">г. Уфа, ул. Карла Маркса, 48/1</span>
            <span className="ft-contact-item">Пн – Пт: 9:30 – 18:00</span>
          </div>
        </div>

        <div className="ft-col">
          <h4>Написать нам</h4>
          <div className="ft-msg-col">
            <a href="https://t.me/udomo_1" target="_blank" rel="noopener" className="ft-msg-btn">
              <img src="/icons/telegram.png" width={20} height={20} alt="" style={{ objectFit: 'contain' }} />
              Telegram
            </a>
            <a href="#" target="_blank" rel="noopener" className="ft-msg-btn">
              <img src="/icons/max.webp" width={20} height={20} alt="" style={{ objectFit: 'contain' }} />
              MAX
            </a>
          </div>
        </div>

        <div className="ft-col">
          <h4>Полезное</h4>
          <ul>
            <li><a href="/buy"      onClick={e => { e.preventDefault(); router.push('/buy') }}>Купить квартиру</a></li>
            <li><a href="/projects" onClick={e => { e.preventDefault(); router.push('/projects') }}>Новостройки</a></li>
            <li><a href="/sell"     onClick={e => { e.preventDefault(); router.push('/sell') }}>Продать квартиру</a></li>
            <li><a href="/contacts" onClick={e => { e.preventDefault(); router.push('/contacts') }}>Контакты</a></li>
          </ul>
        </div>

        <div className="ft-col">
          <h4>Документы</h4>
          <ul>
            <li><a href="/docs/privacy.pdf" target="_blank" rel="noopener noreferrer">Политика защиты и обработки персональных данных</a></li>
            <li><a href="/docs/consent.pdf" target="_blank" rel="noopener noreferrer">Согласие субъекта на обработку персональных данных</a></li>
            <li><a href="/docs/cookie.pdf" target="_blank" rel="noopener noreferrer">Политика Cookie</a></li>
            <li><a href="/contacts?req=1" onClick={e => { e.preventDefault(); router.push('/contacts?req=1') }}>Реквизиты</a></li>
          </ul>
        </div>

      </div>

      <div className="ft-bottom">
        <span className="ft-bottom-copy">
          © 2026 Udomo<br/>
          ИП Гареев Александр Вячеславович<br/>
          ИНН 0277 2002 2853 · ОГРНИП 3170 2800 0057 633
        </span>
        <span className="ft-bottom-city">г. Уфа, Республика Башкортостан</span>
      </div>

      <div className="ft-skyline" aria-hidden="true">
        <img src="/foother_ufa.svg" alt="" />
      </div>
    </footer>
  )
}
