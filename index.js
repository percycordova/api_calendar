const express = require("express")
require("dotenv").config()
// Crear el servidor de express
const app = express()


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
