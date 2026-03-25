import { tareasModel } from "../models/tareasModel.js";

export const getTareas = (req, res) => {
    const tareas = tareasModel.findAll();
    res.status(200).json({
        success: true,
        message: "Lista de tareas",
        data: tareas,
        errors: [],
    });
};

export const getTareasById = (req, res) => {
    try {
        const { id } = req.params;
        const tarea = tareasModel.findById(Number(id));
        if (!tarea) {
            return res.status(404).json({
                success: false,
                message: `Tarea con ID ${id} no encontrada`,
                data: [],
                errors: [],
            });
        }
        res.status(200).json({
            success: true,
            message: "Tarea encontrada correctamente",
            data: tarea,
            errors: [],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al procesar la búsqueda",
            data: [],
            errors: [],
        });
    }
};

export const getTareasByUserId = (req, res) => {
    try {
        const { userId } = req.params;
        const tareas = tareasModel.findByUserId(Number(userId));
        res.status(200).json({
            success: true,
            message: `Tareas del usuario con ID ${userId}`,
            data: tareas,
            errors: [],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las tareas del usuario",
            data: [],
            errors: [],
        });
    }
};

export const createTarea = (req, res) => {
    const { titulo, descripcion, estado } = req.body;
    if (!titulo) {
        return res.status(400).json({
            success: false,
            message: "El título es obligatorio",
            data: [],
            errors: [],
        });
    }
    const tarea = tareasModel.create({ titulo, descripcion, estado });
    res.status(201).json({
        success: true,
        message: "Tarea creada correctamente",
        data: tarea,
        errors: [],
    });
};

export const updateTarea = (req, res) => {
    const { id } = req.params;
    const tarea = tareasModel.update(Number(id), req.body);
    if (!tarea) {
        return res.status(404).json({
            success: false,
            message: `Tarea con ID ${id} no encontrada`,
            data: [],
            errors: [],
        });
    }
    res.status(200).json({
        success: true,
        message: "Tarea actualizada correctamente",
        data: tarea,
        errors: [],
    });
};

export const deleteTarea = (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = tareasModel.delete(Number(id));
        if (!eliminado) {
            return res.status(404).json({
                success: false,
                message: `No se puede eliminar: Tarea con ID ${id} no encontrada`,
                data: [],
                errors: [],
            });
        }
        res.status(200).json({
            success: true,
            message: `Tarea con ID ${id} eliminada correctamente`,
            data: [],
            errors: [],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al intentar eliminar la tarea",
            data: [],
            errors: [],
        });
    }
};
