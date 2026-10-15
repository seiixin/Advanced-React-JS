// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx  ← CRUCIAL (Slide 18)
// ─────────────────────────────────────────────────────────────────────────────
// Performance: render smarter, not more.
// Rule: measure first — don't optimise until you have a real bottleneck.
//
//  useMemo     → memoize expensive derived values (filtered/sorted lists)
//  useCallback → stable function reference so memoized children don't re-render
//  React.memo  → skip re-renders when props haven't changed
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useMemo, useCallback, memo } from 'react'

const ALL_COURSES = [
  { id: 'r101', title: 'React Fundamentals', capacity: 30 },
  { id: 'r201', title: 'React Router',        capacity: 25 },
  { id: 'r301', title: 'React Hooks',          capacity: 20 },
  { id: 'r401', title: 'State Management',     capacity: 35 },
  { id: 'r501', title: 'Performance',          capacity: 15 },
]

// ── React.memo  ← CRUCIAL ─────────────────────────────────────────────────────
// CourseItem only re-renders when its own props change.
// Without memo, it would re-render every time the parent re-renders.
const CourseItem = memo(function CourseItem({ course, onRemove }) {
  console.log(`render: ${course.title}`)   // open console to watch renders
  return (
    <li style={cardStyle}>
      <span>{course.title}</span>
      <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Cap: {course.capacity}</span>
      <button onClick={() => onRemove(course.id)} style={dangerBtnStyle}>
        Remove
      </button>
    </li>
  )
})

export default function App() {
  const [search,  setSearch]  = useState('')
  const [removed, setRemoved] = useState(new Set())
  const [tick,    setTick]    = useState(0)  // unrelated state to trigger re-renders

  // ── useMemo  ← CRUCIAL ──────────────────────────────────────────────────────
  // Only recomputes when `search` or `removed` change.
  // Without useMemo this would recompute on EVERY render (including `tick`).
  const filteredCourses = useMemo(() => {
    console.log('useMemo: recomputing filtered list')
    return ALL_COURSES
      .filter((c) => !removed.has(c.id))
      .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
  }, [search, removed])

  // ── useCallback  ← CRUCIAL ──────────────────────────────────────────────────
  // Returns the same function reference across renders.
  // Without useCallback, a new function is created each render, which would
  // break React.memo on CourseItem (new prop = re-render).
  const handleRemove = useCallback((id) => {
    setRemoved((prev) => new Set([...prev, id]))
  }, [])  // no dependencies — never needs to be recreated

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: 520 }}>
      <h1>08 · useMemo + useCallback + React.memo</h1>
      <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.875rem' }}>
        Open the browser console to watch when useMemo recomputes and when
        CourseItem re-renders.
      </p>

      <input
        type="search"
        placeholder="Filter courses…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={inputStyle}
        aria-label="Filter courses"
      />

      {/* Tick button triggers a parent re-render unrelated to courses */}
      <button onClick={() => setTick((n) => n + 1)} style={secondaryBtnStyle}>
        Unrelated re-render (tick: {tick})
      </button>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0.5rem 0 1rem' }}>
        ↑ Does NOT recompute useMemo or re-render React.memo items.
      </p>

      {filteredCourses.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No courses.</p>
      ) : (
        <ul style={{ listStyle: 'none' }}>
          {filteredCourses.map((c) => (
            <CourseItem key={c.id} course={c} onRemove={handleRemove} />
          ))}
        </ul>
      )}
    </main>
  )
}

const inputStyle = {
  display: 'block', width: '100%', padding: '0.5rem 0.75rem',
  border: '1px solid #cbd5e1', borderRadius: '6px',
  fontSize: '1rem', marginBottom: '0.75rem',
}
const cardStyle = {
  display: 'flex', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center',
  background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px',
  padding: '0.75rem 1rem', marginBottom: '0.5rem',
}
const dangerBtnStyle = {
  padding: '0.3rem 0.65rem', background: '#fee2e2', color: '#dc2626',
  border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem',
}
const secondaryBtnStyle = {
  padding: '0.4rem 0.9rem', background: '#f1f5f9', color: '#475569',
  border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer',
}
