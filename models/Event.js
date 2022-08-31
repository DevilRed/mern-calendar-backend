const { Schema, model } = require("mongoose");

const EventSchema = Schema({
  title: {
    type: String,
    require: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    require: true,
  },
  end: {
    type: Date,
    require: true,
  },
  // foreign key
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// export by default
module.exports = model("Event", EventSchema);
