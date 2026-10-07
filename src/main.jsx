import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './firebase.js'
import App from './App.jsx'
import Admin from './Admin.jsx'
import Client from './Client.jsx'

const isAdminRoute = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')
const isClientRoute = window.location.pathname === '/espace-client' || window.location.pathname.startsWith('/espace-client/')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminRoute ? <Admin /> : isClientRoute ? <Client /> : <App />}
  </StrictMode>,
)
