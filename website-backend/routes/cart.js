const express = require('express');
const router = express.Router();

// Use shared db from app.locals
let db;
router.use((req, res, next) => {
  if (!db) db = req.app.locals.db;
  next();
});

// Get all cart items
router.get('/', (req, res) => {
  db.query('SELECT * FROM cart_items', (err, results) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Add new item to cart
router.post('/', (req, res) => {
  const { name, description, longDescription, price, quantity, image } = req.body;

  if (!name || price == null || quantity == null) {
    return res.status(400).json({ error: 'Required fields missing: name, price, quantity' });
  }

  const query = `
    INSERT INTO cart_items (name, description, longDescription, price, quantity, image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, description || '', longDescription || '', price, quantity, image || ''], (err, result) => {
    if (err) {
      console.error('Error inserting cart item:', err);
      return res.status(500).json({ error: 'Failed to save cart item' });
    }
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

// Update cart item by ID
router.put('/:id', (req, res) => {
  const { name, description, longDescription, price, quantity, image } = req.body;

  if (!name || price == null || quantity == null) {
    return res.status(400).json({ error: 'Required fields missing: name, price, quantity' });
  }

  const query = `
    UPDATE cart_items SET
      name = ?, 
      description = ?, 
      longDescription = ?, 
      price = ?, 
      quantity = ?, 
      image = ?
    WHERE id = ?
  `;

  db.query(query, [name, description || '', longDescription || '', price, quantity, image || '', req.params.id], (err, result) => {
    if (err) {
      console.error('Error updating cart item:', err);
      return res.status(500).json({ error: 'Failed to update cart item' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Cart item updated successfully' });
  });
});

// Delete cart item by ID
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM cart_items WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      console.error('Error deleting cart item:', err);
      return res.status(500).json({ error: 'Failed to delete cart item' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Cart item deleted successfully' });
  });
});

module.exports = router;
