// ─────────────────────────────────────────────────────────────────────────────
// src/pages/ReportsPage.jsx  ← CRUCIAL (Slide 19)
// ─────────────────────────────────────────────────────────────────────────────
// This file is loaded LAZILY — it is NOT included in the main bundle.
// Vite splits it into its own chunk and only downloads it when the user
// navigates to /reports for the first time.
//
// To verify: run `npm run build` and check the dist/ folder.
// You will see a separate chunk file for this page.
// ─────────────────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Reports</h1>
      <p>
        This page was <strong>lazy-loaded</strong> — it lives in a separate
        bundle chunk and was only downloaded when you navigated here.
      </p>
      <p style={{ marginTop: '0.75rem', color: '#64748b', fontSize: '0.9rem' }}>
        Open the Network tab in DevTools and hard-refresh. Navigate to this
        page and watch a new JS chunk load on demand.
      </p>
    </main>
  )
}
