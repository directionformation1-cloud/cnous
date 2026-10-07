import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './firebase.js'
import App from './App.jsx'
import Admin from './Admin.jsx'

const isAdminRoute = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminRoute ? <Admin /> : <App />}
  </StrictMode>,
)
