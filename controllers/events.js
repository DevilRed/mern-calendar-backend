/* {
	ok: true,
	msg: 'controller action name'
} */
const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  // get events along user
  const events = await Event.find().populate("user", "name");
  res.status(200).json({
    ok: true,
    events,
  });
};

const addEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid; // get user id from request
    const dbEvent = await event.save();
    res.status(200).json({
      ok: true,
      event: dbEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk with the administrator",
    });
  }
};

const updateEvent = async (req, res = response, id) => {
  res.status(200).json({
    ok: true,
    msg: "updateEvent",
  });
};

const deleteEvent = async (req, res = response, id) => {
  res.status(200).json({
    ok: true,
    msg: "deleteEvent",
  });
};

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
};
