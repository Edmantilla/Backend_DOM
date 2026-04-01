import express from "express";                              // Importa Express (framework para crear el servidor)
import tareasRouter from "./routes/rutasTareas.js";         // Importa las rutas de tareas
import usuariosRouter from "./routes/rutasUsuario.js";      // Importa las rutas de usuarios
import './config/db.js';                                    // Importa la configuración de la base de datos

const app = express();                                      // Crea la aplicación de Express

// Permiso para que Live Server pueda conectarse (CORS)
// MIDDLEWARE CORS (permite conexiones externas, como Live Server o frontend)
    app.use((req, res, next) => {
    // Muestra en consola cada petición que llega 
    console.log(`Petición recibida: ${req.method} ${req.url}`);
    // Permite que cualquier origen (frontend) pueda acceder al backend
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Permite los métodos HTTP necesarios  
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    // Permite ciertos headers en las peticiones
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Si la petición es OPTIONS (preflight), responde inmediatamente
    if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        // Continúa con el siguiente middleware o ruta
        next();
    });

app.use(express.json());                            //  Permite recibir datos en formato JSON
app.use(express.urlencoded({ extended: true }));    //  Permite recibir datos de formularios (x-www-form-urlencoded)

// Ruta principal (endpoint de prueba) ----- http://localhost:3000/
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Saludo de la API ",
        data: [],
        errors: [],
    });
});

// Usa las rutas de tareas
// Todas las rutas dentro de tareasRouter empezarán con /tareas ----- Ej: /tareas, /tareas/1, /tareas/usuario/2
app.use("/tareas", tareasRouter);
// Usa las rutas de usuarios ----- Ej: /usuarios, /usuarios/1
app.use("/usuarios", usuariosRouter);

// Exporta la app para usarla en el archivo principal (index.js o server.js)
export default app;