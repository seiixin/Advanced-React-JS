// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx  (Slide 24)
// ─────────────────────────────────────────────────────────────────────────────
// Project: Student Course Dashboard — suggested sample dataset.
//
// This demo combines everything from the course into one small working app:
//  - sampleCourses as local mock data  (Slide 24)
//  - useReducer for add/remove actions (Slide 11)
//  - Search without mutating the array (Slides 11 + 15)
//  - Controlled form with validation   (Slide 17)
//
// CRUCIAL FILES:
//   src/data/sampleCourses.js  ← mock dataset, replace with real API later
//   src/App.jsx                ← this file, wires everything together
// ─────────────────────────────────────────────────────────────────────────────
import { useReducer, useState } from 'react'
import { sampleCourses } from './data/sampleCourses.js'

// ── Reducer ───────────────────────────────────────────────────────────────────
const initialState = { courses: sampleCourses, search: '' }

function reducer(state, action) {
  switch (action.type) {
    case 'course/added':
      return { ...state, courses: [...state.courses, action.course] }
    case 'course/removed':
      return { ...state, courses: state.courses.filter((c) => c.id !== action.id) }
    case 'search/changed':
      return { ...state, search: action.value }
    default:
      return state
  }
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [form, setForm]   = useState({ title: '', capacity: '' })
  const [msg,  setMsg]    = useState('')

  // 2. Search without mutating source array
  const filtered = state.courses.filter((c) =>
    c.title.toLowerCase().includes(state.search.toLowerCase()),
  )

  function handleSubmit(e) {
    e.preventDefault()
    const title    = form.title.trim()
    const capacity = Number(form.capacity)
    if (!title || !Number.isInteger(capacity) || capacity < 1) {
      setMsg('Provide a title and a positive capacity.')
      return
    }
    dispatch({ type: 'course/added', course: { id: crypto.randomUUID(), title, capacity } })
    setForm({ title: '', capacity: '' })
    setMsg('✓ Course added!')
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: 520 }}>
      <h1>11 · Project — Sample Dataset</h1>

      {/* 1. Total courses */}
      <p style={{ color: '#64748b', marginBottom: '1rem' }}>
        Total courses: <strong>{state.courses.length}</strong>
      </p>

      {/* 2. Search */}
      <input
        type="search"
        placeholder="Search courses…"
        value={state.search}
        onChange={(e) => dispatch({ type: 'search/changed', value: e.target.value })}
        style={inputStyle}
        aria-label="Search courses"
      />

      {/* Course list with remove */}
      {filtered.length === 0 ? (
        <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>No courses match.</p>
      ) : (
        <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
          {filtered.map((c) => (
            <li key={c.id} style={cardStyle}>
              <div>
                <strong>{c.title}</strong>
                <span style={{ color: '#64748b', fontSize: '0.85rem', marginLeft: '0.75rem' }}>
                  Capacity: {c.capacity}
                </span>
              </div>
              {/* 3. Remove via reducer */}
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

      {/* 3. Add via form + validation */}
      <h2 style={{ marginBottom: '0.75rem' }}>Add a course</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label style={labelStyle} htmlFor="title">Title</label>
        <input
          id="title" name="title" type="text"
          value={form.title}
          onChange={(e) => { setForm((p) => ({ ...p, title: e.target.value })); setMsg('') }}
          style={inputStyle} placeholder="e.g. Advanced React"
        />
        <label style={labelStyle} htmlFor="capacity">Capacity</label>
        <input
          id="capacity" name="capacity" type="number"
          value={form.capacity}
          onChange={(e) => { setForm((p) => ({ ...p, capacity: e.target.value })); setMsg('') }}
          style={inputStyle} placeholder="e.g. 30" min="1"
        />
        {msg && (
          <p style={{ color: msg.startsWith('✓') ? '#16a34a' : '#dc2626', marginBottom: '0.5rem', fontSize: '0.9rem' }} role="alert">
            {msg}
          </p>
        )}
        <button type="submit" style={btnStyle}>Add course</button>
      </form>
    </main>
  )
}

const inputStyle = { display: 'block', width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '1rem', marginBottom: '0.75rem' }
const labelStyle = { display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }
const btnStyle   = { padding: '0.5rem 1.25rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }
const dangerBtnStyle = { padding: '0.3rem 0.65rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }
const cardStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '0.5rem' }
