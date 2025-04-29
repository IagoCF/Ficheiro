import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'

function HomeLogin() {
    const navigate = useNavigate()

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
            <a href="#" className="botaoSelecionado">Home</a>
            <a /*onClick={}*/ style={{ cursor: 'pointer' }}>Salas</a>
            <a onClick={irParaPerfil} style={{ cursor: 'pointer' }}>Perfil</a>
          </nav>
        </header>
    
        <div className="welcome">
          <h1>BEM-VINDO AO<br/><span>FICHEIRO</span></h1>
          <p>O site criado para você que quer jogar<br/>RPG de Mesa Online</p>
        </div>
      </div>
    )
}

export default HomeLogin