const { response, request } = require("express")

const createUser = (req = request, res = response) => {
  const { name, email, password } = req.body
  res.status(201).json({
    message: "Registro exitoso",
    ok: true,
    user: {
      name,
      email,
      password
    }
  })
}

const loginUser = (req, res = response) => {
  res.json({
    message: "Login",
    ok: true
  })
}

const renewToken = (req, res = response) => {
  res.json({
    message: "Renew Token",
    ok: true
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken
}