import express from 'express';
import { criarUsuario, loginUsuario, atualizarUsuario, deletarUsuario } from '../controllers/usuariosController.js';

const router = express.Router();

router.post('/', criarUsuario);
router.get('/', loginUsuario);
router.put('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);

export default router;