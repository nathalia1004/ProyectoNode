const jwt = require("jsonwebtoken")

function verifyToken(req, res, next){

return new Promise ((resolve, reject)=>{
    const token = req.headers.authorization

    if(!token){
        reject({status:401, message : "Token de autentificación no proporcionado"})
    }

    jwt.verify(token.split(" ")[1],
    "cba7bdba5ad4817086eaf7c64c35966b3fa65e871131dacf7e8ddf1bd888c331", (error,decodedToken)=>{
        if(error){
            reject({ status: 401, message : "Token de autorización no válido"});
        }else{
            req.userId = decodedToken.userId //Agregamos el Id de usuario decodificado para su posterior uso 
            resolve();
        }
    });
})

.then(()=> next()) // Continua el seguimiento del siguiente middleware o del siguiente controlador
.catch((error) => 
    res.status(error.status|| 500).json({ message: error.message})
);
}

module.exports= verifyToken