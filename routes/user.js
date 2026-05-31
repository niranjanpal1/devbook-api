const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    bio: req.user.bio,
    avatar: req.user.avatar,
    isVerified: req.user.isVerified
  });
});

module.exports = router;
