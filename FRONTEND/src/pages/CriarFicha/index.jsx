import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'
import { useRef } from 'react';
import api from '../../services/api'

function CriarFicha() {
  const navigate = useNavigate()
  const userId = localStorage.getItem('usuario')
  const userApelido = localStorage.getItem('apelido')
  const userEmail = localStorage.getItem('email')
  const userIdade = localStorage.getItem('idade')
  const userIngresso = localStorage.getItem('ingresso')
  //
  const inputApelido = useRef();
  const inputEmail = useRef();
  const inputIdade = useRef();
  const inputNovaSenha = useRef();
  const inputSenha = useRef();
  const inputConfirmarSenha = useRef();

  function irParaHomeLogin() {
    navigate('/homelogin')
  }

  function irParaPerfil() {
    navigate('/perfil')
  }

  return (
    <div className="background2">
      <header>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <nav>
          <a onClick={irParaHomeLogin} style={{ cursor: 'pointer' }}>Home</a>
          <a /*onClick={}*/ style={{ cursor: 'pointer' }}>Salas</a>
          <a onClick={irParaPerfil} style={{ cursor: 'pointer' }} className="botaoSelecionado">Perfil</a>
        </nav>
      </header>

      <div className="fundo">
        <div className="titulo">
          <h1>Meu perfil</h1>
          <p>Editar informações</p>
        </div>
      </div>

    </div>
  )
}

export default CriarFicha
// import { useNavigate } from 'react-router-dom'