const service = require('../services/tasks').create()

module.exports = {
    create: function () {
        return new Task()
    }
}

/**
 * CRUD DE TAREAS
 */
class Task {
    constructor() {

    }

    async insert(id, descripcion, fecha, prioridad) {
        return await service.insert(id, descripcion, fecha, prioridad)
    }

    async update(id) {
        return await service.update(id)
    }

    async delete(id) {
        return await service.delete(id)
    }

    async getAll() {
        let tasks = await service.getAll()
        return tasks
    }

    async getSinCumplir() {
        let tasks = await service.getSinCumplir()
        return tasks
    }

    async getCumplidas() {
        let tasks = await service.getCumplidas()
        return tasks
    }
}