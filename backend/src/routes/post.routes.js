const router = require("express").Router();
const {
  getFeed,
  createPost,
  toggleLike,
} = require("../controllers/post.controller");
const { authUserMiddleware } = require("../middlewares/auth.middleware");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit to 50MB
});

// Public route (Feed can be seen by anyone, or restrict if you want)
router.get("/feed", getFeed);

// Protected routes (Must be logged in)
router.post("/", authUserMiddleware, upload.single("video"), createPost);
router.put("/:id/like", authUserMiddleware, toggleLike);

module.exports = router;
