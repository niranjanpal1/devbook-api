const mongoose = require('mongoose');
const { hashPassword, matchPassword } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name dao bhai'],
  },
  email: {
    type: String,
    required: [true, 'Email dao bhai'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password dao bhai'],
    minlength: 6,
  },
  bio: {
    type: String,
    default: 'Hey, I am using DevBook!',
  },
  avatar: {
    type: String,
    default: 'https://i.imgur.com/6VBx3io.png',
  },
}, { timestamps: true });

// Save howar age password hash korbe
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await hashPassword(this.password);
});

// Login er somoy password match korar method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await matchPassword(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
