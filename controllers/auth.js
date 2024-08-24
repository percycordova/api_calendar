const { response, request } = require("express")
const User = require("../models/UserModel")
const bcryptjs = require("bcryptjs")
const { generateJWT } = require("../helpers/jwt")
const createUser = async (req = request, res = response) => {
  const { email, password } = req.body
  // const user = new User(req.body)
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        msg: "El usuario ya existe",
        ok: false
      })
    }
    user = new User(req.body)

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync() // genera un codigo aleatorio
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()

    // Generar el JWT
    const token = await generateJWT(user._id, user.name)

    res.status(201).json({
      ok: true,
      uid: user._id,
      name: user.name,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Error en el servidor",
      ok: false
    })

  }

}

const loginUser = async (req, res = response) => {

  const { email, password } = req.body

  try {

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
        ok: false
      })
    }

    // Confirmar los passwords
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
        ok: false
      })
    }

    // Generar el JWT
    const token = await generateJWT(user._id, user.name)

    res.json({
      ok: true,
      uid: user._id,
      name: user.name,
      token
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Error en el servidor",
      ok: false
    })
  }
}

const renewToken = async (req, res = response) => {

  const { uid, name } = req

  // Generar el JWT
  const token = await generateJWT(uid, name)

  res.json({
    message: "Renew Token",
    ok: true,
    token,
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken
}