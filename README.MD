Nombres: Michael Stiven Echeverry - Edward Andrey Mantilla - Ximena Quintanilla Rodríguez

# Backend - Sistema de Gestión de Tareas

## Propósito del proyecto

API REST construida con Node.js y Express para gestionar usuarios y tareas.
Provee los endpoints necesarios para que el frontend pueda:
- Consultar, crear, actualizar y eliminar tareas
- Consultar, crear, actualizar y eliminar usuarios
- Procesar la lógica del negocio
- Validar información
- Responder solicitudes del cliente (Frontend)

## Estructura del proyecto

```
Backend_DOM-Proyecto-XEM/
├── src/
│   ├── app.js                    # Configura Express y exporta la app
│   ├── data/
│   │   ├── tareas.data.js        # Datos de prueba de tareas
│   │   └── usuarios.data.js      # Datos de prueba de usuarios
│   ├── models/
│   │   ├── tareasModel.js        # findAll, findById, create, update, delete
│   │   └── usuarioModel.js       # findAll, findById, create, update, delete
│   ├── controllers/
│   │   ├── tareasControllers.js  # Lógica de cada endpoint de tareas
│   │   └── usuarioControllers.js # Lógica de cada endpoint de usuarios
│   └── routes/
│       ├── rutasTareas.js        # Define las rutas /tareas
│       └── rutasUsuario.js       # Define las rutas /usuarios
├── index.js                      # Punto de entrada, inicia el servidor
├── package.json
└── README.MD
```

## Cómo ejecutar el servidor

```bash
npm install
node index.js
```

El servidor queda disponible en `http://localhost:3000`.

## Endpoints disponibles

### Raíz
| Método | Ruta | Descripción      |
|--------|------|------------------|
| GET    | /    | Saludo de la API |

### Tareas — `/tareas`

| Método | Ruta        | Descripción              |
|--------|-------------|--------------------------|
| GET    | /tareas     | Obtener todas las tareas |
| GET    | /tareas/:id | Obtener una tarea por ID |
| POST   | /tareas     | Crear una nueva tarea    |
| PUT    | /tareas/:id | Actualizar una tarea     |
| DELETE | /tareas/:id | Eliminar una tarea       |

### Usuarios — `/usuarios`

| Método | Ruta          | Descripción                |
|--------|---------------|----------------------------|
| GET    | /usuarios     | Obtener todos los usuarios |
| GET    | /usuarios/:id | Obtener un usuario por ID  |
| POST   | /usuarios     | Crear un nuevo usuario     |
| PUT    | /usuarios/:id | Actualizar un usuario      |
| DELETE | /usuarios/:id | Eliminar un usuario        |

## Formato de respuesta

Todas las respuestas siguen este formato:

```json
{
  "success": true,
  "message": "Descripción del resultado",
  "data": [],
  "errors": []
}
```
