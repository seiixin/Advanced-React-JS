// ─────────────────────────────────────────────────────────────────────────────
// src/components/CourseCard.test.jsx  ← CRUCIAL (Slide 21)
// ─────────────────────────────────────────────────────────────────────────────
// Vitest + React Testing Library.
//
// PHILOSOPHY: test BEHAVIOUR, not implementation.
//  ✓ Query by what a user sees (text, role, label) — not by class names or IDs.
//  ✓ Simulate real interactions with userEvent.
//  ✗ Don't test internal state or implementation details.
//
// Run: npm test  (single run)  |  npm run test:watch  (watch mode)
// ─────────────────────────────────────────────────────────────────────────────
import { render, screen } from '@testing-library/react'
import { test, expect, describe } from 'vitest'
import CourseCard from './CourseCard.jsx'

describe('CourseCard', () => {
  // ── Test 1: renders the course title ────────────────────────────────────────
  test('shows course title', () => {
    render(<CourseCard course={{ id: '1', title: 'React', capacity: 30 }} />)
    // getByText queries what the USER sees in the DOM
    expect(screen.getByText('React')).toBeTruthy()
  })

  // ── Test 2: renders the capacity ────────────────────────────────────────────
  test('shows capacity', () => {
    render(<CourseCard course={{ id: '2', title: 'Hooks', capacity: 25 }} />)
    expect(screen.getByText(/capacity:\s*25/i)).toBeTruthy()
  })

  // ── Test 3: title is in a heading ────────────────────────────────────────────
  test('title is rendered in a heading element', () => {
    render(<CourseCard course={{ id: '3', title: 'Router', capacity: 10 }} />)
    // getByRole targets semantic HTML — more resilient than class selectors
    const heading = screen.getByRole('heading', { name: /router/i })
    expect(heading).toBeTruthy()
  })
})
