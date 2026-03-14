'use client'
import { useState, useCallback } from 'react'

function fmt(n: number): string {
  return Math.round(n).toLocaleString('ru-RU')
}

function parse(s: string): number {
  return parseFloat(s.replace(/\s/g, '').replace(',', '.')) || 0
}

export default function Mortgage({ onScrollToCta }: { onScrollToCta: () => void }) {
  const [price, setPrice] = useState('4 000 000')
  const [down, setDown] = useState('1 200 000')
  const [years, setYears] = useState('20')
  const [rate, setRate] = useState('10.5')
  const [mapcapOn, setMapcapOn] = useState(false)
  const [mapcap, setMapcap] = useState('631 000')

  const calc = useCallback(() => {
    const p = parse(price)
    const d = parse(down)
    const y = parseFloat(years) || 20
    const r = parseFloat(rate) || 10.5
    const mc = mapcapOn ? parse(mapcap) : 0
    const loan = Math.max(0, p - d - mc)
    const rMo = r / 100 / 12
    const n = y * 12
    const monthly = rMo > 0 && n > 0
      ? loan * rMo * Math.pow(1 + rMo, n) / (Math.pow(1 + rMo, n) - 1)
      : n > 0 ? loan / n : 0
    const total = monthly * n
    return { monthly, loan, overpay: total - loan, total, income: monthly / 0.3 }
  }, [price, down, years, rate, mapcapOn, mapcap])

  const r = calc()

  return (
    <div className="sec wrap" >
      <div className="sec-head" style={{ marginBottom: 24 }}>
        <div>
          <div className="sec-tag">Ипотека</div>
          <div className="sec-title">Калькулятор ипотеки</div>
          <div className="sec-sub">Рассчитайте ежемесячный платёж и подберите выгодные условия.</div>
        </div>
      </div>

      <div className="mort-wrap">
        <div className="mort-left">
          <div className="mort-fields">
            <div className="mort-row-2">
              <div className="mort-field">
                <label className="mort-label">Стоимость недвижимости, ₽</label>
                <input className="mort-input" id="mPrice" type="text" value={price}
                  onChange={e => setPrice(e.target.value)} />
              </div>
              <div className="mort-field">
                <label className="mort-label">Первоначальный взнос, ₽</label>
                <input className="mort-input" id="mDown" type="text" value={down}
                  onChange={e => setDown(e.target.value)} />
              </div>
            </div>
            <div className="mort-row-2">
              <div className="mort-field">
                <label className="mort-label">Срок, лет</label>
                <input className="mort-input" id="mYears" type="number" value={years} min="1" max="30"
                  onChange={e => setYears(e.target.value)} />
              </div>
              <div className="mort-field">
                <label className="mort-label">Ставка, %</label>
                <input className="mort-input" id="mRate" type="number" value={rate} step="0.1" min="0.1"
                  onChange={e => setRate(e.target.value)} />
              </div>
            </div>
            <div className="mort-row-2" style={{ alignItems: 'end' }}>
              <div className="mort-field">
                <div className="mort-toggle-row" onClick={() => setMapcapOn(!mapcapOn)} style={{ height: 52 }}>
                  <span className="mort-toggle-label">Использовать МСК</span>
                  <div className="mort-toggle-track" id="mapcapTrack"
                    style={{ background: mapcapOn ? '#1bc8a0' : 'rgba(0,0,0,.12)' }}>
                    <div className="mort-toggle-thumb" id="mapcapThumb"
                      style={{ transform: mapcapOn ? 'translateX(20px)' : 'translateX(0)' }} />
                  </div>
                </div>
              </div>
              {mapcapOn && (
                <div className="mort-field">
                  <label className="mort-label">Сумма МСК, ₽</label>
                  <input className="mort-input" id="mMapcapVal" type="text" value={mapcap}
                    onChange={e => setMapcap(e.target.value)} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mort-right">
          <div className="mort-result-main">
            <div className="mort-monthly" id="mMonthly">
              {fmt(r.monthly)} <span>₽</span>
            </div>
            <div className="mort-monthly-lbl">Ежемесячный платёж</div>
          </div>
          <div className="mort-divider"></div>
          <div className="mort-results-grid">
            <div className="mort-res-item">
              <div className="mort-res-val" id="mLoan">{fmt(r.loan)} ₽</div>
              <div className="mort-res-lbl">Сумма кредита</div>
            </div>
            <div className="mort-res-item">
              <div className="mort-res-val" id="mOverpay">{fmt(r.overpay)} ₽</div>
              <div className="mort-res-lbl">Переплата по кредиту</div>
            </div>
            <div className="mort-res-item">
              <div className="mort-res-val" id="mTotal">{fmt(r.total)} ₽</div>
              <div className="mort-res-lbl">Общая выплата</div>
            </div>
            <div className="mort-res-item">
              <div className="mort-res-val" id="mIncome">{fmt(r.income)} ₽</div>
              <div className="mort-res-lbl">Рекомендуемый доход</div>
            </div>
          </div>
          <button className="mort-cta" onClick={onScrollToCta}>
            Подобрать ипотеку →
          </button>
        </div>
      </div>
    </div>
  )
}
