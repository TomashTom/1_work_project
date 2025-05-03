const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE
router.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ klaida: err.message });
  }
});

// READ
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ klaida: err.message });
  }
});

// UPDATE
router.put('/users/:id', async (req, res) => {
  const { password } = req.body;

  if (password !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Neteisingas slaptažodis' });
  }
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ klaida: err.message });
  }
});

require('dotenv').config(); 

// Pvz. DELETE su slaptažodžio patikra
router.delete('/users/:id', async (req, res) => {
  const { password } = req.body;

  if (password !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Neteisingas slaptažodis' });
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vartotojas ištrintas' });
  } catch (err) {
    res.status(500).json({ error: 'Trinimo klaida' });
  }
});


module.exports = router;
