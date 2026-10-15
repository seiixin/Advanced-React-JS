import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ─────────────────────────────────────────────────────────────────────────────
// vite.config.js  ← CRUCIAL (Slide 21)
// ─────────────────────────────────────────────────────────────────────────────
// The `test` block tells Vitest to use jsdom (a browser-like environment)
// so React components can render and query the DOM inside Node.
// ─────────────────────────────────────────────────────────────────────────────
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',       // ← simulate a browser DOM in Node
    globals: true,              // ← lets you use describe/test/expect without imports
    setupFiles: [],
  },
})
