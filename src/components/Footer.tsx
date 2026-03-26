interface FooterProps {
  onNavigate: (page: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer>
      <div className="footer-inner">

        {/* Бренд */}
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.png" alt="Udomo" width={36} height={36}
              style={{ objectFit: 'contain', borderRadius: 7 }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '0.04em' }}>
              UDOMO®
            </span>
          </div>
          <p>Недвижимость в Уфе: покупка, аренда и сопровождение сделок</p>
          <div className="footer-brand-copy">
            <span>© 2026 UDOMO®. Все права защищены.</span>
            <span>Товарный знак № 826439</span>
          </div>
        </div>

        {/* Направления */}
        <div className="footer-col">
          <h4>Направления</h4>
          <ul>
            <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Купить квартиру</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Новостройки</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('rent') }}>Аренда</a></li>
            <li><a href="#">Управление</a></li>
          </ul>
        </div>

        {/* Компания */}
        <div className="footer-col">
          <h4>Компания</h4>
          <ul>
            <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('about') }}>О нас</a></li>
            <li><a href="#">Отзывы</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('contacts') }}>Контакты</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('blog') }}>Блог</a></li>
          </ul>
        </div>

        {/* Контакты */}
        <div className="footer-col">
          <h4>Контакты</h4>
          <ul>
            <li><a href="tel:83472980899">8 347 298-08-99</a></li>
            <li><a href="https://t.me/udomo_1" target="_blank" rel="noopener">Telegram</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('contacts') }}>г. Уфа</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <span>ИП Гареев Александр Вячеславович · ИНН 027720022853</span>
        <span>Уфа, Республика Башкортостан</span>
      </div>
    </footer>
  )
}
