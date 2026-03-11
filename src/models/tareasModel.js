// Consultar Todas la tareas
export const getAllTareas = async () => {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (respuesta.ok) {
            return await respuesta.json();
        }
        throw new Error("No se pudieron obtener las tareas");
    } catch (error) {
        return "Error, al consultar las tareas";
    }
}

// Consultar tarea por ID
export const getByIdTarea = async (idTarea) => {
    try {
        const respuesta = await fetch(`https://jsonplaceholder.typicode.com/todos/${idTarea}`);
        if (respuesta.ok) {
            return await respuesta.json();
        }
    } catch (error) {
        return "Error, al consultar la tarea";
    }
}

// Crear tarea
export const createTarea = async (nuevaTarea) => {
    try {
        const opciones = {
            method: 'POST',
            body: JSON.stringify(nuevaTarea),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        const respuesta = await fetch('https://jsonplaceholder.typicode.com/todos', opciones);
        if (respuesta.ok) {
            return await respuesta.json();
        }
    } catch (error) {
        return "Error, al crear la tarea";
    }
}

// Actualiza tarea por ID
export const updateTarea = async (tareaId, tarea) => {
    try {
        const solicitud = await fetch(`https://jsonplaceholder.typicode.com/todos/${tareaId}`, {
            method: 'PATCH',
            body: JSON.stringify(tarea), // JSONPlaceholder ya maneja el ID
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        
        if (solicitud.ok) {
            return await solicitud.json();
        }
    } catch (error) {
        return "Error, al actualizar la tarea";
    }
}

// Eliminar tarea por ID
export const deleteTarea = async (tareaId) => {
    try {
        const solicitud = await fetch(`https://jsonplaceholder.typicode.com/todos/${tareaId}`, {
            method: 'DELETE',
        });
        return solicitud.ok;
    } catch (error) {
        return "Error, al eliminar la tarea";
    }
}

