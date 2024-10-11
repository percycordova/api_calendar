/*

Rutas de eventos del calendario / Calendar Events
host + /api/calendar-events

*/

const { Router } = require("express")
const { validateJWT } = require("../middlewares/validate-jwt")
const { getCalendarEvents, createCalendarEvent, updateCalendarEvent, deleteCalendarEvent } = require("../controllers/calendarEventsController")
const { check } = require("express-validator")
const { validateFields } = require("../middlewares/validate-fields")
const { isDate } = require("../helpers/isDate")
const router = Router()

// Validar que todas las peticiones vengan con el token
router.use(validateJWT)

router.get("/", getCalendarEvents)
router.post("/", [
  check("title", "El titulo es obligatorio").trim().not().isEmpty(),
  check("start", "La fecha de inicio es obligatoria").custom(isDate),
  check("end", "La fecha de finalizacion es obligatoria").custom(isDate),
  validateFields
], createCalendarEvent)
router.put("/:id", updateCalendarEvent)
router.delete("/:id", deleteCalendarEvent)




module.exports = router