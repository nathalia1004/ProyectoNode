//Importamos mongoose para crear la conexion a la db de Mongo

const mongoose = require("mongoose")

//Conectamos la db  utilizando el metodo connect de mongoose

const mongoDBURL = "mongodb+srv://natisnti:Television*93@cluster0.ryf5yts.mongodb.net/proyect"

function connectDB() {
    return new Promise((res, rej) => {
        //Conectamos la base usando la URL 
        mongoose
            .connect(mongoDBURL)
            .then(() => {
                console.log("Conexión a la DB establecida Correctamente");
                //Si la conexion es exitosa resolvemos la promesa
                res();
            })
            .catch((err) => {
                //Sihay un error al conectar, imprimir el error y rechazar la promesa 
                console.error("Error al conectar a la DB ", err);
                rej(err);
            });
    });
}

//Exportamos la funcion de la conexion a a base para poder utilizarla en el api.js
module.exports = connectDB;