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