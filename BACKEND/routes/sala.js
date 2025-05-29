import express from 'express';
import { buscarSalas } from '../controllers/salaController.js';

const router = express.Router();
router.get('/', buscarSalas);

export default router;