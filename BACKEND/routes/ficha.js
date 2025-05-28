import express from 'express';
import { buscarFichas } from '../controllers/fichaController.js';

const router = express.Router();
router.get('/', buscarFichas);

export default router;