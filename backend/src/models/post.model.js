const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true }, // Store specifically for display
  userEmail: { type: String, required: true }, // Needed for "Hire Me" button
  videoUrl: { type: String, required: true },
  description: { type: String },
  jobRole: { 
    type: String, 
    required: true,
    enum: ["Developer", "Designer", "Product Manager", "Marketing", "Other"] 
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs
  saves: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);