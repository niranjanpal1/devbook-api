const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - JSON parse korar jonno MUST
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Securely ✅'))
  .catch((err) => console.log('MongoDB Connection Error ❌', err));

// Routes - Ei line tai main
app.use('/api/auth', require('./routes/auth'));

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);  // <-- EKHANE 's' LAGBE

// POST ROUTES ADD KORLAM 👇
const postRoutes = require('./routes/post');
app.use('/api/posts', postRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('K-API Server Chalu Ache 🔥');
});

app.listen(PORT, () => {
  console.log(`Server cholche port ${PORT} a`);
});
