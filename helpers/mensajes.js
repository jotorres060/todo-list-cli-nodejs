require('colors');

const mostrarMenu = async () => {
  return new Promise((resolve) => {
    console.clear();
    console.log('==========================='.brightGreen);
    console.log('   Seleccione una opción'.brightGreen);
    console.log('===========================\n'.brightGreen);

    console.log(`${ '1.'.brightGreen } Crear tarea`);
    console.log(`${ '2.'.brightGreen } Listar tareas`);
    console.log(`${ '3.'.brightGreen } Listar tareas completadas`);
    console.log(`${ '4.'.brightGreen } Listar tareas pendientes`);
    console.log(`${ '5.'.brightGreen } Completar tarea(s)`);
    console.log(`${ '6.'.brightGreen } Borrar tarea`);
    console.log(`${ '0.'.brightGreen } Salir\n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('Seleccione una opción: ', (opt) => {
      readline.close();
      resolve(opt);
    });
  });
}

const pausa = async () => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(`\nPresione ${ 'ENTER'.brightGreen } para salir`, (opt) => {
      readline.close();
      resolve(opt);
    });
  });
}

module.exports = {
  mostrarMenu,
  pausa
}
