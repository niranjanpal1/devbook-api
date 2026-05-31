const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendOTP = require('../utils/sendEmail');

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Ei email diye user already ache' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);
  
  const user = await User.create({
    name, email, password,
    otp: hashedOtp,
    otpExpire: Date.now() + 10 * 60 * 1000,
    isVerified: false
  });

  if (user) {
    await sendOTP(user.email, otp, user.name);
    res.status(201).json({ 
      message: 'OTP sent to email. Please verify.',
      email: user.email 
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  
  const user = await User.findOne({ 
    email,
    otpExpire: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: 'OTP expired or invalid email' });

  const isOtpValid = await bcrypt.compare(otp, user.otp);
  if (!isOtpValid) return res.status(400).json({ message: 'Invalid OTP' });

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpire = undefined;
  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
    token: generateToken(user._id)
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email first' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

module.exports = router;
