//Importar libreria
var express = require('express')
//Inicializar libreria
var app = express.Router()

const controller = require('../controllers/tasks').create()

// Obtener todas las tareas
app.get('/tasks/', function (req, res) {
    controller.getAll().then(response => {
        res.status(200).send(response)
    }).catch(error => {
        console.log(error);
    })
})

// Obtener tareas sin cumplir
app.get('/tasks/completadas/false', function (req, res) {
    controller.getSinCumplir().then(response => {
        res.status(200).send(response)
    }).catch(error => {
        console.log(error);
    })
})

// Obtener tareas cumplidas
app.get('/tasks/completadas/true', function (req, res) {
    controller.getCumplidas().then(response => {
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
        res.status(201).send({ message: "Tarea añadida" })
    }).catch(error => {
        console.log(error);
        res.status(400).send({ message: "Error al insertar la tarea" })
    })
})

// Pone una tarea como "cumplida"
app.put('/tasks/:id', (req, res) => {
    let id = req.params.id
    controller.update(id).then(response => {
        res.status(200).send({ message: "Tarea actualizada" })
    }).catch(error => {
        res.status(400).send({ message: "Error al actualizar la tarea" })
    })
})

// Elimina una tarea
app.delete('/tasks/:id', (req, res) => {
    let id = req.params.id
    controller.delete(id).then(response => {
        res.status(200).send({ message: "Tarea eliminada" })
    }).catch(error => {
        res.status(400).send({ message: "Error al eliminar la tarea" })
    })
})

module.exports = app
