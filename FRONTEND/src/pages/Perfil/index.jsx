import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'
import MinhasFichas from '../MinhasFichas'

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

    function irParaEditarPerfil() {
        navigate('/editarperfil')
      }

    function irParaMinhasFichas() { 
        navigate('/minhasfichas')
      }
    
    function irParaSalas() {
        navigate('/salas')
      }

    function MudarUsuario() {
        // Remove os dados do usuário do localStorage
        localStorage.removeItem('usuario');
        localStorage.removeItem('apelido');
        localStorage.removeItem('email');
        localStorage.removeItem('idade');
        localStorage.removeItem('ingresso');

        // Redireciona para a página de login e substitui a URL no navegador
        window.location.replace('/login');
      }

    return (
        <div className="background2">
        <header>
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <nav>
            <a onClick={irParaHomeLogin} style={{ cursor: 'pointer' }}>Home</a>
            <a onClick={irParaSalas} style={{ cursor: 'pointer' }}>Salas</a>
            <a style={{ cursor: 'pointer' }} className="botaoSelecionado">Perfil</a>
          </nav>
        </header>

        <div className="fundo">
          <div className="titulo">
            <h1>Meu perfil</h1>
            <p>Mostre quem você é</p>
          </div>
          <div className="informacoes">
              <p>Apelido: {userApelido}</p>
              <p>ID: {userId}</p>
              <p>Email: {userEmail}</p>
              <p>Idade: {userIdade}</p>
              <p>Membro desde: {userIngresso}</p>
              <button onClick={irParaEditarPerfil}>Editar</button>
              <button onClick={irParaMinhasFichas}>Minhas Fichas</button>
              <button onClick={MudarUsuario}>Mudar conta</button>
          </div>
        </div>

      </div>
    )
}

export default Perfil