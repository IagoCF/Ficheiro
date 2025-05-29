import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // Importa o React Router
import Registrar from './pages/Registrar'
import Login from './pages/Login'
import Home from './pages/Home'
import HomeLogin from './pages/HomeLogin'
import Perfil from './pages/Perfil'
import RotaPrivada from './components/rotaPrivada' // Importa o componente de rota privada
import './mainindex.css'
import EditarPerfil from './pages/EditarPerfil'
import MinhasFichas from './pages/MinhasFichas'
import CriarFicha from './pages/CriarFicha'
import Salas from './pages/Salas'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/homelogin" element={<RotaPrivada> <HomeLogin /> </RotaPrivada>}/>
        <Route path="/perfil" element={<RotaPrivada> <Perfil /> </RotaPrivada>}/>
        <Route path="/editarperfil" element={<RotaPrivada> <EditarPerfil /> </RotaPrivada>}/>
        <Route path="/minhasfichas" element={<RotaPrivada> <MinhasFichas /> </RotaPrivada>}/>
        <Route path="/criarficha" element={<RotaPrivada> <CriarFicha /> </RotaPrivada>}/>
        <Route path="/salas" element={<RotaPrivada> <Salas /> </RotaPrivada>}/>
      </Routes>
    </Router>
  </StrictMode>
)