# CD-PRUEBA
Aplicación Web utilizando Node.js y Vue.js para administrar tareas (ToDo's)
Prueba técnica para Creativos Digitales S.A.S.

### Pre-requisitos
Instalar Nodejs con NPM y PostgreSQL con pgAdmin3 o pgAdmin4

### Pasos de instalación
En pgAdmin, crear la base de datos `task-manager` y la tabla `tasks` con el archivo que está en `./api/services/db/database.sql`
Luego, en una terminal, en la ruta de la carpeta del projecto, ejecutar:

```
cd api
npm i
node index.js o nodemon index.js
```
En otra terminal, en la ruta del proyecto, ejecutar:

```
cd task-manager
npm i
npm run serve
```
### Listo!
Ingresar a la app en [http://localhost:8080/](http://localhost:8080/)
Las tablas estarán vacías. Debes ir a la página de `Administrar` para crear nuevas y poderlas ver en las tablas.

### Funcionalidades de la app
1. La pantalla inicial (`Ver - Home`) muestra las tareas sin cumplir y cumplidas. En la tabla sin cumplir se pueden seleccionar las tareas para convertirlas en cumplidas.
2. En la pantalla de `Administrar` se muestra la lista general de las tareas creadas. Se pueden crear nuevas tareas y al seleccionar de la tabla, pueden eliminarse.
3. La pantalla de `Acerca` muestra la informacion del desarrollador.

### Características de la app
* SPA - Single Page Application
* Responsive


