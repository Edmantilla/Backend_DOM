    -- Crea la base de datos del proyecto
    create database proyecto_adso_2994281;
    -- Muestra todas las bases de datos existentes
    show databases;
    -- Crea un usuario local con contraseña
    create user 'xem_user'@'localhost' identified by "2994281_proyecto";
    -- Otorga todos los privilegios sobre la base de datos al usuario creado
    grant all privileges on proyecto_adso_2994281.* to 'xem_user'@'localhost';
    -- Aplica los cambios de permisos
    flush privileges;
    -- Aplica los cambios de permisos
    use proyecto_adso_2994281;

-- Se crea la tabla de usuarios
create table users (
    id int auto_increment primary key,
    name varchar(100) not null,
    username varchar(100) not null unique,
    email varchar(250) not null unique,
    telefono varchar(20) not null,
    created_up timestamp default current_timestamp,
    updated_up timestamp default current_timestamp on update current_timestamp
);

-- Se crea la tabla de tareas
create table tasks (
    id int auto_increment primary key,
    userId int not null,
    titulo varchar(250) not null,
    descripcion text, 
    estado enum("completada", "en proceso", "pendiente") default "pendiente",
    created_up timestamp default current_timestamp,
    updated_up timestamp default current_timestamp on update current_timestamp,
    constraint fk_tasks_users
    foreign key (userId) references users(id)
    on delete restrict
    on update cascade
);