create database EnglishFly_DB

use EnglishFly_DB

CREATE TABLE TiposUsuario (
    tipo_id INT PRIMARY KEY IDENTITY,
    nombre_tipo VARCHAR(20) NOT NULL UNIQUE
);
INSERT INTO TiposUsuario (nombre_tipo) VALUES ('estudiante'), ('profesor'), ('admin');

CREATE TABLE Usuarios (
    usuario_id INT PRIMARY KEY IDENTITY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    primer_nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo_id INT NOT NULL,
    esta_activo BIT DEFAULT 1,
    FOREIGN KEY (tipo_id) REFERENCES TiposUsuario(tipo_id)
);

CREATE TABLE Estudiantes (
    usuario_id INT PRIMARY KEY,
    carrera VARCHAR(100) NOT NULL,
    matricula VARCHAR(20) UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

CREATE TABLE Profesores (
    usuario_id INT PRIMARY KEY,
    departamento VARCHAR(100) NOT NULL,
    titulo_academico VARCHAR(100),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

CREATE TABLE Admins (
    usuario_id INT PRIMARY KEY,
    rol VARCHAR(100),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

CREATE TABLE Cursos (
    curso_id INT PRIMARY KEY IDENTITY,
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    nivel VARCHAR(2) NOT NULL CHECK (nivel in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    esta_activo bit DEFAULT 1,
    profesor_id INT,
    FOREIGN KEY (profesor_id) REFERENCES Usuarios(usuario_id)
);

CREATE TABLE Clases (
    clase_id INT PRIMARY KEY IDENTITY,
    curso_id INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(MAX),
    content NVARCHAR(MAX),
    video_url VARCHAR(255),
    duracion_clase INT,
    orden_clase INT NOT NULL,
    esta_activo bit DEFAULT 1,
    FOREIGN KEY (curso_id) REFERENCES Cursos(curso_id)
);
  
CREATE TABLE Ejercicios (
    ejercicio_id INT PRIMARY KEY IDENTITY,
    clase_id INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    instrucciones NVARCHAR(MAX) NOT NULL,
    tipo_ejercicio_id INT NOT NULL, 
    puntaje_maximo INT NOT NULL,
    esta_activo BIT DEFAULT 1,
    FOREIGN KEY (clase_id) REFERENCES Clases(clase_id),
    FOREIGN KEY (tipo_ejercicio_id) REFERENCES TiposEjercicio(tipo_ejercicio_id) 
);

CREATE TABLE TiposEjercicio (
    tipo_ejercicio_id INT PRIMARY KEY IDENTITY,
    nombre_tipo VARCHAR(50) UNIQUE NOT NULL CHECK (nombre_tipo IN ('multiple_choice', 'fill_blank', 'matching', 'writing', 'speaking'))
);

CREATE TABLE EstadoUsuarios (
    estado_id INT PRIMARY KEY IDENTITY,
    nombre_estado VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO EstadoUsuarios (nombre_estado) VALUES ('not_started'), ('in_progress'), ('completed');

CREATE TABLE Inscripcion (
    inscripcion_id INT PRIMARY KEY IDENTITY,
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado_id int not null default 1,
    porcentaje_curso DECIMAL(5,2) DEFAULT 0.00,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (curso_id) REFERENCES Cursos(curso_id),
	FOREIGN KEY (estado_id) REFERENCES EstadoUsuarios(estado_id),
    UNIQUE (usuario_id, curso_id)
);

CREATE TABLE Progreso (
    progreso_id INT PRIMARY KEY IDENTITY,
    usuario_id INT NOT NULL,
    clase_id INT NOT NULL,
    ejercicio_id INT,
    estado_clase VARCHAR(20) DEFAULT 'not_started' CHECK (estado_clase IN ('not_started', 'in_progress', 'completed')),
    puntaje DECIMAL(5,2) CHECK (puntaje >= 0.00 AND puntaje <= 100.00),
	intentos INT DEFAULT 0,
    ultimo_intento DATETIME,
    retroalimentacion NVARCHAR(MAX),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (clase_id) REFERENCES clases(clase_id),
    FOREIGN KEY (ejercicio_id) REFERENCES Ejercicios(ejercicio_id) 
);

CREATE TABLE Actividades (
    Actividad_id INT PRIMARY KEY IDENTITY,
    ejercicio_id INT NOT NULL,
    pregunta_quiz NVARCHAR(MAX) NOT NULL,
    orden_preguntas INT NOT NULL,
    respuesta_correcta NVARCHAR(MAX) NOT NULL,
    opciones NVARCHAR(MAX) CHECK (ISJSON(opciones) = 1), 
    puntaje_maximo INT NOT NULL,
    FOREIGN KEY (ejercicio_id) REFERENCES Ejercicios(ejercicio_id)
);
