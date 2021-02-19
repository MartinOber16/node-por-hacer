const fs = require('fs');
const archivo = 'db/data.json';

const guardarDB = (data) => {
    fs.writeFile(archivo, JSON.stringify(data), (err) => {
        if (err) 
            throw new Error('No se pudo grabar el archivo', err);
    });

    return `Se guardaron los datos correctamente en ${archivo}`;
}

const leerDB = () => {
   
    if(!fs.existsSync(archivo)) {
        return null;
    }
   
    const info = fs.readFileSync(archivo, { encoding: 'utf-8'});
    const data = JSON.parse(info);

    return data;
}


module.exports = {
    guardarDB,
    leerDB
}