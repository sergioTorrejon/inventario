import * as fs from 'fs';
import moment = require('moment');
import { appConfig } from 'src/core/config/constants';

const path = require('path');

/* FORMATO DE LA FECHA DEL LOG */
const formatTime = 'YYYY-MM-DD HH:mm:ss.SSS'

//VERIFICA SI LA RUTA SI EL ARCHIVO EXISTE Y SI NO EXISTE LA CREA
const PathFile = (path: string ,filename: string) => {
    const pathfile = path + '/'+filename;
    try { 
        if (!fs.existsSync(path)) { //VERIFICA SI EXISTE LA CARPETA
            fs.mkdirSync(path, { recursive: true }); //EN CASO DE NO EXISTIR CREA LA CARPETA
        }
        if (!fs.existsSync(pathfile)) {//VERIFICA SI EXISTE EL ARCHIVO
            fs.writeFileSync(pathfile,'');//EN CASO DE NO EXISTIR CREA EL ARCHIVO
            return true
        }
        return true
    } 
    catch (err) { 
        return false; 
    } 
}

//REGISTRA EL LOG EN EL ARCHIVO
export const AppEndFile = (type: string, context: string, message: string) =>{
    try{
        const filePath = path.join(appConfig.PATH_ROOT,'logs',type, path.sep)//CREA EL NOMBRE DE LA CARPETA
        const fileName= `${type}.log`//CREA EL NOMBRE DEL ARCHIVO
        PathFile(filePath,fileName) // VERIFICA O CREA EL ARCHIVO
        const text = `${moment().format(formatTime)}--[${context}]-- ${message}`//CREA EL TEXTO DEL LOG A REGISTRAR
        fs.appendFile(filePath+fileName, `${text} \n`, function (err) {//AÑADE EL LOG EN EL ARCHIVO
          if (err) throw err;
        });
    }
    catch (err) { 
        return false; 
    } 
}