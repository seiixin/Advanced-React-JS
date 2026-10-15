// ─────────────────────────────────────────────────────────────────────────────
// src/main.jsx  ← CRUCIAL (Slide 8)
// ─────────────────────────────────────────────────────────────────────────────
// BrowserRouter must wrap the entire tree so every component
// below can use <Link>, <NavLink>, useNavigate, useParams, etc.
// ─────────────────────────────────────────────────────────────────────────────
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
