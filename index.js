const express = require("express")

// Crear el servidor de express
const app = express()


//Escuchar peticiones en el puerto 4500
app.listen(4500, () => {
  console.log(`Escuchando desde el puerto: ${4500}`)
})


//Definir el directorio publico
app.use(express.static("./public"))


//Rutas

app.get("/", (req, resp) => {

  // resp.sendFile(__dirname + "/public/index.html")

})