import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'
import api from '../../services/api'

function Registrar() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const inputApelido = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()
  const inputSenha = useRef()
  const inputConferirSenha = useRef()
  const [dateType, setDateType] = useState('text')
  const [dateValue, setDateValue] = useState('')

  function irParaHome() {
    navigate('/')
  }

  function irParaLogin() {
    navigate('/login')
  }

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    const usersWithCalculatedAge = usersFromApi.data.map(user => {
      const birthDate = new Date(user.idade)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      const dayDiff = today.getDate() - birthDate.getDate()
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--
      }
      return {
        ...user,
        idade: age
      }
    })

    setUsers(usersWithCalculatedAge)
  }

  async function createUsers() {
    const senha = inputSenha.current.value
    const conferirSenha = inputConferirSenha.current.value
    const dataNascimento = new Date(inputIdade.current.value)
    const hoje = new Date().toISOString().split('T')[0]; // Formata para YYYY-MM-DD

    /*if (senha.length < 7) {
      alert('A senha deve ter no mínimo 7 caracteres!')
      return
    }*/

    if (senha !== conferirSenha) {
      alert('As senhas não conferem!')
      return
    }

    if (isNaN(dataNascimento.getTime()) || dataNascimento >= hoje) {
      alert('A data de nascimento deve ser uma data válida no passado!')
      return
    }

    await api.post('/usuarios', {
      apelido: inputApelido.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value,
      senha: senha,
      ingresso: hoje
    })

    getUsers()
    alert('Usuário cadastrado com sucesso!')
    navigate('/login')
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="background">
      <header>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <nav>
          <a onClick={irParaHome} style={{ cursor: 'pointer' }}>Home</a>
          <a onClick={irParaLogin} className="botaoSelecionado" style={{ cursor: 'pointer' }}>Login/Registro</a>
        </nav>
      </header>

      <div className="container">
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder="Apelido" name="apelido" type="text" ref={inputApelido} />
          <input
            placeholder="Data de Nascimento"
            name="idade"
            type={dateType}
            ref={inputIdade}
            value={dateValue}
            onFocus={() => setDateType('date')}
            onBlur={e => {
              if (!e.target.value) setDateType('text')
            }}
            onChange={e => setDateValue(e.target.value)}
            style={{ color: dateValue ? '#000' : '#888' }}
          />
          <input placeholder="Email" name="email" type="email" ref={inputEmail} />
          <input placeholder="Senha" name="senha" type="password" ref={inputSenha} />
          <input placeholder="Conferir Senha" name="conferirSenha" type="password" ref={inputConferirSenha} />
          <button type="button" onClick={createUsers}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default Registrar
