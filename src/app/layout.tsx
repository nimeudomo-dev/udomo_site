import type { Metadata } from 'next'
import '@/styles/globals.css'
import ClientLayout from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: 'Udomo — Недвижимость в Уфе',
  description: 'Купить, продать или арендовать недвижимость в Уфе. Собственные коттеджные посёлки, управляющая компания.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
