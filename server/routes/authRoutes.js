const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const SECRET = 'slaptaZodis'; // Vėliau – .env faile

// Registracija
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'Registracija sėkminga' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Prisijungimas
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Neteisingi duomenys' });
  }
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
  res.json({ token, name: user.name });
});

module.exports = router;
