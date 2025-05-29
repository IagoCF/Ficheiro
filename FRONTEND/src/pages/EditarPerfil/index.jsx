import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'
import { useRef } from 'react';
import api from '../../services/api'

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
  const inputConfirmarSenha = useRef();

  function irParaHomeLogin() {
    navigate('/homelogin')
  }

  function irParaLogin() {
    navigate('/login')
  }

  function irParaPerfil() {
    navigate('/perfil')
  }

  function irParaSalas() {
        navigate('/salas')
  }

  async function SalvarAlteracao() {
    const apelido = inputApelido.current.value.trim();
    const email = inputEmail.current.value.trim();
    const idade = inputIdade.current.value.trim();
    const novaSenha = inputNovaSenha.current.value.trim();
    const confirmarSenha = inputConfirmarSenha.current.value.trim();
    const senhaAtual = inputSenha.current.value.trim();

    // Verifica se a senha atual foi preenchida
    if (!senhaAtual) {
      alert('A senha atual é obrigatória para salvar as alterações.');
      return;
    }

    // Verifica se as novas senhas coincidem
    if (novaSenha && novaSenha !== confirmarSenha) {
      alert('A nova senha e a confirmação de senha não coincidem.');
      return;
    }

    // Cria um objeto com os campos que foram alterados
    const dadosAtualizados = {};

    if (apelido && apelido) dadosAtualizados.apelido = apelido;
    if (email && email) dadosAtualizados.email = email;
    if (idade && idade) dadosAtualizados.idade = idade;
    if (novaSenha) dadosAtualizados.senhaNova = novaSenha;

    // Adiciona a senha atual ao objeto (obrigatória para autenticação)
    dadosAtualizados.senhaAtual = senhaAtual;

    // Verifica se há alterações para enviar
    if (Object.keys(dadosAtualizados).length === 1) { // Apenas senhaAtual está presente
      alert('Nenhuma alteração foi feita.');
      return;
    }

    try {
      // Envia os dados atualizados para o backend
      await api.put(`/usuarios/${userId}`, dadosAtualizados);
      if (apelido) localStorage.setItem('apelido', apelido);
      if (email) localStorage.setItem('email', email);
      if (idade) localStorage.setItem('idade', idade);
      alert('Alterações salvas com sucesso!');

      // Limpa os campos após o sucesso
      inputApelido.current.value = '';
      inputEmail.current.value = '';
      inputIdade.current.value = '';
      inputNovaSenha.current.value = '';
      inputConfirmarSenha.current.value = '';
      inputSenha.current.value = '';
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      alert('Senha atual incorreta ou erro ao salvar alterações.');
    }
  }

  async function excluirPerfil() {
    const senhaAtual = inputSenha.current.value.trim();

    if (!senhaAtual) {
      alert('Para excluir o perfil, insira sua senha atual.');
      return;
    }

    // Confirmação do usuário
    if (!window.confirm('Tem certeza que deseja excluir seu perfil?')) {
      return;
    }

    try {
      // Envia a senha atual para validação no backend
      const response = await api.delete(`/usuarios/${userId}`, {
        data: { senhaAtual }
      });

      if (response.status = 200) {
        alert('Perfil excluído!');
        localStorage.clear();
        window.location.replace('/login');
      } else {
        alert(response.data.erro || 'Senha atual incorreta ou erro ao excluir perfil.');
      }
    } catch (error) {
      console.error('Erro ao excluir perfil:', error);
      alert('Senha atual incorreta ou erro ao excluir perfil.');
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
          <p>Editar informações</p>
        </div>
        <form className="formAlterar">
          <div className="coluna-esquerda">
            <input placeholder="Alterar apelido" name="apelido" type="text" ref={inputApelido} />
            <input placeholder="Alterar email" name="email" type="email" ref={inputEmail} />
            <input placeholder="Alterar idade" name="idade" type="date" ref={inputIdade} />
            <button type="button" className="btn-salvar" onClick={SalvarAlteracao}>Salvar</button>
          </div>
          <div className="coluna-direita">
            <input placeholder="Alterar senha" name="senhaNova" type="password" ref={inputNovaSenha} />
            <input placeholder="Confirmar nova senha" name="senhaNovaConfirmar" type="password" ref={inputConfirmarSenha} />
            <input placeholder="Senha atual" name="senhaAtual" type="password" ref={inputSenha} />
            <button
              type="button"
              className="btn-excluir"
              onClick={excluirPerfil}
            >
              Excluir perfil
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default EditarPerfil