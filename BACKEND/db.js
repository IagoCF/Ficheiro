import mysql from 'mysql2';

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'ficheiro',
    dateStrings: true
});

conexao.connect((erro) => {
    if (erro) throw erro;
    console.log('Conectado ao MySQL!');
});

export default conexao;