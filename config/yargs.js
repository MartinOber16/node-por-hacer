const descripcion = {
  demand: true,
  alias: 'd',
  desc: 'Descripción de la tarea por hacer'
};

const completado = {
  alias: 'c',
  default: true,
  desc: 'Marca como completado o pendiente la tarea'
}

const argv = require('yargs')
  .command('crear', 'Crear una tarea por hacer', { 
    descripcion 
  })
  .command('actualizar', 'Actualiza el estado de una tarea', { 
    descripcion, 
    completado 
  })
  .command('borrar', 'Borrar una tarea por hacer', { 
    descripcion 
  })
  .command('listar', 'Lista las tareas por hacer', {
    filtro: {
      alias: 'f',
      desc: 'Filtra el listado de tareas según su estado'
    }
  })
  .help()
  .argv;

module.exports = {
    argv
}
