const express = require('express');
const router = express.Router();

module.exports = function(pool, requireRole) {
  // list vendors
  router.get('/vendors', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM material_vendors');
    res.json(rows);
  });

  // list materials
  router.get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT m.*, v.name as vendor_name FROM materials m LEFT JOIN material_vendors v ON m.vendor_id=v.id');
    res.json(rows);
  });

  // vendor creates material
  router.post('/', requireRole('vendor','admin'), async (req, res) => {
    const { vendor_id, name, description, price, stock, tags } = req.body;
    const { rows } = await pool.query('INSERT INTO materials (vendor_id,name,description,price,stock,tags) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [vendor_id,name,description,price,stock,tags||null]);
    res.json(rows[0]);
  });

  // order materials (student)
  router.post('/order', requireRole('student','vendor','admin'), async (req, res) => {
    const { vendor_id, items, total } = req.body;
    try {
      const { rows } = await pool.query('INSERT INTO material_orders (vendor_id,buyer_id,items,total,status) VALUES ($1,$2,$3,$4,$5) RETURNING *', [vendor_id, req.user.id, items || {}, total || 0, 'pending']);
      res.json(rows[0]);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  // admin view commissions
  router.get('/commissions', requireRole('admin'), async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM commissions');
    res.json(rows);
  });

  return router;
}
