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
        <div class="background">
        <header>
          <div class="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <nav>
            <a href="#" className="botaoSelecionado">Home</a>
            <a onClick={irParaLogin} style={{ cursor: 'pointer' }}>Login/Registro</a>
          </nav>
        </header>

      </div>
    )
}

export default Home