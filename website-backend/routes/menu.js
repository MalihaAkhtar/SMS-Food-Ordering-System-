const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Your MySQL db connection

// Get all menu items
router.get('/', (req, res) => {
  db.query('SELECT * FROM menu_items', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add a menu item (optional)
router.post('/', (req, res) => {
  const { title, description, longDescription, price, image } = req.body;
  const query = `INSERT INTO menu_items (title, description, longDescription, price, image) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [title, description, longDescription, price, image], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

module.exports = router;
