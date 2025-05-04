const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Register

router.post('/register', async (req, res) => {
    try {
      const {
        name,
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
      const avatarUrl = req.body.avatarUrl;
  
      // Slaptažodžio hash'inimas
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        name,
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
      // res.status(400).json({ error: err.message });
      if (err.code === 11000 && err.keyPattern?.email) {
        return res.status(400).json({ error: 'Šis el. pašto adresas jau naudojamas.' });
      }
  
      // ⚠️ Validacijos klaidos (pvz. trūksta laukų)
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ error: messages.join(' ') });
      }
  
      // 🛑 Nenumatyta klaida
      res.status(400).json({ error: 'Įvyko nenumatyta klaida. Pabandykite dar kartą.' });
    }
  });
  


// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Naudotojas nerastas.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Neteisingas slaptažodis.' });

    const token = jwt.sign({ id: user._id }, 'secret123');

    res.json({
      message: 'Prisijungimas sėkmingas',
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (err) {
    console.error('Prisijungimo klaida:', err);
    res.status(500).json({ error: 'Įvyko serverio klaida. Bandykite vėliau.' });
  }
});
 
  
  module.exports = router;
