const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g. 1623741234-123.png
  }
});

const upload = multer({ storage });
const app = express();
app.use(cors());
app.use(bodyParser.json());

// 📂 Static folder for serving images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'food_ordering_system'
});

db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL database!');
});

/* ------------------- ORDERS ------------------- */

// GET all orders
app.get("/api/admin/orders", (req, res) => {
  const sql = `
    SELECT 
      id, 
      user_name AS customer, 
      user_email AS email,
      country,
      address,
      product_title AS product,
      product_price AS price,
      product_quantity AS quantity,
      product_description AS description,
      product_image AS image,
      payment_method,
      tracking_status AS status,
      created_at AS date
    FROM orders
    ORDER BY id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// UPDATE order by id
app.put('/api/admin/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const { product_quantity, product_price, status } = req.body;

  const query = `
    UPDATE orders
    SET product_quantity = ?, product_price = ?, tracking_status = ?
    WHERE id = ?
  `;

  db.query(query, [product_quantity, product_price, status, orderId], (err) => {
    if (err) {
      console.error('❌ Error updating order:', err);
      return res.status(500).json({ message: 'Update failed' });
    }
    res.json({ message: 'Order updated successfully' });
  });
});

// DELETE order by id
app.delete('/api/admin/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const sql = `DELETE FROM orders WHERE id = ?`;

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error('❌ Error deleting order:', err);
      return res.status(500).json({ message: 'Delete failed' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  });
});

/* ----------- PRODUCTS ----------- */

// GET all products with category included
app.get('/api/products', (req, res) => {
  const sql = 'SELECT id, name, category, description, longDescription, price, image, status FROM products ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const updatedResults = results.map(product => {
      if (!product.image) return { ...product, image: null };

      if (product.image.startsWith('http://') || product.image.startsWith('https://')) {
        return { ...product };
      }

      return {
        ...product,
        image: `http://localhost:5001/uploads/${product.image}`
      };
    });

    res.json(updatedResults);
  });
});

// POST add new product with category
app.post('/api/products', (req, res) => {
  const { name, category, description, longDescription, price, image, status } = req.body;

  let imageToSave = image;
  if (image && !(image.startsWith('http://') || image.startsWith('https://'))) {
    // Extract filename if only filename or local path is sent
    imageToSave = image.split('/').pop();
  }

  const sql = 'INSERT INTO products (name, category, description, longDescription, price, image, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, category, description, longDescription, price, imageToSave, status || 'Available'], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      id: result.insertId,
      name,
      category,
      description,
      longDescription,
      price,
      image: imageToSave.startsWith('http') ? imageToSave : `http://localhost:5001/uploads/${imageToSave}`,
      status: status || 'Available'
    });
  });
});

// PUT update product with category
app.put('/api/products/:id', (req, res) => {
  const { name, category, description, longDescription, price, image, status } = req.body;
  const productId = req.params.id;

  let imageToSave = image;
  if (image && !(image.startsWith('http://') || image.startsWith('https://'))) {
    imageToSave = image.split('/').pop();
  }

  const sql = `
    UPDATE products
    SET name = ?, category = ?, description = ?, longDescription = ?, price = ?, image = COALESCE(?, image), status = ?
    WHERE id = ?
  `;

  db.query(sql, [name, category, description, longDescription, price, imageToSave, status, productId], (err) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ error: err.message });
    }

    // Return updated product
    const selectSql = 'SELECT * FROM products WHERE id = ?';
    db.query(selectSql, [productId], (err2, results) => {
      if (err2) {
        console.error('Error fetching updated product:', err2);
        return res.status(500).json({ error: err2.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Product not found after update' });
      }

      const updatedProduct = results[0];

      if (!updatedProduct.image) {
        updatedProduct.image = null;
      } else if (!(updatedProduct.image.startsWith('http://') || updatedProduct.image.startsWith('https://'))) {
        updatedProduct.image = `http://localhost:5001/uploads/${updatedProduct.image}`;
      }

      res.json(updatedProduct);
    });
  });
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const sql = 'DELETE FROM products WHERE id = ?';

  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

/* ----------- USERS ----------- */

