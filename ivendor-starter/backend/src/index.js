require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@postgres:5432/ivendor' });

// Simple JWT middleware
function auth(required = true) {
  return (req, res, next) => {
    const h = req.headers.authorization;
    if (!h) return required ? res.status(401).json({ error: 'missing token' }) : next();
    const token = h.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
      req.user = payload;
      next();
    } catch (e) {
      return res.status(401).json({ error: 'invalid token' });
    }
  };
}

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Seed endpoints
app.post('/api/v1/seed/populate', async (req, res) => {
  try {
    const result = await require('./scripts/seed-runner').run(pool);
    res.json({ ok: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/v1/seed/reset', async (req, res) => {
  try {
    await require('./scripts/seed-runner').reset(pool);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/v1/seed/status', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT count(*) as c FROM users');
    res.json({ users: parseInt(rows[0].c, 10) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Ideas endpoints (simplified implementations)
app.post('/api/v1/ideas/recommend', auth(false), async (req, res) => {
  const { department, budget, timeAvailable, skills } = req.body;
  // Simple AI stub: pick from idea_sources + ideas matching department or skills
  try {
    const q = `SELECT i.* FROM ideas i LEFT JOIN idea_sources s ON i.source_id = s.id WHERE i.department = $1 OR i.tags && $2::text[] LIMIT 6`;
    const tags = skills || [];
    const { rows } = await pool.query(q, [department || '%', tags]);
    // If empty, fallback to random
    if (rows.length === 0) {
      const r = await pool.query('SELECT * FROM ideas ORDER BY random() LIMIT 6');
      return res.json({ ideas: r.rows });
    }
    res.json({ ideas: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/v1/ideas', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM ideas ORDER BY id DESC LIMIT 200');
  res.json({ ideas: rows });
});

app.get('/api/v1/ideas/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM ideas WHERE id=$1', [id]);
  if (rows.length === 0) return res.status(404).json({ error: 'not found' });
  res.json(rows[0]);
});

app.post('/api/v1/ideas/select', auth(), async (req, res) => {
  const { idea_id } = req.body;
  const userId = req.user && req.user.id;
  if (!userId) return res.status(401).json({ error: 'unauthorized' });
  try {
    const r = await pool.query('INSERT INTO project_instances (idea_id, owner_id, status) VALUES ($1,$2,$3) RETURNING *', [idea_id, userId, 'created']);
    res.json({ instance: r.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Materials endpoints
app.get('/api/v1/materials/vendors', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM material_vendors');
  res.json({ vendors: rows });
});

app.post('/api/v1/materials/order', auth(), async (req, res) => {
  const { vendor_id, items, total } = req.body;
  const { rows } = await pool.query('INSERT INTO material_orders (vendor_id, buyer_id, items, total, status) VALUES ($1,$2,$3,$4,$5) RETURNING *', [vendor_id, req.user.id, JSON.stringify(items), total, 'pending']);
  res.json({ order: rows[0] });
});

app.get('/api/v1/materials/commissions', auth(), async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM commissions ORDER BY id DESC LIMIT 50');
  res.json({ commissions: rows });
});

// Cleanliness
app.post('/api/v1/cleanliness/report', auth(), async (req, res) => {
  const { location, type, notes, photos } = req.body;
  const { rows } = await pool.query('INSERT INTO cleanliness_reports (reporter_id, location, type, notes, photos, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [req.user.id, location, type, notes || '', JSON.stringify(photos || []), 'open']);
  res.json({ report: rows[0] });
});

app.get('/api/v1/cleanliness', auth(), async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM cleanliness_reports ORDER BY created_at DESC LIMIT 200');
  res.json({ reports: rows });
});

app.put('/api/v1/cleanliness/:id/resolve', auth(), async (req, res) => {
  const { id } = req.params;
  await pool.query('UPDATE cleanliness_reports SET status=$1, resolved_at=now() WHERE id=$2', ['resolved', id]);
  res.json({ ok: true });
});

// RBVM
app.post('/api/v1/rbvm/return', auth(), async (req, res) => {
  const { count } = req.body;
  const { rows } = await pool.query('INSERT INTO rbvm_transactions (user_id, count, carbon_saved) VALUES ($1,$2,$3) RETURNING *', [req.user.id, count, (count * 0.02)]);
  // Award points
  await pool.query('INSERT INTO rewards_transactions (wallet_id, user_id, amount, reason) VALUES ($1,$2,$3,$4)', [null, req.user.id, count * 5, 'rbvm']);
  res.json({ tx: rows[0] });
});

app.get('/api/v1/rbvm/history', auth(), async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM rbvm_transactions WHERE user_id=$1 ORDER BY created_at DESC LIMIT 200', [req.user.id]);
  res.json({ history: rows });
});

// Mount auth and storage routers
app.use('/api/v1/auth', require('./auth')(pool));
app.use('/api/v1/documents', require('./storage')(pool));

// Role middleware
const { requireRole } = require('./middleware/authorize');

// Mount modules
app.use('/api/v1/ideas', require('./routes/ideas')(pool, requireRole));
app.use('/api/v1/materials', require('./routes/materials')(pool, requireRole));
app.use('/api/v1/mentors', require('./routes/mentors')(pool, requireRole));
app.use('/api/v1/cleanliness', require('./routes/cleanliness')(pool, requireRole));
app.use('/api/v1/attendance', require('./routes/attendance')(pool, requireRole));
app.use('/api/v1/rewards', require('./routes/rewards')(pool, requireRole));
app.use('/api/v1/projects', require('./routes/projects')(pool, requireRole));
app.use('/api/v1/milestones', require('./routes/milestones')(pool, requireRole));
app.use('/api/v1/mentor-sessions', require('./routes/mentor_sessions')(pool, requireRole));
app.use('/api/v1/commissions', require('./routes/commissions')(pool, requireRole));
app.use('/api/v1/rewards/transactions', require('./routes/rewards_transactions')(pool, requireRole));

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Backend running on', port));

module.exports = app;
