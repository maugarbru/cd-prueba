
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

    async update(id, name, active) {
        //Validar si existe
    }

    async delete(id) {
        let tasks = await service.getAll()
        if (!tasks.find(id)) {
            return await service.delete(id)
        }
    }

    async getAll() {
        let tasks = await service.getAll()
        return tasks
    }

    async getOne(id) {
        return await service.getOne(id)
    }

}