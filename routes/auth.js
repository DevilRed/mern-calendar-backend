/**
 * auth routes
 * host + /api/auth
 */

const { Router } = require("express");
const { createUser } = require("../controllers/auth");
const router = Router();

router.post("/new", createUser);

module.exports = router; // node export system
