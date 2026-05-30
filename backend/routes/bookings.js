const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

const filePath = path.join(__dirname, '../data/bookings.json');
const read = () => JSON.parse(fs.readFileSync(filePath));
const write = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Public: Create booking
router.post('/', (req, res) => {
  const bookings = read();
  const booking = {
    id: uuidv4(),
    bookingRef: 'WL' + Date.now().toString().slice(-6),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  bookings.push(booking);
  write(bookings);
  res.status(201).json({ message: 'Booking submitted successfully!', bookingRef: booking.bookingRef, id: booking.id });
});

// Admin: Get all bookings
router.get('/', auth, (req, res) => {
  let bookings = read();
  const { status } = req.query;
  if (status) bookings = bookings.filter(b => b.status === status);
  res.json(bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// Admin: Update booking status
router.put('/:id', auth, (req, res) => {
  const bookings = read();
  const idx = bookings.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Booking not found' });
  bookings[idx] = { ...bookings[idx], ...req.body };
  write(bookings);
  res.json(bookings[idx]);
});

// Admin: Delete booking
router.delete('/:id', auth, (req, res) => {
  write(read().filter(b => b.id !== req.params.id));
  res.json({ message: 'Booking deleted' });
});

module.exports = router;
