import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import api from '../../services/api'
import Logo from '../../assets/logo.png'

function Login() {

  const inputEmail = useRef()
  const inputSenha = useRef()
  const navigate = useNavigate()

  async function entrar() {
    const email = inputEmail.current.value;
    const senha = inputSenha.current.value;

    if (!email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      // Envia os parâmetros como query parameters
      const response = await api.get('/usuarios', {
        params: { email, senha }, // Envia email e senha como parâmetros
      });

      if (response.data.length === 0) {
        alert('Usuário não encontrado ou senha incorreta!');
        return;
      }

      const usuario = response.data[0];

      // Armazena os dados do usuário no localStorage
      localStorage.setItem('usuario', usuario.id);
      localStorage.setItem('email', usuario.email);
      localStorage.setItem('apelido', usuario.apelido);
      localStorage.setItem('idade', usuario.idade);
      localStorage.setItem('ingresso', usuario.ingresso);

      navigate('/homelogin');
    } catch (error) {
      alert('Erro ao realizar login!');
      console.error(error);
    }
  }

  function irParaRegistrar() {
    navigate('/registrar')
  }

  function irParaHome() {
    navigate('/')
  }

  return (
    <div className="background">
      <header>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <nav>
          <a onClick={irParaHome} style={{ cursor: 'pointer' }}>Home</a>
          <a className="botaoSelecionado" style={{ cursor: 'pointer' }}>Login/Registro</a>
        </nav>
      </header>

      <div className="container">
        <form>
          <h1>Fazer login</h1>
          <input placeholder="Email" name="email" type="email" ref={inputEmail} />
          <input placeholder="Senha" name="senha" type="password" ref={inputSenha} />
          <button type="button" onClick={entrar}>Entrar</button>

          <div className="container2">
            <h1>Não tem uma conta?</h1>
            <p>Clique <a onClick={irParaRegistrar} style={{ cursor: 'pointer' }}>aqui</a> para se registrar!</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
