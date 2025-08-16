const db = require('../db/db');

const getAllProducts = (req, res) => {
  db.query('SELECT * FROM menu_items', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = { getAllProducts };