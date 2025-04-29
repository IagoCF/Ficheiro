import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'

function Perfil() {
    const navigate = useNavigate()
    const userId = localStorage.getItem('usuario')
    const userApelido = localStorage.getItem('apelido')
    const userEmail = localStorage.getItem('email')
    const userIdade = localStorage.getItem('idade')
    const userIngresso = localStorage.getItem('ingresso')

    function irParaHomeLogin() {
        navigate('/homelogin')
      }

    function irParaLogin() {
        navigate('/login')
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
            <a style={{ cursor: 'pointer' }} className="botaoSelecionado">Perfil</a>
          </nav>
        </header>

        <div className="fundo">
          <div className="titulo">
            <h1>Meu perfil</h1>
            <p>mostre quem você é</p>
          </div>
          <div className="informacoes">
              <p>Apelido: {userApelido}</p>
              <p>ID: {userId}</p>
              <p>Email: {userEmail}</p>
              <p>Idade: {userIdade}</p>
              <p>Membro desde: {userIngresso}</p>
              <button>Editar</button>
          </div>
        </div>

      </div>
    )
}

export default Perfil