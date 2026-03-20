import express from "express";
import tareasRouter from "./routes/rutasTareas.js";
import usuariosRouter from "./routes/rutasUsuario.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Saludo de la API",
        data: [],
        errors: [],
    });
});

app.use("/tareas", tareasRouter);
app.use("/usuarios", usuariosRouter);

export default app;
