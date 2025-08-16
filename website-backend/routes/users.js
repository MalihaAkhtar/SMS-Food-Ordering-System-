const express = require('express');
const router = express.Router();
const db = require('../db/db'); // ✅ Add this line
const { getAllUsers } = require('../controllers/userController');

router.get('/', getAllUsers);

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Insert new user
    db.query(
      'INSERT INTO users (name, email, password, uid, provider) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, 'manual_' + Date.now(), 'email'],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Insert error', error: err.message });
        res.status(200).json({ message: 'User registered successfully' });
      }
    );
  });
});

module.exports = router;
