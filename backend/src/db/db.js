const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/hirefeed`)
    .then(() => {
      console.log("MongoDB connected.");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}

module.exports = connectDB;
