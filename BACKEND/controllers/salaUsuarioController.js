import conexao from '../db.js';

export function vincularSalaUsuario(req, res) {
    const { idUsuario, idSala } = req.body;

    const sql = 'INSERT INTO salaUsuario (idUsuario, idSala) VALUES (?, ?)';

    conexao.query(sql, [idUsuario, idSala], function (erro, resultado) {
        if (erro) {
            if (erro.code === 'ER_DUP_ENTRY') {
                // Já está vinculado, não é erro fatal
                return res.json({ mensagem: 'Usuário já está vinculado à sala.' });
            }
            console.error('Erro ao vincular usuário à sala:', erro);
            return res.status(500).json({ erro: 'Erro ao vincular usuário à sala.' });
        }
        res.json({ mensagem: 'Usuário vinculado à sala com sucesso!', resultado });
    });
}

export function usuarioVinculadoSala(req, res) {
    const { idUsuario, idSala } = req.query;

    if (!idUsuario || !idSala) {
        return res.status(400).json({ erro: 'Parâmetros idUsuario e idSala são obrigatórios.' });
    }

    const sql = 'SELECT 1 FROM salaUsuario WHERE idUsuario = ? AND idSala = ? LIMIT 1';

    conexao.query(sql, [idUsuario, idSala], function (erro, resultado) {
        if (erro) {
            console.error('Erro ao verificar vínculo:', erro);
            return res.status(500).json({ erro: 'Erro ao verificar vínculo.' });
        }
        res.json({ vinculado: resultado.length > 0 });
    });
}

export function desvincularTodosUsuariosSala(req, res) {
    const { idSala } = req.params;

    if (!idSala) {
        return res.status(400).json({ erro: 'Parâmetro idSala é obrigatório.' });
    }

    const sql = 'DELETE FROM salaUsuario WHERE idSala = ?';

    conexao.query(sql, [idSala], function (erro, resultado) {
        if (erro) {
            console.error('Erro ao desvincular usuários da sala:', erro);
            return res.status(500).json({ erro: 'Erro ao desvincular usuários da sala.' });
        }
        res.json({ mensagem: 'Todos os usuários foram desvinculados da sala com sucesso!', resultado });
    });
}