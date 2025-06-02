import express from 'express';
import { buscarFichas, salvarFicha } from '../controllers/fichaController.js';

const router = express.Router();
router.get('/', buscarFichas);
router.post('/', salvarFicha)

export default router;