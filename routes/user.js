const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/users
// @desc    Register new user
router.post('/', registerUser);

// @route   POST /api/users/login  
// @desc    Login user
router.post('/login', loginUser);

// @route   GET /api/users/profile
// @desc    Get user profile
router.get('/profile', protect, getUserProfile);

module.exports = router;
