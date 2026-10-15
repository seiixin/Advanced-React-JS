// ─────────────────────────────────────────────────────────────────────────────
// src/CourseContext.jsx  ← CRUCIAL (Slide 12)
// ─────────────────────────────────────────────────────────────────────────────
// Context + useReducer: share state without prop-drilling.
//
// Pattern:
//  1. Create a Context (starts as null).
//  2. CourseProvider owns the state; wraps children with the Context value.
//  3. useCourseContext() is a safe accessor — throws if used outside provider.
// ─────────────────────────────────────────────────────────────────────────────
import { createContext, useContext, useReducer } from 'react'

// ── Reducer (same as 03_useReducer) ───────────────────────────────────────────
const initialState = { courses: [], search: '' }

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

// ── Context ← CRUCIAL ─────────────────────────────────────────────────────────
const CourseContext = createContext(null)

// ── Provider ← CRUCIAL ────────────────────────────────────────────────────────
export function CourseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <CourseContext.Provider value={{ state, dispatch }}>
      {children}
    </CourseContext.Provider>
  )
}

// ── Safe hook accessor ← CRUCIAL ──────────────────────────────────────────────
// Throws a clear error if a component tries to use context
// without being wrapped in <CourseProvider>.
export function useCourseContext() {
  const value = useContext(CourseContext)
  if (!value) throw new Error('useCourseContext must be used inside <CourseProvider>')
  return value
}
