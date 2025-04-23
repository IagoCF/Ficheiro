import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import api from '../../services/api'

function Login() {

  const inputEmail = useRef()
  const inputSenha = useRef()
  const navigate = useNavigate()

  async function entrar() {
    const email = inputEmail.current.value
    const senha = inputSenha.current.value

    if (!email || !senha) {
      alert('Preencha todos os campos!')
      return
    }

    try {
      const response = await api.get('/usuarios', { email, senha })
      if (response.data.length === 0) {
        alert('Usuário não encontrado!')
        return
      }
      const usuario = response.data[0]
      if (usuario.senha !== senha) {
        alert('Senha incorreta!')
        return
      } 

      alert('Login realizado com sucesso!')
      console.log(response.data)
    } catch (error) {
      alert('Erro ao realizar login!')
      console.error(error)
    }
  }

  function irParaRegistrar() {
    navigate('/registrar')
  }

  return (

    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Email" name="email" type="email" ref={inputEmail}/>
        <input placeholder="Senha" name="senha" type="password" ref={inputSenha}/>
        <button type="button" onClick={entrar}>Cadastrar</button>
      </form>
    
    <div className="container2">
      <h1>Já tem uma conta?</h1>
      <p>Faça login para acessar sua conta</p>
      <button type="button" onClick={irParaRegistrar}>Registrar</button>
    </div>


    </div>

  )
}

export default Login
