const mongoose = require("mongoose");
require("dotenv");

function connectDB() {
  mongoose
    .connect(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/food-view`
    )
    .then(() => {
      console.log("MongoDB connected.");
    })
    .catch((err) => {
      console.error("MongodDB connection error:", err);
    });
}

module.exports = connectDB;
