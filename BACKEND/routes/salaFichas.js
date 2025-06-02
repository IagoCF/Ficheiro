import express from 'express';
import { vincularFichaSala, buscarFichasVinculadas } from '../controllers/salaFichasController.js';

const router = express.Router();
router.post('/', vincularFichaSala);
router.get('/:idSala', buscarFichasVinculadas);

export default router;