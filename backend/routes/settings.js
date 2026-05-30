// settings.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const filePath = path.join(__dirname, '../data/settings.json');
const read = () => JSON.parse(fs.readFileSync(filePath));
const write = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

router.get('/', (req, res) => res.json(read()));
router.put('/', auth, (req, res) => {
  const settings = { ...read(), ...req.body };
  write(settings);
  res.json(settings);
});

module.exports = router;
