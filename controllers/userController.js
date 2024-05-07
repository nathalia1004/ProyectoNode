//Importamos el modelo de Mongo

const User = require("../models/User")
const bcryptService = require("../services/bcryptService");


//función para obtener  todos los usuarios

function getAllUsers(req, res){
    //Utilizamos el metodo find() de Mongoose para encontrar  todos* los usuarios

    User.find()
    .then(users=> res.status(200).json(users)) //Enviamos todos los usuarios como respuesta 
    .catch(err=>{
        console.error(err)
        res.status(500).send("Error al obtener usuarios"); // En caso de error que envie un mensaje al cliente
    });
}

//Funcion para crear un nuevo usuario

function createUser(req, res){
    //Extraemos toda la información del cuerpo de la solicitud

    const {nombre, edad, email, contraseña} = req.body

    //Creamos un nuevo usuario con el metodo create() de Mongoose
    User.create({nombre, edad, email, contraseña})
    .then((newUser)=>res.status(201).json(newUser)) //Enviamos el nuevo usuario en formato Json
    .catch((err)=>{
        console.error(err);
        res.status(500).send("Error al crear usuario"); 
    });
}

//Funcion para actualizar un usuario

function updatedUser(req, res) {
    // Obtenemos el id del usuario a actualizar
    const userId = req.params.id;

    // Obtenemos los datos actualizados del body de la req
    const updateUser = req.body;

    // Si la contraseña está presente en los datos actualizados, la hasheamos
    if (updateUser.contraseña) {
        bcryptService.hashPassword(updateUser.contraseña)
            .then(hashedPassword => {
                updateUser.contraseña = hashedPassword;

                // Utilizamos el metodo findByIdAndUpdate de Mogoose para buscar y actualizar el User por Id
                User.findByIdAndUpdate(userId, updateUser, { new: true })
                    .then(user => {
                        if (!user) {
                            return res.status(404).json({ message: "Usuario no encontrado" });
                        }
                        // Si todo está bien, respondemos con el usuario actualizado
                        res.status(200).json(user);
                    })
                    .catch(error => {
                        console.error(error);
                        res.status(500).send("Error al actualizar el usuario");
                    });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Error al hashear la contraseña");
            });
    } else {
        // Si la contraseña no está presente, simplemente actualizamos el usuario sin hashear la contraseña
        User.findByIdAndUpdate(userId, updateUser, { new: true })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
                // Si todo está bien, respondemos con el usuario actualizado
                res.status(200).json(user);
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Error al actualizar el usuario");
            });
    }
}


//Funcion para eliminar un usuario

function deleteUser(req, res){
    //Obtenemos el id del usuario a eliminar

    const userId= req.params.id

    //utilizamos el metodo findByIdAndDelete() de Mogoose para buscar y eliminar  el User por Id
    User.findOneAndDelete(userId)
    .then(()=>res.status(200).send("Usuario eliminado Correctamente")) //Enviamos una confirmación al usuario que se elimino correctamente
    .catch((err)=>{
        console.error(err);
        res.status(500).send("Error al Eliminar el usuario"); //En caso de tener error, envía un mensaje al cliente
    });
}

//Exportamos todas la funciones para su uso en otras partes
module.exports={
    createUser,
    deleteUser,
    getAllUsers,
    updatedUser
}
