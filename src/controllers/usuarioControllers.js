import { usuariosModel } from "../models/usuarioModel.js";

export const getUsuarios = (req, res) => {
    const usuarios = usuariosModel.findAll();
    res.status(200).json({
        success: true,
        message: "Lista de usuarios",
        data: usuarios,
        errors: [],
    });
};

export const getUsuarioById = (req, res) => {
    try {
        const { id } = req.params;
        const usuario = usuariosModel.findById(Number(id));
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: `Usuario con ID ${id} no encontrado`,
                data: [],
                errors: [],
            });
        }
        res.status(200).json({
            success: true,
            message: "Usuario encontrado correctamente",
            data: usuario,
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

export const createUsuario = (req, res) => {
    console.log("Recibida petición para crear usuario:", req.body);
    const { name, username, email, ciudad, genero } = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            message: "El nombre es obligatorio",
            data: [],
            errors: [],
        });
    }
    const usuario = usuariosModel.create({ name, username, email, ciudad, genero });
    res.status(201).json({
        success: true,
        message: "Usuario creado correctamente",
        data: usuario,
        errors: [],
    });
};

export const updateUsuario = (req, res) => {
    const { id } = req.params;
    const usuario = usuariosModel.update(Number(id), req.body);
    if (!usuario) {
        return res.status(404).json({
            success: false,
            message: `Usuario con ID ${id} no encontrado`,
            data: [],
            errors: [],
        });
    }
    res.status(200).json({
        success: true,
        message: "Usuario actualizado correctamente",
        data: usuario,
        errors: [],
    });
};

export const deleteUsuario = (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = usuariosModel.delete(Number(id));
        if (!eliminado) {
            return res.status(404).json({
                success: false,
                message: `No se puede eliminar: Usuario con ID ${id} no encontrado`,
                data: [],
                errors: [],
            });
        }
        res.status(200).json({
            success: true,
            message: `Usuario con ID ${id} eliminado correctamente`,
            data: [],
            errors: [],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al intentar eliminar el usuario",
            data: [],
            errors: [],
        });
    }
};
