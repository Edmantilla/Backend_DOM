-- Muestra la estructura de la tabla 'users'
describe users;
-- Muestra la estructura de la tabla 'users'
describe tasks;

-- Inserta múltiples usuarios en la tabla users
insert into users (name, username, email, telefono) values
('Michael Echeverry', 'mecheverry', 'michael@grupo01.com', '3217658906'),
('Edward Mantilla', 'emantilla', 'edward@grupo01.com', '3148764321'),
('Ximena Quintanilla', 'xquintanilla', 'ximena@grupo01.com', '3208325041'),
('Laura Gómez', 'lgomez', 'laura@grupo01.com', '3158675432'),
('Carlos Ruiz', 'cruiz', 'carlos@grupo01.com', '3224356547');

-- Inserta múltiples tareas asociadas a usuarios existentes
insert into tasks (userId, titulo, descripcion, estado) values
(1, 'Revisar documentación del proyecto', 'Leer y analizar los requisitos del sistema de gestión de tareas', 'completada'),
(1, 'Configurar el servidor Express', 'Instalar dependencias y configurar el servidor en el puerto 3000', 'completada'),
(2, 'Crear rutas del backend', 'Definir los endpoints REST para usuarios y tareas', 'completada'),
(2, 'Implementar controladores', 'Desarrollar la lógica de negocio para cada endpoint', 'en proceso'),
(3, 'Diseñar interfaz de usuario', 'Crear el HTML y CSS para el módulo de gestión de tareas', 'completada'),
(3, 'Conectar frontend con backend', 'Reemplazar las llamadas a JSONPlaceholder por llamadas al servidor local', 'pendiente'),
(4, 'Implementar filtros de tareas', 'Agregar funcionalidad de filtrado por estado y ordenamiento', 'completada'),
(4, 'Agregar sistema de notificaciones', 'Mostrar mensajes de éxito, error e información al usuario', 'completada'),
(5, 'Exportar tareas a JSON', 'Implementar funcionalidad para descargar la lista de tareas visibles', 'pendiente'),
(5, 'Documentar el proyecto', 'Escribir el README con la estructura y los endpoints del backend', 'en proceso');

-- Consulta todos los registros de la tabla users
select * from users;
-- Consulta todos los registros de la tabla tasks
select * from tasks;