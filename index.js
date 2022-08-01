const express = require("express");

// create express server
const app = express();

// routes
app.get("/", (req, res) => {
  // send json response
  res.json({
    ok: true,
  });
});

// listen to petitions
app.listen(4000, () => {
  console.log("server running at port " + 4000);
});
