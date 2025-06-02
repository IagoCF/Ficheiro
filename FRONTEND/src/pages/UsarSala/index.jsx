import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import api from '../../services/api'

function UsarSala() {
  const navigate = useNavigate()
  const idSala = localStorage.getItem('sala')

  // Estado para integrantes reais
  const [integrantes, setIntegrantes] = useState([])
  // Estado para nome da sala e sistema
  const [nomeSala, setNomeSala] = useState('')
  const [nomeSistema, setNomeSistema] = useState('')

  useEffect(() => {
    async function fetchIntegrantes() {
      try {
        const response = await api.get(`/viewSalaUsuario?idSala=${idSala}`)
        setIntegrantes(response.data)
        // Se houver pelo menos um resultado, pegue nomeSala e nomeSistema do primeiro registro
        if (response.data.length > 0) {
          setNomeSala(response.data[0].nomeSala)
          setNomeSistema(response.data[0].nomeSistema)
        } else {
          setNomeSala('')
          setNomeSistema('')
        }
      } catch (error) {
        console.error('Erro ao buscar integrantes:', error)
      }
    }
    if (idSala) fetchIntegrantes()
  }, [idSala])

  // Exemplo de fichas para teste
  const [fichas, setFichas] = useState([])

  useEffect(() => {
    async function fetchFichas() {
      try {
        const response = await api.get(`/salaFichas/${idSala}`)
        setFichas(response.data)
      } catch (error) {
        console.error('Erro ao buscar fichas da sala:', error)
      }
    }
    if (idSala) fetchFichas()
  }, [idSala])

  // Estado de drag para cada ficha
  const areaRef = useRef(null)
  const cardRefs = useRef({})
  const [drags, setDrags] = useState(() =>
    fichas.reduce((acc, ficha) => {
      acc[ficha.id] = {
        dragging: false,
        x: null,
        y: null,
        offsetX: 0,
        offsetY: 0,
        bounds: null
      }
      return acc
    }, {})
  )

  function startDrag(e, fichaId) {
    e.preventDefault()
    const card = cardRefs.current[fichaId]
    const area = areaRef.current
    const cardRect = card.getBoundingClientRect()
    const areaRect = area.getBoundingClientRect()
    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX
    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY

    setDrags(drags => ({
      ...drags,
      [fichaId]: {
        ...drags[fichaId],
        dragging: true,
        offsetX: clientX - cardRect.left,
        offsetY: clientY - cardRect.top,
        x: cardRect.left,
        y: cardRect.top,
        bounds: {
          left: areaRect.left,
          top: areaRect.top,
          right: areaRect.right - cardRect.width,
          bottom: areaRect.bottom - cardRect.height
        }
      }
    }))
    document.body.style.userSelect = "none"
  }

  function onDrag(e, fichaId) {
    setDrags(drags => {
      const drag = drags[fichaId]
      if (!drag.dragging) return drags
      const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX
      const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY

      let newX = clientX - drag.offsetX
      let newY = clientY - drag.offsetY
      if (drag.bounds) {
        newX = Math.max(drag.bounds.left, Math.min(newX, drag.bounds.right))
        newY = Math.max(drag.bounds.top, Math.min(newY, drag.bounds.bottom))
      }

      return {
        ...drags,
        [fichaId]: {
          ...drag,
          x: newX,
          y: newY
        }
      }
    })
  }

  function stopDrag(fichaId) {
    setDrags(drags => ({
      ...drags,
      [fichaId]: { ...drags[fichaId], dragging: false }
    }))
    document.body.style.userSelect = ""
  }

  // Listeners para drag global de cada ficha
  useEffect(() => {
    fichas.forEach(ficha => {
      if (drags[ficha.id]?.dragging) {
        const move = e => onDrag(e, ficha.id)
        const up = () => stopDrag(ficha.id)
        window.addEventListener('mousemove', move)
        window.addEventListener('mouseup', up)
        window.addEventListener('touchmove', move)
        window.addEventListener('touchend', up)
        return () => {
          window.removeEventListener('mousemove', move)
          window.removeEventListener('mouseup', up)
          window.removeEventListener('touchmove', move)
          window.removeEventListener('touchend', up)
        }
      }
    })
    // eslint-disable-next-line
  }, [drags, fichas])

  function irParaCriarFichas() {
    navigate('/criarficha')
  }

  function irParaMinhasFichas() {
    navigate('/minhasfichas', { state: { fromSala: true, idSala } })
  }

  function irParaSalas() { navigate('/salas') }

  function irParaPerfil() { navigate('/perfil') }

  function irParaHomeLogin() { navigate('/homelogin') }

  return (
    <div className="background2">
      <div className="fundoSala">
        <aside className="menu-vertical">
          <div className="menu-header">
            <h2 className="sala-nome">{nomeSala}</h2>
            <span className="sala-sistema">{nomeSistema}</span>
          </div>
          <div className="menu-integrantes">
            <ul>
              {integrantes.map((int, idx) => (
                <li key={int.idUsuario || idx} className="integrante-card">
                  <div className="integrante-avatar-placeholder"></div>
                  <div className="integrante-info">
                    <span className="integrante-nome">{int.nomeUsuario}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="menu-rodape">
            <button onClick={irParaSalas} className="botao-sair">Sair da sala</button>
            <span className="sala-id">{idSala}</span>
          </div>
        </aside>
        <div className="conteudoSala" ref={areaRef}>
          {!fichas.length ? (
            <div className="botoes-centro fade-in">
              <h1 className="titulo-centro">{nomeSala}</h1>
              <button onClick={irParaCriarFichas} className="botao-centro">Criar uma ficha</button>
              <button onClick={irParaMinhasFichas} className="botao-centro">Inserir ficha existente</button>
            </div>
          ) : (
            fichas.map((ficha) => {
              const drag = drags[ficha.id] || {}
              return (
                <div
                  key={ficha.id}
                  className="card-ficha draggable-card"
                  ref={el => cardRefs.current[ficha.id] = el}
                  style={{
                    position: 'fixed',
                    left: drag.x !== null ? drag.x : '50%',
                    top: drag.y !== null ? drag.y : '50%',
                    transform: drag.x !== null && drag.y !== null
                      ? 'none'
                      : 'translate(-50%, -50%)',
                    zIndex: 100,
                    cursor: drag.dragging ? 'grabbing' : 'grab',
                    touchAction: 'none'
                  }}
                  onMouseDown={e => startDrag(e, ficha.id)}
                  onTouchStart={e => startDrag(e, ficha.id)}
                >
                  <div className="ficha-imagem-placeholder"></div>
                  <div className="ficha-info">
                    <h3>{ficha.nomePersonagem}</h3>
                    <p>Classe: {ficha.classe}</p>
                    <p>Raça: {ficha.raca}</p>
                    <p>Nível: {ficha.nivel}</p>
                  </div>
                </div>
              )
            })
          )}
          {fichas.length ? (
            <div className="botoes-icones-bottom fade-in">
              <button title="Chat" className="icone-botao"><span role="img" aria-label="chat">💬</span></button>
              <button title="Rolagem" className="icone-botao"><span role="img" aria-label="dice">🎲</span></button>
              <button title="Notas" className="icone-botao"><span role="img" aria-label="notas">📝</span></button>
              <button title="Configurações" className="icone-botao"><span role="img" aria-label="config">⚙️</span></button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default UsarSala