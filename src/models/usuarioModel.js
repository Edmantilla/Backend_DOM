// Consultar todos los usuarios
export const getAllUsuarios = async () => {
    try {
        const respuesta = await fetch("http://localhost:3000/usuarios");
        if (respuesta.ok) {
            return await respuesta.json();
        }
    } catch (error) {
        return "Error, al consultar los usuarios";
    }
}

// Consultar el usuario por ID
export const getByIdUsuario = async (idUsuario) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/usuarios/${idUsuario}`);
        if (respuesta.ok) {
            return await respuesta.json();
        }
    } catch (error) {
        return "Error, al consultar el usuario";
    }
}

// Crear Usuario
export const createUsuario = async (nuevoUsuario) => {
    try {
        const opciones = {
            method: 'POST',
            body: JSON.stringify(nuevoUsuario),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        const respuesta = await fetch('http://localhost:3000/usuarios', opciones);
        if (respuesta.ok) {
            return await respuesta.json();
        }
    } catch (error) {
        return "Error, al crear el nuevo usuario";
    }
}

// Actualizar Usuario por ID
export const updateUsuario = async (usuarioId, usuario) => {
    try {
        const solicitud = await fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
            method: 'PATCH',
            body: JSON.stringify(usuario),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        
        if (solicitud.ok) {
            return await solicitud.json();
        }
    } catch (error) {
        return "Error, al actualizar el usuario";
    }
}

// Eliminar el usuario por ID
export const deleteUsuario = async (usuarioId) => {
    try {
        const solicitud = await fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
            method: 'DELETE',
        });
        return solicitud.ok;
    } catch (error) {
        return "Error, al eliminar el usuario";
    }
}