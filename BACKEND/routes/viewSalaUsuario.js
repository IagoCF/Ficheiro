import express from 'express';
import { buscarUsuariosDaSala } from '../controllers/viewSalaUsuarioController.js';

const router = express.Router();
router.get('/', buscarUsuariosDaSala);

export default router;