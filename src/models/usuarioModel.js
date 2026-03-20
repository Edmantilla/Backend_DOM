import usuariosData from '../data/usuarios.data.js';

export const usuariosModel = {

    findAll: () => {
        return usuariosData;
    },

    findById: (id) => {
        return usuariosData.find(u => u.id === id);
    },

    create: (nuevoUsuario) => {
        const id = usuariosData.length + 1;
        const usuario = { id, ...nuevoUsuario };
        usuariosData.push(usuario);
        return usuario;
    },

    update: (id, updatedFields) => {
        const index = usuariosData.findIndex(u => u.id === id);
        if (index === -1) return null;
        usuariosData[index] = { ...usuariosData[index], ...updatedFields };
        return usuariosData[index];
    },

    delete: (id) => {
        const index = usuariosData.findIndex(u => u.id === id);
        if (index === -1) return false;
        usuariosData.splice(index, 1);
        return true;
    }
}
