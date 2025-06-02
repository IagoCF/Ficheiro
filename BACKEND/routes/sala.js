import express from 'express';
import { buscarSalas, salvarSala, verificarSala, entrarSala } from '../controllers/salaController.js';

const router = express.Router();
router.get('/', buscarSalas);
router.post('/', salvarSala);
router.get('/verificar', verificarSala);
router.post('/entrar', entrarSala);

export default router;