'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    homereserve: {
      initWidgetList: (options: { token: string; tag: string }) => void
    }
  }
}

export default function RentPage() {
  useEffect(() => {
    const script1 = document.createElement('script')
    script1.type = 'module'
    script1.src = 'https://homereserve.ru/widget.js'

    const script2 = document.createElement('script')
    script2.type = 'module'
    script2.textContent = `window.homereserve.initWidgetList({"token":"tUEHA6xivX","tag":"udomo.ru"})`

    script1.onload = () => document.body.appendChild(script2)
    document.body.appendChild(script1)

    return () => {
      script1.remove()
      script2.remove()
    }
  }, [])

  return (
    <main>
      <div className="wrap" style={{ paddingTop: 96, paddingBottom: 64 }}>
        <h1 className="sec-title" style={{ marginBottom: 8 }}>Аренда</h1>
        <p className="sec-sub" style={{ marginBottom: 40 }}>Посуточная и долгосрочная аренда объектов под управлением UDOMO</p>
        <div id="hr-widget" />
      </div>
    </main>
  )
}
