const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function(pool) {
  const router = express.Router();

  // helper: create token
  function makeToken(user) {
    const payload = { id: user.id, role: user.role, email: user.email };
    return jwt.sign(payload, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
  }

  router.post('/register', async (req, res) => {
    const { name, email, password, role = 'student', department_id = null } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'missing email/password' });
    try {
      const hashed = await bcrypt.hash(password, 10);
      const { rows } = await pool.query('INSERT INTO users (name,email,password,role,department_id) VALUES ($1,$2,$3,$4,$5) RETURNING id,email,role', [name, email, hashed, role, department_id]);
      const user = rows[0];
      const token = makeToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'missing email/password' });
    try {
      const { rows } = await pool.query('SELECT id,email,password,role FROM users WHERE email=$1', [email]);
      if (rows.length === 0) return res.status(401).json({ error: 'invalid' });
      const u = rows[0];
      const ok = await bcrypt.compare(password, u.password);
      if (!ok) return res.status(401).json({ error: 'invalid' });
      const token = makeToken(u);
      res.json({ token, user: { id: u.id, email: u.email, role: u.role } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
