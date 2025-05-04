const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact – išsaugoti kontaktą
router.post('/', async (req, res) => {
  const { name, email, phone, type, message } = req.body;

  try {
    const newContact = await Contact.create({ name, email, phone, type, message });
    res.status(201).json({ message: 'Žinutė išsaugota', contact: newContact });
  } catch (error) {
    console.error('Klaida saugant kontaktą:', error);
    res.status(500).json({ error: 'Nepavyko išsaugoti žinutės' });
  }
});

// Gauti visas paraiškas
router.get('/', async (req, res) => {
    try {
      const submissions = await Contact.find().sort({ createdAt: -1 });
      res.json(submissions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Nepavyko gauti paraiškų' });
    }
  });

 
// Ištrinti paraišką
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ištrinta' });
  } catch (err) {
    res.status(500).json({ error: 'Klaida tryniant' });
  }
});

// Atnaujinti paraiškos būseną
router.put('/:id', async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko atnaujinti būsenos' });
  }
});
module.exports = router;
