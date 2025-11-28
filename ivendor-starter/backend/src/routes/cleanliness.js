const express = require('express');
const router = express.Router();

module.exports = function(pool, requireRole) {
  router.post('/report', requireRole('student','admin','vendor','alumni'), async (req, res) => {
    const { location, type, notes, photos } = req.body;
    const { rows } = await pool.query('INSERT INTO cleanliness_reports (reporter_id,location,type,notes,photos,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [req.user.id, location, type, notes||'', photos||[], 'open']);
    res.json(rows[0]);
  });

  router.get('/', requireRole('admin','vendor'), async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM cleanliness_reports ORDER BY created_at DESC');
    res.json(rows);
  });

  router.put('/:id/resolve', requireRole('admin'), async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE cleanliness_reports SET status=$1, resolved_at=now() WHERE id=$2', ['resolved', id]);
    res.json({ ok: true });
  });

  return router;
}
