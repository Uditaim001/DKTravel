const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

const filePath = path.join(__dirname, '../data/packages.json');
const read = () => JSON.parse(fs.readFileSync(filePath));
const write = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

router.get('/', (req, res) => res.json(read().filter(p => p.active !== false)));
router.get('/admin/all', auth, (req, res) => res.json(read()));
router.get('/:id', (req, res) => {
  const pkg = read().find(p => p.id === req.params.id);
  if (!pkg) return res.status(404).json({ error: 'Package not found' });
  res.json(pkg);
});
router.post('/', auth, (req, res) => {
  const packages = read();
  const pkg = { id: uuidv4(), ...req.body, active: true, createdAt: new Date().toISOString() };
  packages.push(pkg);
  write(packages);
  res.status(201).json(pkg);
});
router.put('/:id', auth, (req, res) => {
  const packages = read();
  const idx = packages.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Package not found' });
  packages[idx] = { ...packages[idx], ...req.body, id: req.params.id };
  write(packages);
  res.json(packages[idx]);
});
router.delete('/:id', auth, (req, res) => {
  write(read().filter(p => p.id !== req.params.id));
  res.json({ message: 'Package deleted' });
});

module.exports = router;
