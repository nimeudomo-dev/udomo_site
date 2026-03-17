export interface Property {
  id: number
  type: string
  deal: 'buy' | 'rent'
  price: number
  pricePerM2: number
  area: number
  rooms?: number
  floor?: number
  totalFloors?: number
  address: string
  district: string
  description: string
  images: string[]
  characteristics: { label: string; value: string }[]
  publishedAt: string
  isNew?: boolean
  isHot?: boolean
  lat?: number
  lon?: number
}

export const PROPERTIES: Property[] = [
  {
    id: 1001,
    type: 'Квартира',
    deal: 'buy',
    price: 5_800_000,
    pricePerM2: 92_063,
    area: 63,
    rooms: 2,
    floor: 7,
    totalFloors: 16,
    address: 'ул. Ленина, 42',
    district: 'Советский район',
    description: `Продаётся уютная двухкомнатная квартира с современным ремонтом. Квартира расположена на 7 этаже 16-этажного кирпичного дома в тихом дворе с детской площадкой.

Просторная кухня-гостиная 18 м², две изолированные спальни. Из окон открывается красивый вид на парк.

В квартире выполнен качественный евроремонт: натяжные потолки, ламинат 32 класса, встроенная кухня. Санузел раздельный, плитка Kerama Marazzi, тёплый пол.

Рядом школа №3, детский сад, супермаркет «Магнит», остановка общественного транспорта.`,
    images: [
      'https://picsum.photos/seed/apt1a/900/600',
      'https://picsum.photos/seed/apt1b/900/600',
      'https://picsum.photos/seed/apt1c/900/600',
      'https://picsum.photos/seed/apt1d/900/600',
    ],
    characteristics: [
      { label: 'Тип дома', value: 'Кирпичный' },
      { label: 'Год постройки', value: '2018' },
      { label: 'Состояние', value: 'Евроремонт' },
      { label: 'Санузел', value: 'Раздельный' },
      { label: 'Балкон', value: 'Есть' },
      { label: 'Лифт', value: 'Есть' },
    ],
    publishedAt: '2026-03-10',
    isNew: true,
  },
  {
    id: 1002,
    type: 'Квартира',
    deal: 'buy',
    price: 3_200_000,
    pricePerM2: 84_210,
    area: 38,
    rooms: 1,
    floor: 3,
    totalFloors: 9,
    address: 'пр. Октября, 115',
    district: 'Октябрьский район',
    description: `Продаётся однокомнатная квартира в хорошем состоянии. Чистая продажа, юридически свободна.

Удобное расположение — рядом остановки общественного транспорта, магазины, парк. До центра города 15 минут на машине.

Квартира светлая, окна выходят во двор. Возможна ипотека, материнский капитал.`,
    images: [
      'https://picsum.photos/seed/apt2a/900/600',
      'https://picsum.photos/seed/apt2b/900/600',
      'https://picsum.photos/seed/apt2c/900/600',
    ],
    characteristics: [
      { label: 'Тип дома', value: 'Панельный' },
      { label: 'Год постройки', value: '2005' },
      { label: 'Состояние', value: 'Хорошее' },
      { label: 'Санузел', value: 'Совмещённый' },
      { label: 'Балкон', value: 'Есть' },
      { label: 'Лифт', value: 'Есть' },
    ],
    publishedAt: '2026-03-08',
  },
  {
    id: 1003,
    type: 'Дом',
    deal: 'buy',
    price: 12_500_000,
    pricePerM2: 62_500,
    area: 200,
    floor: 2,
    totalFloors: 2,
    address: 'пос. Зубово, ул. Берёзовая, 14',
    district: 'Уфимский район',
    description: `Продаётся кирпичный дом 200 м² на участке 12 соток в живописном посёлке Зубово.

Два полноценных этажа: на первом — кухня-гостиная, кабинет, санузел; на втором — три спальни, ванная. Гараж на 2 машины, баня, беседка.

Все коммуникации подведены и подключены: газ, вода центральная, канализация центральная, электричество 220В/380В. Асфальтированная дорога до дома, охраняемый посёлок.

До выезда на трассу М-5 — 10 минут.`,
    images: [
      'https://picsum.photos/seed/house1a/900/600',
      'https://picsum.photos/seed/house1b/900/600',
      'https://picsum.photos/seed/house1c/900/600',
      'https://picsum.photos/seed/house1d/900/600',
      'https://picsum.photos/seed/house1e/900/600',
    ],
    characteristics: [
      { label: 'Материал', value: 'Кирпич' },
      { label: 'Участок', value: '12 соток' },
      { label: 'Гараж', value: 'На 2 машины' },
      { label: 'Газ', value: 'Подключён' },
      { label: 'Вода', value: 'Центральная' },
      { label: 'Канализация', value: 'Центральная' },
    ],
    publishedAt: '2026-03-05',
    isHot: true,
  },
  {
    id: 1004,
    type: 'Квартира',
    deal: 'buy',
    price: 8_900_000,
    pricePerM2: 98_888,
    area: 90,
    rooms: 3,
    floor: 12,
    totalFloors: 24,
    address: 'ул. Рихарда Зорге, 60',
    district: 'Кировский район',
    description: `Трёхкомнатная квартира в новом монолитном доме с панорамными видами на город и реку Белую.

Чистовая отделка от застройщика. Подземный паркинг (машиноместо в стоимость не включено). Закрытый двор с охраной, детская площадка.

Квартира угловая, три стороны света. Большие окна от пола до потолка. Высокие потолки — 3,1 м.`,
    images: [
      'https://picsum.photos/seed/apt3a/900/600',
      'https://picsum.photos/seed/apt3b/900/600',
      'https://picsum.photos/seed/apt3c/900/600',
    ],
    characteristics: [
      { label: 'Тип дома', value: 'Монолитный' },
      { label: 'Год постройки', value: '2024' },
      { label: 'Состояние', value: 'Чистовая отделка' },
      { label: 'Санузел', value: 'Раздельный' },
      { label: 'Балкон', value: '2 лоджии' },
      { label: 'Высота потолков', value: '3,1 м' },
    ],
    publishedAt: '2026-03-12',
    isNew: true,
  },
  {
    id: 1005,
    type: 'Коммерческая',
    deal: 'rent',
    price: 527_500,
    pricePerM2: 500,
    area: 1055,
    floor: 1,
    totalFloors: 1,
    address: 'ул. Самаркандская, д 1/2',
    district: 'Уфа',
    description: `Сдаётся в долгосрочную аренду склад площадью 1055 м².

Преимущества объекта:
• удобное территориальное расположение — рядом крупные транспортные развязки (проспект Салавата Юлаева, проспект Октября)
• высота потолка — 12 метров
• беспылевые полы
• есть санузел и комната для приёма пищи
• территория охраняется круглосуточно

Коммуникации: центральное отопление и водопровод, электричество 380 Вольт, мощность 100 кВт (есть возможность увеличения), возможность подключения к разным провайдерам интернета.

Условия аренды: цена — 500 рублей за м² (отопление уже включено в стоимость, без НДС). Коммунальные платежи оплачиваются отдельно. Сдача от собственника — без дополнительных комиссий.`,
    images: [
      'https://picsum.photos/seed/ware1a/900/600',
      'https://picsum.photos/seed/ware1b/900/600',
      'https://picsum.photos/seed/ware1c/900/600',
      'https://picsum.photos/seed/ware1d/900/600',
    ],
    characteristics: [
      { label: 'Этажность', value: '1 / 1' },
      { label: 'Высота потолков', value: '12 м' },
      { label: 'Отделка', value: 'Типовой ремонт' },
      { label: 'Вход', value: 'Общий со двора' },
      { label: 'Тип НДС', value: 'НДС не включён' },
      { label: 'Электричество', value: '380В, 100 кВт' },
    ],
    publishedAt: '2026-03-01',
  },
  {
    id: 1006,
    type: 'Офис',
    deal: 'rent',
    price: 200_000,
    pricePerM2: 915,
    area: 218,
    floor: 1,
    totalFloors: 10,
    address: 'ул. Карла Маркса, д 60',
    district: 'Уфа',
    description: `Сдаётся офисное помещение 218,4 м² в бизнес-центре класса B+ в центре Уфы.

Открытая планировка с возможностью разбивки на кабинеты. Панорамное остекление. Парковка для сотрудников и гостей.

В стоимость включено: уборка, охрана, интернет. Коммунальные платежи по счётчикам.`,
    images: [
      'https://picsum.photos/seed/office1a/900/600',
      'https://picsum.photos/seed/office1b/900/600',
      'https://picsum.photos/seed/office1c/900/600',
    ],
    characteristics: [
      { label: 'Класс', value: 'B+' },
      { label: 'Этаж', value: '1 / 10' },
      { label: 'Состояние', value: 'Офисная отделка' },
      { label: 'Парковка', value: 'Есть' },
      { label: 'Интернет', value: 'Включён' },
      { label: 'Тип НДС', value: 'НДС не включён' },
    ],
    publishedAt: '2026-03-03',
  },
  {
    id: 1007,
    type: 'Квартира',
    deal: 'rent',
    price: 28_000,
    pricePerM2: 444,
    area: 63,
    rooms: 2,
    floor: 5,
    totalFloors: 10,
    address: 'ул. Чернышевского, 31',
    district: 'Центр',
    description: `Сдаётся двухкомнатная квартира в самом центре Уфы. Полностью меблирована, вся бытовая техника.

Интернет включён в стоимость. Чистая, ухоженная квартира — состояние отличное. Без животных.

Залог — 1 месяц. Минимальный срок аренды — 6 месяцев.`,
    images: [
      'https://picsum.photos/seed/rent1a/900/600',
      'https://picsum.photos/seed/rent1b/900/600',
      'https://picsum.photos/seed/rent1c/900/600',
    ],
    characteristics: [
      { label: 'Мебель', value: 'Полностью' },
      { label: 'Техника', value: 'Вся' },
      { label: 'Интернет', value: 'Включён' },
      { label: 'Залог', value: '28 000 ₽' },
      { label: 'Минимальный срок', value: '6 месяцев' },
      { label: 'Животные', value: 'Не разрешены' },
    ],
    publishedAt: '2026-03-11',
  },
  {
    id: 1008,
    type: 'Участок',
    deal: 'buy',
    price: 2_100_000,
    pricePerM2: 1_400,
    area: 1500,
    address: 'СНТ «Рассвет», уч. 47',
    district: 'Демский район',
    description: `Продаётся земельный участок 15 соток в СНТ «Рассвет». Категория земли — земли населённых пунктов, ВРИ — ИЖС.

Участок ровный, прямоугольный, полностью огорожен. Электричество на участке (15 кВт). Газопровод по улице — подключение по желанию.

Хорошая транспортная доступность: 20 минут до центра города.`,
    images: [
      'https://picsum.photos/seed/land1a/900/600',
      'https://picsum.photos/seed/land1b/900/600',
    ],
    characteristics: [
      { label: 'Площадь', value: '15 соток' },
      { label: 'Категория', value: 'ИЖС' },
      { label: 'Электричество', value: '15 кВт' },
      { label: 'Газ', value: 'По улице' },
      { label: 'Ограждение', value: 'Есть' },
      { label: 'Рельеф', value: 'Ровный' },
    ],
    publishedAt: '2026-03-07',
  },
]
