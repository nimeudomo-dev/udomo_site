-- ══════════════════════════════════════════
-- UDOMO — Структура базы данных
-- Выполни это в: Supabase → SQL Editor → New query
-- ══════════════════════════════════════════


-- ── Таблица заявок ─────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT,
  phone       TEXT NOT NULL,
  source      TEXT DEFAULT 'сайт',   -- 'форма', 'звонок', 'калькулятор'
  goal        TEXT,                   -- 'купить', 'аренда', 'консультация'
  status      TEXT DEFAULT 'новая',  -- 'новая', 'в работе', 'закрыта'
  note        TEXT,                   -- комментарий менеджера
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ── Таблица объектов недвижимости ──────────
CREATE TABLE IF NOT EXISTS properties (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,          -- 'КП Панорама 27'
  category    TEXT NOT NULL,          -- 'novostr', 'doma', 'vtorichka', 'commercial', 'arenda'
  tag         TEXT,                   -- 'Коттеджный посёлок'
  description TEXT,
  price       BIGINT,                 -- цена в рублях
  price_text  TEXT,                   -- 'от 4 500 000 ₽'
  area        NUMERIC,                -- площадь м²
  rooms       INT,                    -- кол-во комнат
  floor       INT,
  floors      INT,                    -- этажей в доме
  address     TEXT,
  image_url   TEXT,                   -- ссылка на фото
  active      BOOLEAN DEFAULT TRUE,
  featured    BOOLEAN DEFAULT FALSE,  -- показывать на главной
  size        TEXT DEFAULT 'small',   -- 'big' или 'small' для сетки
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ── Тестовые объекты ───────────────────────
INSERT INTO properties (title, category, tag, description, price_text, image_url, featured, size) VALUES
  ('КА Идея', 'novostr', 'Жилой комплекс', 'Современные квартиры в сердце Уфы с продуманными планировками', 'от 3 200 000 ₽', 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80', true, 'big'),
  ('КП Панорама 27', 'doma', 'Коттеджный посёлок', 'Загородная жизнь нового уровня в 20 минутах от центра', 'от 6 500 000 ₽', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80', true, 'big'),
  ('КП Панорама 14', 'doma', 'Коттеджный посёлок', 'Уютные дома у леса с собственной инфраструктурой', 'от 4 800 000 ₽', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', true, 'small'),
  ('Вторичка', 'vtorichka', 'Готовое жильё', 'Проверенные квартиры с юридической чистотой и торгом', 'от 2 500 000 ₽', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', true, 'small'),
  ('Аренда', 'arenda', 'Управляющая компания', 'Доверительное управление и посуточная аренда под ключ', NULL, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', true, 'small'),
  ('Офисы и торговые площади', 'commercial', 'Коммерческая', 'Коммерческая недвижимость в Уфе для бизнеса любого масштаба', 'от 1 800 000 ₽', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80', true, 'big');


-- ── Права доступа (RLS) ────────────────────
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Объекты видны всем
CREATE POLICY "properties_public_read" ON properties
  FOR SELECT USING (active = true);

-- Заявки — только через service_role (API)
CREATE POLICY "leads_service_only" ON leads
  FOR ALL USING (false);
