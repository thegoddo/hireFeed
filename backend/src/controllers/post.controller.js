const Post = require("../models/post.model");
const { uploadFile } = require("../services/storage.service"); // Import your storage service

// Get Feed
exports.getFeed = async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};
    if (role && role !== "All") query.jobRole = role;

    const posts = await Post.find(query).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create Post (Uploads to ImageKit)
exports.createPost = async (req, res) => {
  try {
    // 1. Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: "No video file provided" });
    }

    // 2. Upload to ImageKit
    // req.file.buffer contains the binary data of the video
    const uploadResult = await uploadFile(
      req.file.buffer,
      req.file.originalname
    );

    // 3. Create Post in Database
    const newPost = new Post({
      userId: req.user._id, // From auth middleware
      username: req.user.username,
      userEmail: req.user.email,
      videoUrl: uploadResult.url, // URL from ImageKit
      description: req.body.description,
      jobRole: req.body.jobRole,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Upload Error:", err);
    res
      .status(500)
      .json({ message: "Failed to upload post", error: err.message });
  }
};

// Toggle Like
exports.toggleLike = async (req, res) => {
  try {
    const currentUserId = req.user._id.toString(); // Convert to String
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user has already liked the post
    // We use .some() and .toString() to ensure accurate comparison
    const isLiked = post.likes.some((id) => id.toString() === currentUserId);

    if (isLiked) {
      // UNLIKE: Remove user from array
      await post.updateOne({ $pull: { likes: req.user._id } });
      res.status(200).json("The post has been unliked");
    } else {
      // LIKE: Add user to array
      await post.updateOne({ $addToSet: { likes: req.user._id } });
      res.status(200).json("The post has been liked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
