import mysql from 'mysql2/promise';     // Importa la librería mysql2 usando promesas (async/await o .then)
import 'dotenv/config';                 // Carga automáticamente las variables del archivo .env

// Crea un "pool" de conexiones (grupo de conexiones reutilizables)
const pool = mysql.createPool({
    host: process.env.DB_HOST,          // Dirección del servidor MySQL (localhost o 127.0.0.1)
    user: process.env.DB_USER,          // Usuario de la base de datos (ej: root)
    password: process.env.DB_PASSWORD,  // Contraseña del usuario de MySQL
    database: process.env.DB_NAME,      // Nombre de la base de datos
    port: process.env.DB_PORT,          // Puerto donde corre MySQL (por defecto 3306)
    waitForConnections: true,           // Si todas las conexiones están ocupadas, espera en vez de fallar
    connectionLimit: 10,                // Número máximo de conexiones simultáneas
    queueLimit: 0,                      // Número máximo de solicitudes en cola (0 = ilimitadas)
});

    pool                                // Intenta obtener una conexión del pool para verificar que todo funciona                       
    .getConnection()
    .then((connection) => {             // Si la conexión es exitosa
        console.log("Conexión a la base de datos MySQL establecida con éxito");
        connection.release();           // Libera la conexión para que vuelva al pool (MUY IMPORTANTE)
    })
    .catch((error)=> {                  // Si ocurre un error al conectar
        console.error("Error al conectar con la base de datos:", error.message);
    });

export default pool;                    // Exporta el pool para usarlo en otros archivos