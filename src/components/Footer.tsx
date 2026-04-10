interface FooterProps {
  onNavigate: (page: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer>
      {/* Основная часть */}
      <div className="footer-main">

        {/* Левый блок: бренд + контакты */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo.png" alt="Udomo" width={32} height={32}
              style={{ objectFit: 'contain', borderRadius: 7 }} />
            <span className="footer-logo-name">UDOMO®</span>
          </div>

          <p className="footer-desc">Недвижимость в Уфе: покупка,<br/>аренда и сопровождение сделок</p>

          {/* Мессенджеры */}
          <div className="footer-messengers">
            <a href="https://t.me/udomo_1" target="_blank" rel="noopener" className="footer-msg-btn">
              <img src="/icons/telegram.png" width={18} height={18} alt="" style={{ objectFit: 'contain' }} />
              Telegram
            </a>
            <a href="https://t.me/udomo_1" target="_blank" rel="noopener" className="footer-msg-btn footer-msg-btn--max">
              <img src="/icons/max.webp" width={18} height={18} alt="" style={{ objectFit: 'contain' }} />
              MAX
            </a>
          </div>

          {/* Телефон */}
          <a href="tel:83472980899" className="footer-phone">8 347 298-08-99</a>

          {/* Кнопка связи */}
          <a href="tel:83472980899" className="footer-call-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/>
            </svg>
            Позвонить
          </a>

          <div className="footer-addr">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <path d="M10 1a6.5 6.5 0 0 1 6.5 6.5C16.5 12 10 19 10 19S3.5 12 3.5 7.5A6.5 6.5 0 0 1 10 1z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="10" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            г. Уфа, ул. Карла Маркса, 48/1
          </div>
        </div>

        {/* Колонки навигации */}
        <div className="footer-nav">

          <div className="footer-col">
            <h4>Направления</h4>
            <ul>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Купить квартиру</a></li>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('buy') }}>Новостройки</a></li>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('rent') }}>Аренда</a></li>
              <li><a href="#">Управление</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Компания</h4>
            <ul>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('about') }}>О нас</a></li>
              <li><a href="#">Отзывы</a></li>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('contacts') }}>Контакты</a></li>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('blog') }}>Блог</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Объекты</h4>
            <ul>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('projects') }}>Новостройки</a></li>
              <li><a href="#">КП Панорама 27</a></li>
              <li><a href="#">Виллы в Таиланде</a></li>
              <li><a href="#">Коммерческая</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Услуги</h4>
            <ul>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('mortgage') }}>Ипотека</a></li>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('escrow') }}>Безопасная сделка</a></li>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('sell') }}>Продать квартиру</a></li>
              <li><a href="#">Юридическое сопровождение</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Силуэт Уфы */}
      <div className="footer-ufa-skyline" aria-hidden="true">
        <svg viewBox="0 0 1320 260" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg"
          fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
          <path strokeOpacity="0.18" strokeWidth="1.2" d="M0,230 C40,228 75,225 110,222 C140,220 165,222 195,220 C220,218 245,220 268,218"/>
          <path strokeOpacity="0.1" strokeWidth="0.8" d="M10,242 C50,240 90,243 130,241 C170,239 210,241 248,240"/>
          <path strokeOpacity="0.07" strokeWidth="0.8" d="M40,252 C80,250 120,252 160,251 C200,250 235,251 265,250"/>
          <path strokeOpacity="0.3" strokeWidth="1.4" d="M294,218 L313,32"/>
          <path strokeOpacity="0.3" strokeWidth="1.4" d="M346,218 L327,32"/>
          <path strokeOpacity="0.3" strokeWidth="1.4" d="M313,32 L320,10 L327,32"/>
          <line x1="320" y1="10" x2="320" y2="2" strokeOpacity="0.25" strokeWidth="1"/>
          <line x1="291" y1="218" x2="349" y2="218" strokeOpacity="0.25" strokeWidth="1.4"/>
          <line x1="298" y1="170" x2="342" y2="170" strokeOpacity="0.2" strokeWidth="1"/>
          <line x1="305" y1="122" x2="335" y2="122" strokeOpacity="0.2" strokeWidth="1"/>
          <line x1="310" y1="82" x2="330" y2="82" strokeOpacity="0.2" strokeWidth="1"/>
          <line x1="313" y1="48" x2="327" y2="48" strokeOpacity="0.18" strokeWidth="1"/>
          <path strokeOpacity="0.18" strokeWidth="0.9" d="M295,218 L341,200 M341,218 L295,200"/>
          <path strokeOpacity="0.18" strokeWidth="0.9" d="M296,200 L340,182 M340,200 L296,182"/>
          <path strokeOpacity="0.18" strokeWidth="0.9" d="M298,182 L338,165 M338,182 L298,165"/>
          <path strokeOpacity="0.18" strokeWidth="0.9" d="M299,165 L337,148 M337,165 L299,148"/>
          <path strokeOpacity="0.18" strokeWidth="0.9" d="M301,148 L335,132 M335,148 L301,132"/>
          <path strokeOpacity="0.18" strokeWidth="0.9" d="M303,132 L333,118 M333,132 L303,118"/>
          <path strokeOpacity="0.18" strokeWidth="0.9" d="M305,118 L331,105 M331,118 L305,105"/>
          <path strokeOpacity="0.18" strokeWidth="0.9" d="M307,105 L329,92 M329,105 L307,92"/>
          <path strokeOpacity="0.18" strokeWidth="0.9" d="M309,92 L327,80 M327,92 L309,80"/>
          <path strokeOpacity="0.18" strokeWidth="0.9" d="M311,80 L325,68 M325,80 L311,68"/>
          <path strokeOpacity="0.18" strokeWidth="0.9" d="M313,68 L323,56 M323,68 L313,56"/>
          <path strokeOpacity="0.18" strokeWidth="0.9" d="M314,56 L322,46 M322,56 L314,46"/>
          <rect x="370" y="196" width="28" height="22" strokeOpacity="0.28" strokeWidth="1.4"/>
          <rect x="406" y="174" width="38" height="44" strokeOpacity="0.28" strokeWidth="1.4"/>
          <line x1="406" y1="188" x2="444" y2="188" strokeOpacity="0.16" strokeWidth="0.8"/>
          <line x1="406" y1="202" x2="444" y2="202" strokeOpacity="0.16" strokeWidth="0.8"/>
          <line x1="422" y1="174" x2="422" y2="218" strokeOpacity="0.13" strokeWidth="0.8"/>
          <rect x="450" y="148" width="46" height="70" strokeOpacity="0.28" strokeWidth="1.4"/>
          <line x1="450" y1="164" x2="496" y2="164" strokeOpacity="0.16" strokeWidth="0.8"/>
          <line x1="450" y1="180" x2="496" y2="180" strokeOpacity="0.16" strokeWidth="0.8"/>
          <line x1="450" y1="196" x2="496" y2="196" strokeOpacity="0.16" strokeWidth="0.8"/>
          <line x1="450" y1="210" x2="496" y2="210" strokeOpacity="0.16" strokeWidth="0.8"/>
          <line x1="471" y1="148" x2="471" y2="218" strokeOpacity="0.12" strokeWidth="0.8"/>
          <line x1="471" y1="148" x2="471" y2="132" strokeOpacity="0.22" strokeWidth="1.2"/>
          <line x1="467" y1="140" x2="475" y2="140" strokeOpacity="0.18" strokeWidth="0.8"/>
          <rect x="502" y="163" width="36" height="55" strokeOpacity="0.28" strokeWidth="1.4"/>
          <line x1="502" y1="178" x2="538" y2="178" strokeOpacity="0.16" strokeWidth="0.8"/>
          <line x1="502" y1="193" x2="538" y2="193" strokeOpacity="0.16" strokeWidth="0.8"/>
          <line x1="502" y1="208" x2="538" y2="208" strokeOpacity="0.16" strokeWidth="0.8"/>
          <rect x="544" y="184" width="26" height="34" strokeOpacity="0.28" strokeWidth="1.4"/>
          <line x1="268" y1="218" x2="628" y2="218" strokeOpacity="0.2" strokeWidth="1.2"/>
          <path strokeOpacity="0.32" strokeWidth="1.4" d="M628,218 L628,196 C628,180 642,172 642,172 C642,172 680,164 680,164 C680,164 718,172 718,172 C718,172 732,182 732,196 L732,218"/>
          <path strokeOpacity="0.2" strokeWidth="0.9" d="M636,218 L636,198 C636,186 648,180 648,180 C648,180 680,175 680,175 C680,175 712,180 712,180 C712,180 724,188 724,198 L724,218"/>
          <path strokeOpacity="0.32" strokeWidth="1.3" d="M640,218 L636,52"/>
          <path strokeOpacity="0.22" strokeWidth="0.9" d="M644,218 L648,52"/>
          <line x1="634" y1="54" x2="650" y2="54" strokeOpacity="0.28" strokeWidth="1.2"/>
          <path strokeOpacity="0.32" strokeWidth="1.3" d="M635,54 C635,44 642,34 642,30 C642,34 649,44 649,54"/>
          <line x1="642" y1="30" x2="642" y2="18" strokeOpacity="0.28" strokeWidth="1.1"/>
          <path strokeOpacity="0.28" strokeWidth="1.1" d="M638,18 C638,14 642,12 642,12 C642,12 646,14 646,18"/>
          <path strokeOpacity="0.32" strokeWidth="1.3" d="M720,218 L716,66"/>
          <path strokeOpacity="0.22" strokeWidth="0.9" d="M724,218 L728,66"/>
          <line x1="714" y1="68" x2="730" y2="68" strokeOpacity="0.28" strokeWidth="1.2"/>
          <path strokeOpacity="0.32" strokeWidth="1.3" d="M715,68 C715,58 722,48 722,44 C722,48 729,58 729,68"/>
          <line x1="722" y1="44" x2="722" y2="32" strokeOpacity="0.28" strokeWidth="1.1"/>
          <path strokeOpacity="0.28" strokeWidth="1.1" d="M718,32 C718,28 722,26 722,26 C722,26 726,28 726,32"/>
          <path strokeOpacity="0.16" strokeWidth="1.1" d="M738,218 C770,217 800,218 830,217 C852,216 864,218 875,217"/>
          <path strokeOpacity="0.28" strokeWidth="1.4" d="M875,218 C884,215 896,208 910,196 C922,185 932,172 941,160 C948,150 953,142 957,136"/>
          <path strokeOpacity="0.22" strokeWidth="1.2" d="M1095,148 C1118,158 1145,172 1172,188 C1196,202 1220,214 1260,222 C1285,228 1305,232 1320,234"/>
          <path strokeOpacity="0.14" strokeWidth="0.9" d="M880,215 C886,208 893,200 900,190"/>
          <path strokeOpacity="0.14" strokeWidth="0.9" d="M890,212 C896,204 904,194 912,184"/>
          <rect x="992" y="192" width="58" height="18" strokeOpacity="0.28" strokeWidth="1.4"/>
          <path strokeOpacity="0.2" strokeWidth="1" d="M988,192 L988,185 L1052,185 L1052,192"/>
          <path strokeOpacity="0.35" strokeWidth="1.4" d="M1000,184 C1010,178 1022,174 1034,173 C1044,172 1053,174 1058,179"/>
          <path strokeOpacity="0.28" strokeWidth="1.2" d="M1000,184 C996,188 994,192 996,196 C998,200 1002,201 1006,200"/>
          <path strokeOpacity="0.26" strokeWidth="1.2" d="M1002,200 L1001,185"/>
          <path strokeOpacity="0.26" strokeWidth="1.2" d="M1012,198 L1011,185"/>
          <path strokeOpacity="0.3" strokeWidth="1.2" d="M1058,179 C1062,173 1064,166 1062,160 C1060,155 1056,153 1053,153"/>
          <path strokeOpacity="0.26" strokeWidth="1.2" d="M1048,178 C1043,184 1039,190 1036,196"/>
          <path strokeOpacity="0.26" strokeWidth="1.2" d="M1036,176 C1031,182 1027,188 1024,194"/>
          <path strokeOpacity="0.35" strokeWidth="1.4" d="M1053,153 C1056,145 1059,138 1057,132 C1055,127 1051,125 1048,126"/>
          <path strokeOpacity="0.28" strokeWidth="1.2" d="M1048,126 C1045,121 1044,117 1046,114 C1048,111 1052,111 1054,113"/>
          <path strokeOpacity="0.2" strokeWidth="1.1" d="M1000,184 C994,180 989,175 986,169 C984,164 985,159 987,157"/>
          <path strokeOpacity="0.35" strokeWidth="1.4" d="M1036,175 L1032,164 L1030,150"/>
          <path strokeOpacity="0.35" strokeWidth="1.4" d="M1032,160 C1038,153 1046,146 1054,141 C1058,139 1062,140 1062,140"/>
          <line x1="1062" y1="140" x2="1068" y2="130" strokeOpacity="0.28" strokeWidth="1.2"/>
          <circle cx="1029" cy="147" r="6" strokeOpacity="0.3" strokeWidth="1.4"/>
          <path strokeOpacity="0.26" strokeWidth="1" d="M1023,144 L1023,140 L1035,140 L1035,144"/>
          <path strokeOpacity="0.22" strokeWidth="1" d="M1023,140 C1022,136 1029,133 1029,133 C1029,133 1036,136 1035,140"/>
          <path strokeOpacity="0.22" strokeWidth="1.1" d="M1032,172 L1036,180 L1040,182"/>
          <path strokeOpacity="0.22" strokeWidth="1.1" d="M1032,172 L1026,178 L1022,182"/>
        </svg>
      </div>

      {/* Нижняя полоса */}
      <div className="footer-bottom">
        <span>© 2026 UDOMO® · ИП Гареев Александр Вячеславович · ИНН 027720022853</span>
        <span>Уфа, Республика Башкортостан</span>
      </div>
    </footer>
  )
}
