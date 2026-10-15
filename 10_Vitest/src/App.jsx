// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx  (Slide 21)
// ─────────────────────────────────────────────────────────────────────────────
// Visual runner — shows CourseCard in the browser.
// The real demo is in CourseCard.test.jsx — run `npm test` to see Vitest work.
// ─────────────────────────────────────────────────────────────────────────────
import CourseCard from './components/CourseCard.jsx'

const COURSES = [
  { id: 'r101', title: 'React Fundamentals', capacity: 30 },
  { id: 'r201', title: 'React Router',        capacity: 25 },
  { id: 'r301', title: 'React Hooks',          capacity: 20 },
]

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: 480 }}>
      <h1>10 · Vitest + React Testing Library</h1>
      <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>
        Run <code>npm test</code> in this folder to execute the test suite.
        The tests live in <code>src/components/CourseCard.test.jsx</code>.
      </p>
      {COURSES.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </main>
  )
}
