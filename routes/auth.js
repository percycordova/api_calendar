/*

Rutas de Usuarios / Auth
host + /api/auth

*/

const { Router } = require("express")
const { createUser, loginUser, renewToken } = require("../controllers/auth")
const router = Router()
const { check } = require("express-validator")
const { validateFields } = require("../middlewares/validate-fields")

router.post("/", [
  check("email", "El email es obligatorio").isEmail(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  check("password", "El password debe ser minimo de 6 caracteres").isLength({ min: 6 }),
  validateFields
], loginUser)

router.get("/renew-token", renewToken)

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6
    }),
    validateFields
  ],
  createUser
)

module.exports = router
