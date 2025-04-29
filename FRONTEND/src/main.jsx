import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // Importa o React Router
import Registrar from './pages/Registrar'
import Login from './pages/Login'
import Home from './pages/Home'
import HomeLogin from './pages/HomeLogin'
import Perfil from './pages/Perfil'
import './mainindex.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router> {/* Envolve a aplicação com o Router */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Rota para a página Home */}
          <Route path="/homelogin" element={<HomeLogin />} /> {/* Rota para a página de Home após Login */}
          <Route path="/login" element={<Login />} /> {/* Rota para a página de Login */}
          <Route path="/registrar" element={<Registrar />} /> {/* Rota para a página Home */}
          <Route path="/perfil" element={<Perfil />} /> {/* Rota para a página de Perfil */}
        </Routes>
      </Router>
  </StrictMode>,
)