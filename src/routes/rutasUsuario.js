import { Router } from "express";                  // Importa Router desde Express (sirve para manejar rutas)
import {                                           // Importa las funciones del controlador (la lógica de cada endpoint)
    getUsuarios, 
    getUsuarioById, 
    createUsuario, 
    updateUsuario, 
    deleteUsuario 
} from "../controllers/usuarioControllers.js";

const usuariosRouter = Router();                   // Crea una instancia del Router

usuariosRouter.get("/", getUsuarios);              // RUTA GET /usuarios/ ----- Obtiene la lista de todos los usuarios
usuariosRouter.get("/:id", getUsuarioById);        // RUTA GET /usuarios/:id ----- Obtiene un usuario específico según su ID ----- :id es un parámetro dinámico (ej: /usuarios/3)
usuariosRouter.post("/", createUsuario);           // RUTA POST /usuarios/ ----- Crea un nuevo usuario
usuariosRouter.put("/:id", updateUsuario);         // RUTA PUT /usuarios/:id ----- Actualiza un usuario existente según su ID
usuariosRouter.delete("/:id", deleteUsuario);      // RUTA DELETE /usuarios/:id ----- Elimina un usuario según su ID

export default usuariosRouter;                     // Exporta el router para usarlo en app.js o index.js