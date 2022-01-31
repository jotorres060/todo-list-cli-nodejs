require('colors');
const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listarTareas() {
    const tareas = [];
    Object.keys(this._listado)
      .forEach((key) => tareas.push(this._listado[key]));
    return tareas;
  }

  listarTareasDB(tareas = []) {
    tareas.forEach((tarea) => this._listado[tarea.id] = tarea);
  }

  listadoCompleto() {
    console.log();
    this.listarTareas.forEach((tarea, index) => {
      const estado = (tarea.creadoEn == null) ? 'Pendiente'.brightRed : 'Completada'.brightGreen;
      console.log(`${ (++index).toString().concat('.').brightGreen } ${ tarea.descripcion } :: ${ estado }`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    this.listarTareas
      .filter((tarea) => (completadas) ? tarea.creadoEn != null : tarea.creadoEn == null)
      .forEach((tarea, index) => {
        const estado = (tarea.creadoEn == null) ? 'Pendiente'.brightRed : `${ tarea.creadoEn }`.brightGreen;
        console.log(`${ (++index).toString().concat('.').brightGreen } ${ tarea.descripcion } :: ${ estado }`);
      });
  }

  crearTarea(descripcion) {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea;
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.creadoEn) {
        tarea.creadoEn = new Date().toISOString();
      }
    });

    this.listarTareas.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].creadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
