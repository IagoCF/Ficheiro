import express from 'express';
import { vincularFichaSala, buscarFichasVinculadas, atualizarPosicaoFicha, buscarPosicaoFicha } from '../controllers/salaFichasController.js';

const router = express.Router();
router.post('/', vincularFichaSala);
router.get('/:idSala', buscarFichasVinculadas);
router.put('/posicao', atualizarPosicaoFicha);
router.get('/posicao/:idSala/:idFicha', buscarPosicaoFicha);

export default router;