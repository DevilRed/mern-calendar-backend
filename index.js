const express = require("express");
require("dotenv").config(); // use .env variables. access variables using "process.env"
const { dbConnection } = require("./database/config");
const cors = require("cors");

// create express server
const app = express();

// db connection
dbConnection();

// cors middleware, it's gonna be applied to all routes
app.use(cors());

// public dir
app.use(express.static("public")); // serve static content instead of console.log

// read body request
app.use(express.json());

// routes
// all auth routes are prefixed with /api/auth path
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// listen to petitions
app.listen(process.env.PORT, () => {
  console.log("server running at port " + process.env.PORT);
});
