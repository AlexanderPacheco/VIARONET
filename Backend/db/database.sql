show databases;

CREATE DATABASE IF NOT EXISTS viaronet;

USE viaronet;

#Alumno: Id, Nombre, Apellidos, Género, Fecha Nacimiento
CREATE TABLE alumno (
  Id INT(11) NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(45) NOT NULL,
  Apellidos VARCHAR(45) NOT NULL,
  Genero VARCHAR(5),
  FechaNacimiento DATE,
  PRIMARY KEY(Id)
);

#Profesor: Id, Nombre Apellidos, Género
CREATE TABLE profesor (
  Id INT(11) NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(45) NOT NULL,
  Apellidos VARCHAR(45) NOT NULL,
  Genero VARCHAR(5),
  PRIMARY KEY(Id)
);

#Grado: Id, Nombre, ProfesorId
CREATE TABLE grado (
  Id INT(11) NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(45) NOT NULL,
  ProfesorId INT NOT NULL,
  PRIMARY KEY(Id),
  FOREIGN KEY (ProfesorId) REFERENCES profesor(Id)
);

#AlumnoGrado: Id, AlumnoId, GradoId, Sección.
CREATE TABLE alumnoGrado (
  Id INT(11) NOT NULL AUTO_INCREMENT,
  AlumnoId INT NOT NULL,
  GradoId INT NOT NULL,
  Seccion VARCHAR(5) not null,
  PRIMARY KEY(Id),
  FOREIGN KEY (AlumnoId) REFERENCES alumno(Id),
  FOREIGN KEY (GradoId) REFERENCES grado(Id)
);

show tables;
DESCRIBE alumno;
SELECT * FROM alumno;
SELECT * FROM profesor;
SELECT * FROM grado;
SELECT * FROM alumnoGrado;

INSERT INTO alumno(Nombre, Apellidos, Genero, FechaNacimiento) values
  ('Alexander','Pacheco', 'M', '1996-01-12');
INSERT INTO profesor(Nombre, Apellidos, Genero) values
  ('Raymundo','Ixvalan', 'M');
INSERT INTO grado(nombre, profesorid) values
  ('Sexto',3);
INSERT INTO alumnoGrado(AlumnoId, GradoId, Seccion) values
  (2,2,'A');

DROP TABLE alumnoGrado;
DROP TABLE grado;
DROP TABLE profesor;
DROP TABLE alumno;