import express from "express";
import tareasRouter from "./routes/rutasTareas.js";
import usuariosRouter from "./routes/rutasUsuario.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Permiso para que Live Server pueda conectarse (CORS)
    app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.url}`);
    res.setHeader("Access-Control-Allow-Origin", "*");  // Permitimos todos por simplicidad
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Responder inmediatamente a las peticiones preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    });

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Saludo de la API ",
        data: [],
        errors: [],
    });
});

app.use("/tareas", tareasRouter);
app.use("/usuarios", usuariosRouter);

export default app;