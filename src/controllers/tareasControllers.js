import { tareasModel } from "../models/tareasModel.js";             // Importa el modelo de tareas para operaciones CRUD en la tabla tasks
import { usuariosModel } from "../models/usuarioModel.js";          // Importa el modelo de usuarios para validar la FK (userId) antes de operar

export const getTareas = async (req, res) => {                      // Controlador para obtener todas las tareas registradas
    try {
        const tareas = await tareasModel.findAll();                 // Espera a que la BD retorne todos los registros de la tabla tasks
        res.status(200).json({                                      // Responde con HTTP 200 (OK)
            success: true,
            message: "Lista de tareas",
            data: tareas,                                           // Arreglo con todas las tareas
            errors: [],
        });
    } catch (error) {                                               // Captura errores inesperados de conexión o consulta
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al obtener las tareas",
            data: [],
            errors: [error.message],
        });
    }
};

export const getTareaById = async (req, res) => {                       // Controlador para buscar una tarea específica por su ID
    try {
        const { id } = req.params;                                      // Extrae el ID desde la URL (ej: /tareas/3)
        const tarea = await tareasModel.findById(Number(id));           // Convierte el ID a número y busca la tarea en la BD
        if (!tarea) {                                                   // Si el modelo retorna null, la tarea no existe en la BD
            return res.status(404).json({                               // HTTP 404 — detiene la ejecución con return para no continuar
                success: false,
                message: `Tarea con ID ${id} no encontrada`,
                data: [],
                errors: [],
            });
        }
        res.status(200).json({                                          // La tarea existe — la retorna exitosamente
            success: true,
            message: "Tarea encontrada correctamente",
            data: tarea,                                                // Objeto con los datos completos de la tarea
            errors: [],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno al buscar la tarea",
            data: [],
            errors: [error.message],
        });
    }
};

export const getTareasByUserId = async (req, res) => {                              // Controlador relacional — obtiene todas las tareas de un usuario específico
    try {
        const { userId } = req.params;                                              // Extrae el userId desde la URL (ej: /usuarios/2/tareas)
        const usuarioExists = await usuariosModel.findById(Number(userId));         // Verifica que el usuario exista en la BD antes de buscar sus tareas
        if (!usuarioExists) {                                                       // Si el usuario no existe, no tiene sentido buscar sus tareas
            return res.status(404).json({
                success: false,
                message: `El usuario con ID ${userId} no existe`,
                data: [],
                errors: [],
            });
        }
        const tareas = await tareasModel.findByUserId(Number(userId));              // El usuario existe — consulta todas sus tareas en la tabla tasks por la FK userId
        res.status(200).json({                                                      // Respuesta exitosa con las tareas del usuario
            success: true,
            message: `Tareas del usuario: ${usuarioExists.name}`,                   // Usa el nombre del usuario para un mensaje más descriptivo
            data: tareas,                                                           // Arreglo de tareas (puede ser vacío si el usuario no tiene tareas)
            errors: [],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno al obtener las tareas del usuario",
            data: [],
            errors: [error.message],
        });
    }
};

export const createTarea = async (req, res) => {                                                        // Controlador para crear una nueva tarea
    try {
        const { titulo, descripcion, estado, userId } = req.body;                                       // Destructura los campos del body — todos definidos en el esquema SQL de tasks
        if (!titulo || !userId) {                                                                       // Valida los campos NOT NULL obligatorios: titulo y userId (FK)
            return res.status(400).json({                                                               // HTTP 400 — el cliente no envió los datos mínimos requeridos
                success: false,
                message: "El título y el ID de usuario (userId) son obligatorios",
                data: [],
                errors: [],
            });
        }
        const usuarioExists = await usuariosModel.findById(Number(userId));                             // Verifica que el userId enviado exista en la tabla users
        if (!usuarioExists) {                                                                           // Si el userId no existe, MySQL lanzaría un error de FK
            return res.status(404).json({
                success: false,
                message: `No se puede crear la tarea: Usuario con ID ${userId} no encontrado`,
                data: [],
                errors: [],
            });
        }
        const newTarea = await tareasModel.create({ titulo, descripcion, estado, userId });             /* Todos los datos son válidos — inserta la nueva tarea en la BD */
        res.status(201).json({                                                                          // HTTP 201 (Created) — tarea creada exitosamente
            success: true,
            message: "Tarea creada correctamente",
            data: newTarea,                                                                             // Retorna la tarea creada con su ID generado por auto_increment
            errors: [],
        });
    } catch (error) {                                                                                   // Captura errores residuales de la BD (ej: violación de constraint no prevista)
        res.status(500).json({
            success: false,
            message: "Error interno al crear la tarea. Verifique que el usuario exista.",
            data: [],
            errors: [error.message],
        });
    }
};

export const updateTarea = async (req, res) => {                                                        // Controlador para actualizar los datos de una tarea existente
    try {
        const { id } = req.params;                                                                      // Obtiene el ID de la tarea a actualizar desde la URL
        const updatedTarea = await tareasModel.update(Number(id), req.body);                            // Pasa el ID y los nuevos datos del body al modelo para ejecutar el UPDATE
        if (!updatedTarea) {                                                                            // El modelo retorna null si no encontró la tarea con ese ID
            return res.status(404).json({
                success: false,
                message: `Tarea con ID ${id} no encontrada`,
                data: [],
                errors: [],
            });
        }
        res.status(200).json({                                                                          // Actualización exitosa
            success: true,
            message: "Tarea actualizada correctamente",
            data: updatedTarea,                                                                         // Retorna la tarea con los nuevos valores ya guardados
            errors: [],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno al actualizar la tarea",
            data: [],
            errors: [error.message],
        });
    }
};

export const deleteTarea = async (req, res) => {                                                // Controlador para eliminar una tarea de la BD
    try {
        const { id } = req.params;                                                              // Obtiene el ID de la tarea a eliminar desde la URL
        const tareaExists = await tareasModel.findById(Number(id));                             // Verifica que la tarea exista ANTES de intentar eliminarla
        if (!tareaExists) {                                                                     // Si no existe, responde con 404 en lugar de intentar un DELETE innecesario
            return res.status(404).json({
                success: false,
                message: `No se pudo eliminar: Tarea con ID ${id} no encontrada`,
                data: [],
                errors: [],
            });
        }
        const isDeleted = await tareasModel.delete(Number(id));                                // La tarea existe — ejecuta el DELETE en la BD
        res.status(200).json({                                                                 // Eliminación exitosa
            success: true,
            message: "Tarea eliminada correctamente",
            data: [],                                                                          // Sin data porque el recurso ya fue eliminado
            errors: [],
        });
    } catch (error) {                                                                          // Captura errores inesperados del servidor
        res.status(500).json({
            success: false,
            message: "Error interno al intentar eliminar la tarea",
            data: [],
            errors: [error.message],
        });
    }
};