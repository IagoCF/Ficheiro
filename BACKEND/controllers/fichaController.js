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