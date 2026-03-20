import express from 'express';
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuarioControllers.js';

const usuariosRouter = express.Router();

usuariosRouter.get('/', getUsuarios);
usuariosRouter.get('/:id', getUsuarioById);
usuariosRouter.post('/', createUsuario);
usuariosRouter.put('/:id', updateUsuario);
usuariosRouter.delete('/:id', deleteUsuario);

export default usuariosRouter;
