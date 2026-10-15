// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx  ← CRUCIAL (Slide 15)
// ─────────────────────────────────────────────────────────────────────────────
// Custom hooks: reusable stateful behaviour.
// Move state + effects OUT of visual components into named use* functions.
//
// useDebouncedValue: waits `delay` ms after the last change before updating.
// Useful for search inputs — avoids filtering/fetching on every keystroke.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'

const COURSES = [
  { id: 'r101', title: 'React Fundamentals' },
  { id: 'r201', title: 'React Router' },
  { id: 'r301', title: 'React Hooks' },
  { id: 'r401', title: 'State Management' },
  { id: 'r501', title: 'Performance Optimisation' },
]

// ── useDebouncedValue  ← CRUCIAL ─────────────────────────────────────────────
// Accepts a value and a delay (ms). Returns a version of the value that only
// updates after the user has stopped typing for `delay` milliseconds.
// The cleanup function clears the timer if value changes before it fires.
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)  // ← cleanup cancels previous timer
  }, [value, delay])

  return debounced
}

// ── SearchCourses component ───────────────────────────────────────────────────
// Uses the hook — no timer logic lives in this component.
function SearchCourses({ courses }) {
  const [query, setQuery] = useState('')
  const slowQuery = useDebouncedValue(query, 400)   // ← only updates after 400 ms

  const results = courses.filter((c) =>
    c.title.toLowerCase().includes(slowQuery.toLowerCase()),
  )

  return (
    <section>
      <input
        type="search"
        placeholder="Search courses… (debounced 400 ms)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={inputStyle}
        aria-label="Search courses"
      />
      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>
        Live value: <code>{query || '—'}</code> &nbsp;|&nbsp;
        Debounced: <code>{slowQuery || '—'}</code>
      </p>
      {results.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No results.</p>
      ) : (
        <ul style={{ listStyle: 'none' }}>
          {results.map((c) => (
            <li key={c.id} style={cardStyle}>{c.title}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: 480 }}>
      <h1>06 · Custom Hook — useDebouncedValue</h1>
      <SearchCourses courses={COURSES} />
    </main>
  )
}

const inputStyle = {
  display: 'block', width: '100%', padding: '0.5rem 0.75rem',
  border: '1px solid #cbd5e1', borderRadius: '6px',
  fontSize: '1rem', marginBottom: '0.5rem',
}
const cardStyle = {
  background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px',
  padding: '0.75rem 1rem', marginBottom: '0.5rem',
}
