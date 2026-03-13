const REVIEWS = [
  { initials: 'АК', bg: '#1bc8a0', color: 'white', name: 'Алексей Кириллов', text: '«Купили квартиру в новостройке через Udomo. Менеджер Дмитрий провёл нас от просмотра до ключей за 3 недели. Никаких скрытых доплат, всё прозрачно. Рекомендую!»', date: 'Февраль 2025' },
  { initials: 'МС', bg: '#9b3fc8', color: 'white', name: 'Марина Садыкова', text: '«Сдаём квартиру через УК Udomo уже 2 года. Деньги приходят стабильно каждый месяц, за всё время — ни одного пустого дня. Очень довольны!»', date: 'Январь 2025' },
  { initials: 'ИВ', bg: '#0d0f1a', color: '#1bc8a0', name: 'Игорь Власов', text: '«Продали дом в КП Панорама 27. Профессиональная фотосъёмка, покупатель нашёлся за 11 дней. Цена выше рынка на 8%. Спасибо команде!»', date: 'Март 2025' },
  { initials: 'ЕН', bg: '#f4f5f9', color: '#0d0f1a', name: 'Елена Никулина', text: '«Помогли с ипотекой — нашли ставку 5.9% по семейной программе, хотя я уже думала, что нам не одобрят. Теперь живём в своей квартире!»', date: 'Декабрь 2024' },
  { initials: 'ДМ', bg: '#1bc8a0', color: 'white', name: 'Дмитрий Мухаметов', text: '«Арендовали офис через Udomo. Показали 5 вариантов за один день, подобрали договор под наши нужды. Всё чисто юридически.»', date: 'Ноябрь 2024' },
]

export default function Reviews() {
  return (
    <div className="sec wrap">
      <div className="sec-head" style={{ marginBottom: 40 }}>
        <div>
          <div className="sec-tag">Отзывы клиентов</div>
          <div className="sec-title">Нам доверяют</div>
          <div className="sec-sub">Более 1200 семей нашли свой дом через Udomo</div>
        </div>
      </div>

      <div className="reviews-grid">
        {REVIEWS.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-top">
              <div className="review-avatar" style={{ background: r.bg, color: r.color }}>{r.initials}</div>
              <div>
                <div className="review-name">{r.name}</div>
                <div className="review-stars">★★★★★</div>
              </div>
              <div className="review-source">2ГИС</div>
            </div>
            <div className="review-text">{r.text}</div>
            <div className="review-date">{r.date}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <a
          className="btn btn-outline"
          href="https://2gis.ru/ufa/search/udomo/firm/70000001044437049/55.948162%2C54.737867/tab/reviews"
          target="_blank"
          rel="noopener noreferrer"
        >
          Все отзывы на 2ГИС →
        </a>
      </div>
    </div>
  )
}
