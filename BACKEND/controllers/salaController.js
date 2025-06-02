import conexao from '../db.js';

export function buscarSalas(req, res) {
    const { usuarioId } = req.query;

    let sql = 'SELECT id, nome_sala, nome_sistema, criada FROM viewSala';
    let params = [];

    if (usuarioId) {
        sql += ' WHERE idUsuarioCriador = ?';
        params.push(usuarioId);
    }

    conexao.query(sql, params, function (erro, resultado) {
        if (erro) {
            console.error('Erro ao buscar salas:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar salas.' });
        }
        res.json(resultado);
    });
}

export function salvarSala(req, res) {
    const { nome, sistema, idUsuarioCriador, senha, descricao, criada } = req.body;

    // Validação básica
    if (!nome || !sistema || !idUsuarioCriador || !criada) {
        return res.status(400).json({ erro: 'Campos obrigatórios: nome, sistema, idUsuarioCriador, criada.' });
    }

    let campos = ['nome', 'sistema', 'idUsuarioCriador', 'descricao', 'criada'];
    let valores = [nome, sistema, idUsuarioCriador, descricao, criada];

    if (senha && senha !== '') {
        campos.push('senha');
        valores.push(senha);
    }

    const sql = `
        INSERT INTO sala (${campos.join(', ')})
        VALUES (${campos.map(() => '?').join(', ')})
    `;

    conexao.query(sql, valores, function (erro, resultado) {
        if (erro) {
            console.error('Erro ao salvar sala:', erro.sqlMessage || erro);
            return res.status(500).json({ erro: 'Erro ao salvar sala.', detalhe: erro.sqlMessage || erro });
        }
        res.status(201).json({ mensagem: 'Sala criada com sucesso!', id: resultado.insertId });
    });
}