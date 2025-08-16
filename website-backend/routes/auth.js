const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Google Login
  router.post('/google', (req, res) => {
    const { uid, name, email, photoURL } = req.body;
    const provider = 'google';

    const sql = "SELECT * FROM users WHERE uid = ?";
    db.query(sql, [uid], (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.json({ message: "User exists", user: result[0] });
      } else {
        const insertSQL = "INSERT INTO users (uid, name, email, photo, provider) VALUES (?, ?, ?, ?, ?)";
        db.query(insertSQL, [uid, name, email, photoURL, provider], (err, result) => {
          if (err) return res.status(500).json(err);
          res.json({ message: "User created", user: { uid, name, email, photoURL, provider } });
        });
      }
    });
  });

  // Facebook Login
  router.post('/facebook', (req, res) => {
    const { uid, name, email, photoURL } = req.body;
    const provider = 'facebook';

    const sql = "SELECT * FROM users WHERE uid = ?";
    db.query(sql, [uid], (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.json({ message: "User exists", user: result[0] });
      } else {
        const insertSQL = "INSERT INTO users (uid, name, email, photo, provider) VALUES (?, ?, ?, ?, ?)";
        db.query(insertSQL, [uid, name, email, photoURL, provider], (err, result) => {
          if (err) return res.status(500).json(err);
          res.json({ message: "User created", user: { uid, name, email, photoURL, provider } });
        });
      }
    });
  });

  return router;
};
