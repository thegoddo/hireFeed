const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const cors = require("cors");

const app = express();

// 🔹 CORS FIX: Explicitly allow both Localhost and Vercel
app.use(
  cors({
    origin: [
      "http://localhost:5173",              // Local Development
      "https://hire-feed.vercel.app",       // Your Vercel URL (No trailing slash)
      process.env.FRONTEND                  // Fallback for env variable
    ].filter(Boolean),                      // Removes empty values if env is missing
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HireFeed API is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;