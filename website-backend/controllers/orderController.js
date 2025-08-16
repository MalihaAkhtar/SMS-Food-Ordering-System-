const db = require('../db/db');

const createOrder = (req, res) => {
  const { user_id, total_price } = req.body;
  db.query('INSERT INTO orders (user_id, total_price) VALUES (?, ?)', [user_id, total_price], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ orderId: result.insertId });
  });
};

const getAllOrders = (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = { createOrder, getAllOrders };