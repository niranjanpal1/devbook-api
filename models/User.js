const mongoose = require('mongoose');
const { hashPassword, matchPassword } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name dao bhai'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email dao bhai'], 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    required: [true, 'Password dao bhai'], 
    minlength: 6 
  },
  bio: { 
    type: String, 
    default: 'Hey, I am using DevBook!' 
  },
  avatar: { 
    type: String, 
    default: 'https://i.imgur.com/6VBx3io.png' 
  },
}, { timestamps: true });

// Save howar age password hash korbe - MONGOOSE 7/8 FIX
userSchema.pre('save', async function () {
  // Password modify na hole skip koro
  if (!this.isModified('password')) {
    return; // next() lagbe na
  }

  try {
    this.password = await hashPassword(this.password);
    // next(); <-- EITA TULE DILAM. Async function a lage na
  } catch (err) {
    throw err; // next(err) er bodole throw kor
  }
});

// Password compare korar method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await matchPassword(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
