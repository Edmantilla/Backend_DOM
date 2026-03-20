import express from 'express';
import tareasRouter from './routes/rutasTareas.js';
import usuariosRouter from './routes/rutasUsuario.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bienvenido a la API de Gestión de Tareas",
        data: [],
        errors: [],
    });
});

// Rutas
app.use('/tareas', tareasRouter);
app.use('/usuarios', usuariosRouter);

export default app;