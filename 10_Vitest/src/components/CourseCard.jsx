// ─────────────────────────────────────────────────────────────────────────────
// src/components/CourseCard.jsx  ← CRUCIAL (Slide 21)
// ─────────────────────────────────────────────────────────────────────────────
// The component under test.
// Simple, no side-effects — perfect for demonstrating unit testing.
// ─────────────────────────────────────────────────────────────────────────────
export default function CourseCard({ course }) {
  return (
    <article
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '1rem 1.25rem',
        marginBottom: '0.75rem',
      }}
    >
      <h2 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{course.title}</h2>
      <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
        Capacity: {course.capacity}
      </p>
    </article>
  )
}
