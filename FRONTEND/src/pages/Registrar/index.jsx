import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/bin.png'
import api from '../../services/api'

function Registrar() {
  const [users, setUsers] = useState([])

  const inputApelido = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()
  const inputSenha = useRef()
  const inputConferirSenha = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios');
  
    const usersWithCalculatedAge = usersFromApi.data.map(user => {
      const birthDate = new Date(user.idade);
      const today = new Date();
  
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
  
      // Ajusta idade caso ainda não tenha feito aniversário este ano
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
  
      return {
        ...user,
        idade: age // substitui a data de nascimento pela idade calculada
      };
    });
  
    setUsers(usersWithCalculatedAge);
  }

  async function createUsers() {
    const senha = inputSenha.current.value;
    const conferirSenha = inputConferirSenha.current.value;
    const dataNascimento = new Date(inputIdade.current.value);
    const hoje = new Date();
  
    if (senha !== conferirSenha) {
      alert('As senhas não conferem!');
      return;
    }
  
    // Validação: data de nascimento deve ser anterior a hoje
    if (isNaN(dataNascimento.getTime()) || dataNascimento >= hoje) {
      alert('A data de nascimento deve ser uma data válida no passado!');
      return;
    }
  
    await api.post('/usuarios', {
      apelido: inputApelido.current.value,
      idade: inputIdade.current.value, // ainda está enviando no formato AAAA-MM-DD
      email: inputEmail.current.value,
      senha: senha
    });
  
    getUsers();
  }  

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Apelido" name="apelido" type="text" ref={inputApelido}/>
        <input placeholder="Idade" name="idade" type="date" ref={inputIdade}/>
        <input placeholder="Email" name="email" type="email" ref={inputEmail}/>
        <input placeholder="Senha" name="senha" type="password" ref={inputSenha}/>
        <input placeholder="Conferir Senha" name="conferirSenha" type="password" ref={inputConferirSenha}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {
        users.map((user) => (
          <div key={user.id} className="card">
            <p>Apelido: <span>{user.apelido}</span></p>
            <p>Idade: <span>{user.idade}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} alt="trash" />
            </button>
          </div>
        ))
      }

    </div>

  )
}

export default Registrar
