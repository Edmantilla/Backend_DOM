import { Router } from "express";               // Importa Router desde Express (sirve para manejar rutas)
import {                                        // Importa las funciones del controlador (la lógica de cada endpoint)
    getTareas, 
    getTareaById, 
    createTarea, 
    updateTarea, 
    deleteTarea, 
    getTareasByUserId 
} from "../controllers/tareasControllers.js";

const tareasRouter = Router();                              // Crea una instancia del Router

tareasRouter.get("/", getTareas);                           // RUTA GET /tareas/ ----- Devuelve todas las tareas
tareasRouter.get("/usuario/:userId", getTareasByUserId);    // RUTA GET /tareas/usuario/:userId ----- Devuelve todas las tareas de un usuario específico -----:userId es un parámetro dinámico (ej: /tareas/usuario/2)
tareasRouter.get("/:id", getTareaById);                     // RUTA GET /tareas/:id ----- Devuelve una tarea específica por su ID (ej: /tareas/5)
tareasRouter.post("/", createTarea);                        // RUTA POST /tareas/ ----- Crea una nueva tarea
tareasRouter.put("/:id", updateTarea);                      // RUTA PUT /tareas/:id ----- Actualiza una tarea existente según su ID
tareasRouter.delete("/:id", deleteTarea);                   // RUTA DELETE /tareas/:id ----- Elimina una tarea según su ID

export default tareasRouter;                                // Exporta el router para usarlo en app.js o index.js
