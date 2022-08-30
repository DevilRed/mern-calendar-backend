/* {
	ok: true,
	msg: 'controller action name'
} */
const { response } = require("express");

const getEvents = async (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "getEvents",
  });
};

const addEvent = async (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "addEvent",
  });
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
