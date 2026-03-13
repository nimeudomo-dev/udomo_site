-- Запусти этот SQL в Supabase → SQL Editor

create table leads (
  id bigint generated always as identity primary key,
  name text,
  phone text not null,
  source text default 'cta_form',
  created_at timestamptz default now()
);

create table properties (
  id bigint generated always as identity primary key,
  title text not null,
  category text not null,
  price bigint not null,
  area numeric,
  address text,
  description text,
  image_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

insert into properties (title, category, price, area, address, description, image_url) values
  ('КА Идея, 2-комн.', 'novostr', 5200000, 62, 'ул. Ленина 45', 'Современная квартира с отделкой', 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80'),
  ('КП Панорама 27, дом 120м²', 'doma', 8900000, 120, 'Уфимский район', 'Коттедж у леса, все коммуникации', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'),
  ('Вторичка, 3-комн.', 'vtorichka', 4100000, 78, 'пр. Октября 12', 'Чистая юридически, торг уместен', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80'),
  ('Офис 45м²', 'commercial', 3500000, 45, 'ул. Цюрупы 8', 'Отдельный вход, парковка', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80');

alter table properties enable row level security;
create policy "public read" on properties for select using (true);

alter table leads enable row level security;
create policy "public insert" on leads for insert with check (true);
