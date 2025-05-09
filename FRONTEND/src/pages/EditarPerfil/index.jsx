import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'
import { useRef } from 'react';

function EditarPerfil() {
    const navigate = useNavigate()
    const userId = localStorage.getItem('usuario')
    const userApelido = localStorage.getItem('apelido')
    const userEmail = localStorage.getItem('email')
    const userIdade = localStorage.getItem('idade')
    const userIngresso = localStorage.getItem('ingresso')
    //
    const inputApelido = useRef();
    const inputEmail = useRef();
    const inputIdade = useRef();
    const inputNovaSenha = useRef();
    const inputSenha = useRef();

    function irParaHomeLogin() {
        navigate('/homelogin')
      }

    function irParaLogin() {
        navigate('/login')
      }

    function irParaPerfil() {
        navigate('/perfil')
      }

    function SalvarAlteracao(){
        const apelido = inputApelido.current.value
        const email = inputEmail.current.value
        const idade = inputIdade.current.value
        const senhaNova = inputNovaSenha.current.value
        const senhaAtual = inputSenha.current.value

        // Aqui você pode fazer a chamada para a API para editar o perfil do usuário
    }

    return (
        <div className="background2">
        <header>
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <nav>
            <a onClick={irParaHomeLogin} style={{ cursor: 'pointer' }}>Home</a>
            <a /*onClick={}*/ style={{ cursor: 'pointer' }}>Salas</a>
            <a onClick={irParaPerfil}style={{ cursor: 'pointer' }} className="botaoSelecionado">Perfil</a>
          </nav>
        </header>

        <div className="fundo">
            <div className="titulo">
                <h1>Meu perfil</h1>
                <p>Editar informações</p>
            </div>
            <form>
                <input placeholder="Alterar apelido" name="apelido" type="text" ref={inputApelido} />
                <input placeholder="Alterar email" name="email" type="email" ref={inputEmail} />
                <input placeholder="Alterar idade" name="idade" type="date" ref={inputIdade} />
                <input placeholder="Alterar senha" name="senhaNova" type="password" ref={inputNovaSenha} />
                <label>Insira a sua senha atual para salvar</label>
                <input placeholder="Senha atual" name="senhaAtual" type="password" ref={inputSenha} />
                <button type="button" onClick={SalvarAlteracao}>Salvar</button>
            </form>
        </div>

      </div>
    )
}

export default EditarPerfil