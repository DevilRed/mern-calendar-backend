const express = require("express");
require("dotenv").config(); // use .env variables. access variables using "process.env"
const { dbConnection } = require("./database/config");

// create express server
const app = express();

// db connection
dbConnection();

// public dir
app.use(express.static("public")); // serve static content instead of console.log

// read body request
app.use(express.json());

// routes
// all auth routes are prefixed with /api/auth path
app.use("/api/auth", require("./routes/auth"));
//TODO: CRUD events

// listen to petitions
app.listen(process.env.PORT, () => {
  console.log("server running at port " + process.env.PORT);
});
