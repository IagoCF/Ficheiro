import express from 'express';
import { vincularSalaUsuario } from '../controllers/salaUsuarioController.js';

const router = express.Router();
router.post('/', vincularSalaUsuario);

export default router;