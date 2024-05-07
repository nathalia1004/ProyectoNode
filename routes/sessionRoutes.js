//Importamos express y creamos un router

const express = require("express")
const router = express.Router()

//Importamos el controlador de sessionRouter

const sessionController = require("../controllers/sessionController");
const verifyToken = require("../middleware/verifyToken");

//ruta protegida para obtener informacion sobre el usuario que inició sesión

router.get("/currentUser", verifyToken, sessionController.getCurrentUser)//ruta protegida para obtener informacion del usuario que esta conectado actualmente 

module.exports =router;
