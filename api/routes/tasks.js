//Importar libreria
var express = require('express')
//Inicializar libreria
var app = express.Router()

//Arreglo de tareas
var tasks = []

const controller = require('../controllers/tasks').create()

// Obtener todas las tareas
app.get('/tasks/', function (req, res) {
    controller.getAll().then(response => {
        //RETORNO EL ARRAY DE TAREAS
        res.status(200).send(response)
    }).catch(error => {
        console.log(error);
    })
})

// Obtener tareas sin cumplir
app.get('/tasks/completadas/false', function (req, res) {
    controller.getSinCumplir().then(response => {
        //RETORNO EL ARRAY DE TAREAS
        res.status(200).send(response)
    }).catch(error => {
        console.log(error);
    })
})

// Obtener tareas cumplidas
app.get('/tasks/completadas/true', function (req, res) {
    controller.getCumplidas().then(response => {
        //RETORNO EL ARRAY DE TAREAS
        res.status(200).send(response)
    }).catch(error => {
        console.log(error);
    })
})

// Añadir tarea
app.post('/tasks/', (req, res) => {
    let body = req.body
    //Capturo la respuesa de la insercion a la base de datos
    controller.insert(body.id, body.descripcion, body.fecha, body.prioridad).then(response => {
        res.status(201).send(tasks)
    }).catch(error => {
        console.log(error);
        res.status(400).send({ message: "Error al insertar la tarea" })
    })
})


//PENDIENTE POR BASE DE DATOS
/**
 * MODIFICAR TAREA
 * REQ: SOLICITUD -> BODY (Es la tarea que voy a registrar)
 * RES: RESPUESTA -> LE VOY A RETORNAR LA TAREAS QUE HAY AGREGADAS
 */
app.put('/tasks/:id', (req, res) => {
    //Capturar el body (Es una tarea)
    let body = req.body
    let id = req.params.id

    let myTask = tasks.find(element => element.id == id)
    let index = tasks.indexOf(myTask)

    //Modificar en el array, en el index donde se encuenta
    //la tarea la modifico con la informacion que tiene el body
    tasks.splice(index, 1, body)
    //Lo que le voy a responder
    res.send(tasks)
})


app.delete('/tasks/:id', (req, res) => {
    let id = req.params.id
    controller.delete(id).then(response => {
        res.status(200).send({ message: "Tarea eliminada" })
    }).catch(error => {
        res.status(400).send({ message: "Error al eliminar la tarea" })
    })
})

module.exports = app
