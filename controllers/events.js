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
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }
    // user authorization for given event
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Not enough privileges to update the event",
      });
    }

    // destructure all data sent in request
    const newEvent = {
      ...req.body,
      user: uid, // update user id
    };

    // by default old event data is returned, with the third param we fetch updated data
    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });
    return res.status(200).json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk with the administrator",
    });
  }
};

const deleteEvent = async (req, res = response, id) => {
  // process almost identical as update
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    // event not found
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }
    // user authorization for given event
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Not enough privileges to delete the event",
      });
    }

    const deleted = await Event.findByIdAndDelete(eventId);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk with the administrator",
    });
  }
};

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
};
