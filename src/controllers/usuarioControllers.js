import { getAllUsuarios, getByIdUsuario, createUsuario as modelCrearUsuario, updateUsuario as modelActualizarUsuario, deleteUsuario as modelEliminarUsuario } from "../models/usuarioModel.js";

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await getAllUsuarios();
        res.status(200).json({ mensaje: "Lista de Usuarios", data: usuarios });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los usuarios", error: error.message });
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await getByIdUsuario(id);
        res.status(200).json({ mensaje: `El usuario con ID: ${id} consultado correctamente`, data: usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el usuario", error: error.message });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const { id, name, lastname, email, ciudad, genero } = req.body;
        const usuario = await modelCrearUsuario({ id, name, lastname, email, ciudad, genero });
        res.status(201).json({ mensaje: "El usuario fue creado correctamente", data: usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el usuario", error: error.message });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastname, email, ciudad, genero } = req.body;
        const usuario = await modelActualizarUsuario(id, { name, lastname, email, ciudad, genero });
        res.status(200).json({ mensaje: `El usuario con el ID: ${id} fue actualizado correctamente`, data: usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el usuario", error: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await modelEliminarUsuario(id);
        if (eliminado) {
            res.status(200).json({ mensaje: `El usuario con el ID: ${id} fue eliminado correctamente`, data: [{ id }] });
        } else {
            res.status(404).json({ mensaje: `No se pudo eliminar el usuario con ID: ${id}` });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el usuario", error: error.message });
    }
};
