// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx  ← CRUCIAL (Slide 19)
// ─────────────────────────────────────────────────────────────────────────────
// Lazy-load heavy pages with React.lazy() + Suspense.
//
// HOW IT WORKS:
//  - lazy(() => import('./pages/ReportsPage')) tells Vite to split that
//    module into its own bundle chunk.
//  - The chunk is downloaded only when the user first navigates to /reports.
//  - <Suspense fallback={…}> renders the fallback UI while the chunk loads.
//
// WHY IT MATTERS:
//  - Reduces initial bundle size → faster first load.
//  - Works out of the box with Vite — no extra config needed.
// ─────────────────────────────────────────────────────────────────────────────
import { lazy, Suspense } from 'react'
import { Routes, Route, NavLink } from 'react-router'
import DashboardPage from './pages/DashboardPage.jsx'

// ── lazy()  ← CRUCIAL ─────────────────────────────────────────────────────────
// ReportsPage is NOT imported at the top of the file like a normal import.
// React.lazy wraps a dynamic import — Vite treats this as a code-split point.
const ReportsPage  = lazy(() => import('./pages/ReportsPage.jsx'))
const CoursesPage  = lazy(() => import('./pages/CoursesPage.jsx'))

export default function App() {
  return (
    <>
      <nav style={navStyle}>
        <NavLink to="/"        style={linkStyle} className={activeClass}>Dashboard</NavLink>
        <NavLink to="/reports" style={linkStyle} className={activeClass}>Reports</NavLink>
        <NavLink to="/courses" style={linkStyle} className={activeClass}>Courses</NavLink>
      </nav>

      {/* ── Suspense  ← CRUCIAL ───────────────────────────────────────────────
          Wrap the Routes in Suspense so React can show fallback UI while
          the lazy chunk is being downloaded.
          The fallback can be anything: a spinner, skeleton, or simple text.  */}
      <Suspense fallback={<p style={{ padding: '2rem' }}>Loading page…</p>}>
        <Routes>
          <Route path="/"        element={<DashboardPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

// ── Inline styles ─────────────────────────────────────────────────────────────
const navStyle = {
  display: 'flex', gap: '1.25rem', padding: '0.75rem 1.25rem',
  background: '#1e293b', fontFamily: 'system-ui, sans-serif',
}
const linkStyle = { color: '#94a3b8', textDecoration: 'none', fontWeight: 500 }
const activeClass = ({ isActive }) => ({ ...linkStyle, color: isActive ? '#f1f5f9' : '#94a3b8' })
