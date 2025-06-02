import conexao from '../db.js';

export function vincularSalaUsuario(req, res) {
    const { idUsuario, idSala } = req.body;

    const sql = 'INSERT INTO salaUsuario (idUsuario, idSala) VALUES (?, ?)';

    conexao.query(sql, [idUsuario, idSala], function (erro, resultado) {
        if (erro) {
            console.error('Erro ao vincular usuário à sala:', erro);
            return res.status(500).json({ erro: 'Erro ao vincular usuário à sala.' });
        }
        res.json({ mensagem: 'Usuário vinculado à sala com sucesso!', resultado });
    });
}