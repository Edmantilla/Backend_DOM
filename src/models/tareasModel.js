import pool from "../config/db.js";      // Importa la conexión a la base de datos (pool de MySQL)

// Objeto que contiene todos los métodos para manejar tareas
export const tareasModel = {

    findAll: async () => {                                          // Obtener todas las tareas
        const [rows] = await pool.query("SELECT * FROM tasks");     // Ejecuta la consulta SQL para traer todas las tareas
        return rows;                                                // Retorna todas las tareas
    },

    findById: async (id) => {                                                           // Obtener una tarea por su ID
        const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id],);     // Busca una tarea específica por ID
        return rows[0];                                                                 // Retorna la primera coincidencia
    },

    findByUserId: async (userId) => {                                                           // Obtener tareas por ID de usuario
        const [rows] = await pool.query("SELECT * FROM tasks WHERE userId = ?", [userId],);     // Filtra las tareas según el usuario
        return rows;                                                                            // Retorna todas las tareas de ese usuario
    },

    create: async (nuevaTarea) => {                                                                                                                                     // Crear una nueva tarea
        const { userId, titulo, descripcion, estado } = nuevaTarea;                                                                                                     // Extrae los datos de la tarea
        const [result] = await pool.query("INSERT INTO tasks (userId, titulo, descripcion, estado) VALUES (?, ?, ?, ?)", [userId, titulo, descripcion, estado],);       // Inserta la nueva tarea en la base de datos

        const [createdTarea] = await pool.query("SELECT * FROM tasks WHERE id = ?", [result.insertId],);            // Obtiene la tarea recién creada usando el ID generado
        return createdTarea[0];                                                                                     // Retorna la tarea creada 
    },

    update: async (id, updatedFields) => {                                                                                                                                      // Actualizar una tarea existente                                                                                               
        const { userId, titulo, descripcion, estado } = updatedFields;                                                                                                          // Extrae los campos a actualizar
        const [result] = await pool.query("UPDATE tasks SET userId = ?, titulo = ?, descripcion = ?, estado = ? WHERE id = ?", [userId, titulo, descripcion, estado, id],);     // Ejecuta la actualización

        if (result.affectedRows === 0) return null;                                                     // Si no se actualizó ninguna fila, la tarea no existe
        const [updatedTarea] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id],);             // Consulta la tarea actualizada
        return updatedTarea[0];                                                                         // Retorna la tarea actualizada
    },

    delete: async (id) => {                                                                 // Eliminar una tarea por ID
        const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id,]);         // Ejecuta la eliminación
        return result.affectedRows > 0;                                                     // Retorna true si se eliminó correctamente
    },
}
