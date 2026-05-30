const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'wanderlust_secret_2024';
const filePath = path.join(__dirname, '../data/admin.json');
const read = () => JSON.parse(fs.readFileSync(filePath));
const write = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const admins = read();
  const admin = admins.find(a => a.username === username);
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: admin.id, username: admin.username, name: admin.name }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, admin: { id: admin.id, username: admin.username, name: admin.name, email: admin.email } });
});

router.post('/change-password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const admins = read();
  const idx = admins.findIndex(a => a.id === req.admin.id);
  if (idx === -1) return res.status(404).json({ error: 'Admin not found' });
  const valid = await bcrypt.compare(currentPassword, admins[idx].password);
  if (!valid) return res.status(400).json({ error: 'Current password is incorrect' });
  admins[idx].password = await bcrypt.hash(newPassword, 10);
  write(admins);
  res.json({ message: 'Password changed successfully' });
});

router.get('/me', auth, (req, res) => {
  const admin = read().find(a => a.id === req.admin.id);
  if (!admin) return res.status(404).json({ error: 'Not found' });
  const { password, ...safeAdmin } = admin;
  res.json(safeAdmin);
});

module.exports = router;
