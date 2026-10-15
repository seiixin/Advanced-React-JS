// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx  (Slide 12)
// ─────────────────────────────────────────────────────────────────────────────
// Shows how deeply-nested components can read and update shared state
// through Context without any prop-drilling.
//
// Tree:
//   <CourseProvider>        ← owns state + dispatch
//     <App>
//       <CourseSearch />    ← reads state.search, dispatches search/changed
//       <CourseList />      ← reads state.courses, dispatches course/removed
//       <AddCourseForm />   ← dispatches course/added
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import { CourseProvider, useCourseContext } from './CourseContext.jsx'

// ── Sub-components each pull from context directly ────────────────────────────

function CourseSearch() {
  const { state, dispatch } = useCourseContext()
  return (
    <input
      type="text"
      placeholder="Search courses…"
      value={state.search}
      onChange={(e) => dispatch({ type: 'search/changed', value: e.target.value })}
      style={inputStyle}
      aria-label="Search courses"
    />
  )
}

function CourseList() {
  const { state, dispatch } = useCourseContext()
  const filtered = state.courses.filter((c) =>
    c.title.toLowerCase().includes(state.search.toLowerCase()),
  )
  if (filtered.length === 0)
    return <p style={{ color: '#94a3b8' }}>No courses — add one below.</p>

  return (
    <ul style={{ listStyle: 'none', marginBottom: '1rem' }}>
      {filtered.map((c) => (
        <li key={c.id} style={cardStyle}>
          <span>{c.title}</span>
          <button
            onClick={() => dispatch({ type: 'course/removed', id: c.id })}
            style={dangerBtnStyle}
            aria-label={`Remove ${c.title}`}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}

function AddCourseForm() {
  const { dispatch } = useCourseContext()
  const [title, setTitle] = useState('')

  function handleAdd() {
    const trimmed = title.trim()
    if (!trimmed) return
    dispatch({ type: 'course/added', course: { id: crypto.randomUUID(), title: trimmed } })
    setTitle('')
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <input
        type="text"
        placeholder="New course title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
        aria-label="New course title"
      />
      <button onClick={handleAdd} style={btnStyle}>Add</button>
    </div>
  )
}

// ── Root: wrap the tree in <CourseProvider> ───────────────────────────────────
export default function App() {
  return (
    <CourseProvider>
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: 480 }}>
        <h1>05 · Context + useReducer</h1>
        <CourseSearch />
        <CourseList />
        <AddCourseForm />
      </main>
    </CourseProvider>
  )
}

const inputStyle = {
  display: 'block', width: '100%', padding: '0.5rem 0.75rem',
  border: '1px solid #cbd5e1', borderRadius: '6px',
  fontSize: '1rem', marginBottom: '0.75rem',
}
const btnStyle = {
  padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff',
  border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500,
}
const dangerBtnStyle = {
  padding: '0.35rem 0.75rem', background: '#fee2e2', color: '#dc2626',
  border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem',
}
const cardStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px',
  padding: '0.75rem 1rem', marginBottom: '0.5rem',
}
