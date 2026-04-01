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

## Tecnologías utilizadas

- **Node.js** — entorno de ejecución de JavaScript en el servidor
- **Express 5.x** — framework para construir la API REST
- **MySQL2** — driver para conectarse a la base de datos MySQL usando promesas
- **dotenv** — carga las variables de entorno desde el archivo `.env`
- **cors** — middleware para permitir peticiones desde el frontend
- **nodemon** — reinicia el servidor automáticamente al detectar cambios (desarrollo)

## Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

- [Node.js](https://nodejs.org/) versión 18 o superior
- [MySQL](https://dev.mysql.com/downloads/) versión 8 o superior (servidor corriendo localmente)

## Estructura del proyecto

```
Backend_DOM-Proyecto-XEM/
├── src/
│   ├── app.js                    # Configura Express, middlewares y exporta la app
│   ├── config/
│   │   └── db.js                 # Pool de conexiones a MySQL (usando mysql2/promise)
│   ├── data/
│   │   ├── tareas.data.js        # Datos de prueba de tareas (referencia, no usado en producción)
│   │   └── usuarios.data.js      # Datos de prueba de usuarios (referencia, no usado en producción)
│   ├── models/
│   │   ├── tareasModel.js        # findAll, findById, findByUserId, create, update, delete
│   │   └── usuarioModel.js       # findAll, findById, create, update, delete
│   ├── controllers/
│   │   ├── tareasControllers.js  # Lógica de cada endpoint de tareas (con try-catch y códigos HTTP)
│   │   └── usuarioControllers.js # Lógica de cada endpoint de usuarios (con try-catch y códigos HTTP)
│   └── routes/
│       ├── rutasTareas.js        # Define las rutas /tareas
│       └── rutasUsuario.js       # Define las rutas /usuarios
├── sql/
│   ├── database.sql              # Script para crear la BD, usuario MySQL, tablas y permisos
│   └── queries.sql               # Consultas de prueba e inserción de datos de ejemplo
├── index.js                      # Punto de entrada — inicia el servidor en el puerto definido
├── .env                          # Variables de entorno (NO subir al repositorio)
├── package.json
└── README.MD
```

## Configuración de la base de datos

### 1. Crear el archivo `.env`

En la raíz del proyecto crea un archivo `.env` con el siguiente contenido (ajusta los valores según tu entorno):

```env
# Configuración del Servidor
PORT=3000

# Configuración de la Base de Datos MySQL
DB_HOST=localhost
DB_USER=xem_user
DB_PASSWORD=tu_contraseña_aqui
DB_NAME=proyecto_adso_2994281
DB_PORT=3306
```

### 2. Ejecutar el script SQL

Abre MySQL Workbench, copia y pega el contenido del archivo `sql/database.sql` y ejecútalo completo. Este script:

- Crea la base de datos `proyecto_adso_2994281`
- Crea el usuario `xem_user` con su contraseña
- Otorga todos los privilegios al usuario sobre la base de datos
- Crea la tabla `users` con los campos: `id`, `name`, `username`, `email`, `telefono`, `created_up`, `updated_up`
- Crea la tabla `tasks` con los campos: `id`, `userId` (FK), `titulo`, `descripcion`, `estado`, `created_up`, `updated_up`

### 3. (Opcional) Insertar datos de prueba

El archivo `sql/queries.sql` contiene instrucciones para insertar 5 usuarios y 10 tareas de ejemplo. Ábrelo en MySQL Workbench, copia y pega el contenido y ejecútalo.

## Cómo ejecutar el servidor

Una vez configurada la base de datos, sigue estos pasos:

### Paso 1 — Instalar dependencias

```bash
cd Backend_DOM-Proyecto-XEM
npm install
```

### Paso 2 — Iniciar el servidor

**Modo desarrollo** (con nodemon, reinicia automáticamente al guardar cambios):

```bash
npm run dev
```

**Modo producción** (Node.js directamente):

```bash
npm start
```

### Paso 3 — Verificar que funciona

Si todo está correcto, la consola debe mostrar:

```
Conexión a la base de datos MySQL establecida con éxito
Servidor encendido en el puerto 3000
```

Puedes probar la API abriendo en el navegador o en Postman:

```
http://localhost:3000/
```

Respuesta esperada:

```json
{
  "success": true,
  "message": "Saludo de la API",
  "data": [],
  "errors": []
}
```

## Endpoints disponibles

### Raíz

| Método | Ruta | Descripción      |
|--------|------|------------------|
| GET    | /    | Saludo de la API |

### Tareas — `/tareas`

| Método | Ruta                      | Descripción                               |
|--------|---------------------------|-------------------------------------------|
| GET    | /tareas                   | Obtener todas las tareas                  |
| GET    | /tareas/:id               | Obtener una tarea por ID                  |
| GET    | /tareas/usuario/:userId   | Obtener todas las tareas de un usuario    |
| POST   | /tareas                   | Crear una nueva tarea                     |
| PUT    | /tareas/:id               | Actualizar una tarea                      |
| DELETE | /tareas/:id               | Eliminar una tarea                        |

### Usuarios — `/usuarios`

| Método | Ruta          | Descripción                |
|--------|---------------|----------------------------|
| GET    | /usuarios     | Obtener todos los usuarios |
| GET    | /usuarios/:id | Obtener un usuario por ID  |
| POST   | /usuarios     | Crear un nuevo usuario     |
| PUT    | /usuarios/:id | Actualizar un usuario      |
| DELETE | /usuarios/:id | Eliminar un usuario        |

## Campos requeridos por endpoint

### POST /tareas — Crear tarea

```json
{
  "titulo": "Nombre de la tarea",
  "descripcion": "Descripción opcional",
  "estado": "pendiente",
  "userId": 1
}
```

- `titulo` — obligatorio
- `userId` — obligatorio (debe existir en la tabla `users`)
- `descripcion` — opcional
- `estado` — opcional, valores aceptados: `"pendiente"`, `"en proceso"`, `"completada"` (por defecto `"pendiente"`)

### POST /usuarios — Crear usuario

```json
{
  "name": "Nombre completo",
  "username": "nombre_usuario",
  "email": "correo@ejemplo.com",
  "telefono": "3001234567"
}
```

- Todos los campos son obligatorios
- `username` y `email` deben ser únicos en la base de datos

## Formato de respuesta

Todas las respuestas siguen este formato estándar:

```json
{
  "success": true,
  "message": "Descripción del resultado",
  "data": [],
  "errors": []
}
```

| Campo     | Tipo    | Descripción                                         |
|-----------|---------|-----------------------------------------------------|
| `success` | boolean | `true` si la operación fue exitosa, `false` si falló |
| `message` | string  | Mensaje descriptivo del resultado                   |
| `data`    | array/object | Datos retornados (vacío si hubo error o eliminación) |
| `errors`  | array   | Lista de errores (vacío si fue exitoso)             |

## Códigos HTTP utilizados

| Código | Significado                                              |
|--------|----------------------------------------------------------|
| 200    | OK — operación exitosa (GET, PUT, DELETE)                |
| 201    | Created — recurso creado correctamente (POST)            |
| 400    | Bad Request — faltan campos obligatorios en el body      |
| 404    | Not Found — el recurso con ese ID no existe              |
| 500    | Internal Server Error — error inesperado del servidor    |
