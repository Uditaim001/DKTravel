// testimonials.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

const filePath = path.join(__dirname, '../data/testimonials.json');
const read = () => JSON.parse(fs.readFileSync(filePath));
const write = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

router.get('/', (req, res) => res.json(read().filter(t => t.active !== false)));
router.get('/admin/all', auth, (req, res) => res.json(read()));
router.post('/', (req, res) => {
  const list = read();
  const item = { id: uuidv4(), ...req.body, active: false, createdAt: new Date().toISOString() };
  list.push(item);
  write(list);
  res.status(201).json({ message: 'Review submitted for approval', id: item.id });
});
router.put('/:id', auth, (req, res) => {
  const list = read();
  const idx = list.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  list[idx] = { ...list[idx], ...req.body };
  write(list);
  res.json(list[idx]);
});
router.delete('/:id', auth, (req, res) => {
  write(read().filter(t => t.id !== req.params.id));
  res.json({ message: 'Deleted' });
});

module.exports = router;
