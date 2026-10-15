// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx  ← CRUCIAL (Slide 17)
// ─────────────────────────────────────────────────────────────────────────────
// Controlled forms with validation.
//
// KEY POINTS:
//  1. Every input is "controlled" — its value comes from state, not the DOM.
//  2. Validate on submit, not just on HTML attributes (required, min, etc.)
//     because HTML validation can be bypassed.
//  3. Show a clear error message; clear it once the form is valid.
//  4. Reset form fields after a successful submission.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react'

export default function App() {
  // ── Form state (Slide 17) ── controlled: value lives in React, not the DOM
  const [form,    setForm]    = useState({ title: '', capacity: '' })
  const [message, setMessage] = useState('')
  const [courses, setCourses] = useState([])

  // Generic change handler for all fields
  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setMessage('')  // clear error on edit
  }

  // ── handleSubmit  ← CRUCIAL ───────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault()

    const title    = form.title.trim()
    const capacity = Number(form.capacity)

    // Validate — don't rely solely on HTML attributes
    if (!title) {
      setMessage('Title is required.')
      return
    }
    if (!Number.isInteger(capacity) || capacity < 1) {
      setMessage('Capacity must be a positive whole number.')
      return
    }

    // Success path
    setCourses((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, capacity },
    ])
    setForm({ title: '', capacity: '' })   // reset
    setMessage('✓ Course added!')
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: 480 }}>
      <h1>07 · Controlled Form + Validation</h1>

      <form onSubmit={handleSubmit} noValidate style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle} htmlFor="title">Course title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          style={inputStyle}
          placeholder="e.g. React Fundamentals"
        />

        <label style={labelStyle} htmlFor="capacity">Capacity</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          value={form.capacity}
          onChange={handleChange}
          style={inputStyle}
          placeholder="e.g. 30"
          min="1"
        />

        {/* Feedback message — error or success */}
        {message && (
          <p
            style={{
              color: message.startsWith('✓') ? '#16a34a' : '#dc2626',
              marginBottom: '0.75rem',
              fontSize: '0.9rem',
            }}
            role="alert"
          >
            {message}
          </p>
        )}

        <button type="submit" style={btnStyle}>Add course</button>
      </form>

      {/* Course list */}
      {courses.length > 0 && (
        <ul style={{ listStyle: 'none' }}>
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

const labelStyle = { display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }
const inputStyle = {
  display: 'block', width: '100%', padding: '0.5rem 0.75rem',
  border: '1px solid #cbd5e1', borderRadius: '6px',
  fontSize: '1rem', marginBottom: '0.75rem',
}
const btnStyle = {
  padding: '0.5rem 1.25rem', background: '#3b82f6', color: '#fff',
  border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500,
}
const cardStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px',
  padding: '0.75rem 1rem', marginBottom: '0.5rem',
}
