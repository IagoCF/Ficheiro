import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'
import { useRef, useEffect, useState } from 'react';
import api from '../../services/api'

function MinhasSalas() {
  const navigate = useNavigate()
  const userId = localStorage.getItem('usuario')
  const [salas, setSalas] = useState([])

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

  // Carregar fichas do usuário ao entrar na página
  useEffect(() => {
    async function carregarSalas() {
      try {
        const response = await api.get(`/sala?usuarioId=${userId}`)
        setSalas(response.data)
      } catch (error) {
        setSalas([])
      }
    }
    carregarSalas()
  }, [userId])

  function formatarData(dataString) {
    if (!dataString) return '';
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
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
          <p>Ver minhas salas</p>
        </div>
        <div className="criarficha">
          <div className="grid-fichas">
            {salas.length === 0 ? (
              <p className="nenhuma-ficha">Nenhuma sala encontrada.</p>
            ) : (
              salas.map((sala) => (
                <div className="card-ficha" key={sala.id}>
                  <div className="ficha-imagem-placeholder"></div>
                  <div className="ficha-info">
                    <h3>{sala.nome_sala}</h3>
                    <p>Sistema: {sala.nome_sistema}</p>
                    <p>Data de Criação: {formatarData(sala.criada)}</p>
                    <p>Id da Sala: {sala.id}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <button className="botao-nova-ficha" /*onClick={irParaCriarSala}*/>Nova Sala</button>
      </div>
    </div>
  )
}

export default MinhasSalas