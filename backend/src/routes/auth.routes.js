const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Auth Routes
router.post("/user/register", authController.registerUser); // Added this
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);

module.exports = router;