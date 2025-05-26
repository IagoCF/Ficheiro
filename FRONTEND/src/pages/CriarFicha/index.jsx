import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import FichaImg from '../../assets/ficha1.jpg'
import './style.css'
import { useRef } from 'react'

function CriarFicha() {
  const navigate = useNavigate()

  const inputNome = useRef()
  const inputClasse = useRef()
  const inputNivel = useRef()
  const inputRaca = useRef()
  const inputAntecedente = useRef()
  const inputJogador = useRef()
  const inputAlinhamento = useRef()
  const inputXp = useRef()

  const inputForca = useRef()
  const inputDestreza = useRef()
  const inputConstituicao = useRef()
  const inputInteligencia = useRef()
  const inputSabedoria = useRef()
  const inputCarisma = useRef()

  const inputCa = useRef()
  const inputIniciativa = useRef()
  const inputDeslocamento = useRef()

  const inputPontosVida = useRef()
  const inputPontosVidaAtuais = useRef()
  const inputPontosVidaTemporarios = useRef()

  const inputHistoria = useRef()

  function irParaHomeLogin() {
    navigate('/homelogin')
  }

  function irParaPerfil() {
    navigate('/perfil')
  }

  return (
    <div className="background2">
      <header>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <nav>
          <a onClick={irParaHomeLogin} style={{ cursor: 'pointer' }}>Home</a>
          <a style={{ cursor: 'pointer' }}>Salas</a>
          <a onClick={irParaPerfil} style={{ cursor: 'pointer' }} className="botaoSelecionado">Perfil</a>
        </nav>
      </header>

      <div className="fundo2">
        <div className="ficha-container">
          <img src={FichaImg} alt="Ficha" className="ficha-img" />

          {/* Dados principais */}
          <input className="campo nome" type="text" placeholder="Nome" ref={inputNome} />
          <input className="campo classe" type="text" placeholder="Classe" ref={inputClasse} />
          <input className="campo nivel" type="text" placeholder="Nível" ref={inputNivel} />
          <input className="campo raca" type="text" placeholder="Raça" ref={inputRaca} />
          <input className="campo antecedente" type="text" placeholder="Antecedente" ref={inputAntecedente} />
          <input className="campo jogador" type="text" placeholder="Jogador" ref={inputJogador} />
          <input className="campo alinhamento" type="text" placeholder="Alinhamento" ref={inputAlinhamento} />
          <input className="campo xp" type="text" placeholder="XP" ref={inputXp} />

          {/* Atributos */}
          <input className="campo forca" type="text" placeholder="FOR" ref={inputForca} />
          <input className="campo destreza" type="text" placeholder="DES" ref={inputDestreza} />
          <input className="campo constituicao" type="text" placeholder="CON" ref={inputConstituicao} />
          <input className="campo inteligencia" type="text" placeholder="INT" ref={inputInteligencia} />
          <input className="campo sabedoria" type="text" placeholder="SAB" ref={inputSabedoria} />
          <input className="campo carisma" type="text" placeholder="CAR" ref={inputCarisma} />

          {/* Defesa e Vida */}
          <input className="campo ca" type="text" placeholder="CA" ref={inputCa} />
          <input className="campo iniciativa" type="text" placeholder="Iniciativa" ref={inputIniciativa} />
          <input className="campo deslocamento" type="text" placeholder="Deslocamento" ref={inputDeslocamento} />

          <input className="campo pvMax" type="text" placeholder="PV Máximo" ref={inputPontosVida} />
          <input className="campo pvAtual" type="text" placeholder="PV Atual" ref={inputPontosVidaAtuais} />
          <input className="campo pvTemp" type="text" placeholder="PV Temporário" ref={inputPontosVidaTemporarios} />
        </div>
        <button className="botaoSalvar">Salvar</button>
      </div>
    </div>
  )
}

export default CriarFicha