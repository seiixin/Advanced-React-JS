// ─────────────────────────────────────────────────────────────────────────────
// src/data/sampleCourses.js  ← CRUCIAL (Slide 24)
// ─────────────────────────────────────────────────────────────────────────────
// Use local mock data before connecting a real backend.
// This file is the single source of truth for the project demo.
//
// CHALLENGES (from Slide 24):
//  1. Show total number of courses.
//  2. Search course titles without mutating the source array.
//  3. Add and remove courses using reducer actions.
//  4. Navigate to a course detail page using the id as a URL param.
// ─────────────────────────────────────────────────────────────────────────────
export const sampleCourses = [
  { id: 'r101', title: 'React Fundamentals', capacity: 30 },
  { id: 'r201', title: 'React Router',        capacity: 25 },
  { id: 'r301', title: 'React Hooks',          capacity: 20 },
]
