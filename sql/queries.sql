-- Muestra la estructura de la tabla 'users'
-- Permite ver los campos, tipos de datos, claves y restricciones
describe users;
-- Muestra la estructura de la tabla 'tasks'
describe tasks;
-- Muestra la estructura de la tabla 'task_users'
-- Tabla intermedia que relaciona usuarios con tareas (relación muchos a muchos)
 describe task_users;

-- Inserta múltiples usuarios en el sistema
-- Cada usuario tiene: nombre completo, nombre de usuario, correo y teléfono
insert into users (name, username, email, telefono) values
('Michael Echeverry', 'mecheverry', 'michael@grupo01.com', '3217658906'),
('Edward Mantilla', 'emantilla', 'edward@grupo01.com', '3148764321'),
('Ximena Quintanilla', 'xquintanilla', 'ximena@grupo01.com', '3208325041'),
('Laura Gómez', 'lgomez', 'laura@grupo01.com', '3158675432'),
('Carlos Ruiz', 'cruiz', 'carlos@grupo01.com', '3224356547');

-- Inserta múltiples tareas en el sistema
-- Campos: titulo: nombre corto de la tarea
-- descripcion: detalle de la tarea
-- estado: puede ser 'pendiente', 'en proceso' o 'completada'
insert into tasks (titulo, descripcion, estado) values
('Revisar documentación del proyecto', 'Leer y analizar los requisitos del sistema de gestión de tareas', 'completada'),
('Configurar el servidor Express', 'Instalar dependencias y configurar el servidor en el puerto 3000', 'completada'),
('Crear rutas del backend', 'Definir los endpoints REST para usuarios y tareas', 'completada'),
('Implementar controladores', 'Desarrollar la lógica de negocio para cada endpoint', 'en proceso'),
('Diseñar interfaz de usuario', 'Crear el HTML y CSS para el módulo de gestión de tareas', 'completada'),
('Conectar frontend con backend', 'Reemplazar las llamadas a JSONPlaceholder por llamadas al servidor local', 'pendiente'),
('Implementar filtros de tareas', 'Agregar funcionalidad de filtrado por estado y ordenamiento', 'completada'),
('Agregar sistema de notificaciones', 'Mostrar mensajes de éxito, error e información al usuario', 'completada'),
('Exportar tareas a JSON', 'Implementar funcionalidad para descargar la lista de tareas visibles', 'pendiente'),
('Documentar el proyecto', 'Escribir el README con la estructura y los endpoints del backend', 'en proceso');

-- Inserta registros en la tabla intermedia 'task_users'
-- Esta tabla permite asignar tareas a usuarios
-- Cada par representa qué usuario está asignado a qué tarea
insert into task_users (taskId, userId) values
(1, 1),
(2, 1),

(3, 2),
(4, 2),

(5, 3),
(6, 3),

(7, 4),
(8, 4),

(9, 5),
(10, 5);

-- Consulta todos los usuarios registrados
select * from users;
-- Consulta todas las tareas registradas
select * from tasks;
-- Consulta la relación entre usuarios y tareas
-- Permite ver qué usuario tiene asignada cada tarea
select * from task_users;