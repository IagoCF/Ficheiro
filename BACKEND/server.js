import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuarios.js';
import fichaRoutes from './routes/ficha.js';
import salaRoutes from './routes/sala.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/usuarios', usuariosRoutes);
app.use('/ficha', fichaRoutes);
app.use('/sala', salaRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));