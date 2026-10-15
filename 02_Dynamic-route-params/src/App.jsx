// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx  ← CRUCIAL (Slide 10)
// ─────────────────────────────────────────────────────────────────────────────
// Dynamic route params let a single route component handle any course ID.
// useParams() reads the :courseId segment straight from the URL.
//
// KEY POINT: params always arrive as strings — validate before using them
// to request data (e.g. check it's a known ID before fetching).
// ─────────────────────────────────────────────────────────────────────────────
import { Routes, Route, NavLink, Link, useParams } from 'react-router'

const COURSES = [
  { id: 'r101', title: 'React Fundamentals', capacity: 30 },
  { id: 'r201', title: 'React Router',        capacity: 25 },
  { id: 'r301', title: 'React Hooks',          capacity: 20 },
]

// Lists all courses, each linking to /courses/:id
function CoursesPage() {
  return (
    <main>
      <h1>Courses</h1>
      <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
        {COURSES.map((c) => (
          <li key={c.id} style={{ marginBottom: '0.5rem' }}>
            {/* Link to the dynamic route */}
            <Link to={`/courses/${c.id}`}>{c.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CourseDetailsPage  ← CRUCIAL
// useParams() extracts :courseId from the URL — always a string.
// ─────────────────────────────────────────────────────────────────────────────
function CourseDetailsPage() {
  const { courseId } = useParams()           // ← reads :courseId from URL
  const course = COURSES.find((c) => c.id === courseId)

  if (!course) {
    return (
      <main>
        <h1>Course not found</h1>
        <p>
          ID <code>{courseId}</code> does not exist.{' '}
          <Link to="/courses">← Back</Link>
        </p>
      </main>
    )
  }

  return (
    <main>
      <h1>{course.title}</h1>
      <p>Course ID: <strong>{course.id}</strong></p>
      <p>Capacity: <strong>{course.capacity}</strong> students</p>
      <Link to="/courses" style={{ marginTop: '1rem', display: 'inline-block' }}>
        ← Back to courses
      </Link>
    </main>
  )
}

export default function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/courses">Courses</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<main><h1>Home</h1></main>} />
        <Route path="/courses" element={<CoursesPage />} />
        {/* :courseId is the dynamic segment */}
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
      </Routes>
    </>
  )
}
