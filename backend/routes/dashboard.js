const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const read = (file) => JSON.parse(fs.readFileSync(path.join(__dirname, `../data/${file}`)));

router.get('/stats', auth, (req, res) => {
  const tours = read('tours.json');
  const packages = read('packages.json');
  const bookings = read('bookings.json');
  const hotelReqs = read('hotel_requests.json');
  const flightReqs = read('flight_requests.json');
  const cabReqs = fs.existsSync(path.join(__dirname, '../data/cab_requests.json'))
    ? read('cab_requests.json') : [];

  const today = new Date().toDateString();
  const todayBookings = bookings.filter(b => new Date(b.createdAt).toDateString() === today);

  const revenue = bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + (parseFloat(b.totalAmount) || 0), 0);

  const recentActivity = [
    ...bookings.map(b => ({ type: 'booking', ref: b.bookingRef, name: b.customerName, date: b.createdAt, status: b.status })),
    ...hotelReqs.map(h => ({ type: 'hotel', ref: h.refNo, name: h.name, date: h.createdAt, status: h.status })),
    ...flightReqs.map(f => ({ type: 'flight', ref: f.refNo, name: f.name, date: f.createdAt, status: f.status })),
    ...cabReqs.map(c => ({ type: 'cab', ref: c.refNo, name: c.name, date: c.createdAt, status: c.status }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  res.json({
    totalTours: tours.length,
    activeTours: tours.filter(t => t.active).length,
    totalPackages: packages.length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    todayBookings: todayBookings.length,
    totalRevenue: revenue,
    hotelRequests: hotelReqs.length,
    pendingHotelRequests: hotelReqs.filter(h => h.status === 'pending').length,
    flightRequests: flightReqs.length,
    pendingFlightRequests: flightReqs.filter(f => f.status === 'pending').length,
    cabRequests: cabReqs.length,
    pendingCabRequests: cabReqs.filter(c => c.status === 'pending').length,
    recentActivity
  });
});

module.exports = router;
