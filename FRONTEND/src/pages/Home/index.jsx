import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import Background from '../../assets/background.jpg'
import './style.css'

function Home() {
    const navigate = useNavigate()

    function irParaLogin() {
        navigate('/login')
      }

    return (
        <div className="background">
        <header>
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <nav>
            <a href="#" className="botaoSelecionado">Home</a>
            <a onClick={irParaLogin} style={{ cursor: 'pointer' }}>Login/Registro</a>
          </nav>
        </header>
    
        <div className="welcome">
          <h1>BEM-VINDO AO<br/><span>FICHEIRO</span></h1>
          <p>O site criado para você que quer jogar<br/>RPG de Mesa Online</p>
        </div>
      </div>
    )
}

export default Home