import express from 'express';
import { buscarSalas, salvarSala } from '../controllers/salaController.js';

const router = express.Router();
router.get('/', buscarSalas);
router.post('/', salvarSala);

export default router;