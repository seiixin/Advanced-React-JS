// ─────────────────────────────────────────────────────────────────────────────
// 00_initialize · Slide 8 — Router: Install & Initialize
// ─────────────────────────────────────────────────────────────────────────────
//
// This folder shows what you get right after running:
//
//   npm create vite@latest course-dashboard -- --template react
//   cd course-dashboard
//   npm install
//   npm install react-router
//   npm run dev
//
// The ONLY code change from the Vite default is in src/main.jsx —
// wrap <App /> with <BrowserRouter> so routing is available everywhere.
//
// CRUCIAL FILES IN THIS DEMO
//   src/main.jsx  ← wrap <App> with <BrowserRouter>  (see below)
//   src/App.jsx   ← this file — plain starting point, no routes yet
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>00 · Initialize</h1>

      <p>
        This is the stock Vite + React starting point. The only addition
        from Slide 8 is in <code>src/main.jsx</code> — wrapping the app
        with <code>&lt;BrowserRouter&gt;</code>.
      </p>

      <h2 style={{ marginTop: '1.5rem' }}>Terminal commands (Slide 8)</h2>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '0.5rem',
          lineHeight: 1.7,
        }}
      >
        {`npm create vite@latest course-dashboard -- --template react
cd course-dashboard
npm install
npm install react-router
npm run dev`}
      </pre>

      <h2 style={{ marginTop: '1.5rem' }}>
        What to look at: <code>src/main.jsx</code>
      </h2>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '0.5rem',
          lineHeight: 1.7,
        }}
      >
        {`// src/main.jsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';   // ← add this
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);`}
      </pre>
    </main>
  )
}
