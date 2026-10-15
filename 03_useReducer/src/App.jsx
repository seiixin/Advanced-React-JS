// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx  ← CRUCIAL (Slide 11)
// ─────────────────────────────────────────────────────────────────────────────
// useReducer centralises state transitions in one pure function.
// All state changes go through dispatch({ type, payload }) —
// the reducer decides the next state, keeping logic out of components.
//
// PATTERN: action types use "noun/verb" format: 'course/added'
// ─────────────────────────────────────────────────────────────────────────────
import { useReducer, useState } from 'react'

// ── Initial state ────────────────────────────────────────────────────────────
const initialState = { courses: [], search: '' }

// ── Reducer  ← CRUCIAL ───────────────────────────────────────────────────────
// Pure function: (state, action) => newState
// Never mutates state directly — always returns a new object.
function reducer(state, action) {
  switch (action.type) {
    case 'course/added':
      return { ...state, courses: [...state.courses, action.course] }

    case 'course/removed':
      return {
        ...state,
        courses: state.courses.filter((c) => c.id !== action.id),
      }

    case 'search/changed':
      return { ...state, search: action.value }

    default:
      return state
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [title, setTitle] = useState('')

  const filtered = state.courses.filter((c) =>
    c.title.toLowerCase().includes(state.search.toLowerCase()),
  )

  function addCourse() {
    const trimmed = title.trim()
    if (!trimmed) return
    dispatch({
      type: 'course/added',
      course: { id: crypto.randomUUID(), title: trimmed },
    })
    setTitle('')
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: 480 }}>
      <h1>03 · useReducer</h1>

      {/* Search — dispatches 'search/changed' */}
      <input
        type="text"
        placeholder="Search courses…"
        value={state.search}
        onChange={(e) => dispatch({ type: 'search/changed', value: e.target.value })}
        style={inputStyle}
        aria-label="Search courses"
      />

      {/* Add — dispatches 'course/added' */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="New course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addCourse()}
          style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
          aria-label="New course title"
        />
        <button onClick={addCourse} style={btnStyle}>Add</button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No courses yet — add one above.</p>
      ) : (
        <ul style={{ listStyle: 'none' }}>
          {filtered.map((c) => (
            <li key={c.id} style={cardStyle}>
              <span>{c.title}</span>
              {/* Remove — dispatches 'course/removed' */}
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
      )}
    </main>
  )
}

// ── Inline styles (keep demo self-contained) ──────────────────────────────────
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
