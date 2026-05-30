require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(helmet());
app.use(cors({ origin: ['https://akashpal.online', 'http://localhost:3000'] }));
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

let users = [];
let posts = [];
const JWT_SECRET = process.env.JWT_SECRET || 'niranjan_akashpal_secret';

app.get('/', (req, res) => res.json({ msg: 'DevBook API Running' }));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, username, password: hashed });
  res.json({ msg: 'User created' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user ||!await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ msg: 'Wrong login' });
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({ token });
});

app.get('/posts', (req, res) => res.json(posts));

app.post('/posts', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const newPost = { id: posts.length + 1, userId: decoded.id, text: req.body.text };
    posts.push(newPost);
    res.json(newPost);
  } catch { res.status(401).json({ msg: 'Invalid token' }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`DevBook Backend Chalu at ${PORT}`));
