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
router.use(validateJWT);

router.get("/", getEvents);
router.post("/", addEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
