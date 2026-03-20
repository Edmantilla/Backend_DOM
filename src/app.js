import express from 'express';
import tareasRouter from './routes/rutasTareas.js';
import usuariosRouter from './routes/rutasUsuario.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.use('/tareas', tareasRouter);
app.use('/usuarios', usuariosRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
