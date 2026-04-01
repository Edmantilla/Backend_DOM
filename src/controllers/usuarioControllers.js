import { usuariosModel } from "../models/usuarioModel.js";                      // Importa el modelo de usuarios para acceder a los métodos de la BD

export const getUsuarios = async (req, res) => {                                // Controlador para obtener todos los usuarios — async porque hace operaciones con la BD
    try {
        const usuarios = await usuariosModel.findAll();                         // Espera a que la BD retorne todos los registros de la tabla users
        res.status(200).json({                                                  // Responde con HTTP 200 (OK) y los datos en formato JSON
            success: true,                                                      // Indica que la operación fue exitosa
            message: "Lista de usuarios",                                       // Mensaje descriptivo de la respuesta
            data: usuarios,                                                     // Arreglo con todos los usuarios obtenidos
            errors: [],                                                         // Sin errores
        });
    } catch (error) {                                                           // Captura cualquier error inesperado (ej: BD caída, consulta fallida)
        res.status(500).json({                                                  // Responde con HTTP 500 (Error interno del servidor)
            success: false,                                                     // Indica que la operación falló
            message: "Error interno del servidor al obtener los usuarios",
            data: [],                                                           // Sin datos porque hubo un error
            errors: [error.message],                                            // Incluye el mensaje del error para facilitar el diagnóstico
        });
    }
};

export const getUsuarioById = async (req, res) => {                     // Controlador para buscar un usuario específico por su ID
    try {
        const { id } = req.params;                                      // Destructura el ID desde los parámetros de la URL (ej: /usuarios/5)
        const usuario = await usuariosModel.findById(Number(id));       // Convierte el ID a número (los params llegan como string) y consulta la BD
        if (!usuario) {                                                 // Si findById retorna null/undefined, el usuario no existe
            return res.status(404).json({                               // HTTP 404 (Not Found) — detiene la ejecución con return
                success: false,
                message: `Usuario con ID ${id} no encontrado`,          // Mensaje dinámico con el ID buscado
                data: [],
                errors: [],
            });
        }
        res.status(200).json({                                          // Si llegamos aquí, el usuario sí existe
            success: true,
            message: "Usuario encontrado correctamente",
            data: usuario,                                              // Retorna el objeto del usuario encontrado
            errors: [],
        });
    } catch (error) {                                                   // Captura errores inesperados de la BD
        res.status(500).json({
            success: false,
            message: "Error interno al buscar el usuario",
            data: [],
            errors: [error.message],
        });
    }
};

export const createUsuario = async (req, res) => {                                              // Controlador para crear un nuevo usuario
    try {
        const { name, username, email, telefono } = req.body;                                   // Destructura solo los campos definidos en el esquema SQL de la tabla users
        if (!name || !username || !email || !telefono) {                                        // Valida que ningún campo NOT NULL de la BD venga vacío
            return res.status(400).json({                                                       // HTTP 400 (Bad Request) — el cliente envió datos incompletos
                success: false,
                message: "El nombre, username, email y teléfono son obligatorios",
                data: [],
                errors: [],
            });
        }
        const newUsuario = await usuariosModel.create({ name, username, email, telefono });     // Envía los datos validados al modelo para insertar en la BD
        res.status(201).json({                                                                  // HTTP 201 (Created) — recurso creado exitosamente
            success: true,
            message: "Usuario creado correctamente",
            data: newUsuario,                                                                   // Retorna el usuario recién creado (incluye el ID generado por auto_increment)
            errors: [],
        });
    } catch (error) {                                                                           // Captura errores de la BD (ej: email duplicado, violación de constraint)
        res.status(500).json({
            success: false,
            message: "Error interno al crear el usuario",
            data: [],
            errors: [error.message],
        });
    }
};

export const updateUsuario = async (req, res) => {                                          // Controlador para actualizar los datos de un usuario existente
    try {
        const { id } = req.params;                                                          // Obtiene el ID del usuario a actualizar desde la URL
        const updatedUsuario = await usuariosModel.update(Number(id), req.body);            // Pasa el ID y todos los datos nuevos del body al modelo para hacer el UPDATE en BD
        if (!updatedUsuario) {                                                              // El modelo retorna null si no encontró ningún registro con ese ID
            return res.status(404).json({
                success: false,
                message: `Usuario con ID ${id} no encontrado`,
                data: [],
                errors: [],
            });
        }
        res.status(200).json({                                                              // Actualización exitosa
            success: true,
            message: "Usuario actualizado correctamente",
            data: updatedUsuario,                                                           // Retorna el usuario con los datos ya actualizados
            errors: [],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno al actualizar el usuario",
            data: [],
            errors: [error.message],
        });
    }
};

export const deleteUsuario = async (req, res) => {                                          // Controlador para eliminar un usuario de la BD
    try {
        const { id } = req.params;                                                          // Obtiene el ID del usuario a eliminar desde la URL
        const usuarioExists = await usuariosModel.findById(Number(id));                     // Consulta si el usuario existe ANTES de intentar eliminarlo
        if (!usuarioExists) {                                                               // Si no existe, no hay nada que eliminar
            return res.status(404).json({
                success: false,
                message: `No se pudo eliminar: Usuario con ID ${id} no encontrado`,
                data: [],
                errors: [],
            });
        }
        const isDeleted = await usuariosModel.delete(Number(id));                           // Solo llega aquí si el usuario existe — ejecuta el DELETE en la BD
        res.status(200).json({                                                              // Eliminación exitosa
            success: true,
            message: "Usuario eliminado correctamente",
            data: [],                                                                       // Sin data porque el recurso ya no existe
            errors: [],
        });
    } catch (error) {                                                                       // Captura errores inesperados (ej: FK constraint si tiene tareas asociadas)
        res.status(500).json({
            success: false,
            message: "Error interno al intentar eliminar el usuario",
            data: [],
            errors: [error.message],
        });
    }
};