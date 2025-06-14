import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'
import api from '../../services/api'
import { useRef } from 'react'

function CriarSala() {
    const navigate = useNavigate()
    const userId = localStorage.getItem('usuario')
    const nomeSalaRef = useRef()
    const sistemaRef = useRef()
    const descricaoRef = useRef()
    const senhaRef = useRef()

    function irParaHomeLogin() {
        navigate('/homelogin')
    }

    function irParaPerfil() {
        navigate('/perfil')
    }

    function irParaSalas() {
        navigate('/salas')
    }

    function irParaUsarSala() {
        navigate('/usarsala')
    }

    async function salvarSala() {
        const nome = nomeSalaRef.current.value
        const sistema = sistemaRef.current.value
        const descricao = descricaoRef.current.value
        const senha = senhaRef.current.value
        const criada = new Date().toISOString().slice(0, 10)

        if (!nome || !sistema || !descricao) {
            alert("Por favor, preencha todos os campos obrigatórios.")
            return
        }

        const payload = {
            nome,
            sistema,
            descricao,
            senha,
            idUsuarioCriador: userId,
            criada
        }

        try {
            // Cria a sala e obtém o ID retornado pelo backend
            const response = await api.post('/sala', payload)
            const salaId = response.data.id || response.data.sala_id || response.data.salaId

            // Vincula o usuário à sala criada
            if (salaId) {
                await api.post('/salaUsuario', {
                    idUsuario: userId,
                    idSala: salaId
                })
                // Salva o id da sala criada no localStorage
                localStorage.setItem('sala', salaId)
            }

            alert('Sala criada e vinculada com sucesso!')
            navigate('/usarsala')
        } catch (err) {
            alert(err)
            console.log(err)
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
                    <p>crie sua sala</p>
                </div>
                <div className="infoSala">
                    <form>
                        <input
                            placeholder="Nome da Sala"
                            name="nomeSala"
                            type="text"
                            className="inputCriarSala"
                            ref={nomeSalaRef}
                        />
                        <select
                            id="sistema"
                            name="sistema"
                            className="inputCriarSala"
                            ref={sistemaRef}
                        >
                            <option value="1">Dungeons & Dragons</option>
                        </select>
                        <textarea
                            id="descricao"
                            name="descricao"
                            className="descricaoSala"
                            placeholder="Descrição"
                            rows={4}
                            style={{ resize: "none" }}
                            ref={descricaoRef}
                        />
                        <input
                            placeholder="Senha (opcional)"
                            name="senha"
                            type="password"
                            className="inputCriarSala"
                            ref={senhaRef}
                        />
                    </form>
                    <div className="linha-vertical"></div>
                    <div className="imagemSala">
                        <div className="imagem-placeholder"> <span>+</span> </div>
                        <p className="imagem-label">Imagem da sala</p>
                    </div>
                </div>
                <button type="button" className="btn-salvar" onClick={salvarSala}>Salvar</button>
            </div>
        </div>
    )
}

export default CriarSala