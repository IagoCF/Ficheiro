import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import api from '../../services/api'
import axios from 'axios'

function UsarSala() {
  const navigate = useNavigate()
  const idSala = localStorage.getItem('sala')
  const idUsuario = localStorage.getItem('usuario')

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
  const [drags, setDrags] = useState({})

  // Atualiza drags quando fichas mudam
  useEffect(() => {
    if (!fichas.length) return;

    async function fetchPositionsAndAlert() {
      const positions = await Promise.all(
        fichas.map(async ficha => {
          try {
            const res = await api.get(`/salaFichas/posicao/${idSala}/${ficha.id}`);
            const x = res.data.x ?? res.data.posicao?.x ?? null;
            const y = res.data.y ?? res.data.posicao?.y ?? null;
            // Removido o alert
            return { id: ficha.id, x, y };
          } catch {
            // Removido o alert
            return { id: ficha.id, x: null, y: null };
          }
        })
      );

      // Inicializa drags com as posições buscadas
      const initialDrags = fichas.reduce((acc, ficha) => {
        const pos = positions.find(p => p.id === ficha.id) || {};
        acc[ficha.id] = {
          dragging: false,
          x: pos.x,
          y: pos.y,
          offsetX: 0,
          offsetY: 0,
          bounds: null
        };
        return acc;
      }, {});
      setDrags(initialDrags);
    }

    fetchPositionsAndAlert();
  }, [fichas, idSala]);

  const [draggingId, setDraggingId] = useState(null)
  const [dragged, setDragged] = useState(false)

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
    setDrags(drags => {
      // Se a ficha foi removida, não faz nada
      if (!drags[fichaId] || !fichas.some(f => f.id === fichaId)) return drags;
      const { x, y } = drags[fichaId];
      if (x !== null && y !== null) {
        api.put('/salaFichas/posicao', {
          idSala,
          idFicha: fichaId,
          x,
          y
        }).catch(err => console.error('Erro ao salvar posição:', err));
      }
      return {
        ...drags,
        [fichaId]: { ...drags[fichaId], dragging: false }
      }
    });
    document.body.style.userSelect = "";
  }

  // Listeners para drag global de cada ficha
  useEffect(() => {
    const listeners = [];

    fichas.forEach(ficha => {
      if (drags[ficha.id]?.dragging) {
        const move = e => onDrag(e, ficha.id)
        const up = () => {
          // Só chama stopDrag se a ficha ainda existe em drags
          if (drags[ficha.id]) stopDrag(ficha.id)
        }
        window.addEventListener('mousemove', move)
        window.addEventListener('mouseup', up)
        window.addEventListener('touchmove', move)
        window.addEventListener('touchend', up)
        listeners.push({ move, up })
      }
    })

    return () => {
      listeners.forEach(({ move, up }) => {
        window.removeEventListener('mousemove', move)
        window.removeEventListener('mouseup', up)
        window.removeEventListener('touchmove', move)
        window.removeEventListener('touchend', up)
      })
    }
  }, [drags, fichas])

  function irParaCriarFichas() {
    navigate('/criarficha', { state: { fromSala: true, idSala } })
  }

  function irParaMinhasFichas() {
    navigate('/minhasfichas', { state: { fromSala: true, idSala } })
  }

  function irParaSalas() { navigate('/salas') }

  async function excluirSala() {
    if (window.confirm('Tem certeza que deseja excluir esta sala?')) {
      await api.delete(`/salaFichas/removerTodos/${idSala}`);
      await api.delete(`/salaUsuario/desvincularTodos/${idSala}`)
      await api.delete(`/sala/excluir/${idSala}`);
      irParaSalas()
    }
  }

  // Componente para cada ficha
  function CardFicha({ idFicha }) {
    const [posicao, setPosicao] = useState({ x: 0, y: 0 })

    useEffect(() => {
      async function buscarPosicao() {
        try {
          const res = await axios.get(
            `/sua-rota/buscar-posicao-ficha?idSala=${idSala}&idFicha=${idFicha}`
          );
          setPosicao({ x: res.data.x, y: res.data.y });
        } catch (err) {
          // Trate erro ou use posição padrão
          setPosicao({ x: 0, y: 0 });
        }
      }
      buscarPosicao();
    }, [idSala, idFicha]);

    const drag = drags[idFicha] || {}

    return (
      <div
        key={idFicha}
        className="card-ficha draggable-card"
        ref={el => cardRefs.current[idFicha] = el}
        style={{
          position: 'fixed',
          left: drag.x !== null ? drag.x : posicao.x,
          top: drag.y !== null ? drag.y : posicao.y,
          transform: drag.x !== null && drag.y !== null
            ? 'none'
            : 'translate(-50%, -50%)',
          zIndex: 100,
          cursor: drag.dragging ? 'grabbing' : 'grab',
          touchAction: 'none'
        }}
        onMouseDown={e => {
          setDraggingId(idFicha)
          setDragged(false)
          ficha._startX = e.clientX
          ficha._startY = e.clientY
          startDrag(e, idFicha)
        }}
        onMouseMove={e => {
          if (draggingId === idFicha && !dragged) {
            const dx = Math.abs(e.clientX - ficha._startX)
            const dy = Math.abs(e.clientY - ficha._startY)
            if (dx > 5 || dy > 5) setDragged(true)
          }
        }}
        onMouseUp={e => {
          setDraggingId(null)
          setDragged(false)
        }}
        onMouseLeave={() => {
          setDraggingId(null)
          setDragged(false)
        }}
      >
        <div className="ficha-imagem-placeholder"></div>
        <div className="ficha-info">
          <h3>{ficha.nomePersonagem}</h3>
          <p>Classe: {ficha.classe}</p>
          <p>Raça: {ficha.raca}</p>
          <p>Nível: {ficha.nivel}</p>
        </div>
        <button
          className="botao-olho-ficha"
          title="Visualizar ficha"
          onClick={e => {
            e.stopPropagation()
            navigate(`/editarficha/${ficha.id}`, {
              state: {
                fromSala: true,
                idSala,
                criadorId: ficha.idUsuario
              }
            })
          }}
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            background: 'rgba(255,255,255,0.85)',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.10)',
            cursor: 'pointer',
            fontSize: 20
          }}
        >
          <span role="img" aria-label="Visualizar">👁️</span>
        </button>
      </div>
    )
  }

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
            <span className="sala-id">ID da Sala: #{idSala}</span>
          </div>
        </aside>
        <div className="conteudoSala" ref={areaRef}>
          {!fichas.length ? (
            <div className="botoes-centro fade-in">
              <h1 className="titulo-centro">{nomeSala}</h1>
              <button onClick={irParaCriarFichas} className="botao-centro">Criar uma ficha</button>
              <button onClick={irParaMinhasFichas} className="botao-centro">Inserir ficha existente</button>
              <button onClick={excluirSala} className="botao-centro">Excluir Sala</button>
            </div>
          ) : (
            fichas.map((ficha) => {
              const drag = drags[ficha.id] || { x: null, y: null, dragging: false }

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
                  onMouseDown={e => {
                    // Se clicou em um botão, não inicia drag
                    if (e.target.closest('button')) return;
                    setDraggingId(ficha.id)
                    setDragged(false)
                    ficha._startX = e.clientX
                    ficha._startY = e.clientY
                    startDrag(e, ficha.id)
                  }}
                  onMouseMove={e => {
                    if (draggingId === ficha.id && !dragged) {
                      const dx = Math.abs(e.clientX - ficha._startX)
                      const dy = Math.abs(e.clientY - ficha._startY)
                      if (dx > 5 || dy > 5) setDragged(true)
                    }
                  }}
                  onMouseUp={e => {
                    setDraggingId(null)
                    setDragged(false)
                  }}
                  onMouseLeave={() => {
                    setDraggingId(null)
                    setDragged(false)
                  }}
                >
                  <div className="ficha-imagem-placeholder"></div>
                  <div className="ficha-info">
                    <h3>{ficha.nomePersonagem}</h3>
                    <p>Classe: {ficha.classe}</p>
                    <p>Raça: {ficha.raca}</p>
                    <p>Nível: {ficha.nivel}</p>
                  </div>
                  <button
                    className="botao-olho-ficha"
                    title="Visualizar ficha"
                    onClick={e => {
                      e.stopPropagation()
                      navigate(`/editarficha/${ficha.id}`, {
                        state: {
                          fromSala: true,
                          idSala,
                          criadorId: ficha.idUsuario
                        }
                      })
                    }}
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: idUsuario === String(ficha.idUsuario) ? 56 : 12, // Ajusta posição se tiver botão de remover
                      background: 'rgba(255,255,255,0.85)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.10)',
                      cursor: 'pointer',
                      fontSize: 20
                    }}
                  >
                    <span role="img" aria-label="Visualizar">👁️</span>
                  </button>
                  {idUsuario === String(ficha.idUsuario) && (
                    <button
                      className="botao-remover-ficha"
                      title="Remover ficha da sala"
                      onClick={async e => {
                        e.stopPropagation()
                        try {
                          await api.delete('/salaFichas/remover', {
                            data: { idSala, idFicha: ficha.id }
                          })
                          setFichas(fichas.filter(f => f.id !== ficha.id))
                          setDrags(drags => {
                            const novo = { ...drags }
                            delete novo[ficha.id]
                            return novo
                          })
                        } catch (err) {
                          alert('Erro ao remover ficha da sala')
                        }
                      }}
                      style={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        background: 'rgba(255,255,255,0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 36,
                        height: 36,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.10)',
                        cursor: 'pointer',
                        fontSize: 20
                      }}
                    >
                      <span role="img" aria-label="Remover">❌</span>
                    </button>
                  )}
                </div>
              )
            })
          )}
          {fichas.length ? (
            <div className="botoes-icones-bottom fade-in">
              <button onClick={irParaMinhasFichas} title="Adicionar Ficha" className="icone-botao"><span role="img" aria-label="adicionar ficha">🔗</span></button>
              <button onClick={irParaCriarFichas} title="Criar Ficha" className="icone-botao"><span role="img" aria-label="criar ficha">➕</span></button>
              <button onClick={excluirSala} title="Excluir Sala" className="icone-botao"><span role="img" aria-label="excluir sala">🚩</span></button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default UsarSala