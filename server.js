const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Securely ✅'))
  .catch((err) => console.log('MongoDB Connection Error ❌', err));

// Test Route
app.get('/', (req, res) => {
  res.send('K-API Server Chalu Ache 🔥');
});

app.listen(PORT, () => {
  console.log(`Server cholche port ${PORT} a`);
});
