import conexao from '../db.js';

export function buscarUsuariosDaSala(req, res) {
    const { idSala } = req.query;

    if (!idSala) {
        return res.status(400).json({ erro: 'O parâmetro idSala é obrigatório.' });
    }

    const sql = 'SELECT idSala, idUsuario, nomeUsuario FROM viewSalaUsuario WHERE idSala = ?';

    conexao.query(sql, [idSala], function (erro, resultado) {
        if (erro) {
            console.error('Erro ao buscar usuários da sala:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar usuários da sala.' });
        }
        res.json(resultado);
    });
}