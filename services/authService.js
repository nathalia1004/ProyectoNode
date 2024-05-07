const jwt = require("jsonwebtoken")

//Almacenamos nuestra clave secreta

const JWT_SECRET = "cba7bdba5ad4817086eaf7c64c35966b3fa65e871131dacf7e8ddf1bd888c331"

//cramos una funcion para crear una funcion JWT

function generateToken(user){
    const payload = {
        userId: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h"});
    return token
}

module.exports = {
    generateToken 
}