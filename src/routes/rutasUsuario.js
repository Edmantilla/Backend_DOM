import express from 'express';
const app = express();
const port = 3000; 

app.get('/usuarios', (req, res) => {
    res.json(
        {mensaje: "Los usuarios se listarán"}
    )
})

app.post('/usuarios', (req, res) => {
    res.json(
        {mensaje: "Creando usuario"}
    )
})