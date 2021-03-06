const pg = require('./db/postgresql').create()

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
        let sql = `INSERT INTO public.tasks(id, descripcion, fecha, prioridad, completada)
            VALUES ('${id}', '${descripcion}', '${fecha}', '${prioridad}', ${false});`;
        let response = await pg.execute(sql)
        return response
    }

   async update(id) {
      let sql = `UPDATE public.tasks
        SET completada=true
        WHERE id='${id}'`
        return await pg.execute(sql)
    }

    async delete(id) {
        let sql = `DELETE FROM public.tasks WHERE id='${id}'`;
        let response = await pg.execute(sql)
        return response
    }

    async getAll() {
        let sql = `SELECT * FROM public.tasks`;
        let response = await pg.executeRows(sql)
        return response
    }

    async getSinCumplir() {
        let sql = `SELECT * FROM public.tasks WHERE completada=false`;
        let response = await pg.executeRows(sql)
        return response
    }

    async getCumplidas() {
        let sql = `SELECT * FROM public.tasks WHERE completada=true`;
        let response = await pg.executeRows(sql)
        return response
    }

}