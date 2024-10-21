const { response, request } = require("express")
const EventCalendar = require("../models/CalendarEvents")

const createCalendarEvent = async (req = request, res = response) => {
  // verificar que tenga el evento
  const { title, start, end, notes } = req.body
  const event = new EventCalendar({ title, start, end, notes, user: req.uid })
  try {
    const eventSave = await event.save()
    res.json({
      ok: true,
      event: eventSave
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    })
  }

}

const updateCalendarEvent = async (req = request, res = response) => {
  const eventId = req.params.id

  try {

    const event = await EventCalendar.findById(eventId)

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el evento"
      })
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "No autorizado"
      })
    }

    const newEvent = {
      ...req.body,
      user: req.uid
    }

    const eventUpdate = await EventCalendar.findByIdAndUpdate(eventId, newEvent, { new: true })

    return res.json({
      ok: true,
      message: "Evento actualizado",
      event: eventUpdate
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    })
  }


}

const getCalendarEvents = async (req = request, res = response) => {
  //  Me trae los eventos con el campo nombre que viene de la tabla usuario 
  // const events = await EventCalendar.find().populate("user","name")
  const events = await EventCalendar.find().populate("user", "name")
  res.json({
    ok: true,
    events
  })
}

const deleteCalendarEvent = async (req = request, res = response) => {

  const eventId = req.params.id
  try {

    const event = await EventCalendar.findById(eventId)

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el evento"
      })
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "No autorizado"
      })
    }

    await EventCalendar.findByIdAndDelete(eventId)

    res.json({
      ok: true,
      msg: "Evento eliminado"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    })
  }

}



module.exports = {
  createCalendarEvent,
  getCalendarEvents,
  updateCalendarEvent,
  deleteCalendarEvent
}