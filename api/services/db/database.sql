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