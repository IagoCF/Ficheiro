import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api' // ajuste o caminho conforme seu projeto
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

  const [showModal, setShowModal] = useState(false)
  const [salaId, setSalaId] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

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

  function abrirModal() {
    setShowModal(true)
  }

  function fecharModal() {
    setShowModal(false)
    setSalaId('')
    setSenha('')
  }

  async function handleEntrarSala(e) {
    e.preventDefault()
    setErro('')

    try {
      // Verifica se a sala existe e se precisa de senha
      const response = await api.get(`/sala/verificar?idSala=${salaId}`)
      if (!response.data.existe) {
        setErro('Sala não encontrada.')
        return
      }
      if (response.data.precisaSenha) {
        if (!senha) {
          setErro('Esta sala requer senha.')
          return
        }
        // Verifique a senha
        const resSenha = await api.post('/sala/entrar', { idSala: salaId, senha })
        if (!resSenha.data.sucesso) {
          setErro('Senha incorreta.')
          return
        }
      }

      // Vincula o usuário à sala (caso ainda não seja vinculado)
      const idUsuario = localStorage.getItem('usuario')
      await api.post('/salaUsuario', {
        idUsuario,
        idSala: salaId
      })

      localStorage.setItem('sala', salaId)
      fecharModal()
      navigate('/usarsala')
    } catch (err) {
      setErro('Sala não encontrada ou erro ao entrar.')
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
            <button onClick={abrirModal} className="botaoSala">Entrar em uma sala <p>Entre em uma sala a partir do ID da sala</p></button>
            <button onClick={irParaMinhasFichas} className="botaoSala">Criar uma ficha nova <p>Crie um personagem para futuras aventuras</p></button>
          </div>
          <div className="imagemSalas">
            <img src={Elfo} alt="Elfo" />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-sala">
            <h2>Entrar em uma sala</h2>
            <form onSubmit={handleEntrarSala}>
              <label>
                ID da sala:
                <input
                  type="text"
                  value={salaId}
                  onChange={e => setSalaId(e.target.value)}
                  required
                />
              </label>
              <label>
                Senha (se houver):
                <input
                  type="password"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                />
              </label>
              {erro && <div style={{ color: 'red', marginBottom: 8 }}>{erro}</div>}
              <div className="modal-botoes">
                <button type="submit" className="modal-botao">Entrar</button>
                <button type="button" className="modal-botao-sair" onClick={fecharModal}>✖</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Salas