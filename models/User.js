//Importamos Mongoose para definir y tener el esquema de usuario y el modelo

const mongoose = require("mongoose");
const bcryptService = require("../services/bcryptService");

//Definimos el esquema de usuario utilizando el cosntructor de Mongoose llamado Schema

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true, //Es obligatorio
    },
    edad: {
        type: Number,
        require: true, //Es obligatorio
    },
    email: {
        type: String,
        require: true, //Es obligatorio
        unique: true, //tiene que ser unico
    },
    contraseña: {
        type: String,
        require: true, //Es obligatorio
    },
});

//Antes de guardar un nuevo usuario, se hashea la contraseña
userSchema.pre("save", function (next) {
    if (!this.isModified("contraseña")) {
        return next();
    }
    bcryptService
        .hashPassword(this.contraseña)
        .then((hashedPassword) => {
            this.contraseña = hashedPassword;
            next()
        })
        .catch((error) => {
            console.error(error);
            next(error)
        });
});

//Crear  el modelo user utilizando el esquema definido anteriormente

const User = mongoose.model("User", userSchema);

//Exportamos el modelo User para usarlo en cualquier parte

module.exports = User;
