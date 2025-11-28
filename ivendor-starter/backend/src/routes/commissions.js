const express = require('express');
const router = express.Router();

module.exports = function(pool, requireRole) {
  // list commissions
  router.get('/', requireRole('admin','vendor'), async (req, res) => {
    const { rows } = await pool.query('SELECT c.*, v.name as vendor_name FROM commissions c LEFT JOIN material_vendors v ON c.vendor_id=v.id');
    res.json(rows);
  });

  // admin set commission
  router.post('/', requireRole('admin'), async (req, res) => {
    const { vendor_id, rate } = req.body;
    const { rows } = await pool.query('INSERT INTO commissions (vendor_id,rate,admin_set_by) VALUES ($1,$2,$3) RETURNING *', [vendor_id, rate, req.user.id]);
    res.json(rows[0]);
  });

  // update commission
  router.put('/:id', requireRole('admin'), async (req, res) => {
    const { id } = req.params;
    const { rate } = req.body;
    const { rows } = await pool.query('UPDATE commissions SET rate=$1 WHERE id=$2 RETURNING *', [rate, id]);
    res.json(rows[0]);
  });

  return router;
}
