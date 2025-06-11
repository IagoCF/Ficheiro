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

export function verificarSala(req, res) {
    const { idSala } = req.query;

    if (!idSala) {
        return res.status(400).json({ erro: 'O parâmetro idSala é obrigatório.' });
    }

    const sql = 'SELECT id, senha FROM sala WHERE id = ?';

    conexao.query(sql, [idSala], function (erro, resultado) {
        if (erro) {
            console.error('Erro ao verificar sala:', erro);
            return res.status(500).json({ erro: 'Erro ao verificar sala.' });
        }
        if (resultado.length === 0) {
            return res.json({ existe: false });
        }
        const sala = resultado[0];
        res.json({
            existe: true,
            precisaSenha: !!(sala.senha && sala.senha !== '')
        });
    });
}

export function entrarSala(req, res) {
    const { idSala, senha } = req.body;

    if (!idSala) {
        return res.status(400).json({ sucesso: false, erro: 'O parâmetro idSala é obrigatório.' });
    }

    conexao.query('SELECT senha FROM sala WHERE id = ?', [idSala], (erro, resultado) => {
        if (erro || resultado.length === 0) return res.json({ sucesso: false });
        // Se a sala não tem senha, ou senha bate, permite entrar
        if (!resultado[0].senha || resultado[0].senha === '' || resultado[0].senha === senha) {
            return res.json({ sucesso: true });
        }
        return res.json({ sucesso: false });
    });
}

export function excluirSala(req, res) {
    const { idSala } = req.params;

    if (!idSala) {
        return res.status(400).json({ erro: 'O parâmetro idSala é obrigatório.' });
    }

    const sql = 'DELETE FROM sala WHERE id = ?';

    conexao.query(sql, [idSala], function (erro, resultado) {
        if (erro) {
            console.error('Erro ao excluir sala:', erro);
            return res.status(500).json({ erro: 'Erro ao excluir sala.' });
        }
        res.json({ mensagem: 'Sala excluída com sucesso!', resultado });
    });
}