const express = require("express");
require("dotenv").config(); // use .env variables. access variables using "process.env"

// create express server
const app = express();

// public dir
app.use(express.static("public")); // serve static content instead of console.log

// routes
/* app.get("/", (req, res) => {
  // send json response
  res.json({
    ok: true,
  });
}); */

// listen to petitions
app.listen(process.env.PORT, () => {
  console.log("server running at port " + process.env.PORT);
});
