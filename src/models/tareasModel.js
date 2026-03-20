import tareasData from '../data/tareas.data.js';

export const tareasModel = {

    findAll: () => {
        return tareasData;
    },

    findById: (id) => {
        return tareasData.find(t => t.id === id);
    },

    create: (nuevaTarea) => {
        const id = tareasData.length + 1;
        const tarea = { id, ...nuevaTarea };
        tareasData.push(tarea);
        return tarea;
    },

    update: (id, updatedFields) => {
        const index = tareasData.findIndex(t => t.id === id);
        if (index === -1) return null;
        tareasData[index] = { ...tareasData[index], ...updatedFields };
        return tareasData[index];
    },

    delete: (id) => {
        const index = tareasData.findIndex(t => t.id === id);
        if (index === -1) return false;
        tareasData.splice(index, 1);
        return true;
    }
}
