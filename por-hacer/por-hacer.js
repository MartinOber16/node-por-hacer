const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let nombreArchivo = 'db/data.json';
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(nombreArchivo, data, (err) => {
        if (err) 
            throw new Error('No se pudo grabar el archivo', err);
    });

    return `Se guardaron los datos correctamente en ${nombreArchivo}`;
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json'); // automaticamente se pasa a un objeto JS
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    
    cargarDB();

    let porHacer = {
        descripcion,
        completado: 'false'
    };
    
    listadoPorHacer.push(porHacer);
    
    let resultado = guardarDB();
    
    console.log(resultado);

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const getlistadoFiltrado = (completado) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.completado === completado;
    });
    return nuevoListado;
}

const actualizar = (descripcion, completado = 'true') => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if( index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
    
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado =  listadoPorHacer.filter(tarea => {
        return tarea.descripcion != descripcion;
    });

    if( listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

} 

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    getlistadoFiltrado
}