// GET all users
app.get('/api/users', (req, res) => {
  const sql = `
    SELECT 
      uid AS id, 
      name, 
      email, 
      created_at AS joined,
      photo,
      provider
    FROM users
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
// Express route example - get payments of logged-in user (or all payments)
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

app.put('/api/reviews/:id/reply', (req, res) => {
  const reviewId = parseInt(req.params.id);
  const { reply } = req.body;

  if (!reply || reply.trim() === '') {
    return res.status(400).json({ error: 'Reply text is required' });
  }

  db.query('SELECT * FROM reviews WHERE id = ?', [reviewId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    db.query(
      'UPDATE reviews SET reply = ?, status = ? WHERE id = ?',
      [reply, 'Responded', reviewId],
      (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ message: 'Reply saved successfully' });
      }
    );
  });
});
// Total revenue with monthly change %
app.get('/api/overview/revenue', (req, res) => {
  const sqlTotal = `SELECT SUM(product_price * product_quantity) AS totalRevenue FROM orders`;
  const sqlLastMonth = `SELECT SUM(product_price * product_quantity) AS lastMonthRevenue FROM orders WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND created_at < CURDATE()`;

  db.query(sqlTotal, (err, totalResult) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(sqlLastMonth, (err2, lastMonthResult) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const totalRevenue = totalResult[0].totalRevenue || 0;
      const lastMonthRevenue = lastMonthResult[0].lastMonthRevenue || 0;
      const revenueChangePercent = lastMonthRevenue === 0 ? 0 : (((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(2);

      res.json({ totalRevenue, revenueChangePercent });
    });
  });
});

// Total orders with monthly change %
app.get('/api/overview/orders', (req, res) => {
  const sqlTotal = `SELECT COUNT(*) AS totalOrders FROM orders`;
  const sqlLastMonth = `SELECT COUNT(*) AS lastMonthOrders FROM orders WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND created_at < CURDATE()`;

  db.query(sqlTotal, (err, totalResult) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(sqlLastMonth, (err2, lastMonthResult) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const totalOrders = totalResult[0].totalOrders || 0;
      const lastMonthOrders = lastMonthResult[0].lastMonthOrders || 0;
      const ordersChangePercent = lastMonthOrders === 0 ? 0 : (((totalOrders - lastMonthOrders) / lastMonthOrders) * 100).toFixed(2);

      res.json({ totalOrders, ordersChangePercent });
    });
  });
});

// Active users (distinct user emails in last 30 days) with change %
app.get('/api/overview/users', (req, res) => {
  const sqlActiveUsers = `SELECT COUNT(DISTINCT user_email) AS activeUsers FROM orders WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)`;
  const sqlPrevPeriod = `SELECT COUNT(DISTINCT user_email) AS prevActiveUsers FROM orders WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 60 DAY) AND created_at < DATE_SUB(CURDATE(), INTERVAL 30 DAY)`;

  db.query(sqlActiveUsers, (err, currentResult) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(sqlPrevPeriod, (err2, prevResult) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const activeUsers = currentResult[0].activeUsers || 0;
      const prevActiveUsers = prevResult[0].prevActiveUsers || 0;
      const usersChangePercent = prevActiveUsers === 0 ? 0 : (((activeUsers - prevActiveUsers) / prevActiveUsers) * 100).toFixed(2);

      res.json({ activeUsers, usersChangePercent });
    });
  });
});

// Pending orders with monthly change %
app.get('/api/overview/pending-orders', (req, res) => {
  const sqlPending = `SELECT COUNT(*) AS count FROM orders WHERE tracking_status = 'Pending'`;
  const sqlPrevPending = `SELECT COUNT(*) AS prevCount FROM orders WHERE tracking_status = 'Pending' AND created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND created_at < CURDATE()`;

  db.query(sqlPending, (err, pendingResult) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(sqlPrevPending, (err2, prevResult) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const count = pendingResult[0].count || 0;
      const prevCount = prevResult[0].prevCount || 0;
      const changePercent = prevCount === 0 ? 0 : (((count - prevCount) / prevCount) * 100).toFixed(2);

      res.json({ count, changePercent });
    });
  });
});
app.get('/api/overview/monthly-revenue', (req, res) => {
  const sql = `
    SELECT
      MONTH(created_at) AS month,
      IFNULL(SUM(product_price * product_quantity), 0) AS revenue
    FROM orders
    GROUP BY MONTH(created_at)
    ORDER BY MONTH(created_at)
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching monthly revenue:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
// Assuming you have a users table with columns like id, name, username, email, phone, address, website, bio, profile_image

// GET user profile by ID (or email)
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

// UPDATE user profile
app.put('/api/users/:id', upload.single('profileImage'), (req, res) => {
  const userId = req.params.id;
  const {
    name,
    username,
    email,
    phone,
    address,
    website,
    bio,
  } = req.body;

  // The uploaded file info is in req.file
  let profileImage = null;
  if (req.file) {
    profileImage = req.file.filename; // or build full URL like `/uploads/${req.file.filename}`
  }

  // Update user in DB; if new image uploaded, update profile_image column
  const sql = `
    UPDATE users SET
      name = ?, username = ?, email = ?, phone = ?, address = ?, website = ?, bio = ?, profile_image = COALESCE(?, profile_image)
    WHERE id = ?
  `;

  db.query(sql, [name, username, email, phone, address, website, bio, profileImage, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Profile updated successfully', profileImage });
  });
});

/* ------------------- SERVER ------------------- */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
