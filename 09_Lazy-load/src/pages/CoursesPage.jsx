// src/pages/CoursesPage.jsx — also lazy-loaded
export default function CoursesPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Courses</h1>
      <p>This page is also <strong>lazy-loaded</strong> in a separate chunk.</p>
    </main>
  )
}
