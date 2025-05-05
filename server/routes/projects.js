const express = require('express');
const router = express.Router();
const Project = require('../models/Project');




// GET all projects
router.get('/', async (req, res) => {
  try {
    const filter = req.query.category;
    const projects = filter && filter !== 'all'
      ? await Project.find({ category: filter })
      : await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Klaida gaunant projektus' });
  }
});

// POST new project
router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: 'Nepavyko sukurti projekto' });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Nepavyko atnaujinti' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ištrinta' });
  } catch (err) {
    res.status(500).json({ error: 'Klaida tryniant' });
  }
});

module.exports = router;
