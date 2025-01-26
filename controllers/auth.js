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
    const token = await generateJWT(user._id, user.name, email)

    res.status(201).json({
      ok: true,
      uid: user._id,
      name: user.name,
      email: user.email,
      dni: user.dni,
      lastName: user.lastName,
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
    const token = await generateJWT(user._id, user.name, user.email)

    res.json({
      ok: true,
      uid: user._id,
      name: user.name,
      email: user.email,
      dni: user.dni,
      lastName: user.lastName,
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

  const { uid, name, email } = req
  try {
    // Generar el JWT
    const token = await generateJWT(uid, name, email)
    const user = await User.findOne({ email })
    res.json({
      message: "Renew Token",
      ok: true,
      token,
      uid,
      name,
      email,
      dni: user.dni,
      lastName: user.lastName
    })

  } catch (e) {
    console.log(e)
    res.status(500).json({
      msg: "Error en el servidor",
      ok: false
    })
  }

}

module.exports = {
  createUser,
  loginUser,
  renewToken
}