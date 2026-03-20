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
│   ├── app.js                    # Punto de entrada: configura Express y monta las rutas
│   ├── controllers/
│   │   ├── tareasControllers.js  # Lógica de cada endpoint de tareas
│   │   └── usuarioControllers.js # Lógica de cada endpoint de usuarios
│   ├── models/
│   │   ├── tareasModel.js        # Peticiones HTTP hacia la API de datos (tareas)
│   │   └── usuarioModel.js       # Peticiones HTTP hacia la API de datos (usuarios)
│   └── routes/
│       ├── rutasTareas.js        # Define las rutas /tareas
│       └── rutasUsuario.js       # Define las rutas /usuarios
├── package.json
└── README.md
```

## Cómo ejecutar el servidor

```bash
npm install
node src/app.js
```

El servidor queda disponible en `http://localhost:3000`.

## Endpoints disponibles

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
