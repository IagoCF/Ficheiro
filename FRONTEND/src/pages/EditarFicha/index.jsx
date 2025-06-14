import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import FichaImg from '../../assets/ficha1.jpg'
import './style.css'
import { useRef, useEffect, useState } from 'react'
import api from '../../services/api'

function EditarFicha() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const userId = localStorage.getItem('usuario')
  const fromSala = location.state?.fromSala
  const idSala = location.state?.idSala
  const criadorId = location.state?.criadorId

  // Todos os refs (mantidos)
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
  const inputSucessoMorte1 = useRef();
  const inputSucessoMorte2 = useRef();
  const inputSucessoMorte3 = useRef();
  const inputFalhaMorte1 = useRef();
  const inputFalhaMorte2 = useRef();
  const inputFalhaMorte3 = useRef();
  const inputDadoVidaTotal = useRef();
  const inputDadoVida = useRef();
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
  const inputAtaquesConjuracao = useRef();
  const inputCaracteristicasTalentos = useRef();
  const inputSabedoriaPassiva = useRef();
  const inputProficienciasIdiomas = useRef();
  const inputEquipamento = useRef();
  const inputPC = useRef();
  const inputPP = useRef();
  const inputPE = useRef();
  const inputPO = useRef();
  const inputPL = useRef();

  // Estado para bloquear campos se não for o criador
  const [isOwner, setIsOwner] = useState(false)

  function irParaHomeLogin() {
    navigate('/homelogin')
  }

  function irParaPerfil() {
    navigate('/perfil')
  }

  function irParaMinhasFichas() {
    navigate('/minhasfichas')
  }

  // Carregar dados da ficha ao abrir a página
  useEffect(() => {
    async function carregarFicha() {
      try {
        const { data } = await api.get(`/ficha/${id}`)
        // Preencher os campos
        inputNome.current.value = data.nomePersonagem || ''
        inputClasse.current.value = data.classe || ''
        inputNivel.current.value = data.nivel || ''
        inputRaca.current.value = data.raca || ''
        inputAntecedente.current.value = data.antecedente || ''
        inputJogador.current.value = data.nomeJogador || ''
        inputAlinhamento.current.value = data.alinhamento || ''
        inputXp.current.value = data.pontosExperiencia || ''
        inputForca.current.value = data.forca || ''
        inputDestreza.current.value = data.destreza || ''
        inputConstituicao.current.value = data.constituicao || ''
        inputInteligencia.current.value = data.inteligencia || ''
        inputSabedoria.current.value = data.sabedoria || ''
        inputCarisma.current.value = data.carisma || ''
        inputForcaMod.current.value = data.forcaMod || ''
        inputDestrezaMod.current.value = data.destrezaMod || ''
        inputConstituicaoMod.current.value = data.constituicaoMod || ''
        inputInteligenciaMod.current.value = data.inteligenciaMod || ''
        inputSabedoriaMod.current.value = data.sabedoriaMod || ''
        inputCarismaMod.current.value = data.carismaMod || ''
        inputCa.current.value = data.classeArmadura || ''
        inputIniciativa.current.value = data.iniciativa || ''
        inputDeslocamento.current.value = data.deslocamento || ''
        inputPontosVida.current.value = data.pvMaximo || ''
        inputPontosVidaAtuais.current.value = data.pvAtual || ''
        inputPontosVidaTemporarios.current.value = data.pvTemporario || ''
        inputInspiracao.current.value = data.inspiracao || ''
        inputProficiencia.current.value = data.proficiencia || ''
        inputSalvaguardaForca.current.checked = !!data.salvaProficienteFor
        inputNumeroSalvaguardaForca.current.value = data.salvaguardaFor || ''
        inputSalvaguardaDestreza.current.checked = !!data.salvaProficienteDex
        inputNumeroSalvaguardaDestreza.current.value = data.salvaguardaDex || ''
        inputSalvaguardaConstituicao.current.checked = !!data.salvaProficienteCon
        inputNumeroSalvaguardaConstituicao.current.value = data.salvaguardaCon || ''
        inputSalvaguardaInteligencia.current.checked = !!data.salvaProficienteInt
        inputNumeroSalvaguardaInteligencia.current.value = data.salvaguardaInt || ''
        inputSalvaguardaSabedoria.current.checked = !!data.salvaProficienteSab
        inputNumeroSalvaguardaSabedoria.current.value = data.salvaguardaSab || ''
        inputSalvaguardaCarisma.current.checked = !!data.salvaProficienteCar
        inputNumeroSalvaguardaCarisma.current.value = data.salvaguardaCar || ''
        inputPericiaAcrobacia.current.checked = !!data.perProficienteAcr
        inputNumeroPericiaAcrobacia.current.value = data.periciaAcr || ''
        inputPericiaArcanismo.current.checked = !!data.perProficienteArc
        inputNumeroPericiaArcanismo.current.value = data.periciaArc || ''
        inputPericiaAtletismo.current.checked = !!data.perProficienteAtl
        inputNumeroPericiaAtletismo.current.value = data.periciaAtl || ''
        inputPericiaAtuacao.current.checked = !!data.perProficienteAtu
        inputNumeroPericiaAtuacao.current.value = data.periciaAtu || ''
        inputPericiaEnganacao.current.checked = !!data.perProficienteEng
        inputNumeroPericiaEnganacao.current.value = data.periciaEng || ''
        inputPericiaFurtividade.current.checked = !!data.perProficienteFur
        inputNumeroPericiaFurtividade.current.value = data.periciaFur || ''
        inputPericiaHistoria.current.checked = !!data.perProficienteHis
        inputNumeroPericiaHistoria.current.value = data.periciaHis || ''
        inputPericiaIntimidacao.current.checked = !!data.perProficienteInt
        inputNumeroPericiaIntimidacao.current.value = data.periciaInt || ''
        inputPericiaIntuicao.current.checked = !!data.perProficienteInv
        inputNumeroPericiaIntuicao.current.value = data.periciaInv || ''
        inputPericiaInvestigacao.current.checked = !!data.perProficienteLid
        inputNumeroPericiaInvestigacao.current.value = data.periciaLid || ''
        inputPericiaLidarComAnimais.current.checked = !!data.perProficienteMed
        inputNumeroPericiaLidarComAnimais.current.value = data.periciaMed || ''
        inputPericiaMedicina.current.checked = !!data.perProficienteNat
        inputNumeroPericiaMedicina.current.value = data.periciaNat || ''
        inputPericiaNatureza.current.checked = !!data.perProficientePerc
        inputNumeroPericiaNatureza.current.value = data.periciaPer || ''
        inputPericiaPercepcao.current.checked = !!data.perProficientePers
        inputNumeroPericiaPercepcao.current.value = data.periciaPers || ''
        inputPericiaPersuasao.current.checked = !!data.perProficientePre
        inputNumeroPericiaPersuasao.current.value = data.periciaPre || ''
        inputPericiaPrestidigitacao.current.checked = !!data.perProficienteRel
        inputNumeroPericiaPrestidigitacao.current.value = data.periciaRel || ''
        inputPericiaReligiao.current.checked = !!data.perProficienteSob
        inputNumeroPericiaReligiao.current.value = data.periciaSob || ''
        inputPericiaSobrevivencia.current.checked = !!data.perProficienteSob
        inputNumeroPericiaSobrevivencia.current.value = data.periciaSob || ''
        inputSucessoMorte1.current.checked = !!data.sucesso1
        inputSucessoMorte2.current.checked = !!data.sucesso2
        inputSucessoMorte3.current.checked = !!data.sucesso3
        inputFalhaMorte1.current.checked = !!data.falha1
        inputFalhaMorte2.current.checked = !!data.falha2
        inputFalhaMorte3.current.checked = !!data.falha3
        inputDadoVidaTotal.current.value = data.dadoVidaTotal || ''
        inputDadoVida.current.value = data.dadoVida || ''
        inputAtaqueNome1.current.value = data.ataqueNome1 || ''
        inputAtaqueBonus1.current.value = data.ataqueBonus1 || ''
        inputAtaqueDano1.current.value = data.ataqueDano1 || ''
        inputAtaqueNome2.current.value = data.ataqueNome2 || ''
        inputAtaqueBonus2.current.value = data.ataqueBonus2 || ''
        inputAtaqueDano2.current.value = data.ataqueDano2 || ''
        inputAtaqueNome3.current.value = data.ataqueNome3 || ''
        inputAtaqueBonus3.current.value = data.ataqueBonus3 || ''
        inputAtaqueDano3.current.value = data.ataqueDano3 || ''
        inputTracosPersonalidade.current.value = data.tracoPersonalidade || ''
        inputIdeais.current.value = data.ideais || ''
        inputVinculos.current.value = data.vinculos || ''
        inputFraquezas.current.value = data.fraquezas || ''
        inputAtaquesConjuracao.current.value = data.ataquesConjuracoes || ''
        inputCaracteristicasTalentos.current.value = data.caracteristicasTalentos || ''
        inputSabedoriaPassiva.current.value = data.sabedoriaPassiva || ''
        inputProficienciasIdiomas.current.value = data.outrasProficiencias || ''
        inputPC.current.value = data.pc || ''
        inputPP.current.value = data.pp || ''
        inputPE.current.value = data.pe || ''
        inputPO.current.value = data.po || ''
        inputPL.current.value = data.pl || ''
        inputEquipamento.current.value = data.equipamento || ''

        // Descubra se o usuário é o criador
        setIsOwner(String(data.idUsuario) === String(userId))
      } catch (err) {
        alert('Erro ao carregar ficha!')
      }
    }
    if (id) carregarFicha()
    // eslint-disable-next-line
  }, [id, userId])

  async function salvarAlteracoes() {
    if (!isOwner) return; // Segurança extra

    const ficha = {
      idUsuario: localStorage.getItem('usuario'),
      nomePersonagem: inputNome.current.value,
      classe: inputClasse.current.value,
      nivel: parseInt(inputNivel.current.value) || 0,
      raca: inputRaca.current.value,
      antecedente: inputAntecedente.current.value,
      alinhamento: inputAlinhamento.current.value,
      nomeJogador: inputJogador.current.value,
      pontosExperiencia: parseInt(inputXp.current.value) || 0,
      forcaMod: parseInt(inputForcaMod.current.value) || 0,
      forca: parseInt(inputForca.current.value) || 0,
      destrezaMod: parseInt(inputDestrezaMod.current.value) || 0,
      destreza: parseInt(inputDestreza.current.value) || 0,
      constituicaoMod: parseInt(inputConstituicaoMod.current.value) || 0,
      constituicao: parseInt(inputConstituicao.current.value) || 0,
      sabedoriaMod: parseInt(inputSabedoriaMod.current.value) || 0,
      sabedoria: parseInt(inputSabedoria.current.value) || 0,
      carismaMod: parseInt(inputCarismaMod.current.value) || 0,
      carisma: parseInt(inputCarisma.current.value) || 0,
      inspiracao: parseInt(inputInspiracao.current.value) || 0,
      proficiencia: parseInt(inputProficiencia.current.value) || 0,
      classeArmadura: parseInt(inputCa.current.value) || 0,
      iniciativa: parseInt(inputIniciativa.current.value) || 0,
      deslocamento: parseInt(inputDeslocamento.current.value) || 0,
      salvaProficienteFor: inputSalvaguardaForca.current.checked,
      salvaguardaFor: parseInt(inputNumeroSalvaguardaForca.current.value) || 0,
      salvaProficienteDex: inputSalvaguardaDestreza.current.checked,
      salvaguardaDex: parseInt(inputNumeroSalvaguardaDestreza.current.value) || 0,
      salvaProficienteCon: inputSalvaguardaConstituicao.current.checked,
      salvaguardaCon: parseInt(inputNumeroSalvaguardaConstituicao.current.value) || 0,
      salvaProficienteInt: inputSalvaguardaInteligencia.current.checked,
      salvaguardaInt: parseInt(inputNumeroSalvaguardaInteligencia.current.value) || 0,
      salvaProficienteSab: inputSalvaguardaSabedoria.current.checked,
      salvaguardaSab: parseInt(inputNumeroSalvaguardaSabedoria.current.value) || 0,
      salvaProficienteCar: inputSalvaguardaCarisma.current.checked,
      salvaguardaCar: parseInt(inputNumeroSalvaguardaCarisma.current.value) || 0,
      perProficienteAcr: inputPericiaAcrobacia.current.checked,
      periciaAcr: parseInt(inputNumeroPericiaAcrobacia.current.value) || 0,
      perProficienteArc: inputPericiaArcanismo.current.checked,
      periciaArc: parseInt(inputNumeroPericiaArcanismo.current.value) || 0,
      perProficienteAtl: inputPericiaAtletismo.current.checked,
      periciaAtl: parseInt(inputNumeroPericiaAtletismo.current.value) || 0,
      perProficienteAtu: inputPericiaAtuacao.current.checked,
      periciaAtu: parseInt(inputNumeroPericiaAtuacao.current.value) || 0,
      perProficienteEng: inputPericiaEnganacao.current.checked,
      periciaEng: parseInt(inputNumeroPericiaEnganacao.current.value) || 0,
      perProficienteFur: inputPericiaFurtividade.current.checked,
      periciaFur: parseInt(inputNumeroPericiaFurtividade.current.value) || 0,
      perProficienteHis: inputPericiaHistoria.current.checked,
      periciaHis: parseInt(inputNumeroPericiaHistoria.current.value) || 0,
      perProficienteInt: inputPericiaIntimidacao.current.checked,
      periciaInt: parseInt(inputNumeroPericiaIntimidacao.current.value) || 0,
      perProficienteInv: inputPericiaIntuicao.current.checked,
      periciaInv: parseInt(inputNumeroPericiaIntuicao.current.value) || 0,
      perProficienteLid: inputPericiaLidarComAnimais.current.checked,
      periciaLid: parseInt(inputNumeroPericiaLidarComAnimais.current.value) || 0,
      perProficienteMed: inputPericiaMedicina.current.checked,
      periciaMed: parseInt(inputNumeroPericiaMedicina.current.value) || 0,
      perProficienteNat: inputPericiaNatureza.current.checked,
      periciaNat: parseInt(inputNumeroPericiaNatureza.current.value) || 0,
      perProficientePerc: inputPericiaPercepcao.current.checked,
      periciaPer: parseInt(inputNumeroPericiaPercepcao.current.value) || 0,
      perProficientePers: inputPericiaPersuasao.current.checked,
      periciaPers: parseInt(inputNumeroPericiaPersuasao.current.value) || 0,
      perProficientePre: inputPericiaPrestidigitacao.current.checked,
      periciaPre: parseInt(inputNumeroPericiaPrestidigitacao.current.value) || 0,
      perProficienteRel: inputPericiaReligiao.current.checked,
      periciaRel: parseInt(inputNumeroPericiaReligiao.current.value) || 0,
      perProficienteSob: inputPericiaSobrevivencia.current.checked,
      periciaSob: parseInt(inputNumeroPericiaSobrevivencia.current.value) || 0,
      pvMaximo: parseInt(inputPontosVida.current.value) || 0,
      pvAtual: parseInt(inputPontosVidaAtuais.current.value) || 0,
      pvTemporario: parseInt(inputPontosVidaTemporarios.current.value) || 0,
      dadoVidaTotal: parseInt(inputDadoVidaTotal.current.value) || 0,
      dadoVida: parseInt(inputDadoVida.current.value) || 0,
      sucesso1: inputSucessoMorte1.current.checked,
      sucesso2: inputSucessoMorte2.current.checked,
      sucesso3: inputSucessoMorte3.current.checked,
      falha1: inputFalhaMorte1.current.checked,
      falha2: inputFalhaMorte2.current.checked,
      falha3: inputFalhaMorte3.current.checked,
      tracoPersonalidade: inputTracosPersonalidade.current.value,
      ideais: inputIdeais.current.value,
      vinculos: inputVinculos.current.value,
      fraquezas: inputFraquezas.current.value,
      ataqueNome1: inputAtaqueNome1.current.value,
      ataqueBonus1: inputAtaqueBonus1.current.value,
      ataqueDano1: inputAtaqueDano1.current.value,
      ataqueNome2: inputAtaqueNome2.current.value,
      ataqueBonus2: inputAtaqueBonus2.current.value,
      ataqueDano2: inputAtaqueDano2.current.value,
      ataqueNome3: inputAtaqueNome3.current.value,
      ataqueBonus3: inputAtaqueBonus3.current.value,
      ataqueDano3: inputAtaqueDano3.current.value,
      ataquesConjuracoes: inputAtaquesConjuracao.current.value,
      sabedoriaPassiva: parseInt(inputSabedoriaPassiva.current.value) || 0,
      caracteristicasTalentos: inputCaracteristicasTalentos.current.value,
      outrasProficiencias: inputProficienciasIdiomas.current.value,
      pc: parseInt(inputPC.current.value) || 0,
      pp: parseInt(inputPP.current.value) || 0,
      pe: parseInt(inputPE.current.value) || 0,
      po: parseInt(inputPO.current.value) || 0,
      pl: parseInt(inputPL.current.value) || 0,
      equipamento: inputEquipamento.current.value
    }

    try {
      await api.put(`/ficha/${id}`, ficha)
      irParaMinhasFichas()
    } catch (err) {
      alert('Erro ao atualizar ficha!')
    }
  }

  // Função para voltar corretamente
  function voltar() {
    if (fromSala && idSala) {
      navigate('/usarsala')
    } else {
      navigate('/minhasfichas')
    }
  }

  // Função utilitária para bloquear todos os campos se não for o dono
  function getInputProps() {
    return isOwner ? {} : { disabled: true, readOnly: true, tabIndex: -1 }
  }
  function getCheckboxProps() {
    return isOwner ? {} : { disabled: true, tabIndex: -1 }
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
          <input className="campo nome" type="text" placeholder="Nome" ref={inputNome} {...getInputProps()} />
          <input className="campo classe" type="text" placeholder="Classe" ref={inputClasse} {...getInputProps()} />
          <input className="campo nivel" type="text" placeholder="Nível" ref={inputNivel} {...getInputProps()} />
          <input className="campo raca" type="text" placeholder="Raça" ref={inputRaca} {...getInputProps()} />
          <input className="campo antecedente" type="text" placeholder="Antecedente" ref={inputAntecedente} {...getInputProps()} />
          <input className="campo jogador" type="text" placeholder="Jogador" ref={inputJogador} {...getInputProps()} />
          <input className="campo alinhamento" type="text" placeholder="Alinhamento" ref={inputAlinhamento} {...getInputProps()} />
          <input className="campo xp" type="text" placeholder="XP" ref={inputXp} {...getInputProps()} />

          {/* Atributos */}
          <input className="campo forcamod" type="text" placeholder="FOR" ref={inputForcaMod} {...getInputProps()} />
          <input className="campo forca" type="text" placeholder="FOR" ref={inputForca} {...getInputProps()} />
          <input className="campo destrezamod" type="text" placeholder="DES" ref={inputDestrezaMod} {...getInputProps()} />
          <input className="campo destreza" type="text" placeholder="DES" ref={inputDestreza} {...getInputProps()} />
          <input className="campo constituicaomod" type="text" placeholder="CON" ref={inputConstituicaoMod} {...getInputProps()} />
          <input className="campo constituicao" type="text" placeholder="CON" ref={inputConstituicao} {...getInputProps()} />
          <input className="campo inteligenciamod" type="text" placeholder="INT" ref={inputInteligenciaMod} {...getInputProps()} />
          <input className="campo inteligencia" type="text" placeholder="INT" ref={inputInteligencia} {...getInputProps()} />
          <input className="campo sabedoriamod" type="text" placeholder="SAB" ref={inputSabedoriaMod} {...getInputProps()} />
          <input className="campo sabedoria" type="text" placeholder="SAB" ref={inputSabedoria} {...getInputProps()} />
          <input className="campo carismamod" type="text" placeholder="CAR" ref={inputCarismaMod} {...getInputProps()} />
          <input className="campo carisma" type="text" placeholder="CAR" ref={inputCarisma} {...getInputProps()} />

          {/* Defesa e Vida */}
          <input className="campo ca" type="text" placeholder="CA" ref={inputCa} {...getInputProps()} />
          <input className="campo iniciativa" type="text" placeholder="Iniciativa" ref={inputIniciativa} {...getInputProps()} />
          <input className="campo deslocamento" type="text" placeholder="Deslocamento" ref={inputDeslocamento} {...getInputProps()} />

          <input className="campo pvMax" type="text" placeholder="PV Máximo" ref={inputPontosVida} {...getInputProps()} />
          <input className="campo pvAtual" type="text" placeholder="PV Atual" ref={inputPontosVidaAtuais} {...getInputProps()} />
          <input className="campo pvTemp" type="text" placeholder="PV Temporário" ref={inputPontosVidaTemporarios} {...getInputProps()} />

          {/* Inspiração */}
          <input className="campo inspiracao" type="text" placeholder="Inspiração" ref={inputInspiracao} {...getInputProps()} />

          {/* Proficiência */}
          <input className="campo proficiencia" type="text" placeholder="Bônus de Proficiência" ref={inputProficiencia} {...getInputProps()} />

          {/* Salvaguardas */}
          <div className="campo salvaguardas">
            <div className="linha-salvaguarda">
              <input type="checkbox" className="bolinha bolinha-forca" ref={inputSalvaguardaForca} {...getCheckboxProps()} />
              <input type="text" className="numero-salvaguarda numero-forca" maxLength={2} ref={inputNumeroSalvaguardaForca} {...getInputProps()} />
            </div>
            <div className="linha-salvaguarda">
              <input type="checkbox" className="bolinha bolinha-destreza" ref={inputSalvaguardaDestreza} {...getCheckboxProps()} />
              <input type="text" className="numero-salvaguarda numero-destreza" maxLength={2} ref={inputNumeroSalvaguardaDestreza} {...getInputProps()} />
            </div>
            <div className="linha-salvaguarda">
              <input type="checkbox" className="bolinha bolinha-constituicao" ref={inputSalvaguardaConstituicao} {...getCheckboxProps()} />
              <input type="text" className="numero-salvaguarda numero-constituicao" maxLength={2} ref={inputNumeroSalvaguardaConstituicao} {...getInputProps()} />
            </div>
            <div className="linha-salvaguarda">
              <input type="checkbox" className="bolinha bolinha-inteligencia" ref={inputSalvaguardaInteligencia} {...getCheckboxProps()} />
              <input type="text" className="numero-salvaguarda numero-inteligencia" maxLength={2} ref={inputNumeroSalvaguardaInteligencia} {...getInputProps()} />
            </div>
            <div className="linha-salvaguarda">
              <input type="checkbox" className="bolinha bolinha-sabedoria" ref={inputSalvaguardaSabedoria} {...getCheckboxProps()} />
              <input type="text" className="numero-salvaguarda numero-sabedoria" maxLength={2} ref={inputNumeroSalvaguardaSabedoria} {...getInputProps()} />
            </div>
            <div className="linha-salvaguarda">
              <input type="checkbox" className="bolinha bolinha-carisma" ref={inputSalvaguardaCarisma} {...getCheckboxProps()} />
              <input type="text" className="numero-salvaguarda numero-carisma" maxLength={2} ref={inputNumeroSalvaguardaCarisma} {...getInputProps()} />
            </div>
          </div>

          {/* Perícias */}
          <div className="campo pericias">
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-acrobacia" ref={inputPericiaAcrobacia} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-acrobacia" maxLength={2} ref={inputNumeroPericiaAcrobacia} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-arcanismo" ref={inputPericiaArcanismo} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-arcanismo" maxLength={2} ref={inputNumeroPericiaArcanismo} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-atletismo" ref={inputPericiaAtletismo} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-atletismo" maxLength={2} ref={inputNumeroPericiaAtletismo} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-atuacao" ref={inputPericiaAtuacao} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-atuacao" maxLength={2} ref={inputNumeroPericiaAtuacao} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-enganacao" ref={inputPericiaEnganacao} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-enganacao" maxLength={2} ref={inputNumeroPericiaEnganacao} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-furtividade" ref={inputPericiaFurtividade} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-furtividade" maxLength={2} ref={inputNumeroPericiaFurtividade} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-historia" ref={inputPericiaHistoria} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-historia" maxLength={2} ref={inputNumeroPericiaHistoria} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-intimidacao" ref={inputPericiaIntimidacao} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-intimidacao" maxLength={2} ref={inputNumeroPericiaIntimidacao} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-intuicao" ref={inputPericiaIntuicao} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-intuicao" maxLength={2} ref={inputNumeroPericiaIntuicao} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-investigacao" ref={inputPericiaInvestigacao} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-investigacao" maxLength={2} ref={inputNumeroPericiaInvestigacao} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-lidar-com-animais" ref={inputPericiaLidarComAnimais} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-lidar-com-animais" maxLength={2} ref={inputNumeroPericiaLidarComAnimais} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-medicina" ref={inputPericiaMedicina} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-medicina" maxLength={2} ref={inputNumeroPericiaMedicina} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-natureza" ref={inputPericiaNatureza} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-natureza" maxLength={2} ref={inputNumeroPericiaNatureza} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-percepcao" ref={inputPericiaPercepcao} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-percepcao" maxLength={2} ref={inputNumeroPericiaPercepcao} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-persuasao" ref={inputPericiaPersuasao} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-persuasao" maxLength={2} ref={inputNumeroPericiaPersuasao} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-prestidigitacao" ref={inputPericiaPrestidigitacao} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-prestidigitacao" maxLength={2} ref={inputNumeroPericiaPrestidigitacao} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-religiao" ref={inputPericiaReligiao} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-religiao" maxLength={2} ref={inputNumeroPericiaReligiao} {...getInputProps()} />
            </div>
            <div className="linha-pericia">
              <input type="checkbox" className="bolinha bolinha-sobrevivencia" ref={inputPericiaSobrevivencia} {...getCheckboxProps()} />
              <input type="text" className="numero-pericia numero-sobrevivencia" maxLength={2} ref={inputNumeroPericiaSobrevivencia} {...getInputProps()} />
            </div>
          </div>
          {/* Salvaguardas contra morte */}
          <div className="campo salvaguarda-morte">
            <div className="linha-salvaguarda-morte">
              <span className="label-salvaguarda-morte"></span>
              <input type="checkbox" className="bolinha bolinha-sucesso-morte1" ref={inputSucessoMorte1} {...getCheckboxProps()} />
              <input type="checkbox" className="bolinha bolinha-sucesso-morte2" ref={inputSucessoMorte2} {...getCheckboxProps()} />
              <input type="checkbox" className="bolinha bolinha-sucesso-morte3" ref={inputSucessoMorte3} {...getCheckboxProps()} />
            </div>
            <div className="linha-salvaguarda-morte">
              <span className="label-salvaguarda-morte"></span>
              <input type="checkbox" className="bolinha bolinha-falha-morte1" ref={inputFalhaMorte1} {...getCheckboxProps()} />
              <input type="checkbox" className="bolinha bolinha-falha-morte2" ref={inputFalhaMorte2} {...getCheckboxProps()} />
              <input type="checkbox" className="bolinha bolinha-falha-morte3" ref={inputFalhaMorte3} {...getCheckboxProps()} />
            </div>
          </div>
          <input className="campo dado-vida-total" type="text" placeholder="Total" ref={inputDadoVidaTotal} {...getInputProps()} />
          <input className="campo dado-vida" type="text" placeholder="Total" ref={inputDadoVida} {...getInputProps()} />
          {/* Ataques */}
          <div className="campo ataques">
            <div className="linha-ataque">
              <input type="text" className="ataque-nome" placeholder="Nome" ref={inputAtaqueNome1} {...getInputProps()} />
              <input type="text" className="ataque-bonus" placeholder="Bônus Ataque" ref={inputAtaqueBonus1} {...getInputProps()} />
              <input type="text" className="ataque-dano" placeholder="Dano/Tipo" ref={inputAtaqueDano1} {...getInputProps()} />
            </div>
            <div className="linha-ataque">
              <input type="text" className="ataque-nome" placeholder="Nome" ref={inputAtaqueNome2} {...getInputProps()} />
              <input type="text" className="ataque-bonus" placeholder="Bônus Ataque" ref={inputAtaqueBonus2} {...getInputProps()} />
              <input type="text" className="ataque-dano" placeholder="Dano/Tipo" ref={inputAtaqueDano2} {...getInputProps()} />
            </div>
            <div className="linha-ataque">
              <input type="text" className="ataque-nome" placeholder="Nome" ref={inputAtaqueNome3} {...getInputProps()} />
              <input type="text" className="ataque-bonus" placeholder="Bônus Ataque" ref={inputAtaqueBonus3} {...getInputProps()} />
              <input type="text" className="ataque-dano" placeholder="Dano/Tipo" ref={inputAtaqueDano3} {...getInputProps()} />
            </div>
          </div>
          <textarea className="campo tracos-personalidade" placeholder="Traços de Personalidade" ref={inputTracosPersonalidade} {...getInputProps()} />
          <textarea className="campo ideais" placeholder="Ideais" ref={inputIdeais} {...getInputProps()} />
          <textarea className="campo vinculos" placeholder="Vínculos" ref={inputVinculos} {...getInputProps()} />
          <textarea className="campo fraquezas" placeholder="Fraquezas" ref={inputFraquezas} {...getInputProps()} />
          <textarea className="campo ataques-conjuracao" placeholder="Ataques e Conjuração" ref={inputAtaquesConjuracao} {...getInputProps()} />
          <textarea className="campo caracteristicas-talentos" placeholder="Características & Talentos" ref={inputCaracteristicasTalentos} {...getInputProps()} />
          <input className="campo sabedoria-passiva" type="text" placeholder="Sabedoria Passiva (Percepção)" ref={inputSabedoriaPassiva} {...getInputProps()}/>
          <textarea  className="campo proficiencias-idiomas" placeholder="Outras Proficiências & Idiomas" ref={inputProficienciasIdiomas} {...getInputProps()}/>
          {/* Moedas */}
          <input className="campo moeda-pc" type="text" placeholder="PC" ref={inputPC} {...getInputProps()} />
          <input className="campo moeda-pp" type="text" placeholder="PP" ref={inputPP} {...getInputProps()} />
          <input className="campo moeda-pe" type="text" placeholder="PE" ref={inputPE} {...getInputProps()} />
          <input className="campo moeda-po" type="text" placeholder="PO" ref={inputPO} {...getInputProps()} />
          <input className="campo moeda-pl" type="text" placeholder="PL" ref={inputPL} {...getInputProps()} />
          <textarea className="campo equipamento" placeholder="Equipamento" ref={inputEquipamento} {...getInputProps()}/>
        </div>
        {isOwner && (
          <button className="botaoSalvar" onClick={salvarAlteracoes}>Salvar Alterações</button>
        )}
        <button className="botaoVoltar" onClick={voltar}>Descartar Alterações</button>
      </div>
    </div>
  )
}

export default EditarFicha