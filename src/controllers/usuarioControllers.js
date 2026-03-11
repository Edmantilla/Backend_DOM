import { getAllUsuarios, getByIdUsuario, createUsuario, updateUsuario, deleteUsuario } from "../models/usuarioModel.js";

export const getUsuarios = async (req, res) => {
    const usuarios = await getAllUsuarios();
    res.status(200).json({
        mensaje: "Lista de Usuarios",
        data: usuarios
    });
};

export const getUsuarioById = async (req, res) => {
    const {id} = req.params;
    const usuario = await getByIdUsuario(id);
    res.status(200).json({
        mensaje: `El usuario con ID: ${id} consultada correctamente`,
        data: usuario
    });
};

export const createUsuario = async (req, res) => {
    const {id, name, lastname, email, ciudad, genero} = req.body;
    const usuario = await createUsuario(id, name, lastname, email, ciudad, genero);
    res.status(201).json({
        mensaje: `El usuario fue creado correctamente`,
        data: usuario
    });
};

export const updateUsuario = async (req, res) => {
    const {id} = req.params;
    const {name, lastname, email, ciudad, genero} = req.body;
    const usuario = await updateUsuario(name, lastname, email, ciudad, genero);
    res.status(200).json({
        mensaje: `El usuario con el ID: ${id} fue actualizado correctamente`,
        data: usuario
    });
};

export const deleteUsuario = async (req, res) => {
    const {id} = req.params;
    const eliminado = await deleteUsuario(id);
    if (eliminado){
        res.status(200).json({
            mensaje: `El usuario con el ID: ${id} fue eliminada correctamente`,
            data: [{
                id: id
            }]
        });
    };
};