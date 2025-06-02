import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function UsarSala() {
  const navigate = useNavigate()
  const nomeSala = "Sala dos Heróis"
  const sistema = "Dungeons & Dragons"
  const integrantes = [
    { nome: "Fulanovsky", funcao: "Mestre", selecionado: false, mestre: true },
    { nome: "Macaco A", funcao: "Ajudante", selecionado: false },
    { nome: "Benson da Sil...", funcao: "Jogador", selecionado: false },
    { nome: "Matador de g...", funcao: "Espectador", selecionado: false }
  ]
  const idSala = "#000001"

  // Exemplo de ficha para teste
  const [fichas] = useState([
    {
      id: 1,
      nomePersonagem: "Arthas",
      classe: "Paladino",
      raca: "Humano",
      nivel: 5
    },
    {
      id: 2,
      nomePersonagem: "Coiso",
      classe: "Paladino",
      raca: "Humano",
      nivel: 5
    }
  ])

  // Drag state
  const cardRef = useRef(null)
  const areaRef = useRef(null)
  const [drag, setDrag] = useState({
    dragging: false,
    x: null,
    y: null,
    offsetX: 0,
    offsetY: 0,
    bounds: null
  })

  function startDrag(e) {
    e.preventDefault()
    const card = cardRef.current
    const area = areaRef.current
    const cardRect = card.getBoundingClientRect()
    const areaRect = area.getBoundingClientRect()
    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX
    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY

    setDrag({
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
    })
    document.body.style.userSelect = "none"
  }

  function onDrag(e) {
    if (!drag.dragging) return
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX
    const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY

    // Limitar dentro da área
    let newX = clientX - drag.offsetX
    let newY = clientY - drag.offsetY
    if (drag.bounds) {
      newX = Math.max(drag.bounds.left, Math.min(newX, drag.bounds.right))
      newY = Math.max(drag.bounds.top, Math.min(newY, drag.bounds.bottom))
    }

    setDrag(d => ({
      ...d,
      x: newX,
      y: newY
    }))
  }

  function stopDrag() {
    setDrag(d => ({ ...d, dragging: false }))
    document.body.style.userSelect = ""
  }

  // Listeners para drag global
  useEffect(() => {
    if (drag.dragging) {
      window.addEventListener('mousemove', onDrag)
      window.addEventListener('mouseup', stopDrag)
      window.addEventListener('touchmove', onDrag)
      window.addEventListener('touchend', stopDrag)
    } else {
      window.removeEventListener('mousemove', onDrag)
      window.removeEventListener('mouseup', stopDrag)
      window.removeEventListener('touchmove', onDrag)
      window.removeEventListener('touchend', stopDrag)
    }
    return () => {
      window.removeEventListener('mousemove', onDrag)
      window.removeEventListener('mouseup', stopDrag)
      window.removeEventListener('touchmove', onDrag)
      window.removeEventListener('touchend', stopDrag)
    }
  }, [drag.dragging])

  function irParaCriarFichas() {
    navigate('/criarficha')
  }

  function irParaMinhasFichas() {
    navigate('/minhasfichas')
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
            <span className="sala-sistema">{sistema}</span>
          </div>
          <div className="menu-integrantes">
            <ul>
              {integrantes.map((int, idx) => (
                <li key={idx} className={`integrante-card${int.selecionado ? " selecionado" : ""}`}>
                  <div className="integrante-avatar-placeholder"></div>
                  <div className="integrante-info">
                    <span className="integrante-nome">
                      {int.nome} {int.mestre && <span className="integrante-coroa"> 👑</span>}
                    </span>
                    <span className="integrante-funcao">{int.funcao}</span>
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
              <button className="botao-centro">Visualizar Fichas</button>
            </div>
          ) : (
            fichas.map((ficha, idx) => (
              <div
                key={ficha.id}
                className="card-ficha draggable-card"
                ref={cardRef}
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
                onMouseDown={startDrag}
                onTouchStart={startDrag}
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