// src/pages/DashboardPage.jsx
// This page is loaded eagerly (part of the main bundle).
export default function DashboardPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Dashboard</h1>
      <p>This page is in the <strong>main bundle</strong> — no lazy loading here.</p>
    </main>
  )
}
