const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db online");
  } catch (error) {
    console.log(error);
    throw new Error("Error on db connection");
  }
};

module.exports = {
  dbConnection,
};
