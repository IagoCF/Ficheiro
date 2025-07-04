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
      SELECT f.id, f.idUsuario, f.nomePersonagem, f.classe, f.raca, f.nivel
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

export function atualizarPosicaoFicha(req, res) {
    const { idSala, idFicha, x, y } = req.body;

    if (
        idSala === undefined ||
        idFicha === undefined ||
        x === undefined ||
        y === undefined
    ) {
        return res.status(400).json({ erro: 'Parâmetros idSala, idFicha, x e y são obrigatórios.' });
    }

    const sql = 'UPDATE salaFichas SET x = ?, y = ? WHERE idSala = ? AND idFicha = ?';
    conexao.query(sql, [x, y, idSala, idFicha], (erro) => {
        if (erro) {
            console.error('Erro ao salvar posição:', erro);
            return res.status(500).json({ erro: 'Erro ao salvar posição.' });
        }
        res.json({ sucesso: true });
    });
}

export function buscarPosicaoFicha(req, res) {
    const idSala = Number(req.params.idSala);
    const idFicha = Number(req.params.idFicha);

    if (isNaN(idSala) || isNaN(idFicha)) {
        return res.status(400).json({ erro: 'Parâmetros idSala e idFicha são obrigatórios e devem ser números.' });
    }

    const sql = 'SELECT x, y FROM viewPosicao WHERE idSala = ? AND idFicha = ?';
    conexao.query(sql, [idSala, idFicha], (erro, resultados) => {
        if (erro) {
            console.error('Erro ao buscar posição:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar posição.' });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ erro: 'Posição não encontrada para essa ficha na sala.' });
        }
        res.json({ x: resultados[0].x, y: resultados[0].y });
    });
}

export function desvincularFichaSala(req, res) {
    const { idFicha, idSala } = req.body;

    if (!idFicha || !idSala) {
        return res.status(400).json({ erro: 'Parâmetros idFicha e idSala são obrigatórios.' });
    }

    const sql = 'DELETE FROM salaFichas WHERE idFicha = ? AND idSala = ?';

    conexao.query(sql, [idFicha, idSala], function (erro, resultado) {
        if (erro) {
            console.error('Erro ao desvincular ficha da sala:', erro);
            return res.status(500).json({ erro: 'Erro ao desvincular ficha da sala.' });
        }
        res.json({ mensagem: 'Ficha desvinculada da sala com sucesso!', resultado });
    });
}

export function desvincularTodasFichasSala(req, res) {
    const { idSala } = req.params;

    if (!idSala) {
        return res.status(400).json({ erro: 'Parâmetro idSala é obrigatório.' });
    }

    const sql = 'DELETE FROM salaFichas WHERE idSala = ?';

    conexao.query(sql, [idSala], function (erro, resultado) {
        if (erro) {
            console.error('Erro ao desvincular todas as fichas da sala:', erro);
            return res.status(500).json({ erro: 'Erro ao desvincular todas as fichas da sala.' });
        }
        res.json({ mensagem: 'Todas as fichas foram desvinculadas da sala com sucesso!', resultado });
    });
}