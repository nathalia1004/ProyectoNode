//Importamos express y creamos un router

const express = require("express");
const router = express.Router();

//Importamos el controlador de sessionRouter

const authController = require("../controllers/authController");

//Importamos el middleware de seguridad
const verifyToken= require("../middleware/verifyToken")

//Rutas para el Auth del User

router.post("/login", authController.login);

//Ruta para cerrar Sesión
router.post("/logout", verifyToken,authController.logout);

module.exports = router;
