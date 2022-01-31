require('colors');
const inquirer = require('inquirer');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      { value: '1', name: `${ '1.'.brightGreen } Crear tarea` },
      { value: '2', name: `${ '2.'.brightGreen } Listar tareas` },
      { value: '3', name: `${ '3.'.brightGreen } Listar tareas completadas` },
      { value: '4', name: `${ '4.'.brightGreen } Listar tareas pendientes` },
      { value: '5', name: `${ '5.'.brightGreen } Completar tarea(s)` },
      { value: '6', name: `${ '6.'.brightGreen } Borrar tarea` },
      { value: '7', name: `${ '7.'.brightGreen } Salir` },
    ]
  }
];

const inquirerMenu = async () => {
  console.clear();
  console.log('==========================='.brightGreen);
  console.log('   Seleccione una opción');
  console.log('===========================\n'.brightGreen);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
}

const pausa = async () => {
  console.log('\n');
  await inquirer.prompt([
    {
      type: 'input',
      name: 'opcion',
      message: `\nPresione ${ 'ENTER'.brightGreen } para salir`
    }
  ]);
}

const leerInput = async (message) => {
  const { descripcion } = await inquirer.prompt([
    {
      type: 'input',
      name: 'descripcion',
      message,
      validate(value) {
        if (value.trim().length === 0) {
          return 'Por favor ingrese un valor.';
        }
        return true;
      }
    }
  ]);
  return descripcion.trim();
}

const listadoBorrarTarea = async (tareas = []) => {
  const choices = tareas.map((tarea, id) => {
    const idx = `${ ++id }.`.brightGreen;
    return { value: tarea.id, name: `${ idx } ${ tarea.descripcion }` }
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
}

const listadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, id) => {
    const idx = `${ ++id }.`.brightGreen;
    return {
      value: tarea.id,
      name: `${ idx } ${ tarea.descripcion }`,
      checked: (tarea.creadoEn) ? true : false
    }
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Borrar',
      choices
    }
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
}

const confirmar = async (message) => {
  const pregunta = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(pregunta);
  return ok;
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoBorrarTarea,
  listadoChecklist,
  confirmar
}
