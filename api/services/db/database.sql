-- Database: task-manager

-- DROP DATABASE "task-manager";

CREATE DATABASE "task-manager"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Colombia.1252'
    LC_CTYPE = 'Spanish_Colombia.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.tasks

-- DROP TABLE public.tasks;

CREATE TABLE public.tasks
(
    id character varying(50) NOT NULL,
    descripcion character varying(100) NOT NULL,
    fecha date NOT NULL,
    prioridad character varying(100) NOT NULL,
    completada boolean NOT NULL
)

INSERT INTO public.tasks(
	id, descripcion, fecha, prioridad, completada)
	VALUES ('t78k98', 'Dar de comer al perro', '2019-06-01', 'Baja', false),
    ('t18k18', 'Pagar recibos', '2019-06-01', 'Baja', false),
    ('t78k78', 'Desarrollar prueba tecnica', '2019-06-02', 'Media', false),
    ('t79k99', 'Terminar prueba tecnica', '2019-06-03', 'Alta', true),
    ('t85k96', 'Correr tests', '2019-06-02', 'Baja', true),
    ('t18k93', 'Enviar prueba tecnica', '2019-06-04', 'Alta', false),
    ('t97k97', 'Hacer mercado', '2019-06-04', 'Media', false),
    ('t15k15', 'Sacar la basura', '2019-06-09', 'Baja', false);
