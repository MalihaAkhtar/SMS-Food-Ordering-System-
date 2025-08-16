const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'food_ordering_system'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// --- AUTH ROUTES ---

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const uid = 'manual_' + Date.now();
  const provider = 'email';
  const sql = 'INSERT INTO users (name, email, password, uid, provider) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [name, email, password, uid, provider], (err) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: '✅ User registered successfully' });
  });
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length > 0) {
      res.json({ message: '✅ Sign in successful', user: results[0] });
    } else {
      res.status(401).json({ message: '❌ Invalid credentials' });
    }
  });
});

app.post('/api/auth/google', (req, res) => {
  const { name, email, uid, photo, provider } = req.body;
  const sql = 'INSERT IGNORE INTO users (name, email, uid, photo, provider) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [name, email, uid, photo, provider], (err) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: '✅ Google login success' });
  });
});

// --- SHOP / MENU ROUTES ---

app.get("/api/shops", (req, res) => {
  const area = req.query.area;
  const query = "SELECT * FROM shops WHERE area LIKE ?";
  db.query(query, [`%${area}%`], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/api/foods', (req, res) => {
  const search = req.query.query;
  if (!search) return res.status(400).json({ error: "Search query is required" });

  const searchTerm = `%${search.toLowerCase()}%`;
  const sql = `
    SELECT * FROM foods 
    WHERE LOWER(name) LIKE ? OR 
          LOWER(description) LIKE ? OR 
          LOWER(category) LIKE ?
  `;
  db.query(sql, [searchTerm, searchTerm, searchTerm], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
});

// --- CART ROUTES ---

//--- CART ROUTES ---

// Get all cart items
app.get('/api/cart', (req, res) => {
  const query = 'SELECT * FROM cart';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Add new item to cart
app.post('/api/cart', (req, res) => {
  let { name, description, longDescription, price, quantity, image } = req.body;

  if (!name || price == null || quantity == null) {
    return res.status(400).json({ error: 'Required fields missing: name, price, quantity' });
  }

  if (typeof price === 'string') {
    price = price.replace(/[^0-9.]/g, '');
  }

  price = parseFloat(price);

  if (isNaN(price)) {
    return res.status(400).json({ error: 'Price must be a valid number' });
  }

  const query = `
    INSERT INTO cart (name, description, longDescription, price, quantity, image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, description || '', longDescription || '', price, quantity, image || ''], (err, result) => {
    if (err) {
      console.error('Error inserting cart item:', err.sqlMessage || err.message || err);
      return res.status(500).json({ error: 'Failed to save cart item' });
    }

    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

// Update cart item by ID
app.put('/api/cart/:id', (req, res) => {
  const { name, description, longDescription, price, quantity, image } = req.body;
  const id = req.params.id;

  if (!name || price == null || quantity == null) {
    return res.status(400).json({ error: 'Required fields missing: name, price, quantity' });
  }

  const query = `
    UPDATE cart SET
      name = ?, 
      description = ?, 
      longDescription = ?, 
      price = ?, 
      quantity = ?, 
      image = ?
    WHERE id = ?
  `;

  db.query(query, [name, description || '', longDescription || '', price, quantity, image || '', id], (err, result) => {
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
app.delete('/api/cart/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM cart WHERE id = ?';
  db.query(query, [id], (err, result) => {
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
// --- ORDER ROUTES ---
app.get('/api/order-status/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  console.log('Fetching status for orderId:', orderId);

  const sql = `
    SELECT status, updated_at 
    FROM order_tracking 
    WHERE order_id = ?
    ORDER BY updated_at ASC
  `;

  db.query(sql, [orderId], (err, results) => {
    if (err) {
      console.error('Error fetching order status:', err);
      return res.status(500).json({ message: 'Failed to fetch order status' });
    }
    console.log('Results:', results);
    if (results.length === 0) {
      // Instead of 404, send empty array for now to avoid frontend error
      return res.json([]);
    }
    res.json(results);
  });
});

app.post('/place-order', (req, res) => {
  const { title, price, description, image } = req.body;
  const sql = `INSERT INTO orders (title, price, description, image) VALUES (?, ?, ?, ?)`;

  db.query(sql, [title, price, description, image], (err) => {
    if (err) return res.status(500).json({ message: "Failed to place order" });
    res.status(200).json({ message: "Order placed successfully" });
  });
});

app.post('/api/orders', (req, res) => {
  const {
    user_id, user_name, user_email, country, address,
    product_title, product_price, product_quantity,
    product_description, product_image,
    payment_method, payment_status
  } = req.body;

  const sql = `
    INSERT INTO orders (
      user_id, user_name, user_email, country, address,
      product_title, product_price, product_quantity,
      product_description, product_image,
      payment_method, payment_status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(sql, [
    user_id, user_name, user_email, country, address,
    product_title, parseFloat(product_price), product_quantity,
    product_description, product_image,
    payment_method, payment_status
  ], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to place order.' });

    const newOrderId = result.insertId;

    const insertTracking = "INSERT INTO order_tracking (order_id, status, updated_at) VALUES (?, 'Pending', NOW())";
    db.query(insertTracking, [newOrderId], (err2) => {
      if (err2) console.error("⚠️ Failed to insert tracking info:", err2);
    });

    res.status(200).json({ message: '✅ Order placed successfully!', orderId: newOrderId });
  });
});

app.get('/api/orders/:userId', (req, res) => {
  const userId = req.params.userId;

  const sql = 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch user orders' });
    if (results.length === 0) return res.status(404).json({ message: 'No orders found for this user' });
    res.json(results);
  });
});

app.get('/api/user-orders-tracking/:userId', (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT o.id AS order_id, o.product_title, t.status, t.updated_at
    FROM orders o
    LEFT JOIN order_tracking t ON o.id = t.order_id
    WHERE o.user_id = ?
    ORDER BY t.updated_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch tracking info' });
    if (results.length === 0) return res.status(404).json({ message: 'No tracking info found' });
    res.json(results);
  });
});

app.post('/api/checkout', (req, res) => {
  const {
    userName, userEmail, country, address,
    productTitle, productPrice, productQuantity,
    productDescription, productImage,
    paymentMethod, paymentStatus
  } = req.body;

  const sql = `
    INSERT INTO orders (
      user_name, user_email, country, address,
      product_title, product_price, product_quantity,
      product_description, product_image,
      payment_method, payment_status, created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(sql, [
    userName, userEmail, country, address,
    productTitle, productPrice, productQuantity,
    productDescription, productImage,
    paymentMethod, paymentStatus
  ], (err) => {
    if (err) return res.status(500).send("Failed to complete checkout.");
    res.status(200).send("Checkout successful.");
  });
});

// --- REVIEWS ---

app.get('/api/reviews', (req, res) => {
  const sql = `
    SELECT 
      r.id, 
      r.name, 
      r.rating, 
      r.comment, 
      r.date, 
      r.reply, 
      r.status,
      o.id AS orderId
    FROM reviews r
    LEFT JOIN orders o ON r.order_id = o.id
    ORDER BY r.date DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/api/reviews', (req, res) => {
  const { name, rating, comment } = req.body;
  if (!name || !rating || !comment) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  db.query(
    'INSERT INTO reviews (name, rating, comment) VALUES (?, ?, ?)',
    [name, rating, comment],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      db.query('SELECT * FROM reviews WHERE id = ?', [result.insertId], (err2, newReview) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json(newReview[0]);
      });
    }
  );
});

// --- Start Server ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
