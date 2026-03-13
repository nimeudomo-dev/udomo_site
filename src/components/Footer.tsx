interface FooterProps {
  onNavigate: (page: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.jpg" alt="Udomo" width={44} height={44} style={{ borderRadius: 8 }} />
            <span className="footer-logo-text">Udomo</span>
          </div>
          <div className="footer-tagline">Недвижимость в Уфе</div>
          <a href="tel:83472980899" className="footer-phone">8 347 298-08-99</a>
          <a href="mailto:info@udomo.ru" className="footer-email">info@udomo.ru</a>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Покупка</div>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Новостройки</a>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Вторичное жильё</a>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Коммерческая</a>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Участки</a>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Аренда</div>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('rent') }}>Долгосрочная</a>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('rent') }}>Посуточная</a>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('rent') }}>Коммерческая</a>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('rent') }}>Управление</a>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Проекты</div>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('projects') }}>КП Панорама 27</a>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('projects') }}>КП Панорама 14</a>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('projects') }}>КА Идея</a>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Компания</div>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('about') }}>О компании</a>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('contacts') }}>Контакты</a>
          <a href="https://2gis.ru/ufa/search/udomo" target="_blank" rel="noopener noreferrer">Мы на 2ГИС</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">© 2024 Udomo. Агентство недвижимости Уфы.</div>
        <div className="footer-legal">
          <a href="#">Политика конфиденциальности</a>
          <a href="#">Пользовательское соглашение</a>
        </div>
      </div>
    </footer>
  )
}
