//Importamos Express y la conección a la base de datos

const express = require("express")

const connectDb = require("./db/db")



//Creamos una instancia de Express

const app = express()
const PORT = 3010

//Importamos las rutas
const userRoutes =require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const sessionRoutes = require("./routes/sessionRoutes")

//MIddleware

app.use(express.json()) //Invocamos el moddleware para que parsee los datos del body de las solicitudes en formato json

//Rutas de autenticación
app.use("/api/auth", authRoutes)

//Rutas de usuarios
app.use("/api/users", userRoutes) //Creamos las rutas de usuario en la ruta /api/users

//rutas de usuario actual
app.use("/api/session", sessionRoutes)

//Iniciamos la DB
connectDb();

//Inicializamos el servidor y lo ponemos en escucha en el puerto

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto: "+ PORT)
})