export default function LegalPage({ title, date, children }: {
  title: string
  date: string
  children: React.ReactNode
}) {
  return (
    <main>
      <div className="wrap" style={{ paddingTop: 96, paddingBottom: 64 }}>
        <div style={{ maxWidth: 800 }}>
          <h1 className="legal-title">{title}</h1>
          <p className="legal-date">Дата последнего обновления: {date}</p>
          <div className="legal-body">{children}</div>
        </div>
      </div>
    </main>
  )
}
