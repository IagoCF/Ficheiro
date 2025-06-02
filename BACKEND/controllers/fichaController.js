import conexao from '../db.js';

export function buscarFichas(req, res) {
    // Rota para buscar fichas de um usuário específico
        const usuarioId = req.query.usuarioId;

        if (!usuarioId) {
            return res.status(400).json({ erro: 'O parâmetro usuarioId é obrigatório.' });
        }

        const sql = 'SELECT id, nomePersonagem, classe, raca, nivel FROM ficha WHERE idUsuario = ?';
        conexao.query(sql, [usuarioId], function (erro, resultado) {
            if (erro) {
                console.error('Erro ao buscar fichas:', erro);
                return res.status(500).json({ erro: 'Erro ao buscar fichas.' });
            }
            res.json(resultado);
        });
}

export function salvarFicha(req, res) {
    const dados = req.body;

    // Lista de todos os campos da tabela ficha, na ordem correta
    const campos = [
        'idUsuario', 'nomePersonagem', 'classe', 'nivel', 'raca', 'antecedente', 'alinhamento', 'nomeJogador', 'pontosExperiencia',
        'forcaMod', 'forca', 'destrezaMod', 'destreza', 'constituicaoMod', 'constituicao', 'sabedoriaMod', 'sabedoria', 'carismaMod', 'carisma',
        'inspiracao', 'proficiencia', 'classeArmadura', 'iniciativa', 'deslocamento',
        'salvaProficienteFor', 'salvaguardaFor', 'salvaProficienteDex', 'salvaguardaDex', 'salvaProficienteCon', 'salvaguardaCon',
        'salvaProficienteInt', 'salvaguardaInt', 'salvaProficienteSab', 'salvaguardaSab', 'salvaProficienteCar', 'salvaguardaCar',
        'perProficienteAcr', 'periciaAcr', 'perProficienteArc', 'periciaArc', 'perProficienteAtl', 'periciaAtl', 'perProficienteAtu', 'periciaAtu',
        'perProficienteEng', 'periciaEng', 'perProficienteFur', 'periciaFur', 'perProficienteHis', 'periciaHis', 'perProficienteInt', 'periciaInt',
        'perProficienteInv', 'periciaInv', 'perProficienteLid', 'periciaLid', 'perProficienteMed', 'periciaMed', 'perProficienteNat', 'periciaNat',
        'perProficientePerc', 'periciaPer', 'perProficientePers', 'periciaPers', 'perProficientePre', 'periciaPre', 'perProficienteRel', 'periciaRel',
        'perProficienteSob', 'periciaSob',
        'pvMaximo', 'pvAtual', 'pvTemporario', 'dadoVidaTotal', 'dadoVida', 'sucesso1', 'sucesso2', 'sucesso3', 'falha1', 'falha2', 'falha3',
        'tracoPersonalidade', 'ideais', 'vinculos', 'fraquezas',
        'ataqueNome1', 'ataqueBonus1', 'ataqueDano1', 'ataqueNome2', 'ataqueBonus2', 'ataqueDano2', 'ataqueNome3', 'ataqueBonus3', 'ataqueDano3',
        'ataquesConjuracoes',
        'sabedoriaPassiva', 'caracteristicasTalentos', 'outrasProficiencias',
        'pc', 'pp', 'pe', 'po', 'pl', 'equipamento'
    ];

    // Monta os valores na ordem dos campos
    const values = campos.map(campo => dados[campo]);

    const sql = `
        INSERT INTO ficha (
            ${campos.join(', ')}
        ) VALUES (
            ${campos.map(() => '?').join(', ')}
        )
    `;

    conexao.query(sql, values, function (erro, resultado) {
        if (erro) {
            console.error('Erro ao salvar ficha:', erro);
            return res.status(500).json({ erro: 'Erro ao salvar ficha.' });
        }
        res.status(201).json({ mensagem: 'Ficha salva com sucesso!', id: resultado.insertId });
    });
}