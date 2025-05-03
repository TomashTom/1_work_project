const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload');

// Register
// POST /api/auth/register su failo įkėlimu
router.post('/register', upload.single('avatar'), async (req, res) => {
    try {
      const {
        nickname,
        email,
        password,
        phone,
        dateOfBirth
      } = req.body;
  
      // Adreso laukus suskaldom į atskirus objektus
      const address = {
        street: req.body['address.street'],
        city: req.body['address.city'],
        zip: req.body['address.zip'],
        country: req.body['address.country']
      };
  
      // Jei buvo pridėta nuotrauka – saugom jos kelią
      const avatarUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
  
      // Slaptažodžio hash'inimas
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        nickname,
        email,
        password: hashedPassword,
        phone,
        address,
        dateOfBirth,
        avatarUrl
      });
  
      await user.save();
      res.status(201).json({ message: 'Registracija sėkminga' });
    } catch (err) {
      console.error('Registracijos klaida:', err);
      res.status(400).json({ error: err.message });
    }
  });
  

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Naudotojas nerastas' });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Neteisingas slaptažodis' });
  
    const token = jwt.sign({ id: user._id }, 'secret123');
  
    res.json({
      message: 'Prisijungimas sėkmingas',
      token,
      user: {
        nickname: user.nickname,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  });
  
  module.exports = router;
