import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'
import { useRef, useEffect, useState } from 'react';
import api from '../../services/api'

function MinhasFichas() {
  const location = useLocation()
  const navigate = useNavigate()
  const fromSala = location.state?.fromSala
  const idSala = location.state?.idSala
  const userId = localStorage.getItem('usuario')
  const [fichas, setFichas] = useState([])

  function irParaHomeLogin() {
    navigate('/homelogin')
  }

  function irParaPerfil() {
    navigate('/perfil')
  }

  function irParaCriarFicha() {
    navigate('/criarficha')
  }

  function irParaSalas() {
    navigate('/salas')
  }

  // NOVO: Função para ir para edição da ficha
  function irParaEditarFicha(idFicha) {
    navigate(`/editarficha/${idFicha}`)
  }

  // Carregar fichas do usuário ao entrar na página
  useEffect(() => {
    async function carregarFichas() {
      try {
        const response = await api.get(`/ficha?usuarioId=${userId}`)
        setFichas(response.data)
      } catch (error) {
        setFichas([])
      }
    }
    carregarFichas()
  }, [userId])

  function handleFichaClick(ficha) {
    if (fromSala && idSala) {
      // Chame a API para inserir a ficha na sala
      api.post('/salaFichas', {
        idSala,
        idFicha: ficha.id
      }).then(() => {
        // Volte para a sala ou mostre uma mensagem de sucesso
        navigate('/usarsala')
      })
    } else {
      // Comportamento padrão: editar ficha
      navigate(`/editarficha/${ficha.id}`)
    }
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
          <a onClick={irParaPerfil} style={{ cursor: 'pointer' }} className="botaoSelecionado">Perfil</a>
        </nav>
      </header>

      <div className="fundo">
        <div className="titulo">
          <h1>Meu perfil</h1>
          <p>Ver minhas fichas</p>
        </div>
        <div className="criarficha">
          <div className="grid-fichas">
            {fichas.length === 0 ? (
              <p className="nenhuma-ficha">Nenhuma ficha encontrada.</p>
            ) : (
              fichas.map((ficha) => (
                <div
                  className="card-ficha"
                  key={ficha.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleFichaClick(ficha)}
                >
                  <div className="ficha-imagem-placeholder"></div>
                  <div className="ficha-info">
                    <h3>{ficha.nomePersonagem}</h3>
                    <p>Classe: {ficha.classe}</p>
                    <p>Raça: {ficha.raca}</p>
                    <p>Nível: {ficha.nivel}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <button className="botao-nova-ficha" onClick={irParaCriarFicha}>Nova Ficha</button>
      </div>
    </div>
  )
}

export default MinhasFichas