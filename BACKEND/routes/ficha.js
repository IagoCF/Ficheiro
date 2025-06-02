import express from 'express';
import { buscarFichas, salvarFicha, editarFicha, buscarFichaPorId } from '../controllers/fichaController.js';

const router = express.Router();
router.get('/', buscarFichas);
router.get('/:id', buscarFichaPorId);
router.post('/', salvarFicha);
router.put('/:id', editarFicha);

export default router;