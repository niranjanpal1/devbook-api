const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // auth middleware er naam check kor

// @desc    Create post
// @route   POST /api/posts
router.post('/', protect, async (req, res) => {
  res.json({ message: "Post route working", user: req.user.id, text: req.body.text });
});

// @desc    Get all posts
// @route   GET /api/posts
router.get('/', async (req, res) => {
  res.json([]);
});

module.exports = router;
