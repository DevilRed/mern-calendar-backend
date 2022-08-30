/**
 * event routes
 * host + /api/events
 */

const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");

const {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const router = Router();

router.get("/", validateJWT, getEvents);
router.post("/", validateJWT, addEvent);
router.put("/:id", validateJWT, updateEvent);
router.delete("/:id", validateJWT, deleteEvent);

module.exports = router;
