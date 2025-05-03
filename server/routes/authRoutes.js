const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Užkoduojam slaptažodį prieš saugodami
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      
      res.status(201).json({ message: 'Registracija sėkminga' });
    } catch (err) {
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
      user: { name: user.name, email: user.email } // <-- pridėta
    });
  });
  

module.exports = router;
