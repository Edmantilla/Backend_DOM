import pool from "../config/db.js";      // Importa la conexión a la base de datos (pool de MySQL)

// Objeto que contiene todos los métodos para manejar usuarios
export const usuariosModel = {

    findAll: async () => {                                          // Obtener todos los usuarios
        const [rows] = await pool.query("SELECT * FROM users");     // Ejecuta la consulta SQL
        return rows;                                                // Retorna todos los registros
    },

    findById: async (id) => {                                                           // Obtener un usuario por su ID
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);     // Busca un usuario específico usando su ID
        return rows[0];                                                                 // Retorna el primer resultado (solo uno)
    },

    create: async (nuevoUsuario) => {                                                                                                                           // Crear un nuevo usuario
        const { name, username, email, telefono} = nuevoUsuario;                                                                                                // Extrae los datos del objeto recibido
        const [result] = await pool.query("INSERT INTO users (name, username, email, telefono) VALUES (?, ?, ?, ?)", [name, username, email, telefono],);       // Inserta el nuevo usuario en la base de datos

        const [createdUsuario] = await pool.query("SELECT * FROM users WHERE id = ?", [result.insertId],);            // Obtiene el usuario recién creado usando el ID generado
        return createdUsuario[0];                                                                                     // Retorna el usuario creado
    },

    update: async (id, updatedFields) => {                                                                                                                              // Actualizar un usuario existente
        const { name, username, email, telefono } = updatedFields;                                                                                                      // Extrae los campos a actualizar
        const [result] = await pool.query( "UPDATE users SET name = ?, username = ?, email = ?, telefono = ?  WHERE id = ?",[name, username, email, telefono, id],);    // Ejecuta la actualización

        if (result.affectedRows === 0) return null;                                                          // Si no se afectó ninguna fila, el usuario no existe
        const [updatedUsuario] = await pool.query("SELECT * FROM users WHERE id = ?",[id],);                 // Consulta el usuario actualizado
        return updatedUsuario[0];                                                                            // Retorna el usuario actualizado
    },

    delete: async (id) => {                                                             // Eliminar un usuario por ID
        const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);      // Ejecuta la eliminación
        return result.affectedRows > 0;                                                 // Retorna true si se eliminó, false si no
    },
};
