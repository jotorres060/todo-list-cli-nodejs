require('colors');
const { guardarDatos, leerDatos } = require('./helpers/guardarDatos');
const { inquirerMenu, pausa, leerInput, listadoBorrarTarea, confirmar, listadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
  const tareas = new Tareas();
  const tareasDB = leerDatos();
  let opt = '';

  if (tareasDB) {
    tareas.listarTareasDB(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const descripcion = await leerInput('Descripción:');
        tareas.crearTarea(descripcion);
        break;
      case '2':
        tareas.listadoCompleto();
        break;
      case '3':
        tareas.listarPendientesCompletadas(true);
        break;
      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
      case '5':
        const ids = await listadoChecklist(tareas.listarTareas);
        tareas.toggleCompletadas(ids);
        break;
      case '6':
        const id = await listadoBorrarTarea(tareas.listarTareas);
        const ok = await confirmar('¿Está seguro de eliminar esta tarea?');
        if (ok) {
          tareas.borrarTarea(id);
          console.log('Tarea borrada exitosamente.');
        }
        break;
    }

    guardarDatos(tareas.listarTareas);
    await pausa();
  } while (opt !== '7');
}

main();
