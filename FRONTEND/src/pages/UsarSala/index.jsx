import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'

function UsarSala() {
  const navigate = useNavigate()
  // Exemplo de dados (substitua pelos dados reais)
  const nomeSala = "Sala dos Heróis"
  const sistema = "Dungeons & Dragons"
  const integrantes = [
    { nome: "Fulanovsky", funcao: "Mestre", avatar: "https://randomuser.me/api/portraits/men/1.jpg", selecionado: false, mestre: true },
    { nome: "Macaco A", funcao: "Ajudante", avatar: "https://randomuser.me/api/portraits/men/2.jpg", selecionado: false },
    { nome: "Benson da Sil...", funcao: "Jogador", avatar: "https://randomuser.me/api/portraits/men/3.jpg", selecionado: false },
    { nome: "Matador de g...", funcao: "Espectador", avatar: "https://randomuser.me/api/portraits/men/4.jpg", selecionado: false }
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
                <li key={idx} className={`integrante-card${int.selecionado ? " selecionado" : ""}`}>
                  <img className="integrante-avatar" src={int.avatar} alt={int.nome} />
                  <div className="integrante-info">
                    <span className="integrante-nome"> {int.nome} {int.mestre && <span className="integrante-coroa"> 👑</span>}</span>
                    <span className="integrante-funcao">{int.funcao}</span>
                  </div>
                </li>
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