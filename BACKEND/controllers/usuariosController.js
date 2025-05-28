import conexao from '../db.js';

export function criarUsuario(req, res) {
    const { apelido, idade, email, senha, ingresso } = req.body;

    if (!apelido || !idade || !email || !senha) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
    }

    const sql = 'INSERT INTO usuarios (apelido, idade, email, senha, ingresso) VALUES (?, ?, ?, ?, ?)';
    const values = [apelido, idade, email, senha, ingresso];

    conexao.query(sql, values, function (erro, resultado) {
        if (erro) {
            console.error('Erro ao inserir:', erro);
            return res.status(500).json({ erro: 'Erro ao inserir registro' });
        }
        res.status(201).json({ mensagem: 'Registro inserido com sucesso!' });
    });
}

export function loginUsuario(req, res) {
        const { email, senha } = req.query; // Obtém os parâmetros da query string

        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
        conexao.query(sql, [email, senha], function (erro, resultado) {
            if (erro) {
                console.error('Erro ao consultar o banco de dados:', erro);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }

            if (resultado.length === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado ou senha incorreta' });
            }

            const usuario = resultado[0];
            if (usuario.idade) {
                const nascimento = new Date(usuario.idade);
                const hoje = new Date();
                let idade = hoje.getFullYear() - nascimento.getFullYear();
                const m = hoje.getMonth() - nascimento.getMonth();
                if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
                    idade--;
                }
                usuario.idade = idade;
            }

            if (usuario.ingresso) {
                const data = new Date(usuario.ingresso);
                const dia = String(data.getDate()).padStart(2, '0');
                const mes = String(data.getMonth() + 1).padStart(2, '0');
                const ano = data.getFullYear();
                usuario.ingresso = `${dia}/${mes}/${ano}`;
            }

            res.json(resultado); // Retorna o usuário encontrado
        });
}

export function atualizarUsuario(req, res) {
        const id = req.params.id;
        const { apelido, idade, email, senhaNova, senhaAtual } = req.body;

        // Verifica se a senha atual foi fornecida
        if (!senhaAtual) {
            return res.status(400).json({ erro: 'A senha atual é obrigatória!' });
        }

        // Busca o usuário no banco de dados para validar a senha atual
        const sqlBusca = 'SELECT * FROM usuarios WHERE id = ?';
        conexao.query(sqlBusca, [id], function (erro, resultado) {
            if (erro) {
                console.error('Erro ao consultar o banco de dados:', erro);
                return res.status(500).json({ erro: 'Erro interno do servidor' });
            }

            if (resultado.length === 0) {
                return res.status(404).json({ erro: 'Usuário não encontrado!' });
            }

            const usuario = resultado[0];

            // Valida a senha atual
            if (usuario.senha !== senhaAtual) {
                return res.status(401).json({ erro: 'A senha atual está incorreta!' });
            }

            // Cria um objeto com os campos a serem atualizados
            const camposAtualizados = {};
            if (apelido) camposAtualizados.apelido = apelido;
            if (idade) camposAtualizados.idade = idade;
            if (email) camposAtualizados.email = email;
            if (senhaNova) camposAtualizados.senha = senhaNova;

            // Verifica se há campos para atualizar
            if (Object.keys(camposAtualizados).length === 0) {
                return res.status(400).json({ erro: 'Nenhuma alteração foi feita!' });
            }

            // Monta a query de atualização dinamicamente
            const campos = Object.keys(camposAtualizados).map(campo => `${campo} = ?`).join(', ');
            const valores = Object.values(camposAtualizados);
            valores.push(id); // Adiciona o ID do usuário ao final dos valores

            const sqlAtualiza = `UPDATE usuarios SET ${campos} WHERE id = ?`;
            conexao.query(sqlAtualiza, valores, function (erro, resultado) {
                if (erro) {
                    console.error('Erro ao atualizar registro:', erro);
                    return res.status(500).json({ erro: 'Erro ao atualizar registro' });
                }

                console.log('Registro atualizado com sucesso!');
                res.status(200).json({ mensagem: 'Registro atualizado com sucesso!' });
            });
        });
}

export function deletarUsuario(req, res) {
        const id = req.params.id;
        const { senhaAtual } = req.body;

        // Verifica se a senha atual foi fornecida
        if (!senhaAtual) {
            return res.status(400).json({ erro: 'A senha atual é obrigatória!' });
        }

        // Busca o usuário no banco de dados para validar a senha atual
        const sqlBusca = 'SELECT * FROM usuarios WHERE id = ?';
        conexao.query(sqlBusca, [id], function (erro, resultado) {
            if (erro) {
                console.error('Erro ao consultar o banco de dados:', erro);
                return res.status(500).json({ erro: 'Erro interno do servidor' });
            }

            if (resultado.length === 0) {
                return res.status(404).json({ erro: 'Usuário não encontrado!' });
            }

            const usuario = resultado[0];

            // Valida a senha atual
            if (usuario.senha !== senhaAtual) {
                return res.status(401).json({ erro: 'A senha atual está incorreta!' });
            }

            // Prossegue com a exclusão
            const sql = 'DELETE FROM usuarios WHERE id = ?';
            conexao.query(sql, [id], function (erro, resultado) {
                if (erro) {
                    console.error('Erro ao deletar registro:', erro);
                    return res.status(500).json({ erro: 'Erro ao deletar registro' });
                }
                return res.status(200).json({ mensagem: 'Registro deletado com sucesso!' });
            });
        });
}