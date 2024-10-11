const express = require("express")
const { dbConnection } = require("./database/config")
const cors = require("cors")
require("dotenv").config()
// Crear el servidor de express
const app = express()

//Base de datos
dbConnection()

//CORS
app.use(cors())

//Escuchar peticiones en el puerto 4500
app.listen(process.env.PORT, () => {
  console.log(`Escuchando desde el puerto: ${process.env.PORT}`)
})


//Definir el directorio publico
app.use(express.static("./public"))

//Lectura y parseo del body
app.use(express.json())

//Rutas
app.use("/api/auth", require("./routes/auth"))
app.use("/api/calendar-events", require("./routes/calendarEvents"))
