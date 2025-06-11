import express from 'express';
import { vincularSalaUsuario, usuarioVinculadoSala, desvincularTodosUsuariosSala } from '../controllers/salaUsuarioController.js';

const router = express.Router();
router.post('/', vincularSalaUsuario);
router.get('/verificar', usuarioVinculadoSala);
router.delete('/desvincularTodos/:idSala', desvincularTodosUsuariosSala);

export default router;