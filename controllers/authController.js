const authService = require("../services/authService");
const AuthToken = require("../models/AuthToken");
const bcryptService = require("../services/bcryptService");
const User = require("../models/User");

//Controlador para manejar la Autenticación de Usuarios

function login(req, res) {
    const { email, contraseña } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "Credenciales Inválidas" });
            }

            //Comparar la contraseña ingresada con la de la BD
            bcryptService
                .comparePassword(contraseña, user.contraseña)
                .then((match) => {
                    if (!match) {
                        return res.status(401).json({ message: "Credenciales inválidas" });
                    }
                    //Si las credenciales son válidas, creamos el token

                    const token = authService.generateToken(user);

                    //Guardar el token en la BD
                    AuthToken.create({ userId: user._id, token })
                        .then(() => {
                            res.json({ token });
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).json({ message: "Error al iniciar sesión" });
                        });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ message: "Error al iniciar sesión" });
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Error al iniciar sesión" });
        });
}

//Controlador para cerrar sesión

function logout(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    //buscamos el token en la BD y lo eliminamos
    AuthToken.findOneAndDelete({ token })
        .then(() => {
            res.status(200).json({ message: "Sesión cerrada exitosamente", error: {token} });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Error al cerrar sesión" });
        });
}

module.exports = {
    login,
    logout,
};
