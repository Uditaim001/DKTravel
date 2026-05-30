const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

const filePath = path.join(__dirname, '../data/tours.json');
const read = () => JSON.parse(fs.readFileSync(filePath));
const write = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Public: Get all active tours
router.get('/', (req, res) => {
  let tours = read().filter(t => t.active !== false);
  const { category, featured, search } = req.query;
  if (category && category !== 'All') tours = tours.filter(t => t.category === category);
  if (featured === 'true') tours = tours.filter(t => t.featured);
  if (search) tours = tours.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.destination.toLowerCase().includes(search.toLowerCase()));
  res.json(tours);
});

// Public: Get single tour
router.get('/:id', (req, res) => {
  const tour = read().find(t => t.id === req.params.id);
  if (!tour) return res.status(404).json({ error: 'Tour not found' });
  res.json(tour);
});

// Admin: Get all tours (including inactive)
router.get('/admin/all', auth, (req, res) => res.json(read()));

// Admin: Create tour
router.post('/', auth, (req, res) => {
  const tours = read();
  const tour = { id: uuidv4(), ...req.body, active: true, createdAt: new Date().toISOString() };
  tours.push(tour);
  write(tours);
  res.status(201).json(tour);
});

// Admin: Update tour
router.put('/:id', auth, (req, res) => {
  const tours = read();
  const idx = tours.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Tour not found' });
  tours[idx] = { ...tours[idx], ...req.body, id: req.params.id };
  write(tours);
  res.json(tours[idx]);
});

// Admin: Delete tour
router.delete('/:id', auth, (req, res) => {
  const tours = read().filter(t => t.id !== req.params.id);
  write(tours);
  res.json({ message: 'Tour deleted' });
});

module.exports = router;
