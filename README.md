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