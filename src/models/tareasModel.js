import pool from "../config/db.js";      // Importa la conexión a la base de datos (pool de MySQL)

// Objeto que contiene todos los métodos para manejar tareas
export const tareasModel = {

    findAll: async () => {                                          // Obtener todas las tareas con sus usuarios asignados
        const [rows] = await pool.query("SELECT * FROM tasks");     // Trae todas las tareas de la tabla tasks

        // Para cada tarea, busca los usuarios asignados usando la tabla intermedia task_users
        for (const tarea of rows) {
            const [usuarios] = await pool.query(
                `SELECT u.id, u.name, u.username
                 FROM users u
                 INNER JOIN task_users tu ON u.id = tu.userId
                 WHERE tu.taskId = ?`,
                [tarea.id]
            );
            tarea.usuarios = usuarios;                              // Añade el arreglo de usuarios dentro de cada tarea
        }
        return rows;
    },

    findById: async (id) => {                                                               // Obtener una tarea por su ID con sus usuarios asignados
        const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);          // Busca la tarea por ID

        if (!rows[0]) return undefined;                                                     // Si no existe, retorna undefined

        // Busca los usuarios asignados a esa tarea en la tabla intermedia
        const [usuarios] = await pool.query(
            `SELECT u.id, u.name, u.username
             FROM users u
             INNER JOIN task_users tu ON u.id = tu.userId
             WHERE tu.taskId = ?`,
            [id]
        );
        rows[0].usuarios = usuarios;                                                        // Añade el arreglo de usuarios a la tarea
        return rows[0];
    },

    findByUserId: async (userId) => {                                                       // Obtener todas las tareas asignadas a un usuario (via task_users)
        // Busca las tareas del usuario a través de la tabla intermedia task_users
        const [tareas] = await pool.query(
            `SELECT t.*
             FROM tasks t
             INNER JOIN task_users tu ON t.id = tu.taskId
             WHERE tu.userId = ?`,
            [userId]
        );

        // Para cada tarea encontrada, también trae sus usuarios asignados
        for (const tarea of tareas) {
            const [usuarios] = await pool.query(
                `SELECT u.id, u.name, u.username
                 FROM users u
                 INNER JOIN task_users tu ON u.id = tu.userId
                 WHERE tu.taskId = ?`,
                [tarea.id]
            );
            tarea.usuarios = usuarios;
        }
        return tareas;
    },

    create: async (nuevaTarea) => {                                                         // Crear una nueva tarea y asignarle usuarios
        const { titulo, descripcion, estado, userIds } = nuevaTarea;                        // userIds es un arreglo con los IDs de los usuarios a asignar

        // Se usa una transacción para que si algo falla, no quede la tarea a medias
        const connection = await pool.getConnection();                                      // Obtiene una conexión individual del pool
        try {
            await connection.beginTransaction();                                            // Inicia la transacción

            // Inserta la tarea — ya no tiene userId directo, eso va en task_users
            const [result] = await connection.query(
                "INSERT INTO tasks (titulo, descripcion, estado) VALUES (?, ?, ?)",
                [titulo, descripcion, estado]
            );
            const taskId = result.insertId;                                                 // ID autogenerado de la nueva tarea

            // Inserta una fila en task_users por cada userId del arreglo
            if (userIds && userIds.length > 0) {
                const values = userIds.map((userId) => [taskId, userId]);                   // Crea pares [taskId, userId]
                await connection.query("INSERT INTO task_users (taskId, userId) VALUES ?", [values]);
            }

            await connection.commit();                                                      // Confirma todos los cambios
            return await tareasModel.findById(taskId);                                      // Retorna la tarea creada con sus usuarios
        } catch (error) {
            await connection.rollback();                                                    // Si algo falla, deshace todo
            throw error;
        } finally {
            connection.release();                                                           // Devuelve la conexión al pool
        }
    },

    update: async (id, updatedFields) => {                                                  // Actualizar una tarea existente y sus usuarios asignados
        const { titulo, descripcion, estado, userIds } = updatedFields;                     // userIds es opcional — si se envía, reemplaza las asignaciones

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Actualiza solo los campos de la tarea (sin userId, ya no existe en tasks)
            const [result] = await connection.query(
                "UPDATE tasks SET titulo = ?, descripcion = ?, estado = ? WHERE id = ?",
                [titulo, descripcion, estado, id]
            );

            if (result.affectedRows === 0) {                                                // Si no se afectó ninguna fila, la tarea no existe
                await connection.rollback();
                return null;
            }

            // Si se enviaron userIds, reemplaza todas las asignaciones actuales
            if (userIds !== undefined) {
                await connection.query("DELETE FROM task_users WHERE taskId = ?", [id]);    // Elimina las asignaciones anteriores
                if (userIds.length > 0) {
                    const values = userIds.map((userId) => [id, userId]);
                    await connection.query("INSERT INTO task_users (taskId, userId) VALUES ?", [values]);
                }
            }

            await connection.commit();
            return await tareasModel.findById(id);                                          // Retorna la tarea actualizada con sus usuarios
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    delete: async (id) => {                                                                 // Eliminar una tarea por ID
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            // Primero elimina las relaciones en task_users (la FK impide borrar la tarea si tiene registros ahí)
            await connection.query("DELETE FROM task_users WHERE taskId = ?", [id]);
            const [result] = await connection.query("DELETE FROM tasks WHERE id = ?", [id]);
            await connection.commit();
            return result.affectedRows > 0;                                                 // Retorna true si se eliminó correctamente
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },
}
