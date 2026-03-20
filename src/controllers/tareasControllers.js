import { tareasModel } from "../models/tareasModel.js";

export const getTareas = async (req, res) => {
    try {
        const tareas = tareasModel.findAll();
        res.status(200).json({ mensaje: "Lista de Tareas", data: tareas });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las tareas", error: error.message });
    }
};

export const getTareasById = async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = tareasModel.findById(parseInt(id));
        res.status(200).json({ mensaje: `La tarea con ID: ${id} consultada correctamente`, data: tarea });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la tarea", error: error.message });
    }
};

export const createTarea = async (req, res) => {
    try {
        const { titulo, descripcion, estado } = req.body;
        const tarea = tareasModel.create({ titulo, descripcion, estado });
        res.status(201).json({ mensaje: "La tarea fue creada correctamente", data: tarea });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la tarea", error: error.message });
    }
};

export const updateTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, estado } = req.body;
        const tarea = tareasModel.update(parseInt(id), { titulo, descripcion, estado });
        res.status(200).json({ mensaje: `La tarea con el ID: ${id} fue actualizada correctamente`, data: tarea });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la tarea", error: error.message });
    }
};

export const deleteTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = tareasModel.delete(parseInt(id));
        if (eliminado) {
            res.status(200).json({ mensaje: `La tarea con el ID: ${id} fue eliminada correctamente`, data: [{ id }] });
        } else {
            res.status(404).json({ mensaje: `No se encontró la tarea con ID: ${id}` });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la tarea", error: error.message });
    }
};
