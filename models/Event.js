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
    type: Date, // Date is a JS date
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  // foreign key
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// overwrite how mongoose serialize data when returning data from database
EventSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

// export by default
module.exports = model("Event", EventSchema);
