import express from 'express';
import { buscarSalas, salvarSala, verificarSala, entrarSala, excluirSala } from '../controllers/salaController.js';

const router = express.Router();
router.get('/', buscarSalas);
router.post('/', salvarSala);
router.get('/verificar', verificarSala);
router.post('/entrar', entrarSala);
router.delete('/excluir/:idSala', excluirSala);

export default router;