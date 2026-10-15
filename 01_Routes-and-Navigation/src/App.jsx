// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx  ← CRUCIAL (Slide 9)
// ─────────────────────────────────────────────────────────────────────────────
// Declares the route table.
// <NavLink> automatically gets class="active" when its `to` matches the URL —
// no manual logic needed.
// Pages are still ordinary React components; the router decides when to show them.
// ─────────────────────────────────────────────────────────────────────────────
import { Routes, Route, NavLink } from 'react-router'

// Page components — each is a plain React component
function DashboardPage() {
  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome! Select a course from the <strong>Courses</strong> page.</p>
    </main>
  )
}

function CoursesPage() {
  return (
    <main>
      <h1>Courses</h1>
      <p>Course list lives here.</p>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main>
      <h1>404 — Page not found</h1>
    </main>
  )
}

export default function App() {
  return (
    <>
      {/* NavLink gives the matched link an "active" class automatically */}
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/courses">Courses</NavLink>
      </nav>

      {/* Route table — pages are matched top-to-bottom */}
      <Routes>
        <Route path="/"        element={<DashboardPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        {/* Catch-all 404 */}
        <Route path="*"        element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
