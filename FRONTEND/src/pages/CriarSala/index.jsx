import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'

function CriarSala() {
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

    function irParaUsarSala() {
        navigate('/usarsala')
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
                        <input placeholder="Nome da Sala" name="nomeSala" type="text" className="inputCriarSala"/>
                        <select id="sistema" name="sistema" className="inputCriarSala">
                            <option value="1">Dungeons & Dragons</option>
                        </select>
                        <textarea id="descricao" name="descricao" className="descricaoSala" placeholder="Descrição" rows={4} style={{ resize: "none" }}/>
                        <input placeholder="Senha (opcional)" name="senha" type="password" className="inputCriarSala"/>
                    </form>
                    <div className="linha-vertical"></div>
                    <div className="imagemSala">
                        <div className="imagem-placeholder"> <span>+</span> </div>
                        <p className="imagem-label">Imagem da sala</p>
                    </div>
                </div>
                <button type="button" className="btn-salvar" onClick={irParaUsarSala}>Salvar</button>
            </div>
        </div>
    )
}

export default CriarSala