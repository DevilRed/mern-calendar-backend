/**
 * event routes
 * host + /api/events
 */

const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field-validator");
const { isDate } = require("../helpers/isDate");

const {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const router = Router();
router.use(validateJWT);

router.get("/", getEvents);
router.post(
  "/",
  [
    check("title", "title is required").not().isEmpty(),
    // custom rules
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    fieldValidator,
  ],
  addEvent
);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
