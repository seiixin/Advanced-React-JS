// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx  ← CRUCIAL (Slide 14)
// ─────────────────────────────────────────────────────────────────────────────
// Effects: Fetch with loading, error, and cleanup.
//
// KEY POINTS:
//  1. AbortController prevents state updates on unmounted components.
//  2. Return a cleanup function from useEffect to cancel the request.
//  3. Always handle all three states: loading / error / success.
//  4. useEffect dependency array controls when the fetch re-runs.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'

// ── useCourses  ← CRUCIAL ─────────────────────────────────────────────────────
// Extracts all the fetch logic away from the visual component.
// The component just calls useCourses() and renders whatever it returns.
function useCourses() {
  const [courses, setCourses]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [error,   setError]     = useState('')

  useEffect(() => {
    // AbortController lets us cancel the in-flight request on cleanup
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError('')
        // Using a public mock API so the demo works without a backend
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/users?_limit=5',
          { signal: controller.signal },
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        // Reshape to match our Course shape { id, title, capacity }
        setCourses(
          data.map((u, i) => ({
            id:       String(u.id),
            title:    u.name,
            capacity: (i + 1) * 5,
          })),
        )
      } catch (err) {
        if (err.name === 'AbortError') return   // cleanup — ignore
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()

    // Cleanup: cancel the fetch if the component unmounts before it finishes
    return () => controller.abort()
  }, []) // empty array → run once on mount

  return { courses, loading, error }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function App() {
  const { courses, loading, error } = useCourses()

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: 520 }}>
      <h1>04 · Fetch with useCourses</h1>

      {/* 1. Loading state */}
      {loading && <p style={{ color: '#64748b' }}>Loading courses…</p>}

      {/* 2. Error state */}
      {error && (
        <p style={{ color: '#dc2626' }}>
          Error: {error} —{' '}
          <button onClick={() => window.location.reload()} style={linkBtnStyle}>
            Retry
          </button>
        </p>
      )}

      {/* 3. Empty state */}
      {!loading && !error && courses.length === 0 && (
        <p style={{ color: '#94a3b8' }}>No courses found.</p>
      )}

      {/* 4. Success state */}
      {!loading && !error && courses.length > 0 && (
        <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
          {courses.map((c) => (
            <li key={c.id} style={cardStyle}>
              <span>{c.title}</span>
              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Capacity: {c.capacity}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

const cardStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px',
  padding: '0.75rem 1rem', marginBottom: '0.5rem',
}
const linkBtnStyle = {
  background: 'none', border: 'none', color: '#3b82f6',
  cursor: 'pointer', textDecoration: 'underline', padding: 0,
}
