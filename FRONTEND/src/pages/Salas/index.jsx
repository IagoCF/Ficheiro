import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'
import Elfo from '../../assets/elfo.png'

function Salas() {
  const navigate = useNavigate()
  const userId = localStorage.getItem('usuario')
  const userApelido = localStorage.getItem('apelido')
  const userEmail = localStorage.getItem('email')
  const userIdade = localStorage.getItem('idade')
  const userIngresso = localStorage.getItem('ingresso')

  function irParaHomeLogin() {
    navigate('/homelogin')
  }

  function irParaPerfil() {
    navigate('/perfil')
  }

  function irParaSalas() {
    navigate('/salas')
  }

  function irParaMinhasFichas() {
    navigate('/minhasfichas')
  }

  function irParaMinhasSalas() {
    navigate('/minhassalas')
  }

  return (
    <div className="background2">
      <header>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <nav>
          <a onClick={irParaHomeLogin} style={{ cursor: 'pointer' }}>Home</a>
          <a onClick={irParaSalas} style={{ cursor: 'pointer' }} className="botaoSelecionado">Salas</a>
          <a onClick={irParaPerfil} style={{ cursor: 'pointer' }}>Perfil</a>
        </nav>
      </header>

      <div className="fundo">
        <div className="titulo">
          <h1>Salas</h1>
          <p>selecione o que deseja fazer</p>
        </div>
        <div className="botoesImagem">
          <div className="botoesSalas">
            <button onClick={irParaMinhasSalas} className="botaoSala">Minhas salas<p>Crie sua sala e chame seus amigos</p></button>
            <button /*onClick={}*/ className="botaoSala">Entrar em uma sala <p>Entre em uma sala a partir do ID da sala</p></button>
            <button onClick={irParaMinhasFichas} className="botaoSala">Criar uma ficha nova <p>Crie um personagem para futuras aventuras</p></button>
          </div>
          <div className="imagemSalas">
            <img src={Elfo} alt="Elfo" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Salas