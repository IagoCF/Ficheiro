import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'

function UsarSala() {
  const navigate = useNavigate()
  // Exemplo de dados (substitua pelos dados reais)
  const nomeSala = "Sala dos Heróis"
  const sistema = "Dungeons & Dragons"
  const integrantes = [
    { nome: "Alice" },
    { nome: "Bob" },
    { nome: "Carlos" },
    { nome: "Diana" }
  ]

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

  return (
    <div className="background2">
      <div className="fundoSala">
        <aside className="menu-vertical">
          <div className="menu-header">
            <h2 className="sala-nome">{nomeSala}</h2>
            <span className="sala-sistema">{sistema}</span>
          </div>
          <div className="menu-integrantes">
            <ul>
              {integrantes.map((int, idx) => (
                <li key={idx} className="integrante">{int.nome}</li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="conteudoSala">
          {/* Conteúdo principal da sala aqui */}
        </div>
      </div>
    </div>
  )
}

export default UsarSala