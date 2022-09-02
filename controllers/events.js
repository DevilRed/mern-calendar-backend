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

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    // event not found
    if (!event) {
      res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }
    // user authorization for given event
    if (event.user.toString() !== uid) {
      res.status(401).json({
        ok: false,
        msg: "Not enough privileges to update the event",
      });
    }

    // desctructure all data sent in request
    const newEvent = {
      ...req.body,
      user: uid, // update user id
    };

    // by default old event data is returned, with the third param we fetch updated data
    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });
    res.status(200).json({
      ok: false,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk with the administrator",
    });
  }
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
