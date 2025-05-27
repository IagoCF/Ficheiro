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
  //Mods
  const inputForcaMod = useRef()
  const inputDestrezaMod = useRef()
  const inputConstituicaoMod = useRef()
  const inputInteligenciaMod = useRef()
  const inputSabedoriaMod = useRef()
  const inputCarismaMod = useRef()

  const inputCa = useRef()
  const inputIniciativa = useRef()
  const inputDeslocamento = useRef()

  const inputPontosVida = useRef()
  const inputPontosVidaAtuais = useRef()
  const inputPontosVidaTemporarios = useRef()

  const inputInspiracao = useRef()
  const inputProficiencia = useRef()
  const inputSalvaguardaForca = useRef();
  const inputNumeroSalvaguardaForca = useRef();
  const inputSalvaguardaDestreza = useRef();
  const inputNumeroSalvaguardaDestreza = useRef();
  const inputSalvaguardaConstituicao = useRef();
  const inputNumeroSalvaguardaConstituicao = useRef();
  const inputSalvaguardaInteligencia = useRef();
  const inputNumeroSalvaguardaInteligencia = useRef();
  const inputSalvaguardaSabedoria = useRef();
  const inputNumeroSalvaguardaSabedoria = useRef();
  const inputSalvaguardaCarisma = useRef();
  const inputNumeroSalvaguardaCarisma = useRef();

  // Perícias
  const inputPericiaAcrobacia = useRef();
  const inputNumeroPericiaAcrobacia = useRef();
  const inputPericiaArcanismo = useRef();
  const inputNumeroPericiaArcanismo = useRef();
  const inputPericiaAtletismo = useRef();
  const inputNumeroPericiaAtletismo = useRef();
  const inputPericiaAtuacao = useRef();
  const inputNumeroPericiaAtuacao = useRef();
  const inputPericiaEnganacao = useRef();
  const inputNumeroPericiaEnganacao = useRef();
  const inputPericiaFurtividade = useRef();
  const inputNumeroPericiaFurtividade = useRef();
  const inputPericiaHistoria = useRef();
  const inputNumeroPericiaHistoria = useRef();
  const inputPericiaIntimidacao = useRef();
  const inputNumeroPericiaIntimidacao = useRef();
  const inputPericiaIntuicao = useRef();
  const inputNumeroPericiaIntuicao = useRef();
  const inputPericiaInvestigacao = useRef();
  const inputNumeroPericiaInvestigacao = useRef();
  const inputPericiaLidarComAnimais = useRef();
  const inputNumeroPericiaLidarComAnimais = useRef();
  const inputPericiaMedicina = useRef();
  const inputNumeroPericiaMedicina = useRef();
  const inputPericiaNatureza = useRef();
  const inputNumeroPericiaNatureza = useRef();
  const inputPericiaPercepcao = useRef();
  const inputNumeroPericiaPercepcao = useRef();
  const inputPericiaPersuasao = useRef();
  const inputNumeroPericiaPersuasao = useRef();
  const inputPericiaPrestidigitacao = useRef();
  const inputNumeroPericiaPrestidigitacao = useRef();
  const inputPericiaReligiao = useRef();
  const inputNumeroPericiaReligiao = useRef();
  const inputPericiaSobrevivencia = useRef();
  const inputNumeroPericiaSobrevivencia = useRef();
  // Salvaguarda contra morte - Sucessos e Falhas
  const inputSucessoMorte1 = useRef();
  const inputSucessoMorte2 = useRef();
  const inputSucessoMorte3 = useRef();
  const inputFalhaMorte1 = useRef();
  const inputFalhaMorte2 = useRef();
  const inputFalhaMorte3 = useRef();

  const inputDadoVidaTotal = useRef();
  const inputDadoVida = useRef();

  // Ataques
  const inputAtaqueNome1 = useRef();
  const inputAtaqueBonus1 = useRef();
  const inputAtaqueDano1 = useRef();
  const inputAtaqueNome2 = useRef();
  const inputAtaqueBonus2 = useRef();
  const inputAtaqueDano2 = useRef();
  const inputAtaqueNome3 = useRef();
  const inputAtaqueBonus3 = useRef();
  const inputAtaqueDano3 = useRef();

  const inputTracosPersonalidade = useRef();
  const inputIdeais = useRef();
  const inputVinculos = useRef();
  const inputFraquezas = useRef();

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
          <input className="campo forcamod" type="text" placeholder="FOR" ref={inputForcaMod} />
          <input className="campo forca" type="text" placeholder="FOR" ref={inputForca} />
          <input className="campo destrezamod" type="text" placeholder="DES" ref={inputDestrezaMod} />
          <input className="campo destreza" type="text" placeholder="DES" ref={inputDestreza} />
          <input className="campo constituicaomod" type="text" placeholder="CON" ref={inputConstituicaoMod} />
          <input className="campo constituicao" type="text" placeholder="CON" ref={inputConstituicao} />
          <input className="campo inteligenciamod" type="text" placeholder="INT" ref={inputInteligenciaMod} />
          <input className="campo inteligencia" type="text" placeholder="INT" ref={inputInteligencia} />
          <input className="campo sabedoriamod" type="text" placeholder="SAB" ref={inputSabedoriaMod} />
          <input className="campo sabedoria" type="text" placeholder="SAB" ref={inputSabedoria} />
          <input className="campo carismamod" type="text" placeholder="CAR" ref={inputCarismaMod} />
          <input className="campo carisma" type="text" placeholder="CAR" ref={inputCarisma} />

          {/* Defesa e Vida */}
          <input className="campo ca" type="text" placeholder="CA" ref={inputCa} />
          <input className="campo iniciativa" type="text" placeholder="Iniciativa" ref={inputIniciativa} />
          <input className="campo deslocamento" type="text" placeholder="Deslocamento" ref={inputDeslocamento} />

          <input className="campo pvMax" type="text" placeholder="PV Máximo" ref={inputPontosVida} />
          <input className="campo pvAtual" type="text" placeholder="PV Atual" ref={inputPontosVidaAtuais} />
          <input className="campo pvTemp" type="text" placeholder="PV Temporário" ref={inputPontosVidaTemporarios} />

          {/* Inspiração */}
          <input className="campo inspiracao" type="text" placeholder="Inspiração" ref={inputInspiracao} />

          {/* Proficiência */}
          <input className="campo proficiencia" type="text" placeholder="Bônus de Proficiência" ref={inputProficiencia} />

          {/* Salvaguardas */}
          <div className="campo salvaguardas">
            <div className="linha-salvaguarda">
              <input type="checkbox" className="bolinha bolinha-forca" ref={inputSalvaguardaForca} />
              <input type="text" className="numero-salvaguarda numero-forca" maxLength={2} ref={inputNumeroSalvaguardaForca} />
            </div>
            <div className="linha-salvaguarda">
              <input type="checkbox" className="bolinha bolinha-destreza" ref={inputSalvaguardaDestreza} />
              <input type="text" className="numero-salvaguarda numero-destreza" maxLength={2} ref={inputNumeroSalvaguardaDestreza} />
            </div>
            <div className="linha-salvaguarda">
              <input type="checkbox" className="bolinha bolinha-constituicao" ref={inputSalvaguardaConstituicao} />
              <input type="text" className="numero-salvaguarda numero-constituicao" maxLength={2} ref={inputNumeroSalvaguardaConstituicao} />
            </div>
            <div className="linha-salvaguarda">
              <input type="checkbox" className="bolinha bolinha-inteligencia" ref={inputSalvaguardaInteligencia} />
              <input type="text" className="numero-salvaguarda numero-inteligencia" maxLength={2} ref={inputNumeroSalvaguardaInteligencia} />
            </div>
            <div className="linha-salvaguarda">
              <input type="checkbox" className="bolinha bolinha-sabedoria" ref={inputSalvaguardaSabedoria} />
              <input type="text" className="numero-salvaguarda numero-sabedoria" maxLength={2} ref={inputNumeroSalvaguardaSabedoria} />
            </div>
            <div className="linha-salvaguarda">
              <input type="checkbox" className="bolinha bolinha-carisma" ref={inputSalvaguardaCarisma} />
              <input type="text" className="numero-salvaguarda numero-carisma" maxLength={2} ref={inputNumeroSalvaguardaCarisma} />
            </div>
          </div>

          {/* Perícias */}
          <div className="campo pericias">
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-acrobacia" ref={inputPericiaAcrobacia} />
              <input type="text" className="numero-pericia numero-acrobacia" maxLength={2} ref={inputNumeroPericiaAcrobacia} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-arcanismo" ref={inputPericiaArcanismo} />
              <input type="text" className="numero-pericia numero-arcanismo" maxLength={2} ref={inputNumeroPericiaArcanismo} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-atletismo" ref={inputPericiaAtletismo} />
              <input type="text" className="numero-pericia numero-atletismo" maxLength={2} ref={inputNumeroPericiaAtletismo} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-atuacao" ref={inputPericiaAtuacao} />
              <input type="text" className="numero-pericia numero-atuacao" maxLength={2} ref={inputNumeroPericiaAtuacao} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-enganacao" ref={inputPericiaEnganacao} />
              <input type="text" className="numero-pericia numero-enganacao" maxLength={2} ref={inputNumeroPericiaEnganacao} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-furtividade" ref={inputPericiaFurtividade} />
              <input type="text" className="numero-pericia numero-furtividade" maxLength={2} ref={inputNumeroPericiaFurtividade} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-historia" ref={inputPericiaHistoria} />
              <input type="text" className="numero-pericia numero-historia" maxLength={2} ref={inputNumeroPericiaHistoria} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-intimidacao" ref={inputPericiaIntimidacao} />
              <input type="text" className="numero-pericia numero-intimidacao" maxLength={2} ref={inputNumeroPericiaIntimidacao} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-intuicao" ref={inputPericiaIntuicao} />
              <input type="text" className="numero-pericia numero-intuicao" maxLength={2} ref={inputNumeroPericiaIntuicao} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-investigacao" ref={inputPericiaInvestigacao} />
              <input type="text" className="numero-pericia numero-investigacao" maxLength={2} ref={inputNumeroPericiaInvestigacao} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-lidar-com-animais" ref={inputPericiaLidarComAnimais} />
              <input type="text" className="numero-pericia numero-lidar-com-animais" maxLength={2} ref={inputNumeroPericiaLidarComAnimais} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-medicina" ref={inputPericiaMedicina} />
              <input type="text" className="numero-pericia numero-medicina" maxLength={2} ref={inputNumeroPericiaMedicina} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-natureza" ref={inputPericiaNatureza} />
              <input type="text" className="numero-pericia numero-natureza" maxLength={2} ref={inputNumeroPericiaNatureza} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-percepcao" ref={inputPericiaPercepcao} />
              <input type="text" className="numero-pericia numero-percepcao" maxLength={2} ref={inputNumeroPericiaPercepcao} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-persuasao" ref={inputPericiaPersuasao} />
              <input type="text" className="numero-pericia numero-persuasao" maxLength={2} ref={inputNumeroPericiaPersuasao} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-prestidigitacao" ref={inputPericiaPrestidigitacao} />
              <input type="text" className="numero-pericia numero-prestidigitacao" maxLength={2} ref={inputNumeroPericiaPrestidigitacao} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-religiao" ref={inputPericiaReligiao} />
              <input type="text" className="numero-pericia numero-religiao" maxLength={2} ref={inputNumeroPericiaReligiao} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-sobrevivencia" ref={inputPericiaSobrevivencia} />
              <input type="text" className="numero-pericia numero-sobrevivencia" maxLength={2} ref={inputNumeroPericiaSobrevivencia} />
            </div>
          </div>
          {/* Salvaguardas contra morte */}
          <div className="campo salvaguarda-morte">
            <div className="linha-salvaguarda-morte">
              <span className="label-salvaguarda-morte"></span>
              <input type="checkbox" className="bolinha bolinha-sucesso-morte1" ref={inputSucessoMorte1} />
              <input type="checkbox" className="bolinha bolinha-sucesso-morte2" ref={inputSucessoMorte2} />
              <input type="checkbox" className="bolinha bolinha-sucesso-morte3" ref={inputSucessoMorte3} />
            </div>
            <div className="linha-salvaguarda-morte">
              <span className="label-salvaguarda-morte"></span>
              <input type="checkbox" className="bolinha bolinha-falha-morte1" ref={inputFalhaMorte1} />
              <input type="checkbox" className="bolinha bolinha-falha-morte2" ref={inputFalhaMorte2} />
              <input type="checkbox" className="bolinha bolinha-falha-morte3" ref={inputFalhaMorte3} />
            </div>
          </div>
          <input className="campo dado-vida-total" type="text" placeholder="Total" ref={inputDadoVidaTotal} />
          <input className="campo dado-vida" type="text" placeholder="Total" ref={inputDadoVida} />
          {/* Ataques */}
          <div className="campo ataques">
            <div className="linha-ataque">
              <input type="text" className="ataque-nome" placeholder="Nome" ref={inputAtaqueNome1} />
              <input type="text" className="ataque-bonus" placeholder="Bônus Ataque" ref={inputAtaqueBonus1} />
              <input type="text" className="ataque-dano" placeholder="Dano/Tipo" ref={inputAtaqueDano1} />
            </div>
            <div className="linha-ataque">
              <input type="text" className="ataque-nome" placeholder="Nome" ref={inputAtaqueNome2} />
              <input type="text" className="ataque-bonus" placeholder="Bônus Ataque" ref={inputAtaqueBonus2} />
              <input type="text" className="ataque-dano" placeholder="Dano/Tipo" ref={inputAtaqueDano2} />
            </div>
            <div className="linha-ataque">
              <input type="text" className="ataque-nome" placeholder="Nome" ref={inputAtaqueNome3} />
              <input type="text" className="ataque-bonus" placeholder="Bônus Ataque" ref={inputAtaqueBonus3} />
              <input type="text" className="ataque-dano" placeholder="Dano/Tipo" ref={inputAtaqueDano3} />
            </div>
          </div>
          <textarea className="campo tracos-personalidade" placeholder="Traços de Personalidade" ref={inputTracosPersonalidade}/>
          <textarea className="campo ideais" placeholder="Ideais" ref={inputIdeais}/>
          <textarea className="campo vinculos" placeholder="Vínculos" ref={inputVinculos}/>
          <textarea className="campo fraquezas" placeholder="Fraquezas" ref={inputFraquezas}/>
        </div>
        <button className="botaoSalvar">Salvar</button>
      </div>
    </div>
  )
}

export default CriarFicha