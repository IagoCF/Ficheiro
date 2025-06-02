import express from 'express';
import { vincularSalaUsuario, usuarioVinculadoSala } from '../controllers/salaUsuarioController.js';

const router = express.Router();
router.post('/', vincularSalaUsuario);
router.get('/verificar', usuarioVinculadoSala);

export default router;