const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

const filePath = path.join(__dirname, '../data/cab_requests.json');
const read = () => JSON.parse(fs.readFileSync(filePath));
const write = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Ensure file exists
if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');

// Public: Submit cab request
router.post('/', (req, res) => {
  const requests = read();
  const request = {
    id: uuidv4(),
    refNo: 'CB' + Date.now().toString().slice(-6),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  requests.push(request);
  write(requests);
  res.status(201).json({
    message: 'Cab booking request submitted! Our team will call you within 1 hour.',
    refNo: request.refNo
  });
});

// Admin: Get all cab requests
router.get('/', auth, (req, res) => {
  res.json(read().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// Admin: Update status
router.put('/:id', auth, (req, res) => {
  const requests = read();
  const idx = requests.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Request not found' });
  requests[idx] = { ...requests[idx], ...req.body };
  write(requests);
  res.json(requests[idx]);
});

// Admin: Delete
router.delete('/:id', auth, (req, res) => {
  write(read().filter(r => r.id !== req.params.id));
  res.json({ message: 'Deleted' });
});

module.exports = router;
