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
import MinhasSalas from './pages/MinhasSalas'
import CriarSala from './pages/CriarSala'
import UsarSala from './pages/UsarSala'
import EditarFicha from './pages/EditarFicha'

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
        <Route path="/minhassalas" element={<RotaPrivada> <MinhasSalas /> </RotaPrivada>}/>
        <Route path="/criarsala" element={<RotaPrivada> <CriarSala /> </RotaPrivada>}/>
        <Route path="/usarsala" element={<RotaPrivada> <UsarSala /> </RotaPrivada>}/>
        <Route path="/editarficha/:id" element={<RotaPrivada> <EditarFicha /> </RotaPrivada>}/>
      </Routes>
    </Router>
  </StrictMode>
)