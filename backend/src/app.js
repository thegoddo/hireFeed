const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HireFeed API is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes); // FIX: Plural 'posts' is standard convention

module.exports = app;
