import express from 'express';
const app = express();
const port = 3000; 

app.get('/tareas', (req, res) => {
    res.json(
        {mensaje: "Las tareas se listarán"}
    )
})

app.post('/tareas', (req, res) => {
    res.json(
        {mensaje: "Creando tareas"}
    )
})