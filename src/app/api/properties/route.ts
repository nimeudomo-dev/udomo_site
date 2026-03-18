import { XMLParser } from 'fast-xml-parser'
import type { Property } from '@/data/properties'

export const revalidate = 300 // кэш 5 минут

const FEED_URL = 'https://udomo.vtcrm.ru/xmlgen/WebsiteFeed.xml'

function str(v: unknown): string {
  if (v === undefined || v === null) return ''
  return String(v)
}

function decodeHtml(s: string): string {
  return s
    .replace(/&#13;|&#xD;/gi, '')
    .replace(/&#10;|&#xA;/gi, '\n')
    .replace(/&mdash;/gi, '—')
    .replace(/&ndash;/gi, '–')
    .replace(/&laquo;/gi, '«')
    .replace(/&raquo;/gi, '»')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&nbsp;/gi, '\u00a0')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function num(v: unknown): number {
  const n = parseFloat(str(v))
  return isNaN(n) ? 0 : n
}

function normalizeAddress(addr: string): string {
  return addr
    // Убираем вариации "Республика Башкортостан"
    .replace(/Республика\s+Башкортостан,?\s*/gi, '')
    .replace(/Респ\.?\s*Башкортостан,?\s*/gi, '')
    .replace(/РБ,?\s*/g, '')
    // Убираем "городской округ Уфа," и "г\.о\. Уфа,"
    .replace(/городской\s+округ\s+[^,]+,?\s*/gi, '')
    .replace(/г\.?\s*о\.?\s*[^,]+,?\s*/gi, '')
    // Нормализуем "г Уфа" / "г. Уфа" → "Уфа"
    .replace(/^г\.?\s+/i, '')
    .replace(/,\s*г\.?\s+(\S)/g, ', $1')
    // Убираем лишние запятые и пробелы
    .replace(/^,\s*/, '')
    .replace(/,\s*,/g, ',')
    .trim()
}

function getImages(raw: unknown): string[] {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean)
  return [String(raw)]
}

function mapType(category: string, commercialType?: string): string {
  switch (category) {
    case 'квартира':    return 'Вторичная'
    case 'дом':
    case 'дача':        return 'Дом / Коттедж'
    case 'таунхаус':    return 'Таунхаус'
    case 'участок':     return 'Земельный участок'
    case 'гараж':        return 'Гараж'
    case 'апартаменты':  return 'Апартаменты'
    case 'комната':      return 'Комната'
    case 'commercial': {
      const ct = (commercialType || '').toLowerCase()
      if (ct === 'office')         return 'Офис'
      if (ct === 'warehouse')      return 'Склад'
      if (ct === 'retail')         return 'Торговое'
      if (ct === 'production')     return 'Производство'
      if (ct === 'free-purpose')   return 'ПСН'
      if (ct === 'building')       return 'Здание'
      if (ct === 'hotel')          return 'Гостиница'
      if (ct === 'catering')       return 'Общепит'
      if (ct === 'ready-business') return 'Готовый бизнес'
      if (ct === 'land')           return 'Коммерческая земля'
      return 'Коммерческая'
    }
    default: return category || 'Объект'
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildCharacteristics(offer: any, category: string): { label: string; value: string }[] {
  const c: { label: string; value: string }[] = []

  const add = (label: string, val: unknown, fmt?: (v: string) => string) => {
    const s = str(val)
    if (s) c.push({ label, value: fmt ? fmt(s) : s })
  }

  const yn = (v: unknown) => {
    const s = str(v).toLowerCase()
    return (s === 'yes' || s === 'есть' || s === 'true' || s === '1') ? 'Есть' : 'Нет'
  }

  // Этаж
  if (category !== 'участок') {
    const fl = str(offer.floor)
    const tot = str(offer['floors-total'])
    if (fl && tot) c.push({ label: 'Этаж', value: `${fl} из ${tot}` })
    else if (fl)   c.push({ label: 'Этаж', value: fl })
  }

  // Площади
  add('Жилая площадь',   offer['living-space']?.value  || offer['living-space'],  v => `${v} м²`)
  add('Площадь кухни',   offer['kitchen-space']?.value || offer['kitchen-space'], v => `${v} м²`)
  add('Площадь участка', offer['lot-area']?.value,      v => `${v} м²`)

  // Здание
  add('Тип дома',        offer['building-type'])
  add('Серия дома',      offer['series'])
  add('Год постройки',   offer['built-year'])
  add('Высота потолков', offer['ceiling-height'], v => `${v} м`)

  // Состояние / отделка
  add('Состояние',       offer.renovation)

  // Санузел, балкон
  add('Санузел',         offer['bathroom-unit'])
  add('Балкон/лоджия',   offer.balcony)

  // Лифт, мусоропровод
  if (str(offer.lift))          add('Лифт',          offer.lift,          yn)
  if (str(offer['rubbish-chute'])) add('Мусоропровод', offer['rubbish-chute'], yn)

  // Парковка
  add('Парковка',        offer['parking-type'])

  // Коммерческая
  add('Вид коммерции',   offer['commercial-type'])

  // Коммуникации
  const utils = offer.utilities
  if (utils) {
    if (str(utils['gas-supply']))         add('Газ',           utils['gas-supply'],          yn)
    if (str(utils['water-supply']))       add('Вода',          utils['water-supply'],         yn)
    if (str(utils['electricity-supply'])) add('Электричество', utils['electricity-supply'],   yn)
    if (str(utils['sewerage-supply']))    add('Канализация',   utils['sewerage-supply'],      yn)
  }

  // Ипотека, мебель
  if (str(offer.mortgage))   add('Ипотека',  offer.mortgage,   yn)
  if (str(offer.furniture))  add('Мебель',   offer.furniture,  yn)

  return c
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOffer(offer: any): Property | null {
  try {
    const category = str(offer.category).toLowerCase()
    const buildSt  = str(offer['building-state']).toLowerCase()

    // Исключаем новостройки
    if (category === 'новостройка' || buildSt === 'новостройка') return null

    const id   = parseInt(str(offer['@_internal-id'])) || 0
    const deal: 'buy' | 'rent' = str(offer.type).toLowerCase() === 'аренда' ? 'rent' : 'buy'
    const price = num(offer.price?.value)

    const area = category === 'участок'
      ? (num(offer['lot-area']?.value) || num(offer.area?.value))
      : num(offer.area?.value)

    const pricePerM2 = area > 0 ? Math.round(price / area) : 0

    const loc      = offer.location || {}
    const address  = normalizeAddress(str(loc['address-full'] || loc.address || loc.street || ''))
    const localityRaw = str(loc['locality-name'] || loc.region || '')
    const district = localityRaw && !address.toLowerCase().includes(localityRaw.toLowerCase()) ? localityRaw : ''

    const images      = getImages(offer.image)
    const description = decodeHtml(str(offer.description))
    const publishedAt = str(offer['creation-date'] || offer['last-update-date'] || '').split('T')[0]

    const floor       = offer.floor            ? parseInt(str(offer.floor))            : undefined
    const totalFloors = offer['floors-total']  ? parseInt(str(offer['floors-total']))  : undefined
    const isStudio    = str(offer.studio) === 'true' || str(offer.studio) === '1'
    const roomsRaw    = offer.rooms ? parseInt(str(offer.rooms)) : undefined
    const rooms       = isStudio ? 0 : roomsRaw

    const type = mapType(category, str(offer['commercial-type']))

    const lat = offer.location?.latitude  ? parseFloat(str(offer.location.latitude))  : undefined
    const lon = offer.location?.longitude ? parseFloat(str(offer.location.longitude)) : undefined

    return {
      id,
      type,
      deal,
      price,
      pricePerM2,
      area,
      rooms:      rooms !== undefined ? rooms : undefined,
      floor,
      totalFloors,
      address,
      district,
      description,
      images,
      characteristics: buildCharacteristics(offer, category),
      publishedAt,
      lat: lat && !isNaN(lat) ? lat : undefined,
      lon: lon && !isNaN(lon) ? lon : undefined,
    }
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const resp = await fetch(FEED_URL, {
      next: { revalidate: 300 },
      headers: { Accept: 'application/xml, text/xml, */*' },
    })

    if (!resp.ok) throw new Error(`Feed returned ${resp.status}`)

    const xml = await resp.text()

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      isArray: (name) => ['offer', 'image'].includes(name),
    })

    const root = parser.parse(xml)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const offers: any[] = root['realty-feed']?.offer ?? []

    const properties = offers
      .map(mapOffer)
      .filter((p): p is Property => p !== null)

    return Response.json(properties)
  } catch (err) {
    console.error('[/api/properties] Feed error:', err)
    return Response.json([])
  }
}
