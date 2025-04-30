import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
// teste
const app = express();
app.use(express.json())
app.use(cors())

const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'teste',
    dateStrings: true // <- força que datas venham como string
});  

conexao.connect(function(erro) {
    if (erro) throw erro;
    console.log('Conectado ao MySQL!');
});

const users = []

app.use(express.json());

app.post('/usuarios', function (req, res) {
    // Pegando dados do body da requisição
    const { apelido, idade, email, senha, ingresso } = req.body;

    // Validação para verificar se algum campo está nulo ou indefinido
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

        console.log('Registro inserido com sucesso!');
        res.status(201).json({ mensagem: 'Registro inserido com sucesso!' });
    });
});

app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios'
    conexao.query(sql, function (erro, resultado) {
        if (erro) throw erro;
        res.json(resultado);
    });
})

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM usuarios WHERE id = ?'
    conexao.query(sql, [id], function (erro, resultado) {
        if (erro) throw erro;
        res.json({ mensagem: 'Registro deletado com sucesso!' });
    });
})

app.listen(3000)