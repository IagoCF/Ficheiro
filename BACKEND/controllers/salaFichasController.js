import conexao from '../db.js';

export function vincularFichaSala(req, res) {
    const { idFicha, idSala } = req.body;

    const sql = 'INSERT INTO salaFichas (idFicha, idSala) VALUES (?, ?)';

    conexao.query(sql, [idFicha, idSala], function (erro, resultado) {
        if (erro) {
            console.error('Erro ao vincular ficha à sala:', erro);
            return res.status(500).json({ erro: 'Erro ao vincular ficha à sala.' });
        }
        res.json({ mensagem: 'Ficha vinculado à sala com sucesso!', resultado });
    });
}

export function buscarFichasVinculadas(req, res) {
    const { idSala } = req.params;
    const sql = `
      SELECT f.id, f.nomePersonagem, f.classe, f.raca, f.nivel
      FROM salaFichas sf
      JOIN ficha f ON sf.idFicha = f.id
      WHERE sf.idSala = ?
    `;
    conexao.query(sql, [idSala], function (erro, resultados) {
        if (erro) {
            console.error('Erro ao buscar fichas vinculadas:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar fichas vinculadas.' });
        }
        res.json(resultados);
    });
}