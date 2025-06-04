import express from 'express';
import { vincularFichaSala, buscarFichasVinculadas, atualizarPosicaoFicha, buscarPosicaoFicha, desvincularFichaSala } from '../controllers/salaFichasController.js';

const router = express.Router();
router.post('/', vincularFichaSala);
router.get('/:idSala', buscarFichasVinculadas);
router.put('/posicao', atualizarPosicaoFicha);
router.get('/posicao/:idSala/:idFicha', buscarPosicaoFicha);
router.delete('/remover', desvincularFichaSala);

export default router;