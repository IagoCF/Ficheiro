import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // Importa o React Router
import Home from './pages/Home'
import Login from './pages/Login'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Envolve a aplicação com o Router */}
      <Routes>
        <Route path="/" element={<Login />} /> {/* Rota para a página de Login */}
        <Route path="/home" element={<Home />} /> {/* Rota para a página Home */}
      </Routes>
    </Router>
  </StrictMode>,
)