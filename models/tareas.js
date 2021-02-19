const Tarea = require('./tarea');
/**
 * _listado:
 *      { 'uuid-12345-123123-2: {id: 12, desc: josajdoa, completadoEn: 123123 }  }
 */
class Tareas {

    _listado = {};

    get listadoArr() {
        
        const listado = [];
        Object.keys(this._listado) // Obtengo los ids de cada objeto del listado
            .forEach( key => {
                const tarea = this._listado[key];
                listado.push(tarea);
            });

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea (id = ''){

        if(this._listado[id]) {
            delete this._listado[id];
        }

    }

    cargarTareas(tareas) {
        this._listado = tareas;
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    
    listadoCompleto(){
        
        console.log();
        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i +1}`.green;
            const completada = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${tarea.desc} :: ${completada}`);
        });
        
    }

    listarPendientesCompletadas( completadas = true) {
        
        console.log();
        let listado = this.listadoArr.filter(tarea => {
            if(completadas)
                return tarea.completadoEn !== null;
            else
                return tarea.completadoEn === null;
        });

        listado.forEach( (tarea, i) => {
            const idx = `${i +1}`.green;
            const completada = tarea.completadoEn ? tarea.completadoEn.green : 'Pendiente'.red;
            console.log(`${idx} ${tarea.desc} :: ${completada}`);
        });
    }

    toggleCompletadas( ids = []) {
        ids.forEach( id => {

            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }


}

module.exports = Tareas;