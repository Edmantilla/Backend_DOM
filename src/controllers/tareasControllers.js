import { getAllTareas, getByIdTarea, createTarea, updateTarea, deleteTarea } from "../models/tareasModel.js";

export const getTareas = async (req, res) => {
    const tareas = await getAllTareas();
    res.status(200).json({
        mensaje: "Lista de Tareas",
        data: tareas
    });
};

export const getTareasById = async (req, res) => {
    const {id} = req.params;
    const tarea = await getByIdTarea(id);
    res.status(200).json({
        mensaje: `La tarea con ID: ${id} consultada correctamente`,
        data: tarea
    });
};

export const createTarea = async (req, res) => {
    const {titulo, descripcion, estado} = req.body;
    const tarea = await createTarea(titulo, descripcion, estado);
    res.status(201).json({
        mensaje: `La tarea fue creada correctamente`,
        data: tarea
    });
};

export const updateTarea = async (req, res) => {
    const {id} = req.params;
    const {titulo, descripcion, estado} = req.body;
    const tarea = await updateTarea(titulo, descripcion, estado);
    res.status(200).json({
        mensaje: `La tarea con el ID: ${id} fue actualizado correctamente`,
        data: tarea
    });
};

export const deleteTarea = async (req, res) => {
    const {id} = req.params;
    const eliminado = await deleteTarea(id);
    if (eliminado){
        res.status(200).json({
            mensaje: `La tarea con el ID: ${id} fue eliminada correctamente`,
            data: [{
                id: id
            }]
        });
    };
};